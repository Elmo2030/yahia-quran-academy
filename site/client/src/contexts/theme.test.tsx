/**
 * The theme has three states behind a two-state button.
 *
 * "system" is not "light": a reader who has never touched the toggle must
 * follow their device as it changes, and a reader who chose light must keep it
 * even when their device says dark. Those are different behaviours, and the
 * difference is the whole reason the preference is stored as three values.
 */
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";

import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

/** A matchMedia that can be told to change its mind, as a real one does. */
function stubMatchMedia(dark: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const query = {
    matches: dark,
    addEventListener: (_: string, fn: (event: MediaQueryListEvent) => void) => { listeners.add(fn); },
    removeEventListener: (_: string, fn: (event: MediaQueryListEvent) => void) => { listeners.delete(fn); },
  };
  window.matchMedia = (() => query) as unknown as typeof window.matchMedia;
  return {
    goDark(next: boolean) {
      query.matches = next;
      act(() => { listeners.forEach(fn => fn({ matches: next } as MediaQueryListEvent)); });
    },
  };
}

function Probe() {
  const { preference, resolved, setPreference } = useTheme();
  return (
    <>
      <span data-testid="state">{preference}/{resolved}</span>
      <button onClick={() => setPreference("light")}>light</button>
      <button onClick={() => setPreference("dark")}>dark</button>
      <button onClick={() => setPreference("system")}>system</button>
    </>
  );
}

const state = () => screen.getByTestId("state").textContent;
const show = () => render(<ThemeProvider><Probe /></ThemeProvider>);

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  vi.restoreAllMocks();
});

describe("the theme preference", () => {
  it("follows the device until someone chooses", () => {
    const media = stubMatchMedia(true);
    show();
    expect(state(), "a dark device").toBe("system/dark");
    expect(document.documentElement.hasAttribute("data-theme"), "nothing pinned").toBe(false);

    media.goDark(false);
    expect(state(), "the device changed its mind and the page follows").toBe("system/light");
  });

  it("keeps a chosen light theme on a dark device", () => {
    const media = stubMatchMedia(true);
    show();
    fireEvent.click(screen.getByText("light"));

    expect(state()).toBe("light/light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    media.goDark(true);
    expect(state(), "the device is ignored once a choice is made").toBe("light/light");
  });

  it("remembers a choice and forgets it again", () => {
    stubMatchMedia(false);
    const first = show();
    fireEvent.click(screen.getByText("dark"));
    expect(localStorage.getItem("yahya-site-theme")).toBe("dark");

    first.unmount();
    show();
    expect(state(), "picked up on the next visit").toBe("dark/dark");

    fireEvent.click(screen.getByText("system"));
    expect(localStorage.getItem("yahya-site-theme"), "back to no opinion").toBeNull();
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("still works when storage is unavailable", () => {
    stubMatchMedia(true);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("denied"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("denied"); });

    show();
    expect(state(), "a private window still gets a theme").toBe("system/dark");
    fireEvent.click(screen.getByText("light"));
    expect(state(), "and the choice still applies for this visit").toBe("light/light");
  });
});
