# Yen-Wen Lu Academic Website V5

V5 adds a form-based content studio.

## Open the editor

After deployment:

`https://git209.github.io/admin.html`

## What the editor can do

- Edit Projects, People, Publications, News, Gallery, and Site settings
- Add, delete, duplicate, search, and drag-to-reorder records
- Preview selected images and generate suggested asset paths
- Download updated JSON files

## Publishing workflow

GitHub Pages is static hosting, so the editor does not directly save to GitHub.

1. Open `admin.html`.
2. Edit the content using the forms.
3. Click **Download JSON**.
4. Replace the matching file in the repository's `data/` folder.
5. Upload any newly selected images to the suggested `assets/` folder.
6. Commit the changes.
7. Wait for GitHub Pages deployment.

## Important checks

- Replace placeholder contact information and profile links.
- Verify publication titles, authors, journals, years, and DOI URLs.
- Confirm that every image matches its project, person, news item, or gallery caption.
