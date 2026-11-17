#!/usr/bin/env node
// Exercise the live Tongue script: rescuing an ally must update its visible plan.
const assert = require('node:assert/strict');
const { loadBattle } = require('../lib/load-game');
let cases = 0;
for (const phase of ['p1', 'p2']) for (const planned of ['lick', 'savour']) {
  const B = loadBattle({ seed: 17 });
  B.run(`
    cfg.enc = 'tongue2';
    G = { party:ORDER.map(makePC), active:['kiri','natsu','hisui'], enemies:[], log:[], fx:{}, pending:[], hum:25 };
    const e = makeFoe('licker'); G.enemies.push(e); SCRIPTS.licker.init(e);
    e.phase = '${phase}'; e.hp = ${phase === 'p2' ? 1400 : 3000};
    grabOne(e, byId('kiri'));
    ${phase === 'p2' ? "grabOne(e, byId('natsu'));" : ''}
    e.plan = { skill:'${planned}', rule:'It is holding someone', ttype:'${planned === 'lick' ? 'random' : 'all'}', target:${planned === 'lick' ? "byId('hisui')" : 'null'} };
    const originalPlan = e.plan;
    function taste(id) { return SCRIPTS.licker.onDamage(e, 7, {attacker:byId(id)}); }
  `);
  // The same attacker twice is still one taste, and no-attacker damage is not a taste.
  assert.equal(B.run("taste('hisui')"), 7);
  B.run("taste('hisui'); SCRIPTS.licker.onDamage(e, 7, {});");
  assert.equal(B.run('e.tasted.size'), 1);
  assert.equal(B.run('e.plan === originalPlan'), true);
  B.run("taste('tetsugi')");
  assert.equal(B.run('e.plan === originalPlan'), true);
  assert.ok(B.run('heldBy().length') > 0);
  // Replanning Grab must not roll a different random action or pick its late target early.
  const rand = B.ctx.__rand;
  B.ctx.__rand = () => { throw new Error('rescue consumed a random roll'); };
  B.run("taste('kuro')");
  B.ctx.__rand = rand;
  assert.equal(B.run('heldBy().length'), 0);
  assert.equal(B.run('e.tasted.size'), 0);
  assert.equal(B.run('byId("kiri").ct === 2*tickOf(byId("kiri"))'), true);
  assert.equal(B.run('e.plan.skill'), 'grab');
  assert.equal(B.run('e.plan.target'), null);
  assert.equal(B.run('planName(e)'), 'Grab');
  assert.match(B.run('planText(e)'), /^Next: Grab/);
  assert.match(B.run('G.log[0].text'), /The Tongue reacts: Grab/);
  // The newly advertised command really executes, following current Stress, not a cached target.
  B.run("byId('hisui').stress=40; byId('natsu').stress=20; execScripted(e)");
  assert.equal(B.run('e.last'), 'grab');
  assert.equal(B.run('heldBy().length'), phase === 'p2' ? 2 : 1);
  assert.equal(B.run('!!byId("hisui").grabbed'), true);
  cases++;
}
console.log(`Tongue rescue telegraph: ${cases} phase/action cases passed; distinct tastes, release timing, no reroll and execution checked.`);
