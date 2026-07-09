import type { Locale } from "@/lib/i18n/config";
import { supabase } from "@/lib/supabaseClient";
import type { CartItem } from "./cart";
import { getProductBySlug, getProductCopy, parsePriceLabel } from "./products";

export interface OrderRequestInput {
  locale: Locale;
  name: string;
  email: string;
  country: string;
  region: string;
  message: string;
  items: CartItem[];
}

// Private order request — not a payment. Saves a `pending_inquiry` order
// plus its line items so an admin can follow up with availability and
// checkout details personally. See supabase/schema.sql for the RLS model:
// public visitors may only INSERT, never read, update, or delete orders.
export async function submitOrderRequest(input: OrderRequestInput): Promise<{ error: string | null }> {
  const rows = input.items
    .map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return null;
      const copy = getProductCopy(product, input.locale);
      const unitPrice = parsePriceLabel(product.priceLabel);
      return { item, product, copy, unitPrice };
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  if (rows.length === 0) {
    return { error: "empty_cart" };
  }

  const hasNumericSubtotal = rows.every((row) => row.unitPrice !== null);
  const totalCents = hasNumericSubtotal
    ? Math.round(rows.reduce((sum, row) => sum + (row.unitPrice as number) * row.item.quantity, 0) * 100)
    : 0;

  // Generated client-side so order_items can reference it immediately —
  // RLS intentionally grants guests no SELECT on `orders`, so we never
  // rely on reading the row back after INSERT.
  const orderId = crypto.randomUUID();

  const { error: orderError } = await supabase.from("orders").insert({
    id: orderId,
    status: "pending_inquiry",
    total_cents: totalCents,
    currency: "USD",
    customer_name: input.name,
    customer_email: input.email,
    locale: input.locale,
    message: input.message || null,
    country: input.country,
    region: input.region,
  });

  if (orderError) {
    return { error: orderError.message };
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
    return { error: itemsError.message };
  }

  return { error: null };
}
