"""Localized halo-face stabilization; run from any directory with Pillow installed."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageDraw, ImageChops

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / 'natsu.cure.source-v02.png'
EXPECTED = '4f38fee584c533cdab1e4bf72546394ec6a4938c1bfccd1b1c7f1ca333d5df6e'
TIMES = [400, 120, 240, 100, 140, 160, 160, 300]
POSES = ['idle', 'anticipation', 'prayer', 'charge', 'release', 'follow_through', 'recovery', 'settle']
# Two existing rigid face ornaments, copied without scaling or recoloring.
# Local half-open boxes in idle. Offsets follow the head's existing one-pixel dip.
PATCHES = [(58, 18, 68, 29), (65, 32, 75, 41)]
FEATURES = [(60, 20, 66, 27), (67, 34, 73, 39)]
OFFSETS = {1: (-2, 1), 2: (-2, 1), 3: (-2, 1), 4: (0, 1), 5: (1, 1), 6: (0, 1)}

def split(im):
    return [im.crop((i % 4 * 96, i // 4 * 96, i % 4 * 96 + 96, i // 4 * 96 + 96)) for i in range(8)]

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def colors(im):
    return set(p for p in im.getdata() if p[3])

def composite(im, scale):
    bg = Image.new('RGBA', im.size, '#26313a')
    return Image.alpha_composite(bg, im).convert('RGB').resize((im.width * scale, im.height * scale), Image.Resampling.NEAREST)

def gif(name, frames, durations):
    path = ROOT / name
    frames[0].save(path, save_all=True, append_images=frames[1:], duration=durations, loop=0, disposal=2, optimize=False)
    decoded = Image.open(path)
    assert decoded.n_frames == 8
    for i, expected in enumerate(frames):
        decoded.seek(i)
        assert decoded.info['duration'] == durations[i]
        assert decoded.convert('RGB').tobytes() == expected.tobytes()

assert sha(SOURCE) == EXPECTED
source = Image.open(SOURCE).convert('RGBA')
assert source.size == (384, 192)
before = split(source)
sheet = source.copy()
allowed = Image.new('L', sheet.size)
draw_allowed = ImageDraw.Draw(allowed)
for i, (dx, dy) in OFFSETS.items():
    for box in PATCHES:
        dest = (i % 4 * 96 + box[0] + dx, i // 4 * 96 + box[1] + dy)
        sheet.paste(before[0].crop(box), dest)
        draw_allowed.rectangle((dest[0], dest[1], dest[0] + box[2] - box[0] - 1, dest[1] + box[3] - box[1] - 1), fill=255)
    # Cure calls for faces turning toward the target. Keep each pose's original
    # inner facial features, rather than freezing the entire ornament to idle.
    for x0, y0, x1, y1 in FEATURES:
        box = (i % 4 * 96 + x0 + dx, i // 4 * 96 + y0 + dy,
               i % 4 * 96 + x1 + dx, i // 4 * 96 + y1 + dy)
        sheet.paste(source.crop(box), box[:2])
        draw_allowed.rectangle((box[0], box[1], box[2]-1, box[3]-1), fill=0)
output = ROOT / 'natsu.cure.v03.png'
sheet.save(output)
# Reopen delivered bytes before deriving every review artifact.
sheet = Image.open(output).convert('RGBA')
after = split(sheet)
changed = [sum(a != b for a, b in zip(x.getdata(), y.getdata())) for x, y in zip(before, after)]
assert changed[0] == changed[7] == 0
assert all(a == b or ok for a, b, ok in zip(source.getdata(), sheet.getdata(), allowed.getdata()))
assert colors(source) == colors(sheet)
assert set(sheet.getchannel('A').getdata()) == {0, 255}
assert after[0].tobytes() == after[7].tobytes()
assert all(0 < f.getbbox()[0] and 0 < f.getbbox()[1] and f.getbbox()[2] < 96 and f.getbbox()[3] < 96 for f in after)
sheet.resize((1536, 768), Image.Resampling.NEAREST).save(ROOT / 'natsu.cure.v03.review-4x.png')
labels = Image.new('RGB', (1536, 896), '#b9c3c7')
d = ImageDraw.Draw(labels)
for i, f in enumerate(after):
    x, y = i % 4 * 384, i // 4 * 448
    d.text((x + 12, y + 12), f'{i}: {POSES[i]} | {TIMES[i]} ms', fill='#14252d')
    f = f.resize((384, 384), Image.Resampling.NEAREST)
    labels.paste(f, (x, y + 48), f)
labels.save(ROOT / 'natsu.cure.v03.labeled.png')
comparison = []
for a, b in zip(before, after):
    im = Image.new('RGB', (576, 316), '#26313a')
    im.paste(composite(a, 3), (0, 28)); im.paste(composite(b, 3), (288, 28))
    d = ImageDraw.Draw(im); d.text((12, 8), 'BEFORE v02', fill='white'); d.text((300, 8), 'AFTER v03', fill='white')
    comparison.append(im)
gif('natsu.cure.before-after.normal.gif', comparison, TIMES)
gif('natsu.cure.before-after.slow.gif', comparison, [t * 2 for t in TIMES])
gif('natsu.cure.v03.normal.gif', [composite(f, 4) for f in after], TIMES)
gif('natsu.cure.v03.slow.gif', [composite(f, 4) for f in after], [t * 2 for t in TIMES])
checks = dict(source_sha256=EXPECTED, output_sha256=sha(output), dimensions=list(sheet.size), cell_size=[96, 96], frame_count=8,
              changed_pixels_per_frame=changed, changed_frames=[i for i,n in enumerate(changed) if n], outside_patches_identical=True,
              unchanged_frames=[0,7], facial_feature_interiors_unchanged=True, palette_unchanged=True, opaque_palette_colors=len(colors(sheet)), binary_alpha=True,
              frame_bounds=[f.getbbox() for f in after], endpoint_identical=True, nearest_neighbor_enlargement=True,
              decoded_gifs_pixel_exact=True, normal_duration_ms=sum(TIMES), slow_duration_ms=2*sum(TIMES),
              engine_tested=False, production_pass=False)
(ROOT / 'validation.json').write_text(json.dumps(checks, indent=2) + '\n')
meta = dict(character='Natsu', action='Cure', version='8pose_v03', atlas='natsu.cure.v03.png', atlas_size=[384,192],
            frame_size=[96,96], columns=4, rows=2, frame_order=list(range(8)), durations_ms=TIMES, duration_ms=sum(TIMES),
            gameplay_loop=False, hold_last=True, preview_loop=True, pivot=[48,87], feet_baseline_y=86,
            timing_assumptions='None. All v02 holds and one-shot semantics retained; slow preview doubles holds.',
            import_status='Standalone eight-pose study. Not a replacement for the installed 54-frame sheet or 4.1-second Cure choreography.',
            rendering='Native pixel scale, nearest-neighbor sampling, binary alpha; no filtering or resampling of native art.',
            source_library_file_id='libfile_e251df64fa708191b85e07cb91a764b5', source_sha256=EXPECTED,
            output_sha256=checks['output_sha256'], canonical_face_boxes=PATCHES, protected_feature_boxes=FEATURES, head_offsets=OFFSETS,
            changes='Stabilize the two halo face rims in frames 1-6 at head-relative integer positions. Preserve original inner facial features for directional change, and all pixels outside the two boxes.',
            frames=[dict(index=i, rect=[i%4*96,i//4*96,96,96], duration_ms=TIMES[i], pose=POSES[i], pivot=[48,87]) for i in range(8)],
            validation=checks)
(ROOT / 'natsu.cure.v03.json').write_text(json.dumps(meta, indent=2) + '\n')
print(json.dumps(checks, indent=2))
