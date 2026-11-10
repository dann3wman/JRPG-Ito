# Kiri idle weapon and registration repair v02

Partial animation review, 2026-11-10 UTC. Not a production animation approval.

Kiri's installed idle3 lost the lowered sword and its body sat five pixels left of idle2. Restored 126 opaque sword/grip pixels from idle2 and translated idle3 by (+5, 0). This repairs the missing equipment and a conspicuous registration discontinuity without redrawing the character. The other 53 cells are exactly unchanged in RGBA in the PNG. WebP visible pixels and alpha match the PNG exactly. Invisible RGB under zero alpha is not used as art evidence.

The body offset is measured in the imported art. The importer uses an idle1 anchor, so per-frame silhouette centring is not established as its cause. The original generation omitted the sword despite the idle specification requiring a lowered weapon. Source cell drift and existing pose differences are possible contributors to registration; this review does not assert which caused it.

## Source and rotation

- Default branch: `ccr-d8829a5a-ays4x1`, head `095f4fc80c206c1321a5435a45434ff9c50dce14`. No open PRs were returned before selection.
- Runtime source: `tools/party-sprite-viewer/kiri.sheet.webp`, Git blob `8014d9cb77941e7a1babd47a7ce719c4c515bcf3`, SHA256 `c1d763caf70a5323ffa9f6a01bb15787e1948e3b931495ba80d551f9e91793b7`.
- Repository raw source `docs/sprite-requests/kiri-sheet-2026-10-25.source.png` has SHA256 `075d2368b93499a34e3ce2e586bc688498d13a6b12079adc7131936e7dab907c`, matching the previously reviewed Library source `libfile_cdd94ddf163c819199c70a916ac2173a`.
- The prior raw-source repair [kiri_full_v02.png](https://chatgpt.com/library?file_id=libfile_f8237f381a0481919145ad495312de96&account_id=personal), SHA256 `8179a8350489f4269453d80aba40951a6ae9f04ede8250b770b936db38faeb83`, exists separately at 1024x1536. The installed 576x864 atlas still contained the defect. This carries the known repair into the runtime version with its real import geometry, rather than overwriting the newer raw-source work. The raw source remains unchanged; re-slicing it alone would reintroduce the defect. Reapply `build.py` to the pinned source or integrate the upstream corrected source deliberately.
- Previous review: Natsu, 2026-11-09. Kiri last reviewed 2026-11-07, Miren 2026-11-08. Kiri and Natsu are the only installed party sheets. Selected Kiri's unreviewed imported version with a confirmed unresolved defect. Other characters are not presumed complete from specifications alone.

## Files and reproduction

- [Native PNG](kiri.sheet.v02.png), 576x864 RGBA, 54 cells of 96x96, 6 columns and 9 rows.
- [Metadata](kiri.sheet.v02.json), exact frame order, frame rectangles/bounds, action descriptions, timing and loop flags from the repository manifest. The importer baseline remains 88. No frame-count, layout, timing or manifest edits.
- [Nearest-neighbour 2x review sheet](kiri.sheet.v02.review-2x.png).
- [Idle before/after](kiri.idle.before-after.normal.gif) and [half-speed](kiri.idle.before-after.slow.gif). GIF is a convenience preview with colour quantisation; PNG/APNG remains the lossless evidence.
- [All sequence previews](review.html): 26 named sequences at original and half speed, built by reopening the corrected PNG. Before/after panels retain repeated hold slots. APNG one-shots play once; reload to replay. Single-pose sequences remain static by design.
- [Editable processing source](build.py). From this directory run `python3 build.py` with Pillow and NumPy installed. Reads the pinned original through Git and rebuilds the PNG, installed lossless WebP, metadata and previews. Does not rely on a duplicate original archive.

## Inspection and validation

All 54 original and corrected poses inspected as stills. Reviewed key-pose silhouettes, weapon continuity, head/hair/body proportions, foot baselines, padding, action progression and hand/equipment contact. The following sequence groups were inspected frame by frame:

| Sequences | Still-frame finding |
| --- | --- |
| idle | Missing sword and leftward registration in idle3 repaired; breathing and scarf variation retained |
| ready, defend, advance | Braced stance and stepping poses readable; original silhouette/volume variation retained |
| attack, attackB | Windup, crossing strike and follow-through visible; 90 ms slots and repeated terminal holds preserved; impact rhythm awaits playback |
| chant, cast, item | Gesture and vial readable; cast recovery remains snappy; no indiscriminate in-betweens |
| hurt, lowhp | Recoil and planted-kneel silhouettes retained; no padding/clipping defect found |
| special, limit | Sword sweep and humming poses present; spiral effects and intentional holds retained |
| victory, zombie, ko | Front turn, slack sway and prone silhouette readable; no new registration changes |
| sleep, paralyze, confuse, berserk | Intentional held/frozen poses retained; status symbols not treated as stray pixels |
| walkDown, walkUp, walkSide | Standing/contact poses preserved; side walk remains three-quarter art, a previously recorded limitation |
| shock, downcast, listen | Single-pose emotes inspected; no manufactured motion added |

Automatic checks: unchanged cells; dimensions/order; binary alpha; original-colour subset; all frame bounds inside cells with transparent padding; PNG/WebP visible-pixel parity; exact nearest-neighbour enlargement; decoded lossless APNG pixels and durations matching atlas crops. Existing 240 ms idle slots remain idle1, idle2, idle3, idle2, a 960 ms loop. Slow previews are 1920 ms. No timing assumptions needed.

`tools/check.sh` passes: data checks, reference freshness, animation continuity/parity, authoring checks and simulator smoke run. Existing warnings are Quick Song 2 versus 3 slots and general Delay values, already tracked in `docs/implementation-status.md` open questions 3 and 2. Existing creature attachment ART REVIEW notices remain unrelated to this sheet.

## Remaining blockers

Live normal/slow playback was attempted but not inspected: Chromium fails with `socket() failed: Operation not permitted`; the cloud browser blocks local-file URLs. Therefore arcs, weight transfer, frame pacing, secondary motion and loop seams are not approved from still evidence. Engine rendering and transitions are untested. The PR must remain a draft.

The original opaque palette contains 57,054 RGB colours and shaded/antialiased clusters. It is not strict 20-colour FFVI production art. This patch introduces no new colours, blur, rescaling or antialiasing. Broader hair/face/volume drift remains. Full professional animation cleanup is incomplete.

The exact Spiral Cut actor choreography and cues are preserved in metadata, but full effect choreography and derived hit/Stone/Vanish/Mini looks require runtime inspection. Repository reference video is Natsu's Cure, not a matching Kiri idle reference; no matched Kiri video playback was completed. The previous source and review records remain recoverable. Prior partial reviews are not passes.

## Saved outputs

- [kiri.sheet.v02.png](https://chatgpt.com/library?file_id=libfile_77e2101aeb808191a29c506409cb509e&account_id=personal)
- [kiri.sheet.v02.json](https://chatgpt.com/library?file_id=libfile_203c639631f08191901914554fdc4a7e&account_id=personal)
- [kiri.sheet.v02.review-2x.png](https://chatgpt.com/library?file_id=libfile_0a3dd801ba848191aded758caab8f920&account_id=personal)
- [kiri.idle.before-after.normal.gif](https://chatgpt.com/library?file_id=libfile_2a977aa3d44881918c2db4d128ad756c&account_id=personal)
- [kiri.idle.before-after.slow.gif](https://chatgpt.com/library?file_id=libfile_98014cd558a48191ac01397f7915c5cb&account_id=personal)
- [kiri-idle-v02-review-package.zip](https://chatgpt.com/library?file_id=libfile_853981a752748191b2e84b6aa04b89b8&account_id=personal)

The publication commit and PR URL are recorded in the [persistent rotation log](https://chatgpt.com/library?file_id=libfile_e3bd1f9d5db0819185bc1c703e5bf682&account_id=personal) after publication.
