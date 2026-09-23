import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, BookmarkCheck, BookmarkPlus, CheckCircle2, Clock3, Compass, HandHeart, Library, Lightbulb, PawPrint, Printer, Sparkles, Sun, Trash2, Users } from "lucide-react";
import { chapters, stories, type Story } from "@/content/stories";
import { useStoryText } from "@/content/stories-english";
import { getSurahName } from "@/lib/quran-content";
import { useLibrary } from "@/lib/library";
import { useHifzStore } from "@/hooks/useHifzStore";
import { activeProfile, registerDeed, startStory, stepStatus, type ChildProfile, type HifzStore, type StepStoryInfo } from "@/lib/hifz-store";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { SiteChrome } from "@/components/SiteChrome";
import { useLocale } from "@/contexts/LocaleContext";
import { StoryNarration } from "@/components/StoryNarration";
import { narratedStories } from "@/lib/narration.generated";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { StoryPicture } from "@/components/StoryPicture";
import { StoryChallengeSection } from "@/components/StoryChallengeSection";
import { artAlt, CARD_SIZES, COVER_SIZES } from "@/lib/story-images";

const copy = {
  ar: {
    home: "العودة للرئيسية", eyebrow: "قصص", title: "قصص القرآن 🌿",
    intro: "في القرآن قصص حقيقية مليئة بالإيمان والشجاعة والصبر والحكمة.",
    chooseChapter: "اختر بابًا", soon: "قريبًا", storiesCount: "قصة",
    read: "اقرأ القصة", storyOf: "القصة", hook: "قبل أن نبدأ", events: "ما حدث",
    ayah: "من القرآن", lesson: "ماذا نتعلم؟", next: "وفي القصة القادمة", challenge: "تحدي الفهم",
    source: "من أين هذه القصة؟", needsReview: "بانتظار مراجعة أهل العلم",
    openInReader: "افتح السورة في رحلة الحفظ", surahLabel: "سورة",
    prev: "السابقة", nextStory: "التالية", allStories: "كل الأبواب",
    notFound: "لم نجد هذه القصة.", backToChapter: "كل قصص الباب",
    save: "أضفها إلى مكتبتي", saved: "في مكتبتي", myLibrary: "مكتبتي",
    setting: "أين نحن؟", keyMoment: "اللحظة المهمة", resolution: "وكيف انتهت؟",
    word: "كلمة اليوم", think: "فكّر قليلًا", tryToday: "جرّب اليوم",
    minutes: "دقائق قراءة", oneMinute: "دقيقة قراءة",
    print: "اطبع القصة", emptyLibrary: "مكتبتك فارغة. افتح أي قصة واحفظها لتظهر هنا.",
    libraryCount: "قصة محفوظة", back: "العودة إلى القصص", sections: "أقسام القصة", storyCount: "قصة", exploreAll: "اكتشف كل القصص", keptStories: "القصص التي اخترت الاحتفاظ بها", emptyTitle: "لا توجد قصص محفوظة بعد", remove: "إزالة من مكتبتي", onlyArabic: null as string | null,
    deedDone: "عملتها", deedAwaiting: "بانتظار تأكيد وليّ الأمر 🕊️", deedConfirmed: "أكّدها وليّ أمرك ✅",
    deedNoChild: "سجّل هذا في رحلة حفظك — ابدأها أولًا.", deedStart: "ابدأ رحلة الحفظ",
    deedGuestNote: "الأفعال تُحفظ مع ملف طفل باسمه — أضف طفلًا لتسجيلها.", deedAddChild: "أضف طفلًا",
    storyDone: "قرأتها",
  },
  en: {
    home: "Back to home", eyebrow: "Stories", title: "Stories from the Quran",
    intro: "Chapters of stories for children, each ending with a question that leads into the next.",
    chooseChapter: "Choose a chapter", soon: "Coming soon", storiesCount: "stories",
    read: "Read the story", storyOf: "Story", hook: "Before we begin", events: "What happened",
    ayah: "From the Quran", lesson: "What we learn", next: "In the next story", challenge: "Comprehension challenge",
    source: "Where this story comes from", needsReview: "Awaiting a scholar\u2019s review",
    openInReader: "Open the surah in the memorization journey", surahLabel: "Surah",
    prev: "Previous", nextStory: "Next", allStories: "All chapters",
    notFound: "That story could not be found.", backToChapter: "All stories in this chapter",
    save: "Add to my library", saved: "In my library", myLibrary: "My library",
    setting: "Where we are", keyMoment: "The moment it turns on", resolution: "How it ended",
    word: "Word of the day", think: "Think for a moment", tryToday: "Try it today",
    minutes: "min read", oneMinute: "min read",
    print: "Print the story", emptyLibrary: "Your library is empty. Open any story and save it to see it here.",
    libraryCount: "saved", back: "Back to stories", sections: "In this story", storyCount: "stories", exploreAll: "Explore all stories", keptStories: "The stories you chose to keep", emptyTitle: "Nothing saved yet", remove: "Remove from my library", onlyArabic: "These stories are written in Arabic.",
    deedDone: "I did it", deedAwaiting: "Waiting for a parent to confirm 🕊️", deedConfirmed: "Confirmed by your parent ✅",
    deedNoChild: "Record this in your memorization journey — start it first.", deedStart: "Start the memorization journey",
    deedGuestNote: "Deeds are saved under a named child's profile — add a child to register one.", deedAddChild: "Add a child",
    storyDone: "Read",
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

function StoryArt({ story, className, alt }: { story: Story; className?: string; alt: string }) {
  if (story.image) {
    return (
      <figure className={`story-image ${className ?? ""}`}>
        <StoryPicture src={story.image} alt={alt} sizes={CARD_SIZES} width={1200} height={670} />
      </figure>
    );
  }
  const { locale } = useLocale();
  const { textOf } = useStoryText();
  return (
    <figure className={`story-image story-image-placeholder story-image-placeholder--leaf ${className ?? ""}`} aria-hidden="true">
      <span className="story-image-placeholder__sun" />
      <span className="story-image-placeholder__hill" />
      <span className="story-image-placeholder__hill story-image-placeholder__hill--two" />
      <small>{textOf(story).title}</small>
    </figure>
  );
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const { textOf, arcOf, minutesOf } = useStoryText();
  const { store } = useHifzStore();
  const child = activeProfile(store);
  const done = child !== null && stepStatus(child, { kind: "story", chapter: story.chapter, slug: story.slug }) === "done";
  const text = textOf(story);
  const arc = arcOf(story);
  const minutes = minutesOf(story);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Link href={`/stories/${story.chapter}/${story.slug}`} className="story-list-card">
      {/* The card's own title is two lines below, inside this link. */}
      <StoryArt story={story} alt="" />
      {done && <span className="story-list-card__done"><CheckCircle2 size={13} aria-hidden="true" /> {t.storyDone}</span>}
      <div className="story-list-card__body" {...langAttrs(locale)}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{text.title}</h3>
        {/* The card is a decision, not a preview: one sentence of what this
            story is, and how long it will take. The hook belongs inside. */}
        <p>{arc?.idea ?? text.hook}</p>
        <span className="story-list-card__meta">
          <Clock3 size={13} aria-hidden="true" /> {minutes} {minutes === 1 ? t.oneMinute : t.minutes}
        </span>
        <span className="story-read-pill">{t.read} <Arrow size={15} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}

/**
 * The one button "try today" leads to: a child saying they did it, then
 * waiting on a parent's word. With no active child on this device there is
 * nothing to register it against, so the section invites starting the
 * journey instead of a button that would silently do nothing.
 *
 * The guest profile gets the same invitation rather than the button, even
 * though it is technically active: it is one shared, nameless slot (see
 * enterAsGuest in hifz-store.ts), so a deed registered under it cannot say
 * which child actually did it, and a parent confirming "the guest said they
 * did it" is confirming nothing in particular. A closed state should explain
 * itself rather than quietly accept something that goes nowhere useful.
 */
function DeedControl({ t, chapter, slug, child, store, commit, story }: {
  t: (typeof copy)[keyof typeof copy]; chapter: string; slug: string; child: ChildProfile | null; store: HifzStore; commit: (s: HifzStore) => boolean;
  story: StepStoryInfo;
}) {
  if (!child) {
    return (
      <p className="story-deed story-deed--no-child">
        {t.deedNoChild} <Link href="/hifz" className="text-link"><Compass size={15} aria-hidden="true" /> {t.deedStart}</Link>
      </p>
    );
  }
  if (child.character === "guest") {
    return (
      <p className="story-deed story-deed--no-child">
        {t.deedGuestNote} <Link href="/hifz" className="text-link"><Compass size={15} aria-hidden="true" /> {t.deedAddChild}</Link>
      </p>
    );
  }
  const status = stepStatus(child, { kind: "deed", chapter, slug });
  if (status === "reviewed") {
    return <p className="story-deed story-deed--confirmed"><CheckCircle2 size={16} aria-hidden="true" /> {t.deedConfirmed}</p>;
  }
  if (status === "awaiting_parent") {
    return <p className="story-deed story-deed--awaiting">{t.deedAwaiting}</p>;
  }
  return (
    <button type="button" className="button button--soft story-deed-button" onClick={() => commit(registerDeed(store, child.id, chapter, slug, story))}>
      <HandHeart size={17} aria-hidden="true" /> {t.deedDone}
    </button>
  );
}

export default function Stories() {
  const [isStory, storyParams] = useRoute("/stories/:chapter/:slug");
  const [isChapter, chapterParams] = useRoute("/stories/:chapter");
  const { locale } = useLocale();
  const t = copy[locale];
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const { has, toggle } = useLibrary();
  const { textOf, arcOf, minutesOf, rewardOf } = useStoryText();
  const { store: hifzStore, commit: commitHifz } = useHifzStore();
  const child = activeProfile(hifzStore);
  const openedStory = isStory && storyParams
    ? stories.find(story => story.chapter === storyParams.chapter && story.slug === storyParams.slug) ?? null
    : null;

  useEffect(() => {
    if (!openedStory || !child || child.character === "guest") return;
    if (stepStatus(child, { kind: "story", chapter: openedStory.chapter, slug: openedStory.slug }) !== "available") return;
    commitHifz(startStory(hifzStore, child.id, openedStory.chapter, openedStory.slug));
  }, [child, commitHifz, hifzStore, openedStory]);

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
    const text = textOf(story);
    const previous = index > 0 ? chapterStories[index - 1] : null;
    const following = index < chapterStories.length - 1 ? chapterStories[index + 1] : null;
    const inLibrary = has(story.slug);
    const arc = arcOf(story);
    const minutes = minutesOf(story);
    // The sections are numbered for the child, and which of them exist varies
    // by story, so the number is counted out rather than written down.
    let step = 0;
    const n = () => ++step;

    return (
      <Chrome>
        <section className="story-detail-hero" {...langAttrs(locale)}>
          <div className="container">
            <Link href={`/stories/${story.chapter}`} className="story-back-link"><ArrowRight size={15} aria-hidden="true" /> {t.back}</Link>
            <div className="story-detail-hero__grid">
              <div>
                <span className="story-detail-hero__count">{t.storyOf} {index + 1} / {chapterStories.length}</span>
                <h1>{text.title}</h1>
                {/* One sentence of what this story is. Before a story has been
                    rewritten it has no such sentence, so its hook stands in. */}
                <p className="story-detail-hero__hook">{arc?.idea ?? text.hook}</p>
                <p className="story-detail-hero__meta">
                  <Clock3 size={14} aria-hidden="true" /> {minutes} {minutes === 1 ? t.oneMinute : t.minutes}
                </p>
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
              <StoryArt story={story} alt={artAlt(text.title, locale)} />
            </div>
          </div>
        </section>

        <article className="story-article story-article--printable" {...langAttrs(locale)}>
          <div className="container story-article__layout">
            <nav className="story-article__rail no-print" aria-label={t.sections}>
              <span className="story-section-label">{t.sections}</span>
              <a href="#story-events">{t.events}</a>
              {arc && <a href="#story-key-moment">{t.keyMoment}</a>}
              {(story.ayah || text.quranProse) && <a href="#story-ayah">{t.ayah}</a>}
              <a href="#story-lesson">{t.lesson}</a>
              <a href="#story-challenge">{t.challenge}</a>
              {arc && <a href="#story-try-today">{t.tryToday}</a>}
            </nav>

            <div className="story-article__content">
              {locale === "ar" && narratedStories.includes(`${story.chapter}/${story.slug}`) && (
                <StoryNarration src={`/stories/audio/${story.chapter}/${story.slug}.mp3`} />
              )}
              <section className="story-reading-section story-reading-section--hook">
                <span className="story-section-number">{n()}</span>
                <div>
                  <span className="story-section-label">{t.hook}</span>
                  <p className="story-reading-section__lead">{text.hook}</p>
                </div>
              </section>

              {arc && (
                <section className="story-reading-section" id="story-setting">
                  <span className="story-section-number">{n()}</span>
                  <div>
                    <h2>{t.setting}</h2>
                    <p>{arc.setting}</p>
                  </div>
                </section>
              )}

              <section className="story-reading-section" id="story-events">
                <span className="story-section-number">{n()}</span>
                <div>
                  <h2>{t.events}</h2>
                  <p>{text.events}</p>
                </div>
              </section>

              {arc && (
                <section className="story-key-moment" id="story-key-moment">
                  <span className="story-section-number">{n()}</span>
                  <div>
                    <h2>{t.keyMoment}</h2>
                    <p>{arc.keyMoment}</p>
                  </div>
                </section>
              )}

              {arc && (
                <section className="story-reading-section" id="story-resolution">
                  <span className="story-section-number">{n()}</span>
                  <div>
                    <h2>{t.resolution}</h2>
                    <p>{arc.resolution}</p>
                  </div>
                </section>
              )}

              {(story.ayah || text.quranProse) && (
                <section className="story-quran-connection" id="story-ayah">
                  <span className="story-section-number">{n()}</span>
                  <div>
                    <span className="story-quran-connection__heading story-section-label"><BookOpen size={14} aria-hidden="true" /> {t.ayah}</span>
                    {story.ayah && <>
                      <blockquote lang="ar" dir="rtl">{story.ayah.text}</blockquote>
                      <p className="story-quran-connection__note">
                        {t.surahLabel} {getSurahName(story.ayah.surah)} · {story.ayah.number}
                        {" — "}
                        <Link href={`/hifz/${story.ayah.surah}`} className="no-print">{t.openInReader}</Link>
                      </p>
                    </>}
                    {text.quranProse && <p>{text.quranProse}</p>}
                  </div>
                </section>
              )}

              {arc?.word && (
                <aside className="story-word-card">
                  <span className="story-section-label"><BookOpen size={13} aria-hidden="true" /> {t.word}</span>
                  <b>{arc.word.term}</b>
                  <p>{arc.word.meaning}</p>
                </aside>
              )}

              <section className="story-lesson-card" id="story-lesson">
                <span className="story-section-number">{n()}</span>
                <div>
                  <h2>{t.lesson}</h2>
                  <p>{text.lesson}</p>
                  {arc && (
                    <ol className="story-lessons">
                      {arc.lessons.map(line => <li key={line}>{line}</li>)}
                    </ol>
                  )}
                </div>
              </section>

              {/* An open question with no answer to mark, kept apart from the
                  quiz below it: one asks the child to remember, this one asks
                  them what they would have done. */}
              {arc && (
                <section className="story-think" id="story-think">
                  <span className="story-section-label"><Lightbulb size={13} aria-hidden="true" /> {t.think}</span>
                  <p>{arc.think}</p>
                </section>
              )}

              <StoryChallengeSection story={story} number={n()} />

              {arc && (
                <section className="story-try-today" id="story-try-today">
                  <span className="story-section-label"><Sun size={13} aria-hidden="true" /> {t.tryToday}</span>
                  <p>{arc.tryToday}</p>
                  <DeedControl
                    t={t} chapter={story.chapter} slug={story.slug} child={child} store={hifzStore} commit={commitHifz}
                    story={{ title: text.title, action: arc.tryToday, reward: rewardOf(story) }}
                  />
                </section>
              )}

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
                    {textOf(following).title} <Arrow size={17} aria-hidden="true" />
                  </Link>
                )}
              </aside>

              <nav className="story-pager no-print" aria-label={t.allStories}>
                {previous ? <Link href={`/stories/${story.chapter}/${previous.slug}`} className="text-link">{t.prev}: {textOf(previous).title}</Link> : <span />}
                <Link href={`/stories/${story.chapter}`} className="text-link">{t.backToChapter}</Link>
                {following ? <Link href={`/stories/${story.chapter}/${following.slug}`} className="text-link">{t.nextStory}: {textOf(following).title}</Link> : <span />}
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
                {/* The chapter's name is the <h1> beside this cover. */}
                <StoryPicture src={chapter.cover} alt="" sizes={COVER_SIZES} width={1600} height={893} eager />
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
            {locale === "ar" ? (
              <div className="stories-hero__intro">
                <p>في القرآن قصص حقيقية مليئة بالإيمان والشجاعة والصبر والحكمة.</p>
                <p>سنعيش مع الأنبياء والصالحين أحداثًا أخبرنا الله بها، ونكتشف كيف واجهوا المواقف الصعبة، وماذا يمكن أن نتعلم منهم اليوم.</p>
                <p><strong>كل قصة تحمل درسًا… وكل درس يمكن أن يغيّر شيئًا جميلًا في حياتنا.</strong></p>
              </div>
            ) : <p>{t.intro}</p>}
            <Link href="/stories/library" className="stories-hero__library-link"><Library size={16} aria-hidden="true" /> {t.myLibrary}</Link>
          </div>
          <figure className="animals-collection-cover">
            {/* Decoration for the index: it illustrates no one story. */}
            <StoryPicture src="/stories/animals/cover.jpg" alt="" sizes={COVER_SIZES} width={1600} height={893} />
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
