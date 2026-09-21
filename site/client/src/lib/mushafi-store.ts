/**
 * Local-only state for the mushaf page reader: last page read and saved
 * positions. No login required — this never leaves the device, matching the
 * hifz journey's own local-first promise.
 */
import { isValidReaderPage } from "@/lib/quran-page-map";

const LAST_PAGE_KEY = "yahya_quran_last_page";
const BOOKMARKS_KEY = "yahya.quran.bookmarks.v1";
const MAX_BOOKMARKS = 50;

export type QuranBookmark = { pageNumber: number; createdAt: number };

const storage = (): Storage | null => {
  try { return window.localStorage; } catch { return null; }
};

export function readLastPage(): number | null {
  try {
    const raw = storage()?.getItem(LAST_PAGE_KEY);
    if (!raw) return null;
    const page = Number(raw);
    return isValidReaderPage(page) ? page : null;
  } catch {
    return null;
  }
}

export function writeLastPage(page: number): void {
  if (!isValidReaderPage(page)) return;
  try { storage()?.setItem(LAST_PAGE_KEY, String(page)); } catch { /* private mode */ }
}

export function readBookmarks(): QuranBookmark[] {
  try {
    const raw = storage()?.getItem(BOOKMARKS_KEY);
    const values = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(values)) return [];
    return values
      .filter((v): v is QuranBookmark =>
        v && typeof v === "object" && isValidReaderPage(v.pageNumber) && typeof v.createdAt === "number")
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks: QuranBookmark[]): void {
  try { storage()?.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks.slice(0, MAX_BOOKMARKS))); } catch { /* private mode */ }
}

export function addBookmark(page: number): QuranBookmark[] {
  if (!isValidReaderPage(page)) return readBookmarks();
  const existing = readBookmarks().filter(b => b.pageNumber !== page);
  const next = [{ pageNumber: page, createdAt: Date.now() }, ...existing];
  saveBookmarks(next);
  return next;
}

export function removeBookmark(page: number): QuranBookmark[] {
  const next = readBookmarks().filter(b => b.pageNumber !== page);
  saveBookmarks(next);
  return next;
}

export function isBookmarked(page: number): boolean {
  return readBookmarks().some(b => b.pageNumber === page);
}
