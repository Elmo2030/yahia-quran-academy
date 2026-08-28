import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { assertSupportedTimingReviewSchemaVersion, isSupportedTimingReviewSchemaVersion, TIMING_REVIEW_SCHEMA_VERSION } from "./timingReviewSchema";
import { parseReviewedTimingImport } from "./timingReviewImport";

function createUserContext(role: "user" | "admin"): TrpcContext {
  return { user: { id: 1, openId: "review-test", email: null, name: "Review Test", loginMethod: "manus", role, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] };
}

describe("timing review access", () => {
  it("rejects non-admin access before any draft data can be read", async () => {
    const caller = appRouter.createCaller(createUserContext("user"));
    await expect(caller.timingReview.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("accepts only the explicit supported timing-review schema version", () => {
    expect(isSupportedTimingReviewSchemaVersion(TIMING_REVIEW_SCHEMA_VERSION)).toBe(true);
    expect(isSupportedTimingReviewSchemaVersion("timing-review-v0")).toBe(false);
    expect(() => assertSupportedTimingReviewSchemaVersion(undefined)).toThrow("غير مدعوم");
  });

  it("rejects reviewed imports that are not bound to the exact Fatiha R2 file", () => {
    const baseImport = {
      schemaVersion: TIMING_REVIEW_SCHEMA_VERSION,
      surahNumber: 1 as const,
      label: "فاتحة مراجع",
      audio: { path: "surahs/001.m4a", sha256: "75bc1954341dadff60b35be00732a6eab85c074beeaeca2e3165f1c2164b743e" },
      entries: [{ speakerPass: "teacher" as const, ayahNumber: 1, wordStart: 1, wordEnd: 1, startMs: 0, endMs: 500, canonicalText: "بِسْمِ" }],
    };
    expect(parseReviewedTimingImport(baseImport).entries).toHaveLength(1);
    expect(() => parseReviewedTimingImport({ ...baseImport, audio: { ...baseImport.audio, sha256: "0".repeat(64) } })).toThrow("لا يطابقان");
    expect(() => parseReviewedTimingImport({ ...baseImport, entries: [{ ...baseImport.entries[0], endMs: 0 }] })).toThrow();
  });

  it("rejects a valid-shaped import from a non-admin before persistence", async () => {
    const caller = appRouter.createCaller(createUserContext("user"));
    await expect(caller.timingReview.importDraft({
      schemaVersion: TIMING_REVIEW_SCHEMA_VERSION,
      surahNumber: 1,
      label: "فاتحة مراجع",
      audio: { path: "surahs/001.m4a", sha256: "75bc1954341dadff60b35be00732a6eab85c074beeaeca2e3165f1c2164b743e" },
      entries: [{ speakerPass: "teacher", ayahNumber: 1, wordStart: 1, wordEnd: 1, startMs: 0, endMs: 500, canonicalText: "بِسْمِ" }],
    })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
