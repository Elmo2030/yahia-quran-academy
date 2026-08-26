#!/usr/bin/env python3
"""Fail-closed checks for the metadata-only Quran audio manifest."""

from __future__ import annotations

import json
import re
from pathlib import Path

MANIFEST_PATH = Path(__file__).resolve().parents[1] / "data" / "audio_manifest.json"
FOLDER_URL = "https://drive.google.com/drive/folders/16qQulScaUDZT0jrc6Gw2uLmSVEJ9Q32E?usp=drive_link"


R2_BASE_URL = "https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev"


def expected_extension(surah: int) -> str:
    return "m4a" if surah == 1 else "mp3"


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    assert manifest["schema_version"] == 1
    assert manifest["coverage"] == {
        "expected_surahs": 114,
        "listed_surahs": 114,
        "whole_surah_playback_verified": 114,
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
        assert item["source_file"]
        assert item["source_folder"] == FOLDER_URL
        assert item["timing_status"] == "unavailable"
        assert item["word_timestamps"] is None
        extension = expected_extension(number)
        assert item["availability"] == "migrated"
        assert item["drive_id"]
        assert item["r2_object_key"] == f"surahs/{number:03d}.{extension}"
        assert item["playback_url"] == f"{R2_BASE_URL}/surahs/{number:03d}.{extension}"
        assert item["content_type"] == ("audio/mp4" if extension == "m4a" else "audio/mpeg")
        assert isinstance(item["size_bytes"], int) and item["size_bytes"] > 0
        assert re.fullmatch(r"[0-9a-f]{64}", item["sha256"])
        assert item["playback_verification"]["http_status"] == 206
        assert item["playback_verification"]["accept_ranges"] == "bytes"
        assert item["playback_verification"]["checksum_matches_source"] is True

    assert surahs["1"]["sample_inspection"]["status"] == "passed"
    assert surahs["1"]["sample_inspection"]["duration_seconds"] > 0
    assert surahs["108"]["sample_inspection"]["status"] == "passed"
    assert surahs["108"]["sample_inspection"]["duration_seconds"] > 0
    print(json.dumps({"status": "passed", "surahs": 114, "playable_surahs": 114, "timings": "unavailable"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
