// =============================================================================
// hifz-characters.ts — who a child can travel with, and where their art is.
//
// Art arrives in batches. A pose that has not been converted yet is absent from
// hifz-art.generated.ts, and characterArt returns null for it so the page draws
// a placeholder instead of a broken image.
// =============================================================================

import { hifzArt } from "@/lib/hifz-art.generated";
import type { CharacterId } from "@/lib/hifz-store";

export type Pose =
  | "stand" | "avatar" | "wave" | "listen" | "recite" | "record"
  | "think" | "cheer" | "point" | "rest" | "walk" | "gift";

export type Character = {
  id: Exclude<CharacterId, "guest">;
  nameAr: string;
  nameEn: string;
  /** the letter a placeholder shows while the art is on its way */
  initial: string;
};

export const CHARACTERS: Character[] = [
  { id: "yahya", nameAr: "يحيى", nameEn: "Yahya", initial: "ي" },
  { id: "fatima", nameAr: "فاطمة", nameEn: "Fatima", initial: "ف" },
];

export type ArtSource = { src: string; srcSet: string; ratio: number };

function fromIndex(key: string): ArtSource | null {
  const entry = hifzArt[key];
  if (!entry || entry.widths.length === 0) return null;
  const largest = entry.widths[entry.widths.length - 1];
  return {
    src: `${key}-${largest}.webp`,
    srcSet: entry.widths.map(w => `${key}-${w}.webp ${w}w`).join(", "),
    ratio: entry.ratio,
  };
}

/** The guest is a character of its own — a boy in an olive thobe — with the same twelve poses. */
export function characterArt(character: CharacterId, pose: Pose): ArtSource | null {
  return fromIndex(`/hifz-art/characters/${character}/${pose}`);
}

/** The icon for one surah, or null until its art arrives. */
export const surahIcon = (surah: number) => fromIndex(`/hifz-art/surahs/${String(surah).padStart(3, "0")}`);

export const characterById = (id: CharacterId) => CHARACTERS.find(c => c.id === id) ?? null;
