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
- Latest implementation commit captured in this handoff: `f954348 Apply Grant Labs logo assets`
- Local static validation passes with `npm run check`.
- Standard local validation command is `npm run check`; local preview is `npm run serve`.
- Standard commands are documented in `COMMANDS.md`.
- Content automation can be generated with `npm run content:plan`.
- Asset briefs can be generated with `npm run content:assets`.
- Caption packs can be generated with `npm run content:captions`.
- Publishing queue automation can be generated with `npm run content:queue`.
- The full content automation pipeline can be regenerated with `npm run content:run`.
- All content automation campaigns can be regenerated with `npm run content:run:all`.
- Campaign status can be regenerated with `npm run content:status`.
- Deployment readiness can be regenerated with `npm run deployment:readiness`.
- Development journal can be regenerated with `npm run status:journal`.
- Status index can be regenerated with `npm run status:index`.
- Content automation outputs can be quality-checked with `npm run check:content`.
- The current content automation set includes the 2026-06-18 policy-funding readiness campaign, the 2026-06-19 R&D-center readiness bridge campaign, and the 2026-06-20 certification/patent/funding sequence campaign.
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
assets/brand/grant-labs-logo.svg
assets/brand/grant-labs-logo-black.svg
assets/brand/grant-labs-logo-gold.svg
assets/brand/grant-labs-logo-white.svg
README.md
STATUS_INDEX.md
DEVELOPMENT_JOURNAL.md
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
DEPLOYMENT_READINESS.md
ROLLBACK_PLAN.md
SECURITY.md
CHANGELOG.md
scripts/check-static-site.mjs
scripts/check-content-automation.mjs
scripts/generate-asset-briefs.mjs
scripts/generate-caption-pack.mjs
scripts/generate-content-plan.mjs
scripts/generate-content-status.mjs
scripts/generate-deployment-readiness.mjs
scripts/generate-development-journal.mjs
scripts/generate-status-index.mjs
scripts/generate-publishing-queue.mjs
scripts/run-all-content-automation.mjs
scripts/run-content-automation.mjs
scripts/serve-static.mjs
scripts/check-local-preview.mjs
scripts/check-deployed-site.mjs
content-automation/README.md
content-automation/CAMPAIGN_STATUS.md
content-automation/platform-rules.json
content-automation/publishing-defaults.json
content-automation/campaigns/certification-patent-funding-sequence.json
content-automation/campaigns/grantlabs-growth-check.json
content-automation/campaigns/rnd-center-funding-bridge.json
content-automation/output/2026-06-18-grantlabs-growth-check.md
content-automation/output/2026-06-18-grantlabs-growth-check-asset-briefs.md
content-automation/output/2026-06-18-grantlabs-growth-check-caption-pack.md
content-automation/output/2026-06-18-grantlabs-growth-check-publishing-queue.csv
content-automation/output/2026-06-18-grantlabs-growth-check-publishing-queue.md
content-automation/output/2026-06-19-rnd-center-funding-bridge.md
content-automation/output/2026-06-19-rnd-center-funding-bridge-asset-briefs.md
content-automation/output/2026-06-19-rnd-center-funding-bridge-caption-pack.md
content-automation/output/2026-06-19-rnd-center-funding-bridge-publishing-queue.csv
content-automation/output/2026-06-19-rnd-center-funding-bridge-publishing-queue.md
content-automation/output/2026-06-20-certification-patent-funding-sequence.md
content-automation/output/2026-06-20-certification-patent-funding-sequence-asset-briefs.md
content-automation/output/2026-06-20-certification-patent-funding-sequence-caption-pack.md
content-automation/output/2026-06-20-certification-patent-funding-sequence-publishing-queue.csv
content-automation/output/2026-06-20-certification-patent-funding-sequence-publishing-queue.md
.github/workflows/static-site-check.yml
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/content_update.md
.github/ISSUE_TEMPLATE/deployment_check.md
.github/PULL_REQUEST_TEMPLATE.md
.github/CODEOWNERS
```

## Design Direction

- Korean Grant Labs homepage for policy funding, certification, R&D center, patent, corporation setup, and business support consulting.
- Grant Labs wordmark logo SVG assets are committed under `assets/brand/` and used in the homepage header/footer, 404 page, privacy page, and checklist page.
- First screen uses a real business meeting photo from Unsplash.
- The page is intentionally static for simple Cloudflare Pages deployment.
- Static deployment support files are present: `_headers`, `robots.txt`, `sitemap.xml`, `favicon.svg`, and `site.webmanifest`.
- Social sharing image is committed as `social-card.svg`, uses the Grant Labs wordmark treatment, and is connected to Open Graph/Twitter metadata.
- Privacy notice page is available at `privacy.html` and is linked from the form and footer.
- Consultation checklist page is available at `checklist.html` and linked from the homepage/footer.
- Contact form uses EmailJS first, then falls back to a pre-filled email draft.
- Mobile navigation can be dismissed with the Escape key, outside clicks, and returns focus to the menu toggle after keyboard dismissal.
- Lucide is pinned to `lucide@1.18.0`; do not switch it back to `latest`.
- EmailJS browser SDK is pinned to `@emailjs/browser@4.4.1`; do not switch it back to a major-version alias.
- Pinned CDN scripts include SRI `integrity` attributes and `crossorigin="anonymous"`.
- Contact form includes a hidden honeypot field, `aria-describedby` wiring, `aria-busy` submission state updates, and `page_url` / `submitted_at` metadata.
- Cloudflare `_headers` includes host-scoped HSTS, CSP, the approved Pretendard style/font CDN allowlist, clickjacking protection, baseline browser security headers, and cache policies for CSS, favicon, brand logo assets, social card, manifest, robots, and sitemap files.
- Cloudflare `_redirects` routes unknown paths to `404.html` with a 404 status.
- `privacy.html` is intentionally `noindex` and excluded from `sitemap.xml`.
- `privacy.html` discloses the optional email field used by the consultation form.
- `scripts/check-static-site.mjs` verifies required files including `.nojekyll`, metadata, duplicate HTML ids, hero image performance attributes, contact form fields, optional email payload handling, mobile-friendly phone input constraints, canonical contact values, EmailJS config values, CDN version pins, CSP allowlists including Pretendard font loading, `_headers`/local preview security-header synchronization, JSON-LD, docs markers, command docs, editor config, Node version pin, gitignore hygiene, SVG and brand logo asset metadata, robots/sitemap/canonical consistency, local `href` / `src` targets, cross-page hashes, inline event handler cleanup, and external new-window link safety.
- `scripts/serve-static.mjs` provides a dependency-free local preview server at `http://127.0.0.1:4173/` with explicit 404, HEAD request handling, secured 405 responses, and Cloudflare-like security headers.
- `scripts/check-local-preview.mjs` verifies local preview GET, HEAD, and unsupported-method status codes, content types, brand logo SVG asset responses, `Cache-Control: no-store`, homepage CDN script integrity markers, missing-route handling, and security/CSP headers including HSTS and Pretendard style/font loading.
- `scripts/check-deployed-site.mjs` verifies pages, brand logo SVG assets, response headers, CSP markers, `Content-Type` values, homepage CDN script integrity markers, missing-route 404 handling, sitemap noindex cleanup, and prints a pass summary.
- GitHub Actions runs `npm run content:run:all`, rejects uncommitted content automation drift, regenerates `DEPLOYMENT_READINESS.md`, rejects uncommitted readiness drift, regenerates `DEVELOPMENT_JOURNAL.md`, rejects uncommitted journal drift, regenerates `STATUS_INDEX.md`, rejects uncommitted status-index drift, runs `npm run check:content`, runs `npm run check`, starts the local preview server, and runs `npm run preview:check` on pushes to `main` and pull requests, with timeout and concurrency controls.
- `content-automation/platform-rules.json` defines per-platform posting strategy for Naver Blog, Instagram, YouTube, TikTok, Facebook, and LinkedIn.
- `content-automation/README.md` documents the campaign workflow, active campaigns, and expected generated output set.
- `content-automation/CAMPAIGN_STATUS.md` is the collaborator-facing table of campaigns and generated output status.
- `DEPLOYMENT_READINESS.md` is the collaborator-facing table of deployment readiness checks and open deployment placeholders.
- `DEVELOPMENT_JOURNAL.md` is the collaborator-facing commit-based implementation flow.
- `STATUS_INDEX.md` is the collaborator-facing map of status documents and safety guardrails.
- `scripts/generate-asset-briefs.mjs` creates platform-specific production briefs with canvas, checklist, CTA, and success-signal guidance.
- `scripts/generate-caption-pack.mjs` creates platform-specific captions, hashtags, CTA text, and thumbnail/overlay copy.
- `scripts/generate-content-plan.mjs` creates platform-specific posting guidance from the current Grant Labs campaign input.
- `scripts/generate-publishing-queue.mjs` creates CSV and Markdown publishing queues with platform timing, asset, objective, and success-signal guidance.
- `scripts/generate-content-status.mjs` writes `content-automation/CAMPAIGN_STATUS.md` for handoff visibility.
- `scripts/generate-deployment-readiness.mjs` writes `DEPLOYMENT_READINESS.md` for deployment handoff visibility.
- `scripts/generate-development-journal.mjs` writes `DEVELOPMENT_JOURNAL.md` for implementation-flow visibility.
- `scripts/generate-status-index.mjs` writes `STATUS_INDEX.md` for fast collaborator orientation.
- `scripts/run-content-automation.mjs` runs the content plan, asset brief, caption pack, and publishing queue generators in sequence.
- `scripts/run-all-content-automation.mjs` discovers every campaign JSON file and runs the full automation pipeline for each one.
- `scripts/check-content-automation.mjs` scans every campaign and generated output set for platform coverage, Korean markers, checklist URL, compliance guardrails, and forbidden claims.
- `scripts/check-static-site.mjs` also scans campaign inputs and expected generated output files dynamically, so future campaigns should not require campaign-specific static validation entries.

## Next Steps

1. Create a new Cloudflare Pages project connected to `jjun96750/grantlabs-homepage-new`.
2. Follow `CLOUDFLARE_PAGES_SETUP.md` for deployment settings.
3. Record preview/production URLs in `DEPLOYMENT_ENVIRONMENTS.md`.
4. Run `npm run check` before additional commits.
5. Run `npm run serve` for local preview checks.
6. Run `npm run preview:check` against the running local preview.
7. Run `npm run smoke -- <preview-url>` after the preview is live.
8. Run `QA_CHECKLIST.md` after the preview is live.
9. Verify EmailJS delivery, `page_url` / `submitted_at`, and the email-draft fallback in the deployed preview.
10. Continue edits only in this repository.
11. Keep `DEVELOPMENT_STATUS.md` updated whenever the project state changes.

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
