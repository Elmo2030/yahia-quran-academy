// =============================================================================
// juz-amma.ts — the surahs the memorization journey covers, in journey order.
//
// Al-Fatiha first, then Juz Amma from an-Nas back to an-Naba': children learn
// the short surahs at the end of the mushaf before the longer ones before them.
// =============================================================================

import { ayahCounts } from "@/lib/surah-ayah-counts.generated";

export const JOURNEY_SURAHS: readonly number[] = [1, ...Array.from({ length: 37 }, (_, i) => 114 - i)];

export const isJourneySurah = (surah: number) => JOURNEY_SURAHS.includes(surah);

export const ayahCountOf = (surah: number) => ayahCounts[surah - 1] ?? 0;

/** The surah after this one on the journey, or null at the end. */
export function nextJourneySurah(surah: number): number | null {
  const index = JOURNEY_SURAHS.indexOf(surah);
  return index >= 0 && index < JOURNEY_SURAHS.length - 1 ? JOURNEY_SURAHS[index + 1] : null;
}
