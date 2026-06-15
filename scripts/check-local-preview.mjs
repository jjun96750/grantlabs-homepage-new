const origin = (process.argv[2] || "http://127.0.0.1:4173").replace(/\/$/, "");

const requiredHeaders = [
  "content-security-policy",
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
  "permissions-policy",
];

const checks = [
  { path: "/", status: 200, marker: "Grant Labs", contentType: "text/html" },
  { path: "/styles/homepage.css", status: 200, marker: ".hero", contentType: "text/css" },
  { path: "/__missing-local-preview__", status: 404, marker: "404", contentType: "text/html" },
];

const failures = [];
const passes = [];

for (const check of checks) {
  const url = `${origin}${check.path}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    if (response.status !== check.status) {
      failures.push(`${check.path} returned HTTP ${response.status}, expected ${check.status}`);
    }

    if (!text.includes(check.marker)) {
      failures.push(`${check.path} did not include marker: ${check.marker}`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes(check.contentType)) {
      failures.push(`${check.path} returned content-type ${contentType || "(missing)"}, expected ${check.contentType}`);
    }

    for (const header of requiredHeaders) {
      if (!response.headers.get(header)) {
        failures.push(`${check.path} is missing local preview response header: ${header}`);
      }
    }

    passes.push(`${check.path} HTTP ${response.status}`);
  } catch (error) {
    failures.push(`${check.path} request failed: ${error.message}`);
  }
}

if (failures.length) {
  console.error("Local preview check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Local preview check passed: ${origin}`);
for (const pass of passes) console.log(`- ${pass}`);
