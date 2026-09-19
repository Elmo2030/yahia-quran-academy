/**
 * Returns a route that is guaranteed to stay on this origin.
 *
 * A leading slash alone is insufficient: URL parsers treat a backslash in a
 * special-scheme URL as a slash, so `/\\other.example` can become an external
 * callback destination. OAuth callbacks carry a session, so callers must use
 * this boundary instead of checking a string prefix themselves.
 */
export function safeInternalPath(value: string | null | undefined): string | null {
  if (!value || !value.startsWith("/") || value.startsWith("//") || typeof window === "undefined") {
    return null;
  }

  try {
    const target = new URL(value, window.location.origin);
    if (target.origin !== window.location.origin) return null;
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return null;
  }
}
