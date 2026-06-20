# Grant Labs Content Automation

This folder keeps campaign inputs and generated posting assets for Grant Labs homepage-driven marketing.

## Workflow

1. Add a campaign JSON file under `content-automation/campaigns/`.
2. Run the full generator with the campaign path:

```bash
npm run content:run -- content-automation/campaigns/example-campaign.json
```

3. Or regenerate every campaign at once:

```bash
npm run content:run:all
```

4. Regenerate the collaborator-facing campaign status table when needed:

```bash
npm run content:status
```

5. Regenerate the cross-campaign publishing calendar when needed:

```bash
npm run content:calendar
```

6. Review the generated files under `content-automation/output/`, `content-automation/CAMPAIGN_STATUS.md`, and `content-automation/PUBLISHING_CALENDAR.md`.
7. Run quality checks:

```bash
npm run check:content
npm run check
```

## Active Campaigns

| Date | Campaign | Focus |
| --- | --- | --- |
| 2026-06-18 | `grantlabs-growth-check` | Policy-funding readiness and consultation checklist |
| 2026-06-19 | `rnd-center-funding-bridge` | R&D center evidence and policy-funding sequence |
| 2026-06-20 | `certification-patent-funding-sequence` | Certification, patent, and policy-funding preparation order |
| 2026-06-21 | `consultation-checklist-conversion` | Consultation checklist to diagnostic call conversion |

## Generated Output Set

Each campaign should have five generated files:

- Content plan: `<date>-<slug>.md`
- Asset briefs: `<date>-<slug>-asset-briefs.md`
- Caption pack: `<date>-<slug>-caption-pack.md`
- Publishing queue CSV: `<date>-<slug>-publishing-queue.csv`
- Publishing queue summary: `<date>-<slug>-publishing-queue.md`

Both `npm run check:content` and `npm run check` scan the campaign files and verify the expected output set. `npm run content:run:all` also refreshes `content-automation/CAMPAIGN_STATUS.md`.

## Cross-Campaign Calendar

- `content-automation/PUBLISHING_CALENDAR.md`
- `content-automation/PUBLISHING_CALENDAR.csv`

These files combine every campaign publishing queue into one operations calendar. `npm run content:run:all` refreshes them automatically, and `npm run content:calendar` refreshes only the calendar.

## Today Actions

- `content-automation/TODAY_ACTIONS.md`

This file filters the cross-campaign calendar to the current Asia/Seoul date. `npm run content:run:all` refreshes it automatically, and `npm run content:today` refreshes only today's action list.
