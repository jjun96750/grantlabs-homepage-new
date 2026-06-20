# Standard Commands

Use these commands for local and deployed validation.

```bash
npm run check
npm run check:content
npm run content:assets
npm run content:captions
npm run content:plan
npm run content:queue
npm run content:run
npm run content:run:all
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
- `npm run content:run` runs the full content automation pipeline.
- `npm run content:run:all` runs the full content automation pipeline for all campaigns.
- `npm run serve` starts a dependency-free local preview server at `http://127.0.0.1:4173/`.
- `npm run preview:check` verifies the running local preview server.
- `npm run smoke -- <preview-url>` runs deployed Cloudflare Pages smoke checks.
