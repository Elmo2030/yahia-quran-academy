// =============================================================================
// HifzCertificate — something to print and put on a wall.
//
// It says exactly what happened and no more: how many surahs of Juz Amma this
// child declared memorized, how many a parent put their name to, and the date.
// It never says the child recites correctly, because nobody here heard them —
// the parent's confirmation is the only human judgement on it, and it is
// labelled as theirs.
// =============================================================================

import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Printer, Star } from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { HifzBottomBar } from "@/components/HifzBottomBar";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { rankFor, starsFor, totalStars } from "@/lib/hifz-stars";
import { activeProfile, ayahKey, surahProgress, type ChildProfile } from "@/lib/hifz-store";
import { JOURNEY_SURAHS, ayahCountOf } from "@/lib/juz-amma";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";

const copy = {
  ar: {
    back: "رحلة الحفظ",
    title: "شهادة الرحلة",
    noChild: "اختر الطفل أولًا",
    pickChild: "اختر الطفل",
    nothingYet: "لم تُعلن أي سورة كاملة بعد",
    nothingBody: "الشهادة تُكتب عندما تكتمل أول سورة. أكمل آيات سورة وأعلن حفظها، وستجدها هنا.",
    openMap: "افتح الخريطة",
    heading: "شهادة من رحلة حفظ جزء عمّ",
    awardedTo: "هذه شهادة للطفل",
    declared: (n: number) => (n === 1 ? "أعلن حفظ سورة واحدة" : n === 2 ? "أعلن حفظ سورتين" : `أعلن حفظ ${n} سور`),
    ofJuz: (total: number) => `من ${total} سورة في الرحلة`,
    witnessed: (n: number) => (n === 0 ? "بلا شهادة وليّ الأمر بعد" : n === 1 ? "شهد وليّ الأمر على سورة واحدة منها" : `شهد وليّ الأمر على ${n} منها`),
    starsLine: (n: number) => `${n} نجمة على طريق الرحلة`,
    rankLine: (rank: string) => `الرتبة: ${rank}`,
    surahsLine: "السور المعلنة",
    dateLine: (date: string) => `في ${date}`,
    honest: "هذه الشهادة تسجّل ما أعلنه الطفل وما شهد عليه وليّ أمره. الموقع لا يحكم على التلاوة.",
    print: "اطبع الشهادة",
    site: "أكاديمية يحيى لتعليم القرآن للأطفال",
  },
  en: {
    back: "Memorization journey",
    title: "Journey certificate",
    noChild: "Choose the child first",
    pickChild: "Choose the child",
    nothingYet: "No surah has been fully declared yet",
    nothingBody: "The certificate is written once the first surah is complete. Finish a surah’s ayahs and declare them, and it will appear here.",
    openMap: "Open the map",
    heading: "A certificate from the Juz Amma journey",
    awardedTo: "This is for",
    declared: (n: number) => (n === 1 ? "declared one surah memorized" : `declared ${n} surahs memorized`),
    ofJuz: (total: number) => `of the ${total} surahs on the journey`,
    witnessed: (n: number) => (n === 0 ? "not yet confirmed by a parent" : n === 1 ? "one of them confirmed by a parent" : `${n} of them confirmed by a parent`),
    starsLine: (n: number) => `${n} stars along the way`,
    rankLine: (rank: string) => `Rank: ${rank}`,
    surahsLine: "The surahs declared",
    dateLine: (date: string) => `on ${date}`,
    honest: "This certificate records what the child declared and what their parent confirmed. The site does not judge the recitation.",
    print: "Print the certificate",
    site: "Yahya Quran Academy",
  },
};

type Copy = (typeof copy)["ar"];

export default function HifzCertificate() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const { store } = useHifzStore();
  const profile = activeProfile(store);
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <main className="site-shell hifz" dir={direction}>
      <SkipLink />
      <div className="hifz-no-print"><SiteChrome /></div>
      <div id={MAIN_CONTENT_ID}>
        <section className="section hifz-section">
          <div className="container hifz-stack">
            <header className="hifz-memorize__bar hifz-no-print">
              <Link href="/hifz" className="hifz-back"><Back size={17} aria-hidden="true" /> {t.back}</Link>
              <div className="hifz-memorize__title"><h1>{t.title}</h1></div>
            </header>
            {profile ? <Certificate t={t} profile={profile} /> : (
              <article className="hifz-card">
                <h2 className="hifz-notice-title">{t.noChild}</h2>
                <div className="hifz-actions"><Link href="/hifz" className="button button--primary">{t.pickChild}</Link></div>
              </article>
            )}
          </div>
        </section>
      </div>
    <HifzBottomBar />
    </main>
  );
}

function Certificate({ t, profile }: { t: Copy; profile: ChildProfile }) {
  const { locale } = useLocale();
  const nameOf = (surah: number) => (locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah));

  const complete = JOURNEY_SURAHS.filter(surah => {
    const total = ayahCountOf(surah);
    return surahProgress(profile, surah, total).declared === total;
  });
  const witnessed = complete.filter(surah => {
    const total = ayahCountOf(surah);
    for (let ayah = 1; ayah <= total; ayah++) {
      if (profile.ayahs[ayahKey(surah, ayah)]?.declaredBy !== "parent") return false;
    }
    return true;
  });
  const stars = totalStars(profile);
  const rank = rankFor(stars);
  const date = new Date().toLocaleDateString(locale === "ar" ? "ar-EG" : "en-GB", { year: "numeric", month: "long", day: "numeric" });

  if (complete.length === 0) {
    return (
      <article className="hifz-card">
        <h2 className="hifz-notice-title">{t.nothingYet}</h2>
        <p>{t.nothingBody}</p>
        <div className="hifz-actions"><Link href="/hifz" className="button button--primary">{t.openMap}</Link></div>
      </article>
    );
  }

  return (
    <>
      <article className="certificate" lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
        <div className="certificate__frame">
          <p className="certificate__eyebrow">{t.heading}</p>
          <p className="certificate__to">{t.awardedTo}</p>
          <p className="certificate__name">{profile.name}</p>

          <p className="certificate__line">
            {t.declared(complete.length)} <span className="certificate__of">{t.ofJuz(JOURNEY_SURAHS.length)}</span>
          </p>
          <p className="certificate__line certificate__witness">{t.witnessed(witnessed.length)}</p>

          <p className="certificate__stars">
            <Star size={18} fill="currentColor" aria-hidden="true" /> {t.starsLine(stars)} · {t.rankLine(locale === "ar" ? rank.nameAr : rank.nameEn)}
          </p>

          <div className="certificate__surahs">
            <span>{t.surahsLine}</span>
            <p>{complete.map(nameOf).join(locale === "ar" ? " · " : " · ")}</p>
          </div>

          <p className="certificate__date">{t.dateLine(date)}</p>
          <p className="certificate__honest">{t.honest}</p>
          <p className="certificate__site">{t.site}</p>
        </div>
      </article>

      <div className="hifz-actions hifz-no-print" style={{ justifyContent: "center" }}>
        <button type="button" className="button button--primary" onClick={() => window.print()}>
          <Printer size={17} aria-hidden="true" /> {t.print}
        </button>
      </div>
    </>
  );
}
