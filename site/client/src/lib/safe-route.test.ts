import { describe, expect, it } from "vitest";

import { safeInternalPath } from "./safe-route";

describe("safeInternalPath", () => {
  it("keeps valid application routes with their query and fragment", () => {
    expect(safeInternalPath("/profile?tab=stories#saved")).toBe("/profile?tab=stories#saved");
  });

  it("rejects external, protocol-relative, and backslash-normalized destinations", () => {
    expect(safeInternalPath("https://attacker.example")).toBeNull();
    expect(safeInternalPath("//attacker.example")).toBeNull();
    expect(safeInternalPath("/\\attacker.example")).toBeNull();
  });
});
