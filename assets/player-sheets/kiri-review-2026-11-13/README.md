# Kiri Haldane: incomplete re-review, 2026-11-13

No new sprite correction or animation pass is claimed. The previously repaired sword and idle registration remain intact. This run inspected the 54 current poses as enlarged stills and rebuilt/decoded normal and half-speed playback for all 26 atlas sequences. It could not inspect live motion: Chromium again fails with `socket() failed: Operation not permitted`.

## Source and selection

Default branch `ccr-d8829a5a-ays4x1`, current head `c1840737fef12061165ef6bb553e7bfa166b717b`. Applicable instructions, animation definitions and correction records are unchanged from the previous reads. Kiri is the least recently reviewed named character with an accessible animation sheet (Nov 10), followed by Natsu (Nov 11) and Miren (Nov 12). Open PR14 Natsu and PR16 Miren preserve unmerged repairs; PR15 Hisui and PR17 chapel are specifications, not new character sheets. No repair in those branches was reapplied.

Selected source: `tools/party-sprite-viewer/kiri.sheet.webp`, with native PNG at `assets/player-sheets/kiri-idle-v02/kiri.sheet.v02.png`. Decoded RGBA matches exactly. PNG SHA256 is `368c1829ae640e49723dc2e168c00f8d518af79fa50bd0fcf1e550c13147a270`, matching the earlier saved output metadata. The Library PNG identity remains `libfile_77e2101aeb808191a29c506409cb509e`, modified Nov 10. Library metadata was freshly checked; its binary was not downloaded again, so no independent new Library-byte comparison is claimed.

## Geometry and findings

576x864, six columns and nine rows of 96x96 cells. All 54 cells retain transparent padding. Exact frame order, times and loops are in validation.json, read from the current manifest. No timing assumptions or changes; slow previews double the durations. Repeated terminal poses are intentional holds.

Idle, ready, defend, advance, attack, attackB, chant, cast, item, hurt, lowhp, special, limit, victory, zombie, ko, sleep, paralyze, confuse, berserk, walkDown, walkUp, walkSide, shock, downcast and listen were checked through their constituent atlas poses. The earlier idle sword repair remains. Attacks retain drawn anticipation and follow-through; status and emote poses remain intentionally held. Walking silhouettes remain three-quarter in the side sequence, and the imported art retains shaded high-colour clusters and pose-to-pose head/hair/body variation. Those are unresolved artistic issues, not newly solved defects. No additional narrow mechanical repair was established from this static inspection, and no redraw was manufactured.

## Evidence and limits

[Playback page](playback.html) reads the current native PNG and independently plays all 26 sequences at normal and half speed. The saved package contains 52 rebuilt APNG previews; decoded frames and elapsed durations match the current atlas/metadata exactly. This verifies export integrity, not perceived animation quality. The native sheet, enlarged sheet and original source remain in the existing versioned directory.

Live rhythm, arcs, weight transfer, secondary motion, loop seams and engine transitions remain unverified. The separate Spiral Cut actor choreography and effect cues were read, but its staged playback and reference videos were not inspected. This is an incomplete re-review, not an unchanged pass. Keep the PR a draft. Further work needs an operational playback surface and artistic cleanup; repeated static-only checks should not be mistaken for progress toward approval.
