// =============================================================================
// Listen — the whole mushaf, to put on and listen to.
//
// This is not a learning screen. Nothing here is tracked, scored or reported:
// a parent picks a surah and it plays, the way a radio does. The only thing the
// page remembers is where a long surah was left, because starting al-Baqarah
// from the beginning for the third time is nobody's idea of a kindness.
// =============================================================================

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Headphones, History, Loader2, Play, Trash2, WifiOff } from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { clock, loadMarks, positionOf, roughLength, type ListenMarks } from "@/lib/listening";
import { megabytes, offlineSupported, removeAll, room, savedUrls, storageIsKept } from "@/lib/offline-audio";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";
import { loadListeningCatalogue, listeningRecitations, type ListeningCatalogue } from "@/lib/recitations";

const copy = {
  ar: {
    eyebrow: "الاستماع",
    title: "المصحف المرتل، كاملًا",
    intro: "اختر سورة واتركها تعمل. تلاوة مرتلة هادئة تصلح للبيت والسيارة ووقت النوم، بلا حساب ولا تسجيل ولا متابعة لأحد.",
    reciter: "التلاوة",
    total: "المصحف كله",
    surahs: "١١٤ سورة",
    resume: "أكمل من حيث توقفت",
    resumeAt: (name: string, at: string) => `سورة ${name} — عند ${at}`,
    listen: "استمع",
    loading: "جاري تحميل القائمة…",
    failed: "تعذّر تحميل قائمة السور.",
    retry: "حاول مرة أخرى",
    soon: "المصحف في طريقه — سيظهر هنا فور رفعه.",
    ayahs: (n: number) => (n === 1 ? "آية واحدة" : n === 2 ? "آيتان" : n <= 10 ? `${n} آيات` : `${n} آية`),
    home: "الرئيسية",
    offlineTitle: "المحفوظ للاستماع بدون إنترنت",
    offlineNone: "مفيش سور محفوظة لحد دلوقتي. افتح أي سورة واضغط «احفظها للاستماع بدون إنترنت».",
    offlineSome: (n: number, size: string) =>
      `${n === 1 ? "سورة واحدة محفوظة" : n === 2 ? "سورتان محفوظتان" : n <= 10 ? `${n} سور محفوظة` : `${n} سورة محفوظة`} · ${size}`,
    offlineRoom: (used: string, quota: string) => `المستخدم من مساحة المتصفح: ${used} من ${quota}`,
    offlineKept: "المتصفح وعد إنه ما يمسحش المحفوظ.",
    offlineNotKept: "ضِف الموقع للشاشة الرئيسية عشان المتصفح ما يمسحش المحفوظ بعد فترة.",
    offlineClear: "احذف كل المحفوظ",
    offlineBadge: "محفوظة",
  },
  en: {
    eyebrow: "Listening",
    title: "The complete murattal mushaf",
    intro: "Pick a surah and let it run. A calm murattal reading for the house, the car and bedtime — no account, no recording, nobody being tracked.",
    reciter: "Recited by",
    total: "The whole mushaf",
    surahs: "114 surahs",
    resume: "Carry on where you stopped",
    resumeAt: (name: string, at: string) => `Surah ${name} — at ${at}`,
    listen: "Listen",
    loading: "Loading the list…",
    failed: "The surah list could not load.",
    retry: "Try again",
    soon: "The mushaf is on its way — it will appear here as soon as it is uploaded.",
    ayahs: (n: number) => (n === 1 ? "1 ayah" : `${n} ayahs`),
    home: "Home",
    offlineTitle: "Saved for offline listening",
    offlineNone: "Nothing saved yet. Open a surah and tap “Save for offline listening”.",
    offlineSome: (n: number, size: string) => `${n === 1 ? "1 surah saved" : `${n} surahs saved`} · ${size}`,
    offlineRoom: (used: string, quota: string) => `Using ${used} of the ${quota} this browser allows`,
    offlineKept: "The browser has agreed not to clear what you saved.",
    offlineNotKept: "Add the site to your home screen so the browser keeps what you saved.",
    offlineClear: "Remove everything saved",
    offlineBadge: "Saved",
  },
};

export default function Listen() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;

  const [catalogue, setCatalogue] = useState<ListeningCatalogue | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "empty" | "failed">("loading");
  const [attempt, setAttempt] = useState(0);
  const [marks, setMarks] = useState<ListenMarks>({ at: {} });
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [space, setSpace] = useState<{ used: number; quota: number } | null>(null);
  const [kept, setKept] = useState(false);

  useEffect(() => setMarks(loadMarks()), []);

  const readOffline = useCallback(async () => {
    const [urls, where, persisted] = await Promise.all([savedUrls(), room(), storageIsKept()]);
    setSaved(urls);
    setSpace(where);
    setKept(persisted);
  }, []);

  useEffect(() => { void readOffline(); }, [readOffline]);

  useEffect(() => {
    let live = true;
    setState("loading");
    listeningRecitations()
      .then(async list => {
        if (!live) return;
        const first = list[0];
        if (!first) { setState("empty"); return; }
        const loaded = await loadListeningCatalogue(first.id);
        if (!live) return;
        if (!loaded || loaded.surahs.length === 0) { setState("empty"); return; }
        setCatalogue(loaded);
        setState("ready");
      })
      .catch(() => { if (live) setState("failed"); });
    return () => { live = false; };
  }, [attempt]);

  const totalMs = useMemo(
    () => (catalogue ? catalogue.surahs.reduce((sum, s) => sum + s.durationMs, 0) : 0),
    [catalogue],
  );

  const savedCount = useMemo(
    () => (catalogue ? catalogue.surahs.filter(entry => saved.has(entry.url)).length : 0),
    [catalogue, saved],
  );
  const savedBytes = useMemo(
    () => (catalogue ? catalogue.surahs.filter(entry => saved.has(entry.url)).reduce((sum, entry) => sum + entry.sizeBytes, 0) : 0),
    [catalogue, saved],
  );

  const resumeSurah = marks.last && positionOf(marks, marks.last) > 0 ? marks.last : null;
  const nameOf = (surah: number) => (locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah));

  return (
    <main className="site-shell listen" dir={direction}>
      <SkipLink />
      <SiteChrome />
      <div id={MAIN_CONTENT_ID}>
        <section className="section listen-hero">
          <div className="container listen-hero__inner">
            <span className="eyebrow eyebrow--gold"><Headphones size={15} aria-hidden="true" /> {t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
            {catalogue && (
              <dl className="listen-facts">
                <div><dt>{t.reciter}</dt><dd>{locale === "ar" ? catalogue.nameAr : catalogue.nameEn}</dd></div>
                <div><dt>{t.total}</dt><dd>{roughLength(totalMs, locale)}</dd></div>
                <div><dt>{t.surahs}</dt><dd>{catalogue.surahs.length}</dd></div>
              </dl>
            )}
          </div>
        </section>

        <section className="section listen-section">
          <div className="container listen-stack">
            {resumeSurah && (
              <Link href={`/listen/${resumeSurah}`} className="listen-resume">
                <History size={20} aria-hidden="true" />
                <span>
                  <b>{t.resume}</b>
                  <small>{t.resumeAt(nameOf(resumeSurah), clock(positionOf(marks, resumeSurah)))}</small>
                </span>
                <Arrow size={18} aria-hidden="true" />
              </Link>
            )}

            {offlineSupported() && catalogue && (
              <section className="listen-offline-card" aria-labelledby="listen-offline-title">
                <h2 id="listen-offline-title"><WifiOff size={17} aria-hidden="true" /> {t.offlineTitle}</h2>
                {savedCount === 0 ? (
                  <p className="hifz-muted">{t.offlineNone}</p>
                ) : (
                  <>
                    <p className="listen-offline-card__count">{t.offlineSome(savedCount, megabytes(savedBytes, locale))}</p>
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => { void removeAll().then(readOffline); }}
                    >
                      <Trash2 size={14} aria-hidden="true" /> {t.offlineClear}
                    </button>
                  </>
                )}
                {space && <p className="hifz-muted">{t.offlineRoom(megabytes(space.used, locale), megabytes(space.quota, locale))}</p>}
                <p className="hifz-muted">{kept ? t.offlineKept : t.offlineNotKept}</p>
              </section>
            )}

            {state === "loading" && <p className="listen-note"><Loader2 className="animate-spin" size={18} aria-hidden="true" /> {t.loading}</p>}
            {state === "empty" && <p className="listen-note">{t.soon}</p>}
            {state === "failed" && (
              <p className="listen-note" role="alert">
                {t.failed} <button type="button" className="text-link" onClick={() => setAttempt(a => a + 1)}>{t.retry}</button>
              </p>
            )}

            {state === "ready" && catalogue && (
              <ol className="listen-list" role="list">
                {catalogue.surahs.map(entry => {
                  const at = positionOf(marks, entry.surah);
                  return (
                    <li key={entry.surah}>
                      <Link href={`/listen/${entry.surah}`} className="listen-row">
                        <span className="listen-row__number">{entry.surah.toLocaleString(locale === "ar" ? "ar-EG" : "en-GB")}</span>
                        <span className="listen-row__text">
                          <b>{nameOf(entry.surah)}</b>
                          <small>{t.ayahs(entry.ayahCount)} · {roughLength(entry.durationMs, locale)}</small>
                        </span>
                        {saved.has(entry.url) && <span className="listen-row__saved" title={t.offlineBadge}><WifiOff size={13} aria-hidden="true" /></span>}
                        {at > 0 && <span className="listen-row__mark">{clock(at)}</span>}
                        <Play size={17} aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="brand-mark"><span className="brand-mark__seal">ي</span><span><b>Yahya</b> Quran Academy</span></div>
          <Link href="/" className="text-link">{t.home}</Link>
        </div>
      </footer>
    </main>
  );
}
