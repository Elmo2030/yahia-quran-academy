#!/usr/bin/env python3
"""
Repoint every timing_url in recitation_manifest.json from the old
third-party host to our own R2 bucket.

The timing files were rescued into assets/data/timing/ and uploaded to R2
under the same layout. This rewrites the manifest to match, so the app stops
depending on hosting we do not control.

Idempotent: running it twice changes nothing the second time.

    python3 tools/repoint_manifest_to_r2.py --check   # report only
    python3 tools/repoint_manifest_to_r2.py           # rewrite
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets" / "data" / "recitation_manifest.json"
TIMING_DIR = ROOT / "assets" / "data" / "timing"

OLD_HOST = "quranread-maphrvqk.manus.space"
R2_BASE = "https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev"


def local_dir_for(basename: str) -> str | None:
    """Which timing/<dir>/ holds this file."""
    for sub in TIMING_DIR.iterdir():
        if sub.is_dir() and (sub / basename).exists():
            return sub.name
    return None


def rewrite(url: str) -> tuple[str, bool]:
    if OLD_HOST not in url:
        return url, False
    basename = url.rsplit("/", 1)[-1]
    sub = local_dir_for(basename)
    if sub is None:
        raise SystemExit(
            f"No local copy of {basename}. Rescue it before repointing —\n"
            f"rewriting the manifest to a file we do not have would break the app."
        )
    return f"{R2_BASE}/timing/{sub}/{basename}", True


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="report without writing")
    args = ap.parse_args()

    raw = MANIFEST.read_text(encoding="utf-8")
    urls = set(re.findall(rf"https://{re.escape(OLD_HOST)}/[^\"\\ ]+", raw))

    if not urls:
        print("Nothing to do — no references to the old host remain.")
        return

    changed = 0
    for old in sorted(urls):
        new, did = rewrite(old)
        if did:
            raw = raw.replace(old, new)
            changed += 1

    # The result must still be valid JSON and must not mention the old host.
    parsed = json.loads(raw)
    assert OLD_HOST not in raw, "old host still present after rewrite"

    print(f"  URLs repointed : {changed}")
    print(f"  now pointing at: {R2_BASE}/timing/...")

    if args.check:
        print("\n  --check: nothing written.")
        return

    MANIFEST.write_text(raw, encoding="utf-8")
    print(f"\n  wrote {MANIFEST.relative_to(ROOT)}")
    print(f"  recitations intact: {len(parsed['recitations'])}")


if __name__ == "__main__":
    main()
