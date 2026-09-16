// =============================================================================
// hifz-stars.ts — what a star means, and what it does not.
//
// A star is never a score for how well a child recited: the site cannot hear
// that. Each one marks something it actually observed:
//
//   ★    every ayah of the surah listened to, with the repeats the child chose
//   ★★   every ayah recorded in the child's own voice
//   ★★★  every ayah declared memorized, and revisited on a later day
//
// The third star deliberately needs a second day. Saying "I know it" and
// proving it tomorrow are different things, and the only one of the two the
// site can see is that the child came back.
// =============================================================================

import { ayahKey, type ChildProfile } from "@/lib/hifz-store";
import { JOURNEY_SURAHS, ayahCountOf } from "@/lib/juz-amma";

export type Stars = 0 | 1 | 2 | 3;

const DAY = 86_400_000;
const dayOf = (ms: number) => Math.floor(ms / DAY);

/** A declaration revisited on a later day than it was made. */
function revisitedLater(declaredAt: number, reviews: number[], recordedAt?: number) {
  const declaredDay = dayOf(declaredAt);
  return [...reviews, ...(recordedAt ? [recordedAt] : [])].some(at => dayOf(at) > declaredDay);
}

export function starsFor(profile: ChildProfile, surah: number, total = ayahCountOf(surah)): Stars {
  if (total <= 0) return 0;
  let listened = 0, recorded = 0, declared = 0, revisited = 0;
  for (let ayah = 1; ayah <= total; ayah++) {
    const record = profile.ayahs[ayahKey(surah, ayah)];
    if (!record) continue;
    if (record.listenedAt) listened++;
    if (record.recordedAt) recorded++;
    if (record.declaredAt) {
      declared++;
      if (revisitedLater(record.declaredAt, record.reviews, record.recordedAt)) revisited++;
    }
  }
  if (declared === total && revisited === total) return 3;
  if (recorded === total) return 2;
  if (listened === total) return 1;
  return 0;
}

/** What the child still has to do for the next star on this surah. */
export type NextStarHint = "listen" | "record" | "declare" | "revisit" | null;

export function nextStarHint(profile: ChildProfile, surah: number, total = ayahCountOf(surah)): NextStarHint {
  const stars = starsFor(profile, surah, total);
  if (stars === 3) return null;
  if (stars === 2) {
    const declared = countWhere(profile, surah, total, r => Boolean(r.declaredAt));
    return declared === total ? "revisit" : "declare";
  }
  if (stars === 1) return "record";
  return "listen";
}

function countWhere(profile: ChildProfile, surah: number, total: number, test: (r: NonNullable<ChildProfile["ayahs"][string]>) => boolean) {
  let count = 0;
  for (let ayah = 1; ayah <= total; ayah++) {
    const record = profile.ayahs[ayahKey(surah, ayah)];
    if (record && test(record)) count++;
  }
  return count;
}

export const totalStars = (profile: ChildProfile) =>
  JOURNEY_SURAHS.reduce((sum, surah) => sum + starsFor(profile, surah), 0);

// ---------------------------------------------------------------------------
// Ranks
// ---------------------------------------------------------------------------

export type Rank = { level: 1 | 2 | 3 | 4 | 5; nameAr: string; nameEn: string; stars: number };

/** Thresholds out of 114 possible stars (38 surahs × 3). */
export const RANKS: Rank[] = [
  { level: 1, nameAr: "مستكشف صغير", nameEn: "Little explorer", stars: 0 },
  { level: 2, nameAr: "مسافر نشيط", nameEn: "Busy traveller", stars: 8 },
  { level: 3, nameAr: "صاحب الهمّة", nameEn: "Steady heart", stars: 25 },
  { level: 4, nameAr: "رفيق القرآن", nameEn: "Companion of the Quran", stars: 55 },
  { level: 5, nameAr: "نجم الرحلة", nameEn: "Star of the journey", stars: 95 },
];

export const rankFor = (stars: number): Rank =>
  [...RANKS].reverse().find(rank => stars >= rank.stars) ?? RANKS[0];

/** The rank after this one, and how many stars are still needed for it. */
export function nextRank(stars: number): { rank: Rank; remaining: number } | null {
  const upcoming = RANKS.find(rank => rank.stars > stars);
  return upcoming ? { rank: upcoming, remaining: upcoming.stars - stars } : null;
}
