-- =============================================================================
-- 007 — a person may edit their name and language, and nothing else
--
-- profile_update_own (001) checks which row is being updated but not which
-- columns, and table-level UPDATE was granted to authenticated. Any signed-in
-- person could therefore call the API directly and set their own role,
-- streak_days, or parent_id — the last one attaching themselves as a "child"
-- inside another family's parent view.
--
-- The site only ever edits display_name and preferred_locale
-- (AuthContext.updateProfile). role and parent_id are set when a profile is
-- created (trigger / child insert policy), streak_days and last_active_day by
-- record_reading(), which is SECURITY DEFINER and unaffected by these grants.
--
-- Rollback: grant update on public.profiles to authenticated;
-- =============================================================================

revoke update on public.profiles from anon, authenticated;
grant update (display_name, preferred_locale) on public.profiles to authenticated;
