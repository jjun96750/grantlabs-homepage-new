import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const campaignPath = process.argv[2] || "content-automation/campaigns/grantlabs-growth-check.json";
const rulesPath = "content-automation/platform-rules.json";

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const campaign = readJson(campaignPath);
const rules = readJson(rulesPath);

const points = campaign.pillarPointsKo?.length ? campaign.pillarPointsKo : campaign.pillarPoints;
const topic = campaign.topicKo || campaign.topic;
const corePromise = campaign.corePromiseKo || campaign.corePromise;
const cta = campaign.primaryCtaKo || campaign.primaryCta;
const landingPage = campaign.landingPage;
const phone = campaign.contact?.phone || "";
const email = campaign.contact?.email || "";

const hashtags = {
  naver_blog: ["정책자금", "기업인증", "기업부설연구소", "특허", "상담체크리스트", "GrantLabs"],
  instagram_carousel: ["정책자금", "기업인증", "사업자금", "대표님체크리스트", "GrantLabs"],
  instagram_reels: ["정책자금", "기업인증", "정부지원사업", "사업자금", "대표님필수"],
  youtube_shorts: ["정책자금", "기업인증", "정부지원사업", "사업자금"],
  youtube_long: ["정책자금", "기업인증", "기업부설연구소", "정부지원사업"],
  tiktok: ["정책자금", "사업자금", "대표님", "정부지원사업"],
  facebook_page: ["정책자금", "기업인증", "사업상담", "GrantLabs"],
  linkedin_page: ["정책자금", "기업인증", "경영전략", "정부지원사업"]
};

const numbered = (items) => items.map((item, index) => `${index + 1}. ${item}`).join("\n");
const bulleted = (items) => items.map((item) => `- ${item}`).join("\n");
const tagLine = (platformId) => (hashtags[platformId] || ["GrantLabs"]).map((tag) => `#${tag}`).join(" ");

const naverBlog = () => `Suggested title:
${topic}: 신청 전 대표님이 먼저 확인할 준비 체크리스트

Search keywords:
정책자금, 기업인증, 기업부설연구소, 특허, 상담 준비, Grant Labs

Copy-ready post body:
${topic}

정책자금이나 기업인증을 검토할 때 가장 먼저 필요한 것은 "지금 신청 가능한가"보다 "무엇이 준비되어 있고 무엇이 부족한가"를 정리하는 일입니다.

${corePromise}

1. 상담이 길어지는 가장 큰 이유

상담 과정에서 시간이 길어지는 경우는 대부분 자료가 없어서가 아니라, 어떤 자료를 먼저 봐야 하는지 정리되어 있지 않아서 생깁니다.

대표님이 보유한 사업자등록 정보, 최근 매출, 고용 현황, 재무 자료, 인증·특허·연구개발 증빙을 먼저 구분해 두면 첫 상담에서 확인할 수 있는 범위가 넓어집니다.

2. 신청 전에 먼저 확인할 항목

${bulleted(points)}

3. 예시로 보면 더 명확합니다

같은 제조업이라도 기존 제품과의 차이, 생산 공정, 고객군, 출시 일정이 다르면 검토 순서가 달라집니다.

출시가 가까운 기업은 특허, 제품 소개자료, 납품 일정, 정책자금 가능성을 함께 봐야 합니다. 반대로 아직 개발 초기라면 기술 차이와 사업화 계획을 먼저 정리하는 편이 좋습니다.

4. 상담 전 체크리스트

- 사업자등록증과 주요 업종
- 최근 매출과 세금 신고 자료
- 고용 인원과 4대보험 가입 현황
- 기존 인증, 특허, 연구개발 이력
- 앞으로 3~6개월 안에 신청하거나 준비하려는 항목

5. Grant Labs 상담 준비 링크

아래 주소를 열고 보유 자료를 체크한 뒤 문의해 주세요.

${landingPage}

문의:
${phone}
${email}

Hashtags:
${tagLine("naver_blog")}

Publishing note:
네이버 블로그에는 위 본문을 그대로 붙여 넣고, 링크는 Markdown이 아닌 원문 URL 한 줄로 유지하세요.`;

const instagramCarousel = () => `Slide outline:
1. ${topic}
2. 왜 바로 신청하면 위험한가
3. 먼저 확인할 자료
4. 준비 순서가 중요한 이유
5. 대표님이 자주 놓치는 부분
6. 상담 전 체크리스트
7. 저장 후 링크에서 확인

Caption:
정책자금이나 기업인증을 준비 중이라면 바로 신청하기 전에 자료부터 점검하세요.

${numbered(points.slice(0, 4))}

체크리스트를 저장해 두고 상담 전에 빠진 자료를 확인해 보세요.

${landingPage}`;

const shortVideo = (platformName) => `Spoken script:
${platformName}용 첫 문장입니다.

"정책자금이나 기업인증을 준비 중이라면, 신청 전에 이 네 가지를 먼저 확인하세요."

${numbered(points.slice(0, 4))}

"준비 순서가 잡히면 상담 시간이 줄고, 어떤 지원을 먼저 검토할지 판단이 빨라집니다."

On-screen text:
신청 전 4가지 체크

Caption:
바로 신청하기 전에 준비도를 먼저 확인하세요.
체크리스트: ${landingPage}`;

const youtubeLong = () => `Video title:
${topic}: 신청 전 준비 순서와 체크리스트

Description:
이번 영상에서는 정책자금, 기업인증, 기업부설연구소, 특허 준비를 따로 보지 않고 실제 실행 순서로 정리합니다.

Chapters:
00:00 왜 준비 순서가 중요한가
01:10 상담이 길어지는 이유
02:30 먼저 확인할 증빙
04:10 기업인증·특허·연구소 연결
06:00 상담 전 체크리스트

Pinned comment:
상담 전 준비 체크리스트:
${landingPage}`;

const facebookPost = () => `Post:
정책자금·기업인증을 준비 중이라면 신청 전에 자료부터 점검해 보세요.

${bulleted(points.slice(0, 4))}

Grant Labs 상담 준비 체크리스트:
${landingPage}

문의: ${phone}`;

const linkedinPost = () => `Post:
정책자금과 기업인증은 신청 자체보다 사전 증빙과 준비 순서가 더 중요할 때가 많습니다.

${corePromise}

Key checks:
${bulleted(points.slice(0, 4))}

Founders and operators can review readiness before applying here:
${landingPage}`;

const captionByPlatform = {
  naver_blog: naverBlog,
  instagram_carousel: instagramCarousel,
  instagram_reels: () => shortVideo("Instagram Reels"),
  youtube_shorts: () => shortVideo("YouTube Shorts"),
  youtube_long: youtubeLong,
  tiktok: () => shortVideo("TikTok"),
  facebook_page: facebookPost,
  linkedin_page: linkedinPost
};

const thumbnailByPlatform = {
  naver_blog: "상담 전 준비 체크리스트",
  instagram_carousel: "신청 전 자료부터 확인",
  instagram_reels: "바로 신청하면 늦습니다",
  youtube_shorts: "신청 전 4가지 체크",
  youtube_long: "정책자금·기업인증 준비 순서",
  tiktok: "신청 전 멈추세요",
  facebook_page: "대표님 상담 전 체크리스트",
  linkedin_page: "신청보다 먼저 볼 준비도"
};

const blockFor = (platform) => {
  const bodyBuilder = captionByPlatform[platform.id];
  const body = bodyBuilder ? bodyBuilder() : `Caption:\n${topic}\n\n${cta}\n${landingPage}`;

  return `## ${platform.name}

Thumbnail/Text overlay:
${thumbnailByPlatform[platform.id] || topic}

${body}

Hashtags:
${tagLine(platform.id)}

CTA:
${cta}
`;
};

const outputPath = join("content-automation", "output", `${campaign.date}-${campaign.slug}-caption-pack.md`);
const content = `# ${campaign.brand} Caption Pack

Date: ${campaign.date}

Campaign: ${topic}

${rules.platforms.map(blockFor).join("\n")}

## Compliance Guardrails

${campaign.complianceNotes.map((note) => `- ${note}`).join("\n")}
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, content, "utf8");

console.log(`Generated caption pack: ${outputPath}`);
