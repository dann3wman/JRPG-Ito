"""Rebuild actor-only evidence from pinned PR52, without changing source art.
Usage: python3 build.py /path/to/goku-quake-v01
Requires Pillow and NumPy. No source, timing or engine writes.
"""
import hashlib, io, json, sys, zipfile
from pathlib import Path
import xml.etree.ElementTree as ET
import numpy as np
from PIL import Image, ImageDraw
OUT=Path(__file__).resolve().parent
SOURCE=Path(sys.argv[1]).resolve()
SHA='e7f2087312d7c409fd775312967be40a69efbea1187c32d019d3c2476437949c'
digest=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert digest(SOURCE/'goku-casting.v01.png')==SHA
assert digest(SOURCE/'timeline.v01.json')=='c64528b5be5693e9259e2a0ceba26778cd2c6c72f29ede04277226d249b8ba4a'
atlas=Image.open(SOURCE/'goku-casting.v01.png').convert('RGBA')
t=json.loads((SOURCE/'timeline.v01.json').read_text())
m=t['atlases']['goku-casting']
assert atlas.size==tuple(m['size'])==(384,192)
frames=[]
for i,f in enumerate(m['frames']):
 x,y,w,h=f['rect'];assert (x,y,w,h)==(i%4*96,i//4*96,96,96)
 assert f['pivot']==[48,86]
 im=atlas.crop((x,y,x+w,y+h));frames.append(im)
 assert list(im.getbbox())==f['bounds_exclusive']
 x0,y0,x1,y1=im.getbbox();assert min(x0,y0)>=8 and max(x1,y1)<=88
 assert np.array_equal(np.array(im)[80:86],np.array(frames[0])[80:86])
a=np.array(atlas);colors={tuple(x) for x in a[a[:,:,3]>0]}
assert len(colors)==24 and set(np.unique(a[:,:,3]))=={0,255}
assert {('#%02X%02X%02X'%c[:3]) for c in colors}==set(m['palette'])
with zipfile.ZipFile(SOURCE/'goku-casting.v01.ora') as z:
 im=Image.new('RGBA',atlas.size)
 for layer in reversed(ET.fromstring(z.read('stack.xml')).findall('.//layer')):
  im.alpha_composite(Image.open(io.BytesIO(z.read(layer.get('src')))).convert('RGBA'))
 assert np.array_equal(np.array(im),a)
# Exact integer enlargement, including the labelled all-pose review.
atlas.resize((1536,768),Image.Resampling.NEAREST).save(OUT/'goku.frames.4x.png')
assert np.array_equal(np.array(Image.open(OUT/'goku.frames.4x.png')),np.repeat(np.repeat(a,4,axis=0),4,axis=1))
bg=(58,65,72,255)
displays=[]
for f in frames:
 im=Image.new('RGBA',f.size,bg);im.alpha_composite(f)
 displays.append(im.convert('RGB').resize((384,384),Image.Resampling.NEAREST))
review=Image.new('RGB',(1536,816),bg[:3]);draw=ImageDraw.Draw(review)
for i,im in enumerate(displays):
 x,y=i%4*384,i//4*408
 review.paste(im,(x,y+24));draw.text((x+8,y+6),m['frames'][i]['id']+' '+m['frames'][i]['state'],fill='white')
review.save(OUT/'goku.labelled.4x.png')
seq=[displays[e['frame']] for e in t['actor_track']]
assert len(seq)==9 and sum(e['ms'] for e in t['actor_track'])==3600
for name,mul in [('normal',1),('slow',2)]:
 path=OUT/f'goku.{name}.gif'
 seq[0].save(path,save_all=True,append_images=seq[1:],duration=[e['ms']*mul for e in t['actor_track']],loop=0,disposal=2,optimize=False)
 with Image.open(path) as gif:
  assert gif.n_frames==len(seq)
  for i,im in enumerate(seq):
   gif.seek(i);assert gif.info['duration']==t['actor_track'][i]['ms']*mul
   assert np.array_equal(np.array(gif.convert('RGB')),np.array(im))
meta={'character':'Goku','action':'Quake','source_commit':'465f560628aa3a0d32a339bb3d18bddcf144826c','source_path':'assets/party-fx/goku-quake-v01/goku-casting.v01.png','source_sha256':SHA,'atlas':m,'actor_track':t['actor_track'],'duration_ms':3600,'loop':False,'terminal':'hold GQ01','timing_assumptions':[],'pixel_changes':0,'timing_changes':False,'preview_loop_only':True,'slow_multiplier':2,'compatibility':'Standalone eight-pose actor atlas. Not the 54-frame party importer; no engine integration performed. Retain source PR52 choreography and effects.'}
(OUT/'goku.timing.json').write_text(json.dumps(meta,indent=2)+'\n')
v={'source_sha256':SHA,'source_ora_sha256':digest(SOURCE/'goku-casting.v01.ora'),'source_timeline_sha256':digest(SOURCE/'timeline.v01.json'),'native_dimensions':[384,192],'cells':[96,96],'frame_count':8,'exposures':9,'bounds_match_metadata':True,'padding_safe':True,'pivot':[48,86],'shared_boot_strip_80_85':True,'binary_alpha':True,'opaque_colors':24,'palette_matches_metadata':True,'nearest_enlargement_exact':True,'ora_recomposition_exact':True,'decoded_gif_pixels_and_delays_exact':True,'duration_ms':3600,'slow_duration_ms':7200,'source_unchanged':digest(SOURCE/'goku-casting.v01.png')==SHA,'artistic_approval':False,'engine_tested':False,'continuous_perceptual_review_complete':False}
(OUT/'validation.json').write_text(json.dumps(v,indent=2)+'\n')
print(json.dumps(v,indent=2))
