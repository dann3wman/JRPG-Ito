# Fuyori: Mix action, November27,2026

# Fuyori: Mix v01

November 27, 2026. **Built and exported standalone draft. Artistic approval and engine testing remain incomplete.** Exactly one new action: Fuyori raises two vials, uncorks, pours, inspects the smoking result and returns to ready. No inventory, random-item selection or combat rules are changed. Mix is established in the design document; the new sequence fills an unbuilt action rather than repeating Acid or Protect.

[Play locally](../../assets/party-fx/fuyori-mix-v01/fuyori-mix.v01.html) with Replay, Pause, normal/half speed, seek and light/dark backgrounds. HTML is self-contained with embedded art, not a GitHub-hosted live website. [MP4](../../assets/party-fx/fuyori-mix-v01/fuyori-mix.v01.mp4), [APNG](../../assets/party-fx/fuyori-mix-v01/fuyori-mix.v01.apng), [GIF](../../assets/party-fx/fuyori-mix-v01/fuyori-mix.v01.gif). [Timeline/import metadata](../../assets/party-fx/fuyori-mix-v01/timeline.v01.json). [Validation](../../assets/party-fx/fuyori-mix-v01/validation.v01.json).

## Sources and continuity

Default branch `ccr-d8829a5a-ays4x1` freshly confirmed at b5d0e9f9ac45c21b2acf28784d75fd977d35eb91. Current files, recent commits and open PRs inspected; no Mix PR found. Actual PR60 builder read: four detached KP06 cape pixels were removed from Protect without other art/timing changes. Review rotation version25, updated November27, read through its latest record. Its work is preserved.

Current Miren recovery bridge and Natsu Halo Glance source specifications were read. They remain separate studies; the repository Halo Glance v02 supersedes v01 source/masks. Neither is implemented by Mix. Sources: libfile_6bfe860bb62c8191afed0871b6e0e0c2, libfile_ba10f229c3608191af2cf0b314dc8e73, and current review log libfile_e3bd1f9d5db0819185bc1c703e5bf682. Earlier Spiral Cut is unrelated.

Fuyori's actual embedded sprite and ink portrait were extracted and inspected, along with `.claude/skills/party-art/references/cast.json`: dark bob, studious face, olive coat, cheek/hand crystal, notebook and vials. Eight new actor drawings were generated using those references. No existing actor pixels are reused. Utility code is adapted from Protect PR58; this is new artwork and choreography, not its re-export. Eight deterministic vapour cels are supporting procedural art, not generated-image claims. The simple smoke supports the substantial new vial-handling artwork.

All five supplied FFRK clips are available locally and their action-window contact sheet was inspected. This is sampled inspection, not fresh continuous reference playback or timing measurement. 20150430_3VYVy_-wuQ (libfile_3d08908cd9608191bfd139d2d53d011c,8-14s) and 20150522_vNXuejzstyQ (libfile_bde1fc1da2408191baeb0cf4de9e3547,8-14s) inform distinct anticipation/recovery. 20150323_9h9tSnldEE8 (libfile_5ea2416c3fc08191afb807b6f13ec63b,12-17s) informs small cue growth; 20150123_OIw2mFut1No (libfile_585af039e0708191996443e0c5c5bfc0,8-11s) informs hold before dissipation; 20150123_0qY82e8qugk (libfile_643cd8293c4c81918fee2fa51a3decf4,13-15.5s) informs actor/effect separation. No reference palette or menu charging duration is copied. The 3600ms timing is proposed authored timing.

## Geometry and layer contract

Top-left origin. Actor source1536x1024,4x2 cells384x512; cleaned native actor384x192,4x2 cells96x96, pivot48,86, safe x/y8..87 inclusive. Effect512x256,4x2 cells128x128, pivot64,64, safe8..119. No atlas gutters or margins, no trim/rotation. Exact row-major rectangles and measured occupied bounds are in JSON. Actor faces left at feet224,180 on a384x216 stage, baseline180. Scene safe8,8..375,207. Output1536x864. Fixed actor registration; pose shape changes are drawn rather than sliding or crossfading cutouts.

Vapour starts at1600ms, rooted near the inspected raised vial around203,128. Its cell pivot is203,104, with local root64,88. After2000ms the vapour is detached residue as the vial lowers. No enemy target or placeholder actor is needed for item creation. No camera shake or random jitter. The recipient response is Fuyori holding the result for inspection.

Back-to-front layers: opaque two-tone stage384x216; rear vial light768x432 continuous alpha/source-over/linear2x; actor then vapour pixel layer384x216, binary alpha/source-over/nearest4x; foreground light768x432 continuous alpha/screen/linear2x; outside-art UI label. Pixel atlases have24 actor colors and at most16 effect colors, exact palettes in JSON. Dark stepped contours and controlled ivory/olive/crystal shading; no smoothing or universal effect-outline rule. Smooth radial light center203,128 radius12, peakalpha0.20, smoothstep rise1600-1800, holdto2000, fadeto2400; foregroundopacity0.18 times envelope. It is separate from pixel art.

## Cell and timeline table

Actor uses eight unique generated keys with nine exposures. Effects use eight new procedural cels. 216 runtime slots at60fps are not216 drawings.

| Row/column | Actor | Action | Exposure ms | Vapour | Shape | Duration ms |
| --- | --- | --- | --- | --- | --- | --- |
| 1/1 | FM01 | ready | 300 | MV01 | first wisp | 100 |
| 1/2 | FM02 | raise vials | 250 | MV02 | rise | 150 |
| 1/3 | FM03 | uncork | 300 | MV03 | curl | 150 |
| 1/4 | FM04 | tilt to pour | 350 | MV04 | bloom | 200 |
| 2/1 | FM05 | pour | 400 | MV05 | unwind | 200 |
| 2/2 | FM06 | inspect result | 400 | MV06 | thin | 200 |
| 2/3 | FM07 | hold result | 300 | MV07 | fragments | 150 |
| 2/4 | FM08 | lower vials | 300 | MV08 | last mote | 150 |

All FM cells use actor pivot/layer; all MV cells use effect pivot/front vapour layer. Actor boundaries0,300,550,850,1200,1600,2000,2300,2600; FM01 reused from2600 to3600. Vapour boundaries1600,1700,1850,2000,2200,2400,2600,2750,2900. Four cues: uncork550, mix_complete1600 exactlyonce, effect_clear2900, action_complete3600. At3600 actorready and effects hidden. No game events dispatched. HTML has no autoplay or autoloop. Replay clears time/cuehistory and restores all visualstate. Seeking dispatches no cues. APNG plays once; GIF permits one repeat for viewing; gameplayone-shot is separate.

## Exports and reproduction

Actual source: preserved generated PNG and generation prompt under `source/`; `build.py` does cleanup/registration/palette/atlas/ORA/review generation; `render.js` and `player.template.html` own choreography/player; `export.cjs` and `encode.py` produce previews. Editable ORA layers are disjoint highlights/midtones/ink partitions, not a rig or original generator layers. Aseprite format is not supplied; ORA is the editable alternative.

`fuyori-mixing.v01.png` and `mix-vapour.v01.png` are clean unlabeled native import atlases; matching `.4x.png` are exact nearest-neighbor. `review.v01.png`552x552 and `review.v01.4x.png`2208x2208 have readable bitmap labels outside cells; columns8,144,280,416, actorrows24,136, effectrows256,400. Pixel-only scene pair verifies exact4x. Light/dark stills show separate light layers. MP4/APNG1536x864 include opaque background; GIF768x432 is quantized viewing media, not palette authority.

With Python Pillow/NumPy, Node @napi-rs/canvas and ffmpeg/ffprobe installed:

```sh
python build.py
node test.cjs
node check-render.cjs
node export.cjs /tmp/mix-frames
python encode.py /tmp/mix-frames
python validate.py /tmp/mix-frames
```

## Validation, revisions and remaining work

Geometry/palette/alpha/anchors/safe bounds, central planted boot equality, actual ORA recomposition, exact4x, duration/order, eventcounts, replayreset, seekwithout events, pause/half-speed logic, final cleanup and decoded exports are checked by included scripts. Runtime tests sample3601states; rendered bounds sample361states. All216 expanded APNG render slots must equal renderer pixels; MP4 must decode216frames/60fps/3600ms; GIF3600ms. Repository `tools/check.sh` output is saved separately. No dimension-only artistic approval is implied.

Observed corrections before playback: overly aggressive alpha200 cutoff produced clothing holes on the light background, changed to128 and removed inherited RGB keying; generated smoke in FM07 cleared from local box20,18..34,38 so the separate vapour owns the effect; effect root shifted12pixels upward to the raised vial. Boot stabilization is restricted to x30..65,y80..85, avoiding the prior review's whole-strip cape-copy defect. These are reproducible in build.py. No post-playback visual correction is claimed.

Final GIF reopened in GIMP and played at1x/0.5x; live samples show pouring and vapour/inspection. Light/dark stills and allkeys inspected. Full continuous motion judgment and live HTML control interaction remain incomplete. Vial identity/hand transfer between pour and inspection, head/hand contour continuity and reduced olive/crystal color readability need artistic review. The held keys are deliberate exposures, but smoothness is not certified. No engine import/test or artistic approval. No placeholder actors; two-tone stage is secondary context.

| Reference available | Specified | Generated/built | Exported | Technically checked | Artistically approved | Engine-tested |
| --- | --- | --- | --- | --- | --- | --- |
| Yes | Yes | Yes | Yes | See actual validation | No | No |

## Complete copy-ready creation prompt

```text
Create one cohesive eight-key pixel-art animation sheet of Fuyori performing Mix for a gothic 16-bit JRPG. Match attached identity: young studious woman neat dark bob, olive imperial alchemist coat with pockets, pale blue crystal patches cheek and hands, notebook strapped at hip. Full body facing LEFT. Exactly four columns two rows,1536x1024 canvas,cells384x512,no text or borders, transparent background. Identical scale, feet planted local y450 and head stable. Eight sequential keys: 1 ready holding two small glass vials; 2 bring vials up chest high; 3 uncork source vial; 4 tilt source vial over receiving vial held forward; 5 thin visible pale blue liquid pouring into receiving vial; 6 right source hand lowers while left receiving vial held up to inspect; 7 hold smoking finished vial, sleeve/hair settle; 8 lower vial and return ready. Each key a coherent overlapping gesture, fixed body volume and costume, clear separate fingers and vials, no extra limbs. Crisp hand-placed pixel clusters, thin dark outlines, muted olive charcoal ivory and pale-blue palette. No baked glow, no scenery, no huge effects. Preserve black bob silhouette and cheek crystal. Keep all art within local x50..330 y65..450.
Clean and register the returned keys into a384x192 native4x2 atlas with96x96cells,pivot48,86 and8pixel safeinset. Preserve original source. Separate actor smoke from a new deterministic eight-cel128x128 vapour atlas,512x256 total,pivot64,64. Render Fuyori feet224,180, vapour pivot203,104 on384x216 scene at1536x864. Keep pixel layers binaryalpha, controlled24/16color palettes and exactly4xnearest enlargement; separate smooth light at768x432 with linear2x, source-over rear and restrainedscreenfront. Actorholds300,250,300,350,400,400,300,300 then1000msready. Vapour starts1600, holds100,150,150,200,200,200,150,150; hide2900. Uncork550, mixcomplete1600once, clear2900,complete3600. No inventory mutation or target damage. Implement manual replay,pause,normal/halfspeed,seekwithout events,light/dark backgrounds. Export actual nativePNG,realeditableORA,4xpreviews,labeledreview,JSONmetadata,sourcecode,HTML,MP4/APNG/GIF and actualvalidation. Validate pixels,timings,cues,cleanup,anchors,safebounds,replay,ORA anddecodedexports. Review continuousplayback and report limitations honestly; do not call technicalchecks artisticapproval. Exactlyoneaction,not a spec-only substitute.
```
