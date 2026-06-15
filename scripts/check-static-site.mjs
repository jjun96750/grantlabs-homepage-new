import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "404.html",
  "privacy.html",
  "checklist.html",
  ".editorconfig",
  ".nvmrc",
  "package.json",
  "styles/homepage.css",
  "favicon.svg",
  "social-card.svg",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "_headers",
  "_redirects",
  "LICENSE",
  "README.md",
  "COMMANDS.md",
  "CONTRIBUTING.md",
  "CLAUDE_HANDOFF.md",
  "DEVELOPMENT_STATUS.md",
  "CLOUDFLARE_PAGES_SETUP.md",
  "QA_CHECKLIST.md",
  "DEPLOYMENT_ENVIRONMENTS.md",
  "ROLLBACK_PLAN.md",
  "SECURITY.md",
  "CHANGELOG.md",
  "scripts/serve-static.mjs",
  "scripts/check-local-preview.mjs",
  "scripts/check-deployed-site.mjs",
  ".github/workflows/static-site-check.yml",
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/content_update.md",
  ".github/ISSUE_TEMPLATE/deployment_check.md",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/CODEOWNERS",
];

const failures = [];
const read = (file) => readFileSync(file, "utf8");

const htmlPages = ["index.html", "404.html", "privacy.html", "checklist.html"];
const siteOrigin = "https://grantlabs.co.kr";
const contactEmail = "jjun96750@gmail.com";
const contactPhoneDisplay = "010-5963-7624";
const contactPhoneHref = "01059637624";
const emailJsPublicKey = "UUfoZdh404On9fZbm";
const emailJsServiceId = "service_tcj8otx";
const emailJsTemplateId = "template_8ne6kj3";
const emailJsBrowserVersion = "4.4.1";
const lucideVersion = "1.18.0";
const lucideIntegrity = "sha384-UUwTS+RNYj0wSOgt4wIqWyG4Rc/xvrqgHDg/fEwc2e6WEFUooChoVCwkcddDnMaL";
const emailJsIntegrity = "sha384-SALc35EccAf6RzGw4iNsyj7kTPr33K7RoGzYu+7heZhT8s0GZouafRiCg1qy44AS";

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

const targetHash = (target) => {
  const hashIndex = target.indexOf("#");
  if (hashIndex === -1) return "";
  return target.slice(hashIndex + 1).split("?")[0];
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

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) {
    failures.push(`${page} contains duplicate id values: ${[...new Set(duplicateIds)].join(", ")}`);
  }
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
      continue;
    }

    const hash = targetHash(target);
    if (hash && existsSync(targetFile) && targetFile.endsWith(".html")) {
      const targetHtml = read(targetFile);
      const targetIds = new Set([...targetHtml.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
      if (!targetIds.has(hash)) {
        failures.push(`${page} links to missing hash target: ${target}`);
      }
    }
  }

  const externalNewWindowLinks = [
    ...html.matchAll(/<a\b(?=[^>]*target=["']_blank["'])(?=[^>]*href=["']https?:\/\/)[^>]*>/g),
  ];

  for (const match of externalNewWindowLinks) {
    const tag = match[0];
    if (!/\srel=["'][^"']*\bnoopener\b[^"']*["']/.test(tag)) {
      failures.push(`${page} has an external target="_blank" link without rel="noopener": ${tag}`);
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

const canonicalFor = (html) => {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/);
  return match ? match[1] : "";
};

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
  if (!html.includes(`https://unpkg.com/lucide@${lucideVersion}/dist/umd/lucide.min.js`) || html.includes("lucide@latest")) {
    failures.push("index.html should pin the Lucide CDN dependency to the approved version.");
  }
  if (!html.includes(`https://cdn.jsdelivr.net/npm/@emailjs/browser@${emailJsBrowserVersion}/dist/email.min.js`) || html.includes("@emailjs/browser@4/dist")) {
    failures.push("index.html should pin the EmailJS browser CDN dependency to the approved version.");
  }
  for (const marker of [lucideIntegrity, emailJsIntegrity, 'crossorigin="anonymous"']) {
    if (!html.includes(marker)) failures.push(`index.html is missing CDN integrity marker: ${marker}`);
  }
  if (!html.includes("https://images.unsplash.com/photo-1551836022-d5d88e9218df")) {
    failures.push("index.html is missing the approved hero image.");
  }
  if (!html.includes('width="1600"') || !html.includes('height="1067"') || !html.includes('decoding="async"') || !html.includes('fetchpriority="high"')) {
    failures.push("index.html hero image is missing explicit render performance attributes.");
  }
  if (!html.includes(`mailto:${contactEmail}`) || !html.includes(`tel:${contactPhoneHref}`) || !html.includes(contactPhoneDisplay)) {
    failures.push("index.html is missing canonical contact email or phone values.");
  }
  if (!html.includes("emailjs.send")) failures.push("index.html is missing EmailJS submission handling.");
  for (const marker of [emailJsPublicKey, emailJsServiceId, emailJsTemplateId]) {
    if (!html.includes(marker)) failures.push(`index.html is missing EmailJS marker: ${marker}`);
  }
  if (!html.includes("page_url") || !html.includes("submitted_at")) failures.push("index.html is missing lead source metadata.");
  if (!html.includes('name="website"') || !html.includes('class="honeypot"')) failures.push("index.html is missing the contact form honeypot.");
  if (!html.includes('id="lead-form"') || !html.includes('aria-describedby="form-note"')) failures.push("index.html is missing contact form accessibility description wiring.");
  for (const field of ['name="name"', 'name="phone"', 'name="email"', 'name="privacy"']) {
    if (!html.includes(field)) failures.push(`index.html is missing required contact form field: ${field}`);
  }
  if (!html.includes('name="privacy" type="checkbox" required')) failures.push("index.html is missing required privacy consent checkbox.");
  if (!html.includes('autocomplete="name"') || !html.includes('autocomplete="tel"') || !html.includes('autocomplete="email"')) failures.push("index.html is missing contact form autocomplete hints.");
  if (!html.includes('name="email" type="email"') || !html.includes("email: data.get(\"email\")")) {
    failures.push("index.html is missing optional email field handling.");
  }
  if (!html.includes('inputmode="tel"') || !html.includes('pattern="^[0-9+\\-()\\s]{8,20}$"')) {
    failures.push("index.html is missing mobile-friendly phone input constraints.");
  }
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
  if (/\son[a-z]+=/i.test(html)) failures.push(`${page} includes an inline event handler.`);
  if (page !== "404.html" && !html.includes('rel="canonical"')) failures.push(`${page} is missing a canonical link.`);
  if (page !== "404.html" && !html.includes("social-card.svg")) failures.push(`${page} is missing the local social sharing image.`);
}

if (existsSync("privacy.html")) {
  const html = read("privacy.html");
  if (!html.includes("상담 폼 보호 장치")) failures.push("privacy.html is missing contact form protection notice.");
  if (!html.includes("이메일, 관심 분야")) failures.push("privacy.html is missing optional email collection disclosure.");
  if (!html.includes("시행일: 2026년 6월 15일")) failures.push("privacy.html effective date is not current.");
  if (!html.includes(`mailto:${contactEmail}`) || !html.includes(`tel:${contactPhoneHref}`)) {
    failures.push("privacy.html is missing canonical contact email or phone links.");
  }
}

if (existsSync("checklist.html")) {
  const html = read("checklist.html");
  if (!html.includes("checklist-count")) failures.push("checklist.html is missing progress count UI.");
  if (!html.includes("checklist-next")) failures.push("checklist.html is missing the follow-up consultation CTA.");
  if (!html.includes('setAttribute("aria-label"')) failures.push("checklist.html is missing checkbox accessibility labels.");
  if (!html.includes('id="print-checklist"') || !html.includes('printButton.addEventListener("click"')) {
    failures.push("checklist.html is missing unobtrusive print button handling.");
  }
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

if (existsSync("package.json")) {
  try {
    const pkg = JSON.parse(read("package.json"));
    if (pkg.private !== true) failures.push("package.json should be private.");
    if (pkg.scripts?.check !== "node scripts/check-static-site.mjs") failures.push("package.json is missing the standard check script.");
    if (pkg.scripts?.serve !== "node scripts/serve-static.mjs") failures.push("package.json is missing the local preview server script.");
    if (pkg.scripts?.["preview:check"] !== "node scripts/check-local-preview.mjs") failures.push("package.json is missing the local preview check script.");
    if (pkg.scripts?.smoke !== "node scripts/check-deployed-site.mjs") failures.push("package.json is missing the deployed smoke script.");
    if (pkg.engines?.node !== ">=20") failures.push("package.json should require Node >=20.");
  } catch (error) {
    failures.push(`Invalid package.json: ${error.message}`);
  }
}

if (existsSync("scripts/check-local-preview.mjs")) {
  const previewCheck = read("scripts/check-local-preview.mjs");
  for (const marker of ["http://127.0.0.1:4173", "/styles/homepage.css", "/__missing-local-preview__", "content-security-policy", "x-frame-options", "Local preview check passed"]) {
    if (!previewCheck.includes(marker)) failures.push(`scripts/check-local-preview.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/serve-static.mjs")) {
  const server = read("scripts/serve-static.mjs");
  for (const marker of ["createServer", "127.0.0.1", "4173", "404.html", "no-store", "application/manifest+json", "HEAD", "securityHeaders", "Content-Security-Policy", "X-Frame-Options", "Permissions-Policy"]) {
    if (!server.includes(marker)) failures.push(`scripts/serve-static.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("favicon.svg")) {
  const favicon = read("favicon.svg");
  if (!favicon.includes("<svg") || !favicon.includes('viewBox="0 0 64 64"')) {
    failures.push("favicon.svg is missing the expected SVG root or 64x64 viewBox.");
  }
  if (!favicon.includes('role="img"') || !favicon.includes('aria-label="Grant Labs"')) {
    failures.push("favicon.svg is missing accessible image labeling.");
  }
}

if (existsSync("social-card.svg")) {
  const socialCard = read("social-card.svg");
  if (!socialCard.includes('width="1200"') || !socialCard.includes('height="630"')) {
    failures.push("social-card.svg is missing the expected 1200x630 dimensions.");
  }
  if (!socialCard.includes("<title") || !socialCard.includes("<desc") || !socialCard.includes('aria-labelledby="title desc"')) {
    failures.push("social-card.svg is missing accessible title/description metadata.");
  }
  if (!socialCard.includes("grantlabs.co.kr")) {
    failures.push("social-card.svg is missing the public domain label.");
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

  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  for (const url of sitemapUrls) {
    if (!url.startsWith(`${siteOrigin}/`)) {
      failures.push(`sitemap.xml contains URL outside canonical origin: ${url}`);
    }
  }

  const expectedSitemapUrls = ["index.html", "checklist.html"]
    .filter((page) => existsSync(page))
    .map((page) => canonicalFor(read(page)))
    .filter(Boolean);

  for (const url of expectedSitemapUrls) {
    if (!sitemapUrls.includes(url)) {
      failures.push(`sitemap.xml is missing canonical URL: ${url}`);
    }
  }

  for (const url of sitemapUrls) {
    if (!expectedSitemapUrls.includes(url)) {
      failures.push(`sitemap.xml includes unexpected indexable URL: ${url}`);
    }
  }
}

if (existsSync("robots.txt")) {
  const robots = read("robots.txt");
  if (!robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) {
    failures.push("robots.txt is missing the canonical sitemap URL.");
  }
}

if (existsSync("_headers")) {
  const headers = read("_headers");
  for (const marker of ["Strict-Transport-Security", "Content-Security-Policy", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"]) {
    if (!headers.includes(marker)) failures.push(`_headers is missing security header: ${marker}`);
  }
  for (const marker of ["default-src 'self'", "https://unpkg.com", "https://cdn.jsdelivr.net", "https://api.emailjs.com", "https://images.unsplash.com", "object-src 'none'", "frame-ancestors 'none'"]) {
    if (!headers.includes(marker)) failures.push(`_headers CSP is missing marker: ${marker}`);
  }
  if (!headers.includes("script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net")) {
    failures.push("_headers CSP script-src does not match the approved CDN allowlist.");
  }
  if (!headers.includes("connect-src 'self' https://api.emailjs.com")) {
    failures.push("_headers CSP connect-src does not allow the approved EmailJS API endpoint.");
  }
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
  if (!smokeCheck.includes("htmlIntegrityMarkers") || !smokeCheck.includes(lucideIntegrity) || !smokeCheck.includes(emailJsIntegrity)) {
    failures.push("Deployed smoke check is missing CDN script integrity validation.");
  }
  for (const header of ["strict-transport-security", "content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy", "cache-control"]) {
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
  for (const marker of [emailJsPublicKey, emailJsServiceId, emailJsTemplateId]) {
    if (!deployment.includes(marker)) failures.push(`DEPLOYMENT_ENVIRONMENTS.md is missing EmailJS marker: ${marker}`);
  }
  if (!deployment.includes(`Fallback email: ${contactEmail}`) || !deployment.includes(`Fallback phone: ${contactPhoneDisplay}`)) {
    failures.push("DEPLOYMENT_ENVIRONMENTS.md is missing canonical fallback contact values.");
  }
}

if (existsSync("README.md")) {
  const readme = read("README.md");
  for (const marker of ["scripts/", "check-static-site.mjs", "serve-static.mjs", "check-deployed-site.mjs", "social-card.svg", "npm run serve"]) {
    if (!readme.includes(marker)) failures.push(`README.md is missing marker: ${marker}`);
  }
}

if (existsSync("COMMANDS.md")) {
  const commands = read("COMMANDS.md");
  for (const marker of ["npm run check", "npm run serve", "npm run smoke", "static-site validation"]) {
    if (!commands.includes(marker)) failures.push(`COMMANDS.md is missing marker: ${marker}`);
  }
}

if (existsSync("CONTRIBUTING.md")) {
  const contributing = read("CONTRIBUTING.md");
  for (const marker of ["grantlabs-website", "npm run check", "npm run serve", "DEVELOPMENT_STATUS.md", "SECURITY.md"]) {
    if (!contributing.includes(marker)) failures.push(`CONTRIBUTING.md is missing marker: ${marker}`);
  }
}

if (existsSync("LICENSE")) {
  const license = read("LICENSE");
  for (const marker of ["Grant Labs", "All rights reserved"]) {
    if (!license.includes(marker)) failures.push(`LICENSE is missing marker: ${marker}`);
  }
}

if (existsSync("SECURITY.md")) {
  const security = read("SECURITY.md");
  for (const marker of ["Security Policy", "jjun96750@gmail.com", "Cloudflare Pages", "contact-form abuse"]) {
    if (!security.includes(marker)) failures.push(`SECURITY.md is missing marker: ${marker}`);
  }
  if (!security.includes(contactEmail)) failures.push("SECURITY.md is missing canonical security contact email.");
}

if (existsSync(".editorconfig")) {
  const editorconfig = read(".editorconfig");
  for (const marker of ["root = true", "charset = utf-8", "end_of_line = lf", "indent_size = 2"]) {
    if (!editorconfig.includes(marker)) failures.push(`.editorconfig is missing marker: ${marker}`);
  }
}

if (existsSync(".nvmrc")) {
  const nodeVersion = read(".nvmrc").trim();
  if (nodeVersion !== "20") failures.push(".nvmrc should pin Node major version 20.");
}

if (existsSync(".gitignore")) {
  const gitignore = read(".gitignore");
  for (const marker of ["node_modules/", ".env", "dist/", "build/", ".wrangler/", ".pages/", "*.log"]) {
    if (!gitignore.includes(marker)) failures.push(`.gitignore is missing marker: ${marker}`);
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
  for (const marker of ["actions/setup-node@v4", "node-version: 20", "npm run check", "npm run serve", "npm run preview:check", "127.0.0.1:4173"]) {
    if (!workflow.includes(marker)) failures.push(`static-site-check workflow is missing marker: ${marker}`);
  }
}

for (const template of [
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/content_update.md",
  ".github/ISSUE_TEMPLATE/deployment_check.md",
]) {
  if (!existsSync(template)) continue;
  const body = read(template);
  for (const marker of ["name:", "about:", "labels:"]) {
    if (!body.includes(marker)) failures.push(`${template} is missing marker: ${marker}`);
  }
}

if (existsSync(".github/PULL_REQUEST_TEMPLATE.md")) {
  const prTemplate = read(".github/PULL_REQUEST_TEMPLATE.md");
  for (const marker of ["npm run check", "grantlabs-website", "DEVELOPMENT_STATUS.md", "CLAUDE_HANDOFF.md"]) {
    if (!prTemplate.includes(marker)) failures.push(`PULL_REQUEST_TEMPLATE.md is missing marker: ${marker}`);
  }
}

if (existsSync(".github/CODEOWNERS")) {
  const codeowners = read(".github/CODEOWNERS");
  for (const marker of ["* @jjun96750", "/.github/ @jjun96750", "/scripts/ @jjun96750"]) {
    if (!codeowners.includes(marker)) failures.push(`CODEOWNERS is missing marker: ${marker}`);
  }
}

if (failures.length) {
  console.error("Static site check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Static site check passed.");
