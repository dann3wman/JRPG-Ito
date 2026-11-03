#!/usr/bin/env node
// Bakes Natsu's Cure v01 (render.js, a procedural choreography study) into the frame strips the party
// sprite viewer plays. Run from the repo root: node assets/party-fx/natsu-cure-v01/bake.js
// The drawing below is the study's render.js, element for element, on transparent canvases with the
// actors, stage and labels left out. Three points move from the placeholder to Natsu's real sheet
// frame idle1/special2 (CROWN, HANDS, FACE); everything else keeps the study's world coordinates:
// caster feet (266,166), ally feet (120,166). Requires Playwright.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const ROOT = path.resolve(__dirname, '../../..');
const OUT = path.join(ROOT, 'tools/party-sprite-viewer/fx');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent('<!doctype html><title>bake</title>');
  const baked = await page.evaluate(() => {
    const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)), mix = (a, b, u) => a + (b - a) * u;
    const CASTER = [266, 166], ALLY = [120, 166];
    // Natsu's sheet: halo centre and the open hands of special2, and the top-left of the new face on the
    // halo's lower-right arc in idle1 (study: crown (266,128), hands (250,139), face (275,131)).
    const CROWN = [CASTER[0] + 4, CASTER[1] - 52], HANDS = [CASTER[0] - 30, CASTER[1] - 30], FACE = [CASTER[0] + 11, CASTER[1] - 43];
    const FC = [FACE[0] + 3, FACE[1] + 3];
    let RES = 1;
    function stroke(ctx, pts, col, width = 1, alpha = 1, blur = 0) { if (pts.length < 2) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha = alpha; ctx.shadowColor = col; ctx.shadowBlur = blur * RES; ctx.beginPath(); ctx.moveTo(...pts[0]); pts.slice(1).forEach(v => ctx.lineTo(...v)); ctx.stroke(); ctx.restore(); }
    function glow(c, x, y, r, color, alpha) { if (alpha <= 0) return; const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${color},${alpha})`); g.addColorStop(.35, `rgba(${color},${alpha * .5})`); g.addColorStop(1, `rgba(${color},0)`); c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); }
    function ring(c, x, y, rx, ry, col, alpha, width = 1) { const pts = []; for (let i = 0; i <= 64; i++) { const q = i * Math.PI / 32; pts.push([x + Math.cos(q) * rx, y + Math.sin(q) * ry]); } stroke(c, pts, col, width, alpha, 3); }
    function face(ctx, x, y, opacity = 1) { const pattern = ['.11111.', '1222221', '1202021', '1222221', '.12021.', '.12221.', '..111..']; const colors = { 1: '#34313c', 2: '#e4dcc1', 0: '#413846' }; ctx.save(); ctx.globalAlpha = opacity; pattern.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { ctx.fillStyle = colors[ch]; ctx.fillRect(Math.round(x) + i, Math.round(y) + j, 1, 1); } })); ctx.restore(); }
    const L = {
      crown(c, t) {
        if (t >= 450 && t < 3350) { const u = clamp((t - 450) / 550), fade = clamp((3350 - t) / 550); glow(c, CROWN[0], CROWN[1], 28, '231,220,179', u * fade * .32); if (t < 1500) ring(c, CROWN[0], CROWN[1], 15 + u * 5, 15 + u * 5, '#e6d7ad', u * clamp((1500 - t) / 250) * .32, .6); }
        if (t >= 2880 && t < 3350) glow(c, FC[0], FC[1], 15, '222,192,168', (1 - (t - 2880) / 470) * .35);
      },
      streams(c, t) {
        const u = clamp((t - 1000) / 640);
        for (let k = 0; k < 2; k++) { const pts = [], end = clamp(u * 1.65), start = Math.max(0, end - .28); for (let i = 0; i <= 24; i++) { const q = mix(start, end, i / 24); pts.push([mix(HANDS[0], 120, q), mix(HANDS[1], 138, q) - Math.sin(q * Math.PI) * (17 + k * 12)]); } stroke(c, pts, k ? '#a7c5b6' : '#f4e8c6', k ? .7 : 1.1, Math.sin(u * Math.PI) * .65, 4); }
      },
      ally(c, t) {
        if (t >= 1350 && t < 2530) { const u = clamp((t - 1350) / 650), fade = clamp((2530 - t) / 350); glow(c, 120, 139, 43, '180,213,184', u * fade * .27);
          for (let k = 0; k < 3; k++) { const q = clamp((t - 1350 - k * 120) / 600), y = mix(166, 153 - k * 17, q); ring(c, 120, y, mix(9, 25 - k * 3, q), 4.2, '#dce8bf', q * fade * .62, 1); }
          for (let k = 0; k < 24; k++) { const offset = k * 67, age = (t - 1350 + offset) % 1000, q = age / 1000, x = 120 + Math.sin(k * 2.4) * 24 * (1 - q * .4), y = 167 - q * 73; glow(c, x, y, 2.1, '239,233,197', Math.sin(q * Math.PI) * u * fade * .6); } }
        if (t >= 1860 && t < 2430) { const u = clamp((t - 1860) / 570), alpha = Math.sin(u * Math.PI); glow(c, 120, 138, 49, '240,241,207', alpha * .55); for (let k = 0; k < 4; k++) { const x = 105 + k * 10; stroke(c, [[x, 166], [x + 2, 106]], '#f0ebc9', 1.4, alpha * .16, 5); } if (t >= 2000) { const q = clamp((t - 2000) / 330); ring(c, 120, 145, 9 + q * 31, 4 + q * 7, '#fff1cc', (1 - q) * .85, 1.5); } }
      },
      // The echo's path ends on the new face's centre (study: (278,134) for the trail, (275,131) for the face).
      echoTrail(c, t) {
        const u = clamp((t - 2400) / 480), pts = [];
        for (let i = 0; i < 28; i++) { const q = mix(Math.max(0, u - .18), u, i / 27); pts.push([mix(125, FC[0], q), mix(128, FC[1], q) - Math.sin(q * Math.PI) * 34]); }
        stroke(c, pts, '#b9c3bc', .6, Math.sin(u * Math.PI) * .45, 3); glow(c, mix(125, FC[0], u), mix(128, FC[1], u) - Math.sin(u * Math.PI) * 34, 8, '210,207,182', Math.sin(u * Math.PI) * .24);
      },
      echoFace(c, t) { const u = clamp((t - 2430) / 450); face(c, mix(122, FACE[0], u), mix(125, FACE[1], u) - Math.sin(u * Math.PI) * 34, .6); },
      // The face that stays: thorns into the halo arc, then the face, fading in over 120 ms.
      newFace(c, t) { const o = clamp((t - 2880) / 120); c.save(); c.globalAlpha = o; c.fillStyle = '#a79c7e'; c.fillRect(FACE[0] - 4, FACE[1] + 1, 6, 1); c.fillRect(FACE[0] - 2, FACE[1] - 1, 1, 5); c.restore(); face(c, FACE[0], FACE[1], o); },
    };
    const spans = ts => ts.slice(0, -1).map((t, i) => [t, ts[i + 1]]);
    const range = (a, b, s) => { const r = []; for (let t = a; t < b; t += s) r.push(t); return r.concat(b); };
    // Each frame is drawn at its midpoint (the last frame of newFace at its start, fully opaque).
    function bake(name, frames, [ox, oy, w, h], res, cols, quality, at = f => (f[0] + f[1]) / 2) {
      RES = res;
      const atlas = document.createElement('canvas'); atlas.width = cols * w * res; atlas.height = Math.ceil(frames.length / cols) * h * res;
      const a = atlas.getContext('2d');
      frames.forEach((f, i) => {
        const cv = document.createElement('canvas'); cv.width = w * res; cv.height = h * res; const c = cv.getContext('2d');
        c.imageSmoothingEnabled = false; c.scale(res, res); c.translate(-ox, -oy); L[name](c, at(f));
        a.drawImage(cv, (i % cols) * w * res, Math.floor(i / cols) * h * res);
      });
      return { name, uri: atlas.toDataURL('image/webp', quality), ms: frames.map(f => f[1] - f[0]), start: frames[0][0], origin: [ox, oy] };
    }
    return [
      bake('crown', spans(range(450, 3350, 40)), [CROWN[0] - 32, CROWN[1] - 32, 64, 64], 2, 8, .82),
      bake('streams', spans(range(1000, 1640, 40)), [112, 96, 136, 48], 2, 4, .82),
      bake('ally', spans(range(1350, 2530, 40)), [64, 84, 112, 104], 2, 6, .82),
      bake('echoTrail', spans(range(2400, 2880, 20)), [112, 84, 184, 60], 2, 4, .82),
      bake('echoFace', spans(range(2430, 2880, 30)), [112, 84, 184, 60], 1, 4, 1),
      bake('newFace', [[2880, 2920], [2920, 2960], [2960, 3000], [3000, 3100]], [FACE[0] - 8, FACE[1] - 4, 16, 12], 1, 4, 1, f => f[0] === 3000 ? 3000 : f[1]),
    ];
  });
  fs.mkdirSync(OUT, { recursive: true });
  for (const b of baked) {
    fs.writeFileSync(path.join(OUT, `natsu-cure-v01.${b.name}.webp`), Buffer.from(b.uri.split(',')[1], 'base64'));
    console.log(b.name, 'start', b.start, 'origin', JSON.stringify(b.origin), 'frames', b.ms.length, 'ms', JSON.stringify([...new Set(b.ms)]));
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
