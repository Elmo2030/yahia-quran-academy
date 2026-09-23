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
  recordFactDiscoveryDate(slug, profileId);
  return next;
}

// ---------------------------------------------------------------------------
// When each fact was discovered — added for the parent's corner's weekly
// activity (مهمة تنفيذ ٤), alongside the undated list above rather than
// inside it: other pages already read that list's shape, and changing it
// would be a silent break for every one of them.
// ---------------------------------------------------------------------------

export const FACTS_DISCOVERED_AT_KEY = "yahya.facts.discovered-at.v1";

function factsDiscoveryDatesKey(profileId: string) {
  return `${FACTS_DISCOVERED_AT_KEY}:${profileId}`;
}

/** A guest's discoveries are never dated — there is no profile for the date
 *  to belong to once a guest session ends, the same reason a guest's undated
 *  list above stays at the shared key instead of one of its own. */
export function readFactDiscoveryDates(profileId?: string | null): Record<string, number> {
  if (!profileId) return {};
  try {
    const raw = storage()?.getItem(factsDiscoveryDatesKey(profileId));
    const value = raw ? JSON.parse(raw) : {};
    if (typeof value !== "object" || value === null || Array.isArray(value)) return {};
    const out: Record<string, number> = {};
    for (const [slug, at] of Object.entries(value)) {
      if (typeof slug === "string" && typeof at === "number" && Number.isFinite(at)) out[slug] = at;
    }
    return out;
  } catch {
    return {};
  }
}

/** Written once, the first time a fact is discovered — opening it again must
 *  not move its date, or "discovered this week" would include facts a child
 *  found long ago and merely revisited. */
function recordFactDiscoveryDate(slug: string, profileId?: string | null, now = Date.now()) {
  if (!profileId) return;
  const dates = readFactDiscoveryDates(profileId);
  if (slug in dates) return;
  try {
    storage()?.setItem(factsDiscoveryDatesKey(profileId), JSON.stringify({ ...dates, [slug]: now }));
  } catch { /* private mode */ }
}

export function resetFactDiscoveries(profileId?: string | null) {
  try {
    storage()?.removeItem(factsDiscoveryKey(profileId));
    if (profileId) storage()?.removeItem(factsDiscoveryDatesKey(profileId));
  } catch { /* private mode */ }
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
