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
  "_redirects",
  "README.md",
  "CLAUDE_HANDOFF.md",
  "DEVELOPMENT_STATUS.md",
  "CLOUDFLARE_PAGES_SETUP.md",
  "QA_CHECKLIST.md",
  "DEPLOYMENT_ENVIRONMENTS.md",
  "ROLLBACK_PLAN.md",
  "CHANGELOG.md",
  "scripts/check-deployed-site.mjs",
  ".github/workflows/static-site-check.yml",
];

const failures = [];
const read = (file) => readFileSync(file, "utf8");

const htmlPages = ["index.html", "404.html", "privacy.html", "checklist.html"];

const localTargetToFile = (target) => {
  const withoutHash = target.split("#")[0];
  const withoutQuery = withoutHash.split("?")[0];

  if (!withoutQuery || withoutQuery === "/") return "index.html";
  if (withoutQuery.startsWith("/")) return withoutQuery.slice(1);
  return withoutQuery;
};

const shouldCheckLocalTarget = (target) => {
  if (!target || target.startsWith("#")) return false;
  if (/^(https?:|mailto:|tel:|javascript:)/i.test(target)) return false;
  return true;
};

for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`Missing required file: ${file}`);
}

for (const page of htmlPages) {
  if (!existsSync(page)) continue;
  const html = read(page);
  if (!html.includes('<html lang="ko"')) failures.push(`${page} is missing Korean language metadata.`);
  if (!html.includes("<title>")) failures.push(`${page} is missing a title.`);
  if (!html.includes('name="description"')) failures.push(`${page} is missing a meta description.`);
  if (html.includes("\uFFFD")) failures.push(`${page} contains replacement characters.`);
}

for (const page of htmlPages) {
  if (!existsSync(page)) continue;
  const html = read(page);
  const targets = [
    ...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g),
  ].map((match) => match[1]);

  for (const target of targets) {
    if (!shouldCheckLocalTarget(target)) continue;
    const targetFile = localTargetToFile(target);
    if (!existsSync(targetFile)) {
      failures.push(`${page} links to missing local target: ${target}`);
    }
  }
}

for (const page of ["index.html", "checklist.html"]) {
  if (!existsSync(page)) continue;
  const html = read(page);
  if (!html.includes('rel="canonical"')) failures.push(`${page} is missing a canonical link.`);
  if (!html.includes('property="og:title"')) failures.push(`${page} is missing Open Graph title metadata.`);
  if (!html.includes('property="og:image"')) failures.push(`${page} is missing Open Graph image metadata.`);
  if (!html.includes('name="twitter:card"')) failures.push(`${page} is missing Twitter card metadata.`);
  if (!html.includes('name="twitter:image"')) failures.push(`${page} is missing Twitter image metadata.`);
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

  if (!html.includes('class="skip-link"')) failures.push("index.html is missing a skip link.");
  if (!html.includes('id="main-content"')) failures.push("index.html is missing the main-content target.");
  if (!html.includes('class="menu-toggle"')) failures.push("index.html is missing the mobile menu toggle.");
  if (!html.includes('id="mobile-menu"')) failures.push("index.html is missing the mobile menu.");
  if (!html.includes('class="quick-contact"')) failures.push("index.html is missing the quick-contact bar.");
  if (!html.includes("emailjs.send")) failures.push("index.html is missing EmailJS submission handling.");
  if (!html.includes("page_url") || !html.includes("submitted_at")) failures.push("index.html is missing lead source metadata.");
  if (!html.includes('name="website"') || !html.includes('class="honeypot"')) failures.push("index.html is missing the contact form honeypot.");
  if (!html.includes('id="lead-form"') || !html.includes('aria-describedby="form-note"')) failures.push("index.html is missing contact form accessibility description wiring.");
  if (!html.includes("<noscript") || !html.includes("noscript-contact")) failures.push("index.html is missing the no-JS contact fallback.");
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

if (existsSync("privacy.html")) {
  const html = read("privacy.html");
  if (!html.includes("상담 폼 보호 장치")) failures.push("privacy.html is missing contact form protection notice.");
}

if (existsSync("checklist.html")) {
  const html = read("checklist.html");
  if (!html.includes("checklist-count")) failures.push("checklist.html is missing progress count UI.");
  if (!html.includes("checklist-next")) failures.push("checklist.html is missing the follow-up consultation CTA.");
  if (!html.includes('setAttribute("aria-label"')) failures.push("checklist.html is missing checkbox accessibility labels.");
}

if (existsSync("styles/homepage.css")) {
  const css = read("styles/homepage.css");
  const open = (css.match(/\{/g) || []).length;
  const close = (css.match(/\}/g) || []).length;
  if (open !== close) failures.push(`CSS brace mismatch: ${open} opening, ${close} closing.`);
  if (!css.includes("@media print")) failures.push("CSS is missing print styles.");
  if (!css.includes("@page")) failures.push("CSS is missing print page setup.");
  if (!css.includes(".honeypot")) failures.push("CSS is missing honeypot hiding styles.");
  if (!css.includes(".noscript-contact")) failures.push("CSS is missing no-JS contact fallback styles.");
  if (!css.includes(".checklist-next")) failures.push("CSS is missing checklist follow-up CTA styles.");
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

if (existsSync("sitemap.xml")) {
  const sitemap = read("sitemap.xml");
  if (!sitemap.includes("<lastmod>2026-06-15</lastmod>")) {
    failures.push("sitemap.xml lastmod values are not current.");
  }
  if (sitemap.includes("privacy.html")) {
    failures.push("sitemap.xml includes privacy.html even though it is noindex.");
  }
}

if (existsSync("_headers")) {
  const headers = read("_headers");
  for (const path of ["/social-card.svg", "/site.webmanifest", "/robots.txt", "/sitemap.xml"]) {
    if (!headers.includes(path)) failures.push(`_headers is missing cache policy for ${path}`);
  }
}

if (existsSync("_redirects")) {
  const redirects = read("_redirects");
  if (!redirects.includes("/* /404.html 404")) {
    failures.push("_redirects is missing the Cloudflare Pages 404 fallback rule.");
  }
}

if (existsSync("scripts/check-deployed-site.mjs")) {
  const smokeCheck = read("scripts/check-deployed-site.mjs");
  for (const path of ["/", "/privacy.html", "/checklist.html", "/robots.txt", "/sitemap.xml", "/social-card.svg"]) {
    if (!smokeCheck.includes(path)) failures.push(`Deployed smoke check is missing path: ${path}`);
  }
  if (!smokeCheck.includes("/__missing-smoke-test__") || !smokeCheck.includes("expectedStatus: 404")) {
    failures.push("Deployed smoke check is missing not-found route validation.");
  }
  if (!smokeCheck.includes("sitemapContentCheck") || !smokeCheck.includes("forbidden: \"privacy.html\"")) {
    failures.push("Deployed smoke check is missing sitemap noindex validation.");
  }
  if (!smokeCheck.includes("const passes = []") || !smokeCheck.includes("for (const pass of passes)")) {
    failures.push("Deployed smoke check is missing pass summary output.");
  }
  for (const header of ["x-content-type-options", "referrer-policy", "permissions-policy", "cache-control"]) {
    if (!smokeCheck.includes(header)) failures.push(`Deployed smoke check is missing header assertion: ${header}`);
  }
  if (!smokeCheck.includes("contentType") || !smokeCheck.includes("content-type")) {
    failures.push("Deployed smoke check is missing content-type validation.");
  }
}

if (existsSync("DEPLOYMENT_ENVIRONMENTS.md")) {
  const deployment = read("DEPLOYMENT_ENVIRONMENTS.md");
  for (const marker of ["Preview Verification", "Deployed smoke check", "EmailJS test", "DNS unchanged", "Contact Form Configuration", "service_tcj8otx", "template_8ne6kj3"]) {
    if (!deployment.includes(marker)) failures.push(`DEPLOYMENT_ENVIRONMENTS.md is missing marker: ${marker}`);
  }
}

if (existsSync("README.md")) {
  const readme = read("README.md");
  for (const marker of ["scripts/check-static-site.mjs", "scripts/check-deployed-site.mjs", "social-card.svg"]) {
    if (!readme.includes(marker)) failures.push(`README.md is missing marker: ${marker}`);
  }
}

if (existsSync("CLOUDFLARE_PAGES_SETUP.md")) {
  const setup = read("CLOUDFLARE_PAGES_SETUP.md");
  for (const marker of ["Framework preset: None", "Production branch: main", "scripts/check-deployed-site.mjs"]) {
    if (!setup.includes(marker)) failures.push(`CLOUDFLARE_PAGES_SETUP.md is missing marker: ${marker}`);
  }
}

if (existsSync(".github/workflows/static-site-check.yml")) {
  const workflow = read(".github/workflows/static-site-check.yml");
  for (const marker of ["actions/setup-node@v4", "node-version: 20", "node scripts/check-static-site.mjs"]) {
    if (!workflow.includes(marker)) failures.push(`static-site-check workflow is missing marker: ${marker}`);
  }
}

if (failures.length) {
  console.error("Static site check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Static site check passed.");
