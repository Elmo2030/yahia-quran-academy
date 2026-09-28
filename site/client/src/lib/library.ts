/**
 * "My library" — the stories a reader has saved.
 *
 * Local-first: saved stories live in localStorage so the site works without
 * an account and nothing is lost when Supabase is unreachable. When a user is
 * signed in, the library is mirrored to the saved_stories table (migration
 * 001): remote rows are merged in on load and every toggle is applied to the
 * remote side silently, best effort (feature/progress-tracking). Every access
 * is guarded because storage throws outright in some private-browsing modes
 * rather than simply returning null.
 */

import { useCallback, useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { stories } from "@/content/stories";
import { mergeLibrarySlugs } from "@/lib/progress";

// Guests keep the original key, so libraries saved before accounts existed
// are not lost. A signed-in account gets its own key: on a shared family
// device, one child's saved stories must never show up for another.
const GUEST_KEY = "yahya.library.v1";
const keyFor = (userId: string | null) => (userId ? `${GUEST_KEY}:${userId}` : GUEST_KEY);
const CHANGED = "yahya:library-changed";
const UNKNOWN_CHAPTER = "unknown";

function read(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(key: string, slugs: string[]) {
  try {
    if (slugs.length === 0 && key === GUEST_KEY) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(slugs));
  } catch {
    // storage unavailable or full — the page still works, it just cannot remember
  }
  window.dispatchEvent(new Event(CHANGED));
}

const chapterFor = (slug: string): string =>
  stories.find((s) => s.slug === slug)?.chapter ?? UNKNOWN_CHAPTER;

export function useLibrary() {
  const { session, profile } = useAuth();
  const userId = session?.user?.id ?? null;
  const profileId = userId ? (profile?.id ?? null) : null;
  const key = keyFor(userId);
  const [slugs, setSlugs] = useState<string[]>(() => read(key));

  // Follow the library of whoever is signed in right now. Switching accounts
  // replaces what is shown immediately rather than waiting on the network.
  useEffect(() => {
    const sync = () => setSlugs(read(key));
    sync();
    window.addEventListener(CHANGED, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGED, sync);
      window.removeEventListener("storage", sync);
    };
  }, [key]);

  // Signed in: merge this account's remote saved_stories into its own local
  // library. Stories saved as a guest go to the first account that signs in —
  // they are uploaded and then removed from the guest list, so a second
  // account signing in later on the same device does not receive them too.
  useEffect(() => {
    if (!userId || !profileId) return;
    let live = true;
    (async () => {
      const client = await getSupabase();
      if (!client || !live) return;
      try {
        const { data, error } = await client
          .from("saved_stories")
          .select("slug")
          .eq("profile_id", profileId);
        if (error || !data || !live) return;
        const remote = data
          .map((row) => (row as { slug?: unknown }).slug)
          .filter((x): x is string => typeof x === "string");
        const accountKey = keyFor(userId);
        const guest = read(GUEST_KEY);
        const local = read(accountKey);
        const merged = mergeLibrarySlugs(mergeLibrarySlugs(remote, local), guest);
        if (merged.length !== local.length || merged.some((s, i) => s !== local[i])) {
          write(accountKey, merged);
        }
        if (guest.length > 0) {
          write(GUEST_KEY, []);
          for (const slug of guest.filter((g) => !remote.includes(g))) {
            client
              .from("saved_stories")
              .upsert({ profile_id: profileId, chapter: chapterFor(slug), slug }, { onConflict: "profile_id,chapter,slug" })
              .then(() => undefined, () => undefined);
          }
        }
      } catch {
        // remote unavailable — keep the local library untouched
      }
    })();
    return () => {
      live = false;
    };
  }, [userId, profileId]);

  const toggle = useCallback(
    (slug: string) => {
      const current = read(key);
      const next = current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug];
      write(key, next);
      if (!profileId) return;
      void (async () => {
        const client = await getSupabase();
        if (!client) return;
        if (next.includes(slug)) {
          client
            .from("saved_stories")
            .upsert(
              { profile_id: profileId, chapter: chapterFor(slug), slug },
              { onConflict: "profile_id,chapter,slug" },
            )
            .then(
              () => undefined,
              () => undefined,
            );
        } else {
          client
            .from("saved_stories")
            .delete()
            .eq("profile_id", profileId)
            .eq("slug", slug)
            .then(
              () => undefined,
              () => undefined,
            );
        }
      })();
    },
    [key, profileId],
  );

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, toggle, has };
}

export default useLibrary;
