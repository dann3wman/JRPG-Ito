const fs=require('fs'),vm=require('vm'),assert=require('assert');
(async()=>{
 const el={};for(const id of ['c','seek','status','replay','pause','speed','bg'])el[id]={value:id==='speed'?'1':'0',selectedIndex:0};
 el.c.getContext=()=>({drawImage(){},imageSmoothingEnabled:true});let callback,now=0;
 const ctx={document:{querySelector:s=>el[s.slice(1)]},Image:class{decode(){return Promise.resolve()}},performance:{now:()=>now},requestAnimationFrame:f=>callback=f,window:{},...el};vm.createContext(ctx);
 const html=fs.readFileSync(__dirname+'/preview.html','utf8');vm.runInContext(html.match(/<script>([\s\S]*)<\/script>/)[1],ctx);await new Promise(r=>setImmediate(r));
 function step(ms){now+=ms;callback(now)}
 step(1520);assert.equal(ctx.window.previewState().events.filter(x=>x==='relief').length,1);step(1680);assert.equal(ctx.window.previewState().playing,false);assert.equal(ctx.window.previewState().time,3200);
 el.replay.onclick();assert.equal(ctx.window.previewState().events.length,0);el.speed.value='.5';step(3200);assert.equal(ctx.window.previewState().time,1600);step(3200);assert.equal(ctx.window.previewState().time,3200);
 el.seek.value='2000';el.seek.oninput();assert.equal(ctx.window.previewState().events.length,0);assert.equal(ctx.window.previewState().playing,false);
 el.bg.selectedIndex=1;el.bg.onchange();el.replay.onclick();assert.equal(ctx.window.previewState().time,0);console.log('PASS: normal/half speed, one relief cue, stop, replay, seek without cues, background control. Simulated DOM, not live playback.');
})().catch(e=>{console.error(e);process.exit(1)});
