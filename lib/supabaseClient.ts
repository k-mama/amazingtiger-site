import { createClient } from "@supabase/supabase-js";

// Browser-safe client. Only public env vars are used here.
// Never import the service role key into this file or any client component.
//
// Falls back to harmless placeholders so `next build` succeeds before real
// Supabase keys are configured — createClient() throws on an empty string.
// Auth/data calls will fail at runtime until NEXT_PUBLIC_SUPABASE_URL and
// NEXT_PUBLIC_SUPABASE_ANON_KEY are set for real in .env.local / Cloudflare.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
