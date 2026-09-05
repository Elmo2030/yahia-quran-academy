/**
 * Supabase's leaked-password check is a paid feature, so the register form does
 * its own. These pin what it must refuse: eight characters alone was the whole
 * policy before, which let "12345678" through.
 */
import { describe, expect, it } from "vitest";

import { passwordProblem } from "@/lib/weak-passwords";

describe("the password check", () => {
  it("refuses the passwords people actually pick", () => {
    for (const password of ["12345678", "password", "password1", "qwerty123", "iloveyou", "ahmed123", "letmein1"]) {
      expect(passwordProblem(password), password).toBe("common");
    }
  });

  it("sees through digits tacked onto a common word", () => {
    expect(passwordProblem("password999")).toBe("common");
    expect(passwordProblem("dragon2024")).toBe("common");
  });

  it("refuses the reader's own name or address as their password", () => {
    expect(passwordProblem("yehia1985", { email: "yehia@gmail.com" })).toBe("common");
    expect(passwordProblem("kareemxyz", { name: "Kareem" })).toBe("personal");
    expect(passwordProblem("gmail-only", { email: "someone@gmail.com" })).toBe("personal");
  });

  it("does not reject on a fragment too short to be a clue", () => {
    // "ali" is three characters; refusing every password containing it would
    // reject far more than it protects.
    expect(passwordProblem("alimentary-tract", { name: "Ali" })).toBeNull();
  });

  it("still enforces the length", () => {
    expect(passwordProblem("ab3$x")).toBe("short");
  });

  it("accepts an ordinary decent password", () => {
    for (const password of ["marmalade-window-7", "قراءة-هادئة-2026", "Tt9!vrbq2Lm"]) {
      expect(passwordProblem(password, { email: "ahmed@example.com", name: "Ahmed" }), password).toBeNull();
    }
  });
});
