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
for src in source_cells('tetsugi-breath.generated.png'):
    out=Image.new('RGBA',(96,96));out.paste(src.resize((60,80),NN),(18,11));actor.append(out)
actor,pal_actor=palette_map(actor,24)
for im in actor[1:]:im.paste(actor[0].crop((0,81,96,89)),(0,81))
fx=[]
for src in source_cells('chakra-feathers.generated.png'):
    out=Image.new('RGBA',(128,128));out.paste(src.resize((84,112),NN),(22,8));fx.append(out)
fx,pal_fx=palette_map(fx,16)
for name,cells,n in [('tetsugi-breath',actor,96),('chakra-feathers',fx,128)]:
    im=pack(cells,n);im.save(P/f'{name}.v01.png');im.resize((im.width*4,im.height*4),NN).save(P/f'{name}.v01.4x.png');ora(f'{name}.v01.ora',im)
review=Image.new('RGBA',(552,552),'#20262c');d=ImageDraw.Draw(review);font=ImageFont.load_default()
def text(x,y,s):
    mask=Image.new('1',(540,14));ImageDraw.Draw(mask).text((0,0),s,font=font,fill=1);review.paste('#ddd8cf',(x,y),mask)
text(8,4,'TETSUGI CHAKRA V01 / BREATH AND FEATHER KEYS')
for cells,n,oy,prefix in [(actor,96,24,'TC'),(fx,128,256,'CF')]:
    for i,c in enumerate(cells):
        x=8+(i%4)*136;y=oy+(i//4)*(n+16)
        d.rectangle((x-1,y-1,x+n,y+n),outline='#777777');review.alpha_composite(c,(x,y));text(x,y+n+2,f'{prefix}{i+1:02d}')
review.save(P/'review.v01.png');review.resize((2208,2208),NN).save(P/'review.v01.4x.png')
meta={'action':'Tetsugi: Chakra','version':1,'duration_ms':3600,'fps':60,'loop':False,'terminal':'effects hidden; actor at original guard','scene':{'native':[384,216],'output':[1536,864],'origin':'top-left','baseline':180,'safe_bounds_inclusive':[8,8,375,207],'actor_feet':[236,180],'effect_pivot':[236,140],'facing':'left'},'atlases':{},'actor_track':[{'frame':f,'ms':ms} for f,ms in [(0,240),(1,200),(2,200),(3,600),(4,480),(5,240),(6,200),(7,200),(0,1240)]],'effect_track':[{'frame':i,'ms':ms} for i,ms in enumerate([160,160,200,440,200,200,240,240])],'effect_start_ms':640,'effect_hide_ms':2480,'cues':[{'name':'gather','ms':640},{'name':'heal','ms':1600},{'name':'effect_clear','ms':2480},{'name':'action_complete','ms':3600}],'gameplay_events':'One visual self-heal cue. No HP/Stress mutation; existing Chakra rules unchanged.','motion':{'caster':'fixed feet; eight drawn keys, nine exposures; no runtime actor transform','effect_y_keys':[[0,140],[1600,140],[1840,138],[2240,126],[2480,120],[3600,120]],'interpolation':'smoothstep, round native pixel coordinates'},'layers':[{'name':'background','resolution':[384,216],'alpha':'opaque','blend':'source-over','filter':'nearest','preview_scale':4},{'name':'rear light','resolution':[768,432],'alpha':'continuous','blend':'source-over','filter':'linear','preview_scale':2},{'name':'rear feathers, actor, front feathers','resolution':[384,216],'alpha':[0,255],'blend':'source-over','filter':'nearest','preview_scale':4},{'name':'foreground healing light','resolution':[768,432],'alpha':'continuous','blend':'screen','filter':'linear','preview_scale':2}],'status':{'specified':True,'generated_built':True,'exported':True,'technically_checked':False,'artistically_approved':False,'engine_tested':False}}
for name,cells,n,palette,prefix in [('tetsugi-breath',actor,96,pal_actor,'TC'),('chakra-feathers',fx,128,pal_fx,'CF')]:
    meta['atlases'][name]={'file':name+'.v01.png','size':[n*4,n*2],'cell':[n,n],'columns':4,'rows':2,'gutter':0,'outer_margin':0,'safe_bounds_inclusive':[8,8,n-9,n-9],'palette':palette,'alpha':[0,255],'frames':[{'id':f'{prefix}{i+1:02d}','row':i//4+1,'column':i%4+1,'rect':[i%4*n,i//4*n,n,n],'pivot':[48,87] if n==96 else [64,64],'bounds_exclusive':im.getbbox()} for i,im in enumerate(cells)]}
(P/'timeline.v01.json').write_text(json.dumps(meta,indent=2)+'\n')
print('Built eight new actor and eight new feather drawings with layered sources.')
