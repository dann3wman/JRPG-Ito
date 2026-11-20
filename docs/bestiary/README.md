# Bestiary refinement queue

Updated 2026-11-20. Generation 4, revision 15. [Canonical tracker](refinement-queue.json). One actionable pending task: B014, Resonance Engine Mk. IV.

[Fresh audit](reviews/2026-11-20-audit.json): 45 enemies, 37 encounters, 22 rigs, 88 clips, six battle rigs. Source/metadata review across all five categories, not visual certification. Current default remains b5d0e9f9ac45c21b2acf28784d75fd977d35eb91. Open PR29-40 checked. PR38 generation 3 revision 13 supersedes all older trackers; only tracker history is imported.

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
| B013 | Ruri | Reveal when copy losses invalidate the displayed Jealousy | implemented pending visual review ([PR41](https://github.com/dann3wman/JRPG-Ito/pull/41)) |
| B014 | Resonance Engine Mk. IV | Warn when overclocking invalidates the stored Stomp preview | pending |

[Current review](reviews/2026-11-20-ruri-jealousy.md). Prior implementation commits, review paths and PR links remain in the queue. Historical unmerged reports live on their PR heads. Delivery is not acceptance.

When no pending work remains, refresh all five categories and increment generation. Keep blocked and completed history; never infer broken art solely from attachment notices. Do not merge or auto-merge.
