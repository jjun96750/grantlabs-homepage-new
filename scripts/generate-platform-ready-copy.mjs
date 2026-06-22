import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const campaignPath = process.argv[2] || "content-automation/campaigns/grantlabs-growth-check.json";

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const campaign = readJson(campaignPath);
const baseName = `${campaign.date}-${campaign.slug}`;
const readyDir = join("content-automation", "output", "platform-ready-copy", baseName);
const summaryPath = join("content-automation", "output", `${baseName}-platform-ready-copy.md`);

function stripMarkdown(text) {
  return text
    .replace(/^\uFEFF/, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1\n$2")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function deDuplicateParagraphs(text) {
  const seen = new Set();
  return text
    .split(/\n{2,}/)
    .filter((paragraph) => {
      const normalized = paragraph.replace(/\s+/g, " ").trim();
      if (!normalized) return false;
      if (normalized.length >= 35 && seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .join("\n\n");
}

function normalizeSocialCopy(text) {
  return stripMarkdown(text)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function listLines(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function numberedLines(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function campaignFields() {
  return {
    topic: campaign.topicKo || campaign.topic,
    corePromise: campaign.corePromiseKo || campaign.corePromise,
    cta: campaign.primaryCtaKo || campaign.primaryCta,
    pillarPoints: campaign.pillarPointsKo?.length ? campaign.pillarPointsKo : campaign.pillarPoints,
    landingPage: campaign.landingPage || "https://grantlabs.co.kr/checklist.html",
    phone: campaign.contact?.phone || "",
    email: campaign.contact?.email || "",
    guardrails: campaign.complianceNotesKo?.length ? campaign.complianceNotesKo : campaign.complianceNotes
  };
}

function buildNaverReadyCopy() {
  const { topic, corePromise, cta, pillarPoints, landingPage, phone, email, guardrails } = campaignFields();

  return deDuplicateParagraphs(stripMarkdown(`${topic}: 상담 전 꼭 확인할 준비 체크리스트

정책자금, 기업인증, 특허, 기업부설연구소를 검토하고 있다면 신청서부터 쓰기보다 현재 준비 상태를 먼저 정리해야 합니다.

${corePromise}

----------------------------------------

이 글에서 확인할 내용

1. 상담 전에 먼저 정리해야 할 자료
2. 신청 순서를 잘못 잡으면 생기는 문제
3. Grant Labs 체크리스트를 활용하는 방법
4. 상담 요청 전 바로 열어볼 링크

----------------------------------------

1. 상담이 길어지는 이유

사업 개요, 매출 구조, 고용 현황, 인증 보유 여부, 기술 자료, 지식재산 준비 현황이 흩어져 있으면 상담 시간이 길어지고 실제 실행 순서도 흐려집니다.

그래서 Grant Labs는 먼저 체크리스트 기반으로 현재 상태를 정리한 뒤, 정책자금과 인증, 특허, 연구소 설립 중 무엇을 먼저 검토해야 하는지 순서를 잡습니다.

2. 신청 전에 확인할 핵심 항목

${listLines(pillarPoints)}

위 항목은 단순한 서류 목록이 아닙니다. 어떤 지원을 먼저 검토할지, 어떤 증빙을 보완해야 할지, 상담에서 무엇을 확인해야 할지 정하는 기준입니다.

3. 예시로 보면 더 명확합니다

같은 제조업이라도 매출 증빙이 탄탄한 기업, 연구개발 인력이 있는 기업, 특허 아이디어만 있는 기업은 접근 순서가 다릅니다. 어떤 기업은 기업인증을 먼저 정리해야 하고, 어떤 기업은 연구소 요건이나 기술 자료 정리가 먼저일 수 있습니다.

4. 상담 전에 준비하면 좋은 자료

- 사업자등록증과 회사 소개 자료
- 최근 매출과 고용 현황을 볼 수 있는 기본 자료
- 보유 인증, 특허, 연구소 관련 자료
- 준비 중인 기술, 제품, 서비스 설명
- 현재 고민 중인 정책자금 또는 인증 과제

모든 자료가 완벽하게 준비되어야 상담이 가능한 것은 아닙니다. 다만 현재 어떤 자료가 있고 무엇이 부족한지 알고 시작하면 상담 결과가 훨씬 구체적입니다.

----------------------------------------

Grant Labs 상담 준비 체크리스트

아래 주소를 눌러 상담 전 준비 상태를 먼저 확인해보세요.

${landingPage}

상담 문의: ${phone}${phone && email ? " / " : ""}${email}

----------------------------------------

진행 시 유의사항

${listLines(guardrails)}

${cta}`));
}

function buildInstagramCarouselReady() {
  const { topic, pillarPoints, landingPage, cta } = campaignFields();
  return normalizeSocialCopy(`Carousel caption:
저장해두고 상담 전에 확인하세요.

${topic}

신청 전 먼저 볼 항목
${numberedLines(pillarPoints.slice(0, 4))}

링크는 인스타그램 캡션에서 클릭되지 않을 수 있습니다.
프로필 링크, 스토리 링크, 또는 DM 안내에 체크리스트 주소를 연결하세요.

체크리스트 주소:
${landingPage}

CTA:
${cta}

Hashtags:
#정책자금 #기업인증 #사업자금 #대표님체크리스트 #GrantLabs`);
}

function buildShortVideoReady(platformName) {
  const { topic, pillarPoints, landingPage, cta } = campaignFields();
  const linkGuidance = platformName === "Instagram Reels"
    ? "링크는 인스타그램 캡션에서 클릭되지 않을 수 있습니다. 프로필 링크, 스토리 링크, 또는 DM 안내에 체크리스트 주소를 연결하세요."
    : platformName === "YouTube Shorts"
      ? `Pinned comment:\n상담 전 준비 체크리스트:\n${landingPage}`
      : "캡션 링크가 클릭되지 않는 플랫폼에서는 프로필 링크, 고정 댓글, 또는 설명란에 아래 주소를 넣으세요.";

  return normalizeSocialCopy(`${platformName} script:
첫 2초 훅:
"정책자금이나 기업인증 준비 중이면, 신청 전에 이 자료부터 확인하세요."

본문:
${topic}

오늘 확인할 4가지
${numberedLines(pillarPoints.slice(0, 4))}

마무리:
"준비 순서가 잡히면 상담 시간이 줄고, 어떤 지원을 먼저 검토할지 판단이 빨라집니다."

Caption:
신청 전 준비도를 먼저 확인하세요.
${linkGuidance}

${landingPage}

CTA:
${cta}`);
}

function buildYoutubeLongReady() {
  const { topic, corePromise, pillarPoints, landingPage } = campaignFields();
  return normalizeSocialCopy(`Title:
${topic}: 신청 전 준비 순서와 체크리스트

Description:
${corePromise}

이번 영상에서는 정책자금, 기업인증, 특허, 기업부설연구소 준비를 따로 보지 않고 실제 상담 전에 확인해야 할 순서로 정리합니다.

Chapters:
00:00 신청 전에 순서가 중요한 이유
01:10 상담이 길어지는 자료 문제
02:30 먼저 확인할 핵심 증빙
04:10 인증·특허·연구소·정책자금 연결
06:00 상담 전 체크리스트 사용법

Key checks:
${listLines(pillarPoints)}

Checklist:
${landingPage}

Pinned comment:
상담 전 준비 체크리스트:
${landingPage}`);
}

function buildFacebookReady() {
  const { topic, pillarPoints, landingPage, phone } = campaignFields();
  return normalizeSocialCopy(`Post:
${topic}

정책자금·기업인증을 준비 중이라면 신청 전에 자료부터 점검해보세요.

먼저 확인할 항목
${listLines(pillarPoints.slice(0, 4))}

상담 준비 체크리스트:
${landingPage}

문의: ${phone}`);
}

function buildLinkedinReady() {
  const { topic, corePromise, pillarPoints, landingPage } = campaignFields();
  return normalizeSocialCopy(`Post:
${topic}

정책자금과 기업인증은 신청 자체보다 사전 증빙과 준비 순서가 더 중요할 때가 많습니다.

${corePromise}

Key checks:
${listLines(pillarPoints.slice(0, 4))}

Checklist:
${landingPage}`);
}

function writeReadyFile(name, body) {
  const filePath = join(readyDir, name);
  writeFileSync(filePath, `${body.trim()}\n`, "utf8");
  return filePath;
}

mkdirSync(readyDir, { recursive: true });

const files = [
  ["01-naver-blog-copy.txt", buildNaverReadyCopy()],
  ["02-instagram-carousel-caption.txt", buildInstagramCarouselReady()],
  ["03-instagram-reels-script.txt", buildShortVideoReady("Instagram Reels")],
  ["04-youtube-shorts-script.txt", buildShortVideoReady("YouTube Shorts")],
  ["05-youtube-long-description.txt", buildYoutubeLongReady()],
  ["06-tiktok-caption.txt", buildShortVideoReady("TikTok")],
  ["07-facebook-page-post.txt", buildFacebookReady()],
  ["08-linkedin-page-post.txt", buildLinkedinReady()]
].map(([name, body]) => ({ name, path: writeReadyFile(name, body) }));

writeReadyFile("README.md", `# Platform Ready Copy - ${baseName}

Use these files for copy-and-paste publishing.

- Naver Blog: use \`01-naver-blog-copy.txt\`. It is structured as title, opening, dividers, checklist, CTA, and raw URL.
- Instagram Carousel: use \`02-instagram-carousel-caption.txt\`. Links in captions may not be clickable, so connect the checklist through profile, story, or DM.
- Instagram Reels: use \`03-instagram-reels-script.txt\`.
- YouTube Shorts: use \`04-youtube-shorts-script.txt\`. Put the URL in the description or pinned comment.
- YouTube Long-form: use \`05-youtube-long-description.txt\`.
- TikTok: use \`06-tiktok-caption.txt\`. Put the URL in profile or comments when caption links are unavailable.
- Facebook Page: use \`07-facebook-page-post.txt\`.
- LinkedIn Page: use \`08-linkedin-page-post.txt\`.

For Naver Blog, keep the URL visible on its own line. If SmartEditor does not auto-link it, select the CTA text and insert the URL with the link button.
`);

const summary = `# ${campaign.brand} Platform Ready Copy

Date: ${campaign.date}

Campaign: ${campaign.topicKo || campaign.topic}

Ready copy folder:
\`content-automation/output/platform-ready-copy/${baseName}/\`

## Files

${files.map((file) => `- \`${file.name}\``).join("\n")}

## Publishing Guardrails

- Naver Blog: use clear section breaks, keep the raw checklist URL visible, and add the URL through SmartEditor link controls if auto-linking fails.
- Instagram and TikTok: assume caption links may not be clickable; route users to profile, story, comments, or DM.
- YouTube, Facebook, and LinkedIn: keep the checklist URL visible in description, post body, or pinned comment.
- Keep paragraph breaks as generated.
`;

mkdirSync(dirname(summaryPath), { recursive: true });
writeFileSync(summaryPath, summary, "utf8");

console.log(`Generated platform-ready copy: ${summaryPath}`);
