const assert=require('assert'),fs=require('fs');const m=require('./timeline.v01.json'),{state,Playback}=require('./render.js');
assert.equal(m.actor_track.reduce((a,b)=>a+b.ms,0),3600);
assert.equal(m.effect_start_ms+m.effect_track.reduce((a,b)=>a+b.ms,0),2480);
for(let t=0;t<=3600;t++){const s=state(t,m);assert(Number.isInteger(s.fy));assert(s.pose>=0&&s.pose<8);if(t>=2480)assert.equal(s.fx,-1);}
assert.equal(state(1600,m).fx,4);assert.equal(state(1600,m).pose,4);
const p=new Playback(m);p.replay();p.tick(3600);assert.deepEqual(p.history,m.cues.map(c=>c.name));assert.equal(p.playing,false);p.seek(0);p.playing=true;p.tick(3600);assert.equal(p.history.length,4);p.replay();assert.deepEqual(p.history,[]);assert.equal(p.time,0);p.seek(2000);assert.deepEqual(p.history,[]);p.tick(1600);assert.deepEqual(p.history,['effect_clear','action_complete']);p.replay();p.tick(700);p.playing=false;p.tick(500);assert.equal(p.time,700);
for(const speed of [1,.5]){p.replay();for(let i=0;i<3600/speed;i++)p.tick(speed);assert.equal(p.time,3600);assert.equal(p.history.filter(x=>x==='heal').length,1);}
const result={track_totals:true,integer_states:3601,event_count:4,heal_event_count:1,heal_pose_and_effect_sync:true,seek_dispatches_events:false,backward_seek_duplicates_events:false,replay_resets:true,pause_holds:true,normal_half_speed_logic:true,terminal_cleanup:true,ui_interactions_live_verified:false};fs.writeFileSync(__dirname+'/runtime-validation.json',JSON.stringify(result,null,2)+'\n');console.log(result);
