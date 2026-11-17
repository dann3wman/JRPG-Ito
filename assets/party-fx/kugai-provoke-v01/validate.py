from pathlib import Path
from PIL import Image, ImageSequence
import numpy as np,json,zipfile,io,hashlib,subprocess,sys
P=Path(__file__).resolve().parent;F=Path(sys.argv[1]);m=json.loads((P/'timeline.v01.json').read_text());results={}
for name in ['kugai-provoke-actor','provoke-pressure']:
 spec=m['atlases'][name];im=Image.open(P/spec['file']).convert('RGBA');a=np.array(im)
 assert list(im.size)==spec['size'];assert set(np.unique(a[:,:,3]))=={0,255}
 colours={'#%02X%02X%02X'%tuple(x) for x in a[a[:,:,3]>0,:3]};assert colours<=set(spec['palette'])
 for i,f in enumerate(spec['frames']):
  x,y,w,h=f['rect'];assert (x,y)==((i%4)*w,(i//4)*h)
  c=im.crop((x,y,x+w,y+h));box=c.getbbox();assert list(box)==f['bounds_exclusive'];assert box[0]>=8 and box[1]>=8 and box[2]<=w-8 and box[3]<=h-8
  assert f['pivot']==([48,86] if w==96 else [64,64])
 enlarged=Image.open(P/f'{name}.v01.4x.png');assert np.array_equal(np.array(enlarged),np.repeat(np.repeat(a,4,0),4,1))
 with zipfile.ZipFile(P/f'{name}.v01.ora') as z:
  assert z.read('mimetype')==b'image/openraster';composite=Image.new('RGBA',im.size)
  for j in [3,2,1]:composite.alpha_composite(Image.open(io.BytesIO(z.read(f'data/layer{j}.png'))).convert('RGBA'))
  assert np.array_equal(np.array(composite),a);assert np.array_equal(np.array(Image.open(io.BytesIO(z.read('mergedimage.png')))),a)
 results[name]={'dimensions':list(im.size),'frames':8,'colours':len(colours),'binary_alpha':True,'bounds_and_anchors':True,'exact_4x':True,'ora_recomposes_exactly':True}
actor=Image.open(P/'kugai-provoke-actor.v01.png');boots=[]
for f in m['atlases']['kugai-provoke-actor']['frames']:
 x,y,w,h=f['rect'];boots.append(np.array(actor.crop((x+34,y+81,x+64,y+89))))
assert all(np.array_equal(boots[0],b)for b in boots)
for a,b in [('review.v01.png','review.v01.4x.png'),('scene.pixel-native.v01.png','scene.pixel-4x.v01.png')]:
 native=np.array(Image.open(P/a));assert np.array_equal(np.array(Image.open(P/b)),np.repeat(np.repeat(native,4,0),4,1))
# APNG may merge identical holds. Expand the rational durations back to render slots.
im=Image.open(P/'kugai-provoke.v01.apng');total=0;render_index=0
for frame in ImageSequence.Iterator(im):
 duration=frame.info['duration'];total+=duration;count=round(duration*60/1000);assert abs(count*1000/60-duration)<.001
 arr=np.array(frame.convert('RGBA'))
 for j in range(count):
  assert np.array_equal(arr,np.array(Image.open(F/f'{render_index:04d}.png').convert('RGBA')));render_index+=1
assert render_index==180 and abs(total-3000)<.001
assert np.array_equal(np.array(Image.open(F/'0000.png')),np.array(Image.open(F/'0179.png')))
gif=Image.open(P/'kugai-provoke.v01.gif');gif_ms=sum(f.info['duration'] for f in ImageSequence.Iterator(gif));assert gif_ms==3000
video=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(P/'kugai-provoke.v01.mp4')]))['streams'][0];assert video['nb_frames']=='180' and video['r_frame_rate']=='60/1' and float(video['duration'])==3.0
subprocess.run(['ffmpeg','-v','error','-i',str(P/'kugai-provoke.v01.mp4'),'-f','null','-'],check=True)
results.update({'planted_boot_strip_exact':True,'review_and_scene_exact_4x':True,'apng':{'decoded_frames':im.n_frames,'expanded_render_slots':180,'duration_ms':total,'all_rgba_matches_renderer':True,'num_plays':im.info.get('loop')},'gif':{'decoded_frames':gif.n_frames,'duration_ms':gif_ms,'role':'quantised 2x viewing derivative; not palette authority'},'mp4':{'decoded_frames':180,'fps':60,'duration_ms':3000},'terminal_matches_initial_pixels':True,'runtime':json.loads((P/'runtime-validation.json').read_text()),'visual_review':{'complete_continuous_review':False,'live_playback':'GIMP GIF playback started at 1x and 0.5x; live screenshot samples observed; complete continuous review not established','light_dark_stills_reviewed':True,'ora_reopened_programmatically':True,'artistically_approved':False,'engine_tested':False},'status':'built and technically checked; incomplete visual review; draft','missing_formats':[]})
m['status']['technically_checked']=True
(P/'timeline.v01.json').write_text(json.dumps(m,indent=2)+'\n')
html=P/'kugai-provoke.v01.html'
html.write_text(html.read_text().replace('\"technically_checked\":false','\"technically_checked\":true'))
results['rendered_layers']=json.loads((P/'render-validation.json').read_text())
results['sha256']={str(p.relative_to(P)):hashlib.sha256(p.read_bytes()).hexdigest()for p in sorted(P.rglob('*'))if p.is_file() and p.name not in ['validation.v01.json']}
(P/'validation.v01.json').write_text(json.dumps(results,indent=2)+'\n');print(json.dumps({k:v for k,v in results.items()if k not in ['sha256']},indent=2))
