import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { megabytes } from "./offline-audio";

describe("megabytes", () => {
  it("says a size a listener can decide on", () => {
    expect(megabytes(305_467, "ar")).toBe("0.3 ميجابايت");
    expect(megabytes(305_467, "en")).toBe("0.3 MB");
    expect(megabytes(130_902_555, "ar")).toBe("125 ميجابايت");
    expect(megabytes(130_902_555, "en")).toBe("125 MB");
  });

  it("turns into gigabytes once the whole mushaf is in hand", () => {
    expect(megabytes(1_650_000_000, "en")).toBe("1.5 GB");
    expect(megabytes(1_650_000_000, "ar")).toBe("1.5 جيجابايت");
  });

  it("shows nothing saved as zero, not as a fraction", () => {
    expect(megabytes(0, "en")).toBe("0 MB");
  });
});

/**
 * The saved surahs live in a cache the page writes and the worker only reads.
 * A worker that tidies up after a version bump must leave that cache alone, or
 * a deploy quietly deletes a gigabyte the listener chose to keep.
 */
describe("the service worker and the saved surahs", () => {
  const source = readFileSync(join(process.cwd(), "client/public/sw.js"), "utf8");

  it("keeps the audio cache when it clears its own", () => {
    expect(source).toContain('const AUDIO = "yahya-listen-audio-v1"');
    expect(source).toMatch(/const keep = new Set\(\[SHELL, ASSETS, AUDIO\]\)/);
  });

  it("falls back to the listening shell for a listening address", () => {
    expect(source).toMatch(/pathname\.startsWith\("\/listen"\)/);
  });
});
