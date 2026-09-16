// =============================================================================
// quran-facts-index.ts — the small amount of knowing the facts section needs.
//
// Three things, none of which belong in the content file itself:
//
//   * which surah a fact points at, read off the reference it already carries,
//     so a card about Surah An-Naml can offer to open and play An-Naml rather
//     than being the end of the road;
//   * which fact belongs to today, the same one for everybody, decided by the
//     date and nothing else — no storage, no randomness, no server;
//   * a fact by its slug, for the page each one now has.
// =============================================================================

import { quranFacts, type QuranFact } from "@/content/quran-facts";
import { surahNames } from "@/lib/quran-content";
import { indexOfTheDay } from "@/lib/fact-of-the-day";

const bySlug = new Map(quranFacts.map(fact => [fact.slug, fact]));

export const factBySlug = (slug: string): QuranFact | undefined => bySlug.get(slug);

// ---------------------------------------------------------------------------
// The surah behind a card
// ---------------------------------------------------------------------------

/** Names as the mushaf writes them, cleaned the way a reference writes them. */
const tidy = (name: string) =>
  name.normalize("NFD").replace(/[ؐ-ًؚ-ٰٟ]/g, "").normalize("NFC")
    .replace(/[آأإٱ]/g, "ا")
    .replace(/ـ/g, "")
    .trim();

const numberOfName = new Map(surahNames.map((name, index) => [tidy(name), index + 1]));

/**
 * The surah a fact's first reference names, or null.
 *
 * References are written the way a reader writes them — "النمل: 30",
 * "آل عمران: 190", "ص: 1" — so the name is whatever sits before the colon.
 * A fact with no ayah (how many verses the Quran has, how the parts are
 * divided) points at no surah, and says so by returning null rather than
 * guessing at one.
 */
export function surahOfFact(fact: QuranFact): number | null {
  const ref = fact.ayahs[0]?.ref;
  if (!ref) return null;
  const name = tidy(ref.split(":")[0] ?? "");
  return numberOfName.get(name) ?? null;
}

// ---------------------------------------------------------------------------
// Today's card
// ---------------------------------------------------------------------------

/**
 * One fact for the day, the same one for every reader on that date.
 *
 * The arithmetic lives in fact-of-the-day.ts, which imports nothing, so the
 * home page can pick today's fact off the small generated index without
 * pulling the hundred facts into the file every visitor downloads first.
 */
export function factOfTheDay(at: number | Date = Date.now()): QuranFact {
  return quranFacts[indexOfTheDay(quranFacts.length, at)];
}
