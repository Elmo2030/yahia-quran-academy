import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Compass, Heart, Sparkles } from "lucide-react";
import { stories } from "@/content/stories";
import { getSurahName } from "@/lib/quran-content";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLocale } from "@/contexts/LocaleContext";

const copy = {
  ar: {
    home: "العودة للرئيسية",
    eyebrow: "قصص",
    title: "نساء ذُكرن في القرآن",
    intro: "ثماني قصص للأطفال، كل واحدة تنتهي بسؤال يقود إلى التي بعدها.",
    storyOf: "القصة",
    read: "اقرأ القصة",
    hook: "قبل أن نبدأ",
    events: "ما حدث",
    ayah: "من القرآن",
    lesson: "ماذا نتعلم؟",
    next: "وفي القصة القادمة",
    openInReader: "افتح السورة في القارئ",
    surahLabel: "سورة",
    prev: "السابقة",
    nextStory: "التالية",
    allStories: "كل القصص",
    notFound: "لم نجد هذه القصة.",
    onlyArabic: null as string | null,
  },
  en: {
    home: "Back to home",
    eyebrow: "Stories",
    title: "Women named in the Quran",
    intro: "Eight stories for children, each ending with a question that leads into the next.",
    storyOf: "Story",
    read: "Read the story",
    hook: "Before we begin",
    events: "What happened",
    ayah: "From the Quran",
    lesson: "What we learn",
    next: "In the next story",
    openInReader: "Open the surah in the reader",
    surahLabel: "Surah",
    prev: "Previous",
    nextStory: "Next",
    allStories: "All stories",
    notFound: "That story could not be found.",
    onlyArabic: "These stories are written in Arabic.",
  },
} as const;

function Chrome({ children }: { children: React.ReactNode }) {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  return (
    <main className="site-shell" dir={direction}>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="brand-mark" aria-label={t.home}>
            <span className="brand-mark__seal">ي</span>
            <span><b>Yahia</b> Quran Academy</span>
          </Link>
          <div className="header-actions">
            <LanguageToggle compact />
            <Link href="/stories" className="header-reader-link">{t.allStories}</Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="brand-mark"><span className="brand-mark__seal">ي</span><span><b>Yahia</b> Quran Academy</span></div>
          <Link href="/" className="text-link">{t.home}</Link>
        </div>
      </footer>
    </main>
  );
}

/** The verse itself: always Arabic, always right-to-left, whatever the interface language. */
function AyahBlock({ text, surah, number, surahName, label, openLabel, surahLabel }: {
  text: string; surah: number; number: number; surahName: string;
  label: string; openLabel: string; surahLabel: string;
}) {
  return (
    <figure className="story-ayah">
      <figcaption className="story-ayah__label"><BookOpen size={15} aria-hidden="true" /> {label}</figcaption>
      <blockquote lang="ar" dir="rtl" className="story-ayah__text">{text}</blockquote>
      <div className="story-ayah__meta">
        <cite>{surahLabel} {surahName} · {number}</cite>
        <Link href={`/read/${surah}`} className="text-link">{openLabel}</Link>
      </div>
    </figure>
  );
}

export default function Stories() {
  const [isDetail, params] = useRoute("/stories/:slug");
  const { locale } = useLocale();
  const t = copy[locale];
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  if (!isDetail) {
    return (
      <Chrome>
        <section className="section section--stories">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow eyebrow--gold"><Sparkles size={15} aria-hidden="true" /> {t.eyebrow}</span>
              <h1>{t.title}</h1>
              <p>{t.intro}</p>
              {t.onlyArabic && <p className="story-language-note" lang="en">{t.onlyArabic}</p>}
            </div>
            <img className="stories-hero" src="/stories/hero.jpg" alt="" width={1600} height={893} />
            <ol className="story-grid">
              {stories.map((story, index) => (
                <li key={story.slug}>
                  <Link href={`/stories/${story.slug}`} className="story-card">
                    <img className="story-card__art" src={story.image} alt="" loading="lazy" width={1200} height={670} />
                    <span className="story-card__index">{String(index + 1).padStart(2, "0")}</span>
                    <b lang="ar" dir="rtl">{story.title}</b>
                    <small lang="ar" dir="rtl">{story.hook}</small>
                    <span className="story-card__cta">{t.read} <Arrow size={16} aria-hidden="true" /></span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Chrome>
    );
  }

  const index = stories.findIndex((s) => s.slug === params?.slug);
  if (index === -1) {
    return (
      <Chrome>
        <section className="section"><div className="container">
          <h1>{t.notFound}</h1>
          <Link href="/stories" className="text-link">{t.allStories} <Arrow size={18} aria-hidden="true" /></Link>
        </div></section>
      </Chrome>
    );
  }

  const story = stories[index];
  const previous = index > 0 ? stories[index - 1] : null;
  const following = index < stories.length - 1 ? stories[index + 1] : null;

  return (
    <Chrome>
      <article className="section section--story" lang="ar" dir="rtl">
        <div className="container story-body">
          <span className="eyebrow eyebrow--gold">{t.storyOf} {index + 1} / {stories.length}</span>
          <h1>{story.title}</h1>

          <img className="story-art" src={story.image} alt="" width={1200} height={670} />

          <p className="story-hook">{story.hook}</p>

          <h2><Compass size={17} aria-hidden="true" /> {t.events}</h2>
          <p>{story.events}</p>

          <AyahBlock
            text={story.ayah.text}
            surah={story.ayah.surah}
            number={story.ayah.number}
            surahName={getSurahName(story.ayah.surah)}
            label={t.ayah}
            openLabel={t.openInReader}
            surahLabel={t.surahLabel}
          />

          <h2><Heart size={17} aria-hidden="true" /> {t.lesson}</h2>
          <p>{story.lesson}</p>

          <aside className="story-teaser">
            <b>{t.next}</b>
            <p>{story.next}</p>
            {following && (
              <Link href={`/stories/${following.slug}`} className="button button--primary">
                {following.title} <ArrowLeft size={17} aria-hidden="true" />
              </Link>
            )}
          </aside>

          <nav className="story-pager" aria-label={t.allStories}>
            {previous
              ? <Link href={`/stories/${previous.slug}`} className="text-link">{t.prev}: {previous.title}</Link>
              : <span />}
            <Link href="/stories" className="text-link">{t.allStories}</Link>
            {following
              ? <Link href={`/stories/${following.slug}`} className="text-link">{t.nextStory}: {following.title}</Link>
              : <span />}
          </nav>
        </div>
      </article>
    </Chrome>
  );
}
