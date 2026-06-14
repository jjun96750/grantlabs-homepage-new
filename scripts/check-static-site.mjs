import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "404.html",
  "privacy.html",
  "styles/homepage.css",
  "favicon.svg",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "_headers",
  "README.md",
  "CLAUDE_HANDOFF.md",
  "DEVELOPMENT_STATUS.md",
  "CLOUDFLARE_PAGES_SETUP.md",
  "QA_CHECKLIST.md",
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`Missing required file: ${file}`);
}

const read = (file) => readFileSync(file, "utf8");

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

  if (html.includes("�")) failures.push("index.html contains replacement characters.");

  if (!html.includes('class="skip-link"')) failures.push("index.html is missing a skip link.");
  if (!html.includes('id="main-content"')) failures.push("index.html is missing the main-content target.");
}

for (const page of ["404.html", "privacy.html"]) {
  if (!existsSync(page)) continue;
  const html = read(page);
  if (!html.includes('class="skip-link"')) failures.push(`${page} is missing a skip link.`);
  if (!html.includes('id="main-content"')) failures.push(`${page} is missing the main-content target.`);
}

if (existsSync("styles/homepage.css")) {
  const css = read("styles/homepage.css");
  const open = (css.match(/\{/g) || []).length;
  const close = (css.match(/\}/g) || []).length;
  if (open !== close) failures.push(`CSS brace mismatch: ${open} opening, ${close} closing.`);
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

if (failures.length) {
  console.error("Static site check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Static site check passed.");
