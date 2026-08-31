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
| `THEMES`   | the seven research theme cards                    |
| `LEAD`     | the principal investigator panel                  |
| `PEOPLE`   | the other principal investigators and researchers |
| `PROJECTS` | current project cards                             |
| `PUBS`     | publication list (the `theme` key drives filtering) |
| `REPOS`    | GitHub repository cards                           |
| `SPACES`   | Hugging Face Space cards                          |
| `CONTACT`  | address and department contact details            |

Adding a publication means appending one object to `PUBS`. The `theme` value must match
a `THEMES` id, or `legacy` for older foundational work.

## Deploying to GitHub Pages

```bash
git init && git add -A && git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:<user>/<repo>.git
git push -u origin main
```

Then in the repository: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.

For a custom domain, add a `CNAME` file containing the domain and set it under Settings → Pages.

## Photographs

Portraits in `assets/img/people/` are 400x600 JPEGs, named after the person they show.

`sompote-youwai.jpg` was supplied by him directly. It is cropped to 2:3 from
`DSC01323.jpg`, with the plain background extended upward by 80 px so the head keeps its
headroom under the stylesheet zoom described below.

The rest are the official staff photographs from the Department of Civil Engineering
directory at <https://ce.kmutt.ac.th/en/staffs-teachers-en/>, downloaded in August 2026.

Two people have no portrait on the department page, because they are not faculty:
Dr. Kosit Jariyatatsakorn and Tipok Kitkobsin. Their cards fall back to an initials
avatar. To add a photo, drop a file into `assets/img/people/` and set the `photo` key
on their entry in `data.js`. Any card whose image fails to load falls back to initials
automatically.

The department portraits carry a KMUTT watermark in the top-left corner. The stylesheet
zooms every avatar toward the face (`.ava img`, `scale(1.26)`) so the watermark sits
outside the frame. That zoom applies to all images, so a replacement portrait needs
roughly 15 percent headroom above the head or the crown gets clipped.

## Author identifiers

Each person carries an `orcid` and, where known, a `scopus` field in `data.js`. The link
pills are generated from those ids, so adding one is a single line.

All ten ORCID iDs were resolved against the ORCID public API and each returns the
expected name. The seven Scopus Author IDs were taken from the researchers' own ORCID
records, where they are self-asserted external identifiers.

Three people have no Scopus link yet, because Scopus author ids are not public without a
subscription and none of these three has published theirs through ORCID:

- Sompote Youwai
- Chana Phutthananon
- Chanchai Petpongpan

To add one, look up the author on Scopus, copy the `authorId` from the profile URL, and
set `scopus: '<id>'` on that person in `data.js`.

Chanchai Petpongpan has two ORCID records: `0009-0007-2545-1683`, which lists KMUTT as
employer, and `0000-0002-8896-8168` from 2020, which lists nothing. Neither has any works
attached and his papers carry no ORCID, so the two cannot be told apart from the outside.
The site uses the KMUTT one. Confirm with him which is current.

## Citation metrics

The `metric` field on each person in `data.js` carries their citation count and h-index.
Six come from Google Scholar. Sutat Leelataviwat and Chanchai Petpongpan have no public
Scholar profile, so their figures come from Semantic Scholar, which indexes fewer venues
and therefore reports lower numbers. A note under the people grid states this.

Kosit Jariyatatsakorn and Tipok Kitkobsin keep a topic label rather than a metric. Both
are early career, and Semantic Scholar reports single-digit counts that say little.

Counts were checked in August 2026 and drift upward over time. Re-check before a major
update.

## Data sources

Publications, citation counts, repositories and Spaces were collected in August 2026 from
Google Scholar, KMUTT KIRIM, ResearchGate, the GitHub API and the Hugging Face API.
The footer states this date. Re-check the counts before a major update.

## Email addresses — please verify before publishing

KMUTT uses the pattern `firstname.<first three letters of surname>@kmutt.ac.th`.

**Confirmed** against KMUTT KIRIM profile pages:

- `sompote.you@kmutt.ac.th` — Sompote Youwai
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
