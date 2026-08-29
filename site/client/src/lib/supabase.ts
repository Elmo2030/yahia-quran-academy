// =============================================================================
// supabase.ts — singleton Supabase client + resilient no-op fallback.
//
// The site is built and shipped without secrets injected (CI builds, GitHub
// pages preview, etc.). When VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are
// absent we expose a `null` client so the AuthContext can render the
// "Sign-in is temporarily unavailable" copy instead of crashing the page.
//
// Better than crashing on import: callers downstream always check
// `getSupabase()` before invoking methods, and the AuthProvider supplies a
// `configured: false` flag the UI can read.
// =============================================================================

import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL ?? "";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = (): boolean =>
  url.length > 0 && anonKey.length > 0;

let _client: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) return null;
  if (!_client) {
    _client = createClient(url, anonKey, {
      auth: {
        // We persist the session in localStorage so the user stays signed in
        // across page navigation on the static SPA. PKCE is the default for
        // v2.x of supabase-js; we set `detectSessionInUrl: true` so OAuth
        // callback flows (PR2) work without a custom handler.
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return _client;
};

// Convenience export for code that imports the client directly. Most call
// sites should prefer `getSupabase()` so the fallback path is explicit.
export const supabase = (() => {
  try {
    return getSupabase();
  } catch {
    return null;
  }
})();

export type ConfiguredSupabaseClient = SupabaseClient;
