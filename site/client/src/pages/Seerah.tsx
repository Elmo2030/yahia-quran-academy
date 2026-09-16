// =============================================================================
// Seerah — the Prophet's biography, as a station of illustrated child stories.
// Routes: /seerah (station index) and /seerah/:slug (one story).
//
// The layout deliberately mirrors pages/Stories.tsx so the two libraries read
// as one product: the same Chrome, the same stories-list-hero, the same
// story-list-grid of cards, and the same rail + numbered sections inside a
// story. Earlier this page reached for the story-* classes without the
// structure they expect — .story-reading-section is a `44px 1fr` grid, so a
// bare <p> as its first child landed in the 44px rail column and rendered one
// word per line.
// =============================================================================

import { useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Compass, HelpCircle, Moon, ShieldCheck, Sparkles, Trophy } from "lucide-react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { SiteChrome } from "@/components/SiteChrome";
import { useLocale } from "@/contexts/LocaleContext";
import { BadgeAward } from "@/components/BadgeAward";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { StoryPicture } from "@/components/StoryPicture";
import { CARD_SIZES, COVER_SIZES } from "@/lib/story-images";
import {
  seerahStories,
  seerahStations,
  seerahStationOf,
  seerahTextFor,
  type AgeTier,
  type SeerahStory,
} from "@/content/seerah";

/** One mark per station, in the section's own language: places and things,
 *  never people. They carry the shape of the life at a glance. */
const stationCount = (count: number, locale: "ar" | "en") => {
  if (locale === "en") return `${count} ${count === 1 ? "story" : "stories"}`;
  // Arabic counts in three bands, and "15 قصص" reads as plainly wrong to a
  // parent as "15 storys" would.
  if (count === 1) return "قصة واحدة";
  if (count === 2) return "قصتان";
  return count <= 10 ? `${count} قصص` : `${count} قصة`;
};

const STATION_MARKS: Record<number, string> = {
  1: "🌱", 2: "🤝", 3: "✨", 4: "📣", 5: "🌙", 6: "🐪", 7: "🛡️", 8: "🕊️", 9: "🤍",
};

const copy = {
  ar: {
    home: "الرئيسية", quranStories: "قصص القرآن", eyebrow: "السيرة النبوية",
    backToStation: "كل قصص السيرة", storyCount: "قصص", read: "اقرأ القصة",
    station: "المحطة", stationsTitle: "السيرة النبوية ﷺ",
    stationsIntro: "رحلة في حياة النبي ﷺ، محطة بعد محطة — من مولده وطفولته إلى شبابه وأمانته بين قومه.",
    sections: "أقسام القصة", story: "القصة", know: "هل تعلم؟", value: "قيمة القصة",
    challenge: "تحدي الفهم", reward: "مكافأتك", source: "مصدر موثوق",
    ageGroup: "اختيار الفئة العمرية", chooseStory: "اختر قصة",
    correct: "أحسنت! إجابة صحيحة 🎉", wrong: "ليست هذه — اقرأ القصة مرة أخرى وجرّب اختياراً آخر 💪",
    missing: "هذه القصة غير موجودة.",
    mapLabel: "خريطة حياة النبي ﷺ", mapHint: "اختر محطة لتقرأ قصصها",
    showAll: "اعرض كل المحطات", showOne: "محطة واحدة في كل مرة", youAreHere: "أنت هنا",
  },
  en: {
    home: "Home", quranStories: "Quran stories", eyebrow: "The Prophet’s Seerah",
    backToStation: "All Seerah stories", storyCount: "stories", read: "Read the story",
    station: "Station", stationsTitle: "The Prophet’s Seerah ﷺ",
    stationsIntro: "A journey through the Prophet’s life, one station at a time — from his birth and childhood to his youth and the trust he earned among his people.",
    sections: "Story sections", story: "The story", know: "Did you know?", value: "The story’s value",
    challenge: "Comprehension challenge", reward: "Your reward", source: "Trusted source",
    ageGroup: "Choose an age group", chooseStory: "Choose a story",
    correct: "Well done — that’s right 🎉", wrong: "Not that one — read the story again and try another answer 💪",
    missing: "This story does not exist.",
    mapLabel: "A map of the Prophet\u2019s life \uFEFF\u0635\u0644\u0649 \u0627\u0644\u0644\u0647 \u0639\u0644\u064a\u0647 \u0648\u0633\u0644\u0645", mapHint: "Pick a station to read its stories",
    showAll: "Show every station", showOne: "One station at a time", youAreHere: "You are here",
  },
} as const;

/** Arabic content is RTL; the translations are not. Nothing here may hard-code
 *  dir="rtl", or English renders right-to-left. */
const langAttrs = (locale: "ar" | "en") =>
  locale === "en" ? { lang: "en", dir: "ltr" as const } : { lang: "ar", dir: "rtl" as const };

const tierLabels: Record<"ar" | "en", Record<AgeTier, string>> = {
  ar: { tier_1_age_6_8: "٦–٨ سنوات", tier_2_age_9_11: "٩–١١ سنة" },
  en: { tier_1_age_6_8: "Ages 6–8", tier_2_age_9_11: "Ages 9–11" },
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

function Placeholder({ story, className }: { story: SeerahStory; className?: string }) {
  const { locale } = useLocale();
  return (
    <figure className={`story-image story-image-placeholder story-image-placeholder--leaf ${className ?? ""}`} aria-hidden="true">
      <span className="story-image-placeholder__sun" />
      <span className="story-image-placeholder__hill" />
      <span className="story-image-placeholder__hill story-image-placeholder__hill--two" />
      <small>{seerahTextFor(story, locale).title}</small>
    </figure>
  );
}

/** Artwork with the drawn placeholder as a fallback — used both when a story
 *  declares no image and when the declared file has not been added yet, so a
 *  missing drop-in never shows a broken image. */
function SeerahArt({ story, className }: { story: SeerahStory; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!story.image || failed) return <Placeholder story={story} className={className} />;
  return (
    <figure className={`story-image ${className ?? ""}`}>
      <StoryPicture
        src={story.image}
        sizes={CARD_SIZES}
        width={1200}
        height={670}
        onError={() => setFailed(true)}
      />
    </figure>
  );
}

function SeerahCard({ story, index }: { story: SeerahStory; index: number }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const text = seerahTextFor(story, locale);
  const [picked, setPicked] = useState<number | null>(null);
  const won = picked === text.interactive.challenge.correctAnswer;
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Link href={`/seerah/${story.slug}`} className="story-list-card">
      <SeerahArt story={story} />
      <div className="story-list-card__body" {...langAttrs(locale)}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{text.title}</h3>
        <p>{text.content.tier_1_age_6_8.shortLesson}</p>
        <span className="story-read-pill">{t.read} <Arrow size={15} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}

function ChallengeSection({
  story, number, tried, solved, onPick,
}: {
  story: SeerahStory;
  number: number;
  /** Wrong answers already tried, so the same one is not offered twice. */
  tried: number[];
  solved: boolean;
  onPick: (index: number) => void;
}) {
  const { locale } = useLocale();
  const t = copy[locale];
  const text = seerahTextFor(story, locale);
  const { challenge } = text.interactive;

  return (
    <section className="story-reading-section" id="story-challenge" aria-live="polite">
      <span className="story-section-number">{number}</span>
      <div>
        <span className="story-section-label"><HelpCircle size={13} aria-hidden="true" /> {t.challenge}</span>
        <h2>{t.challenge}</h2>
        <p>{challenge.question}</p>
        <ul className="seerah-options">
          {challenge.options.map((option, index) => {
            // Only what was tried is marked. Saying "try again" while revealing
            // the answer and disabling every button is not a second chance.
            const state = solved && index === challenge.correctAnswer
              ? " is-correct"
              : tried.includes(index)
                ? " is-wrong"
                : "";
            return (
              <li key={option}>
                <button
                  type="button"
                  className={`button button--soft seerah-option${state}`}
                  disabled={solved || tried.includes(index)}
                  onClick={() => onPick(index)}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
        {(solved || tried.length > 0) && <p>{solved ? t.correct : t.wrong}</p>}
      </div>
    </section>
  );
}

function SeerahStoryView({ story }: { story: SeerahStory }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const [tier, setTier] = useState<AgeTier>("tier_1_age_6_8");
  const text = seerahTextFor(story, locale);
  // The answer lives here, not in the challenge, so the medal can wait on it.
  const [tried, setTried] = useState<number[]>([]);
  const [won, setWon] = useState(false);
  const answer = (index: number) => {
    if (index === text.interactive.challenge.correctAnswer) setWon(true);
    else setTried(current => (current.includes(index) ? current : [...current, index]));
  };
  const station = seerahStationOf(story);
  const isTier1 = tier === "tier_1_age_6_8";
  const narrative = isTier1
    ? text.content.tier_1_age_6_8.narrative
    : text.content.tier_2_age_9_11.narrative;
  const lesson = isTier1 ? text.content.tier_1_age_6_8.shortLesson : null;
  const details = !isTier1 ? text.content.tier_2_age_9_11.details : null;

  return (
    <>
      <section className="story-detail-hero" {...langAttrs(locale)}>
        <div className="container story-detail-hero__grid">
          <div>
            {/* .story-back-link is inline-flex, so it shares a line with the
                station label unless it gets a block of its own. */}
            <div>
              <Link href="/seerah" className="story-back-link">
                <ArrowRight size={15} aria-hidden="true" /> {t.backToStation}
              </Link>
            </div>
            <span className="story-detail-hero__count">{locale === "en" ? station.titleEn : station.titleAr}</span>
            <h1>{text.title}</h1>
            <p className="story-detail-hero__hook">{text.content.tier_1_age_6_8.shortLesson}</p>
            <div className="story-detail-actions" role="group" aria-label={t.ageGroup}>
              {(Object.keys(tierLabels[locale]) as AgeTier[]).map(key => (
                <button
                  key={key}
                  type="button"
                  className={`button ${tier === key ? "button--primary" : "button--soft"}`}
                  aria-pressed={tier === key}
                  onClick={() => setTier(key)}
                >
                  {tierLabels[locale][key]}
                </button>
              ))}
            </div>
          </div>
          <SeerahArt story={story} />
        </div>
      </section>

      <article className="story-article story-article--printable" {...langAttrs(locale)}>
        <div className="container story-article__layout">
          <nav className="story-article__rail no-print" aria-label={t.sections}>
            <span className="story-section-label">{t.sections}</span>
            <a href="#story-narrative">{t.story}</a>
            <a href="#story-know">{t.know}</a>
            <a href="#story-value">{t.value}</a>
            <a href="#story-challenge">{t.challenge}</a>
            <a href="#story-reward">{t.reward}</a>
            <a href="#story-source">{t.source}</a>
          </nav>

          <div className="story-article__content">
            <section className="story-reading-section story-reading-section--hook" id="story-narrative">
              <span className="story-section-number">1</span>
              <div>
                <h2 className="story-section-label">{t.story}</h2>
                <p className="story-reading-section__lead">{narrative}</p>
                {details && <p>{details}</p>}
                {lesson && <p>✨ {lesson}</p>}
              </div>
            </section>

            <section className="story-reading-section" id="story-know">
              <span className="story-section-number">2</span>
              <div>
                <span className="story-section-label"><Compass size={13} aria-hidden="true" /> {t.know}</span>
                <h2>{t.know}</h2>
                <p>{text.interactive.discover}</p>
              </div>
            </section>

            <section className="story-reading-section" id="story-value">
              <span className="story-section-number">3</span>
              <div>
                <span className="story-section-label"><Sparkles size={13} aria-hidden="true" /> {t.value}</span>
                <h2>{text.interactive.value.icon} {text.interactive.value.name}</h2>
                <p>💭 {text.interactive.thinkQuestion}</p>
              </div>
            </section>

            <ChallengeSection story={story} number={4} tried={tried} solved={won} onPick={answer} />

            {won && (
              <section className="story-reading-section" id="story-reward">
                <span className="story-section-number">5</span>
                <div>
                  <span className="story-section-label"><Trophy size={13} aria-hidden="true" /> {t.reward}</span>
                  <BadgeAward
                    icon={text.interactive.value.icon}
                    badge={text.gamification.badge}
                    keepsake={text.gamification.artifact.name}
                    note={text.gamification.artifact.description}
                    label={t.reward}
                  />
                </div>
              </section>
            )}

            <section className="story-reading-section" id="story-source">
              <span className="story-section-number">{won ? 6 : 5}</span>
              <div>
                <span className="story-section-label"><ShieldCheck size={13} aria-hidden="true" /> {t.source}</span>
                <h2>{t.source} {text.source.reliability}</h2>
                <p>{text.source.reference}</p>
                <p><small>{text.source.note}</small></p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}

export default function Seerah() {
  const [isStory, params] = useRoute("/seerah/:slug");
  const { locale } = useLocale();
  const t = copy[locale];
  const story = useMemo(
    () => (isStory ? seerahStories.find(s => s.slug === params?.slug) ?? null : null),
    [isStory, params?.slug],
  );

  if (isStory) {
    if (!story) {
      return (
        <Chrome>
          <section className="section"><div className="container">
            <p>{t.missing}</p>
            <Link href="/seerah" className="text-link">{t.backToStation}</Link>
          </div></section>
        </Chrome>
      );
    }
    return <Chrome><SeerahStoryView story={story} key={story.slug} /></Chrome>;
  }

  return (
    <Chrome>
      <section className="stories-list-hero" {...langAttrs(locale)}>
        <div className="container stories-list-hero__grid">
          <div>
            <span className="eyebrow eyebrow--gold"><Moon size={15} aria-hidden="true" /> {t.eyebrow}</span>
            <h1>{t.stationsTitle}</h1>
            <p>{t.stationsIntro}</p>
            <Link href="/stories" className="stories-hero__library-link"><BookOpen size={16} aria-hidden="true" /> {t.quranStories}</Link>
          </div>
          {/* The station cover is dropped in at /stories/seerah/cover.jpg. Until
              it lands, hide the figure rather than show a broken image. */}
          <figure className="animals-collection-cover">
            <StoryPicture
              src="/stories/seerah/cover.jpg"
              sizes={COVER_SIZES}
              width={1600}
              height={893}
              eager
              onError={event => { (event.currentTarget.closest("figure") as HTMLElement | null)?.style.setProperty("display", "none"); }}
            />
          </figure>
        </div>
      </section>
      <SeerahStationMap />
    </Chrome>
  );
}

/**
 * The nine stations as a map, and one station's stories at a time.
 *
 * The page used to lay all hundred stories end to end: nine headings and a
 * hundred cards in one scroll. That is a fine index and a poor way in — a
 * child of eight meets a wall of titles and has no sense of where the life
 * they are reading about begins or ends.
 *
 * The map gives them the shape first — nine stops from the birth to the
 * farewell — and then only the stories of the stop they chose. Crawlers are
 * unaffected: the prerendered page still carries all hundred links, so nothing
 * is hidden from search by being one tap away here.
 */
function SeerahStationMap() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [openStation, setOpenStation] = useState<number | null>(seerahStations[0]?.stationId ?? 1);
  const shown = openStation === null
    ? seerahStations
    : seerahStations.filter(station => station.stationId === openStation);

  return (
    <>
      <section className="seerah-map-section" aria-labelledby="seerah-map-title">
        <div className="container">
          <div className="stories-section__heading" {...langAttrs(locale)}>
            <span className="eyebrow eyebrow--gold">{t.mapLabel}</span>
            <h2 id="seerah-map-title">{t.mapHint}</h2>
          </div>
          <ol className="seerah-map" {...langAttrs(locale)}>
            {seerahStations.map(station => {
              const count = seerahStories.filter(story => story.stationId === station.stationId).length;
              if (count === 0) return null;
              const active = openStation === station.stationId;
              return (
                <li key={station.stationId}>
                  <button
                    type="button"
                    className={`seerah-map__stop${active ? " is-current" : ""}`}
                    aria-pressed={active}
                    onClick={() => setOpenStation(station.stationId)}
                  >
                    <span className="seerah-map__mark" aria-hidden="true">{STATION_MARKS[station.stationId] ?? "•"}</span>
                    <b>{locale === "en" ? station.titleEn : station.titleAr}</b>
                    <small>{stationCount(count, locale)}</small>
                  </button>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            className="button button--soft seerah-map__toggle"
            onClick={() => setOpenStation(current => (current === null ? seerahStations[0].stationId : null))}
          >
            {openStation === null ? t.showOne : t.showAll}
          </button>
        </div>
      </section>

      {shown.map(station => {
        const list = seerahStories.filter(story => story.stationId === station.stationId);
        if (list.length === 0) return null;
        return (
          <section className="stories-section stories-section--list" key={station.stationId} id={`station-${station.stationId}`}>
            <div className="container">
              <div className="stories-section__heading" {...langAttrs(locale)}>
                <span className="eyebrow eyebrow--gold">{t.station} {station.stationId}</span>
                <h2>{locale === "en" ? station.titleEn : station.titleAr}</h2>
                <p>{locale === "en" ? station.descriptionEn : station.descriptionAr}</p>
              </div>
              {station.cover && (
                <figure className="seerah-station-cover">
                  <StoryPicture src={station.cover} sizes={COVER_SIZES} width={1600} height={893} />
                </figure>
              )}
              <ol className="story-list-grid">
                {list.map((story, index) => (
                  <li key={story.slug}><SeerahCard story={story} index={index} /></li>
                ))}
              </ol>
            </div>
          </section>
        );
      })}
    </>
  );
}
