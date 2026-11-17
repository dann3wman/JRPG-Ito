(function(root){
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=u=>{u=clamp(u);return u*u*(3-2*u);};
const keys=(t,k)=>{for(let i=1;i<k.length;i++)if(t<k[i][0])return k[i-1][1]+(k[i][1]-k[i-1][1])*ease((t-k[i-1][0])/(k[i][0]-k[i-1][0]));return k.at(-1)[1];};
const track=(t,items,start=0)=>{t-=start;if(t<0)return -1;for(const e of items){if(t<e.ms)return e.frame;t-=e.ms;}return -1;};
const env=(t,a,b,c,d)=>t<a||t>=d?0:t<b?ease((t-a)/(b-a)):t<c?1:1-ease((t-c)/(d-c));

function state(t,m){t=clamp(t,0,m.duration_ms);return {t,pose:Math.max(0,track(t,m.actor_track)),fx:track(t,m.effect_track,m.effect_start_ms),fxX:Math.round(keys(t,m.motion.effect_x_keys)),tx:Math.round(keys(t,[[0,104],[1040,104],[1140,108],[1400,104],[3000,104]])),flash:env(t,660,680,700,820),attention:env(t,1040,1120,1450,1720),phase:t<420?'LOAD':t<660?'RAISE AND SWING':t<800?'SHIELD CONTACT':t<1240?'DRAW ATTENTION':t<1720?'BRACE':'RECOVERY'};}
function create(make,images,m){const px=make(384,216),light=make(768,432),back=make(384,216);
function sprite(c,img,n,i,x,y,pv){c.drawImage(img,i%4*n,Math.floor(i/4)*n,n,n,Math.round(x-pv[0]),Math.round(y-pv[1]),n,n);}
function render(out,t,bg='dark',pixelOnly=false){let s=state(t,m),p=px.getContext('2d'),l=light.getContext('2d'),b=back.getContext('2d'),o=out.getContext('2d');
b.fillStyle=bg==='light'?'#C4C2B4':'#101D26';b.fillRect(0,0,384,216);b.fillStyle=bg==='light'?'#B5B4AB':'#14242B';b.fillRect(0,183,384,33);
p.clearRect(0,0,384,216);p.imageSmoothingEnabled=false;p.fillStyle=bg==='light'?'#8D8D86':'#0B151C';p.fillRect(88,180,32,3);p.fillRect(264,180,32,3);p.drawImage(images.target,s.tx-32,123);
sprite(p,images.actor,96,s.pose,280,180,[48,86]);
if(s.fx>=0){if(s.fx<2){p.drawImage(images.fx,s.fx*128,0,128,128,272,123,32,32);}else sprite(p,images.fx,128,s.fx,s.fxX,139,[64,64]);}
// The target leans toward the knight and a facing chevron locks to its head.
// This is attention, not damage: no hit flash, knockback, or invented HP change.
if(s.attention>0){let x=s.tx,y=111;p.fillStyle='#211D25';for(let j=-4;j<=4;j++)p.fillRect(x-5,y+j,11-2*Math.abs(j),1);p.fillStyle='#B6A59A';p.fillRect(x-3,y-2,4,4);}
l.clearRect(0,0,768,432);l.save();l.scale(2,2);function glow(x,y,r,a){if(a<=0)return;let g=l.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(225,216,210,${a})`);g.addColorStop(.4,`rgba(145,109,115,${a*.3})`);g.addColorStop(1,'rgba(50,40,50,0)');l.fillStyle=g;l.fillRect(x-r,y-r,r*2,r*2);}
glow(288,139,28,s.flash*.65);if(t>=800&&t<1500)glow(s.fxX,139,48,env(t,800,900,1160,1500)*.14);glow(s.tx,130,24,s.attention*.17);l.restore();
o.clearRect(0,0,out.width,out.height);o.imageSmoothingEnabled=false;o.drawImage(back,0,0,out.width,out.height);if(!pixelOnly){o.imageSmoothingEnabled=true;o.drawImage(light,0,0,out.width,out.height);}o.imageSmoothingEnabled=false;o.drawImage(px,0,0,out.width,out.height);if(!pixelOnly&&s.flash){o.save();o.globalCompositeOperation='screen';o.globalAlpha=.22*s.flash;o.imageSmoothingEnabled=true;o.drawImage(light,0,0,out.width,out.height);o.restore();}
if(!pixelOnly){o.save();o.scale(out.width/384,out.height/216);o.fillStyle=bg==='light'?'#302B31':'#CFC5BD';o.font='6px monospace';o.textAlign='center';o.fillText('TARGET / PLACEHOLDER',104,204);o.fillText('KUGAI / PROVOKE',280,204);o.restore();}return s;}
return {render,state:t=>state(t,m),pixelLayer:px,lightLayer:light};}
  class Playback {
    constructor(meta){this.meta=meta;this.reset();}
    reset(){this.time=0;this.playing=false;this.history=[];this.armed=new Set(this.meta.cues.map(c=>c.name));}
    replay(){this.reset();this.playing=true;}
    seek(t){this.time=clamp(t,0,this.meta.duration_ms);for(const c of this.meta.cues)if(c.ms<=this.time)this.armed.delete(c.name);}
    tick(ms){if(!this.playing)return [];let prev=this.time;this.time=clamp(prev+ms,0,this.meta.duration_ms);const fired=[];for(const c of this.meta.cues)if(c.ms>prev&&c.ms<=this.time&&this.armed.has(c.name)){this.armed.delete(c.name);this.history.push(c.name);fired.push(c.name);}if(this.time===this.meta.duration_ms)this.playing=false;return fired;}
  }
const api={create,state,Playback};if(typeof module!=='undefined')module.exports=api;else root.KugaiProvoke=api;
})(typeof window!=='undefined'?window:globalThis);