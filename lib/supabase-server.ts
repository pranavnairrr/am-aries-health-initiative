import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — only created on first API call, not at module load time
let _admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    let url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase env vars not configured");
    // Normalize protocol-relative URLs (e.g. "//project.supabase.co")
    if (url.startsWith("//")) url = "https:" + url;
    _admin = createClient(url, key);
  }
  return _admin;
}
