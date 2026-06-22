import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const campaignPath = process.argv[2] || "content-automation/campaigns/grantlabs-growth-check.json";

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const campaign = readJson(campaignPath);
const baseName = `${campaign.date}-${campaign.slug}`;
const captionPackPath = join("content-automation", "output", `${baseName}-caption-pack.md`);
const readyDir = join("content-automation", "output", "platform-ready-copy", baseName);
const summaryPath = join("content-automation", "output", `${baseName}-platform-ready-copy.md`);

const captionPack = readFileSync(captionPackPath, "utf8");

function extractSection(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^## ${escaped}\\s*$`, "m");
  const match = markdown.match(pattern);
  if (!match || match.index == null) return "";

  const start = match.index + match[0].length;
  const rest = markdown.slice(start);
  const next = rest.search(/^##\s+/m);
  return (next >= 0 ? rest.slice(0, next) : rest).trim();
}

function between(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  if (start < 0) return "";
  const afterStart = text.slice(start + startMarker.length);
  const end = afterStart.indexOf(endMarker);
  return (end >= 0 ? afterStart.slice(0, end) : afterStart).trim();
}

function stripMarkdown(text) {
  return text
    .replace(/^\uFEFF/, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1\n$2")
    .replace(/^-\s+/gm, "- ")
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
    .replace(/^Thumbnail\/Text overlay:\s*/gm, "Thumbnail/Text overlay:\n")
    .replace(/^CTA:\s*/gm, "CTA:\n")
    .trim();
}

function listLines(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function buildNaverReadyCopy() {
  const topic = campaign.topicKo || campaign.topic;
  const corePromise = campaign.corePromiseKo || campaign.corePromise;
  const cta = campaign.primaryCtaKo || campaign.primaryCta;
  const pillarPoints = campaign.pillarPointsKo?.length ? campaign.pillarPointsKo : campaign.pillarPoints;
  const landingPage = campaign.landingPage || "https://grantlabs.co.kr/checklist.html";
  const phone = campaign.contact?.phone || "";
  const email = campaign.contact?.email || "";
  const guardrails = campaign.complianceNotesKo?.length ? campaign.complianceNotesKo : campaign.complianceNotes;

  return deDuplicateParagraphs(stripMarkdown(`${topic}: 상담 전에 먼저 확인할 준비 체크리스트

정책자금, 기업인증, 특허, 연구소 설립을 검토할 때 가장 먼저 필요한 것은 "가능하다/불가능하다"의 단정이 아니라 현재 준비 상태를 정확히 보는 일입니다.

${corePromise}

1. 상담이 길어지는 가장 큰 이유

사업 개요, 매출 구조, 고용 현황, 인증 보유 여부, 기술 자료, 지식재산 준비 현황이 흩어져 있으면 상담 시간이 길어지고 실제 실행 순서도 흐려집니다.

그래서 Grant Labs는 먼저 체크리스트 기반으로 현재 상태를 정리한 뒤, 정책자금과 인증, 특허, 연구소 설립 중 무엇을 먼저 검토해야 하는지 순서를 잡습니다.

2. 신청 전에 먼저 확인할 핵심 항목

${listLines(pillarPoints)}

위 항목은 단순한 서류 목록이 아니라 실행 우선순위를 정하는 기준입니다. 준비가 충분한 항목은 빠르게 다음 단계로 넘기고, 부족한 항목은 보완 계획을 먼저 세우는 방식이 필요합니다.

3. 예시로 보면 더 명확합니다

같은 제조업이라도 매출 증빙이 탄탄한 기업, 연구개발 인력이 있는 기업, 특허 아이디어만 있는 기업은 접근 순서가 다릅니다. 어떤 기업은 기업인증을 먼저 정리해야 하고, 어떤 기업은 연구소 요건이나 기술 자료 정리가 먼저일 수 있습니다.

4. 상담 전에 준비하면 좋은 자료

- 사업자등록증과 회사 소개 자료
- 최근 매출과 고용 현황을 볼 수 있는 기본 자료
- 보유 인증, 특허, 연구소 관련 자료
- 준비 중인 기술, 제품, 서비스 설명
- 현재 고민 중인 정책자금 또는 인증 과제

모든 자료가 완벽하게 준비되어야 상담이 가능한 것은 아닙니다. 다만 현재 어떤 자료가 있고 무엇이 부족한지 알고 시작하면 상담 결과가 훨씬 구체적입니다.

5. Grant Labs 상담 준비 링크

아래 체크리스트에서 현재 상태를 먼저 점검해보세요. 이후 상담에서는 체크리스트 내용을 기준으로 실행 가능성, 보완 순서, 다음 액션을 함께 정리할 수 있습니다.

${landingPage}

상담 문의: ${phone}${phone && email ? " / " : ""}${email}

진행 시 유의사항

${listLines(guardrails)}

${cta}`));
}

function writeReadyFile(name, body) {
  const filePath = join(readyDir, name);
  writeFileSync(filePath, `${body.trim()}\n`, "utf8");
  return filePath;
}

const sections = {
  naver: extractSection(captionPack, "Naver Blog"),
  instagramCarousel: extractSection(captionPack, "Instagram Carousel"),
  instagramReels: extractSection(captionPack, "Instagram Reels"),
  youtubeShorts: extractSection(captionPack, "YouTube Shorts"),
  youtubeLong: extractSection(captionPack, "YouTube Long-form"),
  tiktok: extractSection(captionPack, "TikTok"),
  facebook: extractSection(captionPack, "Facebook Page"),
  linkedin: extractSection(captionPack, "LinkedIn Page")
};

const naverReady = buildNaverReadyCopy();

mkdirSync(readyDir, { recursive: true });

const files = [
  ["01-naver-blog-copy.txt", naverReady],
  ["02-instagram-carousel-caption.txt", normalizeSocialCopy(sections.instagramCarousel)],
  ["03-instagram-reels-script.txt", normalizeSocialCopy(sections.instagramReels)],
  ["04-youtube-shorts-script.txt", normalizeSocialCopy(sections.youtubeShorts)],
  ["05-youtube-long-description.txt", normalizeSocialCopy(sections.youtubeLong)],
  ["06-tiktok-caption.txt", normalizeSocialCopy(sections.tiktok)],
  ["07-facebook-page-post.txt", normalizeSocialCopy(sections.facebook)],
  ["08-linkedin-page-post.txt", normalizeSocialCopy(sections.linkedin)]
].map(([name, body]) => ({ name, path: writeReadyFile(name, body) }));

writeReadyFile("README.md", `# Platform Ready Copy - ${baseName}

Use these files for copy-and-paste publishing.

- Naver Blog: use \`01-naver-blog-copy.txt\`. It is plain text with raw URLs.
- Instagram Carousel: use \`02-instagram-carousel-caption.txt\`.
- Instagram Reels: use \`03-instagram-reels-script.txt\`.
- YouTube Shorts: use \`04-youtube-shorts-script.txt\`.
- YouTube Long-form: use \`05-youtube-long-description.txt\`.
- TikTok: use \`06-tiktok-caption.txt\`.
- Facebook Page: use \`07-facebook-page-post.txt\`.
- LinkedIn Page: use \`08-linkedin-page-post.txt\`.

Do not paste Markdown links into Naver Blog. Keep the raw URL on its own line.
`);

const summary = `# ${campaign.brand} Platform Ready Copy

Date: ${campaign.date}

Campaign: ${campaign.topicKo || campaign.topic}

Ready copy folder:
\`content-automation/output/platform-ready-copy/${baseName}/\`

## Files

${files.map((file) => `- \`${file.name}\``).join("\n")}

## Naver Publishing Guardrail

- Use \`01-naver-blog-copy.txt\`.
- Keep the raw checklist URL on its own line.
- Do not paste Markdown link syntax into Naver Blog.
- Keep paragraph breaks as generated.
`;

mkdirSync(dirname(summaryPath), { recursive: true });
writeFileSync(summaryPath, summary, "utf8");

console.log(`Generated platform-ready copy: ${summaryPath}`);
