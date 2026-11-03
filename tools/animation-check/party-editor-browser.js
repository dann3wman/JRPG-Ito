#!/usr/bin/env node
// Chromium check of the party sprite viewer's animation editor: shared animations, skill choreographies
// (Kiri's Spiral Cut), editing, undo, export and the rules party_art.py applies. Requires Playwright; writes a screenshot under output/.
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
    const frame = async re => page.waitForFunction(src => new RegExp(src).test(document.querySelector('#frame').textContent + ' ' + document.querySelector('#cueline').textContent), re.source, { timeout: 3000 });
    // Shared animation: uniform steps, frame stepping, hold and undo.
    await page.click('#anims button[data-a="attack"]');
    await page.click('#play');
    await page.locator('#scrub').fill('0');
    const times = [];
    for (let i = 0; i < 3; i++) { await page.click('#next'); times.push(+(await page.textContent('#clock')).split(' ')[0]); }
    assert.deepEqual(times, [90, 180, 270]);
    await page.click('#strip .chip[data-j="1"]');
    await page.click('#hold');
    assert.deepEqual(JSON.parse(await page.inputValue('#json')).anims.attack.frames, ['ready1', 'attack1', 'attack1', 'attack2', 'attack3', 'attack3']);
    await page.click('#undo');
    assert.equal(JSON.parse(await page.inputValue('#json')).anims.attack.frames.length, 5);
    // Skill choreography: Spiral Cut v02's beats, layers and cues.
    await page.click('#skills button[data-k="kiriSpiralCut"]');
    await page.click('#play');
    await page.locator('#scrub').fill('950'); await frame(/Forward burst · step 3\/8 · attack2.*Kiri's light 16\/20/);
    await page.locator('#scrub').fill('1150'); await frame(/Spiral incision.*incision 7\/31.*cue: CONTACT/);
    await page.locator('#scrub').fill('1500'); await frame(/Suspended wound.*incision 12\/31/);
    await page.locator('#scrub').fill('1830'); await frame(/cue: DAMAGE/);
    await page.locator('#scrub').fill('2450'); await frame(/Recovery.*incision done/);
    await page.screenshot({ path: path.join(out, 'spiral-cut.png') });
    // Edit a step and a cue, then undo both; the frame library swaps the selected step's frame.
    await page.click('#strip .chip[data-j="3"]');
    await page.fill('#sMs', '300'); await page.dispatchEvent('#sMs', 'change');
    await page.fill('#cues input[data-cue="damage"]', '1900'); await page.dispatchEvent('#cues input[data-cue="damage"]', 'change');
    let doc = JSON.parse(await page.inputValue('#json')).skills.kiriSpiralCut;
    assert.equal(doc.actor[3].ms, 300); assert.equal(doc.cues.damage, 1900);
    await page.click('#lib button[data-f="attack3"]');
    assert.equal(JSON.parse(await page.inputValue('#json')).skills.kiriSpiralCut.actor[3].f, 'attack3');
    await page.click('#undo'); await page.click('#undo'); await page.click('#undo');
    doc = JSON.parse(await page.inputValue('#json')).skills.kiriSpiralCut;
    assert.deepEqual([doc.actor[3].f, doc.actor[3].ms, doc.cues.damage], ['special2', 220, 1820]);
    assert.ok(await page.locator('#skills button[data-changed="false"]').count());
    await page.click('#anims button[data-a="idle"]');
    // Standard animations can't be deleted; new ones can.
    assert.ok(await page.locator('#delAnim').isDisabled());
    await page.fill('#newName', 'testPose'); await page.click('#addAnim');
    assert.ok(await page.locator('#delAnim').isEnabled());
    await page.click('#delAnim');
    assert.equal(await page.textContent('#status'), 'Deleted testPose.');
    // A character with no sheet or effect still renders the page.
    await page.click('#cast button[data-id="goku"]');
    assert.match(await page.textContent('#skills'), /None yet/);
    assert.deepEqual(errors, []);
    console.log('Party animation editor checks passed: frame stepping, skill beats, layers and cues, step and cue edits, undo, delete rules.');
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
