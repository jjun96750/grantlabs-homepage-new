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
- No build step is required.

## Current Files

```text
index.html
privacy.html
checklist.html
styles/homepage.css
README.md
CLAUDE_HANDOFF.md
DEVELOPMENT_STATUS.md
.gitignore
.nojekyll
favicon.svg
social-card.svg
site.webmanifest
robots.txt
sitemap.xml
_headers
404.html
.gitattributes
CLOUDFLARE_PAGES_SETUP.md
QA_CHECKLIST.md
scripts/check-static-site.mjs
scripts/check-deployed-site.mjs
DEPLOYMENT_ENVIRONMENTS.md
ROLLBACK_PLAN.md
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
- Latest local static checks passed after deployed smoke-test pass summary updates on 2026-06-15.

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
6. Run `node scripts/check-deployed-site.mjs <preview-url>` after Cloudflare Pages deployment.
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
