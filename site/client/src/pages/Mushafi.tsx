// =============================================================================
// مصحفي (Mushafi) — a page-image mushaf reader, distinct from the retired
// standalone /read reader. That one rendered ayah text and was folded into the
// hifz journey. This one shows the real printed mushaf page — a colored
// Tajweed Hafs mushaf — as an image, because the Quran text itself must never
// be re-typeset, OCR'd, or reconstructed. The PDF page is the visual source of
// truth; this reader only decides which page to show, never what it says.
//
// Source handling: the source PDF has 606 pages but only 604 real mushaf
// pages — two are printed twice (see quran-page-map.ts, verified visually
// before any code was written). The mapping utility skips the duplicates so
// nobody here ever sees reader page "492 (again)". The page IMAGES themselves
// live on the same public R2 bucket as the recitation audio, not in the repo:
// 604 crisp pages is the same "large binary" shape as the audio already
// solved that way (see mushafi-pages.ts).
// =============================================================================

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link, useLocation, useRoute } from "wouter";
import {
  ArrowRight, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Info, List, Maximize, Minimize,
  RotateCcw, Search, Settings2, X, ZoomIn, ZoomOut,
} from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { getQuranSourcePage, isValidReaderPage, READER_PAGE_COUNT } from "@/lib/quran-page-map";
import { mushafiPageUrl } from "@/lib/mushafi-pages";
import { addBookmark, isBookmarked, readBookmarks, readLastPage, removeBookmark, writeLastPage, type QuranBookmark } from "@/lib/mushafi-store";
import { searchMushafiIndex } from "@/lib/mushafi-index";
import "./mushafi.css";

const copy = {
  ar: {
    eyebrow: "المصحف الشريف",
    title: "مصحفي",
    intro: "بين يديك المصحف الشريف برواية حفص عن عاصم، بالرسم العثماني، مع تلوين أحكام التجويد لتسهيل القراءة والتعلّم.",
    intro2: "يمكنك تصفح صفحات المصحف بهدوء، والانتقال مباشرة إلى الصفحة التي تريدها، والعودة إلى آخر موضع وصلت إليه.",
    intro3: "نرجو أن تكون هذه المساحة رفيقًا لك في القراءة والحفظ والتدبر.",
    start: "ابدأ القراءة",
    continueFrom: (page: number) => `متابعة من آخر صفحة — صفحة ${page}`,
    unchangedNote: "يعرض الموقع صفحات المصحف كما هي دون تغيير في النص القرآني.",
    back: "رجوع",
    pageOf: (page: number, total: number) => `${page} / ${total}`,
    prev: "الصفحة السابقة",
    next: "الصفحة التالية",
    more: "المزيد",
    close: "إغلاق",
    zoomIn: "تكبير الصفحة",
    zoomOut: "تصغير الصفحة",
    fitWidth: "ملء العرض",
    fitPage: "ملء الشاشة",
    goToPage: "اذهب إلى صفحة",
    goToPagePlaceholder: `من ١ إلى ${READER_PAGE_COUNT}`,
    go: "اذهب",
    invalidPage: `رقم الصفحة يجب أن يكون بين 1 و${READER_PAGE_COUNT}.`,
    surahIndex: "فهرس السور",
    searchSurah: "ابحث عن سورة",
    surahNumber: "رقم السورة",
    startPagePending: "قيد التحقق",
    startPageLabel: "صفحة البداية",
    about: "معلومات عن المصحف",
    aboutBody: "نسخة مصورة من مصحف ملون بأحكام التجويد، برواية حفص عن عاصم، بالرسم العثماني. الصفحة المعروضة هي نفس صفحة المصحف المطبوع دون أي تعديل في النص.",
    readingMode: "وضع القراءة",
    exitReadingMode: "الخروج من وضع القراءة",
    bookmarkAdd: "احفظ الموضع",
    bookmarkRemove: "إلغاء حفظ الموضع",
    savedPositions: "مواضعي المحفوظة",
    noBookmarks: "لا يوجد مواضع محفوظة بعد.",
    openBookmark: (page: number) => `اذهب إلى الصفحة ${page}`,
    removeBookmarkAria: (page: number) => `احذف الموضع المحفوظ عند الصفحة ${page}`,
    errorTitle: "تعذر تحميل الصفحة.",
    errorRetry: "حاول مرة أخرى",
    invalidRoutePage: "رقم الصفحة غير موجود في المصحف.",
    backToMushafi: "العودة إلى مصحفي",
    menu: "القائمة",
  },
  en: {
    eyebrow: "The Holy Mushaf",
    title: "Mushafi",
    intro: "Here is the mushaf in the narration of Hafs from Aasim, in the Uthmani script, with Tajweed rules colored to make reading and learning easier.",
    intro2: "Browse the mushaf calmly, jump straight to any page you want, and return to wherever you last left off.",
    intro3: "We hope this space is a companion for you in reading, memorizing, and reflecting.",
    start: "Start reading",
    continueFrom: (page: number) => `Continue from page ${page}`,
    unchangedNote: "This site shows mushaf pages exactly as printed, with no change to the Quranic text.",
    back: "Back",
    pageOf: (page: number, total: number) => `${page} / ${total}`,
    prev: "Previous page",
    next: "Next page",
    more: "More",
    close: "Close",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    fitWidth: "Fit width",
    fitPage: "Fit page",
    goToPage: "Go to page",
    goToPagePlaceholder: `1 to ${READER_PAGE_COUNT}`,
    go: "Go",
    invalidPage: `Page number must be between 1 and ${READER_PAGE_COUNT}.`,
    surahIndex: "Surah index",
    searchSurah: "Search for a surah",
    surahNumber: "Surah #",
    startPagePending: "Pending verification",
    startPageLabel: "Start page",
    about: "About this mushaf",
    aboutBody: "A scanned, Tajweed-colored mushaf, in the narration of Hafs from Aasim, in the Uthmani script. The page shown is identical to the printed mushaf, with no change to the text.",
    readingMode: "Reading mode",
    exitReadingMode: "Exit reading mode",
    bookmarkAdd: "Save this position",
    bookmarkRemove: "Remove saved position",
    savedPositions: "My saved positions",
    noBookmarks: "No saved positions yet.",
    openBookmark: (page: number) => `Go to page ${page}`,
    removeBookmarkAria: (page: number) => `Remove the saved position at page ${page}`,
    errorTitle: "This page could not load.",
    errorRetry: "Try again",
    invalidRoutePage: "That page number does not exist in the mushaf.",
    backToMushafi: "Back to Mushafi",
    menu: "Menu",
  },
} as const;

// ---------------------------------------------------------------------------
// Intro
// ---------------------------------------------------------------------------

function MushafiIntro() {
  const { locale, direction } = useLocale();
  const t = copy[locale];
  const [lastPage, setLastPage] = useState<number | null>(null);

  useEffect(() => { setLastPage(readLastPage()); }, []);

  return (
    <main className="site-shell" dir={direction}>
      <SkipLink />
      <SiteChrome />
      <div id={MAIN_CONTENT_ID} className="mushafi-intro container" lang={locale} dir={direction}>
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p className="mushafi-intro__lead">{t.intro}</p>
        <p>{t.intro2}</p>
        <p>{t.intro3}</p>
        <div className="mushafi-intro__actions">
          <Link href="/mushafi/1" className="button button--primary">{t.start}</Link>
          {lastPage ? (
            <Link href={`/mushafi/${lastPage}`} className="button button--soft">
              {t.continueFrom(lastPage)}
            </Link>
          ) : null}
        </div>
        <p className="mushafi-intro__note">{t.unchangedNote}</p>
      </div>
      <SiteFooter />
    </main>
  );
}

// ---------------------------------------------------------------------------
// Reader
// ---------------------------------------------------------------------------

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;
const SWIPE_THRESHOLD = 50;
const HIDE_CONTROLS_AFTER_MS = 4000;

type SheetView = null | "menu" | "jump" | "index" | "about" | "bookmarks";

function MushafiReader({ page }: { page: number }) {
  const { locale, direction } = useLocale();
  const t = copy[locale];
  const [, setLocation] = useLocation();

  const [zoom, setZoom] = useState(1);
  const [fitMode, setFitMode] = useState<"width" | "page">("width");
  const [controlsVisible, setControlsVisible] = useState(true);
  const [sheet, setSheet] = useState<SheetView>(null);
  const [readingMode, setReadingMode] = useState(false);
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(page));
  const [bookmarks, setBookmarks] = useState<QuranBookmark[]>([]);
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [retryNonce, setRetryNonce] = useState(0);
  const [jumpValue, setJumpValue] = useState("");
  const [jumpError, setJumpError] = useState("");
  const [indexQuery, setIndexQuery] = useState("");

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const sourcePage = getQuranSourcePage(page);
  const imageUrl = sourcePage ? mushafiPageUrl(page) : null;

  // Persist the last read page, and keep the bookmark star in sync when the
  // page changes (e.g. via prev/next, not just a fresh route load).
  useEffect(() => {
    writeLastPage(page);
    setBookmarked(isBookmarked(page));
    setImageStatus("loading");
  }, [page]);

  // Preload the neighbours so paging feels instant — never the whole set.
  useEffect(() => {
    for (const neighbour of [page - 1, page + 1, page + 2]) {
      const url = mushafiPageUrl(neighbour);
      if (url) { const img = new Image(); img.src = url; }
    }
  }, [page]);

  // Arms (or re-arms) the auto-fade timer without forcing visibility — that
  // way a tap that HIDES the controls doesn't get raced back to visible by
  // the same batch of state updates.
  const armHideTimer = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), HIDE_CONTROLS_AFTER_MS);
  }, []);

  useEffect(() => {
    setControlsVisible(true);
    armHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [page, armHideTimer]);

  const goToPage = useCallback((next: number) => {
    if (!isValidReaderPage(next)) return;
    setSheet(null);
    setLocation(`/mushafi/${next}`);
  }, [setLocation]);

  const goPrevious = useCallback(() => goToPage(page - 1), [goToPage, page]);
  const goNext = useCallback(() => goToPage(page + 1), [goToPage, page]);

  // Arabic mushaf reading direction: right arrow goes back toward the start,
  // left arrow goes forward, matching how pages advance right-to-left.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (sheet) { if (e.key === "Escape") setSheet(null); return; }
      if (e.key === "ArrowRight") goPrevious();
      else if (e.key === "ArrowLeft") goNext();
      else if (e.key === "Escape" && readingMode) void document.exitFullscreen?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrevious, goNext, sheet, readingMode]);

  useEffect(() => {
    function onFullscreenChange() { setReadingMode(Boolean(document.fullscreenElement)); }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  function toggleReadingMode() {
    if (document.fullscreenElement) void document.exitFullscreen?.();
    else void stageRef.current?.closest(".mushafi-reader")?.requestFullscreen?.();
  }

  function onPointerDown(e: ReactPointerEvent) {
    if (zoom > 1) return; // zoomed in: let the browser pan/scroll instead of paging
    dragStart.current = { x: e.clientX, y: e.clientY };
  }
  function onPointerUp(e: ReactPointerEvent) {
    const start = dragStart.current;
    dragStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) {
      setControlsVisible(v => {
        const next = !v;
        if (next) armHideTimer(); else if (hideTimer.current) clearTimeout(hideTimer.current);
        return next;
      });
      return;
    }
    if (dx < 0) goNext(); else goPrevious();
  }

  function onDoubleClick() {
    setZoom(z => (z > 1 ? 1 : 1.5));
    setFitMode("width");
  }

  function openJump() {
    setJumpValue("");
    setJumpError("");
    setSheet("jump");
  }
  function submitJump(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(jumpValue);
    if (!isValidReaderPage(value)) { setJumpError(t.invalidPage); return; }
    goToPage(value);
  }

  function toggleBookmark() {
    if (bookmarked) { removeBookmark(page); setBookmarked(false); }
    else { addBookmark(page); setBookmarked(true); }
  }

  function openBookmarks() {
    setBookmarks(readBookmarks());
    setSheet("bookmarks");
  }

  if (!sourcePage || !imageUrl) {
    return (
      <div className="mushafi-reader mushafi-reader--invalid" dir={direction} lang={locale}>
        <p>{t.invalidRoutePage}</p>
        <Link href="/mushafi" className="button button--primary">{t.backToMushafi}</Link>
      </div>
    );
  }

  const filteredIndex = searchMushafiIndex(indexQuery);

  return (
    <div className={`mushafi-reader${readingMode ? " mushafi-reader--fullscreen" : ""}`} dir={direction} lang={locale}>
      <div className={`mushafi-reader__topbar${controlsVisible ? "" : " is-hidden"}`}>
        <Link href="/mushafi" className="mushafi-icon-btn" aria-label={t.back}>
          <ArrowRight size={20} aria-hidden="true" />
        </Link>
        <span className="mushafi-reader__title">{t.title}</span>
        <button type="button" className="mushafi-icon-btn" aria-label={t.more} onClick={() => setSheet("menu")}>
          <Settings2 size={20} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={stageRef}
        className="mushafi-reader__stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onDoubleClick={onDoubleClick}
      >
        {imageStatus === "error" ? (
          <div className="mushafi-error" role="alert">
            <p>{t.errorTitle}</p>
            <button type="button" className="button button--primary" onClick={() => { setImageStatus("loading"); setRetryNonce(n => n + 1); }}>
              <RotateCcw size={16} aria-hidden="true" /> {t.errorRetry}
            </button>
          </div>
        ) : (
          <div key={page} className="mushafi-reader__page-wrap">
            <img
              className={`mushafi-reader__image mushafi-reader__image--${fitMode}`}
              style={{ transform: `scale(${zoom})` }}
              src={retryNonce ? `${imageUrl}?retry=${retryNonce}` : imageUrl}
              alt=""
              draggable={false}
              onLoad={() => setImageStatus("loaded")}
              onError={() => setImageStatus("error")}
            />
          </div>
        )}
      </div>

      <div className={`mushafi-reader__bottombar${controlsVisible ? "" : " is-hidden"}`}>
        <button type="button" className="mushafi-icon-btn" aria-label={t.prev} onClick={goPrevious} disabled={page <= 1}>
          <ChevronRight size={22} aria-hidden="true" />
        </button>
        <button type="button" className="mushafi-reader__page-indicator" onClick={openJump}>
          {t.pageOf(page, READER_PAGE_COUNT)}
        </button>
        <button type="button" className="mushafi-icon-btn" aria-label={t.next} onClick={goNext} disabled={page >= READER_PAGE_COUNT}>
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
      </div>

      {sheet ? (
        <div className="mushafi-sheet" role="dialog" aria-modal="true" aria-label={t.menu}>
          <button type="button" className="mushafi-sheet__backdrop" aria-label={t.close} onClick={() => setSheet(null)} />
          <div className="mushafi-sheet__panel">
            <div className="mushafi-sheet__handle-row">
              <button type="button" className="mushafi-icon-btn" aria-label={t.close} onClick={() => setSheet(null)}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {sheet === "menu" && (
              <ul className="mushafi-sheet__menu">
                <li>
                  <button type="button" onClick={openJump}><Search size={18} aria-hidden="true" /> {t.goToPage}</button>
                </li>
                <li className="mushafi-sheet__zoom-row">
                  <ZoomOut size={18} aria-hidden="true" />
                  <button type="button" aria-label={t.zoomOut} onClick={() => setZoom(z => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))} disabled={zoom <= MIN_ZOOM}>−</button>
                  <span>{Math.round(zoom * 100)}%</span>
                  <button type="button" aria-label={t.zoomIn} onClick={() => setZoom(z => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))} disabled={zoom >= MAX_ZOOM}>+</button>
                  <ZoomIn size={18} aria-hidden="true" />
                </li>
                <li className="mushafi-sheet__fit-row">
                  <button type="button" className={fitMode === "width" ? "is-active" : ""} onClick={() => { setFitMode("width"); setZoom(1); }}>{t.fitWidth}</button>
                  <button type="button" className={fitMode === "page" ? "is-active" : ""} onClick={() => { setFitMode("page"); setZoom(1); }}>{t.fitPage}</button>
                </li>
                <li>
                  <button type="button" onClick={toggleReadingMode}>
                    {readingMode ? <Minimize size={18} aria-hidden="true" /> : <Maximize size={18} aria-hidden="true" />}
                    {readingMode ? t.exitReadingMode : t.readingMode}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={toggleBookmark}>
                    {bookmarked ? <BookmarkCheck size={18} aria-hidden="true" /> : <Bookmark size={18} aria-hidden="true" />}
                    {bookmarked ? t.bookmarkRemove : t.bookmarkAdd}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={openBookmarks}><List size={18} aria-hidden="true" /> {t.savedPositions}</button>
                </li>
                <li>
                  <button type="button" onClick={() => setSheet("index")}><List size={18} aria-hidden="true" /> {t.surahIndex}</button>
                </li>
                <li>
                  <button type="button" onClick={() => setSheet("about")}><Info size={18} aria-hidden="true" /> {t.about}</button>
                </li>
              </ul>
            )}

            {sheet === "jump" && (
              <form className="mushafi-sheet__jump" onSubmit={submitJump}>
                <label htmlFor="mushafi-jump-input">{t.goToPage}</label>
                <input
                  id="mushafi-jump-input"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={READER_PAGE_COUNT}
                  placeholder={t.goToPagePlaceholder}
                  value={jumpValue}
                  onChange={e => { setJumpValue(e.target.value); setJumpError(""); }}
                  autoFocus
                />
                {jumpError && <p className="mushafi-sheet__error" role="alert">{jumpError}</p>}
                <button type="submit" className="button button--primary">{t.go}</button>
              </form>
            )}

            {sheet === "index" && (
              <div className="mushafi-sheet__index">
                <label htmlFor="mushafi-index-search" className="sr-only">{t.searchSurah}</label>
                <input
                  id="mushafi-index-search"
                  type="search"
                  placeholder={t.searchSurah}
                  value={indexQuery}
                  onChange={e => setIndexQuery(e.target.value)}
                  autoFocus
                />
                <ul>
                  {filteredIndex.map(entry => (
                    <li key={entry.number}>
                      <span className="mushafi-sheet__index-name">{locale === "en" ? entry.englishName : entry.name}</span>
                      <span className="mushafi-sheet__index-number">{entry.number}</span>
                      <span className="mushafi-sheet__index-page">{t.startPageLabel}: {t.startPagePending}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sheet === "bookmarks" && (
              <div className="mushafi-sheet__bookmarks">
                {bookmarks.length === 0 ? (
                  <p>{t.noBookmarks}</p>
                ) : (
                  <ul>
                    {bookmarks.map(b => (
                      <li key={b.pageNumber}>
                        <button type="button" onClick={() => goToPage(b.pageNumber)}>{t.openBookmark(b.pageNumber)}</button>
                        <button
                          type="button"
                          className="mushafi-icon-btn"
                          aria-label={t.removeBookmarkAria(b.pageNumber)}
                          onClick={() => setBookmarks(removeBookmark(b.pageNumber))}
                        >
                          <X size={16} aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {sheet === "about" && (
              <div className="mushafi-sheet__about">
                <p>{t.aboutBody}</p>
                <p className="mushafi-intro__note">{t.unchangedNote}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------

export default function Mushafi() {
  const [matchesPage, params] = useRoute("/mushafi/:page");
  const pageNumber = useMemo(() => (params?.page ? Number(params.page) : null), [params?.page]);

  if (matchesPage && pageNumber !== null) {
    return <MushafiReader page={pageNumber} />;
  }
  return <MushafiIntro />;
}
