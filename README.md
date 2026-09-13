# Habib Ur Rehman - Portfolio

An interactive personal portfolio built with modern browser-native JavaScript modules, responsive CSS, SVG and WebGL. It has no framework runtime or third-party JavaScript dependency, so the production site is fast, portable and easy to host on Alibaba Cloud OSS.

## Project structure

```text
dist/
  index.html      Page shell, header and accessible controls
  app.js          Layout rendering and interactions
  content.js      Portfolio content, projects, skills and links
  scene.js        WebGL scenes and animated geometry
  styles.css      Shared tokens and six independent visual systems
  brand.svg       Header logo and browser-tab icon
docs/
  ALIBABA_DEPLOYMENT.md
package.json
```

## Run locally

The site uses JavaScript modules, so open it through a local web server rather than double-clicking `index.html`.

```bash
python -m http.server 8080 --directory dist
```

Then open `http://localhost:8080`.

Run the source checks with:

```bash
npm run check
```

## Deploy

Production files live in `dist/`. Preferred path: push to `main` and let GitHub Actions sync to Alibaba Cloud OSS.

See [docs/ALIBABA_DEPLOYMENT.md](docs/ALIBABA_DEPLOYMENT.md) for:

- first-time OSS + domain setup
- GitHub secrets for continuous deploy
- CDN cache notes
- how to add `/tools/...` later

Manual upload of `dist/` contents to the bucket root still works if Actions are not configured yet.

## Future tools

Keep the public portfolio at `/`. Add each future static tool as an independent folder such as `/tools/tool-name/`. If a tool needs secrets, a database, authentication or server-side AI calls, keep that logic in a separate backend and expose it through `api.habib.top`; never put API keys in frontend JavaScript.

This structure lets the portfolio remain stable while future tools can use React, TypeScript or another stack independently.
