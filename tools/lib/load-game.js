// Headless loader for the battle prototype (index.html) and the Bestiary Rig Viewer.
// It runs the page scripts in a Node vm with a do-nothing DOM, so tools can read the live
// data tables (ROSTER, SKILLS, FOES, ENCOUNTERS, SCRIPTS, RIGS, ATLAS…) and drive the real
// battle loop without a browser. Nothing in index.html is changed to make this work.
//
//   const { loadBattle, loadViewer } = require('./load-game');
//   const B = loadBattle({ seed: 1 });   B.get('ROSTER'), B.get('G'), B.run('newGame()')
//
// How it works: each game script is an IIFE, `(() => { … })();`. The loader strips that one
// wrapper so the script's top-level consts land in the vm's global lexical scope, where
// B.get(name) can read them. If the wrapper or a script can't be found it throws, naming the
// anchor it looked for, so a restructure of index.html fails loudly instead of silently.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '../..');
const GAME = path.join(ROOT, 'index.html');
const VIEWER = path.join(ROOT, 'tools/bestiary-rig-viewer/index.html');

// mulberry32: small, fast, good enough for reproducible battle rolls
function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

// An element that accepts anything: every property read returns another stub, every call
// returns a stub, and it coerces to '' or 0. `then` stays undefined so it is never awaited.
function stubEl(hooks = {}) {
  const store = {};
  const target = function () {};
  const p = new Proxy(target, {
    get(_, k) {
      if (k === 'then') return undefined;
      if (k === Symbol.toPrimitive) return hint => hint === 'number' ? 0 : '';
      if (k === Symbol.iterator) return function* () {};
      if (k === 'forEach' || k === 'map' || k === 'filter') return () => [];
      if (k === 'length') return 0;
      if (k in store) return store[k];
      if (hooks.get && hooks.get[k]) return hooks.get[k];
      if (k === 'classList' || k === 'style' || k === 'dataset') return (store[k] = stubEl());
      return stubEl();
    },
    set(_, k, v) { store[k] = v; if (hooks.set && hooks.set[k]) hooks.set[k](v, store); return true; },
    apply() { return stubEl(); },
    construct() { return stubEl(); },
  });
  return p;
}

function makeContext({ seed = 1, onOverlay = null } = {}) {
  const els = new Map();
  const ctx = {
    console,
    performance: { now: () => Date.now() },
    setTimeout: (fn) => { setImmediate(fn); return 0; },
    clearTimeout: () => {},
    setInterval: () => 0,
    clearInterval: () => {},
    requestAnimationFrame: () => 0,
    matchMedia: () => ({ matches: true, addEventListener() {}, addListener() {} }),
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    location: { search: '', hash: '', href: '' },
    history: { replaceState() {} },
    navigator: { userAgent: 'node' },
    Image: function () { return stubEl(); },
    URLSearchParams,
    devicePixelRatio: 1,
    addEventListener() {},
  };
  // #ov is the overlay used for Stress Checks, flee scenes and the end-of-battle card. Tools
  // get a callback with its HTML and a click() that resolves it, instead of a real button.
  const overlayEl = () => {
    let html = '';
    const btn = stubEl({ set: { onclick: fn => { const h = html; setImmediate(() => onOverlay ? onOverlay(h, fn) : fn()); } } });
    return stubEl({ set: { innerHTML: v => { html = String(v); } }, get: { querySelector: () => btn, querySelectorAll: () => [] } });
  };
  const query = sel => {
    if (!els.has(sel)) els.set(sel, sel === '#ov' ? overlayEl() : stubEl());
    return els.get(sel);
  };
  ctx.document = stubEl({ get: {
    querySelector: query, getElementById: id => query('#' + id), querySelectorAll: () => [],
    createElement: () => stubEl(), addEventListener() {}, body: stubEl(), documentElement: stubEl(),
  } });
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  // Seeded rolls. Tools can swap ctx.__rand at any time (battle-sim reseeds per encounter).
  ctx.__rand = rng(seed);
  vm.runInContext('Math.random = () => __rand();', ctx);
  return ctx;
}

function scripts(file) {
  const html = fs.readFileSync(file, 'utf8');
  return [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
}

// Remove one `(() => {` … `})();` wrapper. Code before the wrapper (ASSETS, ENEMY_ART) is kept.
function unwrap(src, what) {
  const open = src.indexOf('\n(() => {\n');
  const close = src.lastIndexOf('})();');
  if (open < 0 || close < 0) throw new Error(`load-game: no "(() => { … })();" wrapper found in ${what}`);
  return src.slice(0, open) + '\n' + src.slice(open + 10, close);
}

function handle(ctx) {
  return {
    ctx,
    get: name => vm.runInContext(name, ctx),
    run: code => vm.runInContext(code, ctx),
  };
}

// The battle script (script 2 of index.html). Pass rigs: true to also load script 1 (RIGS, ATLAS,
// ART_RIG, SKILL_CLIP) into its own context as `.rigs`; the battle runs without it either way.
function loadBattle(opts = {}) {
  const all = scripts(GAME);
  const battle = all.find(s => s.includes('const ENCOUNTERS'));
  if (!battle) throw new Error('load-game: no <script> in index.html defines ENCOUNTERS');
  const ctx = makeContext(opts);
  vm.runInContext(unwrap(battle, 'the battle script'), ctx, { filename: 'index.html#battle' });
  const B = handle(ctx);
  if (opts.rigs) {
    const rigSrc = all.find(s => s.includes('const RIGS'));
    if (!rigSrc) throw new Error('load-game: no <script> in index.html defines RIGS');
    const rctx = makeContext(opts);
    vm.runInContext(unwrap(rigSrc, 'the rig script'), rctx, { filename: 'index.html#rigs' });
    B.rigs = handle(rctx);
  }
  return B;
}

// The Bestiary Rig Viewer. Its script is not wrapped, so its globals are readable directly.
function loadViewer(opts = {}) {
  const src = scripts(VIEWER).find(s => s.includes('const RIGS'));
  if (!src) throw new Error('load-game: no <script> in the rig viewer defines RIGS');
  const ctx = makeContext(opts);
  // Stop at the UI wiring: everything the tools need is defined before `const st =`.
  const cut = src.indexOf('\nconst st = ');
  vm.runInContext(cut > 0 ? src.slice(0, cut) : src, ctx, { filename: 'bestiary-rig-viewer' });
  return handle(ctx);
}

module.exports = { loadBattle, loadViewer, rng, ROOT, GAME, VIEWER };
