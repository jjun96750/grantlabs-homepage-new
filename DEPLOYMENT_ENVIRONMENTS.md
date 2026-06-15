# Deployment Environments

Keep this file updated whenever Cloudflare Pages deployment URLs or domain settings change.

## GitHub

```text
Repository: https://github.com/jjun96750/grantlabs-homepage-new
Branch: main
```

## Cloudflare Pages

```text
Project name: TBD
Preview URL: TBD
Production URL: TBD
Custom domain: TBD
Connected branch: main
Build command: none
Output directory: /
```

## Preview Verification

Record each preview deployment before any production-domain decision.

```text
Preview URL:
Commit SHA:
Checked by:
Checked at:
Static check: pending
Local preview check: pending
Deployed smoke check: pending
Smoke check summary: pending
Content-Type check: pending
Desktop visual QA: pending
Mobile visual QA: pending
EmailJS test: pending
Email fallback test: pending
DNS unchanged: yes
```

Required commands:

```bash
node scripts/check-static-site.mjs
npm run check
npm run serve
npm run preview:check
npm run smoke -- <preview-url>
```

## Contact Form Configuration

The homepage currently uses EmailJS first and falls back to a pre-filled email draft.

```text
EmailJS public key: UUfoZdh404On9fZbm
EmailJS service ID: service_tcj8otx
EmailJS template ID: template_8ne6kj3
Fallback email: jjun96750@gmail.com
Fallback phone: 010-5963-7624
```

Before approving a preview, submit one test inquiry and confirm:

- EmailJS delivery arrives at the expected inbox.
- EmailJS message includes `page_url` and `submitted_at`.
- The form resets and shows the success message after EmailJS delivery.
- If EmailJS is blocked or fails, the pre-filled email draft opens.
- With JavaScript disabled, the phone/email fallback guidance is visible.

## DNS / Domain Notes

- Existing production site must not be changed until a separate cutover is approved.
- Keep any preview or staging URL here before connecting a custom domain.
- If `grantlabs.co.kr` is moved later, record the exact date, DNS records, and rollback plan here.

## Deployment Log

### 2026-06-15

- Repository remains connected only to GitHub; Cloudflare Pages preview URL is still TBD.
- Added preview verification template for smoke tests, visual QA, EmailJS testing, and DNS safety tracking.
- Standard commands now include local preview validation before deployed smoke tests.

### 2026-06-14

- New repository prepared and pushed.
- Cloudflare Pages project not connected yet.
