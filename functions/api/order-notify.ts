// Cloudflare Pages Function — POST /api/order-notify
//
// A private order request (see lib/shop/orders.ts) is saved straight to
// Supabase from the browser via the anon key — that insert is the source of
// truth and already succeeded by the time this runs. This function only
// sends a best-effort admin alert by email via Resend, reusing the same
// RESEND_API_KEY / CONSULTATION_TO_EMAIL / CONSULTATION_FROM_EMAIL already
// configured for functions/api/consultation.ts. If this fails, the order
// itself is unaffected — it's already in the database either way.

interface Env {
  RESEND_API_KEY: string;
  CONSULTATION_TO_EMAIL: string;
  CONSULTATION_FROM_EMAIL?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

interface OrderItemPayload {
  title?: string;
  quantity?: number;
  price_label?: string;
}

interface OrderNotifyPayload {
  order_id?: string;
  locale?: string;
  customer_name?: string;
  customer_email?: string;
  phone?: string;
  country?: string;
  total_label?: string;
  discount_code?: string | null;
  items?: OrderItemPayload[];
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 200, email: 254, phone: 40, country: 100, total_label: 60 };
const MAX_ITEMS = 50;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function onRequestPost({ request, env }: RequestContext): Promise<Response> {
  let payload: OrderNotifyPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  const orderId = (payload.order_id ?? "").trim();
  const name = (payload.customer_name ?? "").trim();
  const email = (payload.customer_email ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const country = (payload.country ?? "").trim();
  const totalLabel = (payload.total_label ?? "").trim();
  const locale = (payload.locale ?? "en").trim();
  const items = Array.isArray(payload.items) ? payload.items.slice(0, MAX_ITEMS) : [];

  if (!UUID_PATTERN.test(orderId) || !name || !email || !EMAIL_PATTERN.test(email)) {
    return jsonResponse({ ok: false, error: "invalid_input" }, 400);
  }

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    phone.length > MAX_LENGTHS.phone ||
    country.length > MAX_LENGTHS.country ||
    totalLabel.length > MAX_LENGTHS.total_label
  ) {
    return jsonResponse({ ok: false, error: "too_long" }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONSULTATION_TO_EMAIL) {
    const missing = [
      !env.RESEND_API_KEY ? "RESEND_API_KEY" : null,
      !env.CONSULTATION_TO_EMAIL ? "CONSULTATION_TO_EMAIL" : null,
    ].filter(Boolean);
    return jsonResponse({ ok: false, error: "not_configured", missing }, 503);
  }

  const fromAddress = env.CONSULTATION_FROM_EMAIL || "Amazing Tiger Publishing <onboarding@resend.dev>";

  const itemsHtml = items
    .map((item) => {
      const title = escapeHtml((item.title ?? "").toString().slice(0, 200));
      const quantity = Number.isFinite(item.quantity) ? item.quantity : 1;
      const priceLabel = escapeHtml((item.price_label ?? "").toString().slice(0, 60));
      return `<li>${title} × ${quantity} — ${priceLabel}</li>`;
    })
    .join("\n");

  const html = [
    `<p><strong>Order reference:</strong> ${escapeHtml(orderId.slice(0, 8).toUpperCase())}</p>`,
    `<p><strong>Locale:</strong> ${escapeHtml(locale)}</p>`,
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : "",
    country ? `<p><strong>Country:</strong> ${escapeHtml(country)}</p>` : "",
    totalLabel ? `<p><strong>Total:</strong> ${escapeHtml(totalLabel)}</p>` : "",
    items.length > 0 ? `<p><strong>Items:</strong></p><ul>${itemsHtml}</ul>` : "",
    `<p>This is a private order request, not a paid order — status is <code>pending_inquiry</code> in Supabase. Review full billing/shipping details in the admin dashboard.</p>`,
  ].join("\n");

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: env.CONSULTATION_TO_EMAIL,
        reply_to: email,
        subject: `New private order request — ${name} (${orderId.slice(0, 8).toUpperCase()})`,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text().catch(() => "");
      return jsonResponse({ ok: false, error: "send_failed", detail }, 502);
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : "unknown error";
    return jsonResponse({ ok: false, error: "send_failed", detail }, 502);
  }

  return jsonResponse({ ok: true });
}

export async function onRequestGet(): Promise<Response> {
  return jsonResponse({ ok: false, error: "method_not_allowed" }, 405);
}
