"""Rebuild actor-only timing correction from the pinned PR49 source, using Pillow."""
import hashlib,json,sys,shutil
from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np
S=Path(sys.argv[1]); O=Path(__file__).resolve().parent
src=S/'sayo-singing.v01.png'
hash=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
t=json.loads((S/'timeline.v01.json').read_text()); atlas=Image.open(src).convert('RGBA')
assert hash(src)=='9555a9040de3c1dbefb16dca9b0fbf36f440c66ac244dbce161944eb8ad69209', 'Source changed; reconcile first'
old=t['actor_track']; new=old[:3]+[{'frame':3,'ms':250},{'frame':2,'ms':100}]+old[4:]
assert sum(x['ms'] for x in old)==sum(x['ms'] for x in new)==3600
shutil.copyfile(src,O/'sayo-singing.v02.png')
shutil.copyfile(S/'sayo-singing.v01.ora',O/'sayo-singing.v02.ora')
a=json.loads(json.dumps(t['atlases']['sayo-singing']));a['file']='sayo-singing.v02.png'
meta={'source_commit':'7b53d172e72c896fd2d1a85132664a4c30500a06','source_sha256':hash(src),'atlas':a,'actor_track':new,'original_actor_track':old,'loop':False,'duration_ms':3600,'terminal':'SS01 ready','timing_assumptions':[],'change':'SS04 exposure350 to250ms;reuse SS03 for100ms at1100..1200ms before SS05. All later cues and holds unchanged. No raster edit.','integration':'Replace PR49 actor_track only; preserve effects/cues/motion. Not54-frame party importer compatible.'}
(O/'timing.json').write_text(json.dumps(meta,indent=2)+'\n')
frames=[atlas.crop((i%4*96,i//4*96,i%4*96+96,i//4*96+96)) for i in range(8)]
ims=[]
for f in frames:
 bg=Image.new('RGBA',(96,96),(58,65,72,255));bg.alpha_composite(f);ims.append(bg.convert('RGB').resize((384,384),Image.Resampling.NEAREST))
for name,track in [('before',old),('after',new)]:
 for speed,mul in [('normal',1),('slow',2)]:
  fs=[ims[x['frame']] for x in track]; durations=[x['ms']*mul for x in track]
  p=O/f'casting.{name}.{speed}.gif';fs[0].save(p,save_all=True,append_images=fs[1:],duration=durations,loop=0,disposal=2,optimize=False)
  with Image.open(p) as g:
   assert g.n_frames==len(fs)
   for i,f in enumerate(fs):
    g.seek(i); assert g.info['duration']==durations[i];assert np.array_equal(np.array(g.convert('RGB')),np.array(f))
atlas.resize((1536,768),Image.Resampling.NEAREST).save(O/'sayo-singing.review-4x.png')
b=np.array(atlas);assert set(np.unique(b[:,:,3]))=={0,255}
for f in frames:
 x,y,r,d=f.getbbox(); assert x>=8 and y>=8 and r<=88 and d<=88
v={'source_sha256':hash(src),'output_sha256':hash(O/'sayo-singing.v02.png'),'raster_changed':False,'frame_count':8,'exposures_before':9,'exposures_after':10,'duration_ms':3600,'alpha_binary':True,'safe_padding':True,'opaque_colors':len(set(map(tuple,b[b[:,:,3]>0]))),'decoded_gif_pixels_and_delays_exact':True,'engine_tested':False,'artistically_approved':False}
(O/'validation.json').write_text(json.dumps(v,indent=2)+'\n');print(json.dumps(v))
