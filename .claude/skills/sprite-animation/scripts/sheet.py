#!/usr/bin/env python3
"""Slice, repack and compare creature sprite sheets for the Bestiary Rig Viewer.

The viewer's sheets are 1024 px wide, transparent, and shelf-packed: parts are
sorted by height (tallest first) and laid out left to right in rows with a 2 px
gap. Each creature's ATLAS entry maps a part name to [x, y, w, h] on its sheet.

Commands
  detect  SRC                 find the parts on a raw sheet (e.g. one ChatGPT made)
                              and write a numbered preview plus a parts JSON to fill in
  pack    SRC PARTS OUT.webp  crop the named parts, shelf-pack them house-style,
                              write the sheet and print its ATLAS entry
                              (--base CREATURE: merge them into that creature's current sheet)
  diff    CREATURE NEW.json   compare a new ATLAS entry with the one in the viewer
                              and list the parts whose size changed (rig fits to redo)
  install CREATURE NEW.webp NEW.atlas.json
                              copy the sheet into the viewer and replace its ATLAS entry
  show    CREATURE            print the creature's current ATLAS entry

Requires Pillow and numpy.
"""
import argparse
import json
import re
import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

REPO = Path(__file__).resolve().parents[4]
VIEWER = REPO / 'tools' / 'bestiary-rig-viewer' / 'index.html'
SHEET_W, GAP = 1024, 2


def load_atlas():
    src = VIEWER.read_text()
    return json.loads(re.search(r'const ATLAS = (\{.*?\});\n', src).group(1))


def hex_rgb(s):
    s = s.lstrip('#')
    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))


def to_rgba(path, key, tol, fringe=2):
    """Open a sheet as RGBA; with --key, turn the solid backdrop colour transparent."""
    im = Image.open(path).convert('RGBA')
    if key:
        a = np.asarray(im).copy()
        d = np.abs(a[..., :3].astype(int) - np.array(hex_rgb(key))).max(axis=2)
        a[d <= tol, 3] = 0
        # anti-aliased edges were blended with the backdrop: peel off edge pixels still tinted by it
        for _ in range(fringe):
            clear = a[..., 3] == 0
            edge = np.zeros_like(clear)
            edge[1:] |= clear[:-1]; edge[:-1] |= clear[1:]
            edge[:, 1:] |= clear[:, :-1]; edge[:, :-1] |= clear[:, 1:]
            a[edge & ~clear & (d <= tol * 3), 3] = 0
        im = Image.fromarray(a)
    return im


def checker_warning(im):
    """A fake transparency checkerboard is opaque grey/white everywhere: warn about it."""
    a = np.asarray(im)
    if (a[..., 3] > 0).mean() > 0.97:
        print('warning: sheet is almost fully opaque. If the backdrop is a painted checkerboard '
              'or a solid colour, re-export with real transparency or pass --key <colour>.',
              file=sys.stderr)


def components(im, alpha_min, block, min_area):
    """Opaque blobs, found on a coarse grid so specks and thin gaps merge into one part."""
    a = np.asarray(im)[..., 3] > alpha_min
    h, w = a.shape
    gh, gw = -(-h // block), -(-w // block)
    pad = np.zeros((gh * block, gw * block), bool)
    pad[:h, :w] = a
    grid = pad.reshape(gh, block, gw, block).any(axis=(1, 3))
    seen = np.zeros_like(grid)
    boxes = []
    for y0, x0 in zip(*np.nonzero(grid)):
        if seen[y0, x0]:
            continue
        q, cells = deque([(y0, x0)]), []
        seen[y0, x0] = True
        while q:
            y, x = q.popleft()
            cells.append((y, x))
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < gh and 0 <= nx < gw and grid[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        q.append((ny, nx))
        ys, xs = zip(*cells)
        bx0, by0 = min(xs) * block, min(ys) * block
        bx1, by1 = min((max(xs) + 1) * block, w), min((max(ys) + 1) * block, h)
        sub = a[by0:by1, bx0:bx1]
        if sub.sum() < min_area:
            continue
        rows, cols = np.nonzero(sub.any(axis=1))[0], np.nonzero(sub.any(axis=0))[0]
        boxes.append([int(bx0 + cols[0]), int(by0 + rows[0]),
                      int(cols[-1] - cols[0] + 1), int(rows[-1] - rows[0] + 1)])
    boxes.sort(key=lambda b: (b[1] // 64, b[0]))
    return boxes


def cmd_detect(args):
    im = to_rgba(args.src, args.key, args.tol, args.fringe)
    checker_warning(im)
    boxes = components(im, args.alpha, args.block, args.min_area)
    prev = Image.new('RGBA', im.size, (40, 36, 44, 255))
    prev.alpha_composite(im)
    d = ImageDraw.Draw(prev)
    for i, (x, y, w, h) in enumerate(boxes):
        d.rectangle([x, y, x + w - 1, y + h - 1], outline=(255, 60, 200, 255), width=2)
        d.rectangle([x, y, x + 26, y + 14], fill=(255, 60, 200, 255))
        d.text((x + 3, y + 2), str(i), fill=(0, 0, 0, 255))
    out = Path(args.out or Path(args.src).with_suffix(''))
    prev.convert('RGB').save(f'{out}.preview.png')
    Path(f'{out}.parts.json').write_text(json.dumps({f'part{i}': b for i, b in enumerate(boxes)}, indent=1))
    print(f'{len(boxes)} parts -> {out}.preview.png, {out}.parts.json')
    print('Rename each "partN" key to its atlas name (match the old ATLAS names); delete junk entries.')


def shelf_pack(sizes):
    order = sorted(sizes, key=lambda n: -sizes[n][1])
    pos, x, y, row_h = {}, 0, 0, 0
    for n in order:
        w, h = sizes[n]
        if w > SHEET_W:
            sys.exit(f'part {n} is {w}px wide, wider than the {SHEET_W}px sheet; scale it down')
        if x and x + w > SHEET_W:
            x, y, row_h = 0, y + row_h + GAP, 0
        pos[n] = [x, y, w, h]
        x += w + GAP
        row_h = max(row_h, h)
    return pos, y + row_h


def cmd_pack(args):
    im = to_rgba(args.src, args.key, args.tol, args.fringe)
    parts = json.loads(Path(args.parts).read_text())
    crops = {}
    for name, box in parts.items():
        if isinstance(box[0], list):  # a part scattered over several blobs (sparks, confetti): take their union
            x0, y0 = min(b[0] for b in box), min(b[1] for b in box)
            box = [x0, y0, max(b[0] + b[2] for b in box) - x0, max(b[1] + b[3] for b in box) - y0]
        x, y, w, h = box
        c = im.crop((x, y, x + w, y + h))
        if args.scale != 1:
            c = c.resize((max(1, round(w * args.scale)), max(1, round(h * args.scale))), Image.LANCZOS)
        bb = None if args.no_trim else c.getbbox(alpha_only=True)
        if bb and bb[:2] != (0, 0):
            # the part's pixel origin moved, so pv / at / tip given in its pixels shift by this much
            print(f'  trimmed {name}: origin moved by ({bb[0]}, {bb[1]}); subtract it from pv / tip and '
                  "from children's at", file=sys.stderr)
        crops[name] = c.crop(bb) if bb else c
    if args.base:
        # revisions only: keep every part of the creature's current sheet that the new art doesn't replace
        old = load_atlas()[args.base]
        base = Image.open(VIEWER.parent / f'{args.base}.webp').convert('RGBA')
        kept = {n: base.crop((x, y, x + w, y + h)) for n, (x, y, w, h) in old.items() if n not in crops}
        print(f'  kept {len(kept)} parts from {args.base}.webp, replaced or added {len(crops)}', file=sys.stderr)
        parts = {**{n: None for n in old}, **parts}  # old name order first, new parts at the end
        crops = {**kept, **crops}
    pos, height = shelf_pack({n: crops[n].size for n in parts})
    sheet = Image.new('RGBA', (SHEET_W, height), (0, 0, 0, 0))
    for n, (x, y, _, _) in pos.items():
        sheet.paste(crops[n], (x, y))
    sheet.save(args.out, lossless=True, method=6)
    entry = {n: pos[n] for n in parts}  # keep the caller's name order
    Path(Path(args.out).with_suffix('.atlas.json')).write_text(json.dumps(entry))
    print(f'{args.out}: {SHEET_W}x{height}, {len(pos)} parts')
    print(json.dumps(entry, separators=(',', ':')))


def cmd_diff(args):
    old = load_atlas().get(args.creature)
    if old is None:
        sys.exit(f'no ATLAS entry named {args.creature}')
    new = json.loads(Path(args.new).read_text())
    for n in sorted(set(old) | set(new)):
        if n not in new:
            print(f'  MISSING  {n}  (rig or clips still reference it?)')
        elif n not in old:
            print(f'  NEW      {n}  {new[n][2]}x{new[n][3]}')
        else:
            (ow, oh), (nw, nh) = old[n][2:], new[n][2:]
            if (ow, oh) == (nw, nh):
                continue
            if abs(nw - ow) <= 3 and abs(nh - oh) <= 3:  # edge trim / fringe noise
                print(f'  minor    {n}  {ow}x{oh} -> {nw}x{nh}')
            else:
                print(f'  RESIZED  {n}  {ow}x{oh} -> {nw}x{nh}  (x{nw / ow:.3f}, y{nh / oh:.3f}): '
                      're-fit pv / at / tip on this bone and at on its children')


def cmd_install(args):
    import shutil
    src = VIEWER.read_text()
    m = re.search(r'const ATLAS = (\{.*?\});\n', src)
    atlas = json.loads(m.group(1))
    atlas[args.creature] = json.loads(Path(args.atlas).read_text())
    VIEWER.write_text(src[:m.start(1)] + json.dumps(atlas, separators=(',', ':')) + src[m.end(1):])
    shutil.copyfile(args.sheet, VIEWER.parent / f'{args.creature}.webp')
    print(f'installed {args.creature}.webp and its ATLAS entry ({len(atlas[args.creature])} parts)')


def cmd_show(args):
    print(json.dumps(load_atlas()[args.creature], separators=(',', ':')))


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest='cmd', required=True)
    for name in ('detect', 'pack'):
        s = sub.add_parser(name)
        s.add_argument('--key', help='backdrop colour to key out, e.g. "#ff00ff"')
        s.add_argument('--tol', type=int, default=40, help='colour distance for --key (0-255)')
        s.add_argument('--fringe', type=int, default=2, help='px of backdrop-tinted edge to peel off with --key')
    d = sub.choices['detect']
    d.add_argument('src')
    d.add_argument('--out', help='output prefix (default: next to SRC)')
    d.add_argument('--alpha', type=int, default=16, help='alpha above this counts as opaque')
    d.add_argument('--block', type=int, default=6, help='merge distance in px; raise if parts split')
    d.add_argument('--min-area', type=int, default=150, help='drop blobs with fewer opaque px')
    d.set_defaults(fn=cmd_detect)
    k = sub.choices['pack']
    k.add_argument('src')
    k.add_argument('parts', help='JSON {name: [x, y, w, h] or a list of such boxes} on SRC (from detect, renamed)')
    k.add_argument('out')
    k.add_argument('--scale', type=float, default=1, help='resize every part, e.g. to match the old sheet')
    k.add_argument('--base', metavar='CREATURE', help="merge into the creature's current sheet: "
                   'parts in PARTS replace or add to it, the rest are kept as they are')
    k.add_argument('--no-trim', action='store_true', help='keep boxes as given (repacking an existing sheet)')
    k.set_defaults(fn=cmd_pack)
    f = sub.add_parser('diff')
    f.add_argument('creature')
    f.add_argument('new', help='the .atlas.json written by pack')
    f.set_defaults(fn=cmd_diff)
    i = sub.add_parser('install')
    i.add_argument('creature')
    i.add_argument('sheet', help='the .webp written by pack')
    i.add_argument('atlas', help='the .atlas.json written by pack')
    i.set_defaults(fn=cmd_install)
    s = sub.add_parser('show')
    s.add_argument('creature')
    s.set_defaults(fn=cmd_show)
    args = p.parse_args()
    args.fn(args)


if __name__ == '__main__':
    main()
