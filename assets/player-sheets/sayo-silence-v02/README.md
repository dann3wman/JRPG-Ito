# Sayo Silence: hand-return timing revision

Partial review, not artistic approval. Exactly one existing actor atlas from PR49 reviewed. No raster pixels changed. The v02 PNG and ORA retain the original bytes for compatibility with the accompanying revised exposure track.

The original SS04 extended-hand pose jumped straight to SS05 at the lips. SS04 now holds250ms instead of350ms, followed by SS03 for100ms at1100..1200ms. This brings the hand inward before the hush. All later exposure starts, the1800ms Silence cue,3600ms total and terminal ready hold are unchanged. This100ms choice is editorial; native8-frame atlas count/order remain intact, playback exposures9 to10. No indiscriminate interpolation or blurred frames.

All8 native poses inspected enlarged. Corrected GIF sampled in GIMP at1x/0.5x and the3 transition exposures paused. Original GIFs built/decoded but not visually played this run. Complete continuous review remains unfinished. Head/hair and tuning-fork/chain consistency, effect context and engine integration are unresolved. No professional-quality pass claimed.

## Source and integration

Source PR49, commit7b53d172e72c896fd2d1a85132664a4c30500a06, assets/party-fx/sayo-silence-v01/sayo-singing.v01.png. SHA2569555a9040de3c1dbefb16dca9b0fbf36f440c66ac244dbce161944eb8ad69209, identical to v02 PNG. Default headb5d0e9f9ac45c21b2acf28784d75fd977d35eb91. No matching Library native sheet resolved, parity unknown. Sayo absent from21 rotation entries; prior open corrections untouched.

Use timing.json actor_track with PR49 renderer, retaining all its cues, effects, motion and other metadata. Native384x192,96x96 cells,4x2 row-major,zero gutters,pivot48,86,safe8px. This is a standalone action, not a54-frame party sheet. PNG/ORA are preserved originals, not redrawn assets.

Reproduce with Pillow and NumPy:

```sh
python3 build.py /absolute/path/to/pinned/sayo-silence-v01
```

Builder validates source hash, exact decoded GIF pixels and delays, safe padding and binary alpha. Before/after3600ms and7200ms previews use the same immutable atlas. Repository checks passed with existing tracked warnings. See review.json and validation.json for limits.

[Before](casting.before.normal.gif) | [After](casting.after.normal.gif) | [Slow before](casting.before.slow.gif) | [Slow after](casting.after.slow.gif) | [Native PNG](sayo-singing.v02.png) | [4x sheet](sayo-singing.review-4x.png) | [Timing](timing.json) | [ORA](sayo-singing.v02.ora)

## Saved outputs

- [build.py](https://chatgpt.com/library?file_id=libfile_fde3_f-00fb492a24588191bd5d87b83d26973b_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.after.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-358f37dc8aac8191a840c90682a8b85a_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.after.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-3be913f58e2481918b6d0d9a0c8091eb_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.before.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-854edf1e3ccc8191845fdfd426b721db_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [casting.before.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-9daae05187fc8191ad86a8e8d2434546_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [sayo-singing.review-4x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-5de88210b49c8191a4e4140d6069b6fa_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [sayo-singing.v02.ora](https://chatgpt.com/library?file_id=libfile_fde3_f-b8591aee66bc819199e0f6a1129b103f_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [sayo-singing.v02.png](https://chatgpt.com/library?file_id=libfile_fde3_f-5ae66154fde88191bf9e0abc01e783ce_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [timing.json](https://chatgpt.com/library?file_id=libfile_fde3_f-3495ba8400108191a82f5d81cdad4b1c_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [validation.json](https://chatgpt.com/library?file_id=libfile_fde3_f-f85339d8bdc08191ba8743dad53cb5ac_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
