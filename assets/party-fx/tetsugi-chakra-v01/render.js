/* Chakra renderer shared by player and exports. Native pixel art and authored light stay separate. */
(function(root){
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=u=>{u=clamp(u);return u*u*(3-2*u);};
const keys=(t,k)=>{for(let i=1;i<k.length;i++)if(t<k[i][0])return k[i-1][1]+(k[i][1]-k[i-1][1])*ease((t-k[i-1][0])/(k[i][0]-k[i-1][0]));return k.at(-1)[1];};
const track=(t,items,start=0)=>{t-=start;if(t<0)return -1;for(const e of items){if(t<e.ms)return e.frame;t-=e.ms;}return -1;};
const env=(t,a,b,c,d)=>t<a||t>=d?0:t<b?ease((t-a)/(b-a)):t<c?1:1-ease((t-c)/(d-c));
function state(t,m){t=clamp(t,0,m.duration_ms);return {t,pose:Math.max(0,track(t,m.actor_track)),fx:track(t,m.effect_track,m.effect_start_ms),fy:Math.round(keys(t,m.motion.effect_y_keys)),heal:env(t,1600,1660,1720,1960),phase:t<640?'INHALE':t<1600?'GATHER':t<1840?'STITCH CLOSED':t<2480?'EXHALE':'RECOVERY'};}
function create(makeCanvas,images,m){
 const px=makeCanvas(384,216),light=makeCanvas(768,432),back=makeCanvas(384,216);
 function sprite(c,img,n,i,x,y,pivot){c.drawImage(img,(i%4)*n,Math.floor(i/4)*n,n,n,Math.round(x-pivot[0]),Math.round(y-pivot[1]),n,n);}
 function render(out,t,bg='dark',pixelOnly=false){
 const s=state(t,m),p=px.getContext('2d'),l=light.getContext('2d'),b=back.getContext('2d'),o=out.getContext('2d');
 b.fillStyle=bg==='light'?'#C4C2B4':'#101D26';b.fillRect(0,0,384,216);b.fillStyle=bg==='light'?'#B5B4AB':'#14242B';b.fillRect(0,183,384,33);b.fillStyle=bg==='light'?'#A5A59D':'#203039';b.fillRect(16,183,352,1);
 p.clearRect(0,0,384,216);p.imageSmoothingEnabled=false;p.fillStyle=bg==='light'?'#8D8D86':'#0B151C';p.fillRect(220,180,32,3);
 // Rear upper vanes surround the head without obscuring gesture. One source cel,
 // split at its horizontal midline, keeps the front/back seam registered exactly.
 if(s.fx>=0){p.save();p.beginPath();p.rect(0,0,384,s.fy);p.clip();sprite(p,images.fx,128,s.fx,236,s.fy,[64,64]);p.restore();}
 sprite(p,images.actor,96,s.pose,236,180,[48,87]);
 if(s.fx>=0){p.save();p.beginPath();p.rect(0,s.fy,384,216-s.fy);p.clip();sprite(p,images.fx,128,s.fx,236,s.fy,[64,64]);p.restore();}
 // Two lifted down fragments are crops of CF07, not unrelated procedural lines.
 if(t>=1900&&t<2440){const u=(t-1900)/540;for(let i=0;i<2;i++){const x=Math.round(236+(i?1:-1)*(18+16*ease(u))),y=Math.round(146-32*ease(u));p.drawImage(images.fx,2*128+68,128+18,12,20,x,y,12,20);}}
 l.clearRect(0,0,768,432);l.save();l.scale(2,2);
 function glow(x,y,r,a){if(a<=0)return;const g=l.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(233,217,177,${a})`);g.addColorStop(.4,`rgba(171,153,126,${a*.4})`);g.addColorStop(1,'rgba(98,82,74,0)');l.fillStyle=g;l.fillRect(x-r,y-r,r*2,r*2);}
 glow(236,140,52,env(t,440,1080,1600,2480)*.18);
 // Six low light motes travel inward with staggered starts. No randomness/shake.
 for(let j=0;j<6;j++){const start=640+j*55,end=1600,u=clamp((t-start)/(end-start));if(t>=start&&t<end){let a=j*Math.PI/3,r=42*(1-ease(u));glow(236+Math.cos(a)*r,140+Math.sin(a)*r*.8,4,Math.sin(Math.PI*u)*.55);}}
 glow(236,139,32,s.heal*.48);l.restore();
 o.clearRect(0,0,out.width,out.height);o.imageSmoothingEnabled=false;o.drawImage(back,0,0,out.width,out.height);
 if(!pixelOnly){o.imageSmoothingEnabled=true;o.drawImage(light,0,0,out.width,out.height);}
 o.imageSmoothingEnabled=false;o.drawImage(px,0,0,out.width,out.height);
 if(!pixelOnly&&s.heal){o.save();o.globalCompositeOperation='screen';o.globalAlpha=.25*s.heal;o.imageSmoothingEnabled=true;o.drawImage(light,0,0,out.width,out.height);o.restore();}
 if(!pixelOnly){o.save();o.scale(out.width/384,out.height/216);o.font='7px monospace';o.textAlign='center';o.fillStyle=bg==='light'?'#34313C':'#CDC3B5';o.fillText('TETSUGI / CHAKRA',236,204);o.restore();}
 return s;}
 return {render,state:t=>state(t,m),pixelLayer:px,lightLayer:light};}
  class Playback {
    constructor(meta){this.meta=meta;this.reset();}
    reset(){this.time=0;this.playing=false;this.history=[];this.armed=new Set(this.meta.cues.map(c=>c.name));}
    replay(){this.reset();this.playing=true;}
    seek(t){this.time=clamp(t,0,this.meta.duration_ms);for(const c of this.meta.cues)if(c.ms<=this.time)this.armed.delete(c.name);}
    tick(ms){if(!this.playing)return [];let prev=this.time;this.time=clamp(prev+ms,0,this.meta.duration_ms);const fired=[];for(const c of this.meta.cues)if(c.ms>prev&&c.ms<=this.time&&this.armed.has(c.name)){this.armed.delete(c.name);this.history.push(c.name);fired.push(c.name);}if(this.time===this.meta.duration_ms)this.playing=false;return fired;}
  }
const api={create,state,Playback};if(typeof module!=='undefined')module.exports=api;else root.TetsugiChakra=api;
})(typeof window!=='undefined'?window:globalThis);
