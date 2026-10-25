#!/usr/bin/env python3
"""Generate, slice, install and embed the standard party art set.

Every playable character has the same two pieces of art (see ../SKILL.md):
  - a sprite sheet: 54 battle and field frames in a fixed 6 x 9 grid (FRAMES below), and
  - a portrait sheet: 12 state portraits in a fixed 4 x 3 grid (STATES below).
Both are drawn in ChatGPT from prompts this script fills in, then sliced here into
the house format so every character's art lines up the same way.

Commands
  refs      ID [--out DIR]          export the character's current portrait and battle
                                    sprite as PNGs to attach to the ChatGPT request
  prompt    ID sheet|portraits|both write the filled ChatGPT prompt(s) to
                                    docs/sprite-requests/ and print them
  sheet     SRC ID [--out DIR]      slice a ChatGPT sprite sheet into the house sheet
                                    (6 x 9 frames of 96 x 96 px) plus a labelled check image
  portraits SRC ID [--out DIR]      slice a ChatGPT portrait sheet into the house sheet
                                    (4 x 3 portraits of 256 x 256 px) plus a check image
  install   ID DIR                  copy ID.sheet.webp / ID.portraits.webp from DIR into
                                    tools/party-sprite-viewer/ and rebuild its manifest.js
  embed     ID                      write the installed art into index.html's ASSETS
                                    (p = normal portrait, s = idle sprite, ps = all states)
  manifest                          rebuild tools/party-sprite-viewer/manifest.js

Requires Pillow and numpy.
"""
import argparse
import base64
import datetime
import io
import json
import re
import shutil
import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[3]
GAME = REPO / 'index.html'
VIEWER = REPO / 'tools' / 'party-sprite-viewer'
REQUESTS = REPO / 'docs' / 'sprite-requests'
CAST = json.loads((HERE.parent / 'references' / 'cast.json').read_text())

sys.path.insert(0, str(REPO / '.claude' / 'skills' / 'sprite-animation' / 'scripts'))
from sheet import to_rgba, checker_warning  # noqa: E402  (same green-key and alpha checks as the bestiary)

# ---------- the standard ----------

# Sprite sheet: row-major, 6 per row. Battle frames face LEFT (party stands on the right, FF style);
# the last two rows are field frames (walk cycles and cutscene poses), as on an FFRK / FF6 sheet.
# Hit flash, Stone, Vanish and Mini are not drawn: the engine derives them from these frames.
SHEET_COLS, SHEET_ROWS = 6, 9
CELL = 96            # output frame size (square)
BASE = 88            # ground line in the output frame: feet rest on this row
BODY_H = 56          # idle1 standing height in output pixels (matches the old 55-61 px sprites)
FRAMES = [
    ('idle1', 'Idle: standing at rest, weapon lowered, facing left'),
    ('idle2', 'Idle: breathing in, shoulders slightly raised'),
    ('idle3', 'Idle: breathing out, shoulders slightly lowered'),
    ('ready1', 'Ready: weapon raised, weight forward, about to act'),
    ('ready2', 'Ready: same stance, small bob down'),
    ('defend', 'Defend: guarding, arms/weapon crossed in front, braced'),
    ('attack1', 'Attack: wind-up, weapon drawn back'),
    ('attack2', 'Attack: mid-swing, body lunging left'),
    ('attack3', 'Attack: follow-through, weapon fully extended to the left'),
    ('attackB1', 'Second attack: wind-up for a different strike (other hand or reverse swing)'),
    ('attackB2', 'Second attack: mid-strike'),
    ('attackB3', 'Second attack: follow-through'),
    ('advance1', 'Step forward: walking left, one foot forward'),
    ('advance2', 'Step forward: walking left, other foot forward'),
    ('chant1', 'Chant: casting stance, hands raised, eyes on the target'),
    ('chant2', 'Chant: same, hands slightly higher, a faint glow at the hands'),
    ('cast1', 'Cast: releasing the spell, arm thrust forward to the left'),
    ('cast2', 'Cast: recovery, arm lowering'),
    ('item1', 'Item: holding a small vial up'),
    ('item2', 'Item: tossing the vial forward to the left'),
    ('hurt1', 'Hit: recoiling backward to the right, head snapped back'),
    ('hurt2', 'Hit: stumbling, recovering balance'),
    ('lowhp1', 'Low HP: down on one knee, head bowed, weapon planted, breathing hard'),
    ('lowhp2', 'Low HP: same kneel, shoulders heaving up'),
    ('special1', None), ('special2', None), ('special3', None),
    ('limit1', None), ('limit2', None), ('limit3', None),
    ('victory1', 'Victory: turning toward the viewer, weapon lowering'),
    ('victory2', 'Victory: the character\'s victory pose'),
    ('victory3', 'Victory: same pose, small change (hair or cloth moves, a breath)'),
    ('zombie1', 'Zombie: standing slack, head lolling to one side, arms hanging, skin grey-green'),
    ('zombie2', 'Zombie: same slack stance, swaying the other way'),
    ('ko', 'KO: lying flat on the ground on their back, eyes closed, weapon dropped beside them'),
    ('sleep1', 'Asleep: sitting or kneeling slumped, head down, eyes closed'),
    ('sleep2', 'Asleep: same, head dipped slightly lower (a breath)'),
    ('paralyze', 'Paralyzed: frozen rigid mid-step, limbs stiff, back arched, straining'),
    ('confuse1', 'Confused: wobbling, head tilted, looking the wrong way (right, away from the enemy)'),
    ('confuse2', 'Confused: wobbling the other way, a hand at the temple'),
    ('berserk', 'Berserk: hunched forward, weapon gripped too hard, teeth bared, ready to charge'),
    ('walkD1', 'Field, facing the viewer (down): standing, weapon sheathed or at rest'),
    ('walkD2', 'Field, facing down: walking, left foot forward'),
    ('walkD3', 'Field, facing down: walking, right foot forward'),
    ('walkU1', 'Field, back to the viewer (up): standing'),
    ('walkU2', 'Field, facing up: walking, left foot forward'),
    ('walkU3', 'Field, facing up: walking, right foot forward'),
    ('walkS1', 'Field, side view facing left: standing'),
    ('walkS2', 'Field, facing left: walking, front foot forward'),
    ('walkS3', 'Field, facing left: walking, back foot forward'),
    ('shock', 'Cutscene, facing the viewer: startled, leaning back, arms raised a little'),
    ('downcast', 'Cutscene, facing the viewer: head bowed, arms hanging'),
    ('listen', 'Cutscene, facing the viewer: head tilted, one hand cupped to the ear, listening to something'),
]
assert len(FRAMES) == SHEET_COLS * SHEET_ROWS

# Animations over those frames: (frames, ms per frame, loop). The viewer plays these;
# the game will use the same names when the battle stage gets sprites.
ANIMS = {
    'idle':    (['idle1', 'idle2', 'idle3', 'idle2'], 240, True),
    'ready':   (['ready1', 'ready2'], 180, True),
    'defend':  (['defend'], 400, True),
    'advance': (['advance1', 'advance2'], 150, True),
    'attack':  (['ready1', 'attack1', 'attack2', 'attack3', 'attack3'], 90, False),
    'attackB': (['ready1', 'attackB1', 'attackB2', 'attackB3', 'attackB3'], 90, False),
    'chant':   (['chant1', 'chant2'], 220, True),
    'cast':    (['chant1', 'chant2', 'cast1', 'cast2', 'cast2'], 130, False),
    'item':    (['item1', 'item1', 'item2', 'item2'], 150, False),
    'hurt':    (['hurt1', 'hurt2', 'hurt2'], 110, False),
    'lowhp':   (['lowhp1', 'lowhp2'], 480, True),
    'special': (['special1', 'special2', 'special3', 'special3'], 140, False),
    'limit':   (['limit1', 'limit2', 'limit3', 'limit3', 'limit3'], 160, False),
    'victory': (['victory1', 'victory2', 'victory3', 'victory2'], 260, True),
    'zombie':  (['zombie1', 'zombie2'], 620, True),
    'ko':      (['ko'], 400, True),
    'sleep':   (['sleep1', 'sleep2'], 900, True),
    'paralyze': (['paralyze'], 400, True),
    'confuse': (['confuse1', 'confuse2'], 420, True),
    'berserk': (['berserk', 'ready1'], 200, True),
    'walkDown': (['walkD1', 'walkD2', 'walkD1', 'walkD3'], 170, True),
    'walkUp':  (['walkU1', 'walkU2', 'walkU1', 'walkU3'], 170, True),
    'walkSide': (['walkS1', 'walkS2', 'walkS1', 'walkS3'], 170, True),
    'shock':   (['shock'], 400, True),
    'downcast': (['downcast'], 400, True),
    'listen':  (['listen'], 400, True),
}

# Portrait sheet: row-major, 4 per row. Same head size and framing in every panel.
PORT_COLS, PORT_ROWS = 4, 3
PORT = 256           # master portrait size; the game embeds them at EMBED_PORT
EMBED_PORT = 154
STATES = [
    ('normal', 'Standard', 'their usual expression, composed. This is the portrait used most of the time'),
    ('hurt', 'Taking a hit', 'flinching from a blow, eyes squeezed or wide, head jerked aside, a fresh cut'),
    ('lowhp', 'Low HP (25% or less)', 'bloodied, sweat-soaked, exhausted, breathing through the mouth, still conscious and still fighting'),
    ('strained', 'High Stress (75+)', 'not yet broken but close: eyes slightly too wide, a fixed stare at something out of frame, a clenched jaw. One small detail is wrong'),
    ('ko', 'KO', 'unconscious: eyes closed or half open and unfocused, head fallen back or aside, drained of colour, lit from below'),
    ('berserk', 'Afflicted: Berserk', 'rage that has forgotten its reason: teeth bared, pupils pinpricks, veins standing out, red in the shadows, the expression locked on like a mask'),
    ('zombie', 'Afflicted: Zombie', 'undead pallor, grey-green skin, sunken eyes with milky irises, cracked lips, and calm, as if nothing is wrong'),
    ('paralyze', 'Afflicted: Paralyze', 'locked rigid, jaw clenched, the eyes straining to move while the face cannot, faint nerve-like lines across the skin'),
    ('confuse', 'Afflicted: Confuse', 'unfocused, the eyes pointing slightly different ways, a soft lost smile, small spirals in the irises'),
    ('slow', 'Afflicted: Slow', 'heavy-lidded and drooping as if under deep water, the face smeared into a long-exposure trail, hair drifting'),
    ('sleep', 'Asleep', 'eyes closed, face peaceful, head drooping. The calm itself should feel slightly wrong'),
    ('inspired', 'Inspired', 'passed a Stress Check and found resolve: a clear, steady, almost serene gaze, light catching the eyes. Still the same grim world, not heroic-bright'),
]
assert len(STATES) == PORT_COLS * PORT_ROWS


def char(cid):
    if cid not in CAST:
        sys.exit(f'unknown character "{cid}"; known: {", ".join(CAST)}')
    return CAST[cid]


# ---------- refs ----------

def load_assets():
    src = GAME.read_text()
    m = re.search(r'^const ASSETS=(\{.*?\});$', src, re.M)
    return src, m, json.loads(m.group(1))


def from_uri(uri):
    return Image.open(io.BytesIO(base64.b64decode(uri.split(',', 1)[1])))


def cmd_refs(args):
    char(args.id)
    a = load_assets()[2][args.id]
    out = Path(args.out); out.mkdir(parents=True, exist_ok=True)
    p = from_uri(a['p']).convert('RGB')
    p.save(out / f'{args.id}-portrait.png')
    s = from_uri(a['s']).convert('RGBA')
    s.resize((s.width * 6, s.height * 6), Image.NEAREST).save(out / f'{args.id}-sprite.png')
    print(f'{out}/{args.id}-portrait.png ({p.width}x{p.height}), {out}/{args.id}-sprite.png (6x)')


# ---------- prompts ----------

COMMON = """Hard requirements. A script cuts this image up by a fixed grid, so these matter:
- Exactly {cols} columns and {rows} rows of equal cells filling the whole image, in the order listed. Nothing outside the grid, no title, no extra cells.
- {bg}
- No text, labels, numbers, frame borders or guide lines anywhere{gutter}.
- Return it as a downloadable PNG, {size}."""


def twist(c, state):
    """The character's own horror for one state ('all' applies to every panel and is stated once)."""
    return c.get('twists', {}).get(state, '')


# Sprite frames that show a portrait state carry that state's character twist too,
# so the horror lands in the poses a player sees most when things go wrong.
FRAME_STATE = {'hurt1': 'hurt', 'lowhp1': 'lowhp', 'lowhp2': 'lowhp', 'zombie1': 'zombie', 'zombie2': 'zombie',
               'ko': 'ko', 'sleep1': 'sleep', 'sleep2': 'sleep', 'paralyze': 'paralyze',
               'confuse1': 'confuse', 'confuse2': 'confuse', 'berserk': 'berserk'}


def sheet_prompt(cid):
    c = char(cid)
    first = c['name'].split()[0]
    lines = []
    for i, (name, desc) in enumerate(FRAMES):
        if name.startswith('special'):
            desc = f'Class action, frame {name[-1]} of 3 (described above)'
        elif name.startswith('limit'):
            desc = f'Limit Break, frame {name[-1]} of 3 (described above)'
        t = twist(c, FRAME_STATE.get(name, ''))
        if t:
            desc += f'. For {first}: {t}'
        if i % SHEET_COLS == 0:
            lines.append(f'Row {i // SHEET_COLS + 1}:')
        lines.append(f'  {i % SHEET_COLS + 1}. {name}: {desc}')
    return f"""I'm attaching the current battle sprite and portrait of "{c['name']}" ({c['class']}), a party member in a dark gothic-horror JRPG in the style of Final Fantasy Record Keeper / Final Fantasy VI battle sprites. Please draw a full SPRITE SHEET for this character, as complete as an FFRK character sheet: battle poses, status poses, and field walking frames.

About the character: {c['look']}. {c['horror'][0].upper() + c['horror'][1:]}. Weapon: {c['weapon']}. Wherever a frame below mentions a weapon, draw it as this.
Class action (row 5, frames 1-3): {c['special']}.
Limit Break (row 5, frames 4-6): {c['limit']}.

Style: 16-bit SNES-era pixel art, chibi proportions (head about a third of the body height), crisp 1-pixel outlines in near-black ink, light from the top left. Match the attached sprite's costume, drawn at a higher frame quality. Keep it clean pixel art: no hatching, no sketch lines, no realistic proportions.

Palette: tie it to the attached ink-drawn portrait. Near-black outlines, muted sepia, bone and grey tones, about 20 colours in all, with {c['accent']} as the only saturated colour.

The horror is quiet. The character looks almost ordinary, even cute, except for one small wrong detail that stays in every frame, battle and field alike: {c['tell']}. Draw it plainly and consistently; never exaggerate it. Where a frame below gives a detail "For {first}", that detail is part of the frame and wins over the generic description if they differ.

Layout: a grid of {SHEET_COLS} columns x {SHEET_ROWS} rows = {len(FRAMES)} square frames. Every frame shows the same character at the same size. Battle frames (rows 1-7) face LEFT (the enemy is to the left); rows 8-9 are field frames facing the direction given. Each figure stands on the same invisible ground line about 15% above the bottom of its cell, horizontally centred in the cell. Keep the whole figure, weapon and effects inside its own cell with clear space around it. Small effects (sparks, glow, notes, petals) are fine if they stay inside the cell.

Frames, left to right, top to bottom:
{chr(10).join(lines)}

""" + COMMON.format(cols=SHEET_COLS, rows=SHEET_ROWS, gutter='',
                    bg='A single flat pure green background (#00FF00) with no gradient, shadow, texture or ground. Make sure that green appears nowhere on the character.',
                    size='1024 x 1536 (portrait orientation)')


def portrait_prompt(cid):
    c = char(cid)
    lines = []
    for i, (key, label, desc) in enumerate(STATES):
        if i % PORT_COLS == 0:
            lines.append(f'Row {i // PORT_COLS + 1}:')
        t = twist(c, key)
        lines.append(f'  {i % PORT_COLS + 1}. {label}: {desc}.' + (f' For {c["name"].split()[0]}: {t}.' if t else ''))
    return f"""I'm attaching the current portrait of "{c['name']}" ({c['class']}), a party member in a dark horror JRPG drawn in the style of Junji Ito's manga. Please draw a PORTRAIT SHEET: the same portrait in {len(STATES)} different states, laid out like a manga page.

About the character: {c['look']}. {c['horror'][0].upper() + c['horror'][1:]}.{(' In every panel: ' + c['twists']['all'] + '.') if 'all' in c.get('twists', {}) else ''}

Style: match the attached portrait exactly: Junji Ito-style ink linework, dense hatching, stark black and white with muted sepia and a little dark red. Restrained, precise horror: unsettling details drawn cleanly, never gory for its own sake.

Consistency is the most important thing. The game swaps between these portraits in place, so in EVERY panel: the same character, same costume, same head-and-shoulders crop as the attached portrait, the head the same size and in the same position, facing the same way. Only the expression, skin, lighting and small details change.

Panels, left to right, top to bottom:
{chr(10).join(lines)}

""" + COMMON.format(cols=PORT_COLS, rows=PORT_ROWS, gutter=' (the black gutters are the only lines between panels)',
                    bg='Each cell holds one SQUARE panel, centred, separated from its neighbours by thick solid black gutters like a manga page. The art fills the panel edge to edge.',
                    size='1536 x 1024 (landscape orientation)')


def cmd_prompt(args):
    char(args.id)
    date = args.date or datetime.date.today().isoformat()
    REQUESTS.mkdir(parents=True, exist_ok=True)
    kinds = ['sheet', 'portraits'] if args.kind == 'both' else [args.kind]
    for kind in kinds:
        body = sheet_prompt(args.id) if kind == 'sheet' else portrait_prompt(args.id)
        attach = (f'`{args.id}-sprite.png` and `{args.id}-portrait.png`' if kind == 'sheet' else f'`{args.id}-portrait.png`')
        path = REQUESTS / f'{args.id}-{kind}-{date}.md'
        path.write_text(f"""# {CAST[args.id]['name']}: {'battle sprite sheet' if kind == 'sheet' else 'portrait sheet'} request ({date})

Generated by `party_art.py prompt {args.id} {kind}`. Export the attachments with
`python3 .claude/skills/party-art/scripts/party_art.py refs {args.id} --out <dir>`, then paste the
prompt into ChatGPT with {attach} attached and download the result as a PNG.

````text
{body}
````
""")
        print(f'--- {path.relative_to(REPO)} ---\n{body}\n')


# ---------- slicing ----------

def grid_cells(im, cols, rows):
    cw, ch = im.width / cols, im.height / rows
    return [(round(c * cw), round(r * ch), round((c + 1) * cw), round((r + 1) * ch))
            for r in range(rows) for c in range(cols)], cw, ch


def bands(profile, n, noise=3):
    """Cut points for n cells along one axis: each even-grid line moves to the middle of the
    nearest empty gap (ChatGPT's grid drifts a few px), or stays put when no gap is near."""
    empty = np.asarray(profile) <= noise
    size = len(empty)
    cuts = [0]
    for k in range(1, n):
        b, reach = round(k * size / n), size // n // 3
        hit = next((p for d in range(reach) for p in (b - d, b + d) if 0 < p < size and empty[p]), None)
        if hit is None:
            cuts.append(b)
            continue
        lo, hi = hit, hit
        while lo > 0 and empty[lo - 1]: lo -= 1
        while hi < size - 1 and empty[hi + 1]: hi += 1
        cuts.append((lo + hi + 1) // 2)
    return cuts + [size]


def detect_cells(arr, cols, rows):
    """Cells cut at the gaps ChatGPT actually left: rows first, then columns within each row."""
    m = arr[..., 3] > 0
    ys = bands(m.sum(axis=1), rows)
    print('rows cut at ' + ' '.join(map(str, ys[1:-1])))
    cells = []
    for r in range(rows):
        xs = bands(m[ys[r]:ys[r + 1]].sum(axis=0), cols)
        cells += [(xs[c], ys[r], xs[c + 1], ys[r + 1]) for c in range(cols)]
    return cells


def opaque_bbox(a, min_px=12):
    """bbox of a cell's opaque pixels, ignoring rows/columns with only a few stray pixels."""
    m = a[..., 3] > 128
    rows, cols = np.nonzero(m.sum(axis=1) >= 2)[0], np.nonzero(m.sum(axis=0) >= 2)[0]
    if m.sum() < min_px or not len(rows) or not len(cols):
        return None
    return int(cols[0]), int(rows[0]), int(cols[-1] + 1), int(rows[-1] + 1)


def despill(arr, edge_only, passes=2):
    """Green spill left by the key: drop strongly green edge pixels and pull green down to the other
    channels. Everywhere for most of the cast (spill also hides in gaps in hair); edge-only for
    characters who wear green (keepGreen in cast.json), so their clothes survive."""
    if not edge_only:
        rgb = arr[..., :3].astype(int)
        other = np.maximum(rgb[..., 0], rgb[..., 2])
        arr[..., 1] = np.minimum(rgb[..., 1], other)
    for _ in range(passes):
        clear = arr[..., 3] == 0
        edge = np.zeros_like(clear)
        edge[1:] |= clear[:-1]; edge[:-1] |= clear[1:]
        edge[:, 1:] |= clear[:, :-1]; edge[:, :-1] |= clear[:, 1:]
        edge &= ~clear
        rgb = arr[..., :3].astype(int)
        other = np.maximum(rgb[..., 0], rgb[..., 2])
        spill = edge & (rgb[..., 1] > other)
        arr[spill & (rgb[..., 1] - other > 60), 3] = 0
        soft = spill & (rgb[..., 1] - other <= 60)
        arr[soft, 1] = other[soft]
    return arr


def keep_own(sub, min_px=4):
    """Clear what in a cell isn't this frame: blobs touching the cell edge (a neighbour's art, after
    the grid drifts) unless it is the main figure, and specks. Effects floating inside the cell stay."""
    m = sub[..., 3] > 0
    h, w = m.shape
    seen = np.zeros_like(m)
    blobs = []
    for y0, x0 in zip(*np.nonzero(m)):
        if seen[y0, x0]:
            continue
        q, px, edge = deque([(y0, x0)]), [], False
        seen[y0, x0] = True
        while q:
            y, x = q.popleft()
            px.append((y, x))
            edge |= y in (0, h - 1) or x in (0, w - 1)
            for ny in (y - 1, y, y + 1):
                for nx in (x - 1, x, x + 1):
                    if 0 <= ny < h and 0 <= nx < w and m[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        q.append((ny, nx))
        blobs.append((px, edge))
    if not blobs:
        return 0
    main = max(range(len(blobs)), key=lambda i: len(blobs[i][0]))
    dropped = 0
    for i, (px, edge) in enumerate(blobs):
        if i != main and (edge or len(px) < min_px):
            ys, xs = zip(*px)
            sub[list(ys), list(xs), 3] = 0
            dropped += len(px) if edge else 0
    return dropped


def label(img, cells, names, scale, color):
    d = ImageDraw.Draw(img)
    for (x0, y0, x1, y1), n in zip(cells, names):
        d.rectangle([x0 * scale, y0 * scale, x1 * scale - 1, y1 * scale - 1], outline=color)
        d.text((x0 * scale + 4, y0 * scale + 3), n, fill=color)


def cmd_sheet(args):
    char(args.id)
    im = to_rgba(args.src, args.key, args.tol, args.fringe)
    checker_warning(im)
    arr = np.asarray(im).copy()
    if args.key:
        despill(arr, CAST[args.id].get('keepGreen', False))
    cells = detect_cells(arr, SHEET_COLS, SHEET_ROWS)
    boxes, warn = [], []
    for (x0, y0, x1, y1), (name, _) in zip(cells, FRAMES):
        sub = arr[y0:y1, x0:x1]
        if keep_own(sub) > 40:
            print(f'note: {name}: cleared stray art at the cell edge (a neighbour\'s, or the grid drifted)')
        b = opaque_bbox(sub)
        if b is None:
            warn.append(f'{name}: cell is empty')
        elif b[0] <= 1 or b[1] <= 1 or b[2] >= sub.shape[1] - 1 or b[3] >= sub.shape[0] - 1:
            warn.append(f'{name}: art touches the cell edge (cut off, or the grid drifted)')
        boxes.append(b)
    im = Image.fromarray(arr)
    idle = boxes[0]
    if idle is None:
        sys.exit('idle1 is empty: cannot set the scale. Check the sheet and the grid.')
    # bodyFrac (cast.json): the share of idle1's height that is the body, for characters with a halo,
    # tall headgear or floating extras above the head, so those don't shrink the body below the cast's
    body = CAST[args.id].get('bodyFrac', 1.0)
    scale = args.scale or BODY_H / ((idle[3] - idle[1]) * body)
    ground = idle[3]                          # feet of idle1, in cell pixels
    anchor = (idle[0] + idle[2]) / 2          # body centre of idle1, in cell pixels
    out = Image.new('RGBA', (SHEET_COLS * CELL, SHEET_ROWS * CELL), (0, 0, 0, 0))
    for i, ((x0, y0, x1, y1), (name, _), b) in enumerate(zip(cells, FRAMES, boxes)):
        if b is None:
            continue
        part = im.crop((x0 + b[0], y0 + b[1], x0 + b[2], y0 + b[3]))
        w, h = max(1, round(part.width * scale)), max(1, round(part.height * scale))
        part = part.resize((w, h), Image.LANCZOS)
        pa = np.asarray(part).copy()
        pa[..., 3] = np.where(pa[..., 3] >= 128, 255, 0)     # hard pixel-art edges
        part = Image.fromarray(pa)
        if args.colors:
            part = part.quantize(args.colors, method=Image.Quantize.FASTOCTREE).convert('RGBA')
            part.putalpha(Image.fromarray(pa[..., 3]))
        # keep each frame's lunge/recoil relative to idle1; feet snap to the ground line
        # unless the frame is clearly airborne (a jump), which keeps its height
        lift = (ground - b[3]) * scale
        bottom = BASE - (lift if lift > 6 else 0)
        px = round(CELL / 2 + (b[0] - anchor) * scale)
        py = round(bottom - h)
        if px < 0 or py < 0 or px + w > CELL or py + h > CELL:
            warn.append(f'{name}: {w}x{h} at ({px},{py}) spills out of the {CELL}px frame and is clipped')
        cx, cy = (i % SHEET_COLS) * CELL, (i // SHEET_COLS) * CELL
        frame = Image.new('RGBA', (CELL, CELL), (0, 0, 0, 0))
        frame.alpha_composite(part, (max(px, 0), max(py, 0)), (max(-px, 0), max(-py, 0)))
        out.alpha_composite(frame, (cx, cy))
    dst = Path(args.out); dst.mkdir(parents=True, exist_ok=True)
    out.save(dst / f'{args.id}.sheet.webp', lossless=True)
    k = 3
    chk = Image.new('RGBA', out.size, (44, 40, 48, 255))
    d = ImageDraw.Draw(chk)
    for r in range(SHEET_ROWS):
        d.line([0, r * CELL + BASE, out.width, r * CELL + BASE], fill=(90, 84, 98, 255))
    chk.alpha_composite(out)
    chk = chk.resize((out.width * k, out.height * k), Image.NEAREST)
    label(chk, [((i % SHEET_COLS) * CELL, (i // SHEET_COLS) * CELL, (i % SHEET_COLS + 1) * CELL, (i // SHEET_COLS + 1) * CELL)
                for i in range(len(FRAMES))], [n for n, _ in FRAMES], k, (255, 90, 160, 255))
    chk.convert('RGB').save(dst / f'{args.id}.sheet.check.png')
    print(f'scale {scale:.3f} -> {dst}/{args.id}.sheet.webp, {dst}/{args.id}.sheet.check.png')
    for w_ in warn:
        print('warning:', w_, file=sys.stderr)


def gutter_panels(im, cols, rows, dark=25, solid=0.9):
    """Panel boxes from the black manga gutters: lines (rows or columns) that are almost all
    near-black across the whole page. None unless exactly cols x rows panels are found."""
    d = np.asarray(im.convert('L')) < dark

    def runs(frac):
        out, start = [], None
        for i, v in enumerate(list(frac) + [1.0]):
            if v < solid and start is None:
                start = i
            elif v >= solid and start is not None:
                if i - start > 40:
                    out.append((start, i))
                start = None
        return out
    xs, ys = runs(d.mean(axis=0)), runs(d.mean(axis=1))
    if len(xs) != cols or len(ys) != rows:
        return None
    return [(x0, y0, x1, y1) for y0, y1 in ys for x0, x1 in xs]


def cmd_portraits(args):
    char(args.id)
    im = Image.open(args.src).convert('RGB')
    cells = gutter_panels(im, PORT_COLS, PORT_ROWS)
    if cells:
        print('panels found by their gutters: ' + ', '.join(f'{x1 - x0}x{y1 - y0}' for x0, y0, x1, y1 in cells[:1]) + ' (first)')
    else:
        cells = grid_cells(im, PORT_COLS, PORT_ROWS)[0]
        print('warning: gutters not found cleanly; cutting an even grid', file=sys.stderr)
    out = Image.new('RGB', (PORT_COLS * PORT, PORT_ROWS * PORT))
    for i, (x0, y0, x1, y1) in enumerate(cells):
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        side = min(x1 - x0, y1 - y0) * (1 - 2 * args.inset)   # the largest centred square in the panel
        p = im.crop((round(cx - side / 2), round(cy - side / 2), round(cx + side / 2), round(cy + side / 2)))
        out.paste(p.resize((PORT, PORT), Image.LANCZOS), ((i % PORT_COLS) * PORT, (i // PORT_COLS) * PORT))
    dst = Path(args.out); dst.mkdir(parents=True, exist_ok=True)
    out.save(dst / f'{args.id}.portraits.webp', quality=90)
    chk = out.copy()
    label(chk, [((i % PORT_COLS) * PORT, (i // PORT_COLS) * PORT, (i % PORT_COLS + 1) * PORT, (i // PORT_COLS + 1) * PORT)
                for i in range(len(STATES))], [k for k, _, _ in STATES], 1, (255, 60, 140))
    chk.save(dst / f'{args.id}.portraits.check.png')
    print(f'panel {side:.0f}px -> {dst}/{args.id}.portraits.webp, {dst}/{args.id}.portraits.check.png')
    print('Check that the head sits in the same place in every panel and no gutter shows at the edges '
          '(raise --inset if it does).')


# ---------- install / embed ----------

def cmd_manifest(_=None):
    VIEWER.mkdir(parents=True, exist_ok=True)
    have = {cid: {'sheet': (VIEWER / f'{cid}.sheet.webp').exists(), 'portraits': (VIEWER / f'{cid}.portraits.webp').exists()}
            for cid in CAST}
    m = {
        'sheet': {'cols': SHEET_COLS, 'rows': SHEET_ROWS, 'cell': CELL, 'base': BASE, 'frames': [n for n, _ in FRAMES]},
        'anims': {k: {'frames': f, 'ms': ms, 'loop': lp} for k, (f, ms, lp) in ANIMS.items()},
        'portraits': {'cols': PORT_COLS, 'rows': PORT_ROWS, 'size': PORT, 'states': [{'key': k, 'label': l} for k, l, _ in STATES]},
        'cast': {cid: {'name': c['name'], 'class': c['class'], **have[cid]} for cid, c in CAST.items()},
    }
    (VIEWER / 'manifest.js').write_text('// Generated by .claude/skills/party-art/scripts/party_art.py manifest. Do not edit.\n'
                                        f'const MANIFEST = {json.dumps(m, indent=1)};\n')
    print(f'{VIEWER.relative_to(REPO)}/manifest.js: ' + ', '.join(
        f'{cid}{"" if h["sheet"] else " -sheet"}{"" if h["portraits"] else " -portraits"}' for cid, h in have.items()))


def cmd_install(args):
    char(args.id)
    n = 0
    for kind in ('sheet', 'portraits'):
        f = Path(args.dir) / f'{args.id}.{kind}.webp'
        if f.exists():
            shutil.copy(f, VIEWER / f.name); n += 1
            print(f'installed {VIEWER.relative_to(REPO)}/{f.name}')
    if not n:
        sys.exit(f'nothing to install: no {args.id}.sheet.webp or {args.id}.portraits.webp in {args.dir}')
    cmd_manifest()


def to_uri(img, fmt, **kw):
    b = io.BytesIO(); img.save(b, fmt, **kw)
    return f'data:image/{fmt.lower()};base64,' + base64.b64encode(b.getvalue()).decode()


def cmd_embed(args):
    char(args.id)
    src, m, assets = load_assets()
    a = assets[args.id]
    sheet, ports = VIEWER / f'{args.id}.sheet.webp', VIEWER / f'{args.id}.portraits.webp'
    if not sheet.exists() and not ports.exists():
        sys.exit(f'{args.id} has no installed art; run sheet/portraits and install first')
    if ports.exists():
        im = Image.open(ports).convert('RGB')
        a['ps'] = {}
        for i, (key, _, _) in enumerate(STATES):
            p = im.crop(((i % PORT_COLS) * PORT, (i // PORT_COLS) * PORT, (i % PORT_COLS + 1) * PORT, (i // PORT_COLS + 1) * PORT))
            a['ps'][key] = to_uri(p.resize((EMBED_PORT, EMBED_PORT), Image.LANCZOS), 'WEBP', quality=80)
        a['p'] = a['ps']['normal']
        print(f'{args.id}: {len(STATES)} portraits embedded; p = normal. Re-check FACE.{args.id} focal point if the framing moved.')
    if sheet.exists():
        f = Image.open(sheet).convert('RGBA').crop((0, 0, CELL, CELL))   # idle1
        a['s'] = to_uri(f.crop(f.getbbox()), 'PNG', optimize=True)
        print(f'{args.id}: turn-order sprite s = idle1 frame')
    GAME.write_text(src[:m.start(1)] + json.dumps(assets, separators=(',', ':')) + src[m.end(1):])


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest='cmd', required=True)
    s = sub.add_parser('refs'); s.add_argument('id'); s.add_argument('--out', default='.')
    s.set_defaults(fn=cmd_refs)
    s = sub.add_parser('prompt'); s.add_argument('id'); s.add_argument('kind', choices=['sheet', 'portraits', 'both'])
    s.add_argument('--date'); s.set_defaults(fn=cmd_prompt)
    s = sub.add_parser('sheet'); s.add_argument('src'); s.add_argument('id'); s.add_argument('--out', default='.')
    s.add_argument('--key', default='#00ff00', help="backdrop colour to key out ('' if the PNG has real alpha)")
    s.add_argument('--tol', type=int, default=60); s.add_argument('--fringe', type=int, default=2)
    s.add_argument('--scale', type=float, help='override the idle1-height scale')
    s.add_argument('--colors', type=int, default=0, help='quantize each frame to N colours')
    s.set_defaults(fn=cmd_sheet)
    s = sub.add_parser('portraits'); s.add_argument('src'); s.add_argument('id'); s.add_argument('--out', default='.')
    s.add_argument('--inset', type=float, default=0.02, help='fraction trimmed off each side of the panel square')
    s.set_defaults(fn=cmd_portraits)
    s = sub.add_parser('install'); s.add_argument('id'); s.add_argument('dir'); s.set_defaults(fn=cmd_install)
    s = sub.add_parser('embed'); s.add_argument('id'); s.set_defaults(fn=cmd_embed)
    s = sub.add_parser('manifest'); s.set_defaults(fn=cmd_manifest)
    args = p.parse_args()
    args.fn(args)


if __name__ == '__main__':
    main()
