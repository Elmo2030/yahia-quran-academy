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

// A signed-in account gets its own key: on a shared family device, one
// child's saved stories must never show up for another.
//
// Before accounts had their own keys, everyone's library — signed in or not —
// lived in yahya.library.v1, so its owner is unknown. It is kept for guests
// (they see what this device showed before) but never handed to an account.
// Only stories saved as a guest since then (GUEST_KEY) go to the first
// account that signs in.
const LEGACY_KEY = "yahya.library.v1";
const GUEST_KEY = "yahya.library.v2:guest";
const keyFor = (userId: string | null) => (userId ? `${LEGACY_KEY}:${userId}` : GUEST_KEY);
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

/** What the current person sees: their account's library, or a guest's. */
function readView(userId: string | null): string[] {
  return userId ? read(keyFor(userId)) : mergeLibrarySlugs(read(LEGACY_KEY), read(GUEST_KEY));
}

function write(key: string, slugs: string[]) {
  try {
    if (slugs.length === 0 && (key === GUEST_KEY || key === LEGACY_KEY)) localStorage.removeItem(key);
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
  const [slugs, setSlugs] = useState<string[]>(() => readView(userId));

  // Follow the library of whoever is signed in right now. Switching accounts
  // replaces what is shown immediately rather than waiting on the network.
  useEffect(() => {
    const sync = () => setSlugs(readView(userId));
    sync();
    window.addEventListener(CHANGED, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGED, sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const saved = readView(userId).includes(slug);
      if (!userId && saved) {
        // A guest removing a story removes it wherever this device kept it.
        write(GUEST_KEY, read(GUEST_KEY).filter((s) => s !== slug));
        write(LEGACY_KEY, read(LEGACY_KEY).filter((s) => s !== slug));
      } else {
        const current = read(key);
        write(key, saved ? current.filter((s) => s !== slug) : [...current, slug]);
      }
      const next = readView(userId);
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
    [key, userId, profileId],
  );

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, toggle, has };
}

export default useLibrary;
