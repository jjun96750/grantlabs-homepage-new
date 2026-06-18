import { spawnSync } from "node:child_process";

const campaignPath = process.argv[2] || "content-automation/campaigns/grantlabs-growth-check.json";

const steps = [
  ["content plan", "scripts/generate-content-plan.mjs"],
  ["asset briefs", "scripts/generate-asset-briefs.mjs"],
  ["caption pack", "scripts/generate-caption-pack.mjs"],
  ["publishing queue", "scripts/generate-publishing-queue.mjs"]
];

for (const [label, script] of steps) {
  const result = spawnSync(process.execPath, [script, campaignPath], {
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) {
    console.error(`Content automation failed during ${label}.`);
    process.exit(result.status || 1);
  }
}

console.log("Content automation completed.");
