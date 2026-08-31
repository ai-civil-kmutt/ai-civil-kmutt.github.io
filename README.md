# AI Research Group — Department of Civil Engineering, KMUTT

Website for the AI Research Group, Department of Civil Engineering, King Mongkut's
University of Technology Thonburi.

Static site. No build step, no dependencies. Open `index.html` or serve the folder.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure

```
index.html            page structure
assets/css/styles.css all styling, light and dark themes
assets/js/data.js     ALL CONTENT — edit this file to update the site
assets/js/main.js     rendering and interaction
assets/img/people/    faculty portraits (see below)
.nojekyll             tells GitHub Pages to serve assets/ as-is
```

## Editing content

Everything on the page comes from `assets/js/data.js`. Each block is a plain array:

| Constant   | Controls                                         |
|------------|--------------------------------------------------|
| `THEMES`   | the ten research theme cards                      |
| `LEAD`     | the principal investigator panel                  |
| `PEOPLE`   | the other principal investigators and researchers |
| `PROJECTS` | current project cards                             |
| `PUBS`     | publication list (the `theme` key drives filtering) |
| `REPOS`    | GitHub repository cards                           |
| `SPACES`   | Hugging Face Space cards                          |
| `CONTACT`  | address and department contact details            |

Adding a publication means appending one object to `PUBS`. The `theme` value must match
a `THEMES` id, or `legacy` for older foundational work. The list renders newest first,
so insertion order does not matter; papers of the same year keep their order in the file.

Theme 10, structural health monitoring and digital twins, is the one exception to the
machine learning rule below. Chainarong Athisakul and Peerasit Mahasuwanchai's work is
laser scanning and nonlinear finite element analysis, with no machine learning in it, and
it is listed at the group lead's request. Note also that none of those papers uses the
term "digital twin"; the scan, model and re-survey loop is what the term describes, but
the framing is the group's rather than the papers'.

Otherwise `PUBS` is restricted to work that uses machine learning. Several members
publish extensively outside that scope, and those papers are left out on purpose rather
than by oversight. For Chamroeun Se that excludes the random-parameter and mixed-logit
econometrics; for Chanchai Petpongpan it excludes the SWAT-MODFLOW hydrology. Their
personal profiles, linked on each card, carry the full record.

## Deploying to GitHub Pages

```bash
git init && git add -A && git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:<user>/<repo>.git
git push -u origin main
```

Then in the repository: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.

For a custom domain, add a `CNAME` file containing the domain and set it under Settings → Pages.

## Hero artwork

`index.html` inlines `assets/img/hero.svg` in the hero. It shows a building frame with a
tower crane above a ground section with soil strata, a bored pile and a tunnel bore, and
a bridge deck on piers. Sensor points on the structure feed signals into a layered neural
network beside an attention matrix.

It is inlined rather than linked so it can read the page colours. Strokes come from four
hooks set on `.hero-art` in the stylesheet:

    --art-ink  --art-accent  --art-blue  --art-line

Change those and the drawing follows, which is why one file covers both themes.

The animation lives in a `<style>` block inside the SVG: pulses travelling along the
signal paths and network edges, nodes breathing, attention cells firing, the crane
trolley running out along the jib, a scan line sweeping the strata, and the formwork
panel rising. All of it stops under `prefers-reduced-motion`, and the static composition
still reads in full.

An earlier version of this picture was a pair of generated PNGs with a Pillow renderer
behind them. Raster cannot animate, so it was replaced. The renderer is in git history at
commit `4bdc3c8` if it is ever wanted.

## Motion

Animation is concentrated in one block near the end of `styles.css`, marked `Motion`:
staggered hero entrance, a drifting background grid, a sweep across the stat tiles,
scroll reveals, staggered publication rows, portrait hover, nav underlines. `main.js`
adds a reading-progress bar and counts the four hero statistics up from zero.

All of it is disabled by the `prefers-reduced-motion: reduce` block at the end of that
section, and the counters jump straight to their final value. Verified: with reduced
motion forced, no pixel in the hero changes between frames and the artwork still draws in
full.

## Photographs

Portraits in `assets/img/people/` are 400x600 JPEGs, named after the person they show.

`sompote-youwai.jpg` was supplied by him directly. It is cropped to 2:3 from
`DSC01323.jpg`, with the plain background extended upward by 80 px so the head keeps its
headroom under the stylesheet zoom described below.

The rest are the official staff photographs from the Department of Civil Engineering
directory at <https://ce.kmutt.ac.th/en/staffs-teachers-en/>, downloaded in August 2026.

`tipok-kitkobsin.jpg` was supplied separately. The source was 224x225, so it is upscaled
about 2.7x to reach 400x600 and lightly sharpened. It holds up at the 74x92 card size but
is softer than the rest, and it is a casual photograph rather than a studio portrait.
Replacing it with a higher-resolution image would be an improvement.

`kosit-jariyatatsakorn.jpg` was also supplied separately, from a 512x512 source, so it
needed only a 1.17x upscale and matches the others in sharpness.

Every member now has a portrait. The initials fallback stays in place for anyone added
later, and for any image that fails to load. To add a photo, drop a file into `assets/img/people/` and set the `photo` key
on their entry in `data.js`. Any card whose image fails to load falls back to initials
automatically.

The department portraits carry a KMUTT watermark in the top-left corner. The stylesheet
zooms every avatar toward the face (`.ava img`, `scale(1.26)`) so the watermark sits
outside the frame. That zoom applies to all images, so a replacement portrait needs
roughly 15 percent headroom above the head or the crown gets clipped.

## Author identifiers

Each person carries an `orcid` and, where known, `scopus` and `rg` fields in `data.js`.
The link pills are generated from those ids, so adding one is a single line. `rg` is the
ResearchGate profile slug, the part after `/profile/`.

All ten ORCID iDs were resolved against the ORCID public API and each returns the
expected name. The seven Scopus Author IDs were taken from the researchers' own ORCID
records, where they are self-asserted external identifiers.

Five people have no Scopus link. Scopus author ids are not public without a subscription,
none of the five has published theirs through ORCID, and none has a ScienceDirect author
page, which is the other route that exposes the id:

- Sompote Youwai
- Chana Phutthananon
- Chanchai Petpongpan
- Chainarong Athisakul
- Peerasit Mahasuwanchai

Three have no ResearchGate link, because no profile for them surfaced in search and
ResearchGate answers 403 to any automated request, so a guessed URL cannot be checked
before publishing it:

- Chamroeun Se
- Chainarong Athisakul
- Peerasit Mahasuwanchai

For either, send the profile URL and the pill appears from one field.

To add one, look up the author on Scopus, copy the `authorId` from the profile URL, and
set `scopus: '<id>'` on that person in `data.js`.

Chanchai Petpongpan has two ORCID records: `0009-0007-2545-1683`, which lists KMUTT as
employer, and `0000-0002-8896-8168` from 2020, which lists nothing. Neither has any works
attached and his papers carry no ORCID, so the two cannot be told apart from the outside.
The site uses the KMUTT one. Confirm with him which is current.

## Featured software

The software section opens with cards for projects that have their own site and mark.
They come from the `FEATURED` array in `data.js`, so adding one is a data change, and the
marks live in `assets/img/software/`.

Each entry carries a `plate`, which says what ground its artwork needs. Dark artwork takes
`light`, giving it a white plate. Artwork that is already white on a dark ground takes
`dark`. Nothing is inverted: inverting a brand mark misrepresents it.

Anything featured here is left out of the `REPOS` list below, so a project does not appear
twice on the same screen.

## Partner logos

`assets/img/partners/` holds nine supplied logos, trimmed of their borders and normalised
to 160 px tall. They are shown on a white plate in both themes rather than being
recoloured or inverted, since they are third-party trademarks and several already carry a
white ground.

The RTDI source file was itself clipped: the bottom line of Thai text, the words for
railway system technology, was cut through mid-glyph. It is cropped above that line, so
the mark reads cleanly but the institute's full name is not shown. A complete logo file
would fix this.

The tiles are laid out with flex and a centred last row, so any number of logos wraps
tidily and adding one needs no adjustment.

Two display heights are in play. Wide wordmarks sit at 52 px. Square and upright marks
carry the class `sq` and sit at 68 px, because at a shared height they read as much
smaller than a wordmark beside them. Tag a new logo `sq` if it is roughly square or
taller than it is wide.

Logos assert a relationship. Keep this section accurate if a collaboration ends.

## Funding credit

The footer carries `Research supported by API credits from Anthropic`, linking to
anthropic.com. It is a specific acknowledgement of compute credits, not a claim of
sponsorship or partnership. Keep the wording accurate if the arrangement changes: it sits
in the `.foot-support` paragraph in `index.html`.

## Citation metrics

The `metric` field on each person in `data.js` carries their citation count and h-index.
Six come from Google Scholar. Sutat Leelataviwat and Chanchai Petpongpan have no public
Scholar profile, so their figures come from Semantic Scholar, which indexes fewer venues
and therefore reports lower numbers. A note under the people grid states this.

Kosit Jariyatatsakorn and Tipok Kitkobsin keep a topic label rather than a metric. Both
are early career, and Semantic Scholar reports single-digit counts that say little.

The hero tile "Citations, combined" is the sum of all ten individual profiles, 18,238 at
the time of writing, shown rounded as 18,000+. Members co-author heavily inside the
group, so a jointly written paper contributes its citations once per co-author and the
sum overstates the number of distinct citations. The note under the people grid says so.
There is no public source for a de-duplicated group total.

Counts were checked in August 2026 and drift upward over time. Re-check before a major
update.

## Data sources

Publications, citation counts, repositories and Spaces were collected in August 2026 from
Google Scholar, KMUTT KIRIM, ResearchGate, the GitHub API and the Hugging Face API.
The footer states this date. Re-check the counts before a major update.

## Email addresses — please verify before publishing

KMUTT mostly uses `firstname.<first three letters of surname>@kmutt.ac.th`, but not
always: Peerasit Mahasuwanchai is `peerasit.mahasu@kmutt.ac.th`, six letters rather than
three. Treat any address that has not been checked against a KIRIM profile as a guess.

**Confirmed** against KMUTT KIRIM profile pages:

- `sompote.you@kmutt.ac.th` — Sompote Youwai
- `chainarong.ath@kmutt.ac.th` — Chainarong Athisakul
- `peerasit.mahasu@kmutt.ac.th` — Peerasit Mahasuwanchai
- `pornkasem.jon@kmutt.ac.th` — Pornkasem Jongpradist
- `warat.kon@kmutt.ac.th` — Warat Kongkitkul
- `sutat.lee@kmutt.ac.th` — Sutat Leelataviwat
- `weerachart.tan@kmutt.ac.th` — Weerachart Tangchirapat

**Derived from the pattern, not yet confirmed.** Check these before the site goes public:

- `chana.phu@kmutt.ac.th` — Chana Phutthananon
- `chanchai.pet@kmutt.ac.th` — Chanchai Petpongpan
- `chamroeun.se@kmutt.ac.th` — Chamroeun Se
- `kosit.jar@kmutt.ac.th` — Kosit Jariyatatsakorn
- `tipok.kit@kmutt.ac.th` — Tipok Kitkobsin

They are marked `emailVerified: false` in `assets/js/data.js`.
