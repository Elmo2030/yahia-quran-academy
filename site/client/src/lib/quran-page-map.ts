/**
 * Reader-page → source-PDF-page mapping for the colored Tajweed mushaf
 * (altgweed__colored__white.pdf, Hafs 'an 'Asim, 606 PDF pages).
 *
 * The source PDF repeats two pages verbatim: PDF page 492 is the same page as
 * 491 (both print folio ٤٩١), and PDF page 572 is the same page as 571 (both
 * print folio ٥٧٠) — verified visually, not assumed. Removing those two
 * duplicates yields exactly 604 real mushaf pages. Rather than editing the
 * PDF, the reader skips them: reader page N maps to whichever source page
 * holds that content once the duplicates are excluded from the count.
 */

export const READER_PAGE_COUNT = 604;

const FIRST_DUPLICATE_AT = 492; // reader page after which the +1 offset starts
const SECOND_DUPLICATE_AT = 571; // reader page after which the +2 offset starts

/**
 * Returns the 1-based source PDF page for a given 1-based reader page
 * (1–604), or null for anything outside that range or non-integer input.
 */
export function getQuranSourcePage(readerPage: number): number | null {
  if (!Number.isInteger(readerPage)) return null;
  if (readerPage < 1 || readerPage > READER_PAGE_COUNT) return null;

  if (readerPage < FIRST_DUPLICATE_AT) return readerPage;
  if (readerPage < SECOND_DUPLICATE_AT) return readerPage + 1;
  return readerPage + 2;
}

export function isValidReaderPage(page: unknown): page is number {
  return typeof page === "number" && Number.isInteger(page) && page >= 1 && page <= READER_PAGE_COUNT;
}
