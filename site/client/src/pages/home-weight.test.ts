/**
 * The home page must not import a content module.
 *
 * Home is the only eagerly-loaded route, so anything it imports lands in the
 * entry chunk that every visitor downloads first — including someone who only
 * opens the reader. It imported @/content/seerah for the seven station cards,
 * which put all seventy stories, both languages and both age tiers, into that
 * chunk: 764 KB raw / 227 KB gzipped, against 430 KB / 134 KB without them.
 * The generated index carries the title and the opening line, which is all the
 * cards show.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("the home page stays out of the content modules", () => {
  it("imports no @/content module", () => {
    const imports = [...source.matchAll(/from\s+"([^"]+)"/g)].map(match => match[1]);
    expect(imports.filter(path => path.startsWith("@/content"))).toEqual([]);
  });

  it("reads the station cards from the generated index instead", () => {
    expect(source).toContain("@/lib/page-index.generated");
  });
});

/**
 * The generated index is the entry chunk's other passenger.
 *
 * page-meta.ts needs it to name every route, and PageMeta renders at the root,
 * so whatever the index carries lands in the file every first-time visitor
 * downloads — including someone who only opens the reader. Adding a page per
 * Quran fact put a hundred more titles and bodies in it, about 15 KB gzipped,
 * which was a deliberate trade for a hundred findable pages.
 *
 * This is the budget for that trade. If a future section pushes past it, the
 * fix is not a bigger number: it is to stop resolving per-item metadata at the
 * root and let each lazily-loaded page carry its own.
 */
describe("the generated index stays affordable", () => {
  it("fits the entry chunk's budget", async () => {
    const { gzipSync } = await import("node:zlib");
    const bytes = readFileSync(join(process.cwd(), "client/src/lib/page-index.generated.ts"));
    const gzipped = gzipSync(bytes).length;
    expect(gzipped, `page-index.generated.ts is ${(gzipped / 1024).toFixed(1)} KB gzipped`).toBeLessThan(60 * 1024);
  });
});
