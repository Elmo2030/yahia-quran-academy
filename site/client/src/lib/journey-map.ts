// =============================================================================
// journey-map.ts — where each surah sits on the Juz Amma map.
//
// Four regions, painted bottom to top the way the journey runs: the oasis where
// al-Fatiha and the short surahs are, then the valley, the hills, and the
// mountains under the first stars. A region's stations zig-zag up its own
// background, so the path never runs straight through the middle of the art.
// =============================================================================

import { JOURNEY_SURAHS } from "@/lib/juz-amma";

export type Region = {
  id: "oasis" | "valley" | "hills" | "sky";
  nameAr: string;
  nameEn: string;
  /** file stem under /hifz-art/map and the treasure under /hifz-art/rewards */
  art: string;
  treasure: string;
  surahs: number[];
};

const slice = (from: number, to: number) => JOURNEY_SURAHS.slice(from, to);

export const REGIONS: Region[] = [
  { id: "oasis", nameAr: "واحة البداية", nameEn: "The first oasis", art: "1-oasis", treasure: "treasure-1", surahs: slice(0, 10) },
  { id: "valley", nameAr: "وادي النخيل", nameEn: "The palm valley", art: "2-valley", treasure: "treasure-2", surahs: slice(10, 20) },
  { id: "hills", nameAr: "تلال النور", nameEn: "The hills of light", art: "3-hills", treasure: "treasure-3", surahs: slice(20, 29) },
  { id: "sky", nameAr: "جبال السماء", nameEn: "The sky mountains", art: "4-sky", treasure: "treasure-4", surahs: slice(29, 38) },
];

export type Station = { surah: number; x: number; y: number };

/**
 * Station positions as percentages of the region, bottom-first.
 * The winding is a fixed pattern rather than random: a child should find the
 * same surah in the same place every time they open the map.
 */
export function stationsOf(region: Region): Station[] {
  const count = region.surahs.length;
  const sway = [0, 1, 2, 1, 0, -1, -2, -1];
  return region.surahs.map((surah, index) => ({
    surah,
    // 8% of the region's height is left free at each end for the joins.
    y: 92 - ((index + 0.5) / count) * 84,
    x: 50 + sway[index % sway.length] * 13,
  }));
}

export const regionOf = (surah: number) => REGIONS.find(region => region.surahs.includes(surah)) ?? REGIONS[0];
