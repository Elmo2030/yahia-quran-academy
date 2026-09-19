// =============================================================================
// SiteChrome — the one header.
//
// There were two. Six public pages carried their own copy of the site's header
// markup, and the sign-in, account and policy pages used a different component
// written in Tailwind, with a different look, different links and a different
// account control. The privacy policy and terms are now indexed, so two of the
// pages a parent reaches from a search engine looked like a different site.
//
// One component, in the site's own visual language, with the drawer for phones.
// The account control is a link, not a menu: signing out lives on the account
// page, which is the only place that ever needed it.
// =============================================================================

import { Link } from "wouter";
import { ArrowLeft, ArrowRight, LogIn, UserRound } from "lucide-react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { useLocale } from "@/contexts/LocaleContext";
import useAuth from "@/hooks/useAuth";

const copy = {
  ar: {
    home: "الرئيسية", journey: "رحلتي", hifz: "رحلة الحفظ", listen: "الاستماع", stories: "قصص القرآن", seerah: "السيرة النبوية",
    facts: "في رحاب القرآن", aqeedah: "العقيدة", about: "عن الأكاديمية",
    reader: "افتح القارئ", account: "حسابي", register: "أنشئ حسابًا",
    nav: "التنقل الرئيسي",
  },
  en: {
    home: "Home", journey: "My journey", hifz: "Memorization journey", listen: "Listening", stories: "Quran stories", seerah: "The Prophet’s Seerah",
    facts: "In the Realm of the Quran", aqeedah: "Creed", about: "About",
    reader: "Open the reader", account: "My account", register: "Create an account",
    nav: "Primary navigation",
  },
} as const;

/**
 * `variant="reader"` is the slimmer bar the reader uses: it drops the nav and
 * offers the way back home, so nothing competes with the surah on screen.
 */
export function SiteChrome({ variant = "full" }: { variant?: "full" | "reader" }) {
  const { locale } = useLocale();
  const { session } = useAuth();
  const t = copy[locale];
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;
  const Forward = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <header className={variant === "reader" ? "reader-header" : "site-header"}>
      <div className={`container ${variant === "reader" ? "reader-header__inner" : "site-header__inner"}`}>
        <Link href="/" className="brand-mark" aria-label={t.home}>
          <span className="brand-mark__seal">ي</span>
          <span><b>Yahya</b> Quran Academy</span>
        </Link>

        {variant === "full" && (
          <nav aria-label={t.nav} className="site-nav">
            <Link href="/journey">{t.journey}</Link>
            <Link href="/hifz">{t.hifz}</Link>
            <Link href="/stories">{t.stories}</Link>
            <Link href="/seerah">{t.seerah}</Link>
            <Link href="/quran-facts">{t.facts}</Link>
            <Link href="/aqeedah">{t.aqeedah}</Link>
            <Link href="/listen">{t.listen}</Link>
            <Link href="/about">{t.about}</Link>
          </nav>
        )}

        <div className="header-actions">
          <MobileMenu />
          <ThemeToggle />
          <LanguageToggle compact />
          {session ? (
            <Link href="/profile" className="header-auth-link">
              <UserRound size={15} aria-hidden="true" /> {t.account}
            </Link>
          ) : (
            <Link href="/register" className="header-auth-link">
              <LogIn size={15} aria-hidden="true" /> {t.register}
            </Link>
          )}
          {variant === "reader" ? (
            <Link href="/" className="text-link"><Back size={18} aria-hidden="true" /> {t.home}</Link>
          ) : (
            <Link href="/read/1" className="header-reader-link">
              {t.reader} <Forward size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default SiteChrome;
