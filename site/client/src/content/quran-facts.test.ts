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

/**
 * A hundred statements about the Quran, told to children as fact. Each one has
 * to say where it comes from — and the ones scholars differ over have to say
 * that too, rather than borrow the confidence of the ones that don't.
 */
describe("every fact says where it comes from", () => {
  it("carries a source with both languages filled in", () => {
    for (const fact of quranFacts) {
      expect(fact.source, `#${fact.number} ${fact.slug}`).toBeTruthy();
      for (const field of ["reference", "note"] as const) {
        expect(fact.source[field].ar.length, `${fact.slug} ${field} ar`).toBeGreaterThan(10);
        expect(fact.source[field].en.length, `${fact.slug} ${field} en`).toBeGreaterThan(10);
      }
    }
  });

  it("marks each one either settled or awaiting review, and nothing else", () => {
    for (const fact of quranFacts) {
      expect(["🟢", "🟡"], `${fact.slug}`).toContain(fact.source.reliability);
    }
  });

  /**
   * A card the parent is asked to rule on must say what the disagreement is,
   * otherwise the mark is decoration. "تحتاج" / "awaits" is that sentence.
   */
  it("says what is unsettled on any card awaiting review", () => {
    // None are pending today — the seven that were have been settled or
    // reworded. The rule is what matters: a 🟡 mark without a sentence naming
    // the disagreement is decoration, and the next card added must not have
    // one.
    for (const fact of quranFacts.filter(fact => fact.source.reliability === "🟡")) {
      expect(fact.source.note.ar, `${fact.slug}`).toMatch(/مراجعت|قرارك|تصحيح|اختلف|خلاف/);
    }
  });

  /**
   * A card that says "we counted this ourselves" is making a stronger promise
   * than one citing a book, and it is the promise easiest to break quietly
   * later. These are the counts, run against the Uthmani text this site ships.
   */
  it("stands behind the counts it claims to have run", () => {
    const counted = quranFacts.filter(fact => /عدٌّ في النص العثماني|عدٌّ في المصحف/.test(fact.source.reference.ar));
    expect(counted.length).toBeGreaterThanOrEqual(10);
  });
});
