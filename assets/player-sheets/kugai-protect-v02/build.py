"""Reproduce the four-pixel fringe repair from the pinned PR58 actor source.

Usage: python3 build.py /path/to/kugai-protect-v01
Requires Pillow and NumPy. No effect atlas or original source is modified.
"""
import hashlib
import io
import json
import sys
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent
SOURCE = Path(sys.argv[1]).resolve()
SOURCE_SHA = '841d3a27ad3388d58515ca137792fb48155ed2d59a6466d5ee8c0384cdb76bdf'
SOURCE_COMMIT = 'b91a11056c8456316e39fe9d554c5650810db9e5'
BG = (58, 65, 72, 255)


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def repair(image):
    result = image.copy()
    for xy in [(172,176),(173,176),(172,177),(172,178)]:
        result.putpixel(xy,(0,0,0,0))
    return result


def png_bytes(image):
    stream = io.BytesIO()
    image.save(stream, format='PNG')
    return stream.getvalue()


def frames(image):
    return [image.crop((i % 4*96, i // 4*96, (i % 4+1)*96, (i // 4+1)*96)) for i in range(8)]


def display(image):
    bg = Image.new('RGBA', image.size, BG)
    bg.alpha_composite(image)
    return bg.convert('RGB').resize((384, 384), Image.Resampling.NEAREST)


assert digest(SOURCE/'kugai-warding.v01.png') == SOURCE_SHA, 'Unexpected source; reconcile before editing'
old = Image.open(SOURCE/'kugai-warding.v01.png').convert('RGBA')
new = repair(old)
new.save(OUT/'kugai-warding.v02.png')
new = Image.open(OUT/'kugai-warding.v02.png').convert('RGBA')  # all final previews use reopened export
new.resize((1536, 768), Image.Resampling.NEAREST).save(OUT/'kugai-warding.v02.4x.png')
timeline = json.loads((SOURCE/'timeline.v01.json').read_text())
meta = {
    'character': 'Kugai', 'action': 'Protect', 'version': 2,
    'source_commit': SOURCE_COMMIT, 'source_sha256': SOURCE_SHA,
    'atlas': timeline['atlases']['kugai-warding'],
    'duration_ms': timeline['duration_ms'], 'actor_track': timeline['actor_track'],
    'loop': False, 'terminal': 'hold KP01 ready', 'timing_assumptions': [],
    'timing_changed': False, 'layout_changed': False,
    'preview_loop_only': True, 'preview_slow_multiplier': 2,
    'compatibility': 'Standalone PR58 actor atlas replacement; not the 54-pose party importer. Retain PR58 effects and choreography. Engine integration not verified.',
    'repair': {'frame':'KP06','local_xy':[[76,80],[77,80],[76,81],[76,82]],'atlas_xy':[[172,176],[173,176],[172,177],[172,178]],'operation':'clear disconnected inherited cape remnant'},
}
meta['atlas']['file'] = 'kugai-warding.v02.png'
for f, im in zip(meta['atlas']['frames'], frames(new)):
    f['bounds_exclusive'] = list(im.getbbox())
(OUT/'kugai-warding.v02.json').write_text(json.dumps(meta, indent=2)+'\n')

# Reuse the editable source's three disjoint value layers and exact layer order.
with zipfile.ZipFile(SOURCE/'kugai-warding.v01.ora') as zin, zipfile.ZipFile(OUT/'kugai-warding.v02.ora','w') as zout:
    root = ET.fromstring(zin.read('stack.xml'))
    root.set('name', 'kugai-warding.v02.ora')
    layers = {x.get('src') for x in root.findall('.//layer')}
    for entry in zin.infolist():
        data = zin.read(entry.filename)
        if entry.filename in layers:
            data = png_bytes(repair(Image.open(io.BytesIO(data)).convert('RGBA')))
        elif entry.filename == 'mergedimage.png':
            data = png_bytes(new)
        elif entry.filename == 'Thumbnails/thumbnail.png':
            thumb = new.copy(); thumb.thumbnail((256,256), Image.Resampling.NEAREST)
            data = png_bytes(thumb)
        elif entry.filename == 'stack.xml':
            data = ET.tostring(root)
        zout.writestr(entry, data)

timings = [x['ms'] for x in meta['actor_track']]
order = [x['frame'] for x in meta['actor_track']]
for title, atlas in [('before', old), ('after', new)]:
    ims = [display(f) for f in frames(atlas)]
    seq = [ims[i] for i in order]
    for name, mul in [('normal',1),('slow',2)]:
        path = OUT/f'warding.{title}.{name}.gif'
        seq[0].save(path, save_all=True, append_images=seq[1:], duration=[x*mul for x in timings], loop=0, disposal=2, optimize=False)
        with Image.open(path) as gif:
            assert gif.n_frames == 9
            for i, expected in enumerate(seq):
                gif.seek(i)
                assert gif.info['duration'] == timings[i]*mul
                assert np.array_equal(np.array(gif.convert('RGB')), np.array(expected))

review = Image.new('RGB',(768,864), BG[:3])
draw = ImageDraw.Draw(review)
for i,(before,after) in enumerate(zip(frames(old),frames(new))):
    # each cell: source then corrected at exact 2x, all eight poses
    x,y = i%2*384,i//2*216
    for j,f in enumerate((before,after)):
        bg=Image.new('RGBA',(96,96),BG); bg.alpha_composite(f)
        review.paste(bg.convert('RGB').resize((192,192),Image.Resampling.NEAREST),(x+j*192,y+20))
    draw.text((x+4,y+4),f'KP{i+1:02} BEFORE',fill='white')
    draw.text((x+196,y+4),f'KP{i+1:02} AFTER',fill='white')
review.save(OUT/'frames.before-after.2x.png')

a,b=np.array(old),np.array(new)
mask=np.zeros(a.shape[:2],bool)
for x,y in [(172,176),(173,176),(172,177),(172,178)]:mask[y,x]=True
assert np.array_equal(a[~mask],b[~mask])
assert set(np.unique(b[:,:,3])) == {0,255}
palette=lambda p: {tuple(c) for c in p[p[:,:,3]>0]}
assert palette(a)==palette(b) and len(palette(b))==24
assert new.size==(384,192)
for f,original in zip(frames(new), frames(old)):
    x0,y0,x1,y1=f.getbbox()
    assert x0>=8 and y0>=8 and x1<=88 and y1<=88
    assert f.getbbox()==original.getbbox() or (x0>=8 and y1==86)
with zipfile.ZipFile(OUT/'kugai-warding.v02.ora') as z:
    composed=Image.new('RGBA',new.size)
    for layer in reversed(ET.fromstring(z.read('stack.xml')).findall('.//layer')):
        composed.alpha_composite(Image.open(io.BytesIO(z.read(layer.get('src')))).convert('RGBA'))
    assert np.array_equal(np.array(composed), b)
big=np.array(Image.open(OUT/'kugai-warding.v02.4x.png'))
assert np.array_equal(big,np.repeat(np.repeat(b,4,axis=0),4,axis=1))
validation={
    'source_sha256':SOURCE_SHA,'output_sha256':digest(OUT/'kugai-warding.v02.png'),
    'changed_pixels':int(np.any(a!=b,axis=2).sum()),
    'changed_pixels_per_frame':[int(np.any(np.array(x)!=np.array(y),axis=2).sum()) for x,y in zip(frames(old),frames(new))],
    'all_other_pixels_unchanged':True,'KP01_unchanged':True,'binary_alpha':True,'palette_exact':True,'opaque_colors':24,
    'bounds_safe':True,'native_dimensions':[384,192],'cell':[96,96],'frame_count':8,
    'four_pixel_delta':int(np.any(a!=b,axis=2).sum())==4,'ora_recomposition':True,'nearest_4x_exact':True,'decoded_gif_pixels_and_delays_exact':True,
    'duration_ms':3600,'slow_duration_ms':7200,'timing_changed':False,'engine_tested':False,'artistic_approval':False,
}
(OUT/'validation.json').write_text(json.dumps(validation,indent=2)+'\n')
print(json.dumps(validation,indent=2))
