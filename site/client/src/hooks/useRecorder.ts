// =============================================================================
// useRecorder — recording a child's own voice, kept on this device.
//
// Extracted from HifzSurah's ayah-by-ayah recorder so the recital screen (a
// whole segment recited in one take, judged by a parent) shares the same
// microphone handling and IndexedDB save-and-cap logic instead of a second
// copy that could drift from it. What differs between the two screens —
// HifzSurah's small "سجّل صوتك" button versus the recital's stand of
// idle/recording/reviewed cards — stays in each screen; this hook only knows
// about the microphone and the saved take.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getRecording, listAyahRecordings, listSegmentRecordings, pickRecordingMimeType, saveRecording,
  type RecordingSummary,
} from "@/lib/recordings";

export type RecorderTarget =
  | { surah: number; ayah: number; profileId: string }
  | { surah: number; from: number; to: number; profileId: string };

export type RecorderMessages = { micDenied: string; micMissing: string; micUnsupported: string };

export type RecorderState = "idle" | "asking" | "recording";

/** A take longer than this is not a recitation any more. Matches the limit
 *  HifzSurah shipped with. */
const MAX_TAKE_SECONDS = 90;

const targetKey = (target: RecorderTarget) =>
  "ayah" in target ? `${target.surah}:${target.ayah}:${target.profileId}` : `${target.surah}:${target.from}-${target.to}:${target.profileId}`;

function latestFor(target: RecorderTarget): Promise<RecordingSummary[]> {
  return "ayah" in target
    ? listAyahRecordings(target.surah, target.ayah, target.profileId)
    : listSegmentRecordings(target.surah, target.from, target.to, target.profileId);
}

/**
 * `onSaved` fires once a take is stopped, whether or not it made it into
 * IndexedDB — a full device or private browsing should not stop the child
 * from having recited, only from the recording persisting. It carries the
 * saved summary when there is one, so a caller that needs the recording's id
 * (a recital's "ready for a parent") can read it off `latest` once this
 * resolves, and gets nothing to act on when the save failed.
 */
export function useRecorder(target: RecorderTarget, messages: RecorderMessages, onSaved?: (summary?: RecordingSummary) => void) {
  const [state, setState] = useState<RecorderState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [latest, setLatest] = useState<RecordingSummary | null>(null);
  const [clipUrl, setClipUrl] = useState<string | null>(null);
  const [savedNote, setSavedNote] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const tick = useRef<number | null>(null);
  const urlRef = useRef<string | null>(null);
  const targetRef = useRef(target);
  targetRef.current = target;

  const release = () => {
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
    if (tick.current) window.clearInterval(tick.current);
    tick.current = null;
  };

  const showLatest = useCallback(async () => {
    try {
      const [take] = await latestFor(targetRef.current);
      setLatest(take ?? null);
      if (!take) return;
      const full = await getRecording(take.id);
      if (!full) return;
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = URL.createObjectURL(full.blob);
      setClipUrl(urlRef.current);
    } catch {
      setLatest(null);
    }
    // Re-runs on the target's identity (what it points at), not a new object
    // literal a caller happens to pass on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetKey(target)]);

  useEffect(() => { void showLatest(); }, [showLatest]);
  useEffect(() => () => {
    recorder.current?.state === "recording" && recorder.current.stop();
    release();
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  const stopRecording = useCallback(() => {
    if (recorder.current?.state === "recording") recorder.current.stop();
  }, []);

  const start = async () => {
    setError(null);
    setSavedNote(false);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") { setError(messages.micUnsupported); return; }
    setState("asking");
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      const name = (err as DOMException)?.name;
      setError(name === "NotAllowedError" || name === "SecurityError" ? messages.micDenied : name === "NotFoundError" ? messages.micMissing : messages.micUnsupported);
      setState("idle");
      return;
    }
    const mimeType = pickRecordingMimeType();
    let rec: MediaRecorder;
    try {
      rec = new MediaRecorder(stream.current, mimeType ? { mimeType } : undefined);
    } catch {
      release();
      setError(messages.micUnsupported);
      setState("idle");
      return;
    }
    const chunks: BlobPart[] = [];
    const startedAt = Date.now();
    rec.ondataavailable = event => { if (event.data.size > 0) chunks.push(event.data); };
    rec.onstop = () => {
      release();
      setState("idle");
      const type = mimeType ?? "audio/webm";
      const blob = new Blob(chunks, { type });
      if (blob.size === 0) return;
      const took = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      const current = targetRef.current;
      void saveRecording({
        surah: current.surah, blob, mimeType: type, seconds: took, profileId: current.profileId,
        ...("ayah" in current ? { ayah: current.ayah } : { from: current.from, to: current.to }),
      })
        .then(summary => { setSavedNote(true); return showLatest().then(() => onSaved?.(summary)); })
        .catch(() => {
          // Not stored, but still playable while the page is open.
          if (urlRef.current) URL.revokeObjectURL(urlRef.current);
          urlRef.current = URL.createObjectURL(blob);
          setClipUrl(urlRef.current);
          onSaved?.();
        });
    };
    recorder.current = rec;
    rec.start();
    setSeconds(0);
    setState("recording");
    tick.current = window.setInterval(() => {
      setSeconds(s => {
        if (s + 1 >= MAX_TAKE_SECONDS) stopRecording();
        return s + 1;
      });
    }, 1000);
  };

  return { state, seconds, error, latest, clipUrl, savedNote, start, stop: stopRecording };
}

export default useRecorder;
