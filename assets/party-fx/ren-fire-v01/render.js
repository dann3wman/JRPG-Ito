(function(root){
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=u=>{u=clamp(u);return u*u*(3-2*u);};
const keys=(t,k)=>{for(let i=1;i<k.length;i++)if(t<k[i][0])return k[i-1][1]+(k[i][1]-k[i-1][1])*ease((t-k[i-1][0])/(k[i][0]-k[i-1][0]));return k.at(-1)[1];};
const track=(t,items,start=0)=>{t-=start;if(t<0)return -1;for(const e of items){if(t<e.ms)return e.frame;t-=e.ms;}return -1;};
const env=(t,a,b,c,d)=>t<a||t>=d?0:t<b?ease((t-a)/(b-a)):t<c?1:1-ease((t-c)/(d-c));

function state(t,m){t=clamp(t,0,m.duration_ms);return {t,pose:Math.max(0,track(t,m.actor_track)),fx:track(t,m.effect_track,m.effect_start_ms),ax:Math.round(keys(t,m.motion.actor_x_keys)),tx:Math.round(keys(t,m.motion.target_x_keys)),ex:Math.round(t<1000?keys(t,m.motion.effect_x_keys):keys(t,m.motion.target_x_keys)+12),flash:env(t,1000,1040,1120,1320),phase:t<500?'PREPARE':t<1000?'CAST':t<1320?'CONTACT':t<2000?'RESIDUE':'RECOVERY'};}
function create(make,images,m){const px=make(384,216),light=make(768,432),back=make(384,216);
function sprite(c,img,n,i,x,y,pv){c.drawImage(img,i%4*n,Math.floor(i/4)*n,n,n,Math.round(x-pv[0]),Math.round(y-pv[1]),n,n);}
function render(out,t,bg='dark',pixelOnly=false){let s=state(t,m),p=px.getContext('2d'),l=light.getContext('2d'),b=back.getContext('2d'),o=out.getContext('2d');
b.fillStyle=bg==='light'?'#C4C2B4':'#101D26';b.fillRect(0,0,384,216);b.fillStyle=bg==='light'?'#B5B4AB':'#14242B';b.fillRect(0,183,384,33);
p.clearRect(0,0,384,216);p.imageSmoothingEnabled=false;p.fillStyle=bg==='light'?'#8D8D86':'#0B151C';p.fillRect(88,180,32,3);p.fillRect(264,180,32,3);p.drawImage(images.target,s.tx-32,123);
sprite(p,images.actor,96,s.pose,s.ax,180,[48,86]);
if(s.fx>=0)sprite(p,images.fx,128,s.fx,s.ex,139,[64,64]);
l.clearRect(0,0,768,432);l.save();l.scale(2,2);function glow(x,y,r,a){if(a<=0)return;let g=l.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,207,122,${a})`);g.addColorStop(.4,`rgba(181,78,34,${a*.3})`);g.addColorStop(1,'rgba(50,40,50,0)');l.fillStyle=g;l.fillRect(x-r,y-r,r*2,r*2);}
glow(s.tx+12,139,32,s.flash*.55);glow(254,139,22,env(t,450,600,800,1000)*.3);l.restore();
o.clearRect(0,0,out.width,out.height);o.imageSmoothingEnabled=false;o.drawImage(back,0,0,out.width,out.height);if(!pixelOnly){o.imageSmoothingEnabled=true;o.drawImage(light,0,0,out.width,out.height);}o.imageSmoothingEnabled=false;o.drawImage(px,0,0,out.width,out.height);if(!pixelOnly&&s.flash){o.save();o.globalCompositeOperation='screen';o.globalAlpha=.22*s.flash;o.imageSmoothingEnabled=true;o.drawImage(light,0,0,out.width,out.height);o.restore();}
if(!pixelOnly){o.save();o.scale(out.width/384,out.height/216);o.fillStyle=bg==='light'?'#302B31':'#CFC5BD';o.font='6px monospace';o.textAlign='center';o.fillText('TARGET / PLACEHOLDER',104,204);o.fillText('REN / FIRE',280,204);o.restore();}return s;}
return {render,state:t=>state(t,m),pixelLayer:px,lightLayer:light};}
  class Playback {
    constructor(meta){this.meta=meta;this.reset();}
    reset(){this.time=0;this.playing=false;this.history=[];this.armed=new Set(this.meta.cues.map(c=>c.name));}
    replay(){this.reset();this.playing=true;}
    seek(t){this.time=clamp(t,0,this.meta.duration_ms);for(const c of this.meta.cues)if(c.ms<=this.time)this.armed.delete(c.name);}
    tick(ms){if(!this.playing)return [];let prev=this.time;this.time=clamp(prev+ms,0,this.meta.duration_ms);const fired=[];for(const c of this.meta.cues)if(c.ms>prev&&c.ms<=this.time&&this.armed.has(c.name)){this.armed.delete(c.name);this.history.push(c.name);fired.push(c.name);}if(this.time===this.meta.duration_ms)this.playing=false;return fired;}
  }
const api={create,state,Playback};if(typeof module!=='undefined')module.exports=api;else root.RenFire=api;
})(typeof window!=='undefined'?window:globalThis);