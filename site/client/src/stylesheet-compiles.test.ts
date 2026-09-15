/**
 * The stylesheet has to compile.
 *
 * Removing one rule from a comma-less run of rules on a single line once left
 * `.site-shell[dir="ltr"] ` hanging in front of the next rule. Tailwind refused
 * the whole file — "Invalid declaration" — so the dev server answered 500 for
 * index.css and every page lost its styles, while the type check and every
 * other test stayed green. Compiling it here is what would have caught that.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { compile } from "tailwindcss";
import { describe, expect, it } from "vitest";

const cssPath = join(process.cwd(), "client/src/index.css");
const modules = join(process.cwd(), "node_modules");

/** The two packages index.css imports, and the relative imports inside them. */
const PACKAGE_ENTRY: Record<string, string> = {
  tailwindcss: join(modules, "tailwindcss", "index.css"),
  "tw-animate-css": join(modules, "tw-animate-css", "dist", "tw-animate.css"),
};

async function loadStylesheet(id: string, base: string) {
  const path = PACKAGE_ENTRY[id] ?? (id.startsWith(".") ? join(base, id) : join(modules, id));
  return { path, base: dirname(path), content: readFileSync(path, "utf8") };
}

describe("index.css", () => {
  it("compiles without a syntax error", async () => {
    const css = readFileSync(cssPath, "utf8");
    const compiler = await compile(css, { base: dirname(cssPath), loadStylesheet });
    const output = compiler.build([]);
    expect(output.length).toBeGreaterThan(10_000);
  });

  it("has no selector left dangling in front of another rule", () => {
    const css = readFileSync(cssPath, "utf8");
    // A selector followed straight by another selector's opening brace on the
    // same rule, e.g. `.a[dir="ltr"] .b { } ` leftovers: `] .x {` is fine, but
    // `] }` or `] .x { ... } .y {` after an edit is not detectable in general —
    // the compile above is the real check; this one names the common case.
    expect(css).not.toMatch(/\[dir="(?:ltr|rtl)"\]\s*\}/);
  });
});
