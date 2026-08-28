import { useEffect } from "react";
import { useLocation } from "wouter";
import { metaForPath, SITE_NAME } from "@/lib/page-meta";

const ORIGIN = "https://yahia-quran-academy.pages.dev";

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
  const meta = metaForPath(pathname);
  const url = `${ORIGIN}${meta.path === "/" ? "/" : meta.path}`;
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
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={meta.path === "/" ? "website" : "article"} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ar_AR" />
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
