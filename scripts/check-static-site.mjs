import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "404.html",
  "privacy.html",
  "checklist.html",
  "styles/homepage.css",
  "favicon.svg",
  "social-card.svg",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "_headers",
  "README.md",
  "CLAUDE_HANDOFF.md",
  "DEVELOPMENT_STATUS.md",
  "CLOUDFLARE_PAGES_SETUP.md",
  "QA_CHECKLIST.md",
  "DEPLOYMENT_ENVIRONMENTS.md",
  "ROLLBACK_PLAN.md",
  "CHANGELOG.md",
  "scripts/check-deployed-site.mjs",
];

const failures = [];
const read = (file) => readFileSync(file, "utf8");

for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`Missing required file: ${file}`);
}

if (existsSync("index.html")) {
  const html = read("index.html");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);

  for (const anchor of anchors) {
    if (anchor !== "top" && !ids.has(anchor)) {
      failures.push(`Broken in-page anchor: #${anchor}`);
    }
  }

  for (const required of ["services", "method", "cases", "faq", "contact"]) {
    if (!ids.has(required)) failures.push(`Missing required section id: ${required}`);
  }

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (jsonLdBlocks.length < 2) failures.push("Expected Organization and FAQ JSON-LD blocks.");

  jsonLdBlocks.forEach((match, index) => {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      failures.push(`Invalid JSON-LD block ${index + 1}: ${error.message}`);
    }
  });

  if (html.includes("\uFFFD")) failures.push("index.html contains replacement characters.");
  if (!html.includes('class="skip-link"')) failures.push("index.html is missing a skip link.");
  if (!html.includes('id="main-content"')) failures.push("index.html is missing the main-content target.");
  if (!html.includes('class="menu-toggle"')) failures.push("index.html is missing the mobile menu toggle.");
  if (!html.includes('id="mobile-menu"')) failures.push("index.html is missing the mobile menu.");
  if (!html.includes('class="quick-contact"')) failures.push("index.html is missing the quick-contact bar.");
  if (!html.includes("emailjs.send")) failures.push("index.html is missing EmailJS submission handling.");
  if (!html.includes("data-score-item")) failures.push("index.html is missing the self-check interaction.");
  if (!html.includes('class="fit-table"')) failures.push("index.html is missing the service-fit table.");
  if (!html.includes('rel="preconnect"')) failures.push("index.html is missing preconnect hints.");
  if (!html.includes('class="promise-section"')) failures.push("index.html is missing the consultation promise section.");
  if (!html.includes("social-card.svg")) failures.push("index.html is missing the local social sharing image.");
}

for (const page of ["404.html", "privacy.html", "checklist.html"]) {
  if (!existsSync(page)) continue;
  const html = read(page);
  if (!html.includes('class="skip-link"')) failures.push(`${page} is missing a skip link.`);
  if (!html.includes('id="main-content"')) failures.push(`${page} is missing the main-content target.`);
  if (!html.includes('rel="manifest"')) failures.push(`${page} is missing the web manifest link.`);
  if (page !== "404.html" && !html.includes('rel="canonical"')) failures.push(`${page} is missing a canonical link.`);
  if (page !== "404.html" && !html.includes("social-card.svg")) failures.push(`${page} is missing the local social sharing image.`);
}

if (existsSync("checklist.html")) {
  const html = read("checklist.html");
  if (!html.includes("checklist-count")) failures.push("checklist.html is missing progress count UI.");
}

if (existsSync("styles/homepage.css")) {
  const css = read("styles/homepage.css");
  const open = (css.match(/\{/g) || []).length;
  const close = (css.match(/\}/g) || []).length;
  if (open !== close) failures.push(`CSS brace mismatch: ${open} opening, ${close} closing.`);
  if (!css.includes("@media print")) failures.push("CSS is missing print styles.");
  if (!css.includes("@page")) failures.push("CSS is missing print page setup.");
}

if (existsSync("site.webmanifest")) {
  try {
    JSON.parse(read("site.webmanifest"));
  } catch (error) {
    failures.push(`Invalid site.webmanifest JSON: ${error.message}`);
  }
}

if (existsSync("sitemap.xml") && !read("sitemap.xml").includes("<urlset")) {
  failures.push("sitemap.xml does not contain a urlset.");
}

if (existsSync("scripts/check-deployed-site.mjs")) {
  const smokeCheck = read("scripts/check-deployed-site.mjs");
  for (const path of ["/", "/privacy.html", "/checklist.html", "/robots.txt", "/sitemap.xml", "/social-card.svg"]) {
    if (!smokeCheck.includes(path)) failures.push(`Deployed smoke check is missing path: ${path}`);
  }
}

if (failures.length) {
  console.error("Static site check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Static site check passed.");
