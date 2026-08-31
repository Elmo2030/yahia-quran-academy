// =============================================================================
// QuranFacts — "في رحاب القرآن".
//
// Thirty facts as face-down cards. Turning one over is the whole mechanic: a
// child taps, reads, and the card stays turned. What is discovered is kept on
// the device, so the count means something on the next visit.
//
// No score and no timer. The reward is the count of cards turned and the
// sentence at the end, which is the same shape as the rest of the site: it
// records what the child did, it does not grade them.
// =============================================================================

import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import {
  AlignCenter, Bird, BookOpen, Bug, Carrot, ChevronLeft, ChevronRight, Clock,
  Crown, Droplet, Droplets, Feather, Flame, Gem, Heart, Hourglass, Landmark,
  Library, Lock, MapPin, MessageCircle, Moon, Mountain, Palette, PawPrint,
  RotateCcw, Ruler, Scale, ScrollText, Shield, ShieldCheck, Shirt, Sparkles,
  Sprout, Star, Type, Users,
} from "lucide-react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { quranFacts, type QuranFact } from "@/content/quran-facts";

const ICONS: Record<string, typeof BookOpen> = {
  AlignCenter, Bird, BookOpen, Bug, Carrot, Clock, Crown, Droplet, Droplets,
  Feather, Flame, Gem, Heart, Hourglass, Landmark, Library, Lock, MapPin,
  MessageCircle, Moon, Mountain, Palette, PawPrint, Ruler, Scale, ScrollText,
  Shield, ShieldCheck, Shirt, Sparkles, Sprout, Star, Type, Users,
};

const STORE_KEY = "yahya.facts.discovered.v1";

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
    intro: "ثلاثون معلومة عن القرآن الكريم، كل واحدة خلف بطاقة. اقلب البطاقة لتقرأها.",
    turn: "اقلب البطاقة",
    progress: (n: number, total: number) => `اكتشفت ${n} من ${total}`,
    allDone: "اكتشفت كل البطاقات! ما رأيك أن تحكيها لأحد في البيت؟",
    reset: "ابدأ من جديد",
    hidden: "بطاقة لم تُقلب بعد",
  },
  en: {
    home: "Home", stories: "Quran stories", seerah: "The Prophet’s Seerah", reader: "Open the reader",
    eyebrow: "In the Realm of the Quran",
    title: "Discover the Quran",
    intro: "Thirty things worth knowing about the Quran, each behind a card. Turn a card over to read it.",
    turn: "Turn the card over",
    progress: (n: number, total: number) => `You have discovered ${n} of ${total}`,
    allDone: "Every card is turned over. Who at home would like to hear one of these?",
    reset: "Start again",
    hidden: "A card not yet turned over",
  },
} as const;

function FactCard({ fact, open, onOpen }: { fact: QuranFact; open: boolean; onOpen: () => void }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const Icon = ICONS[fact.icon] ?? Sparkles;
  const dir = locale === "ar" ? "rtl" : "ltr";

  if (!open) {
    return (
      <button type="button" className="fact-card fact-card--closed" onClick={onOpen} aria-label={`${t.turn} — ${fact.number}`}>
        <span className="fact-card__number">{fact.number}</span>
        <Icon size={26} aria-hidden="true" />
        <span className="fact-card__prompt">{t.turn}</span>
      </button>
    );
  }

  return (
    <article className="fact-card fact-card--open" lang={locale} dir={dir}>
      <span className="fact-card__badge"><Icon size={14} aria-hidden="true" /> {fact.number}</span>
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

export default function QuranFacts() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const [discovered, setDiscovered] = useState<string[]>([]);

  useEffect(() => setDiscovered(readDiscovered()), []);

  const open = useCallback((slug: string) => {
    setDiscovered(current => {
      if (current.includes(slug)) return current;
      const next = [...current, slug];
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
          <div className="container">
            <div className="facts-progress">
              <p className="facts-progress__count">{t.progress(found, total)}</p>
              <div className="facts-progress__bar" role="progressbar" aria-valuenow={found} aria-valuemin={0} aria-valuemax={total} aria-label={t.progress(found, total)}>
                <span style={{ inlineSize: `${(found / total) * 100}%` }} />
              </div>
              {found > 0 && (
                <button type="button" className="text-link" onClick={reset}>
                  <RotateCcw size={15} aria-hidden="true" /> {t.reset}
                </button>
              )}
            </div>

            {found === total && <p className="facts-done">{t.allDone}</p>}

            <ul className="facts-grid">
              {quranFacts.map(fact => (
                <li key={fact.slug}>
                  <FactCard fact={fact} open={discovered.includes(fact.slug)} onOpen={() => open(fact.slug)} />
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
