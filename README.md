# Habib Ur Rehman — Portfolio

Personal site for [habib.top](https://habib.top): interactive designs built with browser-native JavaScript, CSS, SVG, and WebGL. No framework runtime.

## Structure

```text
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

## Local preview

```bash
python -m http.server 8080 --directory dist
```

Open `http://localhost:8080`. Validate scripts with `npm run check`.

## Publishing

The `dist/` directory is the live site. Pushing to `main` runs the publish workflow when repository secrets are configured. Details: [docs/HOSTING.md](docs/HOSTING.md).

## Tools (later)

- Portfolio: `/`
- Static tools: `/tools/<name>/`
- APIs and private keys: separate backend (for example `api.habib.top`), never in `dist/`
