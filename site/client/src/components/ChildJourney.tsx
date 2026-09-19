import { Link } from "wouter";
import { BookOpen, ChevronLeft, ChevronRight, Compass, Heart, Lightbulb, Sparkles, Star, type LucideIcon } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { activeProfile, inProgressStories, surahProgress } from "@/lib/hifz-store";
import { JOURNEY_SURAHS, ayahCountOf } from "@/lib/juz-amma";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";
import { nextStep, readLocalProgress } from "@/lib/progress";
import { factIndex, storyIndex } from "@/lib/page-index.generated";
import { readFactDiscoveries } from "@/lib/quran-facts-progress";

const copy = {
  ar: {
    label: "رحلتي", firstTitle: "ابدأ رحلتك", firstBody: "اختر ما تحب أن تبدأ به، وستبقى خطواتك محفوظة على هذا الجهاز.",
    title: "خطوتك الجاية", open: "افتح رحلتي", continue: "تابع الآن", continueStory: (title: string) => `تابع: ${title}`, explore: "اكتشف في رحلتك",
    hifz: "رحلة الحفظ", hifzBody: (name: string) => `تابع مع سورة ${name}`,
    facts: "في رحاب القرآن", factsBody: "اكتشف معلومة جديدة عن القرآن",
    stories: "قصص القرآن", storiesBody: "اقرأ قصة وخذ منها فكرة جميلة",
    seerah: "السيرة النبوية", seerahBody: "اختر محطة من حياة النبي ﷺ",
    aqeedah: "العقيدة", aqeedahBody: "بطاقات قصيرة للتفكر والتعلّم",
    review: (name: string) => `راجع سورة ${name}`,
    practice: (name: string) => `سمّع المقطع من سورة ${name}`,
    waiting: "تسميعك ينتظر وليّ الأمر", reading: (name: string) => `واصل قراءة سورة ${name}`,
  },
  en: {
    label: "My journey", firstTitle: "Start your journey", firstBody: "Choose what you would like to begin with. Your steps stay on this device.",
    title: "Your next step", open: "Open my journey", continue: "Continue now", continueStory: (title: string) => `Continue: ${title}`, explore: "Explore your journey",
    hifz: "Memorization journey", hifzBody: (name: string) => `Continue with Surah ${name}`,
    facts: "In the Realm of the Quran", factsBody: "Discover a new fact about the Quran",
    stories: "Quran stories", storiesBody: "Read a story and take a lovely idea from it",
    seerah: "The Prophet’s Seerah", seerahBody: "Choose a station from the Prophet’s life ﷺ",
    aqeedah: "Creed", aqeedahBody: "Short cards for thinking and learning",
    review: (name: string) => `Review Surah ${name}`,
    practice: (name: string) => `Recite your segment from ${name}`,
    waiting: "Your recitation is waiting for a parent", reading: (name: string) => `Continue reading ${name}`,
  },
} as const;

type Activity = { href: string; title: string; body: string; Icon: LucideIcon; kind: string };

/** A view over existing local records; it never writes progress or ranks work. */
export function childJourneyActivities(locale: "ar" | "en", profileId: string | null, profile: ReturnType<typeof activeProfile>): { primary: Activity; activities: Activity[]; hasProgress: boolean } {
  const t = copy[locale];
  const nameFor = (surah: number) => locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah);
  const local = readLocalProgress();
  const step = nextStep(local);
  const currentSurah = profile
    ? JOURNEY_SURAHS.find(surah => surahProgress(profile, surah, ayahCountOf(surah)).declared < ayahCountOf(surah)) ?? JOURNEY_SURAHS[0]
    : JOURNEY_SURAHS[0];
  const discovered = readFactDiscoveries(factIndex.map(fact => fact.slug), profileId);
  const nextFact = factIndex.find(fact => !discovered.includes(fact.slug)) ?? factIndex[0];
  const resumedStory = profile?.character === "guest"
    ? undefined
    : profile && inProgressStories(profile).find(candidate =>
      storyIndex.some(story => story.chapter === candidate.chapter && story.slug === candidate.slug),
    );
  const resumedStoryMetadata = resumedStory
    ? storyIndex.find(story => story.chapter === resumedStory.chapter && story.slug === resumedStory.slug)
    : undefined;
  const resumedStoryTitle = resumedStoryMetadata
    ? locale === "en" ? resumedStoryMetadata.titleEn ?? resumedStoryMetadata.title : resumedStoryMetadata.title
    : undefined;

  let primary: Activity;
  if (step?.ref.kind === "ayah") {
    const isHifz = step.href.startsWith("/hifz/");
    primary = { href: step.href, title: isHifz ? t.review(nameFor(step.ref.surah)) : t.reading(nameFor(step.ref.surah)), body: isHifz ? t.hifz : t.reading(nameFor(step.ref.surah)), Icon: isHifz ? Heart : BookOpen, kind: "review" };
  } else if (step?.ref.kind === "recital") {
    primary = { href: step.href, title: step.needsPractice ? t.practice(nameFor(step.ref.surah)) : t.waiting, body: t.hifz, Icon: Heart, kind: step.needsPractice ? "practice" : "waiting" };
  } else if (step?.ref.kind === "deed") {
    primary = { href: step.href, title: t.waiting, body: t.stories, Icon: Heart, kind: "waiting" };
  } else if (profile) {
    primary = { href: `/hifz/${currentSurah}`, title: t.hifzBody(nameFor(currentSurah)), body: t.hifz, Icon: Compass, kind: "hifz" };
  } else {
    primary = { href: "/hifz", title: t.firstTitle, body: t.firstBody, Icon: Compass, kind: "start" };
  }

  const activities: Activity[] = [
    { href: `/hifz/${currentSurah}`, title: t.hifz, body: t.hifzBody(nameFor(currentSurah)), Icon: Compass, kind: "hifz" },
    { href: `/quran-facts/${nextFact.slug}`, title: t.facts, body: t.factsBody, Icon: Sparkles, kind: "facts" },
    {
      href: resumedStory ? `/stories/${resumedStory.chapter}/${resumedStory.slug}` : "/stories",
      title: resumedStoryTitle ? t.continueStory(resumedStoryTitle) : t.stories,
      body: resumedStory ? t.stories : t.storiesBody,
      Icon: BookOpen,
      kind: "stories",
    },
    { href: "/seerah", title: t.seerah, body: t.seerahBody, Icon: Star, kind: "seerah" },
    { href: "/aqeedah", title: t.aqeedah, body: t.aqeedahBody, Icon: Lightbulb, kind: "aqeedah" },
  ];
  return { primary, activities, hasProgress: Boolean(step || profile || discovered.length || local) };
}

export function JourneyEntry() {
  const { locale } = useLocale();
  const { store } = useHifzStore();
  const profile = activeProfile(store);
  const { primary, hasProgress } = childJourneyActivities(locale, profile?.id ?? null, profile);
  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const Icon = primary.Icon;

  return (
    <section className="child-journey-entry" aria-label={t.label}>
      <div className="container">
        <div className="child-journey-entry__card">
          <span className="child-journey-entry__mark"><Icon size={22} aria-hidden="true" /></span>
          <div><span className="eyebrow eyebrow--gold">{t.label}</span><h2>{hasProgress ? t.title : t.firstTitle}</h2><p>{primary.title}</p></div>
          <Link href="/journey" className="button button--primary">{t.open} <Arrow size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

export function ChildJourneyBoard() {
  const { locale } = useLocale();
  const { store } = useHifzStore();
  const profile = activeProfile(store);
  const { primary, activities, hasProgress } = childJourneyActivities(locale, profile?.id ?? null, profile);
  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const PrimaryIcon = primary.Icon;
  return (
    <>
      <section className="child-journey-hero">
        <div className="container">
          <span className="eyebrow eyebrow--gold"><Compass size={15} aria-hidden="true" /> {t.label}</span>
          <h1>{hasProgress ? t.title : t.firstTitle}</h1>
          <p>{hasProgress ? primary.body : t.firstBody}</p>
          <Link href={primary.href} className="child-next-card" data-testid="journey-next-step">
            <span className="child-next-card__icon"><PrimaryIcon size={23} aria-hidden="true" /></span>
            <span><small>{t.title}</small><b>{primary.title}</b><em>{t.continue} <Arrow size={16} aria-hidden="true" /></em></span>
          </Link>
        </div>
      </section>
      <section className="section child-journey-activities" aria-labelledby="journey-activities-title">
        <div className="container"><div className="section-heading"><span className="eyebrow eyebrow--gold">{t.label}</span><h2 id="journey-activities-title">{t.explore}</h2></div>
          <ul className="child-journey-grid">{activities.map(activity => { const Icon = activity.Icon; return <li key={activity.kind}><Link href={activity.href} className="child-journey-card"><span><Icon size={20} aria-hidden="true" /></span><div><b>{activity.title}</b><p>{activity.body}</p></div><Arrow size={17} aria-hidden="true" /></Link></li>; })}</ul>
        </div>
      </section>
    </>
  );
}
