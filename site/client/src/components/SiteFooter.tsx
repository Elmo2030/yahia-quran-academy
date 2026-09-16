// =============================================================================
// SiteFooter — unified chrome for every public page on the site.
//
// Renders the legal links (privacy, terms) plus a small locale-aware tagline.
// PR1 keeps this minimal; later PRs may add parential-dashboard content and a
// newsletter link.
// =============================================================================

import { Link } from "wouter";
import { useLocale } from "@/contexts/LocaleContext";

const labels = {
  ar: {
    tagline: "رحلة هادئة للقرآن والتلقّي والمراجعة الذاتية.",
    privacy: "سياسة الخصوصية",
    terms: "الشروط",
    home: "الرئيسية",
  },
  en: {
    tagline: "A quiet path for Qur'an memorization and self-review.",
    privacy: "Privacy",
    terms: "Terms",
    home: "Home",
  },
} as const;

export function SiteFooter() {
  const { locale } = useLocale();
  const t = labels[locale];
  return (
    <footer className="border-t border-[var(--brand-navy)]/10 bg-[var(--brand-ivory)]/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-[var(--brand-navy)]/75 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{t.tagline}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href="/"
            className="inline-flex min-h-[32px] items-center hover:text-[var(--brand-navy)] hover:underline"
          >
            {t.home}
          </Link>
          <Link
            href="/privacy"
            className="inline-flex min-h-[32px] items-center hover:text-[var(--brand-navy)] hover:underline"
          >
            {t.privacy}
          </Link>
          <Link
            href="/terms"
            className="inline-flex min-h-[32px] items-center hover:text-[var(--brand-navy)] hover:underline"
          >
            {t.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
