import { aqeedahCardIndex, factIndex, seerahStoryIndex, storyIndex } from "@/lib/page-index.generated";
import { surahProgress, type ChildProfile } from "@/lib/hifz-store";
import { JOURNEY_SURAHS, ayahCountOf } from "@/lib/juz-amma";
import { companionIndex } from "./companion-index.generated";

export type WorldState = "available" | "active" | "completed" | "locked" | "comingSoon";
export type WorldSymbol = "book" | "town" | "mountain" | "spark" | "compass" | "tent" | "tree";
export type JourneyWorld = {
  id: string;
  title: { ar: string; en: string };
  symbol: WorldSymbol;
  landscape: "oasis" | "valley" | "hills" | "sky";
  illustration?: string;
  href?: string;
  comingSoon?: boolean;
  onMap?: boolean;
};

// Presentation metadata only: availability never creates a curriculum lock.
export const journeyWorlds: readonly JourneyWorld[] = [
  { id: "hifz", title: { ar: "رحلة الحفظ", en: "Memorization" }, symbol: "compass", landscape: "oasis", href: "/hifz" },
  { id: "stories", title: { ar: "قصص القرآن", en: "Quran stories" }, symbol: "book", landscape: "oasis", href: "/stories" },
  { id: "seerah", title: { ar: "السيرة النبوية", en: "The Prophet’s Seerah" }, symbol: "town", landscape: "valley", href: "/seerah" },
  { id: "aqeedah", title: { ar: "العقيدة", en: "Creed" }, symbol: "mountain", landscape: "hills", href: "/aqeedah" },
  { id: "facts", title: { ar: "في رحاب القرآن", en: "Quran discoveries" }, symbol: "spark", landscape: "sky", href: "/quran-facts" },
  { id: "quran", title: { ar: "قراءة القرآن", en: "Quran reading" }, symbol: "book", landscape: "oasis", href: "/read/1" },
  { id: "companions", title: { ar: "الصحابة", en: "The companions" }, symbol: "tent", landscape: "valley", href: "/companions", onMap: true },
  { id: "manners", title: { ar: "آداب الإسلام", en: "Islamic manners" }, symbol: "tree", landscape: "hills", comingSoon: true, onMap: true },
  { id: "values", title: { ar: "القيم والأخلاق", en: "Values & character" }, symbol: "tree", landscape: "hills", comingSoon: true },
  { id: "prophets", title: { ar: "الأنبياء", en: "The prophets" }, symbol: "book", landscape: "oasis", comingSoon: true },
  { id: "history", title: { ar: "التاريخ الإسلامي", en: "Islamic history" }, symbol: "town", landscape: "valley", comingSoon: true },
  { id: "worship", title: { ar: "عباداتي", en: "My worship" }, symbol: "compass", landscape: "oasis", comingSoon: true },
  { id: "remembrance", title: { ar: "أدعيتي وأذكاري", en: "Dua & remembrance" }, symbol: "spark", landscape: "sky", comingSoon: true },
  { id: "nature", title: { ar: "العالم من حولنا", en: "The world around us" }, symbol: "tree", landscape: "hills", comingSoon: true },
];

export type WorldProgress = { count: number; total: number };
export function journeyWorldProgress(profile: ChildProfile | null, discovered: readonly string[]): Record<string, WorldProgress> {
  const steps = profile?.character !== "guest" ? profile?.steps ?? {} : {};
  const done = (key: string) => steps[key]?.status === "done";
  return {
    stories: { count: storyIndex.filter(s => done(`story:${s.chapter}:${s.slug}`)).length, total: storyIndex.length },
    seerah: { count: seerahStoryIndex.filter(s => done(`seerah:${s.slug}`)).length, total: seerahStoryIndex.length },
    aqeedah: { count: aqeedahCardIndex.filter(s => done(`aqeedah:${s.slug}`)).length, total: aqeedahCardIndex.length },
    companions: { count: companionIndex.filter(s => done(`companions:${s.slug}`)).length, total: companionIndex.length },
    facts: { count: factIndex.filter(f => discovered.includes(f.slug)).length, total: factIndex.length },
    hifz: { count: profile ? JOURNEY_SURAHS.filter(s => surahProgress(profile, s, ayahCountOf(s)).declared === ayahCountOf(s)).length : 0, total: JOURNEY_SURAHS.length },
  };
}

export function worldState(world: JourneyWorld, currentId: string, progress?: WorldProgress): WorldState {
  if (world.comingSoon) return "comingSoon";
  if (!world.href) return "locked";
  if (progress && progress.total > 0 && progress.count === progress.total) return "completed";
  return world.id === currentId ? "active" : "available";
}

export const worldForHref = (href: string) => journeyWorlds.find(w => w.href && (href === w.href ||
  (w.id === "hifz" && href.startsWith("/hifz/")) ||
  (w.id === "quran" && href.startsWith("/read/")) ||
  (w.id !== "quran" && href.startsWith(`${w.href}/`))))?.id ?? "hifz";

// Logical x coordinates follow reading direction; CSS mirrors the whole trail.
export function mapPosition(index: number) {
  const row = Math.floor(index / 3);
  const column = row % 2 === 0 ? index % 3 : 2 - index % 3;
  return { x: 18 + column * 32, y: 130 + row * 235 };
}
