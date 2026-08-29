// =============================================================================
// ForgotPassword — request a password-reset email.
//
// Calls AuthProvider.sendPasswordReset(email), which uses Supabase's
// resetPasswordForEmail with a redirect back to /reset-password. We always
// show a success screen after the call (even for unknown emails) so the page
// does not leak which addresses are registered — standard anti-enumeration
// behaviour.
// =============================================================================

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Loader2, MailCheck } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import useAuth, { AuthError } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function ForgotPassword() {
  const { locale } = useLocale();
  const { sendPasswordReset, configured, initialized, session } = useAuth();
  const [, navigate] = useLocation();

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // A signed-in user has no use for a reset link — bounce them to /profile.
  useEffect(() => {
    if (configured && initialized && session) {
      navigate("/profile", { replace: true });
    }
  }, [configured, initialized, session, navigate]);

  const copy = locale === "ar"
    ? {
        title: "استعادة كلمة المرور",
        body: "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لتعيين كلمة مرور جديدة.",
        label: "البريد الإلكتروني",
        submit: "إرسال رابط الاستعادة",
        submitting: "جارٍ الإرسال…",
        sentTitle: "تحقّق من بريدك",
        sentBody: "إذا كان الحساب مسجّلًا لدينا، ستصل رسالة فيها رابط الاستعادة خلال دقائق.",
        backToLogin: "العودة إلى تسجيل الدخول",
        notConfigured: "استعادة كلمة المرور غير مفعّلة حاليًا.",
      }
    : {
        title: "Reset your password",
        body: "Enter your email and we will send you a link to set a new password.",
        label: "Email",
        submit: "Send reset link",
        submitting: "Sending…",
        sentTitle: "Check your inbox",
        sentBody: "If the account exists, a reset link is on its way within a few minutes.",
        backToLogin: "Back to sign in",
        notConfigured: "Password reset is currently disabled.",
      };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
    } catch (err) {
      setErrorMessage(
        err instanceof AuthError
          ? locale === "ar"
            ? err.friendlyAr
            : err.friendlyEn
          : locale === "ar"
            ? "تعذّر إرسال رابط الاستعادة."
            : "Could not send the reset link.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--brand-ivory)]" dir={locale === "ar" ? "rtl" : "ltr"}>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-md px-4 py-10 sm:py-14">
        {sent ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-6 text-center" role="status" data-testid="forgot-sent">
            <MailCheck className="mx-auto h-10 w-10 text-emerald-700" aria-hidden="true" />
            <h1 className="mt-3 text-xl font-semibold text-[var(--brand-navy)]">{copy.sentTitle}</h1>
            <p className="mt-2 text-sm text-[var(--brand-navy)]/70">{copy.sentBody}</p>
            <Link
              href="/login"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-navy)] hover:underline"
            >
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              {copy.backToLogin}
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--brand-navy)]">{copy.title}</h1>
            <p className="mt-2 text-sm text-[var(--brand-navy)]/70">{copy.body}</p>
            {!configured ? (
              <div className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900" role="alert">
                {copy.notConfigured}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" data-testid="forgot-form" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="forgot-email">{copy.label}</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitting || !initialized}
                    data-testid="forgot-email"
                  />
                </div>
                {errorMessage && (
                  <p role="alert" className="text-sm text-red-700" data-testid="forgot-error">
                    {errorMessage}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-[var(--brand-navy)] text-[var(--brand-ivory)] hover:bg-[var(--brand-navy)]/90"
                  disabled={submitting || !initialized || email.trim().length === 0}
                  data-testid="forgot-submit"
                >
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {submitting ? copy.submitting : copy.submit}
                </Button>
                <Link href="/login" className="block text-center text-sm text-[var(--brand-navy)] hover:underline">
                  {copy.backToLogin}
                </Link>
              </form>
            )}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
