/**
 * Every picture states what it is, or states that it is decoration.
 *
 * The site went out with alt="" on all twenty-one of its images, one of them
 * hard-coded inside StoryPicture, which paints every story cover and all
 * ninety-two Seerah scenes. alt="" means "skip this, it is ornament" — the
 * right answer for a card whose title is inside the same link, and the wrong
 * one for the painted scene that is half of a story's page. A blind child, a
 * connection that dropped mid-load, and image search all got nothing.
 *
 * The prop is required now, so a new call site cannot forget. What this test
 * guards is the other half: a raw <img> written by hand, which TypeScript has
 * no opinion about, and a silent return of the hard-coded empty alt.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap(entry => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".tsx") ? [path] : [];
  });

const files = walk(join(process.cwd(), "client/src"));

/** The file with its comments taken out. Prose about a plain `<img>` — this
 *  file's own explanation included — is not an element on any page. */
const code = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

/** An <img …> opening tag, however many lines it is spread over. */
const imgTags = (source: string) => code(source).match(/<img\b[\s\S]*?\/?>/g) ?? [];

describe("image alt text", () => {
  it("is present on every hand-written <img>", () => {
    const missing: string[] = [];
    for (const file of files) {
      for (const tag of imgTags(readFileSync(file, "utf8"))) {
        if (!/\balt=/.test(tag)) missing.push(`${file.split("client/src/")[1]}: ${tag.slice(0, 60)}`);
      }
    }
    expect(missing, `an <img> with no alt at all is the worst case — a screen reader falls back to reading the file name:\n${missing.join("\n")}`).toEqual([]);
  });

  it("is a real sentence on the art a page is about", () => {
    const stories = readFileSync(join(process.cwd(), "client/src/pages/Stories.tsx"), "utf8");
    const seerah = readFileSync(join(process.cwd(), "client/src/pages/Seerah.tsx"), "utf8");
    const aqeedah = readFileSync(join(process.cwd(), "client/src/pages/Aqeedah.tsx"), "utf8");
    // The detail pages name their subject; the cards deliberately do not,
    // because their own title is a line below the picture, in the same link.
    for (const [name, source] of [["Stories", stories], ["Seerah", seerah], ["Aqeedah", aqeedah]] as const) {
      expect(source, `${name} should describe its hero art`).toMatch(/artAlt\(/);
    }
  });

  it("leaves StoryPicture no empty default to fall back on", () => {
    const source = readFileSync(join(process.cwd(), "client/src/components/StoryPicture.tsx"), "utf8");
    expect(source).toMatch(/alt=\{alt\}/);
    expect(source, "a default would quietly restore alt=\"\" for every caller that forgot").not.toMatch(/alt[?]:|alt = ""/);
  });
});
