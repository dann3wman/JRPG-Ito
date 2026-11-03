/* Natsu / Cure. Choreography prototype. Pixel actors + smooth light layers. */
(function(){
'use strict';
const W=384,H=216,S=4,TOTAL=4100;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const mix=(a,b,u)=>a+(b-a)*u;
const beats=[['Ready',0,450],['Prayer',450,1000],['Halo awakens',1000,1400],['Light gathers',1400,2000],['Cure',2000,2400],['A face returns',2400,2880],['The halo remembers',2880,3350],['Ready',3350,4100]];
const cues=[{name:'halo_awaken',time_ms:1000},{name:'heal',time_ms:2000},{name:'face_added',time_ms:2880},{name:'effect_clear',time_ms:3350}];
const atlas=new Image(),ally=new Image();
const pixels=document.createElement('canvas');pixels.width=W;pixels.height=H;const p=pixels.getContext('2d');
const sprite=document.createElement('canvas');sprite.width=64;sprite.height=64;const a=sprite.getContext('2d');
let loaded=false;
function state(t){t=clamp(t,0,TOTAL);let pose=t<450?0:t<1000?1:t<2880?2:t<3350?3:0;return {t,pose,phase:beats.find(b=>t>=b[1]&&t<b[2])?.[0]||'Ready',x:266,y:166+(t>=2880&&t<3200?1:0),targetX:120,targetY:166,healed:t>=2000,haloFaces:t>=2880?4:3,active:t>=450&&t<3350};}
function drawActor(ctx,img,id,cols,x,y,flash=0){a.clearRect(0,0,64,64);a.imageSmoothingEnabled=false;a.drawImage(img,id%cols*64,Math.floor(id/cols)*64,64,64,0,0,64,64);if(flash){a.globalCompositeOperation='source-atop';a.fillStyle=`rgba(239,247,218,${flash})`;a.fillRect(0,0,64,64);a.globalCompositeOperation='source-over';}ctx.imageSmoothingEnabled=false;ctx.drawImage(sprite,Math.round(x-32),Math.round(y-56));}
function stroke(ctx,pts,col,width=1,alpha=1,blur=0){if(pts.length<2)return;ctx.save();ctx.strokeStyle=col;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.globalAlpha=alpha;ctx.shadowColor=col;ctx.shadowBlur=blur*S;ctx.beginPath();ctx.moveTo(...pts[0]);pts.slice(1).forEach(v=>ctx.lineTo(...v));ctx.stroke();ctx.restore();}
function glow(c,x,y,r,color,alpha){if(alpha<=0)return;const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${color},${alpha})`);g.addColorStop(.35,`rgba(${color},${alpha*.5})`);g.addColorStop(1,`rgba(${color},0)`);c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
function ring(c,x,y,rx,ry,col,alpha,width=1){let pts=[];for(let i=0;i<=64;i++){let q=i*Math.PI/32;pts.push([x+Math.cos(q)*rx,y+Math.sin(q)*ry]);}stroke(c,pts,col,width,alpha,3);}
function face(ctx,x,y,opacity=1){const pattern=['.11111.','1222221','1202021','1222221','.12021.','.12221.','..111..'];const colors={1:'#34313c',2:'#e4dcc1',0:'#413846'};ctx.save();ctx.globalAlpha=opacity;pattern.forEach((row,j)=>[...row].forEach((ch,i)=>{if(ch!=='.'){ctx.fillStyle=colors[ch];ctx.fillRect(Math.round(x)+i,Math.round(y)+j,1,1);}}));ctx.restore();}
function background(ctx,light){ctx.fillStyle=light?'#a9aca0':'#101e25';ctx.fillRect(0,0,W,H);ctx.fillStyle=light?'#8c998e':'#183039';ctx.fillRect(0,38,W,100);for(let k=0;k<6;k++){let x=k*75-20;ctx.fillStyle=light?'#a0aa9b':'#21404a';ctx.fillRect(x,47,49,81);ctx.fillStyle=light?'#76887e':'#122a34';ctx.fillRect(x+9,56,31,71);ctx.fillStyle=light?'#81968a':'#2a4852';ctx.fillRect(x-2,129,53,4);}ctx.fillStyle=light?'#bfc5b2':'#2c4248';ctx.fillRect(0,138,W,58);ctx.fillStyle=light?'#aab7a4':'#40555a';ctx.fillRect(0,138,W,2);ctx.strokeStyle=light?'#99ab98':'#1c343d';ctx.lineWidth=1;for(let y=149;y<196;y+=14){ctx.beginPath();ctx.moveTo(0,y+.5);ctx.lineTo(W,y+.5);ctx.stroke();for(let x=y%3*12;x<W;x+=53){ctx.beginPath();ctx.moveTo(x+.5,y);ctx.lineTo(x+6.5,y+14);ctx.stroke();}}ctx.fillStyle=light?'#c8cebc':'#132a33';ctx.fillRect(0,196,W,20);}
function draw(canvas,t,light=false){if(!loaded)return;const st=state(t),c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,canvas.width,canvas.height);p.clearRect(0,0,W,H);background(p,light);
 const dim=t>=450&&t<3350?.18*Math.min(clamp((t-450)/400),clamp((3350-t)/500)):0;p.fillStyle=`rgba(6,13,18,${dim})`;p.fillRect(0,38,W,158);
 p.fillStyle=light?'#899a88':'#142a30';for(const x of [120,266]){p.beginPath();p.ellipse(x,167,17,3,0,0,7);p.fill();}
 const recovery=clamp((t-2000)/300),targetY=t<2000?168:Math.round(168-2*recovery);
 drawActor(p,ally,t<2000?4:0,3,120,targetY,t>=2000&&t<2180?.35*(1-(t-2000)/180):0);
 drawActor(p,atlas,st.pose,2,266,st.y);
 // The new face is a persistent change for the remainder of this invocation.
 if(st.haloFaces===4){p.save();p.globalAlpha=clamp((t-2880)/120);p.fillStyle='#a79c7e';p.fillRect(271,132,6,1);p.fillRect(273,130,1,5);p.restore();face(p,275,131,clamp((t-2880)/120));}
 if(t>=2430&&t<2880){let u=clamp((t-2430)/450);face(p,mix(122,275,u),mix(125,131,u)-Math.sin(u*Math.PI)*34,.6);}
 p.fillStyle='#122026';p.fillRect(103,176,35,4);p.fillStyle=t<2000?'#a47b6e':'#b1c69a';p.fillRect(104,177,Math.round(mix(10,29,recovery)),2);
 c.imageSmoothingEnabled=false;c.drawImage(pixels,0,0,W*S,H*S);c.save();c.scale(S,S);
 // A soft halo gathers around the crown while the pixel character stays still.
 if(t>=450&&t<3350){let u=clamp((t-450)/550),fade=clamp((3350-t)/550);glow(c,266,128,28,'231,220,179',u*fade*.32);if(t<1500)ring(c,266,128,15+u*5,15+u*5,'#e6d7ad',u*clamp((1500-t)/250)*.32,.6);}
 // Two distinct streams lead from the hands to the ally, never as an attack beam.
 if(t>=1000&&t<1640){let u=clamp((t-1000)/640);for(let k=0;k<2;k++){let pts=[];let end=clamp(u*1.65),start=Math.max(0,end-.28);for(let i=0;i<=24;i++){let q=mix(start,end,i/24);pts.push([mix(250,120,q),mix(139,138,q)-Math.sin(q*Math.PI)*(17+k*12)]);}stroke(c,pts,k?'#a7c5b6':'#f4e8c6',k?.7:1.1,Math.sin(u*Math.PI)*.65,4);}}
 // Layered rings ascend and narrow to gather around the injury.
 if(t>=1350&&t<2530){let u=clamp((t-1350)/650),fade=clamp((2530-t)/350);glow(c,120,139,43,'180,213,184',u*fade*.27);for(let k=0;k<3;k++){let q=clamp((t-1350-k*120)/600);let y=mix(166,153-k*17,q);ring(c,120,y,mix(9,25-k*3,q),4.2,'#dce8bf',q*fade*.62,1);}
  for(let k=0;k<24;k++){let offset=k*67,age=(t-1350+offset)%1000,q=age/1000,x=120+Math.sin(k*2.4)*24*(1-q*.4),y=167-q*73;glow(c,x,y,2.1,'239,233,197',Math.sin(q*Math.PI)*u*fade*.6);}
 }
 if(t>=1860&&t<2430){let u=clamp((t-1860)/570),alpha=Math.sin(u*Math.PI);glow(c,120,138,49,'240,241,207',alpha*.55);for(let k=0;k<4;k++){let x=105+k*10;stroke(c,[[x,166],[x+2,106]],'#f0ebc9',1.4,alpha*.16,5);}if(t>=2000){let q=clamp((t-2000)/330);ring(c,120,145,9+q*31,4+q*7,'#fff1cc',(1-q)*.85,1.5);}}
 // After the aid, an echo travels back toward the gap in the halo.
 if(t>=2400&&t<2880){let u=clamp((t-2400)/480),pts=[];for(let i=0;i<28;i++){let q=mix(Math.max(0,u-.18),u,i/27);pts.push([mix(125,278,q),mix(128,134,q)-Math.sin(q*Math.PI)*34]);}stroke(c,pts,'#b9c3bc',.6,Math.sin(u*Math.PI)*.45,3);glow(c,mix(125,278,u),mix(128,134,u)-Math.sin(u*Math.PI)*34,8,'210,207,182',Math.sin(u*Math.PI)*.24);}
 if(t>=2880&&t<3350){let fade=1-(t-2880)/470;glow(c,278,134,15,'222,192,168',fade*.35);}
 c.fillStyle=light?'#2b3b39':'#d9ddcf';c.font='8px monospace';c.fillText('THE HUMMING CRYSTAL',12,17);c.fillStyle=light?'#46594c':'#94aaa7';c.font='6px monospace';c.fillText('NATSU / CURE / MOTION STUDY 01',12,29);c.textAlign='right';c.fillText('PLACEHOLDER ACTORS',372,17);c.textAlign='left';c.font='7px monospace';c.fillStyle=light?'#2b3b39':'#d9ddcf';c.fillText(st.phase.toUpperCase(),12,208);c.textAlign='right';c.fillText((t/1000).toFixed(2)+' s',372,208);c.textAlign='left';c.fillStyle=light?'#788f72':'#7f9c86';c.fillRect(0,214,W*clamp(t/TOTAL),2);c.restore();return st;
}
const ready=Promise.all([new Promise(resolve=>{atlas.onload=resolve;atlas.src=window.NATSU_POSES||'poses.png';}),new Promise(resolve=>{ally.onload=resolve;ally.src=window.ALLY_POSES||'ally_poses.png';})]).then(()=>{loaded=true;});
window.NatsuCure={ready,draw,state,total:TOTAL,beats,cues};
})();
