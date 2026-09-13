# Alibaba Cloud deployment

The domain registration controls the address. Alibaba Cloud OSS stores and serves the portfolio files. These are separate services, even when both are managed from Alibaba.

## Recommended first deployment

1. Open the Alibaba Cloud console and create an Object Storage Service (OSS) bucket.
2. Select a region appropriate for the audience and make the website files publicly readable through the supported static-website configuration.
3. Enable static website hosting and set `index.html` as the default home page.
4. Upload **the contents of `dist/`**, not the `dist` folder itself, to the bucket root.
5. In the bucket domain settings, map `habib.top` or `www.habib.top` as a custom domain.
6. In Alibaba DNS, create the CNAME record shown by the OSS domain-mapping screen.
7. Configure an HTTPS certificate for the custom domain. If CDN is enabled, attach the domain and certificate there as well.
8. Open the custom domain in a private browser window and check the home page, every design, light/dark mode, résumé link and Gmail contact action.

Alibaba Cloud's current OSS documentation is available from the [official OSS documentation center](https://www.alibabacloud.com/help/en/oss).

## Continuous deploy (push → live site)

Stop uploading HTML by hand. Use GitHub Actions so every push to `main` syncs `dist/` to OSS.

### 1. Create a RAM user AccessKey (not root account)

In Alibaba Cloud RAM:

- Create a user for CI only (example: `github-oss-deploy`).
- Grant only OSS write permissions for this bucket (`oss:ListObjects`, `oss:PutObject`, `oss:DeleteObject`).
- Create an AccessKey for that RAM user.

### 2. Add GitHub repository secrets

In the GitHub repo → **Settings → Secrets and variables → Actions**, add:

| Secret | Example | Notes |
| --- | --- | --- |
| `OSS_ENDPOINT` | `oss-ap-southeast-1.aliyuncs.com` | Use your bucket region endpoint |
| `OSS_ACCESS_KEY_ID` | `LTAI...` | RAM AccessKey ID |
| `OSS_ACCESS_KEY_SECRET` | `...` | RAM AccessKey Secret |
| `OSS_BUCKET` | `habib-top` | Bucket name only |

Do not commit AccessKeys into the repo.

### 3. Push to `main`

The workflow [`.github/workflows/deploy-oss.yml`](../.github/workflows/deploy-oss.yml):

1. Runs `npm run check`
2. Syncs `./dist/` → `oss://$OSS_BUCKET/` with `ossutil sync` (changed files only; deletes removed files)

After the Action turns green, open `https://habib.top` (hard refresh or private window).

### 4. If CDN is enabled

OSS updates are fast, but CDN may cache old CSS/JS. After deploy:

- Purge CDN cache for `/*.js`, `/*.css`, `/`, or full site if needed
- Or set short TTL / cache-busting later with filename hashes

## Updating the portfolio (daily workflow)

```text
1. Edit files under dist/
2. npm run check
3. git add -A && git commit -m "..."
4. git push origin main
5. Wait for GitHub Action → site updates
```

## Adding tools later

Use the following boundary:

```text
habib.top/                 Portfolio
habib.top/tools/name/      Static or browser-only tool
api.habib.top/             Server APIs, AI calls, databases and secrets
```

Static tools can live as separate folders in the same bucket (and the same repo under `dist/tools/...`). Tools that use private API keys, databases, authentication, background jobs or long-running computation need a backend such as Alibaba Cloud Function Compute or ECS. The frontend should call that backend over HTTPS.

Do not place service credentials, model API keys or database passwords anywhere inside `dist/`.
