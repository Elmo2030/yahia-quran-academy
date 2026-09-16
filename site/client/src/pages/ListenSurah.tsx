// =============================================================================
// ListenSurah — one surah, playing.
//
// The browser's own <audio> does the work: these files are constant-bitrate
// MP3s served from R2, so seeking is exact and nothing has to be downloaded
// whole before it starts. What this screen adds is what a listener actually
// needs — a place it remembers, the next surah when this one ends, a sleep
// timer for the night, and the lock-screen controls a phone expects while the
// screen is off.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import {
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Loader2, Moon, Pause, Play, RotateCcw, RotateCw, Repeat,
} from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { SLEEP_CHOICES, clock, loadMarks, positionOf, rememberPosition, roughLength, type SleepChoice } from "@/lib/listening";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";
import { listeningRecitations, loadSurahSource, type SurahAudioSource } from "@/lib/recitations";
import NotFound from "@/pages/NotFound";

const SKIP_SECONDS = 15;

/**
 * Set as one surah hands over to the next, and read once by the surah that
 * arrives. It lives outside React because the two screens are different mounts
 * of the same component, and the browser counts them as one document — so the
 * click that started the first surah still permits the next one to play.
 */
let continueInto: number | null = null;

const copy = {
  ar: {
    back: "كل السور",
    eyebrow: "الاستماع",
    surah: (name: string) => `سورة ${name}`,
    play: "تشغيل",
    pause: "إيقاف مؤقت",
    back15: "١٥ ثانية للخلف",
    forward15: "١٥ ثانية للأمام",
    previous: "السورة السابقة",
    next: "السورة التالية",
    continuous: "تشغيل متواصل",
    continuousHint: "يبدأ السورة التالية تلقائيًا عند انتهاء هذه.",
    sleep: "مؤقّت النوم",
    sleepOff: "بدون",
    sleepIn: (minutes: number) => `${minutes} دقيقة`,
    sleepLeft: (at: string) => `يتوقّف بعد ${at}`,
    loading: "جاري التحضير…",
    failed: "تعذّر تشغيل هذه السورة.",
    retry: "حاول مرة أخرى",
    length: "المدة",
    ayahs: "الآيات",
    reciter: "التلاوة",
    resumed: (at: string) => `أكملنا من ${at}`,
    startOver: "من البداية",
  },
  en: {
    back: "All surahs",
    eyebrow: "Listening",
    surah: (name: string) => `Surah ${name}`,
    play: "Play",
    pause: "Pause",
    back15: "Back 15 seconds",
    forward15: "Forward 15 seconds",
    previous: "Previous surah",
    next: "Next surah",
    continuous: "Keep playing",
    continuousHint: "Starts the next surah when this one ends.",
    sleep: "Sleep timer",
    sleepOff: "Off",
    sleepIn: (minutes: number) => `${minutes} min`,
    sleepLeft: (at: string) => `Stops in ${at}`,
    loading: "Getting it ready…",
    failed: "This surah could not play.",
    retry: "Try again",
    length: "Length",
    ayahs: "Ayahs",
    reciter: "Recited by",
    resumed: (at: string) => `Carried on from ${at}`,
    startOver: "From the start",
  },
};

type Copy = (typeof copy)["ar"];

export default function ListenSurah() {
  const [, params] = useRoute("/listen/:surah");
  const surah = Number(params?.surah);
  const { direction, locale } = useLocale();
  const t = copy[locale];

  if (!Number.isInteger(surah) || surah < 1 || surah > 114) return <NotFound />;

  return (
    <main className="site-shell listen" dir={direction}>
      <SkipLink />
      <SiteChrome />
      <div id={MAIN_CONTENT_ID}>
        <Player key={surah} t={t} surah={surah} locale={locale} />
      </div>
    </main>
  );
}

function Player({ t, surah, locale }: { t: Copy; surah: number; locale: "ar" | "en" }) {
  const [, navigate] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [source, setSource] = useState<SurahAudioSource | null>(null);
  const [reciter, setReciter] = useState<{ nameAr: string; nameEn: string } | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const [attempt, setAttempt] = useState(0);

  const [playing, setPlaying] = useState(false);
  const [at, setAt] = useState(0);
  const [duration, setDuration] = useState(0);
  const [resumedFrom, setResumedFrom] = useState(0);
  const [continuous, setContinuous] = useState(true);
  const [sleepAt, setSleepAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const name = locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah);
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;
  const Previous = locale === "ar" ? ChevronRight : ChevronLeft;
  const Next = locale === "ar" ? ChevronLeft : ChevronRight;

  // ---- the audio itself ---------------------------------------------------
  useEffect(() => {
    let live = true;
    setState("loading");
    listeningRecitations()
      .then(async list => {
        const first = list[0];
        if (!first) throw new Error("no listening recitation");
        const loaded = await loadSurahSource(first.id, surah);
        if (!live) return;
        if (!loaded) throw new Error("no audio for this surah");
        setReciter({ nameAr: first.nameAr, nameEn: first.nameEn });
        setSource(loaded);
        setState("ready");
      })
      .catch(() => { if (live) setState("failed"); });
    return () => { live = false; };
  }, [surah, attempt]);

  // Pick up where this surah was left, once the file knows how long it is.
  const onLoaded = () => {
    const media = audioRef.current;
    if (!media) return;
    setDuration(media.duration || 0);
    const mark = positionOf(loadMarks(), surah);
    if (mark > 0 && mark < (media.duration || 0) - 5) {
      media.currentTime = mark;
      setAt(mark);
      setResumedFrom(mark);
    }
    // Handed over from the surah before: carry on without asking again.
    if (continueInto === surah) {
      continueInto = null;
      media.currentTime = 0;
      setResumedFrom(0);
      void media.play().catch(() => undefined);
    }
  };

  // The place is written every few seconds rather than every frame: this is a
  // two-hour surah, and localStorage is synchronous.
  const lastWrite = useRef(0);
  const onTime = () => {
    const media = audioRef.current;
    if (!media) return;
    setAt(media.currentTime);
    if (media.currentTime - lastWrite.current > 5 || media.currentTime < lastWrite.current) {
      lastWrite.current = media.currentTime;
      rememberPosition(surah, media.currentTime, media.duration || 0);
    }
  };

  const toggle = useCallback(() => {
    const media = audioRef.current;
    if (!media) return;
    if (media.paused) void media.play().catch(() => setState("failed"));
    else media.pause();
  }, []);

  const nudge = (seconds: number) => {
    const media = audioRef.current;
    if (!media) return;
    media.currentTime = Math.min(Math.max(media.currentTime + seconds, 0), media.duration || 0);
    setAt(media.currentTime);
  };

  const goTo = (next: number) => {
    if (next < 1 || next > 114) return;
    navigate(`/listen/${next}`);
  };

  const onEnded = () => {
    setPlaying(false);
    rememberPosition(surah, 0, duration);
    if (continuous && surah < 114) {
      continueInto = surah + 1;
      goTo(surah + 1);
    }
  };

  // ---- the sleep timer ----------------------------------------------------
  useEffect(() => {
    if (sleepAt === null) return;
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(tick);
  }, [sleepAt]);

  useEffect(() => {
    if (sleepAt === null || now < sleepAt) return;
    audioRef.current?.pause();
    setSleepAt(null);
  }, [now, sleepAt]);

  // ---- the lock screen ----------------------------------------------------
  useEffect(() => {
    const media = navigator.mediaSession;
    if (!media) return;
    media.metadata = new MediaMetadata({
      title: t.surah(name),
      artist: reciter ? (locale === "ar" ? reciter.nameAr : reciter.nameEn) : "",
      album: locale === "ar" ? "المصحف المرتل" : "Murattal mushaf",
      artwork: [{ src: "/app-icon-512.png", sizes: "512x512", type: "image/png" }],
    });
    const handlers: [MediaSessionAction, () => void][] = [
      ["play", () => void audioRef.current?.play()],
      ["pause", () => audioRef.current?.pause()],
      ["seekbackward", () => nudge(-SKIP_SECONDS)],
      ["seekforward", () => nudge(SKIP_SECONDS)],
      ["previoustrack", () => goTo(surah - 1)],
      ["nexttrack", () => goTo(surah + 1)],
    ];
    for (const [action, handler] of handlers) {
      try {
        media.setActionHandler(action, handler);
      } catch {
        // An action this browser does not know about is not worth a failure.
      }
    }
    return () => {
      for (const [action] of handlers) {
        try {
          media.setActionHandler(action, null);
        } catch {
          // nothing to undo
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, reciter, locale, surah]);

  if (state === "failed") {
    return (
      <section className="section listen-section">
        <div className="container listen-stack">
          <p className="listen-note" role="alert">
            {t.failed} <button type="button" className="text-link" onClick={() => setAttempt(a => a + 1)}>{t.retry}</button>
          </p>
          <Link href="/listen" className="button button--soft"><Back size={17} aria-hidden="true" /> {t.back}</Link>
        </div>
      </section>
    );
  }

  const left = sleepAt === null ? null : Math.max(0, Math.round((sleepAt - now) / 1000));

  return (
    <section className="section listen-section">
      <div className="container listen-stack">
        <header className="listen-player__bar">
          <Link href="/listen" className="hifz-back"><Back size={17} aria-hidden="true" /> {t.back}</Link>
          <span className="eyebrow eyebrow--gold">{t.eyebrow}</span>
        </header>

        <article className="listen-player">
          <h1>{t.surah(name)}</h1>
          <dl className="listen-facts listen-facts--player">
            {source && <div><dt>{t.length}</dt><dd>{roughLength(source.durationMs, locale)}</dd></div>}
            {source && <div><dt>{t.ayahs}</dt><dd>{source.ayahCount}</dd></div>}
            {reciter && <div><dt>{t.reciter}</dt><dd>{locale === "ar" ? reciter.nameAr : reciter.nameEn}</dd></div>}
          </dl>

          <div className="listen-seek">
            <span className="listen-seek__time">{clock(at)}</span>
            <input
              type="range"
              min={0}
              max={Math.max(duration, 1)}
              step={1}
              value={Math.min(at, duration || 0)}
              aria-label={t.surah(name)}
              onChange={event => {
                const media = audioRef.current;
                if (!media) return;
                media.currentTime = Number(event.target.value);
                setAt(media.currentTime);
              }}
            />
            <span className="listen-seek__time">{clock(Math.max(duration - at, 0))}</span>
          </div>

          {resumedFrom > 0 && (
            <p className="listen-resumed">
              {t.resumed(clock(resumedFrom))}
              <button
                type="button"
                className="text-link"
                onClick={() => { const media = audioRef.current; if (media) { media.currentTime = 0; setAt(0); } setResumedFrom(0); }}
              >
                {t.startOver}
              </button>
            </p>
          )}

          <div className="listen-controls">
            <button type="button" className="listen-round" onClick={() => goTo(surah - 1)} disabled={surah === 1} aria-label={t.previous}><Previous size={20} aria-hidden="true" /></button>
            <button type="button" className="listen-round" onClick={() => nudge(-SKIP_SECONDS)} aria-label={t.back15}><RotateCcw size={19} aria-hidden="true" /></button>
            <button type="button" className="listen-play" onClick={toggle} aria-label={playing ? t.pause : t.play}>
              {state === "loading" ? <Loader2 className="animate-spin" size={26} aria-hidden="true" />
                : playing ? <Pause size={26} aria-hidden="true" /> : <Play size={26} aria-hidden="true" />}
            </button>
            <button type="button" className="listen-round" onClick={() => nudge(SKIP_SECONDS)} aria-label={t.forward15}><RotateCw size={19} aria-hidden="true" /></button>
            <button type="button" className="listen-round" onClick={() => goTo(surah + 1)} disabled={surah === 114} aria-label={t.next}><Next size={20} aria-hidden="true" /></button>
          </div>

          <div className="listen-options">
            <label className="listen-toggle">
              <input type="checkbox" checked={continuous} onChange={event => setContinuous(event.target.checked)} />
              <span><Repeat size={15} aria-hidden="true" /> {t.continuous}<small>{t.continuousHint}</small></span>
            </label>

            <div className="listen-sleep" role="group" aria-label={t.sleep}>
              <span className="listen-sleep__label"><Moon size={15} aria-hidden="true" /> {t.sleep}</span>
              <div className="listen-sleep__choices">
                <button type="button" className={sleepAt === null ? "is-on" : ""} onClick={() => setSleepAt(null)}>{t.sleepOff}</button>
                {SLEEP_CHOICES.map((minutes: SleepChoice) => (
                  <button
                    key={minutes}
                    type="button"
                    className={left !== null && Math.abs(left - minutes * 60) < 30 ? "is-on" : ""}
                    onClick={() => { setNow(Date.now()); setSleepAt(Date.now() + minutes * 60_000); }}
                  >
                    {t.sleepIn(minutes)}
                  </button>
                ))}
              </div>
              {left !== null && <p className="listen-sleep__left">{t.sleepLeft(clock(left))}</p>}
            </div>
          </div>
        </article>

        {source && (
          <audio
            ref={audioRef}
            src={source.playbackUrl}
            preload="metadata"
            onLoadedMetadata={onLoaded}
            onTimeUpdate={onTime}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={onEnded}
            onError={() => setState("failed")}
          />
        )}
      </div>
    </section>
  );
}
