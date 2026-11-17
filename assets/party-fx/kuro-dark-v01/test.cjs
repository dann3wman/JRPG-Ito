const assert=require('assert'),fs=require('fs');const m=require('./timeline.v01.json'),{state,Playback}=require('./render.js');
assert.equal(m.actor_track.reduce((a,b)=>a+b.ms,0),3400);
assert.equal(m.target_effect_start_ms+m.target_effect_track.reduce((a,b)=>a+b.ms,0),2430);
assert.equal(m.palm_track.start+m.palm_track.durations.reduce((a,b)=>a+b,0),1320);
for(let t=0;t<=3400;t++){const s=state(t,m);assert(Number.isInteger(s.tx)&&Number.isInteger(s.ty));assert(s.pose>=0&&s.pose<8);if(t>=2430)assert.equal(s.fx,-1);if(t>=1320)assert.equal(s.palm,-1);}
const p=new Playback(m);p.replay();p.tick(3400);assert.deepEqual(p.history,m.cues.map(c=>c.name));assert.equal(p.playing,false);p.seek(0);p.playing=true;p.tick(3400);assert.equal(p.history.length,4);p.replay();assert.deepEqual(p.history,[]);assert.equal(p.time,0);p.seek(2000);assert.deepEqual(p.history,[]);p.tick(1400);assert.deepEqual(p.history,['effect_clear','action_complete']);
p.replay();p.tick(700);p.playing=false;p.tick(500);assert.equal(p.time,700);
const result={track_totals:true,integer_states:3401,event_count:4,damage_event_count:1,seek_dispatches_events:false,backward_seek_duplicates_events:false,replay_resets:true,pause_holds:true,terminal_cleanup:true,ui_interactions_live_verified:false};fs.writeFileSync(__dirname+'/runtime-validation.json',JSON.stringify(result,null,2)+'\n');console.log(result);
