import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const campaignPath = process.argv[2] || "content-automation/campaigns/grantlabs-growth-check.json";
const rulesPath = "content-automation/platform-rules.json";
const defaultsPath = "content-automation/publishing-defaults.json";

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const campaign = readJson(campaignPath);
const rules = readJson(rulesPath);
const defaults = readJson(defaultsPath);

const addDays = (dateString, offset) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + offset));
  return date.toISOString().slice(0, 10);
};

const csvValue = (value) => `"${String(value || "").replace(/"/g, '""')}"`;
const platformById = new Map(rules.platforms.map((platform) => [platform.id, platform]));

const rows = defaults.sequence.map((item, index) => {
  const platform = platformById.get(item.platformId);
  if (!platform) {
    throw new Error(`Publishing default references unknown platform: ${item.platformId}`);
  }

  return {
    order: index + 1,
    date: addDays(campaign.date, item.dayOffset),
    time: item.slot,
    platform: platform.name,
    role: platform.role,
    objective: item.objective,
    format: platform.format,
    assetSpec: item.assetSpec,
    hook: platform.hook,
    cta: platform.cta,
    successSignal: item.successSignal,
    guardrail: campaign.complianceNotes.join(" / ")
  };
});

const outputBase = join("content-automation", "output", `${campaign.date}-${campaign.slug}-publishing-queue`);
const csvPath = `${outputBase}.csv`;
const mdPath = `${outputBase}.md`;

const headers = ["order", "date", "time", "platform", "role", "objective", "format", "assetSpec", "hook", "cta", "successSignal", "guardrail"];
const csv = [
  headers.map(csvValue).join(","),
  ...rows.map((row) => headers.map((header) => csvValue(row[header])).join(","))
].join("\n");

const markdown = `# ${campaign.brand} Publishing Queue

Date: ${campaign.date}

Campaign: ${campaign.topicKo || campaign.topic}

Landing page: ${campaign.landingPage}

## Queue

| # | Date | Time | Platform | Objective | Asset | Success signal |
|---|---|---|---|---|---|---|
${rows.map((row) => `| ${row.order} | ${row.date} | ${row.time} | ${row.platform} | ${row.objective} | ${row.assetSpec} | ${row.successSignal} |`).join("\n")}

## Guardrails

${campaign.complianceNotes.map((note) => `- ${note}`).join("\n")}
`;

mkdirSync(dirname(csvPath), { recursive: true });
writeFileSync(csvPath, csv, "utf8");
writeFileSync(mdPath, markdown, "utf8");

console.log(`Generated publishing queue: ${csvPath}`);
console.log(`Generated publishing queue summary: ${mdPath}`);
