// =============================================================================
// lazyWithRetry — survive a deploy that happened while the page was open.
//
// Route chunks carry a content hash in their filename. When a new version is
// deployed, the old hashes stop existing, but a browser that already has the
// entry chunk keeps asking for them — so the next navigation dies with
// "Failed to fetch dynamically imported module" and the user gets an error
// page instead of the route.
//
// The fix is to reload once, which fetches fresh HTML and therefore the new
// chunk names. The flag makes it once and not a loop: if the import still
// fails after a reload the problem is not a stale hash, and the error should
// surface rather than spin.
// =============================================================================

import { lazy, type ComponentType } from "react";

const RELOAD_FLAG = "yahya.chunk-reloaded";

export function lazyWithRetry<T extends ComponentType<unknown>>(
  load: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    try {
      const mod = await load();
      try { window.sessionStorage.removeItem(RELOAD_FLAG); } catch { /* private mode */ }
      return mod;
    } catch (error) {
      let alreadyTried = true;
      try { alreadyTried = window.sessionStorage.getItem(RELOAD_FLAG) === "1"; } catch { /* private mode */ }
      if (!alreadyTried) {
        try { window.sessionStorage.setItem(RELOAD_FLAG, "1"); } catch { /* private mode */ }
        window.location.reload();
        // Never resolves; the reload replaces this document.
        return new Promise<{ default: T }>(() => {});
      }
      throw error;
    }
  });
}
