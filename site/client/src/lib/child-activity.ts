// =============================================================================
// child-activity.ts — what a child actually did, computed from the existing
// store at render time. There is no event log here and none is added: every
// timestamp this reads already lives in hifz-store.ts (ayahs/steps) or the
// facts-discovery side table. See TODO.md's "الأحداث على الجهاز بس" decision
// for the events deliberately left out — they measure the site, not the
// child, and would be tracking with no benefit to a parent.
//
// Pure on purpose: no React, no local storage, no fetch. The parent's corner
// passes in `now` and the facts it already read from storage, and gets back
// everything the page needs to render. This also means titles are resolved
// here, from the lite generated indices, rather than in the page: content
// that was removed after a child worked on it must not surface as a raw slug
// (see resolveIndexTitle below), and that rule is easiest to keep in one
// place tested with fixed content, not re-checked at every call site.
// =============================================================================

import { dayNumber, todayPlan } from "@/lib/hifz-review";
import {
  inProgressLearningSteps, inProgressStories, practiceRecitals,
  type ChildProfile,
} from "@/lib/hifz-store";
import { storyIndex, seerahStoryIndex, aqeedahCardIndex, factIndex } from "@/lib/page-index-lite.generated";
import { companionIndex } from "@/lib/companion-index.generated";

const WEEK_DAYS = 7;
const RECENT_LIMIT = 10;

export type FactDiscovery = { slug: string; at: number };

export type RecentItem =
  | { kind: "story"; at: number; href: string; title: string; titleEn: string | null }
  | { kind: "seerah" | "aqeedah" | "companions"; at: number; href: string; title: string; titleEn: string | null }
  | { kind: "deed"; at: number; href: string; title: string }
  | { kind: "fact"; at: number; href: string; title: string; titleEn: string }
  | { kind: "ayah_declared"; at: number; href: string; surah: number; count: number }
  | { kind: "ayah_reviewed"; at: number; href: string; count: number }
  | { kind: "recital"; at: number; href: string; surah: number; from: number; to: number };

export type EncourageHint =
  | { kind: "practice_recital"; href: string; surah: number; from: number; to: number }
  | { kind: "review_due"; href: string; count: number }
  | { kind: "continue"; href: string; title: string; titleEn: string | null }
  | null;

export type WeekCounts = {
  storiesDone: number;
  seerahDone: number;
  aqeedahDone: number;
  companionsDone: number;
  factsDiscovered: number;
  ayahsDeclared: number;
  ayahReviews: number;
  deedsRegistered: number;
  deedsConfirmed: number;
  recitalsSubmitted: number;
  /** distinct days, within the week, that had any activity at all — broader
   *  than the fields above, which is why it is not their sum. */
  activeDays: number;
};

export type ChildActivity = {
  /** the most recent day anything happened at all, or null if nothing has. */
  lastActiveDay: number | null;
  week: WeekCounts;
  /** newest first, at most 10. */
  recent: RecentItem[];
  encourage: EncourageHint;
};

function emptyWeek(): WeekCounts {
  return {
    storiesDone: 0, seerahDone: 0, aqeedahDone: 0, companionsDone: 0,
    factsDiscovered: 0, ayahsDeclared: 0, ayahReviews: 0,
    deedsRegistered: 0, deedsConfirmed: 0, recitalsSubmitted: 0, activeDays: 0,
  };
}

function learningHref(kind: "seerah" | "aqeedah" | "companions", slug: string): string {
  return kind === "seerah" ? `/seerah/${slug}` : kind === "aqeedah" ? `/aqeedah/${slug}` : `/companions/${slug}`;
}

/** Content removed after a child worked on it must not surface as a raw
 *  slug — this is the one place that rule is enforced. */
function resolveLearningTitle(kind: "seerah" | "aqeedah" | "companions", slug: string): { title: string; titleEn: string | null } | null {
  if (kind === "seerah") {
    const match = seerahStoryIndex.find(s => s.slug === slug);
    return match ? { title: match.title, titleEn: match.titleEn } : null;
  }
  if (kind === "aqeedah") {
    const match = aqeedahCardIndex.find(c => c.slug === slug);
    return match ? { title: match.title, titleEn: match.titleEn } : null;
  }
  const match = companionIndex.find(c => c.slug === slug);
  return match ? { title: match.name, titleEn: null } : null;
}

function resolveStoryTitle(chapter: string, slug: string): { title: string; titleEn: string | null } | null {
  const match = storyIndex.find(s => s.chapter === chapter && s.slug === slug);
  return match ? { title: match.title, titleEn: match.titleEn } : null;
}

function resolveFactTitle(slug: string): { title: string; titleEn: string } | null {
  const match = factIndex.find(f => f.slug === slug);
  return match ? { title: match.title, titleEn: match.titleEn } : null;
}

function buildEncourage(profile: ChildProfile, now: number): EncourageHint {
  const practice = practiceRecitals(profile);
  if (practice.length > 0) {
    const { surah, from, to } = practice[0];
    return { kind: "practice_recital", href: `/hifz/${surah}/recite`, surah, from, to };
  }

  const due = todayPlan(profile, now).due;
  if (due > 0) return { kind: "review_due", href: "/hifz", count: due };

  // Whatever the child most recently started and has not finished, across
  // every domain — a story, a seerah station, a creed card, a companion.
  const candidates: Array<{ startedAt: number; href: string; slug: string; chapter?: string; learningKind?: "seerah" | "aqeedah" | "companions" }> = [];
  for (const item of inProgressStories(profile)) {
    if (item.record.startedAt) candidates.push({ startedAt: item.record.startedAt, href: `/stories/${item.chapter}/${item.slug}`, chapter: item.chapter, slug: item.slug });
  }
  for (const kind of ["seerah", "aqeedah", "companions"] as const) {
    for (const item of inProgressLearningSteps(profile, kind)) {
      if (item.record.startedAt) candidates.push({ startedAt: item.record.startedAt, href: learningHref(kind, item.slug), slug: item.slug, learningKind: kind });
    }
  }
  candidates.sort((a, b) => b.startedAt - a.startedAt);

  for (const candidate of candidates) {
    const resolved = candidate.learningKind
      ? resolveLearningTitle(candidate.learningKind, candidate.slug)
      : resolveStoryTitle(candidate.chapter as string, candidate.slug);
    if (resolved) return { kind: "continue", href: candidate.href, title: resolved.title, titleEn: resolved.titleEn };
  }
  return null;
}

export function childActivity(profile: ChildProfile, input: { now: number; facts?: readonly FactDiscovery[] }): ChildActivity {
  if (profile.character === "guest") {
    return { lastActiveDay: null, week: emptyWeek(), recent: [], encourage: null };
  }

  const today = dayNumber(input.now);
  const weekStart = today - (WEEK_DAYS - 1);
  const inWeek = (at: number) => { const day = dayNumber(at); return day >= weekStart && day <= today; };

  let lastActiveDay: number | null = null;
  const activeDaySet = new Set<number>();
  /** Every timestamp passes through here, whatever domain it belongs to —
   *  this is the one thing that must see everything, which is exactly what
   *  the original ayah-only calculation in HifzParent.tsx did not. */
  const touch = (at: number | undefined) => {
    if (!at) return;
    const day = dayNumber(at);
    if (lastActiveDay === null || day > lastActiveDay) lastActiveDay = day;
    if (day >= weekStart && day <= today) activeDaySet.add(day);
  };

  const week = emptyWeek();
  const recent: RecentItem[] = [];

  // --- ayahs: declarations and reviews, each grouped so a burst of activity
  // in one day reads as one line, not one per ayah (see the trap about
  // reviews/listens not being a count of visits).
  const declareGroups = new Map<string, { surah: number; count: number; at: number }>();
  const reviewGroups = new Map<number, { count: number; at: number }>();

  for (const [key, record] of Object.entries(profile.ayahs)) {
    const surah = Number(key.split(":")[0]);
    touch(record.listenedAt);
    touch(record.recordedAt);
    touch(record.declaredAt);
    touch(record.forgotAt);
    for (const at of record.reviews) touch(at);

    if (record.declaredAt) {
      if (inWeek(record.declaredAt)) week.ayahsDeclared++;
      const groupKey = `${dayNumber(record.declaredAt)}:${surah}`;
      const existing = declareGroups.get(groupKey);
      if (existing) { existing.count++; existing.at = Math.max(existing.at, record.declaredAt); }
      else declareGroups.set(groupKey, { surah, count: 1, at: record.declaredAt });
    }
    for (const at of record.reviews) {
      if (inWeek(at)) week.ayahReviews++;
      const day = dayNumber(at);
      const existing = reviewGroups.get(day);
      if (existing) { existing.count++; existing.at = Math.max(existing.at, at); }
      else reviewGroups.set(day, { count: 1, at });
    }
  }
  for (const { surah, count, at } of Array.from(declareGroups.values())) {
    recent.push({ kind: "ayah_declared", at, href: `/hifz/${surah}`, surah, count });
  }
  for (const { count, at } of Array.from(reviewGroups.values())) {
    recent.push({ kind: "ayah_reviewed", at, href: "/hifz", count });
  }

  // --- steps: stories, seerah/aqeedah/companions, deeds, recitals ---
  for (const [key, record] of Object.entries(profile.steps)) {
    touch(record.startedAt);
    touch(record.doneAt);
    touch(record.awaitingAt);
    touch(record.reviewedAt);

    const parts = key.split(":");
    const kind = parts[0];

    if (kind === "story" && record.doneAt) {
      const [, chapter, slug] = parts;
      const resolved = resolveStoryTitle(chapter, slug);
      if (resolved) recent.push({ kind: "story", at: record.doneAt, href: `/stories/${chapter}/${slug}`, ...resolved });
      if (inWeek(record.doneAt)) week.storiesDone++;
    } else if ((kind === "seerah" || kind === "aqeedah" || kind === "companions") && record.doneAt) {
      const slug = parts[1];
      const resolved = resolveLearningTitle(kind, slug);
      if (resolved) recent.push({ kind, at: record.doneAt, href: learningHref(kind, slug), ...resolved });
      if (inWeek(record.doneAt)) {
        if (kind === "seerah") week.seerahDone++;
        else if (kind === "aqeedah") week.aqeedahDone++;
        else week.companionsDone++;
      }
    } else if (kind === "deed") {
      const [, chapter, slug] = parts;
      if (record.awaitingAt) {
        if (record.story) recent.push({ kind: "deed", at: record.awaitingAt, href: `/stories/${chapter}/${slug}`, title: record.story.title });
        if (inWeek(record.awaitingAt)) week.deedsRegistered++;
      }
      if (record.status === "reviewed" && record.reviewedAt && inWeek(record.reviewedAt)) week.deedsConfirmed++;
    } else if (kind === "recital") {
      const match = /^recital:(\d+):(\d+)-(\d+)$/.exec(key);
      if (match && record.awaitingAt) {
        const surah = Number(match[1]), from = Number(match[2]), to = Number(match[3]);
        recent.push({ kind: "recital", at: record.awaitingAt, href: `/hifz/${surah}/recite`, surah, from, to });
        if (inWeek(record.awaitingAt)) week.recitalsSubmitted++;
      }
    }
  }

  // --- facts discovered (only ones with a recorded date — see
  // quran-facts-progress.ts; an old, undated discovery affects neither
  // lastActiveDay nor the week, but its existing total elsewhere is
  // untouched, since that reads the separate undated list). ---
  for (const fact of input.facts ?? []) {
    touch(fact.at);
    const resolved = resolveFactTitle(fact.slug);
    if (resolved) recent.push({ kind: "fact", at: fact.at, href: `/quran-facts/${fact.slug}`, ...resolved });
    if (inWeek(fact.at)) week.factsDiscovered++;
  }

  recent.sort((a, b) => b.at - a.at);
  week.activeDays = activeDaySet.size;

  return { lastActiveDay, week, recent: recent.slice(0, RECENT_LIMIT), encourage: buildEncourage(profile, input.now) };
}
