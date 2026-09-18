// Shared local progress for "في رحاب القرآن". A fact is completed when it has
// been opened and read; there is deliberately no score or quiz requirement.

export const FACTS_DISCOVERED_KEY = "yahya.facts.discovered.v1";

export type FactCardState = "locked" | "unlocked" | "current" | "completed";

type FactLike = { slug: string };

const storage = (): Storage | null => {
  try { return window.localStorage; } catch { return null; }
};

export function readFactDiscoveries(validSlugs: readonly string[]): string[] {
  try {
    const raw = storage()?.getItem(FACTS_DISCOVERED_KEY);
    const values = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(values)) return [];
    const valid = new Set(validSlugs);
    return Array.from(new Set(values.filter((value): value is string => typeof value === "string" && valid.has(value))));
  } catch {
    return [];
  }
}

export function saveFactDiscoveries(slugs: readonly string[]) {
  try { storage()?.setItem(FACTS_DISCOVERED_KEY, JSON.stringify(Array.from(new Set(slugs)))); } catch { /* private mode */ }
}

export function discoverFact(slug: string, validSlugs: readonly string[]): string[] {
  const current = readFactDiscoveries(validSlugs);
  if (current.includes(slug)) return current;
  const next = [...current, slug];
  saveFactDiscoveries(next);
  return next;
}

export function resetFactDiscoveries() {
  try { storage()?.removeItem(FACTS_DISCOVERED_KEY); } catch { /* private mode */ }
}

export function firstIncompleteStage(facts: readonly FactLike[], discovered: readonly string[], perStage: number): number {
  const found = new Set(discovered);
  const stageCount = Math.ceil(facts.length / perStage);
  for (let stage = 0; stage < stageCount; stage += 1) {
    if (facts.slice(stage * perStage, (stage + 1) * perStage).some(fact => !found.has(fact.slug))) return stage;
  }
  return Math.max(0, stageCount - 1);
}

export function factCardState(facts: readonly FactLike[], discovered: readonly string[], index: number, perStage: number): FactCardState {
  const fact = facts[index];
  if (!fact) return "locked";
  const found = new Set(discovered);
  if (found.has(fact.slug)) return "completed";

  const activeStage = firstIncompleteStage(facts, discovered, perStage);
  const stage = Math.floor(index / perStage);
  if (stage > activeStage) return "locked";
  const current = facts.findIndex(item => !found.has(item.slug));
  return index === current ? "current" : "unlocked";
}
