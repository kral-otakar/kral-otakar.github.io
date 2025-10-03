## kral-otakar.github.io

A fast, minimalist landing page listing personal projects, deployed on GitHub Pages. Content is driven by a simple JSON file.

### Project structure
```
/
├─ index.html # Markup (header, list container, footer)
├─ styles.css # Dark theme, layout, components
├─ script.js # Fetch + render project cards
├─ projects.json # Data source for projects
├─ VERSION # Version and release date
├─ assets/ # Images, favicons, SVGs
├─ README.md
└─ LICENSE
```

### Features
- Dark, elegant UI with responsive grid of project cards
- Data separated in `projects.json` (no build step, no framework)
- Optional project image per card (falls back to a styled placeholder)
- Lightweight cache-busting for JSON fetching
- Accessible markup (ARIA live region for project list)
- Centralized version management via VERSION file
- Automatic version display in footer

### Tech
- Vanilla HTML/CSS/JS
- GitHub Pages for hosting

### Version Management
Version information is managed in the `VERSION` file:
```json
{
  "version": "1.0.0",
  "releaseDate": "2025-10-03"
}
```
When creating a new release, simply update this file and the version will automatically load into the footer.

### Local development
Serve the folder with any static server to avoid CORS issues when fetching JSON:

```
# Python
python -m http.server 5500
# or Node
npx http-server -p 5500 --cors
```
Then open `http://localhost:5500`.

### Editing projects
Open `projects.json` and edit the array of objects. Minimum fields are `title` and `href`.

```json
[
  {
    "title": "My Project",
    "href": "https://example.com",
    "desc": "Short one-line description.",
    "img": "assets/preview.svg"
  }
]
```

Notes:
- `img` is optional; if omitted, a placeholder area is shown.
- Use paths relative to the site root (e.g., `assets/...`).

### Styling
Key tokens (colors, fonts) live in `:root` within `styles.css`. The layout uses a responsive CSS Grid. Cards accept an optional image with fixed height and `object-fit: cover` to unify appearance.

### Deployment (GitHub Pages)
Push the repository to the `master`/`main` branch and enable GitHub Pages in repository settings (Source: `root`). The site will be served at `https://<username>.github.io/kral-otakar.github.io/` or a custom domain if configured.

### License
MIT – see `LICENSE`.

© 2025 Král Otakar