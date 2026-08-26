-- Additive migration for child-led practice sessions.
-- Do not alter the legacy memorization_logs table: it represents score-based
-- history and remains readable while practice sessions evolve independently.

CREATE TABLE public.practice_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'talaqqi'
        CHECK (source IN ('talaqqi')),
    practice_mode TEXT NOT NULL DEFAULT 'selfReview'
        CHECK (practice_mode IN ('selfReview')),
    verification_status TEXT NOT NULL DEFAULT 'selfReview'
        CHECK (verification_status IN ('selfReview', 'unavailable', 'uncertain', 'verified')),
    surah SMALLINT NOT NULL CHECK (surah BETWEEN 1 AND 114),
    ayah_start SMALLINT NOT NULL CHECK (ayah_start >= 1),
    ayah_end SMALLINT NOT NULL CHECK (ayah_end >= ayah_start),
    duration_seconds INTEGER NOT NULL CHECK (duration_seconds >= 0),
    attempt_count INTEGER NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT practice_sessions_unique_profile_session UNIQUE (profile_id, session_id),
    CONSTRAINT practice_sessions_ended_after_started
        CHECK (ended_at IS NULL OR ended_at >= started_at)
);

CREATE INDEX idx_practice_sessions_profile_started_at
    ON public.practice_sessions(profile_id, started_at DESC);

ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.practice_sessions FROM anon;
GRANT SELECT, INSERT ON TABLE public.practice_sessions TO authenticated;

CREATE POLICY "practice_sessions_select_owner_or_parent"
ON public.practice_sessions
FOR SELECT
TO authenticated
USING (
    (SELECT auth.uid()) IS NOT NULL
    AND (
        profile_id IN (
            SELECT id
            FROM public.profiles
            WHERE auth_user_id = (SELECT auth.uid())
        )
        OR profile_id IN (
            SELECT id
            FROM public.profiles
            WHERE parent_id IN (
                SELECT id
                FROM public.profiles
                WHERE auth_user_id = (SELECT auth.uid())
            )
        )
    )
);

CREATE POLICY "practice_sessions_insert_owner"
ON public.practice_sessions
FOR INSERT
TO authenticated
WITH CHECK (
    (SELECT auth.uid()) IS NOT NULL
    AND profile_id IN (
        SELECT id
        FROM public.profiles
        WHERE auth_user_id = (SELECT auth.uid())
    )
);
