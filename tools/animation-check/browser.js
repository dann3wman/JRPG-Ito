#!/usr/bin/env node
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');
const { ROOT } = require('../lib/load-game');
const out = path.join(ROOT, 'output/playwright');
fs.mkdirSync(out, { recursive: true });
const gameURL = pathToFileURL(path.join(ROOT, 'index.html')).href + '?animationTest=1';
const viewerURL = pathToFileURL(path.join(ROOT, 'tools/bestiary-rig-viewer/index.html')).href;

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined, args: ['--allow-file-access-from-files'] });
  const errors = [], results = {};
  try {
    const page = await browser.newPage({ viewport: { width: 1320, height: 900 } });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(viewerURL + '?boss=widow');
    await page.waitForFunction(() => IMG.widow && document.getElementById('loading').hidden);
    await page.getByRole('button', { name: /Undertow/ }).first().click();
    await page.getByRole('button', { name: 'Preview hit', exact: true }).click();
    await page.getByLabel('Effect detail').selectOption('low');
    assert.equal(await page.evaluate(() => document.getElementById('detail').value), 'low');
    await page.getByLabel('Effect detail').selectOption('full');
    await page.getByRole('button', { name: 'Pause', exact: true }).click();
    await page.evaluate(() => { const s = document.getElementById('scrub'); s.value = '400'; s.dispatchEvent(new Event('input')); });
    assert.equal(await page.evaluate(() => st.playing), false);
    results.pauseContinuity = await page.evaluate(() => {
      st.anim = 'undertow'; st.t = 0.08; st.clock = 2.45; st.blend = null; st.hitAt = -1;
      st.playing = true; render(); const before = cv.toDataURL();
      st.playing = false; render(); return before === cv.toDataURL();
    });
    assert.ok(results.pauseContinuity, 'pausing must retain the continuous idle phase');
    await page.screenshot({ path: path.join(out, 'viewer-controls.png') });

    results.viewer = await page.evaluate(async () => {
      st.playing = false;
      const report = { rigs: 0, clips: 0, frames: 0, alpha: [] };
      for (const key of Object.keys(RIGS)) {
        setBoss(key); st.playing = false;
        if (!await load(key)) throw new Error('Failed to load ' + key);
        const sheet = document.createElement('canvas'); sheet.width = IMG[key].width; sheet.height = IMG[key].height;
        const g = sheet.getContext('2d'); g.drawImage(IMG[key], 0, 0);
        const pixels = g.getImageData(0, 0, sheet.width, sheet.height).data;
        let transparent = 0; for (let i = 3; i < pixels.length; i += 4) if (pixels[i] === 0) transparent++;
        if (!transparent) throw new Error(key + ' sheet has no real transparency');
        report.alpha.push({ key, transparent: +(transparent / (pixels.length / 4)).toFixed(3) });
        for (const [name, clip] of Object.entries(RIGS[key].anims)) {
          st.anim = name; st.blend = null; st.hitAt = -1;
          for (const fraction of [0, 0.25, 0.5, 0.75, 1]) { st.t = fraction * clip.dur; st.clock = st.t; render(); report.frames++; }
          report.clips++;
        }
        report.rigs++;
      }
      setBoss('widow'); st.playing = false;
      return report;
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(out, 'viewer-mobile.png') });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'viewer must fit mobile');
    await page.setViewportSize({ width: 1320, height: 900 });
    for (const key of ['orlen', 'puppeteers', 'greyhound', 'whisperer']) {
      await page.evaluate(async key => { setBoss(key); st.playing = false; await load(key); document.getElementById('tBones').checked = true; document.getElementById('tRef').checked = true; st.t = 0.8; st.clock = st.t; render(); }, key);
      await page.locator('#stage').screenshot({ path: path.join(out, key + '-joint-review.png') });
    }
    await page.close();

    const deterministic = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    deterministic.on('pageerror', e => errors.push(e.message));
    await deterministic.addInitScript(() => { window.requestAnimationFrame = () => 0; });
    await deterministic.goto(gameURL);
    await deterministic.waitForFunction(() => window.__rigTest && __rigTest.loaded.widow, null, { polling: 100 });
    results.timing = await deterministic.evaluate(() => {
      const D = __rigTest, u = [...D.units.values()].find(u => u.rig.key === 'widow');
      const compare = (a, b) => Math.max(...u.rig.bones.flatMap(bone => ['x', 'y', 'r', 'sx', 'sy', 'a'].map(f => Math.abs(a[bone.id][f] - b[bone.id][f]))));
      D.tick(0); D.tick(16);
      RigAnim.play(u.id, 'undertow');
      D.tick(96);
      const slowFrameAdvance = u.t;
      const before = D.sampleUnit(u).P;
      RigAnim.play(u.id, 'lullaby');
      const interruptionJump = compare(before, D.sampleUnit(u).P);
      RigAnim.hit(u.id);
      const beforePause = { t: u.t, clock: u.clock, hitAge: u.clock - u.hitAt };
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange')); D.tick(5000);
      Object.defineProperty(document, 'hidden', { configurable: true, value: false });
      document.dispatchEvent(new Event('visibilitychange')); D.tick(9000);
      const afterPause = { t: u.t, clock: u.clock, hitAge: u.clock - u.hitAt };
      for (let t = 9016; t <= 14000; t += 16) D.tick(t);
      const returnedToIdle = u.clip === 'idle', idleClock = u.clock, rates = [];
      for (const fps of [30, 60, 120]) {
        u.clock = 0; u.t = 0; u.clip = 'idle'; u.blend = null; u.hitAt = -1;
        D.tick(0); RigAnim.play(u.id, 'undertow');
        for (let i = 1; i <= fps * 2; i++) D.tick(i * 1000 / fps);
        rates.push({ fps, clock: u.clock, t: u.t, pose: D.sampleUnit(u).P.root.x });
      }
      return { slowFrameAdvance, interruptionJump, beforePause, afterPause, returnedToIdle, idleClock, rates, detail: D.detail.level };
    });
    assert.ok(Math.abs(results.timing.slowFrameAdvance - 0.08) < 1e-8);
    assert.ok(results.timing.interruptionJump < 1e-8);
    assert.deepEqual(results.timing.beforePause, results.timing.afterPause);
    assert.ok(results.timing.returnedToIdle);
    for (const rate of results.timing.rates) {
      assert.ok(Math.abs(rate.clock - 2) < 1e-7);
      assert.ok(Math.abs(rate.pose - results.timing.rates[0].pose) < 1e-7);
    }
    await deterministic.screenshot({ path: path.join(out, 'battle-animation.png') });
    await deterministic.emulateMedia({ reducedMotion: 'reduce' });
    await deterministic.waitForTimeout(100);
    results.reducedMotion = await deterministic.evaluate(() => {
      const D = __rigTest, u = [...D.units.values()][0], clock = u.clock;
      const duration = RigAnim.play(u.id, 'undertow'); RigAnim.hit(u.id); D.tick(15000); D.tick(15016);
      return { duration, clockUnchanged: u.clock === clock, clip: u.clip };
    });
    assert.equal(results.reducedMotion.duration, 0);
    assert.ok(results.reducedMotion.clockUnchanged);
    assert.equal(results.reducedMotion.clip, 'idle');
    await deterministic.close();

    const live = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    live.on('pageerror', e => errors.push(e.message));
    await live.goto(gameURL);
    await live.waitForFunction(() => window.__rigTest && __rigTest.loaded.widow);
    await live.evaluate(async () => {
      const arts = ['widow', 'orlen', 'organ', 'holes', 'unwound', 'tongue'];
      await RigAnim.preload(arts);
      document.querySelector('.page').style.display = 'none';
      const stage = document.createElement('div'); stage.id = 'animation-stress';
      stage.style.cssText = 'position:fixed;inset:0;z-index:9999;display:grid;grid-template-columns:repeat(3,1fr);background:#ecebe6;overflow:auto';
      stage.innerHTML = arts.map((art, i) => RigAnim.box('info:stress' + i, art, '')).join('');
      document.body.append(stage); RigAnim.mount(stage);
      arts.forEach((art, i) => RigAnim.play('info:stress' + i, 'attack'));
    });
    const cdp = await live.context().newCDPSession(live);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await live.waitForTimeout(1000);
    results.profile = await live.evaluate(() => new Promise(resolve => {
      const intervals = [], costs = []; let last = performance.now(), start = last;
      function sample(ms) {
        intervals.push(ms - last); last = ms; costs.push(__rigTest.detail.cost);
        if (ms - start < 3500) requestAnimationFrame(sample);
        else { intervals.sort((a, b) => a - b); resolve({ throttle: 4, frames: intervals.length, p95FrameMs: +intervals[Math.floor(intervals.length * 0.95)].toFixed(2), maxDrawCostMs: +Math.max(...costs).toFixed(2), effectDetail: __rigTest.detail.level }); }
      }
      requestAnimationFrame(sample);
    }));
    await live.screenshot({ path: path.join(out, 'six-rigs-throttled.png') });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    await live.evaluate(() => document.getElementById('animation-stress').remove());

    const missing = await browser.newPage();
    missing.on('pageerror', e => errors.push(e.message));
    await missing.route('**/widow.webp', route => route.abort());
    await missing.goto(gameURL);
    await missing.waitForTimeout(500);
    assert.ok(await missing.locator('.rigbox[data-rig="widow"]:not(.ready) img').isVisible(), 'missing sheet must retain static art');
    results.missingSheetFallback = true;
    assert.deepEqual(errors, [], 'browser runtime errors');
    results.errors = errors;
    fs.writeFileSync(path.join(out, 'animation-report.json'), JSON.stringify(results, null, 2) + '\n');
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
