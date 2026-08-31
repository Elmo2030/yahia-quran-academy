/**
 * Recordings are the one thing on this site the child produces themselves,
 * and they are stored only on their device. If the store silently drops them
 * there is no server copy to fall back on, so the round trip is worth testing.
 */
import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";

import {
  deleteRecording,
  getRecording,
  listRecordings,
  recordingsAvailable,
  saveRecording,
} from "@/lib/recordings";

const clip = (surah: number, seconds = 5) => ({
  surah,
  blob: new Blob([new Uint8Array([1, 2, 3, 4])], { type: "audio/webm" }),
  mimeType: "audio/webm",
  seconds,
});

describe("recordings", () => {
  beforeEach(async () => {
    for (const surah of [1, 2]) {
      for (const c of await listRecordings(surah)) await deleteRecording(c.id);
    }
  });

  it("reports that storage is available", async () => {
    expect(await recordingsAvailable()).toBe(true);
  });

  it("stores a recording and reads the audio back unchanged", async () => {
    const saved = await saveRecording(clip(1, 12));
    const found = await getRecording(saved.id);
    expect(found).toBeDefined();
    expect(found!.seconds).toBe(12);
    expect(found!.surah).toBe(1);
    expect(found!.mimeType).toBe("audio/webm");
    const bytes = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(found!.blob);
    });
    expect(new Uint8Array(bytes)).toEqual(new Uint8Array([1, 2, 3, 4]));
  });

  it("keeps each surah's recordings separate", async () => {
    await saveRecording(clip(1));
    await saveRecording(clip(1));
    await saveRecording(clip(2));
    expect((await listRecordings(1)).length).toBe(2);
    expect((await listRecordings(2)).length).toBe(1);
    expect((await listRecordings(114)).length).toBe(0);
  });

  it("lists the newest first", async () => {
    const first = await saveRecording(clip(1));
    await new Promise(r => setTimeout(r, 5));
    const second = await saveRecording(clip(1));
    const listed = await listRecordings(1);
    expect(listed.map(c => c.id)).toEqual([second.id, first.id]);
  });

  it("does not put the audio in the listing", async () => {
    await saveRecording(clip(1));
    const [summary] = await listRecordings(1);
    expect("bytes" in summary).toBe(false);
  });

  it("deletes one recording without touching the others", async () => {
    const keep = await saveRecording(clip(1));
    const drop = await saveRecording(clip(1));
    await deleteRecording(drop.id);
    expect((await listRecordings(1)).map(c => c.id)).toEqual([keep.id]);
    expect(await getRecording(drop.id)).toBeUndefined();
  });
});
