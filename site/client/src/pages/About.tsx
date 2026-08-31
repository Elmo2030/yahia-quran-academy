// =============================================================================
// About — who the site is for, and the dedication it was built as.
//
// The Arabic is the text as written by the site's author, word for word. It is
// a memorial and a supplication; it is not paraphrased or shortened here, and
// it should not be edited without them. The English is a translation of the
// same, with the du'a kept in Arabic — it is recited in Arabic — and its
// meaning given underneath.
// =============================================================================

import { Link } from "wouter";
import { BookOpen, ChevronLeft, ChevronRight, Heart, ShieldCheck, Sparkles } from "lucide-react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";

const DUA =
  "اللهم اغفر له وارحمه، وعافه واعفُ عنه، وأكرم نزله، ووسع مدخله، واجعل هذا العمل صدقة جارية له، واجعل كل علم ينتفع به الأطفال في ميزان حسناته.";

/** Written as the author writes it, in each language. */
const FATHER = { ar: "د. محمد يحيى عباس عبود", en: "Dr. Mohamed Yahya Abbas Aboud" } as const;

const copy = {
  ar: {
    home: "الرئيسية",
    stories: "قصص القرآن",
    seerah: "السيرة النبوية",
    reader: "افتح القارئ",
    eyebrow: "من نحن",
    title: "موقع يحيى لتعليم الأطفال",
    intro:
      "مشروع تعليمي يهدف إلى تقديم محتوى إسلامي مبسط ومناسب للأطفال، يساعدهم على التعرّف إلى دينهم وبناء أساس قوي من المعرفة الإسلامية منذ الصغر.",
    scope:
      "يضم الموقع محتوى متنوعًا للأطفال من سن 5 إلى 10 سنوات، من القرآن الكريم وقصص القرآن، إلى السيرة النبوية، والعقيدة، وغيرها من الموضوعات التي تساعد الطفل على التعلّم والفهم بطريقة تناسب مرحلته العمرية.",
    sadaqaTitle: "صدقة جارية",
    sadaqaLead: "تم إنشاء هذا الموقع صدقة جارية على روح والدي،",
    sadaqaAfter: "رحمه الله.",
    sadaqaBody:
      "نسأل الله أن يتقبل هذا العمل، وأن يجعله في ميزان حسناته، وأن ينفع به أبناء المسلمين.",
    sadaqaAsk:
      "نرجو منكم التكرم بقراءة الفاتحة والدعاء له بالرحمة والمغفرة والعفو.",
    duaLabel: "دعاء",
    accuracyTitle: "دقة المحتوى ومراجعة المعلومات",
    accuracyOne:
      "حرصنا على أن تتم مراجعة المعلومات والمحتوى المنشور على الموقع، والتأكد من مصادره قدر الإمكان، بهدف تقديم محتوى موثوق ومناسب للأطفال.",
    accuracyTwo:
      "ومع ذلك، فإننا نرحب بكل ملاحظة أو تصحيح أو تنبيه من أهل العلم والمتخصصين والزوار.",
    accuracyThree:
      "إذا لاحظت أي معلومة تحتاج إلى مراجعة، أو لديك ملاحظة تتعلق بالمحتوى أو المصادر، نرجو التواصل مع إدارة الموقع، وسنقوم بمراجعتها بعناية.",
    closing:
      "نسأل الله أن يجعل هذا الموقع علمًا نافعًا، وأن يكون سببًا في أن ينشأ أبناؤنا على حب القرآن، ومعرفة سيرة نبينا ﷺ، وفهم دينهم والاعتزاز به.",
    plaque: "رحم الله د. محمد يحيى عباس عبود، وجعل هذا العمل صدقة جارية له.",
    exploreStories: "استكشف القصص",
    openReader: "افتح القارئ",
  },
  en: {
    home: "Home",
    stories: "Quran stories",
    seerah: "The Prophet\u2019s Seerah",
    reader: "Open the reader",
    eyebrow: "About us",
    title: "Yahya Kids Islamic Learning Website",
    intro:
      "An educational project dedicated to providing simple and engaging Islamic content for children, helping them learn about their faith and build a strong foundation of Islamic knowledge from an early age.",
    scope:
      "The website offers a variety of educational content for children aged 5 to 10, including the Quran and Quranic stories, the Seerah (life of Prophet Muhammad \uFDFA), Aqidah (Islamic creed), and other essential Islamic topics presented in a way that is appropriate for their age and stage of development.",
    sadaqaTitle: "A Sadaqah Jariyah",
    sadaqaLead:
      "This website was created as a Sadaqah Jariyah (ongoing charity) in memory of my father,",
    sadaqaAfter: "may Allah have mercy on him.",
    sadaqaBody:
      "We ask Allah to accept this work, make it a source of ongoing reward for him, and allow it to benefit Muslim children and families.",
    sadaqaAsk:
      "We kindly ask you to recite Surah Al-Fatihah and make dua for him, asking Allah to grant him mercy, forgiveness, and pardon.",
    duaLabel: "A prayer for him",
    duaMeaning:
      "O Allah, forgive him and have mercy upon him, pardon him and grant him well-being, honor his resting place, and make this work a lasting charity on his behalf. May every piece of beneficial knowledge that children learn through this website be added to his scale of good deeds.",
    accuracyTitle: "Content Accuracy & Sources",
    accuracyOne:
      "We have made every effort to review the information and content published on the website and verify its sources, with the goal of providing reliable and age-appropriate Islamic educational content for children.",
    accuracyTwo:
      "Nevertheless, we welcome any feedback, correction, or notification from scholars, specialists, parents, and visitors.",
    accuracyThree:
      "If you notice any information that you believe requires review, or if you have any feedback regarding the content or its sources, please contact the website administration. We will carefully review your comments and take appropriate action when necessary.",
    closing:
      "We ask Allah to make this website a source of beneficial knowledge and to make it a means for our children to grow up loving the Quran, learning about the life of our beloved Prophet Muhammad \uFDFA, understanding their faith, and taking pride in their Islamic identity.",
    plaque:
      "May Allah have mercy on Dr. Mohamed Yahya Abbas Aboud and make this work a Sadaqah Jariyah on his behalf.",
    exploreStories: "Explore the stories",
    openReader: "Open the reader",
  },
} as const;

export default function About() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;

  return (
    <main className="site-shell" dir={direction}>
      <SkipLink />
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="brand-mark" aria-label={t.home}>
            <span className="brand-mark__seal">ي</span>
            <span><b>Yahya</b> Quran Academy</span>
          </Link>
          <nav aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"} className="site-nav">
            <Link href="/stories">{t.stories}</Link>
            <Link href="/seerah">{t.seerah}</Link>
          </nav>
          <div className="header-actions">
            <LanguageToggle compact />
            <Link href="/read/1" className="header-reader-link">{t.reader}</Link>
          </div>
        </div>
      </header>

      <div id={MAIN_CONTENT_ID}>
        <section className="stories-list-hero">
          <div className="container">
            <span className="eyebrow eyebrow--gold"><Sparkles size={15} aria-hidden="true" /> {t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
          </div>
        </section>

        <section className="section">
          <div className="container about-layout">
            <p className="about-lead">{t.scope}</p>

            <article className="about-dedication" aria-labelledby="sadaqa-title">
              <span className="eyebrow eyebrow--gold"><Heart size={15} aria-hidden="true" /> {t.sadaqaTitle}</span>
              <h2 id="sadaqa-title">
                {t.sadaqaLead} <b {...(locale === "ar" ? { lang: "ar", dir: "rtl" as const } : {})}>{FATHER[locale]}</b> {t.sadaqaAfter}
              </h2>
              <p>{t.sadaqaBody}</p>
              <p className="about-ask">{t.sadaqaAsk}</p>

              <figure className="about-dua">
                <figcaption>{t.duaLabel}</figcaption>
                <blockquote lang="ar" dir="rtl">{DUA}</blockquote>
                {locale === "en" && <p className="about-dua__meaning">{copy.en.duaMeaning}</p>}
              </figure>
            </article>

            <section className="about-block" aria-labelledby="accuracy-title">
              <span className="eyebrow eyebrow--gold"><ShieldCheck size={15} aria-hidden="true" /> {t.accuracyTitle}</span>
              <h2 id="accuracy-title">{t.accuracyTitle}</h2>
              <p>{t.accuracyOne}</p>
              <p>{t.accuracyTwo}</p>
              <p>{t.accuracyThree}</p>
            </section>

            <p className="about-closing">{t.closing}</p>

            <p className="about-plaque" lang={locale} dir={direction}>{t.plaque}</p>

            <div className="about-actions">
              <Link href="/stories" className="button button--primary"><BookOpen size={17} aria-hidden="true" /> {t.exploreStories}</Link>
              <Link href="/read/1" className="button button--soft">{t.openReader} <Arrow size={17} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="brand-mark"><span className="brand-mark__seal">ي</span><span><b>Yahya</b> Quran Academy</span></div>
          <Link href="/" className="text-link">{t.home}</Link>
        </div>
      </footer>
    </main>
  );
}
