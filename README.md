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

Portraits in `assets/img/people/` are the official staff photographs from the
Department of Civil Engineering directory at
<https://ce.kmutt.ac.th/en/staffs-teachers-en/>, downloaded at 400x600 in August 2026.
Each file is named after the person it shows.

Two people have no portrait on the department page, because they are not faculty:
Dr. Kosit Jariyatatsakorn and Tipok Kitkobsin. Their cards fall back to an initials
avatar. To add a photo, drop a file into `assets/img/people/` and set the `photo` key
on their entry in `data.js`. Any card whose image fails to load falls back to initials
automatically.

The source portraits carry a KMUTT watermark in the top-left corner. The stylesheet
zooms each image toward the face (`.ava img`) so the watermark sits outside the frame.

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
