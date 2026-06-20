import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const campaignsDir = "content-automation/campaigns";
const outputDir = "content-automation/output";
const calendarCsv = "content-automation/PUBLISHING_CALENDAR.csv";
const calendarMd = "content-automation/PUBLISHING_CALENDAR.md";
const todayActions = "content-automation/TODAY_ACTIONS.md";

const requiredPlatformMarkers = [
  "Naver Blog",
  "Instagram Carousel",
  "Instagram Reels",
  "YouTube Shorts",
  "YouTube Long-form",
  "TikTok",
  "Facebook Page",
  "LinkedIn Page"
];

const requiredKoreanMarkers = ["정책자금", "기업인증", "체크리스트"];
const forbiddenClaims = ["100% 승인", "무조건 승인", "정부 공식 대행", "보장합니다", "확정"];
const requiredOutputSuffixes = [
  ".md",
  "-asset-briefs.md",
  "-caption-pack.md",
  "-publishing-queue.md",
  "-publishing-queue.csv"
];

const failures = [];
const read = (file) => readFileSync(file, "utf8");

const listFiles = (dir, predicate) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .map((name) => join(dir, name))
    .filter((file) => statSync(file).isFile())
    .filter(predicate);
};

const campaignFiles = listFiles(campaignsDir, (file) => file.endsWith(".json"));
const outputFiles = listFiles(outputDir, (file) => file.endsWith(".md") || file.endsWith(".csv"));

if (!campaignFiles.length) failures.push("No content automation campaigns found.");
if (!outputFiles.length) failures.push("No content automation outputs found.");
if (!existsSync(calendarCsv)) failures.push("Missing generated publishing calendar CSV.");
if (!existsSync(calendarMd)) failures.push("Missing generated publishing calendar markdown.");
if (!existsSync(todayActions)) failures.push("Missing generated today actions markdown.");

for (const campaignFile of campaignFiles) {
  try {
    const campaign = JSON.parse(read(campaignFile));
    for (const field of ["slug", "date", "brand", "topic", "topicKo", "corePromise", "primaryCta", "landingPage"]) {
      if (!campaign[field]) failures.push(`${campaignFile} is missing field: ${field}`);
    }

    if (!Array.isArray(campaign.pillarPoints) || campaign.pillarPoints.length < 4) {
      failures.push(`${campaignFile} should include at least four pillar points.`);
    }

    if (!Array.isArray(campaign.pillarPointsKo) || campaign.pillarPointsKo.length < 4) {
      failures.push(`${campaignFile} should include at least four Korean pillar points.`);
    }

    if (!Array.isArray(campaign.complianceNotes) || campaign.complianceNotes.length < 3) {
      failures.push(`${campaignFile} should include compliance guardrails.`);
    }

    const outputBase = join(outputDir, `${campaign.date}-${campaign.slug}`);
    for (const suffix of requiredOutputSuffixes) {
      const outputPath = suffix === ".md" ? `${outputBase}.md` : `${outputBase}${suffix}`;
      if (!existsSync(outputPath)) failures.push(`Missing generated output for ${campaign.slug}: ${outputPath}`);
    }
  } catch (error) {
    failures.push(`Invalid campaign JSON ${campaignFile}: ${error.message}`);
  }
}

for (const file of outputFiles) {
  const body = read(file);
  if (body.includes("\uFFFD")) failures.push(`${file} contains replacement characters.`);

  for (const claim of forbiddenClaims) {
    if (body.includes(claim)) failures.push(`${file} includes forbidden claim: ${claim}`);
  }
}

const combined = outputFiles.map(read).join("\n\n");

for (const marker of requiredPlatformMarkers) {
  if (!combined.includes(marker)) failures.push(`Content automation outputs are missing platform marker: ${marker}`);
}

for (const marker of requiredKoreanMarkers) {
  if (!combined.includes(marker)) failures.push(`Content automation outputs are missing Korean marker: ${marker}`);
}

const hasApprovalGuardrail =
  combined.includes("Do not guarantee approval, selection, or funding amount.") ||
  combined.includes("Do not guarantee R&D-center approval, certification, or funding.");
if (!hasApprovalGuardrail) failures.push("Content automation outputs are missing approval-guarantee guardrail.");

if (!combined.includes("https://grantlabs.co.kr/checklist.html")) {
  failures.push("Content automation outputs are missing the checklist landing page.");
}

if (existsSync(calendarMd)) {
  const calendar = read(calendarMd);
  for (const marker of ["Grant Labs Publishing Calendar", "npm run content:calendar", "Naver Blog", "LinkedIn Page", "consultation-checklist-conversion"]) {
    if (!calendar.includes(marker)) failures.push(`Publishing calendar is missing marker: ${marker}`);
  }
}

if (existsSync(todayActions)) {
  const today = read(todayActions);
  for (const marker of ["Grant Labs Today Actions", "Today Queue", "npm run content:today", "consultation-checklist-conversion"]) {
    if (!today.includes(marker)) failures.push(`Today actions document is missing marker: ${marker}`);
  }
}

if (failures.length) {
  console.error("Content automation check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Content automation check passed.");
