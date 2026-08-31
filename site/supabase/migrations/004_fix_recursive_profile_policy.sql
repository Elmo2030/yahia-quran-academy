-- =============================================================================
-- 004 — break the recursion in the profiles read policy
--
-- The live policy `profiles_read_policy` was:
--
--   auth_user_id = auth.uid()
--   OR parent_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
--
-- The subquery reads `profiles`, which applies the same SELECT policy, which
-- runs the subquery again. Postgres stops it with 42P17 "infinite recursion
-- detected in policy for relation profiles", as HTTP 500.
--
-- It took the other tables down with it: reader_progress, saved_stories,
-- memorization_logs and practice_sessions all resolve ownership with a
-- subquery over `profiles`, so every read and write on them returned 500 too.
-- The whole account feature was dead at the data layer.
--
-- The fix is the standard one: resolve "which profiles may I touch" in a
-- SECURITY DEFINER function, which is not subject to RLS, so a policy never
-- re-enters the table it protects. The functions filter on auth.uid()
-- themselves, so they expose nothing the caller could not already see.
--
-- Note this policy was never in a migration — it was created directly against
-- the database, so the repo did not describe what production was running.
-- =============================================================================

-- PostgREST serves `public`, so the helpers live somewhere it does not. RLS
-- expressions run as the querying role, which keeps USAGE here.
create schema if not exists private;
grant usage on schema private to anon, authenticated, service_role;

-- The profiles this caller owns (their own account rows).
create or replace function private.own_profile_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.id from public.profiles p where p.auth_user_id = (select auth.uid())
$$;

-- Those, plus any child profiles hanging off them.
create or replace function private.accessible_profile_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.id from public.profiles p where p.auth_user_id = (select auth.uid())
  union
  select c.id from public.profiles c
    join public.profiles p on c.parent_id = p.id
   where p.auth_user_id = (select auth.uid())
$$;

-- Profiles a parent owns, for the child-creation check.
create or replace function private.own_parent_profile_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.id from public.profiles p
   where p.auth_user_id = (select auth.uid()) and p.role = 'parent'
$$;

-- --- profiles ----------------------------------------------------------------

drop policy if exists "profiles_read_policy" on public.profiles;
create policy "profiles_read_policy" on public.profiles
  for select using (
    auth_user_id = (select auth.uid())
    or parent_id in (select private.own_profile_ids())
  );

drop policy if exists "parents_can_insert_dependent_child_profiles" on public.profiles;
create policy "parents_can_insert_dependent_child_profiles" on public.profiles
  for insert with check (
    role = 'child'
    and auth_user_id is null
    and parent_id in (select private.own_parent_profile_ids())
  );

-- --- everything that resolves ownership through profiles ----------------------

drop policy if exists "reader_progress_own" on public.reader_progress;
create policy "reader_progress_own" on public.reader_progress
  for all using (profile_id in (select private.own_profile_ids()))
  with check (profile_id in (select private.own_profile_ids()));

drop policy if exists "saved_stories_own" on public.saved_stories;
create policy "saved_stories_own" on public.saved_stories
  for all using (profile_id in (select private.own_profile_ids()))
  with check (profile_id in (select private.own_profile_ids()));

drop policy if exists "logs_owner_or_parent" on public.memorization_logs;
create policy "logs_owner_or_parent" on public.memorization_logs
  for all using (profile_id in (select private.accessible_profile_ids()))
  with check (profile_id in (select private.own_profile_ids()));

drop policy if exists "practice_sessions_select_owner_or_parent" on public.practice_sessions;
create policy "practice_sessions_select_owner_or_parent" on public.practice_sessions
  for select using (
    (select auth.uid()) is not null
    and profile_id in (select private.accessible_profile_ids())
  );

drop policy if exists "practice_sessions_insert_owner" on public.practice_sessions;
create policy "practice_sessions_insert_owner" on public.practice_sessions
  for insert with check (
    (select auth.uid()) is not null
    and profile_id in (select private.own_profile_ids())
  );

-- --- linter follow-ups --------------------------------------------------------

-- A mutable search_path on a SECURITY DEFINER-adjacent function lets a caller
-- shadow the objects it resolves.
alter function public.touch_updated_at() set search_path = public;

-- Trigger function; it has no business being reachable as an RPC. Revoking
-- from anon/authenticated alone would leave the PUBLIC grant in place.
revoke execute on function public.handle_new_auth_user() from public, anon, authenticated;

-- These two are deliberate RPCs and check ownership themselves, but only a
-- signed-in user has any reason to call them.
revoke execute on function public.record_reading(uuid, smallint, smallint, integer) from public, anon;
revoke execute on function public.get_progress_summary(uuid) from public, anon;
grant execute on function public.record_reading(uuid, smallint, smallint, integer) to authenticated;
grant execute on function public.get_progress_summary(uuid) to authenticated;
