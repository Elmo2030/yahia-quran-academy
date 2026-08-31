-- =============================================================================
-- 005 — let a signed-in person actually delete their account
--
-- The account page says "deleting your account permanently removes your data
-- and cannot be undone", the privacy page sends people there to do it, and the
-- button asked them to type DELETE to confirm. It then signed them out, logged
-- a console warning that the server side was never built, and sent them to the
-- home page. The account and every row belonging to it stayed.
--
-- supabase-js cannot delete a user from the client — that needs the service
-- role. Rather than deploy an Edge Function to hold that key, this is a
-- SECURITY DEFINER function that deletes only the caller's own row, identified
-- by auth.uid() and never by an argument, so it cannot be pointed at anyone
-- else. profiles.auth_user_id references auth.users ON DELETE CASCADE, and the
-- child tables cascade from profiles, so removing the auth user removes the
-- profile, the reading progress, the saved stories, the memorization logs and
-- the practice sessions with it.
-- =============================================================================

create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  caller uuid := (select auth.uid());
begin
  if caller is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;
  delete from auth.users where id = caller;
end;
$$;

revoke execute on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
