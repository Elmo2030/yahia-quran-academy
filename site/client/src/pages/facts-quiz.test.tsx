/**
 * The quiz gives a second chance too.
 *
 * The story cards were fixed to leave a question open after a wrong answer,
 * but the facts quiz still did the old thing: one wrong tap revealed the right
 * answer and disabled all four buttons. Same page, same child, opposite rule.
 *
 * Which fact gets asked is random, so each test reads the question off the
 * screen — the body text names the fact — and works out which option is wrong
 * from that, rather than asserting something that would hold either way.
 */
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

vi.mock("@/hooks/useAuth", () => ({ default: () => ({ session: null }), useAuth: () => ({ session: null }) }));
import QuranFacts from "@/pages/QuranFacts";
import { quranFacts } from "@/content/quran-facts";

// The quiz draws only on cards already opened, and stays locked under four of
// them, so the store has to be seeded before the page mounts.
const DISCOVERED = quranFacts.slice(0, 6).map(fact => fact.slug);

const openQuiz = () => {
  localStorage.setItem("yahya.facts.discovered.v1", JSON.stringify(DISCOVERED));
  window.history.pushState({}, "", "/quran-facts");
  const view = render(<ThemeProvider><LocaleProvider><QuranFacts /></LocaleProvider></ThemeProvider>);
  fireEvent.click(screen.getByRole("button", { name: "تحدي الاكتشاف" }));
  return view;
};

const quiz = () => screen.getByRole("region", { name: "تحدي الاكتشاف" });
const options = () =>
  within(quiz()).getAllByRole("button").filter(
    (b): b is HTMLButtonElement => b.className.includes("facts-quiz__option"),
  );

/** The question shows the fact's body; that identifies the right answer. */
const rightAnswer = () => {
  const asked = quranFacts.find(fact => within(quiz()).queryByText(fact.body.ar));
  if (!asked) throw new Error("could not tell which fact the quiz is asking about");
  return asked.title.ar;
};
const labelOf = (button: HTMLButtonElement) => button.textContent?.trim() ?? "";
const aWrongOption = () => {
  const right = rightAnswer();
  const wrong = options().find(b => labelOf(b) !== right);
  if (!wrong) throw new Error("every option matched the right answer");
  return wrong;
};

beforeEach(() => {
  window.history.pushState({}, "", "/");
  localStorage.clear();
});

describe("the facts quiz", () => {
  it("keeps the other options live after a wrong answer", () => {
    openQuiz();
    fireEvent.click(aWrongOption());

    const live = options().filter(b => !b.disabled);
    expect(live.length, "the three unspent options stay answerable").toBe(3);
    expect(live.some(b => labelOf(b) === rightAnswer()), "including the right one").toBe(true);
  });

  it("does not reveal the answer while the question is still open", () => {
    openQuiz();
    fireEvent.click(aWrongOption());

    expect(options().filter(b => b.className.includes("is-right")).length).toBe(0);
    expect(within(quiz()).queryByText("سؤال آخر"), "no moving on yet").toBeNull();
  });

  it("closes the question and offers another once the answer is found", () => {
    openQuiz();
    const right = rightAnswer();
    fireEvent.click(aWrongOption());
    fireEvent.click(options().find(b => labelOf(b) === right)!);

    expect(options().every(b => b.disabled), "the question is closed").toBe(true);
    expect(options().filter(b => b.className.includes("is-right")).map(labelOf)).toEqual([right]);
    expect(within(quiz()).getByText("سؤال آخر")).toBeTruthy();
  });
});
