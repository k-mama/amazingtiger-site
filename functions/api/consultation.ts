// Cloudflare Pages Function — POST /api/consultation
//
// Skeleton only. Not yet wired to the consultation form on the frontend.
// Cloudflare Pages Functions run server-side, so this is the only place
// SUPABASE_SERVICE_ROLE_KEY may be read. Never import it into app/ or
// components/.

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

interface ConsultationPayload {
  locale?: string;
  name: string;
  email: string;
  phone?: string;
  project_type?: string;
  message: string;
  preferred_contact?: string;
  turnstile_token?: string;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function onRequestPost({ request, env }: RequestContext): Promise<Response> {
  let payload: ConsultationPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!payload.name || !payload.email || !payload.message) {
    return jsonResponse({ error: "name, email, and message are required" }, 400);
  }

  // TODO: verify payload.turnstile_token against env.TURNSTILE_SECRET_KEY
  //       before accepting the submission.

  // TODO: insert into the `consultations` table using the Supabase REST API
  //       (env.SUPABASE_URL + env.SUPABASE_SERVICE_ROLE_KEY), e.g.
  //
  //   await fetch(`${env.SUPABASE_URL}/rest/v1/consultations`, {
  //     method: "POST",
  //     headers: {
  //       apikey: env.SUPABASE_SERVICE_ROLE_KEY,
  //       Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       locale: payload.locale ?? "en",
  //       name: payload.name,
  //       email: payload.email,
  //       phone: payload.phone,
  //       project_type: payload.project_type,
  //       message: payload.message,
  //       preferred_contact: payload.preferred_contact,
  //     }),
  //   });

  // TODO: send an admin notification and a confirmation email via Resend
  //       (env.RESEND_API_KEY).

  return jsonResponse({ status: "not_implemented" }, 501);
}
