// Shared local progress for "في رحاب القرآن". A fact is completed when it has
// been opened and read; there is deliberately no score or quiz requirement.

export const FACTS_DISCOVERED_KEY = "yahya.facts.discovered.v1";

export type FactCardState = "locked" | "unlocked" | "current" | "completed";

type FactLike = { slug: string };

/**
 * The original facts journey predates child profiles, so its guest progress
 * remains at the original key. A named child gets a small, separate local
 * record. This deliberately does not migrate the shared record into every
 * child: progress must never appear to belong to a child who did not make it.
 */
export function factsDiscoveryKey(profileId?: string | null) {
  return profileId ? `${FACTS_DISCOVERED_KEY}:${profileId}` : FACTS_DISCOVERED_KEY;
}

const storage = (): Storage | null => {
  try { return window.localStorage; } catch { return null; }
};

export function readFactDiscoveries(validSlugs: readonly string[], profileId?: string | null): string[] {
  try {
    const raw = storage()?.getItem(factsDiscoveryKey(profileId));
    const values = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(values)) return [];
    const valid = new Set(validSlugs);
    return Array.from(new Set(values.filter((value): value is string => typeof value === "string" && valid.has(value))));
  } catch {
    return [];
  }
}

export function saveFactDiscoveries(slugs: readonly string[], profileId?: string | null) {
  try { storage()?.setItem(factsDiscoveryKey(profileId), JSON.stringify(Array.from(new Set(slugs)))); } catch { /* private mode */ }
}

export function discoverFact(slug: string, validSlugs: readonly string[], profileId?: string | null): string[] {
  const current = readFactDiscoveries(validSlugs, profileId);
  if (current.includes(slug)) return current;
  const next = [...current, slug];
  saveFactDiscoveries(next, profileId);
  return next;
}

export function resetFactDiscoveries(profileId?: string | null) {
  try { storage()?.removeItem(factsDiscoveryKey(profileId)); } catch { /* private mode */ }
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
