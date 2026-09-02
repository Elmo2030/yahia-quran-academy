/**
 * The creed section in both languages.
 *
 * The Arabic is the source text; the English is a translation of it. What has
 * to hold between them is that they answer the same question with the same
 * option, and that no Arabic is left in the English — a reader who switched
 * language once found half a page still in the other one.
 */
import { describe, expect, it } from "vitest";

import { aqeedahCards, aqeedahChapters, aqeedahTextFor } from "./aqeedah";

const ARABIC = /[؀-ۿ]/;

describe("the creed cards", () => {
  it("keeps every card in a chapter that exists", () => {
    const slugs = new Set(aqeedahChapters.map(c => c.slug));
    for (const card of aqeedahCards) expect(slugs.has(card.chapter), card.slug).toBe(true);
  });

  it("gives every card a unique address", () => {
    const slugs = aqeedahCards.map(c => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("carries an ayah with its reference on every card", () => {
    for (const card of aqeedahCards) {
      expect(card.ayah.text, card.slug).toMatch(ARABIC);
      expect(card.ayah.ref, card.slug).toBeTruthy();
    }
  });

  it("describes every chapter in both languages", () => {
    for (const chapter of aqeedahChapters) {
      expect(chapter.descriptionAr, chapter.slug).toBeTruthy();
      expect(chapter.descriptionEn, chapter.slug).toBeTruthy();
      expect(chapter.titleEn, chapter.slug).toBeTruthy();
      // Each description states how many cards the chapter holds; the parse of
      // the source document attached those lines to the wrong chapters once.
      const count = aqeedahCards.filter(c => c.chapter === chapter.slug).length;
      expect(count, chapter.slug).toBeGreaterThan(0);
    }
    expect(aqeedahCards.length).toBe(32);
  });

  it("translates every card", () => {
    for (const card of aqeedahCards) expect(card.en, card.slug).toBeTruthy();
  });

  it("asks the same question in both languages, with the same answer", () => {
    for (const card of aqeedahCards) {
      const ar = aqeedahTextFor(card, "ar").challenge;
      const en = aqeedahTextFor(card, "en").challenge;
      expect(en.options.length, card.slug).toBe(ar.options.length);
      expect(en.correctAnswer, card.slug).toBe(ar.correctAnswer);
    }
  });

  it("leaves no Arabic prose on the English card", () => {
    for (const card of aqeedahCards) {
      const en = aqeedahTextFor(card, "en");
      const prose = [en.title, en.value, en.story, en.didYouKnow, en.valueName,
        en.thinkQuestion, en.challenge.question, ...en.challenge.options,
        en.artifact, en.badge, en.source.reference, en.source.note];
      for (const line of prose) {
        // ﷺ and the like are welcome; a whole Arabic sentence is not.
        const arabicRun = line.match(/[؀-ۿ][؀-ۿ\s]{6,}/);
        expect(arabicRun?.[0], `${card.slug}: ${line.slice(0, 40)}`).toBeUndefined();
      }
      if (card.more) expect(card.more.labelEn, card.slug).toBeTruthy();
    }
  });
});
