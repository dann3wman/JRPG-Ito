#!/usr/bin/env node
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const D = require('../../assets/bosses/hellstar-rigs');
const S = require('../bestiary-rig-viewer/mesh-skin');
let samples = 0, clips = 0, bones = 0, minimumArea = Infinity;
const distance = (a,b) => Math.max(...a.flatMap((v,i)=>v.map((n,j)=>Math.abs(n-b[i][j]))));
for (const [id,rig] of Object.entries(D.rigs)) {
  assert.ok(fs.existsSync(path.join(__dirname,'../../assets/bosses',rig.image)), id+' source');
  const mesh = S.mesh(rig,D.grid);
  bones += rig.bones.length;
  mesh.weights.forEach(w=>assert.ok(Math.abs(w.reduce((s,v)=>s+v[1],0)-1)<1e-12));
  const rest = Object.fromEntries(rig.bones.map(b=>[b.id,{x:0,y:0,r:0,sx:1,sy:1}]));
  assert.ok(distance(S.skin(mesh,S.solve(rig,rest)),mesh.vertices)<1e-10,id+' rest placement');
  const sample = (name,t,clock=t) => S.skin(mesh,S.solve(rig,S.pose(rig,name,t,clock)));
  const duration = rig.clips.idle.duration, epsilon = .0001;
  assert.ok(distance(sample('idle',0),sample('idle',duration))<1e-9,id+' loop seam');
  const velocity = t => {
    const a=sample('idle',t-epsilon),b=sample('idle',t+epsilon);
    return b.map((v,i)=>v.map((n,j)=>(n-a[i][j])/(2*epsilon)));
  };
  assert.ok(distance(velocity(0),velocity(duration))<1e-6,id+' loop velocity');
  for (const [name,clip] of Object.entries(rig.clips)) {
    clips++;
    for (const marker of Object.values(clip.markers||{})) assert.ok(marker>=0&&marker<=clip.duration,name+' marker');
    if (name!=='idle') assert.ok(distance(sample(name,0,2.31),sample('idle',0,2.31))<1e-9,name+' entry');
    if (!clip.hold&&!clip.next) assert.ok(distance(sample(name,clip.duration,2.31),sample('idle',0,2.31))<1e-9,name+' recovery');
    for (let n=0;n<=120;n++) {
      const p=sample(name,clip.duration*n/120); samples++;
      for (const v of p) for(const x of v) assert.ok(Number.isFinite(x)&&Math.abs(x-500)<590,id+'/'+name+' framing');
      for (let j=0;j<mesh.indices.length;j+=3) {
        const [a,b,c]=mesh.indices.slice(j,j+3).map(i=>p[i]);
        const area=(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
        assert.ok(area>0,id+'/'+name+' inverted triangle');minimumArea=Math.min(minimumArea,area);
      }
    }
  }
  for (const bone of rig.bones.slice(1)) {
    const changed=structuredClone(rest);changed[bone.id].r=4;
    assert.ok(distance(S.skin(mesh,S.solve(rig,changed)),mesh.vertices)>.1,id+'/'+bone.id+' moves painted region');
  }
  assert.equal(S.opacity(rig,'defeat',rig.clips.defeat.duration),0);
  if(rig.next)assert.equal(S.opacity(rig,'transition',rig.clips.transition.duration),0);
}
console.log(`Hellstar: 3 rigs, ${bones} bones, ${clips} clips, ${samples} samples passed; minimum signed triangle area ${minimumArea.toFixed(3)}.`);
const viewer=require('../lib/load-game').loadViewer({animations:true});
const nativeRigs=viewer.get('RIGS'),nativeSolve=viewer.get('solve'),sampleNative=viewer.get('evalAnim');
let nativeSamples=0;
for(const [id,source] of Object.entries(D.rigs)){
  const rig=nativeRigs['hellstar_'+id],mesh=S.mesh(source);
  for(const [name,clip]of Object.entries(rig.anims))for(const phase of [0,1.37,4.8])for(let i=0;i<=60;i++){
    const t=clip.dur*i/60,M=nativeSolve(rig,sampleNative(rig,name,t,t+phase).P);
    const p=S.skin(mesh,source.bones.map(b=>S.mul(M[b.id],[1,0,0,1,-b.at[0],-b.at[1]])));
    for(let j=0;j<mesh.indices.length;j+=3){
      const[a,b,c]=mesh.indices.slice(j,j+3).map(n=>p[n]);
      assert.ok((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])>0,id+'/'+name+' native mesh fold');
    }
    nativeSamples++;
  }
}
console.log(`Native bestiary solver: ${nativeSamples} mesh samples passed at three idle-clock offsets.`);
