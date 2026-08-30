// =============================================================================
// SocialLoginButtons — Apple + Google OAuth entry points.
//
// Delegates to AuthProvider.signInWithProvider(), which opens the Supabase
// OAuth flow. The browser leaves the page during the provider round-trip;
// when it comes back supabase-js picks up the session from the URL hash
// (detectSessionInUrl: true) and AuthContext state updates automatically.
// =============================================================================

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import useAuth, { AuthError } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

type Provider = "google" | "apple";

// Which OAuth providers Supabase actually has enabled. A button for a
// disabled provider is a dead end — Supabase answers the authorize call with
// "provider is not enabled" and the user is bounced back with an error they
// can do nothing about. Apple in particular needs a paid developer account,
// so it stays off until VITE_AUTH_PROVIDERS says otherwise.
const ENABLED_PROVIDERS: readonly Provider[] = (() => {
  const raw = (import.meta.env.VITE_AUTH_PROVIDERS ?? "google") as string;
  const wanted = raw.split(",").map(entry => entry.trim().toLowerCase());
  return (["google", "apple"] as const).filter(provider => wanted.includes(provider));
})();

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M16.365 1.43c0 1.14-.443 2.214-1.168 3.014-.81.9-2.1 1.607-3.2 1.519-.152-1.09.446-2.25 1.16-3.01.82-.87 2.19-1.52 3.208-1.523zM20.79 17.2c-.526 1.215-.773 1.758-1.448 2.828-.94 1.49-2.27 3.34-3.92 3.35-1.47.014-1.888-.95-3.927-.937-2.04.013-2.493.953-3.96.938-1.65-.015-2.91-1.69-3.85-3.18C1.22 16.75.37 12.71 2.28 9.95c1.31-1.9 3.37-3.05 5.32-3.05 1.99 0 3.24 1.09 4.88 1.09 1.6 0 2.57-1.09 4.86-1.09 1.75 0 3.61.95 4.89 2.6-4.3 2.4-3.6 8.65.56 9.7z" />
    </svg>
  );
}

const copy = {
  ar: {
    google: "المتابعة عبر Google",
    apple: "المتابعة عبر Apple",
    failed: "تعذّر بدء تسجيل الدخول عبر المزوّد.",
  },
  en: {
    google: "Continue with Google",
    apple: "Continue with Apple",
    failed: "Could not start provider sign-in.",
  },
} as const;

export function SocialLoginButtons({ next }: { next?: string | null }) {
  const { locale } = useLocale();
  const { signInWithProvider, configured, initialized } = useAuth();
  const [pending, setPending] = useState<Provider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!configured || !initialized) return null;
  if (ENABLED_PROVIDERS.length === 0) return null;

  const t = copy[locale];

  async function handle(provider: Provider) {
    setErrorMessage(null);
    setPending(provider);
    try {
      await signInWithProvider(provider, next ?? "/profile");
      // The OAuth flow navigates away; on return supabase-js restores the
      // session from the URL hash and AuthContext updates state.
    } catch (err) {
      setErrorMessage(
        err instanceof AuthError
          ? locale === "ar"
            ? err.friendlyAr
            : err.friendlyEn
          : t.failed,
      );
      setPending(null);
    }
  }

  return (
    <div className="space-y-2" data-testid="social-buttons">
      {ENABLED_PROVIDERS.includes("google") && <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={() => handle("google")}
        disabled={pending !== null}
        data-testid="social-google"
      >
        {pending === "google" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <GoogleIcon />
        )}
        {t.google}
      </Button>}
      {ENABLED_PROVIDERS.includes("apple") && <Button
        type="button"
        className="w-full gap-2 bg-[#111] text-white hover:bg-[#222]"
        onClick={() => handle("apple")}
        disabled={pending !== null}
        data-testid="social-apple"
      >
        {pending === "apple" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <AppleIcon />
        )}
        {t.apple}
      </Button>}
      {errorMessage && (
        <p role="alert" className="text-sm text-red-700" data-testid="social-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default SocialLoginButtons;
