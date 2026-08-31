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
import { useLocale } from "@/contexts/LocaleContext";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import {
  seerahStories,
  seerahStations,
  seerahStationOf,
  type AgeTier,
  type SeerahStory,
} from "@/content/seerah";

const copy = {
  ar: {
    home: "الرئيسية", quranStories: "قصص القرآن", eyebrow: "السيرة النبوية",
    backToStation: "كل قصص السيرة", storyCount: "قصص", read: "اقرأ القصة",
    station: "المحطة", stationsTitle: "السيرة النبوية ﷺ",
    stationsIntro: "رحلة في حياة النبي ﷺ، محطة بعد محطة — من مولده وطفولته إلى شبابه وأمانته بين قومه.",
    sections: "أقسام القصة", story: "القصة", know: "هل تعلم؟", value: "قيمة القصة",
    challenge: "تحدي الفهم", reward: "مكافأتك", source: "مصدر موثوق",
    ageGroup: "اختيار الفئة العمرية", chooseStory: "اختر قصة",
    correct: "أحسنت! إجابة صحيحة 🎉", wrong: "الإجابة الصحيحة بالأخضر — اقرأ القصة مرة أخرى وحاول مجدداً 💪",
    missing: "هذه القصة غير موجودة.",
  },
  en: {
    home: "Home", quranStories: "Quran stories", eyebrow: "The Prophet’s Seerah",
    backToStation: "All Seerah stories", storyCount: "stories", read: "Read the story",
    station: "Station", stationsTitle: "The Prophet’s Seerah ﷺ",
    stationsIntro: "A journey through the Prophet’s life, one station at a time — from his birth and childhood to his youth and the trust he earned among his people.",
    sections: "Story sections", story: "The story", know: "Did you know?", value: "The story’s value",
    challenge: "Comprehension challenge", reward: "Your reward", source: "Trusted source",
    ageGroup: "Choose an age group", chooseStory: "Choose a story",
    correct: "Well done — that’s right 🎉", wrong: "The correct answer is in green — read the story again and try once more 💪",
    missing: "This story does not exist.",
  },
} as const;

const tierLabels: Record<AgeTier, string> = {
  tier_1_age_6_8: "٦–٨ سنوات",
  tier_2_age_9_11: "٩–١١ سنة",
};

function Chrome({ children }: { children: React.ReactNode }) {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  return (
    <main className="site-shell" dir={direction}>
      <SkipLink />
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="brand-mark" aria-label={t.home}>
            <span className="brand-mark__seal">ي</span>
            <span><b>Yahya</b> Quran Academy</span>
          </Link>
          <div className="header-actions">
            <LanguageToggle compact />
            <Link href="/stories" className="header-reader-link">
              <BookOpen size={16} aria-hidden="true" /> {t.quranStories}
            </Link>
          </div>
        </div>
      </header>
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
  return (
    <figure className={`story-image story-image-placeholder story-image-placeholder--leaf ${className ?? ""}`} aria-hidden="true">
      <span className="story-image-placeholder__sun" />
      <span className="story-image-placeholder__hill" />
      <span className="story-image-placeholder__hill story-image-placeholder__hill--two" />
      <small lang="ar" dir="rtl">{story.title}</small>
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
      <img
        src={story.image}
        alt=""
        loading="lazy"
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
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Link href={`/seerah/${story.slug}`} className="story-list-card">
      <SeerahArt story={story} />
      <div className="story-list-card__body" lang="ar" dir="rtl">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{story.title}</h3>
        <p>{story.content.tier_1_age_6_8.shortLesson}</p>
        <span className="story-read-pill">{t.read} <Arrow size={15} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}

function ChallengeSection({ story, number }: { story: SeerahStory; number: number }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const [picked, setPicked] = useState<number | null>(null);
  const { challenge } = story.interactive;
  const answered = picked !== null;
  const correct = picked === challenge.correctAnswer;

  return (
    <section className="story-reading-section" id="story-challenge" aria-live="polite">
      <span className="story-section-number">{number}</span>
      <div>
        <span className="story-section-label"><HelpCircle size={13} aria-hidden="true" /> {t.challenge}</span>
        <h2>{t.challenge}</h2>
        <p>{challenge.question}</p>
        <ul className="seerah-options">
          {challenge.options.map((option, index) => {
            const state = !answered ? "" : index === challenge.correctAnswer ? " is-correct" : index === picked ? " is-wrong" : "";
            return (
              <li key={option}>
                <button
                  type="button"
                  className={`button button--soft seerah-option${state}`}
                  disabled={answered}
                  onClick={() => setPicked(index)}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
        {answered && <p>{correct ? `${t.correct} — ${story.gamification.badge}` : t.wrong}</p>}
      </div>
    </section>
  );
}

function SeerahStoryView({ story }: { story: SeerahStory }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const [tier, setTier] = useState<AgeTier>("tier_1_age_6_8");
  const isTier1 = tier === "tier_1_age_6_8";
  const narrative = isTier1
    ? story.content.tier_1_age_6_8.narrative
    : story.content.tier_2_age_9_11.narrative;
  const lesson = isTier1 ? story.content.tier_1_age_6_8.shortLesson : null;
  const details = !isTier1 ? story.content.tier_2_age_9_11.details : null;

  return (
    <>
      <section className="story-detail-hero" lang="ar" dir="rtl">
        <div className="container story-detail-hero__grid">
          <div>
            {/* .story-back-link is inline-flex, so it shares a line with the
                station label unless it gets a block of its own. */}
            <div>
              <Link href="/seerah" className="story-back-link">
                <ArrowRight size={15} aria-hidden="true" /> {t.backToStation}
              </Link>
            </div>
            <span className="story-detail-hero__count">{seerahStationOf(story).titleAr}</span>
            <h1>{story.title}</h1>
            <p className="story-detail-hero__hook">{story.content.tier_1_age_6_8.shortLesson}</p>
            <div className="story-detail-actions" role="group" aria-label={t.ageGroup}>
              {(Object.keys(tierLabels) as AgeTier[]).map(key => (
                <button
                  key={key}
                  type="button"
                  className={`button ${tier === key ? "button--primary" : "button--soft"}`}
                  aria-pressed={tier === key}
                  onClick={() => setTier(key)}
                >
                  {tierLabels[key]}
                </button>
              ))}
            </div>
          </div>
          <SeerahArt story={story} />
        </div>
      </section>

      <article className="story-article story-article--printable" lang="ar" dir="rtl">
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
                <span className="story-section-label">{t.story}</span>
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
                <p>{story.interactive.discover}</p>
              </div>
            </section>

            <section className="story-reading-section" id="story-value">
              <span className="story-section-number">3</span>
              <div>
                <span className="story-section-label"><Sparkles size={13} aria-hidden="true" /> {t.value}</span>
                <h2>{story.interactive.value.icon} {story.interactive.value.name}</h2>
                <p>💭 {story.interactive.thinkQuestion}</p>
              </div>
            </section>

            <ChallengeSection story={story} number={4} />

            <section className="story-reading-section" id="story-reward">
              <span className="story-section-number">5</span>
              <div>
                <span className="story-section-label"><Trophy size={13} aria-hidden="true" /> {t.reward}</span>
                <h2>{t.reward}</h2>
                <p><strong>{story.gamification.artifact.name}</strong> — {story.gamification.artifact.description}</p>
                <p>{story.gamification.badge}</p>
              </div>
            </section>

            <section className="story-reading-section" id="story-source">
              <span className="story-section-number">6</span>
              <div>
                <span className="story-section-label"><ShieldCheck size={13} aria-hidden="true" /> {t.source}</span>
                <h2>{t.source} {story.source.reliability}</h2>
                <p>{story.source.reference}</p>
                <p><small>{story.source.note}</small></p>
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
            <p lang="ar" dir="rtl">{t.missing}</p>
            <Link href="/seerah" className="text-link">{t.backToStation}</Link>
          </div></section>
        </Chrome>
      );
    }
    return <Chrome><SeerahStoryView story={story} /></Chrome>;
  }

  return (
    <Chrome>
      <section className="stories-list-hero" lang="ar" dir="rtl">
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
            <img
              src="/stories/seerah/cover.jpg"
              alt=""
              width={1600}
              height={893}
              loading="lazy"
              onError={event => { (event.currentTarget.closest("figure") as HTMLElement | null)?.style.setProperty("display", "none"); }}
            />
          </figure>
        </div>
      </section>
      {seerahStations.map(station => {
        const list = seerahStories.filter(story => story.stationId === station.stationId);
        if (list.length === 0) return null;
        return (
          <section className="stories-section stories-section--list" key={station.stationId} id={`station-${station.stationId}`}>
            <div className="container">
              <div className="stories-section__heading" lang="ar" dir="rtl">
                <span className="eyebrow eyebrow--gold">{t.station} {station.stationId}</span>
                <h2>{station.titleAr}</h2>
                <p>{station.descriptionAr}</p>
              </div>
              <ol className="story-list-grid">
                {list.map((story, index) => (
                  <li key={story.slug}><SeerahCard story={story} index={index} /></li>
                ))}
              </ol>
            </div>
          </section>
        );
      })}
    </Chrome>
  );
}
