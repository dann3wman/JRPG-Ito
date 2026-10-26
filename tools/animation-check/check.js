#!/usr/bin/env node
const assert = require('assert/strict');
const fs = require('fs');
const { loadBattle, loadViewer, GAME, VIEWER } = require('../lib/load-game');

const viewer = loadViewer({ animations: true }), battle = loadBattle({ rigs: true }).rigs;
const rigs = viewer.get('RIGS'), battleRigs = battle.get('RIGS'), atlas = viewer.get('ATLAS');
const fields = viewer.get('POSE_FIELDS'), sample = viewer.get('evalAnim');
const failures = [], warnings = [];
let clips = 0, samples = 0;
const check = (ok, message) => { if (!ok) failures.push(message); };
const core = file => fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n').split('// Animation sampling is identical')[1].split('// End shared animation sampling.')[0];
check(core(GAME) === core(VIEWER), 'Viewer and battle animation samplers differ');

for (const [key, rig] of Object.entries(rigs)) {
  for (const b of rig.bones) {
    if (!b.img) continue;
    const rc = atlas[key][b.img];
    check(!!rc, `${key}.${b.id}: missing sprite`);
    if (rc) check(b.pv && b.pv[0] >= 0 && b.pv[1] >= 0 && b.pv[0] <= rc[2] && b.pv[1] <= rc[3], `${key}.${b.id}: pivot outside sprite`);
    if (b.p && rig.byId[b.p].img) {
      const parent = atlas[key][rig.byId[b.p].img];
      if (b.at[0] < 0 || b.at[1] < 0 || b.at[0] > parent[2] || b.at[1] > parent[3]) warnings.push(`${key}.${b.id}: attachment outside parent art; inspect overlap`);
    }
  }
  const dur = rig.anims.idle.dur, h = 0.0001;
  const a = sample(rig, 'idle', 0).P, b = sample(rig, 'idle', dur).P;
  const before = sample(rig, 'idle', dur - h).P, after = sample(rig, 'idle', h).P;
  for (const bone of rig.bones) for (const f of fields) {
    check(Math.abs(a[bone.id][f] - b[bone.id][f]) < 1e-7, `${key}.${bone.id}.${f}: loop pose seam`);
    const velocity = Math.abs((a[bone.id][f] - before[bone.id][f]) / h - (after[bone.id][f] - a[bone.id][f]) / h);
    check(velocity < 0.2, `${key}.${bone.id}.${f}: loop velocity seam ${velocity.toFixed(3)}`);
  }
  for (const [name, clip] of Object.entries(rig.anims)) {
    clips++;
    for (let i = 0; i <= 60; i++) {
      const t = clip.dur * i / 60, clock = 1.37 + t, e = sample(rig, name, t, clock);
      samples++;
      for (const bone of rig.bones) for (const f of fields) {
        check(Number.isFinite(e.P[bone.id][f]), `${key}.${name}.${bone.id}.${f}: nonfinite pose`);
        if (f === 'sx' || f === 'sy') check(e.P[bone.id][f] > 0, `${key}.${name}.${bone.id}.${f}: inverted scale`);
      }
      const transforms = viewer.get('solve')(rig, e.P, {});
      check(Object.values(transforms).every(m => m.every(Number.isFinite)), `${key}.${name}: invalid world transform`);
      const timing = clip.timing || {};
      const idleBoundary = (i === 0 && (timing.in ?? .12) > 0) || (i === 60 && !timing.holdEnd && (timing.out ?? .22) > 0);
      if (name !== 'idle' && idleBoundary) {
        const idle = sample(rig, 'idle', clock).P;
        for (const bone of rig.bones) for (const f of fields) check(Math.abs(e.P[bone.id][f] - idle[bone.id][f]) < 1e-7, `${key}.${name}: action boundary differs from live idle`);
        check(e.F.every(f => !(f.a > 0.001)), `${key}.${name}: visible FX at boundary`);
      }
      if (battleRigs[key]) {
        const other = battle.get('evalAnim')(battleRigs[key], name, t, clock);
        for (const bone of rig.bones) for (const f of fields) check(Math.abs(e.P[bone.id][f] - other.P[bone.id][f]) < 1e-7, `${key}.${name}.${bone.id}.${f}: viewer/battle pose drift`);
        check(JSON.stringify(e.F) === JSON.stringify(other.F), `${key}.${name}: viewer/battle FX drift`);
      }
    }
  }
}

const delta = viewer.get('animationDelta');
assert.equal(delta(1000, 1080, false), 0.08, 'slow visible frames must not slow animation time');
assert.equal(delta(1000, 1080, true), 0, 'hidden tabs must pause');
assert.equal(delta(1000, 4000, false), 0, 'suspended frames must not jump');
assert.equal(delta(null, 4000, false), 0, 'resume must reset the clock');
const rig = rigs.widow, clock = 2.4, source = { P: sample(rig, 'undertow', 1, clock).P, idle: sample(rig, 'idle', clock).P };
const blended = viewer.get('blendPose')(rig, sample(rig, 'lullaby', 0, clock), source, 0, clock);
for (const bone of rig.bones) for (const f of fields) assert.ok(Math.abs(blended.P[bone.id][f] - source.P[bone.id][f]) < 1e-7, 'interrupted action must retain its outgoing pose');
console.log(`${Object.keys(rigs).length} rigs, ${clips} clips, ${samples} sampled poses; ${Object.keys(battleRigs).length} battle rigs compared.`);
for (const message of [...new Set(warnings)]) console.warn('ART REVIEW: ' + message);
for (const message of [...new Set(failures)]) console.error('FAIL: ' + message);
if (failures.length) process.exitCode = 1;
else console.log('Animation seams, boundaries, pivots, timing and viewer/battle parity passed.');
