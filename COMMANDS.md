# Standard Commands

Use these commands for local and deployed validation.

```bash
npm run check
npm run serve
npm run smoke -- https://your-pages-preview.pages.dev
```

- `npm run check` runs the local static-site validation.
- `npm run serve` starts a dependency-free local preview server at `http://127.0.0.1:4173/`.
- `npm run smoke -- <preview-url>` runs deployed Cloudflare Pages smoke checks.
