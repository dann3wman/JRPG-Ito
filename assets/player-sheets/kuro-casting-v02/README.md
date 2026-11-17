# Kuro casting v02: isolated hair-fringe correction

Partial animation review, 2026-11-16. **Draft, not production-approved.** Exactly one character sheet was reviewed. This fixes one visible artifact and preserves the authored timing; broader artistic and engine verification remains open.

## Source and selection

Kuro is unreviewed in Library rotation v13; the recent rotation covers Miren, Natsu and Kiri. The existing actor comes from [PR25](https://github.com/dann3wman/JRPG-Ito/pull/25), commit `0910e540074d0127b1afc0a0ef5a53c3d6bd4b23`, path `assets/party-fx/kuro-dark-v01/kuro-casting.v01.png`. Source SHA256 `a7034b278b735a88245d3625c761243d4fde85226ab74f1a592001e435157b86`. Corrected SHA256 `2940aa2b76a9c8c3836ab1b4066b773c8f6abe4c31e2fdcceed8acd941d381d0`.

Default `ccr-d8829a5a-ays4x1` at `5fbc8b8c6e3366196eda437e0296ef1ff3ec71bf` does not contain that pending package. Relevant open PRs 14, 16, 18, 20, 21, 23, 24, 25 and 26 were inspected. No duplicate Kuro review found. No matching current Kuro Library source resolved, so Library/repository source equality cannot be asserted. This versioned actor replacement preserves PR25 and other pending corrections; it does not copy or change the effect atlases.

## Change and import

KD03 has a detached dark pixel below the trailing hair at local (64,64), atlas (256,64), visible for 140 ms. Removed exactly that pixel, RGBA (22,18,25,255) to (0,0,0,0), in PNG and editable ORA layers. Every other pixel is identical.

384x192 RGBA, 4x2 cells of 96x96, row-major KD01..KD08. No gutters. Pivot (48,88), safe inclusive bounds (8,8)..(87,87), binary alpha, original 24 colors. Use nearest filtering, no smoothing, no auto-trimming/recentering. `timing.json` preserves per-pose palm anchors and measured bounds. It is a standalone actor manifest, not the installed 54-pose importer schema. Integrating with PR25 requires substituting this PNG for its actor texture without changing its effects or choreography. No engine files changed.

| Exposure | Intended pose | Duration ms |
| --- | --- | ---: |
| KD01 | settled | 220 |
| KD02 | bow and elbow inward | 180 |
| KD03 | raise open palm | 140 |
| KD04 | offer palm | 140 |
| KD05 | extend and hold | 420 |
| KD06 | wrist release and follow-through | 180 |
| KD05 | post-release support | 400 |
| KD07 | lower palm | 180 |
| KD08 | settle | 180 |
| KD01 | terminal hold | 1360 |

3400 ms, one shot, hold KD01 on completion. Timing comes from actual source metadata; no new assumptions. GIFs repeat for comparison only, at normal and half speed. The final and initial pose are identical. The longer final hold allows PR25 effects to clear; it is intentional rather than an accidental stutter.

## Review findings

All eight unique before/after poses inspected frame by frame in enlarged sheets; the single sequence rebuilt from corrected PNG. GIMP playback exercised at 1x and 0.5x, sampled screenshots inspected, and KD03 paused for direct comparison. This does not establish continuous perceptual pacing or full engine playback.

- Keys and anticipation: inward bow precedes raised/extended palm. Broad gesture reads; short 140 ms keys intentionally lead into longer holds.
- Spacing and arcs: palm moves inward then out/up, returns via lowered poses. Coarse drawing transitions remain; no indiscriminate in-betweens added.
- Weight and contact: stationary caster, no whole-body translation. Contact rows 85-86 are pixel-identical across poses. Upper boot/robe pixels vary, so this is not a claim that the whole lower body is identical.
- Impact: actor-only sheet does not depict target contact. PR25 effect/damage choreography is outside this review.
- Follow-through and recovery: wrist turn and trailing hair/cloth changes are present. Face, hair and robe volume/shading variations remain artistically unresolved.
- Silhouette/anatomy/equipment: open palm and layered robe recognizable; no held weapon required. No new costume or anatomy edits. Full identity/proportion quality is not approved.
- Jitter/flicker: the isolated KD03 fringe was removed. Broader shading changes remain; sampled playback cannot certify absence of all flicker.
- Bounds/alignment: all eight cells match recorded bounds and safe padding, fixed pivot, no clipping. Terminal/start KD01 match. No required looping change.

Reference videos named in the source brief were not freshly re-viewed for this narrow correction. Full action rhythm, artistic cleanup and engine compatibility remain open. Keep the PR draft.

## Files and reproduction

`source.v01.png` is the exact pinned source. `kuro-casting.v02.png` is native import art; `.4x.png` is exact nearest enlargement; `.ora` preserves the original Highlights/Midtones/Ink layers. `casting.before-after.normal.gif` and `.slow.gif` are side-by-side before/after playback. `timing.json`, `review.json`, `validation.json` and `build.py` record import, provenance and checks.

Run `python3 assets/player-sheets/kuro-casting-v02/build.py` with Pillow and NumPy. It regenerates PNGs/GIFs and validates the delivered ORA. To rebuild the ORA too, pass the original ORA from the pinned source commit as the optional argument. No image-generation prompt substitutes for these files.

Validation passes: exact one-pixel delta, all other pixels unchanged, palette/alpha parity, frame bounds and padding, fixed contact rows, 4x nearest pixels, ORA merged/layer composite parity, GIF decoded-frame and duration equality. `tools/check.sh` passed exit 0 with existing Quick Song/Delay drift and creature attachment art notices. See `review.json` for output links and rotation details.
