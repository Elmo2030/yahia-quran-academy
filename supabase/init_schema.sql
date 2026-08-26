-- FARAS Quran AI — Production Schema
-- Execute in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('child','parent','teacher')),
    parent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    display_name TEXT NOT NULL,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quran_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    surah SMALLINT NOT NULL,
    ayah SMALLINT NOT NULL,
    word_timestamps JSONB,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE (surah, ayah)
);

CREATE TABLE IF NOT EXISTS memorization_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    duration_seconds INT NOT NULL,
    score NUMERIC(5,2) NOT NULL,
    mistakes JSONB,
    started_at timestamptz NOT NULL DEFAULT now(),
    ended_at timestamptz
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_read_policy" ON profiles;
CREATE POLICY "profiles_read_policy" ON profiles
FOR SELECT USING (
    auth_user_id = auth.uid() OR
    parent_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
);

DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
CREATE POLICY "profiles_update_policy" ON profiles
FOR UPDATE USING (auth_user_id = auth.uid());

ALTER TABLE memorization_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "logs_owner_or_parent" ON memorization_logs;
CREATE POLICY "logs_owner_or_parent" ON memorization_logs
    USING (
        profile_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
        OR profile_id IN (
            SELECT id FROM profiles
            WHERE parent_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
        )
    )
    WITH CHECK (
        profile_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
    );

ALTER TABLE quran_metadata ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "qm_public_read" ON quran_metadata;
CREATE POLICY "qm_public_read" ON quran_metadata FOR SELECT USING (true);

-- ============================================================
-- INDEXES (IF NOT EXISTS)
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_memorization_logs_profile_id ON memorization_logs(profile_id);
CREATE INDEX IF NOT EXISTS idx_memorization_logs_started_at ON memorization_logs(started_at);
CREATE INDEX IF NOT EXISTS idx_quran_metadata_surah_ayah ON quran_metadata(surah, ayah);
CREATE INDEX IF NOT EXISTS idx_profiles_auth_user_id ON profiles(auth_user_id);

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (auth_user_id, role, display_name)
  VALUES (
    new.id,
    'parent',
    coalesce(new.raw_user_meta_data->>'full_name', 'New User')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
