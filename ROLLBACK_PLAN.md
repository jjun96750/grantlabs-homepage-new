# Rollback Plan

Use this before changing any production domain or DNS record.

## Current Safety Position

- Existing production site must remain untouched until cutover is explicitly scheduled.
- New homepage is developed in `jjun96750/grantlabs-homepage-new`.
- Cloudflare Pages should first run as a separate preview/staging project.

## Before Cutover

- Confirm current production DNS records.
- Screenshot current Cloudflare DNS settings.
- Confirm current production Pages/project settings.
- Confirm new Pages preview URL passes `QA_CHECKLIST.md`.
- Confirm EmailJS test submission works or fallback email draft opens.
- Record preview URL in `DEPLOYMENT_ENVIRONMENTS.md`.

## Cutover Steps

1. Lower DNS TTL if applicable.
2. Connect custom domain to the new Cloudflare Pages project.
3. Verify HTTPS certificate status.
4. Test homepage, `privacy.html`, `checklist.html`, `robots.txt`, `sitemap.xml`, and `404.html`.
5. Submit one test consultation inquiry.
6. Record final production URL and timestamp in `DEPLOYMENT_ENVIRONMENTS.md`.

## Rollback Steps

1. Remove or disable the custom domain from the new project.
2. Restore the previous DNS record or Pages project connection.
3. Verify the old production homepage loads.
4. Confirm `robots.txt` and `sitemap.xml` match the restored production site.
5. Record rollback timestamp, reason, and responsible person in `DEPLOYMENT_ENVIRONMENTS.md`.

## Do Not

- Do not delete the existing production project during cutover.
- Do not overwrite the existing `grantlabs-website` repository.
- Do not change DNS without recording the previous values.
