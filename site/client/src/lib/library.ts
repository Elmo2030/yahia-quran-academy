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

const KEY = "yahya.library.v1";
const CHANGED = "yahya:library-changed";
const UNKNOWN_CHAPTER = "unknown";

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    // storage unavailable or full — the page still works, it just cannot remember
  }
  window.dispatchEvent(new Event(CHANGED));
}

const chapterFor = (slug: string): string =>
  stories.find((s) => s.slug === slug)?.chapter ?? UNKNOWN_CHAPTER;

export function useLibrary() {
  const { session, profile } = useAuth();
  const [slugs, setSlugs] = useState<string[]>([]);
  const profileId = profile?.id ?? null;
  const userId = session?.user?.id ?? null;

  useEffect(() => {
    const sync = () => setSlugs(read());
    sync();
    window.addEventListener(CHANGED, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGED, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Merge remote saved_stories into the local library when signed in.
  useEffect(() => {
    if (!profileId) return;
    let live = true;
    (async () => {
      const client = await getSupabase();
      if (!client) return;
      try {
        const { data, error } = await client
          .from("saved_stories")
          .select("slug")
          .eq("profile_id", profileId);
        if (error || !data) return;
        const remote = data
          .map((row) => (row as { slug?: unknown }).slug)
          .filter((x): x is string => typeof x === "string");
        const local = read();
        const merged = mergeLibrarySlugs(local, remote);
        if (!live) return;
        if (merged.length !== local.length || merged.some((s, i) => s !== local[i])) {
          write(merged);
        }
      } catch {
        // remote unavailable — keep the local library untouched
      }
    })();
    return () => {
      live = false;
    };
  }, [profileId, userId]);

  const toggle = useCallback(
    (slug: string) => {
      const current = read();
      const next = current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug];
      write(next);
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
    [profileId],
  );

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, toggle, has };
}

export default useLibrary;
