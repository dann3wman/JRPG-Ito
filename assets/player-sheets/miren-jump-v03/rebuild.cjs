// Rebuild both previews from the delivered atlas and the two renderer versions.
// Usage: node rebuild.cjs /absolute/scratch/output
// Requires @napi-rs/canvas, optionally under CODEX_PRIMARY_RUNTIME_NODE_MODULES.
const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert');
const { createCanvas, Image } = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
  ? path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, '@napi-rs/canvas') : '@napi-rs/canvas');
const root = __dirname, out = path.resolve(process.argv[2] || './miren-preview-output');
async function load(file) {
  const window = { MIREN_POSES: 'data:image/png;base64,' + fs.readFileSync(path.join(root,'poses.png')).toString('base64'),
    TARGET_POSES: 'data:image/png;base64,' + fs.readFileSync(path.join(root,'target_poses.png')).toString('base64') };
  const context = vm.createContext({ window, Image, document: {createElement: () => createCanvas(1,1)}, Math, Promise });
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
  await window.MirenJump.ready; return window.MirenJump;
}
(async () => {
  fs.mkdirSync(out,{recursive:true});
  const before = await load('render.v02.js'), after = await load('render.js');
  let maxBeforeError=0, maxAfterError=0, changedStates=0;
  for(let t=0;t<=4400;t++) {
    const b=before.state(t), a=after.state(t);
    if(t<2140 || t>=2550) assert.equal(JSON.stringify(a),JSON.stringify(b));
    assert.equal(a.y,b.y); assert.equal(a.pose,b.pose); assert.equal(a.targetX,b.targetX);
    assert(Number.isInteger(a.x)&&Number.isInteger(a.y));
    if(a.x!==b.x) changedStates++;
    if(t>=2140&&t<2220) {
      maxBeforeError=Math.max(maxBeforeError,Math.abs(b.x-18-b.targetX));
      maxAfterError=Math.max(maxAfterError,Math.abs(a.x-18-a.targetX));
      assert.equal(a.x-18,a.targetX); // (14,51) tip relative to (32,56) pivot.
    }
  }
  assert.equal(after.state(2219).x,after.state(2220).x);
  assert.equal(after.state(2220).x,133);
  assert.equal(JSON.stringify(before.cues),JSON.stringify(after.cues));
  assert.equal(JSON.stringify(before.beats),JSON.stringify(after.beats));
  const canvas=createCanvas(1536,864), compare=createCanvas(1536,896), c=compare.getContext('2d');
  for(let i=0;i<264;i++) {
    const t=i*1000/60;
    c.fillStyle='#20262d';c.fillRect(0,0,1536,896);c.imageSmoothingEnabled=false;
    before.draw(canvas,t);c.drawImage(canvas,0,32,768,432);
    after.draw(canvas,t);c.drawImage(canvas,768,32,768,432);
    // Detail magnification of the contact area, including the spear and target.
    before.draw(canvas,t);c.drawImage(canvas,88*4,110*4,80*4,70*4,32,480,480,420);
    after.draw(canvas,t);c.drawImage(canvas,88*4,110*4,80*4,70*4,800,480,480,420);
    c.fillStyle='#ffffff';c.font='18px monospace';
    c.fillText('BEFORE v02',16,23);c.fillText('AFTER v03  '+t.toFixed(1)+' ms',784,23);
    fs.writeFileSync(path.join(out,String(i).padStart(4,'0')+'.png'),compare.toBuffer('image/png'));
  }
  // Exact event-boundary stills, independent of video frame rounding.
  for(const t of [0,600,1050,1550,2070,2140,2180,2219,2220,2400,3000,3299,3300,4400]) {
    for(const [name,api] of [['before',before],['after',after]]) {
      api.draw(canvas,t);fs.writeFileSync(path.join(out,`${name}_${t}.png`),canvas.toBuffer('image/png'));
    }
  }
  const checks={sampled_states:4401,changed_x_states:changedStates,max_contact_tip_error_before_px:maxBeforeError,max_contact_tip_error_after_px:maxAfterError,
    unchanged_outside_2140_2550_ms:true,unchanged_y_pose_target_and_cues:true,release_position_continuous:true,frames_per_preview:264};
  fs.writeFileSync(path.join(out,'motion-validation.json'),JSON.stringify(checks,null,2)+'\n');
  console.log(JSON.stringify(checks));
})().catch(e=>{console.error(e);process.exit(1)});
