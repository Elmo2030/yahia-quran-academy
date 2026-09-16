/**
 * Recordings are the one thing on this site the child produces themselves,
 * and they are stored only on their device. If the store silently drops them
 * there is no server copy to fall back on, so the round trip is worth testing.
 */
import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";

import {
  TAKES_PER_AYAH,
  deleteProfileRecordings,
  deleteRecording,
  getRecording,
  listAllRecordings,
  recordingsUse,
  listAyahRecordings,
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

describe("the memorization journey's takes", () => {
  beforeEach(async () => {
    for (const take of await listAllRecordings()) await deleteRecording(take.id);
  });

  it("keeps only the newest few takes of one ayah, per child", async () => {
    for (let i = 0; i < TAKES_PER_AYAH + 3; i++) {
      await saveRecording({ ...clip(114, i + 1), ayah: 1, profileId: "child-a" });
    }
    await saveRecording({ ...clip(114, 99), ayah: 1, profileId: "child-b" });
    const mine = await listAyahRecordings(114, 1, "child-a");
    expect(mine).toHaveLength(TAKES_PER_AYAH);
    // The newest survive: the last three lengths recorded.
    expect(mine.map(take => take.seconds).sort((a, b) => a - b)).toEqual([4, 5, 6]);
    // Another child's take of the same ayah is untouched.
    expect(await listAyahRecordings(114, 1, "child-b")).toHaveLength(1);
  });

  it("leaves the reader's whole-surah recordings uncapped", async () => {
    for (let i = 0; i < TAKES_PER_AYAH + 2; i++) await saveRecording(clip(2, i + 1));
    expect(await listRecordings(2)).toHaveLength(TAKES_PER_AYAH + 2);
  });

  it("removes everything one child recorded when their profile goes", async () => {
    await saveRecording({ ...clip(114), ayah: 1, profileId: "gone" });
    await saveRecording({ ...clip(113), ayah: 2, profileId: "gone" });
    await saveRecording({ ...clip(112), ayah: 1, profileId: "stays" });
    expect(await deleteProfileRecordings("gone")).toBe(2);
    expect((await listAllRecordings()).map(t => t.profileId)).toEqual(["stays"]);
  });
});

describe("how much of the device the recordings use", () => {
  beforeEach(async () => {
    for (const take of await listAllRecordings()) await deleteRecording(take.id);
  });

  it("adds up the audio, per child", async () => {
    await saveRecording({ ...clip(114), ayah: 1, profileId: "a" });
    await saveRecording({ ...clip(113), ayah: 1, profileId: "a" });
    await saveRecording({ ...clip(112), ayah: 1, profileId: "b" });
    const use = await recordingsUse();
    expect(use.takes).toBe(3);
    expect(use.bytes).toBe(12); // four bytes a clip in these tests
    expect(use.byProfile.a).toEqual({ takes: 2, bytes: 8 });
    expect(use.byProfile.b).toEqual({ takes: 1, bytes: 4 });
    expect(use.reader).toEqual({ takes: 0, bytes: 0 });
  });

  it("counts the reader's own recordings apart from the journey's", async () => {
    await saveRecording(clip(2)); // the reader: no child, no ayah
    await saveRecording({ ...clip(114), ayah: 1, profileId: "a" });
    const use = await recordingsUse();
    expect(use.reader).toEqual({ takes: 1, bytes: 4 });
    expect(use.byProfile).toEqual({ a: { takes: 1, bytes: 4 } });
  });

  it("reports an empty device as empty", async () => {
    expect(await recordingsUse()).toEqual({ takes: 0, bytes: 0, byProfile: {}, reader: { takes: 0, bytes: 0 } });
  });
});
