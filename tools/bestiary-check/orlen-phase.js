#!/usr/bin/env node
const assert=require('node:assert/strict');
const {loadBattle}=require('../lib/load-game');
function setup(hp=1775,phase='p1') {
 const B=loadBattle({seed:17});B.run(`cfg.enc='orlen';G={party:ORDER.map(makePC),active:['kiri','natsu','hisui'],enemies:[],log:[],fx:{},pending:[],hum:20,void:{ct:null},melody:false};const e=makeFoe('orlen');G.enemies.push(e);e.hp=${hp};e.phase='${phase}';e.plan={skill:'sermon',rule:'At least one ally can hear sound attacks',ttype:'stress',target:byId('kiri')};`);return B;
}
const B=setup();console.log('Boundary preview:',B.run('planText(e)'));
assert.match(B.run('planText(e)'),/action will be chosen when it acts/);
let cases=0;
for(const [hp,phase,pending] of [[1776,'p1',false],[1775,'p1',true],[1774,'p1',true],[1775,'p2',false]]) {
 const B=setup(hp,phase),snapshot=B.run('JSON.stringify({e,party:G.party,log:G.log})');
 const rand=B.ctx.__rand;B.ctx.__rand=()=>{throw Error('preview rolled RNG');};
 if(pending){assert.equal(B.run('planName(e)'),'Phase change');assert.match(B.run('planText(e)'),/action will be chosen when it acts/);assert.doesNotMatch(B.run('planText(e)'),/Sermon.*Kiri/);}
 else {assert.equal(B.run('planName(e)'),'Sermon');assert.equal(B.run('planText(e)'),'Next: Sermon → Kiri');}
 assert.equal(B.run('JSON.stringify({e,party:G.party,log:G.log})'),snapshot);B.ctx.__rand=rand;
 B.run('e.sleep=1');assert.equal(B.run('planName(e)'),'Asleep');assert.match(B.run('planText(e)'),/^Next: Asleep/);
 cases++;
}
// The unchanged live phase replan still respects the same rule priorities.
for(const [mode,expected] of [['ordinary','crozier'],['melody','crozier'],['organ','requiem'],['no-organ','lament'],['repair','benediction']]) {
 const B=setup();B.ctx.__rand=()=>mode==='repair' ? .1 : .99;
 if(mode==='melody') B.run('G.melody=true;e.od=100');
 if(['organ','repair'].includes(mode)) B.run("const o=makeFoe('organ');G.enemies.push(o);o.hp=o.maxhp/4;");
 if(['organ','no-organ'].includes(mode)) B.run('e.od=100');
 assert.match(B.run('planText(e)'),/action will be chosen/);B.run('execScripted(e)');assert.equal(B.run('e.last'),expected);assert.equal(B.run('e.phase'),'p2');assert.doesNotMatch(B.run('planText(e)'),/action will be chosen/);cases++;
}
// Non-boundary previews retain every Orlen skill's target text and empty plans.
for(const skill of ['requiem','lament','benediction','sermon','crozier']) {
 const B=setup(1774,'p2');B.run(`e.plan={skill:'${skill}',target:null}`);
 const sk=B.get('SCRIPTS').orlen.skills[skill];assert.equal(B.run('planText(e)'),`Next: ${sk.name}${sk.target==='all'?' → all':''}`);cases++;
}
const C=setup(2000);C.run('e.plan=null');assert.equal(C.run('planText(e)'),'');assert.equal(C.run('planName(e)'),'');
console.log(`Orlen phase warning: ${cases} boundary, counterplay and fallback cases passed.`);
