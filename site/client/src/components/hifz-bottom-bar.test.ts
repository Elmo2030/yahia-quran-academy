import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const root = join(process.cwd(), "client/src");
const css = readFileSync(join(root, "index.css"), "utf8");

/**
 * The journey's bar belongs to the journey.
 *
 * It is the one part of the site a child uses like an app, returning to the
 * same four places daily. Everywhere else the site's own header is the right
 * navigation, and a bar fixed over every page would take a strip of a small
 * screen away from the Quran itself.
 */
describe("the memorization journey's bottom bar", () => {
  const hifzPages = readdirSync(join(root, "pages")).filter(name => /^Hifz.*\.tsx$/.test(name) || name === "Hifz.tsx");

  it("is mounted on every journey screen", () => {
    expect(hifzPages.length).toBeGreaterThanOrEqual(6);
    for (const page of hifzPages) {
      const source = readFileSync(join(root, "pages", page), "utf8");
      expect(source, page).toContain("<HifzBottomBar />");
    }
  });

  it("is mounted nowhere else", () => {
    for (const page of readdirSync(join(root, "pages")).filter(n => n.endsWith(".tsx") && !hifzPages.includes(n))) {
      const source = readFileSync(join(root, "pages", page), "utf8");
      expect(source, page).not.toContain("HifzBottomBar");
    }
  });

  it("shows only on a phone", () => {
    expect(css).toMatch(/\.hifz-bottom-bar \{ display: none; \}/);
  });

  /** A bar fixed over the bottom of the page hides whatever is under it. */
  it("reserves its own height so it covers nothing", () => {
    expect(css).toMatch(/\.site-shell\.hifz \{ padding-block-end: calc\(76px \+ env\(safe-area-inset-bottom/);
  });

  it("clears the phone's home indicator", () => {
    const bar = css.slice(css.indexOf(".hifz-bottom-bar {"), css.indexOf(".hifz-bottom-bar__item {"));
    expect(bar).toContain("env(safe-area-inset-bottom");
  });
});
