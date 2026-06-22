# Standard Commands

Use these commands for local and deployed validation.

```bash
npm run check
npm run check:content
npm run content:assets
npm run content:captions
npm run content:plan
npm run content:queue
npm run content:calendar
npm run content:today
npm run content:upcoming
npm run content:performance
npm run content:links
npm run content:playbook
npm run content:posting-qa
npm run content:ready-index
npm run content:quality
npm run content:brief
npm run content:run
npm run content:run:all
npm run content:status
npm run deployment:readiness
npm run sitemap:refresh
npm run status:journal
npm run status:index
npm run serve
npm run preview:check
npm run smoke -- https://your-pages-preview.pages.dev
```

- `npm run check` runs the local static-site validation.
- `npm run check:content` runs content automation quality checks.
- `npm run content:assets` generates platform-specific production asset briefs.
- `npm run content:captions` generates a caption pack with platform-specific captions, hashtags, and thumbnail text.
- `npm run content:plan` generates platform-specific posting guidance from the current campaign.
- `npm run content:queue` generates the platform-specific publishing queue.
- `npm run content:calendar` regenerates the cross-campaign publishing calendar.
- `npm run content:today` regenerates today's publishing action list for today actions handoff.
- `npm run content:upcoming` regenerates upcoming actions for future publishing preparation and blocker tracking.
- `npm run content:performance` regenerates the performance log for post URLs, metrics, learnings, and repurpose decisions.
- `npm run content:links` regenerates tracked links with UTM checklist URLs for every campaign and platform.
- `npm run content:playbook` regenerates the platform playbook for channel roles, formats, CTAs, and publishing QA.
- `npm run content:posting-qa` regenerates the platform posting QA sheet for editor paste checks, tracked URLs, and channel-specific link handling.
- `npm run content:ready-index` regenerates the ready-copy index for quick access to campaign summaries and Naver plain-text files.
- `npm run content:quality` regenerates the copy quality report for readability, URL handling, and platform-specific publishing blockers.
- `npm run content:brief` regenerates the daily brief for today's focus, tomorrow preparation, and required record updates.
- `npm run content:run` runs the full content automation pipeline.
- `npm run content:run:all` runs the full content automation pipeline for all campaigns.
- `npm run content:status` regenerates the campaign status table for collaborators.
- `npm run deployment:readiness` regenerates the deployment readiness table for collaborators.
- `npm run sitemap:refresh` runs the sitemap refresh and regenerates `sitemap.xml` with current Asia/Seoul lastmod values.
- `npm run status:journal` regenerates the commit-based development journal for collaborators.
- `npm run status:index` regenerates the collaborator-facing status index document.
- `npm run serve` starts a dependency-free local preview server at `http://127.0.0.1:4173/`.
- `npm run preview:check` verifies the running local preview server.
- `npm run smoke -- <preview-url>` runs deployed Cloudflare Pages smoke checks.
