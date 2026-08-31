// =============================================================================
// SkipLink — "skip to content" for the pages that use the bespoke site-shell
// chrome rather than SiteHeader.
//
// WCAG 2.4.1: a keyboard or screen-reader user should be able to jump past the
// header and navigation. SiteHeader has always carried one, but Home, Stories,
// Seerah and the Reader render their own header markup and had none, so every
// public content page made you tab through the whole nav first.
// =============================================================================

import { useLocale } from "@/contexts/LocaleContext";

export const MAIN_CONTENT_ID = "main-content";

export function SkipLink() {
  const { locale } = useLocale();
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
      {locale === "ar" ? "تخطّي إلى المحتوى" : "Skip to content"}
    </a>
  );
}

export default SkipLink;
