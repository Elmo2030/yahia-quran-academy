// =============================================================================
// AuthContext — single source of truth for the signed-in user.
//
// Mirrors the ThemeContext pattern: a Provider that owns state and exposes a
// hook (`useAuth`) descendants call. Children re-render whenever the session
// changes so navigation chrome (header avatar, library sync) keeps in step.
//
// The provider is resilient to Supabase being unconfigured: it sets
// `configured: false` instead of throwing, so the UI can render a friendly
// message rather than a blank screen on environments that forgot to set the
// environment variables.
// =============================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { getSupabase, isSupabaseConfigured, mightHaveSession } from "@/lib/supabase";

type Locale = "ar" | "en";

type Profile = {
  id: string;
  auth_user_id: string;
  display_name: string;
  preferred_locale: Locale;
  auth_provider: string;
};

type SignUpInput = {
  email: string;
  password: string;
  displayName: string;
  preferredLocale: Locale;
};

type SignInInput = {
  email: string;
  password: string;
};

export type SocialProvider = "google" | "apple";

export type AuthErrorCode =
  | "invalid_email"
  | "weak_password"
  | "email_taken"
  | "invalid_credentials"
  | "email_not_confirmed"
  | "rate_limited"
  | "network"
  | "server"
  | "not_configured";

export class AuthError extends Error {
  readonly code: AuthErrorCode;
  readonly friendlyAr: string;
  readonly friendlyEn: string;

  constructor(
    code: AuthErrorCode,
    friendlyAr: string,
    friendlyEn: string,
    cause?: unknown,
  ) {
    super(friendlyEn);
    this.name = "AuthError";
    this.code = code;
    this.friendlyAr = friendlyAr;
    this.friendlyEn = friendlyEn;
    if (cause !== undefined) {
      (this as Error & { cause?: unknown }).cause = cause;
    }
  }
}

type AuthState = {
  configured: boolean;
  loading: boolean;
  initialized: boolean;
  session: { user: { id: string; email: string | null } } | null;
  profile: Profile | null;
  emailVerified: boolean;
};

type AuthApi = AuthState & {
  /** Resolves with whether Supabase withheld the session pending email
   *  confirmation, so the caller can say so instead of routing to a page that
   *  needs a session. */
  signUp: (input: SignUpInput) => Promise<{ needsEmailConfirmation: boolean }>;
  signIn: (input: SignInInput) => Promise<void>;
  signInWithProvider: (provider: SocialProvider, redirectTo?: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  /** Sends a fresh confirmation link. Supabase expires the original, so an
   *  account left unconfirmed for a while has no working link at all. */
  resendConfirmation: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (patch: Partial<Pick<Profile, "display_name" | "preferred_locale">>) => Promise<void>;
};

const emptyState: AuthState = {
  configured: isSupabaseConfigured(),
  loading: true,
  initialized: false,
  session: null,
  profile: null,
  emailVerified: false,
};

const AuthContext = createContext<AuthApi | null>(null);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const friendlyForSupabaseError = (message: string): { ar: string; en: string; code: AuthErrorCode } => {
  const lowered = message.toLowerCase();
  if (lowered.includes("already registered") || lowered.includes("user already")) {
    return {
      code: "email_taken",
      ar: "هذا البريد مسجل من قبل. جرّب تسجيل الدخول.",
      en: "This email is already registered. Try signing in instead.",
    };
  }
  if (lowered.includes("invalid login") || lowered.includes("invalid credentials")) {
    return {
      code: "invalid_credentials",
      ar: "البريد أو كلمة المرور غير صحيحة.",
      en: "Invalid email or password.",
    };
  }
  if (lowered.includes("email not confirmed") || lowered.includes("not confirmed")) {
    return {
      code: "email_not_confirmed",
      ar: "تحتاج لتأكيد بريدك أولاً. تحقّق من صندوق الوارد.",
      en: "Please confirm your email first — check your inbox.",
    };
  }
  if (lowered.includes("password") && (lowered.includes("short") || lowered.includes("at least"))) {
    return {
      code: "weak_password",
      ar: "كلمة المرور قصيرة جدًا. استخدم 8 أحرف على الأقل.",
      en: "Password is too short — use at least 8 characters.",
    };
  }
  if (lowered.includes("rate") || lowered.includes("too many")) {
    return {
      code: "rate_limited",
      ar: "محاولات كثيرة جدًا. انتظر لحظة وحاول مرة أخرى.",
      en: "Too many attempts. Please wait a moment and try again.",
    };
  }
  if (lowered.includes("invalid email") || lowered.includes("email is invalid")) {
    return {
      code: "invalid_email",
      ar: "صيغة البريد الإلكتروني غير صحيحة.",
      en: "That email address looks invalid.",
    };
  }
  if (lowered.includes("fetch") || lowered.includes("network")) {
    return {
      code: "network",
      ar: "تعذّر الاتصال بالخادم. تحقق من الإنترنت.",
      en: "Could not reach the server. Check your connection.",
    };
  }
  return {
    code: "server",
    ar: "حدث خطأ غير متوقع. أعد المحاولة لاحقًا.",
    en: "Something went wrong. Please try again later.",
  };
};

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(emptyState);

  // Cache the last user-id we fetched a profile for, so consecutive onAuthStateChange
  // fires for the same session don't refetch.
  const lastFetchedUserIdRef = useRef<string | null>(null);

  const fetchProfile = useCallback(async (authUserId: string): Promise<Profile | null> => {
    const client = await getSupabase();
    if (!client) return null;
    const { data, error } = await client
      .from("profiles")
      .select("id, auth_user_id, display_name, preferred_locale, auth_provider")
      .eq("auth_user_id", authUserId)
      .maybeSingle();
    if (error) {
      // The profile is created by the on_auth_user_created trigger, so an
      // error here usually means the row hasn't been written yet (race) or
      // RLS blocked it. We log to the console in dev for debugging and
      // surface the loading=false flag to the UI without throwing.
      // eslint-disable-next-line no-console
      console.warn("[auth] profile fetch failed:", error.message);
      return null;
    }
    if (!data) return null;
    return data as Profile;
  }, []);

  const refreshProfile = useCallback(async () => {
    const client = await getSupabase();
    const userId = state.session?.user.id;
    if (!client || !userId) {
      setState((s) => ({ ...s, profile: null }));
      return;
    }
    const profile = await fetchProfile(userId);
    lastFetchedUserIdRef.current = userId;
    setState((s) => ({ ...s, profile }));
  }, [state.session?.user.id, fetchProfile]);

  // Initial subscription + auth state changes.
  useEffect(() => {
    let cancelled = false;
    let unsubscribe = () => {};

    void (async () => {
    // Nobody signed in and nothing coming back from a provider: there is no
    // session to restore, so the library is not fetched. It loads the moment
    // anything actually needs it — signing in, or opening the account page.
    if (isSupabaseConfigured() && !mightHaveSession()) {
      setState((s) => ({ ...s, configured: true, session: null, profile: null, loading: false, initialized: true }));
      return;
    }

    const client = await getSupabase();
    if (!client) {
      setState({ ...emptyState, configured: false, loading: false, initialized: true });
      return;
    }

    client.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      const session = data.session
        ? { user: { id: data.session.user.id, email: data.session.user.email ?? null } }
        : null;
      const verified = !!data.session?.user?.email_confirmed_at;
      setState((s) => ({ ...s, session, emailVerified: verified, loading: false, initialized: true }));
      if (session) {
        lastFetchedUserIdRef.current = session.user.id;
        fetchProfile(session.user.id).then((profile) => {
          if (!cancelled) setState((s) => ({ ...s, profile }));
        });
      }
    });

    const { data: sub } = client.auth.onAuthStateChange((_event, newSession) => {
      if (cancelled) return;
      const session = newSession
        ? { user: { id: newSession.user.id, email: newSession.user.email ?? null } }
        : null;
      const verified = !!newSession?.user?.email_confirmed_at;
      setState((s) => ({ ...s, session, emailVerified: verified }));
      // Email-verification notice: Supabase fires SIGNED → sign-in succeeded
      // regardless of email confirmation. Track it in state so the UI can
      // show a banner prompting the user to check their inbox.
      if (session && session.user.id !== lastFetchedUserIdRef.current) {
        lastFetchedUserIdRef.current = session.user.id;
        fetchProfile(session.user.id).then((profile) => {
          if (!cancelled) setState((s) => ({ ...s, profile }));
        });
      } else if (!session) {
        lastFetchedUserIdRef.current = null;
        setState((s) => ({ ...s, profile: null }));
      }
    });

    unsubscribe = () => sub.subscription.unsubscribe();
    })();

    return () => {
      cancelled = true;
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  const signIn = useCallback(async (input: SignInInput) => {
    const client = await getSupabase();
    if (!client) throw new AuthError("not_configured", "تسجيل الدخول غير متاح مؤقتًا.", "Sign-in is temporarily unavailable.");
    const { error } = await client.auth.signInWithPassword({
      email: input.email.trim(),
      password: input.password,
    });
    if (error) {
      const f = friendlyForSupabaseError(error.message);
      throw new AuthError(f.code, f.ar, f.en, error);
    }
  }, []);

  const signInWithProvider = useCallback(async (provider: SocialProvider, redirectTo?: string) => {
    const client = await getSupabase();
    if (!client) {
      throw new AuthError(
        "not_configured",
        "تسجيل الدخول عبر المزوّد غير متاح مؤقتًا.",
        "Provider sign-in is temporarily unavailable.",
      );
    }
    // Only a path on this site, never a URL. An absolute address handed to
    // Supabase is where the browser lands after Google or Apple sign in, with
    // the session in the URL — so it must not be possible to point it off-site.
    // Both callers already check this before calling; the guarantee belongs
    // here, where it holds for whoever calls next. A leading "//" is a URL to
    // another host wearing a path's clothes, so it is refused too.
    const safe = redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/profile";
    const target = `${window.location.origin}${safe}`;
    const { error } = await client.auth.signInWithOAuth({
      provider,
      options: { redirectTo: target },
    });
    if (error) {
      const f = friendlyForSupabaseError(error.message);
      throw new AuthError(f.code, f.ar, f.en, error);
    }
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    const client = await getSupabase();
    if (!client) {
      throw new AuthError(
        "not_configured",
        "استعادة كلمة المرور غير متاحة مؤقتًا.",
        "Password reset is temporarily unavailable.",
      );
    }
    const { error } = await client.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      const f = friendlyForSupabaseError(error.message);
      throw new AuthError(f.code, f.ar, f.en, error);
    }
  }, []);

  const updatePassword = useCallback(async (password: string) => {
    const client = await getSupabase();
    if (!client) {
      throw new AuthError(
        "not_configured",
        "تحديث كلمة المرور غير متاح مؤقتًا.",
        "Password update is temporarily unavailable.",
      );
    }
    const { error } = await client.auth.updateUser({ password });
    if (error) {
      const f = friendlyForSupabaseError(error.message);
      throw new AuthError(f.code, f.ar, f.en, error);
    }
  }, []);

  const signUp = useCallback(async (input: SignUpInput) => {
    const client = await getSupabase();
    if (!client) throw new AuthError("not_configured", "إنشاء الحسابات غير متاح مؤقتًا.", "Sign-up is temporarily unavailable.");
    const { data, error } = await client.auth.signUp({
      email: input.email.trim(),
      password: input.password,
      options: {
        data: {
          display_name: input.displayName.trim(),
          preferred_locale: input.preferredLocale,
        },
      },
    });
    if (error) {
      const f = friendlyForSupabaseError(error.message);
      throw new AuthError(f.code, f.ar, f.en, error);
    }
    // With "Confirm email" enabled Supabase creates the user but returns no
    // session, and no auth-state event fires. Sign-up used to discard this and
    // route to /profile regardless, which bounced straight back — the account
    // was created, but the person was returned to the form with no explanation.
    return { needsEmailConfirmation: !data.session };
  }, []);

  const resendConfirmation = useCallback(async (email: string) => {
    const client = await getSupabase();
    if (!client) throw new AuthError("not_configured", "إعادة الإرسال غير متاحة مؤقتًا.", "Resending is temporarily unavailable.");
    const { error } = await client.auth.resend({
      type: "signup",
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/login` },
    });
    if (error) {
      const f = friendlyForSupabaseError(error.message);
      throw new AuthError(f.code, f.ar, f.en, error);
    }
  }, []);

  const signOut = useCallback(async () => {
    const client = await getSupabase();
    if (!client) return;
    await client.auth.signOut();
    // The onAuthStateChange listener above will clear session + profile.
  }, []);

  const updateProfile = useCallback<AuthApi["updateProfile"]>(async (patch) => {
    const client = await getSupabase();
    const userId = state.session?.user.id;
    if (!client || !userId) throw new AuthError("not_configured", "تعذّر التحديث.", "Update not available.");
    const { data, error } = await client
      .from("profiles")
      .update(patch)
      .eq("auth_user_id", userId)
      .select("id, auth_user_id, display_name, preferred_locale, auth_provider")
      .single();
    if (error) {
      const f = friendlyForSupabaseError(error.message);
      throw new AuthError(f.code, f.ar, f.en, error);
    }
    setState((s) => ({ ...s, profile: data as Profile }));
  }, [state.session?.user.id]);

  const api = useMemo<AuthApi>(() => ({
    ...state,
    signUp,
    signIn,
    signInWithProvider,
    sendPasswordReset,
    resendConfirmation,
    updatePassword,
    signOut,
    refreshProfile,
    updateProfile,
  }), [state, signUp, signIn, signInWithProvider, sendPasswordReset, resendConfirmation, updatePassword, signOut, refreshProfile, updateProfile]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthApi {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>.");
  }
  return ctx;
}

// Re-export for ergonomics — `import useAuth from "@/hooks/useAuth"` reads
// better than reaching into the contexts folder from a page module.
export { useAuth as default } from "@/contexts/AuthContext";
