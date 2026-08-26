# Cloudflare R2 audio contract

## Purpose

Cloudflare R2 is the production object store for Quran recitation files. Git
never contains audio binaries, R2 credentials never reach Flutter, and the
existing `audio_manifest.json` remains metadata-only until a file has passed
intake and playback verification.

## Bucket and object layout

The configured bucket is `yehia-quran-audio`. It has private write access and
public playback through its managed R2 subdomain:
`https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev`. A custom domain can
replace this public base later without changing object keys or upload
credentials.

| Object key | Meaning | Example |
| --- | --- | --- |
| `surahs/001.m4a` | Original/approved whole-surah playback object | Al-Fatihah |
| `surahs/002.mp3` | Original or approved operational version | Al-Baqarah |
| `intake/manifest-v1.json` | Immutable intake metadata, never used by Flutter directly | File names, byte size, SHA-256 |

Use zero-padded three-digit surah numbers. Do not create timing or word-level
objects until timing data has a documented source and validation.

## Access model

Flutter receives only a public HTTPS playback URL for a verified object. It
does not receive an R2 access key, secret, account ID with write permissions,
or a general upload URL.

The backend or an operator-only intake tool holds the R2 S3-compatible
credentials. The backend helper restricts an upload to the canonical
`surahs/001` through `surahs/114` path range, binds an approved audio content
type and SHA-256 metadata, and creates a presigned `PUT` URL lasting at most
15 minutes. It exposes no upload route; a future route must first enforce
operator authentication. No anonymous upload policy is permitted.

## Current infrastructure status

| Item | Status |
| --- | --- |
| R2 bucket | Created as `yehia-quran-audio` in ENAM using Standard storage |
| Public playback base | `https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev` |
| CORS | `GET` and `HEAD` only; no browser write methods are allowed |
| Browser dashboard session | تعذر تسجيل الدخول في المتصفح؛ لم يُستخدم المتصفح للرفع |
| Uploaded audio objects | `surahs/001.m4a` فقط؛ الحجم `526,243` بايت وبصمة SHA-256 مطابقة للمصدر |

## Verified playback sample

The first approved object is `surahs/001.m4a`. Its public HTTPS URL returned
`206 Partial Content` to a `bytes=0-1023` request, declared
`Content-Type: audio/mp4`, and returned the same SHA-256 as the approved local
intake sample: `75bc1954341dadff60b35be00732a6eab85c074beeaeca2e3165f1c2164b743e`.
This verifies whole-surah byte-range playback only; it does not provide ayah
or word timing data.

## Required server environment

| Variable | Purpose |
| --- | --- |
| `R2_ACCOUNT_ID` | Cloudflare account ID for the S3 endpoint |
| `R2_ACCESS_KEY_ID` | Restricted R2 API token access key ID |
| `R2_SECRET_ACCESS_KEY` | Matching restricted R2 API token secret |
| `R2_BUCKET` | Audio bucket name |
| `R2_PUBLIC_BASE_URL` | HTTPS custom-domain base for public playback, without a trailing slash |

The R2 API token must be scoped to this single bucket. It needs object write,
read, list, and delete only for the server-side intake process; it must not be
embedded in the mobile/web app.

## Intake gate

Before production upload, produce an inventory containing original file name,
surah number, MIME type, byte size, SHA-256, and intended R2 key. Download and
inspect only approved samples first: 001, 002, and 108 when its source file ID
is confirmed. The full library requires an explicit user go-ahead after the
inventory and total size are shown.

For each uploaded sample, verify HTTP `200`, `Content-Type`, byte-range
playback, checksum, and actual playback in the app before writing a
`playback_url` into `audio_manifest.json`.

## Flutter behavior

The app may play an available whole-surah URL. It must continue to show
whole-surah-only availability when no verified ayah timing asset exists; it
must not infer timings from duration or a filename.
