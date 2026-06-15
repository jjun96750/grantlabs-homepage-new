# Contributing

## Scope

Work only in this repository for the new Grant Labs homepage. Do not modify the existing `grantlabs-website` repository or the current production site.

## Before Editing

Read these files first:

- `CLAUDE_HANDOFF.md`
- `DEVELOPMENT_STATUS.md`
- `COMMANDS.md`
- `CLOUDFLARE_PAGES_SETUP.md`

## Validation

Run this before committing:

```bash
npm run check
```

After Cloudflare Pages preview deployment, run:

```bash
npm run smoke -- https://your-pages-preview.pages.dev
```

## Documentation

Keep `DEVELOPMENT_STATUS.md` and `CHANGELOG.md` updated for meaningful changes. If the current handoff point changes, update `CLAUDE_HANDOFF.md` as well.

## Safety

- Keep this as a static Cloudflare Pages site with no build step unless the deployment plan is explicitly changed.
- Do not commit secrets, API private keys, customer data, or deployment tokens.
- Keep `LICENSE` and `SECURITY.md` guidance intact.
