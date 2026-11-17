# Kuro: Dark battle action v01

Implementation brief and creation record, 15 November 2026, America/New_York.

Exactly one new action was built: a 3.4-second single-target Dark cast. Kuro had an established static design and an unbuilt five-frame palm-well specification, but no installed casting sequence. This action supplies new casting and target-effect drawings, a playable standalone renderer, exports and checks. It enables review of the complete cast-to-impact relationship before any importer or battle integration work. The precedent is FFVI/FFRK's readable caster gesture followed by larger target magic; the horror is an empty space held open before its delayed collapse. No damage value, HP cost, Stress rule or battle timing rule changes.

Confirmed identity: thin woman, long purple-black hair, layered violet/black robes, hollow eyes, no weapon, one open casting hand, hair moving in otherwise still air. The sprite and ink portrait were extracted from the current repository and inspected before generation. Proposed and unapproved: the new pose interpretation, target-fold design, palettes, authored 3.4-second presentation and damage cue placement. The earlier 600 ms palm study was a specification only and does not constrain the complete action's duration.

Actual package: [assets/party-fx/kuro-dark-v01](../../assets/party-fx/kuro-dark-v01/README.md). It contains generated source sheets, cleaned atlases, two real layered OpenRaster documents, the renderer/player, MP4/APNG/GIF and validation. It is a built draft with incomplete continuous visual review, not production approval. No other character's review work is changed.

## Geometry and cells

All native pixel coordinates use top-left origin, x right, y down. Zero atlas gutters and outer margins. All native import pixels have alpha 0 or 255. Actor cells are 96x96, 4x2, atlas 384x192. Foot pivot (48,88), all art in inclusive x8..87,y8..87, nominal body height 56. Face left. Target folds are 128x128, 4x2, atlas 512x256, pivot (64,64), art inside x8..119,y8..119. Every frame rectangle is `(column-1)*cellWidth,(row-1)*cellHeight,cellWidth,cellHeight` and is explicitly enumerated in the JSON.

| Cell | Actor ID | Drawing and use | Local palm |
| --- | --- | --- | --- |
| R1C1 | KD01 | Settled, reused at beginning and end | 38,67 |
| R1C2 | KD02 | Bow and draw elbow inward | 44,65 |
| R1C3 | KD03 | Raise open palm | 31,57 |
| R1C4 | KD04 | Offer palm at chest height | 25,53 |
| R2C1 | KD05 | Extend and hold; also post-release support | 24,53 |
| R2C2 | KD06 | Release with wrist turn and cloth follow-through | 24,55 |
| R2C3 | KD07 | Fold elbow, lower palm | 30,59 |
| R2C4 | KD08 | Lower to waist, settle hair and robe | 36,66 |

| Cell | Fold ID | Shape | Duration / absolute interval |
| --- | --- | --- | --- |
| R1C1 | DF01 | Flat black seed with folded rim | 120 ms / 1050..1170 |
| R1C2 | DF02 | Oval opens, two torn fins | 140 ms / 1170..1310 |
| R1C3 | DF03 | Vertical cavity unfolds | 160 ms / 1310..1470 |
| R1C4 | DF04 | Fully open irregular fold, unnaturally held | 360 ms / 1470..1830 |
| R2C1 | DF05 | Facets crush inward, one damage cue | 120 ms / 1830..1950 |
| R2C2 | DF06 | Narrow slit and broken shell | 140 ms / 1950..2090 |
| R2C3 | DF07 | Curved remnants contract | 180 ms / 2090..2270 |
| R2C4 | DF08 | Small stitch, then clear | 160 ms / 2270..2430 |

Eight unique actor drawings and eight unique fold drawings. Five derived palm cells PW01..PW05 are 48x48 in a 240x48 strip with pivot (24,36), based on DF01/02/03/02/08 at 16/24/32/20/12 px cell scales. They are derived artwork, not five new generation claims. Their frame rectangles are `(i*48,0,48,48)` for i0..4. Palm anchor world coordinate is actor feet minus (48,88) plus the per-pose palm in the table. No automatic recentering.

Scene native 384x216, output 1536x864. Kuro feet (302,180); target feet initially (104,180); fold pivot fixed at (104,142). Baseline y180. Scene safe art/light region x8..375,y8..207. Actor and target scales remain fixed. The 64x64 reused training dummy uses pivot (32,57), and is labelled outside usable art. No new enemy is commissioned. Flat pale stone #C4C2B4 and dark teal #101D26 are review backgrounds, not new scenery assets.

Review canvas 552x552, 2208x2208 at exact 4x. Actor origins: x8/144/280/416 and y24/136, 96px cells. Fold origins: same x values and y256/400, 128px cells. One-pixel grey border outside each cell, bitmap labels at x,y+cellHeight+2, header at (8,4). Labels and borders never enter import atlases.

## Timeline, motion and layers

Actor exposure order with durations: KD01 220, KD02 180, KD03 140, KD04 140, KD05 420, KD06 180, KD05 400, KD07 180, KD08 180, KD01 1360 ms. Total 3400 ms. Actor recovery ends at 2040; the remaining hold lets the target's residual magic clear. No whole-body runtime bob or translation. Eight authored poses supply articulation and hair/cloth changes; no crossfade or interpolation of unrelated drawings.

Palm begins at 540 ms, uses PW01..PW05 for 100/120/340/120/100 ms, then hides at 1320. Target fold begins at 1050 and hides at 2430. Cues: cast_release 1100, exactly one damage 1830, effect_clear 2430, action_complete 3400. They are preview events only. All intervals are half-open. Slow display frames dispatch crossed cues once; seek emits none; backward seek never re-arms a cue. Replay resets time, pose, effects and cue history. Stop on the effect-free terminal scene. No auto-loop or ping-pong.

Target x keyframes: (0,104),(1830,104),(1900,98),(2040,101),(2320,104),(3400,104). Target y: (0,180),(1830,180),(1900,178),(2100,180),(3400,180). Smoothstep between keys and round positions to integer native pixels. This is one recoil and settle, not random shaking. The cavity stays in world space while the target is expelled from its closing rim. Four small authored fragment copies travel inward during 1980..2410; their deterministic paths are in `render.js`. No resampled rotations.

Compositing order: native opaque review background, rear smooth light, native target and hit silhouette, native caster, native palm, native target folds/residue, restrained foreground light, preview-only labels. During1830..2430 the target is composited again above the folds to make its expulsion and recoil visible at the cue. Pixel layer is 384x216, nearest filtering, alpha0/255, source-over, exact4x. Actor palette has 24 swatches, folds16, exact RGB arrays in JSON. Shared palette across each sheet; crisp dark actor contours with stepped corners. Fold outlines are coloured and intentionally broken; no universal black-contour rule. Existing training-dummy colours are a separate context palette.

Light is authored separately at 768x432, continuous alpha, linear filtering to output at2x. Rear light uses source-over, foreground glints screen blending. Maximum target glow radius64 native units, peak rear opacity0.34, brief impact light0.45, foreground multiplier0.18. Supporting light travels in eased arcs and converges around the held cavity. It never replaces the drawn shapes, blurs the native actors, or becomes a full-screen flash. UI labels are smooth preview annotations only. MP4/GIF are viewing derivatives; atlas/4x PNG and decoded APNG checks are the pixel evidence.

## Sources, continuity and acceptance

Repository base `5fbc8b8c6e3366196eda437e0296ef1ff3ec71bf`, default discovered as `ccr-d8829a5a-ays4x1`. Read root AGENTS, party-art/sprite-animation guidance, corrections log, style/glossary, relevant design/cast, existing asset layout, recent commits, open action/spec/review PRs. Inspected actual PR24 README changes and review-log version13. Miren's recovery snap and provisional costume remain unresolved. This package preserves those assets and the separate Natsu repairs. No equivalent current Kuro action was found.

Continuity references read: [Miren recovery bridge](https://chatgpt.com/library?file_id=libfile_6bfe860bb62c8191afed0871b6e0e0c2&account_id=personal), [Natsu Halo Glance](https://chatgpt.com/library?file_id=libfile_ba10f229c3608191af2cf0b314dc8e73&account_id=personal), [review rotation v13](https://chatgpt.com/library?file_id=libfile_e3bd1f9d5db0819185bc1c703e5bf682&account_id=personal). Natsu source/mask v02 is in [PR21](https://github.com/dann3wman/JRPG-Ito/pull/21); no use of its masks here. Earlier Spiral Cut and Cure are existing sequences, not selected again.

Reference clips available locally; their prior action-window samples were inspected, not fresh continuous playback:

| Reference and Library ID | Window | Relevant principle |
| --- | --- | --- |
| 20150430_3VYVy_-wuQ.mp4 / libfile_3d08908cd9608191bfd139d2d53d011c | 8..14s | Separate anticipation, larger action, recovery |
| 20150522_vNXuejzstyQ.mp4 / libfile_bde1fc1da2408191baeb0cf4de9e3547 | 8..14s | Contact and response timing |
| 20150323_9h9tSnldEE8.mp4 / libfile_5ea2416c3fc08191afb807b6f13ec63b | 12..17s | Small caster cue, larger target-centred magic |
| 20150123_OIw2mFut1No.mp4 / libfile_585af039e0708191996443e0c5c5bfc0 | 8..11s | Gather, hold, converge |
| 20150123_0qY82e8qugk.mp4 / libfile_643cd8293c4c81918fee2fa51a3decf4 | 13..15.5s | Layered light with readable actors |

Menu/charging time is excluded. No source colours, characters or timings are copied. Generated source hashes and all produced-file hashes are in validation. No source footage is committed.

Acceptance checks cover atlas dimensions/rectangles/order, safe bounds, registration, measured anchors, binary pixel alpha, palette limits, exact4x enlargement, ORA recomposition, decoded APNG pixels and 3400ms timing, MP4 decode/60fps, cue counts, replay/seek/pause state, terminal cleanup and 341 actual rendered pixel/light bounds samples. Native visual inspection covers contours and silhouette but does not mechanically certify a one-pixel contour at every shaded corner. User approval, complete continuous normal/half playback, final browser controls and battle-engine import remain unverified. The real target response must be reviewed at game scale before integration. Keep the PR draft.

## Complete copy-ready creation prompt

Create exactly one new playable action for FINAL FANTASY: THE HUMMING CRYSTAL: Kuro casting Dark on one training target. Build the animation and exports, not just a sheet or prompt. Use the current repository Kuro sprite and portrait as identity references: thin young woman, very long purple-black hair over hollow eyes, layered violet-black robes, brown belt, muted gold cuffs, no weapon. Preserve the ink portrait as reference; draw the actor in crisp FFVI/FFRK-like 16-bit pixel clusters. The horror is a silent empty cavity held open before it crushes inward. No eye, face, skull, rune, neon explosion or full-screen flash in the magic.

Generate a cohesive eight-key full-body casting sheet on transparency, four columns by two rows, source1536x1024. Same scale, head volume, costume and foot baseline throughout, face left. Keys in reading order: settled; bow and draw elbow inward; raise open palm; offer at chest height; extend and hold; wrist-turn release with hair/robe follow-through; lower palm toward chest; settle toward idle. Hair always trails subtly right. Articulate the arm and cloth, do not slide a rigid cutout or redraw the identity. Create a second eight-key transparent sheet, same source layout, of substantial folded charcoal/violet-grey membranes around an opaque black cavity: flat seed; oval opening; vertical unfolding; fully open irregular held cavity; crushing inward facets; slit with broken shell; curved remnants; small stitch. Keep clear padding and no labels in either source sheet.

Clean generated alpha without keying away black cores. Pack actor into eight96x96 cells in384x192, pivot48,88, safe x8..87,y8..87 and nominal56px body. Pack folds into eight128x128 cells in512x256, pivot64,64, safe x8..119,y8..119. Use zero gutters/margins, row-major order, integer registration. Shared actor24-colour palette and fold16-colour palette, alpha0/255, stepped dark contours for the body, coloured broken fold edges. Use sparse internal dithering only in broad folds. Preserve identical planted boots. Export exact4x nearest-neighbour atlases. Save editable layered OpenRaster art and the generated originals, not renamed flat rasters.

Build a384x216 minimal battle scene, output1536x864. Kuro feet302,180, target feet104,180 with64x64 training-dummy pivot32,57, fold centre104,142. Face Kuro left. Label the dummy as PLACEHOLDER outside usable art. Safe art/light region x8..375,y8..207. Use dark teal #101D26 and pale stone #C4C2B4 selectable backgrounds. Keep the target fixed until the hit, then recoil with smoothstep integer-rounded x keys0:104,1830:104,1900:98,2040:101,2320:104,3400:104 and y keys0:180,1830:180,1900:178,2100:180,3400:180. Do not change gameplay or balance.

Actor sequence KD01/02/03/04/05/06/05/07/08/01 holds220/180/140/140/420/180/400/180/180/1360ms, total3400. Actor feet never translate. Local palm anchors for KD01..08 are38,67;44,65;31,57;25,53;24,53;24,55;30,59;36,66. Attach palm effect using these anchors. Derive five48x48 palm cells, pivot24,36, from folds01/02/03/02/08 scaled to16/24/32/20/12px and placed immediately above the palm; start540, hold100/120/340/120/100ms and hide1320. Target folds01..08 begin1050 and hold120/140/160/360/120/140/180/160ms, hiding2430. Keep the cavity fixed in space as the target recoils from its crush. From1830..2430 draw the target above the closing folds so the reaction is readable. At most four small reused fragments converge1980..2410. The actor settles by2040; all magic clears by2470 including supporting light.

Render at60fps while retaining authored key holds. Add restrained smooth supporting light in a separate768x432 canvas: source-over rear light and low-opacity screen glints in front, linear2x to output. Native actors/effects remain nearest4x. Target glow radius at most64nativepx, rear peak0.34 and brief impact0.45; no camera shake or random perturbation. Keep main progression in the generated shapes. No fractional actor scale/rotation, blur on pixel art or blending of unrelated poses.

Cues are cast_release1100, damage1830 exactly once, effect_clear2430, action_complete3400. One-shot with effect-free terminal hold, no auto-loop. These are preview cues only. Supply Replay, Pause, seeking, normal/half speed and background controls in a self-contained offline HTML player. Replay resets actors, effects and cue history. Seeking emits nothing and must not re-arm passed events. Pause stops the animation clock. Background switching changes only review context.

Deliver the originals, cleaned native transparent atlases, two genuine layered ORA sources, exact4x PNGs, readable bitmap-labelled552x552 review canvas and2208x2208 enlargement, timeline/import JSON with every rectangle/anchor/palette/exposure/layer/cue, shared renderer and reproducible export scripts, standalone HTML,1536x86460fps MP4 and lossless APNG,768x432 GIF derivative, light/dark stills, README and actual validation results under assets/party-fx/kuro-dark-v01. Keep source footage out of the commit. All filenames use v01 consistently with the implementation manifest. The review uses actor origins x8/144/280/416,y24/136 and fold origins same x,y256/400; borders immediately outside cells, labels below, header at8,4. Import assets have no labels or guides.

Validate actual dimensions, rectangles, order, fixed boots, anchors, padding/clipping, colours, alpha, exact4x pixels, all durations, single damage cue, replay/seek/pause, hide/terminal states, layered-source reopening and rendered decode. Play normal and half speed against both backgrounds; inspect momentum, contact, target readability, hold, collapse and recovery. Fix observed defects. Report sampled live inspection separately from complete continuous review. Do not claim artist approval or engine testing without evidence. Publish only actual produced files on a dedicated GitHub branch and draft PR if review remains incomplete. This is one action, not a complete Kuro sheet, another portrait, a standalone palm component or a gameplay change.
