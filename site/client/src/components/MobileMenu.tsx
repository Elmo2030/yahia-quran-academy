// =============================================================================
// MobileMenu — the side drawer for phones.
//
// Below 820px the desktop nav is hidden, and what stood in for it was a row of
// scrolling chips on the home page only: every other page had a logo, a
// language toggle and nothing to navigate with. This is the whole site in one
// panel, reachable from every page.
//
// It slides in from the side the language reads from — the start edge, right in
// Arabic and left in English — so it opens under the thumb that pressed it.
//
// The panel is portalled to the body. The header carries backdrop-filter, which
// makes it the containing block for any fixed-position descendant: rendered in
// place, the drawer was clipped to the height of the header strip.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { LogIn, Menu, Sparkles, UserRound, X } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { useAuth } from "@/hooks/useAuth";

const copy = {
  ar: {
    open: "القائمة", close: "أغلق القائمة", title: "التنقل",
    home: "الرئيسية", journey: "رحلتي", hifz: "رحلة الحفظ", mushafi: "مصحفي", listen: "الاستماع", stories: "قصص القرآن",
    companions: "الصحابة", namesOfAllah: "أسماء الله الحسنى", seerah: "السيرة النبوية", facts: "في رحاب القرآن", aqeedah: "العقيدة", about: "عن الأكاديمية",
    account: "حسابي", register: "أنشئ حسابًا",
  },
  en: {
    open: "Menu", close: "Close the menu", title: "Navigation",
    home: "Home", journey: "My journey", hifz: "Memorization journey", mushafi: "Mushafi", listen: "Listening", stories: "Quran stories",
    companions: "Companions", namesOfAllah: "Names of Allah", seerah: "The Prophet’s Seerah", facts: "In the Realm of the Quran", aqeedah: "Creed for children", about: "About the academy",
    account: "My account", register: "Create an account",
  },
} as const;

const LINKS = [
  { href: "/", key: "home" },
  { href: "/journey", key: "journey" },
  { href: "/hifz", key: "hifz" },
  { href: "/mushafi", key: "mushafi" },
  { href: "/stories", key: "stories" },
  { href: "/seerah", key: "seerah" },
  { href: "/companions", key: "companions" },
  { href: "/names-of-allah", key: "namesOfAllah" },
  { href: "/quran-facts", key: "facts" },
  { href: "/aqeedah", key: "aqeedah" },
  { href: "/listen", key: "listen" },
  { href: "/about", key: "about" },
] as const;

export function MobileMenu() {
  const { locale, direction } = useLocale();
  const { session } = useAuth();
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const t = copy[locale];
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const focusableChildren = () =>
    Array.from(panel.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) ?? []).filter(element => !element.hidden);

  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  // Opened on a phone and then rotated or resized past the breakpoint, the
  // drawer would sit there modal with its trigger no longer on screen.
  useEffect(() => {
    if (!open) return;
    const wide = window.matchMedia("(min-width: 821px)");
    const onChange = () => { if (wide.matches) setOpen(false); };
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, [open]);

  // Escape closes it, and the page behind it does not scroll while it is over.
  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = focusableChildren();
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button
        type="button"
        ref={trigger}
        className="mobile-menu-button"
        aria-label={t.open}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      {open && createPortal(
      <div className="mobile-menu" dir={direction}>
        <button type="button" className="mobile-menu__scrim" aria-label={t.close} onClick={close} tabIndex={-1} />
        <div
          id="mobile-menu"
          className="mobile-menu__panel"
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
          ref={panel}
          tabIndex={-1}
          onKeyDown={trapFocus}
        >
          <div className="mobile-menu__head">
            <span className="brand-mark"><span className="brand-mark__seal">ي</span><span><b>Yahya</b> Quran Academy</span></span>
            <button ref={closeButton} type="button" className="mobile-menu__close" aria-label={t.close} onClick={close}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={t.title}>
            {LINKS.map(({ href, key }) => {
              const active = href === "/" ? location === "/" : location.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`mobile-menu__link${active ? " is-current" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={close}
                >
                  {key === "facts" ? <Sparkles size={17} aria-hidden="true" /> : null}
                  {t[key]}
                </Link>
              );
            })}
          </nav>

          <Link href={session ? "/profile" : "/register"} className="mobile-menu__account" onClick={close}>
            {session ? <UserRound size={16} aria-hidden="true" /> : <LogIn size={16} aria-hidden="true" />}
            {session ? t.account : t.register}
          </Link>
        </div>
      </div>,
      document.body,
      )}
    </>
  );
}

export default MobileMenu;
