import { describe, expect, it } from "vitest";

import { quranFacts } from "@/content/quran-facts";
import { factBySlug, factOfTheDay, surahOfFact } from "./quran-facts-index";

describe("the surah behind a card", () => {
  it("reads the surah off the reference the card already carries", () => {
    expect(surahOfFact(factBySlug("bismillah")!)).toBe(27);   // النمل
    expect(surahOfFact(factBySlug("ayat-al-kursi")!)).toBe(2); // البقرة
    expect(surahOfFact(factBySlug("rabbi-zidni-ilma")!)).toBe(20); // طه
    expect(surahOfFact(factBySlug("quran-as-reminder")!)).toBe(38); // ص
    expect(surahOfFact(factBySlug("reflect-on-creation")!)).toBe(3); // آل عمران
  });

  it("points at no surah rather than guessing at one", () => {
    // How many verses the Quran has belongs to no single surah.
    expect(surahOfFact(factBySlug("verse-count")!)).toBeNull();
    expect(surahOfFact(factBySlug("thirty-parts")!)).toBeNull();
  });

  /** A name that fails to resolve would silently send a child to the wrong
   *  surah, which is worse than sending them nowhere. */
  it("resolves every reference it does find", () => {
    for (const fact of quranFacts) {
      if (!fact.ayahs.length) continue;
      const surah = surahOfFact(fact);
      expect(surah, `${fact.slug} — ${fact.ayahs[0].ref}`).not.toBeNull();
      expect(surah, fact.slug).toBeGreaterThanOrEqual(1);
      expect(surah, fact.slug).toBeLessThanOrEqual(114);
    }
  });
});

describe("the fact of the day", () => {
  it("is the same for everyone on the same date, and changes with it", () => {
    const monday = new Date(2026, 8, 14);
    expect(factOfTheDay(monday).slug).toBe(factOfTheDay(new Date(2026, 8, 14, 23, 59)).slug);
    expect(factOfTheDay(monday).slug).not.toBe(factOfTheDay(new Date(2026, 8, 15)).slug);
  });

  /** A random pick repeats within a fortnight; a child who meets the same
   *  "discovery of the day" twice in a month learns it is not really one. */
  it("shows all hundred before repeating any", () => {
    const start = new Date(2026, 0, 1);
    const seen = new Set<string>();
    for (let i = 0; i < quranFacts.length; i++) {
      seen.add(factOfTheDay(new Date(2026, 0, 1 + i)).slug);
    }
    expect(seen.size).toBe(quranFacts.length);
    expect(start).toBeTruthy();
  });
});
