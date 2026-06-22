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
7. Generate platform-ready copy-only files when needed:

```bash
npm run content:ready-copy -- content-automation/campaigns/example-campaign.json
```

These files are intended for direct copy-and-paste publishing. Naver Blog uses readable plain text with section breaks and a raw URL instead of Markdown link syntax. Instagram and TikTok copy do not assume caption links are clickable; use profile links, story links, comments, or DM routing where needed.
8. Regenerate future publishing preparation when needed:

```bash
npm run content:upcoming
```

9. Regenerate performance tracking when needed:

```bash
npm run content:performance
```

10. Regenerate tracked campaign/platform checklist links when needed:

```bash
npm run content:links
```

11. Regenerate the platform playbook when needed:

```bash
npm run content:playbook
```

12. Regenerate the platform posting QA sheet when needed:

```bash
npm run content:posting-qa
```

13. Regenerate the ready-copy index when needed:

```bash
npm run content:ready-index
```

14. Regenerate the copy quality report when needed:

```bash
npm run content:quality
```

15. Regenerate the daily operator brief when needed:

```bash
npm run content:brief
```

15. Run quality checks:

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
- Platform-ready copy summary: `<date>-<slug>-platform-ready-copy.md`
- Publishing queue CSV: `<date>-<slug>-publishing-queue.csv`
- Publishing queue summary: `<date>-<slug>-publishing-queue.md`

Each campaign also gets copy-only channel files under:

`content-automation/output/platform-ready-copy/<date>-<slug>/`

For Naver Blog, use `01-naver-blog-copy.txt` so raw URLs remain clickable and Markdown symbols do not appear in the editor.

Both `npm run check:content` and `npm run check` scan the campaign files and verify the expected output set. `npm run content:run:all` also refreshes `content-automation/CAMPAIGN_STATUS.md`.

## Ready Copy Index

- `content-automation/READY_COPY_INDEX.md`

This file is the fastest handoff map for publishers. It lists every campaign's platform-ready summary and direct Naver plain-text file so collaborators can open the right copy without scanning raw caption packs. `npm run content:run:all` refreshes it automatically, and `npm run content:ready-index` refreshes only the index.

## Cross-Campaign Calendar

- `content-automation/PUBLISHING_CALENDAR.md`
- `content-automation/PUBLISHING_CALENDAR.csv`

These files combine every campaign publishing queue into one operations calendar. `npm run content:run:all` refreshes them automatically, and `npm run content:calendar` refreshes only the calendar.

## Today Actions

- `content-automation/TODAY_ACTIONS.md`

This file filters the cross-campaign calendar to the current Asia/Seoul date. `npm run content:run:all` refreshes it automatically, and `npm run content:today` refreshes only today's action list.
It also includes overdue carryover, platform execution notes from `platform-rules.json`, an operator posting checklist with clickable ready-copy file links, tracked URLs, quality status, and final channel checks, plus a reporting log for published URLs, first signals, and follow-up needs.

## Upcoming Actions

- `content-automation/UPCOMING_ACTIONS.md`

This file filters the cross-campaign calendar to future dates after the current Asia/Seoul date. `npm run content:run:all` refreshes it automatically, and `npm run content:upcoming` refreshes only the upcoming action list.
It includes a date summary, campaign source links, and a preparation log for asset readiness, caption readiness, ownership, and blockers.

## Performance Log

- `content-automation/PERFORMANCE_LOG.md`

This file turns the cross-campaign calendar into a performance tracking sheet. `npm run content:run:all` refreshes it automatically, and `npm run content:performance` refreshes only the performance log.
Use it after posts go live to record publishing status, tracked CTA URLs, published URLs, first-check dates, primary metrics, learnings, repurpose decisions, and follow-up owners. It also includes a daily review queue for post-publication follow-up.

## Tracked Links

- `content-automation/TRACKED_LINKS.md`
- `content-automation/TRACKED_LINKS.csv`

These files give every campaign/platform pair a UTM-tagged checklist URL. Use the tracked URL in social, video, and blog CTAs when the platform accepts full URLs, then record published URLs and first metrics in `PERFORMANCE_LOG.md`. `npm run content:run:all` refreshes them automatically, and `npm run content:links` refreshes only the link matrix.

## Platform Playbook

- `content-automation/PLATFORM_PLAYBOOK.md`

This file turns `platform-rules.json` into a collaborator-facing posting guide with each channel's role, best format, CTA, ready-copy file, and publishing QA. `npm run content:run:all` refreshes it automatically, and `npm run content:playbook` refreshes only the playbook.

## Platform Posting QA

- `content-automation/PLATFORM_POSTING_QA.md`

This file combines platform rules, tracked CTA URLs, and ready-copy files into a pre-publish QA sheet for each site. Use it to confirm editor paste behavior, link handling, and platform-specific readability before posting. `npm run content:run:all` refreshes it automatically, and `npm run content:posting-qa` refreshes only the posting QA sheet.

## Copy Quality Report

- `content-automation/COPY_QUALITY_REPORT.md`

This file checks every platform-ready copy file for readability, raw URL handling, platform-specific link behavior, and obvious publishing blockers. `npm run content:run:all` refreshes it automatically, and `npm run content:quality` refreshes only the quality report.

## Daily Brief

- `content-automation/DAILY_BRIEF.md`

This file summarizes today's focus, tomorrow's preparation queue, and the records that need updating. `npm run content:run:all` refreshes it automatically, and `npm run content:brief` refreshes only the daily brief.
