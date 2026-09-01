/**
 * The reader fetches one surah's sources, not the whole catalogue of them.
 *
 * It used to download the entire recitation manifest — three recitations times
 * 114 surahs of URLs, checksums and byte counts, 250 KB — to play one surah.
 */
import { afterEach, describe, expect, it, vi } from "vitest";

const catalogue = {
  default_recitation_id: "husary_muallim_timed",
  recitations: [
    { id: "husary_muallim_timed", display_name_ar: "الحُصَري المعلّم", display_name_en: "Husary Muallim", timing_status: "available", has_surahs: true },
    { id: "no_timing", display_name_ar: "بدون تمييز", display_name_en: "No timing", timing_status: "unavailable", has_surahs: true },
  ],
};

const surahFile = (surah: number) => ({
  surah,
  recitations: {
    husary_muallim_timed: {
      playback_url: `https://audio.example.test/${surah}.mp3`,
      duration_ms: 64000,
      ayah_count: 7,
      timing_url: `https://audio.example.test/${surah}.timing.json`,
    },
  },
});

afterEach(() => vi.unstubAllGlobals());

describe("recitation sources", () => {
  it("asks only for the catalogue and the surah being played", async () => {
    const asked: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      asked.push(url);
      const body = url.includes("index.json") ? catalogue : surahFile(1);
      return new Response(JSON.stringify(body), { status: 200 });
    }));
    vi.resetModules();
    const mod = await import("./recitations");

    const list = await mod.listRecitations();
    expect(list.map(r => r.id)).toEqual(["husary_muallim_timed", "no_timing"]);
    expect(list[1].hasTiming).toBe(false);
    expect(await mod.defaultRecitationId()).toBe("husary_muallim_timed");

    const source = await mod.loadSurahSource("husary_muallim_timed", 1);
    expect(source?.playbackUrl).toBe("https://audio.example.test/1.mp3");
    expect(asked).toContain("/recitations/index.json");
    expect(asked).toContain("/recitations/surah-001.json");
    expect(asked.some(url => url.includes("recitation_manifest"))).toBe(false);
  });

  it("refuses a file that is not the surah that was asked for", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) =>
      new Response(JSON.stringify(url.includes("index.json") ? catalogue : surahFile(9)), { status: 200 })));
    vi.resetModules();
    const mod = await import("./recitations");
    await expect(mod.loadSurahSource("husary_muallim_timed", 1)).rejects.toThrow("received 9");
  });

  it("returns nothing for a recitation that does not carry this surah", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) =>
      new Response(JSON.stringify(url.includes("index.json") ? catalogue : surahFile(1)), { status: 200 })));
    vi.resetModules();
    const mod = await import("./recitations");
    expect(await mod.loadSurahSource("no_timing", 1)).toBeNull();
  });

  it("does not remember a failed surah as failed", async () => {
    let attempt = 0;
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (url.includes("index.json")) return new Response(JSON.stringify(catalogue), { status: 200 });
      attempt += 1;
      return attempt === 1
        ? new Response("nope", { status: 500 })
        : new Response(JSON.stringify(surahFile(2)), { status: 200 });
    }));
    vi.resetModules();
    const mod = await import("./recitations");
    await expect(mod.loadSurahSource("husary_muallim_timed", 2)).rejects.toThrow();
    await expect(mod.loadSurahSource("husary_muallim_timed", 2)).resolves.not.toBeNull();
  });
});
