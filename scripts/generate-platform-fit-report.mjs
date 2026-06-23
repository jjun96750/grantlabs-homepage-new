import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const campaignsDir = "content-automation/campaigns";
const readyRoot = "content-automation/output/platform-ready-copy";
const outputPath = "content-automation/PLATFORM_FIT_REPORT.md";

const generatedDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(new Date());

const platformFiles = [
  {
    platform: "Naver Blog",
    fileName: "01-naver-blog-copy.txt",
    checks: [
      ["raw checklist URL", (body) => body.includes("https://grantlabs.co.kr/checklist.html")],
      ["no Markdown links", (body) => !/\[[^\]]+\]\(https?:\/\//.test(body)],
      ["section breaks", (body) => body.includes("----------------------------------------")],
      ["readable paragraph count", (body) => paragraphCount(body) >= 10]
    ],
    standard: "Use the plain-text file, preserve paragraph spacing, keep the raw URL visible, and connect it with Naver SmartEditor link controls if auto-linking fails."
  },
  {
    platform: "Instagram Carousel",
    fileName: "02-instagram-carousel-caption.txt",
    checks: [
      ["profile or story routing", (body) => /profile|story|DM|프로필|스토리/.test(body)],
      ["raw URL retained for operator", (body) => body.includes("https://grantlabs.co.kr/checklist.html")],
      ["hashtags", (body) => body.includes("#GrantLabs")]
    ],
    standard: "Treat the caption as support copy. Route clicks through profile, story, or DM, and keep slide text readable without relying on caption links."
  },
  {
    platform: "Instagram Reels",
    fileName: "03-instagram-reels-script.txt",
    checks: [
      ["short-form hook", (body) => /first 2 seconds|첫 2초|Hook/i.test(body)],
      ["profile or DM routing", (body) => /profile|story|DM|프로필|스토리/.test(body)],
      ["raw URL retained for operator", (body) => body.includes("https://grantlabs.co.kr/checklist.html")]
    ],
    standard: "Use a fast opening hook, visible captions, and profile/story/DM routing because caption links may not be clickable."
  },
  {
    platform: "YouTube Shorts",
    fileName: "04-youtube-shorts-script.txt",
    checks: [
      ["short-form hook", (body) => /first 2 seconds|첫 2초|Hook/i.test(body)],
      ["pinned comment guidance", (body) => body.includes("Pinned comment")],
      ["raw URL", (body) => body.includes("https://grantlabs.co.kr/checklist.html")]
    ],
    standard: "Use a searchable question, keep the script short, and place the checklist URL in the pinned comment."
  },
  {
    platform: "YouTube Long-form",
    fileName: "05-youtube-long-description.txt",
    checks: [
      ["title", (body) => body.includes("Title:")],
      ["chapters", (body) => body.includes("Chapters:") && body.includes("00:00")],
      ["pinned comment guidance", (body) => body.includes("Pinned comment")],
      ["raw URL", (body) => body.includes("https://grantlabs.co.kr/checklist.html")]
    ],
    standard: "Use the description and pinned comment for the checklist URL, keep chapters, and frame the video as practical education."
  },
  {
    platform: "TikTok",
    fileName: "06-tiktok-caption.txt",
    checks: [
      ["short-form hook", (body) => /first 2 seconds|첫 2초|Hook/i.test(body)],
      ["profile or comment routing", (body) => /profile|comment|프로필|댓글/.test(body)],
      ["raw URL retained for operator", (body) => body.includes("https://grantlabs.co.kr/checklist.html")]
    ],
    standard: "Use direct warning-style language, large captions, and a profile/comment route instead of assuming caption links will work."
  },
  {
    platform: "Facebook Page",
    fileName: "07-facebook-page-post.txt",
    checks: [
      ["post label", (body) => body.includes("Post:")],
      ["raw URL", (body) => body.includes("https://grantlabs.co.kr/checklist.html")],
      ["brief paragraph count", (body) => paragraphCount(body) >= 4]
    ],
    standard: "Keep the post referral-friendly, show the URL in the body, and include a clear contact or consultation next step."
  },
  {
    platform: "LinkedIn Page",
    fileName: "08-linkedin-page-post.txt",
    checks: [
      ["post label", (body) => body.includes("Post:")],
      ["key checks", (body) => body.includes("Key checks:")],
      ["raw URL", (body) => body.includes("https://grantlabs.co.kr/checklist.html")]
    ],
    standard: "Use an executive, evidence-led tone with clear business implications and a visible checklist URL."
  }
];

const read = (file) => readFileSync(file, "utf8");
const readJson = (file) => JSON.parse(read(file));

function paragraphCount(body) {
  return body.split(/\n{2,}/).filter((paragraph) => paragraph.trim()).length;
}

function scoreFor(rule, body) {
  const results = rule.checks.map(([label, predicate]) => ({
    label,
    passed: predicate(body)
  }));
  const passed = results.filter((result) => result.passed).length;
  return {
    score: `${passed}/${results.length}`,
    status: passed === results.length ? "Ready" : "Needs platform edit",
    notes: results.filter((result) => !result.passed).map((result) => result.label).join("; ") || "Platform fit checks passed"
  };
}

const campaignFiles = readdirSync(campaignsDir)
  .map((name) => join(campaignsDir, name))
  .filter((file) => statSync(file).isFile())
  .filter((file) => file.endsWith(".json"))
  .sort();

const rows = [];

for (const campaignFile of campaignFiles) {
  const campaign = readJson(campaignFile);
  const readyDir = join(readyRoot, `${campaign.date}-${campaign.slug}`);

  for (const rule of platformFiles) {
    const filePath = join(readyDir, rule.fileName);
    if (!existsSync(filePath)) {
      rows.push({
        date: campaign.date,
        campaign: campaign.slug,
        platform: rule.platform,
        fileName: rule.fileName,
        score: "0/0",
        status: "Missing",
        notes: "Ready-copy file is missing"
      });
      continue;
    }

    rows.push({
      date: campaign.date,
      campaign: campaign.slug,
      platform: rule.platform,
      fileName: rule.fileName,
      ...scoreFor(rule, read(filePath))
    });
  }
}

const readyCount = rows.filter((row) => row.status === "Ready").length;
const reviewCount = rows.length - readyCount;
const tableRows = rows
  .map((row) => `| ${row.date} | \`${row.campaign}\` | ${row.platform} | \`${row.fileName}\` | ${row.score} | ${row.status} | ${row.notes} |`)
  .join("\n");
const standardRows = platformFiles
  .map((rule) => `| ${rule.platform} | ${rule.standard} |`)
  .join("\n");

const content = `# Grant Labs Platform Fit Report

Last generated: ${generatedDate}

This file is generated by \`npm run content:platform-fit\`. It checks whether each copy-and-paste file fits the posting behavior of the destination site.

## Summary

- Total platform checks: ${rows.length}
- Ready: ${readyCount}
- Needs platform edit or missing: ${reviewCount}

## Platform Fit Matrix

| Date | Campaign | Platform | File | Score | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
${tableRows}

## Channel Standards

| Platform | Posting standard |
| --- | --- |
${standardRows}

## Operator Rule

- Naver Blog: preserve paragraph spacing and raw URL, then connect the URL with SmartEditor link controls if auto-linking fails.
- Instagram and TikTok: assume caption URLs may not be clickable; route through profile, story, DM, pinned comment, or description.
- YouTube: put the checklist URL in the description and pinned comment.
- Facebook and LinkedIn: keep the URL visible in the post body and avoid unsupported approval guarantees.
`;

writeFileSync(outputPath, content, "utf8");
console.log(`Generated platform fit report: ${outputPath}`);
