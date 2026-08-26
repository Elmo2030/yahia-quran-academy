-- Harden the auth.users trigger function without changing its profile-creation
-- behavior. The function remains SECURITY DEFINER because it is invoked by the
-- Supabase Auth trigger, but it is no longer executable through public RPC.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (auth_user_id, role, display_name)
  VALUES (
    NEW.id,
    'parent',
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'New User')
  );
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon, authenticated;

-- Supabase Auth invokes the existing auth.users trigger under this role.
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin;
