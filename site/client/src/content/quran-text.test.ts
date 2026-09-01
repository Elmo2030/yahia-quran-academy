/**
 * What the reader shows of the Quran itself.
 *
 * The text is the one thing on this site that must be exactly right, and it is
 * checked here against the files that are actually served rather than against
 * the corpus they were built from.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { ayahCounts, BASMALAH } from "@/lib/surah-ayah-counts.generated";

const surah = (n: number) =>
  JSON.parse(readFileSync(join(process.cwd(), `client/public/quran/surah-${String(n).padStart(3, "0")}.json`), "utf8")) as
    { s: number; a: { n: number; t: string; r: string }[] };

describe("the Quran text as served", () => {
  it("has 6236 ayahs across 114 surahs, numbered without a gap", () => {
    let total = 0;
    for (let n = 1; n <= 114; n += 1) {
      const file = surah(n);
      expect(file.s, `surah ${n} names itself`).toBe(n);
      expect(file.a.map(a => a.n), `surah ${n} numbering`).toEqual(
        Array.from({ length: ayahCounts[n - 1] }, (_, i) => i + 1),
      );
      total += file.a.length;
    }
    expect(total).toBe(6236);
  });

  it("carries no character that does not belong in the text", () => {
    const allowed = /^[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿\s]+$/;
    for (let n = 1; n <= 114; n += 1) {
      for (const ayah of surah(n).a) {
        expect(allowed.test(ayah.t), `${n}:${ayah.n} — ${ayah.t.slice(0, 30)}`).toBe(true);
        expect(ayah.r.trim().length, `${n}:${ayah.n} transliteration`).toBeGreaterThan(0);
      }
    }
  });

  /**
   * A fingerprint of every file the reader is served.
   *
   * Comparing against ayahs written out here does not work, and the attempt is
   * worth recording: three strings typed by hand looked identical to the corpus
   * and were not — the shadda and the fatha in the other order. Quranic text is
   * copied, never retyped. So the text is locked by its hash instead: this
   * cannot tell you the text is authentic, only that nothing has changed it
   * since it was checked. If a deliberate correction is made to the corpus,
   * this hash is updated in the same commit, where it is visible in review.
   */
  it("is byte-for-byte what it was", async () => {
    const { createHash } = await import("node:crypto");
    const hash = createHash("sha256");
    for (let n = 1; n <= 114; n += 1) {
      hash.update(readFileSync(join(process.cwd(), `client/public/quran/surah-${String(n).padStart(3, "0")}.json`)));
    }
    expect(hash.digest("hex")).toBe("4bab069e3e5883e7732506f7e1e42c35b58c7a37ab4c2dbc440a04d75c15be4d");
  });

  // The reader draws the basmalah as a heading for every surah but these two:
  // in Al-Fatiha it is the first numbered ayah, and At-Tawbah has none.
  it("has the basmalah as a numbered ayah in Al-Fatiha alone", () => {
    const opening = [];
    for (let n = 1; n <= 114; n += 1) if (surah(n).a[0].t === BASMALAH) opening.push(n);
    expect(opening).toEqual([1]);
    // At-Tawbah is the one surah with no basmalah at all.
    expect(surah(9).a[0].t).not.toBe(BASMALAH);
    expect(surah(9).a[0].t.includes("ٱللَّهِ ٱلرَّحْمَـٰنِ")).toBe(false);
  });
});
