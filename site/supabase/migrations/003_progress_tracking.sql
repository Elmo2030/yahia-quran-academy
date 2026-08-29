-- =============================================================================
-- Migration 003 — Progress tracking (PR3 of feature/progress-tracking)
-- =============================================================================
-- Run this once in the Supabase project's SQL Editor after 001 + 002.
--
-- What changes:
--   1. profiles gains last_active_day + streak_days so the site can show a
--      simple "X days in a row" counter without a separate sessions table.
--   2. record_reading(p_profile_id, p_surah, p_ayah_last_read, p_seconds_spent)
--      upserts into reader_progress (created in 001) AND advances the streak
--      in one round-trip from the client.
--   3. get_progress_summary(p_profile_id) returns the last-read surah/ayah,
--      the streak, and the saved-stories count for the Profile page and the
--      home "Continue reading" widget.
--
-- Security: both functions are SECURITY DEFINER with search_path pinned, and
-- they validate that p_profile_id belongs to the calling auth.uid() before
-- touching anything, so one user can never read or mutate another's rows.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Streak columns on profiles
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists last_active_day date;

alter table public.profiles
  add column if not exists streak_days integer not null default 0;

-- ---------------------------------------------------------------------------
-- 2. record_reading — upsert progress + advance the streak atomically
-- ---------------------------------------------------------------------------
create or replace function public.record_reading(
  p_profile_id uuid,
  p_surah smallint,
  p_ayah_last_read smallint default 0,
  p_seconds_spent integer default 0
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_today date := current_date;
  v_owns boolean;
begin
  -- The caller may only write rows for their own profile.
  select exists(
    select 1 from public.profiles
    where id = p_profile_id and auth_user_id = auth.uid()
  ) into v_owns;

  if not v_owns then
    raise exception 'forbidden: profile does not belong to caller';
  end if;

  insert into public.reader_progress (profile_id, surah, ayah_last_read, seconds_spent, updated_at)
  values (p_profile_id, p_surah, p_ayah_last_read, p_seconds_spent, now())
  on conflict (profile_id, surah) do update set
    ayah_last_read = greatest(reader_progress.ayah_last_read, excluded.ayah_last_read),
    seconds_spent  = reader_progress.seconds_spent + excluded.seconds_spent,
    updated_at     = now();

  update public.profiles
  set last_active_day = v_today,
      streak_days = case
        when last_active_day = v_today then streak_days
        when last_active_day = v_today - 1 then streak_days + 1
        else 1
      end
  where id = p_profile_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- 3. get_progress_summary — one call returns everything the UI needs
-- ---------------------------------------------------------------------------
create or replace function public.get_progress_summary(p_profile_id uuid)
returns table (
  last_surah smallint,
  last_ayah smallint,
  last_read_at timestamptz,
  streak_days integer,
  saved_stories_count bigint
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_owns boolean;
begin
  select exists(
    select 1 from public.profiles
    where id = p_profile_id and auth_user_id = auth.uid()
  ) into v_owns;

  if not v_owns then
    raise exception 'forbidden: profile does not belong to caller';
  end if;

  return query
  select
    (select surah from public.reader_progress
      where profile_id = p_profile_id order by updated_at desc limit 1)::smallint,
    (select ayah_last_read from public.reader_progress
      where profile_id = p_profile_id order by updated_at desc limit 1)::smallint,
    (select updated_at from public.reader_progress
      where profile_id = p_profile_id order by updated_at desc limit 1),
    (select streak_days from public.profiles where id = p_profile_id),
    (select count(*)::bigint from public.saved_stories where profile_id = p_profile_id);
end;
$$;

grant execute on function public.record_reading(uuid, smallint, smallint, integer) to authenticated;
grant execute on function public.get_progress_summary(uuid) to authenticated;
