"""Reproducible isolated Lullaby action. Python 3 + Pillow + ffmpeg."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, math, hashlib, base64, io, subprocess
ROOT=Path(__file__).resolve().parent
REPO=ROOT.parents[2]
SOURCE=REPO/'tools/party-sprite-viewer/kiri.sheet.webp'
NATIVE=(320,180); TOTAL=3200; STEP=40
COLORS=['#17141c','#756d80','#b6afa2','#e4d9bd','#f5ead2','#803d49']
TRACK=[('idle1',0,320),('limit1',320,720),('limit2',720,1520),('limit3',1520,2320),('limit2',2320,2560),('limit1',2560,2800),('idle1',2800,3200)]
POSES=['idle1','limit1','limit2','limit3']; INDICES=[0,27,28,29]
source=Image.open(SOURCE).convert('RGBA')
poses=[source.crop((i%6*96,i//6*96,i%6*96+96,i//6*96+96)) for i in INDICES]
atlas=Image.new('RGBA',(384,96))
for i,p in enumerate(poses):atlas.paste(p,(i*96,0))
atlas.save(ROOT/'actors.png');atlas.resize((1536,384),Image.Resampling.NEAREST).save(ROOT/'actors-4x.png')
def line(d,pts,c,w=1):d.line([(round(x),round(y)) for x,y in pts],fill=c,width=w)
def fx_frame(i):
 im=Image.new('RGBA',(256,128));d=ImageDraw.Draw(im)
 # Twenty-four authored states; arrival at frame12, still web frames14-18.
 progress=min(1,(i+1)/13); phase=min(i,14)
 for lane,(tx,ty) in enumerate([(82,86),(139,91)]):
  ty+=round(max(0,min(1,(i-12)/4))*3)
  pts=[]
  for k in range(81):
   u=k/80
   if u>progress:break
   x=218+(tx-218)*u;y=80+(ty-80)*u-math.sin(u*math.pi)*18+math.sin(u*math.pi*5+phase*.24+lane)*2
   pts.append((x,y))
  for k in range(1,len(pts)):
   if i>=19 and (k//5+i)%5 < i-18:continue
   line(d,[pts[k-1],pts[k]],COLORS[2 if i>=19 else 3])
  if i>=10 and i<23:
   # Tight off-centre curl at each receiver, never a full-screen flash.
   points=[]
   for k in range(41):
    a=k/40*math.pi*2.5;r=8*(1-k/50)
    points.append((tx+math.cos(a)*r,ty+math.sin(a)*r*.65))
   for k in range(1,len(points)):
    if i>=19 and k%4<i-18:continue
    line(d,points[k-1:k+1],COLORS[3 if i<19 else 1])
 if i<19:
  for j in range(3):
   x=210-j*7;y=68-j*5-(phase%3)
   d.point((x,y),fill=COLORS[4]);d.point((x+1,y),fill=COLORS[2])
 # A restrained dried-red cost mark stays on Kiri's side of the web.
 if 12<=i<20:line(d,[(225,92),(228,95),(225,98)],COLORS[5])
 return im
fx=[fx_frame(i) for i in range(24)]; sheet=Image.new('RGBA',(2048,384))
for i,f in enumerate(fx):sheet.paste(f,(i%8*256,i//8*128))
sheet.save(ROOT/'threads.png');sheet.resize((8192,1536),Image.Resampling.NEAREST).save(ROOT/'threads-4x.png')
font=ImageFont.load_default_imagefont()
review=Image.new('RGB',(1064,888),'#20262c');rd=ImageDraw.Draw(review)
for i,f in enumerate(fx):
 x=8+(i%4)*264;y=24+(i//4)*144;review.paste(f,(x,y),f);rd.rectangle((x-1,y-1,x+256,y+128),outline='#777777');rd.text((x,y+130),f'LT{i+1:02d} 80ms',fill='#e4d9bd',font=font)
rd.text((8,6),'LULLABY THREADS / 24 STATES',fill='white',font=font)
review.resize((4256,3552),Image.Resampling.NEAREST).save(ROOT/'threads-review-4x.png')
def state(t):
 t=max(0,min(TOTAL,t));pose=next((n for n,a,b in TRACK if a<=t<b),'idle1')
 return {'pose':pose,'fx':int((t-560)//80) if 560<=t<2480 else None,'relief':max(0,min(1,(t-1520)/320)),'time':t}
def scene(t,bg='#101d26'):
 s=state(t);im=Image.new('RGBA',NATIVE,bg);d=ImageDraw.Draw(im)
 light=bg=='#c4c2b4';ink='#3d4549' if light else '#53616b'
 # Abstract rear wall, quiet combat field; not a new commissioned background.
 d.line((16,157,304,157),fill=ink);d.line((16,159,304,159),fill=ink)
 for x,y in [(114,146),(171,151)]:
  relax=round(s['relief']*3);d.ellipse((x-14,y-3,x+14,y+2),fill='#17202a')
  d.polygon([(x-10,y-3),(x-8,y-25+relax),(x,y-31+relax),(x+8,y-25+relax),(x+10,y-3)],fill='#756d80',outline='#17141c')
  d.ellipse((x-5,y-41+relax,x+5,y-31+relax),fill='#b6afa2',outline='#17141c')
  # Brow tension lines resolve, showing relief without damage/heal numbers.
  if s['relief']<1:d.line((x-9,y-45,x-5,y-47),fill='#803d49');d.line((x+5,y-47,x+9,y-45),fill='#803d49')
  else:d.line((x-3,y-36+relax,x+3,y-36+relax),fill='#17141c')
 p=poses[POSES.index(s['pose'])];im.alpha_composite(p,(216,60)) # pivot (48,88) at (264,148)
 if s['fx'] is not None:im.alpha_composite(fx[s['fx']],(32,24))
 return im.convert('RGB')
frames=[scene(t) for t in range(0,TOTAL,STEP)]
frames4=[f.resize((1280,720),Image.Resampling.NEAREST) for f in frames]
frames4[0].save(ROOT/'lullaby.png',save_all=True,append_images=frames4[1:],duration=STEP,loop=1,disposal=0,blend=0)
proc=subprocess.Popen(['ffmpeg','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1280x720','-r','25','-i','-','-an','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(ROOT/'lullaby.mp4')],stdin=subprocess.PIPE)
for f in frames4:proc.stdin.write(f.tobytes())
proc.stdin.close();assert proc.wait()==0
# Scene atlas is a review-only native stream used by the self-contained player.
stream=Image.new('RGB',(320*8,180*10))
for i,f in enumerate(frames):stream.paste(f,(i%8*320,i//8*180))
buf=io.BytesIO();stream.save(buf,format='PNG');data=base64.b64encode(buf.getvalue()).decode()
lightstream=Image.new('RGB',stream.size)
for i,t in enumerate(range(0,TOTAL,STEP)):lightstream.paste(scene(t,'#c4c2b4'),(i%8*320,i//8*180))
b=io.BytesIO();lightstream.save(b,format='PNG');lightdata=base64.b64encode(b.getvalue()).decode()
meta={'action':'Kiri Lullaby','version':1,'duration_ms':TOTAL,'frame_step_ms':STEP,'loop':False,'hold_last':True,'source_commit':'c1840737fef12061165ef6bb553e7bfa166b717b','source_path':str(SOURCE.relative_to(REPO)),'source_sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'scene':[320,180],'preview':[1280,720],'actor_pivot':[48,88],'actor_world_pivot':[264,148],'actor_frames':[{'id':n,'source_index':i,'rect':[j*96,0,96,96]}for j,(n,i) in enumerate(zip(POSES,INDICES))],'actor_track':[{'frame':n,'start_ms':a,'end_ms':b}for n,a,b in TRACK],'effect':{'atlas':'threads.png','size':[2048,384],'cell':[256,128],'columns':8,'rows':3,'start_ms':560,'end_ms':2480,'frame_ms':80,'world_origin':[32,24],'safe_bounds':[8,8,247,119],'frames':[{'id':f'LT{i+1:02d}','rect':[i%8*256,i//8*128,256,128]}for i in range(24)],'palette':COLORS,'alpha':[0,255],'blend':'source-over','filter':'nearest','smooth_layers':[]},'cues':[{'name':'hum_start','time_ms':560},{'name':'relief','time_ms':1520},{'name':'clear','time_ms':2480},{'name':'ready','time_ms':2800}],'mechanics':'Visual study of regular Lullaby: existing -20 other-allies Stress, +10 Danger; no gameplay state is mutated. Not the healing Limit Break.','placeholders':'Two unnamed ally mannequins; their posture lowers 3px over 320ms after relief. No enemy reaction.','drawn_vs_runtime':'Four unchanged source cels; 24 new procedural pixel effect states, runtime pose selection and ally settlement. No new Kiri drawings.'}
(ROOT/'timeline.json').write_text(json.dumps(meta,indent=2)+'\n')
template=(ROOT/'player-template.html').read_text();(ROOT/'preview.html').write_text(template.replace('__DARK__',data).replace('__LIGHT__',lightdata))
contact=Image.new('RGB',(960,360))
for j,t in enumerate([320,800,1200,1520,2080,2800]):
 f=scene(t);ImageDraw.Draw(f).text((8,8),f'{t} ms',fill='white');contact.paste(f,(j%3*320,j//3*180))
contact.resize((1920,720),Image.Resampling.NEAREST).save(ROOT/'contact.png')
checks={'source_cels_unchanged':all(poses[j].tobytes()==atlas.crop((j*96,0,j*96+96,96)).tobytes() for j in range(4)),'effect_bounds_safe':all(f.getbbox() is None or (f.getbbox()[0]>=8 and f.getbbox()[1]>=8 and f.getbbox()[2]<=248 and f.getbbox()[3]<=120) for f in fx),'effect_binary_alpha':set(sheet.getchannel('A').getdata())=={0,255},'duration_ms':TOTAL,'effect_duration_ms':24*80,'effect_cleared':state(2480)['fx'] is None,'terminal_pose':state(TOTAL)['pose'],'event_count':4,'relief_event_count':1,'exact_4x':all(f.resize(NATIVE,Image.Resampling.NEAREST).resize((1280,720),Image.Resampling.NEAREST).tobytes()==f.tobytes() for f in frames4),'engine_tested':False,'artistically_approved':False,'live_playback':'Not verified: local HTTP refused connection; cloud browser blocks file URLs. Controls tested separately in Node.'}
ap=Image.open(ROOT/'lullaby.png');checks['apng_frames']=ap.n_frames;checks['apng_duration_ms']=sum((ap.seek(i) or ap.info['duration'])for i in range(ap.n_frames));assert checks['apng_duration_ms']==TOTAL
elapsed=0
for i in range(ap.n_frames):
 ap.seek(i);duration=int(ap.info['duration'])
 for t in range(elapsed,elapsed+duration,STEP):assert ap.convert('RGB').tobytes()==frames4[t//STEP].tobytes()
 elapsed+=duration
checks['apng_decoded_pixel_exact']=True
assert checks['effect_bounds_safe'] and checks['effect_binary_alpha'] and checks['exact_4x']
(ROOT/'validation.json').write_text(json.dumps(checks,indent=2)+'\n');print(json.dumps(checks))
