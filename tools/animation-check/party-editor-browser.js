#!/usr/bin/env node
// Chromium check of the party sprite viewer's animation editor: playback with a skill effect, editing,
// undo, export and the rules party_art.py applies. Requires Playwright; writes a screenshot under output/.
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');
const { ROOT } = require('../lib/load-game');
const out = path.join(ROOT, 'output/playwright/party-editor');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined, args: ['--allow-file-access-from-files'] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1300, height: 1100 } });
    page.on('pageerror', e => errors.push(e.message));
    const url = pathToFileURL(path.join(ROOT, 'tools/party-sprite-viewer/index.html')).href;
    await page.goto(url + '?who=kiri');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForFunction(() => document.querySelector('#strip canvas'));
    await page.click('#anims button[data-a="special"]');
    await page.click('#play');
    // Spiral Cut starts on special2 (140 ms) and its impact frame (3) begins at 140 + 60 + 60.
    await page.locator('#scrub').fill('260');
    await page.waitForFunction(re => new RegExp(re).test(document.querySelector('#frame').textContent), /effect frame 3\/6 · IMPACT/.source, { timeout: 3000 });
    await page.locator('#scrub').fill('100');
    await page.waitForFunction(re => new RegExp(re).test(document.querySelector('#frame').textContent), /effect waiting/.source, { timeout: 3000 });
    await page.locator('#scrub').fill('639');
    await page.waitForFunction(re => new RegExp(re).test(document.querySelector('#frame').textContent), /effect frame 6\/6/.source, { timeout: 3000 });
    await page.screenshot({ path: path.join(out, 'spiral-cut.png') });
    // Frame stepping visits each change in either layer: 0, 140 (step 2 and effect 1), 200, 260, 280.
    await page.locator('#scrub').fill('0');
    const times = [];
    for (let i = 0; i < 4; i++) { await page.click('#next'); times.push(+(await page.textContent('#clock')).split(' ')[0]); }
    assert.deepEqual(times, [140, 200, 260, 280]);
    // Edits: hold a step, retime an effect frame, then undo both.
    await page.click('#strip .chip[data-j="2"]');
    await page.click('#hold');
    await page.fill('#fxStrip input[data-j="3"]', '200');
    await page.dispatchEvent('#fxStrip input[data-j="3"]', 'change');
    const doc = JSON.parse(await page.inputValue('#json'));
    assert.deepEqual(doc.anims.special.frames, ['special1', 'special2', 'special3', 'special3', 'special3']);
    assert.deepEqual(doc.fx.kiriSpiralCut.ms, [60, 60, 80, 200, 100, 80]);
    assert.match(await page.textContent('#anims button[data-a="special"]'), /✦/);
    await page.click('#undo'); await page.click('#undo');
    assert.equal(await page.textContent('#status'), 'Undone.');
    assert.equal(JSON.parse(await page.inputValue('#json')).anims.special.frames.length, 4);
    // Standard animations can't be deleted; new ones can.
    assert.ok(await page.locator('#delAnim').isDisabled());
    await page.fill('#newName', 'testPose'); await page.click('#addAnim');
    assert.ok(await page.locator('#delAnim').isEnabled());
    await page.click('#delAnim');
    assert.equal(await page.textContent('#status'), 'Deleted testPose.');
    // A character with no sheet or effect still renders the page.
    await page.click('#cast button[data-id="goku"]');
    assert.match(await page.textContent('#fxNone'), /No effect/);
    assert.deepEqual(errors, []);
    console.log('Party animation editor checks passed: effect sync and impact, frame stepping, edits, undo, export, delete rules.');
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
