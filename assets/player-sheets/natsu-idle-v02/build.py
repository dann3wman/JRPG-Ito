"""Rebuild the local idle repair from the pinned Git source. Requires Pillow/numpy.
Run from this directory: python3 build.py. Other 52 cells remain unchanged.
"""
from pathlib import Path
import subprocess, json, hashlib, io
import numpy as np
from PIL import Image, ImageDraw, ImageSequence

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[2]
BASE = 'c1840737fef12061165ef6bb553e7bfa166b717b'
ASSET = 'tools/party-sprite-viewer/natsu.sheet.webp'
raw = subprocess.check_output(['git', 'show', f'{BASE}:{ASSET}'], cwd=ROOT)
source = Image.open(io.BytesIO(raw)).convert('RGBA')
a = np.array(source); b = a.copy()
# Align stationary idle2/idle3 to idle1 without changing any drawing or timing.
for i in (1,2):
 original=a[:96,i*96:(i+1)*96].copy()
 assert not original[:,90:,3].any()
 fixed=np.zeros_like(original);fixed[:,6:]=original[:,:90]
 b[:96,i*96:(i+1)*96]=fixed
after = Image.fromarray(b)
after.save(OUT/'natsu.sheet.v02.png')
after.save(ROOT/ASSET,format='WEBP',lossless=True,exact=True,method=6)
after = Image.open(OUT/'natsu.sheet.v02.png').convert('RGBA')
b = np.array(after)
manifest_text = (ROOT/'tools/party-sprite-viewer/manifest.js').read_text()
m = json.loads(manifest_text[manifest_text.index('{'):manifest_text.rindex('}')+1])
frames = m['sheet']['frames']; anims = m['anims']
def crop(sheet,name):
 i=frames.index(name); x=i%6*96; y=i//6*96
 return sheet.crop((x,y,x+96,y+96))
def visible(im):
 bg=Image.new('RGBA',im.size,'#26313a');bg.alpha_composite(im)
 return bg.convert('RGB')
visible(after).resize((1152,1728),Image.Resampling.NEAREST).save(OUT/'natsu.sheet.v02.review-2x.png')
pre=OUT/'previews';pre.mkdir(exist_ok=True)
preview_checks=[]
for name,anim in anims.items():
 panels=[]
 for f in anim['frames']:
  p=Image.new('RGB',(408,220),'#26313a');d=ImageDraw.Draw(p)
  d.text((5,4),f'{name}: BEFORE / AFTER ({f})',fill='white')
  for x,sheet in [(4,source),(208,after)]:
   p.paste(visible(crop(sheet,f)).resize((192,192),Image.Resampling.NEAREST),(x,24))
  panels.append(p)
 for factor,label in [(1,'normal'),(2,'slow')]:
  dur=[anim['ms']*factor]*len(panels)
  # APNG one-shots play once; loops repeat. Preserve duplicate held frames.
  path=pre/f'{name}.{label}.png'
  panels[0].save(path,save_all=True,append_images=panels[1:],duration=dur,loop=0 if anim['loop'] else 1)
  with Image.open(path) as check:
   total=0
   for decoded_frame in ImageSequence.Iterator(check):
    index=min(len(panels)-1,int(round(total/(anim['ms']*factor))))
    assert np.array_equal(np.array(decoded_frame.convert('RGB')),np.array(panels[index]))
    total+=decoded_frame.info.get('duration',dur[0])
   # Encoders may merge consecutive identical held poses; elapsed time must match.
   assert abs(total-sum(dur))<0.01
  preview_checks.append(str(path.relative_to(OUT)))
  if name=='idle':
   panels[0].save(OUT/f'natsu.idle.before-after.{label}.gif',save_all=True,append_images=panels[1:],duration=dur,loop=0)
changed = np.any(a!=b,axis=2)
for i in range(54):
 if i not in (1,2):
  x=i%6*96;y=i//6*96
  assert np.array_equal(a[y:y+96,x:x+96],b[y:y+96,x:x+96])
def palette(v): return set(map(tuple,v[v[:,:,3]>0,:3]))
assert palette(b)<=palette(a)
assert set(np.unique(b[:,:,3]))=={0,255}
decoded=np.array(Image.open(ROOT/ASSET).convert('RGBA'))
assert np.array_equal(decoded[:,:,3],b[:,:,3])
assert np.array_equal(decoded[b[:,:,3]>0],b[b[:,:,3]>0])
bounds=[]
for f in frames:
 box=crop(after,f).getbbox();assert box and box[0]>0 and box[1]>0 and box[2]<96 and box[3]<96
 bounds.append(dict(frame=f,xyxy=box))
meta={
 'character':'Natsu','review_date_utc':'2026-11-11','status':'partial; live playback and engine approval pending',
 'source':{'repository':'dann3wman/JRPG-Ito','base_commit':BASE,'path':ASSET,'git_blob':subprocess.check_output(['git','rev-parse',f'{BASE}:{ASSET}'],cwd=ROOT,text=True).strip(),'sha256':hashlib.sha256(raw).hexdigest()},
 'sheet':m['sheet'],'animations':anims,'skill_choreography':{'natsuCure':m['skills']['natsuCure']},
 'timing':'Exact repository metadata, no timing assumptions or changes. Slow previews use 2x durations. APNG one-shots play once; GIF idle loops.',
 'change':{'frames':['idle2','idle3'],'translation_xy':[6,0],'rgba_pixels_changed':int(changed.sum()),'drawing':'exact translation; no redrawn pixels'},
 'validation':{'other_52_cells_exact_rgba':True,'geometry_576x864_cells96_grid6x9':True,'binary_alpha':True,'no_new_colors':True,'opaque_palette_colors':len(palette(b)),'png_webp_visible_pixels_identical':True,'all_cells_have_transparent_padding':True,'frame_bounds':bounds,'all54_poses_statically_inspected':True,'all26_sequences_exported_normal_and_slow':len(anims)==26,'preview_durations_match':True,'live_playback_inspected':False,'engine_tested':False,'production_approved':False},
 'remaining':['Live playback blocked: Chromium socket() Operation not permitted.','Original high-colour opaque palette and shaded clusters are not strict 20-colour FFVI pixel art. No new colours or filtering added.','Pose-to-pose hair/face/volume variation remains. No full professional animation pass claimed.','Cure choreography, derived status effects and engine transitions require live inspection.'],
 'outputs':{'native_png':'natsu.sheet.v02.png','installed_webp':ASSET,'review_sheet':'natsu.sheet.v02.review-2x.png','previews':preview_checks},
 'output_sha256':hashlib.sha256((OUT/'natsu.sheet.v02.png').read_bytes()).hexdigest()
}
(OUT/'natsu.sheet.v02.json').write_text(json.dumps(meta,indent=2)+'\n')
rows=[]
for name,anim in anims.items():
 rows.append(f'<section><h2>{name}</h2><p>{anim["ms"]} ms per slot; loop: {anim["loop"]}</p><img src="previews/{name}.normal.png" alt="normal {name}"><img src="previews/{name}.slow.png" alt="half-speed {name}"></section>')
(OUT/'review.html').write_text('<!doctype html><meta charset="utf-8"><title>Kiri atlas review</title><style>body{background:#26313a;color:white;font:16px sans-serif}img{image-rendering:pixelated;max-width:100%}section{border-top:1px solid #899;padding:12px}</style><h1>Kiri: before / after</h1><p>Partial review. Playback not verified. Left animation: normal. Right: half speed. Reload to replay one-shots.</p>'+''.join(rows))
print(json.dumps({'change':meta['change'],'palette':meta['validation']['opaque_palette_colors'],'previews':len(preview_checks)}))
