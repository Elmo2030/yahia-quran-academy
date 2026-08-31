/**
 * Writing direction.
 *
 * Every bilingual block on these pages must take its direction from the
 * locale. A hard-coded dir="rtl" lays English out right-to-left — it looks
 * like a stray full stop at the start of a line, which is easy to miss in
 * review and was shipped twice before this test existed.
 *
 * The allowed exceptions are Arabic that stays Arabic in both languages: the
 * ayah excerpt and the surah names, which are the Quran's own words. English
 * translations of surah names are rendered beside them, not in place of them.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const PAGES = ["Stories.tsx", "Seerah.tsx", "Home.tsx"];
const ALLOWED = [
  '<blockquote lang="ar" dir="rtl">', // the ayah
  "{getSurahName(", // surah names, shown in Arabic in both locales
];

describe("writing direction", () => {
  for (const page of PAGES) {
    it(`${page} takes its direction from the locale`, () => {
      const source = readFileSync(join(__dirname, page), "utf8");
      const hardCoded = source
        .split("\n")
        .map((line, index) => ({ line: line.trim(), number: index + 1 }))
        .filter(({ line }) => /dir="(rtl|ltr)"/.test(line))
        // skip comments — a line describing the rule is not a violation of it
        .filter(({ line }) => !line.startsWith("*") && !line.startsWith("//") && !line.startsWith("/*"))
        .filter(({ line }) => !ALLOWED.some(allowed => line.includes(allowed)));
      expect(hardCoded.map(h => `${page}:${h.number}`)).toEqual([]);
    });
  }
});
