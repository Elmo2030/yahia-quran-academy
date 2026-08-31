import { readFileSync } from "node:fs";
import { resolve } from "node:path";
/**
 * The facts carry Quranic text, so the checks are about integrity rather than
 * taste: every card must exist in both languages, every ayah must stay in
 * Arabic, and no card may claim another's number or slug — the number is what
 * a child sees on the face-down card and what the progress store keys on.
 */
import { describe, expect, it } from "vitest";

import { quranFacts } from "@/content/quran-facts";

const arabic = /[؀-ۿ]/;

describe("quran facts", () => {
  it("numbers the cards 1..n with no gaps", () => {
    expect(quranFacts.map(f => f.number)).toEqual(quranFacts.map((_, i) => i + 1));
  });

  it("keeps slugs unique", () => {
    const slugs = quranFacts.map(f => f.slug);
    expect(new Set(slugs).size, slugs.join(", ")).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("writes every card in both languages", () => {
    for (const fact of quranFacts) {
      expect(fact.title.ar, fact.slug).toBeTruthy();
      expect(fact.title.en, fact.slug).toBeTruthy();
      expect(fact.body.ar.length, fact.slug).toBeGreaterThan(30);
      expect(fact.body.en.length, fact.slug).toBeGreaterThan(30);
    }
  });

  it("leaves no Arabic in the English prose", () => {
    for (const fact of quranFacts) {
      // The one exception is a Quranic word quoted inside the English sentence,
      // which is deliberate — it is the thing being described.
      const withoutQuoted = fact.body.en.replace(/﴿[^﴾]*﴾/g, "");
      expect(arabic.test(fact.title.en), `${fact.slug} — title`).toBe(false);
      expect(arabic.test(withoutQuoted), `${fact.slug} — body`).toBe(false);
    }
  });

  it("keeps every ayah in Arabic, with a reference", () => {
    for (const fact of quranFacts) {
      for (const ayah of fact.ayahs) {
        expect(arabic.test(ayah.text), fact.slug).toBe(true);
        expect(ayah.ref, fact.slug).toMatch(/:\s*\d/);
      }
    }
  });

  it("names an icon the page can render", () => {
    const page = readFileSync(
      resolve(process.cwd(), "client/src/pages/QuranFacts.tsx"),
      "utf8",
    );
    const map = page.slice(page.indexOf("const ICONS"), page.indexOf("};", page.indexOf("const ICONS")));
    const known = new Set(map.match(/[A-Z][A-Za-z0-9]+/g) ?? []);
    for (const fact of quranFacts) expect(known.has(fact.icon), fact.slug).toBe(true);
  });

  // The quiz offers titles as the answer options, so two cards sharing a title
  // would make a question with no single right answer.
  it("gives every fact a title of its own in both languages", () => {
    for (const locale of ["ar", "en"] as const) {
      const seen = new Map<string, string>();
      for (const fact of quranFacts) {
        const title = fact.title[locale];
        expect(seen.get(title), `${locale}: ${fact.slug} repeats ${seen.get(title)}`).toBeUndefined();
        seen.set(title, fact.slug);
      }
    }
  });
});
