import { Suspense } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, CirclePlay, Compass, Headphones, Heart, KeyRound, LogIn, Mic, Moon, Save, Smartphone, Sparkles, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { SiteChrome } from "@/components/SiteChrome";
import { useLocale } from "@/contexts/LocaleContext";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { RecordingsOverview } from "@/components/RecordingsOverview";
import { getSurahName } from "@/lib/quran-content";
import { yahyaAvatarUrl, yahyaHero, yahyaHeroSizes, yahyaHeroSrcSet } from "@/lib/hero-images";
import { useReadingProgress } from "@/lib/progress";
import { useAuth } from "@/hooks/useAuth";
// Not @/content/seerah: the home page shows one card per station, and importing
// the content module put all seventy stories — both languages, both age tiers —
// into the entry chunk every visitor downloads, 93 KB gzipped for seven
// excerpts. The generated index carries the title and the opening line only.
import { factIndex, seerahStationIndex, seerahStoryIndex } from "@/lib/page-index.generated";
import { indexOfTheDay } from "@/lib/fact-of-the-day";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

// Only a child who has already started the journey sees this, so it must not
// cost the first-time visitor anything.
const HomeToday = lazyWithRetry(() => import("@/components/HomeToday"));

const featuredSurahs = [1, 2, 18, 55, 67, 108];


const featuredEnglishNames: Record<number, string> = {
  1: "Al-Fatihah", 2: "Al-Baqarah", 18: "Al-Kahf", 55: "Ar-Rahman", 67: "Al-Mulk", 108: "Al-Kawthar",
};

const copy = {
  ar: {
    homeLabel: "Yahya Quran Academy الرئيسية", about: "عن الأكاديمية", stories: "قصص القرآن", exploreStories: "استكشف القصص", journey: "طريق التلقّي", apps: "التطبيقات", reader: "افتح القارئ",
    seerahNav: "السيرة النبوية", facts: "في رحاب القرآن", listenNav: "الاستماع",
    factsEyebrow: "في رحاب القرآن", factsTitle: "اكتشاف اليوم", factsAll: "افتح المئة معلومة", factsOpen: "اقرأ المعلومة",
    factsIntro: "مئة معلومة عن القرآن، واحدة كل يوم — والباقي تحتها متى شئت.", seerahEyebrow: "السيرة النبوية", seerahTitle: "من طفولة النبي ﷺ", seerahStoryLabel: "قصة", station: "المحطة", seerahIntro: "رحلة في حياة النبي ﷺ، محطة بعد محطة — من مولده وطفولته إلى شبابه وأمانته بين قومه.", seerahAll: "افتح قسم السيرة", seerahBrowse: "تصفّح السيرة",
    signIn: "تسجيل الدخول", register: "أنشئ حسابًا", account: "حسابي", accountEyebrow: "حساب الأسرة", accountTitle: "أنشئ حساب وليّ الأمر", accountBody: "الحساب اختياري بالكامل. عند إنشائه يُحفظ موضع القراءة والقصص المحفوظة على أجهزتك، ولا يُعرض أي حكم آلي على الطفل.", haveAccount: "لديك حساب بالفعل؟",
    eyebrow: "مكان هادئ للقرآن والتلقّي", titleLineOne: "رحلة قرآنية", titleLineTwo: "تنمو مع الطفل",
    intro: "تساعد Yahya Quran Academy الطفل على الاستماع والتكرار والتسجيل والمراجعة الذاتية، برفقة وليّ الأمر وخطوات عملية واضحة.",
    startReading: "ابدأ القراءة الآن", hifzJourney: "رحلة الحفظ", howItWorks: "كيف تعمل الأكاديمية؟",
    visualLabel: "تصميم ترحيبي يعرّف بشخصية يحيى وخريطة التلقّي", imageAlt: "يحيى يحمل المصحف في بطاقة ترحيبية", map: "خريطة التلقّي", startWhere: "ابدأ من حيث يناسبك", noUnlock: "لا توجد مراحل تُفتح تلقائيًا", audio: "صوت السور", nowAvailable: "متاح الآن", withYahya: "مع يحيى", stepByStep: "خطوة بخطوة",
    textProof: "النص العثماني", unchanged: "كما هو", surahs: "114 سورة", listening: "للاستماع", selfReview: "مراجعة ذاتية", noAutoJudgement: "بلا حكم آلي",
    readerEyebrow: "القارئ", readerTitle: "افتح القرآن، واستمع إلى السورة التي تختارها", readerIntro: "قارئ عام يناسب الجوال وسطح المكتب، بالنص العثماني وروابط الصوت المتحققة.", readListen: "قراءة واستماع", allSurahs: "عرض جميع السور", continueReading: "واصل القراءة", continueReadingOf: "من حيث توقفت", continueReadingAyah: "آية",
    journeyEyebrow: "منهج التلقّي", mapDescription: "خريطة توضيحية لمسار التلقّي من الاستماع إلى المراجعة الذاتية",
    familyEyebrow: "للأسرة", familyTitle: "وليّ الأمر يرى النشاط، لا حكمًا على الطفل", familyBody: "مساحة وليّ الأمر تعمل اليوم داخل رحلة الحفظ، بلا حساب ولا خادم: الطفل يقول إنه حفظ الآية، وأنت تسمعه وتعتمد أو تعيدها معه.", familyOne: "الطفل يعلن، وأنت تعتمد", familyOneBody: "يظهر لك ما أعلن الطفل حفظه، فتصدّق عليه بعد أن تسمعه — لا يعرض الموقع درجة إتقان آلية.", familyTwo: "خلف رقم سري تختاره", familyTwoBody: "صفحة وليّ الأمر مقفلة برقم من اختيارك، حتى لا يعتمد الطفل تلاوته بنفسه.", familyThree: "النسخة الاحتياطية بيدك", familyThreeBody: "كل شيء محفوظ على جهازك وحده، ويمكنك تصدير ملف الرحلة واسترجاعه على جهاز آخر.", familyOpen: "افتح مساحة وليّ الأمر",
    appsEyebrow: "التطبيقات", appsTitle: "تابع الرحلة من هاتفك", appsBody: "سنضيف روابط التنزيل الرسمية فور جاهزية إصدارات Android وiOS. إلى ذلك الحين، يمكنك البدء من القارئ على الويب.", openReader: "افتح القارئ الآن", comingSoon: "سيُتاح قريبًا", soon: "قريبًا", footer: "رحلة هادئة للقرآن والتلقّي والمراجعة الذاتية.",
    steps: [["١", "استمع", "ابدأ بسماع السورة كاملة"], ["٢", "كرّر", "خذ وقتك مع التكرار"], ["٣", "سجّل", "سجّل عندما تكون مستعدًا"], ["٤", "راجع ذاتيًا", "ارجع للسماع والمراجعة"]],
  },
  en: {
    homeLabel: "Yahya Quran Academy home", about: "About", stories: "Quran stories", exploreStories: "Explore stories", journey: "Learning path", apps: "Apps", reader: "Open reader",
    seerahNav: "Seerah", facts: "In the Realm of the Quran", listenNav: "Listening",
    factsEyebrow: "In the Realm of the Quran", factsTitle: "Today\u2019s discovery", factsAll: "Open all hundred", factsOpen: "Read it",
    factsIntro: "A hundred things worth knowing about the Quran, one a day \u2014 and the rest whenever you like.", seerahEyebrow: "The Prophet’s Seerah", seerahTitle: "From the childhood of the Prophet ﷺ", seerahStoryLabel: "Story", station: "Station", seerahIntro: "A journey through the Prophet’s life, one station at a time — from his birth and childhood to his youth and the trust he earned among his people.", seerahAll: "Open the Seerah section", seerahBrowse: "Browse the Seerah",
    signIn: "Sign in", register: "Create an account", account: "My account", accountEyebrow: "Family account", accountTitle: "Create a parent account", accountBody: "An account is entirely optional. Creating one saves your reading position and saved stories across your devices, and never shows an automated verdict on the child.", haveAccount: "Already have an account?",
    eyebrow: "A calm space for Quran learning", titleLineOne: "A Quran journey", titleLineTwo: "that grows with your child",
    intro: "Yahya Quran Academy supports listening, repetition, recording, and self-review—alongside parents and through clear, practical steps.",
    startReading: "Start reading", hifzJourney: "Memorization journey", howItWorks: "How it works",
    visualLabel: "A welcome composition introducing Yahya and the learning path", imageAlt: "Yahya holding the Quran in a welcome card", map: "Learning path", startWhere: "Begin where you are", noUnlock: "Nothing unlocks automatically", audio: "Surah audio", nowAvailable: "Available now", withYahya: "With Yahya", stepByStep: "One step at a time",
    textProof: "Uthmani text", unchanged: "kept intact", surahs: "114 surahs", listening: "for listening", selfReview: "Self-review", noAutoJudgement: "without automation",
    readerEyebrow: "The reader", readerTitle: "Open the Quran and listen to the surah you choose", readerIntro: "A public reader for desktop and mobile, with Uthmani text and verified audio links.", readListen: "Read & listen", allSurahs: "Browse all surahs", continueReading: "Continue reading", continueReadingOf: "Where you left off", continueReadingAyah: "ayah",
    journeyEyebrow: "Talaqqi method", mapDescription: "An explanatory talaqqi path from listening to self-review",
    familyEyebrow: "For families", familyTitle: "Parents see activity—not a verdict on the child", familyBody: "The parent space already works, inside the memorization journey, with no account and no server: the child says they have memorized an ayah, and you listen and either confirm it or go over it together.", familyOne: "The child declares, you confirm", familyOneBody: "You see what the child said they memorized and confirm it after hearing them — the site shows no automated mastery score.", familyTwo: "Behind a PIN you choose", familyTwoBody: "The parent page is locked with a number of your choosing, so a child cannot sign off their own recitation.", familyThree: "The backup is yours", familyThreeBody: "Everything is kept on your device alone, and you can export the journey file and restore it on another device.", familyOpen: "Open the parent space",
    appsEyebrow: "Apps", appsTitle: "Continue from your phone", appsBody: "Official Android and iOS links will be added when the apps are ready. Until then, start with the web reader.", openReader: "Open the reader", comingSoon: "Coming soon", soon: "Soon", footer: "A calm journey for Quran learning and self-review.",
    steps: [["1", "Listen", "Begin by listening to the complete surah"], ["2", "Repeat", "Take the time you need to repeat"], ["3", "Record", "Record when you feel ready"], ["4", "Self-review", "Return to listening and review"]],
  },
} as const;

const stepIcons = [Headphones, Heart, Mic, Check];

function ComingSoonStoreCard({ platform, locale }: { platform: "Android" | "iOS"; locale: "ar" | "en" }) {
  const t = copy[locale];
  return <div className="store-card" aria-disabled="true"><Smartphone size={20} /><div><b>{platform} app</b><span>{t.comingSoon}</span></div><span className="store-card__status">{t.soon}</span></div>;
}

export default function Home() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const { progress } = useReadingProgress();
  const { session } = useAuth();
  // Picked off the generated index, never the content module: this page is the
  // one that loads eagerly for every visitor.
  const todayFact = factIndex[indexOfTheDay(factIndex.length)];

  return (
    <main className="site-shell" dir={direction}>
      <SkipLink />
      <SiteChrome />

      <section id={MAIN_CONTENT_ID} className="hero-section">
        <div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" />
        <div className="container hero-grid">
          <div className="hero-copy"><span className="eyebrow"><Sparkles size={15} /> {t.eyebrow}</span><h1>{t.titleLineOne}<br /><em>{t.titleLineTwo}</em></h1><p>{t.intro}</p><div className="hero-actions"><Link href="/read/1" className="button button--primary">{t.startReading} <Arrow size={18} /></Link><Link href="/hifz" className="button button--soft"><Compass size={17} aria-hidden="true" /> {t.hifzJourney}</Link></div><div className="hero-links"><Link href="/listen"><Headphones size={15} aria-hidden="true" /> {t.listenNav}</Link><Link href="/stories"><BookOpen size={15} aria-hidden="true" /> {t.exploreStories}</Link><a href="#journey">{t.howItWorks}</a></div></div>
          <div className="hero-visual" aria-label={t.visualLabel}><div className="hero-moon" /><div className="yahya-character-frame"><img src={yahyaHero} srcSet={yahyaHeroSrcSet} sizes={yahyaHeroSizes} width={768} height={960} fetchPriority="high" alt={t.imageAlt} /><div className="yahya-character-frame__shade" aria-hidden="true" /></div><div className="journey-card journey-card--large"><span className="journey-card__label"><Compass size={14} /> {t.map}</span><b>{t.startWhere}</b><div className="journey-card__path" aria-hidden="true"><span className="path-dot path-dot--listen" /><i /><span className="path-dot path-dot--repeat" /><i /><span className="path-dot path-dot--review" /></div><div className="journey-card__caption"><Heart size={15} fill="currentColor" /> {t.noUnlock}</div></div><div className="mini-note mini-note--audio"><Headphones size={18} /><span>{t.audio}<br /><b>{t.nowAvailable}</b></span></div><div className="mini-note mini-note--parent"><Avatar className="mini-note__avatar"><AvatarImage src={yahyaAvatarUrl} alt="" loading="lazy" /><AvatarFallback>ي</AvatarFallback></Avatar><span>{t.withYahya}<br /><b>{t.stepByStep}</b></span></div></div>
        </div>
      </section>

      {/* Lazy so the store, the review schedule and the journey data stay out
          of the entry chunk every first-time visitor downloads. */}
      <Suspense fallback={null}><HomeToday /></Suspense>

      <section className="trust-strip" id="about"><div className="container trust-strip__inner"><div><BookOpen size={21} /><span><b>{t.textProof}</b> {t.unchanged}</span></div><div><Headphones size={21} /><span><b>{t.surahs}</b> {t.listening}</span></div><div><Heart size={21} /><span><b>{t.selfReview}</b> {t.noAutoJudgement}</span></div></div></section>

      <section className="section section--reader" aria-labelledby="reader-title"><div className="container"><div className="section-heading"><span className="eyebrow eyebrow--gold">{t.readerEyebrow}</span><h2 id="reader-title">{t.readerTitle}</h2><p>{t.readerIntro}</p></div>{progress && (
          <Link href={`/read/${progress.surah}`} className="resume-chip" data-testid="continue-reading">
            <span className="resume-chip__icon"><CirclePlay size={18} aria-hidden="true" /></span>
            <span className="resume-chip__text">
              <b>{t.continueReading}</b>
              <small lang="ar" dir="rtl">{getSurahName(progress.surah)}{progress.ayah > 0 ? ` · ${t.continueReadingAyah} ${progress.ayah}` : ` · ${t.continueReadingOf}`}</small>
            </span>
            <Arrow size={18} aria-hidden="true" />
          </Link>
        )}<div className="surah-grid">{featuredSurahs.map((surah) => <Link href={`/read/${surah}`} key={surah} className="surah-card"><span>{String(surah).padStart(3, "0")}</span><b lang="ar" dir="rtl">{getSurahName(surah)}</b>{locale === "en" && <small className="surah-card__translation">{featuredEnglishNames[surah]}</small>}<CirclePlay size={22} /><small>{t.readListen}</small></Link>)}</div><Link href="/read/1" className="text-link text-link--center">{t.allSurahs} <Arrow size={18} /></Link></div></section>

      <section className="section section--seerah" id="seerah" aria-labelledby="seerah-title"><div className="container"><div className="section-heading"><span className="eyebrow eyebrow--gold"><Moon size={14} aria-hidden="true" /> {t.seerahEyebrow}</span><h2 id="seerah-title">{t.seerahTitle}</h2><p>{t.seerahIntro}</p></div><ul className="story-list-grid">{seerahStationIndex.map(station => { const story = seerahStoryIndex.find(entry => entry.stationId === station.stationId); if (!story) return null; const title = locale === "en" ? story.titleEn ?? story.title : story.title; const opening = locale === "en" ? story.descriptionEn ?? story.description : story.description; return <li key={story.slug}><Link href={`/seerah/${story.slug}`} className="story-list-card"><div className="story-list-card__body"><span>{t.station} {station.stationId} — {locale === "en" ? station.titleEn ?? station.titleAr : station.titleAr}</span><h3>{title}</h3><p>{opening}</p></div></Link></li>; })}</ul><Link href="/seerah" className="text-link text-link--center">{t.seerahAll} <Arrow size={18} /></Link></div></section>

      {/* The section had a hundred pieces of content and no way in from the
          front page. One of them, chosen by the date, is the way in. */}
      <section className="section section--facts" aria-labelledby="facts-title">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow eyebrow--gold"><Sparkles size={14} aria-hidden="true" /> {t.factsEyebrow}</span>
            <h2 id="facts-title">{t.factsTitle}</h2>
            <p>{t.factsIntro}</p>
          </div>
          <div className="facts-today">
            <div>
              <span className="facts-today__label">{locale === "ar" ? `المعلومة ${todayFact.number}` : `Fact ${todayFact.number}`}</span>
              <h3>{locale === "en" ? todayFact.titleEn : todayFact.title}</h3>
              <p>{locale === "en" ? todayFact.bodyEn : todayFact.body}</p>
            </div>
            <Link href={`/quran-facts/${todayFact.slug}`} className="button button--primary">{t.factsOpen} <Arrow size={17} aria-hidden="true" /></Link>
          </div>
          <Link href="/quran-facts" className="text-link text-link--center">{t.factsAll} <Arrow size={18} /></Link>
        </div>
      </section>

      <section className="section journey-section" id="journey" aria-labelledby="journey-title"><div className="container journey-grid"><div className="journey-illustration" role="img" aria-label={t.mapDescription}><span className="journey-illustration__sun">✦</span><span className="journey-illustration__cloud journey-illustration__cloud--one" aria-hidden="true" /><span className="journey-illustration__cloud journey-illustration__cloud--two" aria-hidden="true" /><div className="journey-illustration__path" aria-hidden="true" />{t.steps.map(([number, title], index) => { const Icon = stepIcons[index]; return <div className={`journey-map-stop journey-map-stop--${index + 1}`} key={title}><span className="journey-map-stop__number">{number}</span><Icon size={17} aria-hidden="true" /><span>{title}</span></div>; })}<div className="journey-illustration__child"><Avatar><AvatarImage src={yahyaAvatarUrl} alt="" loading="lazy" /><AvatarFallback>ي</AvatarFallback></Avatar></div></div><div><span className="eyebrow eyebrow--gold" id="journey-title">{t.journeyEyebrow}</span><div className="step-list">{t.steps.map(([number, title, detail], index) => { const Icon = stepIcons[index]; return <div key={title}><span>{number}</span><div><b><Icon size={15} aria-hidden="true" /> {title}</b><p>{detail}</p></div></div>; })}</div></div></div></section>

      <RecordingsOverview />
      <section className="section parent-section"><div className="container parent-card"><div><span className="eyebrow eyebrow--gold">{t.familyEyebrow}</span><h2>{t.familyTitle}</h2><p>{t.familyBody}</p></div><div className="parent-facts"><div><UserRound size={18} aria-hidden="true" /><b>{t.familyOne}</b><p>{t.familyOneBody}</p></div><div><KeyRound size={18} aria-hidden="true" /><b>{t.familyTwo}</b><p>{t.familyTwoBody}</p></div><div><Save size={18} aria-hidden="true" /><b>{t.familyThree}</b><p>{t.familyThreeBody}</p></div><Link href="/hifz/parent" className="text-link">{t.familyOpen} <Arrow size={17} aria-hidden="true" /></Link></div></div></section>

      <section className="section account-section" id="account" aria-labelledby="account-title"><div className="container account-card"><div><span className="eyebrow eyebrow--gold">{t.accountEyebrow}</span><h2 id="account-title">{t.accountTitle}</h2><p>{t.accountBody}</p></div><div className="account-actions"><Link href="/register" className="button button--primary" data-testid="home-register"><LogIn size={17} aria-hidden="true" /> {t.register}</Link><p className="account-actions__note">{t.haveAccount} <Link href="/login" className="text-link" data-testid="home-login">{t.signIn} <Arrow size={16} /></Link></p></div></div></section>

      <section className="section apps-section" id="apps"><div className="container apps-grid"><div><span className="eyebrow eyebrow--gold">{t.appsEyebrow}</span><h2>{t.appsTitle}</h2><p>{t.appsBody}</p><Link href="/read/1" className="text-link">{t.openReader} <Arrow size={18} /></Link></div><div className="store-stack"><ComingSoonStoreCard platform="Android" locale={locale} /><ComingSoonStoreCard platform="iOS" locale={locale} /></div></div></section>
      <footer className="site-footer"><div className="container site-footer__inner"><div className="brand-mark"><span className="brand-mark__seal">ي</span><span><b>Yahya</b> Quran Academy</span></div><p>{t.footer}</p><Link href="/about" className="text-link">{t.about}</Link><Link href="/read/1" className="text-link">{t.reader} <Arrow size={16} /></Link></div></footer>
    </main>
  );
}
