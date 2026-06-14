# QA Checklist

Run this checklist after each Cloudflare Pages preview deployment.

## Desktop

- Header logo and navigation are visible.
- Hero image loads and text remains readable.
- Primary CTA scrolls to the contact section.
- Service cards align in a 3-column grid.
- Readiness-check section does not wrap awkwardly.
- FAQ items open and close correctly.
- Contact form requires name, phone, and privacy consent.
- Privacy notice link opens `privacy.html`.
- Contact form submits through EmailJS or falls back to an email draft.
- Footer appears at the bottom with readable contrast.

## Mobile

- Header does not overlap hero text.
- Mobile menu button opens and closes the navigation.
- Mobile menu links close the menu after tapping.
- Bottom quick-contact bar shows phone and consultation actions.
- Consultation checklist link opens `checklist.html`.
- Self-check checkboxes update the displayed readiness result.
- Service-fit table is readable on desktop and stacks on mobile.
- Consultation promise cards are readable and do not overflow.
- CTA button remains tappable.
- Service cards stack into one column.
- Readiness-check items stack into one column.
- FAQ text does not overflow.
- Contact inputs fit within the viewport.
- No horizontal scrolling.

## Static Files

- `/favicon.svg` loads.
- `/robots.txt` loads.
- `/sitemap.xml` loads.
- `/404.html` displays a styled not-found page.
- `/privacy.html` displays the privacy notice page.
- `/checklist.html` displays the printable consultation checklist page.
- Checklist page updates the checked-item count when boxes are selected.

## Notes

- In-app browser visual QA was blocked in Codex by a Windows sandbox permission issue, so this checklist should be completed in a normal browser after deployment.
