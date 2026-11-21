from pathlib import Path
from PIL import Image
import numpy as np,json,zipfile,io,sys,xml.etree.ElementTree as E
p=Path(sys.argv[1]);o=Path(__file__).parent
im=Image.open(p/'fuyori-throw.v01.png').convert('RGBA');a=np.array(im);b=a.copy()
points=[(i%4*96+x,i//4*96+85) for i,xs in [(4,range(41,55)),(5,range(43,46)),(6,range(52,54))] for x in xs]
for x,y in points:assert b[y,x,3]==255;b[y,x]=0
assert np.count_nonzero(np.any(a!=b,axis=2))==19
fixed=Image.fromarray(b);fixed.save(o/'fuyori-throw.v02.png');fixed.resize((1536,768),Image.Resampling.NEAREST).save(o/'fuyori-throw.v02.4x.png')
with zipfile.ZipFile(p/'fuyori-throw.v01.ora') as z,zipfile.ZipFile(o/'fuyori-throw.v02.ora','w') as w:
 for name in z.namelist():
  data=z.read(name)
  if name.endswith('.png'):
   layer=Image.open(io.BytesIO(data)).convert('RGBA')
   if layer.size==(384,192):
    for x,y in points:layer.putpixel((x,y),(0,0,0,0))
    buf=io.BytesIO();layer.save(buf,format='PNG');data=buf.getvalue()
   elif 'thumbnail' in name:
    layer=fixed.copy();layer.thumbnail(layer.size);buf=io.BytesIO();layer.save(buf,format='PNG');data=buf.getvalue()
  w.writestr(name,data)
with zipfile.ZipFile(o/'fuyori-throw.v02.ora') as z:
 merged=Image.new('RGBA',im.size)
 for l in reversed(E.fromstring(z.read('stack.xml')).findall('.//layer')):merged.alpha_composite(Image.open(io.BytesIO(z.read(l.get('src')))).convert('RGBA'))
 assert merged.tobytes()==fixed.tobytes()
m=json.load(open(p/'timeline.v01.json'));m['atlases']['fuyori-throw']['file']='fuyori-throw.v02.png'
(o/'timeline.v02.json').write_text(json.dumps(m,indent=2)+'\n')
for variant,sheet in [('before',im),('after',fixed)]:
 frames=[]
 for t in m['actor_track']:
  i=t['frame'];c=sheet.crop((i%4*96,i//4*96,i%4*96+96,i//4*96+96));bg=Image.new('RGBA',(96,96),(58,65,72,255));bg.alpha_composite(c);frames.append(bg.convert('RGB').resize((384,384),Image.Resampling.NEAREST))
 for speed,factor in [('normal',1),('slow',2)]:
  path=o/f'fuyori.{variant}.{speed}.gif';ds=[t['ms']*factor for t in m['actor_track']];frames[0].save(path,save_all=True,append_images=frames[1:],duration=ds,loop=0,disposal=2,optimize=False)
  with Image.open(path) as gif:
   for i,frame in enumerate(frames):gif.seek(i);assert gif.info['duration']==ds[i];assert gif.convert('RGB').tobytes()==frame.tobytes()
for i,f in enumerate(m['atlases']['fuyori-throw']['frames']):
 x,y,w,h=f['rect'];assert list(fixed.crop((x,y,x+w,y+h)).getbbox())==f['bounds_exclusive']
(o/'correction-validation.json').write_text(json.dumps({'changed_pixels':19,'removed_atlas_xy':points,'all_other_pixels_unchanged':True,'ora_recomposition':True,'bounds_unchanged':True,'decoded_previews_exact':True,'timing_changed':False,'playback_approval':False},indent=2)+'\n')
