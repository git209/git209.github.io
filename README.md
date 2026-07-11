# Yen-Wen Lu Academic Website V4

V4 builds on the data-driven V3 site and adds:

- Dedicated project pages
- Filterable publications
- Individual people profiles
- Categorized news
- Local Wix image assets
- A creative laboratory-spirit banner
- A browser-based content editor (`admin.html`)
- Responsive desktop, tablet, and mobile layouts

## Important limitation of the editor

GitHub Pages is static hosting. The content editor cannot directly save to GitHub.

Workflow:

1. Open `admin.html` from the deployed website.
2. Select Projects, People, Publications, News, Gallery, or Site settings.
3. Edit and validate the JSON.
4. Download the updated JSON file.
5. Replace the matching file in the repository's `data/` folder.
6. Commit the change.

## Main data files

- `data/site.json`
- `data/projects.json`
- `data/people.json`
- `data/publications.json`
- `data/news.json`
- `data/gallery.json`

## Before formal launch

- Replace placeholder email and academic links.
- Verify all publication titles, author lists, journals, years, and DOI links.
- Replace generic people groups with individual current members.
- Review every project image and caption.
- Confirm any displayed numerical claims before publication.

Upload the contents of this folder directly to the root of `git209.github.io`.
