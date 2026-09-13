# Hosting on Alibaba Cloud

This site is static. Files under `dist/` are published to an Alibaba Cloud Object Storage Service (OSS) bucket and served on `habib.top`.

## One-time console setup

1. Create an OSS bucket in a region near your audience.
2. Enable static website hosting with `index.html` as the default document.
3. Upload the contents of `dist/` to the bucket root (not the `dist` folder name).
4. Bind the custom domain `habib.top` (and `www` if used) and create the DNS CNAME Alibaba shows.
5. Enable HTTPS for the custom domain. If CDN is used, attach the domain and certificate there.

Official reference: [Alibaba Cloud OSS documentation](https://www.alibabacloud.com/help/en/oss).

## Continuous publishing from GitHub

Repository workflow: `.github/workflows/publish.yml`

Required GitHub Actions secrets (Settings → Secrets and variables → Actions):

| Name | Purpose |
| --- | --- |
| `OSS_ENDPOINT` | Bucket region endpoint |
| `OSS_ACCESS_KEY_ID` | Access key ID (RAM user preferred) |
| `OSS_ACCESS_KEY_SECRET` | Access key secret |
| `OSS_BUCKET` | Bucket name |

Use a RAM user limited to this bucket. Do not store keys in the repository.

After secrets are set, every push to `main` publishes `dist/` to the bucket. If CDN caches assets, purge cache after major CSS or JavaScript updates.

## Local change flow

Edit `dist/` → `npm run check` → commit → push `main` → confirm the Actions run succeeded → verify `https://habib.top`.
