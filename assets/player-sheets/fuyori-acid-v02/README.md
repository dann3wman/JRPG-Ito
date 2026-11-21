# Fuyori Acid: detached ground fragment correction

Removed exactly 19 detached ground pixels from FA05-FA07 in the native PNG and existing layered ORA. All eight source and corrected poses were inspected. Corrected GIF playback was sampled in GIMP at normal and half speed. **Partial review, not artistic approval.** Full continuous before/after playback, reference footage comparison and engine integration remain incomplete.

Source: PR40 at e27f658ecbb5555f47c0fc89714eeb64a99fafd1, assets/party-fx/fuyori-acid-v01/fuyori-throw.v01.png. Source SHA256: ef4f14d390dab69634ccdcf518383d15ac3c75465afe1cc0106f570899e2b463. No matching Library source resolved; parity unknown. Fuyori was unreviewed; other open reviews remain untouched.

## Exact correction

FA05 local x41..54, FA06 x43..45, FA07 x52..53, all y85, changed to transparent. These disconnected strokes beneath the gap between planted boots contradict the source no-shadow contract. Connected boot edges are preserved. All other pixels, frame geometry, palette, bounds, anchors and timing are unchanged. Originals remain recoverable at the pinned source commit.

384x192 sheet, eight96x96 cells,4x2 row-major, pivot(48,86),8px padding. FA01..08 then FA01 held250/200/250/200/250/250/250/350/1000ms. Gameplay is a3000ms one-shot; previews repeat only for review. No timing assumptions.

Use fuyori-throw.v02.png with timeline.v02.json. This metadata retains PR40's choreography and effect references; obtain its unchanged acid-splash.v01.png from PR40. This package is not a standalone full-scene renderer. Actor-only previews exclude effects/contact. timing.json records the original source timing. fuyori.frames.png shows before poses; review-4x.png shows corrected poses.

Reproduce with `python3 correct.py /path/to/pinned/fuyori-acid-v01` (Pillow, NumPy). Exact19-pixel delta, other-pixel preservation, unchanged bounds, layered ORA recomposition and decoded before/after GIF pixel/timing checks passed. Repository checks passed with two existing drift warnings and16 attachment notices. No source scale, identity or palette redraw.

Preparation and release silhouettes read distinctly in static frames; coat follow-through and recovery are present. Head/hand/prop continuity, crystal readability and connected ground-edge strokes still require artistic assessment. Full motion smoothness is not certified. No reference-video viewing is claimed.

## Outputs

- [correct.py](https://chatgpt.com/library?file_id=libfile_fde3_f-317fb0fd654081918bc2c8650b6ea8c2_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [correction-validation.json](https://chatgpt.com/library?file_id=libfile_fde3_f-cf7978919cf08191932cb5dd24162a52_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [fuyori-throw.v02.4x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-5eeb0479c7e88191b920c86caefb200f_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [fuyori-throw.v02.ora](https://chatgpt.com/library?file_id=libfile_fde3_f-27ece5726db08191a958414bf189f98e_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [fuyori-throw.v02.png](https://chatgpt.com/library?file_id=libfile_fde3_f-9245d143f17c8191a2a5e70a86a45cef_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [fuyori.after.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-7bb1fb33032c8191899ba73b1741f595_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [fuyori.after.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-390d018583788191b3df410acc418bc0_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [fuyori.before.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-976464e621d08191b2e6a4b305d10721_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [fuyori.before.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-076bd3afbfc4819192dda69980b3e5b5_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [fuyori.frames.png](https://chatgpt.com/library?file_id=libfile_fde3_f-83183a5e76e4819189ade8edda06ead4_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [review-4x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-219e578a96108191aca31e7089010be7_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [timeline.v02.json](https://chatgpt.com/library?file_id=libfile_fde3_f-bf45c82fe4548191891c00cddbfa4d56_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [timing.json](https://chatgpt.com/library?file_id=libfile_fde3_f-1440e46c5ae48191abb20aec01060d21_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
