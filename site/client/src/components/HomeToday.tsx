// =============================================================================
// HomeToday.tsx — the one line a returning child needs on the front page.
//
// The journey knows what today asks for, but only once you are inside it. A
// child who opens the site the next morning met a page that had forgotten
// them: four buttons, none of which said "here is where you stopped".
//
// It draws nothing at all for a first visit. No profile, no band — the home
// page a stranger sees is unchanged, and nothing here invents a number: the
// due count, the streak and the surah all come from what the child actually
// did, on this device.
// =============================================================================

import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Compass, Flame } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { activeProfile, surahProgress } from "@/lib/hifz-store";
import { todayPlan } from "@/lib/hifz-review";
import { JOURNEY_SURAHS, ayahCountOf } from "@/lib/juz-amma";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";

const copy = {
  ar: {
    label: "رحلتك اليوم",
    hello: (name: string) => `أهلًا يا ${name}`,
    helloGuest: "أهلًا يا صديقي الصغير",
    due: (n: number) =>
      n === 1 ? "عندك آية واحدة للمراجعة" : n === 2 ? "عندك آيتان للمراجعة" : n <= 10 ? `عندك ${n} آيات للمراجعة` : `عندك ${n} آية للمراجعة`,
    review: "ابدأ المراجعة",
    resume: (name: string) => `كمّل مع سورة ${name}`,
    open: "افتح الرحلة",
    streak: (n: number) => (n === 1 ? "يوم واحد متواصل" : n === 2 ? "يومان متواصلان" : n <= 10 ? `${n} أيام متواصلة` : `${n} يومًا متواصلًا`),
  },
  en: {
    label: "Your journey today",
    hello: (name: string) => `Hello, ${name}`,
    helloGuest: "Hello, little friend",
    due: (n: number) => (n === 1 ? "One ayah is due for review" : `${n} ayahs are due for review`),
    review: "Start the review",
    resume: (name: string) => `Carry on with Surah ${name}`,
    open: "Open the journey",
    streak: (n: number) => (n === 1 ? "1 day in a row" : `${n} days in a row`),
  },
} as const;

export default function HomeToday() {
  const { locale } = useLocale();
  const { store } = useHifzStore();
  const profile = activeProfile(store);
  if (!profile) return null;

  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const plan = todayPlan(profile);

  // The surah being worked on: the first one not yet declared to the end.
  const current =
    JOURNEY_SURAHS.find(surah => surahProgress(profile, surah, ayahCountOf(surah)).declared < ayahCountOf(surah)) ??
    JOURNEY_SURAHS[0];
  const surahName = locale === "ar" ? getSurahName(current) : getEnglishSurahName(current);

  const greeting = profile.character === "guest" ? t.helloGuest : t.hello(profile.name);
  const reviewing = plan.due > 0;

  return (
    <section className="today-band-wrap">
      <div className="container">
        <div className="today-band">
          <span className="today-band__label"><Compass size={15} aria-hidden="true" /> {t.label}</span>
          <div className="today-band__text">
            <b>{greeting}</b>
            <span>{reviewing ? t.due(plan.due) : t.resume(surahName)}</span>
            {plan.streak > 0 && (
              <small className="today-band__streak"><Flame size={13} aria-hidden="true" /> {t.streak(plan.streak)}</small>
            )}
          </div>
          <Link href={reviewing ? "/hifz/review" : `/hifz/${current}`} className="button button--primary">
            {reviewing ? t.review : t.open} <Arrow size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
