#!/usr/bin/env node
const assert = require('node:assert/strict');
const {loadBattle} = require('../lib/load-game');
function setup(total, alive, skill='jealousy', phase='p1') {
  const B=loadBattle({seed:17});
  B.run(`cfg.enc='ruri5';G={party:ORDER.map(makePC),active:['kuro','natsu','hisui'],enemies:[],log:[],fx:{},pending:[],hum:25,void:{ct:null},melody:false};
    for(let i=0;i<${total};i++){const r=makeFoe('ruri');r.hadPair=${total}>1;r.phase='${phase}';if(i>=${alive}){r.alive=false;r.hp=0;}G.enemies.push(r);}
    const e=G.enemies[0];e.plan={skill:'${skill}',rule:SCRIPTS.ruri.rules[${skill==='jealousy'?0:1}].label,ttype:'${skill==='jealousy'?'foe':'random'}',target:${skill==='jealousy'?'null':"byId('natsu')"}};`);
  return B;
}
const original=setup(5,2);console.log('Truce preview:',original.run('planText(e)'));
assert.match(original.run('planText(e)'),/Charm or Slap/);
let cases=0;
for(const [total,alive,warning] of [[5,3,false],[5,2,true],[8,5,false],[8,4,true],[2,2,false],[2,1,true]]) {
  for(const roll of [.01,.99]) {
    const B=setup(total,alive),snapshot=B.run('JSON.stringify(G)');
    B.ctx.__rand=()=>{throw Error('preview rolled RNG');};
    assert.equal(B.run('planName(e)'),warning?'Charm or Slap':'Jealousy');
    assert.equal(B.run('JSON.stringify(G)'),snapshot);
    B.ctx.__rand=()=>roll;
    if(warning){B.run('execScripted(e)');assert.equal(B.run('e.last'),roll<.5?'charm':'slap');assert.equal(B.run('e.atk'),alive===1?124:95);}
    cases++;
  }
}
// Spite also replans a previously party-directed action; established p2 does not.
for(const skill of ['charm','slap']) {
 const B=setup(2,1,skill);assert.match(B.run('planText(e)'),/chosen when she acts/);
 B.run("e.phase='p2'");assert.equal(B.run('planText(e)'),`Next: ${skill==='charm'?'Charm':'Slap'} → Natsu`);
 const solo=setup(1,1,skill);assert.doesNotMatch(solo.run('planText(e)'),/chosen when/);
}
const B=setup(5,2);B.run('e.sleep=1');assert.equal(B.run('planName(e)'),'Asleep');assert.match(B.run('planText(e)'),/^Next: Asleep/);
B.run('e.sleep=0;e.plan=null');assert.equal(B.run('planText(e)'),'');
console.log(`Ruri: ${cases} threshold/selection cases plus Spite, solo, sleep and empty-plan checks passed.`);
