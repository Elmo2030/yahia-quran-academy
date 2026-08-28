import { afterEach, describe, expect, it, vi } from "vitest";

function validAudioManifest() {
  return { surahs: Object.fromEntries(Array.from({ length: 114 }, (_, index) => { const surah = index + 1; const extension = surah === 1 ? "m4a" : "mp3"; return [String(surah), { surah, availability: "migrated", playback_url: `https://audio.example.test/surahs/${String(surah).padStart(3, "0")}.${extension}`, timing_status: "unavailable" }]; })) };
}

function validTransliteration() {
  return { surahs: Object.fromEntries(Array.from({ length: 114 }, (_, index) => { const surah = index + 1; const ayahCount = surah === 1 ? 6123 : 1; return [String(surah), { english_name: `Surah ${surah}`, english_name_translation: "", ayahs: Object.fromEntries(Array.from({ length: ayahCount }, (_, ayahIndex) => [String(ayahIndex + 1), `Romanized ${ayahIndex + 1}`])) }]; })) };
}

describe("Quran content helpers", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("loads unchanged Arabic ayahs with their verified transliteration counterpart", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (url.includes("quran_text")) return new Response(JSON.stringify({ "1:2": "الْحَمْدُ", "1:1": "بِسْمِ اللَّهِ", "2:1": "الم" }), { status: 200 });
      if (url.includes("transliteration")) return new Response(JSON.stringify(validTransliteration()), { status: 200 });
      return new Response(JSON.stringify(validAudioManifest()), { status: 200 });
    }));
    const content = await import("./quran-content");
    const ayahs = await content.loadSurahWithTransliteration(1);
    const audio = await content.loadSurahAudio(1);
    expect(ayahs[0]).toEqual({ number: 1, text: "بِسْمِ اللَّهِ", transliteration: "Romanized 1" });
    expect(audio?.playback_url).toContain("001.m4a");
    expect(content.getSurahName(108)).toBe("الكوثر");
    expect(content.getEnglishSurahName(108)).toBe("Al-Kawthar");
  });

  it("rejects an incomplete or unsafe audio manifest before playback", async () => {
    const { validateAudioManifest } = await import("./quran-content");
    const incomplete = validAudioManifest(); delete incomplete.surahs["114"];
    expect(() => validateAudioManifest(incomplete)).toThrow("لا يغطي السور 114 كاملة");
    const unsafe = validAudioManifest(); unsafe.surahs["108"].playback_url = "http://unsafe.example.test/surahs/108.mp3";
    expect(() => validateAudioManifest(unsafe)).toThrow("غير صالح للسورة 108");
  });

  it("rejects a transliteration payload that does not cover all Quran ayahs", async () => {
    const { validateTransliteration } = await import("./quran-content");
    const incomplete = validTransliteration(); delete incomplete.surahs["114"];
    expect(() => validateTransliteration(incomplete)).toThrow("لا يغطي السور 114 كاملة");
  });
});
