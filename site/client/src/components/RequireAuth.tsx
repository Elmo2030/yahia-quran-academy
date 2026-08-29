// =============================================================================
// RequireAuth — drop-in route guard.
//
// Renders `children` only when the AuthProvider reports a session. While the
// initial session check is in flight, shows a tiny spinner so the user is
// not flashed the login form by mistake. When Supabase isn't configured,
// shows the friendly "sign-in is unavailable" message rather than redirecting.
// =============================================================================

import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/contexts/LocaleContext";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, loading, initialized, configured } = useAuth();
  const { locale } = useLocale();
  const [, navigate] = useLocation();

  const nextParam = encodeURIComponent(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useEffect(() => {
    if (initialized && !loading && !session && configured) {
      navigate(`/login?next=${nextParam}`, { replace: true });
    }
  }, [initialized, loading, session, configured, nextParam, navigate]);

  if (!configured) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-center" dir={locale === "ar" ? "rtl" : "ltr"}>
        <p className="text-base text-[var(--brand-navy)]/80">
          {locale === "ar"
            ? "صفحات الحساب غير مفعّلة حاليًا لأن بيانات الربط بـ Supabase لم تُضبط بعد."
            : "Account pages are disabled because the Supabase credentials are not configured."}
        </p>
      </div>
    );
  }

  if (loading || !initialized) {
    return (
      <div
        className="mx-auto flex max-w-md items-center justify-center px-4 py-12"
        role="status"
        aria-live="polite"
      >
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--brand-navy)] border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    // The effect above will redirect; render a placeholder while we wait so
    // the screen does not flash.
    return (
      <div className="mx-auto max-w-md px-4 py-12" role="status" aria-live="polite">
        <p className="text-center text-sm text-[var(--brand-navy)]/70">
          {locale === "ar" ? "جارٍ التحويل إلى تسجيل الدخول…" : "Redirecting to sign in…"}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

export default RequireAuth;
