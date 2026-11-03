#!/usr/bin/env node
// Bakes Spiral Cut v02 (spiral_cut_v02.html, a procedural choreography study) into the frame strips the
// party sprite viewer plays. Run from the repo root: node assets/party-fx/kiri-spiral-cut-v02/bake.js
// It loads the study in Chromium, reuses its own spiral path and state(), and redraws three layers
// on transparent canvases: the native-pixel incision, the light around the target, and the light
// that travels with Kiri. Actors, stage and labels are left out. Requires Playwright.
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');
const ROOT = path.resolve(__dirname, '../../..');
const OUT = path.join(ROOT, 'tools/party-sprite-viewer/fx');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.route('**/*', r => /^(file|data):/.test(r.request().url()) ? r.continue() : r.abort());
  await page.goto(pathToFileURL(path.join(__dirname, 'spiral_cut_v02.html')).href);
  await page.waitForFunction(() => window.previewReady);
  const baked = await page.evaluate(() => {
    const SC = window.SpiralCut, P = SC.points, clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
    const range = (a, b, step) => { const r = []; for (let t = a; t < b; t += step) r.push(t); return r; };
    // The study's helpers, unchanged except that blur is scaled by this layer's resolution.
    function pixelLine(ctx, a, b, color, width = 1) { let x = Math.round(a[0]), y = Math.round(a[1]), ex = Math.round(b[0]), ey = Math.round(b[1]); let dx = Math.abs(ex - x), dy = -Math.abs(ey - y), sx = x < ex ? 1 : -1, sy = y < ey ? 1 : -1, e = dx + dy; ctx.fillStyle = color;
      while (true) { ctx.fillRect(x - Math.floor(width / 2), y - Math.floor(width / 2), width, width); if (x === ex && y === ey) break; let e2 = e * 2; if (e2 >= dy) { e += dy; x += sx; } if (e2 <= dx) { e += dx; y += sy; } } }
    let RES = 1;
    function strokePath(ctx, pts, color, width, alpha = 1, blur = 0) { if (pts.length < 2) return; ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowBlur = blur * RES; ctx.shadowColor = color; ctx.beginPath(); ctx.moveTo(...pts[0]); pts.slice(1).forEach(v => ctx.lineTo(...v)); ctx.stroke(); ctx.restore(); }
    function incision(c, t) {
      if (!(t >= 1030 && t < 2200)) return;
      const count = Math.floor(clamp((t - 1030) / 220) * 160), release = clamp((t - 1820) / 380), wide = t < 1250 ? 2 : 1;
      for (const pass of [0, 1]) for (let i = 1; i < count; i++) {
        if (release > 0 && ((i * 17) % 101) / 101 < release) continue;
        const col = i > 141 ? '#a44e59' : t < 1250 ? '#fff2d4' : '#cfc5ab';
        pixelLine(c, P[i - 1], P[i], pass ? col : '#18151d', pass ? wide : wide + 2);
      }
    }
    function targetLight(c, t) {
      if (t >= 1030 && t < 1320) { const u = clamp((t - 1030) / 290), arc = []; for (let i = 0; i < 35; i++) { const a = -1.2 + i / 34 * 2.5; arc.push([110 + Math.cos(a) * 44, 128 + Math.sin(a) * 32]); }
        strokePath(c, arc, '#fff3d0', 5 * (1 - u) + .4, Math.sin(Math.PI * u) * .45, 6); strokePath(c, arc, '#f6eee0', 1.2, Math.sin(Math.PI * u) * .8, 1); }
      if (t >= 1030 && t < 2200) { const pts = P.slice(0, Math.max(2, Math.floor(clamp((t - 1030) / 220) * 160))), release = clamp((t - 1820) / 380); strokePath(c, pts, '#b8d2cb', 1.8, (1 - release) * .13, 5);
        if (t >= 1250 && t < 1820) { const pulse = .7 + .3 * Math.sin((t - 1250) / 570 * Math.PI); strokePath(c, P.slice(142), '#a8445a', 1.5, .5 * pulse, 3); } }
      if (t >= 1100 && t < 1210) { const u = (t - 1100) / 110; strokePath(c, [[92 - 9 * u, 126 - 9 * u], [92 + 9 * u, 126 + 9 * u]], '#fff6de', 1, (1 - u) * .9, 2); }
      if (t >= 1820 && t < 2200) { const u = (t - 1820) / 380, fade = 1 - u;
        if (u < .24) strokePath(c, [[77, 106], [114, 153]], '#f7e6cf', 2.5 * (1 - u / .24), 1 - u / .24, 8);
        for (let k = 0; k < 15; k++) { const a = k * 2.399, r = 8 + u * (17 + (k % 4) * 8), x = 96 + Math.cos(a) * r, y = 132 + Math.sin(a) * r * .8 + u * u * 9; const tail = [x - Math.cos(a) * 5 * (1 - u), y - Math.sin(a) * 5 * (1 - u)]; strokePath(c, [tail, [x, y]], k % 3 === 0 ? '#aa4b59' : '#d5c9af', k % 4 === 0 ? 1.2 : .6, fade * .8, 2); }
        const g = c.createRadialGradient(96, 132, 0, 96, 132, 32); g.addColorStop(0, `rgba(124,32,59,${fade * .22})`); g.addColorStop(1, 'rgba(124,32,59,0)'); c.fillStyle = g; c.fillRect(64, 100, 64, 64); }
    }
    function actorLight(c, t) {
      const st = SC.state(t);
      if (t >= 500 && t < 1030) { const u = clamp((t - 500) / 350), fade = t < 850 ? u : 1 - clamp((t - 850) / 180); const g = c.createRadialGradient(st.x + 8, st.y - 29, 0, st.x + 8, st.y - 29, 21); g.addColorStop(0, `rgba(214,210,183,${fade * .25})`); g.addColorStop(1, 'rgba(214,210,183,0)'); c.fillStyle = g; c.fillRect(st.x - 13, st.y - 50, 42, 42); }
      if (t >= 850 && t < 1090) { const u = clamp((t - 850) / 240), alpha = Math.sin(u * Math.PI); for (let k = 0; k < 3; k++) strokePath(c, [[st.x + 7, st.y - 25 + k * 7], [Math.min(312, st.x + 80), st.y - 23 + k * 7]], k === 1 ? '#a45b65' : '#c7d7ca', .7, alpha * .35, 2); }
    }
    // frames: [start, end) times. Each frame is drawn at its midpoint, in world coordinates, with the
    // cell's top-left at origin(t) (fixed for target layers, following Kiri for hers).
    function bake(frames, w, h, res, cols, origin, fn, quality) {
      RES = res;
      const rows = Math.ceil(frames.length / cols), atlas = document.createElement('canvas'); atlas.width = cols * w * res; atlas.height = rows * h * res;
      const a = atlas.getContext('2d');
      frames.forEach(([t0, t1], i) => {
        const cv = document.createElement('canvas'); cv.width = w * res; cv.height = h * res; const c = cv.getContext('2d');
        const [ox, oy] = origin(t0); c.scale(res, res); c.translate(-ox, -oy); fn(c, (t0 + t1) / 2);
        a.drawImage(cv, (i % cols) * w * res, Math.floor(i / cols) * h * res);
      });
      return { uri: atlas.toDataURL('image/webp', quality), ms: frames.map(([t0, t1]) => t1 - t0), start: frames[0][0] };
    }
    const spans = ts => ts.slice(0, -1).map((t, i) => [t, ts[i + 1]]);
    // The incision grows 1030-1250, hangs unchanged 1250-1820, comes apart 1820-2200.
    const inc = spans([...range(1030, 1250, 20), 1250, ...range(1820, 2200, 20), 2200].filter((t, i, a) => a.indexOf(t) === i));
    const lightT = spans([...range(1030, 2200, 30), 2200]);
    const lightK = spans([...range(500, 1090, 30), 1090]);
    return {
      incision: bake(inc, 96, 96, 1, 8, () => [48, 84], incision, 1),   // lossless: binary alpha, six colours
      targetLight: bake(lightT, 144, 112, 2, 8, () => [32, 76], targetLight, 0.82),
      actorLight: bake(lightK, 112, 48, 2, 7, t => { const s = SC.state(t); return [s.x - 16, s.y - 52]; }, actorLight, 0.82),
      // The study's masked training target (its sixth placeholder pose), used as the viewer's target.
      dummy: (() => { const im = new Image(); im.src = window.SPIRAL_POSES; const c = document.createElement('canvas'); c.width = c.height = 64;
        c.getContext('2d').drawImage(im, 128, 64, 64, 64, 0, 0, 64, 64); return c.toDataURL('image/webp', 1); })(),
    };
  });
  fs.mkdirSync(OUT, { recursive: true });
  const save = (name, uri) => fs.writeFileSync(path.join(OUT, name), Buffer.from(uri.split(',')[1], 'base64'));
  for (const k of ['incision', 'targetLight', 'actorLight']) { save(`kiri-spiral-cut-v02.${k}.webp`, baked[k].uri); console.log(k, 'start', baked[k].start, 'ms', JSON.stringify(baked[k].ms)); }
  save('training-dummy.webp', baked.dummy);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
