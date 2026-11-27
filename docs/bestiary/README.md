# Bestiary refinement queue

2026-11-27: generation11, revision28. Reconciled from PR59 revision27. Historical reviews absent from default remain in their delivery PRs. Full history and blocker reasons remain in the [tracker](refinement-queue.json).

Fresh audit: 45 foes,37 encounters,22 rigs,88 clips,six battle mappings. [Audit](reviews/2026-11-27-audit.json). [Review](reviews/2026-11-27-facethief-target-warning.md).

| ID | Entry | Status | Delivery |
| --- | --- | --- | --- |
| B001 | The Tongue (licker / tongue2) | merged_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/22) |
| B002 | The Tongue (licker / tongue2) | merged_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/26) |
| B003 | Tide-Widow | implemented_pending_balance_and_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/29) |
| B004 | Lamp Hollow | blocked | See tracker |
| B005 | The Grey Hound | blocked | See tracker |
| B006 | Lake Hen | blocked | See tracker |
| B007 | The Well-Rested | delivered_for_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/32) |
| B008 | Archbishop Orlen | blocked | See tracker |
| B009 | The Tongue (licker / tongue2) | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/35) |
| B010 | The Hellstar finale | blocked | See tracker |
| B011 | The Puppeteers | blocked | See tracker |
| B012 | Archbishop Orlen | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/38) |
| B013 | Ruri | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/41) |
| B014 | Resonance Engine Mk. IV | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/44) |
| B015 | The Congregation | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/47) |
| B016 | Resonance Engine Mk. IV | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/50) |
| B017 | The Whisperer | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/53) |
| B018 | Taste of Ostrel | implemented_pending_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/56) |
| B019 | The Whisperer | implemented_pending_balance_and_visual_review | [PR](https://github.com/dann3wman/JRPG-Ito/pull/59) |
| B020 | The Face Thief | implemented_pending_visual_review | See tracker |
| B021 | The Mirens | pending | See tracker |

One actionable pending task: B021, the Mirens phase-entry Jump preview. Six blockers retained. Delivered work awaiting review is not a reimplementation candidate. Each run reconciles current default and PR heads, implements one entry, then refreshes the five categories when needed. Never merge or deploy.
