// =============================================================================
// Register page — create a new account with email + password.
//
// Validates locally (password length, match, email format) before talking to
// Supabase so the network round-trip only happens when the form is sound.
// The Supabase auth trigger (handle_new_auth_user) creates the matching
// profile row so the profile we read back is guaranteed to exist.
// =============================================================================

import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { Loader2 } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { passwordProblem } from "@/lib/weak-passwords";
import { useAuth, AuthError } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";

const MIN_PASSWORD = 8;

export default function Register() {
  const { locale, setLocale } = useLocale();
  const { signUp, resendConfirmation, configured, initialized, session } = useAuth();
  const [, navigate] = useLocation();
  const next = readNextParam();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  // Supabase refuses a second confirmation inside its own window and answers
  // 429. The button used to re-enable the instant the first one returned, so a
  // reader whose message had not arrived pressed it again a second later and
  // got nothing but a rejected request. Count the wait down instead.
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(seconds => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

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
  // Supabase checks new passwords against known breaches only on the paid plan,
  // so the common ones are refused here instead.
  const weakness = useMemo(
    () => passwordProblem(password, { email, name: displayName, min: MIN_PASSWORD }),
    [password, email, displayName],
  );
  const displayNameOk = displayName.trim().length >= 2;

  const formValid = isEmailLike && passwordsMatch && passwordLongEnough && displayNameOk && !weakness;

  const copy = locale === "ar"
    ? {
        title: "إنشاء حساب",
        subtitle: "احفظ تقدّمك في القارئ والقصص عبر الأجهزة.",
        checkInboxTitle: "بقيت خطوة واحدة",
        checkInboxBody: "أنشأنا حسابك وأرسلنا رسالة تأكيد إلى بريدك. افتح الرسالة واضغط رابط التأكيد، وبعدها سجّل الدخول.",
        checkInboxSpam: "لو لم تصلك الرسالة خلال دقائق، راجع مجلد البريد غير المرغوب فيه.",
        goToLogin: "اذهب إلى تسجيل الدخول",
        resend: "لم تصلك الرسالة؟ أعد الإرسال",
        resending: "جارٍ الإرسال…",
        resent: "أرسلنا رسالة تأكيد جديدة.",
        resendFailed: "تعذّر إرسال الرسالة. حاول بعد قليل.",
        resendWait: (seconds: number) => `يمكن إعادة الإرسال بعد ${seconds} ثانية`,
        name: "الاسم الذي يظهر للآخرين",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        passwordHint: "٨ أحرف على الأقل",
        weakCommon: "كلمة المرور دي من أكثر الكلمات استخدامًا، واختراقها سهل. اختر غيرها.",
        weakPersonal: "لا تجعل كلمة المرور اسمك أو بريدك — أول ما يُجرَّب.",
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
        checkInboxTitle: "One step left",
        checkInboxBody: "Your account is created. We have sent a confirmation email — open it, click the link, and then sign in.",
        checkInboxSpam: "If it has not arrived in a few minutes, check your spam folder.",
        goToLogin: "Go to sign in",
        resend: "Didn\u2019t get it? Send it again",
        resending: "Sending\u2026",
        resent: "A new confirmation email is on its way.",
        resendFailed: "Could not send it. Try again shortly.",
        resendWait: (seconds: number) => `You can send again in ${seconds}s`,
        name: "Display name",
        email: "Email",
        password: "Password",
        passwordHint: "8 characters minimum",
        weakCommon: "That is one of the most-used passwords there is, and it is easy to break. Please pick another.",
        weakPersonal: "Do not use your name or your email as the password — it is the first thing anyone tries.",
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
      const { needsEmailConfirmation } = await signUp({
        email,
        password,
        displayName,
        preferredLocale: locale,
      });
      // Only route on when Supabase actually handed back a session. With email
      // confirmation on it does not, and navigating anyway sent the user
      // straight back to this form with the account already created.
      if (needsEmailConfirmation) {
        setAwaitingConfirmation(true);
        return;
      }
      navigate(next || "/profile");
    } catch (err) {
      setErrorMessage(err instanceof AuthError ? (locale === "ar" ? err.friendlyAr : err.friendlyEn) : (locale === "ar" ? "تعذّر إنشاء الحساب." : "Sign-up failed."));
    } finally {
      setSubmitting(false);
    }
  }

  // The account exists but Supabase is holding the session until the address is
  // confirmed. Say so; do not route to a page that needs a session.
  if (awaitingConfirmation) {
    return (
      <div className="min-h-screen bg-[var(--brand-ivory)]" dir={locale === "ar" ? "rtl" : "ltr"}>
        <SiteChrome />
        <main id="main" className="mx-auto w-full max-w-md px-4 py-10 sm:py-14">
          <div className="rounded-lg border border-[var(--brand-navy)]/15 bg-white p-5" role="status">
            <h1 className="text-xl font-semibold text-[var(--brand-navy)]">{copy.checkInboxTitle}</h1>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-navy)]/80">{copy.checkInboxBody}</p>
            <p className="mt-2 text-xs leading-6 text-[var(--brand-navy)]/60">{copy.checkInboxSpam}</p>
            <p className="mt-3 text-sm font-medium text-[var(--brand-navy)]">{email}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`}
                className="inline-flex rounded-md bg-[var(--brand-navy)] px-4 py-2 text-sm font-medium text-[var(--brand-ivory)]"
              >
                {copy.goToLogin}
              </Link>
              <button
                type="button"
                disabled={resendState === "sending" || cooldown > 0}
                onClick={async () => {
                  setResendState("sending");
                  try {
                    await resendConfirmation(email);
                    setResendState("sent");
                  } catch {
                    setResendState("failed");
                  }
                  setCooldown(60);
                }}
                className="text-sm font-medium text-[var(--brand-navy)] underline disabled:opacity-60"
              >
                {resendState === "sending"
                  ? copy.resending
                  : cooldown > 0
                    ? copy.resendWait(cooldown)
                    : copy.resend}
              </button>
            </div>
            {resendState === "sent" && <p className="mt-3 text-sm text-green-800" role="status">{copy.resent}</p>}
            {resendState === "failed" && <p className="mt-3 text-sm text-red-700" role="alert">{copy.resendFailed}</p>}
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--brand-ivory)]" dir={locale === "ar" ? "rtl" : "ltr"}>
      <SiteChrome />
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
              {weakness === "common" && (
                <p className="text-xs leading-6 text-red-700" role="alert">{copy.weakCommon}</p>
              )}
              {weakness === "personal" && (
                <p className="text-xs leading-6 text-red-700" role="alert">{copy.weakPersonal}</p>
              )}
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
