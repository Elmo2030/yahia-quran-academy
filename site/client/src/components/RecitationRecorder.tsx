// =============================================================================
// RecitationRecorder — the "record" step, which the site named in three places
// and did not have.
//
// Deliberately has no scoring. The product decision is that the child and the
// parent judge the recitation, not an algorithm, so this records, plays back,
// and lets you try again. Nothing is uploaded and nothing is stored: the audio
// lives in a blob URL for as long as the page is open and is revoked when it
// is replaced or the component unmounts. On a site for children that is the
// only defensible default.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Loader2, Mic, Pause, Play, RotateCcw, Square, Trash2 } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import {
  deleteRecording,
  getRecording,
  listRecordings,
  pickRecordingMimeType,
  recordingsAvailable,
  saveRecording,
  type RecordingSummary,
} from "@/lib/recordings";

const copy = {
  ar: {
    title: "سجّل تلاوتك",
    hint: "سجّل، ثم استمع لنفسك وقارن بتلاوة الشيخ. التسجيلات محفوظة على جهازك وحده ولا تُرسل إلى أي مكان.",
    start: "ابدأ التسجيل",
    stop: "أوقف التسجيل",
    recording: "جارٍ التسجيل",
    play: "استمع لتسجيلك",
    pause: "إيقاف",
    again: "سجّل مرة أخرى",
    asking: "في انتظار إذن الميكروفون…",
    denied: "لم يُسمح باستخدام الميكروفون. اسمح به من إعدادات المتصفح ثم حاول مرة أخرى.",
    noDevice: "لم نجد ميكروفونًا متاحًا على هذا الجهاز.",
    unsupported: "متصفحك لا يدعم التسجيل الصوتي. جرّب متصفحًا آخر.",
    failed: "تعذّر بدء التسجيل. حاول مرة أخرى.",
    saved: "تسجيلاتك المحفوظة",
    noStorage: "لا يمكن حفظ التسجيلات في هذا المتصفح (قد يكون في وضع التصفح الخاص). التسجيل سيعمل لكنه لن يبقى بعد إغلاق الصفحة.",
    download: "نزّل الملف",
    remove: "احذف",
    empty: "لا توجد تسجيلات محفوظة لهذه السورة بعد.",
  },
  en: {
    title: "Record your recitation",
    hint: "Record, then listen back and compare with the sheikh. Recordings are saved on your device only and are never uploaded.",
    start: "Start recording",
    stop: "Stop recording",
    recording: "Recording",
    play: "Listen to your recording",
    pause: "Pause",
    again: "Record again",
    asking: "Waiting for microphone permission…",
    denied: "Microphone access was refused. Allow it in your browser settings and try again.",
    noDevice: "No microphone was found on this device.",
    unsupported: "This browser cannot record audio. Try a different one.",
    failed: "Recording could not start. Try again.",
    saved: "Your saved recordings",
    noStorage: "This browser cannot save recordings — it may be in private mode. Recording still works, but nothing will be kept after you close the page.",
    download: "Download",
    remove: "Delete",
    empty: "No saved recordings for this surah yet.",
  },
} as const;

/** Safari does not produce webm; ask the browser what it can actually write. */
const pickMimeType = pickRecordingMimeType;

const mmss = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

type State = "idle" | "asking" | "recording" | "ready";

export function RecitationRecorder({ surah }: { surah: number }) {
  const { locale } = useLocale();
  const t = copy[locale];

  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [clipUrl, setClipUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [saved, setSaved] = useState<RecordingSummary[]>([]);
  const [canStore, setCanStore] = useState(true);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const tickRef = useRef<number | null>(null);
  // Held in a ref as well so cleanup can revoke the current URL without
  // re-running on every state change.
  const clipUrlRef = useRef<string | null>(null);

  const releaseMic = useCallback(() => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  }, []);

  const refresh = useCallback(async () => {
    try {
      // Ayah takes from the memorization journey live on its own screen.
      setSaved((await listRecordings(surah)).filter(r => !r.ayah));
    } catch {
      setSaved([]);
    }
  }, [surah]);

  useEffect(() => {
    void recordingsAvailable().then(setCanStore);
    void refresh();
  }, [refresh]);

  useEffect(() => () => {
    releaseMic();
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (clipUrlRef.current) URL.revokeObjectURL(clipUrlRef.current);
  }, [releaseMic]);

  const start = useCallback(async () => {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError(t.unsupported);
      return;
    }
    setState("asking");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      const name = (err as DOMException)?.name;
      setError(name === "NotAllowedError" || name === "SecurityError" ? t.denied
        : name === "NotFoundError" ? t.noDevice
        : t.failed);
      setState("idle");
      return;
    }

    streamRef.current = stream;
    const mimeType = pickMimeType();
    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    } catch {
      releaseMic();
      setError(t.unsupported);
      setState("idle");
      return;
    }

    const chunks: BlobPart[] = [];
    recorder.ondataavailable = event => { if (event.data.size > 0) chunks.push(event.data); };
    const startedAt = Date.now();
    recorder.onstop = () => {
      releaseMic();
      if (clipUrlRef.current) URL.revokeObjectURL(clipUrlRef.current);
      const type = mimeType ?? "audio/webm";
      const blob = new Blob(chunks, { type });
      const url = URL.createObjectURL(blob);
      clipUrlRef.current = url;
      setClipUrl(url);
      setState("ready");
      // Kept on the device. A failure here must not lose the take that is
      // already playable above.
      void saveRecording({
        surah,
        blob,
        mimeType: type,
        seconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
      }).then(refresh).catch(() => setCanStore(false));
    };

    recorderRef.current = recorder;
    recorder.start();
    setSeconds(0);
    setState("recording");
    tickRef.current = window.setInterval(() => setSeconds(s => s + 1), 1000);
  }, [releaseMic, refresh, surah, t]);

  const stop = useCallback(() => {
    if (tickRef.current) { window.clearInterval(tickRef.current); tickRef.current = null; }
    recorderRef.current?.stop();
    recorderRef.current = null;
  }, []);

  const togglePlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (player.paused) void player.play(); else player.pause();
  }, []);

  return (
    <section className="recorder" aria-label={t.title}>
      <div className="recorder__head">
        <span className="recorder__title"><Mic size={15} aria-hidden="true" /> {t.title}</span>
        {state === "recording" && (
          <span className="recorder__timer" role="timer" aria-live="off">
            <span className="recorder__dot" aria-hidden="true" /> {t.recording} {mmss(seconds)}
          </span>
        )}
      </div>

      <p className="recorder__hint">{t.hint}</p>

      <div className="recorder__controls">
        {state !== "recording" && (
          <button type="button" className="button button--primary" onClick={start} disabled={state === "asking"}>
            {state === "asking"
              ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> {t.asking}</>
              : <><Mic size={17} aria-hidden="true" /> {clipUrl ? t.again : t.start}</>}
          </button>
        )}

        {state === "recording" && (
          <button type="button" className="button button--primary" onClick={stop}>
            <Square size={15} fill="currentColor" aria-hidden="true" /> {t.stop}
          </button>
        )}

        {clipUrl && state !== "recording" && (
          <button type="button" className="button button--soft" onClick={togglePlayback}>
            {playing
              ? <><Pause size={17} fill="currentColor" aria-hidden="true" /> {t.pause}</>
              : <><Play size={17} fill="currentColor" aria-hidden="true" /> {t.play}</>}
          </button>
        )}
      </div>

      {clipUrl && (
        <audio
          ref={playerRef}
          src={clipUrl}
          controls
          className="recorder__player"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      )}

      {error && <p className="recorder__error" role="alert"><RotateCcw size={14} aria-hidden="true" /> {error}</p>}
      {!canStore && <p className="recorder__note">{t.noStorage}</p>}

      {canStore && (
        <div className="recorder__saved">
          <span className="recorder__saved-title">{t.saved}</span>
          {saved.length === 0 ? (
            <p className="recorder__note">{t.empty}</p>
          ) : (
            <ul className="recorder__list">
              {saved.map(clip => (
                <li key={clip.id}>
                  <span className="recorder__when">
                    {new Date(clip.recordedAt).toLocaleString(locale === "ar" ? "ar-EG" : "en-GB", {
                      dateStyle: "short", timeStyle: "short",
                    })}
                  </span>
                  <span className="recorder__length">{mmss(clip.seconds)}</span>
                  <button
                    type="button"
                    className="recorder__icon"
                    aria-label={`${t.play} — ${mmss(clip.seconds)}`}
                    onClick={async () => {
                      const full = await getRecording(clip.id);
                      if (!full) return;
                      if (clipUrlRef.current) URL.revokeObjectURL(clipUrlRef.current);
                      const url = URL.createObjectURL(full.blob);
                      clipUrlRef.current = url;
                      setClipUrl(url);
                      window.setTimeout(() => void playerRef.current?.play(), 0);
                    }}
                  >
                    <Play size={15} fill="currentColor" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="recorder__icon"
                    aria-label={t.download}
                    onClick={async () => {
                      const full = await getRecording(clip.id);
                      if (!full) return;
                      const url = URL.createObjectURL(full.blob);
                      const link = document.createElement("a");
                      link.href = url;
                      const ext = full.mimeType.includes("mp4") ? "m4a" : full.mimeType.includes("ogg") ? "ogg" : "webm";
                      link.download = `surah-${clip.surah}-${new Date(clip.recordedAt).toISOString().slice(0, 16).replace(/[:T]/g, "-")}.${ext}`;
                      document.body.appendChild(link);
                      link.click();
                      link.remove();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <Download size={15} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="recorder__icon recorder__icon--danger"
                    aria-label={t.remove}
                    onClick={async () => { await deleteRecording(clip.id); await refresh(); }}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export default RecitationRecorder;
