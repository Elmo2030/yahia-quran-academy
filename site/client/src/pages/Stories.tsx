import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, BookmarkCheck, BookmarkPlus, Compass, Heart, Library, Printer, Sparkles } from "lucide-react";
import { chapters, stories, type Story } from "@/content/stories";
import { getSurahName } from "@/lib/quran-content";
import { useLibrary } from "@/lib/library";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLocale } from "@/contexts/LocaleContext";

const copy = {
  ar: {
    home: "العودة للرئيسية", eyebrow: "قصص", title: "قصص من القرآن",
    intro: "أبواب من القصص للأطفال، كل قصة تنتهي بسؤال يقود إلى التي بعدها.",
    chooseChapter: "اختر بابًا", soon: "قريبًا", storiesCount: "قصة",
    read: "اقرأ القصة", storyOf: "القصة", hook: "قبل أن نبدأ", events: "ما حدث",
    ayah: "من القرآن", lesson: "ماذا نتعلم؟", next: "وفي القصة القادمة",
    openInReader: "افتح السورة في القارئ", surahLabel: "سورة",
    prev: "السابقة", nextStory: "التالية", allStories: "كل الأبواب",
    notFound: "لم نجد هذه القصة.", backToChapter: "كل قصص الباب",
    save: "أضفها إلى مكتبتي", saved: "في مكتبتي", myLibrary: "مكتبتي",
    print: "اطبع القصة", emptyLibrary: "مكتبتك فارغة. افتح أي قصة واحفظها لتظهر هنا.",
    libraryCount: "قصة محفوظة", onlyArabic: null as string | null,
  },
  en: {
    home: "Back to home", eyebrow: "Stories", title: "Stories from the Quran",
    intro: "Chapters of stories for children, each ending with a question that leads into the next.",
    chooseChapter: "Choose a chapter", soon: "Coming soon", storiesCount: "stories",
    read: "Read the story", storyOf: "Story", hook: "Before we begin", events: "What happened",
    ayah: "From the Quran", lesson: "What we learn", next: "In the next story",
    openInReader: "Open the surah in the reader", surahLabel: "Surah",
    prev: "Previous", nextStory: "Next", allStories: "All chapters",
    notFound: "That story could not be found.", backToChapter: "All stories in this chapter",
    save: "Add to my library", saved: "In my library", myLibrary: "My library",
    print: "Print the story", emptyLibrary: "Your library is empty. Open any story and save it to see it here.",
    libraryCount: "saved", onlyArabic: "These stories are written in Arabic.",
  },
} as const;

function Chrome({ children }: { children: React.ReactNode }) {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const { slugs } = useLibrary();
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
            <Link href="/stories/library" className="header-reader-link">
              <Library size={16} aria-hidden="true" /> {t.myLibrary}{slugs.length > 0 ? ` (${slugs.length})` : ""}
            </Link>
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

function StoryCard({ story, index }: { story: Story; index: number }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Link href={`/stories/${story.chapter}/${story.slug}`} className="story-card">
      <img className="story-card__art" src={story.image} alt="" loading="lazy" width={1200} height={670} />
      <span className="story-card__index">{String(index + 1).padStart(2, "0")}</span>
      <b lang="ar" dir="rtl">{story.title}</b>
      <small lang="ar" dir="rtl">{story.hook}</small>
      <span className="story-card__cta">{t.read} <Arrow size={16} aria-hidden="true" /></span>
    </Link>
  );
}

export default function Stories() {
  const [isStory, storyParams] = useRoute("/stories/:chapter/:slug");
  const [isChapter, chapterParams] = useRoute("/stories/:chapter");
  const { locale } = useLocale();
  const t = copy[locale];
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const { has, toggle } = useLibrary();

  // ---- my library -------------------------------------------------------
  if (isChapter && chapterParams?.chapter === "library") {
    const { slugs } = useLibrary();
    const saved = stories.filter(s => slugs.includes(s.slug));
    return (
      <Chrome>
        <section className="section section--stories"><div className="container">
          <div className="section-heading">
            <span className="eyebrow eyebrow--gold"><Library size={15} aria-hidden="true" /> {t.myLibrary}</span>
            <h1>{t.myLibrary}</h1>
            <p>{saved.length > 0 ? `${saved.length} ${t.libraryCount}` : t.emptyLibrary}</p>
          </div>
          {saved.length > 0 && (
            <ol className="story-grid">
              {saved.map((story, index) => <li key={story.slug}><StoryCard story={story} index={index} /></li>)}
            </ol>
          )}
          <Link href="/stories" className="text-link">{t.allStories} <Arrow size={18} aria-hidden="true" /></Link>
        </div></section>
      </Chrome>
    );
  }

  // ---- one story --------------------------------------------------------
  if (isStory) {
    const chapterStories = stories.filter(s => s.chapter === storyParams?.chapter);
    const index = chapterStories.findIndex(s => s.slug === storyParams?.slug);
    if (index === -1) {
      return (
        <Chrome><section className="section"><div className="container">
          <h1>{t.notFound}</h1>
          <Link href="/stories" className="text-link">{t.allStories}</Link>
        </div></section></Chrome>
      );
    }
    const story = chapterStories[index];
    const previous = index > 0 ? chapterStories[index - 1] : null;
    const following = index < chapterStories.length - 1 ? chapterStories[index + 1] : null;
    const inLibrary = has(story.slug);

    return (
      <Chrome>
        <article className="section section--story" lang="ar" dir="rtl">
          <div className="container story-body">
            <span className="eyebrow eyebrow--gold">{t.storyOf} {index + 1} / {chapterStories.length}</span>
            <h1>{story.title}</h1>

            <div className="story-actions no-print">
              <button type="button" className={`button button--soft${inLibrary ? " is-active" : ""}`} onClick={() => toggle(story.slug)} aria-pressed={inLibrary}>
                {inLibrary ? <BookmarkCheck size={17} aria-hidden="true" /> : <BookmarkPlus size={17} aria-hidden="true" />}
                {inLibrary ? t.saved : t.save}
              </button>
              <button type="button" className="button button--soft" onClick={() => window.print()}>
                <Printer size={17} aria-hidden="true" /> {t.print}
              </button>
            </div>

            <img className="story-art" src={story.image} alt="" width={1200} height={670} />
            <p className="story-hook">{story.hook}</p>

            <h2><Compass size={17} aria-hidden="true" /> {t.events}</h2>
            <p>{story.events}</p>

            {story.ayah && (
              <figure className="story-ayah">
                <figcaption className="story-ayah__label"><BookOpen size={15} aria-hidden="true" /> {t.ayah}</figcaption>
                <blockquote lang="ar" dir="rtl" className="story-ayah__text">{story.ayah.text}</blockquote>
                <div className="story-ayah__meta">
                  <cite>{t.surahLabel} {getSurahName(story.ayah.surah)} · {story.ayah.number}</cite>
                  <Link href={`/read/${story.ayah.surah}`} className="text-link no-print">{t.openInReader}</Link>
                </div>
              </figure>
            )}
            {story.quranProse && (
              <figure className="story-ayah">
                <figcaption className="story-ayah__label"><BookOpen size={15} aria-hidden="true" /> {t.ayah}</figcaption>
                <p className="story-ayah__prose">{story.quranProse}</p>
              </figure>
            )}

            <h2><Heart size={17} aria-hidden="true" /> {t.lesson}</h2>
            <p>{story.lesson}</p>

            <aside className="story-teaser">
              <b>{t.next}</b>
              <p>{story.next}</p>
              {following && (
                <Link href={`/stories/${story.chapter}/${following.slug}`} className="button button--primary no-print">
                  {following.title} <ArrowLeft size={17} aria-hidden="true" />
                </Link>
              )}
            </aside>

            <nav className="story-pager no-print" aria-label={t.allStories}>
              {previous ? <Link href={`/stories/${story.chapter}/${previous.slug}`} className="text-link">{t.prev}: {previous.title}</Link> : <span />}
              <Link href={`/stories/${story.chapter}`} className="text-link">{t.backToChapter}</Link>
              {following ? <Link href={`/stories/${story.chapter}/${following.slug}`} className="text-link">{t.nextStory}: {following.title}</Link> : <span />}
            </nav>
          </div>
        </article>
      </Chrome>
    );
  }

  // ---- one chapter ------------------------------------------------------
  if (isChapter) {
    const chapter = chapters.find(c => c.slug === chapterParams?.chapter);
    const list = stories.filter(s => s.chapter === chapterParams?.chapter);
    if (!chapter || !chapter.available || list.length === 0) {
      return (
        <Chrome><section className="section"><div className="container">
          <h1>{t.notFound}</h1>
          <Link href="/stories" className="text-link">{t.allStories}</Link>
        </div></section></Chrome>
      );
    }
    return (
      <Chrome>
        <section className="section section--stories"><div className="container">
          <div className="section-heading">
            <span className="eyebrow eyebrow--gold"><Sparkles size={15} aria-hidden="true" /> {t.eyebrow}</span>
            <h1>{locale === "en" ? chapter.titleEn : chapter.titleAr}</h1>
            <p>{locale === "en" ? chapter.descriptionEn : chapter.descriptionAr}</p>
            {t.onlyArabic && <p className="story-language-note" lang="en">{t.onlyArabic}</p>}
          </div>
          {chapter.cover && <img className="stories-hero" src={chapter.cover} alt="" width={1600} height={893} />}
          <ol className="story-grid">
            {list.map((story, index) => <li key={story.slug}><StoryCard story={story} index={index} /></li>)}
          </ol>
          <Link href="/stories" className="text-link">{t.allStories} <Arrow size={18} aria-hidden="true" /></Link>
        </div></section>
      </Chrome>
    );
  }

  // ---- chapter index ----------------------------------------------------
  return (
    <Chrome>
      <section className="section section--stories"><div className="container">
        <div className="section-heading">
          <span className="eyebrow eyebrow--gold"><Sparkles size={15} aria-hidden="true" /> {t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </div>
        <ul className="chapter-grid" aria-label={t.chooseChapter}>
          {chapters.map(chapter => {
            const count = stories.filter(s => s.chapter === chapter.slug).length;
            const label = locale === "en" ? chapter.titleEn : chapter.titleAr;
            const body = (
              <>
                {chapter.cover
                  ? <img className="chapter-card__art" src={chapter.cover} alt="" loading="lazy" width={1600} height={893} />
                  : <span className="chapter-card__art chapter-card__art--empty" aria-hidden="true" />}
                <b>{label}</b>
                <small>{locale === "en" ? chapter.descriptionEn : chapter.descriptionAr}</small>
                <span className="chapter-card__meta">
                  {chapter.available ? `${count} ${t.storiesCount}` : t.soon}
                  {chapter.available && <Arrow size={16} aria-hidden="true" />}
                </span>
              </>
            );
            return (
              <li key={chapter.slug}>
                {chapter.available
                  ? <Link href={`/stories/${chapter.slug}`} className="chapter-card">{body}</Link>
                  : <div className="chapter-card is-soon" aria-disabled="true">{body}</div>}
              </li>
            );
          })}
        </ul>
      </div></section>
    </Chrome>
  );
}
