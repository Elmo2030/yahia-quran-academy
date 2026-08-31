// =============================================================================
// SiteHeader — unified chrome for every public page on the site.
//
// Replaces the inline header markup previously copy-pasted into Home,
// Stories, and Reader. Renders the academy logo, the language toggle from
// shadcn-style components, and (when signed in) the user menu anchor that
// drops down to /profile + Sign out. When signed out, shows a Sign in button
// that links to /login. PR3 (feature/progress-tracking) hooks into the right
// slot to render the "Continue Reading" affordance for returning readers.
//
// Kept dumb on purpose: the SiteHeader never owns its own state. It reads the
// AuthContext + the active wouter location, and dispatches navigation via
// wouter's setLocation hook.
// =============================================================================

import { Link, useLocation } from "wouter";
import { ChevronDown, LogIn, LogOut, UserRound } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { useAuth } from "@/hooks/useAuth";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const labels = {
  ar: {
    home: "الرئيسية",
    stories: "القصص",
    reader: "القارئ",
    signIn: "تسجيل الدخول",
    account: "حسابي",
    signOut: "تسجيل الخروج",
    skipNav: "تخطّي إلى المحتوى",
    notConfigured: "تسجيل الدخول غير مُهيّأ الآن",
  },
  en: {
    home: "Home",
    stories: "Stories",
    reader: "Reader",
    signIn: "Sign in",
    account: "My account",
    signOut: "Sign out",
    skipNav: "Skip to content",
    notConfigured: "Sign-in is not configured",
  },
} as const;

type NavLinkProps = { href: string; label: string };

function NavLink({ href, label }: NavLinkProps) {
  const [location] = useLocation();
  const active = location === href || location.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-[var(--brand-cream)] text-[var(--brand-navy)]"
          : "text-[var(--brand-navy)]/80 hover:bg-[var(--brand-cream)]/60"
      }`}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const { locale } = useLocale();
  const { session, profile, signOut, configured } = useAuth();
  const [, navigate] = useLocation();
  const t = labels[locale];

  return (
    <header className="border-b border-[var(--brand-navy)]/10 bg-[var(--brand-ivory)]/85 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-[var(--brand-navy)] focus:px-3 focus:py-1 focus:text-sm focus:text-[var(--brand-ivory)]"
      >
        {t.skipNav}
      </a>
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--brand-navy)]"
          aria-label="Yahya Quran Academy"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-navy)] text-[var(--brand-ivory)] shadow-sm">
            {String.fromCharCode(0x064a)}
          </span>
          <span className="hidden text-sm font-semibold sm:inline">
            Yahya Quran Academy
          </span>
        </Link>
        <nav className="ml-2 hidden flex-1 items-center gap-1 md:flex" aria-label="Primary">
          <NavLink href="/" label={t.home} />
          <NavLink href="/read" label={t.reader} />
          <NavLink href="/stories" label={t.stories} />
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LanguageToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 px-2 text-[var(--brand-navy)]"
                  data-testid="site-header-account"
                >
                  <UserRound className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">
                    {profile?.display_name ?? t.account}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-48">
                <DropdownMenuLabel>{profile?.display_name ?? t.account}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate("/profile")}>
                  {t.account}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={async () => {
                    await signOut();
                    navigate("/");
                  }}
                  data-testid="site-header-signout"
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="default"
              size="sm"
              className="gap-2 bg-[var(--brand-navy)] text-[var(--brand-ivory)] hover:bg-[var(--brand-navy)]/90"
            >
              <Link href="/login" data-testid="site-header-signin">
                <LogIn className="h-4 w-4" aria-hidden="true" />
                {configured ? t.signIn : t.notConfigured}
              </Link>
            </Button>
          )}
        </div>
      </div>
      <nav className="flex w-full items-center gap-1 overflow-x-auto border-t border-[var(--brand-navy)]/10 px-4 py-2 md:hidden" aria-label="Primary mobile">
        <NavLink href="/" label={t.home} />
        <NavLink href="/read" label={t.reader} />
        <NavLink href="/stories" label={t.stories} />
      </nav>
    </header>
  );
}

export default SiteHeader;
