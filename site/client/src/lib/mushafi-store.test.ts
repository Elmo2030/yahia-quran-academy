// @vitest-environment jsdom
import { describe, expect, it, beforeEach } from "vitest";
import {
  readLastPage, writeLastPage, readBookmarks, addBookmark, removeBookmark, isBookmarked,
} from "@/lib/mushafi-store";

describe("last page", () => {
  beforeEach(() => localStorage.clear());

  it("returns null when nothing was saved", () => {
    expect(readLastPage()).toBeNull();
  });

  it("round-trips a valid page", () => {
    writeLastPage(125);
    expect(readLastPage()).toBe(125);
  });

  it("ignores an out-of-range page on write", () => {
    writeLastPage(0);
    writeLastPage(605);
    expect(readLastPage()).toBeNull();
  });

  it("ignores a corrupted stored value on read", () => {
    localStorage.setItem("yahya_quran_last_page", "not-a-number");
    expect(readLastPage()).toBeNull();
  });
});

describe("bookmarks", () => {
  beforeEach(() => localStorage.clear());

  it("starts empty", () => {
    expect(readBookmarks()).toEqual([]);
    expect(isBookmarked(1)).toBe(false);
  });

  it("adds and lists newest first", () => {
    addBookmark(1);
    addBookmark(50);
    const marks = readBookmarks();
    expect(marks.map(m => m.pageNumber)).toEqual([50, 1]);
  });

  it("does not duplicate the same page", () => {
    addBookmark(10);
    addBookmark(10);
    expect(readBookmarks()).toHaveLength(1);
  });

  it("removes a bookmark", () => {
    addBookmark(10);
    removeBookmark(10);
    expect(readBookmarks()).toEqual([]);
    expect(isBookmarked(10)).toBe(false);
  });

  it("ignores an invalid page on add", () => {
    addBookmark(0);
    addBookmark(999);
    expect(readBookmarks()).toEqual([]);
  });
});
