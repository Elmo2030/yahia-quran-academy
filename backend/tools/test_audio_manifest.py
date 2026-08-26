#!/usr/bin/env python3
"""Fail-closed checks for the metadata-only Quran audio manifest."""

from __future__ import annotations

import json
from pathlib import Path

MANIFEST_PATH = Path(__file__).resolve().parents[1] / "data" / "audio_manifest.json"
FOLDER_URL = "https://drive.google.com/drive/folders/16qQulScaUDZT0jrc6Gw2uLmSVEJ9Q32E?usp=drive_link"


def expected_source_file(surah: int) -> str:
    if surah == 1:
        return "001.m4a"
    if surah == 2:
        return "Audio002 - Al-Baqara.mp3"
    if surah == 108:
        return "108-Al-Kauther.mp3"
    return f"Audio{surah:03d}.mp3"


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    assert manifest["schema_version"] == 1
    assert manifest["coverage"] == {
        "expected_surahs": 114,
        "listed_surahs": 114,
        "whole_surah_playback_verified": 1,
        "timing_status": "unavailable",
    }
    assert manifest["delivery"] == {
        "provider": "Cloudflare R2",
        "public_base_url": "https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev",
        "write_access": "restricted_server_or_operator_only",
    }

    surahs = manifest["surahs"]
    assert set(surahs) == {str(number) for number in range(1, 115)}
    for number in range(1, 115):
        item = surahs[str(number)]
        assert item["surah"] == number
        assert item["source_file"] == expected_source_file(number)
        assert item["source_folder"] == FOLDER_URL
        assert item["timing_status"] == "unavailable"
        assert item["word_timestamps"] is None
        if number == 1:
            assert item["availability"] == "migrated"
            assert item["r2_object_key"] == "surahs/001.m4a"
            assert item["content_type"] == "audio/mp4"
            assert item["playback_url"] == (
                "https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev/surahs/001.m4a"
            )
            assert item["sha256"] == "75bc1954341dadff60b35be00732a6eab85c074beeaeca2e3165f1c2164b743e"
            assert item["playback_verification"]["http_status"] == 206
            assert item["playback_verification"]["checksum_matches_source"] is True
        else:
            assert item["availability"] == "listed"
            assert "playback_url" not in item

    assert surahs["1"]["sample_inspection"]["status"] == "passed"
    assert surahs["1"]["sample_inspection"]["duration_seconds"] > 0
    assert surahs["2"]["sample_inspection"]["status"] == "listed_only"
    assert surahs["108"]["sample_inspection"]["status"] == "passed"
    assert surahs["108"]["sample_inspection"]["duration_seconds"] > 0
    print(json.dumps({"status": "passed", "surahs": 114, "playable_samples": [1], "timings": "unavailable"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
