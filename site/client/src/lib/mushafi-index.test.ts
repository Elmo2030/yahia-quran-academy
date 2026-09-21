import { describe, expect, it } from "vitest";
import { MUSHAFI_SURAH_INDEX, searchMushafiIndex } from "@/lib/mushafi-index";

describe("MUSHAFI_SURAH_INDEX", () => {
  it("has all 114 surahs with no invented start page", () => {
    expect(MUSHAFI_SURAH_INDEX).toHaveLength(114);
    expect(MUSHAFI_SURAH_INDEX.every(e => e.startPage === null)).toBe(true);
    expect(MUSHAFI_SURAH_INDEX[0]).toMatchObject({ number: 1, name: "الفاتحة" });
    expect(MUSHAFI_SURAH_INDEX[113]).toMatchObject({ number: 114, name: "الناس" });
  });
});

describe("searchMushafiIndex", () => {
  it("returns everything for an empty query", () => {
    expect(searchMushafiIndex("")).toHaveLength(114);
  });

  it("finds a surah by Arabic name regardless of alef/ta-marbuta variants", () => {
    expect(searchMushafiIndex("البقرة").map(e => e.number)).toEqual([2]);
    expect(searchMushafiIndex("الرحمن").map(e => e.number)).toContain(55);
  });

  it("finds a surah by English name", () => {
    expect(searchMushafiIndex("baqara").map(e => e.number)).toContain(2);
  });

  it("finds a surah by number", () => {
    expect(searchMushafiIndex("114").map(e => e.number)).toEqual([114]);
  });

  it("returns nothing for an unmatched query", () => {
    expect(searchMushafiIndex("zzzzz")).toEqual([]);
  });
});
