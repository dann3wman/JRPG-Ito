# Bestiary refinement queue

Updated 2026-11-19. Generation **3**, revision **13**. The [machine-readable queue](refinement-queue.json) preserves delivery and blocked history. One actionable task remains: **B013, Ruri's invalid Jealousy warning**.

## Current audit

The [2026-11-19 audit](reviews/2026-11-19-audit.json) re-enumerates 45 enemy records, 37 encounters, 22 viewer rigs, 88 clips and six battle rigs at default commit `b5d0e9f9ac45c21b2acf28784d75fd977d35eb91`. All five improvement categories were reviewed through source and metadata. This is not visual approval of all assets.

Default generation 1 revision 5 is older than the trackers in PR29 (revision 7), PR32 (revision 9) and PR35 (generation 2 revision 11). This branch carries PR35's complete task history forward, without its unmerged Tongue code or the other PRs' implementations. Open PRs 29 through 37 were checked. PR35 overlaps the preview functions; both its plan selection and the nullable custom-hook fallback must survive integration.

## Priority queue

| ID | Entry | Task | Status |
| --- | --- | --- | --- |
| B001 | The Tongue (licker / tongue2) | Reveal Grab immediately after a three-character rescue | merged pending visual review ([PR22](https://github.com/dann3wman/JRPG-Ito/pull/22)) |
| B002 | The Tongue (licker / tongue2) | Show the phase-two Grab target count in its live telegraph | merged pending visual review ([PR26](https://github.com/dann3wman/JRPG-Ito/pull/26)) |
| B003 | Tide-Widow | Shorten the overlong chapter-five fight while preserving its Stress lesson | implemented pending balance and visual review ([PR29](https://github.com/dann3wman/JRPG-Ito/pull/29)) |
| B004 | Lamp Hollow | Connect the existing Lamp Hollow rig to its battle entry | blocked |
| B005 | The Grey Hound | Connect the existing Grey Hound rig to its battle entry | blocked |
| B006 | Lake Hen | Connect Lake Hen surfacing and diving to the battle state | blocked |
| B007 | The Well-Rested | Align its viewer lore with the original and copy reveal | delivered for review ([PR32](https://github.com/dann3wman/JRPG-Ito/pull/32)) |
| B008 | Archbishop Orlen | Review and, if confirmed, close ancestor-chain joint gaps | blocked |
| B009 | The Tongue (licker / tongue2) | Make the swallow-turn action change legible before execution | implemented pending visual review ([PR35](https://github.com/dann3wman/JRPG-Ito/pull/35)) |
| B010 | The Hellstar finale | Resolve the sequential-versus-simultaneous finale design before implementation | blocked |
| B011 | The Puppeteers | Implement its fight after required encounter capabilities are ready | blocked |
| B012 | Archbishop Orlen | Make the half-HP action replan visible before execution | implemented pending visual review ([PR38](https://github.com/dann3wman/JRPG-Ito/pull/38)) |
| B013 | Ruri | Reveal when copy losses invalidate the displayed Jealousy | pending |

## Latest refinement

[B012 review](reviews/2026-11-19-orlen-phase.md): Archbishop Orlen now shows a phase-change warning when crossing half HP, instead of promising an attack his free phase entry will replace. Fourteen live-script cases plus sleep, empty-plan and preview-purity assertions pass. All 300 seeded before/after battle summaries match. `tools/check.sh` passes. The reference generator produces no data change. Browser warning layout remains unverified because Chromium cannot launch; delivered as [draft PR38](https://github.com/dann3wman/JRPG-Ito/pull/38).

## History and blockers

B001 and B002 retain their recorded merged status and outstanding visual review. B003 remains in draft PR29 awaiting balance/visual acceptance. B007 is delivered in PR32, and B009 in draft PR35. Delivery is not acceptance. Historical review paths and implementation commits remain in the queue; unmerged review files are available on their linked PR heads.

B004, B005, B006 and B008 still require observed playback or joint verification. B010 needs a finale design decision. B011 needs missing encounter capabilities. No attachment notice was treated as proof of broken art.

The [initial audit](reviews/2026-11-14-inventory.json) remains historical evidence. The queue keeps prior reconciliation and refresh records.

## Daily workflow

1. Resolve the current default, inspect relevant open PRs and reconcile the newest queue by generation, revision and actual task history.
2. Select one pending, unblocked task with current evidence. Do not reimplement work delivered in an open PR.
3. Implement and verify one entry, recording source identity, regression evidence, limitations and delivery identifiers. Use one branch and PR, with draft status when checks remain incomplete. Do not merge.
4. Once actionable pending tasks are exhausted, reevaluate all five categories, increment generation and add only evidence-backed tasks. Retain blocked and completed history.
5. Report honest blockers or a clean audit when no justified task is available.
