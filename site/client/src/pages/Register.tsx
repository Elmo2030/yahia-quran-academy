// =============================================================================
// Register page — create a new account with email + password.
//
// Validates locally (password length, match, email format) before talking to
// Supabase so the network round-trip only happens when the form is sound.
// The Supabase auth trigger (handle_new_auth_user) creates the matching
// profile row so the profile we read back is guaranteed to exist.
// =============================================================================

import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { Loader2 } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { useAuth, AuthError } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";

const MIN_PASSWORD = 8;

export default function Register() {
  const { locale, setLocale } = useLocale();
  const { signUp, configured, initialized, session } = useAuth();
  const [, navigate] = useLocation();
  const next = readNextParam();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If a session already exists while we are on /register (e.g. user navigated
  // here from the site header), bounce them away to avoid showing the form.
  useEffect(() => {
    if (configured && initialized && session) {
      navigate(next || "/profile", { replace: true });
    }
  }, [configured, initialized, session, next, navigate]);

  const isEmailLike = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email],
  );

  const passwordsMatch = password === confirm;
  const passwordLongEnough = password.length >= MIN_PASSWORD;
  const displayNameOk = displayName.trim().length >= 2;

  const formValid = isEmailLike && passwordsMatch && passwordLongEnough && displayNameOk;

  const copy = locale === "ar"
    ? {
        title: "إنشاء حساب",
        subtitle: "احفظ تقدّمك في القارئ والقصص عبر الأجهزة.",
        name: "الاسم الذي يظهر للآخرين",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        passwordHint: "٨ أحرف على الأقل",
        confirm: "تأكيد كلمة المرور",
        submit: "إنشاء الحساب",
        submitting: "جارٍ الإنشاء…",
        notConfigured: "إنشاء الحسابات غير مفعّل حاليًا.",
        or: "أو",
        haveAccount: "لديك حساب؟",
        signIn: "سجّل دخولك",
        mismatch: "كلمتا المرور غير متطابقتين.",
        tooShort: "كلمة المرور قصيرة جدًا.",
        invalidEmail: "البريد غير صالح.",
        noName: "اكتب اسمًا من حرفين على الأقل.",
      }
    : {
        title: "Create account",
        subtitle: "Save your reading progress and library across devices.",
        name: "Display name",
        email: "Email",
        password: "Password",
        passwordHint: "8 characters minimum",
        confirm: "Confirm password",
        submit: "Create account",
        submitting: "Creating…",
        notConfigured: "Account creation is currently disabled.",
        or: "or",
        haveAccount: "Already have an account?",
        signIn: "Sign in",
        mismatch: "Passwords don't match.",
        tooShort: "Password is too short.",
        invalidEmail: "That email address is invalid.",
        noName: "Display name must be at least 2 characters.",
      };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    if (!displayNameOk) {
      setErrorMessage(copy.noName);
      return;
    }
    if (!passwordLongEnough) {
      setErrorMessage(copy.tooShort);
      return;
    }
    if (!passwordsMatch) {
      setErrorMessage(copy.mismatch);
      return;
    }
    if (!isEmailLike) {
      setErrorMessage(copy.invalidEmail);
      return;
    }

    setSubmitting(true);
    try {
      await signUp({
        email,
        password,
        displayName,
        preferredLocale: locale,
      });
      // After a successful signUp the AuthProvider has fired the SIGNED event
      // and the session is now available; route the user to /profile so they
      // can see their account state and the email-verification notice.
      navigate(next || "/profile");
    } catch (err) {
      setErrorMessage(err instanceof AuthError ? (locale === "ar" ? err.friendlyAr : err.friendlyEn) : (locale === "ar" ? "تعذّر إنشاء الحساب." : "Sign-up failed."));
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

        <div className="mt-4 flex items-center gap-2 text-xs text-[var(--brand-navy)]/70">
          <span>{locale === "ar" ? "اللغة:" : "Language:"}</span>
          <button
            type="button"
            onClick={() => setLocale("ar")}
            className={`rounded-md px-2 py-1 ${locale === "ar" ? "bg-[var(--brand-navy)] text-[var(--brand-ivory)]" : "border border-[var(--brand-navy)]/20"}`}
          >
            العربية
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`rounded-md px-2 py-1 ${locale === "en" ? "bg-[var(--brand-navy)] text-[var(--brand-ivory)]" : "border border-[var(--brand-navy)]/20"}`}
          >
            English
          </button>
        </div>

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
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="register-form" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="register-name">{copy.name}</Label>
              <Input
                id="register-name"
                type="text"
                autoComplete="name"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={submitting || !initialized}
                data-testid="register-name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="register-email">{copy.email}</Label>
              <Input
                id="register-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting || !initialized}
                data-testid="register-email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="register-password">{copy.password}</Label>
              <Input
                id="register-password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                disabled={submitting || !initialized}
                data-testid="register-password"
                aria-describedby="register-password-hint"
              />
              <p id="register-password-hint" className="text-xs text-[var(--brand-navy)]/60">{copy.passwordHint}</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="register-confirm">{copy.confirm}</Label>
              <Input
                id="register-confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                disabled={submitting || !initialized}
                data-testid="register-confirm"
              />
            </div>
            {errorMessage && (
              <p role="alert" className="text-sm text-red-700" data-testid="register-error">{errorMessage}</p>
            )}
            <Button type="submit" className="w-full bg-[var(--brand-navy)] text-[var(--brand-ivory)] hover:bg-[var(--brand-navy)]/90" disabled={submitting || !initialized || !formValid} data-testid="register-submit">
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitting ? copy.submitting : copy.submit}
            </Button>
            <p className="text-sm text-[var(--brand-navy)]/70">
              {copy.haveAccount}{" "}
              <Link href={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-medium text-[var(--brand-navy)] hover:underline">
                {copy.signIn}
              </Link>
            </p>
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
    if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  } catch {
    /* ignore — fall through */
  }
  return null;
}
