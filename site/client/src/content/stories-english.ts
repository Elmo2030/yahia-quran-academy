// =============================================================================
// stories-english.ts — fetching the English stories, only when they are read.
//
// The English text of all forty-two stories was 176 KB of the 333 KB in
// content/stories.ts, and over half of the 143 KB the Stories chunk weighed
// compressed. Every reader downloaded both languages to read one. Since the
// site is Arabic first, most readers paid for the whole translation and were
// shown none of it.
//
// It lives in content/stories-en.ts now, behind a dynamic import that only an
// English reader triggers. `use()` suspends on it, and App.tsx already wraps
// the routes in the <Suspense> that catches it — the same fallback a reader
// already sees while the route's own chunk arrives, so this adds no new state
// to the page.
// =============================================================================

import { use, useMemo } from "react";

import {
  storyArcFor, storyChallengeFor, storyKey, storyMinutes, storyRewardFor, storyTextFor,
  type Story, type StoryArc, type StoryChallenge, type StoryReward, type StoryText,
} from "@/content/stories";
import { useLocale } from "@/contexts/LocaleContext";

/** One promise for the whole session: `use()` needs the same promise back on
 *  every render, or it suspends forever on a new one each time. */
let pending: Promise<Record<string, StoryText>> | null = null;
const englishStories = () =>
  (pending ??= import("@/content/stories-en").then(module => module.storiesEn));

/**
 * The story accessors with the reader's language already resolved.
 *
 * Call it once at the top of a page and use what it returns; an Arabic reader
 * never touches the import. Unlike the other hooks, `use()` is allowed inside
 * a condition, which is what keeps the fetch off the Arabic path.
 */
export function useStoryText() {
  const { locale } = useLocale();
  const english = locale === "en" ? use(englishStories()) : null;

  return useMemo(() => {
    const of = (story: Story): StoryText | undefined => english?.[storyKey(story)];
    return {
      textOf: (story: Story): StoryText => storyTextFor(story, of(story)),
      arcOf: (story: Story): StoryArc | undefined => storyArcFor(story, of(story)),
      minutesOf: (story: Story): number => storyMinutes(story, of(story)),
      challengeOf: (story: Story): StoryChallenge => storyChallengeFor(story, of(story)),
      rewardOf: (story: Story): StoryReward => storyRewardFor(story, of(story)),
    };
  }, [english]);
}
