import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const campaignPath = process.argv[2] || "content-automation/campaigns/grantlabs-growth-check.json";
const rulesPath = "content-automation/platform-rules.json";

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const campaign = readJson(campaignPath);
const rules = readJson(rulesPath);

const points = campaign.pillarPointsKo || campaign.pillarPoints;
const cta = campaign.primaryCtaKo || campaign.primaryCta;
const landingPage = campaign.landingPage;
const phone = campaign.contact.phone;

const hashtags = {
  naver_blog: ["정책자금", "기업인증", "기업부설연구소", "정부지원사업", "GrantLabs"],
  instagram_carousel: ["정책자금", "기업인증", "사업자금", "대표님체크리스트", "GrantLabs"],
  instagram_reels: ["정책자금", "기업인증", "정부지원사업", "사업자금", "대표님필수"],
  youtube_shorts: ["정책자금", "기업인증", "정부지원사업", "사업자금"],
  youtube_long: ["정책자금", "기업인증", "기업부설연구소", "정부지원사업"],
  tiktok: ["정책자금", "사업자금", "대표님", "정부지원사업"],
  facebook_page: ["정책자금", "기업인증", "사업상담", "GrantLabs"],
  linkedin_page: ["정책자금", "기업인증", "경영전략", "정부지원사업"]
};

const captionByPlatform = {
  naver_blog: `정책자금이나 기업인증을 준비한다면 공고가 뜬 뒤 움직이는 것보다 먼저 준비도를 확인하는 편이 안전합니다.\n\n${points[0]}\n${points[1]}\n\n신청 전 체크리스트로 빠진 자료부터 점검해보세요.\n${landingPage}`,
  instagram_carousel: `정책자금 신청 전, 이 자료가 없다면 먼저 멈추고 점검하세요.\n\n1. ${points[0]}\n2. ${points[1]}\n3. 신청 순서와 증빙 준비가 맞아야 합니다.\n\n저장해두고 상담 전 체크리스트로 확인하세요.\n${landingPage}`,
  instagram_reels: `정책자금 신청하려고요?\n바로 신청하기 전에 자료와 순서부터 확인해야 합니다.\n\n${points[0]}\n${points[1]}\n\n체크리스트는 프로필/홈페이지에서 확인하세요.`,
  youtube_shorts: `정책자금 신청 전 꼭 확인할 4가지.\n${points[0]}\n${points[1]}\n\n상담 전 체크리스트: ${landingPage}`,
  youtube_long: `정책자금과 기업인증은 신청서보다 준비 순서가 먼저입니다.\n\n이번 영상에서는 신청 전에 확인해야 할 자료, 인증과 연구소 준비 순서, 체크리스트 활용법을 정리합니다.\n\n상담 전 체크리스트: ${landingPage}`,
  tiktok: `정책자금, 지금 바로 신청하면 안 되는 경우가 있습니다.\n\n${points[0]}\n${points[1]}\n\n신청 전 체크리스트로 빠진 증빙부터 확인하세요.`,
  facebook_page: `정책자금·기업인증을 준비 중이라면 신청 전에 자료부터 점검해보세요.\n\n${points[0]}\n${points[1]}\n\n상담 전 체크리스트: ${landingPage}\n문의: ${phone}`,
  linkedin_page: `정책자금과 기업인증은 신청 자체보다 사전 증빙과 순서 설계가 중요합니다.\n\n${points[0]}\n${points[1]}\n\nGrant Labs는 신청 전 준비도를 먼저 점검하고 실행 순서를 정리합니다.`
};

const thumbnailByPlatform = {
  naver_blog: "정책자금 신청 전 준비도 체크",
  instagram_carousel: "신청 전, 이 자료부터 확인",
  instagram_reels: "바로 신청하면 늦습니다",
  youtube_shorts: "정책자금 전 체크 4가지",
  youtube_long: "정책자금·기업인증 준비 순서",
  tiktok: "신청 전 멈추세요",
  facebook_page: "대표님 상담 전 체크리스트",
  linkedin_page: "신청보다 먼저 볼 준비도"
};

const blockFor = (platform) => {
  const platformHashtags = hashtags[platform.id] || ["GrantLabs"];
  const caption = captionByPlatform[platform.id] || `${campaign.topicKo || campaign.topic}\n\n${cta}\n${landingPage}`;

  return `## ${platform.name}

Thumbnail/Text overlay: ${thumbnailByPlatform[platform.id] || campaign.topicKo || campaign.topic}

Caption:
${caption}

Hashtags:
${platformHashtags.map((tag) => `#${tag}`).join(" ")}

CTA:
${cta}
`;
};

const outputPath = join("content-automation", "output", `${campaign.date}-${campaign.slug}-caption-pack.md`);
const content = `# ${campaign.brand} Caption Pack

Date: ${campaign.date}

Campaign: ${campaign.topicKo || campaign.topic}

${rules.platforms.map(blockFor).join("\n")}

## Compliance Guardrails

${campaign.complianceNotes.map((note) => `- ${note}`).join("\n")}
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, content, "utf8");

console.log(`Generated caption pack: ${outputPath}`);
