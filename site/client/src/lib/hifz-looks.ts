// =============================================================================
// hifz-looks.ts — what a child may decorate their card with.
//
// Nothing here is earned, bought or locked. These are the crayons: a frame
// around the picture, a scene behind the card, a small companion on the map and
// a shelf of stickers. A child who has memorized nothing may still make their
// card theirs, because deciding how your own name looks is not a reward for
// work — and tying it to stars would turn the stars into money, which is the
// one thing they must never be.
// =============================================================================

import { hifzArt } from "@/lib/hifz-art.generated";

export type LookKind = "frame" | "card" | "pet" | "sticker";
export type LookOption = { id: string; nameAr: string; nameEn: string };

export const FRAMES: LookOption[] = [
  { id: "palm", nameAr: "سعف النخل", nameEn: "Palm fronds" },
  { id: "stars", nameAr: "النجوم", nameEn: "Stars" },
  { id: "arch", nameAr: "قوس المسجد", nameEn: "Mosque arch" },
  { id: "flowers", nameAr: "ورد الصحراء", nameEn: "Desert flowers" },
  { id: "geometric", nameAr: "الزخرفة الهندسية", nameEn: "Geometric" },
  { id: "gold", nameAr: "الذهبي", nameEn: "Gold" },
];

export const CARDS: LookOption[] = [
  { id: "dawn", nameAr: "فجر الواحة", nameEn: "Oasis dawn" },
  { id: "garden", nameAr: "البستان", nameEn: "The garden" },
  { id: "desert", nameAr: "الكثبان", nameEn: "The dunes" },
  { id: "sea", nameAr: "البحر الهادئ", nameEn: "Calm sea" },
  { id: "night", nameAr: "ليل النجوم", nameEn: "Starry night" },
  { id: "courtyard", nameAr: "صحن المسجد", nameEn: "Mosque courtyard" },
];

export const PETS: LookOption[] = [
  { id: "cat", nameAr: "قطة", nameEn: "Cat" },
  { id: "camel", nameAr: "جمل", nameEn: "Camel" },
  { id: "bird", nameAr: "عصفور", nameEn: "Bird" },
];

export const STICKERS: LookOption[] = [
  { id: "palm", nameAr: "نخلة", nameEn: "Palm" },
  { id: "moon", nameAr: "هلال", nameEn: "Crescent" },
  { id: "lantern", nameAr: "فانوس", nameEn: "Lantern" },
  { id: "date", nameAr: "بلحة", nameEn: "Date" },
  { id: "dove", nameAr: "حمامة", nameEn: "Dove" },
  { id: "book", nameAr: "كتاب", nameEn: "Book" },
  { id: "star", nameAr: "نجمة", nameEn: "Star" },
  { id: "drop", nameAr: "نقطة ماء", nameEn: "Drop" },
];

const CATALOGUE: Record<LookKind, LookOption[]> = { frame: FRAMES, card: CARDS, pet: PETS, sticker: STICKERS };
const FOLDER: Record<LookKind, string> = { frame: "frames", card: "cards", pet: "pets", sticker: "stickers" };

/** The shelf holds every sticker there is, so this is a ceiling, not a budget. */
export const MAX_STICKERS = STICKERS.length;

export type Looks = {
  frame: string | null;
  card: string | null;
  pet: string | null;
  stickers: string[];
};

export const DEFAULT_LOOKS: Looks = { frame: null, card: null, pet: null, stickers: [] };

export const optionsOf = (kind: LookKind) => CATALOGUE[kind];

export const lookName = (kind: LookKind, id: string, locale: "ar" | "en") => {
  const option = CATALOGUE[kind].find(o => o.id === id);
  return option ? (locale === "ar" ? option.nameAr : option.nameEn) : id;
};

export type LookArt = { src: string; srcSet: string; ratio: number };

/**
 * Art that has not been converted yet is simply absent from the generated
 * index, and the screen draws the option as a plain name instead of a broken
 * image, the way the character poses already do.
 */
export function lookArt(kind: LookKind, id: string): LookArt | null {
  const key = `/hifz-art/shop/${FOLDER[kind]}/${id}`;
  const entry = hifzArt[key];
  if (!entry || entry.widths.length === 0) return null;
  const largest = entry.widths[entry.widths.length - 1];
  return {
    src: `${key}-${largest}.webp`,
    srcSet: entry.widths.map(w => `${key}-${w}.webp ${w}w`).join(", "),
    ratio: entry.ratio,
  };
}

const known = (kind: LookKind, value: unknown) =>
  typeof value === "string" && CATALOGUE[kind].some(o => o.id === value) ? value : null;

/** Anything unrecognised is dropped rather than repaired: a look is cosmetic. */
export function parseLooks(value: unknown): Looks {
  if (!value || typeof value !== "object") return { ...DEFAULT_LOOKS };
  const raw = value as Record<string, unknown>;
  const stickers: string[] = [];
  for (const entry of Array.isArray(raw.stickers) ? raw.stickers : []) {
    const id = known("sticker", entry);
    if (id && !stickers.includes(id)) stickers.push(id);
    if (stickers.length >= MAX_STICKERS) break;
  }
  return {
    frame: known("frame", raw.frame),
    card: known("card", raw.card),
    pet: known("pet", raw.pet),
    stickers,
  };
}
