from PIL import Image, ImageDraw
from pathlib import Path
import json,hashlib,zipfile,io,sys
import numpy as np
p=Path(__file__).parent
src=Image.open(p/'source.v01.png').convert('RGBA');a=np.array(src);b=a.copy()
# Visually confirmed detached dark fringe in KD03, not a casting particle.
b[64,256]=[0,0,0,0]
out=Image.fromarray(b);out.save(p/'kuro-casting.v02.png');out.resize((1536,768),Image.Resampling.NEAREST).save(p/'kuro-casting.v02.4x.png')
m=json.loads((p/'timing.json').read_text());track=m['actor_track'];frames=[]
for e in track:
 i=e['frame'];box=(i%4*96,i//4*96,i%4*96+96,i//4*96+96)
 c=Image.new('RGB',(768,414),'#77858c');d=ImageDraw.Draw(c)
 for j,im in enumerate([src,out]):
  cel=im.crop(box).resize((384,384),Image.Resampling.NEAREST);c.paste(cel,(j*384,0),cel)
 d.text((12,390),'BEFORE v01                 AFTER v02 | KD%02d'%(i+1),fill='white');frames.append(c)
for speed,mult in [('normal',1),('slow',2)]:
 frames[0].save(p/f'casting.before-after.{speed}.gif',save_all=True,append_images=frames[1:],duration=[e['ms']*mult for e in track],loop=0,disposal=2,optimize=False)
assert np.sum(np.any(a!=b,axis=2))==1
assert set(map(tuple,b[b[:,:,3]>0,:3]))==set(map(tuple,a[a[:,:,3]>0,:3]))
assert set(np.unique(b[:,:,3]))=={0,255}
checks={'source_sha256':hashlib.sha256((p/'source.v01.png').read_bytes()).hexdigest(),'output_sha256':hashlib.sha256((p/'kuro-casting.v02.png').read_bytes()).hexdigest(),'changed_pixels':1,'edit':{'cell':'KD03','local_xy':[64,64],'atlas_xy':[256,64],'before':a[64,256].tolist(),'after':b[64,256].tolist()},'unchanged_other_pixels':True,'palette_unchanged':True,'binary_alpha':True,'geometry':[384,192,96,96,4,2],'timing_unchanged_ms':sum(e['ms'] for e in track),'production_pass':False}
for speed,mult in [('normal',1),('slow',2)]:
 gif=Image.open(p/f'casting.before-after.{speed}.gif');total=0
 for i in range(gif.n_frames):gif.seek(i);total+=gif.info['duration']
 assert total==3400*mult
 assert gif.n_frames==len(frames)
 for i,expected in enumerate(frames):
  gif.seek(i);assert np.array_equal(np.array(gif.convert('RGB')),np.array(expected))
checks['preview_durations_ms']=[3400,6800]
(p/'validation.json').write_text(json.dumps(checks,indent=2)+'\n');print(json.dumps(checks))
# Preserve existing editable ORA layers and remove the exact pixel from each layer.
if len(sys.argv)>1:
 with zipfile.ZipFile(sys.argv[1]) as z, zipfile.ZipFile(p/'kuro-casting.v02.ora','w') as o:
  for n in z.namelist():
   data=z.read(n)
   if n.endswith('.png') and (n.startswith('data/') or n=='mergedimage.png'):
    im=Image.open(io.BytesIO(data)).convert('RGBA')
    if im.size==src.size:im.putpixel((256,64),(0,0,0,0));buf=io.BytesIO();im.save(buf,format='PNG');data=buf.getvalue()
   o.writestr(n,data)

# Verify import rectangles, padding, fixed feet and editable merged image.
for i,f in enumerate(m['atlas']['frames']):
 x,y,w,h=f['rect'];cel=out.crop((x,y,x+w,y+h))
 assert cel.getbbox()==tuple(f['bounds_exclusive'])
 bx0,by0,bx1,by1=cel.getbbox();assert bx0>=8 and by0>=8 and bx1<=88 and by1<=88
 assert np.array_equal(np.array(cel)[85:87],b[85:87,0:96])
assert np.array_equal(np.array(out.resize((1536,768),Image.Resampling.NEAREST)),np.array(Image.open(p/'kuro-casting.v02.4x.png')))
with zipfile.ZipFile(p/'kuro-casting.v02.ora') as z:
 assert np.array_equal(np.array(Image.open(io.BytesIO(z.read('mergedimage.png'))).convert('RGBA')),b)
 composite=Image.new('RGBA',src.size)
 for n in ['data/layer3.png','data/layer2.png','data/layer1.png']:
  composite=Image.alpha_composite(composite,Image.open(io.BytesIO(z.read(n))).convert('RGBA'))
 assert np.array_equal(np.array(composite),b)
checks['ora_layer_composite_matches']=True
checks.update({'all_frame_bounds_match_metadata':True,'safe_padding':True,'fixed_contact_rows_85_86':True,'nearest_neighbor_4x_exact':True,'ora_merged_image_matches':True,'decoded_gif_frames_exact':True})
(p/'validation.json').write_text(json.dumps(checks,indent=2)+'\n')
