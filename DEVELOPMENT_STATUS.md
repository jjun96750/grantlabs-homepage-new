# Development Status

Last updated: 2026-06-15

## Project

- Repository: `https://github.com/jjun96750/grantlabs-homepage-new`
- Purpose: Grant Labs 신규 홈페이지 독립 개발
- Production safety rule: 기존 `grantlabs-website` 저장소와 기존 운영 사이트는 수정하지 않음
- Deployment target: 새 Cloudflare Pages 프로젝트
- Main branch: `main`

## Current Status

- GitHub repository created.
- Local repository initialized.
- Static homepage draft completed.
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
- No build step is required.

## Current Files

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
.github/workflows/static-site-check.yml
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/content_update.md
.github/ISSUE_TEMPLATE/deployment_check.md
.github/PULL_REQUEST_TEMPLATE.md
.github/CODEOWNERS
DEPLOYMENT_ENVIRONMENTS.md
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
5. Run `node scripts/check-static-site.mjs` before future commits when Node.js is available.
6. Run `npm run serve` for local preview checks.
7. Run `node scripts/check-deployed-site.mjs <preview-url>` after Cloudflare Pages deployment.
7. Verify EmailJS delivery in production preview and decide whether to later connect Cloudflare Workers, Google Sheets, or the existing CRM.
8. Replace or approve the hero image.
9. Review FAQ wording with actual sales/support language.
10. Continue edits only in this repository.

## Change Log

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
