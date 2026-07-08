// Cloudflare Pages Function — POST /api/create-checkout
//
// Skeleton only. No payment provider is wired up yet and no orders are
// created. This will eventually validate a cart, create a pending `orders`
// row via the Supabase service role key, and return a redirect URL for a
// hosted checkout (e.g. Stripe Checkout) using PAYMENT_SECRET_KEY.

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  PAYMENT_SECRET_KEY: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

interface CheckoutLineItem {
  product_id: string;
  variant_id?: string;
  quantity: number;
}

interface CheckoutPayload {
  items: CheckoutLineItem[];
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function onRequestPost({ request, env }: RequestContext): Promise<Response> {
  let payload: CheckoutPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!payload.items || payload.items.length === 0) {
    return jsonResponse({ error: "items is required and must not be empty" }, 400);
  }

  // TODO: re-price the cart server-side from `products` / `product_variants`
  //       — never trust client-submitted prices.
  // TODO: create a pending `orders` row + `order_items` rows using
  //       env.SUPABASE_SERVICE_ROLE_KEY.
  // TODO: create a hosted checkout session with the payment provider using
  //       env.PAYMENT_SECRET_KEY and return its redirect URL.
  // TODO: handle the provider's webhook (separate function) to mark the
  //       order as paid — do not trust the client to report success.

  return jsonResponse({ status: "not_implemented" }, 501);
}
