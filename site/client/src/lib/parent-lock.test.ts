import { describe, expect, it } from "vitest";

import { hashPin, isUnlocked, forgetUnlock, makeLock, newSalt, pinMatches, pinProblem, rememberUnlock } from "./parent-lock";

describe("the parent's number", () => {
  it("accepts four to eight digits and nothing else", () => {
    expect(pinProblem("1234")).toBeNull();
    expect(pinProblem("12345678")).toBeNull();
    expect(pinProblem("")).toBe("empty");
    expect(pinProblem("12a4")).toBe("digits");
    expect(pinProblem("١٢٣٤")).toBe("digits");
    expect(pinProblem("123")).toBe("short");
    expect(pinProblem("123456789")).toBe("long");
  });

  it("is never stored as it was typed", async () => {
    const lock = await makeLock("4821");
    expect(lock.hash).not.toContain("4821");
    expect(lock.salt).toHaveLength(32);
  });

  it("matches the number it was made from and nothing near it", async () => {
    const lock = await makeLock("4821");
    expect(await pinMatches(lock, "4821")).toBe(true);
    expect(await pinMatches(lock, "4822")).toBe(false);
    expect(await pinMatches(lock, "48210")).toBe(false);
  });

  it("gives two devices different hashes for the same number", async () => {
    const [one, two] = [await makeLock("1111"), await makeLock("1111")];
    expect(one.hash).not.toBe(two.hash);
    expect(newSalt()).not.toBe(newSalt());
  });

  it("marks a weak fallback hash as weak", async () => {
    const hashed = await hashPin("1234", "salt");
    expect(hashed.startsWith("sha256:") || hashed.startsWith("weak:")).toBe(true);
  });

  it("remembers the unlock for this tab only", () => {
    forgetUnlock();
    expect(isUnlocked()).toBe(false);
    rememberUnlock();
    expect(isUnlocked()).toBe(true);
    forgetUnlock();
    expect(isUnlocked()).toBe(false);
  });
});
