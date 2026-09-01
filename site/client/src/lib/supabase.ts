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

// The library itself is fetched only when something actually needs it. It is
// 213 KB of the entry bundle, and a child who opens a surah and never signs in
// was downloading all of it. The type import costs nothing at runtime.
import type { SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL ?? "";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = (): boolean =>
  url.length > 0 && anonKey.length > 0;

/**
 * Is there a stored session for this project?
 *
 * supabase-js keeps it in localStorage under a key derived from the project
 * ref, and it is the only reason the library has to load for a reader who is
 * just reading. Asking this first means a signed-out visitor never downloads
 * it at all. A sign-in returning from Google or Apple carries its session in
 * the URL instead, so that counts too.
 */
export const mightHaveSession = (): boolean => {
  if (!isSupabaseConfigured()) return false;
  try {
    const ref = new URL(url).hostname.split(".")[0];
    if (localStorage.getItem(`sb-${ref}-auth-token`)) return true;
  } catch {
    // Private mode, or a URL we cannot parse: fall through and let the caller
    // load the library rather than wrongly reporting nobody is signed in.
    return true;
  }
  const { hash, search } = window.location;
  return hash.includes("access_token") || hash.includes("error=") || search.includes("code=");
};

let pending: Promise<SupabaseClient | null> | null = null;

/** Resolves to the client, loading the library on first use. */
export const getSupabase = async (): Promise<SupabaseClient | null> => {
  if (!isSupabaseConfigured()) return null;
  pending ??= import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(url, anonKey, {
      auth: {
        // We persist the session in localStorage so the user stays signed in
        // across page navigation on the static SPA. PKCE is the default for
        // v2.x of supabase-js; we set `detectSessionInUrl: true` so OAuth
        // callback flows (PR2) work without a custom handler.
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }),
  );
  return pending;
};

export type ConfiguredSupabaseClient = SupabaseClient;
