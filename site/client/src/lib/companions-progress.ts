import { companionIndex } from "./companion-index.generated";
import { inProgressLearningSteps, type ChildProfile } from "./hifz-store";

/** Continuation is a projection of the shared child steps, not another store. */
export function nextCompanion(profile: ChildProfile | null) {
  const child = profile?.character !== "guest" ? profile : null;
  const latest = child && inProgressLearningSteps(child, "companions")
    .map(step => companionIndex.find(story => story.slug === step.slug)).find(Boolean);
  return latest ?? companionIndex.find(story => child?.steps[`companions:${story.slug}`]?.status !== "done") ?? null;
}
