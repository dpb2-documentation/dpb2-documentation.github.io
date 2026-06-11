# DPB2 Documentation

Community documentation site for **DreamPoeBot 2 (DPB2)** plugin development — a static
site built with plain HTML, CSS and JavaScript. No build step, no dependencies to install.

## Pages

| File | Section |
| --- | --- |
| `index.html` | Overview / landing |
| `getting-started.html` | Toolchain setup, template, build & deploy |
| `architecture.html` | Plugin interfaces, lifecycle, the Tick() rule |
| `bot-loop.html` | IBot / TaskManager / Coroutine / ITask pattern |
| `game-api.html` | LokiPoe, entities, pathfinding, input, UI panels |
| `api-discovery.html` | Reflection dumper for undocumented members |
| `guides.html` | Patterns & gotchas |
| `resources.html` | Reference projects, version history, tips |

Shared assets live in `assets/css/style.css` and `assets/js/app.js`. The sidebar navigation
is defined once in `app.js` (the `NAV` array) — edit it there to add or reorder pages.

## Publish to GitHub Pages

1. Create a repository (e.g. `dpb2-docs`) and push these files to the default branch.

   ```bash
   git init
   git add .
   git commit -m "DPB2 documentation site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. In the repo: **Settings → Pages → Build and deployment**.
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` / `root`
   - Save.

3. After a minute the site is live at `https://<you>.github.io/<repo>/`.

> For a user/organization site, name the repo `<you>.github.io` and it serves from the root URL.

### Local preview

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Notes

- `.nojekyll` is included so GitHub Pages serves all files as-is (no Jekyll processing).
- Fonts (Inter, JetBrains Mono) and syntax highlighting (highlight.js) load from CDNs, so the
  site needs internet access to look its best — content still renders fully offline.
- Everything is in English by design.

*Unofficial, community-maintained. Not affiliated with the DreamPoeBot authors or GGG.*
