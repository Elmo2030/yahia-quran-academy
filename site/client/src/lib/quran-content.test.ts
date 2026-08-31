import { afterEach, describe, expect, it, vi } from "vitest";

function validAudioManifest() {
  return { surahs: Object.fromEntries(Array.from({ length: 114 }, (_, index) => { const surah = index + 1; const extension = surah === 1 ? "m4a" : "mp3"; return [String(surah), { surah, availability: "migrated", playback_url: `https://audio.example.test/surahs/${String(surah).padStart(3, "0")}.${extension}`, timing_status: "unavailable" }]; })) };
}

// Al-Fatiha as the reader now receives it: its own file, nothing else.
function surahFile(surah: number, ayahs: number) {
  return { s: surah, a: Array.from({ length: ayahs }, (_, i) => ({ n: i + 1, t: `آية ${i + 1}`, r: `Romanized ${i + 1}` })) };
}

describe("Quran content helpers", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("fetches only the surah being read, not the whole Quran", async () => {
    const asked: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      asked.push(url);
      if (url.includes("/quran/")) return new Response(JSON.stringify(surahFile(1, 7)), { status: 200 });
      return new Response(JSON.stringify(validAudioManifest()), { status: 200 });
    }));
    const content = await import("./quran-content");
    const ayahs = await content.loadSurahWithTransliteration(1);
    const audio = await content.loadSurahAudio(1);
    expect(ayahs).toHaveLength(7);
    expect(ayahs[0]).toEqual({ number: 1, text: "آية 1", transliteration: "Romanized 1" });
    expect(asked).toContain("/quran/surah-001.json");
    // The corpus files are what this change exists to stop fetching.
    expect(asked.some(url => url.includes("quran_text") || url.includes("transliteration"))).toBe(false);
    expect(audio?.playback_url).toContain("001.m4a");
    expect(content.getSurahName(108)).toBe("الكوثر");
    expect(content.getEnglishSurahName(108)).toBe("Al-Kawthar");
  });

  it("refuses a surah file that arrived short", async () => {
    const { validateSurahFile } = await import("./quran-content");
    expect(() => validateSurahFile(surahFile(1, 6), 1)).toThrow("وصلت ناقصة");
    expect(() => validateSurahFile(surahFile(2, 7), 1)).toThrow("غير صالح");
    const gap = surahFile(1, 7); gap.a[3].n = 9;
    expect(() => validateSurahFile(gap, 1)).toThrow("غير صالحة");
    const blank = surahFile(1, 7); blank.a[2].r = "  ";
    expect(() => validateSurahFile(blank, 1)).toThrow("غير صالحة");
  });

  it("does not remember a failed surah as failed", async () => {
    let attempt = 0;
    vi.stubGlobal("fetch", vi.fn(async () => {
      attempt += 1;
      return attempt === 1
        ? new Response("nope", { status: 500 })
        : new Response(JSON.stringify(surahFile(2, 286)), { status: 200 });
    }));
    const content = await import("./quran-content");
    await expect(content.loadSurahWithTransliteration(2)).rejects.toThrow();
    await expect(content.loadSurahWithTransliteration(2)).resolves.toHaveLength(286);
  });

  it("rejects an incomplete or unsafe audio manifest before playback", async () => {
    const { validateAudioManifest } = await import("./quran-content");
    const incomplete = validAudioManifest(); delete incomplete.surahs["114"];
    expect(() => validateAudioManifest(incomplete)).toThrow("لا يغطي السور 114 كاملة");
    const unsafe = validAudioManifest(); unsafe.surahs["108"].playback_url = "http://unsafe.example.test/surahs/108.mp3";
    expect(() => validateAudioManifest(unsafe)).toThrow("غير صالح للسورة 108");
  });

  it("keeps an ayah count for every one of the 114 surahs", async () => {
    const { ayahCounts } = await import("./surah-ayah-counts.generated");
    expect(ayahCounts).toHaveLength(114);
    expect(ayahCounts[0]).toBe(7);
    expect(ayahCounts[1]).toBe(286);
    expect(ayahCounts.reduce((sum, n) => sum + n, 0)).toBe(6236);
  });
});
