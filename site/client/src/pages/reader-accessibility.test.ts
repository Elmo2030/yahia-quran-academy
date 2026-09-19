import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "client/src/pages/Reader.tsx"), "utf8");

describe("Reader accessibility landmarks", () => {
  it("provides the shared skip link and its main-content target", () => {
    expect(source).toContain('import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink"');
    expect(source).toContain("<SkipLink />");
    expect(source).toContain('id={MAIN_CONTENT_ID}');
  });
});
