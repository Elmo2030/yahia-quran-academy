import { describe, expect, it } from "vitest";
import { seerahStories } from "./seerah";
import type { SeerahPilotEpisode } from "./seerah-pilot-station-1";
import { seerahStoryIndex } from "@/lib/page-index.generated";

const modules = import.meta.glob("./seerah-pilot-station-*.ts", { eager: true });
const episodes = Object.values(modules).flatMap(module => Object.values(module as Record<string, unknown>).filter(Array.isArray).flat()) as SeerahPilotEpisode[];

describe("Seerah publication metadata", () => {
  it("matches the displayed Arabic narrative for every episode without changing English", () => {
    expect(episodes).toHaveLength(seerahStories.length);
    expect(new Set(episodes.map(episode => episode.storyId)).size).toBe(episodes.length);
    for (const story of seerahStories) {
      const episode = episodes.find(item => item.storyId === story.storyId)!;
      const metadata = seerahStoryIndex.find(item => item.slug === story.slug)!;
      expect(metadata.title, story.slug).toBe(episode.title);
      expect(episode.childStory[0], story.slug).toContain(metadata.description.replace(/…$/, ""));
      expect(metadata.titleEn, story.slug).toBe(story.en!.title);
      expect(story.en!.content.tier_1_age_6_8.narrative, story.slug).toContain(metadata.descriptionEn!.replace(/…$/, ""));
    }
  });
});
