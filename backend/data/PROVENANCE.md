# Quran Text Provenance

## Source

This directory contains the Tanzil Quran Text, **Uthmani, Version 1.1**, downloaded from the official Tanzil download page on 2026-08-26:

- Download page: https://tanzil.net/download/
- Text license: https://tanzil.net/docs/text_license
- Updates: https://tanzil.net/updates/

The original downloaded source is preserved as `tanzil_uthmani.txt`. The generated application corpus is `quran_text.json`.

## Generation

Run from the repository root:

```bash
python3 backend/tools/generate_quran_text.py \
  --input backend/data/tanzil_uthmani.txt \
  --output backend/data/quran_text.json
```

The generator fails closed unless the source contains 6,236 ayahs, the expected surah counts, non-empty Arabic text, and the seven Al-Fatihah entries match the approved Tanzil Uthmani reference exactly.

## License and attribution

Tanzil states that the text is carefully produced, highly verified, and continuously monitored by specialists. Tanzil's terms permit verbatim use in an application when Tanzil is clearly indicated, a link to `tanzil.net` is provided, and this copyright notice is reproduced. The terms also state that changing the text is not allowed.

```text
Tanzil Quran Text
Copyright (C) 2007-2021 Tanzil Project
License: Creative Commons Attribution 3.0
```

The application must not normalize, rewrite, transliterate, or otherwise modify the stored source strings. Any comparison normalization belongs only to the evaluator and must never overwrite this corpus.
