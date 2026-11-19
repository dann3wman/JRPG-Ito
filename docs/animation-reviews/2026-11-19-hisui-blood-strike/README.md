# Hisui Blood Strike animation review, 2026-11-19

**Partial review, no sprite edits, no artistic pass.** Exactly one character atlas was inspected. All eight static poses were inspected and the rebuilt actor-only animation was opened in GIMP, played at 1x and 0.5x, and sampled visually. Screenshot sampling does not establish continuous motion quality. The remaining artistic and engine checks keep this review draft.

## Source and selection

Hisui was unreviewed in the current repository and Library rotation. Source is PR #34, commit `3b4de70765373e63560d9d591617ba968de46dcb`, file `assets/party-fx/hisui-blood-strike-v01/hisui-strike-actor.v01.png`. SHA256: `e633b79597a436ef9ac35d32ce291c4a5c1cf6ecfeb9556e5d39a6112cb8eb37`.

Default branch `ccr-d8829a5a-ays4x1` was checked at `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. PR34 is an unmerged source creation, not a completed animation review. Pending Tetsugi PR30 and Kugai PR33 were inspected and left intact. No matching current Hisui source was resolved in Library searches; no cross-source hash parity is asserted. The 16-entry Library rotation and 14-entry default-branch rotation are preserved independently. Source authority is explicitly the pinned PR34 bytes, not a presumed newer Library asset.

The action brief, source README/timeline, Hisui cast specification, repository instructions, party-art and sprite-animation guidance informed the inspection. The separate blood-petals atlas was excluded. Reference video playback was not inspected during this run.

## Geometry and timing

384x192 RGBA atlas, eight 96x96 cells, four columns and two rows, no gutters, row-major HS01 through HS08. Left-facing pivot (48,86); safe content rectangle is [8,8,88,88) in each cell. The source contains 24 opaque colors with binary alpha.

One Blood Strike sequence: HS01, HS02, HS03, HS04, HS05, HS06, HS07, HS08, HS01. Durations in milliseconds: 240,180,140,100,100,180,240,220,1600. Total 3000ms, one-shot. All timing comes from source metadata; no timing assumptions or changes. Blood-cost cue 420ms, damage 800ms, effect clear 1720ms, complete 3000ms. Review GIFs repeat only for inspection; slow GIF doubles durations.

## Frame observations

| Frames | Observations |
| --- | --- |
| HS01 | Readable neutral stance, two lowered blades; terminal hold reuses exactly this cell. |
| HS02 | Lower crouch loads the action; torso and head lean forward, rear hair trails. |
| HS03 | Raised front blade establishes anticipation; head rises and stance opens. |
| HS04 | Forward arm extends, coat and hair trail; blade points lower than in HS03. |
| HS05 | Front blade and arm reach high-left, rear blade crosses the torso; widest striking silhouette. |
| HS06 | Low forward blade and bent body form the overshoot; coat remains extended. |
| HS07 | Arm and blade lower, torso rises, cloth begins recovery. |
| HS08 | Blades settle and stance closes before the return to HS01. |

No clipping or out-of-cell pixels were found. Pose widths, foot placement and head height change with the action, so indiscriminate registration or copied foot strips would risk removing intended weight shifts. The two 100ms attack exposures and long 1600ms ready hold are explicit timing, not accidental duplicate stutter. No smoothing or in-betweens were added.

The HS04-to-HS05-to-HS06 blade path, changing blade projection, shoulder flower eye readability, face/hair volume and detailed contact/weight transfer remain artistic review concerns. They are not established pixel defects with a safe correction from the available sampled playback. Full contact and impact assessment needs the world-motion/effect context; the fixed-pivot diagnostic deliberately omits it. No professional-animation pass is claimed.

## Evidence and validation

- [Every pose at nearest-neighbor 4x](hisui.frames.png)
- [Normal actor-only playback](hisui.normal.gif)
- [Half-speed actor-only playback](hisui.slow.gif)
- [Frame rectangles, order, timing and cues](timing.json)
- [Machine validation](validation.json)

`build.py` rebuilds these diagnostics directly from the pinned source package. It asserts exact frame bounds, safe padding, binary alpha, and pixel-for-pixel equality plus duration equality for all nine decoded GIF exposures at both speeds. Enlargements use nearest-neighbor sampling. It does not modify or approve source artwork.

Run: `python3 docs/animation-reviews/2026-11-19-hisui-blood-strike/build.py /path/to/pinned/hisui-blood-strike-v01`

No corrected native PNG or before/after pair is manufactured because no source change was made. Native PNG and editable ORA remain recoverable at the pinned source commit. No import metadata, runtime timing or engine code was changed. Engine compatibility and continuous motion-quality approval remain incomplete.

Repository validation: `tools/check.sh` passed exit 0: 22 rigs, 88 clips, 5368 sampled poses, six battle rigs compared, authoring checks and every-encounter simulator smoke. Existing Quick Song/Delay documentation warnings are already tracked in `docs/implementation-status.md`; existing creature attachment art notices remain unchanged. These checks do not validate this standalone actor in the engine.
