"""Reproduce the three-pixel cleanup from the pinned PR31 actor source.

Usage: python3 build.py /path/to/kugai-provoke-v01
Requires Pillow and numpy. Does not modify the input directory.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageSequence
import hashlib, io, json, sys, zipfile, xml.etree.ElementTree as ET
import numpy as np

OUT = Path(__file__).resolve().parent
SOURCE_SHA256 = 'cab0ec260f1e00124aeae6c2704c313ecf47bf5fe7f5709dbe16e94dc0194f0e'
PATCH = [(33, 180), (33, 181), (129, 181)]
NN = Image.Resampling.NEAREST

def png_bytes(im):
    b = io.BytesIO(); im.save(b, format='PNG'); return b.getvalue()

def frames(im):
    return [im.crop((i % 4 * 96, i // 4 * 96, i % 4 * 96 + 96, i // 4 * 96 + 96)) for i in range(8)]

def main(src):
    original_file = src / 'kugai-provoke-actor.v01.png'
    assert hashlib.sha256(original_file.read_bytes()).hexdigest() == SOURCE_SHA256, 'Source changed; review again before patching.'
    original = Image.open(original_file).convert('RGBA')
    corrected = original.copy()
    removed = []
    for x, y in PATCH:
        removed.append({'atlas_xy': [x, y], 'before_rgba': list(original.getpixel((x, y))), 'after_rgba': [0, 0, 0, 0]})
        assert original.getpixel((x, y))[3] == 255
        corrected.putpixel((x, y), (0, 0, 0, 0))
    name = 'kugai-provoke-actor.v02'
    corrected.save(OUT / (name + '.png'))
    # Reopen the delivered PNG for every derived preview and export check.
    corrected = Image.open(OUT / (name + '.png')).convert('RGBA')
    corrected.resize((1536, 768), NN).save(OUT / (name + '.4x.png'))
    with zipfile.ZipFile(src / 'kugai-provoke-actor.v01.ora') as z, zipfile.ZipFile(OUT / (name + '.ora'), 'w') as out:
        stack = ET.fromstring(z.read('stack.xml'))
        layer_paths = {e.attrib['src'] for e in stack.findall('.//layer')}
        for entry in z.infolist():
            data = z.read(entry.filename)
            if entry.filename in layer_paths or entry.filename == 'mergedimage.png':
                im = Image.open(io.BytesIO(data)).convert('RGBA')
                for xy in PATCH: im.putpixel(xy, (0, 0, 0, 0))
                data = png_bytes(im)
            out.writestr(entry, data)
    timeline = json.loads((src / 'timeline.v01.json').read_text())
    atlas = timeline['atlases']['kugai-provoke-actor']
    atlas['file'] = name + '.png'
    cf = frames(corrected)
    for f, im in zip(atlas['frames'], cf): f['bounds_exclusive'] = list(im.getbbox())
    metadata = {'character': 'Kugai', 'action': 'Provoke', 'version': 2,
                'source_commit': 'f5908e1639759fb94df71d8dafda710afc2f0c4f',
                'source_sha256': SOURCE_SHA256, 'atlas': atlas,
                'actor_track': timeline['actor_track'], 'duration_ms': 3000,
                'loop': False, 'terminal_frame': 0, 'cues': timeline['cues'],
                'timing_assumptions': [], 'changes': removed,
                'import': {'filter': 'nearest', 'mipmaps': False, 'premultiplied_alpha': False,
                           'layout_change': False, 'timing_change': False,
                           'integration': 'Standalone replacement for PR31 actor only. Retain its effect atlas and choreography. Not the 54-pose party sheet.'},
                'preview': {'background_rgb': [58,65,72], 'scale': 6,
                            'loop': 'Review GIFs repeat the full one-shot for inspection; runtime remains non-looping.'}}
    (OUT / 'actor.v02.json').write_text(json.dumps(metadata, indent=2) + '\n')
    review = Image.new('RGB', (1536, 816), (58,65,72)); draw = ImageDraw.Draw(review)
    for i, im in enumerate(cf):
        x, y = i % 4 * 384, i // 4 * 408
        large = im.resize((384,384), NN); review.paste(large, (x,y), large)
        draw.text((x+100,y+386), f'KP{i+1:02}', fill='white')
    review.save(OUT / 'poses.review-4x.png')
    preview_checks = {}
    for label, sheet in [('before', original), ('after', corrected)]:
        cells = frames(sheet); exposure = []
        for step in timeline['actor_track']:
            bg = Image.new('RGBA', (96,96), (58,65,72,255)); bg.alpha_composite(cells[step['frame']])
            exposure.append(bg.resize((576,576), NN).convert('RGB'))
        for speed, factor in [('normal',1), ('slow',2)]:
            durations = [s['ms']*factor for s in timeline['actor_track']]
            file = OUT / f'provoke.{label}.{speed}.gif'
            exposure[0].save(file, save_all=True, append_images=exposure[1:], duration=durations, loop=0, disposal=2, optimize=False)
            with Image.open(file) as gif:
                decoded = list(ImageSequence.Iterator(gif))
                assert len(decoded) == 9
            with Image.open(file) as gif:
                for i in range(9):
                    gif.seek(i)
                    assert gif.info['duration'] == durations[i]
                    assert np.array_equal(np.array(gif.convert('RGB')), np.array(exposure[i]))
            preview_checks[file.name] = {'frames': 9, 'duration_ms': sum(durations), 'exact_pixels_and_timing': True}
    a, b = np.array(original), np.array(corrected)
    changed = np.argwhere(np.any(a != b, axis=2))[:, ::-1].tolist()
    assert sorted(changed) == sorted([list(x) for x in PATCH])
    palette = lambda im: {tuple(v[:3]) for v in np.array(im).reshape(-1,4) if v[3]}
    assert palette(original) == palette(corrected)
    assert set(np.unique(b[:,:,3])) == {0,255}
    assert all(8 <= f.getbbox()[0] and 8 <= f.getbbox()[1] and f.getbbox()[2] <= 88 and f.getbbox()[3] <= 88 for f in cf)
    assert all(np.array_equal(np.array(f.crop((34,81,64,89))), np.array(cf[0].crop((34,81,64,89)))) for f in cf)
    with zipfile.ZipFile(OUT / (name + '.ora')) as z:
        stack = ET.fromstring(z.read('stack.xml')); recomposed = Image.new('RGBA', corrected.size)
        for layer in reversed(stack.findall('.//layer')):
            recomposed.alpha_composite(Image.open(io.BytesIO(z.read(layer.attrib['src']))).convert('RGBA'))
        assert np.array_equal(np.array(recomposed), b)
        assert np.array_equal(np.array(Image.open(io.BytesIO(z.read('mergedimage.png')))), b)
    enlarged = np.array(Image.open(OUT / (name + '.4x.png')))
    assert np.array_equal(enlarged, b.repeat(4,0).repeat(4,1))
    validation = {'status': 'technical_checks_passed_not_artistic_approval', 'changed_pixel_count': 3,
                  'changed_atlas_pixels': changed, 'unchanged_frames': ['KP01','KP02','KP03','KP04','KP07','KP08'],
                  'unchanged_other_pixels': True, 'size': list(corrected.size), 'cell': [96,96],
                  'opaque_colors': len(palette(corrected)), 'palette_unchanged': True,
                  'binary_alpha': True, 'safe_padding': True, 'boot_registration_preserved': True,
                  'ora_recomposition_exact': True, 'nearest_neighbor_4x_exact': True,
                  'metadata_bounds_exact': True, 'previews': preview_checks,
                  'corrected_sha256': hashlib.sha256((OUT / (name + '.png')).read_bytes()).hexdigest()}
    (OUT / 'validation.json').write_text(json.dumps(validation, indent=2) + '\n')
    print(json.dumps(validation, indent=2))

if __name__ == '__main__': main(Path(sys.argv[1]).resolve())
