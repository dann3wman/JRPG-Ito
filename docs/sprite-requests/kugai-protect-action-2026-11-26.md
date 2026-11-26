# Kugai: Protect action v01, November 26, 2026

This is an implemented standalone battle-action draft. [Actual package](../../assets/party-fx/kugai-protect-v01/README.md), [playable HTML](../../assets/party-fx/kugai-protect-v01/kugai-protect.v01.html), [rendered MP4](../../assets/party-fx/kugai-protect-v01/kugai-protect.v01.mp4), and [validation](../../assets/party-fx/kugai-protect-v01/validation.v01.json) exist. Exactly one action is included: Kugai self-casts Protect, raises his tower shield, receives a hollow ward, then lowers the shield as the ward dissolves.

Protect is an established white spell assigned to Kugai in [the design document](../design-doc.md), with 30% physical mitigation for five recipient turns. This build contains visual cues only and changes no rules, balance or status duration. The classic FF support-spell precedent gives the player a clear activation and return to ready; the hollow, tarnished enclosure keeps the established quiet horror direction. Self-targeting is the proposed choreography choice, not a new targeting restriction. It avoids adding another actor to a focused art session.

## Selection and continuity

Default branch was confirmed as `ccr-d8829a5a-ays4x1`, commit `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. Existing files, recent commits, open animation/review PRs and equivalent Protect branches were checked. No equivalent Protect action was found. Provoke, Spiral Cut, Cure and prior Quake actions are different work and are not re-exported here. The new defensive action adds a reusable activation vocabulary while leaving engine integration for review.

Kugai's embedded sprite and ink portrait were extracted with the repository party-art utility and visually inspected. [Cast identity](../../.claude/skills/party-art/references/cast.json) and [Kugai sheet brief](kugai-sheet-2026-10-25.md) guide heavy dark armor, blood-red trim, broadsword in right hand, tower shield on left arm, and a black void with no face or ears. The older sprite has facial detail; the canonical faceless design and portrait take priority. No portrait state, boss rig or background asset is altered.

The separate review task's actual PR57 changes at `67be348e6cb68a60f0f1a5231444035c2f64a073` were read: Ren Delay Shot muzzle alignment/hold at (250,135) and projectile handoff at 1550 ms, without actor art or timing changes. The current review-log version24, modified November26, was read through its latest entry. Those files remain untouched.

| Continuity source | Current evidence and use |
| --- | --- |
| [Miren recovery bridge](https://chatgpt.com/library?file_id=libfile_6bfe860bb62c8191afed0871b6e0e0c2&account_id=personal) | Current file header rechecked; earlier full reading retained. Specification only unless later exports establish implementation. Not recommissioned. |
| [Natsu Halo Glance v01](https://chatgpt.com/library?file_id=libfile_ba10f229c3608191af2cf0b314dc8e73&account_id=personal) | Current header rechecked. [Repository v02](natsu-halo-glance-v02-2026-11-14.md) supersedes source/masks. Not part of Protect. |
| [Review log](https://chatgpt.com/library?file_id=libfile_fde3_f-e3bd1f9d5db0819185bc1c703e5bf682_5857d73f1cec8191b4bdff001e4a3037&account_id=personal) | Current version24 latest Ren entry inspected. Review is not artistic approval. |

Five supplied clips were available locally; action-window samples were inspected again. These are sampled images and prior reference notes, not fresh continuous viewing or newly measured timings. Charging/menu time was not used as the action duration. Protect's 3600 ms is an authored choice.

| Reference | Prior window | Applicable lesson |
| --- | --- | --- |
| [20150430_3VYVy_-wuQ.mp4](https://chatgpt.com/library?file_id=libfile_3d08908cd9608191bfd139d2d53d011c&account_id=personal) | 8-14 s | Separate anticipation, held action and recovery. No airborne strike copied. |
| [20150522_vNXuejzstyQ.mp4](https://chatgpt.com/library?file_id=libfile_bde1fc1da2408191baeb0cf4de9e3547&account_id=personal) | 8-14 s | Align visible activation and cue. No repeated contacts copied. |
| [20150323_9h9tSnldEE8.mp4](https://chatgpt.com/library?file_id=libfile_5ea2416c3fc08191afb807b6f13ec63b&account_id=personal) | 12-17 s | Small cue grows into a body-scale form; preserve overlap. |
| [20150123_OIw2mFut1No.mp4](https://chatgpt.com/library?file_id=libfile_585af039e0708191996443e0c5c5bfc0&account_id=personal) | 8-11 s | Establish an area, then hold before resolution. |
| [20150123_0qY82e8qugk.mp4](https://chatgpt.com/library?file_id=libfile_643cd8293c4c81918fee2fa51a3decf4&account_id=personal) | 13-15.5 s | Support magic connects light and recipient. Adapted to one self-target with muted ivory, not copied golden party rings. |

## Geometry and cells

Top-left origin; rectangles use x,y,width,height. Atlas rows/columns are one-based. No rotation, trimming, packing gutters or outer margins. Actor atlas 384x192, 4x2 cells96x96; local safe rectangle x8..87,y8..87 inclusive; pivot(48,86). Effect atlas512x256, 4x2 cells128x128; safe x8..119,y8..119; pivot(64,64). PNGs use native dimensions, not the generated 1536x1024 sources. Actor source cells are nearest-resampled to72x76, then boot-registered; effect cells to84x112 placed at(22,8). The ward's visible full arch is about69x97 native pixels, around1.75 times the actor's55-pixel visible height.

Scene384x216 native,1536x864 output. Baseline180. Actor faces left with fixed feet(224,180), wardcenter(224,150). Safe scene x8..375,y8..207. No camera shake, translation, rotation, scale pumping or target recoil. Recipient is Kugai: shield brace and surrounding enclosure are the defensive response. Art is drawn at native scale1, pixel previews exactly4x nearest-neighbor. Labels sit outside import cells. Review layout552x552, columns x8,144,280,416, actor rows y24,136 and effect rows y256,400;4x review2208x2208.

| R/C | Actor ID | Actor state | Effect ID | Effect state |
| --- | --- | --- | --- | --- |
| 1/1 | KP01 | Ready; planted boots | PW01 | Low seed arcs |
| 1/2 | KP02 | Draw shield inward | PW02 | Lower arch |
| 1/3 | KP03 | Raise shield | PW03 | Side ribs rise |
| 1/4 | KP04 | Present shield | PW04 | Closed arch, activation |
| 2/1 | KP05 | Brace behind shield | PW05 | Held enclosure |
| 2/2 | KP06 | Hold, cape follow-through | PW06 | Upper seams open |
| 2/3 | KP07 | Lower shield | PW07 | Dissolving segments |
| 2/4 | KP08 | Settle toward ready | PW08 | Last low fragments |

All KP cells share actor pivot and actor layer. All PW cells share effect pivot and front-ward layer. Exact rectangles and measured exclusive occupied bounds are in timeline JSON. Frame i starts at ((i modulo4)*cellWidth, floor(i/4)*cellHeight). There are16 unique generated drawings, not216 drawings.

## Implemented timing

| Actor order | Interval ms | Duration ms |
| --- | --- | --- |
| KP01 | 0-300 | 300 |
| KP02 | 300-550 | 250 |
| KP03 | 550-850 | 300 |
| KP04 | 850-1200 | 350 |
| KP05 | 1200-1600 | 400 |
| KP06 | 1600-2000 | 400 |
| KP07 | 2000-2300 | 300 |
| KP08 | 2300-2600 | 300 |
| KP01 reused hold | 2600-3600 | 1000 |

Ward starts850 ms. PW01..08 holds200,200,250,300,150,450,250,250 ms, totaling2050 ms. Intervals850-1050,1050-1250,1250-1500,1500-1800,1800-1950,1950-2400,2400-2650,2650-2900. Hide at2900. Cast cue850, protect_activate1500 exactly once, effect_clear2900, action_complete3600. No damage cue. Total3600 ms, gameplayone-shot, HTMLmanualreplay. Drawn motion changes shield/arm/cape shape and arch coverage; runtime chooses holds and animates only light opacity. Light smoothsteps0 to1 from1200-1500, holds to1900, falls to0 at2500. Actor and effect anchors remain fixed throughout. No interpolation between unrelated drawings.

## Palette and layer contract

Actor uses24 colors, charcoal/ivory/dried-red, dark one-pixel edge clusters and stepped shading. Ward uses16 colors, bone and tarnished metal with dark structural accents; it has no mandated universal black outline. Both binary alpha0/255 with transparent RGBzero. Exact palettes are recorded in JSON. These are per-asset choices, not project-wide effect constraints.

| Back to front | Authored resolution | Alpha/blend | Filter/output scale |
| --- | --- | --- | --- |
| Minimal two-tone stage | 384x216 | Opaque/source-over | Nearest4x |
| Rear ward light | 768x432 | Continuous/source-over | Linear2x |
| Kugai then front ward | Native atlases on384x216 | Binary/source-over | Nearest4x |
| Restrained activation light | 768x432 | Continuous/screen, opacity0.18 times envelope | Linear2x |
| Review label | Output canvas | Source-over | UI only, outside actor/ward art |

Light is a radial falloff centered224,150 native, radius35, peak sourcealpha0.20. Smooth light is explicitly separate, not baked into pixel atlases. No full-screen flash, arbitrary particles or additional attack is included. Stage is secondary flat context, not a commissioned background layer.

## Validation and acceptance

Actual checks pass for16 rectangles, measured occupied bounds, pivots, binaryalpha/palettes, stationaryboot equality, ORA recomposition, exact4x replication,3600ms totals, fourcue count/oneactivation, replayreset, pause/half-speed runtime, seekwithout events, finalhide and ready restoration.361rendered states check layerbounds at10ms increments;3601runtime states check timing. APNG all216expanded RGBA slots matchrenderer; MP4 decodes216frames at60fps; GIFtotals3600ms. Repository checks pass, with pre-existing boss attachment art-review advisories. These are not failures introduced by this package.

The art sheet and light/dark stills were visually inspected. GIF was reopened in GIMP and played at1x and0.5x, with live samples of ready and formed ward. Full continuous playback judgment and live HTML interaction remain unverified. No claim of polished momentum, perfect in-between motion, artistic approval or engine acceptance is made. Generated contour changes, ward closure spacing and final settle need continuous review. No post-playback visual correction is claimed. White matte, alpha haze and bootregistration were corrected before playback and recorded in the corrections log.

Referenceavailable yes; specifiedyes; generated/builtyes; exportedyes; technicallycheckedyes; artisticallyapprovedno; engine-testedno. Required formats exist; editable alternative is ORA, not Aseprite. Full game import remains untested. No balance claim is validated by this standalone scene.

## Complete copy-ready creation prompt

```text
Create exactly one playable battle action, Kugai self-casting Protect, for FINAL FANTASY: THE HUMMING CRYSTAL. Use the inspected repository Kugai portrait and sprite as identity references, prioritizing the canonical faceless helmet void over facial pixels in the older sprite. Keep heavy dark armor, blood-red trim, right-hand broadsword and left-arm tower shield. Face left. Do not add eyes, ears or a face.
Generate eight coherent actor keys and eight separate hollow ward keys. Each source sheet is1536x1024, four columns by two rows of384x512, transparent, no labels/borders/scenery. Actor keys: ready, draw shield inward, raise, present, brace, hold with cape follow-through, lower, settle. Keep head/volume/costume constant. Sword remains lowered. Ward keys: low seed arcs, lower arch, rising side ribs, closed pointed arch, held arch, opening upper seams, dissolving segments, final low fragments. Use thin bone-ivory ribs, tarnished metal and restrained dried-red details, transparent center, no explosion. Keep pixel art crisp with controlled palette and deliberate clusters.
Clean the generated matte/alpha, preserve black voids, and register planted feet. Export actor96x96 cells in384x192 atlas, pivot48,86, safe8..87. Export ward128x128 cells in512x256 atlas, pivot64,64, safe8..119. Both4columns2rows, zero margins/gutters, row-major rectangles, native alpha0/255, transparent RGBzero. Actor24colors and ward16colors per sheet; this is not a project-wide palette limit. Preserve original generated sources and real editable ORA value layers.
Assemble a384x216 scene at1536x864 output, baseline180. Kugai feet224,180; wardcenter224,150. Safe scene8..375 by8..207. Fixed actor and ward anchors, no shake or sliding cutouts. Draw gesture/cape movement through the eight keys. Actorholds300,250,300,350,400,400,300,300ms then1000ms ready. Wardstarts850ms, holds200,200,250,300,150,450,250,250ms andhides2900ms. Cuecast850, protect_activate1500 once, effect_clear2900, complete3600. One-shot3600ms; do not change game status or balance. Recipient is Kugai and responds by bracing behind the shield.
Composite stage, rear light, actor, front ward, foreground light, then outside-art labels. Pixel layers use source-over, nativegrid and exactly4x nearest-neighbor previews. Smooth radial light alone uses768x432, continuousalpha, linear2x output; center224,150 radius35, peakalpha0.20, rise1200-1500, holdto1900, fadeto2500 with smoothstep. Rearlight source-over, frontlight screen at0.18 times envelope. Do not blur actors or interpolate unrelated drawings.
Deliver clean PNG atlases, exact4x PNGs, editable ORA, preserved source sheets, labeled review552x552 and2208x2208 with labels outside cells, frame/timeline JSON, reproducible build/renderer/export/test code and README. Provide self-contained HTML with replay, pause,1x/0.5x, seek, light/dark backgrounds; noautoplay. Replay resets cues and all visualstate; seeking applies no events. Export216slots at60fps to1536x864 MP4/APNG plus a convenient GIF. Check actualdimensions,rectangles,pivots,safe bounds,palettes,alpha,timing,cues,cleanup,4x replication,ORA reopening anddecodedexports. Play normal andhalfspeed,inspectlight/dark,iterate observeddefects. Report partial review honestly and retain draftstatus until continuous visualreview and artistic approval; engineintegration is separately unverified. Exactlyoneaction,noadditionalportrait,boss,spell or gameplaychanges.
```

Exact prompts used for the two source generations are also preserved in the package's `source/creation-prompts.txt`. This complete prompt supports rebuilding the delivered action; it is not a substitute for its actual exports.
