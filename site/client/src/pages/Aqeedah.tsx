// =============================================================================
// العقيدة — thirty-two cards in seven chapters.
//
// The same shape the Seerah uses: an index of chapters, and a page per card
// with the story, its ayah, a fact, a question to think about, a challenge, a
// keepsake and the source. One narrative rather than two age tiers, because
// that is how the material was written — the age note lives on the card head
// instead, as the document had it.
// =============================================================================

import { useMemo, useState } from "react";
import { useLearningStep } from "@/hooks/useLearningStep";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, HelpCircle, Heart, Moon, Sparkles } from "lucide-react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { BadgeAward } from "@/components/BadgeAward";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { StoryPicture } from "@/components/StoryPicture";
import { artAlt, CARD_SIZES, COVER_SIZES } from "@/lib/story-images";
import { useLocale } from "@/contexts/LocaleContext";
import {
  aqeedahCards, aqeedahChapters, aqeedahChapterOf, aqeedahTextFor,
  type AqeedahCard,
} from "@/content/aqeedah";

/** One mark per chapter of the creed, drawn from the chapter's own subject. */
const CHAPTER_MARKS: Record<string, string> = {
  opening: "🚪", "knowing-allah": "🌟", "pillars-of-faith": "🕌", messengers: "📜",
  worship: "🤲", "faith-in-action": "🌿", closing: "🏁",
};

const cardCount = (count: number, locale: "ar" | "en") => {
  if (locale === "en") return `${count} ${count === 1 ? "card" : "cards"}`;
  if (count === 1) return "بطاقة واحدة";
  if (count === 2) return "بطاقتان";
  return count <= 10 ? `${count} بطاقات` : `${count} بطاقة`;
};

const copy = {
  ar: {
    retrySave: "أعد محاولة الحفظ", journey: "العودة إلى رحلتي",
    saveError: "تعذّر حفظ تقدمك على هذا الجهاز. تحقق من مساحة التخزين وحاول مجددًا.",
    eyebrow: "العقيدة",
    title: "أتعرّف على ربّي",
    journeyLabel: "رحلة العقيدة", journeyHint: "اختر باباً لتقرأ بطاقاته", showAll: "اعرض كل الأبواب", showOne: "باب واحد في كل مرة",
    intro: "اثنتان وثلاثون بطاقة في سبعة أبواب: من نعرفه، وبم نؤمن، وكيف يظهر الإيمان في أفعالنا. كل بطاقة قصة قصيرة وآية وسؤال وتحدٍّ.",
    ages: "٦–٨ سنوات بمرافقة ولي الأمر · ٩–١١ سنة للقراءة والحوار",
    cards: "بطاقة", story: "القصة", quran: "من القرآن", didYouKnow: "هل تعلم؟",
    think: "سؤال للتفكير", challenge: "تحدي الفهم", reward: "مكافأتك", source: "مصدر موثوق",
    correct: "إجابة صحيحة", wrong: "جرّب مرة أخرى، وارجع إلى القصة.",
    badge: "وسام", back: "كل الأبواب", next: "البطاقة التالية", previous: "البطاقة السابقة",
    seerah: "السيرة النبوية", missing: "لم نجد هذه البطاقة.",
  },
  en: {
    retrySave: "Retry saving", journey: "Back to my journey",
    saveError: "Your progress could not be saved on this device. Check storage space and try again.",
    eyebrow: "Creed",
    title: "Knowing My Lord",
    journeyLabel: "The creed journey", journeyHint: "Pick a chapter to read its cards", showAll: "Show every chapter", showOne: "One chapter at a time",
    intro: "Thirty-two cards in seven chapters: who we know, what we believe, and how belief shows in what we do. Each card is a short story, an ayah, a question and a challenge.",
    ages: "Ages 6–8 with a parent · ages 9–11 to read and discuss",
    cards: "cards", story: "The story", quran: "From the Quran", didYouKnow: "Did you know?",
    think: "Something to think about", challenge: "A question for you", reward: "Your keepsake", source: "Trusted source",
    correct: "That is right", wrong: "Try again, and look back at the story.",
    badge: "Badge", back: "All chapters", next: "Next card", previous: "Previous card",
    seerah: "The Prophet’s Seerah", missing: "We could not find that card.",
  },
} as const;

const langAttrs = (locale: "ar" | "en") =>
  ({ lang: locale, dir: locale === "ar" ? "rtl" : "ltr" }) as const;

function Chrome({ children }: { children: React.ReactNode }) {
  const { direction } = useLocale();
  return (
    <main className="site-shell" dir={direction}>
      <SkipLink />
      <SiteChrome />
      <div id={MAIN_CONTENT_ID}>{children}</div>
      <SiteFooter />
    </main>
  );
}

function Challenge({
  card, tried, solved, onPick, number,
}: {
  card: AqeedahCard;
  /** Wrong answers already tried, so the same one is not offered twice. */
  tried: number[];
  solved: boolean;
  onPick: (index: number) => void;
  number: number;
}) {
  const { locale } = useLocale();
  const t = copy[locale];
  const text = aqeedahTextFor(card, locale);
  const { correctAnswer } = text.challenge;

  return (
    <section className="story-reading-section" aria-live="polite">
      <span className="story-section-number">{number}</span>
      <div>
        <span className="story-section-label"><HelpCircle size={13} aria-hidden="true" /> {t.challenge}</span>
        <h2>{t.challenge}</h2>
        <p>{text.challenge.question}</p>
        <ul className="seerah-options">
          {text.challenge.options.map((option, index) => {
            // A wrong answer marks only what was tried. Telling a child to try
            // again while showing the answer and locking every button is not a
            // second chance — the right one stays hidden until it is chosen.
            const state = solved && index === correctAnswer
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

function CardView({ card }: { card: AqeedahCard }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const text = aqeedahTextFor(card, locale);
  const chapter = aqeedahChapterOf(card);
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;
  const Forward = locale === "ar" ? ArrowLeft : ArrowRight;

  const { tried, won, answer, saveFailed, retrySave } = useLearningStep("aqeedah", card.slug, text.challenge.correctAnswer);

  const index = aqeedahCards.findIndex(c => c.slug === card.slug);
  const previous = index > 0 ? aqeedahCards[index - 1] : null;
  const next = index < aqeedahCards.length - 1 ? aqeedahCards[index + 1] : null;

  return (
    <article {...langAttrs(locale)}>
      <section className="stories-list-hero">
        <div className="container">
          <Link href="/aqeedah" className="text-link"><Back size={16} aria-hidden="true" /> {t.back}</Link>
          <span className="eyebrow eyebrow--gold">{locale === "en" ? chapter.titleEn : chapter.titleAr}</span>
          <h1>{text.title}</h1>
          <p>{text.value}</p>
          {card.image && (
            <figure className="aqeedah-hero-art">
              <StoryPicture src={card.image} alt={artAlt(text.title, locale)} sizes={COVER_SIZES} width={1600} height={900} eager />
            </figure>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container story-reading">
          <section className="story-reading-section">
            <span className="story-section-number">1</span>
            <div>
              <span className="story-section-label"><Sparkles size={13} aria-hidden="true" /> {t.story}</span>
              <h2>{t.story}</h2>
              <p>{text.story}</p>
              {card.more && (
                <Link href={card.more.href} className="text-link">
                  {(locale === "en" && card.more.labelEn) || card.more.label} <Forward size={16} aria-hidden="true" />
                </Link>
              )}
            </div>
          </section>

          <section className="story-reading-section">
            <span className="story-section-number">2</span>
            <div>
              <span className="story-section-label"><BookOpen size={13} aria-hidden="true" /> {t.quran}</span>
              <h2>{t.quran}</h2>
              <figure className="story-ayah">
                <blockquote lang="ar" dir="rtl">{card.ayah.text}</blockquote>
                <figcaption lang="ar" dir="rtl">{card.ayah.ref}</figcaption>
              </figure>
              <p>{text.didYouKnow}</p>
            </div>
          </section>

          <section className="story-reading-section">
            <span className="story-section-number">3</span>
            <div>
              <span className="story-section-label"><Heart size={13} aria-hidden="true" /> {t.think}</span>
              <h2>{card.icon} {text.valueName}</h2>
              <p>{text.thinkQuestion}</p>
            </div>
          </section>

          {saveFailed && <div role="alert"><p>{t.saveError}</p><button type="button" className="button button--soft" onClick={retrySave}>{t.retrySave}</button></div>}
          <Challenge card={card} tried={tried} solved={won} onPick={answer} number={4} />

          {won && (
            <section className="story-reading-section">
              <span className="story-section-number">5</span>
              <div>
                <span className="story-section-label">{t.reward}</span>
                <BadgeAward icon={card.icon} badge={text.badge} keepsake={text.artifact} label={t.badge} />
              </div>
            </section>
          )}

          <section className="story-reading-section">
            <span className="story-section-number">{won ? 6 : 5}</span>
            <div>
              <span className="story-section-label">{t.source} {card.reliability}</span>
              <h2>{text.source.reference}</h2>
              <p>{text.source.note}</p>
              <Link href="/journey" className="button button--soft">{t.journey}</Link>
            </div>
          </section>

          <nav className="story-pager" aria-label={t.cards}>
            {previous && (
              <Link href={`/aqeedah/${previous.slug}`} className="text-link">
                <Back size={16} aria-hidden="true" /> {t.previous}
              </Link>
            )}
            {next && (
              <Link href={`/aqeedah/${next.slug}`} className="text-link">
                {t.next} <Forward size={16} aria-hidden="true" />
              </Link>
            )}
          </nav>
        </div>
      </section>
    </article>
  );
}

export default function Aqeedah() {
  const [isCard, params] = useRoute("/aqeedah/:slug");
  const { locale } = useLocale();
  const t = copy[locale];
  const card = useMemo(
    () => (isCard ? aqeedahCards.find(c => c.slug === params?.slug) ?? null : null),
    [isCard, params?.slug],
  );

  if (isCard) {
    if (!card) {
      return (
        <Chrome>
          <section className="section"><div className="container">
            <p>{t.missing}</p>
            <Link href="/aqeedah" className="text-link">{t.back}</Link>
          </div></section>
        </Chrome>
      );
    }
    return <Chrome><CardView card={card} key={card.slug} /></Chrome>;
  }

  return (
    <Chrome>
      <section className="stories-list-hero" {...langAttrs(locale)}>
        <div className="container">
          <span className="eyebrow eyebrow--gold"><Moon size={15} aria-hidden="true" /> {t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
          <p className="aqeedah-ages">{t.ages}</p>
          <Link href="/seerah" className="stories-hero__library-link">
            <BookOpen size={16} aria-hidden="true" /> {t.seerah}
          </Link>
        </div>
      </section>

      <AqeedahJourney />
    </Chrome>
  );
}

/**
 * The seven chapters as a path, and one chapter's cards at a time.
 *
 * Thirty-two cards laid end to end is a reference shelf; a child reads it as
 * homework. The path says what the journey is — from the door, through knowing
 * Allah, the pillars, His messengers, worship, and how belief shows in what we
 * do, to the end — and then opens one door at a time.
 *
 * As with the Seerah, the prerendered page still lists every card, so this
 * costs nothing in search.
 */
function AqeedahJourney() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [openChapter, setOpenChapter] = useState<string | null>(aqeedahChapters[0]?.slug ?? null);
  const shown = openChapter === null
    ? aqeedahChapters
    : aqeedahChapters.filter(chapter => chapter.slug === openChapter);

  return (
    <>
      <section className="seerah-map-section" aria-labelledby="aqeedah-journey-title">
        <div className="container">
          <div className="stories-section__heading" {...langAttrs(locale)}>
            <span className="eyebrow eyebrow--gold">{t.journeyLabel}</span>
            <h2 id="aqeedah-journey-title">{t.journeyHint}</h2>
          </div>
          <ol className="seerah-map" {...langAttrs(locale)}>
            {aqeedahChapters.map(chapter => {
              const count = aqeedahCards.filter(card => card.chapter === chapter.slug).length;
              if (count === 0) return null;
              const active = openChapter === chapter.slug;
              return (
                <li key={chapter.slug}>
                  <button
                    type="button"
                    className={`seerah-map__stop${active ? " is-current" : ""}`}
                    aria-pressed={active}
                    onClick={() => setOpenChapter(chapter.slug)}
                  >
                    <span className="seerah-map__mark" aria-hidden="true">{CHAPTER_MARKS[chapter.slug] ?? "•"}</span>
                    <b>{locale === "en" ? chapter.titleEn : chapter.titleAr}</b>
                    <small>{cardCount(count, locale)}</small>
                  </button>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            className="button button--soft seerah-map__toggle"
            onClick={() => setOpenChapter(current => (current === null ? aqeedahChapters[0].slug : null))}
          >
            {openChapter === null ? t.showOne : t.showAll}
          </button>
        </div>
      </section>

      {shown.map(chapter => {
        const list = aqeedahCards.filter(c => c.chapter === chapter.slug);
        if (list.length === 0) return null;
        return (
          <section className="stories-section stories-section--list" key={chapter.slug} id={chapter.slug}>
            <div className="container">
              <div className="stories-section__heading" {...langAttrs(locale)}>
                <h2>{locale === "en" ? chapter.titleEn : chapter.titleAr}</h2>
                <p>{(locale === "en" && chapter.descriptionEn) || chapter.descriptionAr}</p>
              </div>
              <ul className="aqeedah-grid" {...langAttrs(locale)}>
                {list.map(item => {
                  const text = aqeedahTextFor(item, locale);
                  return (
                    <li key={item.slug}>
                      <Link href={`/aqeedah/${item.slug}`} className="aqeedah-card">
                        {item.image
                          /* The card's own title is inside this same link. */
                          ? <StoryPicture src={item.image} alt="" sizes={CARD_SIZES} width={1600} height={900} className="aqeedah-card__art" />
                          : <span className="aqeedah-card__icon" aria-hidden="true">{item.icon}</span>}
                        <div className="aqeedah-card__body">
                          <b>{text.title}</b>
                          <small>{text.value}</small>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}
    </>
  );
}
