import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const campaignsDir = "content-automation/campaigns";
const readyRoot = "content-automation/output/platform-ready-copy";
const trackedLinksCsv = "content-automation/TRACKED_LINKS.csv";
const rulesPath = "content-automation/platform-rules.json";
const outputPath = "content-automation/PLATFORM_POSTING_QA.md";

const generatedDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(new Date());

const read = (file) => readFileSync(file, "utf8");
const readJson = (file) => JSON.parse(read(file));

const parseCsv = (body) => {
  const [headerLine, ...lines] = body.trim().split(/\r?\n/);
  if (!headerLine) return [];
  const headers = headerLine.split(",");

  return lines.map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
  });
};

const trackedRows = existsSync(trackedLinksCsv) ? parseCsv(read(trackedLinksCsv)) : [];
const trackedLinkByKey = new Map(trackedRows.map((row) => [`${row.campaign}::${row.platform}`, row.trackedUrl]));

const rules = readJson(rulesPath);
const platformFiles = {
  "Naver Blog": "01-naver-blog-copy.txt",
  "Instagram Carousel": "02-instagram-carousel-caption.txt",
  "Instagram Reels": "03-instagram-reels-script.txt",
  "YouTube Shorts": "04-youtube-shorts-script.txt",
  "YouTube Long-form": "05-youtube-long-description.txt",
  "TikTok": "06-tiktok-caption.txt",
  "Facebook Page": "07-facebook-page-post.txt",
  "LinkedIn Page": "08-linkedin-page-post.txt"
};

const pasteChecks = {
  "Naver Blog": [
    "Paste from the plain-text file, not the Markdown caption pack.",
    "Confirm the raw tracked URL is visible on its own line.",
    "Check mobile readability after editor line wrapping."
  ],
  "Instagram Carousel": [
    "Use the caption as support for the slides, not as a long article.",
    "Place the tracked URL in profile, story, or follow-up route.",
    "Confirm the first slide is readable from the grid."
  ],
  "Instagram Reels": [
    "Use the script for voiceover/caption planning.",
    "Do not rely on a clickable caption URL.",
    "Confirm burned-in captions are readable on mobile."
  ],
  "YouTube Shorts": [
    "Use a searchable title and short description.",
    "Pin the tracked URL in the first comment.",
    "Confirm the first sentence answers one clear question."
  ],
  "YouTube Long-form": [
    "Keep chapter markers in the description.",
    "Place the tracked URL in description and pinned comment.",
    "Cut Shorts from the strongest sections after publishing."
  ],
  "TikTok": [
    "Keep the opening warning or payoff immediate.",
    "Do not rely on a clickable caption URL.",
    "Route viewers through profile/comment/DM as available."
  ],
  "Facebook Page": [
    "Keep the tracked URL visible in the post body.",
    "Confirm the link preview or image is readable.",
    "Add phone/contact CTA only when it fits the post."
  ],
  "LinkedIn Page": [
    "Keep paragraphs short and executive-readable.",
    "Use the tracked URL in the body or first comment.",
    "Check every claim for evidence-led, non-guarantee wording."
  ]
};

const linkHandling = {
  "Naver Blog": "Raw URL in the body; avoid Markdown link syntax.",
  "Instagram Carousel": "Caption links are not reliable; use profile, story, comments, or DM routing.",
  "Instagram Reels": "Caption links are not reliable; use profile, story, comments, or DM routing.",
  "YouTube Shorts": "Use pinned comment plus description when available.",
  "YouTube Long-form": "Use description, pinned comment, and chapter context.",
  "TikTok": "Use profile link, comment routing, or DM path where available.",
  "Facebook Page": "Visible URL in body or link-preview post.",
  "LinkedIn Page": "Visible URL in body or first comment, depending on reach preference."
};

const campaignFiles = readdirSync(campaignsDir)
  .map((name) => join(campaignsDir, name))
  .filter((file) => statSync(file).isFile())
  .filter((file) => file.endsWith(".json"))
  .sort();

const rows = campaignFiles.flatMap((campaignFile) => {
  const campaign = readJson(campaignFile);
  const baseName = `${campaign.date}-${campaign.slug}`;
  const readyDir = join(readyRoot, baseName);

  return rules.platforms.map((platform) => {
    const fileName = platformFiles[platform.name];
    const filePath = join(readyDir, fileName);
    const trackedUrl = trackedLinkByKey.get(`${campaign.slug}::${platform.name}`) || campaign.landingPage;
    const status = existsSync(filePath) && trackedUrl ? "Ready" : "Needs setup";
    return {
      campaign,
      platform,
      fileName,
      filePath,
      trackedUrl,
      status
    };
  });
});

const tableRows = rows.map((row) => `| ${row.campaign.date} | \`${row.campaign.slug}\` | ${row.platform.name} | ${row.status} | \`${row.filePath.replaceAll("\\", "/")}\` | ${row.trackedUrl} | ${linkHandling[row.platform.name]} |`).join("\n");

const platformSections = rules.platforms.map((platform) => `## ${platform.name}

- Role: ${platform.role}
- Best format: ${platform.format}
- CTA behavior: ${linkHandling[platform.name]}
- Ready-copy file: \`${platformFiles[platform.name]}\`

### Editor Paste QA

${pasteChecks[platform.name].map((item) => `- ${item}`).join("\n")}
`).join("\n");

const readyCount = rows.filter((row) => row.status === "Ready").length;

const content = `# Grant Labs Platform Posting QA

Last generated: ${generatedDate}

This file is generated by \`npm run content:posting-qa\`. It turns platform rules, tracked links, and ready-copy files into a pre-publish QA sheet for each site.

## Summary

- Total platform posts checked: ${rows.length}
- Ready: ${readyCount}
- Needs setup: ${rows.length - readyCount}

## Campaign Posting Matrix

| Date | Campaign | Platform | Status | Ready-copy file | Tracked CTA URL | Link handling |
| --- | --- | --- | --- | --- | --- | --- |
${tableRows}

## Platform Editor QA

${platformSections}
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, content, "utf8");

console.log(`Generated platform posting QA: ${outputPath}`);
