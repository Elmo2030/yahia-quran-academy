import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, CirclePlay, Compass, Headphones, Heart, LockKeyhole, LogIn, Mic, Moon, Smartphone, Sparkles, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLocale } from "@/contexts/LocaleContext";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { getSurahName } from "@/lib/quran-content";
import { useReadingProgress } from "@/lib/progress";
import { useAuth } from "@/hooks/useAuth";
import { seerahStations, seerahStories } from "@/content/seerah";

const featuredSurahs = [1, 2, 18, 55, 67, 108];
const yahiaCharacterUrl = "/manus-storage/yahia-hero_24faa0fd.png";

const featuredEnglishNames: Record<number, string> = {
  1: "Al-Fatihah", 2: "Al-Baqarah", 18: "Al-Kahf", 55: "Ar-Rahman", 67: "Al-Mulk", 108: "Al-Kawthar",
};

const copy = {
  ar: {
    homeLabel: "Yahya Quran Academy الرئيسية", about: "عن الأكاديمية", stories: "قصص القرآن", exploreStories: "استكشف القصص", journey: "طريق التلقّي", apps: "التطبيقات", reader: "افتح القارئ",
    seerahNav: "السيرة النبوية", seerahEyebrow: "السيرة النبوية", seerahTitle: "من طفولة النبي ﷺ", seerahStoryLabel: "قصة", station: "المحطة", seerahIntro: "رحلة في حياة النبي ﷺ، محطة بعد محطة — من مولده وطفولته إلى شبابه وأمانته بين قومه.", seerahAll: "افتح قسم السيرة", seerahBrowse: "تصفّح السيرة",
    signIn: "تسجيل الدخول", register: "أنشئ حسابًا", account: "حسابي", accountEyebrow: "حساب الأسرة", accountTitle: "أنشئ حساب وليّ الأمر", accountBody: "الحساب اختياري بالكامل. عند إنشائه يُحفظ موضع القراءة والقصص المحفوظة على أجهزتك، ولا يُعرض أي حكم آلي على الطفل.", haveAccount: "لديك حساب بالفعل؟",
    eyebrow: "مكان هادئ للقرآن والتلقّي", titleLineOne: "رحلة قرآنية", titleLineTwo: "تنمو مع الطفل",
    intro: "تساعد Yahya Quran Academy الطفل على الاستماع والتكرار والتسجيل والمراجعة الذاتية، برفقة وليّ الأمر وخطوات عملية واضحة.",
    startReading: "ابدأ القراءة الآن", howItWorks: "كيف تعمل الأكاديمية؟", safety: "لا نعرض درجة إتقان آلية ولا نفتح مراحل تلقائيًا.",
    visualLabel: "تصميم ترحيبي يعرّف بشخصية يحيى وخريطة التلقّي", imageAlt: "يحيى يحمل المصحف في بطاقة ترحيبية", map: "خريطة التلقّي", startWhere: "ابدأ من حيث يناسبك", noUnlock: "لا توجد مراحل تُفتح تلقائيًا", audio: "صوت السور", nowAvailable: "متاح الآن", withYahya: "مع يحيى", stepByStep: "خطوة بخطوة",
    textProof: "النص العثماني", unchanged: "كما هو", surahs: "114 سورة", listening: "للاستماع", selfReview: "مراجعة ذاتية", noAutoJudgement: "بلا حكم آلي",
    readerEyebrow: "القارئ", readerTitle: "افتح القرآن، واستمع إلى السورة التي تختارها", readerIntro: "قارئ عام يناسب الجوال وسطح المكتب، بالنص العثماني وروابط الصوت المتحققة.", readListen: "قراءة واستماع", allSurahs: "عرض جميع السور", continueReading: "واصل القراءة", continueReadingOf: "من حيث توقفت", continueReadingAyah: "آية",
    journeyEyebrow: "منهج التلقّي", journeyTitle: "أربع خطوات مفهومة، بلا ادعاء معرفة ما يتقنه الطفل", mapDescription: "خريطة توضيحية لمسار التلقّي من الاستماع إلى المراجعة الذاتية؛ لا تمثل تقدم طفل حقيقي", mapNote: "تصوّر للمسار، وليس لوحة إنجاز.",
    familyEyebrow: "للأسرة", familyTitle: "وليّ الأمر يرى النشاط، لا حكمًا على الطفل", familyBody: "تصميم مساحة وليّ الأمر يركز على ما يحدث فعلًا. عند ربط الحساب ستظهر الجلسات ومدتها وآخر المراجعات من النشاط الحقيقي فقط.", familyCardOne: "سجل الجلسات", familyCardOneValue: "من النشاط الحقيقي", familyCardTwo: "ملفات الأطفال", familyCardTwoValue: "باختيار وليّ الأمر", familyProfile: "سيظهر ملف يحيى عند ربط الحساب",
    appsEyebrow: "التطبيقات", appsTitle: "تابع الرحلة من هاتفك", appsBody: "سنضيف روابط التنزيل الرسمية فور جاهزية إصدارات Android وiOS. إلى ذلك الحين، يمكنك البدء من القارئ على الويب.", openReader: "افتح القارئ الآن", comingSoon: "سيُتاح قريبًا", soon: "قريبًا", footer: "رحلة هادئة للقرآن والتلقّي والمراجعة الذاتية.",
    steps: [["١", "استمع", "ابدأ بسماع السورة كاملة"], ["٢", "كرّر", "خذ وقتك مع التكرار"], ["٣", "سجّل", "سجّل عندما تكون مستعدًا"], ["٤", "راجع ذاتيًا", "ارجع للسماع والمراجعة"]],
  },
  en: {
    homeLabel: "Yahya Quran Academy home", about: "About", stories: "Quran stories", exploreStories: "Explore stories", journey: "Learning path", apps: "Apps", reader: "Open reader",
    seerahNav: "Seerah", seerahEyebrow: "The Prophet’s Seerah", seerahTitle: "From the childhood of the Prophet ﷺ", seerahStoryLabel: "Story", station: "Station", seerahIntro: "A journey through the Prophet’s life, one station at a time — from his birth and childhood to his youth and the trust he earned among his people.", seerahAll: "Open the Seerah section", seerahBrowse: "Browse the Seerah",
    signIn: "Sign in", register: "Create an account", account: "My account", accountEyebrow: "Family account", accountTitle: "Create a parent account", accountBody: "An account is entirely optional. Creating one saves your reading position and saved stories across your devices, and never shows an automated verdict on the child.", haveAccount: "Already have an account?",
    eyebrow: "A calm space for Quran learning", titleLineOne: "A Quran journey", titleLineTwo: "that grows with your child",
    intro: "Yahya Quran Academy supports listening, repetition, recording, and self-review—alongside parents and through clear, practical steps.",
    startReading: "Start reading", howItWorks: "How it works", safety: "No automatic mastery score. No stages unlock on their own.",
    visualLabel: "A welcome composition introducing Yahya and the learning path", imageAlt: "Yahya holding the Quran in a welcome card", map: "Learning path", startWhere: "Begin where you are", noUnlock: "Nothing unlocks automatically", audio: "Surah audio", nowAvailable: "Available now", withYahya: "With Yahya", stepByStep: "One step at a time",
    textProof: "Uthmani text", unchanged: "kept intact", surahs: "114 surahs", listening: "for listening", selfReview: "Self-review", noAutoJudgement: "without automation",
    readerEyebrow: "The reader", readerTitle: "Open the Quran and listen to the surah you choose", readerIntro: "A public reader for desktop and mobile, with Uthmani text and verified audio links.", readListen: "Read & listen", allSurahs: "Browse all surahs", continueReading: "Continue reading", continueReadingOf: "Where you left off", continueReadingAyah: "ayah",
    journeyEyebrow: "Talaqqi method", journeyTitle: "Four understandable steps—with no claim to know what a child has mastered", mapDescription: "An explanatory talaqqi path from listening to self-review; it does not show a child’s real progress", mapNote: "A learning guide, not an achievement board.",
    familyEyebrow: "For families", familyTitle: "Parents see activity—not a verdict on the child", familyBody: "The parent-space design focuses on what really happened. Once an account is connected, it will show real sessions, duration, and the latest reviews only.", familyCardOne: "Session history", familyCardOneValue: "From real activity", familyCardTwo: "Child profiles", familyCardTwoValue: "Chosen by parents", familyProfile: "Yahya’s profile appears after account linking",
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

  return (
    <main className="site-shell" dir={direction}>
      <SkipLink />
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="brand-mark" aria-label={t.homeLabel}><span className="brand-mark__seal">ي</span><span><b>Yahya</b> Quran Academy</span></Link>
          <nav aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"} className="site-nav"><a href="#about">{t.about}</a><Link href="/stories">{t.stories}</Link><Link href="/seerah">{t.seerahNav}</Link><a href="#journey">{t.journey}</a><a href="#apps">{t.apps}</a></nav>
          <div className="header-actions"><LanguageToggle compact />{session ? <Link href="/profile" className="header-auth-link"><UserRound size={15} aria-hidden="true" /> {t.account}</Link> : <Link href="/register" className="header-auth-link"><LogIn size={15} aria-hidden="true" /> {t.register}</Link>}<Link href="/read/1" className="header-reader-link">{t.reader} {locale === "ar" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</Link></div>
        </div>
        {/* .site-nav is hidden below 820px; without this the home page had no
            navigation at all on a phone. */}
        <nav className="container site-subnav" aria-label={locale === "ar" ? "تنقل مختصر" : "Quick navigation"}>
          <a href="#about">{t.about}</a>
          <Link href="/stories">{t.stories}</Link>
          <Link href="/seerah">{t.seerahNav}</Link>
          <a href="#journey">{t.journey}</a>
          <a href="#apps">{t.apps}</a>
        </nav>
      </header>

      <section id={MAIN_CONTENT_ID} className="hero-section">
        <div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" />
        <div className="container hero-grid">
          <div className="hero-copy"><span className="eyebrow"><Sparkles size={15} /> {t.eyebrow}</span><h1>{t.titleLineOne}<br /><em>{t.titleLineTwo}</em></h1><p>{t.intro}</p><div className="hero-actions"><Link href="/read/1" className="button button--primary">{t.startReading} <Arrow size={18} /></Link><Link href="/stories" className="button button--soft"><BookOpen size={17} aria-hidden="true" /> {t.exploreStories}</Link><a href="#journey" className="button button--soft">{t.howItWorks}</a></div><p className="hero-footnote"><LockKeyhole size={15} /> {t.safety}</p></div>
          <div className="hero-visual" aria-label={t.visualLabel}><div className="hero-moon" /><div className="yahya-character-frame"><img src={yahiaCharacterUrl} alt={t.imageAlt} /><div className="yahya-character-frame__shade" aria-hidden="true" /></div><div className="journey-card journey-card--large"><span className="journey-card__label"><Compass size={14} /> {t.map}</span><b>{t.startWhere}</b><div className="journey-card__path" aria-hidden="true"><span className="path-dot path-dot--listen" /><i /><span className="path-dot path-dot--repeat" /><i /><span className="path-dot path-dot--review" /></div><div className="journey-card__caption"><Heart size={15} fill="currentColor" /> {t.noUnlock}</div></div><div className="mini-note mini-note--audio"><Headphones size={18} /><span>{t.audio}<br /><b>{t.nowAvailable}</b></span></div><div className="mini-note mini-note--parent"><Avatar className="mini-note__avatar"><AvatarImage src={yahiaCharacterUrl} alt="" /><AvatarFallback>ي</AvatarFallback></Avatar><span>{t.withYahya}<br /><b>{t.stepByStep}</b></span></div></div>
        </div>
      </section>

      <section className="trust-strip" id="about"><div className="container trust-strip__inner"><div><BookOpen size={21} /><span><b>{t.textProof}</b> {t.unchanged}</span></div><div><Headphones size={21} /><span><b>{t.surahs}</b> {t.listening}</span></div><div><Heart size={21} /><span><b>{t.selfReview}</b> {t.noAutoJudgement}</span></div></div></section>

      <section className="section section--reader" aria-labelledby="reader-title"><div className="container"><div className="section-heading"><span className="eyebrow eyebrow--gold">{t.readerEyebrow}</span><h2 id="reader-title">{t.readerTitle}</h2><p>{t.readerIntro}</p></div>{progress && (
          <Link
            href={`/read/${progress.surah}`}
            className="mx-auto mb-6 flex max-w-md items-center gap-3 rounded-xl border border-[var(--brand-navy)]/10 bg-white/70 px-4 py-3 shadow-sm transition-colors hover:bg-white"
            data-testid="continue-reading"
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-navy)] text-[var(--brand-ivory)]"><CirclePlay size={18} aria-hidden="true" /></span>
            <span className="flex-1">
              <b className="block text-sm font-semibold text-[var(--brand-navy)]">{t.continueReading}</b>
              <small lang="ar" dir="rtl" className="block text-xs text-[var(--brand-navy)]/60">{getSurahName(progress.surah)}{progress.ayah > 0 ? ` · ${t.continueReadingAyah} ${progress.ayah}` : ` · ${t.continueReadingOf}`}</small>
            </span>
            <Arrow size={18} className="text-[var(--brand-navy)]/50" aria-hidden="true" />
          </Link>
        )}<div className="surah-grid">{featuredSurahs.map((surah) => <Link href={`/read/${surah}`} key={surah} className="surah-card"><span>{String(surah).padStart(3, "0")}</span><b lang="ar" dir="rtl">{getSurahName(surah)}</b>{locale === "en" && <small className="surah-card__translation">{featuredEnglishNames[surah]}</small>}<CirclePlay size={22} /><small>{t.readListen}</small></Link>)}</div><Link href="/read/1" className="text-link text-link--center">{t.allSurahs} <Arrow size={18} /></Link></div></section>

      <section className="section section--seerah" id="seerah" aria-labelledby="seerah-title"><div className="container"><div className="section-heading"><span className="eyebrow eyebrow--gold"><Moon size={14} aria-hidden="true" /> {t.seerahEyebrow}</span><h2 id="seerah-title">{t.seerahTitle}</h2><p lang="ar" dir="rtl">{t.seerahIntro}</p></div><ul className="story-list-grid">{seerahStations.map(station => seerahStories.find(story => story.stationId === station.stationId)).filter((story): story is NonNullable<typeof story> => Boolean(story)).map((story, index) => <li key={story.slug}><Link href={`/seerah/${story.slug}`} className="story-list-card"><div className="story-list-card__body"><span>{t.station} {seerahStations[index]?.stationId ?? index + 1} — {seerahStations[index]?.titleAr}</span><h3 lang="ar" dir="rtl">{story.title}</h3><p lang="ar" dir="rtl">{story.content.tier_1_age_6_8.narrative}</p></div></Link></li>)}</ul><Link href="/seerah" className="text-link text-link--center">{t.seerahAll} <Arrow size={18} /></Link></div></section>

      <section className="section journey-section" id="journey" aria-labelledby="journey-title"><div className="container journey-grid"><div className="journey-illustration" role="img" aria-label={t.mapDescription}><span className="journey-illustration__sun">✦</span><span className="journey-illustration__cloud journey-illustration__cloud--one" aria-hidden="true" /><span className="journey-illustration__cloud journey-illustration__cloud--two" aria-hidden="true" /><div className="journey-illustration__path" aria-hidden="true" />{t.steps.map(([number, title], index) => { const Icon = stepIcons[index]; return <div className={`journey-map-stop journey-map-stop--${index + 1}`} key={title}><span className="journey-map-stop__number">{number}</span><Icon size={17} aria-hidden="true" /><span>{title}</span></div>; })}<div className="journey-illustration__child"><Avatar><AvatarImage src={yahiaCharacterUrl} alt="" /><AvatarFallback>ي</AvatarFallback></Avatar></div><p className="journey-illustration__note">{t.mapNote}</p></div><div><span className="eyebrow eyebrow--gold">{t.journeyEyebrow}</span><h2 id="journey-title">{t.journeyTitle}</h2><div className="step-list">{t.steps.map(([number, title, detail], index) => { const Icon = stepIcons[index]; return <div key={title}><span>{number}</span><div><b><Icon size={15} aria-hidden="true" /> {title}</b><p>{detail}</p></div></div>; })}</div></div></div></section>

      <section className="section parent-section"><div className="container parent-card"><div><span className="eyebrow eyebrow--gold">{t.familyEyebrow}</span><h2>{t.familyTitle}</h2><p>{t.familyBody}</p></div><div className="parent-statboard" aria-label={locale === "ar" ? "معاينة غير متصلة للبيانات المستقبلية" : "A preview of future connected information"}><div><span>{t.familyCardOne}</span><b>{t.familyCardOneValue}</b></div><div><span>{t.familyCardTwo}</span><b>{t.familyCardTwoValue}</b></div><div className="parent-statboard__profile"><Avatar><AvatarImage src={yahiaCharacterUrl} alt="" /><AvatarFallback>ي</AvatarFallback></Avatar><span>{t.familyProfile}</span></div></div></div></section>

      <section className="section account-section" id="account" aria-labelledby="account-title"><div className="container account-card"><div><span className="eyebrow eyebrow--gold">{t.accountEyebrow}</span><h2 id="account-title">{t.accountTitle}</h2><p>{t.accountBody}</p></div><div className="account-actions"><Link href="/register" className="button button--primary" data-testid="home-register"><LogIn size={17} aria-hidden="true" /> {t.register}</Link><p className="account-actions__note">{t.haveAccount} <Link href="/login" className="text-link" data-testid="home-login">{t.signIn} <Arrow size={16} /></Link></p></div></div></section>

      <section className="section apps-section" id="apps"><div className="container apps-grid"><div><span className="eyebrow eyebrow--gold">{t.appsEyebrow}</span><h2>{t.appsTitle}</h2><p>{t.appsBody}</p><Link href="/read/1" className="text-link">{t.openReader} <Arrow size={18} /></Link></div><div className="store-stack"><ComingSoonStoreCard platform="Android" locale={locale} /><ComingSoonStoreCard platform="iOS" locale={locale} /></div></div></section>
      <footer className="site-footer"><div className="container site-footer__inner"><div className="brand-mark"><span className="brand-mark__seal">ي</span><span><b>Yahya</b> Quran Academy</span></div><p>{t.footer}</p><Link href="/read/1" className="text-link">{t.reader} <Arrow size={16} /></Link></div></footer>
    </main>
  );
}
