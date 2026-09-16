/**
 * Quran-story content integrity.
 *
 * The English arrived in batches keyed by slug, and several batches used
 * different slugs than this site does (salih/saleh, musa/musa-and-harun) or
 * named stories that do not exist here. These tests make the state of the
 * translation visible instead of leaving it to be noticed on a page.
 */
import { describe, expect, it } from "vitest";

import { chapters, stories, storyTextFor } from "@/content/stories";

/** Stories still awaiting an English translation. Shrink this list; do not grow it.
 *  It is empty: every story reads in both languages. A new story without an
 *  `en` block fails this rather than quietly serving Arabic to English readers. */
const UNTRANSLATED: string[] = [];

const key = (s: { chapter: string; slug: string }) => `${s.chapter}/${s.slug}`;

describe("story content", () => {
  it("keeps every story in a chapter that exists", () => {
    for (const story of stories) {
      expect(chapters.some(c => c.slug === story.chapter), key(story)).toBe(true);
    }
  });

  // Two women slugs use underscores where every other slug uses hyphens.
  // They are live URLs, so renaming them would break links; this records the
  // inconsistency so a new story does not copy it.
  it("uses hyphens in new slugs", () => {
    const legacy = new Set(["imraat_alaziz", "nuh_lut"]);
    for (const story of stories) {
      if (legacy.has(story.slug)) continue;
      expect(story.slug, key(story)).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("keeps slugs unique within a chapter", () => {
    const keys = stories.map(key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("tracks exactly which stories are still untranslated", () => {
    const missing = stories.filter(s => !s.en).map(key).sort();
    expect(missing).toEqual([...UNTRANSLATED].sort());
  });

  it("leaves no Arabic in the English prose", () => {
    const arabic = /[؀-ۿ]/;
    for (const story of stories) {
      if (!story.en) continue;
      const en = storyTextFor(story, "en");
      for (const [field, value] of [
        ["title", en.title],
        ["hook", en.hook],
        ["events", en.events],
        ["lesson", en.lesson],
        ["next", en.next],
      ] as const) {
        expect(arabic.test(value), `${key(story)} — ${field}`).toBe(false);
      }
    }
  });

  it("falls back to Arabic for anything untranslated", () => {
    for (const story of stories) {
      if (story.en) continue;
      expect(storyTextFor(story, "en").title, key(story)).toBe(story.title);
    }
  });
});

/**
 * These stories are told to a child as true, so each has to say what in it is
 * the Quran's own words and what is a name or a detail from somewhere else —
 * Hawwa, Sarah, Bilqis and Uzair are not named in the Quran, and a parent who
 * finds that out later should have found it here first.
 */
describe("every story says where it comes from", () => {
  it("carries a source in both languages", () => {
    for (const story of stories) {
      expect(story.source, story.slug).toBeTruthy();
      for (const field of ["reference", "note"] as const) {
        expect(story.source[field].ar.length, `${story.slug} ${field} ar`).toBeGreaterThan(15);
        expect(story.source[field].en.length, `${story.slug} ${field} en`).toBeGreaterThan(15);
      }
      expect(["🟢", "🟡"], story.slug).toContain(story.source.reliability);
    }
  });

  it("says what is unsettled on any story awaiting review", () => {
    for (const story of stories.filter(entry => entry.source.reliability === "🟡")) {
      expect(story.source.note.ar, story.slug).toMatch(/مراجعت|قرارك|يختلف|أقوال/);
    }
  });

  /** The names the Quran never gives are the ones easiest to pass off. */
  it("says plainly that the unnamed women are unnamed in the Quran", () => {
    for (const slug of ["hawwa", "sarah", "bilqis", "asiya", "imraat_alaziz"]) {
      const story = stories.find(entry => entry.slug === slug);
      expect(story?.source.note.ar, slug).toMatch(/لم يسمِّها|لم يذكر اسم|لم يذكر القرآن اسمها/);
    }
  });
});

/**
 * Every story ends in a question the child can actually answer from what they
 * just read, and a medal they only see once they have. The Seerah and the
 * creed have had this from the start; these forty-two were the section a child
 * could only read at.
 */
describe("every story ends in a question", () => {
  it("has three options and a real answer, in both languages", () => {
    for (const story of stories) {
      for (const challenge of [story.challenge, story.en?.challenge]) {
        if (!challenge) continue;
        expect(challenge.options.length, story.slug).toBe(3);
        expect(new Set(challenge.options).size, `${story.slug} repeats an option`).toBe(3);
        expect(challenge.correctAnswer, story.slug).toBeGreaterThanOrEqual(0);
        expect(challenge.correctAnswer, story.slug).toBeLessThan(challenge.options.length);
        expect(challenge.question.length, story.slug).toBeGreaterThan(10);
      }
    }
  });

  /** A translated question that points at a different option than the Arabic
   *  one would mark a right answer wrong for English readers. */
  it("marks the same answer in Arabic and in English", () => {
    for (const story of stories) {
      if (!story.en?.challenge) continue;
      expect(story.en.challenge.correctAnswer, story.slug).toBe(story.challenge.correctAnswer);
    }
  });

  it("gives a medal with a name and a keepsake", () => {
    for (const story of stories) {
      for (const reward of [story.reward, story.en?.reward]) {
        if (!reward) continue;
        expect(reward.badge.length, story.slug).toBeGreaterThan(2);
        expect(reward.keepsake.length, story.slug).toBeGreaterThan(2);
        expect(reward.note.length, story.slug).toBeGreaterThan(15);
        expect(reward.icon.length, story.slug).toBeGreaterThan(0);
      }
    }
  });
});
