# Yen-Wen Lu Academic Website V2

A bilingual, responsive, data-driven static website for GitHub Pages.

## Pages

- `index.html`
- `projects.html`
- `people.html`
- `gallery.html`
- `news.html`
- `teaching.html`
- `join.html`

## Data-driven management

Edit only:

- `data/site-data.js` — people, projects, gallery, news, teaching, contact profile
- `data/i18n.js` — interface text in English and Traditional Chinese

Page layouts are generated automatically from those data files.

## Important updates before publication

In `data/site-data.js`, replace:

- `your-email@ntu.edu.tw`
- department / institute name
- Google Scholar URL
- ORCID URL
- LinkedIn URL
- generic team groups with individual current member records when ready
- any news descriptions that need precise verification

## Replace your existing GitHub Pages site

1. Back up the current repository.
2. Delete the old website files, or overwrite files with this V2 package.
3. Upload the contents of this folder to the root of `git209.github.io`.
4. Commit directly to `main`.
5. Wait for `Actions → Pages build and deployment` to show success.
6. Open `https://git209.github.io/` and hard-refresh with `Ctrl + Shift + R`.

## Images from Wix

Selected legacy images use the public Wix image URLs currently associated with the user's existing website. For long-term independence, download the original image files from Wix and replace each URL in `data/site-data.js` with a local path such as:

`assets/gallery/photo-name.jpg`
