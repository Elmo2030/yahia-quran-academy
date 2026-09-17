/**
 * Every picture a story points at has to be on disk.
 *
 * The art arrives as a folder of camera-numbered files and is renamed by hand
 * into slugs; one typo puts a story's `image` at a path that does not exist.
 * Nothing catches that at build time — the page renders, the frame is simply
 * empty — and a `<source>` whose file 404s does not fall back to the `<img>`,
 * so a picture with a broken ladder entry disappears rather than degrading.
 * This walks the content the way the browser would.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { seerahStories, seerahStations } from "@/content/seerah";
import { chapters, stories } from "@/content/stories";
import { storyImageWidths } from "@/lib/story-image-widths.generated";

const PUBLIC = join(process.cwd(), "client/public");

const referenced = [
  ...seerahStories.map(story => story.image),
  ...seerahStations.map(station => station.cover),
  ...stories.map(story => story.image),
  ...chapters.map(chapter => chapter.cover),
].filter((path): path is string => Boolean(path));

describe("story artwork", () => {
  /** A guard on the guard: an empty list would make everything below pass. */
  it("finds the pictures to check", () => {
    expect(referenced.length).toBeGreaterThan(100);
  });

  it("points only at files that exist", () => {
    for (const path of referenced) {
      expect(existsSync(join(PUBLIC, path)), `${path} is referenced but missing`).toBe(true);
    }
  });

  /** Without a ladder entry the picture still renders, just at full weight —
   *  so this fails loudly rather than letting a phone pull the whole JPEG. */
  it("has its WebP ladder built", () => {
    for (const path of referenced) {
      const widths = storyImageWidths[path];
      expect(widths?.length, `${path} has no WebP variants — run scripts/build-image-variants.mjs`)
        .toBeGreaterThan(0);
      for (const width of widths) {
        const variant = path.replace(/\.jpg$/i, `-${width}.webp`);
        expect(existsSync(join(PUBLIC, variant)), `${variant} is listed but missing`).toBe(true);
      }
    }
  });
});
