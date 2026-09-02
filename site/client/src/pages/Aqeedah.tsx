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
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, HelpCircle, Heart, Moon, Sparkles } from "lucide-react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import {
  aqeedahCards, aqeedahChapters, aqeedahChapterOf, aqeedahTextFor,
  type AqeedahCard,
} from "@/content/aqeedah";

const copy = {
  ar: {
    eyebrow: "العقيدة",
    title: "أتعرّف على ربّي",
    intro: "اثنتان وثلاثون بطاقة في سبعة أبواب: من نعرفه، وبم نؤمن، وكيف يظهر الإيمان في أفعالنا. كل بطاقة قصة قصيرة وآية وسؤال وتحدٍّ.",
    ages: "٦–٨ سنوات بمرافقة ولي الأمر · ٩–١١ سنة للقراءة والحوار",
    cards: "بطاقة", story: "القصة", quran: "من القرآن", didYouKnow: "هل تعلم؟",
    think: "سؤال للتفكير", challenge: "تحدي الفهم", reward: "مكافأتك", source: "مصدر موثوق",
    correct: "إجابة صحيحة", wrong: "جرّب مرة أخرى، وارجع إلى القصة.",
    badge: "وسام", back: "كل الأبواب", next: "البطاقة التالية", previous: "البطاقة السابقة",
    seerah: "السيرة النبوية", missing: "لم نجد هذه البطاقة.",
  },
  en: {
    eyebrow: "Creed",
    title: "Knowing My Lord",
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

function Challenge({ card }: { card: AqeedahCard }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const text = aqeedahTextFor(card, locale);
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const right = picked === text.challenge.correctAnswer;

  return (
    <section className="story-reading-section" aria-live="polite">
      <span className="story-section-number">4</span>
      <div>
        <span className="story-section-label"><HelpCircle size={13} aria-hidden="true" /> {t.challenge}</span>
        <h2>{t.challenge}</h2>
        <p>{text.challenge.question}</p>
        <ul className="seerah-options">
          {text.challenge.options.map((option, index) => {
            const state = !answered ? "" : index === text.challenge.correctAnswer ? " is-correct" : index === picked ? " is-wrong" : "";
            return (
              <li key={option}>
                <button type="button" className={`button button--soft seerah-option${state}`} disabled={answered} onClick={() => setPicked(index)}>
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
        {answered && <p>{right ? `${t.correct} — ${t.badge}: ${text.badge}` : t.wrong}</p>}
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
                  {card.more.label} <Forward size={16} aria-hidden="true" />
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

          <Challenge card={card} />

          <section className="story-reading-section">
            <span className="story-section-number">5</span>
            <div>
              <span className="story-section-label">{t.reward}</span>
              <h2>{text.artifact}</h2>
              <p>{t.badge}: {text.badge}</p>
            </div>
          </section>

          <section className="story-reading-section">
            <span className="story-section-number">6</span>
            <div>
              <span className="story-section-label">{t.source} {card.reliability}</span>
              <h2>{text.source.reference}</h2>
              <p>{text.source.note}</p>
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
    return <Chrome><CardView card={card} /></Chrome>;
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

      {aqeedahChapters.map(chapter => {
        const list = aqeedahCards.filter(c => c.chapter === chapter.slug);
        if (list.length === 0) return null;
        return (
          <section className="stories-section stories-section--list" key={chapter.slug} id={chapter.slug}>
            <div className="container">
              <div className="stories-section__heading" {...langAttrs(locale)}>
                <h2>{locale === "en" ? chapter.titleEn : chapter.titleAr}</h2>
                <p>{chapter.descriptionAr}</p>
              </div>
              <ul className="aqeedah-grid" {...langAttrs(locale)}>
                {list.map(item => {
                  const text = aqeedahTextFor(item, locale);
                  return (
                    <li key={item.slug}>
                      <Link href={`/aqeedah/${item.slug}`} className="aqeedah-card">
                        <span className="aqeedah-card__icon" aria-hidden="true">{item.icon}</span>
                        <b>{text.title}</b>
                        <small>{text.value}</small>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}
    </Chrome>
  );
}
