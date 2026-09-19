// @vitest-environment jsdom
/**
 * useRecorder is what HifzSurah's ayah recorder was extracted into so the
 * recital screen could reuse the same microphone handling rather than a
 * second copy of it. These tests exercise the mechanics directly: the mic
 * permission paths, and that a finished take reaches IndexedDB keyed the
 * right way for whichever kind of target it was recorded for.
 */
import "fake-indexeddb/auto";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useRecorder } from "@/hooks/useRecorder";
import { deleteRecording, listAyahRecordings, listRecordings, listSegmentRecordings } from "@/lib/recordings";

const messages = { micDenied: "denied", micMissing: "missing", micUnsupported: "unsupported" };

class FakeMediaRecorder {
  static isTypeSupported() {
    return true;
  }
  state: "inactive" | "recording" = "inactive";
  ondataavailable: ((event: { data: Blob }) => void) | null = null;
  onstop: (() => void) | null = null;
  constructor(public stream: MediaStream) {}
  start() {
    this.state = "recording";
  }
  stop() {
    this.state = "inactive";
    this.ondataavailable?.({ data: new Blob([new Uint8Array([1, 2, 3])], { type: "audio/webm" }) });
    this.onstop?.();
  }
}

function makeFakeStream() {
  const stop = vi.fn();
  return { stream: { getTracks: () => [{ stop }] } as unknown as MediaStream, stop };
}

function stubMic(behavior: "grant" | "denied" | "missing" | "unsupported") {
  if (behavior === "unsupported") {
    // @ts-expect-error -- simulating a browser with no MediaRecorder at all
    global.MediaRecorder = undefined;
    Object.defineProperty(navigator, "mediaDevices", { value: undefined, configurable: true });
    return;
  }
  global.MediaRecorder = FakeMediaRecorder as unknown as typeof MediaRecorder;
  const { stream, stop } = makeFakeStream();
  const getUserMedia = behavior === "grant"
    ? vi.fn().mockResolvedValue(stream)
    : vi.fn().mockRejectedValue(Object.assign(new Error("no"), { name: behavior === "denied" ? "NotAllowedError" : "NotFoundError" }));
  Object.defineProperty(navigator, "mediaDevices", { value: { getUserMedia }, configurable: true });
  return { stop };
}

describe("useRecorder", () => {
  beforeEach(async () => {
    for (const surah of [1, 114]) for (const take of await listRecordings(surah)) await deleteRecording(take.id);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("records an ayah take and saves it keyed by surah and ayah", async () => {
    stubMic("grant");
    const onSaved = vi.fn();
    const { result } = renderHook(() => useRecorder({ surah: 1, ayah: 2, profileId: "child-a" }, messages, onSaved));

    await act(async () => {
      await result.current.start();
    });
    expect(result.current.state).toBe("recording");

    act(() => {
      result.current.stop();
    });

    await waitFor(() => expect(onSaved).toHaveBeenCalled());
    expect(result.current.state).toBe("idle");
    expect(result.current.savedNote).toBe(true);
    const saved = await listAyahRecordings(1, 2, "child-a");
    expect(saved).toHaveLength(1);
  });

  it("stops an active microphone when the recording screen unmounts", async () => {
    const { stop } = stubMic("grant");
    const { result, unmount } = renderHook(() => useRecorder({ surah: 1, ayah: 2, profileId: "child-a" }, messages));

    await act(async () => {
      await result.current.start();
    });
    expect(result.current.state).toBe("recording");

    unmount();
    expect(stop).toHaveBeenCalledOnce();
  });

  it("records a recital segment and saves it keyed by surah, from and to — not by ayah", async () => {
    stubMic("grant");
    const onSaved = vi.fn();
    const { result } = renderHook(() => useRecorder({ surah: 114, from: 1, to: 3, profileId: "child-a" }, messages, onSaved));

    await act(async () => {
      await result.current.start();
    });
    act(() => {
      result.current.stop();
    });

    await waitFor(() => expect(onSaved).toHaveBeenCalled());
    const [saved] = await listSegmentRecordings(114, 1, 3, "child-a");
    expect(saved).toMatchObject({ surah: 114, from: 1, to: 3 });
    expect(saved.ayah).toBeUndefined();
  });

  it("reports a refused microphone without ever starting to record", async () => {
    stubMic("denied");
    const { result } = renderHook(() => useRecorder({ surah: 1, ayah: 1, profileId: "child-a" }, messages));

    await act(async () => {
      await result.current.start();
    });
    expect(result.current.error).toBe(messages.micDenied);
    expect(result.current.state).toBe("idle");
  });

  it("reports a missing microphone distinctly from a refused one", async () => {
    stubMic("missing");
    const { result } = renderHook(() => useRecorder({ surah: 1, ayah: 1, profileId: "child-a" }, messages));

    await act(async () => {
      await result.current.start();
    });
    expect(result.current.error).toBe(messages.micMissing);
  });

  it("reports a browser with no recording support at all, without asking for the microphone", async () => {
    stubMic("unsupported");
    const { result } = renderHook(() => useRecorder({ surah: 1, ayah: 1, profileId: "child-a" }, messages));

    await act(async () => {
      await result.current.start();
    });
    expect(result.current.error).toBe(messages.micUnsupported);
    expect(result.current.state).toBe("idle");
  });
});
