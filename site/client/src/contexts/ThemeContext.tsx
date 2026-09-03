import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

/** "system" follows the reader's device; the other two are a deliberate choice. */
export type ThemePreference = "system" | "light" | "dark";

const STORE_KEY = "yahya-site-theme";

type ThemeContextValue = {
  preference: ThemePreference;
  /** What is actually on screen, once "system" has been resolved. */
  resolved: "light" | "dark";
  setPreference: (next: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const systemPrefersDark = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function readStored(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    // Private mode, or storage switched off: following the device is a fine
    // answer, and the site works without remembering anything.
    return "system";
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(readStored);
  const [systemDark, setSystemDark] = useState(systemPrefersDark);

  // Following the device means following it as it changes, not only at load.
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const resolved: "light" | "dark" =
    preference === "system" ? (systemDark ? "dark" : "light") : preference;

  useEffect(() => {
    const root = document.documentElement;
    // No attribute at all for "system": the stylesheet's media query then
    // decides, which is also what a page renders as before this script runs.
    if (preference === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", preference);
  }, [preference]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    try {
      if (next === "system") localStorage.removeItem(STORE_KEY);
      else localStorage.setItem(STORE_KEY, next);
    } catch {
      // A remembered preference is a convenience; the choice still applies now.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ preference, resolved, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
