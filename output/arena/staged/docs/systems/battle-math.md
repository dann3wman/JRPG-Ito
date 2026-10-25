# Battle math

How the battle prototype (`index.html`) actually computes time, damage, Stress and enemy behaviour. The [design doc](../design-doc.md) states the rules a player should feel; this page states the formulas that produce them, so a change can be reasoned about before it is made. Every number here lives in `index.html`; the generated [game data reference](../reference/game-data.md) lists the per-character and per-enemy values.

Where the code and the design doc disagree, it is called out as **Drift** and tracked in [implementation status](../implementation-status.md). `node tools/data-check/check.js` checks the pinned numbers automatically.

## Time: Conditional Turn-Based

The model is FFX's CTB: time only moves between actions, and every combatant counts down to its next turn.

| Quantity | Formula | Code |
| --- | --- | --- |
| Tick speed | `max(8, 30 − Speed)` | `tickOf` |
| Recovery after an action | `Delay × tick speed` ticks | `doAction`, `setDelay` |
| One slot | 12 ticks, fixed | `SLOT` |
| First turn | `tick speed × U(1.2, 3)` ticks | `newGame` |
| Who acts | lowest remaining ticks; ties go party, then enemies, then the Lost Turn, then list order | `nextActor` |

Speed 8 (Kugai) gives tick speed 22; Speed 16 (Hisui) gives 14. Speed above 22 is wasted, since tick speed bottoms out at 8. So Hisui's Attack (Delay 3) comes back after 42 ticks, Kugai's after 66: Hisui gets about 1.6 turns for each of Kugai's.

**Delay values.** Attack, Defend and items are Delay 3, Limit Breaks Delay 4, and skills use `SKILLS[k].delay`. Enemies use their skill's `rank` the same way.

**A slot is time, not a place in line.** Pushes and pulls move a unit by `slots × 12` ticks. Against a slow enemy (tick 22) a 2-slot push costs it about one turn; against a fast one (tick 8) it costs three. The design doc describes pushes in turn-order positions. Drift: the two only agree for units near tick speed 12.

**The turn order display** (`forecast`) shows the next 16 turns. While a command is highlighted it places the acting character at that command's Delay; everyone else, enemies included, is assumed to use Delay 3 after their next turn. An enemy whose planned skill is Rank 4 or 6 will appear earlier in the strip than it really acts. Known issue: the enemy's next skill is already planned and shown, so the forecast could use its rank.

### Lost Turns and Danger

| Rule | Value | Code |
| --- | --- | --- |
| Lost Turns switched on | Danger ≥ 30 (and the setup toggle on) | `voidOn` |
| Interval between Lost Turns | `round(max(60, 230 − 1.7 × Danger))` ticks | `voidInterval` |
| Effect | +5 Stress to every active and reserve character; Shio +10, Kugai 0 | `run` |
| Danger per enemy turn | +1 | `run` |
| Danger range | 0–100 | `addHum` |

| Danger | 30 | 50 | 70 | 90 | 100 |
| --- | --- | --- | --- | --- | --- |
| Ticks between Lost Turns | 179 | 145 | 111 | 77 | 60 |
| In slots | 14.9 | 12.1 | 9.3 | 6.4 | 5.0 |

Because every enemy turn adds 1 Danger, long fights drift into Lost Turns on their own: the Widow starts at 20 and is past 30 by her tenth turn. This is the prototype's version of the design doc's "Danger rises each turn in a dungeon". Drift: the doc says Lost Turns start *above* 30; the code starts them *at* 30. Foresee pushes the next Lost Turn back by one interval rather than deleting it.

## Damage

### Party hitting enemies (`hitEnemy`)

```
raw     = power × ATK (or MAG)                  per-command multipliers below
raw    ×= 1 + 0.1 × bloom                       Hisui's crit stacks
raw    ×= 1.5                                    if the enemy is Broken
damage  = max(1, round(raw × U(0.9, 1.1) − DEF))   MDEF for magic
damage ×= 1.8                                    on a critical: 10%, or always under Focus
```

Physical commands hit 95% of the time, or 65% while the attacker wears Earplugs. Magic always hits. A critical hit or a finishing blow gives the attacker −5 Stress.

DEF is subtracted *after* the multiplier, so it punishes weak hits hardest: the Earthbound Woman's 54 DEF shrugs off Quick Hits and barely notices Summon Hound. This is the old Dragon Quest and FF1 subtraction model. It makes high-DEF enemies a lesson in "use your one big hit", and it makes stat growth swingy near the DEF line.

| Command | Power |
| --- | --- |
| Attack | 1.8 × ATK |
| Spiral Cut | 1.4 × ATK × (1 + Danger / 100) |
| Quick Hit / Quick Shot | 1.0 / 0.95 × ATK |
| Double Cut | 2 hits of 0.75 × ATK |
| Blood Strike | 2.8 × ATK; costs 15% of current HP |
| Jump (on landing) | 3.2 × ATK |
| Delay Shot | 1.5 × ATK, then push 2 |
| Summon Hound | 1.2 × ATK + 3.4 × MAG |
| Dark / Darkga | 2.4 / 2.0 × MAG × (1 + min(0.4, Stress / 250)) |
| Acid | 1.6 × MAG; target DEF and MDEF × 0.7 (once) |

Spiral Cut beats Attack once Danger passes 28. Kuro's spell bonus peaks at 100 Stress, exactly where a Stress Check lands: the strongest Kuro is the one about to break.

### Enemies hitting the party (`hitParty`)

```
raw    ×= 0.8                         if the enemy is under Howl (3 of its turns)
raw    ×= 1 + power                   ramping enemies (Earthbound Woman, Long Dreamer)
damage  = max(1, round(raw × U(0.9, 1.1) − DEF))
damage ×= 1.6 on a critical, ½ when Defending, ½ under Cover (then Cover is spent)
```

Blink dodges the next hit completely and is spent. Airborne characters (Jump) can't be hit. Enemy crit chance is per skill (`crit` on the foe, 10% by default). A critical on a party member adds Stress to them (+10, Hisui +15) and +2 to every reserve.

Party crits are 1.8× and enemy crits 1.6×. The asymmetry is deliberate tilt toward the player. The in-game info panel quotes 1.6× for both.

### Healing

| Source | Amount |
| --- | --- |
| Cure | 3.2 × MAG × (1 + Natsu's Stress / 200); after 8 Cures, +3 Stress to the target each time |
| Chakra | 25% of max HP, −10 Stress |
| Potion | 150 HP (225 from Fuyori) |
| Phoenix Down | revive at 30% HP (45% from Fuyori); every other active ally +5 Stress |

Zombie characters can't be healed.

## Stress

| Rule | Value | Code |
| --- | --- | --- |
| Range | 0–200 (Ren 0–199, so he can never flee) | `addStress` |
| Blocked | while KO'd, airborne or Fearless; sound Stress on Sayo and Kugai | `addStress` |
| Earplugs | halve Stress gain, rounded up, for 5 of the wearer's turns | `addStress` |
| Stress Check | on crossing 100 with no Affliction or Inspiration | `addStress`, `stressCheck` |
| Afflicted chance | 75% (setup slider), else Inspired. Ren is always Slow | `cfg.harm` |
| Affliction takes over a turn | 34% (setup slider) | `cfg.over`, `afflictionTurn` |
| Affliction ends | Stress below 50 | `addStress` |
| Flee | at 200; the first living reserve takes the slot; every active ally +15 | `fleeScene` |

Stress also fills the Limit gauge (+0.5 per point gained), and so does damage taken (+70 × damage / max HP). A Limit Break is ready at 100, or at 50 while Afflicted, when it hits a random target. Every point of Stress the party gains also fills an Overdrive enemy's gauge by 0.6. Orlen and the Hellstar get stronger as the party frays, so Stress relief is also damage prevention.

The numbers in the Stress tables of the design doc (critical +10, KO +15, revive +5, push +4 per slot, Lost Turn +5, relief values) all match the code; data-check pins them.

## Break

Not in the design doc. The prototype's answer to "Delay attacks should matter against bosses", in the line of Octopath Traveler's Break and FFX-2's stagger.

| Rule | Value |
| --- | --- |
| Break gauge | +25 per slot an enemy is pushed back |
| At 100 | Broken: pushed back 3 more slots, takes +50% damage for 2 of its turns |
| After Broken | immune to pushes for 3 of its turns |

The Long Dreamer turns this into a decision: Breaking it wakes it angry.

## Enemy turns

Each scripted enemy runs one priority list, which drives both its AI and its info panel (so what Scan shows is exactly what it does). Its turn, in order:

1. **Respawn clock.** Parts it owns that were defeated count down one of its turns, and re-form at 0. Then its `onTurn` passive runs.
2. **Phase gate.** If its phase changed (usually at 50% HP), it runs the phase's entry. The entry uses the turn unless the phase is marked `free`. Then it re-plans.
3. **Interrupts.** Re-checked now; the first that holds replaces the plan.
4. **The planned action.** It was chosen at the end of the enemy's previous turn and is shown in the turn order. Rolls happen at plan time, so the shown plan is the real one. An invalid target is re-picked with the same rule. The plan is re-made if its own rule no longer holds, or if a higher rule marked `react` now holds. Reacting rules are also re-checked the moment the party acts, which is how an enemy answers a Counter-Melody played after it planned.
5. **Counterplay at execution.** Provoke redirects single-target skills unless the skill is `noProvoke`; Blink dodges; airborne allies are missed; Counter-Melody cancels sound skills.
6. **Recovery and the next plan.** Recovery is `rank × tick speed`, then it plans its next action.

`late` skills (Undertow, Offbeat, Beckon) pick their target when they act, not when they plan, so the player decides who gets hit by arranging the turn order. Combined skills (Requiem, Swallow) sync the partner's next turn to the user's. How to write a script is in the [boss authoring guide](../guides/boss-authoring.md).

## Level scaling

The prototype has no character growth. Each encounter sets a level, and HP, MP, ATK, DEF and MAG are multiplied by `0.6 + 0.04 × level` (×0.92 at level 8, ×1.0 at level 10, ×1.88 at level 32). Speed is never scaled, so tempo stays a property of the character, not of progress. This stands in for the Sphere Grid's ring bonuses until the grid exists. Enemy stats are not scaled: each encounter's foes are tuned by hand for its level.

## Worked example: why the Widow takes so long

At level 8, Kiri has 40 ATK. Her Attack is `1.8 × 40 = 72`, minus the Widow's 7 DEF: about 65 damage. The Widow has 3200 HP, so Kiri alone needs about 49 Attacks. Natsu spends most turns on Cure and Soothe, and Tetsugi hits for about 80. The simulator's competent player needs about 85 party commands to win, and the Widow takes about 52 turns. That makes it the longest fight in the prototype after the final battle, and the first story boss a player meets. It is a deliberate endurance fight with Lullaby and Undertow grinding Stress, but it is on the edge of tedious for a Disc 1 boss. See the balance findings in [implementation status](../implementation-status.md).

To check a change like this before making it, run `node tools/battle-sim/sim.js widow --baseline` after editing and read the bracketed deltas.
