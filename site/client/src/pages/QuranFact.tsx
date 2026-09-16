// =============================================================================
// QuranFact — one of the hundred, on a page of its own.
//
// The section held a hundred slugs and served them all from a single address.
// Nothing could be linked to, nothing could be found, and the source line we
// put under each card had nowhere to live outside a deck a reader had to shuffle
// through. Every other section of the site gives its pieces a page; this one
// now does too.
//
// The page also ends where the card could not: at the surah itself. A fact
// about An-Naml offers to open An-Naml and to play it, so a thing worth knowing
// leads back into the Quran rather than stopping at a card.
// =============================================================================

import { Link, useRoute } from "wouter";
import { ChevronLeft, ChevronRight, CirclePlay, Headphones, Sparkles } from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { quranFacts } from "@/content/quran-facts";
import { factBySlug, surahOfFact } from "@/lib/quran-facts-index";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";

const copy = {
  ar: {
    eyebrow: "في رحاب القرآن",
    back: "كل المعلومات",
    source: "من أين نعرف هذا؟",
    needsReview: "بانتظار مراجعة أهل العلم",
    readSurah: (name: string) => `اقرأ سورة ${name}`,
    listenSurah: (name: string) => `استمع إلى سورة ${name}`,
    missing: "هذه المعلومة غير موجودة.",
    number: (n: number) => `المعلومة ${n} من ${quranFacts.length}`,
    prev: "السابقة",
    next: "التالية",
  },
  en: {
    eyebrow: "In the Realm of the Quran",
    back: "All the facts",
    source: "How do we know this?",
    needsReview: "Awaiting a scholar’s review",
    readSurah: (name: string) => `Read Surah ${name}`,
    listenSurah: (name: string) => `Listen to Surah ${name}`,
    missing: "This fact does not exist.",
    number: (n: number) => `Fact ${n} of ${quranFacts.length}`,
    prev: "Previous",
    next: "Next",
  },
} as const;

export default function QuranFact() {
  const { direction, locale } = useLocale();
  const [, params] = useRoute("/quran-facts/:slug");
  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const fact = params?.slug ? factBySlug(params.slug) : undefined;

  const Chrome = ({ children }: { children: React.ReactNode }) => (
    <main className="site-shell" dir={direction}>
      <SkipLink />
      <SiteChrome />
      <div id={MAIN_CONTENT_ID}>{children}</div>
    </main>
  );

  if (!fact) {
    return (
      <Chrome>
        <section className="section"><div className="container">
          <h1>{t.missing}</h1>
          <Link href="/quran-facts" className="text-link">{t.back}</Link>
        </div></section>
      </Chrome>
    );
  }

  const index = quranFacts.indexOf(fact);
  const previous = index > 0 ? quranFacts[index - 1] : null;
  const following = index < quranFacts.length - 1 ? quranFacts[index + 1] : null;
  const surah = surahOfFact(fact);
  const surahName = surah === null ? "" : locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah);

  return (
    <Chrome>
      <article className="section fact-page" lang={locale} dir={direction}>
        <div className="container fact-page__inner">
          <Link href="/quran-facts" className="story-back-link">
            <Arrow size={15} aria-hidden="true" /> {t.back}
          </Link>

          <span className="eyebrow eyebrow--gold"><Sparkles size={14} aria-hidden="true" /> {t.eyebrow} · {t.number(fact.number)}</span>
          <h1>{fact.title[locale]}</h1>
          <p className="fact-page__body">{fact.body[locale]}</p>

          {fact.ayahs.map(ayah => (
            <figure key={ayah.ref} className="fact-card__ayah">
              <blockquote lang="ar" dir="rtl">{ayah.text}</blockquote>
              <figcaption lang="ar" dir="rtl">{ayah.ref}</figcaption>
            </figure>
          ))}

          {/* A fact worth knowing should lead back into the Quran, not stop
              at a card about it. */}
          {surah !== null && (
            <div className="fact-page__surah">
              <Link href={`/read/${surah}`} className="button button--primary">
                <CirclePlay size={17} aria-hidden="true" /> {t.readSurah(surahName)}
              </Link>
              <Link href={`/listen/${surah}`} className="button button--soft">
                <Headphones size={17} aria-hidden="true" /> {t.listenSurah(surahName)}
              </Link>
            </div>
          )}

          <footer className="fact-card__source fact-page__source">
            <span className="fact-card__source-label">
              {fact.source.reliability} {fact.source.reliability === "🟡" ? t.needsReview : t.source}
            </span>
            <b>{fact.source.reference[locale]}</b>
            <small>{fact.source.note[locale]}</small>
          </footer>

          <nav className="story-pager" aria-label={t.back}>
            {previous
              ? <Link href={`/quran-facts/${previous.slug}`} className="text-link">{t.prev}: {previous.title[locale]}</Link>
              : <span />}
            <Link href="/quran-facts" className="text-link">{t.back}</Link>
            {following
              ? <Link href={`/quran-facts/${following.slug}`} className="text-link">{t.next}: {following.title[locale]}</Link>
              : <span />}
          </nav>
        </div>
      </article>
    </Chrome>
  );
}
