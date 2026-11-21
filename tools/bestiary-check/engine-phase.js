#!/usr/bin/env node
const assert=require('node:assert/strict');
const {loadBattle}=require('../lib/load-game');
function setup(hp=2500,phase='p1',count=0){
 const B=loadBattle({seed:17});B.run(`cfg.enc='engine';G={party:ORDER.map(makePC),active:['ren','natsu','hisui'],enemies:[],log:[],fx:{},pending:[],hum:25,void:{ct:null},melody:false};const e=makeFoe('engine');G.enemies.push(e);e.hp=${hp};e.phase='${phase}';e.count=${count};e.plan={skill:'stomp',rule:'Phase 1',ttype:'random',target:byId('ren')};`);return B;
}
const B=setup();console.log('Boundary preview:',B.run('planText(e)'));assert.match(B.run('planText(e)'),/action will be chosen when it acts/);
let cases=0;
for(const [hp,phase,pending] of [[2501,'p1',false],[2500,'p1',true],[2499,'p1',true],[2499,'p2',false]]){
 const B=setup(hp,phase),snap=B.run('JSON.stringify(G)');B.ctx.__rand=()=>{throw Error('preview rolled RNG');};
 assert.equal(B.run('planName(e)'),pending?'Phase change':'Stomp');assert.equal(B.run('JSON.stringify(G)'),snap);
 B.run('e.sleep=1');assert.equal(B.run('planName(e)'),'Asleep');assert.match(B.run('planText(e)'),/^Next: Asleep/);cases++;
}
// Preserve the current execution-time replan cadence, including its count+1 lookup.
for(const [count,expected] of [[0,'trample'],[1,'resonate'],[2,'trample']]){
 const B=setup(2500,'p1',count);B.ctx.__rand=()=>.99;B.run('execScripted(e)');assert.equal(B.run('e.last'),expected);assert.equal(B.run('e.phase'),'p2');assert.doesNotMatch(B.run('planText(e)'),/action will be chosen/);cases++;
}
for(const phase of ['p1','p2']){
 const B=setup(phase==='p1'?2501:2499,phase);B.run('e.ct=40;pushEnemy(e,2)');assert.equal(B.run('e.ct'),64);B.run('pushEnemy(e,2)');assert.ok(B.run('e.broken')>0);cases++;
}
const C=setup(2501);C.run('e.plan=null');assert.equal(C.run('planText(e)'),'');
for(const skill of ['stomp','trample','resonate']){C.run(`e.plan={skill:'${skill}',target:null}`);assert.match(C.run('planText(e)'),new RegExp(C.get('SCRIPTS').engine.skills[skill].name));}
console.log(`Engine warning: ${cases} boundary, cadence and Delay/Break cases plus sleep and fallback checks passed.`);
