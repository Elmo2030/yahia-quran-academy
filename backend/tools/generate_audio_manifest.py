#!/usr/bin/env python3
"""Generate the metadata-only manifest for the shared Quran audio library."""

from __future__ import annotations

import json
from pathlib import Path

DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/16qQulScaUDZT0jrc6Gw2uLmSVEJ9Q32E?usp=drive_link"
CHECKED_AT = "2026-08-26"


def source_file_for(surah: int) -> str:
    if surah == 1:
        return "001.m4a"
    if surah == 2:
        return "Audio002 - Al-Baqara.mp3"
    if surah == 108:
        return "108-Al-Kauther.mp3"
    return f"Audio{surah:03d}.mp3"


def sample_inspection(surah: int) -> dict[str, object] | None:
    if surah == 1:
        return {
            "status": "passed",
            "inspected_from": "user_upload",
            "codec": "aac",
            "container": "m4a",
            "sample_rate_hz": 11025,
            "channels": 2,
            "duration_seconds": 73.300045,
            "size_bytes": 526243,
        }
    if surah == 2:
        return {
            "status": "listed_only",
            "inspected_from": "public_drive_listing",
            "listed_size": "75.6 MB",
            "note": "Direct sample download was not available through the public folder UI during intake.",
        }
    if surah == 108:
        return {
            "status": "passed",
            "inspected_from": "user_upload",
            "codec": "mp3",
            "container": "mp3",
            "sample_rate_hz": 16000,
            "channels": 2,
            "duration_seconds": 39.416,
            "size_bytes": 158713,
        }
    return None


def build_manifest() -> dict[str, object]:
    surahs: dict[str, object] = {}
    for surah in range(1, 115):
        entry: dict[str, object] = {
            "surah": surah,
            "source_file": source_file_for(surah),
            "source_folder": DRIVE_FOLDER_URL,
            "availability": "listed",
            "timing_status": "unavailable",
            "word_timestamps": None,
        }
        inspection = sample_inspection(surah)
        if inspection is not None:
            entry["sample_inspection"] = inspection
        surahs[str(surah)] = entry

    return {
        "schema_version": 1,
        "reciter": "Al-Husaree Almoalim",
        "source": {
            "provider": "Google Drive",
            "folder_url": DRIVE_FOLDER_URL,
            "checked_at": CHECKED_AT,
            "notes": [
                "Audio binaries are intentionally excluded from Git.",
                "The app must use a migrated storage/CDN URL before production playback.",
                "No ayah or word timestamp JSON files were present in the shared folder during intake.",
            ],
        },
        "coverage": {
            "expected_surahs": 114,
            "listed_surahs": 114,
            "timing_status": "unavailable",
        },
        "surahs": surahs,
    }


def main() -> None:
    output = Path(__file__).resolve().parents[1] / "data" / "audio_manifest.json"
    output.write_text(
        json.dumps(build_manifest(), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps({"status": "passed", "surahs": 114, "timings": "unavailable"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
