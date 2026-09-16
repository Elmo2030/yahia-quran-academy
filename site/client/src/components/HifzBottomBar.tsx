// =============================================================================
// HifzBottomBar — the journey's four places, within a thumb's reach.
//
// Only inside /hifz, and only on a phone. The site's own header is the right
// navigation for a site; the journey is the one part a child uses like an app,
// coming back to the same four places every day — where they are, what is due,
// what they have collected, and the parent's door.
//
// It is deliberately not sitewide. A child reading a story does not need four
// permanent buttons at the bottom of it, and a bar over every page would take
// a strip of a small screen away from the Quran.
// =============================================================================

import { Link, useLocation } from "wouter";
import { Compass, Gift, RefreshCw, UserRoundCheck } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { activeProfile } from "@/lib/hifz-store";
import { dueCount } from "@/lib/hifz-review";

const copy = {
  ar: { journey: "رحلتي", review: "المراجعة", looks: "كنوزي", parent: "وليّ الأمر", due: (n: number) => `${n} مستحقة` },
  en: { journey: "My journey", review: "Review", looks: "My treasures", parent: "Parent", due: (n: number) => `${n} due` },
} as const;

export function HifzBottomBar() {
  const { locale } = useLocale();
  const [path] = useLocation();
  const { store } = useHifzStore();
  const profile = activeProfile(store);
  const t = copy[locale];

  // Nothing to navigate until a child has been chosen: the journey page is
  // still asking who is here.
  if (!profile) return null;

  const due = dueCount(profile);
  const items = [
    { href: "/hifz", label: t.journey, Icon: Compass, exact: true },
    { href: "/hifz/review", label: t.review, Icon: RefreshCw, badge: due },
    { href: "/hifz/looks", label: t.looks, Icon: Gift },
    { href: "/hifz/parent", label: t.parent, Icon: UserRoundCheck },
  ];

  return (
    <nav className="hifz-bottom-bar no-print" aria-label={t.journey}>
      {items.map(({ href, label, Icon, badge, exact }) => {
        const current = exact ? path === href : path.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`hifz-bottom-bar__item${current ? " is-current" : ""}`}
            aria-current={current ? "page" : undefined}
          >
            <span className="hifz-bottom-bar__icon">
              <Icon size={20} aria-hidden="true" />
              {badge ? <span className="hifz-bottom-bar__badge" aria-label={t.due(badge)}>{badge}</span> : null}
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
