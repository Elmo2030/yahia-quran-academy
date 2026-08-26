-- A child profile is a dependent identity selected by its parent. It does not
-- require a separate auth.users row in this phase, so auth_user_id is nullable
-- for child rows while remaining unique when an auth identity is present.

ALTER TABLE public.profiles
  ALTER COLUMN auth_user_id DROP NOT NULL;

CREATE POLICY "parents_can_insert_dependent_child_profiles"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  role = 'child'
  AND auth_user_id IS NULL
  AND parent_id IN (
    SELECT id
    FROM public.profiles
    WHERE auth_user_id = (SELECT auth.uid())
      AND role = 'parent'
  )
);
