# Fuyori Mix: incomplete animation review

No sprite or timing edits. This is not a pass. The pour-to-inspection transition leaves receiving-vial hand identity ambiguous; a reliable anatomy/prop correction was not completed. Other open reviews are preserved.

Source PR61, commit `b3b1a47c6f77e6386100dc9a79f19001d6b1e9e0`, `assets/party-fx/fuyori-mix-v01/fuyori-mixing.v01.png`. See review.json for the exact hash and source reconciliation.

Eight96x96 cells,384x192 atlas,4x2 row-major,pivot48,86,8px inset,binary alpha,24 colours. One nonlooping3600ms sequence: FM01..FM08 thenFM01, holds300/250/300/350/400/400/300/300/1000ms. No assumptions or metadata changes. GIFs repeat for inspection only; slow doubles all holds.

All eight keys inspected. Static silhouettes distinguish raising, pouring and recovery. Boot registration stays planted; no combat impact or recoil applies to this support action. Vial/hand transfer, head/coat contour volume, palette identity and pixel flicker remain unresolved. GIMP playback sampled at1x/0.5x, not a complete continuous-motion approval. Vapour compositing, reference-video rhythm comparison and engine compatibility were not verified.

Native geometry, padding, binary alpha and24-colour count checked. Every decoded GIF frame and delay matches the source atlas composite. `tools/check.sh` passed with existing drift warnings and unrelated attachment advisories. Not installed into the54-frame party importer.

Reproduce evidence with `python3 build.py /path/to/pinned/fuyori-mix-v01` using Pillow and NumPy. Source artwork remains unchanged and recoverable in PR61. Resume this review branch for corrections; rotate the next independent review to another character.

## Evidence files

- [build.py](https://chatgpt.com/library?file_id=libfile_fde3_f-636a031035f481918e1f30e1ad7ee40d_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [frames.2x.png](https://chatgpt.com/library?file_id=libfile_fde3_f-7ec092666f148191ab3a34dff7eb3604_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [mix.normal.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-1b01530fa8e0819194f92425f90a096f_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [mix.slow.gif](https://chatgpt.com/library?file_id=libfile_fde3_f-a30d5da6e9b08191a866954ddb71987b_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [timing.json](https://chatgpt.com/library?file_id=libfile_fde3_f-0c4f4a03ea388191ab90f732dca1eab3_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
- [validation.json](https://chatgpt.com/library?file_id=libfile_fde3_f-dc5e37c3a8588191bb23144199ba8129_5857d73f1cec8191b4bdff001e4a3037&account_id=personal)
