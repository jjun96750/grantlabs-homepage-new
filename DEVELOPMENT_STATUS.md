# Development Status

Last updated: 2026-06-22

## Project

- Repository: `https://github.com/jjun96750/grantlabs-homepage-new`
- Purpose: Grant Labs 신규 홈페이지 독립 개발
- Production safety rule: 기존 `grantlabs-website` 저장소와 기존 운영 사이트는 수정하지 않음
- Deployment target: 새 Cloudflare Pages 프로젝트
- Main branch: `main`

## Current Status

- Content automation now generates platform-ready copy-only files for every campaign under `content-automation/output/platform-ready-copy/`.
- Platform-ready copy now uses channel-specific publishing behavior: Naver gets readable sections and a visible raw URL CTA, Instagram/TikTok avoid assuming clickable captions, and YouTube/Facebook/LinkedIn keep URL-forward post formats.
- Naver Blog now has a plain-text `01-naver-blog-copy.txt` per campaign with raw checklist URL, readable paragraph breaks, and no Markdown link syntax.
- `npm run content:run` and `npm run content:run:all` now include the platform-ready copy step.
- `npm run check:content` now requires platform-ready copy summaries and validates the Naver plain-text file.
- Content automation now generates campaign/platform UTM checklist links in `content-automation/TRACKED_LINKS.md` and `.csv`.
- Content automation now generates `content-automation/PLATFORM_PLAYBOOK.md` from platform rules for collaborator publishing QA.
- `content-automation/PLATFORM_PLAYBOOK.md` now includes universal readability rules, Naver raw URL guidance, Markdown-link warnings, and channel-specific pre-publish QA.
- Latest validation after the platform-specific readability update: `Content automation check passed.` and `Static site check passed.`
- `npm run check:content` now rejects likely mojibake markers in campaign inputs and generated content automation outputs.
- `npm run check:content` now requires the Naver Blog caption section to keep the raw checklist URL and avoid Markdown-only links.
- GitHub repository created.
- Local repository initialized.
- Static homepage draft completed.
- Grant Labs official SVG logo assets are applied to the homepage header, footer, legal pages, checklist page, and 404 page.
- Repository pushed to GitHub.
- Claude handoff memo created.
- Development status document created and actively maintained.
- Static deployment support files added.
- Contact form now attempts EmailJS submission and falls back to a pre-filled email draft.
- FAQ section and FAQPage structured data added.
- Readiness-check section added to help visitors prepare for consultation.
- Privacy notice page added and linked from the consultation form and footer.
- Accessibility improvements added: skip links, main-content focus target, visible focus styles, and reduced-motion handling.
- Mobile navigation menu added for small-screen visitors.
- Deliverables section added to clarify what visitors receive after consultation.
- Mobile quick-contact bar added for phone and consultation actions.
- Printable consultation checklist page added and linked from homepage/footer.
- Interactive 30-second readiness self-check added to the homepage.
- Checklist page progress counter added.
- Service-fit table added to map visitor situations to recommended services.
- Preconnect hints added for image and CDN resources.
- Consultation promise section added before the contact form.
- Local social sharing card added and connected to Open Graph/Twitter metadata.
- Checklist print styles tightened for A4 output and QA coverage.
- Deployed-site smoke test script added for Cloudflare Pages previews.
- Contact form honeypot added to reduce automated spam submissions.
- Static asset cache policies expanded for social card, manifest, robots, and sitemap files.
- Contact form accessibility description wiring added for required fields and status text.
- Claude handoff memo updated with latest pushed state, validation commands, and deployment next steps.
- No-JavaScript contact fallback added inside the consultation form.
- Deployed-site smoke test now checks security and cache response headers.
- README and Cloudflare setup guide updated for current validation scripts and header checks.
- Deployment environment tracker now includes a preview verification template.
- Checklist page follow-up consultation CTA added for users who finish preparing materials.
- Privacy notice updated to explain contact-form spam protection and no-JavaScript fallback.
- Checklist checkboxes now receive accessible labels from their item text.
- Deployed smoke test now validates a real missing route returns the styled 404 response.
- Deployed smoke test now prints a pass summary for deployment records.
- Static validation now checks README and Cloudflare setup guidance markers.
- Deployment environment tracker now records EmailJS and fallback contact configuration.
- Contact form submission payload now includes page URL and ISO submission timestamp.
- Sitemap now excludes the noindex privacy page for cleaner SEO signals.
- Deployed smoke test now verifies sitemap excludes the noindex privacy URL.
- Static validation now checks language, title, description, and replacement characters across all HTML pages.
- Static validation now checks canonical and social sharing metadata on indexable pages.
- Claude handoff memo refreshed with latest commit, smoke-test scope, sitemap note, and contact metadata.
- Static validation now checks local `href` and `src` targets across HTML pages.
- Claude handoff memo refreshed again with the latest pushed commit and local target validation scope.
- Deployed smoke test now checks expected `Content-Type` headers for pages and static assets.
- Static validation now checks that deployed smoke tests include `Content-Type` coverage.
- GitHub Actions now runs the static validation script on pushes to `main` and pull requests.
- Cloudflare Pages `_redirects` now routes unknown paths to `404.html` with a 404 status.
- Static validation now checks external `target="_blank"` links for `rel="noopener"`.
- Static validation now checks cross-page local hash targets.
- Static validation now checks robots, sitemap, and canonical URL consistency.
- Static validation now checks favicon and social-card SVG asset metadata.
- Proprietary `LICENSE` file added and covered by static validation.
- `.editorconfig` added and covered by static validation for editor consistency.
- `package.json` scripts added for local static and deployed smoke validation.
- `COMMANDS.md` added with standard validation command guidance.
- Local preview server added for dependency-free `npm run serve` checks.
- README and contribution guidance now document `npm run serve`.
- Local preview server now handles `HEAD` requests without response bodies.
- Cloudflare `_headers` now includes HSTS and clickjacking protection, with deployed smoke-test coverage.
- HSTS is scoped to the current host and does not preload or include subdomains.
- Cloudflare `_headers` now includes a Content Security Policy for required static, image, and EmailJS endpoints.
- Checklist print action now uses an unobtrusive event listener instead of an inline handler.
- Consultation form now captures an optional email address in EmailJS and mailto fallback payloads.
- Privacy notice now discloses optional email collection and uses the current effective date.
- Lucide CDN dependency is pinned to version 1.18.0 instead of using `latest`.
- EmailJS browser CDN dependency is pinned to version 4.4.1 instead of using the major-version alias.
- Static validation now checks the CSP script and EmailJS connect allowlists.
- Pinned Lucide and EmailJS CDN scripts now include SRI integrity attributes.
- Deployed smoke checks now verify CDN script integrity markers on the homepage.
- Local preview server now returns the same baseline security headers as Cloudflare Pages.
- Local preview can now be checked with `npm run preview:check`.
- GitHub Actions now runs both static validation and local preview validation.
- Sitemap lastmod values and static validation were refreshed for 2026-06-16.
- Handoff memo refreshed after the June 16 sitemap date update.
- Deployment and QA docs now use the standard npm validation commands.
- Handoff memo refreshed after deployment command standardization.
- README and contribution guidance now include `npm run preview:check`.
- Handoff memo refreshed after local preview command documentation.
- Local preview checks now verify CDN script integrity markers.
- Handoff memo refreshed after local CDN integrity validation.
- Deployment tracking and next-action guidance now avoid legacy `node scripts/...` commands.
- Handoff memo refreshed after legacy validation command cleanup.
- Local preview checks now verify the HSTS response header.
- Static validation now keeps local preview security-header checks aligned with deployment smoke tests.
- Handoff memo refreshed after local HSTS preview validation.
- Claude handoff commit wording now points to the captured implementation commit instead of a self-updating latest-push marker.
- Local preview checks now verify HEAD responses for the homepage and stylesheet.
- Handoff memo refreshed after local HEAD response validation.
- Local preview checks now verify `Cache-Control: no-store` on GET and HEAD responses.
- Handoff memo refreshed after local cache-header validation.
- Local preview 405 responses now include security and cache headers.
- Local preview checks now verify unsupported-method handling.
- Handoff memo refreshed after secured local method-error handling.
- CSP now allows the approved Pretendard CDN in `style-src` and `font-src`.
- Local preview, deployed smoke, and static validation now assert the Pretendard CSP allowlist.
- Handoff memo refreshed after Pretendard CSP allowlist validation.
- Static validation now keeps Cloudflare `_headers` CSP and local preview CSP in sync.
- Handoff memo refreshed after CSP synchronization validation.
- Static validation now keeps all mirrored security headers in sync between Cloudflare `_headers` and the local preview server.
- Handoff memo refreshed after mirrored security-header synchronization.
- Static validation now requires `.nojekyll` as part of the static deployment file set.
- Handoff memo refreshed after `.nojekyll` validation.
- GitHub Actions static-site validation now has timeout and concurrency controls.
- Handoff memo refreshed after GitHub Actions workflow hardening.
- Contact form now updates `aria-busy` during submission and fallback handling.
- Handoff memo refreshed after contact form busy-state handling.
- Mobile navigation can now be dismissed with the Escape key.
- Handoff memo refreshed after mobile menu keyboard handling.
- Mobile navigation now closes when visitors click outside the open menu.
- Handoff memo refreshed after mobile menu outside-click handling.
- Content automation rules now cover Naver Blog, Instagram Carousel/Reels, YouTube Shorts/Long-form, TikTok, Facebook Page, and LinkedIn Page.
- `npm run content:plan` now generates platform-specific posting guidance from a Grant Labs campaign input.
- Static validation now covers content automation rules, campaign fields, compliance guardrails, and generator markers.
- Generated `content-automation/output/2026-06-18-grantlabs-growth-check.md` as the first platform-specific posting plan.
- Content automation now generates Korean post starters for each platform.
- Handoff memo refreshed after platform content automation implementation.
- `npm run content:queue` now generates platform-specific publishing queue CSV and Markdown outputs.
- Publishing queue defaults now include platform objective, asset, timing, and success-signal guidance.
- Generated publishing queue outputs for the 2026-06-18 campaign.
- Publishing queue date generation now keeps day-zero posts on the campaign date.
- Handoff memo refreshed after publishing queue automation implementation.
- `npm run content:assets` now generates platform-specific production asset briefs.
- Generated `content-automation/output/2026-06-18-grantlabs-growth-check-asset-briefs.md`.
- Handoff memo refreshed after platform asset brief automation.
- `npm run content:captions` now generates platform-specific captions, hashtags, and thumbnail text.
- Generated `content-automation/output/2026-06-18-grantlabs-growth-check-caption-pack.md`.
- Handoff memo refreshed after platform caption pack automation.
- `npm run content:run` now regenerates the full content automation pipeline in one command.
- Full content automation runner verified against the 2026-06-18 campaign outputs.
- Handoff memo refreshed after full content automation runner implementation.
- `npm run check:content` now validates content automation outputs for platform coverage, Korean markers, landing page links, and forbidden claims.
- Content automation quality check passes for the current campaign outputs.
- Handoff memo refreshed after content automation quality check implementation.
- Added the 2026-06-19 R&D-center and policy-funding readiness campaign.
- Generated the 2026-06-19 content plan, asset briefs, caption pack, and publishing queue outputs.
- `npm run check:content` now scans every campaign and generated output set instead of one fixed sample.
- Static validation now requires the June 19 campaign input and generated output files.
- Added the 2026-06-20 certification, patent, and policy-funding preparation sequence campaign.
- Generated the 2026-06-20 content plan, asset briefs, caption pack, and publishing queue outputs.
- Added `content-automation/README.md` with campaign workflow, active campaigns, and expected output set.
- Static validation now scans all campaign inputs and required generated output sets dynamically.
- Added `npm run content:run:all` for regenerating every campaign in one command.
- Command docs and content automation docs now describe the all-campaign regeneration workflow.
- Added `npm run content:status` to regenerate a collaborator-facing campaign status table.
- `content-automation/CAMPAIGN_STATUS.md` now records campaign outputs in one table for handoff visibility.
- GitHub Actions now regenerates content automation outputs, checks for uncommitted content drift, and runs `npm run check:content`.
- Added `npm run deployment:readiness` and `DEPLOYMENT_READINESS.md` to summarize deployment readiness and open deployment placeholders.
- GitHub Actions now regenerates `DEPLOYMENT_READINESS.md` and checks for uncommitted readiness drift.
- Added `npm run status:index` and `STATUS_INDEX.md` to give collaborators a single map of status documents and guardrails.
- Added `npm run status:journal` and `DEVELOPMENT_JOURNAL.md` to keep a commit-based implementation journal for collaborators.
- GitHub Actions now regenerates `DEVELOPMENT_JOURNAL.md` and checks for uncommitted journal drift.
- `.nvmrc` added and covered by static validation for Node version consistency.
- `.gitignore` expanded for deployment/build artifacts and covered by static validation.
- `SECURITY.md` added with vulnerability and deployment-issue reporting guidance.
- `CONTRIBUTING.md` added with repository scope, validation, and documentation rules.
- GitHub issue templates added for bugs, content updates, and deployment checks.
- GitHub pull request template added with validation and deployment-safety checklist.
- GitHub `CODEOWNERS` added for repository, deployment, and automation files.
- Static validation now checks duplicate HTML `id` values.
- Static validation now checks required contact form fields, privacy consent, and autocomplete hints.
- Static validation now checks canonical contact email and phone consistency.
- Static validation now checks EmailJS public key, service ID, and template ID consistency.
- Hero image now has explicit dimensions, async decoding, fetch priority, and static validation coverage.
- Contact phone field now uses telephone input mode, a lightweight pattern, and static validation coverage.
- Grant Labs logo SVG assets are committed under `assets/brand/` and applied to the header, footer, 404 page, privacy page, and checklist page.
- Static validation and Cloudflare cache policy coverage now include the brand logo assets.
- `social-card.svg` now uses the Grant Labs wordmark treatment.
- Local preview and deployed smoke checks now request brand logo SVG assets directly.
- `ProfessionalService` JSON-LD now includes the canonical Grant Labs logo URL and static validation coverage.
- `site.webmanifest` now includes app id, scope, locale, categories, maskable icon purpose, and consultation/checklist shortcuts.
- Open Graph and Twitter image alt metadata now describe the social card on indexable and legal/checklist pages.
- `npm run sitemap:refresh` now regenerates `sitemap.xml` with current Asia/Seoul lastmod values.
- Generated status/readiness/journal scripts now use runtime Asia/Seoul dates instead of hardcoded generation dates.
- GitHub Actions now regenerates `sitemap.xml` and checks for uncommitted sitemap drift.
- Added the 2026-06-21 consultation checklist conversion campaign.
- Added `npm run content:calendar` and cross-campaign publishing calendar outputs.
- Added `npm run content:today` and same-day publishing handoff output.
- `content-automation/TODAY_ACTIONS.md` now links directly to each campaign's plan, asset brief, caption pack, and publishing queue.
- `content-automation/TODAY_ACTIONS.md` now includes platform execution notes and a reporting log for published URLs, first signals, and follow-up needs.
- Added `npm run content:upcoming` and `content-automation/UPCOMING_ACTIONS.md` for future publishing preparation, ownership, and blocker tracking.
- Added `npm run content:performance` and `content-automation/PERFORMANCE_LOG.md` for post URL, metric, learning, and repurpose tracking.
- Added `npm run content:links` and `content-automation/TRACKED_LINKS.md` / `.csv` for campaign/platform UTM checklist URLs.
- Added `npm run content:playbook` and `content-automation/PLATFORM_PLAYBOOK.md` for channel roles, CTAs, ready-copy files, and publishing QA.
- Added `npm run content:brief` and `content-automation/DAILY_BRIEF.md` for a single daily operator summary.
- No build step is required.

## Current Files

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
COMMANDS.md
CONTRIBUTING.md
CLAUDE_HANDOFF.md
DEVELOPMENT_STATUS.md
.gitignore
.editorconfig
.nvmrc
package.json
.nojekyll
favicon.svg
social-card.svg
site.webmanifest
robots.txt
sitemap.xml
_headers
_redirects
404.html
.gitattributes
LICENSE
CLOUDFLARE_PAGES_SETUP.md
QA_CHECKLIST.md
scripts/check-static-site.mjs
scripts/serve-static.mjs
scripts/check-deployed-site.mjs
scripts/check-content-automation.mjs
scripts/generate-asset-briefs.mjs
scripts/generate-caption-pack.mjs
scripts/generate-content-plan.mjs
scripts/generate-content-status.mjs
scripts/generate-publishing-calendar.mjs
scripts/generate-today-actions.mjs
scripts/generate-upcoming-actions.mjs
scripts/generate-performance-log.mjs
scripts/generate-tracked-links.mjs
scripts/generate-platform-playbook.mjs
scripts/generate-daily-brief.mjs
scripts/generate-deployment-readiness.mjs
scripts/generate-sitemap.mjs
scripts/generate-development-journal.mjs
scripts/generate-status-index.mjs
scripts/generate-publishing-queue.mjs
scripts/run-all-content-automation.mjs
scripts/run-content-automation.mjs
content-automation/README.md
content-automation/CAMPAIGN_STATUS.md
content-automation/PUBLISHING_CALENDAR.md
content-automation/PUBLISHING_CALENDAR.csv
content-automation/TODAY_ACTIONS.md
content-automation/UPCOMING_ACTIONS.md
content-automation/PERFORMANCE_LOG.md
content-automation/TRACKED_LINKS.md
content-automation/TRACKED_LINKS.csv
content-automation/PLATFORM_PLAYBOOK.md
content-automation/DAILY_BRIEF.md
content-automation/platform-rules.json
content-automation/publishing-defaults.json
content-automation/campaigns/certification-patent-funding-sequence.json
content-automation/campaigns/consultation-checklist-conversion.json
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
content-automation/output/2026-06-21-consultation-checklist-conversion.md
content-automation/output/2026-06-21-consultation-checklist-conversion-asset-briefs.md
content-automation/output/2026-06-21-consultation-checklist-conversion-caption-pack.md
content-automation/output/2026-06-21-consultation-checklist-conversion-publishing-queue.csv
content-automation/output/2026-06-21-consultation-checklist-conversion-publishing-queue.md
.github/workflows/static-site-check.yml
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/content_update.md
.github/ISSUE_TEMPLATE/deployment_check.md
.github/PULL_REQUEST_TEMPLATE.md
.github/CODEOWNERS
DEPLOYMENT_ENVIRONMENTS.md
DEPLOYMENT_READINESS.md
DEVELOPMENT_JOURNAL.md
STATUS_INDEX.md
ROLLBACK_PLAN.md
SECURITY.md
CHANGELOG.md
```

## Implemented Homepage Sections

- Fixed header navigation
- Mobile navigation menu
- Mobile quick-contact bar
- Hero section with real business meeting image
- Readiness-check section
- Interactive readiness self-check
- Service overview
- Service-fit table
- Process/method section
- Deliverables section
- Focus-area section
- FAQ section
- Consultation promise section
- Contact section with phone, email, address, EmailJS submission, and email-draft fallback
- Privacy consent checkbox for consultation inquiries
- Privacy notice page
- Printable consultation checklist page
- Checklist progress counter
- Accessibility skip links and focus styles
- SEO meta tags and structured data
- FAQPage JSON-LD structured data
- Favicon and web manifest
- Robots and sitemap files
- Cloudflare Pages `_headers` security/cache hints
- Cloudflare Pages `_redirects` 404 fallback rule
- Simple static 404 page
- Cloudflare Pages setup checklist
- Deployment QA checklist
- Local static-site validation script
- Deployment environment tracking document
- Rollback plan
- Changelog
- Page-level canonical, Open Graph, Twitter card, and manifest links for subpages
- Local Open Graph/Twitter social sharing image
- A4-friendly print styling for the consultation checklist
- Cloudflare Pages preview smoke-test script
- Contact form honeypot spam guard
- Expanded Cloudflare `_headers` cache policies for deployment support files
- Contact form `aria-describedby` status wiring
- Updated Claude handoff memo
- No-JavaScript contact fallback
- Deployed smoke-test response header assertions
- README/Cloudflare setup validation guidance refresh
- Deployment environment preview verification template
- Checklist follow-up consultation CTA
- Privacy notice contact-form protection explanation
- Checklist checkbox accessibility labels
- Missing-route 404 smoke test
- Deployed smoke-test pass summary output
- README and Cloudflare guide drift checks
- EmailJS deployment configuration tracking
- Lead source metadata in contact payload
- Sitemap noindex/privacy cleanup
- Deployed sitemap noindex validation
- Cross-page HTML metadata validation
- Indexable-page canonical/social metadata validation
- Refreshed Claude handoff memo
- Local link and asset target validation
- Deployed smoke-test `Content-Type` validation
- GitHub Actions static validation workflow
- Cloudflare Pages `_redirects` 404 fallback
- External new-window link safety validation
- Cross-page hash target validation
- Robots/sitemap/canonical URL consistency validation
- Favicon/social-card SVG metadata validation
- Proprietary license file
- EditorConfig consistency file
- Package scripts for validation
- Standard command guide
- Node version pin
- Git ignore deployment/build artifact coverage
- Security reporting policy
- Contribution guide
- GitHub issue templates
- GitHub pull request template
- GitHub CODEOWNERS
- Duplicate HTML id validation
- Contact form required-field validation
- Contact email/phone consistency validation
- EmailJS configuration consistency validation
- Handoff memo refreshed after EmailJS configuration validation
- Hero image render-performance validation
- Handoff memo refreshed after hero image rendering improvement
- Mobile-friendly contact phone input validation
- Handoff memo refreshed after phone input ergonomics improvement
- Dependency-free local preview server
- Handoff memo refreshed after local preview server commit
- README/contribution local preview documentation
- Handoff memo refreshed after local preview workflow documentation
- Local preview HEAD request handling
- Handoff memo refreshed after preview server response handling
- HSTS and clickjacking header coverage
- Handoff memo refreshed after deployment security header update
- Conservative HSTS scope adjustment
- Handoff memo refreshed after HSTS scope adjustment
- Content Security Policy header coverage
- Handoff memo refreshed after CSP header update
- Inline event handler cleanup for checklist print action
- Handoff memo refreshed after inline-handler cleanup
- Optional consultation email field and payload coverage
- Handoff memo refreshed after optional email field update
- Privacy notice email disclosure and effective-date validation
- Handoff memo refreshed after privacy notice update
- Lucide CDN version pinning
- Handoff memo refreshed after Lucide CDN pinning
- EmailJS browser CDN version pinning
- Handoff memo refreshed after EmailJS CDN pinning
- CSP CDN and EmailJS connect allowlist validation
- Handoff memo refreshed after CSP allowlist validation
- CDN script SRI integrity attributes
- Handoff memo refreshed after CDN script integrity update
- Deployed smoke-test CDN integrity validation
- Handoff memo refreshed after deployed CDN integrity validation
- Local preview server security headers
- Handoff memo refreshed after local preview security header update
- Local preview check script
- Handoff memo refreshed after local preview checker update
- GitHub Actions local preview validation
- Handoff memo refreshed after CI preview validation
- Latest local static checks passed after GitHub Actions workflow setup on 2026-06-15.

## Technical Notes

- This is a static site.
- Primary files are `index.html` and `styles/homepage.css`.
- External assets/CDNs currently used:
  - Pretendard font CDN
  - Lucide icons CDN
  - Unsplash hero image
  - Local `social-card.svg` for link previews
- `favicon.svg` is an inline SVG asset committed to the repository.
- Cloudflare Pages settings:
  - Framework preset: `None`
  - Build command: empty
  - Build output directory: `/`
  - Branch: `main`

## Known Limitations

- Browser visual QA has not been completed inside Codex because the in-app browser failed with a Windows sandbox permission issue.
- Contact form attempts EmailJS submission and falls back to a pre-filled email draft. It does not submit to the CRM yet.
- Hero image is loaded from Unsplash; it should be replaced with a controlled asset later if brand consistency or loading reliability matters.

## Next Actions

1. Connect `jjun96750/grantlabs-homepage-new` to a new Cloudflare Pages project.
2. Confirm the deployed preview URL.
3. Record deployment URLs in `DEPLOYMENT_ENVIRONMENTS.md`.
4. Run desktop and mobile visual QA using `QA_CHECKLIST.md`.
5. Run `npm run check` before future commits.
6. Run `npm run serve` and `npm run preview:check` for local preview checks.
7. Run `npm run smoke -- <preview-url>` after Cloudflare Pages deployment.
8. Verify EmailJS delivery in production preview and decide whether to later connect Cloudflare Workers, Google Sheets, or the existing CRM.
9. Replace or approve the hero image.
10. Review FAQ wording with actual sales/support language.
11. Continue edits only in this repository.

## Change Log

### 2026-06-22

- Rebuilt `scripts/generate-platform-ready-copy.mjs` so Naver Blog copy has readable section breaks and a visible raw URL CTA, while Instagram/TikTok/YouTube/Facebook/LinkedIn copy follows each channel's link behavior.
- Strengthened `scripts/check-content-automation.mjs` to reject likely mojibake markers in campaign inputs and generated content automation outputs.
- Strengthened `scripts/check-content-automation.mjs` to enforce raw checklist URLs in Naver Blog caption sections.
- Added `scripts/generate-performance-log.mjs`, `npm run content:performance`, and `content-automation/PERFORMANCE_LOG.md`.
- Added `scripts/generate-tracked-links.mjs`, `npm run content:links`, and `content-automation/TRACKED_LINKS.md` / `.csv`.
- Added `scripts/generate-platform-playbook.mjs`, `npm run content:playbook`, and `content-automation/PLATFORM_PLAYBOOK.md`.
- Added `scripts/generate-daily-brief.mjs`, `npm run content:brief`, and `content-automation/DAILY_BRIEF.md`.
- Refreshed sitemap, deployment readiness, today actions, upcoming actions, and content automation outputs for the current Asia/Seoul date.

### 2026-06-21

- Added `scripts/generate-sitemap.mjs` and `npm run sitemap:refresh`.
- Updated `scripts/generate-deployment-readiness.mjs`, `scripts/generate-development-journal.mjs`, and `scripts/generate-status-index.mjs` to use runtime Asia/Seoul generation dates.
- Extended `.github/workflows/static-site-check.yml` to regenerate `sitemap.xml` and reject stale sitemap output.
- Updated `scripts/check-static-site.mjs` to validate current sitemap lastmod values from the runtime Asia/Seoul date.
- Added `content-automation/campaigns/consultation-checklist-conversion.json`.
- Added `scripts/generate-publishing-calendar.mjs`, `npm run content:calendar`, `content-automation/PUBLISHING_CALENDAR.md`, and `content-automation/PUBLISHING_CALENDAR.csv`.
- Added `scripts/generate-today-actions.mjs`, `npm run content:today`, and `content-automation/TODAY_ACTIONS.md`.
- Extended today's action handoff with direct source-file links for campaign plan, asset brief, caption pack, queue, and CSV files.
- Extended today's action handoff with platform execution notes and a reporting log for published URL, first-signal, and follow-up tracking.
- Added `scripts/generate-upcoming-actions.mjs`, `npm run content:upcoming`, and `content-automation/UPCOMING_ACTIONS.md`.

### 2026-06-20

- Added `content-automation/campaigns/certification-patent-funding-sequence.json`.
- Generated the June 20 content plan, asset briefs, caption pack, and publishing queue outputs.
- Added `content-automation/README.md` for campaign workflow and active campaign status.
- Updated `scripts/check-static-site.mjs` to dynamically scan campaign inputs and expected output files.
- Added `scripts/run-all-content-automation.mjs` and `npm run content:run:all`.
- Updated `COMMANDS.md`, `README.md`, and `content-automation/README.md` with the all-campaign workflow.
- Added `scripts/generate-content-status.mjs`, `npm run content:status`, and `content-automation/CAMPAIGN_STATUS.md`.
- Updated static validation so the campaign status table stays present and useful for handoff.
- Extended `.github/workflows/static-site-check.yml` to run `npm run content:run:all`, reject uncommitted content automation drift, and run `npm run check:content`.
- Added `scripts/generate-deployment-readiness.mjs`, `npm run deployment:readiness`, and `DEPLOYMENT_READINESS.md`.
- Updated static validation so the deployment readiness report stays present and useful for handoff.
- Extended `.github/workflows/static-site-check.yml` to regenerate `DEPLOYMENT_READINESS.md` and reject stale readiness reports.
- Added `scripts/generate-status-index.mjs`, `npm run status:index`, and `STATUS_INDEX.md`.
- Extended `.github/workflows/static-site-check.yml` to regenerate `STATUS_INDEX.md` and reject stale status index reports.
- Added `scripts/generate-development-journal.mjs`, `npm run status:journal`, and `DEVELOPMENT_JOURNAL.md`.
- Extended `.github/workflows/static-site-check.yml` to regenerate `DEVELOPMENT_JOURNAL.md` and reject stale development journal reports.
- Added Grant Labs logo SVG assets under `assets/brand/`.
- Replaced text-based brand marks with logo wordmarks in the homepage header/footer, 404 page, privacy page, and checklist page.
- Extended static validation and `_headers` cache rules for brand logo assets.
- Updated `social-card.svg` to align with the logo wordmark treatment.
- Extended `scripts/check-local-preview.mjs` and `scripts/check-deployed-site.mjs` to request brand logo SVG assets directly.
- Added the canonical Grant Labs logo URL to `ProfessionalService` JSON-LD and static validation.
- Expanded `site.webmanifest` with app id, scope, locale, categories, maskable icon purpose, and consultation/checklist shortcuts.
- Added Open Graph and Twitter image alt metadata for social-card accessibility.

### 2026-06-19

- Added `content-automation/campaigns/rnd-center-funding-bridge.json`.
- Generated the June 19 content plan, asset briefs, caption pack, and publishing queue outputs.
- Updated `scripts/check-content-automation.mjs` to validate all campaign inputs and all generated outputs dynamically.
- Updated static required-file coverage for the June 19 campaign output set.

### 2026-06-16

- Refreshed sitemap lastmod values and static validation for the new development day.
- Fixed duplicated numbering in the development next-steps list.
- Refreshed `CLAUDE_HANDOFF.md` with the latest June 16 sitemap date commit.
- Updated deployment and QA docs to use `npm run check`, `npm run preview:check`, and `npm run smoke`.
- Refreshed `CLAUDE_HANDOFF.md` with the latest deployment command standardization commit.
- Updated README and contribution guidance with the local preview check command.
- Refreshed `CLAUDE_HANDOFF.md` with the latest local preview command documentation commit.
- Extended local preview checks to verify CDN script integrity markers.
- Refreshed `CLAUDE_HANDOFF.md` with the latest local CDN integrity validation commit.
- Removed legacy `node scripts/...` commands from deployment tracking and next-action guidance.
- Refreshed `CLAUDE_HANDOFF.md` with the latest legacy command cleanup commit.

### 2026-06-15

- Added `social-card.svg` as a repository-owned social sharing image.
- Connected homepage, privacy page, and checklist page Open Graph/Twitter metadata to the local social card.
- Extended the static validation script to require the social card and subpage image metadata.
- Tightened checklist print styles and added print QA items.
- Added `scripts/check-deployed-site.mjs` for Cloudflare Pages preview smoke testing.
- Added a hidden contact-form honeypot field and static validation coverage.
- Expanded Cloudflare `_headers` cache policies and updated sitemap lastmod values to 2026-06-15.
- Added contact form `aria-describedby` wiring and QA coverage.
- Updated `CLAUDE_HANDOFF.md` with the current pushed state and deployment validation flow.
- Added a `noscript` contact fallback and static validation coverage.
- Extended deployed smoke tests to assert security and cache response headers.
- Updated README and Cloudflare setup guidance for current validation flow.
- Expanded `DEPLOYMENT_ENVIRONMENTS.md` with preview verification fields and static validation coverage.
- Added a follow-up consultation CTA to the checklist page.
- Updated the privacy notice with contact-form protection and no-JavaScript fallback details.
- Added accessible checkbox labels to the checklist page.
- Extended deployed smoke tests with a real missing-route 404 validation.
- Added pass summary output to the deployed smoke test for deployment records.
- Added README and Cloudflare setup guide marker checks to static validation.
- Added EmailJS and fallback contact configuration to deployment tracking.
- Added page URL and submission timestamp metadata to contact form submissions.
- Removed `privacy.html` from sitemap because it is marked `noindex`.
- Extended deployed smoke tests to verify sitemap excludes `privacy.html`.
- Extended static validation to check core metadata on every HTML page.
- Added static validation for canonical, Open Graph, and Twitter metadata on indexable pages.
- Refreshed `CLAUDE_HANDOFF.md` with current commit and deployment validation scope.
- Added static validation for local `href` and `src` targets across HTML pages.
- Refreshed `CLAUDE_HANDOFF.md` with the latest pushed commit and local target validation scope.
- Added deployed smoke-test `Content-Type` checks and local validation coverage.
- Added `.github/workflows/static-site-check.yml` for automated static validation on GitHub.
- Refreshed `CLAUDE_HANDOFF.md` with the latest workflow commit.
- Added `_redirects` so unknown Cloudflare Pages routes serve `404.html` with a 404 status.
- Refreshed `CLAUDE_HANDOFF.md` with the latest `_redirects` commit.
- Added static validation for external `target="_blank"` links to require `rel="noopener"`.
- Refreshed `CLAUDE_HANDOFF.md` with the latest external-link validation commit.
- Added static validation for cross-page local hash targets.
- Refreshed `CLAUDE_HANDOFF.md` with the latest hash-link validation commit.
- Added static validation for robots, sitemap, and canonical URL consistency.
- Refreshed `CLAUDE_HANDOFF.md` with the latest SEO URL validation commit.
- Added static validation for favicon and social-card SVG asset metadata.
- Refreshed `CLAUDE_HANDOFF.md` with the latest SVG asset validation commit.
- Added proprietary `LICENSE` file and static validation coverage.
- Refreshed `CLAUDE_HANDOFF.md` with the latest license commit.
- Added `.editorconfig` and static validation coverage for editor consistency.
- Refreshed `CLAUDE_HANDOFF.md` with the latest editor config commit.
- Added `package.json` scripts for local static and deployed smoke validation.
- Refreshed `CLAUDE_HANDOFF.md` with the latest package script commit.
- Added `COMMANDS.md` with standard validation commands.
- Refreshed `CLAUDE_HANDOFF.md` with the latest command guide commit.
- Added `.nvmrc` and static validation coverage for Node version consistency.
- Refreshed `CLAUDE_HANDOFF.md` with the latest Node version pin commit.
- Expanded `.gitignore` for deployment/build artifacts and added static validation coverage.
- Refreshed `CLAUDE_HANDOFF.md` with the latest ignored-artifacts commit.
- Added `SECURITY.md` with vulnerability and deployment-issue reporting guidance.
- Refreshed `CLAUDE_HANDOFF.md` with the latest security policy commit.
- Added `CONTRIBUTING.md` with repository scope, validation, and documentation rules.
- Refreshed `CLAUDE_HANDOFF.md` with the latest contribution guide commit.
- Added GitHub issue templates for bugs, content updates, and deployment checks.
- Refreshed `CLAUDE_HANDOFF.md` with the latest issue-template commit.
- Added GitHub pull request template with validation and deployment-safety checklist.
- Refreshed `CLAUDE_HANDOFF.md` with the latest pull-request-template commit.
- Added GitHub `CODEOWNERS` for repository, deployment, and automation files.
- Refreshed `CLAUDE_HANDOFF.md` with the latest CODEOWNERS commit.
- Added static validation for duplicate HTML `id` values.
- Refreshed `CLAUDE_HANDOFF.md` with the latest duplicate-id validation commit.
- Added static validation for required contact form fields, privacy consent, and autocomplete hints.
- Refreshed `CLAUDE_HANDOFF.md` with the latest contact-form validation commit.
- Added static validation for canonical contact email and phone consistency.
- Refreshed `CLAUDE_HANDOFF.md` with the latest contact consistency validation commit.
- Added static validation for EmailJS public key, service ID, and template ID consistency.
- Refreshed `CLAUDE_HANDOFF.md` with the latest EmailJS configuration validation commit.
- Added explicit hero image dimensions, async decoding, fetch priority, and static validation coverage.
- Refreshed `CLAUDE_HANDOFF.md` with the latest hero image rendering commit.
- Added mobile-friendly phone input constraints and static validation coverage.
- Refreshed `CLAUDE_HANDOFF.md` with the latest phone input ergonomics commit.
- Added `scripts/serve-static.mjs`, `npm run serve`, command docs, and static validation coverage.
- Refreshed `CLAUDE_HANDOFF.md` with the latest local preview server commit.
- Documented `npm run serve` in `README.md` and `CONTRIBUTING.md`.
- Refreshed `CLAUDE_HANDOFF.md` with the latest local preview workflow commit.
- Tightened local preview server `HEAD` request handling and static validation coverage.
- Refreshed `CLAUDE_HANDOFF.md` with the latest preview server response commit.
- Added HSTS and `X-Frame-Options` headers plus deployed smoke-test assertions.
- Refreshed `CLAUDE_HANDOFF.md` with the latest deployment security header commit.
- Scoped HSTS to the current host by removing subdomain preload directives.
- Refreshed `CLAUDE_HANDOFF.md` with the latest HSTS scope commit.
- Added a Content Security Policy header and deployed smoke-test assertions.
- Refreshed `CLAUDE_HANDOFF.md` with the latest CSP commit.
- Removed the checklist inline print handler and added static validation coverage for inline event handlers.
- Refreshed `CLAUDE_HANDOFF.md` with the latest inline-handler cleanup commit.
- Added optional email capture to the consultation form and static validation coverage.
- Refreshed `CLAUDE_HANDOFF.md` with the latest optional email field commit.
- Updated `privacy.html` for optional email collection and current effective date.
- Refreshed `CLAUDE_HANDOFF.md` with the latest privacy notice commit.
- Pinned the Lucide CDN dependency to version 1.18.0 and added static validation coverage.
- Refreshed `CLAUDE_HANDOFF.md` with the latest Lucide pinning commit.
- Pinned the EmailJS browser CDN dependency to version 4.4.1 and added static validation coverage.
- Refreshed `CLAUDE_HANDOFF.md` with the latest EmailJS CDN pinning commit.
- Added stricter static validation for CSP script and EmailJS connect allowlists.
- Refreshed `CLAUDE_HANDOFF.md` with the latest CSP allowlist validation commit.
- Added SRI integrity attributes for pinned Lucide and EmailJS CDN scripts.
- Refreshed `CLAUDE_HANDOFF.md` with the latest CDN script integrity commit.
- Extended deployed smoke checks to verify CDN script integrity markers.
- Refreshed `CLAUDE_HANDOFF.md` with the latest deployed CDN integrity validation commit.
- Added Cloudflare-like security headers to the local preview server and static validation coverage.
- Refreshed `CLAUDE_HANDOFF.md` with the latest local preview security header commit.
- Added `scripts/check-local-preview.mjs`, `npm run preview:check`, and command documentation.
- Refreshed `CLAUDE_HANDOFF.md` with the latest local preview checker commit.
- Extended GitHub Actions to run the local preview validation.
- Refreshed `CLAUDE_HANDOFF.md` with the latest CI preview validation commit.

### 2026-06-14

- Created a new isolated project folder: `grantlabs-homepage-new`.
- Built the first static homepage draft.
- Added README with deployment instructions.
- Added `CLAUDE_HANDOFF.md` for Claude handoff.
- Created GitHub repository: `https://github.com/jjun96750/grantlabs-homepage-new`.
- Added `origin` remote and pushed `main`.
- Added this development status document so future collaborators can resume quickly.
- Added favicon, manifest, robots, sitemap, and Cloudflare `_headers`.
- Improved consultation form with privacy consent and pre-filled email draft behavior.
- Upgraded consultation form to try EmailJS first and fall back to email draft.
- Added a static 404 page for Cloudflare Pages fallback handling.
- Added FAQ section and FAQPage structured data.
- Added consultation readiness-check section.
- Added `.gitattributes` for consistent text file handling.
- Added `CLOUDFLARE_PAGES_SETUP.md` and `QA_CHECKLIST.md`.
- Added `scripts/check-static-site.mjs` for repeatable static validation.
- Added `privacy.html` and linked it from the form consent text and footer.
- Added accessibility improvements for keyboard navigation and reduced-motion users.
- Added mobile navigation toggle and mobile menu.
- Added consultation deliverables section.
- Added mobile quick-contact bar.
- Added printable consultation checklist page.
- Added interactive readiness self-check section.
- Added checklist page progress counter.
- Added service-fit table.
- Added preconnect hints for external assets.
- Added consultation promise section.
- Added `DEPLOYMENT_ENVIRONMENTS.md` for deployment URL and domain tracking.
- Added `CHANGELOG.md`.
- Added canonical, Open Graph, Twitter card, and manifest links to subpages.
- Added `ROLLBACK_PLAN.md`.
