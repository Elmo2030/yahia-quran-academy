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
import { MobileMenu } from "@/components/MobileMenu";
import { SiteChrome } from "@/components/SiteChrome";
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
      "يضم الموقع محتوى متنوعًا للأطفال من سن 6 إلى 11 سنة، ومعظمه يُقرأ مع وليّ الأمر للأصغر سنًا. من القرآن الكريم وقصص القرآن، إلى السيرة النبوية، والعقيدة، وغيرها من الموضوعات التي تساعد الطفل على التعلّم والفهم بطريقة تناسب مرحلته العمرية.",
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
    craftTitle: "كيف نصنع المحتوى؟",
    craftLead:
      "كل بطاقة في «في رحاب القرآن» والعقيدة، وكل قصة في قصص القرآن والسيرة، تحمل تحتها مصدرها وعلامة تقول إلى أي حدّ هو مستقرّ. وهذه هي العلامتان:",
    craftGreen: "ثابت بنصّ آية، أو بحديث في كتب الصحيح، أو بعدٍّ أجريناه بأنفسنا على النص العثماني الذي يعرضه الموقع.",
    craftGreenLabel: "🟢 مستقرّ",
    craftAmberLabel: "🟡 بانتظار مراجعة أهل العلم",
    craftAmber:
      "معلومة اختلف فيها أهل العلم، أو اشتهرت بلا إسناد. تبقى ظاهرة ومعها بيان موضع الخلاف، ولا تُعرض على الطفل بثقة ليست لها.",
    craftCount:
      "الأرقام التي يمكن عدّها — عدد الآيات، وتكرار كلمة، وعدد السور التي تبدأ بشيء — عددناها في نص المصحف نفسه ولم نأخذها من غيرنا.",
    craftMissing:
      "وفي قصص القرآن نقول صراحةً ما ليس في القرآن: أسماء مثل حواء وسارة وبلقيس وآسية لم يذكرها القرآن وإنما جاءت في السنة وكتب التفسير، وقصة هاجر تفصيلها في صحيح البخاري لا في القرآن. كل قصة تقول ذلك تحتها.",
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
      "The website offers a variety of educational content for children aged 6 to 11 — read together with a parent for the younger ones — including the Quran and Quranic stories, the Seerah (life of Prophet Muhammad ﷺ), Aqidah (Islamic creed), and other essential Islamic topics presented in a way that is appropriate for their age and stage of development.",
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
    craftTitle: "How the content is made",
    craftLead:
      "Every card in the Quran facts and the creed section, and every story in the Quran stories and the Seerah, carries its source underneath and a mark saying how settled it is. The two marks are these:",
    craftGreenLabel: "🟢 Settled",
    craftGreen:
      "Established by the words of a verse, by a hadith in the authentic collections, or by a count we ran ourselves over the Uthmani text this site serves.",
    craftAmberLabel: "🟡 Awaiting a scholar\u2019s review",
    craftAmber:
      "Something scholars differ over, or a claim that became familiar without a chain. It stays visible, with the disagreement named, and is never told to a child with a confidence it has not earned.",
    craftCount:
      "Anything countable — the number of verses, how often a word occurs, how many surahs open a certain way — we counted in the text of the mushaf itself rather than taking someone else\u2019s figure.",
    craftMissing:
      "In the Quran stories we say plainly what is not in the Quran: names such as Hawwa, Sarah, Bilqis and Asiyah are not given there but come from the sunnah and the commentaries, and the fuller account of Hajar is in Sahih al-Bukhari rather than the Quran. Each story says so underneath.",
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
      <SiteChrome />

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

            {/* What the reliability marks mean. A parent handing a child a
                site of religious facts deserves to be told the method, not
                just reassured about it. */}
            <section className="about-block" aria-labelledby="craft-title">
              <span className="eyebrow eyebrow--gold"><ShieldCheck size={15} aria-hidden="true" /> {t.craftTitle}</span>
              <h2 id="craft-title">{t.craftTitle}</h2>
              <p>{t.craftLead}</p>
              <dl className="about-marks">
                <dt>{t.craftGreenLabel}</dt>
                <dd>{t.craftGreen}</dd>
                <dt>{t.craftAmberLabel}</dt>
                <dd>{t.craftAmber}</dd>
              </dl>
              <p>{t.craftCount}</p>
              <p>{t.craftMissing}</p>
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
