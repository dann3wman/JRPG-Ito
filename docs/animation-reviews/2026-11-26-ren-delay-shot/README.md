# Ren Delay Shot: muzzle attachment corrected, partial review

The flash now stays on the recoil-frame barrel until the projectile drawing starts. Its old anchor (246,139) was four pixels left and four pixels down of the actual barrel tip (250,135). Travel now occupies1550..1600ms, preserving impact at1600ms. The soft-light anchor follows the aim/recoil muzzle. Actor drawings and all authored pose holds are unchanged. Version2 names the corrected animation package, not a redrawn PNG. This is not an artistic pass.

## Source and selection

Exactly one character sheet: `ren-shooting.v01.png` from [PR55](https://github.com/dann3wman/JRPG-Ito/pull/55), commit `cdac700d3ab33e464abe08e51ab089312cfcc61b`. SHA256 `dfab49ce1b1041b39570bb423d01dd7f4df0286ace1f381af9fb31aabc30d661`. This is a provisional unmerged creation, not approved canon. Read current default `ccr-d8829a5a-ays4x1` at `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`, instructions, cast/action specifications, metadata and prior records. All23 Library entries and relevant open reviews were checked. Delay Shot was unreviewed; Goku was most recent. Ren Fire PR39 is a separate action. No matching Delay Shot Library native source resolved, so no cross-source hash equality is claimed. Preserve repository and Library histories independently. No pending PR is overwritten.

## Geometry and timing

384x192 atlas, 4x2 row-major96x96 cells; zero gutters, pivot(48,86), safe padding8px;24 opaque colors and binary alpha. Eight unique poses form one shot, with the ready pose repeated at the end. Native PNG/ORA are unchanged copies for a self-contained review package. Unchanged effect/target context is included solely to reproduce the attachment correction, not as additional reviewed sheets.

| Pose | Start ms | Hold ms |
| --- | ---: | ---: |
| RD01 ready | 0 | 400 |
| RD02 grip | 400 | 250 |
| RD03 raise | 650 | 250 |
| RD04 aim | 900 | 600 |
| RD05 recoil | 1500 | 100 |
| RD06 re-aim | 1600 | 300 |
| RD07 lower | 1900 | 350 |
| RD08 settle | 2250 | 350 |
| RD01 terminal ready | 2600 | 1000 |

All timing is specified, with no timing assumptions. One-shot3600ms; preview repetition is diagnostic only. Cast1500, impact1600, effect clear2600, complete3600 unchanged. Only runtime projectile travel changes from100ms to50ms so the muzzle remains attached during its50ms exposure. No indiscriminate in-betweens added.

## Inspection findings

RD01-03 establish grip and rising barrel. RD04 holds aim600ms before the100ms recoil, an intentional contrast in rhythm. RD05 lifts the barrel and pulls the arm back; RD06 returns toward aim while coat tails follow through. RD07-08 lower the weapon and settle before the identical ready drawing returns. Fixed boot pixels keep foot planting stable; no cell clipping or detached tiny component found. The one-shot recovery is not treated as an authored idle loop.

All eight unique actor cells were inspected at4x, plus the aim/re-aim detail and before/after discharge at1500,1520,1540,1550,1560,1580ms. In `discharge-comparison.2x.png`, left is before, right after; rows follow those times. The corrected flash stays at the tip in its three sampled muzzle poses. Target contact timing and subsequent recoil are preserved. Strong pistol/hand cluster changes and fine face/hat/coat texture still need artistic cleanup judgment; palette and fixed feet alone cannot establish anatomy, volume, weight or professional motion quality. No speculative raster edit was made.

Fresh GIFs were opened in GIMP, played and sampled at1x and0.5x for both versions. These observations are discrete, not full continuous playback certification. Reference action-window stills in the available footage samples were inspected for held actors and staged impact layering; continuous reference rhythm comparison remains incomplete. No footage is republished.

## Validation and limitations

3601 one-millisecond state comparisons preserve every runtime field except effect position, and preserve all positions from impact onward. Bounds, binary alpha,24-color palette, exact4x enlargement and ORA merged-image equality pass. APNG decoded pixels and durations exactly match the360 native10ms samples; GIFs match their quantized derivatives. The supporting target expands the composite to473 colors, so GIFs use a256-color viewing palette; APNG preserves the complete pixels. Normal duration3600ms, slow7200ms. APNG/GIF repeated holds are coalesced without changing exposure time. Previews omit smooth lighting and labels to isolate pixel art; glow playback is unverified.

`tools/check.sh` exited0. Existing Quick Song/Delay warnings remain documented in implementation-status open questions2/3;16 unrelated attachment-art notices remain. This does not test Ren engine integration. The standalone eight-pose action is not a54-frame importer replacement. Full continuous review, anatomy/identity approval and engine compatibility remain open, so the PR is draft.

## Reproduce

Extract `assets/party-fx/ren-delay-shot-v01` from the pinned source commit into a scratch directory. Requires Node with @napi-rs/canvas and Python with Pillow/NumPy. From any working directory, run the delivered scripts with absolute paths:

```sh
node export-review.cjs /absolute/source-package /absolute/scratch-frames
python3 build-review.py /absolute/source-package /absolute/scratch-frames
```

Exporter reads the delivered v02 native PNG for the after frames and pinned source for before, then checks runtime invariants. Builder recreates previews and validation. Source identity and all files are listed in `review.json`; originals remain in pinned Git history.

## Saved outputs

- [build-review.py](https://chatgpt.com/library?file_id=libfile_fde3_f-aa5fc6a540848191af313dc1c3d3e56f_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [discharge-comparison.2x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-8dd61ca9b54c8191bf983bb8ea6dc5f5_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [export-review.cjs](https://chatgpt.com/library?file_id=libfile_fde3_f-64eb77391bcc819193ced3d50dc324fd_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-delay-shot.after.normal.apng](https://chatgpt.com/library?file_id=libfile_fde3_f-f97703122f308191bb8eea33e3d4af1c_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-delay-shot.after.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-cc5a52b0c51881919324938de737a0b9_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-delay-shot.after.slow.apng](https://chatgpt.com/library?file_id=libfile_fde3_f-ffde15c973708191bb7802a22a28a0c6_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-delay-shot.after.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-da82140e222481918651c6b54fceebf6_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-delay-shot.before.normal.apng](https://chatgpt.com/library?file_id=libfile_fde3_f-a8c6895d0ed8819194f54fd19287bda8_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-delay-shot.before.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-e05b8bc90014819184ee8dfa3d3bc168_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-delay-shot.before.slow.apng](https://chatgpt.com/library?file_id=libfile_fde3_f-2f995945d8b481918737a5f6bbc2ac12_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-delay-shot.before.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-8a6af8a1aa408191a8951027fd6457f3_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-shooting.v02.4x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-7ac5ae5f442881918f7e5d0512918488_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-shooting.v02.ora](https://chatgpt.com/library?file_id=libfile_fde3_f-585075e661648191833e187dc7b4e500_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [ren-shooting.v02.png](https://chatgpt.com/library?file_id=libfile_fde3_f-7f03f5d9b2d4819190acead8427ab564_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [render.v02.js](https://chatgpt.com/library?file_id=libfile_fde3_f-27bd0c483bd88191beea06ca0f8f769c_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [repository-checks.txt](https://chatgpt.com/library?file_id=libfile_fde3_f-0431969cf734819195695557dd97362c_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [shot-impact.context.png](https://chatgpt.com/library?file_id=libfile_fde3_f-96b268419bc881918b4e155309f4d156_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [source-version.json](https://chatgpt.com/library?file_id=libfile_fde3_f-e026b0d9e0888191b26e464e0dd3afa2_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [target-context.png](https://chatgpt.com/library?file_id=libfile_fde3_f-0639700d7e98819192d7c45bddc510ff_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [timeline.v02(1).json](https://chatgpt.com/library?file_id=libfile_fde3_f-7ddd0d1e6acc81919b76132c3b401b66_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [validation(7).json](https://chatgpt.com/library?file_id=libfile_fde3_f-4b2e9eed9c048191a0c6b676ece3b311_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
