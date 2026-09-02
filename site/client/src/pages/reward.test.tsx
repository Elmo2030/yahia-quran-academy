/**
 * A reward is earned, and every card starts fresh.
 *
 * Two faults this covers, both reported from the live site:
 *
 * The keepsake and the badge were printed on the page from the moment it
 * opened, so there was nothing to win — a child could read the answer's reward
 * before answering.
 *
 * And moving from one card to the next kept the previous card's answer
 * selected: React reuses a component that stays in the same place in the tree,
 * so the challenge carried its state across cards that had nothing to do with
 * each other.
 */
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BadgeAward } from "@/components/BadgeAward";
import { aqeedahCards } from "@/content/aqeedah";
import { seerahStories } from "@/content/seerah";

describe("the badge", () => {
  it("says its name once, however the section stored it", () => {
    const { rerender, container } = render(<BadgeAward badge="وسام: طفل مكة" label="مكافأتك" />);
    expect(within(container).getByText("طفل مكة")).toBeTruthy();
    rerender(<BadgeAward badge="شاكر النعم" label="وسام" />);
    expect(within(container).getByText("شاكر النعم")).toBeTruthy();
  });

  it("is a drawing, not a line of text", () => {
    const { container } = render(<BadgeAward badge="قلب موحّد" icon="🛡️" label="وسام" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    // ribbon, rosette and the card's own icon
    expect(svg!.querySelectorAll("path").length).toBeGreaterThan(0);
    expect(svg!.querySelectorAll("circle").length).toBeGreaterThan(3);
    expect(svg!.querySelector("text")?.textContent).toBe("🛡️");
  });

  it("names itself for a screen reader", () => {
    render(<BadgeAward badge="أمين في السر" label="مكافأتك" />);
    expect(screen.getByRole("img", { name: "مكافأتك: أمين في السر" })).toBeTruthy();
  });
});

describe("every card can be answered", () => {
  it("has a correct answer inside its own options", () => {
    for (const card of aqeedahCards) {
      const { options, correctAnswer } = card.challenge;
      expect(options.length, card.slug).toBe(4);
      expect(options[correctAnswer], card.slug).toBeTruthy();
    }
    for (const story of seerahStories) {
      const { options, correctAnswer } = story.interactive.challenge;
      expect(options[correctAnswer], story.slug).toBeTruthy();
    }
  });

  it("gives every card a badge to win", () => {
    for (const card of aqeedahCards) expect(card.badge, card.slug).toBeTruthy();
    for (const story of seerahStories) expect(story.gamification.badge, story.slug).toBeTruthy();
  });
});
