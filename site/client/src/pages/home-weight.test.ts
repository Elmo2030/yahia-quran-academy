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
