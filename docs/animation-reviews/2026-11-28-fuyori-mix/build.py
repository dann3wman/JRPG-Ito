from pathlib import Path
from PIL import Image,ImageDraw
import json,hashlib,sys,numpy as np
s=Path(sys.argv[1]); o=Path(__file__).resolve().parent
im=Image.open(s/'fuyori-mixing.v01.png').convert('RGBA'); t=json.loads((s/'timeline.v01.json').read_text())
f=[im.crop((i%4*96,i//4*96,i%4*96+96,i//4*96+96)) for i in range(8)]
seq=[]
for step in t['actor_track']:
 b=Image.new('RGBA',(96,96),'#384048');b.alpha_composite(f[step['frame']]);seq.append(b.convert('RGB').resize((384,384),Image.Resampling.NEAREST))
for label,mul in [('normal',1),('slow',2)]:
 p=o/f'mix.{label}.gif';seq[0].save(p,save_all=True,append_images=seq[1:],duration=[x['ms']*mul for x in t['actor_track']],loop=0,disposal=2,optimize=False)
 with Image.open(p) as g:
  assert g.n_frames==9
  for i,x in enumerate(seq):g.seek(i);assert np.array_equal(np.array(g.convert('RGB')),np.array(x));assert g.info['duration']==t['actor_track'][i]['ms']*mul
canvas=Image.new('RGB',(768,432),'#384048');d=ImageDraw.Draw(canvas)
for i,x in enumerate(f):
 b=Image.new('RGBA',(96,96),'#384048');b.alpha_composite(x);pos=(i%4*192,i//4*216+20);canvas.paste(b.convert('RGB').resize((192,192),Image.Resampling.NEAREST),pos);d.text((pos[0]+4,pos[1]-16),f'FM{i+1:02}',fill='white')
canvas.save(o/'frames.2x.png')
a=np.array(im);bounds=[x.getbbox() for x in f];assert im.size==(384,192);assert set(np.unique(a[:,:,3]))=={0,255};assert all(x>=8 and y>=8 and r<=88 and b<=88 for x,y,r,b in bounds)
j={'source_sha256':hashlib.sha256((s/'fuyori-mixing.v01.png').read_bytes()).hexdigest(),'size':[384,192],'cell':[96,96],'bounds':bounds,'opaque_colors':len(set(map(tuple,a[a[:,:,3]>0]))),'binary_alpha':True,'decoded_previews_exact':True,'duration_ms':3600,'slow_duration_ms':7200,'sprite_edits':False,'artistic_approval':False,'engine_tested':False}
(o/'validation.json').write_text(json.dumps(j,indent=2)+'\n');(o/'timing.json').write_text(json.dumps({'atlas':t['atlases']['fuyori-mixing'],'actor_track':t['actor_track'],'loop':False,'duration_ms':3600,'timing_assumptions':[],'preview_loop_only':True},indent=2)+'\n');print(j)
