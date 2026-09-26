import { Link, useRoute } from "wouter";
import { ArrowLeft, BookOpen } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { RetroAudioPlayer } from "@/components/RetroAudioPlayer";
import { useLocale } from "@/contexts/LocaleContext";
import { namesOfAllah, type NameOfAllah } from "@/content/names-of-allah";
import "./companions.css";
import "./names-of-allah.css";

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return <>{paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</>;
}

// Flip to true once client/public/stories/names-of-allah/audio/all-names.mp3
// exists (converted and sanity-checked the same way every other narration on
// this site is, before it is ever linked from a live page).
const COMBINED_AUDIO_AVAILABLE = false;

function Hub() {
  return <>
    <header className="companions-hero">
      <span className="eyebrow">أسماء الله الحسنى</span>
      <h1>أسماء الله الحسنى</h1>
      <p>لله تسعة وتسعون اسمًا، كل اسم منها يخبرنا عن صفة من صفاته الجميلة. نتعرّف عليها اسمًا اسمًا، ونتعلّم كيف نعيش بمعناها.</p>
    </header>

    {COMBINED_AUDIO_AVAILABLE && (
      <RetroAudioPlayer
        src="/stories/names-of-allah/audio/all-names.mp3"
        title="استمع إلى الأسماء الحسنى كاملة"
        seekLabel="موضع التشغيل في المقطع الصوتي"
      />
    )}

    <section className="companions-intro" aria-labelledby="names-intro-title">
      <div className="companions-intro__heading">
        <span className="eyebrow">حديث النبي ﷺ</span>
        <h2 id="names-intro-title">«إنّ لله تسعة وتسعين اسمًا، من أحصاها دخل الجنة»</h2>
      </div>
      <div className="companions-intro__story">
        <p>الترتيب هنا هو الترتيب المشهور المروي عن الترمذي، وهو الأكثر تداولًا؛ توجد صياغات أخرى عند بعض العلماء.</p>
        <p>{namesOfAllah.filter(n => n.status === "ready").length} من ٩٩ اسمًا فيها الآن قصة كاملة وسؤال ونشاط، والباقي قيد الإعداد ويُضاف تباعًا.</p>
      </div>
    </section>

    <ol className="companions-grid names-grid" aria-label="أسماء الله الحسنى">
      {namesOfAllah.map(name => (
        <li key={name.slug}>
          <Link href={`/names-of-allah/${name.slug}`} className="companion-card names-card">
            <span className="companion-card__number">{name.order}</span>
            <h2 dir="rtl">{name.arabic}</h2>
            <p className="companion-card__title" dir="ltr">{name.transliteration}</p>
            <p className="companion-traits">{name.meaning}</p>
            <span className="companion-status">{name.status === "ready" ? "اقرأ القصة ←" : "قيد الإعداد"}</span>
          </Link>
        </li>
      ))}
    </ol>
  </>;
}

function NameDetail({ name }: { name: NameOfAllah }) {
  const index = namesOfAllah.findIndex(n => n.slug === name.slug);
  const next = namesOfAllah[index + 1];
  return <article>
    <header className="companions-hero">
      <Link href="/names-of-allah" className="text-link">العودة إلى أسماء الله الحسنى</Link>
      <p className="eyebrow">الاسم {name.order} من ٩٩</p>
      <h1 dir="rtl">{name.arabic}</h1>
      <p className="companion-traits" dir="ltr">{name.transliteration}</p>
    </header>
    <div className="companion-reading">
      <section><h2>المعنى</h2><p>{name.meaning}</p></section>
      {name.status === "coming-soon" ? (
        <section role="status"><h2>قيد الإعداد</h2><p>القصة الكاملة والنشاط لهذا الاسم لم يُكتبا بعد، حتى لا نعرض محتوى غير مراجَع. تابعنا قريبًا.</p></section>
      ) : <>
        {name.sections.map((section, i) => <section key={i}>
          {section.title && <h2>{section.title}</h2>}<Prose paragraphs={section.paragraphs} />
        </section>)}
        {name.tryToday.length > 0 && <section className="companion-action"><h2>جرّبها اليوم</h2><Prose paragraphs={name.tryToday} /></section>}
        {name.reflectionQuestion && <section className="companion-challenge"><span className="eyebrow">يحيى يسأل</span><h2>{name.reflectionQuestion}</h2></section>}
        {name.sources.length > 0 && <details className="companion-details"><summary>المصادر • للوالدين والمعلمين</summary>
          <ul>{name.sources.map((s, i) => <li key={i}><b>{s.type === "quran" ? "القرآن" : "مرجع حديثي"}</b>: {s.reference}</li>)}</ul>
        </details>}
      </>}
      <nav className="companion-next" aria-label="واصل رحلتك">
        {next && <Link className="button button--primary" href={`/names-of-allah/${next.slug}`}>الاسم التالي: {next.arabic} <ArrowLeft size={18} /></Link>}
        <Link href="/names-of-allah" className="button button--soft">كل الأسماء</Link>
      </nav>
    </div>
  </article>;
}

export default function NamesOfAllah() {
  const [, params] = useRoute("/names-of-allah/:slug");
  const slug = params?.slug;
  const { locale, direction } = useLocale();
  const name = slug ? namesOfAllah.find(n => n.slug === slug) : undefined;
  return <main className="site-shell" dir={direction}><SkipLink /><SiteChrome />
    <div id={MAIN_CONTENT_ID} className="companions-page container" lang="ar" dir="rtl">
      {locale === "en" && <p className="companion-language" lang="en" dir="ltr">This section is available in Arabic. An English edition requires editorial review.</p>}
      <Link className="text-link" href="/journey"><BookOpen size={17} aria-hidden="true" /> رحلتي</Link>
      {!slug ? <Hub /> : name ? <NameDetail key={slug} name={name} /> : <section><h1>لم نجد هذا الاسم</h1><Link className="button button--primary" href="/names-of-allah">العودة إلى أسماء الله الحسنى</Link></section>}
    </div><SiteFooter />
  </main>;
}
