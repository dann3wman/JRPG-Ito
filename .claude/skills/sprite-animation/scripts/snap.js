#!/usr/bin/env node
// Render frames of one rig clip from the Bestiary Rig Viewer into a contact sheet PNG,
// so a clip can be checked (and before/after compared) without watching it play.
//
//   node snap.js <creature> <clip> [out.png] [--frames 8] [--arena none] [--bones] [--size 420]
//
// Frames are evenly spaced over the clip, plus a final frame at t = dur so loop seams show
// (for a looping clip the first and last cells should match).
const path = require('path');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const flag = (name, def) => { const i = args.indexOf('--' + name); if (i < 0) return def; const v = args[i + 1]; args.splice(i, 2); return v; };
const bool = name => { const i = args.indexOf('--' + name); if (i < 0) return false; args.splice(i, 1); return true; };
const frames = +flag('frames', 8), arena = flag('arena', 'none'), size = +flag('size', 420), bones = bool('bones');
const [creature, clip, out = `${creature}-${clip}.png`] = args;
if (!creature || !clip) { console.error('usage: node snap.js <creature> <clip> [out.png] [--frames 8] [--arena none] [--bones] [--size 420]'); process.exit(1); }

const viewer = path.resolve(__dirname, '../../../../tools/bestiary-rig-viewer/index.html');

(async () => {
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1320, height: 900 } });
  page.on('pageerror', e => console.error('page error:', e.message));
  await page.goto('file://' + viewer + '?boss=' + creature);
  await page.waitForFunction(() => document.getElementById('loading').hidden, null, { timeout: 15000 });
  const info = await page.evaluate(([clip, arena, bones]) => {
    const rig = RIGS[st.boss];
    if (!rig.anims[clip]) return { err: `no clip "${clip}"; clips: ${Object.keys(rig.anims).join(', ')}` };
    st.playing = false; st.anim = clip; setArena(arena);
    document.getElementById('tBones').checked = bones;
    return { dur: rig.anims[clip].dur, label: rig.anims[clip].label };
  }, [clip, arena, bones]);
  if (info.err) { console.error(info.err); await browser.close(); process.exit(1); }

  const shots = [];
  for (let i = 0; i <= frames; i++) {
    const t = info.dur * i / frames;
    await page.evaluate(t => { st.t = t; render(); }, t);
    shots.push({ t, png: (await page.locator('#stage').screenshot()).toString('base64') });
  }
  // lay the frames out in a grid on a blank page and screenshot that
  const cols = Math.min(shots.length, 5);
  const sheet = await browser.newPage({ viewport: { width: cols * (size + 8) + 8, height: 200 } });
  await sheet.setContent(`<body style="margin:0;padding:8px;background:#141118;font:12px monospace;color:#bbb;display:grid;grid-template-columns:repeat(${cols},${size}px);gap:8px">
    ${shots.map(s => `<figure style="margin:0"><img src="data:image/png;base64,${s.png}" style="width:${size}px;display:block"><figcaption>${creature} · ${clip} · t=${s.t.toFixed(2)}s</figcaption></figure>`).join('')}</body>`);
  await sheet.screenshot({ path: out, fullPage: true });
  console.log(`${out}: ${shots.length} frames of ${info.label} (${info.dur}s)`);
  await browser.close();
})();
