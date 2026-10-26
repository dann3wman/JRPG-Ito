#!/usr/bin/env node
const assert = require('assert/strict');
const { loadViewer, loadBattle } = require('../lib/load-game');
for (const runtime of [loadViewer({ animations: true }), loadBattle({ rigs: true }).rigs]) {
  const rigs = runtime.get('RIGS'), validate = runtime.get('validateRig'), solve = runtime.get('solve');
  const pose = runtime.get('makePose'), sample = runtime.get('evalAnim'), ap = runtime.get('ap');
  const fixture = () => ({
    key: 'widow', bones: [
      { id: 'root', at: [0, 0] },
      { id: 'upper', p: 'root', at: [0, 0], pv: [0, 0] },
      { id: 'lower', p: 'upper', at: [10, 0], pv: [0, 0], tip: [10, 0] }
    ], anims: { idle: { dur: 2, fn() {} }, strike: { dur: 2, fn(t, P, F) { P.upper.r = 30; F.push({ img: 'undertow', at: [0, 0], a: 1 }); } } }
  });
  const prepare = r => { r.bones = validate(r, r.key); r.byId = Object.fromEntries(r.bones.map(b => [b.id, b])); return r; };
  for (const [change, pattern] of [
    [r => r.bones.push({ id: 'upper' }), /duplicate/],
    [r => r.bones[1].p = 'missing', /missing parent/],
    [r => r.bones[1].p = 'lower', /cycle/],
    [r => r.bones[1].img = 'missing', /missing sprite/],
    [r => r.anims.strike.dur = 0, /duration/],
    [r => r.anims.strike.tracks = [{ bone: 'oops', field: 'r', keys: [[0, 2]] }], /track/],
    [r => r.anims.strike.markers = { anticipation: 1, impact: .5, recovery: 1.5 }, /markers/],
    [r => r.constraints = [{ id: 'bad', upper: 'root', lower: 'lower', tip: [1, 1], target: [2, 3] }], /constraint/]
  ]) { const r = fixture(); change(r); assert.throws(() => prepare(r), pattern); }
  const r = prepare(fixture());
  assert.throws(() => pose(r, 'strike').typo, /widow.strike.*typo/);
  assert.throws(() => { pose(r, 'strike').typo = {}; }, /widow.strike.*typo/);
  assert.equal(r.bones.length, 3, 'validation must not discard bones');
  r.constraints = [{ id: 'hand', upper: 'upper', lower: 'lower', tip: [10, 0], target: [12, 8], mix: 1, bend: 1 }];
  const end = P => ap(solve(r, P).lower, 10, 0);
  let target = end(pose(r));
  assert.ok(Math.hypot(target[0] - 12, target[1] - 8) < .01, 'IK reaches a reachable target');
  const clockwise = solve(r, pose(r)).lower[5];
  r.constraints[0].bend = -1;
  assert.notEqual(solve(r, pose(r)).lower[5], clockwise, 'bend direction chooses another elbow');
  r.constraints[0].target = [100, 0];
  target = end(pose(r)); assert.ok(Math.hypot(...target) <= 20.001, 'unreachable target does not stretch the limb');
  r.constraints[0].mix = 0;
  assert.deepEqual(Array.from(end(pose(r))), [20, 0], 'zero influence preserves FK');
  r.constraints[0].mix = .5; r.constraints[0].target = [10, 10];
  assert.ok(end(pose(r)).every(Number.isFinite));
  r.bones[0].flip = true; r.constraints[0].mix = 1; r.constraints[0].target = [-12, 8];
  target = end(pose(r)); assert.ok(Math.hypot(target[0] + 12, target[1] - 8) < .01, 'mirrored parent supports IK');
  r.bones[0].flip = false;
  r.bones[2].sx = 1.5; r.constraints[0].target = [15, 6];
  const scaledTip = ap(solve(r, pose(r)).lower, 15, 0);
  assert.ok(Math.hypot(scaledTip[0] - 15, scaledTip[1] - 6) < .01, 'IK accounts for sprite-only tip scale');
  delete r.bones[2].sx;
  const stretchedPose = pose(r); stretchedPose.root.sx = 1.4;
  r.constraints[0].target = [16, 8];
  const stretchedTip = ap(solve(r, stretchedPose).lower, 10, 0);
  assert.ok(Math.hypot(stretchedTip[0] - 16, stretchedTip[1] - 8) < .05, 'IK refines a non-uniform parent');
  const before = solve(r, pose(r), {}, false);
  runtime.get('movePivot')(r, 'upper', [2, 3]);
  const after = solve(r, pose(r), {}, false);
  assert.deepEqual(Array.from(after.lower), Array.from(before.lower), 'pivot edit preserves child world placement');
  const oldPixel = ap(before.upper, 4, 6), newPixel = ap(after.upper, 4 - 2, 6 - 3);
  assert.deepEqual(Array.from(newPixel), Array.from(oldPixel), 'pivot edit preserves artwork placement');
  r.anims.strike.timing = { in: 0, out: 0, mix: .4, fxOut: .6, holdEnd: true };
  r.anims.strike.tracks = [{ bone: 'upper', field: 'r', mode: 'hold', keys: [[0, 0], [.5, 60], [1, -20]] }];
  assert.equal(sample(r, 'strike', .49).P.upper.r, 0);
  assert.equal(sample(r, 'strike', .5).P.upper.r, 60);
  assert.equal(sample(r, 'strike', 2).P.upper.r, -20, 'holdEnd retains final action offset');
  r.anims.strike.swaps = [{ bones: ['upper', 'lower'], keys: [[0, 'upper'], [1, 'lower']] }];
  const source = runtime.get('captureBlend')(r, sample(r, 'strike', .8), .8);
  const start = runtime.get('blendPose')(r, sample(r, 'strike', 1), source, 0, 1);
  assert.equal(start.P.upper.a, 0); assert.equal(start.P.lower.a, 1, 'swap remains discrete during a blend');
  assert.equal(start.F.filter(f => f.a > 0).length, 1, 'outgoing effects survive interruption');
  const middle = runtime.get('blendPose')(r, sample(r, 'strike', 1), source, .3, 1);
  assert.ok(middle.F[1].a > 0 && middle.F[1].a < 1, 'outgoing effects fade');
  const finished = runtime.get('blendPose')(r, sample(r, 'strike', 1), source, .7, 1);
  assert.equal(finished.F.length, 1, 'outgoing effects expire');
  const bounds = runtime.get('itemBounds')(rigs.widow, { img: 'undertow', m: [1, 0, 0, 1, 0, 0], warp: { ax: 'y', amp: 20 }, wm: 2 });
  assert.ok(bounds[0] <= -40 && bounds[2] >= 314, 'bounds include warp displacement');
  r.anims.aim = { dur: 2, fn(t, P) { P.ik = { hand: { target: [3, 4], mix: .2 } }; } };
  assert.equal(sample(r, 'aim', 0).P.ik.hand.mix, 1, 'action target envelope starts at idle influence');
  const aimSource = runtime.get('captureBlend')(r, sample(r, 'aim', 1), 1);
  const aimBlend = runtime.get('blendPose')(r, sample(r, 'strike', .5), aimSource, 0, 1);
  assert.ok(Math.abs(aimBlend.P.ik.hand.mix - .2) < 1e-8, 'interrupted target influence starts continuously');
  assert.deepEqual(Array.from(aimBlend.P.ik.hand.target), [3, 4], 'interrupted target position starts continuously');
}
console.log('Authoring checks passed in viewer and battle: malformed rigs, IK, pivot preservation, held tracks, swaps and interrupted FX.');
