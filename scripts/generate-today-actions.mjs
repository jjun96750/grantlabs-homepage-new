import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const calendarCsv = "content-automation/PUBLISHING_CALENDAR.csv";
const trackedLinksCsv = "content-automation/TRACKED_LINKS.csv";
const copyQualityReportPath = "content-automation/COPY_QUALITY_REPORT.md";
const campaignsDir = "content-automation/campaigns";
const platformRulesPath = "content-automation/platform-rules.json";
const outputPath = "content-automation/TODAY_ACTIONS.md";
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(new Date());

const parseCsvLine = (line) => {
  const values = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === "\"" && inQuotes && next === "\"") {
      value += "\"";
      index += 1;
    } else if (char === "\"") {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(value);
      value = "";
    } else {
      value += char;
    }
  }

  values.push(value);
  return values;
};

const parseCsv = (body) => {
  const [headerLine, ...lines] = body.trim().split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(headerLine);
  return lines.map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
  });
};

const allRows = existsSync(calendarCsv)
  ? parseCsv(readFileSync(calendarCsv, "utf8"))
  : [];

const rows = allRows.filter((row) => row.publishDate === today);
const overdueRows = allRows.filter((row) => row.publishDate < today);
const handoffRows = [...overdueRows, ...rows];

const trackedRows = existsSync(trackedLinksCsv)
  ? parseCsv(readFileSync(trackedLinksCsv, "utf8"))
  : [];

const platformRules = existsSync(platformRulesPath)
  ? JSON.parse(readFileSync(platformRulesPath, "utf8")).platforms || []
  : [];

const platformByName = new Map(platformRules.map((platform) => [platform.name, platform]));
const trackedLinkByKey = new Map(trackedRows.map((row) => [`${row.campaign}::${row.platform}`, row.trackedUrl]));

const readyCopyByPlatform = {
  "Naver Blog": "01-naver-blog-copy.txt",
  "Instagram Carousel": "02-instagram-carousel-caption.txt",
  "Instagram Reels": "03-instagram-reels-script.txt",
  "YouTube Shorts": "04-youtube-shorts-script.txt",
  "YouTube Long-form": "05-youtube-long-description.txt",
  "TikTok": "06-tiktok-caption.txt",
  "Facebook Page": "07-facebook-page-post.txt",
  "LinkedIn Page": "08-linkedin-page-post.txt"
};

const finalCheckByPlatform = {
  "Naver Blog": "Raw URL visible, no Markdown links, section breaks kept",
  "Instagram Carousel": "Profile/story/DM link route set, first slide readable",
  "Instagram Reels": "Profile/story/DM link route set, first 2 seconds strong",
  "YouTube Shorts": "Pinned comment URL ready, title is searchable",
  "YouTube Long-form": "Description URL and pinned comment ready, chapters kept",
  "TikTok": "Profile/comment link route set, captions large",
  "Facebook Page": "URL visible, phone/contact CTA present",
  "LinkedIn Page": "URL visible, tone is executive and evidence-led"
};

function parseQualityRows(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => line.startsWith("| "))
    .filter((line) => !line.includes("| ---"))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()))
    .filter((cells) => cells.length >= 6 && cells[0] !== "Date")
    .map(([date, campaign, platform, fileName, status, notes]) => ({
      date,
      campaign: campaign.replace(/`/g, ""),
      platform,
      fileName: fileName.replace(/`/g, ""),
      status,
      notes
    }));
}

const qualityRows = existsSync(copyQualityReportPath)
  ? parseQualityRows(readFileSync(copyQualityReportPath, "utf8"))
  : [];
const qualityByKey = new Map(qualityRows.map((row) => [`${row.campaign}::${row.platform}`, row]));

const campaignBySlug = new Map(
  readdirSync(campaignsDir)
    .map((name) => join(campaignsDir, name))
    .filter((file) => statSync(file).isFile())
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const campaign = JSON.parse(readFileSync(file, "utf8"));
      return [campaign.slug, campaign];
    })
);

const actionRows = rows.length
  ? rows.map((row) => `| ${row.publishTime} | ${row.platform} | \`${row.campaign}\` | ${row.objective} | ${row.assetSpec} | ${row.successSignal} |`).join("\n")
  : "| n/a | n/a | n/a | No scheduled publishing actions for today. | n/a | n/a |";

const overdueActionRows = overdueRows.length
  ? overdueRows.map((row) => {
    const readyFile = readyCopyByPlatform[row.platform] || "See platform-ready folder";
    const campaign = campaignBySlug.get(row.campaign);
    const readyFileLink = campaign
      ? `[${readyFile}](output/platform-ready-copy/${campaign.date}-${campaign.slug}/${readyFile})`
      : `\`${readyFile}\``;
    const trackedUrl = trackedLinkByKey.get(`${row.campaign}::${row.platform}`) || row.landingPage || "missing tracked URL";
    const finalCheck = finalCheckByPlatform[row.platform] || "Match the platform playbook before publishing";

    return `| ${row.publishDate} ${row.publishTime} | ${row.platform} | \`${row.campaign}\` | ${readyFileLink} | ${trackedUrl} | ${finalCheck} |`;
  }).join("\n")
  : "| n/a | n/a | n/a | No overdue publishing actions. | n/a | n/a |";

const guardrails = [...new Set(handoffRows.map((row) => row.guardrail).filter(Boolean))]
  .map((guardrail) => `- ${guardrail}`)
  .join("\n") || "- Keep claims diagnostic and preparation-focused. Do not guarantee approval, funding, certification, or patent outcomes.";

const sourceRows = [...new Set(handoffRows.map((row) => row.campaign))]
  .sort()
  .map((slug) => {
    const campaign = campaignBySlug.get(slug);
    if (!campaign) return `| \`${slug}\` | missing campaign file | missing | missing | missing | missing | missing |`;

    const base = `${campaign.date}-${campaign.slug}`;
    return `| \`${slug}\` | [Plan](output/${base}.md) | [Assets](output/${base}-asset-briefs.md) | [Captions](output/${base}-caption-pack.md) | [Ready Copy](output/${base}-platform-ready-copy.md) | [Queue](output/${base}-publishing-queue.md) | [CSV](output/${base}-publishing-queue.csv) |`;
  })
  .join("\n") || "| n/a | n/a | n/a | n/a | n/a | n/a | n/a |";

const executionRows = rows.length
  ? rows.map((row) => {
    const platform = platformByName.get(row.platform);
    if (!platform) {
      return `| ${row.publishTime} | ${row.platform} | Match the asset to the scheduled format. | Capture the post URL and first engagement signal. | Use the campaign source files for follow-up variants. |`;
    }

    return `| ${row.publishTime} | ${row.platform} | ${platform.format} Hook: ${platform.hook} | Check ${row.successSignal}. CTA: ${platform.cta} | ${platform.repurposeRule} Avoid: ${platform.avoid} |`;
  }).join("\n")
  : "| n/a | n/a | No scheduled publishing actions. | n/a | n/a |";

const operatorRows = rows.length
  ? rows.map((row) => {
    const readyFile = readyCopyByPlatform[row.platform] || "See platform-ready folder";
    const campaign = campaignBySlug.get(row.campaign);
    const readyFileLink = campaign
      ? `[${readyFile}](output/platform-ready-copy/${campaign.date}-${campaign.slug}/${readyFile})`
      : `\`${readyFile}\``;
    const trackedUrl = trackedLinkByKey.get(`${row.campaign}::${row.platform}`) || row.landingPage || "missing tracked URL";
    const quality = qualityByKey.get(`${row.campaign}::${row.platform}`);
    const qualityText = quality ? quality.status : "Not checked";
    const finalCheck = finalCheckByPlatform[row.platform] || "Match the platform playbook before publishing";

    return `| ${row.publishTime} | ${row.platform} | \`${row.campaign}\` | ${readyFileLink} | ${qualityText} | ${trackedUrl} | ${finalCheck} |`;
  }).join("\n")
  : "| n/a | n/a | n/a | n/a | n/a | n/a | No scheduled publishing actions. |";

const reportingRows = rows.length
  ? rows.map((row) => `| ${row.publishTime} | ${row.platform} | \`${row.campaign}\` |  |  |  |  |`).join("\n")
  : "| n/a | n/a | n/a |  |  |  |  |";

const content = `# Grant Labs Today Actions

Date: ${today}

This file is generated by \`npm run content:today\`. It filters \`content-automation/PUBLISHING_CALENDAR.csv\` to show today's publishing actions and any overdue carryover for quick operator handoff.

## Today Queue

| Time | Platform | Campaign | Objective | Asset | Success signal |
| --- | --- | --- | --- | --- | --- |
${actionRows}

## Overdue Carryover

Review these first. If an item already shipped, add the published URL to \`content-automation/PERFORMANCE_LOG.md\`; otherwise publish or reschedule it before adding new variants.

| Original slot | Platform | Campaign | Ready-copy file | Tracked URL | Final check |
| --- | --- | --- | --- | --- | --- |
${overdueActionRows}

## Guardrails

${guardrails}

## Source Files

| Campaign | Plan | Assets | Captions | Ready Copy | Queue | CSV |
| --- | --- | --- | --- | --- | --- | --- |
${sourceRows}

## Platform Execution Notes

| Time | Platform | Before publishing | After publishing | Repurpose note |
| --- | --- | --- | --- | --- |
${executionRows}

## Operator Posting Checklist

Use this table at publishing time. It points to the exact copy file, the tracked URL to place in the post or profile route, and the final channel-specific check.

| Time | Platform | Campaign | Ready-copy file | Quality | Tracked URL | Final check |
| --- | --- | --- | --- | --- | --- | --- |
${operatorRows}

## Reporting Log

Fill this after each post so the next collaborator can see what actually shipped.

| Time | Platform | Campaign | Published URL | Posted by | First signal | Follow-up needed |
| --- | --- | --- | --- | --- | --- | --- |
${reportingRows}

## Refresh

\`\`\`bash
npm run content:run:all
npm run content:today
\`\`\`
`;

writeFileSync(outputPath, content, "utf8");
console.log(`Generated today actions: ${outputPath}`);
