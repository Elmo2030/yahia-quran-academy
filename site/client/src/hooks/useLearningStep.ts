import { useEffect, useState } from "react";
import { activeProfile, recordLearningStep, stepStatus, type LearningStepRef } from "@/lib/hifz-store";
import { useHifzStore } from "@/hooks/useHifzStore";

/** Only mounted for resolved content; invalid routes cannot start a step. */
export function useLearningStep(kind: LearningStepRef["kind"], slug: string, correctAnswer: number) {
  const { store, update, saveFailed } = useHifzStore();
  const profile = activeProfile(store);
  const profileId = profile?.character !== "guest" ? profile?.id : undefined;
  const status = profileId && profile ? stepStatus(profile, { kind, slug }) : "available";
  const owner = `${profile?.id ?? "anonymous"}:${kind}:${slug}`;
  const [attempt, setAttempt] = useState({ owner, tried: [] as number[], won: false });
  const tried = attempt.owner === owner ? attempt.tried : [];
  const won = status === "done" || (attempt.owner === owner && attempt.won);

  useEffect(() => {
    if (!profileId || status !== "available") return;
    update(latest => activeProfile(latest)?.id === profileId
      ? recordLearningStep(latest, profileId, { kind, slug }, "in_progress") : latest);
  }, [profileId, kind, slug, status, update]);

  const answer = (index: number) => {
    if (won) return;
    if (index === correctAnswer) {
      setAttempt({ owner, tried, won: true });
      if (profileId) update(latest => activeProfile(latest)?.id === profileId
        ? recordLearningStep(latest, profileId, { kind, slug }, "done") : latest);
    } else {
      setAttempt({ owner, tried: tried.includes(index) ? tried : [...tried, index], won: false });
    }
  };
  // A new snapshot lets subscribers observe recovery even when progress is unchanged.
  const retrySave = () => update(latest => ({ ...latest }));
  return { tried, won, answer, saveFailed: Boolean(profileId) && saveFailed, retrySave };
}
