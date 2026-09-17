// =============================================================================
// StoryChallengeSection — the question at the end of a Quran story, and the
// medal behind it.
//
// It owns its own answer state so the story page can stay a plain render: the
// story view lives inside a conditional branch, where a hook would be illegal.
//
// The rules are the Seerah's, deliberately: only what the child actually tried
// is marked, a wrong answer does not reveal the right one or disable the rest,
// and the medal does not exist on the page until the answer is right. A reward
// that is visible before the question is not a reward.
// =============================================================================

import { useEffect, useState } from "react";
import { HelpCircle, Trophy } from "lucide-react";

import { BadgeAward } from "@/components/BadgeAward";
import { useLocale } from "@/contexts/LocaleContext";
import { type Story } from "@/content/stories";
import { useStoryText } from "@/content/stories-english";
import { useHifzStore } from "@/hooks/useHifzStore";
import { activeProfile, markStoryDone } from "@/lib/hifz-store";

const copy = {
  ar: { challenge: "تحدي الفهم", reward: "مكافأتك", correct: "إجابة صحيحة! 🎉", wrong: "ليست هذه — ارجع للقصة وجرّب مرة أخرى 💪" },
  en: { challenge: "Comprehension challenge", reward: "Your reward", correct: "That is right! 🎉", wrong: "Not that one — go back to the story and try again 💪" },
} as const;

export function StoryChallengeSection({ story, number }: { story: Story; number: number }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const { challengeOf, rewardOf } = useStoryText();
  const challenge = challengeOf(story);
  const reward = rewardOf(story);
  const [tried, setTried] = useState<number[]>([]);
  const [won, setWon] = useState(false);
  const { store, commit } = useHifzStore();

  const pick = (index: number) => {
    if (index === challenge.correctAnswer) setWon(true);
    else setTried(current => (current.includes(index) ? current : [...current, index]));
  };

  // Getting the challenge right is the site's own signal that a child
  // actually read the story, not merely opened it — the same moment a medal
  // already appears for. markStoryDone is idempotent, so re-answering after
  // a reload marks nothing twice.
  useEffect(() => {
    if (!won) return;
    const child = activeProfile(store);
    if (child) commit(markStoryDone(store, child.id, story.chapter, story.slug));
  }, [won]);

  return (
    <>
      <section className="story-reading-section" id="story-challenge" aria-live="polite">
        <span className="story-section-number">{number}</span>
        <div>
          <span className="story-section-label"><HelpCircle size={13} aria-hidden="true" /> {t.challenge}</span>
          <h2>{t.challenge}</h2>
          <p>{challenge.question}</p>
          <ul className="seerah-options">
            {challenge.options.map((option, index) => {
              const state = won && index === challenge.correctAnswer
                ? " is-correct"
                : tried.includes(index)
                  ? " is-wrong"
                  : "";
              return (
                <li key={option}>
                  <button
                    type="button"
                    className={`button button--soft seerah-option${state}`}
                    disabled={won || tried.includes(index)}
                    onClick={() => pick(index)}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
          {(won || tried.length > 0) && <p>{won ? t.correct : t.wrong}</p>}
        </div>
      </section>

      {won && (
        <section className="story-reading-section" id="story-reward">
          <span className="story-section-number">{number + 1}</span>
          <div>
            <span className="story-section-label"><Trophy size={13} aria-hidden="true" /> {t.reward}</span>
            <BadgeAward
              icon={reward.icon}
              badge={reward.badge}
              keepsake={reward.keepsake}
              note={reward.note}
              label={t.reward}
            />
          </div>
        </section>
      )}
    </>
  );
}
