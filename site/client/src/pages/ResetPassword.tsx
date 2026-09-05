// =============================================================================
// ResetPassword — set a new password after clicking the email reset link.
//
// Supabase's recovery email points here with the session token in the URL
// hash; supabase-js restores the session (detectSessionInUrl: true) and we
// call AuthProvider.updatePassword(). If no session is present (expired link,
// opened on another device, …) we show a friendly notice + a link to request
// a fresh reset link.
// =============================================================================

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Loader2, ShieldCheck } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { passwordProblem } from "@/lib/weak-passwords";
import useAuth, { AuthError } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";

const MIN_PASSWORD = 8;

export default function ResetPassword() {
  const { locale } = useLocale();
  const { updatePassword, session, initialized } = useAuth();
  const [, navigate] = useLocation();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const copy = locale === "ar"
    ? {
        title: "تعيين كلمة مرور جديدة",
        password: "كلمة المرور الجديدة",
        hint: "٨ أحرف على الأقل",
        confirm: "تأكيد كلمة المرور",
        submit: "حفظ كلمة المرور",
        submitting: "جارٍ الحفظ…",
        doneTitle: "تم تحديث كلمة المرور",
        doneBody: "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.",
        toProfile: "الانتقال إلى حسابي",
        invalid: "الرابط غير صالح أو منتهي الصلاحية.",
        invalidBody: "اطلب رابطًا جديدًا لاستعادة كلمة المرور.",
        requestNew: "طلب رابط جديد",
        mismatch: "كلمتا المرور غير متطابقتين.",
        tooShort: "كلمة المرور قصيرة جدًا.",
      }
    : {
        title: "Set a new password",
        password: "New password",
        hint: "8 characters minimum",
        confirm: "Confirm password",
        submit: "Save password",
        submitting: "Saving…",
        doneTitle: "Password updated",
        doneBody: "You can now sign in with your new password.",
        toProfile: "Go to my account",
        invalid: "This link is invalid or has expired.",
        invalidBody: "Request a fresh link to reset your password.",
        requestNew: "Request a new link",
        mismatch: "Passwords don't match.",
        tooShort: "Password is too short.",
      };

  const passwordLongEnough = password.length >= MIN_PASSWORD;
  const weakness = passwordProblem(password, { min: MIN_PASSWORD });
  const passwordsMatch = confirm.length > 0 && password === confirm;
  const formValid = passwordLongEnough && passwordsMatch && !weakness;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    if (weakness === "common" || weakness === "personal") {
      setErrorMessage(locale === "ar"
        ? "كلمة المرور دي سهلة التخمين. اختر غيرها."
        : "That password is easy to guess. Please pick another.");
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
    setSubmitting(true);
    try {
      await updatePassword(password);
      setDone(true);
    } catch (err) {
      setErrorMessage(
        err instanceof AuthError
          ? locale === "ar"
            ? err.friendlyAr
            : err.friendlyEn
          : locale === "ar"
            ? "تعذّر تحديث كلمة المرور."
            : "Could not update your password.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--brand-ivory)]" dir={locale === "ar" ? "rtl" : "ltr"}>
      <SiteChrome />
      <main id="main" className="mx-auto w-full max-w-md px-4 py-10 sm:py-14">
        {!initialized ? (
          <div className="flex items-center justify-center py-10" role="status" aria-live="polite">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--brand-navy)] border-t-transparent" />
          </div>
        ) : !session ? (
          <div className="rounded-lg border border-amber-300 bg-amber-50/60 p-6 text-center" data-testid="reset-invalid">
            <h1 className="text-xl font-semibold text-[var(--brand-navy)]">{copy.invalid}</h1>
            <p className="mt-2 text-sm text-[var(--brand-navy)]/70">{copy.invalidBody}</p>
            <Link
              href="/forgot-password"
              className="mt-4 inline-block text-sm font-medium text-[var(--brand-navy)] hover:underline"
            >
              {copy.requestNew}
            </Link>
          </div>
        ) : done ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-6 text-center" role="status" data-testid="reset-done">
            <ShieldCheck className="mx-auto h-10 w-10 text-emerald-700" aria-hidden="true" />
            <h1 className="mt-3 text-xl font-semibold text-[var(--brand-navy)]">{copy.doneTitle}</h1>
            <p className="mt-2 text-sm text-[var(--brand-navy)]/70">{copy.doneBody}</p>
            <Button
              className="mt-4 bg-[var(--brand-navy)] text-[var(--brand-ivory)] hover:bg-[var(--brand-navy)]/90"
              onClick={() => navigate("/profile")}
              data-testid="reset-to-profile"
            >
              {copy.toProfile}
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--brand-navy)]">{copy.title}</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4" data-testid="reset-form" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="reset-password">{copy.password}</Label>
                <Input
                  id="reset-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={MIN_PASSWORD}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  disabled={submitting}
                  data-testid="reset-password"
                  aria-describedby="reset-password-hint"
                />
                <p id="reset-password-hint" className="text-xs text-[var(--brand-navy)]/60">{copy.hint}</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reset-confirm">{copy.confirm}</Label>
                <Input
                  id="reset-confirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  disabled={submitting}
                  data-testid="reset-confirm"
                />
              </div>
              {errorMessage && (
                <p role="alert" className="text-sm text-red-700" data-testid="reset-error">
                  {errorMessage}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-[var(--brand-navy)] text-[var(--brand-ivory)] hover:bg-[var(--brand-navy)]/90"
                disabled={submitting || !formValid}
                data-testid="reset-submit"
              >
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitting ? copy.submitting : copy.submit}
              </Button>
            </form>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
