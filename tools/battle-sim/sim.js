#!/usr/bin/env node
// Battle simulator: plays the real battle loop from index.html headlessly, many times over,
// and reports how each encounter actually plays (win rate, length, KOs, Stress Checks,
// flees, Lost Turns). Use it to tune numbers, and to catch a change that quietly makes a
// fight trivial or impossible.
//
//   node tools/battle-sim/sim.js                      every encounter, its default party, 100 runs
//   node tools/battle-sim/sim.js widow t_kuro -n 500  chosen encounters
//   node tools/battle-sim/sim.js orlen --party kiri,natsu,kugai --policy attack
//   node tools/battle-sim/sim.js --baseline           compare against tools/battle-sim/baseline.json
//   node tools/battle-sim/sim.js --write-baseline     store this run as the new baseline
//   node tools/battle-sim/sim.js --json               machine-readable output
//
// Policies (who picks the party's commands):
//   advisor  the in-game Helper (advise()): a competent player who knows the role tricks
//   attack   Attack every turn (Defend when no foe can be targeted): the floor; a fight it wins does not test anything
//   no-role  the Helper, but the encounter's tested character (ENCOUNTERS[k].role) never uses
//            a signature skill; on story fights it plays like advisor
//   random   any legal command: a confused first-timer
// The gap between advisor and attack is how much a fight asks of the player. On a role test,
// the gap between advisor and no-role is how much it asks of that role: a test whose no-role
// win rate is close to advisor's doesn't teach its character.
//
// Other options: --seed 1, --hum <Danger>, --dread <starting Stress>, --harm <Afflicted %>,
// --over <Afflicted override %>, --no-void (no Lost Turns), --max-turns 300.
// --strict exits 1 if any battle times out or stalls (CI uses it as a smoke test); an exception
// inside the game always exits 1, naming the encounter.
const fs = require('fs');
const path = require('path');
const { loadBattle, rng } = require('../lib/load-game');

const args = process.argv.slice(2);
const flag = (name, def) => { let i = args.indexOf('--' + name); if (i < 0 && name.length === 1) i = args.indexOf('-' + name); if (i < 0) return def; const v = args[i + 1]; args.splice(i, 2); return v; };
const bool = name => { const i = args.indexOf('--' + name); if (i < 0) return false; args.splice(i, 1); return true; };
const num = (name, def) => { const v = flag(name, null); return v == null ? def : +v; };

const opt = {
  n: num('n', 100), seed: num('seed', 1), policy: flag('policy', 'advisor'), party: flag('party', null),
  hum: num('hum', null), dread: num('dread', 0), harm: num('harm', 75), over: num('over', 34),
  voidOn: !bool('no-void'), maxTurns: num('max-turns', 300),
  json: bool('json'), baseline: bool('baseline'), writeBaseline: bool('write-baseline'), strict: bool('strict'),
};
let running = '';
const crash = e => { console.error(`\n${running ? running + ': ' : ''}the game threw: ${e && e.stack || e}`); process.exit(1); };
process.on('uncaughtException', crash);
process.on('unhandledRejection', crash);
const BASELINE = path.join(__dirname, 'baseline.json');

const B = loadBattle({ seed: opt.seed, onOverlay: (html, click) => onOverlay(html, click) });
const ENC = B.get('ENCOUNTERS'), cfg = B.get('cfg');
const getG = B.run('() => G');
const advise = B.get('advise'), SKILLS = B.get('SKILLS'), ITEMS = B.get('ITEMS');
const foesHittable = B.get('foesHittable'), actives = B.get('actives');
const encs = args.length ? args : Object.keys(ENC);
for (const k of encs) if (!ENC[k]) { console.error(`unknown encounter "${k}"; encounters: ${Object.keys(ENC).join(', ')}`); process.exit(1); }
if (!['advisor', 'no-role', 'attack', 'random'].includes(opt.policy)) { console.error(`unknown policy "${opt.policy}" (advisor, no-role, attack, random)`); process.exit(1); }

const pick = a => a[Math.floor(B.ctx.__rand() * a.length)];
const POLICY = {
  advisor: G => { const r = advise(G.current); return { act: r.act, target: r.target }; },
  'no-role': G => {
    const r = advise(G.current), role = G.enc.role;
    if (role && G.current.id === role && r.act.kind === 'skill') return { act: { kind: 'attack' }, target: r.target && r.target.side === 'enemy' ? r.target : pick(foesHittable()) };
    return { act: r.act, target: r.target };
  },
  // Foes that can't be targeted right now (underwater, at the helm) are skipped, as in the menu; with none in reach, Defend.
  attack: () => foesHittable().length ? { act: { kind: 'attack' }, target: pick(foesHittable()) } : { act: { kind: 'defend' }, target: null },
  random: G => {
    const u = G.current, acts = [{ kind: 'attack' }, { kind: 'defend' }];
    u.skills.forEach(k => acts.push({ kind: 'skill', key: k }));
    Object.keys(ITEMS).forEach(k => { if (G.inv[k] > 0) acts.push({ kind: 'item', key: k }); });
    if (u.limit >= 100 || (u.aff && u.limit >= 50)) acts.push({ kind: 'limit' });
    const kod = actives().filter(a => !a.alive && !a.fled);
    const ok = acts.filter(a => !(a.kind === 'item' && ITEMS[a.key].target === 'ko' && !kod.length));
    const act = pick(ok);
    const t = act.kind === 'skill' ? SKILLS[act.key].target : act.kind === 'item' ? ITEMS[act.key].target : 'enemy';
    const target = t === 'ally' ? pick(actives().filter(a => a.alive && !a.airborne)) : t === 'ko' ? kod[0] : pick(foesHittable());
    return { act, target };
  },
};

// ---- one battle ----
let cur = null; // the battle in progress: its finish(), its G and the last choice resolved
function onOverlay(html, click) {
  if (!html.includes('Fight again')) return click(); // Stress Check or flee card: read it and continue
  cur && cur.finish(/>Victory</.test(html) ? 'win' : 'lose');
}

function battle(encKey, party) {
  return new Promise(resolve => {
    Object.assign(cfg, { enc: encKey, party, hum: opt.hum ?? ENC[encKey].hum, dread: opt.dread, harm: opt.harm, over: opt.over, voidOn: opt.voidOn, helper: false });
    const st = { turns: 0, polls: 0, lastResolve: null, G: null, done: false };
    st.finish = result => {
      if (st.done) return; st.done = true;
      const G = st.G, lines = G.__all.map(l => l.text);
      const count = rx => lines.filter(t => rx.test(t)).length;
      const team = G.party.filter(p => G.active.includes(p.id) || p.fled);
      resolve({
        result, turns: st.turns,
        foeTurns: G.enemies.reduce((s, e) => s + (e.count || 0), 0),
        kos: count(/ is KO'd\.$/), afflicted: count(/Stress Check: .* is Afflicted/), inspired: count(/Stress Check: .* is Inspired/),
        fled: count(/fled the battle/), lost: count(/^Lost Turn\. No one acts/), limits: count(/: Limit Break, /), phoenix: count(/Phoenix Down →/),
        stress: team.reduce((s, p) => s + p.stress, 0) / team.length, danger: G.hum,
        hp: team.reduce((s, p) => s + (p.alive ? p.hp / p.maxhp : 0), 0) / team.length,
      });
    };
    cur = st;
    B.run('newGame()');
    const tick = () => {
      if (st.done) return;
      // A battle that stops asking for commands and never ends has stalled (a script bug).
      if (++st.polls > 500000) return st.finish('stalled');
      const G = getG();
      if (G !== st.G) { // a new battle: keep a full copy of its log (the in-game log keeps 80 lines)
        st.G = G; G.__all = G.log.slice().reverse();
        const u = G.log.unshift.bind(G.log); G.log.unshift = (...x) => { G.__all.push(...x); return u(...x); };
      }
      if (G.state === 'choose' && G.resolve && G.resolve !== st.lastResolve && G.current && G.current.side === 'party') {
        st.lastResolve = G.resolve; st.turns++;
        if (st.turns > opt.maxTurns) return st.finish('timeout');
        const c = POLICY[opt.policy](G);
        G.resolve({ u: G.current, act: c.act, target: c.target });
      }
      setImmediate(tick);
    };
    setImmediate(tick);
  });
}

// ---- summaries ----
const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0;
function summarize(runs) {
  const per = k => mean(runs.map(r => r[k]));
  const wins = runs.filter(r => r.result === 'win');
  return {
    n: runs.length, win: wins.length / runs.length, timeout: runs.filter(r => r.result === 'timeout').length / runs.length,
    stalled: runs.filter(r => r.result === 'stalled').length,
    turns: per('turns'), winTurns: mean(wins.map(r => r.turns)), foeTurns: per('foeTurns'),
    kos: per('kos'), afflicted: per('afflicted'), inspired: per('inspired'), fled: per('fled'), lost: per('lost'),
    limits: per('limits'), phoenix: per('phoenix'), stress: per('stress'), danger: per('danger'), hp: mean(wins.map(r => r.hp)),
  };
}

const COLS = [
  ['win', 'Win', v => (v * 100).toFixed(0) + '%'], ['winTurns', 'Turns', v => v.toFixed(1)], ['foeTurns', 'Foe turns', v => v.toFixed(1)],
  ['kos', 'KOs', v => v.toFixed(2)], ['afflicted', 'Afflicted', v => v.toFixed(2)], ['inspired', 'Inspired', v => v.toFixed(2)],
  ['fled', 'Fled', v => v.toFixed(2)], ['lost', 'Lost', v => v.toFixed(1)], ['limits', 'LB', v => v.toFixed(2)],
  ['stress', 'End Stress', v => v.toFixed(0)], ['hp', 'End HP', v => (v * 100).toFixed(0) + '%'],
];
function table(rows, base) {
  const head = ['Encounter', 'Party', ...COLS.map(c => c[1])];
  const body = rows.map(({ key, party, s }) => [key, party.join(','), ...COLS.map(([k, , f]) => {
    const b = base && base[key] && base[key].party.join(',') === party.join(',') && base[key].policy === opt.policy ? base[key].s : null;
    if (!b) return f(s[k]);
    // Show a change only when it is bigger than run-to-run noise: 5 points on a rate, else 5% (at least 0.25).
    const d = s[k] - b[k], rate = k === 'win' || k === 'hp';
    if (rate ? Math.abs(d) < 0.05 : Math.abs(d) < Math.max(0.25, 0.05 * Math.abs(b[k]))) return f(s[k]);
    return `${f(s[k])} (${d > 0 ? '+' : '−'}${f(Math.abs(d))})`;
  })]);
  const w = head.map((h, i) => Math.max(h.length, ...body.map(r => r[i].length)));
  const line = r => r.map((c, i) => i < 2 ? c.padEnd(w[i]) : c.padStart(w[i])).join('  ');
  return [line(head), w.map(n => '─'.repeat(n)).join('  '), ...body.map(line)].join('\n');
}

// ---- main ----
(async () => {
  const rows = [];
  const t0 = Date.now();
  for (const key of encs) {
    // Reseed per encounter, so a fight's numbers don't depend on which others ran before it.
    B.ctx.__rand = rng(opt.seed * 7919 + [...key].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261));
    const party = opt.party ? opt.party.split(',') : (ENC[key].party || cfg.party).slice();
    const runs = [];
    running = key;
    for (let i = 0; i < opt.n; i++) runs.push(await battle(key, party));
    rows.push({ key, party, policy: opt.policy, s: summarize(runs) });
    if (!opt.json && process.stderr.isTTY) process.stderr.write(`\r  ${key}: ${opt.n} runs`.padEnd(48));
  }
  if (!opt.json && process.stderr.isTTY) process.stderr.write('\r' + ' '.repeat(48) + '\r');
  const base = opt.baseline && fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : null;
  if (opt.baseline && !base) console.error(`no baseline at ${path.relative(process.cwd(), BASELINE)}; run with --write-baseline first`);
  if (opt.writeBaseline) {
    const round = s => Object.fromEntries(Object.entries(s).map(([k, v]) => [k, Math.round(v * 1000) / 1000]));
    const out = Object.fromEntries(rows.map(r => [r.key, { party: r.party, policy: r.policy, n: opt.n, seed: opt.seed, s: round(r.s) }]));
    fs.writeFileSync(BASELINE, JSON.stringify(out, null, 1) + '\n');
  }
  if (opt.json) console.log(JSON.stringify(rows, null, 1));
  else {
    console.log(`\npolicy ${opt.policy} · ${opt.n} runs each · seed ${opt.seed}${opt.hum != null ? ' · Danger ' + opt.hum : ''}${opt.dread ? ' · start Stress ' + opt.dread : ''} · ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);
    console.log(table(rows, base));
    console.log('\nTurns = party commands in won fights. Afflicted, Inspired, Fled, KOs, Lost (Lost Turns) and LB (Limit Breaks) are per battle.');
    if (base) console.log('Bracketed values are the change from baseline.json, shown when bigger than noise (5 points on a rate, 5% on anything else).');
    if (opt.writeBaseline) console.log(`Baseline written to ${path.relative(process.cwd(), BASELINE)}.`);
  }
  const bad = rows.filter(r => r.s.timeout || r.s.stalled);
  if (opt.strict && bad.length) {
    console.error(bad.map(r => `${r.key}: ${Math.round(r.s.timeout * r.s.n)} timed out, ${r.s.stalled} stalled`).join('\n'));
    process.exit(1);
  }
  process.exit(0);
})();
