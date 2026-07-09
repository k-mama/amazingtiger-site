import type { Locale } from "@/lib/i18n/config";
import { supabase } from "@/lib/supabaseClient";
import type { CartItem } from "./cart";
import { getProductBySlug, getProductCopy } from "./products";

export interface AddressFields {
  firstName: string;
  lastName: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface CheckoutRequestInput {
  locale: Locale;
  items: CartItem[];
  billing: AddressFields & { email: string; phone: string };
  shipToDifferentAddress: boolean;
  shipping: AddressFields;
  orderNotes: string;
}

export interface OrderRequestResult {
  error: string | null;
  orderId: string | null;
}

// Private order request — not a payment. Saves a `pending_inquiry` order
// plus its line items so an admin can follow up with availability and
// checkout details personally. See supabase/schema.sql for the RLS model:
// public visitors may only INSERT, never read, update, or delete orders.
export async function submitCheckoutRequest(input: CheckoutRequestInput): Promise<OrderRequestResult> {
  const rows = input.items
    .map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return null;
      const copy = getProductCopy(product, input.locale);
      const unitPrice = product.priceAmount;
      return { item, product, copy, unitPrice };
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  if (rows.length === 0) {
    return { error: "empty_cart", orderId: null };
  }

  const hasNumericSubtotal = rows.every((row) => row.unitPrice !== null);
  const totalCents = hasNumericSubtotal
    ? Math.round(rows.reduce((sum, row) => sum + (row.unitPrice as number) * row.item.quantity, 0) * 100)
    : 0;
  const currency = rows[0]?.product.currency ?? "USD";

  const { billing, shipping, shipToDifferentAddress } = input;

  // Generated client-side so order_items can reference it immediately —
  // RLS intentionally grants guests no SELECT on `orders`, so we never
  // rely on reading the row back after INSERT.
  const orderId = crypto.randomUUID();

  const { error: orderError } = await supabase.from("orders").insert({
    id: orderId,
    status: "pending_inquiry",
    total_cents: totalCents,
    currency,
    customer_name: `${billing.firstName} ${billing.lastName}`.trim(),
    customer_email: billing.email,
    phone: billing.phone || null,
    locale: input.locale,
    country: billing.country,
    region: billing.state,
    billing_first_name: billing.firstName,
    billing_last_name: billing.lastName,
    billing_address_line1: billing.addressLine1,
    billing_address_line2: billing.addressLine2 || null,
    billing_city: billing.city,
    billing_state: billing.state,
    billing_postal_code: billing.postalCode,
    shipping_same_as_billing: !shipToDifferentAddress,
    shipping_first_name: shipToDifferentAddress ? shipping.firstName : null,
    shipping_last_name: shipToDifferentAddress ? shipping.lastName : null,
    shipping_country: shipToDifferentAddress ? shipping.country : null,
    shipping_address_line1: shipToDifferentAddress ? shipping.addressLine1 : null,
    shipping_address_line2: shipToDifferentAddress ? shipping.addressLine2 || null : null,
    shipping_city: shipToDifferentAddress ? shipping.city : null,
    shipping_state: shipToDifferentAddress ? shipping.state : null,
    shipping_postal_code: shipToDifferentAddress ? shipping.postalCode : null,
    order_notes: input.orderNotes || null,
  });

  if (orderError) {
    return { error: orderError.message, orderId: null };
  }

  const itemRows = rows.map((row) => ({
    order_id: orderId,
    product_slug: row.product.slug,
    product_title_snapshot: row.copy.title,
    quantity: row.item.quantity,
    unit_price_cents: row.unitPrice !== null ? Math.round(row.unitPrice * 100) : 0,
    unit_price_label: row.product.priceLabel,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(itemRows);

  if (itemsError) {
    return { error: itemsError.message, orderId: null };
  }

  return { error: null, orderId };
}
