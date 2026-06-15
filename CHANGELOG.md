# Changelog

All notable changes to the Grant Labs new homepage are documented here.

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
