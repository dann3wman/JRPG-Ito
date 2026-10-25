#!/usr/bin/env node
// Render frames of one rig clip from the Bestiary Rig Viewer into a contact sheet PNG,
// so a clip can be checked (and before/after compared) without watching it play.
//
//   node snap.js <creature> <clip> [out.png] [--frames 8] [--arena none] [--bones] [--size 420]
//     [--seams] [--extrema] [--sequence]
//
// Frames are evenly spaced over the clip, plus a final frame at t = dur so loop seams show
// (for a looping clip the first and last cells should match).
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const flag = (name, def) => { const i = args.indexOf('--' + name); if (i < 0) return def; const v = args[i + 1]; args.splice(i, 2); return v; };
const bool = name => { const i = args.indexOf('--' + name); if (i < 0) return false; args.splice(i, 1); return true; };
const frames = +flag('frames', 8), arena = flag('arena', 'none'), size = +flag('size', 420), bones = bool('bones');
const seams = bool('seams'), extrema = bool('extrema'), sequence = bool('sequence');
const [creature, clip, out = `${creature}-${clip}.png`] = args;
if (!creature || !clip) { console.error('usage: node snap.js <creature> <clip> [out.png] [--frames 8] [--arena none] [--bones] [--size 420]'); process.exit(1); }

const viewer = path.resolve(__dirname, '../../../../tools/bestiary-rig-viewer/index.html');

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined, args: ['--allow-file-access-from-files'] });
  try {
  const page = await browser.newPage({ viewport: { width: 1320, height: 900 } });
  await page.addInitScript(() => { window.requestAnimationFrame = () => 0; });
  page.on('pageerror', e => console.error('page error:', e.message));
  await page.goto(pathToFileURL(viewer).href + '?boss=' + encodeURIComponent(creature));
  await page.waitForFunction(() => document.getElementById('loading').hidden, null, { timeout: 30000, polling: 100 });
  const info = await page.evaluate(([clip, arena, bones]) => {
    const rig = RIGS[st.boss];
    if (!rig.anims[clip]) return { err: `no clip "${clip}"; clips: ${Object.keys(rig.anims).join(', ')}` };
    st.playing = false; st.anim = clip; setArena(arena);
    document.getElementById('tBones').checked = bones;
    return { dur: rig.anims[clip].dur, label: rig.anims[clip].label, idleDur: rig.anims.idle.dur };
  }, [clip, arena, bones]);
  if (info.err) { console.error(info.err); await browser.close(); process.exit(1); }

  let times = Array.from({ length: frames + 1 }, (_, i) => info.dur * i / frames);
  if (seams) times.push(0.001, 0.016, info.dur - 0.016, info.dur - 0.001);
  if (extrema) times.push(...await page.evaluate(clip => {
    const rig = RIGS[st.boss], dur = rig.anims[clip].dur, extremes = new Map();
    for (let i = 0; i <= 120; i++) {
      const t = dur * i / 120, P = evalAnim(rig, clip, t).P;
      for (const b of rig.bones) for (const f of ['x', 'y', 'r']) {
        const key = b.id + ':' + f, v = P[b.id][f], e = extremes.get(key);
        if (!e) extremes.set(key, { min: v, max: v, lo: t, hi: t });
        else { if (v < e.min) { e.min = v; e.lo = t; } if (v > e.max) { e.max = v; e.hi = t; } }
      }
    }
    return [...extremes.values()].sort((a, b) => (b.max - b.min) - (a.max - a.min)).slice(0, 4).flatMap(e => [e.lo, e.hi]);
  }, clip));
  times = [...new Set(times)].sort((a, b) => a - b);
  const shots = [];
  for (const t of times) {
    await page.evaluate(t => { st.t = t; st.clock = t; st.blend = null; st.hitAt = -1; render(); }, t);
    shots.push({ label: 't=' + t.toFixed(3) + 's', png: (await page.locator('#stage').screenshot()).toString('base64') });
  }
  if (sequence) for (const t of [0, 0.5, 0.56, 0.75, 1.4, 1.48, 0.5 + info.dur, 0.75 + info.dur]) {
    await page.evaluate(([t, clip, dur]) => {
      st.playing = true; st.clock = 1.37 + t; st.blend = null;
      st.anim = t >= 0.5 && t < 0.5 + dur ? clip : 'idle';
      st.t = st.anim === 'idle' ? loopTime(st.clock, RIGS[st.boss].anims.idle.dur) : t - 0.5;
      st.hitAt = t >= 1.4 ? 2.77 : -1; render(); st.playing = false;
    }, [t, clip, info.dur]);
    shots.push({ label: 'sequence ' + t.toFixed(2) + 's', png: (await page.locator('#stage').screenshot()).toString('base64') });
  }
  // lay the frames out in a grid on a blank page and screenshot that
  const cols = Math.min(shots.length, 5);
  const sheet = await browser.newPage({ viewport: { width: cols * (size + 8) + 8, height: 200 } });
  await sheet.setContent(`<body style="margin:0;padding:8px;background:#141118;font:12px monospace;color:#bbb;display:grid;grid-template-columns:repeat(${cols},${size}px);gap:8px">
    ${shots.map(s => `<figure style="margin:0"><img src="data:image/png;base64,${s.png}" style="width:${size}px;display:block"><figcaption>${creature} · ${clip} · ${s.label}</figcaption></figure>`).join('')}</body>`);
  await sheet.screenshot({ path: out, fullPage: true });
  console.log(`${out}: ${shots.length} frames of ${info.label} (${info.dur}s)`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
