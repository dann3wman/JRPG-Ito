#!/usr/bin/env node
const { loadViewer } = require('../lib/load-game');
const key = process.argv[2], rig = loadViewer({ animations: true }).get('RIGS')[key];
if (!rig) { console.error('Usage: node tools/rig-data/export.js <creature>'); process.exit(1); }
const fields = ['timing', 'markers', 'tracks', 'swaps'];
console.log(JSON.stringify({
  version: 1, creature: key, bones: rig.bones, constraints: rig.constraints || [],
  clips: Object.fromEntries(Object.entries(rig.anims).map(([name, clip]) => [name, Object.fromEntries(fields.filter(f => clip[f] !== undefined).map(f => [f, clip[f]]))]))
}, null, 2));
