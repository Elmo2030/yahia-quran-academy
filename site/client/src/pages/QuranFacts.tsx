import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Check, Lock, RotateCcw, Sparkles, X } from "lucide-react";

import { BadgeAward } from "@/components/BadgeAward";
import { QuranFactIcon } from "@/components/QuranFactIcon";
import { QuranCurrentDiscovery } from "@/components/QuranCurrentDiscovery";
import { SiteChrome } from "@/components/SiteChrome";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { quranFacts, type QuranFact } from "@/content/quran-facts";
import { activeProfile } from "@/lib/hifz-store";
import { useHifzStore } from "@/hooks/useHifzStore";
import { FACTS_PER_STAGE, currentDiscovery, factsInStage } from "@/lib/quran-facts-journey";
import { factCardState, firstIncompleteStage, readFactDiscoveries, resetFactDiscoveries, type FactCardState } from "@/lib/quran-facts-progress";

const STAGE_MEDALS = ["📖", "🌙", "⭐", "🕌", "🌿"];
const STAGE_COUNT = Math.ceil(quranFacts.length / FACTS_PER_STAGE);
const STAGES = Array.from({ length: STAGE_COUNT }, (_, index) => factsInStage(quranFacts, index));
const FACT_SLUGS = quranFacts.map(fact => fact.slug);
const QUIZ_MINIMUM = 4;

const shuffle = <T,>(items: T[]) => {
  const out = [...items];
  for (let index = out.length - 1; index > 0; index -= 1) {
    const next = Math.floor(Math.random() * (index + 1));
    [out[index], out[next]] = [out[next], out[index]];
  }
  return out;
};

type Question = { fact: QuranFact; options: QuranFact[] };
const buildQuestion = (pool: QuranFact[], avoid?: string): Question | null => {
  if (pool.length < QUIZ_MINIMUM) return null;
  const candidates = pool.length > QUIZ_MINIMUM ? pool.filter(fact => fact.slug !== avoid) : pool;
  const fact = candidates[Math.floor(Math.random() * candidates.length)];
  return { fact, options: shuffle([fact, ...shuffle(pool.filter(item => item.slug !== fact.slug)).slice(0, 3)]) };
};

const copy = {
  ar: {
    eyebrow: "في رحاب القرآن", title: "رحلة اكتشاف القرآن", intro: "كل اكتشاف يقربك من القرآن الكريم.",
    currentLabel: "اكتشافك التالي", discoverNow: "اكتشف الآن", currentHint: "خطوتك التالية في الرحلة",
    stage: (index: number) => `المرحلة ${index + 1} من ${STAGE_COUNT}`,
    stageProgress: (found: number, total: number) => `اكتشفت ${found} من ${total} في هذه المرحلة`,
    stageJourney: "رحلة المرحلة", openJourney: "شاهد الرحلة", explore: "استكشف ما فُتح لك",
    journal: "اكتشافاتي", journalBack: "العودة إلى الرحلة", journalEmpty: "لم تبدأ اكتشافاتك بعد", journalStart: "ابدأ أول اكتشاف",
    journeySummary: "رحلتي", continueJourney: "تابع رحلتي", recent: "آخر اكتشافاتي", stages: ["المرحلة الأولى", "المرحلة الثانية", "المرحلة الثالثة", "المرحلة الرابعة", "المرحلة الخامسة"],
    locked: "تُفتح لاحقًا", unlocked: "اكتشاف متاح", current: "اكتشافك التالي", completed: "اكتشفتها",
    lockedHint: "أكمل المرحلة الحالية أولًا", completedHint: "افتحها مرة أخرى", allDone: "أكملت رحلة الاكتشاف",
    medalLabel: "وسام المرحلة", medalKeepsake: "عشرون اكتشافًا", medalNote: (name: string) => `أكملت ${name} واكتشفت عشرين معلومة.`,
    nextStage: "ابدأ المرحلة التالية", quizOpen: "تحدي الاكتشاف", quizClose: "أغلق التحدي", quizTitle: "تحدي الاكتشاف",
    quizLocked: (count: number) => `اكتشف ${count} معلومات على الأقل لتجرب التحدي.`, quizAsk: "من أي اكتشاف جاءت هذه المعلومة؟",
    quizRight: "أحسنت!", quizWrong: "جرّب اختيارًا آخر 💪", quizNext: "سؤال آخر", reset: "أغلق اكتشافاتي على هذا الجهاز",
    home: "الرئيسية", stories: "قصص القرآن",
  },
  en: {
    eyebrow: "In the Realm of the Quran", title: "A Quran discovery journey", intro: "Each discovery brings you closer to the Quran.",
    currentLabel: "Your next discovery", discoverNow: "Discover now", currentHint: "Your next step in the journey",
    stage: (index: number) => `Stage ${index + 1} of ${STAGE_COUNT}`,
    stageProgress: (found: number, total: number) => `You have discovered ${found} of ${total} in this stage`,
    stageJourney: "Stage journey", openJourney: "See the journey", explore: "Explore what is open to you",
    journal: "My discoveries", journalBack: "Back to the journey", journalEmpty: "You have not started discovering yet", journalStart: "Start your first discovery",
    journeySummary: "My journey", continueJourney: "Continue my journey", recent: "My recent discoveries", stages: ["Stage one", "Stage two", "Stage three", "Stage four", "Stage five"],
    locked: "Opening later", unlocked: "Discovery available", current: "Your next discovery", completed: "Discovered",
    lockedHint: "Finish the current stage first", completedHint: "Open it again", allDone: "You completed the discovery journey",
    medalLabel: "Stage medal", medalKeepsake: "Twenty discoveries", medalNote: (name: string) => `You completed ${name} and discovered twenty facts.`,
    nextStage: "Start the next stage", quizOpen: "Discovery Challenge", quizClose: "Close challenge", quizTitle: "Discovery Challenge",
    quizLocked: (count: number) => `Discover at least ${count} facts before trying the challenge.`, quizAsk: "Which discovery is this fact from?",
    quizRight: "Well done!", quizWrong: "Try another choice 💪", quizNext: "Another question", reset: "Close my discoveries on this device",
    home: "Home", stories: "Quran stories",
  },
} as const;

function DiscoveryNode({ fact, state }: { fact: QuranFact; state: FactCardState }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const stateCopy = t[state];
  if (state === "locked") {
    return <article className="discovery-node discovery-node--locked" aria-label={`${stateCopy}: ${fact.title[locale]}`}>
      <span className="discovery-node__icon"><Lock size={19} aria-hidden="true" /></span>
      <span><b>{fact.title[locale]}</b><small>{t.lockedHint}</small></span>
      <span className="discovery-node__state">{stateCopy}</span>
    </article>;
  }
  return <Link href={`/quran-facts/${fact.slug}`} className={`discovery-node discovery-node--${state}`} aria-label={`${stateCopy}: ${fact.title[locale]}`}>
    <span className="discovery-node__icon"><QuranFactIcon name={fact.icon} size={20} /></span>
    <span><b>{fact.title[locale]}</b><small>{state === "completed" ? t.completedHint : state === "current" ? t.currentHint : t.unlocked}</small></span>
    <span className="discovery-node__state">{state === "completed" ? <Check size={17} aria-hidden="true" /> : state === "current" ? <Sparkles size={17} aria-hidden="true" /> : stateCopy}</span>
  </Link>;
}

function Quiz({ pool, onClose }: { pool: QuranFact[]; onClose: () => void }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const [question, setQuestion] = useState<Question | null>(() => buildQuestion(pool));
  const [tried, setTried] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => { panel.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }); panel.current?.focus(); }, []);
  const answer = (slug: string) => {
    if (!question || solved || tried.includes(slug)) return;
    if (slug === question.fact.slug) setSolved(true);
    else setTried(items => [...items, slug]);
  };
  const next = () => { setTried([]); setSolved(false); setQuestion(buildQuestion(pool, question?.fact.slug)); };
  return <section className="facts-quiz" aria-label={t.quizTitle} ref={panel} tabIndex={-1}>
    <div className="facts-quiz__head"><h2>{t.quizTitle}</h2><button type="button" className="fact-card__close" onClick={onClose} aria-label={t.quizClose}><X size={15} aria-hidden="true" /></button></div>
    {!question ? <p className="facts-quiz__body">{t.quizLocked(QUIZ_MINIMUM)}</p> : <>
      <p className="facts-quiz__ask">{t.quizAsk}</p><p className="facts-quiz__body">{question.fact.body[locale]}</p>
      <ul className="facts-quiz__options">{question.options.map(option => {
        const right = option.slug === question.fact.slug;
        const spent = tried.includes(option.slug);
        return <li key={option.slug}><button type="button" className={`facts-quiz__option${solved && right ? " is-right" : spent ? " is-wrong" : ""}`} onClick={() => answer(option.slug)} disabled={solved || spent}>{option.title[locale]}</button></li>;
      })}</ul>
      <p className="facts-quiz__result" role="status">{solved ? t.quizRight : tried.length ? t.quizWrong : ""}</p>
      {solved && <button type="button" className="facts-quiz__next" onClick={next}>{t.quizNext}</button>}
    </>}
  </section>;
}

function FieldJournal({ discovered, stage, onBack, onStart, onReset }: { discovered: string[]; stage: number; onBack: () => void; onStart: () => void; onReset: () => void }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const recent = quranFacts.filter(fact => discovered.includes(fact.slug)).slice(-6).reverse();
  const next = currentDiscovery(quranFacts, discovered);
  return <section className="field-journal" aria-labelledby="field-journal-title">
    <div className="field-journal__head"><div><span className="eyebrow eyebrow--gold">{t.journeySummary}</span><h2 id="field-journal-title">{t.journal}</h2></div><button type="button" className="text-link" onClick={onBack}>{t.journalBack}</button></div>
    {discovered.length === 0 ? <div className="field-journal__empty"><p>{t.journalEmpty}</p><button type="button" className="button button--primary" onClick={onStart}>{t.journalStart}</button></div> : <>
      <div className="field-journal__summary"><span>{t.stage(stage)}</span><b>{t.stageProgress(discovered.filter(slug => STAGES[stage].some(fact => fact.slug === slug)).length, STAGES[stage].length)}</b>{next && <Link href={`/quran-facts/${next.slug}`} className="button button--primary">{t.continueJourney}</Link>}</div>
      <section><h3>{t.recent}</h3><ul className="field-journal__recent">{recent.map(fact => <li key={fact.slug}><Link href={`/quran-facts/${fact.slug}`}><QuranFactIcon name={fact.icon} size={18} /><span>{fact.title[locale]}</span><Check size={15} aria-hidden="true" /></Link></li>)}</ul></section>
      <section><h3>{t.journeySummary}</h3><ul className="field-journal__stages">{STAGES.map((facts, index) => { const complete = facts.every(fact => discovered.includes(fact.slug)); const count = facts.filter(fact => discovered.includes(fact.slug)).length; return <li key={index} className={complete ? "is-complete" : index === stage ? "is-current" : ""}><span>{complete ? <Check size={16} aria-hidden="true" /> : index + 1}</span><div><b>{t.stages[index]}</b><small>{t.stageProgress(count, facts.length)}</small></div>{complete && <span aria-label={t.medalLabel}>{STAGE_MEDALS[index]}</span>}</li>; })}</ul></section>
      <button type="button" className="text-link field-journal__reset" onClick={onReset}><RotateCcw size={15} aria-hidden="true" /> {t.reset}</button>
    </>}
  </section>;
}

export default function QuranFacts() {
  const { direction, locale } = useLocale();
  const { store } = useHifzStore();
  const profileId = activeProfile(store)?.id ?? null;
  const t = copy[locale];
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [stage, setStage] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);

  useEffect(() => {
    const stored = readFactDiscoveries(FACT_SLUGS, profileId);
    setDiscovered(stored);
    setStage(firstIncompleteStage(quranFacts, stored, FACTS_PER_STAGE));
  }, [profileId]);

  const current = currentDiscovery(quranFacts, discovered);
  const activeStage = firstIncompleteStage(quranFacts, discovered, FACTS_PER_STAGE);
  const cards = STAGES[stage];
  const stageFound = cards.filter(fact => discovered.includes(fact.slug)).length;
  const stageDone = stageFound === cards.length;
  const pool = useMemo(() => quranFacts.filter(fact => discovered.includes(fact.slug)), [discovered]);
  const canQuiz = pool.length >= QUIZ_MINIMUM;
  const reset = () => { resetFactDiscoveries(profileId); setDiscovered([]); setStage(0); setQuizOpen(false); };

  return <main className="site-shell" dir={direction}>
    <SkipLink /><SiteChrome />
    <div id={MAIN_CONTENT_ID}>
      <section className="facts-journey-hero"><div className="container">
        <span className="eyebrow eyebrow--gold"><Sparkles size={15} aria-hidden="true" /> {t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p>
      </div></section>
      <section className="section facts-journey"><div className="container">
        {journalOpen ? <FieldJournal discovered={discovered} stage={activeStage} onBack={() => setJournalOpen(false)} onStart={() => { setJournalOpen(false); setStage(activeStage); }} onReset={reset} /> : <>
          {current ? <QuranCurrentDiscovery fact={{ slug: current.slug, icon: current.icon, title: current.title[locale] }} stage={activeStage} /> : <section className="facts-journey-complete"><span aria-hidden="true">✦</span><h2>{t.allDone}</h2><button type="button" className="button button--primary" onClick={() => setJournalOpen(true)}>{t.journal}</button></section>}
          <section className="facts-stage-preview" aria-labelledby="facts-stage-title"><div className="facts-stage-preview__head"><div><h2 id="facts-stage-title">{t.stageJourney}</h2><p>{t.stageProgress(stageFound, cards.length)}</p></div><button type="button" className="text-link" onClick={() => setStage(activeStage)}>{t.openJourney}</button></div>
            <nav className="facts-stages" aria-label={t.stageJourney}>{STAGES.map((group, index) => { const done = group.filter(fact => discovered.includes(fact.slug)).length; const locked = index > activeStage; return <button key={index} type="button" className={`facts-stage${index === stage ? " is-current" : ""}${done === group.length ? " is-done" : ""}${locked ? " is-locked" : ""}`} onClick={() => !locked && setStage(index)} disabled={locked} aria-current={index === stage ? "true" : undefined}><span className="facts-stage__name">{done === group.length ? <Check size={14} aria-hidden="true" /> : locked ? <Lock size={14} aria-hidden="true" /> : null}{t.stages[index]}</span><span className="facts-stage__count">{t.stageProgress(done, group.length)}</span></button>; })}</nav>
            {stageDone && <div className="facts-stage-completion"><BadgeAward icon={STAGE_MEDALS[stage]} badge={t.stages[stage]} keepsake={t.medalKeepsake} note={t.medalNote(t.stages[stage])} label={t.medalLabel} />{stage + 1 < STAGE_COUNT && <button type="button" className="button button--primary" onClick={() => setStage(stage + 1)}>{t.nextStage}</button>}</div>}
            <div className="facts-path-wrap"><h3>{t.explore}</h3><ul className="facts-path">{cards.map(fact => <li key={fact.slug}><DiscoveryNode fact={fact} state={factCardState(quranFacts, discovered, quranFacts.indexOf(fact), FACTS_PER_STAGE)} /></li>)}</ul></div>
          </section>
          <section className="facts-secondary-actions"><button type="button" className="facts-quiz__start" onClick={() => setQuizOpen(true)} disabled={quizOpen}><Sparkles size={15} aria-hidden="true" /> {t.quizOpen}</button><button type="button" className="text-link" onClick={() => setJournalOpen(true)}>{t.journal}</button></section>
          {!canQuiz && !quizOpen && <p className="facts-quiz__hint">{t.quizLocked(QUIZ_MINIMUM)}</p>}
          {quizOpen && <Quiz pool={pool} onClose={() => setQuizOpen(false)} />}
        </>}
      </div></section>
    </div>
    <footer className="site-footer"><div className="container site-footer__inner"><div className="brand-mark"><span className="brand-mark__seal">ي</span><span><b>Yahya</b> Quran Academy</span></div><Link href="/" className="text-link">{t.home}</Link><Link href="/stories" className="text-link">{t.stories}</Link></div></footer>
  </main>;
}
