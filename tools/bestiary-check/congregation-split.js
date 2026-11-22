#!/usr/bin/env node
const assert=require('node:assert/strict');
const {loadBattle}=require('../lib/load-game');
function setup(hp=1700,phase='p1'){
 const B=loadBattle({seed:17});B.run(`cfg.enc='congregation';G={party:ORDER.map(makePC),active:['kiri','natsu','hisui'],enemies:[],log:[],fx:{},pending:[],hum:20,void:{ct:null},melody:false};const e=makeFoe('congregation');G.enemies.push(e);SCRIPTS.congregation.init(e);e.hp=${hp};e.phase='${phase}';e.plan={skill:'verdict',rule:'Every turn',ttype:'random',target:byId('kiri')};`);return B;
}
const B=setup();console.log('Boundary preview:',B.run('planText(e)'));assert.match(B.run('planText(e)'),/action will be chosen when it acts/);
let cases=0;
for(const [hp,phase,pending] of [[1701,'p1',false],[1700,'p1',true],[1699,'p1',true],[1699,'p2',false]]){
 const B=setup(hp,phase),snap=B.run('JSON.stringify(G)');B.ctx.__rand=()=>{throw Error('preview rolled RNG');};
 assert.equal(B.run('planName(e)'),pending?'Phase change':'Verdict');assert.equal(B.run('JSON.stringify(G)'),snap);
 B.run('e.sleep=1');assert.equal(B.run('planName(e)'),'Asleep');assert.match(B.run('planText(e)'),/^Next: Asleep/);cases++;
}
for(const roll of [.01,.99]){
 const B=setup();B.ctx.__rand=()=>roll;B.run('execScripted(e)');assert.equal(B.run('e.last'),roll<.5?'verdict':'murmur');assert.equal(B.run('G.enemies.length'),3);assert.equal(B.run('new Set(G.enemies.map(f=>f.stare)).size'),3);assert.doesNotMatch(B.run('planText(e)'),/action will be chosen/);
 // Spawned Faces start p2 at full HP; their existing p1 replan must also be disclosed.
 B.run('const f=G.enemies[1]');assert.match(B.run('planText(f)'),/action will be chosen/);B.run('execScripted(f)');assert.equal(B.run('G.enemies.length'),3);assert.doesNotMatch(B.run('planText(f)'),/action will be chosen/);
 assert.equal(B.run("SCRIPTS.congregation.onDamage(f,100,{attacker:byId(f.stare)})"),0);
 assert.equal(B.run("SCRIPTS.congregation.onDamage(f,100,{attacker:actives().find(a=>a.id!==f.stare)})"),100);cases++;
}
const C=setup(1701);C.run('e.plan=null');assert.equal(C.run('planText(e)'),'');
C.run("e.plan={skill:'murmur',target:null}");assert.equal(C.run('planText(e)'),'Next: Murmur → all');
C.run("SCRIPTS.congregation.onDamage(e,100,{attacker:byId('kiri'),crit:true})");assert.equal(C.run('e.stare'),'kiri');
console.log(`Congregation warning: ${cases} boundary/split cases plus spawned Faces, stare, sleep and fallback passed.`);
