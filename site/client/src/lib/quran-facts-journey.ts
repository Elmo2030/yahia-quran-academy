export const FACTS_PER_STAGE = 20;

type FactLike = { slug: string };

/** A single view over persisted discoveries, shared by every journey entry. */
export function currentDiscovery<T extends FactLike>(facts: readonly T[], discovered: readonly string[]): T | null {
  const found = new Set(discovered);
  return facts.find(fact => !found.has(fact.slug)) ?? null;
}

export function stageIndexForFact(facts: readonly FactLike[], slug: string, perStage = FACTS_PER_STAGE) {
  const index = facts.findIndex(fact => fact.slug === slug);
  return index < 0 ? null : Math.floor(index / perStage);
}

export function factsInStage<T>(facts: readonly T[], stage: number, perStage = FACTS_PER_STAGE): T[] {
  return facts.slice(stage * perStage, (stage + 1) * perStage);
}

export function stageIsComplete(facts: readonly FactLike[], discovered: readonly string[], stage: number, perStage = FACTS_PER_STAGE) {
  const found = new Set(discovered);
  const stageFacts = factsInStage(facts, stage, perStage);
  return stageFacts.length > 0 && stageFacts.every(fact => found.has(fact.slug));
}
