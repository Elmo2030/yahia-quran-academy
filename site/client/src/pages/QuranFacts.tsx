// =============================================================================
// QuranFacts — "في رحاب القرآن".
//
// A hundred cards at once is a wall, so the deck is dealt in five stages of
// twenty. A stage is what is on screen; the count across all five is what is
// kept. A stage is picked up where it was left: on arrival the page opens the
// first stage that still has a card face down.
//
// A hundred facts as face-down cards. Turning one over is the whole mechanic:
// a child taps, reads, and the card stays turned. What is discovered is kept
// on the device, so the count means something on the next visit. A card can be
// turned back over, so the deck can be played again without losing anything.
//
// The quiz is optional and lives behind a button. It draws on the cards the
// child has actually turned over, so it can only ask about something already
// read. It counts right answers for the session and forgets them on leaving:
// the deck records what the child did, it does not grade them.
// =============================================================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  AlignCenter, Anchor, Apple, Archive, ArrowDownToLine, AudioLines, Baby,
  Ban, BellRing, Bird, BookCopy, BookOpen, Bug, Building2, CalendarClock,
  Carrot, Check, ChevronLeft, ChevronRight, Clock, CloudSun, Compass, Crown,
  DoorOpen, Droplet, Droplets, EyeOff, Feather, Flame, Footprints, Gem, Gift,
  GraduationCap, Handshake, Hash, Heart, HeartPulse, Home, Hourglass,
  Landmark, Languages, Layers, LayoutGrid, Library, Lightbulb, ListChecks,
  Lock, MapPin, Maximize2, Megaphone, MessageCircle, MessageSquareQuote,
  Microscope, Milestone, Moon, Mountain, Palette, PawPrint, PenLine,
  PieChart, Puzzle, RefreshCw, Repeat, Repeat2, RotateCcw, Ruler, Scale,
  ScrollText, Search, Shield, ShieldCheck, ShieldPlus, Shirt, Sparkle,
  Sparkles, Sprout, Star, Sun, Sunrise, Tag, Telescope, Timer, Trees, Type,
  UserRoundCheck, Users, Waves, Wind, X,
} from "lucide-react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { SiteChrome } from "@/components/SiteChrome";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { quranFacts, type QuranFact } from "@/content/quran-facts";

const ICONS: Record<string, typeof BookOpen> = {
  AlignCenter, Anchor, Apple, Archive, ArrowDownToLine, AudioLines, Baby,
  Ban, BellRing, Bird, BookCopy, BookOpen, Bug, Building2, CalendarClock,
  Carrot, Clock, CloudSun, Compass, Crown, DoorOpen, Droplet, Droplets,
  EyeOff, Feather, Flame, Footprints, Gem, Gift, GraduationCap, Handshake,
  Hash, Heart, HeartPulse, Home, Hourglass, Landmark, Languages, Layers,
  LayoutGrid, Library, Lightbulb, ListChecks, Lock, MapPin, Maximize2,
  Megaphone, MessageCircle, MessageSquareQuote, Microscope, Milestone, Moon,
  Mountain, Palette, PawPrint, PenLine, PieChart, Puzzle, RefreshCw, Repeat,
  Repeat2, Ruler, Scale, ScrollText, Search, Shield, ShieldCheck, ShieldPlus,
  Shirt, Sparkle, Sparkles, Sprout, Star, Sun, Sunrise, Tag, Telescope,
  Timer, Trees, Type, UserRoundCheck, Users, Waves, Wind,
};

const STORE_KEY = "yahya.facts.discovered.v1";

// Ten gradients, cycled by card number, so the deck reads as a palette rather
// than a wall of navy. Every one of them clears 5.6:1 against white text at
// its lightest stop, which is what the face-down card puts on top of it.
const PALETTE = [
  ["#1b3a5c", "#001F3F"], ["#4a2b6b", "#2b1547"], ["#0f5c52", "#063b34"],
  ["#7a2f2f", "#4d1a1a"], ["#5c4a12", "#3a2e07"], ["#1f5f7a", "#0c3c50"],
  ["#6b2f52", "#431a33"], ["#3d5c1b", "#24380f"], ["#7a4a12", "#4d2d06"],
  ["#33406b", "#1c2544"],
] as const;

const hueOf = (n: number) => PALETTE[(n - 1) % PALETTE.length];

const PER_STAGE = 20;
const STAGE_COUNT = Math.ceil(quranFacts.length / PER_STAGE);
const STAGES = Array.from({ length: STAGE_COUNT }, (_, i) =>
  quranFacts.slice(i * PER_STAGE, (i + 1) * PER_STAGE));

const shuffle = <T,>(items: T[]): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

// A question is a fact plus three others to hide it among. Only facts the
// child has turned over are ever asked about.
type Question = { fact: QuranFact; options: QuranFact[] };

const QUIZ_MINIMUM = 4;

const buildQuestion = (pool: QuranFact[], avoid?: string): Question | null => {
  if (pool.length < QUIZ_MINIMUM) return null;
  const candidates = pool.length > QUIZ_MINIMUM ? pool.filter(f => f.slug !== avoid) : pool;
  const fact = candidates[Math.floor(Math.random() * candidates.length)];
  const others = shuffle(pool.filter(f => f.slug !== fact.slug)).slice(0, 3);
  return { fact, options: shuffle([fact, ...others]) };
};

const readDiscovered = (): string[] => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const copy = {
  ar: {
    home: "الرئيسية", stories: "قصص القرآن", seerah: "السيرة النبوية", reader: "افتح القارئ",
    eyebrow: "في رحاب القرآن",
    title: "اكتشف أسرار القرآن",
    intro: "مئة معلومة عن القرآن الكريم، كل واحدة خلف بطاقة. اقلب البطاقة لتقرأها.",
    turn: "اقلب البطاقة",
    progress: (n: number, total: number) => `اكتشفت ${n} من ${total}`,
    allDone: "اكتشفت كل البطاقات! ما رأيك أن تحكيها لأحد في البيت؟",
    reset: "أغلق كل البطاقات",
    hidden: "بطاقة لم تُقلب بعد",
    heroAlt: "مصحف مفتوح على مرج أخضر، يخرج منه نور ذهبي يحمل فانوسًا وغصن زيتون وريشة كتابة، ونملة صغيرة تدور حوله.",
    close: "أغلق البطاقة",
    quizOpen: "اختبر معلوماتك",
    quizClose: "أغلق الاختبار",
    quizTitle: "اختبر معلوماتك",
    quizLocked: (n: number) => `اقلب ${n} بطاقات على الأقل، وبعدها نسألك عمّا قرأته.`,
    quizAsk: "عن أي بطاقة تتحدث هذه المعلومة؟",
    quizRight: "إجابة صحيحة!",
    quizWrong: "ليست هذه — اقرأ البطاقة مرة أخرى وجرّب اختياراً آخر 💪",
    quizNext: "سؤال آخر",
    quizScore: (right: number, asked: number) => `${right} صحيحة من ${asked}`,
    stages: ["المرحلة الأولى", "المرحلة الثانية", "المرحلة الثالثة", "المرحلة الرابعة", "المرحلة الخامسة"],
    stageCount: (n: number, of: number) => `${n} من ${of}`,
    stageRange: (from: number, to: number) => `البطاقات ${from} – ${to}`,
    stagePick: "اختر المرحلة",
    stageDone: "أنهيت هذه المرحلة!",
    nextStage: "المرحلة التالية",
    overall: (n: number, total: number) => `${n} من ${total} في كل المراحل`,
  },
  en: {
    home: "Home", stories: "Quran stories", seerah: "The Prophet’s Seerah", reader: "Open the reader",
    eyebrow: "In the Realm of the Quran",
    title: "Discover the Quran",
    intro: "A hundred things worth knowing about the Quran, each behind a card. Turn a card over to read it.",
    turn: "Turn the card over",
    progress: (n: number, total: number) => `You have discovered ${n} of ${total}`,
    allDone: "Every card is turned over. Who at home would like to hear one of these?",
    reset: "Close every card",
    hidden: "A card not yet turned over",
    heroAlt: "An open mushaf on green grass, golden light rising from it carrying a lantern, an olive branch and a writing quill, with a small ant circling it.",
    close: "Close the card",
    quizOpen: "Test yourself",
    quizClose: "Close the quiz",
    quizTitle: "Test yourself",
    quizLocked: (n: number) => `Turn over at least ${n} cards, then we can ask you about what you read.`,
    quizAsk: "Which card is this from?",
    quizRight: "That is right!",
    quizWrong: "Not that one — read the card again and try another answer 💪",
    quizNext: "Another question",
    quizScore: (right: number, asked: number) => `${right} right out of ${asked}`,
    stages: ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5"],
    stageCount: (n: number, of: number) => `${n} of ${of}`,
    stageRange: (from: number, to: number) => `Cards ${from} – ${to}`,
    stagePick: "Choose a stage",
    stageDone: "You finished this stage!",
    nextStage: "Next stage",
    overall: (n: number, total: number) => `${n} of ${total} across every stage`,
  },
} as const;

function FactCard({ fact, open, onOpen, onClose }: {
  fact: QuranFact; open: boolean; onOpen: () => void; onClose: () => void;
}) {
  const { locale } = useLocale();
  const t = copy[locale];
  const Icon = ICONS[fact.icon] ?? Sparkles;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [from, to] = hueOf(fact.number);
  const hue = { "--fact-from": from, "--fact-to": to } as React.CSSProperties;

  if (!open) {
    return (
      <button type="button" className="fact-card fact-card--closed" style={hue} onClick={onOpen} aria-label={`${t.turn} — ${fact.number}`}>
        <span className="fact-card__number">{fact.number}</span>
        <Icon size={26} aria-hidden="true" />
        <span className="fact-card__prompt">{t.turn}</span>
      </button>
    );
  }

  return (
    <article className="fact-card fact-card--open" style={hue} lang={locale} dir={dir}>
      <div className="fact-card__head">
        <span className="fact-card__badge"><Icon size={14} aria-hidden="true" /> {fact.number}</span>
        <button type="button" className="fact-card__close" onClick={onClose} aria-label={`${t.close} — ${fact.number}`}>
          <X size={15} aria-hidden="true" />
        </button>
      </div>
      <h3>{fact.title[locale]}</h3>
      <p>{fact.body[locale]}</p>
      {fact.ayahs.map(ayah => (
        <figure key={ayah.ref} className="fact-card__ayah">
          <blockquote lang="ar" dir="rtl">{ayah.text}</blockquote>
          <figcaption lang="ar" dir="rtl">{ayah.ref}</figcaption>
        </figure>
      ))}
    </article>
  );
}

// The quiz shows the body of a card the child has already read and asks which
// card it came from. The answer options are titles, which keeps the reading
// short — the long text on screen is the one thing being asked about.
function Quiz({ pool: opened, onClose }: { pool: QuranFact[]; onClose: () => void }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";
  // The pool is taken once, when the quiz opens. Turning a card back over
  // while a question is on screen should not snatch the question away.
  const [pool] = useState(opened);
  const [question, setQuestion] = useState<Question | null>(() => buildQuestion(pool));
  // A wrong answer spends that option and leaves the rest live, the same as
  // the story cards: revealing the answer and locking the question ended the
  // attempt at the first mistake, which is the moment a child is still willing
  // to think. The score records the first attempt, so retrying is free but
  // getting it right first time still counts for something.
  const [tried, setTried] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [score, setScore] = useState({ right: 0, asked: 0 });
  const panel = useRef<HTMLElement>(null);

  // On a phone the button sits near the bottom of the screen, so the panel
  // opened below the fold: you tapped, and as far as you could tell nothing
  // happened. Bring it into view and put focus on it.
  useEffect(() => {
    panel.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    panel.current?.focus();
  }, []);

  const answer = (slug: string) => {
    if (solved || !question || tried.includes(slug)) return;
    const right = slug === question.fact.slug;
    if (tried.length === 0) setScore(s => ({ right: s.right + (right ? 1 : 0), asked: s.asked + 1 }));
    if (right) setSolved(true);
    else setTried(current => [...current, slug]);
  };

  const next = () => {
    setTried([]);
    setSolved(false);
    setQuestion(buildQuestion(pool, question?.fact.slug));
  };

  return (
    <section className="facts-quiz" lang={locale} dir={dir} aria-label={t.quizTitle} ref={panel} tabIndex={-1}>
      <div className="facts-quiz__head">
        <h2>{t.quizTitle}</h2>
        <div className="facts-quiz__head-end">
          {score.asked > 0 && <span className="facts-quiz__score">{t.quizScore(score.right, score.asked)}</span>}
          <button type="button" className="fact-card__close" onClick={onClose} aria-label={t.quizClose}>
            <X size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      {!question ? (
        <p className="facts-quiz__body">{t.quizLocked(QUIZ_MINIMUM)}</p>
      ) : (
      <>
      <p className="facts-quiz__ask">{t.quizAsk}</p>
      <p className="facts-quiz__body">{question.fact.body[locale]}</p>

      <ul className="facts-quiz__options">
        {question.options.map(option => {
          const isAnswer = option.slug === question.fact.slug;
          const spent = tried.includes(option.slug);
          const state = solved && isAnswer ? " is-right" : spent ? " is-wrong" : "";
          return (
            <li key={option.slug}>
              <button type="button" className={`facts-quiz__option${state}`} onClick={() => answer(option.slug)} disabled={solved || spent}>
                {option.title[locale]}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="facts-quiz__result" role="status">
        {solved ? t.quizRight : tried.length > 0 ? t.quizWrong : ""}
      </p>

      {solved && (
        <button type="button" className="facts-quiz__next" onClick={next}>
          {t.quizNext}
        </button>
      )}
      </>
      )}
    </section>
  );
}

export default function QuranFacts() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const [discovered, setDiscovered] = useState<string[]>([]);

  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stored = readDiscovered();
    setDiscovered(stored);
    // Land on the first stage that still has something to turn over.
    const unfinished = STAGES.findIndex(cards => cards.some(f => !stored.includes(f.slug)));
    setStage(unfinished === -1 ? 0 : unfinished);
  }, []);

  const open = useCallback((slug: string) => {
    setDiscovered(current => {
      if (current.includes(slug)) return current;
      const next = [...current, slug];
      try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch { /* private mode */ }
      return next;
    });
  }, []);

  const close = useCallback((slug: string) => {
    setDiscovered(current => {
      const next = current.filter(s => s !== slug);
      try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch { /* private mode */ }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try { localStorage.removeItem(STORE_KEY); } catch { /* private mode */ }
    setDiscovered([]);
  }, []);

  const total = quranFacts.length;
  const found = discovered.length;
  const [quizOpen, setQuizOpen] = useState(false);

  // Only what has actually been turned over is fair game for a question.
  const pool = useMemo(
    () => quranFacts.filter(fact => discovered.includes(fact.slug)),
    [discovered],
  );
  const canQuiz = pool.length >= QUIZ_MINIMUM;

  // Closing every card ends the quiz; closing one does not.
  useEffect(() => { if (found === 0) setQuizOpen(false); }, [found]);

  const cards = STAGES[stage];
  const stageFound = cards.filter(fact => discovered.includes(fact.slug)).length;
  const stageDone = stageFound === cards.length;
  const [stageHue] = hueOf(stage * 2 + 1);

  return (
    <main className="site-shell" dir={direction}>
      <SkipLink />
      <SiteChrome />

      <div id={MAIN_CONTENT_ID}>
        <section className="stories-list-hero">
          <div className="container stories-list-hero__grid">
            <div>
              <span className="eyebrow eyebrow--gold"><Sparkles size={15} aria-hidden="true" /> {t.eyebrow}</span>
              <h1>{t.title}</h1>
              <p>{t.intro}</p>
            </div>
            <figure className="animals-collection-cover">
              <img
                src="/facts/hero-960.webp"
                srcSet="/facts/hero-640.webp 640w, /facts/hero-960.webp 960w, /facts/hero-1280.webp 1280w, /facts/hero-1600.webp 1600w"
                sizes="(max-width: 900px) 92vw, 42vw"
                width={1600}
                height={900}
                alt={t.heroAlt}
              />
            </figure>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <nav className="facts-stages" aria-label={t.stagePick}>
              {STAGES.map((group, index) => {
                const done = group.filter(fact => discovered.includes(fact.slug)).length;
                const [hue] = hueOf(index * 2 + 1);
                return (
                  <button
                    key={index}
                    type="button"
                    className={`facts-stage${index === stage ? " is-current" : ""}${done === group.length ? " is-done" : ""}`}
                    style={{ "--fact-from": hue } as React.CSSProperties}
                    onClick={() => setStage(index)}
                    aria-current={index === stage ? "true" : undefined}
                  >
                    <span className="facts-stage__name">
                      {done === group.length && <Check size={14} aria-hidden="true" />}
                      {t.stages[index]}
                    </span>
                    <span className="facts-stage__count">{t.stageCount(done, group.length)}</span>
                  </button>
                );
              })}
            </nav>

            <div className="facts-progress" style={{ "--fact-from": stageHue } as React.CSSProperties}>
              <p className="facts-progress__count">
                {t.stageRange(cards[0].number, cards[cards.length - 1].number)}
                {" · "}
                {t.stageCount(stageFound, cards.length)}
              </p>
              <div
                className="facts-progress__bar"
                role="progressbar"
                aria-valuenow={stageFound}
                aria-valuemin={0}
                aria-valuemax={cards.length}
                aria-label={`${t.stages[stage]} — ${t.stageCount(stageFound, cards.length)}`}
              >
                <span style={{ inlineSize: `${(stageFound / cards.length) * 100}%` }} />
              </div>
              <p className="facts-progress__overall">{t.overall(found, total)}</p>
              {found > 0 && (
                <button type="button" className="text-link" onClick={reset}>
                  <RotateCcw size={15} aria-hidden="true" /> {t.reset}
                </button>
              )}
              <button
                type="button"
                className="facts-quiz__start"
                onClick={() => setQuizOpen(true)}
                disabled={quizOpen}
              >
                <Sparkles size={15} aria-hidden="true" /> {t.quizOpen}
              </button>
            </div>

            {!canQuiz && !quizOpen && <p className="facts-quiz__hint">{t.quizLocked(QUIZ_MINIMUM)}</p>}

            {quizOpen && <Quiz pool={pool} onClose={() => setQuizOpen(false)} />}

            {found === total ? (
              <p className="facts-done">{t.allDone}</p>
            ) : stageDone && (
              <p className="facts-done">
                {t.stageDone}{" "}
                {stage + 1 < STAGE_COUNT && (
                  <button type="button" className="text-link" onClick={() => setStage(stage + 1)}>
                    {t.nextStage} <Arrow size={16} aria-hidden="true" />
                  </button>
                )}
              </p>
            )}

            <ul className="facts-grid">
              {cards.map(fact => (
                <li key={fact.slug}>
                  <FactCard
                    fact={fact}
                    open={discovered.includes(fact.slug)}
                    onOpen={() => open(fact.slug)}
                    onClose={() => close(fact.slug)}
                  />
                </li>
              ))}
            </ul>

            <Link href="/stories" className="text-link text-link--center">
              {t.stories} <Arrow size={18} aria-hidden="true" />
            </Link>
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
