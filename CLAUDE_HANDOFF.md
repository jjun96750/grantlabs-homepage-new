# Claude Handoff

## Scope

- Work only in this new repository/folder: `grantlabs-homepage-new`
- GitHub repository: `https://github.com/jjun96750/grantlabs-homepage-new`
- Do not modify the existing `grantlabs-website` repository or current production site.
- Cloudflare Pages should be connected to this new repository as a separate project.

## Current State

- Static homepage draft is ready and pushed to GitHub.
- No build step is required.
- Main branch: `main`
- Latest pushed commit at handoff update: `f26d210 Strengthen deployment security headers`
- Local static validation passes with `node scripts/check-static-site.mjs`.
- Standard local validation command is `npm run check`; local preview is `npm run serve`.
- Standard commands are documented in `COMMANDS.md`.
- Ongoing development status is tracked in `DEVELOPMENT_STATUS.md`.
- Repository contents are proprietary and covered by `LICENSE`.
- Security and deployment issue reporting is documented in `SECURITY.md`.
- Contribution rules are documented in `CONTRIBUTING.md`.
- GitHub issue templates are available for bugs, content updates, and deployment checks.
- GitHub pull request template includes validation and deployment-safety checklist.
- GitHub `CODEOWNERS` assigns repository and deployment-sensitive files to `@jjun96750`.

## Files

```text
index.html
privacy.html
checklist.html
styles/homepage.css
README.md
COMMANDS.md
CONTRIBUTING.md
CLAUDE_HANDOFF.md
DEVELOPMENT_STATUS.md
.gitignore
.editorconfig
.nvmrc
package.json
.nojekyll
LICENSE
_headers
_redirects
favicon.svg
social-card.svg
robots.txt
sitemap.xml
site.webmanifest
QA_CHECKLIST.md
CLOUDFLARE_PAGES_SETUP.md
DEPLOYMENT_ENVIRONMENTS.md
ROLLBACK_PLAN.md
SECURITY.md
CHANGELOG.md
scripts/check-static-site.mjs
scripts/serve-static.mjs
scripts/check-deployed-site.mjs
.github/workflows/static-site-check.yml
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/content_update.md
.github/ISSUE_TEMPLATE/deployment_check.md
.github/PULL_REQUEST_TEMPLATE.md
.github/CODEOWNERS
```

## Design Direction

- Korean Grant Labs homepage for policy funding, certification, R&D center, patent, corporation setup, and business support consulting.
- First screen uses a real business meeting photo from Unsplash.
- The page is intentionally static for simple Cloudflare Pages deployment.
- Static deployment support files are present: `_headers`, `robots.txt`, `sitemap.xml`, `favicon.svg`, and `site.webmanifest`.
- Social sharing image is committed as `social-card.svg` and connected to Open Graph/Twitter metadata.
- Privacy notice page is available at `privacy.html` and is linked from the form and footer.
- Consultation checklist page is available at `checklist.html` and linked from the homepage/footer.
- Contact form uses EmailJS first, then falls back to a pre-filled email draft.
- Contact form includes a hidden honeypot field, `aria-describedby` wiring, and `page_url` / `submitted_at` metadata.
- Cloudflare `_headers` includes HSTS, clickjacking protection, baseline browser security headers, and cache policies for CSS, favicon, social card, manifest, robots, and sitemap files.
- Cloudflare `_redirects` routes unknown paths to `404.html` with a 404 status.
- `privacy.html` is intentionally `noindex` and excluded from `sitemap.xml`.
- `scripts/check-static-site.mjs` verifies required files, metadata, duplicate HTML ids, hero image performance attributes, contact form required fields, mobile-friendly phone input constraints, canonical contact values, EmailJS config values, JSON-LD, docs markers, command docs, editor config, Node version pin, gitignore hygiene, SVG asset metadata, robots/sitemap/canonical consistency, local `href` / `src` targets, cross-page hashes, and external new-window link safety.
- `scripts/serve-static.mjs` provides a dependency-free local preview server at `http://127.0.0.1:4173/` with explicit 404 and HEAD request handling.
- `scripts/check-deployed-site.mjs` verifies pages, response headers, `Content-Type` values, missing-route 404 handling, sitemap noindex cleanup, and prints a pass summary.
- GitHub Actions runs `npm run check` on pushes to `main` and pull requests.

## Next Steps

1. Create a new Cloudflare Pages project connected to `jjun96750/grantlabs-homepage-new`.
2. Follow `CLOUDFLARE_PAGES_SETUP.md` for deployment settings.
3. Record preview/production URLs in `DEPLOYMENT_ENVIRONMENTS.md`.
4. Run `npm run check` before additional commits.
5. Run `npm run serve` for local preview checks.
6. Run `npm run smoke -- <preview-url>` after the preview is live.
6. Run `QA_CHECKLIST.md` after the preview is live.
7. Verify EmailJS delivery, `page_url` / `submitted_at`, and the email-draft fallback in the deployed preview.
8. Continue edits only in this repository.
9. Keep `DEVELOPMENT_STATUS.md` updated whenever the project state changes.

## Suggested Prompt For Claude

```text
기존 grantlabs-website는 건드리지 말고, 이 새 레포에서만 Grant Labs 신규 홈페이지를 작업해줘.
Cloudflare Pages도 이 레포에 연결해서 기존 운영 사이트와 독립적으로 개발할 예정이야.
현재는 정적 홈페이지 초안이 있고, 빌드 과정 없이 index.html과 styles/homepage.css 중심으로 관리하면 돼.
```

English fallback:

```text
Work only in https://github.com/jjun96750/grantlabs-homepage-new.
Do not touch the existing grantlabs-website repository or production site.
Read CLAUDE_HANDOFF.md and DEVELOPMENT_STATUS.md first.
This is a static homepage draft for a separate Cloudflare Pages project. Use index.html and styles/homepage.css as the main files.
```
