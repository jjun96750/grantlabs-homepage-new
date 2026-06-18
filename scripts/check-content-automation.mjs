import { existsSync, readFileSync } from "node:fs";

const files = [
  "content-automation/output/2026-06-18-grantlabs-growth-check.md",
  "content-automation/output/2026-06-18-grantlabs-growth-check-asset-briefs.md",
  "content-automation/output/2026-06-18-grantlabs-growth-check-caption-pack.md",
  "content-automation/output/2026-06-18-grantlabs-growth-check-publishing-queue.md",
  "content-automation/output/2026-06-18-grantlabs-growth-check-publishing-queue.csv"
];

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
const failures = [];

const read = (file) => readFileSync(file, "utf8");

for (const file of files) {
  if (!existsSync(file)) {
    failures.push(`Missing content automation output: ${file}`);
    continue;
  }

  const body = read(file);
  if (body.includes("\uFFFD")) failures.push(`${file} contains replacement characters.`);

  for (const claim of forbiddenClaims) {
    if (body.includes(claim)) failures.push(`${file} includes forbidden claim: ${claim}`);
  }
}

const combined = files.filter(existsSync).map(read).join("\n\n");

for (const marker of requiredPlatformMarkers) {
  if (!combined.includes(marker)) failures.push(`Content automation outputs are missing platform marker: ${marker}`);
}

for (const marker of requiredKoreanMarkers) {
  if (!combined.includes(marker)) failures.push(`Content automation outputs are missing Korean marker: ${marker}`);
}

if (!combined.includes("Do not guarantee approval, selection, or funding amount.")) {
  failures.push("Content automation outputs are missing approval-guarantee guardrail.");
}

if (!combined.includes("https://grantlabs.co.kr/checklist.html")) {
  failures.push("Content automation outputs are missing the checklist landing page.");
}

if (failures.length) {
  console.error("Content automation check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Content automation check passed.");
