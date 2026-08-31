/**
 * Seerah content integrity.
 *
 * The MCQ answers are zero-indexed and were hand-converted from a JSON
 * blueprint — an off-by-one there marks the wrong option correct and nothing
 * in the app would ever complain. Slugs also double as image filenames and
 * URLs, so a duplicate silently steals another story's page.
 */
import { describe, expect, it } from "vitest";

import { seerahStations, seerahStories, seerahStationOf, seerahTextFor } from "@/content/seerah";

describe("seerah content", () => {
  it("gives every story a station that exists", () => {
    for (const story of seerahStories) {
      expect(
        seerahStations.some(station => station.stationId === story.stationId),
        story.slug,
      ).toBe(true);
      expect(seerahStationOf(story).stationId).toBe(story.stationId);
    }
  });

  it("keeps slugs and story ids unique", () => {
    const slugs = seerahStories.map(s => s.slug);
    const ids = seerahStories.map(s => s.storyId);
    expect(new Set(slugs).size, `duplicate slug in ${slugs.join(", ")}`).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("points every correct answer at a real option, in both languages", () => {
    for (const story of seerahStories) {
      for (const locale of ["ar", "en"] as const) {
        const label = `${story.slug} (${locale})`;
        const { options, correctAnswer } = seerahTextFor(story, locale).interactive.challenge;
        expect(options.length, label).toBeGreaterThanOrEqual(2);
        expect(correctAnswer, label).toBeGreaterThanOrEqual(0);
        expect(correctAnswer, label).toBeLessThan(options.length);
        expect(options[correctAnswer], label).toBeTruthy();
      }
    }
  });

  it("translates every story, with no Arabic left in the English", () => {
    const arabic = /[\u0600-\u06FF]/;
    for (const story of seerahStories) {
      expect(story.en, story.slug).toBeDefined();
      const en = seerahTextFor(story, "en");
      expect(en.title, story.slug).not.toBe(story.title);
      // Emoji and the reliability marker are fine; prose is not.
      for (const [field, value] of [
        ["title", en.title],
        ["tier 1", en.content.tier_1_age_6_8.narrative],
        ["tier 2", en.content.tier_2_age_9_11.narrative],
        ["lesson", en.content.tier_1_age_6_8.shortLesson],
        ["discover", en.interactive.discover],
        ["question", en.interactive.challenge.question],
        ["badge", en.gamification.badge],
      ] as const) {
        expect(arabic.test(value), `${story.slug} — ${field}`).toBe(false);
      }
    }
  });

  it("names every station in both languages", () => {
    for (const station of seerahStations) {
      expect(station.titleEn, String(station.stationId)).toBeTruthy();
      expect(station.descriptionEn, String(station.stationId)).toBeTruthy();
      expect(station.titleEn).not.toBe(station.titleAr);
    }
  });

  it("fills both age tiers for every story", () => {
    for (const story of seerahStories) {
      expect(story.content.tier_1_age_6_8.narrative.length, story.slug).toBeGreaterThan(40);
      expect(story.content.tier_1_age_6_8.shortLesson, story.slug).toBeTruthy();
      expect(story.content.tier_2_age_9_11.narrative.length, story.slug).toBeGreaterThan(40);
      expect(story.content.tier_2_age_9_11.details, story.slug).toBeTruthy();
      expect(story.interactive.discover, story.slug).toBeTruthy();
      expect(story.interactive.thinkQuestion, story.slug).toBeTruthy();
      expect(story.source.reference, story.slug).toBeTruthy();
    }
  });

  it("has no station left without stories", () => {
    for (const station of seerahStations) {
      const count = seerahStories.filter(s => s.stationId === station.stationId).length;
      expect(count, station.titleAr).toBeGreaterThan(0);
    }
  });
});
