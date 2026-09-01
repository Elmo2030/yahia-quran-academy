import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, Check, Headphones, Heart, Loader2, Mic, Pause, Play, Repeat, Volume2 } from "lucide-react";
import { yahyaAvatarUrl } from "@/lib/hero-images";
import { getEnglishSurahName, getSurahName, loadSurahWithTransliteration, surahNames, type TransliteratedAyah } from "@/lib/quran-content";
import { BASMALAH } from "@/lib/surah-ayah-counts.generated";
import { activeAt, defaultRecitationId, listRecitations, loadSurahSource, loadTiming, type Recitation, type SurahAudioSource, type TimedAyah } from "@/lib/recitations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import NotFound from "@/pages/NotFound";
import { SiteChrome } from "@/components/SiteChrome";
import { useLocale } from "@/contexts/LocaleContext";
import { useReadingProgress } from "@/lib/progress";
import { RecitationRecorder } from "@/components/RecitationRecorder";


const copy = {
  ar: {
    home: "العودة للرئيسية", reader: "قارئ الأكاديمية", title: "اقرأ واستمع بهدوء", subtitle: "النص العثماني كما هو، والاستماع للسورة كاملة بصوت موثّق.", select: "اختر السورة", surah: "سورة", preparing: "جارٍ تجهيز السورة…", ayahs: "آية", wholeSurah: "تشغيل السورة كاملة", noTimings: "مزامنة الكلمات تتطلب توقيتات موثقة مطابقة لهذا التسجيل، وهي غير متاحة بعد.", verified: "نص عثماني موثّق", room: "غرفة التلقّي مع يحيى", companion: "استمع، كرّر، سجّل، ثم راجع ذاتيًا", steps: ["استمع", "كرّر", "سجّل", "راجع"], pause: "إيقاف الاستماع", play: "بدء الاستماع", playing: "يتم تشغيل السورة", listen: "استمع إلى السورة", narration: "تلاوة كاملة من مكتبة الأكاديمية", audioUnavailable: "الصوت غير متاح مؤقتًا لهذه السورة.", loading: "جارٍ تحميل النص…", noAyahs: "لا توجد آيات متاحة لهذه السورة الآن. حاول اختيار سورة أخرى.", contentFailure: "تعذر تحميل السورة الآن.", audioFailure: "تعذر تشغيل الملف الصوتي الآن. حاول مرة أخرى لاحقًا.", chooseRecitation: "اختر المصحف", continuous: "تشغيل متصل", continuousOn: "عند انتهاء السورة تبدأ التي بعدها تلقائيًا.", continuousOff: "تتوقف التلاوة عند نهاية السورة.", lastSurah: "انتهت السور. هذه آخر سورة في المصحف.", timedPill: "تمييز متزامن موثّق", untimedPill: "بدون تمييز",
  },
  en: {
    home: "Back to home", reader: "Academy reader", title: "Read and listen with calm", subtitle: "Uthmani text is kept intact, with verified full-surah audio.", select: "Choose a surah", surah: "Surah", preparing: "Preparing the surah…", ayahs: "ayahs", wholeSurah: "Play the complete surah", noTimings: "Word sync needs verified timings matched to this exact recitation; they are not available yet.", verified: "Verified Uthmani text", room: "Yahya’s talaqqi room", companion: "Listen, repeat, record, then self-review", steps: ["Listen", "Repeat", "Record", "Review"], pause: "Pause listening", play: "Start listening", playing: "The surah is playing", listen: "Listen to the surah", narration: "Complete recitation from the academy library", audioUnavailable: "Audio is temporarily unavailable for this surah.", loading: "Loading the Quran text…", noAyahs: "No ayahs are available for this surah right now. Choose another surah.", contentFailure: "The surah could not be loaded right now.", audioFailure: "The audio file could not be played right now. Please try again later.", chooseRecitation: "Choose a recitation", continuous: "Continuous play", continuousOn: "When a surah ends, the next one starts on its own.", continuousOff: "Playback stops at the end of the surah.", lastSurah: "That was the last surah in the Quran.", timedPill: "Verified synchronised highlighting", untimedPill: "No highlighting",
  },
} as const;

const CONTINUOUS_KEY = "yahya.reader.continuous";

// Every surah in the mushaf opens with the basmalah except At-Tawbah, and in
// Al-Fatiha it is the first numbered ayah rather than a heading. The reader
// showed it only for Al-Fatiha, so 112 surahs opened without the line a child
// is taught to begin with. It is a heading, not an ayah: unnumbered, and
// outside the highlighting, which follows the timed ayahs. The text comes
// from the corpus, never retyped: a hand-typed copy differed from it by the
// order of a shadda and a fatha — identical on screen, not the same string.
const BASMALAH_LATIN = "Bismillaahir Rahmaanir Raheem";
const opensWithBasmalah = (surah: number) => surah !== 1 && surah !== 9;

/**
 * The surah in the address, or null if there is no such surah.
 *
 * This used to fall back to Al-Fatiha, so /read/200 and /read/abc opened a
 * working reader on surah 1 while the tab said "page not found" and the server
 * answered 404 — the page disagreeing with its own title. A number that names
 * no surah is a wrong address, and says so.
 */
function parseSurah(value: string | undefined) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 114 ? parsed : null;
}

export default function Reader() {
  const [, params] = useRoute("/read/:surah");
  const [, setLocation] = useLocation();
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const requestedSurah = parseSurah(params?.surah);
  const selectedSurah = requestedSurah ?? 1;
  const [ayahs, setAyahs] = useState<TransliteratedAyah[]>([]);
  const [audio, setAudio] = useState<SurahAudioSource | null>(null);
  const [recitations, setRecitations] = useState<Recitation[]>([]);
  const [recitationId, setRecitationId] = useState<string | null>(null);
  const [timings, setTimings] = useState<TimedAyah[]>([]);
  const [active, setActive] = useState<{ ayah: number | null; word: number | null }>({ ayah: null, word: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  // Remembered per device: a parent who wants the whole juz' running should not
  // have to switch it back on for every surah.
  const [continuous, setContinuous] = useState(() => {
    try { return localStorage.getItem(CONTINUOUS_KEY) === "1"; } catch { return false; }
  });
  const [reachedEnd, setReachedEnd] = useState(false);
  const playerRef = useRef<HTMLAudioElement>(null);
  // Set only by the ended handler, so navigating by hand never starts audio.
  const autoPlayNextRef = useRef(false);
  const { recordReading } = useReadingProgress();
  const recordedSurahRef = useRef<number | null>(null);
  const recordedAyahRef = useRef<number | null>(null);

  // Record the surah opening (ayah 0) once per surah when the text loads.
  useEffect(() => {
    if (ayahs.length > 0 && recordedSurahRef.current !== selectedSurah) {
      recordedSurahRef.current = selectedSurah;
      recordedAyahRef.current = null;
      void recordReading(selectedSurah, 0);
    }
  }, [ayahs.length, selectedSurah, recordReading]);

  // Record the first ayah that becomes active during playback/selection.
  useEffect(() => {
    if (
      active.ayah &&
      recordedAyahRef.current !== active.ayah &&
      recordedSurahRef.current === selectedSurah
    ) {
      recordedAyahRef.current = active.ayah;
      void recordReading(selectedSurah, active.ayah);
    }
  }, [active.ayah, selectedSurah, recordReading]);

  // catalogue of recitations, loaded once
  useEffect(() => {
    let live = true;
    Promise.all([listRecitations(), defaultRecitationId()])
      .then(([list, fallback]) => {
        if (!live) return;
        setRecitations(list);
        setRecitationId(current => current ?? fallback);
      })
      .catch(() => undefined);
    return () => { live = false; };
  }, []);

  // text, audio and timings for the chosen surah and recitation
  useEffect(() => {
    if (!recitationId) return;
    let live = true;
    setLoading(true);
    setError(null);
    setActive({ ayah: null, word: null });
    Promise.all([
      loadSurahWithTransliteration(selectedSurah),
      loadSurahSource(recitationId, selectedSurah),
      loadTiming(recitationId, selectedSurah),
    ])
      .then(([loadedAyahs, source, loadedTimings]) => {
        if (!live) return;
        setAyahs(loadedAyahs);
        setAudio(source);
        setTimings(loadedTimings);
      })
      .catch(() => { if (live) setError(t.contentFailure); })
      .finally(() => live && setLoading(false));
    return () => { live = false; playerRef.current?.pause(); };
  }, [locale, selectedSurah, recitationId, t.contentFailure]);

  // follow playback and light up whatever is being recited
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (timings.length === 0) { setActive({ ayah: null, word: null }); return; }
    const onTime = () => setActive(activeAt(timings, player.currentTime * 1000));
    const onStop = () => setActive({ ayah: null, word: null });
    player.addEventListener("timeupdate", onTime);
    player.addEventListener("pause", onStop);
    player.addEventListener("ended", onStop);
    return () => {
      player.removeEventListener("timeupdate", onTime);
      player.removeEventListener("pause", onStop);
      player.removeEventListener("ended", onStop);
    };
  }, [timings]);

  // Keep the ayah being recited on screen. The highlight followed the audio
  // correctly but the page did not follow the highlight, so a few ayahs in it
  // was lit up somewhere below the fold and the reader lost their place.
  // Only nudges when the ayah has actually drifted out of a comfortable band,
  // so it does not fight a user who has scrolled somewhere deliberately.
  const scrolledForRef = useRef<number | null>(null);
  useEffect(() => {
    const ayah = active.ayah;
    if (!ayah || scrolledForRef.current === ayah) return;
    scrolledForRef.current = ayah;
    const node = document.querySelector<HTMLElement>(`[data-ayah="${ayah}"]`);
    if (!node) return;
    const box = node.getBoundingClientRect();
    const comfortableTop = window.innerHeight * 0.25;
    const comfortableBottom = window.innerHeight * 0.75;
    if (box.top >= comfortableTop && box.bottom <= comfortableBottom) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  }, [active.ayah]);

  const goToSurah = (surah: number) => {
    autoPlayNextRef.current = false;
    setPlaying(false);
    setReachedEnd(false);
    setLocation(`/read/${surah}`);
  };

  const handleEnded = () => {
    setPlaying(false);
    if (!continuous) return;
    if (selectedSurah >= 114) { setReachedEnd(true); return; }
    // The <audio> element is not remounted between surahs, so it keeps the
    // user activation from the first press and may start on its own.
    autoPlayNextRef.current = true;
    setLocation(`/read/${selectedSurah + 1}`);
  };

  const toggleContinuous = () => {
    setContinuous(value => {
      const next = !value;
      try { localStorage.setItem(CONTINUOUS_KEY, next ? "1" : "0"); } catch { /* private mode */ }
      return next;
    });
    setReachedEnd(false);
  };

  // Resume once the next surah's audio has actually arrived.
  useEffect(() => {
    if (!autoPlayNextRef.current || loading || !audio?.playbackUrl) return;
    autoPlayNextRef.current = false;
    void playerRef.current?.play().catch(() => setPlaying(false));
  }, [audio?.playbackUrl, loading]);
  const togglePlayback = async () => { const player = playerRef.current; if (!player || !audio?.playbackUrl) return; if (player.paused) await player.play(); else player.pause(); };
  const hasPlayback = Boolean(audio?.playbackUrl);
  const chosen = recitations.find(r => r.id === recitationId) ?? null;
  const isTimed = timings.length > 0;
  const changeRecitation = (id: string) => { playerRef.current?.pause(); setPlaying(false); setRecitationId(id); };
  const BackArrow = locale === "ar" ? ArrowRight : ArrowLeft;

  if (requestedSurah === null) return <NotFound />;

  return (
    <main className="reader-page" dir={direction}>
      <SiteChrome variant="reader" />
      <section className="reader-hero"><div className="container reader-hero__inner"><div><span className="eyebrow eyebrow--gold">{t.reader}</span><h1>{t.title}</h1><p>{t.subtitle}</p></div><div className="recitation-picker" role="group" aria-label={t.chooseRecitation}><span className="recitation-picker__label">{t.chooseRecitation}</span><div className="recitation-picker__options">{recitations.map(r => <button key={r.id} type="button" className={`recitation-chip${r.id === recitationId ? " is-active" : ""}`} aria-pressed={r.id === recitationId} onClick={() => changeRecitation(r.id)}><b>{locale === "en" ? r.nameEn : r.nameAr}</b><small>{r.hasTiming ? t.timedPill : t.untimedPill}</small></button>)}</div></div><div className="reader-selector"><label htmlFor="surah">{t.select}</label><select id="surah" value={selectedSurah} onChange={(event) => goToSurah(Number(event.target.value))}>{surahNames.map((name, index) => <option key={name} value={index + 1}>{String(index + 1).padStart(3, "0")} — {locale === "en" ? getEnglishSurahName(index + 1) : name}{locale === "en" ? ` — ${name}` : ""}</option>)}</select></div></div></section>
      <section className="container reader-layout" aria-live="polite"><aside className="reader-sidecard"><span className="sidecard__number">{String(selectedSurah).padStart(3, "0")}</span><h2>{locale === "en" ? <>{getEnglishSurahName(selectedSurah)} <span lang="ar" dir="rtl">{getSurahName(selectedSurah)}</span></> : <>{t.surah} <span lang="ar" dir="rtl">{getSurahName(selectedSurah)}</span></>}</h2><p>{loading ? t.preparing : `${ayahs.length} ${t.ayahs}`}</p><div className="sidecard__rule" /><div className="whole-surah-note"><Volume2 size={17} /><span>{t.wholeSurah}</span></div><p className="sidecard__microcopy">{isTimed ? (chosen ? (locale === "en" ? chosen.nameEn : chosen.nameAr) : t.timedPill) : t.noTimings}</p></aside>
        <article className="quran-card"><div className="quran-card__topline"><span>{locale === "en" ? getEnglishSurahName(selectedSurah) : t.surah} <span lang="ar" dir="rtl">{getSurahName(selectedSurah)}</span></span><span className="verified-pill">{t.verified}</span></div>
          <section className="recitation-companion" aria-label={t.room}><Avatar className="recitation-companion__avatar"><AvatarImage src={yahyaAvatarUrl} alt="" loading="lazy" /><AvatarFallback>ي</AvatarFallback></Avatar><div className="recitation-companion__copy"><span>{t.room}</span><b>{t.companion}</b></div><div className="recitation-companion__steps" aria-label={t.room}><span><Headphones size={13} /> {t.steps[0]}</span><span><Heart size={13} /> {t.steps[1]}</span><span><Mic size={13} /> {t.steps[2]}</span><span><Check size={13} /> {t.steps[3]}</span></div></section>
          {hasPlayback ? <div className="audio-deck"><button className="play-button" onClick={togglePlayback} aria-label={playing ? t.pause : t.play}>{playing ? <Pause fill="currentColor" size={22} /> : <Play fill="currentColor" size={22} />}</button><div><b>{playing ? t.playing : t.listen}</b><span>{t.narration}</span></div><button
              type="button"
              className={`continuous-toggle${continuous ? " is-on" : ""}`}
              role="switch"
              aria-checked={continuous}
              onClick={toggleContinuous}
              title={continuous ? t.continuousOn : t.continuousOff}
            >
              <Repeat size={15} aria-hidden="true" /> {t.continuous}
            </button>
            <Headphones className="audio-deck__icon" size={24} /><audio ref={playerRef} src={audio?.playbackUrl} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={handleEnded} onError={() => setError(t.audioFailure)} /></div> : <div className="audio-deck audio-deck--unavailable"><Volume2 size={24} /><span>{t.audioUnavailable}</span></div>}
          <RecitationRecorder surah={selectedSurah} />
          {reachedEnd && <p className="reader-endnote" role="status">{t.lastSurah}</p>}
          {loading && <div className="reader-loading"><Loader2 className="animate-spin" size={24} /> {t.loading}</div>}{error && <div className="reader-error" role="alert">{error}</div>}{!loading && !error && ayahs.length === 0 && <div className="reader-loading">{t.noAyahs}</div>}{!loading && !error && ayahs.length > 0 && <div className="ayah-list" dir="rtl" lang="ar">{opensWithBasmalah(selectedSurah) && (
              <p className="ayah ayah--basmalah">
                <span className="ayah__text">{BASMALAH}</span>
                {locale === "en" && <span className="ayah__transliteration" dir="ltr" lang="en">{BASMALAH_LATIN}</span>}
              </p>
            )}{ayahs.map((ayah) => {
              const isActiveAyah = active.ayah === ayah.number;
              const timed = timings.find(entry => entry.number === ayah.number);
              // Word spans only where this exact ayah has trustworthy word
              // coverage; otherwise the ayah renders as one run of text.
              const words = isActiveAyah && timed && timed.words.length > 0 ? ayah.text.split(/\s+/) : null;
              return (
                <p key={ayah.number} data-ayah={ayah.number} className={`ayah${isActiveAyah ? " ayah--active" : ""}`}>
                  <span className="ayah__number">{ayah.number}</span>
                  <span className="ayah__arabic">{words
                    ? words.map((word, index) => <span key={index} className={`ayah__word${active.word === index + 1 ? " ayah__word--active" : ""}`}>{word}{index < words.length - 1 ? " " : ""}</span>)
                    : ayah.text}</span>
                  {locale === "en" && <span className="ayah__transliteration" dir="ltr" lang="en">{ayah.transliteration}</span>}
                </p>
              );
            })}</div>}
        </article>
      </section>
    </main>
  );
}
