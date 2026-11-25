# Ren: Delay Shot v01

New standalone 3.6-second battle action. Built and exported; incomplete visual-review draft. Not artistically approved or engine-tested.

[Offline player](ren-delay-shot.v01.html) | [MP4](ren-delay-shot.v01.mp4) | [APNG](ren-delay-shot.v01.apng) | [GIF](ren-delay-shot.v01.gif) | [Validation](validation.v01.json)

Ren draws his pistol, holds aim, fires once, absorbs recoil and lowers the weapon. The projectile strikes a labeled secondary dummy, which recoils and returns. Eight newly generated actor drawings and eight newly generated discharge/contact/smoke drawings. Utility build/player/export code and secondary target reused from Quake PR52, not its actor or stone pixels. No combat rules, HP, CTB slots or balance changed. Canon Delay Shot damages and pushes a target back two turn slots; this preview demonstrates the action visually, not a gameplay implementation of that rule.

## Selection and evidence

Default branch freshly discovered as ccr-d8829a5a-ays4x1 at b5d0e9f9ac45c21b2acf28784d75fd977d35eb91. Recent commits, branches, files and PRs inspected. Ren Fire already exists in PR37, so it was excluded. No equivalent Delay Shot package/PR found. Read actual PR54 review README and builder: no Goku pixel or timing changes, unresolved shape continuity. Preserve that separate review unchanged. Current review rotation version23 refreshed. Miren recovery bridge and Natsu Halo Glance source records unchanged; they remain specifications unless later evidence establishes implementation. Halo Glance v02 takes precedence for its source/masks and is unrelated to this action.

Inspected Ren's actual embedded sprite and ink portrait, cast.json and design-doc.md. Preserve dark hat, weathered face, captain coat, brass buttons and long pistol. Generated rendition remains subject to identity approval. Source IDs: libfile_6bfe860bb62c8191afed0871b6e0e0c2; libfile_ba10f229c3608191af2cf0b314dc8e73; libfile_e3bd1f9d5db0819185bc1c703e5bf682. All five supplied MP4 references remain available locally; revisited their previously extracted action-window stills, not continuous playback or freshly measured duration. Directional trails/contact layering inform the shot; FFVI/FFRK readable anticipation and recovery inform the staging. No reference footage committed.

## Geometry and layer contract

Original sheets 1536x1024, four columns by two rows, 384x512 source cells. Native actor cells96x96 in384x192 atlas, pivot(48,86), facing left. Native effect cells128x128 in512x256 atlas, pivot(64,64). Zero gutters and margins, 8px safe padding, top-left origin, x right/y down. Row-major rectangles in timeline JSON. Scene384x216 output1536x864, baseline180, safe x8..375/y8..207. Actor feet(280,180), target feet(104,180), muzzle(246,139), contact target center(104,150). Target is supporting placeholder only, visibly labeled outside usable art.

Source alpha threshold200 removes generated haze. Actor cells resized uniformly to72x76 nearest-neighbor, registered by boot bottom to85 and aligned horizontally by boot edge. Shared stationary boot strip80..85 prevents foot jitter. Effects resized84x112 within128px cells at(22,8). Actor24 colors and effect16 colors, actual hex palettes and bounds in JSON. Binary alpha, source-over, nearest filtering and exact4x pixel previews. Controlled stepped contours retained; artistic outline/anatomy audit remains pending. Per-action palette rules do not constrain other effects.

Order: opaque stage, rear muzzle light, target, actor, shot/contact pixels, foreground light, review labels. Light authored768x432, continuous alpha, linear2x scaling. Warm muzzle glow radius18 at(246,139), rise1490..1500, hold to1540, fade to1630; source-over rear plus faint screen foreground. No camera shake, random jitter or procedural particles. Pixel art is never blurred or crossfaded.

## Timeline and cells

16 unique drawings, nine actor exposures including ready repeat, eight effect exposures. One-shot3600ms. Actor remains planted. Runtime projectile travels muzzle to target1500..1600 with smoothstep integer positions, then follows target x through recoil. Target x keys:0/104,1600/104,1750/96,2250/96,2800/104,3600/104; y offset always0. This stage displacement illustrates recoil, not the CTB delay value. Cues cast1500, impact1600 once, effect_clear2600, action_complete3600. No events apply during seeking. All effect layers hide at terminal ready.

| Cell | Actor state | Start/hold ms | Effect state | Start/hold ms |
| --- | --- | --- | --- | --- |
| R1C1 | RD01 ready | 0/400 | SI01 muzzle | 1500/50 |
| R1C2 | RD02 grip | 400/250 | SI02 projectile | 1550/50 |
| R1C3 | RD03 raise pistol | 650/250 | SI03 contact | 1600/70 |
| R1C4 | RD04 aim | 900/600 | SI04 bloom | 1670/130 |
| R2C1 | RD05 recoil | 1500/100 | SI05 fragments | 1800/150 |
| R2C2 | RD06 re-aim | 1600/300 | SI06 smoke curl | 1950/200 |
| R2C3 | RD07 lower | 1900/350 | SI07 smoke thinning | 2150/250 |
| R2C4 | RD08 settle | 2250/350 | SI08 last wisp | 2400/200 |

Ready repeats2600..3600 and holds. Drawn arm, coat and effect evolution are distinct from runtime projectile/recoil/light motion. Precise timing and motion keys are machine-readable.

## Outputs and reproduction

Original generated art/prompts in source/. Native ren-shooting.v01.png and shot-impact.v01.png, exact .4x.png companions and real .ora layered sources. ORA layers are editable highlight/midtone/ink value partitions, not semantic clothing layers. Review552x552 and2208x2208, bitmap labels outside cells; actor rows24/136, effect rows256/400, columns8/144/280/416. Import atlases contain no labels.

Self-contained HTML supports replay, pause,1x/0.5x, seek, light/dark backgrounds, no auto-loop. Replay clears history/actors/effects; seek emits no cues. MP4 is1536x864 at60fps,216frames; APNG lossless one-play with repeated holds coalesced; GIF768x432 is a quantized2x viewing derivative with20/10/20ms cadence and one repeat. Native pixel-only and exact4x stills isolate enlargement from smooth light. No Aseprite format is claimed.

Requires Python3/Pillow/NumPy, Node/@napi-rs/canvas, ffmpeg/ffprobe. From package directory:

```sh
python build.py
node test.cjs
node check-render.cjs
node export.cjs /absolute/scratch/delay-frames
python encode.py /absolute/scratch/delay-frames
python validate.py /absolute/scratch/delay-frames
```

Validation report records actual bounds, palettes, alpha, rectangles, registration, ORA recomposition, exact4x, decoded APNG/GIF/MP4 and runtime checks. Fresh Chromium and GIMP launch attempts returned no usable windows and a black desktop. Continuous normal/half-speed visual review and live controls remain unverified; sampled stills and simulated controls are not artistic approval. Handedness, pistol attachment and hat/face/coat continuity need artistic review. Engine integration untested. Source haze and stationary foot drift corrected during assembly, not claimed as post-playback revisions.

## Complete creation prompt

Build exactly one new Ren Delay Shot standalone battle action using the following generation prompts and the complete geometry/timeline/export contract above. Preserve identity from embedded references, retain originals, register feet, separate smooth light, render at60fps and export actual player/animation/assets/source. Inspect both backgrounds and report missing continuous review honestly. Do not replace the54-frame standard sheet or alter gameplay. New action art is required; existing Quake utilities and secondary target may be reused.

Create eight coherent consecutive 16-bit JRPG pixel-art animation poses of REN using attached sprite and portrait identity. Weathered man late forties, dark wide-brim hat, stubble, scarred face, dark teal long captain coat brass buttons, brown boots, long-barrel pistol right hand. Face LEFT, identical planted feet and head volume. Transparent 1536x1024 image, exact 4 columns 2 rows cells384x512. No text/borders/background. Full figure within each cell x40..344,y60..450; soles y450; consistent height350px. Eight distinct keys row-major:1 pistol lowered ready;2 hand closes on grip and elbow bends;3 pistol lifts halfway left;4 arm straight aims LEFT horizontal;5 shot recoil pistol tilted up15degrees elbow folds slightly;6 pistol returns to horizontal and coat tail follows;7 arm lowers halfway;8 relaxed ready. Preserve hat silhouette, facial identity, fixed feet, body volume. Crisp hand-placed stepped pixel clusters, dark outlines, controlled charcoal teal brass palette. No muzzle flash painted on actor, no motion blur. Make gradual arm progression with no whole-body perspective changes.

undefined
