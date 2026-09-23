import { Suspense, useRef } from "react";
import { useLocation } from "wouter";
import { useLocale } from "@/contexts/LocaleContext";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

const PageMetaTags = lazyWithRetry(() => import("./PageMetaTags"));

// What the Cloudflare function stamped into the page for this request: it sets
// <html lang> from ?lang=en along with every tag PageMetaTags would render.
// Read at import, before LocaleProvider gets to change it.
const SERVED_LANG = typeof document === "undefined" ? "" : document.documentElement.lang;

/**
 * Loads the route metadata only once the page it was served with is out of
 * date.
 *
 * Naming every route means page-meta.ts and the full generated index — tens
 * of KB gzipped that every first visit used to wait on, only to render the
 * same title and description the Cloudflare function had already written into
 * the HTML. So the first page keeps the function's tags, and PageMetaTags
 * arrives with the first navigation or language switch. Development has no
 * function in front of it, so there it always loads.
 */
export function PageMeta() {
  const [pathname] = useLocation();
  const { locale } = useLocale();
  const firstPath = useRef(pathname);
  const needed = useRef(false);
  if (import.meta.env.DEV || pathname !== firstPath.current || locale !== SERVED_LANG) needed.current = true;
  if (!needed.current) return null;
  return (
    <Suspense fallback={null}>
      <PageMetaTags />
    </Suspense>
  );
}
