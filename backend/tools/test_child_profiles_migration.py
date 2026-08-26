"""Static guardrails for dependent child profile storage and RLS."""

from pathlib import Path
import unittest


MIGRATION = (
    Path(__file__).resolve().parents[2]
    / "supabase"
    / "migrations"
    / "20260826165000_add_dependent_child_profiles.sql"
)


class DependentChildProfilesMigrationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.sql = MIGRATION.read_text(encoding="utf-8").lower()

    def test_child_auth_identity_is_optional_without_removing_uniqueness(self) -> None:
        self.assertIn("alter column auth_user_id drop not null", self.sql)
        self.assertNotIn("drop constraint profiles_auth_user_id_key", self.sql)

    def test_only_parent_can_insert_a_dependent_child(self) -> None:
        self.assertIn("parents_can_insert_dependent_child_profiles", self.sql)
        self.assertIn("for insert", self.sql)
        self.assertIn("to authenticated", self.sql)
        self.assertIn("role = 'child'", self.sql)
        self.assertIn("auth_user_id is null", self.sql)
        self.assertIn("role = 'parent'", self.sql)


if __name__ == "__main__":
    unittest.main()
