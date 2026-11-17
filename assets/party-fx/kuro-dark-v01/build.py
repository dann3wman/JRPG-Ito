"""Deterministic raster cleanup, registration, packing and editable layer exports."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import numpy as np, json, io, zipfile, xml.etree.ElementTree as ET, hashlib
P=Path(__file__).resolve().parent
NN=Image.Resampling.NEAREST

def palette_map(cells, colours):
    pixels=np.concatenate([np.array(im).reshape(-1,4) for im in cells]); rgb=pixels[pixels[:,3]>0,:3]
    pal=Image.fromarray(rgb.reshape(1,-1,3)).quantize(colors=colours,method=Image.Quantize.MEDIANCUT)
    palette=pal.getpalette()[:colours*3]
    result=[]
    for im in cells:
        out=im.convert('RGB').quantize(palette=pal,dither=Image.Dither.NONE).convert('RGBA');out.putalpha(im.getchannel('A'))
        a=np.array(out);a[a[:,:,3]==0]=0;result.append(Image.fromarray(a))
    return result,['#%02X%02X%02X'%tuple(palette[i:i+3]) for i in range(0,len(palette),3)]

def source_cells(file):
    a=np.array(Image.open(P/'source'/file).convert('RGBA'))
    a[:,:,3]=np.where(a[:,:,3]>=200,255,0);a[a[:,:,3]==0]=0
    # Threshold only the generated alpha, never a colour key that would remove black cores.
    return [Image.fromarray(a[(i//4)*512:(i//4+1)*512,(i%4)*384:(i%4+1)*384]) for i in range(8)]

def pack(cells,n):
    im=Image.new('RGBA',(n*4,n*2))
    for i,c in enumerate(cells):im.paste(c,((i%4)*n,(i//4)*n))
    return im

def ora(name,im):
    a=np.array(im);lum=a[:,:,:3].mean(2)
    root=ET.Element('image',w=str(im.width),h=str(im.height),name=name);stack=ET.SubElement(root,'stack')
    layers=[]
    for label,mask in [('Highlights',lum>=100),('Midtones',(lum>=40)&(lum<100)),('Ink and cavities',lum<40)]:
        b=a.copy();b[~mask]=0;layer=Image.fromarray(b);layers.append(layer)
        ET.SubElement(stack,'layer',name=label,src=f'data/layer{len(layers)}.png',opacity='1.0',visibility='visible',x='0',y='0',**{'composite-op':'svg:src-over'})
    with zipfile.ZipFile(P/name,'w') as z:
        z.writestr('mimetype','image/openraster',compress_type=zipfile.ZIP_STORED)
        z.writestr('stack.xml',ET.tostring(root))
        for i,l in enumerate(layers):
            b=io.BytesIO();l.save(b,format='PNG');z.writestr(f'data/layer{i+1}.png',b.getvalue())
        b=io.BytesIO();im.save(b,format='PNG');z.writestr('mergedimage.png',b.getvalue())

actor=[]
for src in source_cells('kuro-casting.generated.png'):
    out=Image.new('RGBA',(96,96));out.paste(src.resize((57,76),NN),(20,21));actor.append(out)
actor,pal_actor=palette_map(actor,24)
# Feet are planted. Preserve the exact idle boot strip in all frames rather than
# allowing generated boot shading/length to oscillate under a stationary body.
for im in actor[1:]:im.paste(actor[0].crop((0,85,96,89)),(0,85))
fx=[]
for src in source_cells('dark-folds.generated.png'):
    # Source cell boundary wisps are discarded, not silently wrapped into neighbours.
    a=np.array(src);a[:4]=0;a[-4:]=0;a[:,:4]=0;a[:,-4:]=0
    out=Image.new('RGBA',(128,128));out.paste(Image.fromarray(a).resize((76,102),NN),(26,13));fx.append(out)
fx,pal_fx=palette_map(fx,16)
palm=[]
for i,size in [(0,16),(1,24),(2,32),(1,20),(7,12)]:
    p=Image.new('RGBA',(48,48));p.paste(fx[i].resize((size,size),NN),(24-size//2,36-size));palm.append(p)
palm_atlas=Image.new('RGBA',(240,48))
for i,p in enumerate(palm):palm_atlas.paste(p,(i*48,0))
for name,cells,n in [('kuro-casting',actor,96),('dark-folds',fx,128)]:
    im=pack(cells,n);im.save(P/f'{name}.v01.png');im.resize((im.width*4,im.height*4),NN).save(P/f'{name}.v01.4x.png');ora(f'{name}.v01.ora',im)
palm_atlas.save(P/'palm.v01.png')
Image.open(P.parents[2]/'tools/party-sprite-viewer/fx/training-dummy.webp').convert('RGBA').save(P/'target-context.png')
# Pixel-font review, labels outside usable cells. Pillow bitmap glyphs rendered to
# a 1-bit mask first, so no antialiased text reaches this nearest-neighbour review.
review=Image.new('RGBA',(552,552),'#20262c');d=ImageDraw.Draw(review)
font=ImageFont.load_default()
def text(x,y,s):
    mask=Image.new('1',(540,14));ImageDraw.Draw(mask).text((0,0),s,font=font,fill=1);review.paste('#ddd8cf',(x,y),mask)
text(8,4,'KURO DARK V01 / CASTING KEYS AND TARGET FOLDS')
for cells,n,oy,prefix in [(actor,96,24,'KD'),(fx,128,256,'DF')]:
    for i,c in enumerate(cells):
        x=8+(i%4)*136;y=oy+(i//4)*(n+16)
        d.rectangle((x-1,y-1,x+n,y+n),outline='#777777');review.alpha_composite(c,(x,y));text(x,y+n+2,f'{prefix}{i+1:02d}')
review.resize((2208,2208),NN).save(P/'review.v01.4x.png')
# Native review saved for exact replication verification.
review.save(P/'review.v01.png')
palms=[[38,67],[44,65],[31,57],[25,53],[24,53],[24,55],[30,59],[36,66]]
meta={'action':'Kuro: Dark','version':1,'duration_ms':3400,'fps':60,'loop':False,'terminal':'effects hidden; actors settled','scene':{'native':[384,216],'output':[1536,864],'origin':'top-left','baseline':180,'safe_bounds_inclusive':[8,8,375,207],'actor_feet':[302,180],'target_feet':[104,180],'target_effect_pivot':[104,142],'facing':'left'},'atlases':{},'actor_track':[{'frame':f,'ms':ms} for f,ms in [(0,220),(1,180),(2,140),(3,140),(4,420),(5,180),(4,400),(6,180),(7,180),(0,1360)]],'target_effect_track':[{'frame':i,'ms':ms} for i,ms in enumerate([120,140,160,360,120,140,180,160])],'target_effect_start_ms':1050,'target_effect_hide_ms':2430,'target_foreground_interval_ms':[1830,2430],'palm_track':{'start':540,'frames':[0,1,2,3,4],'durations':[100,120,340,120,100],'hide':1320},'cues':[{'name':'cast_release','ms':1100},{'name':'damage','ms':1830},{'name':'effect_clear','ms':2430},{'name':'action_complete','ms':3400}],'gameplay_events':'No battle mutation. Damage is a single preview event for future engine mapping.','motion':{'caster':'fixed feet; eight articulated drawings; no runtime pose interpolation','target_x_keys':[[0,104],[1830,104],[1900,98],[2040,101],[2320,104],[3400,104]],'target_y_keys':[[0,180],[1830,180],[1900,178],[2100,180],[3400,180]],'interpolation':'smoothstep segment, round integer for pixel layer'},'layers':[{'name':'background','resolution':[384,216],'alpha':'opaque','blend':'source-over','filter':'nearest','preview_scale':4},{'name':'rear light','resolution':[768,432],'alpha':'continuous','blend':'source-over','filter':'linear','preview_scale':2},{'name':'target, caster, palm, target folds','resolution':[384,216],'alpha':[0,255],'blend':'source-over','filter':'nearest','preview_scale':4},{'name':'foreground light','resolution':[768,432],'alpha':'continuous','blend':'screen','filter':'linear','preview_scale':2}],'status':{'specified':True,'generated_built':True,'exported':True,'technically_checked':False,'artistically_approved':False,'engine_tested':False}}
for name,cells,n,palette,prefix in [('kuro-casting',actor,96,pal_actor,'KD'),('dark-folds',fx,128,pal_fx,'DF')]:
    meta['atlases'][name]={'file':name+'.v01.png','size':[n*4,n*2],'cell':[n,n],'columns':4,'rows':2,'gutter':0,'outer_margin':0,'safe_bounds_inclusive':[8,8,n-9,n-9],'palette':palette,'alpha':[0,255],'frames':[{'id':f'{prefix}{i+1:02d}','row':i//4+1,'column':i%4+1,'rect':[i%4*n,i//4*n,n,n],'pivot':[48,88] if n==96 else [64,64],'palm':palms[i] if n==96 else None,'bounds_exclusive':im.getbbox()} for i,im in enumerate(cells)]}
meta['atlases']['palm']={'file':'palm.v01.png','size':[240,48],'cell':[48,48],'columns':5,'rows':1,'gutter':0,'outer_margin':0,'pivot':[24,36],'frames':[{'id':f'PW{i+1:02d}','rect':[i*48,0,48,48]} for i in range(5)],'source':'Derived scales of newly generated DF01/02/03/02/08, not five independently drawn keys','alpha':[0,255]}
(P/'timeline.v01.json').write_text(json.dumps(meta,indent=2)+'\n')
print('Built 8 actor keys, 8 fold keys, 5 derived palm exposures, 2 layered ORA sources.')
