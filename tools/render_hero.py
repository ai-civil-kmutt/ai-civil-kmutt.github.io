#!/usr/bin/env python3
"""Render paired transparent hero illustrations for light and dark pages.

The artwork is deliberately constructed from geometry rather than embedded assets.
It is rendered at 3x size and downsampled to give the fine technical strokes clean,
anti-aliased edges.
"""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw


W, H = 1600, 1400
SCALE = 3
OUT_DIR = Path(__file__).resolve().parent

ORANGE = "#e2661a"
BLUE = "#1f5fbf"


def hex_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def col(value: str | tuple[int, int, int], alpha: int = 255):
    rgb = hex_rgb(value) if isinstance(value, str) else value
    return (*rgb, alpha)


def sp(point):
    return tuple(int(round(v * SCALE)) for v in point)


def spts(points):
    return [sp(p) for p in points]


def sw(width):
    return max(1, int(round(width * SCALE)))


class Art:
    def __init__(self, variant: str):
        self.variant = variant
        self.ink_hex = "#10151f" if variant == "light" else "#eef2f8"
        self.ink_rgb = hex_rgb(self.ink_hex)
        self.orange_rgb = hex_rgb(ORANGE)
        self.blue_rgb = hex_rgb(BLUE)
        self.im = Image.new("RGBA", (W * SCALE, H * SCALE), (0, 0, 0, 0))

    def layer(self):
        return Image.new("RGBA", self.im.size, (0, 0, 0, 0))

    def composite(self, layer):
        self.im = Image.alpha_composite(self.im, layer)

    def line(self, draw, points, fill, width=1.0, joint="curve"):
        draw.line(spts(points), fill=fill, width=sw(width), joint=joint)

    def polygon(self, draw, points, fill=None, outline=None, width=1.0):
        draw.polygon(spts(points), fill=fill)
        if outline:
            draw.line(spts(list(points) + [points[0]]), fill=outline, width=sw(width), joint="curve")

    def ellipse(self, draw, box, fill=None, outline=None, width=1.0):
        draw.ellipse(sp(box[:2]) + sp(box[2:]), fill=fill, outline=outline, width=sw(width))

    def rectangle(self, draw, box, fill=None, outline=None, width=1.0):
        draw.rectangle(sp(box[:2]) + sp(box[2:]), fill=fill, outline=outline, width=sw(width))

    def arc(self, draw, box, start, end, fill, width=1.0):
        draw.arc(sp(box[:2]) + sp(box[2:]), start=start, end=end, fill=fill, width=sw(width))

    def bezier(self, draw, p0, p1, p2, p3, fill, width=1.0, steps=80):
        pts = []
        for i in range(steps + 1):
            t = i / steps
            u = 1.0 - t
            pts.append(
                (
                    u**3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t**3 * p3[0],
                    u**3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t**3 * p3[1],
                )
            )
        self.line(draw, pts, fill, width)

    def dashed_line(self, draw, p0, p1, fill, width=1.0, dash=9, gap=7):
        dx, dy = p1[0] - p0[0], p1[1] - p0[1]
        length = math.hypot(dx, dy)
        if not length:
            return
        ux, uy = dx / length, dy / length
        cursor = 0.0
        while cursor < length:
            end = min(cursor + dash, length)
            self.line(
                draw,
                [(p0[0] + ux * cursor, p0[1] + uy * cursor), (p0[0] + ux * end, p0[1] + uy * end)],
                fill,
                width,
            )
            cursor += dash + gap

    def draw_ground(self):
        layer = self.layer()
        d = ImageDraw.Draw(layer)
        ink = self.ink_rgb

        # A clipped geological section: pale enough to preserve openness, strong
        # enough that the pile and tunnel visibly occupy real ground.
        top = [(72, 882), (220, 878), (360, 886), (520, 879), (690, 886), (835, 881), (1000, 889), (1160, 880), (1285, 886)]
        b1 = [(72, 972), (235, 955), (395, 974), (555, 952), (705, 966), (870, 950), (1035, 968), (1180, 947), (1285, 961)]
        b2 = [(72, 1085), (220, 1104), (380, 1077), (545, 1101), (710, 1082), (855, 1110), (1010, 1084), (1160, 1102), (1285, 1089)]
        bottom = [(1285, 1320), (72, 1320)]
        fill_a = 16 if self.variant == "light" else 19
        self.polygon(d, top + list(reversed(b1)), col(ORANGE, fill_a))
        self.polygon(d, b1 + list(reversed(b2)), col(BLUE, fill_a + 2))
        self.polygon(d, b2 + bottom, col(ink, 11 if self.variant == "light" else 14))

        # Ground and interfaces use differing weights to give the section hierarchy.
        self.line(d, top, col(ink, 190), 2.1)
        self.line(d, b1, col(self.orange_rgb, 105), 1.3)
        self.line(d, b2, col(self.blue_rgb, 105), 1.3)
        self.line(d, [(72, 882), (72, 1320), (1285, 1320), (1285, 886)], col(ink, 65), 0.9)

        # Sparse, deterministic geology drafting marks.
        rng = random.Random(17)
        for x in range(105, 1260, 44):
            y = 914 + 10 * math.sin(x / 93)
            self.line(d, [(x, y), (x + 18, y - 6)], col(self.orange_rgb, 80), 0.8)
        for x in range(98, 1260, 56):
            y = 1018 + 12 * math.sin(x / 71)
            self.line(d, [(x, y), (x + 21, y + 5)], col(self.blue_rgb, 72), 0.8)
        for _ in range(54):
            x = rng.uniform(92, 1265)
            y = rng.uniform(1125, 1295)
            r = rng.choice((1.1, 1.4, 1.8))
            self.ellipse(d, (x - r, y - r, x + r, y + r), fill=col(ink, 55))

        # Small datum/tick vocabulary, intentionally unlabelled.
        for x in range(100, 1270, 86):
            self.line(d, [(x, 882), (x + 10, 872)], col(ink, 90), 0.75)
        self.composite(layer)

    def draw_building(self):
        layer = self.layer()
        d = ImageDraw.Draw(layer)
        ink = self.ink_rgb

        # Restrained slab fills establish depth without creating a block.
        slab_ys = [812, 698, 584, 470, 356]
        for idx, y in enumerate(slab_ys):
            poly = [(190, y), (592, y), (635, y - 18), (235, y - 18)]
            self.polygon(d, poly, col(ink, 13 + idx * 2), col(ink, 150), 1.5)
            self.line(d, [(190, y + 9), (592, y + 9), (635, y - 9)], col(ink, 58), 0.8)

        # Main concrete/steel frame in a slight two-point perspective.
        columns = [214, 340, 466, 592]
        for x in columns:
            topx = x + 22
            self.line(d, [(x, 850), (topx, 338)], col(ink, 205), 3.0)
            self.line(d, [(x + 8, 850), (topx + 8, 338)], col(ink, 78), 0.9)
        self.line(d, [(235, 338), (635, 320)], col(ink, 190), 2.2)

        # Structural bays and X bracing unmistakably read as a construction frame.
        for floor in range(4):
            y0, y1 = slab_ys[floor], slab_ys[floor + 1]
            for bay in range(3):
                x0, x1 = columns[bay] + 4, columns[bay + 1] + 4
                self.line(d, [(x0, y0 - 8), (x1 + 18, y1 + 2)], col(ink, 88), 1.0)
                self.line(d, [(x1, y0 - 8), (x0 + 18, y1 + 2)], col(ink, 88), 1.0)

        # Concrete core and an unfinished top with protruding reinforcement.
        self.polygon(d, [(262, 812), (330, 809), (345, 462), (278, 466)], col(ink, 22), col(ink, 140), 1.2)
        for x in (290, 307, 324):
            self.line(d, [(x, 463), (x + 5, 421)], col(ink, 125), 1.0)
        for y in (431, 440, 449):
            self.line(d, [(287, y), (333, y - 2)], col(ink, 75), 0.8)

        # Footings at the section cut.
        for x in columns:
            self.polygon(d, [(x - 27, 883), (x + 34, 883), (x + 22, 850), (x - 13, 850)], col(ink, 24), col(ink, 130), 1.0)

        # A few orange construction-phase joints.
        for x, y in ((220, 698), (350, 584), (478, 470), (602, 698)):
            self.ellipse(d, (x - 5, y - 5, x + 5, y + 5), fill=col(ORANGE, 225), outline=col(ink, 150), width=sw(0.8))
        self.composite(layer)

    def draw_crane(self):
        layer = self.layer()
        d = ImageDraw.Draw(layer)
        ink = self.ink_rgb

        # Tower mast.
        self.line(d, [(657, 850), (672, 185)], col(ink, 215), 3.0)
        self.line(d, [(702, 850), (692, 185)], col(ink, 215), 3.0)
        for y in range(205, 840, 47):
            x_l = 671 - (y - 185) * 14 / 665
            x_r = 692 + (y - 185) * 10 / 665
            self.line(d, [(x_l, y), (x_r, y + 47)], col(ink, 118), 0.9)
            self.line(d, [(x_r, y), (x_l, y + 47)], col(ink, 118), 0.9)
            self.line(d, [(x_l, y), (x_r, y)], col(ink, 125), 1.0)

        # Slewing head, long jib and counter-jib.
        self.polygon(d, [(650, 190), (708, 190), (700, 174), (663, 174)], col(ORANGE, 155), col(ink, 180), 1.2)
        self.line(d, [(681, 174), (681, 120)], col(ink, 195), 2.0)
        self.line(d, [(681, 120), (1158, 193)], col(ink, 185), 2.1)
        self.line(d, [(690, 190), (1158, 193)], col(ink, 205), 3.0)
        self.line(d, [(681, 120), (1158, 193)], col(ink, 118), 0.9)
        self.line(d, [(681, 120), (388, 193)], col(ink, 170), 1.8)
        self.line(d, [(681, 190), (388, 193)], col(ink, 200), 2.6)
        for x in range(728, 1150, 48):
            top_y = 127 + (x - 728) * 66 / 422
            self.line(d, [(x, 191), (x, top_y)], col(ink, 100), 0.8)
            self.line(d, [(x, top_y), (min(x + 48, 1158), 192)], col(ink, 86), 0.8)
        for x in range(410, 665, 42):
            top_y = 188 - (x - 410) * 62 / 255
            self.line(d, [(x, 192), (x, top_y)], col(ink, 92), 0.8)
        self.polygon(d, [(395, 182), (442, 182), (452, 213), (392, 213)], col(ink, 35), col(ink, 150), 1.0)

        # Trolley, hoist line and hook/load block.
        self.rectangle(d, (1008, 184, 1035, 203), fill=col(ORANGE, 180), outline=col(ink, 150), width=1.0)
        self.line(d, [(1022, 202), (1022, 430)], col(ink, 145), 1.1)
        self.rectangle(d, (1009, 430, 1035, 449), fill=col(ink, 45), outline=col(ink, 150), width=1.0)
        self.arc(d, (1015, 442, 1034, 470), 20, 230, col(ink, 185), 1.6)
        self.composite(layer)

    def draw_bridge(self):
        layer = self.layer()
        d = ImageDraw.Draw(layer)
        ink = self.ink_rgb

        # Bridge deck overlaps building/ground and extends into the analytical side.
        deck = [(570, 704), (1328, 675), (1330, 715), (570, 746)]
        self.polygon(d, deck, col(ink, 20), col(ink, 190), 1.7)
        self.line(d, [(582, 717), (1320, 688)], col(BLUE, 150), 2.2)
        self.line(d, [(570, 746), (1330, 715)], col(ink, 88), 1.0)
        # Parapet and regular verticals.
        self.line(d, [(586, 682), (1315, 654)], col(ink, 125), 1.1)
        for x in range(610, 1310, 55):
            yy = 681 - (x - 610) * 28 / 700
            self.line(d, [(x, yy), (x, yy + 34)], col(ink, 105), 0.8)

        # Hammerhead piers, bearings and foundation caps.
        for cx in (755, 1085):
            deck_y = 718 - (cx - 570) * 31 / 760
            self.rectangle(d, (cx - 76, deck_y + 5, cx + 77, deck_y + 22), fill=col(ink, 28), outline=col(ink, 155), width=1.1)
            for bx in (cx - 46, cx + 46):
                self.rectangle(d, (bx - 10, deck_y - 3, bx + 10, deck_y + 7), fill=col(ORANGE, 145), outline=col(ink, 130), width=0.8)
            self.polygon(
                d,
                [(cx - 38, deck_y + 22), (cx + 38, deck_y + 22), (cx + 29, 882), (cx - 29, 882)],
                col(ink, 20),
                col(ink, 165),
                1.5,
            )
            self.rectangle(d, (cx - 65, 869, cx + 65, 892), fill=col(ink, 25), outline=col(ink, 145), width=1.0)

        # Cable-like monitoring line along the deck is blue, with discrete sensors.
        for x in (650, 820, 980, 1160, 1275):
            y = 715 - (x - 570) * 31 / 760
            self.ellipse(d, (x - 6, y - 6, x + 6, y + 6), fill=col(BLUE, 225), outline=col(ink, 150), width=sw(1.0))
            self.ellipse(d, (x - 2, y - 2, x + 2, y + 2), fill=col(self.ink_rgb, 230))
        self.composite(layer)

    def draw_pile_and_tunnel(self):
        layer = self.layer()
        d = ImageDraw.Draw(layer)
        ink = self.ink_rgb

        # Bored pile in section: concrete body, reinforcement cage, toe bulb.
        self.polygon(d, [(430, 877), (503, 877), (493, 1263), (441, 1263)], col(ink, 21), col(ink, 180), 1.6)
        self.ellipse(d, (439, 1245, 495, 1282), fill=col(ink, 20), outline=col(ink, 165), width=sw(1.3))
        for x in (446, 459, 474, 487):
            self.line(d, [(x, 892), (x - 2, 1258)], col(ORANGE, 135), 1.0)
        for y in range(914, 1250, 34):
            self.line(d, [(443, y), (490, y)], col(ink, 72), 0.75)
        self.rectangle(d, (399, 862, 529, 895), fill=col(ink, 28), outline=col(ink, 155), width=1.2)

        # Tunnel bore and segmented lining.
        cx, cy, r = 900, 1165, 124
        self.ellipse(d, (cx - r, cy - r, cx + r, cy + r), fill=col(self.blue_rgb, 12), outline=col(ink, 185), width=2.0)
        self.ellipse(d, (cx - r + 18, cy - r + 18, cx + r - 18, cy + r - 18), fill=(0, 0, 0, 0), outline=col(BLUE, 145), width=1.5)
        for a in range(0, 360, 30):
            aa = math.radians(a)
            p0 = (cx + (r - 18) * math.cos(aa), cy + (r - 18) * math.sin(aa))
            p1 = (cx + r * math.cos(aa), cy + r * math.sin(aa))
            self.line(d, [p0, p1], col(ink, 110), 0.9)
        # Invert slab, rails and a centerline make it a tunnel, not an abstract ring.
        self.arc(d, (cx - 86, cy - 86, cx + 86, cy + 86), 28, 152, col(ink, 130), 1.0)
        self.line(d, [(820, 1220), (980, 1220)], col(ink, 145), 1.4)
        self.line(d, [(848, 1206), (842, 1235)], col(ink, 120), 1.0)
        self.line(d, [(952, 1206), (958, 1235)], col(ink, 120), 1.0)
        self.dashed_line(d, (900, 1055), (900, 1272), col(ink, 52), 0.75, 7, 8)
        self.composite(layer)

    def draw_sensors_and_network(self):
        layer = self.layer()
        d = ImageDraw.Draw(layer)
        ink = self.ink_rgb

        # Sensor anchors are deliberately attached to real structural/geological points.
        sensors = [
            ((1155, 192), (845, 300), ORANGE),       # crane jib tip
            ((981, 699), (845, 390), BLUE),          # bridge deck
            ((469, 1090), (845, 480), ORANGE),       # pile reinforcement
            ((1166, 949), (845, 570), BLUE),         # soil interface
            ((985, 1125), (845, 660), ORANGE),       # tunnel lining
        ]
        for idx, (source, target, hue) in enumerate(sensors):
            rgb = hex_rgb(hue)
            sx, sy = source
            # Concentric sensing point/crosshair.
            self.ellipse(d, (sx - 9, sy - 9, sx + 9, sy + 9), fill=col(rgb, 34), outline=col(rgb, 205), width=1.4)
            self.ellipse(d, (sx - 3, sy - 3, sx + 3, sy + 3), fill=col(rgb, 235))
            self.line(d, [(sx - 14, sy), (sx - 8, sy)], col(rgb, 130), 0.8)
            self.line(d, [(sx + 8, sy), (sx + 14, sy)], col(rgb, 130), 0.8)
            self.line(d, [(sx, sy - 14), (sx, sy - 8)], col(rgb, 130), 0.8)
            self.line(d, [(sx, sy + 8), (sx, sy + 14)], col(rgb, 130), 0.8)
            # Curves converge left-to-right into the first network layer.
            if idx == 0:
                c1, c2 = (1070, 215), (945, 275)
            elif idx == 1:
                c1, c2 = (930, 650), (920, 438)
            elif idx == 2:
                c1, c2 = (610, 1045), (760, 650)
            elif idx == 3:
                c1, c2 = (1090, 860), (950, 650)
            else:
                c1, c2 = (1000, 970), (900, 780)
            self.bezier(d, source, c1, c2, target, col(rgb, 145), 1.35)
            # A faint parallel trace suggests multiplexed sensor signals.
            self.bezier(d, (sx + 4, sy + 3), (c1[0] + 8, c1[1]), (c2[0] + 8, c2[1]), (target[0] + 3, target[1] + 4), col(rgb, 38), 0.7)

        # Network nodes: irregular vertical layers feel analytical, not decorative.
        layers = [
            [(845, 300), (845, 390), (845, 480), (845, 570), (845, 660)],
            [(1015, 270), (1015, 350), (1015, 430), (1015, 510), (1015, 590), (1015, 670)],
            [(1190, 305), (1190, 405), (1190, 505), (1190, 605)],
            [(1370, 350), (1370, 470), (1370, 590)],
        ]
        # Weighted connections: selected strong paths use colour, other weights use ink opacity.
        for li in range(len(layers) - 1):
            left, right = layers[li], layers[li + 1]
            for i, p in enumerate(left):
                for j, q in enumerate(right):
                    delta = abs((i / max(1, len(left) - 1)) - (j / max(1, len(right) - 1)))
                    if delta > 0.52:
                        continue
                    weight = max(22, int(80 - delta * 92))
                    chosen = (li == 0 and (i + 1) % len(right) == j) or (li == 1 and i % len(right) == j)
                    if chosen:
                        hue = self.orange_rgb if (i + j + li) % 2 == 0 else self.blue_rgb
                        self.line(d, [p, q], col(hue, 110), 1.25)
                    else:
                        self.line(d, [p, q], col(ink, weight), 0.72 + weight / 170)

        # Nodes have a white-space core (transparent) and small activation accents.
        for li, nodes in enumerate(layers):
            for ni, (x, y) in enumerate(nodes):
                radius = 10 if li in (0, 3) else 8
                self.ellipse(d, (x - radius, y - radius, x + radius, y + radius), fill=col(ink, 15), outline=col(ink, 190), width=1.35)
                active = (ni + li) % 3 != 1
                if active:
                    hue = self.orange_rgb if (ni + li) % 2 == 0 else self.blue_rgb
                    self.ellipse(d, (x - 3.2, y - 3.2, x + 3.2, y + 3.2), fill=col(hue, 225))

        # Direction marks along two salient information paths.
        for x, y, hue in ((935, 320, ORANGE), (1105, 456, BLUE), (1280, 554, ORANGE)):
            self.polygon(d, [(x, y), (x - 10, y - 5), (x - 8, y + 6)], col(hue, 175))

        # Compact 5x5 attention / heat matrix, linked to the final layer.
        mx, my, cell, gap = 1288, 768, 25, 4
        values = [
            [0.12, 0.25, 0.82, 0.30, 0.08],
            [0.20, 0.68, 0.45, 0.14, 0.32],
            [0.78, 0.35, 0.22, 0.58, 0.15],
            [0.16, 0.40, 0.72, 0.26, 0.63],
            [0.08, 0.24, 0.38, 0.86, 0.28],
        ]
        self.bezier(d, (1370, 590), (1415, 650), (1410, 725), (1360, 758), col(ink, 90), 1.0)
        self.rectangle(d, (mx - 12, my - 12, mx + 5 * (cell + gap) + 7, my + 5 * (cell + gap) + 7), fill=col(ink, 8), outline=col(ink, 96), width=0.9)
        for row in range(5):
            for column in range(5):
                v = values[row][column]
                hue = self.orange_rgb if (row + column) % 2 == 0 else self.blue_rgb
                x0 = mx + column * (cell + gap)
                y0 = my + row * (cell + gap)
                self.rectangle(d, (x0, y0, x0 + cell, y0 + cell), fill=col(hue, int(22 + 172 * v)), outline=col(ink, 52), width=0.55)

        # Unlabelled row/column ticks reinforce the matrix as analytical notation.
        for i in range(5):
            p = mx + i * (cell + gap) + cell / 2
            q = my + i * (cell + gap) + cell / 2
            self.line(d, [(p, my - 17), (p, my - 10)], col(ink, 80), 0.7)
            self.line(d, [(mx - 17, q), (mx - 10, q)], col(ink, 80), 0.7)
        self.composite(layer)

    def draw_detail_overlays(self):
        layer = self.layer()
        d = ImageDraw.Draw(layer)
        ink = self.ink_rgb

        # A few technical callout leaders with blank terminal rings—no labels.
        callouts = [
            ((360, 532), (130, 440), ORANGE),
            ((755, 812), (610, 1000), BLUE),
            ((900, 1050), (1075, 1010), ORANGE),
        ]
        for p0, p1, hue in callouts:
            self.dashed_line(d, p0, p1, col(hue, 74), 0.8, 6, 8)
            self.ellipse(d, (p1[0] - 7, p1[1] - 7, p1[0] + 7, p1[1] + 7), fill=col(hue, 18), outline=col(hue, 105), width=0.9)

        # Fine crop-like corner marks balance the open upper-left and lower-right areas.
        self.line(d, [(98, 294), (98, 248), (144, 248)], col(ink, 48), 0.8)
        self.line(d, [(1470, 1020), (1470, 1066), (1424, 1066)], col(ink, 48), 0.8)
        self.composite(layer)

    def render(self):
        self.draw_ground()
        self.draw_building()
        self.draw_crane()
        self.draw_bridge()
        self.draw_pile_and_tunnel()
        self.draw_sensors_and_network()
        self.draw_detail_overlays()
        # LANCZOS downsampling is the final anti-aliasing stage.
        return self.im.resize((W, H), Image.Resampling.LANCZOS)


def main():
    for variant in ("light", "dark"):
        image = Art(variant).render()
        path = OUT_DIR / f"hero-{variant}.png"
        image.save(path, format="PNG", optimize=True, compress_level=9)
        print(path.name)


if __name__ == "__main__":
    main()
