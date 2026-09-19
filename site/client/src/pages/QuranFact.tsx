import { useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { ChevronLeft, ChevronRight, CirclePlay, Headphones, Sparkles } from "lucide-react";

import { QuranFactIcon } from "@/components/QuranFactIcon";
import { SiteChrome } from "@/components/SiteChrome";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { quranFacts } from "@/content/quran-facts";
import { activeProfile } from "@/lib/hifz-store";
import { useHifzStore } from "@/hooks/useHifzStore";
import { factBySlug, surahOfFact } from "@/lib/quran-facts-index";
import { FACTS_PER_STAGE, currentDiscovery, stageIndexForFact, stageIsComplete } from "@/lib/quran-facts-journey";
import { discoverFact, readFactDiscoveries } from "@/lib/quran-facts-progress";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";

const FACT_SLUGS = quranFacts.map(item => item.slug);
const STAGE_COUNT = Math.ceil(quranFacts.length / FACTS_PER_STAGE);

const copy = {
  ar: {
    eyebrow: "في رحاب القرآن", back: "العودة إلى المرحلة", missing: "هذه المعلومة غير موجودة.",
    stage: (index: number) => `المرحلة ${index + 1} من ${STAGE_COUNT}`,
    newLabel: "اكتشاف جديد", prompt: "هل أنت مستعد لاكتشاف معلومة جديدة؟", reveal: "اكشف الاكتشاف",
    discovered: "اكتشفت معلومة جديدة", known: "اكتشفتها من قبل", replay: "شاهد لحظة الاكتشاف",
    connection: "اكتشفها في القرآن", readSurah: (name: string) => `اقرأ سورة ${name}`, listenSurah: (name: string) => `استمع إلى سورة ${name}`,
    source: "كيف نعرف ذلك؟", needsReview: "بانتظار مراجعة أهل العلم", next: "اكتشافي التالي", stageComplete: "اكتملت رحلة هذه المرحلة",
    journeyComplete: "أكملت رحلة الاكتشاف", viewJournal: "شاهد اكتشافاتي", stageBack: "العودة إلى المرحلة",
    medalLabel: "وسام المرحلة", allFacts: "كل الاكتشافات",
  },
  en: {
    eyebrow: "In the Realm of the Quran", back: "Back to the stage", missing: "This fact does not exist.",
    stage: (index: number) => `Stage ${index + 1} of ${STAGE_COUNT}`,
    newLabel: "New discovery", prompt: "Are you ready to discover something new?", reveal: "Reveal the discovery",
    discovered: "You discovered something new", known: "You discovered this before", replay: "See the discovery moment",
    connection: "Discover it in the Quran", readSurah: (name: string) => `Read Surah ${name}`, listenSurah: (name: string) => `Listen to Surah ${name}`,
    source: "How do we know this?", needsReview: "Awaiting a scholar’s review", next: "My next discovery", stageComplete: "This stage journey is complete",
    journeyComplete: "You completed the discovery journey", viewJournal: "See my discoveries", stageBack: "Back to the stage",
    medalLabel: "Stage medal", allFacts: "All discoveries",
  },
} as const;

type DetailState = "loading" | "new" | "known" | "revealed";

export default function QuranFact() {
  const { direction, locale } = useLocale();
  const [, params] = useRoute("/quran-facts/:slug");
  const { store } = useHifzStore();
  const profileId = activeProfile(store)?.id ?? null;
  const fact = params?.slug ? factBySlug(params.slug) : undefined;
  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const [detailState, setDetailState] = useState<DetailState>("loading");
  const [discoveries, setDiscoveries] = useState<string[]>([]);
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);
  const recordedSlug = useRef<string | null>(null);

  useEffect(() => {
    recordedSlug.current = null;
    if (!fact) { setLoadedSlug(null); setDetailState("loading"); return; }
    const stored = readFactDiscoveries(FACT_SLUGS, profileId);
    setDiscoveries(stored);
    setLoadedSlug(fact.slug);
    setDetailState(stored.includes(fact.slug) ? "known" : "new");
  }, [fact?.slug, profileId]);

  // This runs after the revealed knowledge is committed to the UI. The ref
  // keeps re-renders and React development effects from writing twice.
  useEffect(() => {
    if (!fact || loadedSlug !== fact.slug || detailState !== "revealed" || recordedSlug.current === fact.slug) return;
    recordedSlug.current = fact.slug;
    setDiscoveries(discoverFact(fact.slug, FACT_SLUGS, profileId));
  }, [detailState, fact, loadedSlug, profileId]);

  const Chrome = ({ children }: { children: React.ReactNode }) => <main className="site-shell" dir={direction}><SkipLink /><SiteChrome /><div id={MAIN_CONTENT_ID}>{children}</div></main>;
  if (!fact) return <Chrome><section className="section"><div className="container"><h1>{t.missing}</h1><Link href="/quran-facts" className="text-link">{t.allFacts}</Link></div></section></Chrome>;

  const stage = stageIndexForFact(quranFacts, fact.slug) ?? 0;
  const revealed = detailState === "revealed";
  const known = detailState === "known";
  const showKnowledge = known || revealed;
  const afterReveal = revealed ? Array.from(new Set([...discoveries, fact.slug])) : known ? discoveries : [];
  const completeStage = showKnowledge && stageIsComplete(quranFacts, afterReveal, stage);
  const nextFact = showKnowledge ? currentDiscovery(quranFacts, afterReveal) : null;
  const journeyComplete = showKnowledge && !nextFact;
  const surah = surahOfFact(fact);
  const surahName = surah === null ? "" : locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah);

  return <Chrome><article className="section fact-page" lang={locale} dir={direction}><div className="container fact-page__inner">
    <Link href="/quran-facts" className="story-back-link"><Arrow size={15} aria-hidden="true" /> {t.back}</Link>
    <span className="eyebrow eyebrow--gold"><Sparkles size={14} aria-hidden="true" /> {t.eyebrow} · {t.stage(stage)}</span>
    {!showKnowledge ? <section className="fact-discovery-moment" aria-labelledby="fact-discovery-title">
      <span className="fact-discovery-moment__icon"><QuranFactIcon name={fact.icon} size={38} /></span>
      <span>{t.newLabel}</span><h1 id="fact-discovery-title">{fact.title[locale]}</h1><p>{t.prompt}</p>
      <button type="button" className="button button--primary" onClick={() => setDetailState("revealed")}>{t.reveal} <Arrow size={17} aria-hidden="true" /></button>
    </section> : <>
      <header className="fact-page__knowledge"><div className="fact-page__title-icon"><QuranFactIcon name={fact.icon} size={28} /></div><div><p className="fact-page__status" role="status">{revealed ? t.discovered : t.known}</p><h1>{fact.title[locale]}</h1></div></header>
      {known && <button type="button" className="text-link fact-page__replay" onClick={() => setDetailState("new")}>{t.replay}</button>}
      <p className="fact-page__body">{fact.body[locale]}</p>
      {fact.ayahs.map(ayah => <figure key={ayah.ref} className="fact-card__ayah"><blockquote lang="ar" dir="rtl">{ayah.text}</blockquote><figcaption lang="ar" dir="rtl">{ayah.ref}</figcaption></figure>)}
      {surah !== null && <section className="fact-page__connection" aria-labelledby="fact-connection-title"><h2 id="fact-connection-title">{t.connection}</h2><div className="fact-page__surah"><Link href={`/read/${surah}`} className="button button--primary"><CirclePlay size={17} aria-hidden="true" /> {t.readSurah(surahName)}</Link><Link href={`/listen/${surah}`} className="button button--soft"><Headphones size={17} aria-hidden="true" /> {t.listenSurah(surahName)}</Link></div></section>}
      <details className="fact-page__deep-dive"><summary>{t.source}</summary><footer className="fact-card__source fact-page__source"><span className="fact-card__source-label">{fact.source.reliability} {fact.source.reliability === "🟡" ? t.needsReview : t.source}</span><b>{fact.source.reference[locale]}</b><small>{fact.source.note[locale]}</small></footer></details>
      {completeStage ? <section className="fact-stage-complete" role="status"><span aria-hidden="true">✦</span><h2>{journeyComplete ? t.journeyComplete : t.stageComplete}</h2><p>{t.stage(stage)}</p><Link href="/quran-facts" className="button button--primary">{journeyComplete ? t.viewJournal : t.stageBack}</Link></section> : <nav className="fact-page__actions" aria-label={t.next}>{nextFact && <Link href={`/quran-facts/${nextFact.slug}`} className="button button--primary">{t.next} <Arrow size={17} aria-hidden="true" /></Link>}<Link href="/quran-facts" className="text-link">{t.stageBack}</Link></nav>}
    </>}
  </div></article></Chrome>;
}
