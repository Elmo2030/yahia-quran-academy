// =============================================================================
// HifzReview — today's review, one ayah at a time.
//
// An ayah the child declared memorized comes back after a day, then three,
// seven, fourteen and thirty. The screen asks them to say it from memory first
// and only then shows the words, because seeing them first is not remembering.
//
// Both answers are ordinary. "I remembered" moves the ayah to the next spacing;
// "I forgot" keeps the declaration — it is still the child's own word — and
// starts the spacing again from today. Neither is scored.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, Eye, Loader2, Pause, Play, RotateCcw } from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { playAyahLoop } from "@/lib/ayah-loop";
import { characterArt } from "@/lib/hifz-characters";
import { reviewQueue, type DueAyah } from "@/lib/hifz-review";
import { RECITATION_FOR, activeProfile, markReviewed, restartReviews, type ChildProfile, type HifzStore } from "@/lib/hifz-store";
import { getEnglishSurahName, getSurahName, loadSurah, type Ayah } from "@/lib/quran-content";
import { loadSurahSource, loadTiming, type TimedAyah } from "@/lib/recitations";

const copy = {
  ar: {
    title: "مراجعة اليوم",
    back: "رحلة الحفظ",
    noChild: "اختر من سيراجع أولًا",
    pickChild: "اختر الطفل",
    empty: "لا توجد مراجعة اليوم",
    emptyBody: "كل ما أعلنت حفظه ما زال في موعده. تعال غدًا، أو أكمل سورة جديدة من الخريطة.",
    openMap: "افتح الخريطة",
    remaining: (n: number) => (n === 1 ? "بقيت آية واحدة" : `بقيت ${n} آيات`),
    late: (n: number) => (n === 1 ? "متأخرة يومًا" : `متأخرة ${n} أيام`),
    ayahOf: (surah: string, ayah: number) => `سورة ${surah} — الآية ${ayah}`,
    prompt: "اقرأ الآية من حفظك، ثم اكشفها لتتأكد.",
    reveal: "اكشف الآية",
    listen: "استمع لها",
    stop: "إيقاف",
    remembered: "تذكرتها",
    forgot: "لم أتذكرها",
    doneTitle: "انتهت مراجعة اليوم",
    doneBody: (n: number) => `راجعت ${n === 1 ? "آية واحدة" : `${n} آيات`} اليوم. بارك الله فيك.`,
    loadFailed: "تعذّر تحميل الآية.",
    retry: "حاول مرة أخرى",
  },
  en: {
    title: "Today’s review",
    back: "Memorization journey",
    noChild: "Choose who is reviewing first",
    pickChild: "Choose the child",
    empty: "Nothing to review today",
    emptyBody: "Everything you have declared is still within its spacing. Come back tomorrow, or start a new surah on the map.",
    openMap: "Open the map",
    remaining: (n: number) => (n === 1 ? "One ayah left" : `${n} ayahs left`),
    late: (n: number) => (n === 1 ? "A day late" : `${n} days late`),
    ayahOf: (surah: string, ayah: number) => `Surah ${surah} — ayah ${ayah}`,
    prompt: "Recite the ayah from memory, then reveal it to check.",
    reveal: "Reveal the ayah",
    listen: "Listen to it",
    stop: "Stop",
    remembered: "I remembered it",
    forgot: "I forgot it",
    doneTitle: "Today’s review is done",
    doneBody: (n: number) => `You reviewed ${n === 1 ? "one ayah" : `${n} ayahs`} today.`,
    loadFailed: "The ayah could not load.",
    retry: "Try again",
  },
};

type Copy = (typeof copy)["ar"];

export default function HifzReview() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const { store, update } = useHifzStore();
  const profile = activeProfile(store);

  return (
    <main className="site-shell hifz hifz-screen" dir={direction}>
      <SkipLink />
      <SiteChrome />
      <div id={MAIN_CONTENT_ID}>
        {profile
          ? <Review key={profile.id} t={t} profile={profile} update={update} />
          : (
            <section className="section hifz-section">
              <div className="container hifz-stack">
                <article className="hifz-card">
                  <h1 className="hifz-notice-title">{t.noChild}</h1>
                  <div className="hifz-actions"><Link href="/hifz" className="button button--primary">{t.pickChild}</Link></div>
                </article>
              </div>
            </section>
          )}
      </div>
    </main>
  );
}

function Review({ t, profile, update }: {
  t: Copy; profile: ChildProfile; update: (change: (latest: HifzStore) => HifzStore) => boolean;
}) {
  const { locale } = useLocale();
  // The queue is taken once: an ayah answered mid-session should not vanish and
  // renumber everything under the child's hand.
  const [queue] = useState<DueAyah[]>(() => reviewQueue(profile));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);
  const item = queue[index];

  const [texts, setTexts] = useState<Record<number, Ayah[]>>({});
  const [timings, setTimings] = useState<TimedAyah[] | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const runRef = useRef(0);

  const recitationId = RECITATION_FOR[profile.settings.reciter];
  const surah = item?.surah;

  useEffect(() => {
    if (!surah) return;
    let live = true;
    setFailed(false);
    setTimings(null);
    setAudioUrl(null);
    Promise.all([
      texts[surah] ? Promise.resolve(texts[surah]) : loadSurah(surah),
      loadSurahSource(recitationId, surah),
      loadTiming(recitationId, surah),
    ])
      .then(([ayahs, source, timing]) => {
        if (!live) return;
        setTexts(current => ({ ...current, [surah]: ayahs }));
        setAudioUrl(source?.playbackUrl ?? null);
        setTimings(timing);
      })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
    // texts is a cache; re-running on it would loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surah, recitationId, attempt]);

  const stop = useCallback(() => {
    runRef.current++;
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  useEffect(() => stop, [index, stop]);

  const play = async () => {
    const media = audioRef.current;
    const window_ = timings?.find(w => w.number === item?.ayah);
    if (!media || !window_) return;
    const run = ++runRef.current;
    setPlaying(true);
    try {
      await playAyahLoop(media, window_, 1, { cancelled: () => runRef.current !== run });
    } catch {
      setFailed(true);
    }
    if (runRef.current === run) setPlaying(false);
  };

  const answer = (remembered: boolean) => {
    if (!item) return;
    stop();
    update(s => (remembered ? markReviewed : restartReviews)(s, profile.id, item.surah, item.ayah));
    setDone(n => n + 1);
    setRevealed(false);
    setIndex(i => i + 1);
  };

  const character = profile.character;
  const art = characterArt(character, done > 0 && !item ? "cheer" : revealed ? "recite" : "think");
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;

  if (queue.length === 0 || !item) {
    const finished = done > 0;
    return (
      <section className="section hifz-section">
        <div className="container hifz-stack">
          <article className="hifz-card hifz-done">
            {art && <img className="hifz-done__art" src={art.src} alt="" />}
            <div>
              <h1>{finished ? t.doneTitle : t.empty}</h1>
              <p>{finished ? t.doneBody(done) : t.emptyBody}</p>
              <div className="hifz-actions"><Link href="/hifz" className="button button--primary">{t.openMap}</Link></div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  const name = locale === "ar" ? getSurahName(item.surah) : getEnglishSurahName(item.surah);
  const text = texts[item.surah]?.[item.ayah - 1]?.text;
  const hasAudio = Boolean(audioUrl && timings?.some(w => w.number === item.ayah));

  return (
    <section className="hifz-memorize">
      <div className="container hifz-memorize__inner">
        <header className="hifz-memorize__bar">
          <Link href="/hifz" className="hifz-back"><Back size={17} aria-hidden="true" /> {t.back}</Link>
          <div className="hifz-memorize__title">
            <h1>{t.title}</h1>
            <span>{t.remaining(queue.length - index)}</span>
          </div>
        </header>

        <div className="hifz-review-card">
          <p className="hifz-review-where">
            {t.ayahOf(name, item.ayah)}
            {item.overdueDays > 0 && <span className="hifz-late">{t.late(item.overdueDays)}</span>}
          </p>

          <div className={`hifz-ayah hifz-ayah--${profile.settings.fontStep}`} lang="ar" dir="rtl">
            {revealed
              ? (text ? <p>{text} <span className="hifz-ayah__number">{item.ayah.toLocaleString("ar-EG")}</span></p> : <span className="hifz-loading"><Loader2 className="animate-spin" size={20} aria-hidden="true" /></span>)
              : <p className="hifz-hidden-ayah" aria-hidden="true">••• ••••• ••••</p>}
          </div>
          {!revealed && <p className="hifz-muted hifz-review-prompt">{t.prompt}</p>}

          <div className="hifz-actions hifz-review-actions">
            {!revealed
              ? <button type="button" className="button button--soft" onClick={() => setRevealed(true)}><Eye size={17} aria-hidden="true" /> {t.reveal}</button>
              : (
                <button type="button" className="button button--soft" onClick={() => (playing ? stop() : void play())} disabled={!hasAudio}>
                  {playing ? <><Pause size={17} aria-hidden="true" /> {t.stop}</> : <><Play size={17} aria-hidden="true" /> {t.listen}</>}
                </button>
              )}
            <button type="button" className="button button--primary" onClick={() => answer(true)}><Check size={17} aria-hidden="true" /> {t.remembered}</button>
            <button type="button" className="button button--soft" onClick={() => answer(false)}><RotateCcw size={16} aria-hidden="true" /> {t.forgot}</button>
          </div>

          {failed && (
            <p className="hifz-error" role="alert">
              {t.loadFailed} <button type="button" className="text-link" onClick={() => setAttempt(a => a + 1)}>{t.retry}</button>
            </p>
          )}
        </div>

        {art && <img className="hifz-review-art" src={art.src} srcSet={art.srcSet} sizes="150px" alt="" />}
        {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
      </div>
    </section>
  );
}
