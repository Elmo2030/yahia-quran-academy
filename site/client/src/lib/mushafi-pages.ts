/**
 * Mushaf page images live on the same public R2 bucket as the recitation
 * audio (see recitations.ts) rather than in the git repo — 604 crisp page
 * images run well over 100 MB, the same "heavy binary" problem audio already
 * solved this way.
 */
import { isValidReaderPage } from "@/lib/quran-page-map";

const R2_BASE = "https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev/mushaf-pages";

export function mushafiPageUrl(page: number): string | null {
  return isValidReaderPage(page) ? `${R2_BASE}/${page}.webp` : null;
}
