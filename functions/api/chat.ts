// Cloudflare Pages Function — POST /api/chat
//
// Skeleton only. Not yet wired to a chatbot UI. This will eventually proxy
// to an AI provider and read/write chat_sessions + chat_messages in
// Supabase using the service role key, kept server-side.

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  AI_API_KEY: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

interface ChatPayload {
  session_id?: string;
  locale?: string;
  message: string;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function onRequestPost({ request, env }: RequestContext): Promise<Response> {
  let payload: ChatPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!payload.message) {
    return jsonResponse({ error: "message is required" }, 400);
  }

  // TODO: look up or create a chat_sessions row (env.SUPABASE_SERVICE_ROLE_KEY).
  // TODO: store the incoming user message in chat_messages.
  // TODO: call the AI provider with env.AI_API_KEY to draft a reply.
  // TODO: store the assistant reply in chat_messages and return it.

  return jsonResponse({ status: "not_implemented" }, 501);
}
