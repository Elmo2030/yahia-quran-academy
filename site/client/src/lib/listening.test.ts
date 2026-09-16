import { describe, expect, it } from "vitest";

import { clock, parseMarks, roughLength } from "./listening";

describe("parseMarks", () => {
  it("keeps a real position and drops nonsense", () => {
    expect(parseMarks({ at: { "2": 600 }, last: 2 })).toEqual({ at: { "2": 600 }, last: 2 });
    expect(parseMarks(null)).toEqual({ at: {} });
    expect(parseMarks({ at: { "0": 90, "115": 90, x: 90 } })).toEqual({ at: {} });
  });

  it("ignores a position too small to be worth resuming", () => {
    expect(parseMarks({ at: { "2": 4 } }).at).toEqual({});
  });

  it("drops a last surah that is not one", () => {
    expect(parseMarks({ at: {}, last: 999 }).last).toBeUndefined();
  });
});

describe("clock", () => {
  it("counts in minutes, and in hours once there are any", () => {
    expect(clock(0)).toBe("0:00");
    expect(clock(75)).toBe("1:15");
    expect(clock(3661)).toBe("1:01:01");
    expect(clock(-5)).toBe("0:00");
  });
});

describe("roughLength", () => {
  it("says a length a parent can plan around", () => {
    expect(roughLength(49_876, "ar")).toBe("دقيقة");
    expect(roughLength(49_876, "en")).toBe("1 min");
    expect(roughLength(8_181_410, "ar")).toBe("ساعتان و16 دقيقة");
    expect(roughLength(8_181_410, "en")).toBe("2 h 16 min");
    expect(roughLength(3_600_000, "ar")).toBe("ساعة");
  });

  it("counts Arabic minutes the way Arabic counts them", () => {
    expect(roughLength(120_000, "ar")).toBe("دقيقتان");
    expect(roughLength(300_000, "ar")).toBe("5 دقائق");
    expect(roughLength(1_500_000, "ar")).toBe("25 دقيقة");
  });
});
