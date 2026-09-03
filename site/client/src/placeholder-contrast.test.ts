/**
 * The stand-in art's label must sit on an opaque background.
 *
 * It was translucent white painted straight onto the placeholder gradient,
 * which measures about 1.3:1 against the pale end of that gradient and about
 * 2.4:1 where the white hill overlay sits — well under the 4.5:1 that 12.8px
 * text needs. This stand-in is what most Seerah stories still show, so the
 * label was unreadable on the majority of the section. An opaque chip makes
 * the contrast the chip's own, whatever the drawing does behind it.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "client/src/index.css"), "utf8");

/** The colour a token resolves to, per theme, read from the stylesheet itself
 *  — the chip is painted from a token now, and it has to clear 4.5:1 in both. */
const tokenValue = (name: string, theme: "light" | "dark") => {
  const block = theme === "light"
    ? css.slice(css.indexOf(":root {"), css.indexOf("@media (prefers-color-scheme: dark)"))
    : css.slice(css.indexOf('[data-theme="dark"]'));
  const match = block.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!match) throw new Error(`no value for --${name} in the ${theme} palette`);
  return match[1];
};

/** `var(--x)` or a literal, resolved for one theme. */
const resolve = (value: string, theme: "light" | "dark") => {
  const token = value.match(/var\(--([a-z0-9-]+)\)/);
  if (token) return tokenValue(token[1], theme);
  return value === "#fff" ? "#ffffff" : value;
};

const rule = (selector: string) => {
  const match = css.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`));
  if (!match) throw new Error(`no rule for ${selector}`);
  return match[1];
};

const luminance = (hex: string) => {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const n = parseInt(hex.replace("#", ""), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};

const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe("the placeholder label", () => {
  const declarations = rule(".story-image-placeholder small");

  it("paints an opaque background of its own", () => {
    const background = declarations.match(/background:\s*(var\(--[a-z0-9-]+\)|#[0-9a-fA-F]{3,8})/);
    expect(background, "an opaque colour, not a translucent overlay").toBeTruthy();
  });

  it("clears 4.5:1 against that background, in both palettes", () => {
    const background = declarations.match(/background:\s*(var\(--[a-z0-9-]+\)|#[0-9a-fA-F]{6})/)![1];
    const color = declarations.match(/color:\s*(var\(--[a-z0-9-]+\)|#[0-9a-fA-F]{6}|#fff\b)/)![1];
    for (const theme of ["light", "dark"] as const) {
      expect(
        contrast(resolve(color, theme), resolve(background, theme)),
        `${theme} palette`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("hugs the reading edge in both directions", () => {
    expect(declarations, "a logical inset, so English does not stay pinned right").toContain("inset-inline-end");
  });
});
