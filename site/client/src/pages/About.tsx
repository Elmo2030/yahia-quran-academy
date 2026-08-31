// =============================================================================
// About — who the site is for, and the dedication it was built as.
//
// The Arabic and the English are both the site author's own words, kept as
// written. This is a memorial to his parents and a supplication for them; it
// is not paraphrased or shortened here, and should not be edited without him.
// The du'a is written in the dual, because it is for two people.
// =============================================================================

import { Link } from "wouter";
import { BookOpen, ChevronLeft, ChevronRight, Heart, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";

/** Written as the author writes them, in each language. */
const PARENTS = {
  ar: ["د. محمد يحيى عباس عبود", "م. ماجدة موسى محمد"],
  en: ["Dr. Mohamed Yahya Abbas Aboud", "Eng. Magda Moussa Mohamed"],
} as const;

const DUA =
  "اللهم اغفر لهما وارحمهما، وعافهما واعفُ عنهما، وأكرم نزلهما، ووسّع مدخلهما، واجعل هذا العمل صدقة جارية لهما، واجعل كل علم ينتفع به الأطفال في ميزان حسناتهما.";

/** Egypt. wa.me needs the number in E.164 with no plus or separators. */
const WHATSAPP_DISPLAY = "002-01144666684";
const WHATSAPP_LINK = "https://wa.me/201144666684";

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
    sadaqaLead: "تم إنشاء هذا الموقع صدقة جارية على روح والديّ،",
    sadaqaAnd: "و",
    sadaqaAfter: "رحمهما الله.",
    sadaqaBody:
      "نسأل الله أن يتقبل هذا العمل، وأن يجعله في ميزان حسناتهما، وأن ينفع به أبناء المسلمين.",
    sadaqaAsk: "نرجو منكم التكرم بقراءة الفاتحة والدعاء لهما بالرحمة والمغفرة والعفو.",
    duaLabel: "دعاء",
    accuracyTitle: "دقة المحتوى ومراجعة المعلومات",
    accuracyOne:
      "حرصنا على أن تتم مراجعة المعلومات والمحتوى المنشور على الموقع، والتأكد من مصادره قدر الإمكان، بهدف تقديم محتوى موثوق ومناسب للأطفال.",
    accuracyTwo: "ومع ذلك، فإننا نرحب بكل ملاحظة أو تصحيح أو تنبيه من أهل العلم والمتخصصين والزوار.",
    accuracyThree:
      "إذا لاحظت أي معلومة تحتاج إلى مراجعة، أو لديك ملاحظة تتعلق بالمحتوى أو المصادر، نرجو التواصل مع إدارة الموقع، وسنقوم بمراجعتها بعناية.",
    contactTitle: "تواصل معنا",
    contactBody: "للملاحظات والتصحيحات، راسلنا على واتساب:",
    contactCta: "راسلنا على واتساب",
    closing:
      "نسأل الله أن يجعل هذا الموقع علمًا نافعًا، وأن يكون سببًا في أن ينشأ أبناؤنا على حب القرآن، ومعرفة سيرة نبينا ﷺ، وفهم دينهم والاعتزاز به.",
    plaquePrefix: "رحم الله",
    plaqueSuffix: "وجعل هذا العمل صدقة جارية لهما.",
    exploreStories: "استكشف القصص",
    openReader: "افتح القارئ",
  },
  en: {
    home: "Home",
    stories: "Quran stories",
    seerah: "The Prophet’s Seerah",
    reader: "Open the reader",
    eyebrow: "About us",
    title: "Yahya Kids Islamic Learning Website",
    intro:
      "An educational project dedicated to providing simple and engaging Islamic content for children, helping them learn about their faith and build a strong foundation of Islamic knowledge from an early age.",
    scope:
      "The website offers a variety of educational content for children aged 5 to 10, including the Quran and Quranic stories, the Seerah (life of Prophet Muhammad ﷺ), Aqidah (Islamic creed), and other essential Islamic topics presented in a way that is appropriate for their age and stage of development.",
    sadaqaTitle: "A Sadaqah Jariyah",
    sadaqaLead:
      "This website was created as a Sadaqah Jariyah (ongoing charity) in memory of my parents,",
    sadaqaAnd: "and",
    sadaqaAfter: "may Allah have mercy on them.",
    sadaqaBody:
      "We ask Allah to accept this work, make it a source of ongoing reward for them, and allow it to benefit Muslim children and families.",
    sadaqaAsk:
      "We kindly ask you to recite Surah Al-Fatihah and make dua for them, asking Allah to grant them mercy, forgiveness, and pardon.",
    duaLabel: "A prayer for them",
    duaMeaning:
      "O Allah, forgive them and have mercy upon them, pardon them and grant them well-being, honor their resting place, and make this work a lasting charity on their behalf. May every piece of beneficial knowledge that children learn through this website be added to their scale of good deeds.",
    accuracyTitle: "Content Accuracy & Sources",
    accuracyOne:
      "We have made every effort to review the information and content published on the website and verify its sources, with the goal of providing reliable and age-appropriate Islamic educational content for children.",
    accuracyTwo:
      "Nevertheless, we welcome any feedback, correction, or notification from scholars, specialists, parents, and visitors.",
    accuracyThree:
      "If you notice any information that you believe requires review, or if you have any feedback regarding the content or its sources, please contact the website administration. We will carefully review your comments and take appropriate action when necessary.",
    contactTitle: "Contact us",
    contactBody: "For feedback and corrections, message us on WhatsApp:",
    contactCta: "Message us on WhatsApp",
    closing:
      "We ask Allah to make this website a source of beneficial knowledge and to make it a means for our children to grow up loving the Quran, learning about the life of our beloved Prophet Muhammad ﷺ, understanding their faith, and taking pride in their Islamic identity.",
    plaquePrefix: "May Allah have mercy on",
    plaqueSuffix: "and make this work a Sadaqah Jariyah on their behalf.",
    exploreStories: "Explore the stories",
    openReader: "Open the reader",
  },
} as const;

export default function About() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const [father, mother] = PARENTS[locale];
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
              <h2 id="sadaqa-title">{t.sadaqaLead}</h2>
              <p className="about-names">
                <b>{father}</b>
                <span aria-hidden="true"> {t.sadaqaAnd} </span>
                <b>{mother}</b>
                <span className="about-names__rahma">&nbsp;{t.sadaqaAfter}</span>
              </p>
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

            <section className="about-block about-contact" aria-labelledby="contact-title">
              <span className="eyebrow eyebrow--gold"><MessageCircle size={15} aria-hidden="true" /> {t.contactTitle}</span>
              <h2 id="contact-title">{t.contactTitle}</h2>
              <p>{t.contactBody}</p>
              <a
                href={WHATSAPP_LINK}
                className="button button--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} aria-hidden="true" /> {t.contactCta}
                <span className="about-contact__number" dir="ltr">{WHATSAPP_DISPLAY}</span>
              </a>
            </section>

            <p className="about-closing">{t.closing}</p>

            <p className="about-plaque">
              {t.plaquePrefix} <b>{father}</b> <span aria-hidden="true">{t.sadaqaAnd}</span> <b>{mother}</b>، {t.plaqueSuffix}
            </p>

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
