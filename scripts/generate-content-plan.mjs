import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const rulesPath = "content-automation/platform-rules.json";
const campaignPath = process.argv[2] || "content-automation/campaigns/grantlabs-growth-check.json";

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const rules = readJson(rulesPath);
const campaign = readJson(campaignPath);

const requiredCampaignFields = ["slug", "date", "brand", "topic", "primaryAudience", "corePromise", "primaryCta", "landingPage"];
const missingCampaignFields = requiredCampaignFields.filter((field) => !campaign[field]);
if (missingCampaignFields.length) {
  console.error(`Campaign is missing required fields: ${missingCampaignFields.join(", ")}`);
  process.exit(1);
}

if (!Array.isArray(rules.platforms) || !rules.platforms.length) {
  console.error("Platform rules must include at least one platform.");
  process.exit(1);
}

const outputPath = join("content-automation", "output", `${campaign.date}-${campaign.slug}.md`);

const list = (items) => items.map((item) => `- ${item}`).join("\n");

const koreanStarter = (platform) => {
  const topic = campaign.topicKo || campaign.topic;
  const promise = campaign.corePromiseKo || campaign.corePromise;
  const cta = campaign.primaryCtaKo || campaign.primaryCta;
  const points = campaign.pillarPointsKo || campaign.pillarPoints;
  const firstPoint = points[0];
  const secondPoint = points[1];

  const starters = {
    naver_blog: `제목: ${topic}, 신청 전에 이 4가지는 먼저 확인하세요\n도입: 정책자금이나 기업인증은 공고를 보고 바로 움직이면 늦을 수 있습니다. ${promise}\n본문 흐름: 1) ${firstPoint} 2) ${secondPoint} 3) 신청 순서 4) 체크리스트\n마무리: ${cta}`,
    instagram_carousel: `1장: 정책자금 신청 전, 이 자료 없으면 멈추세요\n2장: ${firstPoint}\n3장: ${secondPoint}\n마지막 장: 저장해두고 상담 전 체크리스트로 확인하세요.\n캡션 CTA: ${cta}`,
    instagram_reels: `오프닝: 정책자금 신청하려고요? 이 자료부터 확인하세요.\n본문: ${firstPoint} 그리고 ${secondPoint}\n마무리: 준비 순서가 헷갈리면 Grant Labs 체크리스트부터 열어보세요.`,
    youtube_shorts: `제목: 정책자금 신청 전 꼭 확인할 4가지\n오프닝 질문: 신청 전에 어떤 자료부터 봐야 할까요?\n핵심 답변: ${firstPoint} ${secondPoint}\n고정 댓글: ${campaign.landingPage}`,
    youtube_long: `제목: 정책자금·기업인증 준비 순서, 신청 전에 확인할 것들\n챕터: 00:00 왜 신청 순서가 중요한가 / 01:20 자료 점검 / 03:30 인증과 연구소 / 06:00 체크리스트\n마무리 CTA: ${cta}`,
    tiktok: `오프닝: 정책자금, 지금 바로 신청하면 안 되는 경우가 있습니다.\n본문: ${firstPoint} ${secondPoint}\n엔딩: 신청 전 체크리스트로 빠진 증빙부터 확인하세요.`,
    facebook_page: `정책자금이나 기업인증을 준비 중이라면 신청 전에 자료부터 점검해보세요.\n${firstPoint}\n${secondPoint}\n상담 전 체크리스트: ${campaign.landingPage}\n문의: ${campaign.contact.phone}`,
    linkedin_page: `정책자금과 기업인증은 신청 자체보다 사전 증빙과 순서 설계가 중요합니다.\n${firstPoint}\n${secondPoint}\nGrant Labs는 신청 전 준비도를 먼저 점검하고 실행 순서를 정리합니다.`
  };

  return starters[platform.id] || `${topic}\n${promise}\n${cta}`;
};

const platformBlock = (platform) => {
  const title = `${platform.name}: ${platform.role}`;
  const hook = platform.hook.replace("{topic}", campaign.topic);
  const points = campaign.pillarPoints.slice(0, 4).map((point, index) => `${index + 1}. ${point}`).join("\n");
  const compliance = campaign.complianceNotes.map((note) => `- ${note}`).join("\n");

  return `## ${title}

**Best use:** ${platform.bestFor}

**Recommended format:** ${platform.format}

**Opening hook:** ${hook}

**Creative asset:** ${platform.asset}

**Draft angle:**
${points}

**CTA:** ${platform.cta}

**Tone:** ${platform.tone}

**Avoid:** ${platform.avoid}

**Repurpose rule:** ${platform.repurposeRule}

**Korean post starter:**
${koreanStarter(platform)}

**Compliance guardrails:**
${compliance}
`;
};

const content = `# ${campaign.brand} Content Automation Plan

Date: ${campaign.date}

Campaign: ${campaign.topic}

Audience: ${campaign.primaryAudience}

Core promise: ${campaign.corePromise}

Primary CTA: ${campaign.primaryCta}

Landing page: ${campaign.landingPage}

Contact: ${campaign.contact.phone} / ${campaign.contact.email}

## Pillar Points

${list(campaign.pillarPoints)}

## Korean Pillar Points

${list(campaign.pillarPointsKo || [])}

## Proof Angles

${list(campaign.proofAngles)}

${rules.platforms.map(platformBlock).join("\n")}
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, content, "utf8");

console.log(`Generated content plan: ${outputPath}`);
