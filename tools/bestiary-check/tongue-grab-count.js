#!/usr/bin/env node
const assert = require('node:assert/strict');
const { loadBattle } = require('../lib/load-game');
function setup(hp, phase='p1') {
  const B = loadBattle({seed:17});
  B.run(`cfg.enc='tongue2'; G={party:ORDER.map(makePC),active:['kiri','natsu','hisui'],enemies:[],log:[],fx:{},pending:[],hum:25};
    const e=makeFoe('licker'); G.enemies.push(e); SCRIPTS.licker.init(e); e.hp=${hp}; e.phase='${phase}'; e.plan=planNext(e);`);
  return B;
}
let cases=0;
for (const [hp,phase,count] of [[1501,'p1',1],[1500,'p1',2],[1499,'p2',2]]) {
  const B=setup(hp,phase);
  const snapshot=B.run('JSON.stringify({e,party:G.party})');
  const rand=B.ctx.__rand; B.ctx.__rand=()=>{throw Error('preview rolled RNG');};
  const text=B.run('planText(e)');
  assert.match(text,new RegExp(`up to ${count} ${count===1?'ally':'allies'} with the most Stress when it acts`));
  assert.equal(B.run('JSON.stringify({e,party:G.party})'),snapshot);
  B.ctx.__rand=rand;
  // Stress changes after the preview: targets remain late-bound, ignoring Provoke.
  B.run("byId('hisui').stress=60;byId('natsu').stress=40;byId('kiri').provoke=2;execScripted(e)");
  assert.equal(B.run('heldBy().length'),count);
  assert.equal(B.run('!!byId("hisui").grabbed'),true);
  assert.equal(B.run('!!byId("kiri").grabbed'),false);
  cases++;
}
for (const available of [0,1,2,3]) {
  const B=setup(1400,'p2');
  B.run(`G.active=G.active.slice(0,${available}); actives().forEach(x=>x.stress=20);`);
  assert.match(B.run('planText(e)'),/up to 2 allies/);
  B.run('execScripted(e)');
  assert.equal(B.run('heldBy().length'),Math.min(2,available));
  if(available) assert.equal(B.run('heldBy()[0].id'),'kiri'); // Stable tie order.
  cases++;
}
const B=setup(1400,'p2');
B.run("e.plan={skill:'savour',ttype:'all',target:null}");
assert.equal(B.run('planText(e)'),'Next: Savour → all');
B.run('e.sleep=1'); assert.equal(B.run('planText(e)'),'Next: Asleep (1 more of its turns)');
B.run("e.sleep=0;e.plan=null"); assert.equal(B.run('planText(e)'),'');
B.run("const w=makeFoe('widow');w.plan={skill:'undertow',target:null};");
assert.equal(B.run('planText(w)'),'Next: Undertow → whoever acts next');
console.log(`Tongue Grab count: ${cases} targeting cases passed, plus other plans and unchanged late-target fallback.`);
