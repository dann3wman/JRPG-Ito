#!/usr/bin/env node
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');
const { ROOT } = require('../lib/load-game');
const accept = process.argv.includes('--accept'), out = path.join(ROOT, 'output/playwright/rig-review');
const references = path.join(__dirname, 'references');
fs.mkdirSync(out, { recursive: true });
if (accept) fs.mkdirSync(references, { recursive: true });
const cases = [['widow', 'undertow'], ['orlen', 'crozier'], ['ainsel', 'unwind'], ['tongue', 'grab'], ['whisperer', 'whisper'], ['greyhound', 'maul']];

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined, args: ['--allow-file-access-from-files'] });
  const errors = [], results = { references: [], overflow: [], exceptions: [] };
  try {
    const page = await browser.newPage({ viewport: { width: 1320, height: 900 }, deviceScaleFactor: 1 });
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => { requestAnimationFrame = () => 0; });
    await page.goto(pathToFileURL(path.join(ROOT, 'tools/bestiary-rig-viewer/index.html')).href);
    await page.waitForFunction(() => IMG[st.boss], null, { polling: 100 });
    await page.evaluate(() => {
      $('tBones').checked = false; $('tRef').checked = false; $('tBounds').checked = false;
      $('editor').open = false; st.mode = 'animation'; st.playing = false;
    });
    // Scan every clip at dense samples and its authored keys; report overflow without inventing art exceptions.
    const scan = await page.evaluate(async () => {
      const overflow = [], exceptions = [];
      for (const key of Object.keys(RIGS)) {
        setBoss(key); st.playing = false; await load(key); setArena('none');
        CW = 640; CH = 480; dpr = 1; cv.width = CW; cv.height = CH; st.view = null;
        const rig = RIGS[key], V = getView(rig);
        for (const [name, clip] of Object.entries(rig.anims)) {
          let maxPixels = 0, worstTime = 0, worstPart = '';
          const times = new Set(Array.from({ length: 121 }, (_, i) => clip.dur * i / 120));
          for (const t of Object.values(clip.markers || {})) times.add(t);
          for (const track of [...(clip.tracks || []), ...(clip.swaps || [])]) for (const [t] of track.keys) times.add(t);
          for (const t of times) {
            const { P, F } = evalAnim(rig, name, t, 1.37 + t), M = solve(rig, P);
            for (const it of frame(rig, P, F, M)) {
              if (it.clip) continue;
              const b = itemBounds(rig, it), p = ap(V, b[0], b[1]), q = ap(V, b[2], b[3]);
              const pixels = Math.max(0, -p[0], -p[1], q[0] - CW, q[1] - CH);
              if (pixels > maxPixels) { maxPixels = pixels; worstTime = t; worstPart = it.img || it.id; }
            }
          }
          if (maxPixels > 1) {
            const finding = { creature: key, clip: name, pixels: +maxPixels.toFixed(2), t: +worstTime.toFixed(4), part: worstPart };
            const reason = rig.review?.overflow?.[name];
            if (reason) exceptions.push({ ...finding, reason }); else overflow.push(finding);
          }
        }
      }
      return { overflow, exceptions };
    });
    Object.assign(results, scan);
    for (const [creature, clip] of cases) {
      const shot = await page.evaluate(async ([creature, name]) => {
        setBoss(creature); st.playing = false; await load(creature); setArena('none');
        CW = 640; CH = 480; dpr = 1; cv.width = CW; cv.height = CH; st.view = null;
        const rig = RIGS[creature], clip = rig.anims[name]; if (!clip) throw new Error(creature + ': missing review clip ' + name);
        const rest = solve(rig, makePose(rig)), candidates = [];
        for (let i = 0; i <= 120; i++) {
          const t = clip.dur * i / 120, { P } = evalAnim(rig, name, t, t + 1.37), M = solve(rig, P);
          const score = rig.bones.reduce((sum, b) => sum + Math.hypot(M[b.id][4] - rest[b.id][4], M[b.id][5] - rest[b.id][5]), 0);
          candidates.push({ t, score });
        }
        candidates.sort((a, b) => b.score - a.score);
        st.anim = name; st.t = candidates[0].t; st.clock = st.t + 1.37; st.blend = null; st.hitAt = -1;
        render();
        return { t: st.t, png: cv.toDataURL('image/png') };
      }, [creature, clip]);
      const name = creature + '-' + clip + '.png', baseline = path.join(references, name), current = path.join(out, name);
      fs.writeFileSync(current, Buffer.from(shot.png.split(',')[1], 'base64'));
      if (accept) fs.copyFileSync(current, baseline);
      assert.ok(fs.existsSync(baseline), 'Missing visual reference ' + name + '; inspect captures and run --accept');
      const reference = 'data:image/png;base64,' + fs.readFileSync(baseline).toString('base64');
      const diff = await page.evaluate(async ([reference, current]) => {
        const read = async url => { const image = new Image(); image.src = url; await image.decode(); const c = document.createElement('canvas'); c.width = image.width; c.height = image.height; const g = c.getContext('2d'); g.drawImage(image, 0, 0); return { width: c.width, height: c.height, pixels: g.getImageData(0, 0, c.width, c.height).data }; };
        const a = await read(reference), b = await read(current);
        if (a.width !== b.width || a.height !== b.height) throw new Error('Reference dimensions differ');
        let changed = 0;
        for (let i = 0; i < a.pixels.length; i += 4) {
          // Compare premultiplied colour so RGB hidden under transparent pixels is irrelevant.
          const aa = a.pixels[i + 3] / 255, ba = b.pixels[i + 3] / 255;
          if (Math.abs(aa - ba) * 255 > 8 || [0, 1, 2].some(c => Math.abs(a.pixels[i + c] * aa - b.pixels[i + c] * ba) > 8)) changed++;
        }
        return changed / (a.width * a.height);
      }, [reference, shot.png]);
      results.references.push({ creature, clip, t: shot.t, changedFraction: diff });
      assert.ok(diff <= .005, name + ': visual change exceeds 0.5%; inspect ' + current);
    }
    assert.deepEqual(errors, []);
    results.browser = browser.version(); results.errors = errors;
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(results, null, 2) + '\n');
    console.log(JSON.stringify({ references: results.references, overflowWarnings: results.overflow.length, documentedExceptions: results.exceptions.length, browser: results.browser }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
