import { Languages } from "lucide-react";
import { useLocale, type SiteLocale } from "@/contexts/LocaleContext";

const options: Array<{ value: SiteLocale; label: string }> = [
  { value: "ar", label: "ع" },
  { value: "en", label: "EN" },
];

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  const label = locale === "ar" ? "تغيير اللغة" : "Change language";

  return (
    <div className={`language-toggle${compact ? " language-toggle--compact" : ""}`} aria-label={label} role="group">
      {!compact && <Languages size={15} aria-hidden="true" />}
      {options.map(({ value, label: optionLabel }) => (
        <button
          aria-label={value === "ar" ? "العربية" : "English"}
          aria-pressed={locale === value}
          className={locale === value ? "is-active" : ""}
          key={value}
          lang={value}
          onClick={() => setLocale(value)}
          type="button"
        >
          {optionLabel}
        </button>
      ))}
    </div>
  );
}
