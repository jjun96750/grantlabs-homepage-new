# Claude Handoff

## Scope

- Work only in this new repository/folder: `grantlabs-homepage-new`
- GitHub repository: `https://github.com/jjun96750/grantlabs-homepage-new`
- Do not modify the existing `grantlabs-website` repository or current production site.
- Cloudflare Pages should be connected to this new repository as a separate project.

## Current State

- Static homepage draft is ready.
- No build step is required.
- Main branch: `main`
- Initial local commit: `860129d Initial Grant Labs homepage`
- GitHub repository has been created and should receive this local `main` branch.
- Ongoing development status is tracked in `DEVELOPMENT_STATUS.md`.

## Files

```text
index.html
styles/homepage.css
README.md
CLAUDE_HANDOFF.md
DEVELOPMENT_STATUS.md
.gitignore
.nojekyll
_headers
favicon.svg
robots.txt
sitemap.xml
site.webmanifest
```

## Design Direction

- Korean Grant Labs homepage for policy funding, certification, R&D center, patent, corporation setup, and business support consulting.
- First screen uses a real business meeting photo from Unsplash.
- The page is intentionally static for simple Cloudflare Pages deployment.
- Static deployment support files are present: `_headers`, `robots.txt`, `sitemap.xml`, `favicon.svg`, and `site.webmanifest`.

## Next Steps

1. Push the local `main` branch to `https://github.com/jjun96750/grantlabs-homepage-new`.
2. Create a new Cloudflare Pages project connected to the new repository.
3. Continue edits only in this repository.
4. Keep `DEVELOPMENT_STATUS.md` updated whenever the project state changes.

## Suggested Prompt For Claude

```text
기존 grantlabs-website는 건드리지 말고, 이 새 레포에서만 Grant Labs 신규 홈페이지를 작업해줘.
Cloudflare Pages도 이 레포에 연결해서 기존 운영 사이트와 독립적으로 개발할 예정이야.
현재는 정적 홈페이지 초안이 있고, 빌드 과정 없이 index.html과 styles/homepage.css 중심으로 관리하면 돼.
```

English fallback:

```text
Work only in https://github.com/jjun96750/grantlabs-homepage-new.
Do not touch the existing grantlabs-website repository or production site.
Read CLAUDE_HANDOFF.md and DEVELOPMENT_STATUS.md first.
This is a static homepage draft for a separate Cloudflare Pages project. Use index.html and styles/homepage.css as the main files.
```
