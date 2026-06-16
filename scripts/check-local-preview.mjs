const origin = (process.argv[2] || "http://127.0.0.1:4173").replace(/\/$/, "");

const requiredHeaders = [
  "strict-transport-security",
  "content-security-policy",
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
  "permissions-policy",
];

const requiredHeaderValues = new Map([
  ["cache-control", "no-store"],
]);

const checks = [
  { path: "/", status: 200, marker: "Grant Labs", contentType: "text/html" },
  { path: "/styles/homepage.css", status: 200, marker: ".hero", contentType: "text/css" },
  { path: "/__missing-local-preview__", status: 404, marker: "404", contentType: "text/html" },
];

const headChecks = [
  { path: "/", status: 200, contentType: "text/html" },
  { path: "/styles/homepage.css", status: 200, contentType: "text/css" },
];

const methodChecks = [
  { method: "POST", path: "/", status: 405, allow: "GET, HEAD", contentType: "text/plain" },
];

const htmlIntegrityMarkers = [
  "sha384-UUwTS+RNYj0wSOgt4wIqWyG4Rc/xvrqgHDg/fEwc2e6WEFUooChoVCwkcddDnMaL",
  "sha384-SALc35EccAf6RzGw4iNsyj7kTPr33K7RoGzYu+7heZhT8s0GZouafRiCg1qy44AS",
  "crossorigin=\"anonymous\"",
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

    if (check.path === "/") {
      for (const marker of htmlIntegrityMarkers) {
        if (!text.includes(marker)) failures.push(`${check.path} is missing script integrity marker: ${marker}`);
      }
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

    for (const [header, expectedValue] of requiredHeaderValues) {
      const actualValue = response.headers.get(header) || "";
      if (!actualValue.toLowerCase().includes(expectedValue)) {
        failures.push(`${check.path} returned ${header} ${actualValue || "(missing)"}, expected ${expectedValue}`);
      }
    }

    passes.push(`${check.path} HTTP ${response.status}`);
  } catch (error) {
    failures.push(`${check.path} request failed: ${error.message}`);
  }
}

for (const check of headChecks) {
  const url = `${origin}${check.path}`;

  try {
    const response = await fetch(url, { method: "HEAD" });
    const text = await response.text();

    if (response.status !== check.status) {
      failures.push(`HEAD ${check.path} returned HTTP ${response.status}, expected ${check.status}`);
    }

    if (text) {
      failures.push(`HEAD ${check.path} returned a response body.`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes(check.contentType)) {
      failures.push(`HEAD ${check.path} returned content-type ${contentType || "(missing)"}, expected ${check.contentType}`);
    }

    for (const header of requiredHeaders) {
      if (!response.headers.get(header)) {
        failures.push(`HEAD ${check.path} is missing local preview response header: ${header}`);
      }
    }

    for (const [header, expectedValue] of requiredHeaderValues) {
      const actualValue = response.headers.get(header) || "";
      if (!actualValue.toLowerCase().includes(expectedValue)) {
        failures.push(`HEAD ${check.path} returned ${header} ${actualValue || "(missing)"}, expected ${expectedValue}`);
      }
    }

    passes.push(`HEAD ${check.path} HTTP ${response.status}`);
  } catch (error) {
    failures.push(`HEAD ${check.path} request failed: ${error.message}`);
  }
}

for (const check of methodChecks) {
  const url = `${origin}${check.path}`;

  try {
    const response = await fetch(url, { method: check.method });

    if (response.status !== check.status) {
      failures.push(`${check.method} ${check.path} returned HTTP ${response.status}, expected ${check.status}`);
    }

    const allow = response.headers.get("allow") || "";
    if (allow !== check.allow) {
      failures.push(`${check.method} ${check.path} returned Allow ${allow || "(missing)"}, expected ${check.allow}`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes(check.contentType)) {
      failures.push(`${check.method} ${check.path} returned content-type ${contentType || "(missing)"}, expected ${check.contentType}`);
    }

    for (const header of requiredHeaders) {
      if (!response.headers.get(header)) {
        failures.push(`${check.method} ${check.path} is missing local preview response header: ${header}`);
      }
    }

    for (const [header, expectedValue] of requiredHeaderValues) {
      const actualValue = response.headers.get(header) || "";
      if (!actualValue.toLowerCase().includes(expectedValue)) {
        failures.push(`${check.method} ${check.path} returned ${header} ${actualValue || "(missing)"}, expected ${expectedValue}`);
      }
    }

    passes.push(`${check.method} ${check.path} HTTP ${response.status}`);
  } catch (error) {
    failures.push(`${check.method} ${check.path} request failed: ${error.message}`);
  }
}

if (failures.length) {
  console.error("Local preview check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Local preview check passed: ${origin}`);
for (const pass of passes) console.log(`- ${pass}`);
