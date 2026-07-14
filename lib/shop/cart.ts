// Client-side-only private cart for Shop V1: product ids and quantities in
// localStorage, nothing else. No personal data, no pricing snapshot, no
// payment fields — this is a selection tray, not an order. Real order
// saving happens at checkout (lib/shop/orders.ts).

const CART_STORAGE_KEY = "at_private_cart_v1";
const DISCOUNT_STORAGE_KEY = "at_private_cart_discount_v1";
export const CART_EVENT = "at-cart-updated";
export const CART_OPEN_EVENT = "at-cart-open-request";

export interface CartItem {
  slug: string;
  quantity: number;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readCart(): CartItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        item && typeof item.slug === "string" && typeof item.quantity === "number" && item.quantity > 0
    );
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function getCart(): CartItem[] {
  return readCart();
}

export function getCartCount(): number {
  return readCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(slug: string, quantity = 1): void {
  const items = readCart();
  const existing = items.find((item) => item.slug === slug);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ slug, quantity });
  }
  writeCart(items);
}

export function setQuantity(slug: string, quantity: number): void {
  const items = readCart();
  if (quantity <= 0) {
    writeCart(items.filter((item) => item.slug !== slug));
    return;
  }
  const existing = items.find((item) => item.slug === slug);
  if (existing) {
    existing.quantity = quantity;
    writeCart(items);
  }
}

export function removeFromCart(slug: string): void {
  writeCart(readCart().filter((item) => item.slug !== slug));
}

export function clearCart(): void {
  writeCart([]);
}

/** Asks the header's cart drawer to open — dispatched after "Add to private cart" from any page. */
export function requestCartOpen(): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(CART_OPEN_EVENT));
}

export function getDiscountCode(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(DISCOUNT_STORAGE_KEY);
}

export function setDiscountCode(code: string): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(DISCOUNT_STORAGE_KEY, code);
  window.dispatchEvent(new Event(CART_EVENT));
}

export function clearDiscountCode(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(DISCOUNT_STORAGE_KEY);
  window.dispatchEvent(new Event(CART_EVENT));
}
