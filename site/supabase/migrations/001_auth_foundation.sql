-- =============================================================================
-- Migration 001 — Auth foundation (PR1 of feature/auth-foundation)
-- =============================================================================
-- Run this once in the Supabase project's SQL Editor (Authentication -> SQL
-- Editor -> New query -> paste -> Run).  The tables extend auth.users (which
-- Supabase maintains) with application-specific rows gated by Row Level
-- Security, so users can only see and mutate their own data.
--
-- PR3 (feature/progress-tracking) re-uses reader_progress + saved_stories
-- defined here to track which ayah the reader last viewed and which story
-- cards are saved in the library. The columns created here cover what PR3
-- needs without forcing a follow-up migration.
-- =============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles — one row per auth.users; display name + locale preference.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique not null references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 80),
  preferred_locale text not null default 'ar' check (preferred_locale in ('ar','en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- reader_progress — last ayah read per surah for the Continue Reading widget.
-- Populated by feature/progress-tracking, defined here so RLS + indexes are in
-- place on day one.
create table if not exists public.reader_progress (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  surah smallint not null check (surah between 1 and 114),
  ayah_last_read smallint not null default 0,
  seconds_spent integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (profile_id, surah)
);

-- saved_stories — story slugs the reader bookmarked on the Stories page.
create table if not exists public.saved_stories (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  chapter text not null,
  slug text not null,
  saved_at timestamptz not null default now(),
  primary key (profile_id, chapter, slug)
);

-- ---------------------------------------------------------------------------
-- TRIGGER — auto-create a profile row whenever a new auth.users row appears.
-- Reads display_name + preferred_locale from the raw_user_meta_data payload
-- the SignUp page sends, falling back to the local-part of the email.
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
begin
  v_display_name := coalesce(
    nullif(btrim(coalesce(new.raw_user_meta_data->>'display_name', '')), ''),
    split_part(coalesce(new.email, ''), '@', 1)
  );
  v_locale := coalesce(
    new.raw_user_meta_data->>'preferred_locale',
    'ar'
  );

  insert into public.profiles (auth_user_id, display_name, preferred_locale)
  values (new.id, v_display_name, v_locale)
  on conflict (auth_user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- ---------------------------------------------------------------------------
-- INDEXES — keep the widget queries cheap.
-- ---------------------------------------------------------------------------
create index if not exists idx_profiles_auth_user_id
  on public.profiles(auth_user_id);

create index if not exists idx_reader_progress_profile_updated
  on public.reader_progress(profile_id, updated_at desc);

create index if not exists idx_saved_stories_profile
  on public.saved_stories(profile_id);

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY — locked down; the only access path is via auth.uid().
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.reader_progress enable row level security;
alter table public.saved_stories enable row level security;

drop policy if exists "profile_select_own" on public.profiles;
create policy "profile_select_own" on public.profiles
  for select using (auth_user_id = auth.uid());

drop policy if exists "profile_update_own" on public.profiles;
create policy "profile_update_own" on public.profiles
  for update
  using (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());

drop policy if exists "reader_progress_own" on public.reader_progress;
create policy "reader_progress_own" on public.reader_progress
  for all using (
    profile_id in (select id from public.profiles where auth_user_id = auth.uid())
  )
  with check (
    profile_id in (select id from public.profiles where auth_user_id = auth.uid())
  );

drop policy if exists "saved_stories_own" on public.saved_stories;
create policy "saved_stories_own" on public.saved_stories
  for all using (
    profile_id in (select id from public.profiles where auth_user_id = auth.uid())
  )
  with check (
    profile_id in (select id from public.profiles where auth_user_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- updated_at — keep profiles.updated_at fresh on every profile edit.
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();
