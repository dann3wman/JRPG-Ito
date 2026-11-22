# Shio Blink: planted boot correction v02

Partial review, not production approval. Exactly one existing actor sheet was reviewed.

Shio's boot soles changed contour and shading during a stationary cast. The native PNG and existing three-layer OpenRaster source now reuse the ready pose's two boot-contact patches in SB02-SB08. This changes556 pixels across seven poses. All pixels outside local exclusive boxes(24,81,43,86) and(56,81,70,86) are unchanged, including the robe hem and upper boots. SB01 remains identical. No new drawings, in-betweens, palette changes or retiming.

## Source and rotation

Source is unmerged draft[PR43](https://github.com/dann3wman/JRPG-Ito/pull/43),commit`b0fffb3e56143d9cf337c652790280662cc57af5`,path`assets/party-fx/shio-blink-v01/shio-casting.v01.png`,SHA256`26dd6b2d54f5ebcc405845bf4a80b897f0b9941ef9c6dfd83705db0b72b44837`. Shio was absent from all19 current persistent reviews. Fuyori's PR42 correction and other open reviews remain untouched. The default branch has14 review records; its history and the newer Library history are preserved independently. Source searches did not resolve a matching Library actor, so hash parity is unknown. Do not infer approved source authority from this review.

## Geometry, timing and import

The sheet remains384x192,4x2 row-major96x96 cells,alpha0/255,24 opaque colors,pivot(48,86). Frame rectangles and measured bounds are in`shio-casting.v02.json`. SB01-SB08 then SB01 last250/200/250/200/250/250/250/350/1000ms,3000ms total. This is the existing one-shot timing; no assumptions were needed. Hold SB01 after completion. GIFs loop for inspection only;slow previews double every exposure.

Replace only PR43's actor image reference with the v02 PNG. Retain that PR's ward effects and choreography. This standalone eight-key actor must not be installed as a54-pose party sheet. No engine integration is claimed. Originals remain recoverable at the pinned source commit.

## Inspection and remaining work

All eight before/after keys and enlarged boot contacts were inspected. Both versions were opened in GIMP and sampled with playback running at1x and0.5x;the corrected extension key was also paused and inspected. This does not establish full continuous perceptual review. The GIFs were built from the actual source and reopened corrected PNG,then decoded to check every frame and delay.

Lift,palm,extension,closing and lowering keys are distinct. The sleeve follows the hand and recovery returns to exact ready pixels. Fixed sole patches remove contact-contour and highlight crawl without freezing the hem. The later one-pixel hood rise,face/robe shade changes,palm-eye clarity and SB08-to-ready transition still need artistic assessment. No weapon,hit or damage event is intended for this defensive activation. Actor-only previews cannot establish ward/ally contact.

The available reference`20150123_0qY82e8qugk.mp4` was sampled at4fps from13 to15.5 seconds:the party holds position before protective light appears and settles afterward. This supports retaining clear holds and separating actor art from effects. It is sampled reference context,not fresh continuous video review. Footage is not redistributed.

Technical checks pass:exact556-pixel masked delta,unchanged other pixels,original palette,binary alpha,safe bounds,96px cells,ORA recomposition,exact4x scaling and decoded preview pixel/timing equality.`bash tools/check.sh` exits0 with the existing two Quick Song/Delay warnings and16 creature attachment notices. See`validation.json`,`repository-checks.txt` and`review.json`.

Keep the PR draft until continuous playback,artistic cleanup and engine compatibility are complete. No professional-animation pass is claimed.

## Reproduce

Extract the pinned source PR's`assets/party-fx/shio-blink-v01` directory outside this checkout,then run:

```sh
python3 assets/player-sheets/shio-blink-v02/build.py /absolute/path/to/shio-blink-v01
bash tools/check.sh
```

The builder requires Pillow and NumPy,guards the source PNG hash,updates the existing ORA partitions and produces the PNG,metadata,enlargements and before/after GIFs. It does not modify the supplied source.

## Outputs

- [shio-casting.v02.png](https://chatgpt.com/library?file_id=libfile_fde3_f-ca0feca6eab48191afa977842f3b44d8_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [shio-casting.v02.json](https://chatgpt.com/library?file_id=libfile_fde3_f-4dcbf10a79888191806e5558130aa034_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [shio-casting.v02.ora](https://chatgpt.com/library?file_id=libfile_fde3_f-15ea01dcdce88191b38bc631d47a61f6_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [shio-casting.v02.4x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-dfcccb4c31808191909558449d557611_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [frames.before-after.2x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-fd7051270db0819180b064ae614413af_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.before.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-5f7231b875c08191b7d30d93178df772_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.before.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-aa3c64bb89288191846357e4db8fbf26_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.after.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-323059471a688191b99d1e2f22ffda1c_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.after.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-b593ccb447b08191844282d48f1f047c_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [build(3).py](https://chatgpt.com/library?file_id=libfile_fde3_f-10f8d0d4c2b481918575dbe26fc890a1_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [validation(3).json](https://chatgpt.com/library?file_id=libfile_fde3_f-d11f2d2229908191b74e9317fc4454d2_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)

[Persistent rotation and publication record](https://chatgpt.com/library?file_id=libfile_fde3_f-e3bd1f9d5db0819185bc1c703e5bf682_5857d73f1cec8191b4bdff001e4a3037&account_id=personal).
