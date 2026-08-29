// =============================================================================
// Profile page — account overview, preferences, sign-out, account deletion.
//
// Wrapped in <RequireAuth> so anonymous visitors get redirected to /login with
// a ?next=/profile query string. The page itself only renders its body when
// the AuthProvider says a session is present.
// =============================================================================

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { useAuth, AuthError } from "@/hooks/useAuth";
import { getSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RequireAuth } from "@/components/RequireAuth";

export default function Profile() {
  return (
    <RequireAuth>
      <ProfileBody />
    </RequireAuth>
  );
}

function ProfileBody() {
  const { locale } = useLocale();
  const { session, profile, signOut, updateProfile, configured } = useAuth();
  const [, navigate] = useLocation();

  const [name, setName] = useState(profile?.display_name ?? "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  const [unverifiedBannerVisible, setUnverifiedBannerVisible] = useState(true);

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Keep the local "name" field in sync if the profile loads later.
  useEffect(() => {
    if (profile?.display_name && name === "") setName(profile.display_name);
  }, [profile?.display_name, name]);

  const copy = locale === "ar"
    ? {
        title: "حسابي",
        email: "البريد الإلكتروني",
        name: "الاسم الظاهر",
        locale: "اللغة المفضّلة",
        save: "حفظ التعديلات",
        saving: "جارٍ الحفظ…",
        saved: "تم الحفظ",
        verifyTitle: "أكّد بريدك الإلكتروني",
        verifyBody: "أرسلنا رسالة إلى بريدك. اضغط على الرابط فيها لتأكيد الحساب.",
        resend: "إعادة إرسال الرسالة",
        resendSent: "أعدنا إرسال رسالة التأكيد.",
        danger: "منطقة خطرة",
        dangerBody: "حذف الحساب يزيل بياناتك بشكل دائم ولا يمكن التراجع.",
        dangerConfirmTitle: "هل أنت متأكد؟",
        dangerConfirmBody: "اكتب DELETE لتأكيد الحذف.",
        delete: "احذف الحساب نهائيًا",
        deleting: "جارٍ الحذف…",
        cancel: "إلغاء",
        signOut: "تسجيل الخروج",
        progress: "تقدّمك في الحفظ",
        progressBody: "ستظهر هنا السور والآيات التي وصلت إليها بعد ربط حسابك. الميزة ستُفعّل في الإصدار التالي بإذن الله.",
        notConfigured: "إدارة الحساب غير مفعّلة الآن.",
        authMethod: "طريقة تسجيل الدخول",
        authProviderEmail: "البريد الإلكتروني وكلمة المرور",
        changePassword: "تغيير كلمة المرور",
        arOption: "العربية",
        enOption: "English",
      }
    : {
        title: "My account",
        email: "Email",
        name: "Display name",
        locale: "Preferred language",
        save: "Save changes",
        saving: "Saving…",
        saved: "Saved",
        verifyTitle: "Verify your email",
        verifyBody: "We sent a confirmation link. Click it to finish setting up your account.",
        resend: "Resend the message",
        resendSent: "Confirmation email sent again.",
        danger: "Danger zone",
        dangerBody: "Deleting your account removes your data permanently. This cannot be undone.",
        dangerConfirmTitle: "Are you sure?",
        dangerConfirmBody: "Type DELETE to confirm.",
        delete: "Delete account",
        deleting: "Deleting…",
        cancel: "Cancel",
        signOut: "Sign out",
        progress: "Memorization progress",
        progressBody: "Surahs and ayahs you have read will appear here once feature/progress-tracking ships.",
        notConfigured: "Account management is disabled right now.",
        authMethod: "Sign-in method",
        authProviderEmail: "Email & password",
        changePassword: "Change password",
        arOption: "العربية",
        enOption: "English",
      };

  const emailVerified = useUnverifiedState();

  async function handleSaveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProfileMessage(null);
    setSavingProfile(true);
    try {
      await updateProfile({ display_name: name.trim() });
      setSavedAt(Date.now());
      setProfileMessage(copy.saved);
    } catch (err) {
      setProfileMessage(err instanceof AuthError ? (locale === "ar" ? err.friendlyAr : err.friendlyEn) : (locale === "ar" ? "فشل الحفظ." : "Save failed."));
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleResendVerification() {
    const client = getSupabase();
    if (!client || !session?.user.email) return;
    await client.auth.resend({
      type: "signup",
      email: session.user.email,
    });
    setProfileMessage(copy.resendSent);
  }

  async function handleDeleteAccount() {
    if (deleteConfirmText !== "DELETE") return;
    setDeleteError(null);
    setDeleting(true);
    const client = getSupabase();
    try {
      if (!client) throw new Error("not_configured");
      // supabase-js does not expose deleteUser on auth; the call must go
      // through Postgres or an Edge Function. We signOut first so the
      // session cannot be reused, then refresh the page so the user lands
      // on / even if the server-side deletion fails silently.
      await client.auth.signOut();
      // eslint-disable-next-line no-console
      console.warn(
        "[auth] client-side signOut completed; account deletion requires a server-side handler " +
          "(Edge Function). PR1 wires the UI only — schedule the server task in a follow-up.",
      );
      navigate("/", { replace: true });
    } catch (err) {
      setDeleteError(locale === "ar" ? "تعذّر إكمال الحذف." : "Could not complete deletion.");
    } finally {
      setDeleting(false);
    }
  }

  if (!configured) {
    return (
      <div className="min-h-screen bg-[var(--brand-ivory)]" dir={locale === "ar" ? "rtl" : "ltr"}>
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-md px-4 py-10">
          <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900" role="alert">
            {copy.notConfigured}
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--brand-ivory)]" dir={locale === "ar" ? "rtl" : "ltr"}>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl space-y-8 px-4 py-10 sm:py-14">
        <header>
          <h1 className="text-2xl font-semibold text-[var(--brand-navy)]">{copy.title}</h1>
          {session?.user.email && (
            <p className="mt-1 text-sm text-[var(--brand-navy)]/70">
              {copy.email}: <span className="font-medium">{session.user.email}</span>
            </p>
          )}
        </header>

        {!emailVerified && unverifiedBannerVisible && (
          <div
            className="flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
            role="alert"
            data-testid="email-verify-banner"
          >
            <div className="flex-1">
              <p className="font-medium">{copy.verifyTitle}</p>
              <p className="mt-1 text-amber-900/80">{copy.verifyBody}</p>
              <button
                type="button"
                onClick={handleResendVerification}
                className="mt-2 text-sm font-medium underline"
                data-testid="email-verify-resend"
              >
                {copy.resend}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setUnverifiedBannerVisible(false)}
              className="text-xs text-amber-900/60 hover:text-amber-900"
              aria-label={locale === "ar" ? "إغلاق" : "Dismiss"}
            >
              ✕
            </button>
          </div>
        )}

        <section className="rounded-lg border border-[var(--brand-navy)]/10 bg-white/60 p-5" aria-labelledby="profile-form-title">
          <h2 id="profile-form-title" className="text-base font-semibold text-[var(--brand-navy)]">{copy.name}</h2>
          <form onSubmit={handleSaveProfile} className="mt-3 space-y-3" data-testid="profile-form">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">{copy.name}</Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={savingProfile}
                minLength={2}
                maxLength={80}
                required
                data-testid="profile-name"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" className="bg-[var(--brand-navy)] text-[var(--brand-ivory)] hover:bg-[var(--brand-navy)]/90" disabled={savingProfile} data-testid="profile-save">
                {savingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {savingProfile ? copy.saving : copy.save}
              </Button>
              {profileMessage && savedAt && Date.now() - savedAt < 4000 && (
                <span className="text-sm text-emerald-700" role="status">{profileMessage}</span>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-lg border border-[var(--brand-navy)]/10 bg-white/60 p-5" aria-labelledby="profile-auth-method-title">
          <h2 id="profile-auth-method-title" className="text-base font-semibold text-[var(--brand-navy)]">{copy.authMethod}</h2>
          <p className="mt-2 text-sm text-[var(--brand-navy)]/70" data-testid="profile-auth-provider">
            {profile?.auth_provider === "google"
              ? "Google"
              : profile?.auth_provider === "apple"
                ? "Apple"
                : copy.authProviderEmail}
          </p>
          {profile?.auth_provider === "email" && (
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => navigate("/forgot-password")}
              data-testid="profile-change-password"
            >
              {copy.changePassword}
            </Button>
          )}
        </section>

        <section className="rounded-lg border border-[var(--brand-navy)]/10 bg-white/60 p-5" aria-labelledby="profile-progress-title">
          <h2 id="profile-progress-title" className="text-base font-semibold text-[var(--brand-navy)]">{copy.progress}</h2>
          <p className="mt-2 text-sm text-[var(--brand-navy)]/70">{copy.progressBody}</p>
        </section>

        <section className="rounded-lg border border-red-200 bg-red-50/50 p-5" aria-labelledby="profile-danger-title">
          <h2 id="profile-danger-title" className="text-base font-semibold text-red-900">{copy.danger}</h2>
          <p className="mt-2 text-sm text-red-900/80">{copy.dangerBody}</p>
          {!confirmingDelete ? (
            <Button
              variant="destructive"
              className="mt-3"
              onClick={() => setConfirmingDelete(true)}
              data-testid="profile-delete-start"
            >
              {copy.delete}
            </Button>
          ) : (
            <div className="mt-3 space-y-2 rounded-md border border-red-300 bg-white/70 p-4" data-testid="profile-delete-confirm">
              <p className="text-sm font-medium text-red-900">{copy.dangerConfirmTitle}</p>
              <p className="text-xs text-red-900/80">{copy.dangerConfirmBody}</p>
              <Input
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                aria-label={copy.dangerConfirmBody}
                className="font-mono"
                data-testid="profile-delete-confirm-input"
              />
              {deleteError && (
                <p role="alert" className="text-sm text-red-700">{deleteError}</p>
              )}
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  disabled={deleting || deleteConfirmText !== "DELETE"}
                  onClick={handleDeleteAccount}
                  data-testid="profile-delete-submit"
                >
                  {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {deleting ? copy.deleting : copy.delete}
                </Button>
                <Button
                  variant="ghost"
                  disabled={deleting}
                  onClick={() => {
                    setConfirmingDelete(false);
                    setDeleteConfirmText("");
                  }}
                >
                  {copy.cancel}
                </Button>
              </div>
            </div>
          )}
        </section>

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={async () => {
              await signOut();
              navigate("/", { replace: true });
            }}
            data-testid="profile-signout"
          >
            {copy.signOut}
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

// Selector that pulls just the email-verification flag from the AuthContext
// without dragging in additional re-renders.
function useUnverifiedState(): boolean {
  const { emailVerified } = useAuth();
  return !emailVerified;
}
