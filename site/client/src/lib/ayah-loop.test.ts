import { describe, expect, it } from "vitest";

import { END_GUARD_MS, playAyahLoop, type MediaLike } from "./ayah-loop";

/** A media element whose clock moves only when the loop sleeps. */
function fakeMedia() {
  const listeners = new Map<string, (() => void)[]>();
  const log: string[] = [];
  let playing = false;
  const media: MediaLike & { advance(ms: number): void; log: string[] } = {
    currentTime: 0,
    ended: false,
    readyState: 4,
    log,
    play: async () => { playing = true; log.push(`play@${Math.round(media.currentTime * 1000)}`); },
    pause: () => { playing = false; log.push(`pause@${Math.round(media.currentTime * 1000)}`); },
    addEventListener: (type, listener) => {
      listeners.set(type, [...(listeners.get(type) ?? []), listener]);
      // A seek completes on the next turn, as it does in a browser.
      if (type === "seeked") queueMicrotask(() => { const l = listeners.get("seeked") ?? []; listeners.set("seeked", []); l.forEach(f => f()); });
    },
    removeEventListener: () => {},
    advance(ms) { if (playing) this.currentTime += ms / 1000; },
  };
  return media;
}

describe("playing one ayah on repeat", () => {
  it("plays the window the chosen number of times and stops before the next ayah", async () => {
    const media = fakeMedia();
    const passes: number[] = [];
    const sleeps: number[] = [];
    const done = await playAyahLoop(media, { startMs: 1000, endMs: 1200 }, 3, {
      cancelled: () => false,
      onPass: pass => passes.push(pass),
      gapMs: 500,
      tickMs: 25,
      sleep: async ms => { sleeps.push(ms); media.advance(ms); },
    });
    expect(done).toBe(true);
    expect(passes).toEqual([1, 2, 3]);
    expect(media.log.filter(e => e.startsWith("play"))).toEqual(["play@1000", "play@1000", "play@1000"]);
    for (const entry of media.log.filter(e => e.startsWith("pause"))) {
      const at = Number(entry.split("@")[1]);
      expect(at).toBeGreaterThanOrEqual(1200 - END_GUARD_MS);
      expect(at).toBeLessThan(1200 + 25);
    }
    expect(sleeps.filter(ms => ms === 500)).toHaveLength(2); // a gap between passes, not after the last
  });

  it("clamps the repeat count to 1-5", async () => {
    for (const [asked, expected] of [[0, 1], [9, 5]] as const) {
      const media = fakeMedia();
      let passes = 0;
      await playAyahLoop(media, { startMs: 0, endMs: 60 }, asked, {
        cancelled: () => false, onPass: () => passes++, gapMs: 0, sleep: async ms => media.advance(ms || 1),
      });
      expect(passes).toBe(expected);
    }
  });

  it("stops quietly when cancelled mid-pass", async () => {
    const media = fakeMedia();
    let stop = false;
    const passes: number[] = [];
    const done = await playAyahLoop(media, { startMs: 0, endMs: 10_000 }, 3, {
      cancelled: () => stop,
      onPass: pass => passes.push(pass),
      sleep: async ms => { media.advance(ms); if (media.currentTime > 1) stop = true; },
    });
    expect(done).toBe(false);
    expect(passes).toEqual([]);
    expect(media.log.at(-1)).toMatch(/^pause/);
  });

  it("waits for metadata before seeking a file that has not loaded", async () => {
    const media = fakeMedia();
    (media as { readyState: number }).readyState = 0;
    const order: string[] = [];
    const realAdd = media.addEventListener;
    media.addEventListener = (type, listener, options) => {
      order.push(type);
      if (type === "loadedmetadata") queueMicrotask(listener);
      else realAdd(type, listener, options);
    };
    await playAyahLoop(media, { startMs: 0, endMs: 50 }, 1, { cancelled: () => false, sleep: async ms => media.advance(ms) });
    expect(order.slice(0, 2)).toEqual(["loadedmetadata", "seeked"]);
  });
});
