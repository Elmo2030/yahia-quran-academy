/**
 * A wrong answer leaves the question open.
 *
 * The card used to say "try again" and then do the opposite: it revealed the
 * right answer and disabled every button, so there was nothing to try. A child
 * who guessed once was told to try again by a page that would not let him.
 *
 * These drive the real pages rather than a copy of their logic, because the
 * contradiction was between the message and the buttons — two things that only
 * meet on screen.
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";

import { vi } from "vitest";

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// The page wears the site chrome, which asks who is signed in; nothing in these
// tests depends on that.
vi.mock("@/hooks/useAuth", () => ({ default: () => ({ session: null }), useAuth: () => ({ session: null }) }));
import Aqeedah from "@/pages/Aqeedah";
import { aqeedahCards } from "@/content/aqeedah";

const card = aqeedahCards.find(c => c.slug === "allah-is-one")!;
const wrongIndex = [0, 1, 2, 3].find(i => i !== card.challenge.correctAnswer)!;

const openCard = () => {
  window.history.pushState({}, "", `/aqeedah/${card.slug}`);
  return render(<ThemeProvider><LocaleProvider><Aqeedah /></LocaleProvider></ThemeProvider>);
};

const optionButtons = () =>
  screen
    .getAllByRole("button")
    .filter((b): b is HTMLButtonElement =>
      card.challenge.options.includes(b.textContent ?? ""),
    );

beforeEach(() => window.history.pushState({}, "", "/"));

describe("answering a card", () => {
  it("keeps the other options live after a wrong answer", () => {
    openCard();
    fireEvent.click(optionButtons()[wrongIndex]);

    const buttons = optionButtons();
    expect(buttons[wrongIndex].disabled, "the wrong one is spent").toBe(true);
    const stillOpen = buttons.filter((b, i) => i !== wrongIndex && !b.disabled);
    expect(stillOpen.length, "the rest are still answerable").toBe(3);
  });

  it("does not reveal the answer while it says try again", () => {
    openCard();
    fireEvent.click(optionButtons()[wrongIndex]);
    const revealed = optionButtons().filter(b => b.className.includes("is-correct"));
    expect(revealed.length).toBe(0);
  });

  it("gives the reward only once the right answer is chosen", () => {
    const { container } = openCard();
    fireEvent.click(optionButtons()[wrongIndex]);
    expect(container.querySelector(".badge-award"), "not yet").toBeNull();

    fireEvent.click(optionButtons()[card.challenge.correctAnswer]);
    expect(container.querySelector(".badge-award"), "earned").toBeTruthy();
    expect(optionButtons().every(b => b.disabled), "the question is closed").toBe(true);
    expect(
      optionButtons()[card.challenge.correctAnswer].className.includes("is-correct"),
    ).toBe(true);
  });
});
