import { beforeEach, describe, expect, it } from "vitest";

import {
  FACTS_DISCOVERED_KEY, discoverFact, factCardState, factsDiscoveryKey, firstIncompleteStage,
  readFactDiscoveries,
} from "./quran-facts-progress";
import { currentDiscovery } from "./quran-facts-journey";

const facts = ["one", "two", "three", "four"].map(slug => ({ slug }));
const slugs = facts.map(fact => fact.slug);

beforeEach(() => localStorage.clear());

describe("Quran facts journey progress", () => {
  it("gives every card a persistent locked, unlocked, current, or completed state", () => {
    expect(factCardState(facts, [], 0, 2)).toBe("current");
    expect(factCardState(facts, [], 1, 2)).toBe("unlocked");
    expect(factCardState(facts, [], 2, 2)).toBe("locked");
    expect(factCardState(facts, ["one"], 0, 2)).toBe("completed");
    expect(factCardState(facts, ["one"], 1, 2)).toBe("current");
  });

  it("records a discovery once and restores it after a reload", () => {
    expect(discoverFact("one", slugs)).toEqual(["one"]);
    expect(discoverFact("one", slugs)).toEqual(["one"]);
    expect(JSON.parse(localStorage.getItem(FACTS_DISCOVERED_KEY) ?? "[]")).toEqual(["one"]);
    expect(readFactDiscoveries(slugs)).toEqual(["one"]);
    expect(firstIncompleteStage(facts, readFactDiscoveries(slugs), 2)).toBe(0);
  });

  it("unlocks the next stage only after the current one is completed", () => {
    expect(firstIncompleteStage(facts, ["one"], 2)).toBe(0);
    expect(firstIncompleteStage(facts, ["one", "two"], 2)).toBe(1);
    expect(factCardState(facts, ["one", "two"], 2, 2)).toBe("current");
  });

  it("keeps a named child's discoveries separate from another child's journey", () => {
    discoverFact("one", slugs, "child-a");
    expect(readFactDiscoveries(slugs, "child-a")).toEqual(["one"]);
    expect(readFactDiscoveries(slugs, "child-b")).toEqual([]);
    expect(localStorage.getItem(factsDiscoveryKey("child-a"))).toBeTruthy();
    expect(localStorage.getItem(factsDiscoveryKey("child-b"))).toBeNull();
  });

  it("chooses the first valid undiscovered fact and skips completed facts", () => {
    expect(currentDiscovery(facts, [])?.slug).toBe("one");
    expect(currentDiscovery(facts, ["one", "two"])?.slug).toBe("three");
    expect(currentDiscovery(facts, slugs)).toBeNull();
  });
});
