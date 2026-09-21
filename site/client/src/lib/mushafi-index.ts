/**
 * The mushaf reader's Surah index. Names come from the project's verified
 * surah list (quran-content.ts). Start pages are deliberately left
 * unverified: no metadata source in this project maps a surah to its mushaf
 * page number yet, and Quran metadata must never be guessed. The UI shows
 * "قيد التحقق" instead of a number until a verified source is added.
 */
import { surahNames, englishSurahNames } from "@/lib/quran-content";

export type MushafiIndexEntry = {
  number: number;
  name: string;
  englishName: string;
  /** Mushaf start page, once a verified source exists. Never guessed. */
  startPage: number | null;
};

export const MUSHAFI_SURAH_INDEX: readonly MushafiIndexEntry[] = surahNames.map((name, i) => ({
  number: i + 1,
  name,
  englishName: englishSurahNames[i] ?? "",
  startPage: null,
}));

export function searchMushafiIndex(query: string): readonly MushafiIndexEntry[] {
  const q = query.trim();
  if (!q) return MUSHAFI_SURAH_INDEX;
  const normalized = q.replace(/[إأآا]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه");
  return MUSHAFI_SURAH_INDEX.filter(entry => {
    const name = entry.name.replace(/[إأآا]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه");
    return name.includes(normalized)
      || entry.englishName.toLowerCase().includes(q.toLowerCase())
      || String(entry.number) === q;
  });
}
