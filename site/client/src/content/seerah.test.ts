/**
 * Seerah content integrity.
 *
 * The MCQ answers are zero-indexed and were hand-converted from a JSON
 * blueprint — an off-by-one there marks the wrong option correct and nothing
 * in the app would ever complain. Slugs also double as image filenames and
 * URLs, so a duplicate silently steals another story's page.
 */
import { describe, expect, it } from "vitest";

import { seerahStations, seerahStories, seerahStationOf, seerahTextFor, type SeerahStory } from "@/content/seerah";
import { seerahEnglish } from "@/content/seerah-en";
import { seerahStationOnePilot } from "@/content/seerah-pilot-station-1";
import { seerahStationTwoPilot } from "@/content/seerah-pilot-station-2";
import { seerahStationThreePilot } from "@/content/seerah-pilot-station-3";
import { seerahStationFourPilot } from "@/content/seerah-pilot-station-4";
import { seerahStationFivePilot } from "@/content/seerah-pilot-station-5";
import { seerahStationSixPilot } from "@/content/seerah-pilot-station-6";
import { seerahStationSevenPilot } from "@/content/seerah-pilot-station-7";
import { seerahStationEightPilot } from "@/content/seerah-pilot-station-8";
import { seerahStationNinePilot } from "@/content/seerah-pilot-station-9";
import { seerahStoryIndex } from "@/lib/page-index.generated";

const episodes = [
  seerahStationOnePilot, seerahStationTwoPilot, seerahStationThreePilot, seerahStationFourPilot, seerahStationFivePilot,
  seerahStationSixPilot, seerahStationSevenPilot, seerahStationEightPilot, seerahStationNinePilot,
].flat();
const episodeOf = (story: SeerahStory) => episodes.find(e => e.storyId === story.storyId);
const englishOf = (story: SeerahStory) => seerahEnglish[story.slug];
const textIn = (story: SeerahStory, locale: "ar" | "en") => seerahTextFor(story, locale === "en" ? englishOf(story) : undefined);

describe("seerah content", () => {
  it("keeps the shepherd narrative, question and source within the cited account in both languages", () => {
    const story = seerahStories.find(s => s.storyId === "st-1-05")!;
    const pilot = episodeOf(story)!;
    expect(story.slug).toBe("little-shepherd");
    expect(story.title).toBe(pilot.title);
    expect(story.hook).toBe(pilot.hook);
    expect(pilot.sunnah?.reference).toContain("2262");
    for (const locale of ["ar", "en"] as const) {
      const text = locale === "en" ? englishOf(story) : textIn(story, "ar");
      expect(text.source.reference).toContain("2262");
      expect(text.interactive.challenge.question).toContain("2262");
      expect(text.interactive.challenge.correctAnswer).toBe(1);
      expect(JSON.stringify(text)).not.toMatch(/wolves|green mountains|help his uncle|financial hardship|الذئاب|الجبال الخضراء|لمساعدة عمه|كان فقيراً/i);
    }
  });

  it("keeps the shepherd card and Home metadata derived from the source-aligned record", () => {
    const story = seerahStories.find(s => s.storyId === "st-1-05")!;
    const indexed = seerahStoryIndex.find(s => s.slug === story.slug)!;
    expect(indexed.title).toBe(story.title);
    expect(indexed.titleEn).toBe(englishOf(story).title);
    expect(episodeOf(story)!.childStory[0]).toContain(indexed.description.replace(/…$/, ""));
    expect(englishOf(story).content.tier_1_age_6_8.narrative).toContain(indexed.descriptionEn!.replace(/…$/, ""));
    expect(indexed.description).toContain("على قراريط");
    expect(indexed.descriptionEn).toContain("for payment");
  });
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
        const { options, correctAnswer } = textIn(story, locale).interactive.challenge;
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
      expect(englishOf(story), story.slug).toBeDefined();
      const en = englishOf(story);
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

  it("reads every Arabic story from its station text, and names it the same way everywhere", () => {
    // The station text is the Arabic Seerah (decided 2026-09-23). Cards,
    // links and search results take the title and hook from it, so none can
    // name a story differently from the page a child opens.
    expect(new Set(episodes.map(e => e.storyId)).size).toBe(episodes.length);
    expect(episodes.length).toBe(seerahStories.length);
    for (const story of seerahStories) {
      const episode = episodeOf(story);
      expect(episode, story.slug).toBeDefined();
      expect(story.title, story.slug).toBe(episode!.title);
      expect(story.hook, story.slug).toBe(episode!.hook);
      expect(episode!.childStory.join(" ").length, story.slug).toBeGreaterThan(40);
      expect(episode!.sources.length, story.slug).toBeGreaterThan(0);
      expect(story.interactive.discover, story.slug).toBeTruthy();
      expect(story.interactive.thinkQuestion, story.slug).toBeTruthy();
      expect(story.source.reference, story.slug).toBeTruthy();
    }
  });

  it("fills both English age tiers for every story", () => {
    for (const story of seerahStories) {
      const en = englishOf(story);
      expect(en.content.tier_1_age_6_8.narrative.length, story.slug).toBeGreaterThan(40);
      expect(en.content.tier_1_age_6_8.shortLesson, story.slug).toBeTruthy();
      expect(en.content.tier_2_age_9_11.narrative.length, story.slug).toBeGreaterThan(40);
      expect(en.content.tier_2_age_9_11.details, story.slug).toBeTruthy();
    }
    expect(Object.keys(seerahEnglish).sort()).toEqual(seerahStories.map(s => s.slug).sort());
  });

  it("has no station left without stories", () => {
    for (const station of seerahStations) {
      const count = seerahStories.filter(s => s.stationId === station.stationId).length;
      expect(count, station.titleAr).toBeGreaterThan(0);
    }
  });
});

/**
 * The Seerah page carries one language's text.
 *
 * seerah.ts used to hold every story in three texts — the first Arabic, its
 * 9–11 tier and the English — so an Arabic reader of one story downloaded all
 * of them (148 KB gzipped) to read the station text, which is none of those.
 * English is behind a dynamic import now, and the first Arabic text is kept
 * in a file nothing imports.
 */
describe("the Seerah page stays light", async () => {
  const { readFileSync, readdirSync } = await import("node:fs");
  const { join } = await import("node:path");
  const { gzipSync } = await import("node:zlib");
  const src = join(process.cwd(), "client/src");
  const read = (path: string) => readFileSync(join(src, path), "utf8");
  const staticImports = (text: string) => [...text.matchAll(/^import[^;]*?from\s+"([^"]+)"/gm)].map(m => m[1]);
  const walk = (dir: string): string[] => readdirSync(join(src, dir), { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : /\.(ts|tsx)$/.test(entry.name) && !/\.test\./.test(entry.name) ? [join(dir, entry.name)] : []);

  it("keeps the English and the first Arabic text out of seerah.ts", () => {
    for (const story of seerahStories) {
      expect(Object.keys(story), story.slug).not.toContain("en");
      expect(Object.keys(story), story.slug).not.toContain("content");
    }
    const gzipped = gzipSync(read("content/seerah.ts")).length;
    expect(gzipped, `seerah.ts is ${(gzipped / 1024).toFixed(1)} KB gzipped`).toBeLessThan(45 * 1024);
  });

  it("loads the English only on demand, and the first Arabic text never", () => {
    for (const file of walk(".")) {
      const imports = staticImports(read(file));
      expect(imports.filter(spec => /seerah-en$/.test(spec)), file).toEqual([]);
      expect(read(file).includes("seerah-legacy-ar") && !file.endsWith("seerah-legacy-ar.ts"), file).toBe(false);
    }
    expect(read("content/seerah-english.ts")).toMatch(/import\("@\/content\/seerah-en"\)/);
  });
});
