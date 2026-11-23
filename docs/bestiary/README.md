# Bestiary refinement queue

Current tracker: generation 7, revision 20, 2026-11-23. [Machine-readable queue](refinement-queue.json).

The newest source was PR47, generation 6 revision 19. Default revision 5 and earlier PR queue heads were reconciled without discarding delivered work. Historical reports not on this branch remain in the linked delivery PRs. Delivery for review is distinct from merge and visual acceptance.

## Current audit

Fresh source and metadata inventory: 45 enemy records, 37 encounters, 22 viewer rigs, 88 clips and six battle mappings. [Audit](reviews/2026-11-23-audit.json). All five categories were reevaluated; attachment notices alone do not establish an art defect. No browser playback was observed.

## Priority and history

| Task | Entry | Refinement | Status | Delivery |
| --- | --- | --- | --- | --- |
| B001 | The Tongue (licker / tongue2) | Reveal Grab immediately after a three-character rescue | merged_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/22) |
| B002 | The Tongue (licker / tongue2) | Show the phase-two Grab target count in its live telegraph | merged_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/26) |
| B003 | Tide-Widow | Shorten the overlong chapter-five fight while preserving its Stress lesson | implemented_pending_balance_and_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/29) |
| B004 | Lamp Hollow | Connect the existing Lamp Hollow rig to its battle entry | blocked | See tracker |
| B005 | The Grey Hound | Connect the existing Grey Hound rig to its battle entry | blocked | See tracker |
| B006 | Lake Hen | Connect Lake Hen surfacing and diving to the battle state | blocked | See tracker |
| B007 | The Well-Rested | Align its viewer lore with the original and copy reveal | delivered_for_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/32) |
| B008 | Archbishop Orlen | Review and, if confirmed, close ancestor-chain joint gaps | blocked | See tracker |
| B009 | The Tongue (licker / tongue2) | Make the swallow-turn action change legible before execution | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/35) |
| B010 | The Hellstar finale | Resolve the sequential-versus-simultaneous finale design before implementation | blocked | See tracker |
| B011 | The Puppeteers | Implement its fight after required encounter capabilities are ready | blocked | See tracker |
| B012 | Archbishop Orlen | Make the half-HP action replan visible before execution | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/38) |
| B013 | Ruri | Reveal when copy losses invalidate the displayed Jealousy | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/41) |
| B014 | Resonance Engine Mk. IV | Warn when overclocking invalidates the stored Stomp preview | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/44) |
| B015 | The Congregation | Reveal the pending split action replan | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/47) |
| B016 | Resonance Engine Mk. IV | Keep Resonance on its documented turn during the phase-entry replan | implemented_pending_visual_review | See tracker |
| B017 | The Whisperer | Keep Read Aloud on its documented turn through phase entry | pending | Pending |

One actionable pending task remains: **B017, The Whisperer cadence**. Six blocked tasks retain their reasons in the tracker. Implemented tasks awaiting visual review are not reimplementation candidates.

## This run

B016 corrects Engine phase-entry planning to use the current action count. Resonance stays on turns 3/6/9; 55/45 attacks, overclock, Delay/Break and Sound counterplay are preserved. Related B014 warning code from PR44 is reused, not counted as a second refinement. [Review and measurements](reviews/2026-11-23-engine-cadence.md).

## Daily workflow

1. Resolve current default and relevant PR heads; reconcile queue generation/revision with actual delivery history.
2. Select the highest-priority pending unblocked entry whose evidence still holds.
3. Implement one manageable refinement, verify actual behavior, and create a dedicated review PR from current default.
4. When actionable pending work empties, audit all five categories and increment the generation. Retain delivered and blocked history.
5. Report real validation limits. Do not merge, deploy or claim visual approval from automated checks.
