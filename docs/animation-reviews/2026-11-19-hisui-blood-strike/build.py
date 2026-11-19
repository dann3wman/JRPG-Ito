from pathlib import Path
from PIL import Image,ImageDraw
import json,hashlib,sys,numpy as np
p=Path(sys.argv[1]);o=Path(__file__).parent
f=p/'hisui-strike-actor.v01.png';im=Image.open(f).convert('RGBA');m=json.load(open(p/'timeline.v01.json'));a=m['atlases']['hisui-strike-actor'];cells=[]
assert im.size==(384,192)
for x in a['frames']:
 rx,ry,w,h=x['rect'];c=im.crop((rx,ry,rx+w,ry+h));assert list(c.getbbox())==x['bounds_exclusive'];assert c.getbbox()[0]>=8 and c.getbbox()[1]>=8 and c.getbbox()[2]<=88 and c.getbbox()[3]<=88;cells.append(c)
r=Image.new('RGB',(1536,816),(58,65,72));d=ImageDraw.Draw(r)
for i,c in enumerate(cells):
 v=c.resize((384,384),Image.Resampling.NEAREST);x=i%4*384;y=i//4*408;r.paste(v,(x,y),v);d.text((x+100,y+388),f'HS{i+1:02}',fill='white')
r.save(o/'hisui.frames.png')
frames=[]
for t in m['actor_track']:
 bg=Image.new('RGBA',(96,96),(58,65,72,255));bg.alpha_composite(cells[t['frame']]);frames.append(bg.convert('RGB').resize((384,384),Image.Resampling.NEAREST))
for name,factor in [('normal',1),('slow',2)]:
 durations=[x['ms']*factor for x in m['actor_track']];file=o/f'hisui.{name}.gif';frames[0].save(file,save_all=True,append_images=frames[1:],duration=durations,loop=0,disposal=2,optimize=False)
 with Image.open(file) as gif:
  assert gif.n_frames==9
  for i in range(9):
   gif.seek(i);assert gif.info['duration']==durations[i];assert np.array_equal(np.array(gif.convert('RGB')),np.array(frames[i]))
v=np.array(im);assert set(np.unique(v[:,:,3]))=={0,255}
meta={'source_sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'atlas':a,'actor_track':m['actor_track'],'loop':False,'duration_ms':3000,'cues':m['cues'],'timing_assumptions':[],'preview_note':'Actor-only fixed-pivot diagnostic; excludes world movement/effects. GIF repeats for review only.'};(o/'timing.json').write_text(json.dumps(meta,indent=2)+'\n')
(o/'validation.json').write_text(json.dumps({'source_sha256':meta['source_sha256'],'bounds_and_padding':True,'binary_alpha':True,'decoded_gif_pixels_and_timing':True,'opaque_palette_count':len(np.unique(v[v[:,:,3]>0,:3],axis=0)),'sprite_edits':False,'artistic_approval':False},indent=2)+'\n')
print(meta['source_sha256'])
