-- =============================================================================
-- 008 — deleting an account also deletes the children who belong to it
--
-- delete_own_account (005) removes the auth user, which cascades to the
-- parent's profile and that profile's rows. Child profiles are separate rows
-- whose parent_id is ON DELETE SET NULL (init_schema.sql), so they survived:
-- each child's name and memorization history stayed in the database with no
-- parent, although the site tells parents deletion erases everything.
--
-- The children are removed first (their own rows cascade from them), then the
-- auth user. Still identified only by auth.uid(), never by an argument.
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
  delete from public.profiles
   where parent_id in (select id from public.profiles where auth_user_id = caller);
  delete from auth.users where id = caller;
end;
$$;

revoke execute on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
