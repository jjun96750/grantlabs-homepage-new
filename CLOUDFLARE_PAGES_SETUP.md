# Cloudflare Pages Setup

Use this document when connecting the new repository to Cloudflare Pages.

## Repository

```text
https://github.com/jjun96750/grantlabs-homepage-new
```

## Important Safety Rule

Do not connect or modify the existing `grantlabs-website` repository/project while setting this up.

## Project Settings

```text
Framework preset: None
Build command: leave empty
Build output directory: /
Root directory: /
Production branch: main
```

## Recommended First Deployment Flow

1. Open Cloudflare dashboard.
2. Go to Workers & Pages.
3. Create a new Pages project.
4. Connect to Git.
5. Select `jjun96750/grantlabs-homepage-new`.
6. Use the settings above.
7. Deploy.
8. Copy the preview URL into `DEVELOPMENT_STATUS.md`.
9. Run `npm run check`.
10. Run `npm run serve` and `npm run preview:check` for local preview validation.
11. Run `npm run smoke -- <preview-url>` to confirm pages, static files, security headers, CDN integrity, and cache headers.
12. Run `QA_CHECKLIST.md`.
13. Submit a test inquiry and confirm EmailJS delivery. If EmailJS fails, confirm the email-draft fallback opens.
14. Record EmailJS and fallback results in `DEPLOYMENT_ENVIRONMENTS.md`.

## After Preview Approval

- Decide whether this project will receive a new temporary subdomain or eventually replace the production domain.
- If it will stay as a preview/staging project, keep production DNS untouched.
- If it will replace production later, schedule a separate cutover checklist.
