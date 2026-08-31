// =============================================================================
// Login page — sign in with email + password.
//
// Falls back to a friendly "Sign-in is unavailable" notice if Supabase isn't
// configured (env vars missing). Honours a `?next=` query string the
// RequireAuth guard sets when bouncing a user here from a protected route.
// =============================================================================

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Loader2 } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { useAuth, AuthError } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";

export default function Login() {
  const { locale } = useLocale();
  const { signIn, resendConfirmation, configured, initialized } = useAuth();
  const [, navigate] = useLocation();
  const next = readNextParam();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Supabase expires the original confirmation link, so an account left
  // unconfirmed for a while cannot be rescued from the inbox alone.
  const [unconfirmed, setUnconfirmed] = useState(false);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const copy = locale === "ar"
    ? {
        title: "تسجيل الدخول",
        subtitle: "للمتابعة إلى حسابك والوصول للمكتبة المحفوظة.",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        submit: "دخول",
        submitting: "جارٍ الدخول…",
        forgot: "نسيت كلمة السر؟",
        or: "أو",
        newHere: "ليس لديك حساب؟",
        create: "أنشئ حسابًا جديدًا",
        notConfigured: "تسجيل الدخول غير مفعّل حاليًا.",
      }
    : {
        title: "Sign in",
        subtitle: "Continue to your account and your saved library.",
        email: "Email",
        password: "Password",
        submit: "Sign in",
        submitting: "Signing in…",
        forgot: "Forgot password?",
        or: "or",
        newHere: "New here?",
        create: "Create an account",
        notConfigured: "Sign-in is currently disabled.",
      };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setUnconfirmed(false);
    setSubmitting(true);
    try {
      await signIn({ email, password });
      navigate(next || "/profile");
    } catch (err) {
      setErrorMessage(err instanceof AuthError ? (locale === "ar" ? err.friendlyAr : err.friendlyEn) : (locale === "ar" ? "تعذّر تسجيل الدخول." : "Sign-in failed."));
      if (err instanceof AuthError && err.code === "email_not_confirmed") setUnconfirmed(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--brand-ivory)]" dir={locale === "ar" ? "rtl" : "ltr"}>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-md px-4 py-10 sm:py-14">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--brand-navy)]">{copy.title}</h1>
        <p className="mt-2 text-sm text-[var(--brand-navy)]/70">{copy.subtitle}</p>
        {!configured ? (
          <div className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900" role="alert">
            {copy.notConfigured}
          </div>
        ) : (
          <>
            <div className="mt-6">
              <SocialLoginButtons next={next} />
              <div className="my-4 flex items-center gap-3 text-xs text-[var(--brand-navy)]/50" aria-hidden="true">
                <span className="h-px flex-1 bg-[var(--brand-navy)]/15" />
                {copy.or}
                <span className="h-px flex-1 bg-[var(--brand-navy)]/15" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="login-email">{copy.email}</Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting || !initialized}
                data-testid="login-email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="login-password">{copy.password}</Label>
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting || !initialized}
                data-testid="login-password"
              />
            </div>
            {unconfirmed && (
              <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                <button
                  type="button"
                  disabled={resendState === "sending"}
                  onClick={async () => {
                    setResendState("sending");
                    try {
                      await resendConfirmation(email);
                      setResendState("sent");
                    } catch {
                      setResendState("failed");
                    }
                  }}
                  className="font-medium underline disabled:opacity-60"
                  data-testid="login-resend"
                >
                  {resendState === "sending"
                    ? (locale === "ar" ? "جارٍ الإرسال…" : "Sending…")
                    : (locale === "ar" ? "أرسل رسالة تأكيد جديدة" : "Send a new confirmation email")}
                </button>
                {resendState === "sent" && (
                  <p className="mt-2" role="status">
                    {locale === "ar" ? "أرسلنا رسالة تأكيد جديدة إلى بريدك." : "A new confirmation email is on its way."}
                  </p>
                )}
                {resendState === "failed" && (
                  <p className="mt-2" role="alert">
                    {locale === "ar" ? "تعذّر إرسال الرسالة. حاول بعد قليل." : "Could not send it. Try again shortly."}
                  </p>
                )}
              </div>
            )}
            {errorMessage && (
              <p role="alert" className="text-sm text-red-700" data-testid="login-error">{errorMessage}</p>
            )}
            <Button type="submit" className="w-full bg-[var(--brand-navy)] text-[var(--brand-ivory)] hover:bg-[var(--brand-navy)]/90" disabled={submitting || !initialized} data-testid="login-submit">
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitting ? copy.submitting : copy.submit}
            </Button>
            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-[var(--brand-navy)] hover:underline">
                {copy.forgot}
              </Link>
              <span className="text-[var(--brand-navy)]/70">
                {copy.newHere}{" "}
                <Link href={`/register${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-medium text-[var(--brand-navy)] hover:underline">
                  {copy.create}
                </Link>
              </span>
            </div>
            {/* Forgot-password page lives in feature/social-login; the link is
                in place so the page is reachable once that PR merges. */}
            </form>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function readNextParam(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("next");
    if (!raw) return null;
    // Only accept same-site relative paths so an attacker can't redirect
    // post-login to an external domain.
    if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  } catch {
    /* ignore — fall through */
  }
  return null;
}
