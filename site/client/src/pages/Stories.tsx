import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, BookmarkCheck, BookmarkPlus, Compass, Heart, Library, PawPrint, Printer, Sparkles, Trash2, Users } from "lucide-react";
import { chapters, stories, storyTextFor, type Story } from "@/content/stories";
import { getSurahName } from "@/lib/quran-content";
import { useLibrary } from "@/lib/library";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { SiteChrome } from "@/components/SiteChrome";
import { useLocale } from "@/contexts/LocaleContext";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { StoryPicture } from "@/components/StoryPicture";
import { StoryChallengeSection } from "@/components/StoryChallengeSection";
import { CARD_SIZES, COVER_SIZES } from "@/lib/story-images";

const copy = {
  ar: {
    home: "العودة للرئيسية", eyebrow: "قصص", title: "قصص من القرآن",
    intro: "أبواب من القصص للأطفال، كل قصة تنتهي بسؤال يقود إلى التي بعدها.",
    chooseChapter: "اختر بابًا", soon: "قريبًا", storiesCount: "قصة",
    read: "اقرأ القصة", storyOf: "القصة", hook: "قبل أن نبدأ", events: "ما حدث",
    ayah: "من القرآن", lesson: "ماذا نتعلم؟", next: "وفي القصة القادمة", challenge: "تحدي الفهم",
    source: "من أين هذه القصة؟", needsReview: "بانتظار مراجعة أهل العلم",
    openInReader: "افتح السورة في القارئ", surahLabel: "سورة",
    prev: "السابقة", nextStory: "التالية", allStories: "كل الأبواب",
    notFound: "لم نجد هذه القصة.", backToChapter: "كل قصص الباب",
    save: "أضفها إلى مكتبتي", saved: "في مكتبتي", myLibrary: "مكتبتي",
    print: "اطبع القصة", emptyLibrary: "مكتبتك فارغة. افتح أي قصة واحفظها لتظهر هنا.",
    libraryCount: "قصة محفوظة", back: "العودة إلى القصص", sections: "أقسام القصة", storyCount: "قصة", exploreAll: "اكتشف كل القصص", keptStories: "القصص التي اخترت الاحتفاظ بها", emptyTitle: "لا توجد قصص محفوظة بعد", remove: "إزالة من مكتبتي", onlyArabic: null as string | null,
  },
  en: {
    home: "Back to home", eyebrow: "Stories", title: "Stories from the Quran",
    intro: "Chapters of stories for children, each ending with a question that leads into the next.",
    chooseChapter: "Choose a chapter", soon: "Coming soon", storiesCount: "stories",
    read: "Read the story", storyOf: "Story", hook: "Before we begin", events: "What happened",
    ayah: "From the Quran", lesson: "What we learn", next: "In the next story", challenge: "Comprehension challenge",
    source: "Where this story comes from", needsReview: "Awaiting a scholar\u2019s review",
    openInReader: "Open the surah in the reader", surahLabel: "Surah",
    prev: "Previous", nextStory: "Next", allStories: "All chapters",
    notFound: "That story could not be found.", backToChapter: "All stories in this chapter",
    save: "Add to my library", saved: "In my library", myLibrary: "My library",
    print: "Print the story", emptyLibrary: "Your library is empty. Open any story and save it to see it here.",
    libraryCount: "saved", back: "Back to stories", sections: "In this story", storyCount: "stories", exploreAll: "Explore all stories", keptStories: "The stories you chose to keep", emptyTitle: "Nothing saved yet", remove: "Remove from my library", onlyArabic: "These stories are written in Arabic.",
  },
} as const;

function Chrome({ children }: { children: React.ReactNode }) {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const { slugs } = useLibrary();
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


/** The prophets chapter ships one cover rather than 17 pictures, so stories
 *  without art get the drawn placeholder the original design already defines. */
const langAttrs = (locale: "ar" | "en") =>
  locale === "en" ? { lang: "en", dir: "ltr" as const } : { lang: "ar", dir: "rtl" as const };

function StoryArt({ story, className }: { story: Story; className?: string }) {
  if (story.image) {
    return (
      <figure className={`story-image ${className ?? ""}`}>
        <StoryPicture src={story.image} sizes={CARD_SIZES} width={1200} height={670} />
      </figure>
    );
  }
  const { locale } = useLocale();
  return (
    <figure className={`story-image story-image-placeholder story-image-placeholder--leaf ${className ?? ""}`} aria-hidden="true">
      <span className="story-image-placeholder__sun" />
      <span className="story-image-placeholder__hill" />
      <span className="story-image-placeholder__hill story-image-placeholder__hill--two" />
      <small>{storyTextFor(story, locale).title}</small>
    </figure>
  );
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const text = storyTextFor(story, locale);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Link href={`/stories/${story.chapter}/${story.slug}`} className="story-list-card">
      <StoryArt story={story} />
      <div className="story-list-card__body" {...langAttrs(locale)}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{text.title}</h3>
        <p>{text.hook}</p>
        <span className="story-read-pill">{t.read} <Arrow size={15} aria-hidden="true" /></span>
      </div>
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
        <section className="story-library-hero" {...langAttrs(locale)}>
          <div className="container">
            <Link href="/stories" className="story-back-link"><ArrowRight size={15} aria-hidden="true" /> {t.allStories}</Link>
            <span className="eyebrow eyebrow--gold"><Library size={15} aria-hidden="true" /> {t.myLibrary}</span>
            <h1 style={{ margin: ".7rem 0 .6rem", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 850 }}>{t.myLibrary}</h1>
            <p>{t.keptStories}</p>
          </div>
        </section>
        <section className="stories-section">
          <div className="container">
            {saved.length === 0 ? (
              <div className="story-library__empty" {...langAttrs(locale)}>
                <h3>{t.emptyTitle}</h3>
                <p>{t.emptyLibrary}</p>
                <Link href="/stories" className="button button--primary">{t.exploreAll} <Arrow size={16} aria-hidden="true" /></Link>
              </div>
            ) : (
              <>
                <div className="stories-section__heading" {...langAttrs(locale)}><h2>{saved.length} {t.libraryCount}</h2></div>
                <ol className="story-list-grid">
                  {saved.map((story, index) => (
                    <li key={story.slug}>
                      <StoryCard story={story} index={index} />
                      <div className="story-library-card__actions" style={{ marginTop: ".6rem" }}>
                        <button type="button" className="story-icon-button" onClick={() => toggle(story.slug)} aria-label={t.remove}>
                          <Trash2 size={17} aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </section>
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
    const text = storyTextFor(story, locale);
    const previous = index > 0 ? chapterStories[index - 1] : null;
    const following = index < chapterStories.length - 1 ? chapterStories[index + 1] : null;
    const inLibrary = has(story.slug);

    return (
      <Chrome>
        <section className="story-detail-hero" {...langAttrs(locale)}>
          <div className="container">
            <Link href={`/stories/${story.chapter}`} className="story-back-link"><ArrowRight size={15} aria-hidden="true" /> {t.back}</Link>
            <div className="story-detail-hero__grid">
              <div>
                <span className="story-detail-hero__count">{t.storyOf} {index + 1} / {chapterStories.length}</span>
                <h1>{text.title}</h1>
                <p className="story-detail-hero__hook">{text.hook}</p>
                <div className="story-detail-actions no-print">
                  <button type="button" className={`button button--soft${inLibrary ? " is-active" : ""}`} onClick={() => toggle(story.slug)} aria-pressed={inLibrary}>
                    {inLibrary ? <BookmarkCheck size={17} aria-hidden="true" /> : <BookmarkPlus size={17} aria-hidden="true" />}
                    {inLibrary ? t.saved : t.save}
                  </button>
                  <button type="button" className="button button--soft" onClick={() => window.print()}>
                    <Printer size={17} aria-hidden="true" /> {t.print}
                  </button>
                </div>
              </div>
              <StoryArt story={story} />
            </div>
          </div>
        </section>

        <article className="story-article story-article--printable" {...langAttrs(locale)}>
          <div className="container story-article__layout">
            <nav className="story-article__rail no-print" aria-label={t.sections}>
              <span className="story-section-label">{t.sections}</span>
              <a href="#story-events">{t.events}</a>
              {(story.ayah || text.quranProse) && <a href="#story-ayah">{t.ayah}</a>}
              <a href="#story-lesson">{t.lesson}</a>
              <a href="#story-challenge">{t.challenge}</a>
            </nav>

            <div className="story-article__content">
              <section className="story-reading-section story-reading-section--hook">
                <span className="story-section-number">1</span>
                <div>
                  <span className="story-section-label">{t.hook}</span>
                  <p className="story-reading-section__lead">{text.hook}</p>
                </div>
              </section>

              <section className="story-reading-section" id="story-events">
                <span className="story-section-number">2</span>
                <div>
                  <span className="story-section-label"><Compass size={13} aria-hidden="true" /> {t.events}</span>
                  <h2>{t.events}</h2>
                  <p>{text.events}</p>
                </div>
              </section>

              {(story.ayah || text.quranProse) && (
                <section className="story-quran-connection" id="story-ayah">
                  <span className="story-section-number">3</span>
                  <div>
                    <span className="story-quran-connection__heading story-section-label"><BookOpen size={14} aria-hidden="true" /> {t.ayah}</span>
                    {story.ayah && <>
                      <blockquote lang="ar" dir="rtl">{story.ayah.text}</blockquote>
                      <p className="story-quran-connection__note">
                        {t.surahLabel} {getSurahName(story.ayah.surah)} · {story.ayah.number}
                        {" — "}
                        <Link href={`/read/${story.ayah.surah}`} className="no-print">{t.openInReader}</Link>
                      </p>
                    </>}
                    {text.quranProse && <p>{text.quranProse}</p>}
                  </div>
                </section>
              )}

              <section className="story-lesson-card" id="story-lesson">
                <span className="story-section-number">{story.ayah || text.quranProse ? 4 : 3}</span>
                <div>
                  <span className="story-section-label"><Heart size={13} aria-hidden="true" /> {t.lesson}</span>
                  <h2>{t.lesson}</h2>
                  <p>{text.lesson}</p>
                </div>
              </section>

              <StoryChallengeSection story={story} number={story.ayah || text.quranProse ? 5 : 4} />

              {/* Which of this is the Quran's own words, and which is a name or
                  a detail that came from elsewhere. The child reads past it;
                  the parent is who it is for. */}
              <section className="story-source-card">
                <span className="story-section-label">
                  {story.source.reliability} {story.source.reliability === "🟡" ? t.needsReview : t.source}
                </span>
                <b>{story.source.reference[locale]}</b>
                <p>{story.source.note[locale]}</p>
              </section>

              <aside className="story-bridge">
                <span className="eyebrow eyebrow--gold">{t.next}</span>
                <p>{text.next}</p>
                {following && (
                  <Link href={`/stories/${story.chapter}/${following.slug}`} className="button button--primary no-print">
                    {storyTextFor(following, locale).title} <Arrow size={17} aria-hidden="true" />
                  </Link>
                )}
              </aside>

              <nav className="story-pager no-print" aria-label={t.allStories}>
                {previous ? <Link href={`/stories/${story.chapter}/${previous.slug}`} className="text-link">{t.prev}: {storyTextFor(previous, locale).title}</Link> : <span />}
                <Link href={`/stories/${story.chapter}`} className="text-link">{t.backToChapter}</Link>
                {following ? <Link href={`/stories/${story.chapter}/${following.slug}`} className="text-link">{t.nextStory}: {storyTextFor(following, locale).title}</Link> : <span />}
              </nav>
            </div>
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
        <section className="stories-list-hero" {...langAttrs(locale)}>
          <div className="container stories-list-hero__grid">
            <div>
              <Link href="/stories" className="story-back-link"><ArrowRight size={15} aria-hidden="true" /> {t.allStories}</Link>
              <span className="eyebrow eyebrow--gold">{t.eyebrow}</span>
              <h1>{locale === "en" ? chapter.titleEn : chapter.titleAr}</h1>
              <p>{locale === "en" ? chapter.descriptionEn : chapter.descriptionAr}</p>
              <Link href="/stories/library" className="stories-hero__library-link"><Library size={16} aria-hidden="true" /> {t.myLibrary}</Link>
            </div>
            {chapter.cover && (
              <figure className="animals-collection-cover">
                <StoryPicture src={chapter.cover} sizes={COVER_SIZES} width={1600} height={893} eager />
              </figure>
            )}
          </div>
        </section>
        <section className="stories-section stories-section--list">
          <div className="container">
            <div className="stories-section__heading" {...langAttrs(locale)}>
              <h2>{list.length} {t.storyCount}</h2>
              {t.onlyArabic && <p lang="en">{t.onlyArabic}</p>}
            </div>
            <ol className="story-list-grid">
              {list.map((story, index) => <li key={story.slug}><StoryCard story={story} index={index} /></li>)}
            </ol>
          </div>
        </section>
      </Chrome>
    );
  }

  // ---- chapter index ----
  return (
    <Chrome>
      <section className="stories-list-hero" {...langAttrs(locale)}>
        <div className="container stories-list-hero__grid">
          <div>
            <span className="eyebrow eyebrow--gold"><Sparkles size={15} aria-hidden="true" /> {t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
            <Link href="/stories/library" className="stories-hero__library-link"><Library size={16} aria-hidden="true" /> {t.myLibrary}</Link>
          </div>
          <figure className="animals-collection-cover">
            <StoryPicture src="/stories/animals/cover.jpg" sizes={COVER_SIZES} width={1600} height={893} />
          </figure>
        </div>
      </section>
      <section className="stories-section">
        <div className="container">
          <div className="stories-section__heading" {...langAttrs(locale)}><h2>{t.chooseChapter}</h2></div>
          <ul className="story-category-grid">
            {chapters.map(chapter => {
              const count = stories.filter(s => s.chapter === chapter.slug).length;
              const Icon = chapter.slug === "animals" ? PawPrint : chapter.slug === "women" ? Users : BookOpen;
              const body = (
                <>
                  <span className="story-category-card__icon"><Icon size={24} aria-hidden="true" /></span>
                  <h3>{locale === "en" ? chapter.titleEn : chapter.titleAr}</h3>
                  <p>{locale === "en" ? chapter.descriptionEn : chapter.descriptionAr}</p>
                  {chapter.available
                    ? <span className="story-category-card__link">{count} {t.storyCount} <Arrow size={15} aria-hidden="true" /></span>
                    : <span className="story-category-card__status">{t.soon}</span>}
                </>
              );
              return (
                <li key={chapter.slug}>
                  {chapter.available
                    ? <Link href={`/stories/${chapter.slug}`} className="story-category-card story-category-card--available">{body}</Link>
                    : <div className="story-category-card story-category-card--soon" aria-disabled="true">{body}</div>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </Chrome>
  );
}
