"""Static guardrails for the additive practice_sessions v2 migration."""

from pathlib import Path
import unittest


MIGRATION = (
    Path(__file__).resolve().parents[2]
    / "supabase"
    / "migrations"
    / "20260826161000_create_practice_sessions_v2.sql"
)


class PracticeSessionsMigrationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.sql = MIGRATION.read_text(encoding="utf-8").lower()

    def test_is_additive_and_has_core_session_columns(self) -> None:
        self.assertIn("create table public.practice_sessions", self.sql)
        self.assertNotIn("alter table public.memorization_logs", self.sql)
        for column in (
            "profile_id uuid not null",
            "session_id text not null",
            "practice_mode text not null",
            "verification_status text not null",
            "surah smallint not null",
            "ayah_start smallint not null",
            "ayah_end smallint not null",
            "attempt_count integer not null",
        ):
            with self.subTest(column=column):
                self.assertIn(column, self.sql)

    def test_rls_is_enabled_without_anon_write(self) -> None:
        self.assertIn("enable row level security", self.sql)
        self.assertIn("revoke all on table public.practice_sessions from anon", self.sql)
        self.assertIn("grant select, insert on table public.practice_sessions to authenticated", self.sql)
        self.assertIn("practice_sessions_select_owner_or_parent", self.sql)
        self.assertIn("practice_sessions_insert_owner", self.sql)
        self.assertNotIn("to public", self.sql)


if __name__ == "__main__":
    unittest.main()
