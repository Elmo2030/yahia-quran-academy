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
    expect(source).toContain("@/lib/page-index-lite.generated");
  });
});

/**
 * The entry chunk carries names, not text.
 *
 * page-meta.ts needs the full generated index — every title, description and
 * passage, 168 KB — to name every route, and PageMeta renders at the root, so
 * it all used to land in the file every first-time visitor waits on, only to
 * repeat what the Cloudflare function had already written into the HTML.
 * Now PageMeta loads its tags lazily, and the eager readers (Home and the
 * child's journey card) use the lite index: slugs, titles and pictures.
 *
 * If an eager file needs a description, add that one field to the lite index
 * — do not point it back at the full one.
 */
const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
const staticImports = (path: string) => [...read(path).matchAll(/^import[^;]*?from\s+"([^"]+)"/gm)].map(match => match[1]);

describe("the entry chunk stays light", () => {
  it("keeps the eager files off the full index and off page-meta", () => {
    for (const path of ["client/src/pages/Home.tsx", "client/src/components/ChildJourney.tsx", "client/src/components/PageMeta.tsx", "client/src/App.tsx"]) {
      const imports = staticImports(path);
      expect(imports.filter(spec => /page-index\.generated|lib\/page-meta|PageMetaTags/.test(spec)), path).toEqual([]);
    }
  });

  it("loads the route tags lazily", () => {
    expect(read("client/src/components/PageMeta.tsx")).toMatch(/import\("\.\/PageMetaTags"\)/);
  });

  it("keeps the lite index small", async () => {
    const { gzipSync } = await import("node:zlib");
    const gzipped = gzipSync(readFileSync(join(process.cwd(), "client/src/lib/page-index-lite.generated.ts"))).length;
    expect(gzipped, `page-index-lite.generated.ts is ${(gzipped / 1024).toFixed(1)} KB gzipped`).toBeLessThan(20 * 1024);
  });
});
