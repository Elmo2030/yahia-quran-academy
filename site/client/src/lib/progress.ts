// =============================================================================
// progress.ts — reading progress (last surah/ayah) + streak summary.
//
// Local-first: progress is always written to localStorage so the site works
// without an account and never loses state when Supabase is unreachable. When
// a user is signed in, the same progress is mirrored to reader_progress and
// the streak is advanced through the record_reading RPC (migration 003);
// get_progress_summary feeds the Profile page and the home "Continue reading"
// widget.
// =============================================================================

import { useCallback, useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { activeProfile, loadStore, pendingDeeds, type StepRef } from "@/lib/hifz-store";
import { reviewQueue } from "@/lib/hifz-review";

const LOCAL_KEY = "yahya.progress.v1";

export type LocalProgress = {
  surah: number;
  ayah: number;
  updatedAt: number;
};

export type ProgressSummary = {
  lastSurah: number | null;
  lastAyah: number | null;
  lastReadAt: string | null;
  streakDays: number;
  savedStoriesCount: number;
};

const emptySummary: ProgressSummary = {
  lastSurah: null,
  lastAyah: null,
  lastReadAt: null,
  streakDays: 0,
  savedStoriesCount: 0,
};

export function readLocalProgress(): LocalProgress | null {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LocalProgress>;
    if (
      typeof parsed.surah === "number" &&
      parsed.surah >= 1 &&
      parsed.surah <= 114 &&
      typeof parsed.ayah === "number"
    ) {
      return {
        surah: parsed.surah,
        ayah: parsed.ayah,
        updatedAt: parsed.updatedAt ?? Date.now(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function writeLocalProgress(value: LocalProgress): void {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(value));
  } catch {
    // storage unavailable — the session still works, it just cannot remember
  }
}

// Union two libraries (local + remote) preserving order, dropping duplicates.
export function mergeLibrarySlugs(local: string[], remote: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const slug of [...local, ...remote]) {
    if (typeof slug !== "string" || seen.has(slug)) continue;
    seen.add(slug);
    out.push(slug);
  }
  return out;
}

export type NextStep = { ref: StepRef; href: string };

/**
 * The one thing to do next, across every kind of step the site tracks — not
 * only the last ayah read in the public reader. An ayah due for review in the
 * memorization journey outranks it, since a child with a review waiting has
 * somewhere more pressing to be than the last page they read; then a deed
 * they are waiting to have confirmed, which sends them back to that story
 * rather than nowhere; then the plain reading progress, unchanged.
 *
 * The journey's local store (see hifz-store.ts) is only read here to decide
 * what to show — nothing is written to it, and nothing about it leaves the
 * device. A story a child started but has not finished is not offered:
 * nothing in the store records that a story was merely opened, only that one
 * was completed, so there is no honest way yet to say which one to resume.
 */
export function nextStep(local: LocalProgress | null): NextStep | null {
  const child = activeProfile(loadStore());
  if (child) {
    const due = reviewQueue(child)[0];
    if (due) return { ref: { kind: "ayah", surah: due.surah, ayah: due.ayah }, href: `/hifz/${due.surah}` };
    const deed = pendingDeeds(child)[0];
    if (deed) return { ref: { kind: "deed", chapter: deed.chapter, slug: deed.slug }, href: `/stories/${deed.chapter}/${deed.slug}` };
  }
  if (local) return { ref: { kind: "ayah", surah: local.surah, ayah: local.ayah }, href: `/read/${local.surah}` };
  return null;
}

export function useReadingProgress() {
  const { session, profile } = useAuth();
  const [progress, setProgress] = useState<LocalProgress | null>(() => readLocalProgress());
  const [summary, setSummary] = useState<ProgressSummary>(emptySummary);
  const profileId = profile?.id ?? null;
  const userId = session?.user?.id ?? null;

  // When a profile becomes available, hydrate the summary + latest progress
  // from Supabase and prefer whichever copy is newer.
  useEffect(() => {
    if (!profileId) return;
    let live = true;
    (async () => {
      const client = await getSupabase();
      if (!client) return;
      try {
        const { data } = await client.rpc("get_progress_summary", {
          p_profile_id: profileId,
        });
        if (!live || !data || data.length === 0) return;
        const row = data[0] as {
          last_surah: number | null;
          last_ayah: number | null;
          last_read_at: string | null;
          streak_days: number | null;
          saved_stories_count: number | null;
        };
        setSummary({
          lastSurah: row.last_surah ?? null,
          lastAyah: row.last_ayah ?? null,
          lastReadAt: row.last_read_at ?? null,
          streakDays: row.streak_days ?? 0,
          savedStoriesCount: row.saved_stories_count ?? 0,
        });
        if (row.last_surah != null) {
          const remote: LocalProgress = {
            surah: row.last_surah,
            ayah: row.last_ayah ?? 0,
            updatedAt: row.last_read_at ? Date.parse(row.last_read_at) : Date.now(),
          };
          setProgress((current) => {
            if (!current || remote.updatedAt >= current.updatedAt) {
              writeLocalProgress(remote);
              return remote;
            }
            return current;
          });
        }
      } catch {
        // remote unavailable — keep local state untouched
      }
    })();
    return () => {
      live = false;
    };
  }, [profileId, userId]);

  const recordReading = useCallback(
    async (surah: number, ayah: number, seconds = 10) => {
      const value: LocalProgress = { surah, ayah, updatedAt: Date.now() };
      writeLocalProgress(value);
      setProgress(value);
      // Nobody signed in means nothing to save remotely, and asking for the
      // client is what downloads the library — so check that first.
      if (!profileId) return;
      const client = await getSupabase();
      if (!client) return;
      try {
        await client.rpc("record_reading", {
          p_profile_id: profileId,
          p_surah: surah,
          p_ayah_last_read: ayah,
          p_seconds_spent: seconds,
        });
      } catch {
        // best effort — the local copy is already saved
      }
    },
    [profileId],
  );

  return { progress, summary, recordReading };
}

export default useReadingProgress;
