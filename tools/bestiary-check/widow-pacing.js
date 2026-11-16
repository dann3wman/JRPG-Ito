#!/usr/bin/env node
// Keep the shorter Tide-Widow fight's phase lesson and counterplay executable.
const assert = require('node:assert/strict');
const { loadBattle } = require('../lib/load-game');
function setup(phase = 'p1') {
  const B = loadBattle({ seed: 17 });
  B.run(`
    cfg.enc = 'widow';
    G = { party:ORDER.map(makePC), active:['kiri','natsu','kugai'], enemies:[], log:[], fx:{}, pending:[], hum:20, melody:false, void:{ct:null} };
    const e = makeFoe('widow'); G.enemies.push(e);
    e.phase = '${phase}'; e.hp = e.maxhp * ${phase === 'p2' ? '.5' : '1'};
    G.party.forEach(p => { p.stress=0; p.ct=60; });
    function plan(skill) { e.plan = {skill, rule:e.phase==='p1' ? 'Phase 1' : 'Phase 2', ttype:SCRIPTS.widow.skills[skill].target, target:null}; }
  `);
  return B;
}
for (const [phase, stress] of [['p1',14], ['p2',28]]) {
  const B = setup(phase);
  B.run("plan('lullaby')");
  assert.equal(B.run('planText(e)'), 'Next: Lullaby → all');
  B.run('execScripted(e)');
  assert.equal(B.run("byId('kiri').stress"), stress);
  assert.equal(B.run("byId('natsu').stress"), stress);
  assert.equal(B.run("byId('kugai').stress"), 0);
  assert.equal(B.run('G.hum'), 26);
  assert.equal(B.run('e.ct'), B.run('5*tickOf(e)'));
  B.run("G.melody=true; plan('lullaby'); execScripted(e)");
  assert.equal(B.run("byId('kiri').stress"), stress);
  assert.equal(B.run('G.hum'), 26);
  assert.equal(B.run('G.melody'), false);
  B.run("byId('natsu').earplugs=5; plan('lullaby'); execScripted(e)");
  assert.equal(B.run("byId('natsu').stress"), stress + stress/2);
}
{
  const B = setup();
  B.run("e.hp=e.maxhp/2+1; plan('lullaby'); execScripted(e)");
  assert.equal(B.run('e.phase'), 'p1');
  assert.equal(B.run('G.enemies.length'), 1);
  B.run("e.hp=e.maxhp/2; plan('lullaby'); execScripted(e)");
  assert.equal(B.run('e.last'), 'release');
  assert.equal(B.run('e.phase'), 'p2');
  assert.equal(B.run("G.enemies.filter(x=>x.key==='sailor' && x.parentId===e.id).length"), 2);
  assert.equal(B.run('e.ct'), B.run('4*tickOf(e)'));
  assert.equal(B.run('G.hum'), 26, 'Release consumes the turn without an extra Lullaby');
  B.run('const sailor=G.enemies[1]; sailor.alive=false; sailor.hp=0; onFoeDown(sailor); e.sleep=3;');
  for (let turn=1; turn<=3; turn++) {
    B.run('execScripted(e)');
    assert.equal(B.run('sailor.alive'), turn===3);
  }
  assert.equal(B.run('sailor.hp'), B.run('sailor.maxhp'));
}
for (const blink of [false,true]) {
  const B = setup();
  B.ctx.__rand = () => .5;
  B.run("byId('kiri').ct=10; plan('undertow')");
  assert.equal(B.run('e.plan.target'), null);
  assert.match(B.run('planText(e)'), /Undertow.*whoever acts next/);
  B.run(`byId('natsu').ct=5; byId('natsu').blink=${blink}; execScripted(e)`);
  assert.equal(B.run("byId('kiri').ct"), 10, 'Undertow follows the current next ally');
  assert.equal(B.run("byId('natsu').ct"), blink ? 5 : 41);
  assert.equal(B.run("byId('natsu').stress"), blink ? 0 : 12);
}
console.log('Tide-Widow: phase Stress, sound immunity/cancellation, late Undertow/Blink, half-HP Release and three-turn Sailor respawn passed.');
