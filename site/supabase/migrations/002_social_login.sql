-- =============================================================================
-- Migration 002 — Social login (PR2 of feature/social-login)
-- =============================================================================
-- Run this once in the Supabase project's SQL Editor after 001_auth_foundation.
--
-- What changes:
--   1. profiles gains an `auth_provider` column ('email' | 'google' | 'apple')
--      so the Profile page can show how the user signed in.
--   2. The handle_new_auth_user trigger is upgraded: for OAuth sign-ins the
--      display name is derived from full_name / name / user_name (the fields
--      Google & Apple put in raw_user_meta_data), and the provider is stamped
--      from raw_app_meta_data->>'provider'.
--   3. The insert now upserts (on conflict do update) so a re-created or
--      linked auth user always lands on a consistent profile row.
--
-- No RLS changes: the existing policies key off auth_user_id = auth.uid(),
-- which holds for OAuth sessions exactly as it does for email sessions.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. auth_provider column
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists auth_provider text not null default 'email'
  check (auth_provider in ('email', 'google', 'apple'));

-- ---------------------------------------------------------------------------
-- 2. Upgraded profile-creation trigger (OAuth-aware)
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_display_name text;
  v_locale text;
  v_provider text;
begin
  v_provider := coalesce(new.raw_app_meta_data->>'provider', 'email');

  -- OAuth providers publish the name under full_name (Google) / name (Apple);
  -- fall back to display_name, then user_name, then the email local-part.
  v_display_name := coalesce(
    nullif(btrim(coalesce(new.raw_user_meta_data->>'display_name', '')), ''),
    nullif(btrim(coalesce(new.raw_user_meta_data->>'full_name', '')), ''),
    nullif(btrim(coalesce(new.raw_user_meta_data->>'name', '')), ''),
    nullif(btrim(coalesce(new.raw_user_meta_data->>'user_name', '')), ''),
    split_part(coalesce(new.email, ''), '@', 1)
  );
  v_locale := coalesce(
    new.raw_user_meta_data->>'preferred_locale',
    'ar'
  );

  insert into public.profiles (auth_user_id, display_name, preferred_locale, auth_provider)
  values (new.id, v_display_name, v_locale, v_provider)
  on conflict (auth_user_id) do update set
    display_name    = excluded.display_name,
    preferred_locale = excluded.preferred_locale,
    auth_provider   = excluded.auth_provider;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();
