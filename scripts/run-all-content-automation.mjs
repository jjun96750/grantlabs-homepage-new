import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const campaignsDir = "content-automation/campaigns";

const campaignFiles = readdirSync(campaignsDir)
  .map((name) => join(campaignsDir, name))
  .filter((file) => statSync(file).isFile())
  .filter((file) => file.endsWith(".json"))
  .sort();

if (!campaignFiles.length) {
  console.error(`No campaign files found in ${campaignsDir}.`);
  process.exit(1);
}

for (const campaignPath of campaignFiles) {
  console.log(`\nRunning content automation for ${campaignPath}`);
  const result = spawnSync(process.execPath, ["scripts/run-content-automation.mjs", campaignPath], {
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) {
    console.error(`Content automation failed for ${campaignPath}.`);
    process.exit(result.status || 1);
  }
}

const statusResult = spawnSync(process.execPath, ["scripts/generate-content-status.mjs"], {
  stdio: "inherit",
  shell: false
});

if (statusResult.status !== 0) {
  console.error("Content automation status generation failed.");
  process.exit(statusResult.status || 1);
}

const calendarResult = spawnSync(process.execPath, ["scripts/generate-publishing-calendar.mjs"], {
  stdio: "inherit",
  shell: false
});

if (calendarResult.status !== 0) {
  console.error("Publishing calendar generation failed.");
  process.exit(calendarResult.status || 1);
}

const todayResult = spawnSync(process.execPath, ["scripts/generate-today-actions.mjs"], {
  stdio: "inherit",
  shell: false
});

if (todayResult.status !== 0) {
  console.error("Today actions generation failed.");
  process.exit(todayResult.status || 1);
}

const upcomingResult = spawnSync(process.execPath, ["scripts/generate-upcoming-actions.mjs"], {
  stdio: "inherit",
  shell: false
});

if (upcomingResult.status !== 0) {
  console.error("Upcoming actions generation failed.");
  process.exit(upcomingResult.status || 1);
}

const performanceResult = spawnSync(process.execPath, ["scripts/generate-performance-log.mjs"], {
  stdio: "inherit",
  shell: false
});

if (performanceResult.status !== 0) {
  console.error("Performance log generation failed.");
  process.exit(performanceResult.status || 1);
}

const linksResult = spawnSync(process.execPath, ["scripts/generate-tracked-links.mjs"], {
  stdio: "inherit",
  shell: false
});

if (linksResult.status !== 0) {
  console.error("Tracked links generation failed.");
  process.exit(linksResult.status || 1);
}

const playbookResult = spawnSync(process.execPath, ["scripts/generate-platform-playbook.mjs"], {
  stdio: "inherit",
  shell: false
});

if (playbookResult.status !== 0) {
  console.error("Platform playbook generation failed.");
  process.exit(playbookResult.status || 1);
}

const briefResult = spawnSync(process.execPath, ["scripts/generate-daily-brief.mjs"], {
  stdio: "inherit",
  shell: false
});

if (briefResult.status !== 0) {
  console.error("Daily brief generation failed.");
  process.exit(briefResult.status || 1);
}

console.log(`\nContent automation completed for ${campaignFiles.length} campaign(s).`);
