import { lazy, Suspense, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Moon } from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { StoryPicture } from "@/components/StoryPicture";
import { useLocale } from "@/contexts/LocaleContext";
import { seerahStationIndex, seerahStoryIndex } from "@/lib/page-index.generated";
import { artAlt, CARD_SIZES, COVER_SIZES } from "@/lib/story-images";

const SeerahDetail = lazy(() => import("./SeerahDetail"));

const STATION_MARKS: Record<number, string> = {
  1: "🌱", 2: "🤝", 3: "✨", 4: "📣", 5: "🌙", 6: "🐪", 7: "🛡️", 8: "🕊️", 9: "🤍",
};

const copy = {
  ar: {
    home: "الرئيسية", quranStories: "قصص القرآن", eyebrow: "السيرة النبوية",
    read: "اقرأ القصة", station: "المحطة", stationsTitle: "السيرة النبوية ﷺ",
    stationsIntro: "رحلة نعيش فيها مع سيرة النبي محمد ﷺ، محطة بعد محطة؛ من مولده وطفولته، إلى شبابه وصدقه وأمانته، ثم نزول الوحي وبداية الرسالة.",
    mapLabel: "خريطة حياة النبي ﷺ", mapHint: "اختر محطة لتقرأ قصصها",
    showAll: "اعرض كل المحطات", showOne: "محطة واحدة في كل مرة", loading: "نفتح القصة…",
  },
  en: {
    home: "Home", quranStories: "Quran stories", eyebrow: "The Prophet’s Seerah",
    read: "Read the story", station: "Station", stationsTitle: "The Prophet’s Seerah ﷺ",
    stationsIntro: "A journey through the Prophet’s life, one station at a time — from his birth and childhood to his youth and the trust he earned among his people.",
    mapLabel: "A map of the Prophet’s life ﷺ", mapHint: "Pick a station to read its stories",
    showAll: "Show every station", showOne: "One station at a time", loading: "Opening the story…",
  },
} as const;

const langAttrs = (locale: "ar" | "en") =>
  locale === "en" ? { lang: "en", dir: "ltr" as const } : { lang: "ar", dir: "rtl" as const };

const stationCount = (count: number, locale: "ar" | "en") => {
  if (locale === "en") return `${count} ${count === 1 ? "story" : "stories"}`;
  if (count === 1) return "قصة واحدة";
  if (count === 2) return "قصتان";
  return count <= 10 ? `${count} قصص` : `${count} قصة`;
};

function Chrome({ children }: { children: React.ReactNode }) {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  return (
    <main className="site-shell" dir={direction}>
      <SkipLink />
      <SiteChrome />
      <div id={MAIN_CONTENT_ID}>{children}</div>
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="brand-mark"><span className="brand-mark__seal">ي</span><span><b>Yahya</b> Quran Academy</span></div>
          <Link href="/" className="text-link">{t.home}</Link>
        </div>
      </footer>
    </main>
  );
}

type IndexedStory = (typeof seerahStoryIndex)[number];

function SeerahArt({ story, alt }: { story: IndexedStory; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!story.image || failed) {
    return (
      <figure className="story-image story-image-placeholder story-image-placeholder--leaf" aria-hidden="true">
        <span className="story-image-placeholder__sun" />
        <span className="story-image-placeholder__hill" />
        <span className="story-image-placeholder__hill story-image-placeholder__hill--two" />
      </figure>
    );
  }
  return <figure className="story-image"><StoryPicture src={story.image} alt={alt} sizes={CARD_SIZES} width={1200} height={670} onError={() => setFailed(true)} /></figure>;
}

function SeerahCard({ story, index }: { story: IndexedStory; index: number }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const title = locale === "en" ? story.titleEn ?? story.title : story.title;
  const description = locale === "en" ? story.descriptionEn ?? story.description : story.description;
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Link href={`/seerah/${story.slug}`} className="story-list-card">
      <SeerahArt story={story} alt={artAlt(title, locale)} />
      <div className="story-list-card__body" {...langAttrs(locale)}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="story-read-pill">{t.read} <Arrow size={15} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}

function SeerahStationMap() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [openStation, setOpenStation] = useState<number | null>(seerahStationIndex[0]?.stationId ?? 1);
  const shown = openStation === null ? seerahStationIndex : seerahStationIndex.filter(station => station.stationId === openStation);

  return (
    <>
      <section className="seerah-map-section" aria-labelledby="seerah-map-title">
        <div className="container">
          <div className="stories-section__heading" {...langAttrs(locale)}>
            <span className="eyebrow eyebrow--gold">{t.mapLabel}</span>
            <h2 id="seerah-map-title">{t.mapHint}</h2>
          </div>
          <ol className="seerah-map" {...langAttrs(locale)}>
            {seerahStationIndex.map(station => {
              const count = seerahStoryIndex.filter(story => story.stationId === station.stationId).length;
              if (count === 0) return null;
              const active = openStation === station.stationId;
              return (
                <li key={station.stationId}>
                  <button type="button" className={`seerah-map__stop${active ? " is-current" : ""}`} aria-pressed={active} onClick={() => setOpenStation(station.stationId)}>
                    <span className="seerah-map__mark" aria-hidden="true">{STATION_MARKS[station.stationId] ?? "•"}</span>
                    <b>{locale === "en" ? station.titleEn ?? station.titleAr : station.titleAr}</b>
                    <small>{stationCount(count, locale)}</small>
                  </button>
                </li>
              );
            })}
          </ol>
          <button type="button" className="button button--soft seerah-map__toggle" onClick={() => setOpenStation(current => current === null ? seerahStationIndex[0].stationId : null)}>
            {openStation === null ? t.showOne : t.showAll}
          </button>
        </div>
      </section>

      {shown.map(station => {
        const list = seerahStoryIndex.filter(story => story.stationId === station.stationId);
        if (list.length === 0) return null;
        const title = locale === "en" ? station.titleEn ?? station.titleAr : station.titleAr;
        const description = locale === "en" ? station.descriptionEn ?? station.descriptionAr : station.descriptionAr;
        return (
          <section className="stories-section stories-section--list" key={station.stationId} id={`station-${station.stationId}`}>
            <div className="container">
              <div className="stories-section__heading" {...langAttrs(locale)}>
                <span className="eyebrow eyebrow--gold">{t.station} {station.stationId}</span>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
              {station.cover && <figure className="seerah-station-cover"><StoryPicture src={station.cover} alt="" sizes={COVER_SIZES} width={1600} height={893} /></figure>}
              <ol className="story-list-grid">{list.map((story, index) => <li key={story.slug}><SeerahCard story={story} index={index} /></li>)}</ol>
            </div>
          </section>
        );
      })}
    </>
  );
}

function SeerahHub() {
  const { locale } = useLocale();
  const t = copy[locale];
  return (
    <Chrome>
      <section className="stories-list-hero" {...langAttrs(locale)}>
        <div className="container stories-list-hero__grid">
          <div>
            <span className="eyebrow eyebrow--gold"><Moon size={15} aria-hidden="true" /> {t.eyebrow}</span>
            <h1>{t.stationsTitle}</h1>
            {locale === "ar" ? (
              <div className="seerah-hero__intro">
                <p>رحلة نعيش فيها مع سيرة النبي محمد ﷺ، محطة بعد محطة؛ من مولده وطفولته، إلى شبابه وصدقه وأمانته، ثم نزول الوحي وبداية الرسالة.</p>
                <p><strong>نتعرف على أحداث حقيقية، ومواقف عظيمة، ودروس تساعدنا أن نقتدي بالنبي ﷺ في حياتنا كل يوم.</strong></p>
              </div>
            ) : <p>{t.stationsIntro}</p>}
            <Link href="/stories" className="stories-hero__library-link"><BookOpen size={16} aria-hidden="true" /> {t.quranStories}</Link>
          </div>
          <figure className="animals-collection-cover"><StoryPicture src="/stories/seerah/cover.jpg" alt="" sizes={COVER_SIZES} width={1600} height={893} eager onError={event => { (event.currentTarget.closest("figure") as HTMLElement | null)?.style.setProperty("display", "none"); }} /></figure>
        </div>
      </section>
      <SeerahStationMap />
    </Chrome>
  );
}

function DetailFallback() {
  const { locale, direction } = useLocale();
  return <main className="site-shell" dir={direction}><SkipLink /><SiteChrome /><section className="section" aria-busy="true"><div className="container">{copy[locale].loading}</div></section></main>;
}

export default function Seerah() {
  const [isStory] = useRoute("/seerah/:slug");
  if (!isStory) return <SeerahHub />;
  return <Suspense fallback={<DetailFallback />}><SeerahDetail /></Suspense>;
}
