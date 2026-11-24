#!/usr/bin/env node
const assert=require('node:assert/strict');
const {loadBattle}=require('../lib/load-game');
function setup(count=1,hp=950){const B=loadBattle({seed:17});B.run(`cfg.enc='whisperer';G={party:ORDER.map(makePC),active:['kiri','natsu','hisui'],enemies:[],log:[],fx:{},pending:[],hum:25,void:{ct:null},melody:false};const e=makeFoe('whisperer');G.enemies.push(e);e.phase='p1';SCRIPTS.whisperer.init(e);e.count=${count};e.hp=${hp};e.plan=planNext(e);`);return B;}
let cases=0;
for(let count=0;count<9;count++)for(const hp of [951,950,949]){
 const B=setup(count,hp), expected=(count+1)%3===0?'aloud':'whisper';
 const state=B.run('JSON.stringify(G)');B.ctx.__rand=()=>{throw Error('preview RNG');};
 assert.equal(B.run('planName(e)'),expected==='aloud'?'Read Aloud':'Whisper');B.run('planText(e)');assert.equal(B.run('JSON.stringify(G)'),state);
 B.ctx.__rand=()=>.99;B.run('execScripted(e)');
 assert.equal(B.run('e.last'),expected,`count=${count}, hp=${hp}`);assert.equal(B.run('e.count'),count+1);cases++;
}
const S=setup();S.run('e.sleep=1;execScripted(e)');assert.equal(S.run('e.count'),1);assert.equal(S.run('e.sleep'),0);
const M=setup(2);M.run('G.melody=true;execScripted(e)');assert.equal(M.run('G.party.every(a=>a.stress===0)'),true);
const E=setup();E.run("e.phase='p2';standBehind(e)");assert.equal(E.run('e.behind.length'),2);
E.run("render=()=>{};swapIn('ren',e.behind[0])");assert.equal(E.run('reachable(e)'),false);
E.run("swapIn('kuro',e.behind[1])");assert.equal(E.run('reachable(e)'),true);
const O=setup();O.run("const o=makeFoe('organ');o.count=4");assert.equal(O.run('planNext(o).skill'),'chord');
console.log(`Whisperer cadence: ${cases} transition/boundary cases; preview purity, sleep, Sound counterplay, exposure and unrelated planning passed.`);

for(const roll of [.1,.99]){const B=setup();B.ctx.__rand=()=>roll;B.run("whisperTo(e,byId('kiri'))");assert.equal(B.run("!!byId('kiri').whisper.ally"),roll<.5);assert.equal(B.run("byId('kiri').st.Silence||0"),roll<.2?2:0);}
