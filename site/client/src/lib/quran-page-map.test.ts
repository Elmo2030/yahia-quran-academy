import { describe, expect, it } from "vitest";
import { getQuranSourcePage, isValidReaderPage, READER_PAGE_COUNT } from "@/lib/quran-page-map";

describe("getQuranSourcePage", () => {
  it("is the identity before the first duplicate", () => {
    expect(getQuranSourcePage(1)).toBe(1);
    expect(getQuranSourcePage(491)).toBe(491);
  });

  it("shifts by one across the first duplicate (PDF page 492)", () => {
    expect(getQuranSourcePage(492)).toBe(493);
    expect(getQuranSourcePage(570)).toBe(571);
  });

  it("shifts by two across the second duplicate (PDF page 572)", () => {
    expect(getQuranSourcePage(571)).toBe(573);
    expect(getQuranSourcePage(604)).toBe(606);
  });

  it("rejects out-of-range and non-integer input", () => {
    expect(getQuranSourcePage(0)).toBeNull();
    expect(getQuranSourcePage(605)).toBeNull();
    expect(getQuranSourcePage(-1)).toBeNull();
    expect(getQuranSourcePage(1.5)).toBeNull();
    expect(getQuranSourcePage(NaN)).toBeNull();
  });

  it("never produces a duplicate source page across the whole range", () => {
    const seen = new Set<number>();
    for (let page = 1; page <= READER_PAGE_COUNT; page++) {
      const source = getQuranSourcePage(page);
      expect(source).not.toBeNull();
      expect(seen.has(source as number)).toBe(false);
      seen.add(source as number);
    }
    expect(seen.has(492)).toBe(false);
    expect(seen.has(572)).toBe(false);
  });
});

describe("isValidReaderPage", () => {
  it("accepts 1..604", () => {
    expect(isValidReaderPage(1)).toBe(true);
    expect(isValidReaderPage(604)).toBe(true);
    expect(isValidReaderPage(300)).toBe(true);
  });

  it("rejects everything else", () => {
    expect(isValidReaderPage(0)).toBe(false);
    expect(isValidReaderPage(605)).toBe(false);
    expect(isValidReaderPage(-5)).toBe(false);
    expect(isValidReaderPage(1.2)).toBe(false);
    expect(isValidReaderPage("1")).toBe(false);
    expect(isValidReaderPage(null)).toBe(false);
    expect(isValidReaderPage(undefined)).toBe(false);
  });
});
