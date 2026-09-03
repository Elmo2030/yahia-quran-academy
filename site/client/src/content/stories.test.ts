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
