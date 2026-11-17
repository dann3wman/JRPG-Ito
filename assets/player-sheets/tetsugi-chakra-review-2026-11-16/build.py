from PIL import Image,ImageDraw
from pathlib import Path
import json,hashlib,numpy as np,zipfile,io
p=Path(__file__).parent;s=p.parents[1]/'party-fx/tetsugi-chakra-v01'
m=json.loads((s/'timeline.v01.json').read_text());im=Image.open(s/'tetsugi-breath.v01.png').convert('RGBA');a=np.array(im);frames=[]
for e in m['actor_track']:
 i=e['frame'];cel=im.crop((i%4*96,i//4*96,i%4*96+96,i//4*96+96))
 c=Image.new('RGB',(384,414),'#77858c');c.paste(cel.resize((384,384),Image.Resampling.NEAREST),(0,0),cel.resize((384,384),Image.Resampling.NEAREST));ImageDraw.Draw(c).text((10,392),f'Tetsugi Chakra | TC{i+1:02d}',fill='white');frames.append(c)
for name,mult in [('normal',1),('slow',2)]:
 frames[0].save(p/f'chakra.{name}.gif',save_all=True,append_images=frames[1:],duration=[e['ms']*mult for e in m['actor_track']],loop=0,disposal=2,optimize=False)
 g=Image.open(p/f'chakra.{name}.gif');assert g.n_frames==9
 for i,f in enumerate(frames):
  g.seek(i);assert g.info['duration']==m['actor_track'][i]['ms']*mult;assert np.array_equal(np.array(g.convert('RGB')),np.array(f))
for i,f in enumerate(m['atlases']['tetsugi-breath']['frames']):
 x,y,w,h=f['rect'];cel=im.crop((x,y,x+w,y+h));assert list(cel.getbbox())==f['bounds_exclusive'];b=cel.getbbox();assert min(b[:2])>=8 and max(b[2:])<=88
 assert np.array_equal(np.array(cel)[81:89],a[81:89,:96])
assert set(np.unique(a[:,:,3]))=={0,255}
with zipfile.ZipFile(s/'tetsugi-breath.v01.ora') as z:
 c=Image.new('RGBA',im.size)
 for n in ['data/layer3.png','data/layer2.png','data/layer1.png']:c=Image.alpha_composite(c,Image.open(io.BytesIO(z.read(n))))
 assert np.array_equal(np.array(c),a)
r={'source_sha256':hashlib.sha256((s/'tetsugi-breath.v01.png').read_bytes()).hexdigest(),'changed_pixels':0,'frame_count':8,'geometry':[384,192,96,96,4,2],'sequence_duration_ms':3600,'gif_durations_ms':[3600,7200],'decoded_gif_pixels_exact':True,'binary_alpha':True,'safe_bounds':True,'fixed_shoe_strip':True,'ora_composite_exact':True,'artistic_pass':False}
(p/'validation.json').write_text(json.dumps(r,indent=2)+'\n');print(r)
(p/'timing.json').write_text(json.dumps({'atlas':m['atlases']['tetsugi-breath'],'actor_track':m['actor_track'],'loop':False,'duration_ms':3600,'assumptions':[],'preview_loop_only':True},indent=2)+'\n')
