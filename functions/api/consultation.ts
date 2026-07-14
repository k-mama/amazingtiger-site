// Cloudflare Pages Function — POST /api/consultation
//
// Runs server-side only, so this is the only place RESEND_API_KEY may be
// read. Validates the inquiry, applies basic spam checks, and relays it by
// email via Resend. Never import RESEND_API_KEY into app/ or components/.

interface Env {
  RESEND_API_KEY: string;
  CONSULTATION_TO_EMAIL: string;
  CONSULTATION_FROM_EMAIL?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

interface ConsultationPayload {
  locale?: string;
  name?: string;
  email?: string;
  phone?: string;
  project_type?: string;
  message?: string;
  // Honeypot — must arrive empty. Real visitors never see or fill this field.
  company?: string;
  // Milliseconds between the form rendering and this submission.
  elapsed_ms?: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_ELAPSED_MS = 2500;
const MAX_LENGTHS = { name: 200, email: 254, phone: 40, project_type: 200, message: 5000 };

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
  let payload: ConsultationPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const projectType = (payload.project_type ?? "").trim();
  const message = (payload.message ?? "").trim();
  const locale = (payload.locale ?? "en").trim();

  if (!name || !email || !message || !EMAIL_PATTERN.test(email)) {
    return jsonResponse({ ok: false, error: "invalid_input" }, 400);
  }

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    phone.length > MAX_LENGTHS.phone ||
    projectType.length > MAX_LENGTHS.project_type ||
    message.length > MAX_LENGTHS.message
  ) {
    return jsonResponse({ ok: false, error: "too_long" }, 400);
  }

  // Honeypot tripped, or submitted faster than a human could plausibly type
  // this form: accept quietly so the sender (bot) sees a normal success
  // response, but never actually send the email.
  const isSpam =
    Boolean(payload.company) ||
    (typeof payload.elapsed_ms === "number" && payload.elapsed_ms < MIN_ELAPSED_MS);

  if (isSpam) {
    return jsonResponse({ ok: true });
  }

  if (!env.RESEND_API_KEY || !env.CONSULTATION_TO_EMAIL) {
    // Named, not valued — safe to return. Lets us tell a Cloudflare Pages
    // environment-variable scoping/naming problem apart from a code bug
    // without exposing secret values.
    const missing = [
      !env.RESEND_API_KEY ? "RESEND_API_KEY" : null,
      !env.CONSULTATION_TO_EMAIL ? "CONSULTATION_TO_EMAIL" : null,
    ].filter(Boolean);
    return jsonResponse({ ok: false, error: "not_configured", missing }, 503);
  }

  const fromAddress = env.CONSULTATION_FROM_EMAIL || "Amazing Tiger Publishing <onboarding@resend.dev>";

  const html = [
    `<p><strong>Locale:</strong> ${escapeHtml(locale)}</p>`,
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : "",
    projectType ? `<p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>` : "",
    `<p><strong>Message:</strong></p>`,
    `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
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
        subject: `New consultation inquiry — ${name}${projectType ? ` (${projectType})` : ""}`,
        html,
      }),
    });

    if (!resendResponse.ok) {
      // Resend's own error text (invalid `from` domain, bad key, etc.) — not
      // a secret, and the fastest way to diagnose delivery problems.
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
