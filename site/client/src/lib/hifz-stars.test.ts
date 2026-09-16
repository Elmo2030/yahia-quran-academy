import { describe, expect, it } from "vitest";

import { RANKS, nextRank, nextStarHint, rankFor, starsFor, totalStars } from "./hifz-stars";
import { DEFAULT_SETTINGS, type AyahRecord, type ChildProfile } from "./hifz-store";

const DAY = 86_400_000;
const MONDAY = 1_700_000_000_000;

function child(ayahs: Record<string, Partial<AyahRecord>>): ChildProfile {
  return {
    id: "c", name: "Test", character: "yahya", createdAt: MONDAY, settings: { ...DEFAULT_SETTINGS },
    ayahs: Object.fromEntries(Object.entries(ayahs).map(([key, value]) => [key, { reviews: [], ...value }])),
  };
}

/** Surah 112 has four ayahs. */
const four = (make: (ayah: number) => Partial<AyahRecord>) =>
  child(Object.fromEntries([1, 2, 3, 4].map(n => [`112:${n}`, make(n)])));

describe("stars", () => {
  it("gives none until every ayah of the surah has been heard", () => {
    expect(starsFor(child({ "112:1": { listenedAt: MONDAY } }), 112)).toBe(0);
    expect(starsFor(four(() => ({ listenedAt: MONDAY })), 112)).toBe(1);
  });

  it("gives a second star when every ayah has been recorded", () => {
    expect(starsFor(four(() => ({ listenedAt: MONDAY, recordedAt: MONDAY })), 112)).toBe(2);
    // One ayah missing its recording keeps it at one star.
    expect(starsFor(four(n => (n === 4 ? { listenedAt: MONDAY } : { listenedAt: MONDAY, recordedAt: MONDAY })), 112)).toBe(1);
  });

  it("holds the third star until the child comes back on a later day", () => {
    const sameDay = four(() => ({ listenedAt: MONDAY, recordedAt: MONDAY, declaredAt: MONDAY + 60_000 }));
    expect(starsFor(sameDay, 112)).toBe(2);
    expect(nextStarHint(sameDay, 112)).toBe("revisit");

    const nextDay = four(() => ({ listenedAt: MONDAY, recordedAt: MONDAY, declaredAt: MONDAY, reviews: [MONDAY + DAY] }));
    expect(starsFor(nextDay, 112)).toBe(3);
    expect(nextStarHint(nextDay, 112)).toBeNull();
  });

  it("counts a recording made on a later day as coming back", () => {
    const profile = four(() => ({ listenedAt: MONDAY, declaredAt: MONDAY, recordedAt: MONDAY + DAY }));
    expect(starsFor(profile, 112)).toBe(3);
  });

  it("names the next thing to do", () => {
    expect(nextStarHint(child({}), 112)).toBe("listen");
    expect(nextStarHint(four(() => ({ listenedAt: MONDAY })), 112)).toBe("record");
    expect(nextStarHint(four(() => ({ listenedAt: MONDAY, recordedAt: MONDAY })), 112)).toBe("declare");
  });

  it("adds up across the journey", () => {
    const profile = four(() => ({ listenedAt: MONDAY }));
    expect(totalStars(profile)).toBe(1);
    expect(totalStars(child({}))).toBe(0);
  });
});

describe("ranks", () => {
  it("starts at the first rank and climbs by stars", () => {
    expect(rankFor(0).level).toBe(1);
    expect(rankFor(7).level).toBe(1);
    expect(rankFor(8).level).toBe(2);
    expect(rankFor(114).level).toBe(5);
  });

  it("says how many stars the next rank needs, and nothing at the top", () => {
    expect(nextRank(0)).toEqual({ rank: RANKS[1], remaining: 8 });
    expect(nextRank(95)).toBeNull();
  });

  it("keeps the thresholds inside what the journey can give", () => {
    const possible = 38 * 3;
    for (const rank of RANKS) expect(rank.stars).toBeLessThanOrEqual(possible);
    expect([...RANKS].sort((a, b) => a.stars - b.stars)).toEqual(RANKS);
  });
});
