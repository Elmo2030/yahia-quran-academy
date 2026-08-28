export const TIMING_REVIEW_SCHEMA_VERSION = "timing-review-v1" as const;

export function isSupportedTimingReviewSchemaVersion(version: string | null | undefined): version is typeof TIMING_REVIEW_SCHEMA_VERSION {
  return version === TIMING_REVIEW_SCHEMA_VERSION;
}

export function assertSupportedTimingReviewSchemaVersion(version: string | null | undefined) {
  if (!isSupportedTimingReviewSchemaVersion(version)) {
    throw new Error("إصدار مخطط مراجعة التوقيتات مفقود أو غير مدعوم.");
  }
}
