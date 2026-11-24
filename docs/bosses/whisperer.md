# Boss spec: The Whisperer

| | |
| --- | --- |
| Key | `whisperer` |
| Chapter and disc | Ch. 13, Disc 2 |
| Ito source | *The Whispering Woman* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

For three days the hum stops, and without the note people forget the words to everything. In the Lumen archive a thin woman walks behind the survivors, whispering every move they make, and they no longer do anything without her.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | Someone standing a little too close behind you |
| Repetition | Every turn, a whispered command; half of them hurt a friend |
| The page turn (50% HP) | She stands behind two of you at once |
| The cost | The party learns to walk away from each other to be free of her |

## The lesson

- **Teaches:** Swap as a tool: taking a character out of the fight changes what the enemy can do.
- **Scan hint:** "Give her no one to stand behind."
- **Intended answer:** When a character is whispered to, Swap them out for a reserve. With no one to stand behind she can be hit until her next turn, and the other two hit her. At 50% both whispered characters have to go.
- **The obvious answer, and why it fails:** obeying and attacking. She can't be targeted while she stands behind someone, so the party only hurts itself (`attack`: 2%, after about 10 flees).
- **Needs at least two characters because:** the whispered character exposes her by leaving; someone else has to hit her before her next turn.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| The Whisperer | 1900 | 60 | 12 | 12 | 12 | 10% | — |

Encounter level 20, starting Danger 25, default party Kiri, Natsu, Hisui, default bag.

## Script

One HP phase at 50%, as Disc 2 bosses have.

At the start of each of her turns she stands behind one active ally (two in phase 2). She can't be targeted while any of them is still fighting.

1. If this is her 3rd, 6th, 9th… turn: **Read Aloud** (Sound): +10 Stress to each listener.
2. Otherwise: **Whisper**: each ally she stands behind gets a command (50% attack a named ally at 1.6× their ATK, 50% stand still), +12 Stress, and a 20% chance of Silence for 2 turns.

A whispered ally's menu offers only **Obey** or **Swap**.

## Fairness checks

- [x] The whispered command shows on the ally's card and in the turn order ("Whispered").
- [x] Her card says who she is standing behind.
- [x] The whisper's odds are in the info panel.
- [x] The log names every whisper and every Swap.
- [x] With no reserves left, obeying is the slow way through; it never locks.

## Disc rules

Disc 2: Scan shows full stats and the hint; one phase at 50%; statuses on some attacks, 2 turns. **Rematch** (design doc, not built): anyone swapped out from under her gains 10 Stress.

## Helper

A whispered ally Swaps out for the calmest reserve. Everyone else hits her when she is exposed and otherwise heals or Defends.

## Simulation

200 battles per policy, seed 1, default party, 2026-11-24.

| Policy | Wins before → after | Winning commands before → after | Afflicted before → after |
| --- | --- | --- | --- |
| advisor | 95.5% → 99.5% | 62.98 → 61.79 | 0.565 → 0.140 |
| attack | 9.5% → 2% | 137.58 → 133.25 | 8.585 → 8.830 |
| random | 5.5% → 6% | 172.45 → 152.83 | 8.910 → 8.775 |

Free phase entry now plans the current action count, keeping Read Aloud on turns 3/6/9. Existing deterministic previews remain accurate without a new uncertainty label. No stats, targeting or probability changes. Helper win rate is above the 80–95% target and Afflicted below the 1–3 target; this correctness fix does not claim full balance approval. Browser play remains unverified. [Review](../bestiary/reviews/2026-11-24-whisperer-cadence.md).

## Open questions

- The doc doesn't say what she whispers. The prototype uses "attack an ally" or "stand still"; whispered skills and items would make her stranger.

Timeouts at the simulator turn cap, before → after: Helper 4.5% → 0.5%, Attack 88% → 94.5%, random 86.5% → 88.5%; zero stalls. Low win rates here mostly mean timeouts, not party defeat. This remains a balance limitation.
