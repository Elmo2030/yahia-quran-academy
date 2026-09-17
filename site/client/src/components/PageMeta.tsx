import { useEffect } from "react";
import { useLocation } from "wouter";
import { localizedMeta, metaForPath, SITE_NAME, SITE_NAME_EN } from "@/lib/page-meta";
import { useLocale } from "@/contexts/LocaleContext";

const ORIGIN = "https://yahyaquran.com";

/**
 * Per-route document metadata.
 *
 * React 19 hoists title, meta and link out of the tree into <head>, so this
 * renders once near the root and follows the router. The tags it emits replace
 * the placeholders in index.html rather than joining them — see the comment
 * there — so a crawler that runs JavaScript reads the same values the
 * Cloudflare function stamps in for the ones that do not.
 */
export function PageMeta() {
  const [pathname] = useLocation();
  const { locale } = useLocale();
  // The Meta objects carry English variants; nothing was reading them, so every
  // tab title, bookmark and search result stayed Arabic for an English reader.
  const meta = localizedMeta(metaForPath(pathname), locale);
  const path = `${ORIGIN}${meta.path === "/" ? "/" : meta.path}`;
  // English is served off the same path with ?lang=en, and the page declares
  // that address as its English alternate. Giving it the bare path as its
  // canonical told search engines the English page was really the Arabic one,
  // so the pair was folded together and only the Arabic snippet ever showed.
  const url = locale === "en" ? `${path}?lang=en` : path;
  const image = meta.image.startsWith("http") ? meta.image : `${ORIGIN}${meta.image}`;

  // The shell ships placeholder tags marked data-default so a crawler without
  // JavaScript still gets something. React renders its own alongside them, so a
  // reader taking the first match would get the site default rather than this
  // page. Drop the marked ones once React's are in — by attribute, because
  // React reuses head elements and walking by position takes its title too.
  useEffect(() => {
    document.head.querySelectorAll("[data-default]").forEach(el => el.remove());
  }, []);

  return (
    <>
      {/* No <html> tag here. React only hoists title, meta and link; an <html>
          element rendered inside #root is dropped from the DOM and warns that
          it cannot sit inside a div. LocaleProvider sets lang and dir on the
          real root element, which is where they belong. */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      {/* Stated per page and in both directions, so neither language is left
          claiming to be the other. */}
      {!meta.noindex && <link rel="alternate" hrefLang="ar" href={path} />}
      {!meta.noindex && <link rel="alternate" hrefLang="en" href={`${path}?lang=en`} />}
      {!meta.noindex && <link rel="alternate" hrefLang="x-default" href={path} />}
      {/* Auth, account and not-found routes ask to stay out of the index.
          Without this the flag was declared and never acted on. */}
      {meta.noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={meta.path === "/" ? "website" : "article"} />
      <meta property="og:site_name" content={locale === "en" ? SITE_NAME_EN : SITE_NAME} />
      <meta property="og:locale" content={locale === "en" ? "en_US" : "ar_AR"} />
      <meta property="og:locale:alternate" content={locale === "en" ? "ar_AR" : "en_US"} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
