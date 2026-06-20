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
  { path: "/", marker: "Grant Labs", contentType: "text/html", headers: ["strict-transport-security", "content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"] },
  { path: "/privacy.html", marker: "Grant Labs", contentType: "text/html", headers: ["strict-transport-security", "content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"] },
  { path: "/checklist.html", marker: "checklist-count", contentType: "text/html", headers: ["strict-transport-security", "content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"] },
  { path: "/404.html", marker: "Grant Labs", contentType: "text/html", headers: ["strict-transport-security", "content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"] },
  { path: "/robots.txt", marker: "Sitemap:", contentType: "text/plain", headers: ["cache-control"] },
  { path: "/sitemap.xml", marker: "<urlset", contentType: "xml", headers: ["cache-control"] },
  { path: "/site.webmanifest", marker: "Grant Labs", contentType: "json", headers: ["cache-control"] },
  { path: "/favicon.svg", marker: "<svg", contentType: "image/svg", headers: ["cache-control"] },
  { path: "/assets/brand/grant-labs-logo-white.svg", marker: "Grant Labs", contentType: "image/svg", headers: ["cache-control"] },
  { path: "/assets/brand/grant-labs-logo-black.svg", marker: "Grant Labs", contentType: "image/svg", headers: ["cache-control"] },
  { path: "/social-card.svg", marker: "GROWTH FUNDING PARTNER", contentType: "image/svg", headers: ["cache-control"] },
];

const sitemapContentCheck = {
  path: "/sitemap.xml",
  forbidden: "privacy.html",
};

const notFoundCheck = {
  path: "/__missing-smoke-test__",
  marker: "404",
  expectedStatus: 404,
  contentType: "text/html",
  headers: ["strict-transport-security", "content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"],
};

const htmlIntegrityMarkers = [
  "sha384-UUwTS+RNYj0wSOgt4wIqWyG4Rc/xvrqgHDg/fEwc2e6WEFUooChoVCwkcddDnMaL",
  "sha384-SALc35EccAf6RzGw4iNsyj7kTPr33K7RoGzYu+7heZhT8s0GZouafRiCg1qy44AS",
  "crossorigin=\"anonymous\"",
];

const cspMarkers = [
  "style-src 'self' https://cdn.jsdelivr.net",
  "font-src 'self' https://cdn.jsdelivr.net data:",
];

const failures = [];
const passes = [];

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

    if (check.path === "/") {
      for (const marker of htmlIntegrityMarkers) {
        if (!text.includes(marker)) failures.push(`${check.path} is missing script integrity marker: ${marker}`);
      }
    }

    if (check.contentType) {
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.toLowerCase().includes(check.contentType)) {
        failures.push(`${check.path} returned content-type ${contentType || "(missing)"}, expected ${check.contentType}`);
      }
    }

    for (const header of check.headers || []) {
      if (!response.headers.get(header)) {
        failures.push(`${check.path} is missing response header: ${header}`);
      }
    }

    if ((check.headers || []).includes("content-security-policy")) {
      const csp = response.headers.get("content-security-policy") || "";
      for (const marker of cspMarkers) {
        if (!csp.includes(marker)) failures.push(`${check.path} CSP is missing marker: ${marker}`);
      }
    }

    passes.push(`${check.path} HTTP ${response.status}`);
  } catch (error) {
    failures.push(`${check.path} request failed: ${error.message}`);
  }
}

try {
  const url = new URL(sitemapContentCheck.path, origin);
  const response = await fetch(url, {
    headers: { "User-Agent": "GrantLabsDeploySmokeTest/1.0" },
  });
  const text = await response.text();

  if (!response.ok) {
    failures.push(`${sitemapContentCheck.path} returned HTTP ${response.status} during sitemap content check`);
  } else if (text.includes(sitemapContentCheck.forbidden)) {
    failures.push(`${sitemapContentCheck.path} includes noindex URL: ${sitemapContentCheck.forbidden}`);
  } else {
    passes.push(`${sitemapContentCheck.path} excludes ${sitemapContentCheck.forbidden}`);
  }
} catch (error) {
  failures.push(`${sitemapContentCheck.path} content check failed: ${error.message}`);
}

try {
  const url = new URL(notFoundCheck.path, origin);
  const response = await fetch(url, {
    headers: { "User-Agent": "GrantLabsDeploySmokeTest/1.0" },
  });
  const text = await response.text();

  if (response.status !== notFoundCheck.expectedStatus) {
    failures.push(`${notFoundCheck.path} returned HTTP ${response.status}, expected ${notFoundCheck.expectedStatus}`);
  }

  if (!text.includes(notFoundCheck.marker)) {
    failures.push(`${notFoundCheck.path} did not include marker: ${notFoundCheck.marker}`);
  }

  if (notFoundCheck.contentType) {
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes(notFoundCheck.contentType)) {
      failures.push(`${notFoundCheck.path} returned content-type ${contentType || "(missing)"}, expected ${notFoundCheck.contentType}`);
    }
  }

  for (const header of notFoundCheck.headers) {
    if (!response.headers.get(header)) {
      failures.push(`${notFoundCheck.path} is missing response header: ${header}`);
    }
  }

  const csp = response.headers.get("content-security-policy") || "";
  for (const marker of cspMarkers) {
    if (!csp.includes(marker)) failures.push(`${notFoundCheck.path} CSP is missing marker: ${marker}`);
  }

  passes.push(`${notFoundCheck.path} HTTP ${response.status}`);
} catch (error) {
  failures.push(`${notFoundCheck.path} request failed: ${error.message}`);
}

if (failures.length) {
  console.error("Deployed site smoke check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Deployed site smoke check passed: ${origin}`);
for (const pass of passes) console.log(`- ${pass}`);
