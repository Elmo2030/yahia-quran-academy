import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Check, ArrowLeft, BookOpen } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { BadgeAward } from "@/components/BadgeAward";
import { CompanionSymbol } from "@/components/companions/CompanionSymbol";
import { RetroAudioPlayer } from "@/components/RetroAudioPlayer";
import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { useLearningStep } from "@/hooks/useLearningStep";
import { activeProfile } from "@/lib/hifz-store";
import { companionIndex } from "@/lib/companion-index.generated";
import { nextCompanion } from "@/lib/companions-progress";
import { loadCompanion, type CompanionStory } from "@/content/companions";
import { narratedCompanions } from "@/lib/narration.generated";
import "./companions.css";

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return <>{paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</>;
}

function CompanionArt({ slug, symbol, variant = "card" }: { slug: string; symbol: string; variant?: "card" | "hero" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <CompanionSymbol symbol={symbol} />;
  return (
    <figure className={`companion-art companion-art--${variant}`}>
      <img
        src={`/stories/companions/${slug}.webp`}
        alt=""
        loading={variant === "card" ? "lazy" : "eager"}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </figure>
  );
}

// Only render the player where a recording actually exists. The list is
// generated from the audio folder (scripts/build-narration-index.mjs), so a
// new recording needs no change here.
const COMPANION_AUDIO_SLUGS = new Set(narratedCompanions);

function CompanionNarration({ slug }: { slug: string }) {
  if (!COMPANION_AUDIO_SLUGS.has(slug)) return null;
  return <RetroAudioPlayer src={`/stories/companions/audio/${slug}.mp3`} title="استمع إلى القصة" seekLabel="موضع التشغيل في القصة" />;
}

function Hub() {
  const { store } = useHifzStore();
  const profile = activeProfile(store);
  const steps = profile?.character !== "guest" ? profile?.steps ?? {} : {};
  const next = nextCompanion(profile);
  const done = companionIndex.filter(c => steps[`companions:${c.slug}`]?.status === "done");
  return <>
    <header className="companions-hero">
      <span className="eyebrow">أشخاص حقيقيون • مواقف نتعلّم منها</span>
      <h1>الصحابة</h1>
      <p>نتعرّف على صحابة رسول الله ﷺ وصحابياته، ونرى كيف تظهر القيم الجميلة في أفعالهم.</p>
      {next ? <Link className="button button--primary" href={`/companions/${next.slug}`}>{steps[`companions:${next.slug}`]?.status === "in_progress" ? "تابع" : "اكتشف"}: {next.name} <ArrowLeft size={18} /></Link> : <p role="status">أكملت هذه المجموعة. أي قصة تحب أن تقرأها مجددًا؟</p>}
      {done.length > 0 && <p>{done.length} من {companionIndex.length} قصص أكملتها</p>}
    </header>

    <section className="companions-intro" aria-labelledby="companions-intro-title">
      <div className="companions-intro__heading">
        <span className="eyebrow">صحابة رسول الله ﷺ</span>
        <h2 id="companions-intro-title">نجومٌ من حول النبي ﷺ</h2>
      </div>

      <div className="companions-intro__story">
        <p className="companions-intro__lead">هل نظرت يومًا إلى السماء في ليلة صافية؟</p>
        <p>سترى نجومًا كثيرة، ولكل نجمة مكانها ونورها.</p>
        <p>وهكذا، عندما نقرأ قصص أصحاب رسول الله ﷺ، نجد رجالًا ونساءً عاشوا حول النبي ﷺ، وتعلموا منه، ثم ترك كل واحد منهم قصة مختلفة نتعلم منها.</p>

        <p>ستقابل هنا <strong>أبا بكر</strong> في رحلة الهجرة، وتتعلم معنى الوفاء والثقة بالله.</p>
        <p>وسترى <strong>عمر</strong> وهو يفكر في مستقبل القرآن، و<strong>عثمان</strong> وهو يعمل على جمع المسلمين على المصحف، و<strong>عليًا</strong> وهو يحمل الراية بشجاعة.</p>
        <p>ستتعرف إلى <strong>خديجة</strong> وهي تساند النبي ﷺ في بداية الوحي، و<strong>بلال</strong> وهو يثبت على إيمانه، و<strong>مصعب</strong> وهو يترك الكثير من أجل ما آمن به، و<strong>زيد بن ثابت</strong> وهو يحمل واحدة من أعظم مسؤوليات حفظ القرآن.</p>

        <div className="companions-intro__human">
          <p><strong>ولم يكن الصحابة أبطالًا خياليين لا يخطئون.</strong></p>
          <p>كانوا بشرًا حقيقيين.</p>
          <p>واجهوا الخوف والصعوبات والخسارة والاختيارات الصعبة، وتعلموا من رسول الله ﷺ كيف يعبدون الله، وكيف يعاملون الناس، وكيف يحولون إيمانهم إلى أفعال.</p>
        </div>

        <div className="companions-intro__questions">
          <p className="companions-intro__questions-title">وفي كل قصة سنسأل:</p>
          <ul>
            <li>من كان هذا الصحابي؟</li>
            <li>ما الموقف الذي مر به؟</li>
            <li>ماذا اختار أن يفعل؟</li>
            <li>وماذا يمكنني أنا أن أتعلم منه اليوم؟</li>
          </ul>
        </div>

        <div className="companions-intro__journey">
          <p><strong>استعد لرحلة إلى زمن رسول الله ﷺ...</strong></p>
          <p>رحلة فيها غار، وهجرة، ومسجد يُبنى، وقرآن يُجمع، ومدن جديدة، ومواقف صغيرة صنعت آثارًا كبيرة.</p>
        </div>

        <p>وفي نهاية كل قصة، ربما تكتشف أن البطولة لا تعني أن تكون الأقوى دائمًا.</p>

        <ul className="companions-intro__heroism" aria-label="صور من البطولة">
          <li>فقد تكون البطولة في كلمة صادقة.</li>
          <li>أو صديق لا يترك صاحبه.</li>
          <li>أو علم تتعلمه ثم تعلمه لغيرك.</li>
          <li>أو أمانة تحفظها عندما لا يراك أحد.</li>
          <li>أو اختيار للخير في اللحظة التي يكون فيها الاختيار صعبًا.</li>
        </ul>

        <p className="companions-intro__closing"><strong>هيا نفتح أول قصة، ونتعرف إلى الجيل الذي عاش مع رسول الله ﷺ وحمل إلينا الكثير مما تعلمه منه.</strong></p>
      </div>
    </section>

    <ol className="companions-grid" aria-label="قصص الصحابة">
      {companionIndex.map(story => {
        const status = steps[`companions:${story.slug}`]?.status;
        return <li key={story.slug}><Link href={`/companions/${story.slug}`} className="companion-card">
          <CompanionArt slug={story.slug} symbol={story.icon} />
          <span className="companion-card__number">{story.order}</span>
          <h2>{story.name}</h2><p className="companion-card__title">{story.title}</p>
          <p className="companion-traits">{story.traits.join(" • ")}</p>
          <span className="companion-status">{status === "done" ? <><Check size={17} /> أكملت القصة • اقرأ مجددًا</> : status === "in_progress" ? "بدأتها • تابع القصة" : "اقرأ القصة ←"}</span>
        </Link></li>;
      })}
    </ol>
    {done.length > 0 && <section className="companion-collection"><h2>قيم اكتشفتها</h2><p>تذكارات القصص التي أكملتها؛ نواصل التدرّب على هذه القيم في حياتنا.</p>
      <ul>{done.map(c => <li key={c.slug}><Link href={`/companions/${c.slug}`}>{c.traits[0]} — {c.name}</Link></li>)}</ul>
    </section>}
  </>;
}

export function CompanionDetail({ story }: { story: CompanionStory }) {
  const { tried, won, answer, saveFailed, retrySave } = useLearningStep("companions", story.slug, story.challenge.correctAnswer);
  const { store } = useHifzStore();
  const profile = activeProfile(store);
  const next = nextCompanion(profile);
  const following = next?.slug !== story.slug ? next : companionIndex.find(c => c.order > story.order);
  return <article>
    <header className="companions-hero">
      <Link href="/companions" className="text-link">العودة إلى الصحابة</Link>
      <CompanionArt slug={story.slug} symbol={story.icon} variant="hero" />
      <p className="eyebrow">{story.name}</p><h1>{story.title}</h1>
      <p className="companion-traits">{story.traits.join(" • ")}</p>
      <span className="companion-status">{won ? "أكملت القصة" : "اقرأ القصة، ثم جرّب سؤال الفهم"}</span>
    </header>
    <div className="companion-reading">
      <CompanionNarration slug={story.slug} />
      {story.sections.map((section, i) => <section key={i} className={section.title === story.keyMoment ? "companion-key-moment" : undefined}>
        {section.title && <h2>{section.title}</h2>}<Prose paragraphs={section.paragraphs} />
      </section>)}
      <section className="companion-action"><h2>جرّبها اليوم</h2><Prose paragraphs={story.tryToday} /></section>
      <section className="companion-challenge" aria-labelledby="companion-question">
        <span className="eyebrow">يحيى يسأل</span><h2 id="companion-question">{story.challenge.question}</h2>
        <p>اختر إجابتك. يمكنك الرجوع إلى القصة والمحاولة مجددًا.</p>
        <ul className="seerah-options">{story.challenge.options.map((option, i) => <li key={option}>
          <button className={`button button--soft seerah-option${won && i === story.challenge.correctAnswer ? " is-correct" : tried.includes(i) ? " is-wrong" : ""}`} disabled={won || tried.includes(i)} onClick={() => answer(i)}>
            {option}{won && i === story.challenge.correctAnswer && <Check size={18} aria-hidden="true" />}
          </button>
        </li>)}</ul>
        <p role="status">{won ? "أحسنت! أكملت القصة وسؤال الفهم." : tried.length ? "جرّب مرة أخرى؛ ابحث عن الإجابة في القصة." : ""}</p>
        {won && <BadgeAward badge={story.traits[0]} label="قيمة اكتشفتها" note="إكمال القصة بداية للتعلّم، وليس حكمًا على إتقان القيمة." />}
        {!profile || profile.character === "guest" ? <p>اختر ملف طفل حتى يبقى تقدمك محفوظًا على هذا الجهاز. <Link href="/hifz">اختيار الطفل</Link></p> : null}
        {saveFailed && <div role="alert">تعذّر حفظ تقدمك على هذا الجهاز. <button className="button button--soft" onClick={retrySave}>أعد محاولة الحفظ</button></div>}
      </section>
      <details className="companion-details"><summary>نفكّر ونتحدث معًا</summary><ol>{story.questions.slice(1).filter(q => !story.adultQuestions.includes(q)).map(q => <li key={q}>{q}</li>)}</ol><p>هذه أسئلة للحوار مع وليّ الأمر، وليست اختبارًا إضافيًا للإكمال.</p></details>
      <section><h2>اكتشف أكثر</h2><Prose paragraphs={story.exploreMore} /></section>
      <details className="companion-details"><summary>المصادر • للوالدين والمعلمين</summary>
        <p>هذه المراجع كما وردت مع النص. الإشارة إلى مصدر لا تعني أن كل الشرح التربوي نقل حرفي منه. بعض التفاصيل التاريخية تحتاج مراجعة متخصصة.</p>
        <ul>{story.sources.map((s, i) => <li key={i}><b>{s.type === "quran" ? "القرآن" : s.type === "hadith" ? "مرجع حديثي" : "مرجع تاريخي / شرح"}</b>: {s.reference}</li>)}</ul>
        <Prose paragraphs={story.parentNote.split(/\n\n/)} />
        {story.adultNotes.length > 0 && <details><summary>ملاحظات النص وسياقه للمراجعة مع البالغين</summary>
          <p>حُفظت هذه المقاطع خارج سرد الطفل لأنها تتناول التحرير أو تاريخًا حساسًا. لا يُعد عرضها اعتمادًا علميًا لها.</p>
          {story.adultNotes.map((s, i) => <section key={i}>{s.title && <h3>{s.title}</h3>}<Prose paragraphs={s.paragraphs} /></section>)}
          {story.adultQuestions.length > 0 && <><h3>أسئلة مرتبطة بهذا السياق</h3><ul>{story.adultQuestions.map(q => <li key={q}>{q}</li>)}</ul></>}
        </details>}
      </details>
      <nav className="companion-next" aria-label="واصل رحلتك">
        {following && <Link className="button button--primary" href={`/companions/${following.slug}`}>{won ? "القصة التالية" : "استكشف قصة أخرى"}: {following.name}</Link>}
        <Link href="/companions" className="button button--soft">كل الصحابة</Link><Link className="text-link" href="/journey">العودة إلى رحلتي</Link>
      </nav>
    </div>
  </article>;
}

export default function Companions() {
  const [, params] = useRoute("/companions/:slug");
  const slug = params?.slug;
  const { locale, direction } = useLocale();
  const [loaded, setLoaded] = useState<{ slug: string; story: CompanionStory | null; error?: boolean }>();
  const [retry, setRetry] = useState(0);
  // Opening a different story starts at its orientation, not at the previous
  // story's question/source scroll position. No pixel resume state is stored.
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [slug]);
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    loadCompanion(slug).then(story => { if (!cancelled) setLoaded({ slug, story }); }, () => { if (!cancelled) setLoaded({ slug, story: null, error: true }); });
    return () => { cancelled = true; };
  }, [slug, retry]);
  const ready = loaded?.slug === slug;
  return <main className="site-shell" dir={direction}><SkipLink /><SiteChrome />
    <div id={MAIN_CONTENT_ID} className="companions-page container" lang="ar" dir="rtl">
      {locale === "en" && <p className="companion-language" lang="en" dir="ltr">These stories are available in Arabic. An English edition requires editorial review.</p>}
      <Link className="text-link" href="/journey"><BookOpen size={17} aria-hidden="true" /> رحلتي</Link>
      {!slug ? <Hub /> : !ready ? <p role="status">نفتح القصة…</p> : loaded?.error ? <section role="alert"><h1>تعذّر فتح القصة</h1><button className="button button--primary" onClick={() => { setLoaded(undefined); setRetry(n => n + 1); }}>حاول مجددًا</button><Link href="/companions">العودة إلى الصحابة</Link></section> : loaded?.story ? <CompanionDetail key={slug} story={loaded.story} /> : <section><h1>لم نجد هذه القصة</h1><Link className="button button--primary" href="/companions">العودة إلى الصحابة</Link></section>}
    </div><SiteFooter />
  </main>;
}
