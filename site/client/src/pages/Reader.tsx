import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, Check, Headphones, Heart, Loader2, Mic, Pause, Play, Volume2 } from "lucide-react";
import { getEnglishSurahName, getSurahName, loadSurahWithTransliteration, surahNames, type TransliteratedAyah } from "@/lib/quran-content";
import { activeAt, defaultRecitationId, listRecitations, loadSurahSource, loadTiming, type Recitation, type SurahAudioSource, type TimedAyah } from "@/lib/recitations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLocale } from "@/contexts/LocaleContext";
import { useReadingProgress } from "@/lib/progress";
import { RecitationRecorder } from "@/components/RecitationRecorder";

const yahyaCharacterUrl = "/manus-storage/yahya-hero.png";

const copy = {
  ar: {
    home: "العودة للرئيسية", reader: "قارئ الأكاديمية", title: "اقرأ واستمع بهدوء", subtitle: "النص العثماني كما هو، والاستماع للسورة كاملة بصوت موثّق.", select: "اختر السورة", surah: "سورة", preparing: "جارٍ تجهيز السورة…", ayahs: "آية", wholeSurah: "تشغيل السورة كاملة", noTimings: "مزامنة الكلمات تتطلب توقيتات موثقة مطابقة لهذا التسجيل، وهي غير متاحة بعد.", verified: "نص عثماني موثّق", room: "غرفة التلقّي مع يحيى", companion: "استمع، كرّر، سجّل، ثم راجع ذاتيًا", steps: ["استمع", "كرّر", "سجّل", "راجع"], pause: "إيقاف الاستماع", play: "بدء الاستماع", playing: "يتم تشغيل السورة", listen: "استمع إلى السورة", narration: "تلاوة كاملة من مكتبة الأكاديمية", audioUnavailable: "الصوت غير متاح مؤقتًا لهذه السورة.", loading: "جارٍ تحميل النص…", noAyahs: "لا توجد آيات متاحة لهذه السورة الآن. حاول اختيار سورة أخرى.", contentFailure: "تعذر تحميل السورة الآن.", audioFailure: "تعذر تشغيل الملف الصوتي الآن. حاول مرة أخرى لاحقًا.", chooseRecitation: "اختر المصحف", timedPill: "تمييز متزامن موثّق", untimedPill: "بدون تمييز",
  },
  en: {
    home: "Back to home", reader: "Academy reader", title: "Read and listen with calm", subtitle: "Uthmani text is kept intact, with verified full-surah audio.", select: "Choose a surah", surah: "Surah", preparing: "Preparing the surah…", ayahs: "ayahs", wholeSurah: "Play the complete surah", noTimings: "Word sync needs verified timings matched to this exact recitation; they are not available yet.", verified: "Verified Uthmani text", room: "Yahya’s talaqqi room", companion: "Listen, repeat, record, then self-review", steps: ["Listen", "Repeat", "Record", "Review"], pause: "Pause listening", play: "Start listening", playing: "The surah is playing", listen: "Listen to the surah", narration: "Complete recitation from the academy library", audioUnavailable: "Audio is temporarily unavailable for this surah.", loading: "Loading the Quran text…", noAyahs: "No ayahs are available for this surah right now. Choose another surah.", contentFailure: "The surah could not be loaded right now.", audioFailure: "The audio file could not be played right now. Please try again later.", chooseRecitation: "Choose a recitation", timedPill: "Verified synchronised highlighting", untimedPill: "No highlighting",
  },
} as const;

function parseSurah(value: string | undefined) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 114 ? parsed : 1;
}

export default function Reader() {
  const [, params] = useRoute("/read/:surah");
  const [, setLocation] = useLocation();
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const selectedSurah = parseSurah(params?.surah);
  const [ayahs, setAyahs] = useState<TransliteratedAyah[]>([]);
  const [audio, setAudio] = useState<SurahAudioSource | null>(null);
  const [recitations, setRecitations] = useState<Recitation[]>([]);
  const [recitationId, setRecitationId] = useState<string | null>(null);
  const [timings, setTimings] = useState<TimedAyah[]>([]);
  const [active, setActive] = useState<{ ayah: number | null; word: number | null }>({ ayah: null, word: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLAudioElement>(null);
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

  const goToSurah = (surah: number) => { setPlaying(false); setLocation(`/read/${surah}`); };
  const togglePlayback = async () => { const player = playerRef.current; if (!player || !audio?.playbackUrl) return; if (player.paused) await player.play(); else player.pause(); };
  const hasPlayback = Boolean(audio?.playbackUrl);
  const chosen = recitations.find(r => r.id === recitationId) ?? null;
  const isTimed = timings.length > 0;
  const changeRecitation = (id: string) => { playerRef.current?.pause(); setPlaying(false); setRecitationId(id); };
  const BackArrow = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <main className="reader-page" dir={direction}>
      <header className="reader-header"><div className="container reader-header__inner"><Link href="/" className="brand-mark" aria-label={t.home}><span className="brand-mark__seal">ي</span><span><b>Yahya</b> Quran Academy</span></Link><div className="header-actions"><LanguageToggle compact /><Link href="/" className="text-link"><BackArrow size={18} /> {t.home}</Link></div></div></header>
      <section className="reader-hero"><div className="container reader-hero__inner"><div><span className="eyebrow eyebrow--gold">{t.reader}</span><h1>{t.title}</h1><p>{t.subtitle}</p></div><div className="recitation-picker" role="group" aria-label={t.chooseRecitation}><span className="recitation-picker__label">{t.chooseRecitation}</span><div className="recitation-picker__options">{recitations.map(r => <button key={r.id} type="button" className={`recitation-chip${r.id === recitationId ? " is-active" : ""}`} aria-pressed={r.id === recitationId} onClick={() => changeRecitation(r.id)}><b>{locale === "en" ? r.nameEn : r.nameAr}</b><small>{r.hasTiming ? t.timedPill : t.untimedPill}</small></button>)}</div></div><div className="reader-selector"><label htmlFor="surah">{t.select}</label><select id="surah" value={selectedSurah} onChange={(event) => goToSurah(Number(event.target.value))}>{surahNames.map((name, index) => <option key={name} value={index + 1}>{String(index + 1).padStart(3, "0")} — {locale === "en" ? getEnglishSurahName(index + 1) : name}{locale === "en" ? ` — ${name}` : ""}</option>)}</select></div></div></section>
      <section className="container reader-layout" aria-live="polite"><aside className="reader-sidecard"><span className="sidecard__number">{String(selectedSurah).padStart(3, "0")}</span><h2>{locale === "en" ? <>{getEnglishSurahName(selectedSurah)} <span lang="ar" dir="rtl">{getSurahName(selectedSurah)}</span></> : <>{t.surah} <span lang="ar" dir="rtl">{getSurahName(selectedSurah)}</span></>}</h2><p>{loading ? t.preparing : `${ayahs.length} ${t.ayahs}`}</p><div className="sidecard__rule" /><div className="whole-surah-note"><Volume2 size={17} /><span>{t.wholeSurah}</span></div><p className="sidecard__microcopy">{isTimed ? (chosen ? (locale === "en" ? chosen.nameEn : chosen.nameAr) : t.timedPill) : t.noTimings}</p></aside>
        <article className="quran-card"><div className="quran-card__topline"><span>{locale === "en" ? getEnglishSurahName(selectedSurah) : t.surah} <span lang="ar" dir="rtl">{getSurahName(selectedSurah)}</span></span><span className="verified-pill">{t.verified}</span></div>
          <section className="recitation-companion" aria-label={t.room}><Avatar className="recitation-companion__avatar"><AvatarImage src={yahyaCharacterUrl} alt="" /><AvatarFallback>ي</AvatarFallback></Avatar><div className="recitation-companion__copy"><span>{t.room}</span><b>{t.companion}</b></div><div className="recitation-companion__steps" aria-label={t.room}><span><Headphones size={13} /> {t.steps[0]}</span><span><Heart size={13} /> {t.steps[1]}</span><span><Mic size={13} /> {t.steps[2]}</span><span><Check size={13} /> {t.steps[3]}</span></div></section>
          {hasPlayback ? <div className="audio-deck"><button className="play-button" onClick={togglePlayback} aria-label={playing ? t.pause : t.play}>{playing ? <Pause fill="currentColor" size={22} /> : <Play fill="currentColor" size={22} />}</button><div><b>{playing ? t.playing : t.listen}</b><span>{t.narration}</span></div><Headphones className="audio-deck__icon" size={24} /><audio ref={playerRef} src={audio?.playbackUrl} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setError(t.audioFailure)} /></div> : <div className="audio-deck audio-deck--unavailable"><Volume2 size={24} /><span>{t.audioUnavailable}</span></div>}
          <RecitationRecorder surah={selectedSurah} />
          {loading && <div className="reader-loading"><Loader2 className="animate-spin" size={24} /> {t.loading}</div>}{error && <div className="reader-error" role="alert">{error}</div>}{!loading && !error && ayahs.length === 0 && <div className="reader-loading">{t.noAyahs}</div>}{!loading && !error && ayahs.length > 0 && <div className="ayah-list" dir="rtl" lang="ar">{ayahs.map((ayah) => {
              const isActiveAyah = active.ayah === ayah.number;
              const timed = timings.find(entry => entry.number === ayah.number);
              // Word spans only where this exact ayah has trustworthy word
              // coverage; otherwise the ayah renders as one run of text.
              const words = isActiveAyah && timed && timed.words.length > 0 ? ayah.text.split(/\s+/) : null;
              return (
                <p key={ayah.number} className={`ayah${isActiveAyah ? " ayah--active" : ""}`}>
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
