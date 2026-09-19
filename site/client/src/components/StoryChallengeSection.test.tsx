import { beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { stories } from "@/content/stories";
import { createProfile, emptyStore, markStoryDone, saveStore } from "@/lib/hifz-store";
import { resetHifzStoreCache } from "@/hooks/useHifzStore";
import { StoryChallengeSection } from "./StoryChallengeSection";

const story = stories[0];

beforeEach(() => {
  localStorage.clear();
  resetHifzStoreCache();
});

describe("a completed Quran story", () => {
  it("restores its earned reward when the child returns", () => {
    const created = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    saveStore(markStoryDone(created.store, created.profile.id, story.chapter, story.slug));
    resetHifzStoreCache();

    const { container } = render(
      <ThemeProvider><LocaleProvider><StoryChallengeSection story={story} number={1} /></LocaleProvider></ThemeProvider>,
    );

    expect(container.querySelector(".badge-award")).toBeTruthy();
    expect(container.querySelectorAll(".seerah-option:disabled")).toHaveLength(story.challenge.options.length);
  });
});
