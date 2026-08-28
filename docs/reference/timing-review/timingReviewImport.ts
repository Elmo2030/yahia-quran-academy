import { z } from "zod";
import { assertSupportedTimingReviewSchemaVersion, TIMING_REVIEW_SCHEMA_VERSION } from "./timingReviewSchema";

const FATIHA_AUDIO = {
  path: "surahs/001.m4a",
  sha256: "75bc1954341dadff60b35be00732a6eab85c074beeaeca2e3165f1c2164b743e",
} as const;

export const reviewedTimingImportSchema = z.object({
  schemaVersion: z.string().min(1).max(32),
  surahNumber: z.literal(1),
  label: z.string().trim().min(3).max(180),
  audio: z.object({ path: z.string().trim().min(1).max(512), sha256: z.string().regex(/^[a-f0-9]{64}$/) }),
  notes: z.string().trim().max(5000).optional(),
  entries: z.array(z.object({
    speakerPass: z.enum(["teacher", "children"]),
    ayahNumber: z.number().int().min(1).max(7),
    wordStart: z.number().int().min(1),
    wordEnd: z.number().int().min(1),
    startMs: z.number().int().min(0),
    endMs: z.number().int().positive(),
    confidenceBps: z.number().int().min(0).max(10000).optional(),
    candidateText: z.string().trim().max(2000).optional(),
    canonicalText: z.string().trim().min(1).max(2000),
    reviewerNote: z.string().trim().max(5000).optional(),
  }).superRefine((entry, ctx) => {
    if (entry.wordEnd < entry.wordStart) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "نهاية الكلمة يجب ألا تسبق بدايتها.", path: ["wordEnd"] });
    if (entry.endMs <= entry.startMs) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "نهاية المقطع يجب أن تأتي بعد بدايته.", path: ["endMs"] });
  })).min(1).max(5000),
});

export type ReviewedTimingImport = z.infer<typeof reviewedTimingImportSchema>;

export function parseReviewedTimingImport(input: unknown): ReviewedTimingImport {
  const parsed = reviewedTimingImportSchema.parse(input);
  assertSupportedTimingReviewSchemaVersion(parsed.schemaVersion);
  if (parsed.schemaVersion !== TIMING_REVIEW_SCHEMA_VERSION) throw new Error("إصدار مخطط الاستيراد غير مدعوم.");
  if (parsed.audio.path !== FATIHA_AUDIO.path || parsed.audio.sha256 !== FATIHA_AUDIO.sha256) throw new Error("تجزئة الصوت أو مساره لا يطابقان ملف R2 المعتمد للفاتحة.");

  const entries = [...parsed.entries].sort((a, b) => a.startMs - b.startMs);
  for (let index = 1; index < entries.length; index += 1) {
    const previous = entries[index - 1];
    const current = entries[index];
    if (previous && current && current.startMs < previous.endMs) throw new Error("مسودات الاستيراد لا تقبل مقاطع متداخلة قبل مراجعتها.");
  }
  return { ...parsed, entries };
}
