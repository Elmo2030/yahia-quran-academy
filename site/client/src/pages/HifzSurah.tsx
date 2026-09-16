// =============================================================================
// HifzSurah — the memorization screen, one ayah at a time.
//
// Listen to the sheikh repeat the ayah as many times as the child chose, then
// it is their turn: say it back, record it if they like, and — when they know
// it — say so. Every one of those is recorded as what it is. Nothing here
// decides whether a recitation was right; the site cannot hear that.
// =============================================================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft, ArrowRight, Check, CircleStop, Headphones, Loader2, Mic, Pause, Play, RotateCcw, SkipBack, SkipForward,
  Sparkles, Undo2, Users,
} from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { HifzBottomBar } from "@/components/HifzBottomBar";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { playAyahLoop } from "@/lib/ayah-loop";
import { characterArt, type Pose } from "@/lib/hifz-characters";
import {
  RECITATION_FOR, activeProfile, ayahKey, declareMemorized, markListened, markRecorded, surahProgress, updateSettings,
  withdrawDeclaration, type ChildProfile, type DeclaredBy, type HifzStore, type ReciterChoice,
} from "@/lib/hifz-store";
import { ayahCountOf, isJourneySurah, nextJourneySurah } from "@/lib/juz-amma";
import { getEnglishSurahName, getSurahName, loadSurah, type Ayah } from "@/lib/quran-content";
import { loadSurahSource, loadTiming, type SurahAudioSource, type TimedAyah } from "@/lib/recitations";
import {
  getRecording, listAyahRecordings, pickRecordingMimeType, saveRecording, type RecordingSummary,
} from "@/lib/recordings";

const copy = {
  ar: {
    back: "رحلة الحفظ",
    ayahOf: (n: number, total: number) => `الآية ${n} من ${total}`,
    loading: "نجهّز السورة…",
    loadFailed: "تعذّر تحميل السورة. تأكد من الاتصال ثم حاول مرة أخرى.",
    retry: "حاول مرة أخرى",
    noChild: "اختر من سيحفظ أولًا",
    noChildBody: "شاشة الحفظ تحفظ تقدّم كل طفل باسمه، فابدأ باختيار الطفل.",
    pickChild: "اختر الطفل",
    notInJourney: "هذه السورة ليست في رحلة جزء عمّ",
    notInJourneyBody: "الرحلة تبدأ بالفاتحة ثم جزء عمّ من الناس إلى النبأ.",
    reciters: { sheikh: "الشيخ فقط", sheikh_kids: "الشيخ والأطفال" } as Record<ReciterChoice, string>,
    reciterLabel: "طريقة الاستماع",
    play: "استمع",
    pause: "إيقاف",
    again: "استمع مرة أخرى",
    pass: (p: number, total: number) => `المرة ${p} من ${total}`,
    listening: "استمع جيدًا…",
    between: "ردّد معه…",
    yourTurn: "دورك! اقرأ الآية",
    nextSoon: "الآية التالية بعد لحظات",
    cancelNext: "انتظر",
    repeatLabel: "التكرار",
    prev: "الآية السابقة",
    next: "الآية التالية",
    skip: "تخطَّ",
    gap: "هذه الآية غير متاحة بهذا الصوت. جرّب الصوت الآخر.",
    playFailed: "لم يبدأ الصوت. اضغط «استمع» مرة أخرى.",
    record: "سجّل صوتك",
    stopRecord: "أوقف التسجيل",
    recording: (s: number) => `جارٍ التسجيل… ${s} ث`,
    listenSelf: "استمع لتسجيلك",
    micDenied: "لم يُسمح باستخدام الميكروفون. اسمح به من إعدادات المتصفح.",
    micMissing: "لم نجد ميكروفونًا على هذا الجهاز.",
    micUnsupported: "هذا المتصفح لا يدعم التسجيل.",
    recordSaved: "حُفظ التسجيل على هذا الجهاز.",
    declare: "حفظتُها",
    whoDeclares: "من يقول إنها حُفظت؟",
    byChild: "أنا حفظتها",
    byParent: "وليّ الأمر يشهد",
    declaredChild: "حفظتَها — بقولك أنت",
    declaredParent: "حفظتَها — بشهادة وليّ الأمر",
    withdraw: "تراجع",
    marks: { listened: "استمعت", recorded: "سجّلت", declared: "حفظت" },
    doneTitle: (name: string) => `أحسنت! أتممت سورة ${name}`,
    doneBody: (declared: number, total: number) => `أعلنت حفظ ${declared} من ${total} آيات. راجعها غدًا لتثبت.`,
    nextSurah: (name: string) => `السورة التالية: ${name}`,
    backToJourney: "العودة إلى الرحلة",
    progressLabel: "آيات السورة",
  },
  en: {
    back: "Memorization journey",
    ayahOf: (n: number, total: number) => `Ayah ${n} of ${total}`,
    loading: "Getting the surah ready…",
    loadFailed: "The surah could not load. Check the connection and try again.",
    retry: "Try again",
    noChild: "Choose who is memorizing first",
    noChildBody: "This screen keeps each child’s progress under their name, so start by choosing the child.",
    pickChild: "Choose the child",
    notInJourney: "This surah is not on the Juz Amma journey",
    notInJourneyBody: "The journey starts with al-Fatiha, then Juz Amma from an-Nas to an-Naba’.",
    reciters: { sheikh: "The sheikh alone", sheikh_kids: "Sheikh with children" } as Record<ReciterChoice, string>,
    reciterLabel: "How to listen",
    play: "Listen",
    pause: "Pause",
    again: "Listen again",
    pass: (p: number, total: number) => `Time ${p} of ${total}`,
    listening: "Listen closely…",
    between: "Say it with him…",
    yourTurn: "Your turn! Recite the ayah",
    nextSoon: "Next ayah in a moment",
    cancelNext: "Wait",
    repeatLabel: "Repeat",
    prev: "Previous ayah",
    next: "Next ayah",
    skip: "Skip",
    gap: "This ayah is not available in this voice. Try the other one.",
    playFailed: "The audio did not start. Press “Listen” again.",
    record: "Record yourself",
    stopRecord: "Stop recording",
    recording: (s: number) => `Recording… ${s}s`,
    listenSelf: "Listen to your recording",
    micDenied: "Microphone access was refused. Allow it in your browser settings.",
    micMissing: "No microphone was found on this device.",
    micUnsupported: "This browser cannot record audio.",
    recordSaved: "Recording saved on this device.",
    declare: "I know it",
    whoDeclares: "Who says it is memorized?",
    byChild: "I memorized it",
    byParent: "A parent confirms",
    declaredChild: "Memorized — in your own words",
    declaredParent: "Memorized — confirmed by a parent",
    withdraw: "Undo",
    marks: { listened: "Listened", recorded: "Recorded", declared: "Memorized" },
    doneTitle: (name: string) => `Well done! You finished Surah ${name}`,
    doneBody: (declared: number, total: number) => `You said you know ${declared} of ${total} ayahs. Review them tomorrow so they stay.`,
    nextSurah: (name: string) => `Next surah: ${name}`,
    backToJourney: "Back to the journey",
    progressLabel: "Ayahs of the surah",
  },
};

type Copy = (typeof copy)["ar"];
type Status = "idle" | "playing" | "between" | "yourTurn";

/** Where a child picks up: the first ayah they have not declared. */
function firstOpenAyah(profile: ChildProfile, surah: number, total: number) {
  for (let ayah = 1; ayah <= total; ayah++) if (!profile.ayahs[ayahKey(surah, ayah)]?.declaredAt) return ayah;
  return 1;
}

export default function HifzSurah() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const [, params] = useRoute("/hifz/:surah");
  const surah = Number(params?.surah);
  const { store, update } = useHifzStore();
  const profile = activeProfile(store);

  let body;
  if (!Number.isInteger(surah) || !isJourneySurah(surah)) {
    body = <Notice title={t.notInJourney} text={t.notInJourneyBody} href="/hifz" cta={t.back} />;
  } else if (!profile) {
    body = <Notice title={t.noChild} text={t.noChildBody} href="/hifz" cta={t.pickChild} />;
  } else {
    body = <Memorize key={`${profile.id}:${surah}`} t={t} surah={surah} profile={profile} update={update} />;
  }

  return (
    <main className="site-shell hifz hifz-screen" dir={direction}>
      <SkipLink />
      <SiteChrome />
      <div id={MAIN_CONTENT_ID}>{body}</div>
    <HifzBottomBar />
    </main>
  );
}

function Notice({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <section className="section hifz-section">
      <div className="container hifz-stack">
        <article className="hifz-card">
          <h1 className="hifz-notice-title">{title}</h1>
          <p>{text}</p>
          <div className="hifz-actions"><Link href={href} className="button button--primary">{cta}</Link></div>
        </article>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

function Memorize({ t, surah, profile, update }: {
  t: Copy; surah: number; profile: ChildProfile; update: (change: (latest: HifzStore) => HifzStore) => boolean;
}) {
  const { locale } = useLocale();
  const total = ayahCountOf(surah);
  const name = locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah);
  const settings = profile.settings;
  const recitationId = RECITATION_FOR[settings.reciter];

  const [ayah, setAyah] = useState(() => firstOpenAyah(profile, surah, total));
  const [texts, setTexts] = useState<Ayah[] | null>(null);
  const [source, setSource] = useState<SurahAudioSource | null>(null);
  const [timings, setTimings] = useState<TimedAyah[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [pass, setPass] = useState(0);
  const [playError, setPlayError] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [asking, setAsking] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [finished, setFinished] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const runRef = useRef(0);
  const nextTimer = useRef<number | null>(null);

  // The text once; the audio and its timings again whenever the voice changes.
  useEffect(() => {
    let live = true;
    setLoadError(false);
    loadSurah(surah).then(value => { if (live) setTexts(value); }, () => { if (live) setLoadError(true); });
    return () => { live = false; };
  }, [surah, attempt]);

  useEffect(() => {
    let live = true;
    setSource(null);
    setTimings(null);
    Promise.all([loadSurahSource(recitationId, surah), loadTiming(recitationId, surah)])
      .then(([src, timing]) => {
        if (!live) return;
        if (!src) { setLoadError(true); return; }
        setSource(src);
        setTimings(timing);
      })
      .catch(() => { if (live) setLoadError(true); });
    return () => { live = false; };
  }, [recitationId, surah, attempt]);

  const clearNextTimer = () => {
    if (nextTimer.current) window.clearTimeout(nextTimer.current);
    nextTimer.current = null;
    setAutoNext(false);
  };

  const stop = useCallback(() => {
    runRef.current++;
    audioRef.current?.pause();
    clearNextTimer();
    setStatus("idle");
    setPass(0);
  }, []);

  // Moving to another ayah or voice, or leaving, ends whatever was playing.
  useEffect(() => stop, [ayah, recitationId, stop]);
  useEffect(() => { setAsking(false); setCelebrate(false); }, [ayah]);

  const window_ = useMemo(() => timings?.find(w => w.number === ayah) ?? null, [timings, ayah]);
  const record = profile.ayahs[ayahKey(surah, ayah)];
  const ready = Boolean(texts && source && timings);

  const goTo = useCallback((next: number) => {
    setAyah(Math.min(total, Math.max(1, next)));
    setFinished(false);
  }, [total]);

  const play = useCallback(async (target = ayah) => {
    const media = audioRef.current;
    const win = timings?.find(w => w.number === target);
    if (!media || !win) return;
    clearNextTimer();
    setPlayError(false);
    const run = ++runRef.current;
    setStatus("playing");
    setPass(1);
    try {
      const done = await playAyahLoop(media, win, settings.repeat, {
        cancelled: () => runRef.current !== run,
        onPass: p => {
          if (p < settings.repeat) { setPass(p + 1); setStatus("between"); window.setTimeout(() => { if (runRef.current === run) setStatus("playing"); }, 900); }
        },
      });
      if (!done || runRef.current !== run) return;
      update(s => markListened(s, profile.id, surah, target));
      setStatus("yourTurn");
      if (settings.autoplayNext && target < total) {
        // Room to say the ayah back before the next one starts: as long as the
        // ayah itself, and never less than three seconds.
        setAutoNext(true);
        const wait = Math.max(3000, win.endMs - win.startMs);
        nextTimer.current = window.setTimeout(() => {
          if (runRef.current !== run) return;
          nextTimer.current = null;
          setAutoNext(false);
          setAyah(target + 1);
          // After React has moved to the next ayah and the stop effect ran.
          window.setTimeout(() => void playRef.current(target + 1), 60);
        }, wait);
      } else if (target === total) {
        setFinished(true);
      }
    } catch {
      if (runRef.current === run) { setStatus("idle"); setPlayError(true); }
    }
  }, [ayah, timings, settings.repeat, settings.autoplayNext, total, update, profile.id, surah]);

  const playRef = useRef(play);
  playRef.current = play;

  const setReciter = (reciter: ReciterChoice) => {
    if (reciter === settings.reciter) return;
    stop();
    update(s => updateSettings(s, profile.id, { reciter }));
  };

  const declare = (by: DeclaredBy) => {
    update(s => declareMemorized(s, profile.id, surah, ayah, by));
    setAsking(false);
    setCelebrate(true);
    if (ayah === total) setFinished(true);
  };

  const progress = surahProgress(profile, surah, total);
  const character = profile.character;
  const pose: Pose = celebrate || finished ? "cheer"
    : status === "playing" || status === "between" ? "listen"
    : status === "yourTurn" ? "recite"
    : "point";
  const art = characterArt(character, pose);
  const Prev = locale === "ar" ? SkipForward : SkipBack;
  const Next = locale === "ar" ? SkipBack : SkipForward;
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;
  const nextSurah = nextJourneySurah(surah);

  if (loadError) {
    return (
      <section className="section hifz-section">
        <div className="container hifz-stack">
          <article className="hifz-card" role="alert">
            <p>{t.loadFailed}</p>
            <div className="hifz-actions">
              <button type="button" className="button button--primary" onClick={() => setAttempt(a => a + 1)}><RotateCcw size={17} aria-hidden="true" /> {t.retry}</button>
              <Link href="/hifz" className="button button--soft">{t.back}</Link>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="hifz-memorize">
      <div className="container hifz-memorize__inner">
        <header className="hifz-memorize__bar">
          <Link href="/hifz" className="hifz-back"><Back size={17} aria-hidden="true" /> {t.back}</Link>
          <div className="hifz-memorize__title">
            <h1>{locale === "ar" ? `سورة ${name}` : `Surah ${name}`}</h1>
            <span>{t.ayahOf(ayah, total)}</span>
          </div>
        </header>

        <ol className="hifz-dots" aria-label={t.progressLabel}>
          {Array.from({ length: total }, (_, i) => {
            const n = i + 1;
            const r = profile.ayahs[ayahKey(surah, n)];
            const state = r?.declaredAt ? "declared" : r?.recordedAt ? "recorded" : r?.listenedAt ? "listened" : "new";
            const label = `${t.ayahOf(n, total)}${state !== "new" ? ` — ${t.marks[state]}` : ""}`;
            return (
              <li key={n}>
                <button type="button" className={`hifz-dot is-${state} ${n === ayah ? "is-current" : ""}`} onClick={() => goTo(n)} aria-label={label} aria-current={n === ayah ? "step" : undefined}>
                  {state === "declared" ? <Check size={12} aria-hidden="true" /> : n}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="hifz-stage">
          <div className="hifz-stage__character" aria-hidden="true">
            {art && <img key={pose} src={art.src} srcSet={art.srcSet} sizes="(max-width: 767px) 38vw, 240px" alt="" className="hifz-stage__art" />}
            <p className={`hifz-bubble is-${status} ${status === "idle" && !celebrate ? "is-quiet" : ""}`} role="status" aria-live="polite">
              {status === "playing" ? t.listening : status === "between" ? t.between : status === "yourTurn" ? t.yourTurn : celebrate ? (record?.declaredBy === "parent" ? t.declaredParent : t.declaredChild) : " "}
            </p>
          </div>

          <article className={`hifz-ayah hifz-ayah--${settings.fontStep}`} lang="ar" dir="rtl">
            {!texts ? <span className="hifz-loading"><Loader2 className="animate-spin" size={22} aria-hidden="true" /> {t.loading}</span>
              : <p>{texts[ayah - 1]?.text} <span className="hifz-ayah__number">{ayah.toLocaleString("ar-EG")}</span></p>}
          </article>
        </div>

        <div className="hifz-controls">
          <div className="hifz-voice" role="radiogroup" aria-label={t.reciterLabel}>
            {(["sheikh", "sheikh_kids"] as ReciterChoice[]).map(choice => (
              <button key={choice} type="button" role="radio" aria-checked={settings.reciter === choice} className={settings.reciter === choice ? "is-selected" : ""} onClick={() => setReciter(choice)}>
                {choice === "sheikh" ? <Headphones size={16} aria-hidden="true" /> : <Users size={16} aria-hidden="true" />} {t.reciters[choice]}
              </button>
            ))}
          </div>

          {ready && !window_ && <p className="hifz-status is-warn">{t.gap}</p>}

          <div className="hifz-transport">
            <button type="button" className="hifz-round" onClick={() => goTo(ayah - 1)} disabled={ayah === 1} aria-label={t.prev}><Prev size={20} aria-hidden="true" /></button>
            {status === "playing" || status === "between" ? (
              <button type="button" className="hifz-play is-playing" onClick={stop}>
                <Pause size={26} aria-hidden="true" /><span>{t.pause}</span><small>{t.pass(pass, settings.repeat)}</small>
              </button>
            ) : (
              <button type="button" className="hifz-play" onClick={() => void play()} disabled={!ready || !window_}>
                {ready ? <Play size={26} aria-hidden="true" /> : <Loader2 className="animate-spin" size={26} aria-hidden="true" />}
                <span>{status === "yourTurn" || record?.listenedAt ? t.again : t.play}</span>
                <small dir="ltr">× {settings.repeat}</small>
              </button>
            )}
            <button type="button" className="hifz-round" onClick={() => goTo(ayah + 1)} disabled={ayah === total} aria-label={t.next}><Next size={20} aria-hidden="true" /></button>
          </div>

          <div className="hifz-repeat" role="radiogroup" aria-label={t.repeatLabel}>
            <span>{t.repeatLabel}</span>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} type="button" role="radio" aria-checked={settings.repeat === n} className={settings.repeat === n ? "is-selected" : ""} onClick={() => update(s => updateSettings(s, profile.id, { repeat: n }))}>{n}</button>
            ))}
          </div>

          {autoNext && (
            <p className="hifz-autonext" role="status">
              {t.nextSoon} <button type="button" className="text-link" onClick={clearNextTimer}>{t.cancelNext}</button>
            </p>
          )}
          {playError && <p className="hifz-error" role="alert">{t.playFailed}</p>}
        </div>

        <div className="hifz-steps">
          <AyahRecorder
            key={`${surah}:${ayah}`}
            t={t}
            surah={surah}
            ayah={ayah}
            profileId={profile.id}
            beforeStart={stop}
            onSaved={() => update(s => markRecorded(s, profile.id, surah, ayah))}
          />

          <div className="hifz-declare">
            {record?.declaredAt ? (
              <p className="hifz-declared">
                <Check size={18} aria-hidden="true" /> {record.declaredBy === "parent" ? t.declaredParent : t.declaredChild}
                <button type="button" className="hifz-danger-link" onClick={() => { update(s => withdrawDeclaration(s, profile.id, surah, ayah)); setCelebrate(false); setFinished(false); }}>
                  <Undo2 size={14} aria-hidden="true" /> {t.withdraw}
                </button>
              </p>
            ) : asking ? (
              <div className="hifz-confirm">
                <p>{t.whoDeclares}</p>
                <div className="hifz-actions">
                  <button type="button" className="button button--primary" onClick={() => declare("child")}>{t.byChild}</button>
                  <button type="button" className="button button--soft" onClick={() => declare("parent")}>{t.byParent}</button>
                </div>
              </div>
            ) : (
              <button type="button" className="button hifz-declare__button" onClick={() => setAsking(true)}>
                <Sparkles size={18} aria-hidden="true" /> {t.declare}
              </button>
            )}
          </div>
        </div>

        {finished && (
          <article className="hifz-card hifz-done" role="status">
            {characterArt(character, "cheer") && <img src={characterArt(character, "cheer")!.src} alt="" className="hifz-done__art" />}
            <div>
              <h2>{t.doneTitle(name)}</h2>
              <p>{t.doneBody(progress.declared, total)}</p>
              <div className="hifz-actions">
                {nextSurah && (
                  <Link href={`/hifz/${nextSurah}`} className="button button--primary">
                    {t.nextSurah(locale === "ar" ? getSurahName(nextSurah) : getEnglishSurahName(nextSurah))}
                  </Link>
                )}
                <Link href="/hifz" className="button button--soft">{t.backToJourney}</Link>
              </div>
            </div>
          </article>
        )}

        {source && <audio ref={audioRef} src={source.playbackUrl} preload="metadata" />}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

const MAX_TAKE_SECONDS = 90;

function AyahRecorder({ t, surah, ayah, profileId, beforeStart, onSaved }: {
  t: Copy; surah: number; ayah: number; profileId: string; beforeStart: () => void; onSaved: () => void;
}) {
  const [state, setState] = useState<"idle" | "asking" | "recording">("idle");
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [latest, setLatest] = useState<RecordingSummary | null>(null);
  const [clipUrl, setClipUrl] = useState<string | null>(null);
  const [savedNote, setSavedNote] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const tick = useRef<number | null>(null);
  const urlRef = useRef<string | null>(null);

  const release = () => {
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
    if (tick.current) window.clearInterval(tick.current);
    tick.current = null;
  };

  const showLatest = useCallback(async () => {
    try {
      const [take] = await listAyahRecordings(surah, ayah, profileId);
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
  }, [surah, ayah, profileId]);

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
    beforeStart();
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") { setError(t.micUnsupported); return; }
    setState("asking");
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      const name = (err as DOMException)?.name;
      setError(name === "NotAllowedError" || name === "SecurityError" ? t.micDenied : name === "NotFoundError" ? t.micMissing : t.micUnsupported);
      setState("idle");
      return;
    }
    const mimeType = pickRecordingMimeType();
    let rec: MediaRecorder;
    try {
      rec = new MediaRecorder(stream.current, mimeType ? { mimeType } : undefined);
    } catch {
      release();
      setError(t.micUnsupported);
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
      void saveRecording({ surah, ayah, profileId, blob, mimeType: type, seconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)) })
        .then(() => { onSaved(); setSavedNote(true); return showLatest(); })
        .catch(() => {
          // Not stored, but still playable while the page is open.
          if (urlRef.current) URL.revokeObjectURL(urlRef.current);
          urlRef.current = URL.createObjectURL(blob);
          setClipUrl(urlRef.current);
          onSaved();
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

  return (
    <div className="hifz-recorder">
      {state === "recording" ? (
        <button type="button" className="button hifz-record is-recording" onClick={stopRecording}>
          <CircleStop size={18} aria-hidden="true" /> {t.stopRecord} <small>{t.recording(seconds)}</small>
        </button>
      ) : (
        <button type="button" className="button hifz-record" onClick={() => void start()} disabled={state === "asking"}>
          {state === "asking" ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <Mic size={18} aria-hidden="true" />} {t.record}
        </button>
      )}
      {clipUrl && state !== "recording" && (
        <div className="hifz-take">
          <span>{t.listenSelf}{latest ? ` · ${latest.seconds}s` : ""}</span>
          <audio controls src={clipUrl} preload="metadata" />
        </div>
      )}
      {savedNote && <p className="hifz-success" role="status">{t.recordSaved}</p>}
      {error && <p className="hifz-error" role="alert">{error}</p>}
    </div>
  );
}
