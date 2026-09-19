import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import { QuranFactIcon } from "@/components/QuranFactIcon";
import { useLocale } from "@/contexts/LocaleContext";

const copy = {
  ar: { label: "اكتشافك التالي", action: "اكتشف الآن", hint: "خطوتك التالية في الرحلة", stage: (stage: number) => `المرحلة ${stage + 1} من 5` },
  en: { label: "Your next discovery", action: "Discover now", hint: "Your next step in the journey", stage: (stage: number) => `Stage ${stage + 1} of 5` },
} as const;

type Discovery = { slug: string; icon: string; title: string };

/** A presentational doorway to the single persisted next fact. */
export function QuranCurrentDiscovery({ fact, stage, compact = false }: { fact: Discovery; stage: number; compact?: boolean }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  return <section className={`current-discovery${compact ? " current-discovery--compact" : ""}`} aria-label={`${t.label}: ${fact.title}`}>
    <div className="current-discovery__icon"><QuranFactIcon name={fact.icon} size={compact ? 24 : 34} /></div>
    <div className="current-discovery__copy">
      <span className="current-discovery__label"><Sparkles size={14} aria-hidden="true" /> {t.label}</span>
      <h2>{fact.title}</h2>
      {!compact && <p>{t.hint}</p>}
      <small>{t.stage(stage)}</small>
    </div>
    <Link href={`/quran-facts/${fact.slug}`} className="button button--primary" aria-label={`${t.label}: ${fact.title}. ${t.action}`}>
      {t.action} <Arrow size={17} aria-hidden="true" />
    </Link>
  </section>;
}
