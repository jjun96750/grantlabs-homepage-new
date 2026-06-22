import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const campaignsDir = "content-automation/campaigns";
const outputDir = "content-automation/output";
const calendarCsv = "content-automation/PUBLISHING_CALENDAR.csv";
const calendarMd = "content-automation/PUBLISHING_CALENDAR.md";
const todayActions = "content-automation/TODAY_ACTIONS.md";
const upcomingActions = "content-automation/UPCOMING_ACTIONS.md";
const performanceLog = "content-automation/PERFORMANCE_LOG.md";
const dailyBrief = "content-automation/DAILY_BRIEF.md";

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
const mojibakeMarkers = ["?뺤", "?곷", "?댄", "泥댄", "湲곗", "臾몄", "\uFFFD"];
const requiredOutputSuffixes = [
  ".md",
  "-asset-briefs.md",
  "-caption-pack.md",
  "-platform-ready-copy.md",
  "-publishing-queue.md",
  "-publishing-queue.csv"
];

const requiredSharedFiles = [
  "content-automation/TRACKED_LINKS.md",
  "content-automation/TRACKED_LINKS.csv"
];

const failures = [];
const read = (file) => readFileSync(file, "utf8");
const includedMarkers = (body, markers) => markers.filter((marker) => body.includes(marker));

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
if (!existsSync(upcomingActions)) failures.push("Missing generated upcoming actions markdown.");
if (!existsSync(performanceLog)) failures.push("Missing generated performance log markdown.");
if (!existsSync(dailyBrief)) failures.push("Missing generated daily brief markdown.");

for (const campaignFile of campaignFiles) {
  try {
    const rawCampaign = read(campaignFile);
    const campaign = JSON.parse(rawCampaign);
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

    for (const marker of includedMarkers(rawCampaign, mojibakeMarkers)) {
      failures.push(`${campaignFile} contains likely mojibake marker: ${marker}`);
    }

    const outputBase = join(outputDir, `${campaign.date}-${campaign.slug}`);
    for (const suffix of requiredOutputSuffixes) {
      const outputPath = suffix === ".md" ? `${outputBase}.md` : `${outputBase}${suffix}`;
      if (!existsSync(outputPath)) failures.push(`Missing generated output for ${campaign.slug}: ${outputPath}`);
    }

    const readyDir = join(outputDir, "platform-ready-copy", `${campaign.date}-${campaign.slug}`);
    const naverReadyPath = join(readyDir, "01-naver-blog-copy.txt");
    if (!existsSync(naverReadyPath)) {
      failures.push(`Missing Naver platform-ready copy for ${campaign.slug}: ${naverReadyPath}`);
    } else {
      const naverReady = read(naverReadyPath);
      const naverParagraphs = naverReady.split(/\n{2,}/).filter((paragraph) => paragraph.trim().length > 0);
      if (!naverReady.includes("https://grantlabs.co.kr/checklist.html")) {
        failures.push(`${naverReadyPath} is missing the raw checklist URL.`);
      }
      if (/^\s*#{1,6}\s+/m.test(naverReady) || /\[[^\]]+\]\(https?:\/\//.test(naverReady)) {
        failures.push(`${naverReadyPath} should be plain text without Markdown headings or links.`);
      }
      if (naverParagraphs.length < 10) {
        failures.push(`${naverReadyPath} needs at least 10 readable paragraphs.`);
      }
    }
  } catch (error) {
    failures.push(`Invalid campaign JSON ${campaignFile}: ${error.message}`);
  }
}

for (const file of outputFiles) {
  const body = read(file);
  if (body.includes("\uFFFD")) failures.push(`${file} contains replacement characters.`);

  for (const marker of includedMarkers(body, mojibakeMarkers)) {
    failures.push(`${file} contains likely mojibake marker: ${marker}`);
  }

  for (const claim of forbiddenClaims) {
    if (body.includes(claim)) failures.push(`${file} includes forbidden claim: ${claim}`);
  }
}

for (const file of outputFiles.filter((file) => file.endsWith("-caption-pack.md"))) {
  const body = read(file);
  const naverMatch = body.match(/## Naver Blog[\s\S]*?(?=\n## |\n$)/);
  const naver = naverMatch?.[0] || "";

  if (!naver) failures.push(`${file} is missing a Naver Blog section.`);
  if (!naver.includes("https://grantlabs.co.kr/checklist.html")) {
    failures.push(`${file} Naver Blog section is missing the raw checklist URL.`);
  }
  if (/\[[^\]]+\]\(https?:\/\//.test(naver)) {
    failures.push(`${file} Naver Blog section should use raw URLs instead of Markdown links.`);
  }
}

for (const file of requiredSharedFiles) {
  if (!existsSync(file)) {
    failures.push(`Missing shared content automation output: ${file}`);
  }
}

if (existsSync("content-automation/TRACKED_LINKS.md")) {
  const trackedLinks = read("content-automation/TRACKED_LINKS.md");
  for (const marker of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "Naver Blog", "LinkedIn Page"]) {
    if (!trackedLinks.includes(marker)) failures.push(`content-automation/TRACKED_LINKS.md is missing marker: ${marker}`);
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
  for (const marker of ["Grant Labs Today Actions", "Today Queue", "Source Files", "Platform Execution Notes", "Reporting Log", "npm run content:today", "consultation-checklist-conversion"]) {
    if (!today.includes(marker)) failures.push(`Today actions document is missing marker: ${marker}`);
  }
}

if (existsSync(upcomingActions)) {
  const upcoming = read(upcomingActions);
  for (const marker of ["Grant Labs Upcoming Actions", "Upcoming Queue", "Date Summary", "Preparation Log", "Source Files", "npm run content:upcoming", "consultation-checklist-conversion"]) {
    if (!upcoming.includes(marker)) failures.push(`Upcoming actions document is missing marker: ${marker}`);
  }
}

if (existsSync(performanceLog)) {
  const performance = read(performanceLog);
  for (const marker of ["Grant Labs Performance Log", "Post Performance", "Campaign Learnings", "Platform Learnings", "npm run content:performance", "consultation-checklist-conversion"]) {
    if (!performance.includes(marker)) failures.push(`Performance log document is missing marker: ${marker}`);
  }
}

if (existsSync(dailyBrief)) {
  const brief = read(dailyBrief);
  for (const marker of ["Grant Labs Daily Brief", "Snapshot", "Today Focus", "Tomorrow Prep", "Update These Records", "npm run content:brief"]) {
    if (!brief.includes(marker)) failures.push(`Daily brief document is missing marker: ${marker}`);
  }
}

if (failures.length) {
  console.error("Content automation check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Content automation check passed.");
