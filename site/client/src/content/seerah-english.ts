// =============================================================================
// seerah-english.ts — the English Seerah, fetched only when it is read.
//
// An Arabic reader never makes the request. An English reader's page waits on
// it once (SeerahDetail shows its loading line), and after that every
// component reads the cached copy synchronously.
//
// Not `use()`, as stories-english.ts does: under the test renderer a
// component suspended on `use()` never resumed, so no English Seerah page
// could be tested at all. A plain effect behaves the same in both.
// =============================================================================

import { useEffect, useState } from "react";
import type { SeerahText } from "@/content/seerah";

let cache: Record<string, SeerahText> | null = null;
let pending: Promise<Record<string, SeerahText>> | null = null;
const load = () =>
  (pending ??= import("@/content/seerah-en").then(module => (cache = module.seerahEnglish)));

/** Every story's English text once it has arrived; null in Arabic, and null
 *  for the moment an English reader's first Seerah page is loading it. */
export function useSeerahEnglish(locale: "ar" | "en"): Record<string, SeerahText> | null {
  const [, setLoaded] = useState(cache !== null);
  useEffect(() => {
    if (locale !== "en" || cache) return;
    let live = true;
    void load().then(() => { if (live) setLoaded(true); });
    return () => { live = false; };
  }, [locale]);
  return locale === "en" ? cache : null;
}
