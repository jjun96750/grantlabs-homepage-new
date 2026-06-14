# Development Status

Last updated: 2026-06-14

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
- Contact form now opens a pre-filled email draft instead of relying on raw `mailto:` form submission.
- FAQ section and FAQPage structured data added.
- Readiness-check section added to help visitors prepare for consultation.
- Privacy notice page added and linked from the consultation form and footer.
- No build step is required.

## Current Files

```text
index.html
privacy.html
styles/homepage.css
README.md
CLAUDE_HANDOFF.md
DEVELOPMENT_STATUS.md
.gitignore
.nojekyll
favicon.svg
site.webmanifest
robots.txt
sitemap.xml
_headers
404.html
.gitattributes
CLOUDFLARE_PAGES_SETUP.md
QA_CHECKLIST.md
scripts/check-static-site.mjs
```

## Implemented Homepage Sections

- Fixed header navigation
- Hero section with real business meeting image
- Readiness-check section
- Service overview
- Process/method section
- Focus-area section
- FAQ section
- Contact section with phone, email, address, and pre-filled email draft form
- Privacy consent checkbox for consultation inquiries
- Privacy notice page
- SEO meta tags and structured data
- FAQPage JSON-LD structured data
- Favicon and web manifest
- Robots and sitemap files
- Cloudflare Pages `_headers` security/cache hints
- Simple static 404 page
- Cloudflare Pages setup checklist
- Deployment QA checklist
- Local static-site validation script
- Latest static validation: `node scripts/check-static-site.mjs` passed after privacy-page updates on 2026-06-14.

## Technical Notes

- This is a static site.
- Primary files are `index.html` and `styles/homepage.css`.
- External assets/CDNs currently used:
  - Pretendard font CDN
  - Lucide icons CDN
  - Unsplash hero image
- `favicon.svg` is an inline SVG asset committed to the repository.
- Cloudflare Pages settings:
  - Framework preset: `None`
  - Build command: empty
  - Build output directory: `/`
  - Branch: `main`

## Known Limitations

- Browser visual QA has not been completed inside Codex because the in-app browser failed with a Windows sandbox permission issue.
- Contact form opens a pre-filled email draft. It does not submit to a backend or CRM yet.
- Hero image is loaded from Unsplash; it should be replaced with a controlled asset later if brand consistency or loading reliability matters.

## Next Actions

1. Connect `jjun96750/grantlabs-homepage-new` to a new Cloudflare Pages project.
2. Confirm the deployed preview URL.
3. Run desktop and mobile visual QA using `QA_CHECKLIST.md`.
4. Run `node scripts/check-static-site.mjs` before future commits when Node.js is available.
5. Decide whether to keep email-draft submission or connect the form to EmailJS, Cloudflare Workers, Google Sheets, or the existing CRM.
6. Replace or approve the hero image.
7. Review FAQ wording with actual sales/support language.
8. Continue edits only in this repository.

## Change Log

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
- Added a static 404 page for Cloudflare Pages fallback handling.
- Added FAQ section and FAQPage structured data.
- Added consultation readiness-check section.
- Added `.gitattributes` for consistent text file handling.
- Added `CLOUDFLARE_PAGES_SETUP.md` and `QA_CHECKLIST.md`.
- Added `scripts/check-static-site.mjs` for repeatable static validation.
- Added `privacy.html` and linked it from the form consent text and footer.
