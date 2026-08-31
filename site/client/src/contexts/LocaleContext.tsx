import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type SiteLocale = "ar" | "en";

type LocaleContextValue = {
  locale: SiteLocale;
  direction: "rtl" | "ltr";
  setLocale: (locale: SiteLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function resolvePreferredLocale(value: string | null): SiteLocale {
  return value === "en" ? "en" : "ar";
}

function getInitialLocale(): SiteLocale {
  try {
    const languageFromUrl = new URLSearchParams(window.location.search).get("lang");
    return resolvePreferredLocale(languageFromUrl ?? localStorage.getItem("yahya-site-locale"));
  } catch {
    return "ar";
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<SiteLocale>(getInitialLocale);
  const direction = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = direction;
    root.dataset.locale = locale;
      // The title belongs to the route, not the locale — PageMeta owns it.
      // Setting it here overwrote whatever the current page had rendered.
    try {
      localStorage.setItem("yahya-site-locale", locale);
    } catch {
      // A preference is helpful, not required for the public reader to work.
    }
  }, [direction, locale]);

  return <LocaleContext.Provider value={{ locale, direction, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
