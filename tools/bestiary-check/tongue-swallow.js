#!/usr/bin/env node
const assert=require('node:assert/strict');
const {loadBattle}=require('../lib/load-game');
let cases=0;
for(const skill of ['lick','savour']) for(const [hp,phase,lefts] of [[3000,'p1',[1]],[1400,'p2',[1,1]],[1500,'p1',[1]],[1400,'p2',[1,2]],[3000,'p1',[2]]]) {
 const B=loadBattle({seed:17});
 B.run(`cfg.enc='tongue2';G={party:ORDER.map(makePC),active:['kiri','natsu','hisui'],enemies:[],log:[],fx:{},pending:[],hum:25};const e=makeFoe('licker');G.enemies.push(e);SCRIPTS.licker.init(e);e.hp=${hp};e.phase='${phase}';`);
 lefts.forEach((left,i)=>B.run(`grabOne(e,byId('${['kiri','natsu'][i]}'));byId('${['kiri','natsu'][i]}').grabbed.left=${left}`));
 B.run(`e.plan={skill:'${skill}',rule:'It is holding someone',ttype:'${skill==='lick'?'random':'all'}',target:${skill==='lick'?"byId('hisui')":'null'}}`);
 const before=B.run('JSON.stringify({e,party:G.party})');const rand=B.ctx.__rand;
 B.ctx.__rand=()=>{throw Error('preview consumed RNG')};
 const imminent=lefts.every(n=>n===1);
 if(imminent){assert.match(B.run('planName(e)'),/Swallow.*Grab/);assert.match(B.run('planText(e)'),/Swallow.*Grab.*up to [12] all/);}
 else assert.equal(B.run('planName(e)'),skill==='lick'?'Lick':'Savour');
 assert.equal(B.run('JSON.stringify({e,party:G.party})'),before);
 B.ctx.__rand=rand;
 B.run("byId('hisui').stress=70;execScripted(e)");
 assert.equal(B.run('e.last'),imminent?'grab':skill);
 assert.equal(B.run("byId('kiri').alive"),lefts[0]!==1);
 if(imminent) assert.equal(B.run("!!byId('hisui').grabbed"),true);
 cases++;
}
// Third taste rescue wins before the deadline; no stale Swallow warning remains.
const B=loadBattle({seed:17});
B.run(`cfg.enc='tongue2';G={party:ORDER.map(makePC),active:['kiri','natsu','hisui'],enemies:[],log:[],fx:{},pending:[],hum:25};const e=makeFoe('licker');G.enemies.push(e);SCRIPTS.licker.init(e);e.phase='p1';grabOne(e,byId('kiri'));byId('kiri').grabbed.left=1;e.plan={skill:'savour',rule:'It is holding someone',ttype:'all',target:null};`);
assert.match(B.run('planText(e)'),/Swallow/);
B.run("['natsu','hisui','tetsugi'].forEach(id=>SCRIPTS.licker.onDamage(e,1,{attacker:byId(id)}))");
assert.doesNotMatch(B.run('planText(e)'),/Swallow/);assert.equal(B.run("byId('kiri').alive"),true);
B.run('e.sleep=1');assert.match(B.run('planText(e)'),/^Next: Asleep/);
B.run('e.sleep=0;e.plan=null');assert.equal(B.run('planText(e)'),'');
console.log(`Tongue swallow preview: ${cases} action/phase/deadline cases plus rescue, sleep and empty plan passed.`);
