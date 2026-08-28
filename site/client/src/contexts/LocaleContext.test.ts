import { describe, expect, it } from "vitest";
import { resolvePreferredLocale } from "./LocaleContext";

describe("resolvePreferredLocale", () => {
  it("keeps Arabic as the safe default when no supported preference is stored", () => {
    expect(resolvePreferredLocale(null)).toBe("ar");
    expect(resolvePreferredLocale("fr")).toBe("ar");
  });

  it("accepts the saved English preference", () => {
    expect(resolvePreferredLocale("en")).toBe("en");
  });
});
