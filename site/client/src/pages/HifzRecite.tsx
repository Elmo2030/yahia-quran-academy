// =============================================================================
// HifzRecite — the moment a recitation is actually judged.
//
// Everything else in the journey is the child's own word: "I know it",
// "I remembered it". This screen is different on purpose — the child recites
// a segment from memory with the text hidden, records it, and a parent
// listens and says "ready" or "needs practice". Nothing here scores the
// recording; the site cannot hear whether it was right. It only carries the
// recitation from the child's voice to a parent's ear.
//
// "Sent to a parent" would be a lie: the recording never leaves this device.
// The copy says what actually happens — it is saved here, for whoever picks
// up this device next.
// =============================================================================

import { useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft, ArrowRight, Check, CircleStop, Eye, Loader2, Mic, Minus, RotateCcw, Sparkles,
} from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { HifzBottomBar } from "@/components/HifzBottomBar";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { useRecorder } from "@/hooks/useRecorder";
import { characterArt, type Pose } from "@/lib/hifz-characters";
import {
  activeProfile, recitalEntrySegment, stepStatus, submitRecital, type ChildProfile, type HifzStore,
} from "@/lib/hifz-store";
import { ayahCountOf, isJourneySurah } from "@/lib/juz-amma";
import { getEnglishSurahName, getSurahName, loadSurah, type Ayah } from "@/lib/quran-content";

const copy = {
  ar: {
    back: "رحلة الحفظ",
    noChild: "اختر من سيسمّع أولًا",
    pickChild: "اختر الطفل",
    notInJourney: "هذه السورة ليست في رحلة جزء عمّ",
    notInJourneyBody: "الرحلة تبدأ بالفاتحة ثم جزء عمّ من الناس إلى النبأ.",
    nothingDeclared: "لا توجد آيات معلنة الحفظ في هذه السورة بعد",
    nothingDeclaredBody: "سمّع الآيات آيةً آية أولًا، وأعلن حفظها، ثم عد إلى هنا لتسميع مقطع كامل.",
    openSurah: "افتح السورة",
    segmentOf: (surah: string, from: number, to: number) => (from === to ? `سورة ${surah} — الآية ${from}` : `سورة ${surah} — الآيات ${from} إلى ${to}`),
    shorten: "قصّر المقطع",
    ready: "جاهز للتسميع؟",
    readyBody: "سمّع من حفظك، من غير أن ترى الآيات.",
    start: "ابدأ",
    stopRecord: "خلصت",
    recording: (s: number) => `جارٍ التسجيل… ${s} ث`,
    wellDone: "أحسنت! 🌟",
    listenSelf: "استمع لتسجيلي",
    ready4Parent: "جاهز لوليّ الأمر",
    recordAgain: "سمّع تاني",
    reveal: "اكشف الآيات",
    hideAgain: "أخفِ الآيات مرة أخرى",
    micDenied: "لم يُسمح باستخدام الميكروفون. اسمح به من إعدادات المتصفح.",
    micMissing: "لم نجد ميكروفونًا على هذا الجهاز.",
    micUnsupported: "هذا المتصفح لا يدعم التسجيل.",
    noMicInstead: "لا يوجد ميكروفون؟ سمّع بصوتك لوليّ الأمر وهو بجانبك، ثم اضغط هنا.",
    noMicSubmit: "سمّعتُ من غير تسجيل",
    submitted: "تسميعك محفوظ — خلّي ماما أو بابا يسمعوه على الجهاز ده.",
    backToJourney: "ارجع لرحلتي",
    alreadyWaiting: "هذا المقطع بانتظار وليّ الأمر بالفعل.",
    needsPractice: "طلب منك وليّ الأمر تسميع هذا المقطع مرة أخرى.",
  },
  en: {
    back: "Memorization journey",
    noChild: "Choose who is reciting first",
    pickChild: "Choose the child",
    notInJourney: "This surah is not on the Juz Amma journey",
    notInJourneyBody: "The journey starts with al-Fatiha, then Juz Amma from an-Nas to an-Naba’.",
    nothingDeclared: "No ayahs in this surah are declared memorized yet",
    nothingDeclaredBody: "Recite ayah by ayah first and declare them memorized, then come back here to recite a whole segment.",
    openSurah: "Open the surah",
    segmentOf: (surah: string, from: number, to: number) => (from === to ? `Surah ${surah} — ayah ${from}` : `Surah ${surah} — ayahs ${from} to ${to}`),
    shorten: "Shorten the segment",
    ready: "Ready to recite?",
    readyBody: "Recite from memory, without seeing the ayahs.",
    start: "Start",
    stopRecord: "Done",
    recording: (s: number) => `Recording… ${s}s`,
    wellDone: "Well done! 🌟",
    listenSelf: "Listen to my recitation",
    ready4Parent: "Ready for a parent",
    recordAgain: "Recite again",
    reveal: "Reveal the ayahs",
    hideAgain: "Hide the ayahs again",
    micDenied: "Microphone access was refused. Allow it in your browser settings.",
    micMissing: "No microphone was found on this device.",
    micUnsupported: "This browser cannot record audio.",
    noMicInstead: "No microphone? Recite out loud to a parent sitting with you, then tap here.",
    noMicSubmit: "I recited without recording",
    submitted: "Your recitation is saved — have a parent listen to it on this device.",
    backToJourney: "Back to my journey",
    alreadyWaiting: "This segment is already waiting for a parent.",
    needsPractice: "A parent asked you to recite this segment again.",
  },
};

type Copy = (typeof copy)["ar"];

export default function HifzRecite() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const [, params] = useRoute("/hifz/:surah/recite");
  const surah = Number(params?.surah);
  const { store, update } = useHifzStore();
  const profile = activeProfile(store);
  const total = Number.isInteger(surah) ? ayahCountOf(surah) : 0;
  // Computed once per child and surah, not on every store change: submitting
  // a recital covers its own ayahs, which would otherwise make this null the
  // instant it is pressed and swap the "submitted" screen for "nothing left
  // to recite" before the child ever saw it.
  const segment = useMemo(() => (profile ? recitalEntrySegment(profile, surah, total) : null), [profile?.id, surah]);

  let body;
  if (!Number.isInteger(surah) || !isJourneySurah(surah)) {
    body = <Notice title={t.notInJourney} text={t.notInJourneyBody} href="/hifz" cta={t.back} />;
  } else if (!profile) {
    body = <Notice title={t.noChild} text={t.nothingDeclaredBody} href="/hifz" cta={t.pickChild} />;
  } else {
    body = segment
      ? <Recite key={`${profile.id}:${surah}`} t={t} surah={surah} total={total} initial={segment} profile={profile} update={update} />
      : <Notice title={t.nothingDeclared} text={t.nothingDeclaredBody} href={`/hifz/${surah}`} cta={t.openSurah} />;
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

function Recite({ t, surah, total, initial, profile, update }: {
  t: Copy; surah: number; total: number;
  initial: { from: number; to: number; status: "needs_practice" | "awaiting_parent" | null };
  profile: ChildProfile; update: (change: (latest: HifzStore) => HifzStore) => boolean;
}) {
  const { locale } = useLocale();
  const name = locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah);
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;

  const [to, setTo] = useState(initial.to);
  const from = initial.from;
  // A segment that already has a recital record of its own — sent back for
  // practice, or already sitting with a parent — keeps the exact range it
  // was submitted with; shortening it would key a second, unrelated record
  // instead of resubmitting the one the parent is waiting on.
  const canShorten = initial.status === null;
  const [revealed, setRevealed] = useState(false);
  const [texts, setTexts] = useState<Ayah[] | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  useMemo(() => { loadSurah(surah).then(setTexts, () => setTexts(null)); }, [surah]);

  const recorder = useRecorder(
    { surah, from, to, profileId: profile.id },
    { micDenied: t.micDenied, micMissing: t.micMissing, micUnsupported: t.micUnsupported },
  );

  const status = stepStatus(profile, { kind: "recital", surah, from, to });
  const submit = (recordingId?: string) => {
    update(s => submitRecital(s, profile.id, surah, from, to, recordingId));
    setJustSubmitted(true);
  };

  const pose: Pose = justSubmitted || status === "reviewed" ? "cheer"
    : recorder.state === "recording" ? "recite"
    : recorder.latest ? "cheer"
    : "think";
  const art = characterArt(profile.character, pose);

  if (justSubmitted) {
    return (
      <section className="section hifz-section">
        <div className="container hifz-stack">
          <article className="hifz-card hifz-done">
            {art && <img className="hifz-done__art" src={art.src} alt="" />}
            <div>
              <h1>{t.submitted}</h1>
              <div className="hifz-actions"><Link href="/hifz" className="button button--primary">{t.backToJourney}</Link></div>
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
            <h1>{t.segmentOf(name, from, to)}</h1>
            {status === "awaiting_parent" && <span className="hifz-status is-warn">{t.alreadyWaiting}</span>}
            {status === "needs_practice" && <span className="hifz-status is-warn">{t.needsPractice}</span>}
          </div>
        </header>

        <div className="hifz-stage">
          <div className="hifz-stage__character" aria-hidden="true">
            {art && <img src={art.src} srcSet={art.srcSet} sizes="(max-width: 767px) 38vw, 240px" alt="" className="hifz-stage__art" />}
          </div>

          <article className="hifz-ayah" lang="ar" dir="rtl">
            {revealed
              ? (texts
                ? texts.slice(from - 1, to).map(a => <p key={a.number}>{a.text} <span className="hifz-ayah__number">{a.number.toLocaleString("ar-EG")}</span></p>)
                : <span className="hifz-loading"><Loader2 className="animate-spin" size={20} aria-hidden="true" /></span>)
              : <p className="hifz-hidden-ayah" aria-hidden="true">••• ••••• ••••</p>}
          </article>
        </div>

        {recorder.state !== "recording" && !recorder.latest && (
          <>
            <p className="hifz-muted">{t.readyBody}</p>
            <div className="hifz-actions">
              <button type="button" className="button button--primary" onClick={() => void recorder.start()} disabled={recorder.state === "asking"}>
                {recorder.state === "asking" ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <Mic size={18} aria-hidden="true" />} {t.start}
              </button>
            </div>
            {canShorten && to > from && (
              <div className="hifz-actions">
                <button type="button" className="button button--soft" onClick={() => setTo(t_ => Math.max(from, t_ - 1))}>
                  <Minus size={16} aria-hidden="true" /> {t.shorten}
                </button>
              </div>
            )}
            {recorder.error && (
              <div className="hifz-confirm" role="alert">
                <p>{recorder.error}</p>
                <p>{t.noMicInstead}</p>
                <div className="hifz-actions">
                  <button type="button" className="button button--soft" onClick={() => submit(undefined)}>
                    <Sparkles size={17} aria-hidden="true" /> {t.noMicSubmit}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {recorder.state === "recording" && (
          <div className="hifz-actions">
            <button type="button" className="button hifz-record is-recording" onClick={recorder.stop}>
              <CircleStop size={18} aria-hidden="true" /> {t.stopRecord} <small>{t.recording(recorder.seconds)}</small>
            </button>
          </div>
        )}

        {recorder.state === "idle" && recorder.latest && (
          <>
            <p className="hifz-declared"><Check size={18} aria-hidden="true" /> {t.wellDone}</p>
            {recorder.clipUrl && (
              <div className="hifz-take">
                <span>{t.listenSelf}</span>
                <audio controls src={recorder.clipUrl} preload="metadata" />
              </div>
            )}
            <div className="hifz-actions">
              <button type="button" className="button button--primary" onClick={() => submit(recorder.latest?.id)}>
                <Sparkles size={17} aria-hidden="true" /> {t.ready4Parent}
              </button>
              <button type="button" className="button button--soft" onClick={() => void recorder.start()}>
                <RotateCcw size={16} aria-hidden="true" /> {t.recordAgain}
              </button>
              <button type="button" className="button button--soft" onClick={() => setRevealed(v => !v)}>
                <Eye size={16} aria-hidden="true" /> {revealed ? t.hideAgain : t.reveal}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
