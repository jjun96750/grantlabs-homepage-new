const baseUrl = process.argv[2];

if (!baseUrl) {
  console.error("Usage: node scripts/check-deployed-site.mjs https://your-pages-preview.pages.dev");
  process.exit(1);
}

let origin;
try {
  origin = new URL(baseUrl).origin;
} catch {
  console.error(`Invalid URL: ${baseUrl}`);
  process.exit(1);
}

const checks = [
  { path: "/", marker: "Grant Labs" },
  { path: "/privacy.html", marker: "Grant Labs" },
  { path: "/checklist.html", marker: "checklist-count" },
  { path: "/404.html", marker: "Grant Labs" },
  { path: "/robots.txt", marker: "Sitemap:" },
  { path: "/sitemap.xml", marker: "<urlset" },
  { path: "/site.webmanifest", marker: "Grant Labs" },
  { path: "/favicon.svg", marker: "<svg" },
  { path: "/social-card.svg", marker: "Grant Labs social sharing card" },
];

const failures = [];

for (const check of checks) {
  const url = new URL(check.path, origin);

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "GrantLabsDeploySmokeTest/1.0" },
    });
    const text = await response.text();

    if (!response.ok) {
      failures.push(`${check.path} returned HTTP ${response.status}`);
      continue;
    }

    if (!text.includes(check.marker)) {
      failures.push(`${check.path} did not include marker: ${check.marker}`);
    }
  } catch (error) {
    failures.push(`${check.path} request failed: ${error.message}`);
  }
}

if (failures.length) {
  console.error("Deployed site smoke check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Deployed site smoke check passed: ${origin}`);
