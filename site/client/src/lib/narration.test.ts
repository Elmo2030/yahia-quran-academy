import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// @ts-expect-error — a plain .mjs build script, no types.
import { renderIndex } from "../../../scripts/build-narration-index.mjs";
import { seerahStories } from "@/content/seerah";
import { stories } from "@/content/stories";
import { narratedCompanions, narratedSeerah, narratedStories } from "./narration.generated";

const root = process.cwd();
const storiesDir = join(root, "client/public/stories");
const companionSlugs = readdirSync(join(root, "client/src/content/companions.generated"))
  .filter(name => name.endsWith(".json"))
  .map(name => name.slice(0, -".json".length));

describe("story narration", () => {
  it("lists exactly the recordings in the folder", () => {
    // A recording dropped in without running the script would have no player.
    expect(readFileSync(join(root, "client/src/lib/narration.generated.ts"), "utf8"), "run: node scripts/build-narration-index.mjs").toBe(renderIndex());
  });

  it("names every recording after a real story", () => {
    // A typo in the file name would publish a recording no page ever plays.
    for (const slug of narratedCompanions) expect(companionSlugs, `companions/audio/${slug}.mp3 matches no companion`).toContain(slug);
    const storyKeys = stories.map(story => `${story.chapter}/${story.slug}`);
    for (const key of narratedStories) expect(storyKeys, `audio/${key}.mp3 matches no story`).toContain(key);
    const seerahSlugs = seerahStories.map(story => story.slug);
    for (const slug of narratedSeerah) expect(seerahSlugs, `seerah/audio/${slug}.mp3 matches no Seerah story`).toContain(slug);
  });

  it("keeps each recording small enough for a phone on a slow connection", () => {
    // The ones so far are 2–3 MB for 4–5 minutes at 64 kbps; a WAV renamed to
    // .mp3, or a 320 kbps export, would be many times that.
    const files = [
      ...narratedCompanions.map(slug => `companions/audio/${slug}.mp3`),
      ...narratedStories.map(key => `audio/${key}.mp3`),
      ...narratedSeerah.map(slug => `seerah/audio/${slug}.mp3`),
    ];
    for (const file of files) expect(statSync(join(storiesDir, file)).size, file).toBeLessThan(8_000_000);
  });
});
