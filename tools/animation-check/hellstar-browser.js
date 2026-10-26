#!/usr/bin/env node
const assert=require('assert/strict'),fs=require('fs'),path=require('path'),http=require('http');
const {pathToFileURL}=require('url'),{chromium}=require('playwright');
const ROOT=path.resolve(__dirname,'../..'),out=path.join(ROOT,'output/playwright/hellstar-integrated');
fs.mkdirSync(path.join(out,'exports'),{recursive:true});
const viewer=path.join(ROOT,'tools/bestiary-rig-viewer/index.html');
const server=http.createServer((req,res)=>{
  const file=path.resolve(ROOT,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(ROOT+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(error,bytes)=>{if(error){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(bytes);});
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let browser;
  const errors=[],report={clips:0,live:{},exports:[]};
  try{
    browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||undefined});
    const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(viewer).href+'?boss=hellstar_unwound');
    await page.waitForFunction(()=>IMG.hellstar_unwound&&$('loading').hidden);
    assert.equal(await page.locator('#bossTabs .tab').count(),25);
    const forms=['hellstar_unwound','hellstar_eaten','hellstar_eye'];
    for(const key of forms){
      const title=await page.evaluate(k=>RIGS[k].short,key);await page.getByRole('button',{name:title,exact:true}).click();
      await page.waitForFunction(k=>IMG[k]&&$('loading').hidden,key);
      await page.locator('#tBones').uncheck();
      const before=await page.locator('#cv').screenshot();
      const clock=await page.evaluate(()=>st.clock);await page.waitForTimeout(1400);
      const after=await page.locator('#cv').screenshot();assert.notDeepEqual(before,after,key+' local-file pixels must move');
      const elapsed=await page.evaluate(c=>st.clock-c,clock);assert.ok(elapsed>1,key+' live clock');report.live[key]=elapsed;
      fs.writeFileSync(path.join(out,key+'-idle-before.png'),before);fs.writeFileSync(path.join(out,key+'-idle-after.png'),after);
      await page.locator('#playBtn').click();
      const clips=await page.evaluate(k=>Object.keys(RIGS[k].anims),key);
      for(const name of clips){
        await page.evaluate(({key,name})=>{st.boss=key;playClip(name);st.playing=false;st.blend=null;st.t=RIGS[key].anims[name].dur*.4;st.clock=st.t;render();},{key,name});
        await page.locator('#cv').screenshot({path:path.join(out,key+'-'+name+'.png')});report.clips++;
      }
      await page.evaluate(k=>{setBoss(k);st.playing=false;render();},key);await page.locator('#tBones').check();await page.locator('#tMesh').check();
      await page.locator('#stage').screenshot({path:path.join(out,key+'-rig.png')});await page.locator('#tMesh').uncheck();
    }
    await page.getByRole('button',{name:'Hellstar I',exact:true}).click();await page.locator('#playBtn').click();
    await page.locator('#tree button[data-id="tongueTip"]').click();
    const joint=await page.evaluate(()=>joints.find(j=>j.id==='tongueTip')),box=await page.locator('#cv').boundingBox();
    await page.mouse.move(box.x+joint.x+3,box.y+joint.y);await page.mouse.down();await page.mouse.move(box.x+joint.x+9,box.y+joint.y+7,{steps:6});await page.mouse.up();
    assert.ok(Math.abs(await page.evaluate(()=>st.manual.tongueTip))>2,'joint drag changes pose');
    await page.locator('#resetPose').click();assert.equal(await page.evaluate(()=>Object.keys(st.manual).length),0);
    await page.locator('#editor summary').first().click();await page.locator('#editMode').selectOption('setup');
    await page.locator('#restR').fill('8');await page.locator('#applyBone').click();
    assert.equal(await page.evaluate(()=>RIGS[st.boss].byId.tongueTip.r),8);
    const deformed=await page.locator('#cv').screenshot();await page.locator('#undoEdit').click();
    assert.notDeepEqual(deformed,await page.locator('#cv').screenshot(),'native Setup edit changes painted skin');await page.locator('#redoEdit').click();
    const patch=await page.evaluate(()=>exportPatch());assert.equal(patch.bones[0].id,'tongueTip');
    await page.evaluate(p=>{restoreRig(RIGS[st.boss],editHistory[st.boss].original);importPatch(p);render();},patch);
    assert.equal(await page.evaluate(()=>RIGS[st.boss].byId.tongueTip.r),8,'patch round trip');
    await page.screenshot({path:path.join(out,'native-authoring.png')});
    await page.evaluate(()=>{restoreRig(RIGS[st.boss],editHistory[st.boss].original);st.mode='animation';$('editMode').value='animation';setBoss('hellstar_unwound');});
    for(const [key,next]of [['hellstar_unwound','hellstar_eaten'],['hellstar_eaten','hellstar_eye']]){
      await page.evaluate(async k=>{setBoss(k);await load(k);await load(RIGS[k].anims.transition.next);playClip('transition');advanceTime(3200);},key);
      assert.equal(await page.evaluate(()=>st.boss),next,'phase transform');
    }
    await page.getByRole('button',{name:'Widow',exact:true}).click();await page.waitForFunction(()=>IMG.widow&&$('loading').hidden);
    assert.equal(await page.locator('#meshExports').isVisible(),false);await page.getByRole('button',{name:/Undertow/}).click();
    await page.evaluate(()=>advanceTime(500));assert.equal(await page.evaluate(()=>st.anim),'undertow');
    await page.locator('#cv').screenshot({path:path.join(out,'existing-widow.png')});
    await page.evaluate(()=>$('editor').open=false);
    for(const width of [768,390,320]){await page.setViewportSize({width,height:900});await page.evaluate(()=>setBoss('hellstar_eye'));await page.waitForFunction(()=>$('loading').hidden);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+width);await page.screenshot({path:path.join(out,'mobile-'+width+'.png'),fullPage:true});}
    const reduced=await browser.newPage({reducedMotion:'reduce'});reduced.on('pageerror',e=>errors.push(e.message));
    await reduced.goto(pathToFileURL(viewer).href+'?boss=hellstar_eaten');await reduced.waitForFunction(()=>IMG.hellstar_eaten&&$('loading').hidden);assert.equal(await reduced.evaluate(()=>st.playing),false);
    await reduced.getByRole('button',{name:/The Eaten \/ Chorus/}).click();assert.equal(await reduced.evaluate(()=>st.playing),true);await reduced.close();
    await page.setViewportSize({width:1440,height:1000});
    await page.goto(`http://127.0.0.1:${server.address().port}/tools/bestiary-rig-viewer/index.html?boss=hellstar_unwound`);await page.waitForFunction(()=>IMG.hellstar_unwound&&$('loading').hidden);
    for(const key of forms){
      await page.evaluate(async k=>{setBoss(k);await load(k);if(RIGS[k].anims.transition.next)await load(RIGS[k].anims.transition.next);st.playing=false;render();},key);
      for(const name of await page.evaluate(k=>Object.keys(RIGS[k].anims),key)){
        await page.evaluate(n=>{playClip(n);st.playing=false;},name);
        const pending=page.waitForEvent('download');await page.locator('#exportMeshSheet').click();const d=await pending;await d.saveAs(path.join(out,'exports',d.suggestedFilename()));report.exports.push(d.suggestedFilename());
      }
      const pending=page.waitForEvent('download');await page.locator('#exportMesh').click();const d=await pending;await d.saveAs(path.join(out,'exports',d.suggestedFilename()));
    }
    const missing=await browser.newPage();missing.on('pageerror',e=>errors.push(e.message));await missing.route('**/hellstar-stage-2-eaten.png',route=>route.abort());
    await missing.goto(`http://127.0.0.1:${server.address().port}/tools/bestiary-rig-viewer/index.html?boss=hellstar_eaten`);await missing.waitForFunction(()=>$('loading').textContent.includes('failed'));assert.ok(await missing.locator('#loading').isVisible());await missing.close();
    assert.deepEqual(errors,[]);report.pageErrors=errors;report.result='PASS';fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
  }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
