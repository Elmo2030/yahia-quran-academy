#!/usr/bin/env python3
"""Fail-closed checks for the backend-only Cloudflare R2 audio contract."""

from __future__ import annotations

import sys
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.services.r2_audio import (
    R2AudioSettings,
    R2AudioValidationError,
    public_playback_url,
    validate_audio_content_type,
    validate_surah_object_key,
)


def must_reject_key(key: str) -> None:
    try:
        validate_surah_object_key(key)
    except R2AudioValidationError:
        return
    raise AssertionError(f"Unsafe object key was accepted: {key}")


def main() -> None:
    assert validate_surah_object_key("surahs/001.m4a") == "surahs/001.m4a"
    assert validate_surah_object_key("surahs/114.mp3") == "surahs/114.mp3"
    for unsafe_key in (
        "surahs/000.mp3",
        "surahs/115.mp3",
        "surahs/001.json",
        "intake/001.mp3",
        "surahs/001.mp3/../../secret",
    ):
        must_reject_key(unsafe_key)

    assert validate_audio_content_type("audio/mpeg") == "audio/mpeg"
    try:
        validate_audio_content_type("application/octet-stream")
    except R2AudioValidationError:
        pass
    else:
        raise AssertionError("Generic binary uploads must be rejected")

    settings = R2AudioSettings(
        account_id="account-id",
        access_key_id="access-key",
        secret_access_key="secret",
        bucket="yehia-quran-audio",
        public_base_url="https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev",
    )
    assert public_playback_url(settings, "surahs/108.mp3") == (
        "https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev/surahs/108.mp3"
    )
    print("R2 audio contract checks passed")


if __name__ == "__main__":
    main()
