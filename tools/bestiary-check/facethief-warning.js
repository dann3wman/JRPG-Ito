#!/usr/bin/env node
const assert = require('node:assert/strict');
const {loadBattle} = require('../lib/load-game');
function setup(hp=1400, phase='p1') {
 const B=loadBattle({seed:17});
 B.run(`cfg.enc='facethief';G={party:ORDER.map(makePC),active:['kiri','natsu','tetsugi'],enemies:[],log:[],fx:{},pending:[],hum:25,void:{ct:null},melody:false};const e=makeFoe('facethief');G.enemies.push(e);e.hp=${hp};e.phase='${phase}';e.count=0;SCRIPTS.facethief.init(e);e.plan={skill:'stare',rule:'Otherwise',ttype:'random',target:byId('natsu')};`);
 return B;
}
const crossing=setup();
assert.match(crossing.run('planText(e)'), /Kiri/, 'half-health preview must disclose Kiri target');
crossing.ctx.__rand=()=>.99;
crossing.run('execScripted(e)');
assert.equal(crossing.run('byId("kiri").lost.length'),1);
assert.equal(crossing.run('(byId("natsu").lost||[]).length'),0);
let cases=0;
for(const hp of [1399,1400,1401]) for(const phase of ['p1','p2']) for(const availability of ['normal','reserve','dead','airborne','grabbed']) {
 const B=setup(hp,phase);
 if(availability==='reserve') B.run('G.active=G.active.filter(id=>id!=="kiri")');
 if(availability==='dead') B.run('byId("kiri").alive=false');
 if(availability==='airborne') B.run('byId("kiri").airborne=true');
 if(availability==='grabbed') B.run('byId("kiri").grabbed={left:2}');
 const state=B.run('JSON.stringify(G)');B.ctx.__rand=()=>{throw Error('preview RNG');};
 const pending=(hp<=1400?'p2':'p1')!==phase;
 const text=B.run('planText(e)');
 if(pending) assert.match(text, hp<=1400&&availability==='normal'?/Stare → Kiri/:/random available ally/);
 else assert.equal(text,'Next: Stare → Natsu');
 B.run('planName(e)');assert.equal(B.run('JSON.stringify(G)'),state);cases++;
}
const heal=setup();heal.run('e.hp=1401');assert.equal(heal.run('planText(e)'),'Next: Stare → Natsu');
heal.run('execScripted(e)');assert.equal(heal.run('byId("natsu").lost.length'),1);
const sleep=setup();sleep.run('e.sleep=1');assert.equal(sleep.run('planName(e)'),'Asleep');sleep.run('execScripted(e)');assert.equal(sleep.run('e.count'),0);
const empty=setup();empty.run('e.plan=null');assert.match(empty.run('planText(e)'),/Kiri/);
// Use the real healing/damage hooks to preserve the phase-two recovery gate.
crossing.run('e.hit=true;SCRIPTS.facethief.onHeal(e,byId("kiri"),byId("natsu"))');
assert.equal(crossing.run('byId("kiri").lost.length'),1);
crossing.run('G.hitKey="chakra";SCRIPTS.facethief.onHeal(e,byId("kiri"),byId("tetsugi"))');
assert.equal(crossing.run('byId("kiri").lost.length'),0);
console.log(`Face Thief: ${cases} boundary/availability previews, transition execution, healing, sleep, empty plan and Chakra recovery passed.`);
