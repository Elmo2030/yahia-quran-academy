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

import { lazy, Suspense, useMemo, useState } from "react";
import { useLearningStep } from "@/hooks/useLearningStep";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, Compass, HelpCircle, ShieldCheck, Sparkles, Trophy } from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { useLocale } from "@/contexts/LocaleContext";
import { StoryNarration } from "@/components/StoryNarration";
import { narratedSeerah } from "@/lib/narration.generated";
import { BadgeAward } from "@/components/BadgeAward";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { StoryPicture } from "@/components/StoryPicture";
import { artAlt, CARD_SIZES, COVER_SIZES } from "@/lib/story-images";
import {
  seerahStories,
  seerahStations,
  seerahStationOf,
  seerahTextFor,
  type AgeTier,
  type SeerahStory,
  type SeerahText,
} from "@/content/seerah";
import { useSeerahEnglish } from "@/content/seerah-english";
import type { SeerahPilotEpisode } from "@/content/seerah-pilot-station-1";

// English and a single Arabic station must not download all nine narratives.
const pilotViews = [
  () => import("@/content/seerah-pilot-station-1").then(m => m.seerahStationOnePilot),
  () => import("@/content/seerah-pilot-station-2").then(m => m.seerahStationTwoPilot),
  () => import("@/content/seerah-pilot-station-3").then(m => m.seerahStationThreePilot),
  () => import("@/content/seerah-pilot-station-4").then(m => m.seerahStationFourPilot),
  () => import("@/content/seerah-pilot-station-5").then(m => m.seerahStationFivePilot),
  () => import("@/content/seerah-pilot-station-6").then(m => m.seerahStationSixPilot),
  () => import("@/content/seerah-pilot-station-7").then(m => m.seerahStationSevenPilot),
  () => import("@/content/seerah-pilot-station-8").then(m => m.seerahStationEightPilot),
  () => import("@/content/seerah-pilot-station-9").then(m => m.seerahStationNinePilot),
].map(load => lazy(async () => {
  const episodes = await load();
  return { default: ({ story }: { story: SeerahStory }) => {
    const episode = episodes.find(item => item.storyId === story.storyId);
    if (!episode) throw new Error("Seerah episode unavailable");
    return <SeerahPilotStoryView story={story} episode={episode} />;
  } };
}));

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
    loading: "نفتح القصة…",
    retrySave: "أعد محاولة الحفظ", journey: "العودة إلى رحلتي",
    saveError: "تعذّر حفظ تقدمك على هذا الجهاز. تحقق من مساحة التخزين وحاول مجددًا.",
    home: "الرئيسية", quranStories: "قصص القرآن", eyebrow: "السيرة النبوية",
    backToStation: "كل قصص السيرة", storyCount: "قصص", read: "اقرأ القصة",
    station: "المحطة", stationsTitle: "السيرة النبوية ﷺ",
    stationsIntro: "رحلة في حياة النبي ﷺ، محطة بعد محطة — من مولده وطفولته إلى شبابه وأمانته بين قومه.",
    sections: "أقسام القصة", story: "القصة", know: "هل تعلم؟", value: "قيمة القصة",
    challenge: "تحدي الفهم", reward: "مكافأتك", source: "مصدر موثوق",
    ageGroup: "اختيار الفئة العمرية", chooseStory: "اختر قصة",
    correct: "أحسنت! إجابة صحيحة 🎉", wrong: "ليست هذه — اقرأ القصة مرة أخرى وجرّب اختياراً آخر 💪",
    missing: "هذه القصة غير موجودة.",
    context: "السياق", scenes: "مشاهد القصة", turningPoint: "اللحظة المهمة", outcome: "ما حدث",
    quranConnection: "صلة بالقرآن", sunnahConnection: "صلة بالسنة", coreLesson: "درس الحلقة",
    reflection: "فكّر قليلًا", tryIt: "جرّب اليوم",
    mapLabel: "خريطة حياة النبي ﷺ", mapHint: "اختر محطة لتقرأ قصصها",
    showAll: "اعرض كل المحطات", showOne: "محطة واحدة في كل مرة", youAreHere: "أنت هنا",
  },
  en: {
    loading: "Opening the story…",
    retrySave: "Retry saving", journey: "Back to my journey",
    saveError: "Your progress could not be saved on this device. Check storage space and try again.",
    home: "Home", quranStories: "Quran stories", eyebrow: "The Prophet’s Seerah",
    backToStation: "All Seerah stories", storyCount: "stories", read: "Read the story",
    station: "Station", stationsTitle: "The Prophet’s Seerah ﷺ",
    stationsIntro: "A journey through the Prophet’s life, one station at a time — from his birth and childhood to his youth and the trust he earned among his people.",
    sections: "Story sections", story: "The story", know: "Did you know?", value: "The story’s value",
    challenge: "Comprehension challenge", reward: "Your reward", source: "Trusted source",
    ageGroup: "Choose an age group", chooseStory: "Choose a story",
    correct: "Well done — that’s right 🎉", wrong: "Not that one — read the story again and try another answer 💪",
    missing: "This story does not exist.",
    context: "Context", scenes: "Story scenes", turningPoint: "The important moment", outcome: "What happened",
    quranConnection: "Quran connection", sunnahConnection: "Sunnah connection", coreLesson: "Episode lesson",
    reflection: "Think for a moment", tryIt: "Try it today",
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

/** A story's title, lead line, questions and keepsakes in the reader's
 *  language. English suspends once while seerah-en.ts arrives. */
function useSeerahView(story: SeerahStory) {
  const { locale } = useLocale();
  const english = useSeerahEnglish(locale);
  return seerahTextFor(story, english?.[story.slug]);
}

function Placeholder({ story, className }: { story: SeerahStory; className?: string }) {
  const text = useSeerahView(story);
  return (
    <figure className={`story-image story-image-placeholder story-image-placeholder--leaf ${className ?? ""}`} aria-hidden="true">
      <span className="story-image-placeholder__sun" />
      <span className="story-image-placeholder__hill" />
      <span className="story-image-placeholder__hill story-image-placeholder__hill--two" />
      <small>{text.title}</small>
    </figure>
  );
}

/** Artwork with the drawn placeholder as a fallback — used both when a story
 *  declares no image and when the declared file has not been added yet, so a
 *  missing drop-in never shows a broken image. */
function SeerahArt({ story, className, alt, eager }: { story: SeerahStory; className?: string; alt: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!story.image || failed) return <Placeholder story={story} className={className} />;
  return (
    <figure className={`story-image ${className ?? ""}`}>
      <StoryPicture
        src={story.image}
        alt={alt}
        sizes={CARD_SIZES}
        width={1200}
        height={670}
        eager={eager}
        onError={() => setFailed(true)}
      />
    </figure>
  );
}

function SeerahCard({ story, index }: { story: SeerahStory; index: number }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const text = useSeerahView(story);
  const [picked, setPicked] = useState<number | null>(null);
  const won = picked === text.interactive.challenge.correctAnswer;
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Link href={`/seerah/${story.slug}`} className="story-list-card">
      {/* The card's own title is two lines below, inside this link. */}
      <SeerahArt story={story} alt="" />
      <div className="story-list-card__body" {...langAttrs(locale)}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{text.title}</h3>
        <p>{text.lead}</p>
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
  const text = useSeerahView(story);
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

/** The English story, with both age tiers. Arabic readers get the station
 *  text instead (SeerahPilotStoryView). */
function SeerahStoryView({ story, english }: { story: SeerahStory; english: SeerahText }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const [tier, setTier] = useState<AgeTier>("tier_1_age_6_8");
  const text = english;
  // The answer lives here, not in the challenge, so the medal can wait on it.
  const { tried, won, answer, saveFailed, retrySave } = useLearningStep("seerah", story.slug, text.interactive.challenge.correctAnswer);
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
          <SeerahArt story={story} alt={artAlt(text.title, locale)} eager />
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

            {saveFailed && <div role="alert"><p>{t.saveError}</p><button type="button" className="button button--soft" onClick={retrySave}>{t.retrySave}</button></div>}
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
                <Link href="/journey" className="button button--soft">{t.journey}</Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}

/**
 * The Station 1 pilot is deliberately rendered only for Arabic. The reviewed
 * master narrative is Arabic-only; English continues to use the established
 * localized record until it receives the same editorial review.
 */
/** The station text — the Arabic Seerah. */
function ArabicStory({ story }: { story: SeerahStory }) {
  const PilotView = pilotViews[story.stationId - 1];
  return <PilotView story={story} />;
}

/** The English text once seerah-en.ts has arrived; a story it lacks falls
 *  back to the Arabic station text rather than to nothing. */
function EnglishStory({ story }: { story: SeerahStory }) {
  const english = useSeerahEnglish("en")?.[story.slug];
  return english ? <SeerahStoryView story={story} english={english} /> : <ArabicStory story={story} />;
}

function SeerahPilotStoryView({ story, episode }: { story: SeerahStory; episode: SeerahPilotEpisode }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const station = seerahStationOf(story);
  const text = seerahTextFor(story);
  // The pilot replaces the old prose with a reviewed narrative, but keeps the
  // existing story question and reward contract. A keepsake is earned through
  // the child-facing reflection instead of being announced as a text reward.
  const { tried, won, answer, saveFailed, retrySave } = useLearningStep("seerah", story.slug, text.interactive.challenge.correctAnswer);
  const connectionCount = Number(Boolean(episode.quran)) + Number(Boolean(episode.sunnah));
  const lessonNumber = 2 + connectionCount;
  const challengeNumber = lessonNumber + 1;

  return (
    <>
      <section className="story-detail-hero" {...langAttrs(locale)}>
        <div className="container story-detail-hero__grid">
          <div>
            <div>
              <Link href="/seerah" className="story-back-link">
                <ArrowRight size={15} aria-hidden="true" /> {t.backToStation}
              </Link>
            </div>
            <span className="story-detail-hero__count">{locale === "en" ? station.titleEn : station.titleAr}</span>
            <h1>{episode.title}</h1>
            <p className="story-detail-hero__hook">{episode.hook}</p>
          </div>
          <SeerahArt story={story} alt={artAlt(episode.title, locale)} />
        </div>
      </section>

      <article className="story-article story-article--printable" {...langAttrs(locale)}>
        <div className="container story-article__layout">
          <nav className="story-article__rail no-print" aria-label={t.sections}>
            <span className="story-section-label">{t.sections}</span>
            <a href="#pilot-story">{t.story}</a>
            {episode.quran && <a href="#pilot-quran">{t.quranConnection}</a>}
            {episode.sunnah && <a href="#pilot-sunnah">{t.sunnahConnection}</a>}
            <a href="#pilot-lesson">{t.coreLesson}</a>
            <a href="#pilot-challenge">{t.challenge}</a>
            {won && <a href="#pilot-reward">{t.reward}</a>}
            <a href="#pilot-source">{t.source}</a>
          </nav>

          <div className="story-article__content">
            {locale === "ar" && narratedSeerah.includes(story.slug) && (
              <StoryNarration src={`/stories/seerah/audio/${story.slug}.mp3`} />
            )}
            <section className="story-reading-section story-reading-section--hook" id="pilot-story">
              <span className="story-section-number">1</span>
              <div>
                <span className="story-section-label"><Compass size={13} aria-hidden="true" /> {t.story}</span>
                <h2>{t.story}</h2>
                {episode.childStory.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "story-reading-section__lead" : undefined}>{paragraph}</p>
                ))}
              </div>
            </section>

            {episode.quran && (
              <section className="story-reading-section" id="pilot-quran">
                <span className="story-section-number">2</span>
                <div>
                  <span className="story-section-label"><ShieldCheck size={13} aria-hidden="true" /> {t.quranConnection}</span>
                  <h2>{episode.quran.reference}</h2>
                  <p>{episode.quran.text}</p>
                  <p><small>{episode.quran.explanation}</small></p>
                </div>
              </section>
            )}

            {episode.sunnah && (
              <section className="story-reading-section" id="pilot-sunnah">
                <span className="story-section-number">{episode.quran ? 3 : 2}</span>
                <div>
                  <span className="story-section-label"><ShieldCheck size={13} aria-hidden="true" /> {t.sunnahConnection}</span>
                  <h2>{episode.sunnah.reference}</h2>
                  <p>{episode.sunnah.text}</p>
                  <p><small>{episode.sunnah.explanation}</small></p>
                </div>
              </section>
            )}

            <section className="story-reading-section" id="pilot-lesson">
              <span className="story-section-number">{lessonNumber}</span>
              <div>
                <span className="story-section-label"><Trophy size={13} aria-hidden="true" /> {t.coreLesson}</span>
                <h2>{t.outcome}</h2>
                <p>{episode.learning.whatHappened}</p>
                <h2>{episode.learning.coreLesson}</h2>
                <p>💭 {episode.learning.reflection}</p>
                <h2>{t.tryIt}</h2>
                <p>{episode.learning.tryIt}</p>
              </div>
            </section>

            {saveFailed && <div role="alert"><p>{t.saveError}</p><button type="button" className="button button--soft" onClick={retrySave}>{t.retrySave}</button></div>}
            <ChallengeSection story={story} number={challengeNumber} tried={tried} solved={won} onPick={answer} />

            {won && (
              <section className="story-reading-section" id="pilot-reward">
                <span className="story-section-number">{challengeNumber + 1}</span>
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

            <section className="story-reading-section" id="pilot-source">
              <span className="story-section-number">{challengeNumber + (won ? 2 : 1)}</span>
              <div>
                <span className="story-section-label"><ShieldCheck size={13} aria-hidden="true" /> {t.source}</span>
                <h2>{t.source}</h2>
                <ul>
                  {episode.sources.map(source => <li key={source}>{source}</li>)}
                </ul>
                <Link href="/journey" className="button button--soft">{t.journey}</Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}

export default function SeerahDetail() {
  const [isStory, params] = useRoute("/seerah/:slug");
  const { locale } = useLocale();
  const t = copy[locale];
  const story = useMemo(
    () => (isStory ? seerahStories.find(s => s.slug === params?.slug) ?? null : null),
    [isStory, params?.slug],
  );

  // English waits for its own file once, so no card or heading flashes Arabic
  // first; after that every component reads the cached copy.
  const english = useSeerahEnglish(locale);
  if (locale === "en" && !english) return <Chrome><p role="status" className="container">{t.loading}</p></Chrome>;

  if (!isStory || !story) {
    return <Chrome><section className="section"><div className="container"><p>{t.missing}</p><Link href="/seerah" className="text-link">{t.backToStation}</Link></div></section></Chrome>;
  }
  return <Chrome><Suspense fallback={<p role="status" className="container">{t.loading}</p>}>
    {locale === "en" ? <EnglishStory story={story} key={story.slug} /> : <ArabicStory story={story} key={story.slug} />}
  </Suspense></Chrome>;
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
  const english = useSeerahEnglish(locale);
  const shown = openStation === null
    ? seerahStations
    : seerahStations.filter(station => station.stationId === openStation);

  if (locale === "en" && !english) return <p role="status" className="container">{t.loading}</p>;
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
                  {/* The station's name is the <h2> above this cover. */}
                  <StoryPicture src={station.cover} alt="" sizes={COVER_SIZES} width={1600} height={893} />
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
