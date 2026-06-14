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
  { path: "/", marker: "Grant Labs", headers: ["x-content-type-options", "referrer-policy", "permissions-policy"] },
  { path: "/privacy.html", marker: "Grant Labs", headers: ["x-content-type-options", "referrer-policy", "permissions-policy"] },
  { path: "/checklist.html", marker: "checklist-count", headers: ["x-content-type-options", "referrer-policy", "permissions-policy"] },
  { path: "/404.html", marker: "Grant Labs", headers: ["x-content-type-options", "referrer-policy", "permissions-policy"] },
  { path: "/robots.txt", marker: "Sitemap:", headers: ["cache-control"] },
  { path: "/sitemap.xml", marker: "<urlset", headers: ["cache-control"] },
  { path: "/site.webmanifest", marker: "Grant Labs", headers: ["cache-control"] },
  { path: "/favicon.svg", marker: "<svg", headers: ["cache-control"] },
  { path: "/social-card.svg", marker: "Grant Labs social sharing card", headers: ["cache-control"] },
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

    for (const header of check.headers || []) {
      if (!response.headers.get(header)) {
        failures.push(`${check.path} is missing response header: ${header}`);
      }
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
