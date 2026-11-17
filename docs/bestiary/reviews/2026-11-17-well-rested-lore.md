# B007: The Well-Rested lore alignment

Date: 2026-11-17. Status: delivered for editorial review, not merged.
Branch: `bestiary/2026-11-17-well-rested-lore`.
Base: `ccr-d8829a5a-ays4x1`, `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`.
Implementation commit and PR: recorded after publication.

## Source reconciliation and selection

The default has generation 1 revision 5; PR29 head `8f7682e409ccb821117a48cf69898be06e33bfed` has revision 7. Preserve revision 7 task history, update B002 from freshly verified PR26 merger metadata, and import no unrelated unmerged code. Open PR29 is Widow pacing; PR30 is Tetsugi review; PR31 is Kugai Provoke. Their changed-file lists do not overlap this lore edit.

B004 Lamp Hollow, B005 Grey Hound and B006 Lake Hen require actual playback before integration. Their mappings remain absent from ART_RIG. Chromium still exits 134 with `socket() failed: Operation not permitted`, so none can be accepted from numeric checks alone. B008's joint review has the same blocker. Record these as blocked, not as defective art or completed work. B007 is the next independently feasible task.

## Defect and implemented text

Before: “A tired traveller and the copy that slept for him. Both are full rigs; the copy runs every motion half a beat behind.”

After: “For years, a traveller rested at the same glowing circle in the flooded ruins. Now a crowd of him rests there. When Kiri sings her Lullaby, the copies close their eyes. One does not.”

The old premise made a copy sleep on behalf of a tired original, and mixed authoring details into fiction. Chapter seven instead describes repeated rests creating a crowd; boss mechanics and SCRIPTS.rested.onPartyAct say Lullaby reveals the original because it stays awake. The new text keeps that observable reveal without explaining the circles or the copies' origin. It follows the house rule of making a familiar save-point rest unsettling through repetition.

The existing renderer assigns rig.lore to the lore panel through textContent. The replacement is actual shipped viewer data, not a writing prompt. The lag details are preserved accurately in a non-rendered source comment: idle 0.6 seconds, Yawn 0.7 seconds. No new UI or schema is needed.

## Evidence and limitations

Read the chapter-seven story and boss mechanics, docs/bosses/rested.md, relevant implementation status, glossary and house voice, actual SCRIPTS.rested and viewer wellrested rig/clip functions. Inspected the installed wellrested.webp sheet: it depicts a traveller with a second body study and separated components. The viewer still uses two bodies and drowsing motions; it does not reproduce the four-to-six-body encounter or validate the original's wakefulness. This is an existing visual limitation, explicitly separate from this text-only fix. No raster, atlas, fit, joint, clip or battle behavior changed.

Validation: `tools/check.sh` passed: data/link integrity, both existing Tongue regressions, reference freshness, 22-rig/88-clip continuity and six battle-rig parity checks, authoring checks, and five smoke simulations for each of 37 encounters. Existing two drift warnings and 16 art notices remain. The headless viewer loader returned the exact replacement lore. `git diff --check` passed. See [raw output](2026-11-17-well-rested-checks.txt). Browser layout/playback was not observed. Canon and source validation suffice for this narrow lore correction; no visual acceptance is claimed. Balance baseline and generated reference need no change because combat data is untouched.

Lesson: compare bestiary fiction to both story and active encounter behavior; keep technical art notes out of the lore field. A prose correction does not certify the illustration or animation as canon-complete.

Next actionable task: B009. B004/B005/B006/B008 can resume when playback is available. Do not replenish the queue while B009 remains actionable.
