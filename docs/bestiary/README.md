# Bestiary refinement queue

Assessed 2026-11-14 against default-branch commit `c1840737fef12061165ef6bb553e7bfa166b717b`. The [machine-readable queue](refinement-queue.json) is the run-to-run record. The [inventory](reviews/2026-11-14-inventory.json) records all 45 enemy records, 37 encounters and 22 viewer rigs (88 clips). Six rigs are integrated into the battle.

Confirmed rule/readability defects come first, followed by measured encounter problems, existing asset integration, lore alignment and visual reviews. An attachment warning alone does not prove a defective rig. Open PRs 14–21 were checked and cover party art or asset specifications, not these tasks.

| Order | Entry | Task | Status |
| --- | --- | --- | --- |
| 1 | The Tongue (licker / tongue2) | Reveal Grab immediately after a three-character rescue | merged pending visual review |
| 2 | The Tongue (licker / tongue2) | Show the phase-two Grab target count in its live telegraph | merged pending visual review |
| 3 | Tide-Widow | Shorten the overlong chapter-five fight while preserving its Stress lesson | implemented pending balance and visual review |
| 4 | Lamp Hollow | Connect the existing Lamp Hollow rig to its battle entry | blocked |
| 5 | The Grey Hound | Connect the existing Grey Hound rig to its battle entry | blocked |
| 6 | Lake Hen | Connect Lake Hen surfacing and diving to the battle state | blocked |
| 7 | The Well-Rested | Align its viewer lore with the original and copy reveal | delivered for review |
| 8 | Archbishop Orlen | Review and, if confirmed, close ancestor-chain joint gaps | blocked |
| 9 | The Tongue (licker / tongue2) | Make the swallow-turn action change legible before execution | implemented pending visual review |
| 10 | The Hellstar finale | Resolve the sequential-versus-simultaneous finale design before implementation | blocked |
| 11 | The Puppeteers | Implement its fight after required encounter capabilities are ready | blocked |
| 12 | Archbishop Orlen | Make the half-HP action replan visible before execution | pending |

## Daily workflow

1. Fetch the current default branch and inspect relevant open PRs. Read the latest queue revision from the default branch and bestiary refinement PRs; unmerged work still counts as delivered work. Preserve history and reconcile conflicts explicitly.
2. Pick the highest-ranked pending task that can be completed on one entry. Check that its evidence still holds and that no PR already implements it. Blocked or implemented tasks do not monopolise subsequent runs.
3. Implement and validate the actual change. Record source commit, evidence, before/after results, changed files, limitations and delivery identifiers. Use one branch and PR per run; reuse them on retries. Do not merge.
4. When no actionable pending tasks remain, reevaluate the whole current bestiary, increment the queue generation and create a new evidence-backed queue. Retain history and blocked items. Do not recycle completed work without new evidence.
5. If a run cannot complete a task, retain it with the precise blocker and attempt the next independent feasible task. Report no progress honestly if nothing is feasible.

## Audit limits

The inventory is a source, metadata and automated-check audit. It does not certify every image, skeleton joint or animation visually. Existing checks passed with two documented design drift warnings and 16 attachment review notices. Missing battle mappings are integration opportunities, not proof that the source art is production ready. The four superbosses and other unbuilt bosses are not automatically feasible one-run tasks.

## First refinement

[Tongue rescue report](reviews/2026-11-14-tongue-rescue.md): the three-character rescue now announces Grab immediately. Live-script tests pass and all seeded battle summaries match the original. Browser visual verification is outstanding because Chromium cannot launch in this environment. PR22 was verified merged on 2026-11-15. This does not establish a visual pass.

Daily refinement is scheduled for around 10 AM America/New_York, beginning 2026-11-15. [Initial draft PR](https://github.com/dann3wman/JRPG-Ito/pull/22).

## 2026-11-15 refinement

B002 updates the Grab warning to up to 1 or 2 highest-Stress allies at execution, including an impending half-HP phase transition. [Review](reviews/2026-11-15-tongue-grab-count.md). Seven actionable tasks remain; next is B003, Tide-Widow fight length. Two larger tasks remain blocked.

## 2026-11-18 refresh

Generation 2, revision 11. Reconciled default revision 5 with PR29 revision 7 and PR32 revision 9. Only tracker history is carried across; their unmerged implementations are not imported. Open PRs 29–34 were checked for overlap.

[B009 review](reviews/2026-11-18-tongue-swallow.md): The Tongue now previews Swallow, then Grab when its last captives reach their deadline. The stored plan and execution remain unchanged. Browser acceptance is still outstanding. Delivered in [draft PR35](https://github.com/dann3wman/JRPG-Ito/pull/35).

The last actionable generation-1 task is delivered. A fresh [source/metadata audit](reviews/2026-11-18-audit.json) covers 45 enemy records, 37 encounters and 22 viewer rigs with 88 clips across the five refinement categories. No image or joint is declared broken from metadata alone. All existing history and blockers remain.

**One actionable pending task: B012, Archbishop Orlen's half-HP action replan warning.** The reproduction displays Sermon then executes Crozier. This is separate from the blocked Orlen joint review B008. Do not redo B001/B002/B003/B007/B009 while their deliveries await acceptance.
