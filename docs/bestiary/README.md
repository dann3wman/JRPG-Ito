# Bestiary refinement queue

2026-11-25: generation9, revision25. Newest tracker reconciled from PR53. Historical reviews absent from default remain in their delivery PRs.

Fresh audit: 45 foes, 37 encounters, 22 rigs, 88 clips and six battle mappings. [Audit](reviews/2026-11-25-audit.json). [Review](reviews/2026-11-25-taste-phase-warning.md).

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
| B018 | Taste of Ostrel | implemented_pending_visual_review | [PR56](https://github.com/dann3wman/JRPG-Ito/pull/56) |
| B019 | The Whisperer | pending | See tracker |

One actionable pending task: B019, Whisperer transition hiding count. Six blocked tasks retain their reasons. Delivered tasks awaiting visual review are not reimplementation candidates.

Each run resolves current default and PR heads, reconciles newest queue history, and implements one pending unblocked entry. Refresh all five categories when actionable work empties. Preserve history and blockers; never merge or deploy.
