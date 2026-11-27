const fs=require('fs'),path=require('path');
const {createCanvas,loadImage}=require('@napi-rs/canvas');
const api=require('./render.js'),P=__dirname;
(async()=>{
const m=JSON.parse(fs.readFileSync(path.join(P,'timeline.v01.json')));
const names={actor:'fuyori-mixing.v01.png',fx:'mix-vapour.v01.png'},images={};
for(const [k,v]of Object.entries(names))images[k]=await loadImage(path.join(P,v));
const r=api.create(createCanvas,images,m),out=createCanvas(1536,864),native=createCanvas(384,216);
const dest=process.argv[2]||path.join(P,'frames');fs.mkdirSync(dest,{recursive:true});
for(let i=0;i<216;i++){r.render(out,i*1000/60);fs.writeFileSync(path.join(dest,`${String(i).padStart(4,'0')}.png`),out.toBuffer('image/png'));}
for(const bg of ['light','dark']){r.render(out,1860,bg);fs.writeFileSync(path.join(P,`scene.${bg}.v01.png`),out.toBuffer('image/png'));}
r.render(native,1860,'dark',true);fs.writeFileSync(path.join(P,'scene.pixel-native.v01.png'),native.toBuffer('image/png'));
r.render(out,1860,'dark',true);fs.writeFileSync(path.join(P,'scene.pixel-4x.v01.png'),out.toBuffer('image/png'));
let html=fs.readFileSync(path.join(P,'player.template.html'),'utf8');
html=html.replace('/*RENDERER*/',fs.readFileSync(path.join(P,'render.js'),'utf8')).replace('/*METADATA*/',JSON.stringify(m));
for(const[k,v]of Object.entries(names))html=html.replace(`__${k.toUpperCase()}__`,'data:image/png;base64,'+fs.readFileSync(path.join(P,v)).toString('base64'));
fs.writeFileSync(path.join(P,'fuyori-mix.v01.html'),html);
console.log('Exported 216 frames at 60 fps, two backgrounds, pixel-only checks and self-contained player.');
})();
