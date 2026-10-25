const { chromium } = require('C:/Users/dnewman/.codex/node_modules/playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const assert = require('assert/strict');
(async()=>{
  const browser = await chromium.launch({headless:true,executablePath:'C:/Users/dnewman/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe'});
  const page = await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765');
  await page.waitForTimeout(1500);
  for (const formation of ['standard','pincer','ambush']){
    await page.selectOption('#cfgFormation',formation);
    await page.waitForTimeout(500);
    await page.locator('.arena').screenshot({path:`output/arena/${formation}.png`});
    console.log(await page.evaluate(()=>window.render_game_to_text()));
  }
  await page.selectOption('#cfgFormation','standard');
  await page.selectOption('#cfgEnc','t_kuro');
  await page.waitForTimeout(500);
  await page.locator('.arena').screenshot({path:'output/arena/crowded.png'});
  await page.setViewportSize({width:390,height:844});
  await page.waitForTimeout(300);
  await page.screenshot({path:'output/arena/mobile.png',fullPage:true});
  console.log('overflow',await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
  const ready = () => page.waitForFunction(()=>JSON.parse(render_game_to_text()).state==='choose');
  const state = () => page.evaluate(()=>JSON.parse(render_game_to_text()));
  await page.setViewportSize({width:1440,height:1100});
  await page.selectOption('#cfgEnc','widow');
  await ready();
  await page.locator('#arenaStage [data-info]').first().focus();
  await page.keyboard.press('Enter');
  await page.waitForSelector('#info:not([hidden])');
  await page.keyboard.press('Escape');
  assert(await page.locator('#info').isHidden());
  const before = (await state()).units.find(u=>u.side==='enemy');
  await page.click('#cmd [data-a="attack"]');
  await page.locator('#arenaStage [data-ft]').first().click();
  await ready();
  assert((await state()).units.find(u=>u.id===before.id).hp < before.hp);
  console.log('PASS enemy keyboard inspection and arena attack targeting');
  await page.click('#cmd [data-m="item"]');
  await page.click('#cmd [data-i="potion"]');
  assert.equal(await page.locator('#arenaStage [data-pt]').count(),3);
  await page.locator('#arenaStage [data-pt]').first().click();
  await ready();
  console.log('PASS ally item targeting');
  await page.click('#cmd [data-m="swap"]');
  const incoming = await page.locator('#cmd [data-sw]').first().getAttribute('data-sw');
  const outgoing = (await state()).current;
  await page.locator('#cmd [data-sw]').first().click();
  assert.equal(await page.locator(`#arenaStage [data-unit="${incoming}"]`).count(),1);
  assert.equal(await page.locator(`#arenaStage [data-unit="${outgoing}"]`).count(),0);
  console.log('PASS swap updates arena');
  await page.selectOption('#cfgFormation','ambush');
  await ready();
  const initial = await state(), actor = initial.current;
  assert(initial.units.filter(u=>u.side==='party').every(u=>u.x<40 && u.facing==='left'));
  await page.click('#cmd [data-a="defend"]');
  await ready();
  assert.equal((await state()).units.find(u=>u.id===actor).facing,'right');
  await page.locator('.arena').screenshot({path:'output/arena/ambush-after-action.png'});
  console.log('PASS ambush turns acting character toward enemies');
  const encounters = await page.locator('#cfgEnc option').evaluateAll(opts=>opts.map(o=>o.value));
  for (const width of [1440,390,320]){
    await page.setViewportSize({width,height:1000});
    for (const formation of ['standard','pincer','ambush']){
      await page.selectOption('#cfgFormation',formation);
      for (const enc of encounters){
        await page.selectOption('#cfgEnc',enc);
        const s = await state(), party=s.units.filter(u=>u.side==='party'), enemies=s.units.filter(u=>u.side==='enemy');
        if (formation==='standard') assert(Math.max(...enemies.map(u=>u.x))<Math.min(...party.map(u=>u.x)));
        if (formation==='ambush') assert(Math.min(...enemies.map(u=>u.x))>Math.max(...party.map(u=>u.x)));
        if (formation==='pincer') assert(Math.min(...party.map(u=>u.x))<Math.min(...enemies.map(u=>u.x)) && Math.max(...party.map(u=>u.x))>Math.max(...enemies.map(u=>u.x)));
        const layout = await page.evaluate(()=>{
          const box=document.querySelector('#arenaStage').getBoundingClientRect();
          const outside=[...document.querySelectorAll('.arena-unit')].filter(el=>{const r=el.getBoundingClientRect();return r.left<box.left-1||r.right>box.right+1||r.top<box.top-1||r.bottom>box.bottom+1;});
          return {outside:outside.length,overflow:document.documentElement.scrollWidth>innerWidth};
        });
        assert.deepEqual(layout,{outside:0,overflow:false},`${width}/${formation}/${enc}`);
      }
    }
  }
  console.log('PASS 144 encounter/formation/viewport combinations: placement, bounds and horizontal overflow');
  await page.selectOption('#cfgFormation','standard');
  await page.selectOption('#cfgEnc','widow');
  await page.setViewportSize({width:1440,height:1100});
  await ready();
  await page.waitForTimeout(1200);
  await page.screenshot({path:'output/arena/desktop-final.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.locator('.arena').screenshot({path:'output/arena/mobile-final.png'});
  assert.deepEqual(errors,[]);
  console.log('errors',errors);
  await browser.close();
})();
