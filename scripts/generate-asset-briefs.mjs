import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const campaignPath = process.argv[2] || "content-automation/campaigns/grantlabs-growth-check.json";
const rulesPath = "content-automation/platform-rules.json";
const defaultsPath = "content-automation/publishing-defaults.json";

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const campaign = readJson(campaignPath);
const rules = readJson(rulesPath);
const defaults = readJson(defaultsPath);

const platformById = new Map(rules.platforms.map((platform) => [platform.id, platform]));

const specsByPlatform = {
  naver_blog: {
    canvas: "Blog cover 1280x720 plus inline checklist/table captures",
    checklist: ["Headline includes the core keyword", "Use H2 sections", "Include checklist CTA above the fold and at the end"]
  },
  instagram_carousel: {
    canvas: "1080x1080 carousel, 7-9 slides",
    checklist: ["One idea per slide", "Large Korean text", "Final slide is save-worthy checklist"]
  },
  instagram_reels: {
    canvas: "1080x1920 vertical video, 20-35 seconds",
    checklist: ["Hook in first 2 seconds", "Burned-in captions", "CTA in final 3 seconds"]
  },
  youtube_shorts: {
    canvas: "1080x1920 vertical video, 30-55 seconds",
    checklist: ["Question-led title", "Spoken answer structure", "Pinned comment points to checklist"]
  },
  youtube_long: {
    canvas: "1920x1080 long-form video, 6-10 minutes",
    checklist: ["Add chapters", "Show checklist URL verbally and visually", "Cut 2-3 Shorts from sections"]
  },
  tiktok: {
    canvas: "1080x1920 vertical video, 15-30 seconds",
    checklist: ["Warning-style hook", "Fast pacing", "Text is readable on small screens"]
  },
  facebook_page: {
    canvas: "Link preview or 1200x630 readable image",
    checklist: ["Phone CTA visible", "Plain business-owner language", "Avoid hashtag-heavy caption"]
  },
  linkedin_page: {
    canvas: "Text post or document carousel",
    checklist: ["Lead with business implication", "No slang", "Use executive-ready wording"]
  }
};

const briefFor = (item, order) => {
  const platform = platformById.get(item.platformId);
  if (!platform) throw new Error(`Unknown platform: ${item.platformId}`);

  const spec = specsByPlatform[item.platformId] || {
    canvas: item.assetSpec,
    checklist: ["Match platform format", "Use campaign CTA", "Respect compliance guardrails"]
  };

  const points = campaign.pillarPointsKo || campaign.pillarPoints;

  return `## ${order}. ${platform.name}

Role: ${platform.role}

Objective: ${item.objective}

Canvas: ${spec.canvas}

Core hook: ${platform.hook}

Message source:
- ${points[0]}
- ${points[1]}

Production checklist:
${spec.checklist.map((task) => `- ${task}`).join("\n")}

CTA: ${campaign.primaryCtaKo || campaign.primaryCta}

Landing page: ${campaign.landingPage}

Success signal: ${item.successSignal}
`;
};

const outputPath = join("content-automation", "output", `${campaign.date}-${campaign.slug}-asset-briefs.md`);
const briefs = defaults.sequence.map((item, index) => briefFor(item, index + 1)).join("\n");

const content = `# ${campaign.brand} Asset Briefs

Date: ${campaign.date}

Campaign: ${campaign.topicKo || campaign.topic}

These briefs convert the publishing queue into production-ready asset instructions.

${briefs}

## Compliance Guardrails

${campaign.complianceNotes.map((note) => `- ${note}`).join("\n")}
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, content, "utf8");

console.log(`Generated asset briefs: ${outputPath}`);
