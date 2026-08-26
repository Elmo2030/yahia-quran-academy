"""Static guardrails for hardening the auth.users profile trigger."""

from pathlib import Path
import unittest


MIGRATION = (
    Path(__file__).resolve().parents[2]
    / "supabase"
    / "migrations"
    / "20260826163000_secure_handle_new_user.sql"
)


class HandleNewUserSecurityMigrationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.sql = MIGRATION.read_text(encoding="utf-8").lower()

    def test_preserves_profile_creation_with_a_fixed_search_path(self) -> None:
        self.assertIn("create or replace function public.handle_new_user()", self.sql)
        self.assertIn("security definer", self.sql)
        self.assertIn("set search_path = ''", self.sql)
        self.assertIn("insert into public.profiles", self.sql)
        self.assertIn("new.id", self.sql)

    def test_only_supabase_auth_admin_can_execute_the_trigger_function(self) -> None:
        self.assertIn(
            "revoke all on function public.handle_new_user() from public", self.sql
        )
        self.assertIn(
            "revoke all on function public.handle_new_user() from anon, authenticated",
            self.sql,
        )
        self.assertIn("grant usage on schema public to supabase_auth_admin", self.sql)
        self.assertIn(
            "grant execute on function public.handle_new_user() to supabase_auth_admin",
            self.sql,
        )


if __name__ == "__main__":
    unittest.main()
