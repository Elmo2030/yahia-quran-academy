"""Server-side only Cloudflare R2 helpers for approved Quran audio intake.

This module deliberately exposes no HTTP route. Any future caller must apply
operator authentication before asking for a signed upload URL. Flutter only
receives verified public playback URLs from the audio manifest.
"""

from __future__ import annotations

import os
import re
from dataclasses import dataclass
from functools import lru_cache
from typing import Mapping
from urllib.parse import quote, urlparse

import boto3


ALLOWED_CONTENT_TYPES = frozenset(
    {
        "audio/mp4",
        "audio/mpeg",
        "audio/ogg",
        "audio/opus",
    }
)
_SURAH_KEY_PATTERN = re.compile(
    r"surahs/(?:00[1-9]|0[1-9][0-9]|1(?:0[0-9]|1[0-4]))\.(?:m4a|mp3|ogg|opus)"
)
_REQUIRED_ENVIRONMENT = (
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET",
    "R2_PUBLIC_BASE_URL",
)


class R2ConfigurationError(RuntimeError):
    """Raised when the server-side R2 deployment contract is incomplete."""


class R2AudioValidationError(ValueError):
    """Raised before a request can sign an unsafe audio upload."""


@dataclass(frozen=True)
class R2AudioSettings:
    account_id: str
    access_key_id: str
    secret_access_key: str
    bucket: str
    public_base_url: str


def load_r2_audio_settings(
    environment: Mapping[str, str] | None = None,
) -> R2AudioSettings:
    """Read and validate server-only R2 configuration without logging secrets."""

    values = environment if environment is not None else os.environ
    missing = [name for name in _REQUIRED_ENVIRONMENT if not values.get(name)]
    if missing:
        raise R2ConfigurationError(
            "Missing server-side R2 configuration: " + ", ".join(missing)
        )

    public_base_url = str(values["R2_PUBLIC_BASE_URL"]).rstrip("/")
    parsed = urlparse(public_base_url)
    if parsed.scheme != "https" or not parsed.netloc or parsed.query or parsed.fragment:
        raise R2ConfigurationError(
            "R2_PUBLIC_BASE_URL must be an HTTPS origin without a query or fragment"
        )

    return R2AudioSettings(
        account_id=str(values["R2_ACCOUNT_ID"]),
        access_key_id=str(values["R2_ACCESS_KEY_ID"]),
        secret_access_key=str(values["R2_SECRET_ACCESS_KEY"]),
        bucket=str(values["R2_BUCKET"]),
        public_base_url=public_base_url,
    )


def validate_surah_object_key(object_key: str) -> str:
    """Allow only canonical, whole-surah audio paths numbered 001 through 114."""

    if not _SURAH_KEY_PATTERN.fullmatch(object_key):
        raise R2AudioValidationError(
            "Object key must be a canonical whole-surah path such as surahs/001.m4a"
        )
    return object_key


def validate_audio_content_type(content_type: str) -> str:
    """Allow only audio formats that the intake contract recognizes."""

    normalized = content_type.strip().lower()
    if normalized not in ALLOWED_CONTENT_TYPES:
        raise R2AudioValidationError(
            "Unsupported audio content type; only approved audio MIME types are allowed"
        )
    return normalized


def public_playback_url(settings: R2AudioSettings, object_key: str) -> str:
    """Build a public playback URL only after the object key passes validation."""

    return f"{settings.public_base_url}/{quote(validate_surah_object_key(object_key))}"


@lru_cache(maxsize=1)
def _r2_client(settings: R2AudioSettings):
    """Create an S3-compatible client for Cloudflare R2 on the backend only."""

    return boto3.session.Session().client(
        "s3",
        endpoint_url=f"https://{settings.account_id}.r2.cloudflarestorage.com",
        region_name="auto",
        aws_access_key_id=settings.access_key_id,
        aws_secret_access_key=settings.secret_access_key,
    )


def create_presigned_upload_url(
    settings: R2AudioSettings,
    *,
    object_key: str,
    content_type: str,
    sha256_hex: str,
    expires_in_seconds: int = 900,
) -> str:
    """Create a short-lived, content-bound upload URL for an approved file.

    The caller is responsible for administrator authorization and for verifying
    the resulting object checksum before publishing its playback URL.
    """

    key = validate_surah_object_key(object_key)
    mime_type = validate_audio_content_type(content_type)
    if not re.fullmatch(r"[a-f0-9]{64}", sha256_hex.lower()):
        raise R2AudioValidationError("sha256_hex must be a lowercase 64-character SHA-256")
    if not 60 <= expires_in_seconds <= 900:
        raise R2AudioValidationError("Presigned upload URLs must expire between 60 and 900 seconds")

    return _r2_client(settings).generate_presigned_url(
        ClientMethod="put_object",
        Params={
            "Bucket": settings.bucket,
            "Key": key,
            "ContentType": mime_type,
            "Metadata": {"sha256": sha256_hex.lower()},
        },
        ExpiresIn=expires_in_seconds,
        HttpMethod="PUT",
    )
