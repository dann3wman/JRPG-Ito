#!/usr/bin/env node
const assert = require('node:assert/strict');
const {loadBattle}=require('../lib/load-game');
function setup(hp=1900,humming=0,count=0,phase='p1'){
 const B=loadBattle({seed:17});B.run(`cfg.enc='taste';G={party:ORDER.map(makePC),active:['kuro','sayo','kiri'],enemies:[],log:[],fx:{},pending:[],hum:20,void:{ct:null},melody:false};const e=makeFoe('taste');G.enemies.push(e);e.hp=${hp};e.phase='${phase}';e.count=${count};for(let i=0;i<4;i++){const x=makeFoe('sleeper');x.parentId=e.id;x.awake=i<${humming}?0:2;G.enemies.push(x);}e.plan={skill:'note',rule:'Otherwise',ttype:'all',target:null};`);return B;
}
const R=setup();assert.equal(R.run('planName(e)'),'Phase change');R.ctx.__rand=()=>.1;R.run('execScripted(e)');assert.equal(R.run('e.last'),'kirisong');
let cases=0;
for(const phase of ['p1','p2'])for(const hp of [1709,1710,1711,1899,1900,1901])for(const humming of [0,1,4]){
 const B=setup(hp,humming,0,phase);const projected=Math.min(3800,hp+Math.round(3800*.05*humming));const changed=(projected<=1900?'p2':'p1')!==phase;
 const state=B.run('JSON.stringify(G)');B.ctx.__rand=()=>{throw Error('preview RNG');};assert.equal(B.run('planName(e)'),changed?'Phase change':'Village Note');assert.equal(B.run('planText(e)').includes('action will be chosen'),changed);assert.equal(B.run('JSON.stringify(G)'),state);
 B.ctx.__rand=()=>.1;B.run('execScripted(e)');assert.equal(B.run('e.phase'),projected<=1900?'p2':'p1');assert.equal(B.run('e.hp'),projected);cases++;
}
const M=setup();M.run('G.melody=true;execScripted(e)');assert.equal(M.run('sleepers().every(x=>x.awake===1)'),true);
const P=setup();P.run('sleepers()[0].awake=Infinity;execScripted(e)');assert.equal(P.run('sleepers()[0].awake'),Infinity);assert.equal(P.run('sleepers()[1].awake'),0);
const S=setup();S.run('e.sleep=1');assert.equal(S.run('planName(e)'),'Asleep');S.run('execScripted(e)');assert.equal(S.run('e.count'),0);
const N=setup(2000);N.run('e.plan=null');assert.equal(N.run('planText(e)'),'');
console.log(`Taste warning: ${cases} healing/phase boundaries plus real replacement, Counter-Melody, permanent wake, sleep, empty-plan and purity checks passed.`);
