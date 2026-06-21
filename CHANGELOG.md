# Changelog

All notable changes to the Grant Labs new homepage are documented here.

## 2026-06-22

- Added `npm run content:performance` and `content-automation/PERFORMANCE_LOG.md` for post URL, metric, learning, and repurpose tracking.
- Added `npm run content:brief` and `content-automation/DAILY_BRIEF.md` for a single daily operator summary.
- Refreshed sitemap, deployment readiness, today actions, upcoming actions, and content automation outputs for the current Asia/Seoul date.

## 2026-06-21

- Added `npm run sitemap:refresh` and `scripts/generate-sitemap.mjs` to regenerate sitemap lastmod values from the current Asia/Seoul date.
- Updated generated status/readiness/journal scripts to use runtime Asia/Seoul dates instead of hardcoded generation dates.
- Extended GitHub Actions and static validation to reject stale sitemap output.
- Added a consultation-checklist conversion campaign for 2026-06-21.
- Added `npm run content:calendar` and cross-campaign publishing calendar outputs.
- Added `npm run content:today` and `content-automation/TODAY_ACTIONS.md` for same-day publishing handoff.
- Extended `content-automation/TODAY_ACTIONS.md` with direct links to each campaign's plan, asset brief, caption pack, and publishing queue.
- Added platform execution notes and a reporting log to `content-automation/TODAY_ACTIONS.md` so each same-day post can be published, tracked, and handed off by channel.
- Added `npm run content:upcoming` and `content-automation/UPCOMING_ACTIONS.md` for future publishing preparation and blocker tracking.

## 2026-06-20

- Added a new certification, patent, and policy-funding preparation sequence campaign.
- Generated the 2026-06-20 content plan, asset briefs, caption pack, and publishing queue outputs.
- Added `content-automation/README.md` to document the ongoing campaign workflow and active campaign set.
- Updated static validation to scan campaign inputs and generated output sets dynamically instead of maintaining campaign-specific required-file entries.
- Added `npm run content:run:all` to regenerate every content automation campaign in one command.
- Updated command docs and automation docs with the all-campaign regeneration workflow.
- Added `npm run content:status` to generate a collaborator-facing campaign status table.
- Added static validation coverage for `content-automation/CAMPAIGN_STATUS.md`.
- Extended GitHub Actions to regenerate content automation outputs, fail on uncommitted content drift, and run `npm run check:content`.
- Added `npm run deployment:readiness` and `DEPLOYMENT_READINESS.md` for collaborator-facing deployment status.
- Extended GitHub Actions to regenerate `DEPLOYMENT_READINESS.md` and fail on uncommitted readiness drift.
- Added `npm run status:index` and `STATUS_INDEX.md` as a collaborator-facing map of status documents and guardrails.
- Added `npm run status:journal` and `DEVELOPMENT_JOURNAL.md` for commit-based implementation history.
- Extended GitHub Actions to regenerate `DEVELOPMENT_JOURNAL.md` and fail on uncommitted journal drift.
- Added Grant Labs logo SVG assets and applied the wordmark to the header, footer, 404 page, and legal/checklist headers.
- Added static validation and cache policy coverage for the brand logo assets.
- Updated `social-card.svg` to use the Grant Labs wordmark treatment.
- Extended local preview and deployed smoke checks to request brand logo SVG assets directly.
- Added the canonical Grant Labs logo URL to `ProfessionalService` JSON-LD and static validation.
- Expanded `site.webmanifest` with app id, scope, locale, categories, maskable icon purpose, and consultation/checklist shortcuts.
- Added Open Graph and Twitter image alt metadata for social-card accessibility.

## 2026-06-19

- Added a new R&D-center and policy-funding readiness campaign input.
- Generated the 2026-06-19 content plan, asset briefs, caption pack, and publishing queue outputs.
- Extended content automation quality checks to scan every campaign and generated output instead of one fixed sample.
- Extended static validation required-file coverage for the June 19 campaign output set.

## 2026-06-18

- Added a platform-specific content automation rule set for blog, short-form video, and social channels.
- Added a Grant Labs campaign input for policy-funding readiness content.
- Added `npm run content:plan` to generate per-platform posting guidance from the campaign and platform rules.
- Extended static validation to cover the content automation files and generator.
- Generated the first platform-specific content plan for the 2026-06-18 Grant Labs readiness campaign.
- Added Korean platform-specific post starters to the content automation generator.
- Refreshed Claude handoff notes with the latest platform content automation commit.
- Added `npm run content:queue` to generate a platform-specific publishing sequence.
- Added publishing queue defaults with platform objective, asset, timing, and success-signal guidance.
- Generated CSV and Markdown publishing queues for the 2026-06-18 campaign.
- Fixed publishing queue date generation so day-zero posts stay on the campaign date.
- Refreshed Claude handoff notes with the latest publishing queue automation commit.
- Added `npm run content:assets` to generate platform-specific production asset briefs.
- Generated platform-specific asset briefs for the 2026-06-18 campaign.
- Refreshed Claude handoff notes with the latest platform asset brief automation commit.
- Added `npm run content:captions` to generate platform-specific captions, hashtags, and thumbnail text.
- Generated the first platform-specific caption pack for the 2026-06-18 campaign.
- Refreshed Claude handoff notes with the latest platform caption pack automation commit.
- Added `npm run content:run` to regenerate the full content automation pipeline in one command.
- Verified the full content automation runner regenerates all campaign outputs successfully.
- Refreshed Claude handoff notes with the latest full content automation runner commit.
- Added `npm run check:content` to validate content automation outputs for platform coverage, Korean markers, landing page links, and forbidden claims.
- Verified the content automation quality check passes for the current campaign outputs.
- Refreshed Claude handoff notes with the latest content automation quality check commit.

## 2026-06-17

- Extended local preview checks to verify the HSTS response header.
- Extended static validation to keep local preview security-header checks aligned with deployment smoke tests.
- Refreshed Claude handoff notes with the latest local HSTS preview validation commit.
- Clarified the Claude handoff commit pointer so future handoff updates do not create stale latest-commit wording.
- Extended local preview checks to verify HEAD responses for the homepage and stylesheet.
- Refreshed Claude handoff notes with the latest local HEAD validation commit.
- Extended local preview checks to verify `Cache-Control: no-store` on GET and HEAD responses.
- Refreshed Claude handoff notes with the latest local cache-header validation commit.
- Added security and cache headers to local preview 405 responses.
- Extended local preview checks to verify unsupported-method handling.
- Refreshed Claude handoff notes with the latest secured local method-error commit.
- Allowed the approved Pretendard CDN in CSP `style-src` and `font-src`.
- Extended local preview, deployed smoke, and static validation to assert the Pretendard CSP allowlist.
- Refreshed Claude handoff notes with the latest Pretendard CSP commit.
- Added static validation to keep Cloudflare `_headers` CSP and local preview CSP in sync.
- Refreshed Claude handoff notes with the latest CSP synchronization validation commit.
- Expanded static validation to keep all mirrored security headers in sync between Cloudflare `_headers` and the local preview server.
- Refreshed Claude handoff notes with the latest mirrored security-header sync commit.
- Added `.nojekyll` to required static validation files.
- Refreshed Claude handoff notes with the latest `.nojekyll` validation commit.
- Added GitHub Actions timeout and concurrency controls for static-site validation.
- Refreshed Claude handoff notes with the latest workflow hardening commit.
- Added contact form `aria-busy` state updates during submission and fallback handling.
- Refreshed Claude handoff notes with the latest contact form busy-state commit.
- Added Escape-key dismissal for the mobile navigation menu.
- Refreshed Claude handoff notes with the latest mobile menu keyboard handling commit.
- Added outside-click dismissal for the mobile navigation menu.
- Refreshed Claude handoff notes with the latest mobile menu outside-click commit.

## 2026-06-16

- Refreshed sitemap lastmod values and static validation for the new development day.
- Refreshed Claude handoff notes with the latest June 16 sitemap date commit.
- Updated deployment and QA docs to use the standard npm validation commands.
- Refreshed Claude handoff notes with the latest deployment command standardization commit.
- Updated README and contribution guidance with the local preview check command.
- Refreshed Claude handoff notes with the latest local preview command documentation commit.
- Extended local preview checks to verify CDN script integrity markers.
- Refreshed Claude handoff notes with the latest local CDN integrity validation commit.
- Removed legacy `node scripts/...` commands from deployment tracking and next-action guidance.
- Refreshed Claude handoff notes with the latest legacy command cleanup commit.

## 2026-06-15

- Added repository-owned `social-card.svg` for Open Graph and Twitter link previews.
- Connected homepage, privacy, and checklist metadata to the local social sharing card.
- Extended the static validation script to check social-card coverage.
- Improved checklist print styles and added print QA coverage.
- Added a deployed-site smoke test script for Cloudflare Pages preview URLs.
- Added a contact-form honeypot to reduce automated spam submissions.
- Expanded Cloudflare `_headers` cache policies and refreshed sitemap lastmod values.
- Added contact-form accessibility description wiring for status/help text.
- Updated Claude handoff notes with current pushed state and deployment validation flow.
- Added a no-JavaScript contact fallback in the consultation form.
- Extended deployed smoke tests to verify security and cache response headers.
- Updated README and Cloudflare setup guidance for current validation scripts.
- Expanded deployment environment tracking with preview verification fields.
- Added a follow-up consultation CTA to the checklist page.
- Updated privacy notice with contact-form protection and no-JavaScript fallback details.
- Added accessible checkbox labels to the checklist page.
- Extended deployed smoke tests with missing-route 404 validation.
- Added pass summary output to deployed smoke tests for deployment records.
- Added README and Cloudflare setup guide marker checks to static validation.
- Added EmailJS and fallback contact configuration to deployment tracking.
- Added page URL and submission timestamp metadata to contact form submissions.
- Removed the noindex privacy page from the sitemap.
- Extended deployed smoke tests to verify sitemap excludes `privacy.html`.
- Extended static validation to check core metadata on every HTML page.
- Added static validation for canonical, Open Graph, and Twitter metadata on indexable pages.
- Refreshed Claude handoff notes with current commit and deployment validation scope.
- Added static validation for local `href` and `src` targets across HTML pages.
- Refreshed Claude handoff notes with the latest pushed commit and local target validation scope.
- Added deployed smoke-test `Content-Type` checks and local validation coverage.
- Added a GitHub Actions workflow to run static validation on pushes and pull requests.
- Refreshed Claude handoff notes with the latest workflow commit.
- Added Cloudflare Pages `_redirects` fallback for unknown routes.
- Refreshed Claude handoff notes with the latest `_redirects` commit.
- Added static validation for external `target="_blank"` link safety.
- Refreshed Claude handoff notes with the latest external-link validation commit.
- Added static validation for cross-page local hash targets.
- Refreshed Claude handoff notes with the latest hash-link validation commit.
- Added static validation for robots, sitemap, and canonical URL consistency.
- Refreshed Claude handoff notes with the latest SEO URL validation commit.
- Added static validation for favicon and social-card SVG asset metadata.
- Refreshed Claude handoff notes with the latest SVG asset validation commit.
- Added a proprietary `LICENSE` file and static validation coverage.
- Refreshed Claude handoff notes with the latest license commit.
- Added `.editorconfig` and static validation coverage for editor consistency.
- Refreshed Claude handoff notes with the latest editor config commit.
- Added `package.json` scripts for local static and deployed smoke validation.
- Refreshed Claude handoff notes with the latest package script commit.
- Added `COMMANDS.md` with standard validation commands.
- Refreshed Claude handoff notes with the latest command guide commit.
- Added `.nvmrc` and static validation coverage for Node version consistency.
- Refreshed Claude handoff notes with the latest Node version pin commit.
- Expanded `.gitignore` for deployment/build artifacts and added static validation coverage.
- Refreshed Claude handoff notes with the latest ignored-artifacts commit.
- Added `SECURITY.md` with vulnerability and deployment-issue reporting guidance.
- Refreshed Claude handoff notes with the latest security policy commit.
- Added `CONTRIBUTING.md` with repository scope, validation, and documentation rules.
- Refreshed Claude handoff notes with the latest contribution guide commit.
- Added GitHub issue templates for bugs, content updates, and deployment checks.
- Refreshed Claude handoff notes with the latest issue-template commit.
- Added GitHub pull request template with validation and deployment-safety checklist.
- Refreshed Claude handoff notes with the latest pull-request-template commit.
- Added GitHub `CODEOWNERS` for repository, deployment, and automation files.
- Refreshed Claude handoff notes with the latest CODEOWNERS commit.
- Added static validation for duplicate HTML `id` values.
- Refreshed Claude handoff notes with the latest duplicate-id validation commit.
- Added static validation for required contact form fields, privacy consent, and autocomplete hints.
- Refreshed Claude handoff notes with the latest contact-form validation commit.
- Added static validation for canonical contact email and phone consistency.
- Refreshed Claude handoff notes with the latest contact consistency validation commit.
- Added static validation for EmailJS public key, service ID, and template ID consistency.
- Refreshed Claude handoff notes with the latest EmailJS configuration validation commit.
- Added hero image render-performance attributes and static validation coverage.
- Refreshed Claude handoff notes with the latest hero image rendering commit.
- Added mobile-friendly phone input constraints and static validation coverage.
- Refreshed Claude handoff notes with the latest phone input ergonomics commit.
- Added a dependency-free local preview server and command documentation.
- Refreshed Claude handoff notes with the latest local preview server commit.
- Documented local preview usage in README and contribution guidance.
- Refreshed Claude handoff notes with the latest local preview workflow commit.
- Tightened local preview server handling for HEAD requests.
- Refreshed Claude handoff notes with the latest preview server response commit.
- Added HSTS and clickjacking protection headers with deployed smoke-test coverage.
- Refreshed Claude handoff notes with the latest deployment security header commit.
- Scoped HSTS to the current host by removing subdomain preload directives.
- Refreshed Claude handoff notes with the latest HSTS scope commit.
- Added a Content Security Policy header and deployed smoke-test coverage.
- Refreshed Claude handoff notes with the latest CSP commit.
- Removed the checklist inline print handler and added static validation for inline event handlers.
- Refreshed Claude handoff notes with the latest inline-handler cleanup commit.
- Added optional email capture to the consultation form and validation coverage.
- Refreshed Claude handoff notes with the latest optional email field commit.
- Updated privacy notice for optional email collection and current effective date.
- Refreshed Claude handoff notes with the latest privacy notice commit.
- Pinned the Lucide CDN dependency to version 1.18.0 and added validation coverage.
- Refreshed Claude handoff notes with the latest Lucide pinning commit.
- Pinned the EmailJS browser CDN dependency to version 4.4.1 and added validation coverage.
- Refreshed Claude handoff notes with the latest EmailJS CDN pinning commit.
- Added stricter static validation for CSP script and EmailJS connect allowlists.
- Refreshed Claude handoff notes with the latest CSP allowlist validation commit.
- Added SRI integrity attributes for pinned Lucide and EmailJS CDN scripts.
- Refreshed Claude handoff notes with the latest CDN script integrity commit.
- Extended deployed smoke checks to verify CDN script integrity markers.
- Refreshed Claude handoff notes with the latest deployed CDN integrity validation commit.
- Added Cloudflare-like security headers to the local preview server.
- Refreshed Claude handoff notes with the latest local preview security header commit.
- Added a repeatable local preview check script and command documentation.
- Refreshed Claude handoff notes with the latest local preview checker commit.
- Extended GitHub Actions to run the local preview validation.
- Refreshed Claude handoff notes with the latest CI preview validation commit.

## 2026-06-14

- Created isolated `grantlabs-homepage-new` repository.
- Built static homepage with hero, services, method, focus areas, FAQ, and contact sections.
- Added mobile navigation and mobile quick-contact bar.
- Added EmailJS lead submission with email-draft fallback.
- Added privacy notice page and printable consultation checklist page.
- Added interactive homepage readiness self-check and checklist progress tracking.
- Added service-fit table and consultation promise section.
- Added Cloudflare Pages setup guide, QA checklist, deployment environment tracker, and Claude handoff notes.
- Added favicon, web manifest, robots, sitemap, `_headers`, and 404 page.
- Added static validation script.
