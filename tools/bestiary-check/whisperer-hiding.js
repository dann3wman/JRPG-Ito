#!/usr/bin/env node
// Exercise the real battle script, including onTurn before the phase gate.
const assert = require('node:assert/strict');
const { loadBattle } = require('../lib/load-game');

function setup(hp = 950, available = 3) {
  const B = loadBattle({ seed: 17 });
  B.run(`
    cfg.enc = 'whisperer';
    G = { party: ORDER.map(makePC), active: ['kiri','natsu','hisui'].slice(0,${available}),
      enemies: [], log: [], fx: {}, pending: [], hum: 25, void: {ct:null}, melody: false };
    const e = makeFoe('whisperer'); G.enemies.push(e);
    e.phase = 'p1'; e.hp = ${hp}; e.count = 0;
    SCRIPTS.whisperer.init(e); e.plan = planNext(e);
  `);
  return B;
}

const crossing = setup(951);
crossing.run('e.hp=950;execScripted(e)');
assert.equal(crossing.run('e.behind.length'), 2, 'phase-entry turn must hide behind two allies');

let cases = 0;
for (const hp of [951, 950, 949]) for (const available of [0, 1, 2, 3]) {
  const B = setup(hp, available);
  B.ctx.__rand = () => .99;
  B.run('execScripted(e)');
  const expected = Math.min(available, hp <= 950 ? 2 : 1);
  assert.equal(B.run('e.behind.length'), expected);
  assert.equal(B.run('new Set(e.behind).size'), expected);
  assert.equal(B.run('G.party.filter(a=>a.whisper).length'), expected);
  cases++;
}

const exposure = setup();
exposure.run('execScripted(e);render=()=>{};swapIn("ren",e.behind[0])');
assert.equal(exposure.run('reachable(e)'), false, 'one remaining ally still hides her');
exposure.run('swapIn("kuro",e.behind[1])');
assert.equal(exposure.run('reachable(e)'), true, 'swapping both exposes her');

const sleep = setup(951);
sleep.run('e.hp=950;e.sleep=1');
const before = sleep.run('JSON.stringify(e.behind)');
sleep.run('execScripted(e)');
assert.equal(sleep.run('JSON.stringify(e.behind)'), before);
assert.equal(sleep.run('e.count'), 0);

for (const roll of [.1, .99]) {
  const B = setup();
  B.ctx.__rand = () => roll;
  B.run('execScripted(e)');
  assert.equal(B.run('e.behind.every(id=>!!byId(id).whisper.ally)'), roll < .5);
  assert.equal(B.run('e.behind.every(id=>(byId(id).st.Silence||0)===2)'), roll < .2);
}

const preview = setup();
const state = preview.run('JSON.stringify(G)');
preview.ctx.__rand = () => { throw Error('preview consumed RNG'); };
preview.run('planName(e);planText(e);SCRIPTS.whisperer.hidden(e)');
assert.equal(preview.run('JSON.stringify(G)'), state);
console.log(`Whisperer hiding: ${cases} HP/availability cases plus real transition, Swap exposure, sleep, whisper odds and preview purity passed.`);
