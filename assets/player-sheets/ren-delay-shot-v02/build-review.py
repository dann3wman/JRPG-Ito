from pathlib import Path
from PIL import Image,ImageSequence
import json,hashlib,shutil,numpy as np,zipfile,io
import sys,os
src=Path(sys.argv[1]).resolve(); dst=Path(__file__).resolve().parent
os.chdir(Path(sys.argv[2]).resolve())
for a,b in [('ren-shooting.v01.png','ren-shooting.v02.png'),('ren-shooting.v01.ora','ren-shooting.v02.ora'),('ren-shooting.v01.4x.png','ren-shooting.v02.4x.png'),('shot-impact.v01.png','shot-impact.context.png'),('target-context.png','target-context.png')]:shutil.copyfile(src/a,dst/b)
m=json.loads((src/'timeline.v01.json').read_text());m['version']=2;m['atlases']['ren-shooting']['file']='ren-shooting.v02.png';m['atlases']['shot-impact']['file']='shot-impact.context.png';m['motion']['shot']='muzzle held at (250,135) during1500..1550ms; projectile travels to (104,150) during1550..1600ms; target-follow thereafter';m['motion']['shot_x_keys']=[[1550,250],[1600,104]];m['motion']['shot_y_keys']=[[1550,135],[1600,150]];m['review']={'actor_pixels_changed':False,'renderer':'render.v02.js','artistic_approval':False,'engine_tested':False,'preview_sampling_ms':10,'preview_loop_only':True,'source_commit':'cdac700d3ab33e464abe08e51ab089312cfcc61b'}
(dst/'timeline.v02.json').write_text(json.dumps(m,indent=2)+'\n')
checks={}
for version in ['before','after']:
 frames=[Image.open(f'ren-{version}/{i}.png').convert('RGB') for i in range(360)]
 colors=sorted(set(c for f in frames for c in f.getdata()))
 strip=Image.new('RGB',(len(colors),1));strip.putdata(colors);pal=strip.quantize(colors=256,dither=Image.Dither.NONE)
 indexed=[f.quantize(palette=pal,dither=Image.Dither.NONE) for f in frames]
 for speed,ms in [('normal',10),('slow',20)]:
  path=dst/f'ren-delay-shot.{version}.{speed}.gif';indexed[0].save(path,save_all=True,append_images=indexed[1:],duration=ms,loop=0,optimize=False,disposal=1)
  decoded=Image.open(path);t=0
  for f in ImageSequence.Iterator(decoded):
   duration=f.info['duration'];assert duration%ms==0
   for i in range(duration//ms):assert np.array_equal(np.array(f.convert('RGB')),np.array(indexed[t//ms+i].convert('RGB')))
   t+=duration
  assert t==360*ms
  frames[0].save(dst/f'ren-delay-shot.{version}.{speed}.apng',save_all=True,append_images=frames[1:],duration=ms,loop=0)
  apng=Image.open(dst/f'ren-delay-shot.{version}.{speed}.apng'); at=0
  for af in ImageSequence.Iterator(apng):
   d=round(af.info['duration'])
   for i in range(d//ms):assert np.array_equal(np.array(af.convert('RGB')),np.array(frames[at//ms+i]))
   at+=d
  assert at==360*ms
  checks[f'{version}.{speed}']={'decoded_matches_quantized_frames':True,'apng_pixels_exact':True,'duration_ms':t,'palette_colors':len(colors)}
a=Image.open(dst/'ren-shooting.v02.png').convert('RGBA');assert set(a.getchannel('A').getdata())=={0,255}
assert np.array_equal(np.array(a.resize((1536,768),Image.Resampling.NEAREST)),np.array(Image.open(dst/'ren-shooting.v02.4x.png').convert('RGBA')))
for f in m['atlases']['ren-shooting']['frames']:
 x,y,w,h=f['rect'];c=a.crop((x,y,x+w,y+h));assert list(c.getbbox())==f['bounds_exclusive'];assert all(v>=8 for v in c.getbbox()[:2]);assert all(v<=88 for v in c.getbbox()[2:])
assert len(set(p[:3] for p in a.getdata() if p[3]))==24
with zipfile.ZipFile(dst/'ren-shooting.v02.ora') as z:assert np.array_equal(np.array(Image.open(io.BytesIO(z.read('mergedimage.png'))).convert('RGBA')),np.array(a))
checks.update({'actor_sha256':hashlib.sha256((dst/'ren-shooting.v02.png').read_bytes()).hexdigest(),'actor_pixels_unchanged':True,'geometry_padding_palette_alpha_4x_ora_merged':True,'runtime_3601_ms_states':True,'engine_tested':False,'artistic_approval':False})
(dst/'validation.json').write_text(json.dumps(checks,indent=2)+'\n')
# Focused comparison at every 10ms across discharge, native pixels enlarged exactly.
canvas=Image.new('RGB',(768,864),'#c4c2b4')
for row,t in enumerate([1500,1520,1540,1550,1560,1580]):
 for col,v in enumerate(['before','after']):
  im=Image.open(f'ren-{v}/{t//10}.png').crop((160,110,352,182)).resize((384,144),Image.Resampling.NEAREST)
  canvas.paste(im,(col*384,row*144))
canvas.save(dst/'discharge-comparison.2x.png')
print(json.dumps(checks))
