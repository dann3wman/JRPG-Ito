# Tetsugi Haldane art generation

Generated with the built-in OpenAI image tool on 2026-10-25. Tetsugi follows Kiri and Natsu in the cast order. Existing battle art was exported as reference; the canon close-shaved scalp and stitched portrait took precedence over the old sprite's spiky hair.

## Outputs

Installed both sliced WebPs in the Party Sprite Viewer on 2026-10-25 and regenerated its manifest. Chromium checks passed for all 26 animation controls, 12 portraits, four derived effects, flipping and whole-sheet view. Existing Kiri/Natsu selection and mobile overflow checks also passed, with no page errors. This installs the preview artwork; the art review items below remain, and battle embedding is unchanged.

- [Sprite source](tetsugi-sheet-2026-10-25.source.png): 54 frames, 6 columns by 9 rows, 1024 × 1536.
- [Portrait source](tetsugi-portraits-2026-10-25.source.png): 12 states, 4 columns by 3 rows, 1536 × 1024.
- [Sliced sprite sheet](../../assets/player-sheets/tetsugi/tetsugi.sheet.webp): 576 × 864, 96 px frames with transparency.
- [Sliced portraits](../../assets/player-sheets/tetsugi/tetsugi.portraits.webp): 1024 × 768, 256 px panels.
- [Sprite inspection](../../assets/player-sheets/tetsugi/tetsugi.sheet.check.png) and [portrait inspection](../../assets/player-sheets/tetsugi/tetsugi.portraits.check.png).

## Prompts and revisions

The base specifications are [the sprite prompt](tetsugi-sheet-2026-10-25.md) and [the portrait prompt](tetsugi-portraits-2026-10-25.md).

The retained sprite generation added these constraints: standing bodies about 100 px high; 24 px empty internal margins including effects; foot baseline at 82% cell height; short punch trails; collar feather retained; both chant poses facing left with palms on the left; close-shaved stitched scalp matching the portrait. The original portrait was the reference. Earlier attempts had an effect crossing a cut or inconsistent chant facing and were not retained in the project.

The portrait generation added: preserve the reference's stitched scalp, cheek and neck, dark tired eyes and young adult identity; show tan gi shoulders and grey collar feather; feather-lined seams instead of blood; maintain face size and position with only small KO/sleep tilts; centre the face for the narrow card crop. The original portrait was the reference.

## Original generation verification and remaining art work

Both retained sources were sliced with `party_art.py` without warnings and their labelled inspection sheets were viewed. All 54 sprite cells and 12 portrait cells contain art. Portrait gutters were detected and removed; expressions retain consistent framing.

This is artwork delivery, not runtime integration. The sprite inspection still shows grounding offsets between rows, and the KO sprite's eyes do not clearly read as open. Correct these before battle embedding. The portrait KO retains the intended calm, open-eyed expression. Neither animation playback nor the narrow battle-card crop was tested. Existing viewer and battle assets were left intact.
