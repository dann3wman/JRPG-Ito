/* Shared deterministic renderer for the offline player and exported 60 fps footage. */
(function(root) {
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const ease=u=>{u=clamp(u);return u*u*(3-2*u);};
  const keys=(t,k)=>{for(let i=1;i<k.length;i++)if(t<k[i][0]){let u=ease((t-k[i-1][0])/(k[i][0]-k[i-1][0]));return k[i-1][1]+u*(k[i][1]-k[i-1][1]);}return k[k.length-1][1];};
  const track=(t,items,start=0)=>{t-=start;if(t<0)return -1;for(const e of items){if(t<e.ms)return e.frame;t-=e.ms;}return -1;};
  const envelope=(t,a,b,c,d)=>t<a||t>=d?0:t<b?ease((t-a)/(b-a)):t<c?1:1-ease((t-c)/(d-c));
  function state(t,m){
    t=clamp(t,0,m.duration_ms);
    const pose=track(t,m.actor_track);
    return {t,pose:pose<0?0:pose,fx:track(t,m.target_effect_track,m.target_effect_start_ms),palm:track(t,m.palm_track.durations.map((ms,i)=>({ms,frame:i})),m.palm_track.start),tx:Math.round(keys(t,m.motion.target_x_keys)),ty:Math.round(keys(t,m.motion.target_y_keys)),hit:envelope(t,1830,1845,1870,1960),phase:t<400?'PREPARATION':t<1100?'PALM WELL':t<1830?'THE ROOM OPENS':t<2430?'IMPLOSION':'RECOVERY'};
  }
  function create(makeCanvas,images,m){
    const px=makeCanvas(384,216),light=makeCanvas(768,432),back=makeCanvas(384,216),mask=makeCanvas(64,64);
    function sprite(c,img,n,i,x,y,pv){c.drawImage(img,(i%4)*n,Math.floor(i/4)*n,n,n,Math.round(x-pv[0]),Math.round(y-pv[1]),n,n);}
    function render(out,t,bg='dark',pixelOnly=false){
      const s=state(t,m),p=px.getContext('2d'),l=light.getContext('2d'),b=back.getContext('2d'),o=out.getContext('2d');
      b.fillStyle=bg==='light'?'#C4C2B4':'#101D26';b.fillRect(0,0,384,216);
      b.fillStyle=bg==='light'?'#B5B4AB':'#14242B';b.fillRect(0,183,384,33);
      b.fillStyle=bg==='light'?'#A5A59D':'#203039';b.fillRect(16,183,352,1);
      p.clearRect(0,0,384,216);p.imageSmoothingEnabled=false;
      p.globalAlpha=1;
      p.fillStyle=bg==='light'?'#8D8D86':'#0B151C';p.fillRect(90,180,28,3);p.fillRect(286,180,34,3);
      p.drawImage(images.target,s.tx-32,s.ty-57);
      if(s.hit>.3){const c=mask.getContext('2d');c.clearRect(0,0,64,64);c.drawImage(images.target,0,0);c.globalCompositeOperation='source-in';c.fillStyle='#c8b6d4';c.fillRect(0,0,64,64);c.globalCompositeOperation='source-over';p.globalAlpha=1;p.drawImage(mask,s.tx-32,s.ty-57);p.globalAlpha=1;}
      sprite(p,images.actor,96,s.pose,302,180,[48,88]);
      const hand=m.atlases['kuro-casting'].frames[s.pose].palm;
      const hx=302-48+hand[0],hy=180-88+hand[1];
      if(s.palm>=0)p.drawImage(images.palm,s.palm*48,0,48,48,hx-24,hy-36,48,48);
      // The cavity stays fixed in space; the target is expelled out of its closing rim.
      if(s.fx>=0)sprite(p,images.fx,128,s.fx,104,142,[64,64]);
      // On collapse the target emerges in front of the folds so its recoil is
      // readable at the damage cue, rather than concealed until it has settled.
      if(t>=1830&&t<2430){p.drawImage(images.target,s.tx-32,s.ty-57);if(s.hit>.3)p.drawImage(mask,s.tx-32,s.ty-57);}
      // Small authored fragments follow four deterministic inward paths. They never
      // rotate/rescale on a fractional grid and are supporting debris, not the main art.
      if(t>=1980&&t<2410){for(let i=0;i<4;i++){let u=clamp((t-1980-i*35)/325);if(u<=0||u>=1)continue;let angle=i*Math.PI/2+.3,r=26*(1-ease(u));let x=Math.round(104+Math.cos(angle)*r),y=Math.round(142+Math.sin(angle)*r);p.drawImage(images.palm,192,0,48,48,x-24,y-28);}}
      l.clearRect(0,0,768,432);l.save();l.scale(2,2);
      function glow(x,y,r,a){if(a<=0)return;const g=l.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(148,115,172,${a})`);g.addColorStop(.45,`rgba(105,82,137,${a*.45})`);g.addColorStop(1,'rgba(65,52,91,0)');l.fillStyle=g;l.fillRect(x-r,y-r,r*2,r*2);}
      glow(hx,hy-12,24,envelope(t,540,800,1100,1370)*.4);
      glow(104,142,64,envelope(t,1050,1410,1830,2470)*.34);
      // Supporting light carries smooth motion between held raster drawings.
      if(t>=980&&t<1460){let u=(t-980)/480;for(let j=0;j<3;j++){let v=clamp(u-j*.07),x=hx+(104-hx)*ease(v),y=hy-14+(142-(hy-14))*v-Math.sin(v*Math.PI)*(12+j*5);glow(x,y,10,(1-v)*.35);}}
      if(t>=1310&&t<1830){const u=(t-1310)/520;for(let j=0;j<7;j++){let angle=j*6.283/7+u*1.1,r=53-24*u;glow(104+Math.cos(angle)*r,142+Math.sin(angle)*r*.8,2.8,Math.sin(u*Math.PI)*.38);}}
      glow(104,142,48,envelope(t,1820,1845,1850,2010)*.45);
      l.restore();
      o.clearRect(0,0,out.width,out.height);o.imageSmoothingEnabled=false;o.drawImage(back,0,0,out.width,out.height);
      if(!pixelOnly){o.imageSmoothingEnabled=true;o.drawImage(light,0,0,out.width,out.height);}
      o.imageSmoothingEnabled=false;o.drawImage(px,0,0,out.width,out.height);
      // Foreground glints remain explicitly smooth, with no full-screen flash.
      if(!pixelOnly&&s.hit){o.save();o.globalCompositeOperation='screen';o.globalAlpha=.18*s.hit;o.imageSmoothingEnabled=true;o.drawImage(light,0,0,out.width,out.height);o.restore();}
      if(!pixelOnly){o.save();o.scale(out.width/384,out.height/216);o.fillStyle=bg==='light'?'#34313C':'#BEB4C9';o.font='7px monospace';o.textAlign='center';o.fillText('TRAINING TARGET / PLACEHOLDER',104,204);o.fillText('KURO',302,204);o.restore();}
      return s;
    }
    return {render,state:t=>state(t,m),pixelLayer:px,lightLayer:light};
  }
  class Playback {
    constructor(meta){this.meta=meta;this.reset();}
    reset(){this.time=0;this.playing=false;this.history=[];this.armed=new Set(this.meta.cues.map(c=>c.name));}
    replay(){this.reset();this.playing=true;}
    seek(t){this.time=clamp(t,0,this.meta.duration_ms);for(const c of this.meta.cues)if(c.ms<=this.time)this.armed.delete(c.name);}
    tick(ms){if(!this.playing)return [];let prev=this.time;this.time=clamp(prev+ms,0,this.meta.duration_ms);const fired=[];for(const c of this.meta.cues)if(c.ms>prev&&c.ms<=this.time&&this.armed.has(c.name)){this.armed.delete(c.name);this.history.push(c.name);fired.push(c.name);}if(this.time===this.meta.duration_ms)this.playing=false;return fired;}
  }
  const api={create,state,Playback};if(typeof module!=='undefined')module.exports=api;else root.KuroDark=api;
})(typeof window!=='undefined'?window:globalThis);
