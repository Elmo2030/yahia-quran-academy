// =============================================================================
// hifz-review.ts — when an ayah comes back, and what "kept it up" means.
//
// An ayah a child has declared memorized returns after one day, then three,
// seven, fourteen and thirty. The spacing is the ordinary one for revisiting
// something learned; nothing here tests the child, it only decides what to put
// in front of them today.
//
// Days are the device's own days, not 24-hour blocks: an ayah declared last
// night at eleven is due today, not tomorrow night.
// =============================================================================

import { ayahKey, type ChildProfile } from "@/lib/hifz-store";
import { JOURNEY_SURAHS, ayahCountOf } from "@/lib/juz-amma";

export const REVIEW_STEPS_DAYS = [1, 3, 7, 14, 30] as const;

/** Local midnight-based day number, so "yesterday" means what a family means. */
export function dayNumber(at: number): number {
  const date = new Date(at);
  return Math.floor((at - date.getTimezoneOffset() * 60_000) / 86_400_000);
}

export type DueAyah = { surah: number; ayah: number; dueDay: number; step: number; overdueDays: number };

/** The day this ayah is next due, or null when it was never declared. */
export function dueDayFor(record: { declaredAt?: number; reviews: number[]; forgotAt?: number } | undefined): { dueDay: number; step: number } | null {
  if (!record?.declaredAt) return null;
  const lastReview = record.reviews.length ? Math.max(...record.reviews) : null;
  // Forgetting it since the last review puts the ayah back at the start of the
  // spacing: it returns tomorrow, not in a week.
  if (record.forgotAt && (lastReview === null || record.forgotAt > lastReview)) {
    return { dueDay: dayNumber(record.forgotAt) + REVIEW_STEPS_DAYS[0], step: 0 };
  }
  const step = Math.min(record.reviews.length, REVIEW_STEPS_DAYS.length - 1);
  return { dueDay: dayNumber(lastReview ?? record.declaredAt) + REVIEW_STEPS_DAYS[step], step };
}

/** Everything due today or overdue, oldest first, then by surah order. */
export function reviewQueue(profile: ChildProfile, now = Date.now()): DueAyah[] {
  const today = dayNumber(now);
  const due: DueAyah[] = [];
  for (const surah of JOURNEY_SURAHS) {
    const total = ayahCountOf(surah);
    for (let ayah = 1; ayah <= total; ayah++) {
      const schedule = dueDayFor(profile.ayahs[ayahKey(surah, ayah)]);
      if (!schedule || schedule.dueDay > today) continue;
      due.push({ surah, ayah, dueDay: schedule.dueDay, step: schedule.step, overdueDays: today - schedule.dueDay });
    }
  }
  return due.sort((a, b) => a.dueDay - b.dueDay || JOURNEY_SURAHS.indexOf(a.surah) - JOURNEY_SURAHS.indexOf(b.surah) || a.ayah - b.ayah);
}

export const dueCount = (profile: ChildProfile, now = Date.now()) => reviewQueue(profile, now).length;

/** The next day anything is due, for a child with nothing to review now. */
export function nextDueDay(profile: ChildProfile, now = Date.now()): number | null {
  const today = dayNumber(now);
  let soonest: number | null = null;
  for (const surah of JOURNEY_SURAHS) {
    const total = ayahCountOf(surah);
    for (let ayah = 1; ayah <= total; ayah++) {
      const schedule = dueDayFor(profile.ayahs[ayahKey(surah, ayah)]);
      if (!schedule || schedule.dueDay <= today) continue;
      if (soonest === null || schedule.dueDay < soonest) soonest = schedule.dueDay;
    }
  }
  return soonest;
}

// ---------------------------------------------------------------------------
// Days the child showed up
// ---------------------------------------------------------------------------

/** Every day this child did anything at all, oldest first. */
export function activeDays(profile: ChildProfile): number[] {
  const days = new Set<number>();
  for (const record of Object.values(profile.ayahs)) {
    for (const at of [record.listenedAt, record.recordedAt, record.declaredAt, record.forgotAt, ...record.reviews]) {
      if (at) days.add(dayNumber(at));
    }
  }
  return Array.from(days).sort((a, b) => a - b);
}

/**
 * Days in a row, with one day of grace.
 *
 * A child who misses a single day keeps their streak: the point is to bring
 * them back, not to punish a day at their grandmother's. Two missed days start
 * it again — after that it is not a run any more.
 */
export function streakDays(profile: ChildProfile, now = Date.now()): number {
  const days = activeDays(profile);
  if (days.length === 0) return 0;
  const today = dayNumber(now);
  const last = days[days.length - 1];
  if (today - last > 1) return 0;

  let streak = 1;
  for (let i = days.length - 1; i > 0; i--) {
    const gap = days[i] - days[i - 1];
    if (gap <= 2) streak++; // one day missed between them is forgiven
    else break;
  }
  return streak;
}

export const wasActiveToday = (profile: ChildProfile, now = Date.now()) =>
  activeDays(profile).includes(dayNumber(now));

// ---------------------------------------------------------------------------
// Today
// ---------------------------------------------------------------------------

export type TodayPlan = {
  due: number;
  /** ayahs reviewed today out of what was due when the day started */
  reviewedToday: number;
  /** an ayah heard for the first time today */
  learnedToday: number;
  streak: number;
  done: boolean;
};

/** What today asks for: clear the review queue, and meet one new ayah. */
export function todayPlan(profile: ChildProfile, now = Date.now()): TodayPlan {
  const today = dayNumber(now);
  let reviewedToday = 0;
  let learnedToday = 0;
  for (const record of Object.values(profile.ayahs)) {
    // Saying "I forgot it" is still turning up for the ayah.
    if (record.reviews.some(at => dayNumber(at) === today) || (record.forgotAt && dayNumber(record.forgotAt) === today)) reviewedToday++;
    if (record.listenedAt && dayNumber(record.listenedAt) === today) learnedToday++;
  }
  const due = dueCount(profile, now);
  return { due, reviewedToday, learnedToday, streak: streakDays(profile, now), done: due === 0 && (reviewedToday > 0 || learnedToday > 0) };
}
