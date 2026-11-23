# Sayo: Silence action, 2026-11-23

Built exactly one new3.6-second standalone action with16 new raster keys. [Actual package, complete geometry/timing/export contract](../../assets/party-fx/sayo-silence-v01/README.md) and [offline player](../../assets/party-fx/sayo-silence-v01/sayo-silence.v01.html). Built/exported/technically checked; incomplete visual review, not artistic or engine approval.

## Selection and current evidence

Fresh default discovery: `ccr-d8829a5a-ays4x1`, base `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. Read root AGENTS, party-art/sprite-animation guidance and corrections, layout, recent commits, current cast/design and actual Sayo sprite/portrait extracted from index.html. Checked open PRs and equivalent Silence work before creating branch `battle-animation/2026-11-23-sayo-silence`. No equivalent action found. Silence is established black magic for Sayo, MP2 and three turns preventing sound attacks. These rules remain unchanged.

Fresh continuity documents: Miren recovery bridge and Natsu Halo Glance headings confirm their earlier briefs; no new exports established. Repository Halo Glance v02 supersedes source/masks. Latest animation-review rotation version21 read, modified2026-11-23. Read actual PR48 review and changes: Hisui Water HW08 one-pixel fringe correction, source PR46, separate unmerged review. No related art/review log modified. Recent review explicitly found no accessible native Sayo atlas; current embedded static identity and cast are usable generation references. Sayo Silence therefore adds a new action rather than repeating Cure, Spiral Cut, a portrait or a correction.

References are available locally: five supplied MP4s. Fresh samples from20150323 at12/14/16s,20150123_0qY82e8qugk at13/14/15s, remaining three at8/10/11s. These support target-centered apparition layering, directional motion and held buildup. Prior wider timing windows remain notes; no fresh continuous measurement claimed. Menu time is excluded. The apparition/convergence references inform this action, without copying their purple colors or damage pillars. Footage is not committed.

Continuity IDs: Miren `libfile_6bfe860bb62c8191afed0871b6e0e0c2`; Natsu `libfile_ba10f229c3608191af2cf0b314dc8e73`; review `libfile_e3bd1f9d5db0819185bc1c703e5bf682`. Clips: `libfile_3d08908cd9608191bfd139d2d53d011c`, `libfile_bde1fc1da2408191baeb0cf4de9e3547`, `libfile_5ea2416c3fc08191afb807b6f13ec63b`, `libfile_585af039e0708191996443e0c5c5bfc0`, `libfile_643cd8293c4c81918fee2fa51a3decf4`. Historical Spiral Cut references are not dependencies or newly reviewed artifacts.

Confirmed: canon spell, static identity references, current review status and actual generated/exported files. Proposed and unapproved: spectral-mouth metaphor, new battle rendition and authored timing. No source reference blocks this standalone build. Final identity/animation approval and future native engine import remain dependencies.

## Complete copy-ready creation prompt

```text
ACTOR SOURCE

Use case: stylized-concept. Create action-specific raster sprite artwork for Sayo's SILENCE spell in FINAL FANTASY: THE HUMMING CRYSTAL. Reference 1 is her established battle sprite, reference 2 her identity portrait. Preserve silver-white wavy hair, pale blue and white high-collared choir dress, dark stockings/boots, small tuning fork on chain. Two faint pale choir faces haunt her shoulders in every pose. Crisp 16-bit FFVI/FFRK pixel clusters, dark single-pixel-looking outlines and controlled pale blue ivory slate palette, no blur.
Exact sheet 1536x1024, four columns two rows, each cell384x512, transparent background, no labels or borders. Eight full-body poses of SAME small character facing LEFT with precisely identical proportions, head size and planted foot position. Each figure about240px tall centered x192, soles y438 in each cell. Keep hair/dress identity consistent. Read order:
1 ready with fork chain low at chest;
2 breath gathered, knees soften, hand rises to sternum;
3 eyes narrowed, fork lifted near throat, other hand rising;
4 singing softly mouth open, palm extended toward left, dress hem follows wrist motion;
5 finger reaches lips, commanding hush, fork close to collar;
6 sustained hush, chin dips subtly, shoulders relaxed, dress follows through;
7 hand lowers to chest and chain settles;
8 returns toward ready with relaxed wrist.
Only purposeful gesture changes, no body translation, no jitter, no unrelated weapons or effect blobs, no floor/shadow. Equal silhouette volume. Strong readable hands, hair and dress folds. This sheet is source art for a single new battle action, not a complete character set.

EFFECT SOURCE

Use case: stylized-concept. Create exactly eight original raster effect keys for Sayo's SILENCE battle spell, gothic 16-bit JRPG pixel art. Exact1536x1024 sheet,4columns2rows,384x512percell, transparent background, no labels,borders,actors or scenery. Each effect centered(192,256)insideitscell, plentyofclearspace, opaque crisp pixel clusters with dark contour, pale blue-grey ivory slate, desaturated lavender shadow, black inner cavity. No glow baked in. A spectral singing mouth WITHOUT a face, eyes, nose or head emerges from curled wisps and is slowly closed by three taut pale threads. This is a restrained haunting magical mouth, no blood or gore. Coherent shapes shared between cells, not random designs.
Read lefttoright:
1 two tiny curled breath wisps around an empty central space, small.
2 wisps curl into upper/lower lip arcs, small.
3 recognizable spectral mouth opening vertically, jagged lip edges and dark hollow, medium.
4 largest fully open singing mouth, 3 nearly horizontal threads gathering across it, no teeth or tongue.
5 threads pull shut, mouth narrows to horizontal slit, wisps flatten to either side; strong activation silhouette.
6 closed pale seam held unnaturally, three taut stitch-like strands, thinning curled side wisps.
7 closed seam breaks into three fading fragments with small wisps, medium-small.
8 only two small curled residue fragments, quiet.
Maximumextent240wide330high,centerfixed. No repeated outlines unrelated to previousframe. Detail enough for a substantial effect silhouette when reducedto84x112 native, intentional steppedcurves and pixelclusters.


ASSEMBLY AND DELIVERY
Build exactly one Sayo Silence action from these two newly generated sheets. Preserve the originals. Threshold pixel alpha at 200; use 24 actor colors and 16 effect colors. Actor: 96x96 native cells, 384x192 atlas, fixed pivot (48,86). Effect: 128x128 native cells, 512x256 atlas, fixed pivot (64,64). Each atlas is four columns and two rows, read left to right then downward, zero gutters and outer margins, with 8-pixel transparent safety padding in every cell. Source cells are 384x512. Reduce actor cells uniformly to 72x76 with nearest-neighbor; register soles to row85 and stabilize only the stationary ankle/boot strip y80..85 from SS01. Reduce effect cells to 84x112 and place at (22,8). Record actual bounds and palettes.

Scene: 384x216 native, 1536x864 output, top-left origin, baseline y180. Sayo faces left at feet (280,180); secondary placeholder target stands at (104,180); mouth pivot is (104,145). All art and light stay in scene x8..375, y8..207. Actor SS01..SS08 holds are 300,250,300,350,400,400,300,300 ms, followed by SS01 for 1000 ms. Effects SM01..SM08 begin at 850 ms and hold 200,200,250,300,150,450,250,250 ms, then hide at 2900 ms. Total 3600 ms, one-shot. Cues: cast850, silence_activation1800 exactly once, effect_clear2900, action_complete3600. Do not change combat rules or apply actual status effects in this standalone preview.

Actor motion is drawn. Keep the feet fixed, with no camera shake, crossfade or sliding. SM04 compresses vertically from scale1 to0.55 over 1500..1800 ms with smoothstep; use integer destination height/position and nearest sampling. Target x keys (time,value): (0,104),(1800,104),(1950,102),(2300,102),(2700,104),(3600,104). Target y-offset keys: (0,0),(1800,0),(1980,3),(2300,3),(2700,0),(3600,0). Interpolate with smoothstep and round to native pixels. This is a suppressed-voice dip, not damage knockback.

Three supporting light motes start at 850+j*65 ms and travel for 480 ms from (254,124) to (104,145), with a 12-pixel upward sinusoidal arc and smoothstep progression. Activation light rises from1650 to1800, holds until1950, fades by2200. Light is authored at 768x432 with continuous alpha and linear2x enlargement; rear light is source-over, restrained foreground light uses screen. Pixel layers use binary alpha, source-over and exact4x nearest-neighbor. Composite stage, rear light, target, Sayo, mouth, foreground light, then review labels. Light must remain separately renderable. The new raster artwork carries the action.

Export original PNG sources and prompts; actual editable OpenRaster value layers; clean native atlases and exact4x PNGs; timeline JSON containing all rectangles, pivots, palettes, bounds, exposures, cues, motion paths and rendering rules; reproducible code; README and actual validation. Review canvas 552x552 native, 2208x2208 at4x. Header (8,4), columns8,144,280,416, actor rows24,136, effect rows256,400. Borders sit immediately outside each cell, bitmap labels two pixels below. Import assets contain no labels or borders. Actor basename sayo-singing.v01; effect basename silence-mouth.v01.

Deliver self-contained sayo-silence.v01.html with replay, pause, normal/half speed, seeking and light/dark backgrounds. No automatic loop. Replay resets all actors, effects and cue history; seeking emits no events. Export a1536x864 MP4 with216 frames at60fps, one-play lossless APNG, and768x432 GIF viewing derivative with one repeat. Final scene must equal initial ready pixels. Reuse only secondary target context and utility scaffolding, not another action's actor/effect artwork.

Validate actual dimensions, alpha, palettes, anchors, safe bounds, foot registration, exact4x replication, ORA recomposition, timing, cue counts, replay, pause, seeking and decoded outputs. Inspect continuous normal/half-speed playback and both backgrounds, fix observed defects and explicitly report unverified checks. No artistic or engine approval follows from technical checks alone. Publish actual outputs and brief on a dedicated branch and PR. Do not merge or modify other review work. If continuous visual review cannot be completed, publish an explicitly incomplete draft.

```

Repository-required checks passed exit0. Existing drift warnings and art notices are retained; no gameplay or other review files changed.
