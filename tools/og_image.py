#!/usr/bin/env python3
"""Draw assets/img/og.png, the link preview card for Facebook and X.

Without an og:image tag a scraper picks whatever image it finds first on
the page, which is why the preview showed a partner logo. This card gives
it one deliberate image instead.

The size is 1200x630, the ratio Facebook and X expect. Facebook also
crops the card to a centred square for small previews, such as the
thumbnail beside a comment. Everything here therefore sits inside the
centre 630 pixels so that crop still reads.

Run after changing the logo or the wording:

    python3 tools/og_image.py
"""
import pathlib

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
LOGO = ROOT / "assets/img/logo.png"
OUT = ROOT / "assets/img/og.png"

W, H = 1200, 630
SAFE = 600           # widest the centred square crop can show comfortably

WHITE = "#ffffff"
INK = "#10151f"
INK_3 = "#6b7688"
LINE = "#e2e6ec"
MAROON = "#761a1b"   # the mark's own colour
ACCENT = "#b74d0c"

SF = "/System/Library/Fonts/SFNS.ttf"


def sf(size, weight="Regular"):
    f = ImageFont.truetype(SF, size)
    f.set_variation_by_name(weight)
    return f


def width(draw, text, font):
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0]


def fitted(draw, text, weight, start, limit):
    """Largest size at or below `start` that keeps `text` inside `limit`."""
    size = start
    while size > 12:
        font = sf(size, weight)
        if width(draw, text, font) <= limit:
            return font
        size -= 2
    return sf(12, weight)


def centred(draw, y, text, font, fill):
    draw.text((W / 2, y), text, font=font, fill=fill, anchor="ma")


card = Image.new("RGB", (W, H), WHITE)
d = ImageDraw.Draw(card)

# a brand-coloured rule at the top, so the card is not a floating white box
d.rectangle([0, 0, W, 9], fill=MAROON)

# the mark, scaled from 203x120 and composited onto the white
mark = Image.open(LOGO).convert("RGBA")
mw = 320
mh = round(mark.height * mw / mark.width)
mark = mark.resize((mw, mh), Image.LANCZOS)
card.paste(mark, ((W - mw) // 2, 132), mark)

centred(d, 372, "AI Research Group", fitted(d, "AI Research Group", "Bold", 68, SAFE), INK)
centred(d, 462, "Civil Engineering  ·  KMUTT", sf(30, "Medium"), INK_3)

d.line([(W - 300) / 2, 552, (W + 300) / 2, 552], fill=LINE, width=1)
centred(d, 574, "ai-civil-kmutt.github.io", sf(24, "Semibold"), ACCENT)

card.save(OUT, optimize=True)
print(f"  wrote {OUT.relative_to(ROOT)}  {card.width}x{card.height}  "
      f"{OUT.stat().st_size // 1024} KB")
