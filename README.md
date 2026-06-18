# Grant Labs Homepage New

Grant Labs 신규 홈페이지 독립 개발용 저장소입니다.

## 작업 원칙

- 기존 `grantlabs-website` 저장소와 운영 사이트는 건드리지 않습니다.
- 이 저장소 안의 파일만 수정합니다.
- Cloudflare Pages 새 프로젝트를 이 저장소에 연결해 기존 사이트와 분리해서 개발합니다.

## 구조

```text
index.html
privacy.html
checklist.html
styles/
  homepage.css
.nojekyll
_headers
favicon.svg
social-card.svg
robots.txt
sitemap.xml
site.webmanifest
scripts/
  check-static-site.mjs
  generate-asset-briefs.mjs
  generate-caption-pack.mjs
  generate-content-plan.mjs
  generate-publishing-queue.mjs
  run-content-automation.mjs
  serve-static.mjs
  check-local-preview.mjs
  check-deployed-site.mjs
content-automation/
  platform-rules.json
  publishing-defaults.json
  campaigns/
    grantlabs-growth-check.json
  output/
    2026-06-18-grantlabs-growth-check.md
    2026-06-18-grantlabs-growth-check-asset-briefs.md
    2026-06-18-grantlabs-growth-check-caption-pack.md
    2026-06-18-grantlabs-growth-check-publishing-queue.csv
    2026-06-18-grantlabs-growth-check-publishing-queue.md
QA_CHECKLIST.md
CLOUDFLARE_PAGES_SETUP.md
DEPLOYMENT_ENVIRONMENTS.md
ROLLBACK_PLAN.md
CHANGELOG.md
CLAUDE_HANDOFF.md
DEVELOPMENT_STATUS.md
```

## 개발현황

중간에 작업자가 바뀌어도 바로 이어받을 수 있도록 `DEVELOPMENT_STATUS.md`에 현재 상태, 완료된 작업, 한계, 다음 액션을 계속 기록합니다.

Claude에게 공유할 때는 `CLAUDE_HANDOFF.md`와 `DEVELOPMENT_STATUS.md`를 먼저 읽게 하면 됩니다.

Cloudflare Pages 연결은 `CLOUDFLARE_PAGES_SETUP.md`, 배포 후 화면 검수는 `QA_CHECKLIST.md`를 기준으로 진행합니다.

배포 URL과 도메인 상태는 `DEPLOYMENT_ENVIRONMENTS.md`에 계속 기록합니다.

## 로컬 확인

브라우저에서 `index.html`을 직접 열어 확인할 수 있습니다.

```text
C:\Users\ongee\OneDrive\문서\홈페이지 만들기\grantlabs-homepage-new\index.html
```

정적 구조 검사는 Node.js로 실행합니다.

```bash
npm run check
```

```bash
npm run content:assets
```

```bash
npm run content:captions
```

```bash
npm run content:plan
```

```bash
npm run content:queue
```

```bash
npm run content:run
```

```bash
npm run serve
```

```bash
npm run preview:check
```

Cloudflare Pages 배포 후에는 preview URL을 넣어 주요 페이지, 정적 파일, 보안 헤더, 캐시 헤더 응답을 확인합니다.

```bash
npm run smoke -- https://your-pages-preview.pages.dev
```

## Cloudflare Pages 설정

- Framework preset: `None`
- Build command: 비워둠
- Build output directory: `/`
- Root directory: `/`

## Codex에 공유할 문구

```text
기존 grantlabs-website는 건드리지 말고, 이 새 레포에서만 Grant Labs 신규 홈페이지를 작업해줘.
Cloudflare Pages도 이 레포에 연결해서 기존 운영 사이트와 독립적으로 개발할 예정이야.
```
