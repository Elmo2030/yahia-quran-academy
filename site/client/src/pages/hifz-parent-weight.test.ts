/**
 * The parent corner must not import the stories content module.
 *
 * HifzParent showed a pending deed's story title, "try today" wording and
 * reward by looking the story up through `stories` + `useStoryText()` —
 * which pulled the whole shared stories bundle (42 stories, both languages)
 * into a page a parent opens to confirm one recitation: 72 KB gzipped,
 * against 7 KB on its own. The fix was to store that wording on the deed's
 * own record at the moment it is registered (StepStoryInfo, in
 * hifz-store.ts) rather than to split the bundle — a parent confirming what
 * a child actually did should see what the child was actually asked, not
 * whatever the story reads today, and the lookup is gone either way.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "client/src/pages/HifzParent.tsx"), "utf8");

describe("the parent corner stays out of the stories content module", () => {
  it("imports no @/content/stories module", () => {
    const imports = [...source.matchAll(/from\s+"([^"]+)"/g)].map(match => match[1]);
    expect(imports.filter(path => path.startsWith("@/content/stories"))).toEqual([]);
  });

  it("reads a pending deed's wording from its own record instead", () => {
    expect(source).toContain("record.story");
  });
});
