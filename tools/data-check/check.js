#!/usr/bin/env node
// Data check: validates the game's data tables against each other, and the numbers the code
// uses against the numbers the design doc states. Run it after any change to index.html,
// the rig viewer or docs/design-doc.md.
//
//   node tools/data-check/check.js            errors fail (exit 1), drift is reported as warnings
//   node tools/data-check/check.js --strict   warnings fail too
//   node tools/data-check/check.js --quiet    print only problems
//
// Two kinds of check:
//   Integrity (errors): references that must resolve. A roster skill missing from SKILLS, an
//     encounter foe with no SCRIPTS entry, a rule naming a skill the enemy doesn't have, a
//     duplicate rule label (plans are looked up by label), a rig clip that doesn't exist.
//   Drift (warnings): a documented rule whose number in the code differs from the design doc.
//     Each one is a pinned pair in DOC_RULES below: a regex on the doc and one on the code.
//     When the doc or code changes on purpose, update the other side (AGENTS.md: keep them in
//     step). When a check is wrong, fix its regex here. Add a pair whenever you implement a
//     documented number.
const fs = require('fs');
const path = require('path');
const { loadBattle, loadViewer, ROOT, GAME } = require('../lib/load-game');

const strict = process.argv.includes('--strict'), quiet = process.argv.includes('--quiet');
const out = [];
const err = (area, msg) => out.push({ level: 'error', area, msg });
const warn = (area, msg) => out.push({ level: 'warn', area, msg });
const ok = (area, msg) => out.push({ level: 'ok', area, msg });

const B = loadBattle({ rigs: true });
const D = n => B.get(n);
const ROSTER = D('ROSTER'), ORDER = D('ORDER'), SKILLS = D('SKILLS'), ITEMS = D('ITEMS'), LIMIT = D('LIMIT'), ROLE_DESC = D('ROLE_DESC');
const FACE = D('FACE'), ASSETS = D('ASSETS'), FOES = D('FOES'), ENCOUNTERS = D('ENCOUNTERS'), SCRIPTS = D('SCRIPTS');
const STORY = D('STORY'), ENEMY_ART = D('ENEMY_ART'), SINGLE = D('SINGLE'), TARGET_TEXT = D('TARGET_TEXT'), LATE_TEXT = D('LATE_TEXT');
const RIGS = B.rigs.get('RIGS'), ATLAS = B.rigs.get('ATLAS'), ART_RIG = B.rigs.get('ART_RIG'), SKILL_CLIP = B.rigs.get('SKILL_CLIP');
const V = loadViewer(), VRIGS = V.get('RIGS'), VATLAS = V.get('ATLAS');
const SRC = fs.readFileSync(GAME, 'utf8').replace(/\r\n/g, '\n');
const DOC_PATH = path.join(ROOT, 'docs/design-doc.md');
const DOC = fs.readFileSync(DOC_PATH, 'utf8');
const keys = o => Object.keys(o);

// ---------- party ----------
{
  const A = 'party';
  if (ORDER.join() !== keys(ROSTER).join()) err(A, `ORDER (${ORDER.join(',')}) does not match ROSTER's keys (${keys(ROSTER).join(',')})`);
  for (const [id, r] of Object.entries(ROSTER)) {
    for (const s of r.skills) if (!SKILLS[s]) err(A, `${id}: skill "${s}" is not in SKILLS`);
    for (const [tbl, name] of [[LIMIT, 'LIMIT'], [ROLE_DESC, 'ROLE_DESC'], [FACE, 'FACE'], [ASSETS, 'ASSETS']]) if (!tbl[id]) err(A, `${id}: no ${name} entry`);
    if (ASSETS[id] && !(ASSETS[id].p && ASSETS[id].s)) err(A, `${id}: ASSETS needs both a portrait (p) and a turn-order face (s)`);
    for (const k of ['hp', 'mp', 'atk', 'def', 'mag', 'agi']) if (typeof r[k] !== 'number') err(A, `${id}: stat ${k} is missing`);
  }
  const used = new Set(Object.values(ROSTER).flatMap(r => r.skills));
  for (const s of keys(SKILLS)) if (!used.has(s)) warn(A, `skill "${s}" is in SKILLS but no character has it`);
  for (const [k, s] of Object.entries(SKILLS)) {
    if (!['enemy', 'ally', 'none', 'ko'].includes(s.target)) err(A, `skill ${k}: target "${s.target}" is not enemy/ally/none/ko`);
    if (!(s.delay >= 1)) err(A, `skill ${k}: delay must be a number ≥ 1`);
  }
  for (const [k, it] of Object.entries(ITEMS)) if (!['ally', 'ko', 'enemy', 'none'].includes(it.target)) err(A, `item ${k}: bad target "${it.target}"`);
  ok(A, `${keys(ROSTER).length} characters, ${keys(SKILLS).length} skills, ${keys(ITEMS).length} items`);
}

// ---------- encounters and foes ----------
{
  const A = 'encounters';
  for (const [k, e] of Object.entries(ENCOUNTERS)) {
    for (const f of e.foes) if (!FOES[f]) err(A, `${k}: foe "${f}" is not in FOES`);
    for (const p of e.party || []) if (!ROSTER[p]) err(A, `${k}: party member "${p}" is not in ROSTER`);
    if (e.party && e.party.length !== 3) warn(A, `${k}: default party has ${e.party.length} members (three fight at a time)`);
    if (e.role && !ROSTER[e.role]) err(A, `${k}: role "${e.role}" is not in ROSTER`);
    if (e.role && e.party && !e.party.includes(e.role)) err(A, `${k}: role test for ${e.role} doesn't put ${e.role} in the party`);
    for (const f of keys(e.stats || {})) if (!e.foes.includes(f)) err(A, `${k}: stats override for "${f}", which isn't one of its foes`);
    if (e.guest && !ROSTER[e.guest]) err(A, `${k}: guest "${e.guest}" is not in ROSTER`);
    if (e.guest && (e.party || []).includes(e.guest)) err(A, `${k}: guest ${e.guest} is also in the default party`);
    if (e.guest && !e.foes.some(f => SCRIPTS[f] && SCRIPTS[f].guestTurn)) err(A, `${k}: has a guest but no foe script with guestTurn to drive it`);
    if (!(e.hum >= 0 && e.hum <= 100)) err(A, `${k}: Danger (hum) ${e.hum} is outside 0–100`);
    for (const i of keys(e.inv || {})) if (!ITEMS[i]) err(A, `${k}: inv item "${i}" is not in ITEMS`);
    if (!e.brief) warn(A, `${k}: no brief (the setup panel shows it)`);
    if (!/\([^)]+\)\s*$/.test(e.brief || '')) warn(A, `${k}: brief should end with its Ito source in parentheses`);
  }
  const roleTests = new Set(Object.values(ENCOUNTERS).map(e => e.role).filter(Boolean));
  for (const id of ORDER) if (!roleTests.has(id)) warn(A, `${id} has no role test encounter`);
  ok(A, `${keys(ENCOUNTERS).length} encounters`);

  const F = 'foes';
  for (const [k, f] of Object.entries(FOES)) {
    if (f.ai === 'script' && !SCRIPTS[k]) err(F, `${k}: ai is 'script' but SCRIPTS has no entry`);
    if (f.parentKey && !FOES[f.parentKey]) err(F, `${k}: parentKey "${f.parentKey}" is not in FOES`);
    // A foe needs an image: an ENEMY_ART entry, or an ink drawing in art()'s canvas fallback.
    if (!ENEMY_ART[f.art] && !SRC.includes(`kind==='${f.art}'`)) warn(F, `${k}: art "${f.art}" has no ENEMY_ART image and no canvas drawing in art() (it shows as a blank panel)`);
    if (!STORY[k]) warn(F, `${k}: no STORY entry (the Ito work it draws on)`);
    for (const s of ['hp', 'atk', 'def', 'mdef', 'agi']) if (typeof f[s] !== 'number') err(F, `${k}: stat ${s} is missing`);
  }
  const inEnc = new Set(Object.values(ENCOUNTERS).flatMap(e => e.foes));
  for (const k of keys(FOES)) if (!inEnc.has(k) && !Object.values(SCRIPTS).some(S => (S.parts || []).some(p => p.key === k))) warn(F, `${k} is in FOES but no encounter uses it`);
  ok(F, `${keys(FOES).length} foes`);
}

// ---------- enemy scripts ----------
{
  const A = 'scripts';
  const TARGETS = new Set([...SINGLE, ...keys(TARGET_TEXT)]);
  for (const [k, S] of Object.entries(SCRIPTS)) {
    const sk = S.skills || {}, phases = new Set((S.phases || []).map(p => p.id));
    if (!FOES[k]) err(A, `${k}: script has no FOES entry`);
    if (!S.rules || !S.rules.length) { err(A, `${k}: no rules`); continue; }
    const labels = S.rules.map(r => r.label), dup = labels.filter((l, i) => labels.indexOf(l) !== i);
    if (dup.length) err(A, `${k}: duplicate rule label(s) ${[...new Set(dup)].map(l => `"${l}"`).join(', ')}; plans are matched by label`);
    S.rules.forEach((r, i) => {
      const where = `${k} rule ${i + 1} ("${r.label}")`;
      if (r.phase && !phases.has(r.phase)) err(A, `${where}: phase "${r.phase}" is not in phases`);
      const names = r.roll ? r.roll.map(x => x[1]) : [r.skill];
      for (const n of names) if (!sk[n]) err(A, `${where}: skill "${n}" is not in its skills`);
      if (r.target && !TARGETS.has(r.target)) err(A, `${where}: target "${r.target}" is unknown`);
      if (r.roll && r.chance) warn(A, `${where}: has both roll and chance; chance is ignored`);
    });
    // Every phase needs a rule that always applies, or the enemy can end up with no plan.
    for (const ph of phases.size ? phases : [null]) {
      const fallback = S.rules.some(r => (!r.phase || r.phase === ph) && !r.when && !r.chance);
      if (!fallback) err(A, `${k}${ph ? ' ' + ph : ''}: no unconditional last rule, so some turns have no plan`);
    }
    for (const p of S.phases || []) if (p.enter && !sk[p.enter]) err(A, `${k} phase ${p.id}: entry skill "${p.enter}" is not in its skills`);
    // Hooks that come in pairs: the UI needs the second to explain the first.
    if (S.targetable && typeof S.hidden !== 'function') err(A, `${k}: targetable needs hidden(e), the reason shown while it can't be targeted`);
    if (S.holds && typeof S.holdText !== 'function') err(A, `${k}: holds needs holdText(e, u) for the log`);
    for (const p of S.parts || []) {
      if (!FOES[p.key]) err(A, `${k} part ${p.key}: not in FOES`);
      else if (FOES[p.key].parentKey !== k) err(A, `${k} part ${p.key}: FOES.${p.key}.parentKey should be "${k}"`);
    }
    for (const [n, s] of Object.entries(sk)) {
      const where = `${k}.${n}`;
      for (const f of ['name', 'power', 'desc']) if (s[f] == null) err(A, `${where}: missing ${f} (the info panel shows it)`);
      if (!(s.rank >= 1)) err(A, `${where}: rank must be a number ≥ 1`);
      if (!Array.isArray(s.tags)) err(A, `${where}: tags must be an array`);
      if (typeof s.run !== 'function') err(A, `${where}: run is not a function`);
      if (!TARGETS.has(s.target)) err(A, `${where}: target "${s.target}" is unknown`);
      if (!TARGET_TEXT[s.target]) warn(A, `${where}: target "${s.target}" has no TARGET_TEXT for the info panel`);
      if (s.late && !LATE_TEXT[s.target]) err(A, `${where}: late targeting needs a LATE_TEXT entry for "${s.target}"`);
      if (s.sound && !(s.tags || []).includes('Sound')) warn(A, `${where}: sound:true but not tagged Sound`);
      if ((s.tags || []).includes('Sound') && !s.sound) err(A, `${where}: tagged Sound but sound:true is missing, so Counter-Melody and immunity won't apply`);
      const reachable = S.rules.some(r => r.skill === n || (r.roll || []).some(x => x[1] === n)) || (S.phases || []).some(p => p.enter === n) || (S.interrupts || []).some(r => r.skill === n);
      if (!reachable) warn(A, `${where}: no rule or phase ever uses it`);
    }
  }
  ok(A, `${keys(SCRIPTS).length} enemy scripts`);
}

// ---------- rigs ----------
{
  const A = 'rigs';
  for (const [art, rig] of Object.entries(ART_RIG)) {
    if (!RIGS[rig]) err(A, `ART_RIG.${art} → "${rig}" is not in the game's RIGS`);
    if (!Object.values(FOES).some(f => f.art === art)) warn(A, `ART_RIG.${art}: no foe uses art "${art}"`);
  }
  for (const [rig, map] of Object.entries(SKILL_CLIP)) {
    if (!RIGS[rig]) { err(A, `SKILL_CLIP.${rig}: no such rig`); continue; }
    for (const [skill, clip] of Object.entries(map)) if (!RIGS[rig].anims[clip]) err(A, `SKILL_CLIP.${rig}.${skill} → clip "${clip}" doesn't exist`);
  }
  for (const [k, rig] of Object.entries(RIGS)) {
    if (!VRIGS[k]) { err(A, `${k}: in the game's RIGS but not in the rig viewer`); continue; }
    // Bones are topologically sorted at load, so compare them by id, not by position. A bone with
    // `fit` gets at/r/s/flip derived from it (applyFits), at load in the game and later in the
    // viewer, so compare only what was authored.
    const authored = b => { if (!b.fit) return b; const { at, r, s, flip, ...rest } = b; return rest; };
    const bones = r => JSON.stringify(r.bones.map(b => JSON.stringify(authored(b))).sort());
    if (bones(VRIGS[k]) !== bones(rig)) warn(A, `${k}: bones differ between the game and the rig viewer (edit the viewer, then copy the rig across)`);
    const va = keys(VRIGS[k].anims).join(), ga = keys(rig.anims).join();
    if (va !== ga) warn(A, `${k}: clips differ: game [${ga}] vs viewer [${va}]`);
    if (JSON.stringify(ATLAS[k]) !== JSON.stringify(VATLAS[k])) warn(A, `${k}: ATLAS differs between the game and the rig viewer`);
    if (!rig.anims.idle) err(A, `${k}: no idle clip`);
    if (!fs.existsSync(path.join(ROOT, 'tools/bestiary-rig-viewer', k + '.webp'))) err(A, `${k}: tools/bestiary-rig-viewer/${k}.webp is missing`);
  }
  // The game loads sheets with `im.src = k + '.webp'`, relative to index.html.
  const m = /im\.src = ([^;]+);/.exec(SRC.slice(SRC.indexOf('function load(k)')));
  const base = m && /^'([^']*)' \+ k/.exec(m[1]) ? /^'([^']*)' \+ k/.exec(m[1])[1] : '';
  const missing = keys(RIGS).filter(k => !fs.existsSync(path.join(ROOT, base + k + '.webp')));
  if (missing.length) warn(A, `the game loads rig sheets from "${base || './'}<creature>.webp", where ${missing.length} of ${keys(RIGS).length} don't exist (${missing.join(', ')}); those enemies fall back to static art`);
  for (const [k, r] of Object.entries(VRIGS)) for (const b of r.bones) if (b.img && VATLAS[k] && !VATLAS[k][b.img] && !b.box) err(A, `viewer ${k}.${b.id}: sprite "${b.img}" is not in ATLAS.${k}`);
  ok(A, `${keys(RIGS).length} battle rigs, ${keys(VRIGS).length} viewer rigs`);
}

// ---------- tools that copy game data ----------
{
  const A = 'tools';
  // The CTB planner keeps its own copy of every Speed (it runs from file:// with no loader).
  const html = fs.readFileSync(path.join(ROOT, 'tools/ctb-planner/index.html'), 'utf8');
  const m = /const PRESETS = (\{[\s\S]*?\n\});/.exec(html);
  if (!m) err(A, 'ctb-planner: PRESETS table not found');
  else {
    const P = new Function(`return ${m[1]}`)();
    for (const r of Object.values(ROSTER)) if (P.party[r.name] !== r.agi) err(A, `ctb-planner: ${r.name} Speed is ${P.party[r.name]}, the game has ${r.agi}`);
    for (const f of Object.values(FOES)) if (P.enemy[f.name] !== f.agi) err(A, `ctb-planner: ${f.name} Speed is ${P.enemy[f.name]}, the game has ${f.agi}`);
    const names = new Set([...Object.values(ROSTER), ...Object.values(FOES)].map(x => x.name));
    for (const n of [...Object.keys(P.party), ...Object.keys(P.enemy)]) if (!names.has(n)) err(A, `ctb-planner: preset "${n}" is not in the game`);
    ok(A, 'ctb-planner presets match the game');
  }
  // The planner repeats these rules; make sure the game still uses them.
  for (const [what, rx] of [['tick speed', /const tickOf = u => Math\.max\(8, 30 - u\.agi\)/], ['slot size', /const SLOT = 12;/], ['Lost Turn interval', /Math\.round\(Math\.max\(60, 230 - G\.hum\*1\.7\)\)/]])
    if (!rx.test(SRC)) err(A, `ctb-planner copies the game's ${what}, which has changed in index.html; update the planner and this check`);
}

// ---------- docs ----------
{
  const A = 'docs';
  // Every relative link in the repo's Markdown must point at a file that exists.
  const mds = [];
  const walk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('.') && e.name !== '.claude') continue;
    if (e.name === 'node_modules') continue;
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f); else if (e.name.endsWith('.md')) mds.push(f);
  } };
  walk(ROOT);
  let links = 0;
  for (const f of mds) {
    const text = fs.readFileSync(f, 'utf8').replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
    for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
      const href = m[1].split('#')[0];
      if (!href || /^[a-z]+:/i.test(href)) continue;
      links++;
      if (!fs.existsSync(path.resolve(path.dirname(f), decodeURIComponent(href)))) err(A, `${path.relative(ROOT, f)}: broken link ${m[1]}`);
    }
  }
  ok(A, `${links} relative links in ${mds.length} Markdown files resolve`);
}

// ---------- design doc drift ----------
// [label, doc regex (group 1 = number), code regex (group 1 = number)]. Both are matched once.
const DOC_RULES = [
  ['Stress: critical hit taken', /Taking a critical hit \| \+(\d+)/, /else addStress\(t, (\d+), 'critical hit'\)/],
  ['Stress: seeing an ally KO\'d', /Seeing an ally KO'd \| \+(\d+)/, /addStress\(u, (\d+), `\$\{t\.name\} KO'd`\)/],
  ['Stress: seeing a Phoenix Down revive', /revived with Phoenix Down \| \+(\d+)/, /addStress\(a, (\d+), 'saw a revive'\)/],
  ['Stress: per slot pushed back', /Pushed back in the turn order \| \+(\d+) per slot/, /addStress\(u, (\d+)\*slots/],
  ['Stress: a Lost Turn', /A Lost Turn \| \+(\d+)/, /a\.id==='shio' \? \d+ : (\d+)/],
  ['Stress: Shio on a Lost Turn (double)', /Lost Turns give her double Stress/, /a\.id==='shio' \? (\d+) :/, 10],
  ['Stress: reserves watching a crit or KO', /Reserves gain (\d+) Stress/, /addStress\(r, (\d+)\)/],
  ['Stress: relief from a crit or finishing blow', /Landing a critical hit or finishing blow \| −(\d+)/, /if \(crit && attacker\) addStress\(attacker, -(\d+)\)/],
  ['Stress Check threshold', /At (\d+) Stress, a character takes a Stress Check/, /before < (\d+) && u\.stress >= \1/],
  ['Flee threshold', /\*\*Flee\.\*\* At (\d+) Stress/, /if \(u\.stress >= (\d+)\) queue\(u\.id,'flee'\)/],
  ['Afflicted chance at a Stress Check', /\*\*Afflicted\*\* \((\d+)% chance\)/, /harm:(\d+)/],
  ['Afflictions end below this Stress', /Afflictions end when Stress drops below (\d+)/, /u\.stress < (\d+) && u\.aff/],
  ['Lost Turns start at this Danger', /When Danger is above (\d+), empty slots/, /G\.hum >= (\d+)/],
  ['Kiri: Lullaby Stress relief', /Lullaby: −(\d+) Stress to the other active allies/, /case 'lullaby':[^\n]*\n[^\n]*addStress\(a,-(\d+)\)/],
  ['Kiri: Lullaby Danger cost', /Lullaby: −\d+ Stress to the other active allies, \+(\d+) Danger/, /case 'lullaby':[^\n]*\n[^\n]*addHum\((\d+)\)/],
  ['Natsu: Soothe', /Soothe: −(\d+) Stress to one ally/, /case 'soothe':[^\n]*addStress\(tt, -(\d+)\)/],
  ['Natsu: Cures before Cure adds Stress', /after (\d+) Cures in a battle/, /if \(u\.cures > (\d+)\)/],
  ['Natsu: Stress per Cure past the limit', /each adds (\d+) Stress to the target/, /addStress\(tt, (\d+), 'Cure past/],
  ['Tetsugi: Chakra heal %', /Chakra: heal (\d+)% HP/, /heal\(u, u\.maxhp\*\.(\d+)\); addStress\(u, -10\)/],
  ['Miren: Stress on landing', /\+(\d+) Stress on landing/, /addStress\(u, (\d+), 'landing'\)/],
  ['Goku: Stress per summon', /Each summon: \+(\d+) Stress to Goku/, /addStress\(u, (\d+), 'Summon'\)/],
  ['Goku: Howl enemy attack down %', /Howl: all enemies' attack −(\d+)%/, /if \(src && src\.weak > 0\) raw \*= \.(\d+)/, null, v => 100 - v * 10],
  ['Hisui: Blood Strike HP cost %', /Blood Strike: costs (\d+)% HP/, /Math\.round\(u\.hp\*\.(\d+)\); u\.hp = Math\.max\(1, u\.hp-c\); fx\(u\.id, `−\$\{c\}`\); log\(`\$\{u\.name\}: Blood Strike/],
  ['Hisui: Stress from crits taken', /Critical hits taken add (\d+) Stress instead of 10/, /if \(t\.id==='hisui'\)\{ addStress\(t, (\d+)/],
  ['Kuro: max spell bonus from Stress %', /Spell damage up to \+(\d+)% at high Stress/, /Math\.min\(\.(\d+), u\.stress\/250\)/, null, v => v * 10],
  ['Ren: Delay Shot push (slots)', /Delay Shot: damage, target pushed back (\d+)/, /pushEnemy\(e, (\d+)\); break; \}\n\s*case 'quickshot'/],
  ['Sayo: Quick Song (slots sooner)', /Quick Song: an ally acts (\d+) slots sooner/, /tt\.ct - (\d+)\*SLOT/],
  ['Sayo: Danger per song', /Each song \+(\d+) Danger/, /Quick Song[^\n]*addHum\((\d+)\)/],
  ['Kugai: Provoke attacks', /Provoke: enemies target Kugai for their next (\d+)/, /u\.provoke = (\d+)/],
  ['Fuyori: item potency %', /Items she uses are (\d+)% stronger/, /u\.id==='fuyori' \? 1\.(\d+) : 1/, null, v => v * 10],
  ['Fuyori: Acid defense down %', /Acid: damage, target defense −(\d+)%/, /e\.def = Math\.round\(e\.def\*\.(\d+)\)/, null, v => 100 - v * 10],
  ['Earplugs: turns', /Earplugs \(item\) \| Halves Stress gain for (\d+) turns/, /t\.earplugs = Math\.round\((\d+)\*m\)/],
  ['Earplugs: accuracy penalty %', /Halves Stress gain for \d+ turns \| −(\d+)% accuracy/, /attacker\.earplugs > 0 \? \.(\d+) : \.95/, null, v => 95 - v],
];
// Delay table: action group -> skills the code must give that Delay.
const DELAY_GROUPS = [
  [/Quick skills \(Quick Hit, Quick Shot, Double Cut\) \| (\d+)/, ['quick', 'quickshot', 'double']],
  [/-ga spells, Jump \| (\d+)/, ['darkga', 'jump']],
  [/Summons \| (\d+)/, ['hound']],
];
{
  const A = 'design doc';
  let pinned = 0;
  for (const [label, docRx, codeRx, fixed, conv] of DOC_RULES) {
    const dm = docRx.exec(DOC), cm = codeRx.exec(SRC);
    if (!dm) { warn(A, `${label}: the design doc no longer matches ${docRx} (reworded? update DOC_RULES)`); continue; }
    if (!cm) { warn(A, `${label}: the code no longer matches ${codeRx} (refactored? update DOC_RULES)`); continue; }
    const docV = fixed != null ? fixed : +dm[1], codeV = conv ? conv(+cm[1]) : +cm[1];
    if (docV !== codeV) warn(A, `${label}: design doc says ${docV}, code uses ${codeV}`);
    else pinned++;
  }
  for (const [rx, list] of DELAY_GROUPS) {
    const m = rx.exec(DOC); if (!m) { warn(A, `Delay table row ${rx} not found`); continue; }
    for (const s of list) if (SKILLS[s].delay !== +m[1]) warn(A, `Delay: ${SKILLS[s].name} is Delay ${SKILLS[s].delay} in code, the Delay table says ${m[1]}`);
  }
  const most = /Most skills and spells \| (\d+)/.exec(DOC);
  if (most) {
    const grouped = new Set(DELAY_GROUPS.flatMap(g => g[1]));
    const off = Object.entries(SKILLS).filter(([k, s]) => !grouped.has(k) && s.delay !== +most[1]).map(([, s]) => `${s.name} ${s.delay}`);
    if (off.length) warn(A, `Delay: "most skills" are ${most[1]} in the doc, but ${off.length} of ${keys(SKILLS).length - grouped.size} differ (${off.join(', ')})`);
  }
  // Combat roles table: Character | Role | … | Limit Break
  const rows = DOC.split('\n').filter(l => /^\| [A-Z][a-z]+ \| [A-Z]/.test(l));
  for (const r of Object.values(ROSTER)) {
    const row = rows.find(l => l.startsWith(`| ${r.name} |`) && l.split('|').length > 7);
    if (!row) { warn(A, `${r.name}: no row in the Combat roles table`); continue; }
    const cells = row.split('|').map(c => c.trim());
    if (cells[2] !== r.role) warn(A, `${r.name}: role is "${r.role}" in code, "${cells[2]}" in the Combat roles table`);
    const lb = cells[6].split(':')[0].trim();
    if (lb !== r.lb) warn(A, `${r.name}: Limit Break is "${r.lb}" in code, "${lb}" in the Combat roles table`);
  }
  ok(A, `${pinned} of ${DOC_RULES.length} pinned numbers match`);
}

// ---------- report ----------
const errors = out.filter(o => o.level === 'error'), warns = out.filter(o => o.level === 'warn');
const areas = [...new Set(out.map(o => o.area))];
for (const a of areas) {
  const items = out.filter(o => o.area === a && (!quiet || o.level !== 'ok'));
  if (!items.length) continue;
  console.log(`\n${a}`);
  for (const o of items) console.log(`  ${o.level === 'error' ? '✗' : o.level === 'warn' ? '!' : '✓'} ${o.msg}`);
}
console.log(`\n${errors.length} error(s), ${warns.length} warning(s).`);
process.exit(errors.length || (strict && warns.length) ? 1 : 0);
