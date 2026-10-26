# Boss spec: Your Own Tracks

| | |
| --- | --- |
| Key | `tracks` ×3 (one per active member) |
| Chapter and disc | Ch. 9, Disc 1 |
| Ito source | *The Enigma of Amigara Fault* |
| Status | Scripted and tuned in the prototype (2026-10-25) |
| CTB plan | — |

## The story

In the Fire Crystal's desert the dunes curl into spirals, and footprints walk ahead of their owners. They stop, turn, and become the party: a shape made exactly for each of you, like the holes in the fault.

| Beat | In this fight |
| --- | --- |
| The ordinary detail | Footprints in the sand |
| Repetition | Each copy does what its original just did |
| The page turn | Your own Blood Strike, coming back at you |
| The cost | Every copied hit adds 10 Stress: you know the move |

## The lesson

- **Teaches:** every command has a cost when it is turned back on you; choose commands whose mirror you can stand.
- **Scan hint:** "It does what you did."
- **Intended answer:** Strikers attack the copy of the sturdiest ally, so the mirrored hit lands on someone who can take it. Natsu Soothes, which gives her copy nothing to do, and Cures only when someone is low, knowing her copy will heal one of them.
- **The obvious answer, and why it fails:** all-out attack. Every attack comes back on the original of the copy you hit, at full power, with +10 Stress.
- **Needs at least two characters because:** the healer has to pick commands that mirror into nothing while the strikers pick targets whose mirror lands safely.

## Stats

| Foe | HP | ATK | DEF | MDEF | Speed | Crit | Part of |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Your Own Tracks | 600 | 50 | 12 | 12 | 12 | 10% | — |

Encounter level 16, starting Danger 25, default party Kiri, Natsu, Hisui, default bag.

## Script

No HP phases: Disc 1 chapter bosses have none (design doc, *Boss mechanics*).

Each copy has its original's stats and 130% of their HP. On its turn it repeats its original's last command (shown live in the turn order), at that command's Delay:

- Attack, damage skills and Limit Breaks hit the original of whichever copy the original targeted (random if none), +10 Stress. Darkga hits everyone; Delay Shot pushes back 2.
- Cure, Potion, Cover, Blink and Quick Song go to the copy of the ally the original helped. Chakra heals itself; Phoenix Down revives a fallen copy.
- Defend braces it (half damage); Counter makes it strike back; Jump takes it out of reach until it lands.
- Soothe, Howl, Counter-Melody, Provoke, Mix, Foresee and Earplugs do nothing.

## Fairness checks

- [x] Each copy's next command and target show in the turn order, computed live from its original.
- [x] The card says which command it is copying.
- [x] There are no rolls at all.
- [x] The log says what it copied.
- [x] Any party can win; the mirror table covers every command.

## Disc rules

Disc 1: Scan shows the full script, no HP phases, statuses rare and 1 turn. **Rematch** (design doc, not built): if a character repeats a command, their copy's next hit is a guaranteed critical, and below 20% HP the copies act 1 slot sooner.

## Helper

Natsu Soothes unless someone is under 55% HP. Everyone else uses the default focus (lowest-HP copy).

## Simulation

200 battles per policy, default party, 2026-10-25.

| Policy | Win | Party commands | Afflicted | KOs |
| --- | --- | --- | --- | --- |
| advisor | 100% | 29.5 | 0.01 | 0.52 |
| attack | 6% | 27.4 | 0.67 | 2.88 |
| random | 74% | 74.2 | 2.97 | 2.43 |

In band. Afflicted is near 0 because Soothe is both the safe command and the Stress answer, which is the lesson.

## Open questions

- The Helper's targeting is plain. A smarter Helper would aim at the copy whose original is sturdiest.
