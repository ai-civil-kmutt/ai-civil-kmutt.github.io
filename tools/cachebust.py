#!/usr/bin/env python3
"""Stamp CSS and JS links in index.html with a hash of their contents.

GitHub Pages serves assets with cache-control: max-age=600, so a browser can
keep showing stale CSS or JS after a deploy. Appending a content hash changes
the URL whenever the file changes, and only then.

Run before committing whenever an asset changed:

    python3 tools/cachebust.py
"""
import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = ROOT / "index.html"
ASSETS = ["assets/css/styles.css", "assets/js/analytics.js",
          "assets/js/data.js", "assets/js/main.js",
          "assets/img/favicon.png", "assets/img/og.png"]

html = HTML.read_text()
changed = []

for rel in ASSETS:
    path = ROOT / rel
    if not path.exists():
        print(f"  skip (missing): {rel}")
        continue
    digest = hashlib.sha256(path.read_bytes()).hexdigest()[:8]
    # match the asset with or without an existing ?v=
    pattern = re.compile(re.escape(rel) + r'(?:\?v=[0-9a-f]+)?')
    new_html, n = pattern.subn(f"{rel}?v={digest}", html)
    if n == 0:
        print(f"  WARNING: {rel} is not referenced in index.html")
        continue
    if new_html != html:
        changed.append(f"{rel} -> {digest}")
    html = new_html

HTML.write_text(html)
if changed:
    print("  stamped:")
    for c in changed:
        print(f"    {c}")
else:
    print("  already current, nothing to stamp")
