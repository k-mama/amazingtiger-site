// Private catalogue discount codes for Shop V1. Percent-off only, by
// design — no flat-amount codes. Validated entirely client-side against
// this static list — there is no server yet to issue or verify codes, so
// treat this the same way as lib/shop/products.ts: the source of truth
// until discount codes move behind Supabase / a Cloudflare Pages Function.
// Edit this list to add or retire a code.

export interface DiscountCode {
  code: string;
  percent: number; // 0-100
}

export const discountCodes: DiscountCode[] = [{ code: "QUIETHOUSE10", percent: 10 }];

export function findDiscountCode(rawCode: string | null | undefined): DiscountCode | null {
  if (!rawCode) return null;
  const normalized = rawCode.trim().toUpperCase();
  if (!normalized) return null;
  return discountCodes.find((entry) => entry.code === normalized) ?? null;
}

/**
 * Discount amount in dollars, rounded to the nearest cent — for on-screen
 * totals (Cart/Checkout). Never exceeds the subtotal.
 */
export function calculateDiscountDollars(discount: DiscountCode | null, subtotalDollars: number): number {
  if (!discount || subtotalDollars <= 0) return 0;
  const amount = Math.round(subtotalDollars * (discount.percent / 100) * 100) / 100;
  return Math.min(amount, subtotalDollars);
}

/**
 * Discount amount in integer cents — for order totals persisted to the
 * database. Never exceeds the subtotal.
 */
export function calculateDiscountCents(discount: DiscountCode | null, subtotalCents: number): number {
  if (!discount || subtotalCents <= 0) return 0;
  const amount = Math.round(subtotalCents * (discount.percent / 100));
  return Math.min(amount, subtotalCents);
}
