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

4. Review the generated files under `content-automation/output/`.
5. Run quality checks:

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

## Generated Output Set

Each campaign should have five generated files:

- Content plan: `<date>-<slug>.md`
- Asset briefs: `<date>-<slug>-asset-briefs.md`
- Caption pack: `<date>-<slug>-caption-pack.md`
- Publishing queue CSV: `<date>-<slug>-publishing-queue.csv`
- Publishing queue summary: `<date>-<slug>-publishing-queue.md`

Both `npm run check:content` and `npm run check` scan the campaign files and verify the expected output set.
