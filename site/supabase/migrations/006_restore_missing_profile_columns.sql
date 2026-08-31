-- =============================================================================
-- 006 — restore the profile columns the live table had lost
--
-- Sign-up was returning 500 "Database error saving new user" for everyone. The
-- handle_new_auth_user trigger, which runs inside the auth.users insert, writes
-- display_name, preferred_locale and auth_provider — and preferred_locale did
-- not exist on the table, so the trigger raised and took the whole insert with
-- it. Nobody could create an account.
--
-- updated_at was missing for the same reason: profiles_touch_updated_at sets
-- it on every update, so saving a display name or a language would have failed
-- the moment sign-up was fixed.
--
-- 001_auth_foundation.sql defines both. The live table had drifted away from
-- the migrations — it also carries role, parent_id, last_active_day and
-- streak_days, which no migration in this repo creates. This adds back only
-- what the application reads and the triggers write; the extra columns are
-- left alone.
-- =============================================================================

alter table public.profiles
  add column if not exists preferred_locale text not null default 'ar';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass and conname = 'profiles_preferred_locale_check'
  ) then
    alter table public.profiles
      add constraint profiles_preferred_locale_check check (preferred_locale in ('ar','en'));
  end if;
end $$;

alter table public.profiles
  add column if not exists updated_at timestamptz not null default now();

-- `role` is NOT NULL with no default, and handle_new_auth_user does not set it,
-- so the trigger failed on the next constraint even once preferred_locale was
-- back. Whoever signs up on the website is the adult doing it; a child profile
-- is created afterwards by a parent, through the policy that already exists for
-- exactly that. Defaulting to 'parent' lets the trigger insert.
alter table public.profiles
  alter column role set default 'parent';
