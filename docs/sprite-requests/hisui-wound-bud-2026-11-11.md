# Hisui: wound-bud opening v01

Production specification, 11 November 2026. Exactly one small physical sprite component: three 32x32 drawings showing a closed crimson bud opening into a flower with one eye. This is a battle-scale readability study, not a completed Hurt animation or a new ability.

## Selection and evidence

Hisui's cast data and existing sheet request establish a crimson coat, twin curved blades and wounds that bloom into red flowers with eyes. Her Hurt state specifically opens a bud from a fresh cut. Testing that small detail before drawing more body poses gives the future animator a usable scale and silhouette target. The precedent is FFVI's readable character-state silhouettes, with a quiet bodily change replacing a generic damage spark. A three-drawing component fits one focused session and does not depend on another unfinished specification.

Inspected default branch `ccr-d8829a5a-ays4x1` at `c1840737fef12061165ef6bb553e7bfa166b717b`, root AGENTS.md, documentation conventions, current cast data, [Hisui's sheet request](hisui-sheet-2026-10-25.md), and the existing [Kuro specification](kuro-dark-palm-well-2026-11-10.md). Relevant party-art and sprite-animation guidance is unchanged from the previous run. No nested documentation instructions or equivalent wound-bud specification were found. The installed party sheets still cover Kiri and Natsu, not Hisui.

Freshly extracted and viewed Hisui's embedded sprite and portrait from [index.html](../../index.html), using `party_art.py refs hisui`. The sprite supplies the crimson/dark costume family; the ink portrait clearly establishes red flowers and eyes. They are static identity references, not approved casting or Hurt poses. Extraction hashes: portrait SHA256 `98c0ae6125d6fba952be508770a6ccef55a8720ececdc502a6b6eddc4fff369f`; 6x sprite SHA256 `7b1801951bfc532ec0187d8f749f8e0d7acb3a5d0bcf98081bfb82bee457f49d`. No reference binaries are added to this PR.

The current [review log](https://chatgpt.com/library?file_id=libfile_e3bd1f9d5db0819185bc1c703e5bf682&account_id=personal), version 8, reports Natsu's two idle frames translated six pixels right. Read that new entry and [PR #14's actual repair script](https://github.com/dann3wman/JRPG-Ito/blob/animation-review/2026-11-11-natsu-idle-registration/assets/player-sheets/natsu-idle-v02/build.py). That open draft retains live-playback and engine limitations. Kiri repair PR #12 and Kuro specification PR #13 have merged; merging a specification does not create its art. This task changes none of those assets or review records.

Refreshed the selection/status sections of [Miren's recovery brief](https://chatgpt.com/library?file_id=libfile_6bfe860bb62c8191afed0871b6e0e0c2&account_id=personal) and [Natsu's halo-glance brief](https://chatgpt.com/library?file_id=libfile_ba10f229c3608191af2cf0b314dc8e73&account_id=personal). Their earlier full contents remain relevant; neither has established exports for the specified study. The original Spiral Cut priority is superseded by installed choreography and these newer records.

Confirmed: Hisui's identity and flower-eye motif, static references available. Proposed: all component geometry, palette, timing and preview placement below. Dependencies for later integration: an artist-reviewed Hurt pose, a measured wound attachment, and an explicit choice about persistent wound state. Missing these does not block an isolated component test. This run produces a specification only: art exported, art technically checked, artistically approved and engine-tested are all **not established**.

## Complete copy-ready creation prompt

Copy START through END as one brief.

**START**

Create exactly one asset for FINAL FANTASY: THE HUMMING CRYSTAL: **Hisui wound-bud opening v01**, three unique 32x32 pixel drawings. A compact crimson bud unfolds into a small chrysanthemum-like flower; a single pale eye becomes visible at its centre. Keep the treatment precise, restrained and physical. No spray, detached eyeball, glow, magical particles or full-screen flash. Draw only the attached flower component, not Hisui's body, blades, costume, portrait sheet or full Hurt animation.

Hisui is the Tide-Widow's daughter, a young woman with long black hair, a crimson coat, twin curved blades and red flowers with eyes growing from wounds. Preserve that design. Use cast data at `.claude/skills/party-art/references/cast.json`, the existing `docs/sprite-requests/hisui-sheet-2026-10-25.md`, and Hisui's embedded portrait/sprite from `index.html`, repository `dann3wman/JRPG-Ito`, commit `c1840737fef12061165ef6bb553e7bfa166b717b`. The portrait's ink/hatching is identity reference, not a request to hatch this tiny pixel component. The older 54-frame sheet request is not proof of completed art.

### Geometry and cells

Native cell 32x32, atlas three columns by one row, 96x32. Zero gutters and outer margins. Top-left origin, x right, y down. All opaque pixels including outlines remain inside local x8..23,y8..23 inclusive. Fixed pivot (16,22), the root attached to the wound, for every cell. The root pixel at (16,22) stays occupied with the same outline colour in all three frames. Local y22 is an attachment guide, not a ground baseline. No trimming, automatic centring, resampled rotation or per-frame scaling. Face the flower towards the viewer with its eye looking screen-left, suitable for a left-facing party member. No rig rotation is needed.

| Cell | ID / state | Atlas rectangle x,y,w,h | Exposure | Drawing and layer requirements |
| --- | --- | --- | --- | --- |
| R1C1 | HB01 BUD | 0,0,32,32 | 120 ms, [0,120) | Closed bud inside x13..19,y14..22; two overlapping dark-red petal lobes; no visible eye. Fixed root; PETALS and OUTLINE layers. |
| R1C2 | HB02 PART | 32,0,32,32 | 100 ms, [120,220) | Unfold upper petals and two side lobes to x10..22,y10..22. Narrow central pale slit at y16, no detached white pixel. Same root. Add EYE between petals. |
| R1C3 | HB03 WATCH | 64,0,32,32 | 280 ms, [220,500) | Open irregular flower within x8..23,y8..22. Five readable petal groups, not dozens of noisy rays. Eye box x13..18,y14..17; pale centre with a two-pixel vertical dark pupil at x14,y15..16 looking left. Same root and petal structure, no extra eyes. |

Three drawings, three exposures, order HB01,HB02,HB03. Total 500 ms. One-shot, no loop, no ping-pong. At 500 ms stop advancing and retain HB03. Do not close the flower or fade it away: that would imply the wound healed. At explicit preview reset or cancellation, clear the component and reset event history. This hold is a study policy, not an approved persistent-wound game mechanic.

Preparation is the closed bud; buildup is the parting petals; reveal is the eye; residue is the retained flower. Opening changes the silhouette, not overall brightness. No attack, damage or heal cue is emitted. One diagnostic cue `eye_revealed` at 220 ms, once per uninterrupted forward run. Seeking is visual only and emits no events; resuming does not replay skipped cues. Replay rearms the cue. `gameplay_events=[]`, `impact_cues=[]`. A future Hurt integration must keep damage on the real attack's existing damage event and attach this growth afterwards. Contact, recoil, body recovery and gameplay persistence remain outside this isolated study.

Draw all growth and eye changes. Runtime performs frame selection and fixed integer placement only. No tweening, opacity fades, runtime size changes, translation path, bobbing or camera shake. The root must not drift as the upper silhouette grows. Use elapsed milliseconds with the half-open intervals above.

### Palette and layers

Seven opaque colours plus transparency: `#19151D` outline/pupil, `#38222D` deep petal shadow, `#642A3C` crimson shadow, `#913A4D` main crimson, `#B85865` restrained petal ridge, `#9A8C88` eye shadow, `#D3C7B4` eye ivory. This is a proposed component palette, not an extraction from the high-colour static reference or a project-wide rule. Save the swatches. No pure white or bright red.

Deliberate FFRK/FFVI-style clusters, solid narrow curves, no dithering at this small size. One-native-pixel dark external outline, including petal tips and root. Shared internal petal edges use shadow, not doubled black bands. Avoid tangent contacts that make the flower resemble a star-shaped hit spark. At WATCH the eye is surrounded by petals on all sides.

Editable layers bottom to top: PETALS, EYE, OUTLINE; hidden GUIDES contains pivot and safe rectangle. All art layers authored 32x32, normal source-over, straight RGBA with alpha 0 or 255. Composite natively, then scale exactly 4x nearest-neighbour. No antialiasing, smoothing, gradients, glow, additive blending or partial opacity. This is a physical sprite component, not a smooth ability-light layer. No smooth layers are included. Any later magic light remains separate and is outside this scope.

### Scene and review layout

Use an offline placement preview at 256x160 native, 1024x640 at exact 4x nearest-neighbour. A neutral grey outline mannequin, labelled HISUI PLACEHOLDER outside its body, occupies x174..194,y73..128, nominal height 56 pixels. Feet anchor (184,128), baseline y128. It faces left and has no designed face, clothing, weapon or hair. Proposed wound point is world (176,88), near the leading shoulder. Place the component pivot there: cell origin (160,66). The maximum flower occupies x168..183,y74..88. Its 16-pixel width is approximately 29% of the mannequin height. This is an intentionally enlarged readability test, not approval of final anatomy or an extra canonical shoulder flower.

Draw background, mannequin, PETALS, EYE, OUTLINE, optional guides in that order. No root gap: the root overlaps the mannequin outline at (176,88). No enemy or ground art is commissioned. Keep all art inside scene x8..247,y8..151. Use selectable pale stone `#C4C2B4` and dark teal `#101D26` review backgrounds; additionally test a solid crimson `#913A4D` swatch behind the flower to represent coat contrast. These backgrounds are review aids and never enter imports.

Preview timeline: [0,200) mannequin only; [200,320) HB01; [320,420) HB02; [420,700) HB03; [700,1000] retain HB03. Diagnostic cue at scene 420 ms. At scene 1000 ms stop with the flower visible. Root, mannequin and camera stay stationary throughout. Manual Play/Replay, Pause, Seek and 1x/0.5x speed; no auto-loop. Half-speed alters playback rate, not authored metadata. Reduced-motion view uses manual still stepping. The retained flower tests residue; no artificial body recovery is claimed.

Labeled review: native 128x88, output 512x352. Background `#20262C`. Header `HISUI WOUND BUD` at (8,6), 5x7 bitmap font with one-pixel spacing. Cells at (8,24),(48,24),(88,24), exactly 32x32 each. One-pixel grey border immediately outside each cell at x-1..x+32,y-1..y+32. IDs HB01..HB03 at y58, states BUD/PART/WATCH at y68, durations 120ms/100ms/280ms at y78, each at the cell's x. Guides are optional overlays, excluded from default review and all import assets. No labels, mannequins, borders or backgrounds in the clean atlas.

### References and scope boundaries

Use the five supplied FFRK clips as timing/layering reference, not design templates: `20150430_3VYVy_-wuQ.mp4` (8-14 s, movement/recovery), `20150522_vNXuejzstyQ.mp4` (8-14 s, contact separation), `20150323_9h9tSnldEE8.mp4` (12-17 s, small cue before larger change), `20150123_OIw2mFut1No.mp4` (8-11 s, hold before resolution), `20150123_0qY82e8qugk.mp4` (13-15.5 s, layered light with readable actors). Their sampled stills were reviewed again for this specification; samples were extracted on November 10, not fresh continuous playback today. The proposed 500 ms is an authored choice, excluding menu/charging time. This study borrows clear stages and readable residue, not large attacks, flashes or reference palettes.

Before eventual integration, inspect a reviewed Hisui Hurt pose and measure the wound root per pose. Do not assume the provisional shoulder offset [-8,-40] from mannequin feet fits real sprites. Do not double the new bud over an already baked flower. Decide whether this replaces an existing wound flower or occupies a new wound site in that later review. Preserve Hisui's existing shoulder flower and blades unless separately authorised. This study changes no standard 54-frame mappings or 12 portrait states.

### Future exports

Use directory `assets/player-sheets/hisui-wound-bud-v01/` and basename `hisui_wound_bud_v01`. Every filename below is requested, not claimed to exist:

- `hisui_wound_bud_v01.aseprite`: 32x32 layered editable source, three frames, saved seven-colour palette and 120/100/280 ms durations.
- `hisui_wound_bud_v01.png`: clean transparent 96x32 import atlas.
- `hisui_wound_bud_v01_4x.png`: exact 384x128 nearest-neighbour atlas.
- `hisui_wound_bud_v01_review_4x.png`: labeled 512x352 review.
- `hisui_wound_bud_v01.json`: metadata below, plus source commit, palette, measured output hashes and actual status fields.
- `hisui_wound_bud_v01_preview.html`: self-contained offline preview and editable source, controls/backgrounds/placeholder label specified above.
- `hisui_wound_bud_v01_preview.png`: APNG, 1024x640, plays once. Four exposures 200/120/100/580 ms, total 1000 ms. Last exposure combines WATCH and its terminal reference hold. Retain the final visible flower.
- `hisui_wound_bud_v01_validation.json` and `README.md`: actual results, source references, reproduction instructions, missing formats and integration limitations.

Do not substitute a renamed PNG for Aseprite. Explicitly report missing exports if a tool cannot produce them.

Metadata contract:

```json
{
  "asset":"hisui_wound_bud_v01",
  "source_commit":"c1840737fef12061165ef6bb553e7bfa166b717b",
  "size":[96,32],"cell":[32,32],"columns":3,"rows":1,
  "gutter":0,"margin":0,"pivot":[16,22],"ground_baseline":null,
  "safe_bounds_inclusive":[8,8,23,23],
  "frames":[
    {"id":"HB01","rect":[0,0,32,32],"bounds":[13,14,19,22],"ms":120},
    {"id":"HB02","rect":[32,0,32,32],"bounds":[10,10,22,22],"ms":100},
    {"id":"HB03","rect":[64,0,32,32],"bounds":[8,8,23,22],"ms":280}
  ],
  "bounds_convention":"local inclusive allowed extents",
  "order":["HB01","HB02","HB03"],"duration_ms":500,
  "loop":false,"hold_last":true,"hide_on_cancel":true,
  "diagnostic_cues":[{"name":"eye_revealed","ms":220}],
  "gameplay_events":[],"impact_cues":[],"smooth_layers":[],
  "alpha_values":[0,255],"blend":"source-over","filter":"nearest",
  "preview":{"native":[256,160],"output":[1024,640],"start_ms":200,
    "duration_ms":1000,"pivot_world":[176,88],"cell_origin":[160,66],
    "feet":[184,128],"baseline":128,"apng_ms":[200,120,100,580],"plays":1},
  "exports":{"atlas_4x":[384,128],"review_native":[128,88],"review_4x":[512,352]},
  "status":{"specified":true,"exported":false,"artistically_approved":false,"engine_tested":false}
}
```

### Acceptance

Check actual dimensions, row order, rectangles, pivot, fixed root pixel, allowed extents, palette subset and binary alpha. Verify all outlines are one native pixel and continuous at the root; inspect narrow petal junctions manually. No hidden clipping, checkerboard pixels or automatic trimming. Verify each 4x output pixel block exactly replicates one native pixel including alpha.

Check 500 ms component and 1000 ms scene totals, one diagnostic cue and zero gameplay/impact cues, terminal hold, cancellation, replay and event-free seeking. Decode APNG delays and compare rendered crops with atlas pixels; do not mistake APNG encoding success for observed playback.

At 1x and 4x on stone, teal and crimson, confirm bud-to-flower continuity, upward/sideways petal opening from a stationary root, a single eye that reads left, and sufficient outline contrast against the coat swatch. Watch at normal and half speed. The reveal must feel like tissue opening, not a hit spark, detached sticker, pulsing light or blinking lamp. This scene tests residue and registration; momentum, attack contact, target recoil and Hisui's body recovery are explicitly unverified until full Hurt integration.

Reopen the editable file in Aseprite and actually open the HTML/APNG preview. Record software reopening, exported, technical checks, artistic review/approval and engine testing separately. Engine approval requires import with a reviewed character pose and measured wound anchors. Never mark production-approved from geometry alone. If three states do not read at native scale, report that artistic failure before adding more drawings or enlarging the flower. No new implementation or gameplay change is authorised by this specification.

**END**

## Verification of this specification

Passed: metadata JSON, timing totals, bounds, root/placement arithmetic, review-label fit, 4x dimension arithmetic and prompt boundaries. `git diff --cached --check` passed. `tools/check.sh` passed with the existing Quick Song/Delay drift warnings (implementation-status open questions 3 and 2) and existing creature attachment review notices. These are document and existing-repository checks. Actual artwork, source reopening, live playback, artistic approval and engine integration remain outstanding.
