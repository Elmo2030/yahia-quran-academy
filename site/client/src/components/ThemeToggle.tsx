import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocale } from "@/contexts/LocaleContext";

/**
 * Switches between the light and dark palettes.
 *
 * Two states on screen, three underneath: a reader who has never touched it
 * follows their device, and pressing the button picks the opposite of whatever
 * they are looking at — which is what someone means when they press it.
 */
export function ThemeToggle() {
  const { resolved, setPreference } = useTheme();
  const { locale } = useLocale();
  const dark = resolved === "dark";
  const label = locale === "ar"
    ? (dark ? "الوضع الفاتح" : "الوضع الداكن")
    : (dark ? "Switch to light mode" : "Switch to dark mode");

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setPreference(dark ? "light" : "dark")}
      aria-label={label}
      title={label}
    >
      {dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}
