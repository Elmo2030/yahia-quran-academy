import { and, asc, eq } from "drizzle-orm";
import { timingReviewDrafts, timingReviewEntries } from "../drizzle/schema";
import { getDb } from "./db";
import { parseReviewedTimingImport, type ReviewedTimingImport } from "./timingReviewImport";
import { assertSupportedTimingReviewSchemaVersion, TIMING_REVIEW_SCHEMA_VERSION } from "./timingReviewSchema";

const FATIHA_DRAFT = {
  schemaVersion: TIMING_REVIEW_SCHEMA_VERSION,
  surahNumber: 1,
  label: "الفاتحة — مسودة محاذاة ذات صوت الأطفال",
  audioPath: "surahs/001.m4a",
  audioSha256: "75bc1954341dadff60b35be00732a6eab85c074beeaeca2e3165f1c2164b743e",
  sourceType: "generated_candidate" as const,
  notes: "مسودة محلية غير معتمدة من ملف R2 المطابق لصوت الأطفال. لا تُعرض ولا تُستهلك في القارئ العام. الكلمات والمرور الصوتي تحتاج مراجعة بشرية.",
};

const FATIHA_CANDIDATE_ENTRIES = [
  { startMs: 0, endMs: 760, confidenceBps: 9811, candidateText: "بسم" },
  { startMs: 760, endMs: 1300, confidenceBps: 9946, candidateText: "الله" },
  { startMs: 1300, endMs: 2720, confidenceBps: 9990, candidateText: "الرحمن" },
  { startMs: 2720, endMs: 3980, confidenceBps: 9997, candidateText: "الرحيم" },
  { startMs: 3980, endMs: 9000, confidenceBps: 9871, candidateText: "الحمد" },
  { startMs: 9000, endMs: 9860, confidenceBps: 9990, candidateText: "لله" },
  { startMs: 9860, endMs: 10500, confidenceBps: 9988, candidateText: "رب" },
  { startMs: 10500, endMs: 12260, confidenceBps: 9998, candidateText: "العالمين" },
  { startMs: 12260, endMs: 18420, confidenceBps: 9866, candidateText: "الرحمن" },
  { startMs: 18420, endMs: 19760, confidenceBps: 9999, candidateText: "الرحيم" },
];

async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("قاعدة بيانات المراجعة غير متاحة حاليًا.");
  return db;
}

export async function listTimingReviewDrafts() {
  const db = await requireDb();
  const drafts = await db.select().from(timingReviewDrafts).orderBy(asc(timingReviewDrafts.surahNumber));
  drafts.forEach(draft => assertSupportedTimingReviewSchemaVersion(draft.schemaVersion));
  return drafts;
}

export async function getTimingReviewDraft(draftId: number) {
  const db = await requireDb();
  const drafts = await db.select().from(timingReviewDrafts).where(eq(timingReviewDrafts.id, draftId)).limit(1);
  const draft = drafts[0];
  if (!draft) return null;
  assertSupportedTimingReviewSchemaVersion(draft.schemaVersion);
  const entries = await db.select().from(timingReviewEntries).where(eq(timingReviewEntries.draftId, draftId)).orderBy(asc(timingReviewEntries.startMs));
  return { draft, entries };
}

export async function ensureFatihaCandidateDraft(userId: number) {
  const db = await requireDb();
  const existing = await db.select().from(timingReviewDrafts).where(and(eq(timingReviewDrafts.audioSha256, FATIHA_DRAFT.audioSha256), eq(timingReviewDrafts.sourceType, "generated_candidate"))).limit(1);
  if (existing[0]) return getTimingReviewDraft(existing[0].id);

  const inserted = await db.insert(timingReviewDrafts).values({ ...FATIHA_DRAFT, createdByUserId: userId }).$returningId();
  const draftId = inserted[0]?.id;
  if (!draftId) throw new Error("تعذر إنشاء مسودة الفاتحة.");
  await db.insert(timingReviewEntries).values(
    FATIHA_CANDIDATE_ENTRIES.map(entry => ({
      draftId,
      speakerPass: "unknown" as const,
      reviewStatus: "unreviewed" as const,
      ...entry,
    })),
  );
  return getTimingReviewDraft(draftId);
}

export async function importReviewedTimingDraft(userId: number, rawImport: ReviewedTimingImport) {
  const payload = parseReviewedTimingImport(rawImport);
  const db = await requireDb();
  const inserted = await db.insert(timingReviewDrafts).values({
    schemaVersion: payload.schemaVersion,
    surahNumber: payload.surahNumber,
    label: payload.label,
    audioPath: payload.audio.path,
    audioSha256: payload.audio.sha256,
    sourceType: "source_import",
    reviewStatus: "needs_review",
    notes: payload.notes ?? "استيراد مراجع؛ يحتاج مراجعة الإدارة قبل أي اعتماد أو عرض عام.",
    createdByUserId: userId,
  }).$returningId();
  const draftId = inserted[0]?.id;
  if (!draftId) throw new Error("تعذر استيراد مسودة التوقيتات.");
  await db.insert(timingReviewEntries).values(payload.entries.map(entry => ({
    draftId,
    speakerPass: entry.speakerPass,
    ayahNumber: entry.ayahNumber,
    wordStart: entry.wordStart,
    wordEnd: entry.wordEnd,
    startMs: entry.startMs,
    endMs: entry.endMs,
    confidenceBps: entry.confidenceBps ?? null,
    candidateText: entry.candidateText ?? null,
    canonicalText: entry.canonicalText,
    reviewerNote: entry.reviewerNote ?? null,
    reviewStatus: "needs_review" as const,
    reviewedByUserId: userId,
    reviewedAt: new Date(),
  })));
  return getTimingReviewDraft(draftId);
}

export async function updateTimingReviewEntry(input: {
  entryId: number;
  speakerPass: "teacher" | "children" | "unknown";
  ayahNumber: number | null;
  wordStart: number | null;
  wordEnd: number | null;
  startMs: number;
  endMs: number;
  canonicalText: string | null;
  reviewerNote: string | null;
  reviewStatus: "unreviewed" | "needs_review" | "rejected" | "approved";
  reviewerId: number;
}) {
  if (input.endMs <= input.startMs) throw new Error("نهاية المقطع يجب أن تأتي بعد بدايته.");
  const db = await requireDb();
  await db.update(timingReviewEntries).set({
    speakerPass: input.speakerPass,
    ayahNumber: input.ayahNumber,
    wordStart: input.wordStart,
    wordEnd: input.wordEnd,
    startMs: input.startMs,
    endMs: input.endMs,
    canonicalText: input.canonicalText,
    reviewerNote: input.reviewerNote,
    reviewStatus: input.reviewStatus,
    reviewedByUserId: input.reviewerId,
    reviewedAt: new Date(),
  }).where(eq(timingReviewEntries.id, input.entryId));
}

export async function approveTimingReviewDraft(draftId: number, reviewerId: number) {
  const db = await requireDb();
  const draft = await getTimingReviewDraft(draftId);
  if (!draft) throw new Error("لم يتم العثور على مسودة التوقيتات.");
  const entries = await db.select().from(timingReviewEntries).where(eq(timingReviewEntries.draftId, draftId));
  const incomplete = entries.some(entry => entry.reviewStatus !== "approved" || entry.speakerPass === "unknown" || !entry.ayahNumber || !entry.canonicalText || entry.endMs <= entry.startMs);
  if (entries.length === 0 || incomplete) throw new Error("لا يمكن اعتماد المسودة قبل مراجعة كل مقطع وتحديد المتحدث والآية والنص القانوني.");
  await db.update(timingReviewDrafts).set({ reviewStatus: "approved", createdByUserId: reviewerId }).where(eq(timingReviewDrafts.id, draftId));
}
