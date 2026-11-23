#!/usr/bin/env node
// Exercise the real Engine script, including phase entry after count has advanced.
const assert = require('node:assert/strict');
const { loadBattle } = require('../lib/load-game');
function setup(count = 1, hp = 2500) {
  const B = loadBattle({ seed:17 });
  B.run(`
    cfg.enc='engine';
    G={party:ORDER.map(makePC),active:['ren','natsu','hisui'],enemies:[],log:[],fx:{},pending:[],hum:25,void:{ct:null},melody:false};
    const e=makeFoe('engine'); G.enemies.push(e);
    e.phase='p1'; e.count=${count}; e.hp=${hp}; e.plan=planNext(e);
  `);
  return B;
}
const original = setup();
original.ctx.__rand = () => .99;
original.run('execScripted(e)');
assert.notEqual(original.run('e.last'), 'resonate', 'turn 2 must not borrow turn 3 Resonance');
let cases = 0;
for (let count=0; count<9; count++) for (const roll of [.1, .5499, .55, .99]) {
  const B = setup(count);
  const snapshot = B.run('JSON.stringify(G)');
  B.ctx.__rand = () => { throw Error('preview consumed RNG'); };
  assert.equal(B.run('planName(e)'), 'Phase change');
  assert.match(B.run('planText(e)'), /action will be chosen/);
  assert.equal(B.run('JSON.stringify(G)'), snapshot);
  B.ctx.__rand = () => roll;
  B.run('execScripted(e)');
  const expected = (count+1)%3===0 ? 'resonate' : roll<.55 ? 'stomp' : 'trample';
  assert.equal(B.run('e.last'), expected);
  assert.equal(B.run('e.count'), count+1);
  assert.equal(B.run('e.phase'), 'p2');
  // Rank delay still receives exactly the documented two-slot overclock reduction.
  assert.equal(B.run('e.ct'), B.run(`Math.max(SLOT, SCRIPTS.engine.skills[e.last].rank*tickOf(e)-2*SLOT)`));
  assert.equal(B.run('planName(e)'), B.run('SCRIPTS.engine.skills[e.plan.skill].name'));
  cases++;
}
for (const hp of [2501, 2500, 2499]) {
  const B = setup(2, hp); B.ctx.__rand = () => .99;
  B.run('execScripted(e)'); assert.equal(B.run('e.last'), 'resonate'); cases++;
}
const S = setup();
S.run('e.sleep=1'); assert.equal(S.run('planName(e)'), 'Asleep');
S.run('execScripted(e)'); assert.equal(S.run('e.count'), 1);
S.ctx.__rand = () => .99; S.run('execScripted(e)'); assert.notEqual(S.run('e.last'), 'resonate');
const D = setup();
D.run('e.ct=40; pushEnemy(e,2)'); assert.equal(D.run('e.ct'), 64);
D.run('pushEnemy(e,2)'); assert.equal(D.run('e.broken'), 2);
// Counter-Melody still cancels the periodic Sound action, including its Danger gain.
const M = setup(2); M.run('G.melody=true; execScripted(e)');
assert.equal(M.run('G.hum'), 25); assert.equal(M.run('G.party.every(a=>a.stress===0)'), true);
// Unrelated callers retain the next-turn default; no global cadence change.
const O = setup();
O.run("const o=makeFoe('organ'); G.enemies.push(o); o.count=4; o.phase=null");
assert.equal(O.run('planNext(o).skill'), 'chord');
console.log(`Engine cadence: ${cases} phase/odds/boundary cases plus sleep, Delay/Break, Sound counterplay, purity and unrelated planning passed.`);
