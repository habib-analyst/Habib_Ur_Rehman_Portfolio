# Habib Ur Rehman — Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live site](https://img.shields.io/badge/live-habib.top-blue.svg)](https://habib.top)
[![GitHub stars](https://img.shields.io/github/stars/habib-analyst/Habib_Ur_Rehman_Portfolio.svg)](https://github.com/habib-analyst/Habib_Ur_Rehman_Portfolio)

The personal site for [habib.top](https://habib.top) — an interactive dark-mode "orbit" design with a WebGL background scene, built in browser-native JavaScript, CSS, and SVG. No framework runtime.

## Run locally

```bash
git clone https://github.com/habib-analyst/Habib_Ur_Rehman_Portfolio
cd Habib_Ur_Rehman_Portfolio

# Serve the production site:
python -m http.server 8080 --directory dist
```

Open `http://localhost:8080`. Validate scripts with `npm run check`.

## How it works

`dist/` is the live site, served as-is — content is data-driven (`content.js`), rendered by framework-free modules (`app.js`, `scene.js` for the WebGL background), styled with custom CSS. Pushing to `main` runs the publish workflow (see `docs/HOSTING.md` for the Alibaba Cloud hosting notes). APIs and private keys live in a separate backend (e.g. `api.habib.top`), never in `dist/`.

```
dist/                 Production site (served as-is)
  index.html
  app.js
  content.js
  scene.js
  styles.css
  brand.svg
docs/HOSTING.md       Alibaba Cloud hosting notes
.github/workflows/    Publish workflow
```

## License

MIT © 2026 Habib Ur Rehman

---
Built by [Habib Ur Rehman](https://github.com/habib-analyst) · ML/AI Engineer & healthcare-AI researcher ·
[LinkedIn](https://www.linkedin.com/in/hur-dev) · [habib.top](https://habib.top)
