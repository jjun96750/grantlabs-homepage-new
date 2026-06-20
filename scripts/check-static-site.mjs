import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "index.html",
  "404.html",
  "privacy.html",
  "checklist.html",
  ".editorconfig",
  ".nvmrc",
  "package.json",
  ".nojekyll",
  "styles/homepage.css",
  "favicon.svg",
  "social-card.svg",
  "assets/brand/grant-labs-logo.svg",
  "assets/brand/grant-labs-logo-black.svg",
  "assets/brand/grant-labs-logo-gold.svg",
  "assets/brand/grant-labs-logo-white.svg",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "_headers",
  "_redirects",
  "LICENSE",
  "README.md",
  "STATUS_INDEX.md",
  "DEVELOPMENT_JOURNAL.md",
  "COMMANDS.md",
  "CONTRIBUTING.md",
  "CLAUDE_HANDOFF.md",
  "DEVELOPMENT_STATUS.md",
  "CLOUDFLARE_PAGES_SETUP.md",
  "QA_CHECKLIST.md",
  "DEPLOYMENT_ENVIRONMENTS.md",
  "DEPLOYMENT_READINESS.md",
  "ROLLBACK_PLAN.md",
  "SECURITY.md",
  "CHANGELOG.md",
  "scripts/serve-static.mjs",
  "scripts/check-content-automation.mjs",
  "scripts/generate-asset-briefs.mjs",
  "scripts/generate-caption-pack.mjs",
  "scripts/generate-content-status.mjs",
  "scripts/generate-publishing-calendar.mjs",
  "scripts/generate-content-plan.mjs",
  "scripts/generate-deployment-readiness.mjs",
  "scripts/generate-sitemap.mjs",
  "scripts/generate-development-journal.mjs",
  "scripts/generate-status-index.mjs",
  "scripts/generate-publishing-queue.mjs",
  "scripts/run-all-content-automation.mjs",
  "scripts/run-content-automation.mjs",
  "scripts/check-local-preview.mjs",
  "scripts/check-deployed-site.mjs",
  "content-automation/README.md",
  "content-automation/CAMPAIGN_STATUS.md",
  "content-automation/PUBLISHING_CALENDAR.md",
  "content-automation/PUBLISHING_CALENDAR.csv",
  "content-automation/platform-rules.json",
  "content-automation/publishing-defaults.json",
  ".github/workflows/static-site-check.yml",
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/content_update.md",
  ".github/ISSUE_TEMPLATE/deployment_check.md",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/CODEOWNERS",
];

const failures = [];
const read = (file) => readFileSync(file, "utf8");
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(new Date());
const listFiles = (dir, predicate) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .map((name) => join(dir, name))
    .filter((file) => statSync(file).isFile())
    .filter(predicate);
};

const requiredContentOutputSuffixes = [
  ".md",
  "-asset-briefs.md",
  "-caption-pack.md",
  "-publishing-queue.csv",
  "-publishing-queue.md",
];

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

const campaignFiles = listFiles("content-automation/campaigns", (file) => file.endsWith(".json"));
if (!campaignFiles.length) {
  failures.push("content automation should include at least one campaign file.");
}

for (const campaignFile of campaignFiles) {
  try {
    const campaign = JSON.parse(read(campaignFile));
    for (const field of ["slug", "date", "brand", "topic", "topicKo", "primaryAudience", "corePromise", "corePromiseKo", "primaryCta", "primaryCtaKo", "landingPage"]) {
      if (!campaign[field]) failures.push(`${campaignFile} is missing field: ${field}`);
    }

    if (!Array.isArray(campaign.pillarPoints) || campaign.pillarPoints.length < 4) {
      failures.push(`${campaignFile} should include at least four pillar points.`);
    }

    if (!Array.isArray(campaign.pillarPointsKo) || campaign.pillarPointsKo.length < 4) {
      failures.push(`${campaignFile} should include at least four Korean pillar points.`);
    }

    if (!Array.isArray(campaign.complianceNotes) || campaign.complianceNotes.length < 3) {
      failures.push(`${campaignFile} should include compliance guardrails.`);
    }

    const outputBase = join("content-automation/output", `${campaign.date}-${campaign.slug}`);
    for (const suffix of requiredContentOutputSuffixes) {
      const outputPath = suffix === ".md" ? `${outputBase}.md` : `${outputBase}${suffix}`;
      if (!existsSync(outputPath)) failures.push(`${campaignFile} is missing generated output: ${outputPath}`);
    }
  } catch (error) {
    failures.push(`Invalid content automation campaign ${campaignFile}: ${error.message}`);
  }
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

  const parsedJsonLdBlocks = [];
  jsonLdBlocks.forEach((match, index) => {
    try {
      parsedJsonLdBlocks.push(JSON.parse(match[1]));
    } catch (error) {
      failures.push(`Invalid JSON-LD block ${index + 1}: ${error.message}`);
    }
  });

  const serviceJsonLd = parsedJsonLdBlocks.find((block) => block["@type"] === "ProfessionalService");
  if (!serviceJsonLd?.logo || serviceJsonLd.logo !== `${siteOrigin}/assets/brand/grant-labs-logo.svg`) {
    failures.push("ProfessionalService JSON-LD is missing the canonical Grant Labs logo URL.");
  }

  if (!html.includes('class="skip-link"')) failures.push("index.html is missing a skip link.");
  if (!html.includes('id="main-content"')) failures.push("index.html is missing the main-content target.");
  if (!html.includes('class="menu-toggle"')) failures.push("index.html is missing the mobile menu toggle.");
  if (!html.includes('id="mobile-menu"')) failures.push("index.html is missing the mobile menu.");
  if (!html.includes("closeMobileMenu") || !html.includes('event.key === "Escape"')) {
    failures.push("index.html is missing keyboard dismissal for the mobile menu.");
  }
  if (!html.includes('document.addEventListener("click"') || !html.includes("!mobileMenu.contains(event.target)")) {
    failures.push("index.html is missing outside-click dismissal for the mobile menu.");
  }
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
  if (!html.includes('form.setAttribute("aria-busy", "true")') || !html.includes('form.setAttribute("aria-busy", "false")')) {
    failures.push("index.html is missing contact form busy-state accessibility handling.");
  }
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
  if (!html.includes('property="og:image:alt"') || !html.includes('name="twitter:image:alt"')) {
    failures.push("index.html is missing social image alt metadata.");
  }
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
  if (page !== "404.html" && (!html.includes('property="og:image:alt"') || !html.includes('name="twitter:image:alt"'))) {
    failures.push(`${page} is missing social image alt metadata.`);
  }
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
    const manifest = JSON.parse(read("site.webmanifest"));
    if (manifest.id !== "/") failures.push("site.webmanifest is missing the canonical app id.");
    if (manifest.scope !== "/") failures.push("site.webmanifest is missing the canonical scope.");
    if (manifest.lang !== "ko-KR") failures.push("site.webmanifest should declare Korean locale.");
    if (!Array.isArray(manifest.categories) || !manifest.categories.includes("business")) {
      failures.push("site.webmanifest should include the business category.");
    }
    if (!Array.isArray(manifest.icons) || !manifest.icons.some((icon) => icon.src === "/favicon.svg" && icon.purpose === "any maskable")) {
      failures.push("site.webmanifest should expose the favicon as an any maskable icon.");
    }
    if (!Array.isArray(manifest.shortcuts) || !manifest.shortcuts.some((shortcut) => shortcut.url === "/#contact") || !manifest.shortcuts.some((shortcut) => shortcut.url === "/checklist.html")) {
      failures.push("site.webmanifest should include consultation and checklist shortcuts.");
    }
  } catch (error) {
    failures.push(`Invalid site.webmanifest JSON: ${error.message}`);
  }
}

if (existsSync("package.json")) {
  try {
    const pkg = JSON.parse(read("package.json"));
    if (pkg.private !== true) failures.push("package.json should be private.");
    if (pkg.scripts?.check !== "node scripts/check-static-site.mjs") failures.push("package.json is missing the standard check script.");
    if (pkg.scripts?.["check:content"] !== "node scripts/check-content-automation.mjs") failures.push("package.json is missing the content automation check script.");
    if (pkg.scripts?.["content:assets"] !== "node scripts/generate-asset-briefs.mjs") failures.push("package.json is missing the content asset brief script.");
    if (pkg.scripts?.["content:captions"] !== "node scripts/generate-caption-pack.mjs") failures.push("package.json is missing the content caption pack script.");
    if (pkg.scripts?.["content:plan"] !== "node scripts/generate-content-plan.mjs") failures.push("package.json is missing the content automation plan script.");
    if (pkg.scripts?.["content:queue"] !== "node scripts/generate-publishing-queue.mjs") failures.push("package.json is missing the content publishing queue script.");
    if (pkg.scripts?.["content:calendar"] !== "node scripts/generate-publishing-calendar.mjs") failures.push("package.json is missing the content publishing calendar script.");
    if (pkg.scripts?.["content:run"] !== "node scripts/run-content-automation.mjs") failures.push("package.json is missing the content automation runner script.");
    if (pkg.scripts?.["content:run:all"] !== "node scripts/run-all-content-automation.mjs") failures.push("package.json is missing the all-campaign content automation runner script.");
    if (pkg.scripts?.["content:status"] !== "node scripts/generate-content-status.mjs") failures.push("package.json is missing the content automation status script.");
    if (pkg.scripts?.["deployment:readiness"] !== "node scripts/generate-deployment-readiness.mjs") failures.push("package.json is missing the deployment readiness script.");
    if (pkg.scripts?.["sitemap:refresh"] !== "node scripts/generate-sitemap.mjs") failures.push("package.json is missing the sitemap refresh script.");
    if (pkg.scripts?.["status:journal"] !== "node scripts/generate-development-journal.mjs") failures.push("package.json is missing the development journal script.");
    if (pkg.scripts?.["status:index"] !== "node scripts/generate-status-index.mjs") failures.push("package.json is missing the status index script.");
    if (pkg.scripts?.serve !== "node scripts/serve-static.mjs") failures.push("package.json is missing the local preview server script.");
    if (pkg.scripts?.["preview:check"] !== "node scripts/check-local-preview.mjs") failures.push("package.json is missing the local preview check script.");
    if (pkg.scripts?.smoke !== "node scripts/check-deployed-site.mjs") failures.push("package.json is missing the deployed smoke script.");
    if (pkg.engines?.node !== ">=20") failures.push("package.json should require Node >=20.");
  } catch (error) {
    failures.push(`Invalid package.json: ${error.message}`);
  }
}

if (existsSync("content-automation/platform-rules.json")) {
  try {
    const platformRules = JSON.parse(read("content-automation/platform-rules.json"));
    const requiredPlatforms = ["naver_blog", "instagram_carousel", "instagram_reels", "youtube_shorts", "youtube_long", "tiktok", "facebook_page", "linkedin_page"];
    const platformIds = new Set((platformRules.platforms || []).map((platform) => platform.id));

    for (const platformId of requiredPlatforms) {
      if (!platformIds.has(platformId)) failures.push(`content automation is missing platform rule: ${platformId}`);
    }

    for (const platform of platformRules.platforms || []) {
      for (const field of ["name", "role", "bestFor", "format", "hook", "asset", "cta", "tone", "avoid", "repurposeRule"]) {
        if (!platform[field]) failures.push(`content automation platform ${platform.id || "(missing id)"} is missing field: ${field}`);
      }
    }
  } catch (error) {
    failures.push(`Invalid content-automation/platform-rules.json: ${error.message}`);
  }
}

if (existsSync("content-automation/campaigns/grantlabs-growth-check.json")) {
  try {
    const campaign = JSON.parse(read("content-automation/campaigns/grantlabs-growth-check.json"));
    for (const field of ["slug", "date", "brand", "topic", "topicKo", "primaryAudience", "corePromise", "corePromiseKo", "primaryCta", "primaryCtaKo", "landingPage"]) {
      if (!campaign[field]) failures.push(`content automation campaign is missing field: ${field}`);
    }
    if (!Array.isArray(campaign.pillarPoints) || campaign.pillarPoints.length < 4) {
      failures.push("content automation campaign should include at least four pillar points.");
    }
    if (!Array.isArray(campaign.pillarPointsKo) || campaign.pillarPointsKo.length < 4) {
      failures.push("content automation campaign should include at least four Korean pillar points.");
    }
    if (!Array.isArray(campaign.complianceNotes) || campaign.complianceNotes.length < 3) {
      failures.push("content automation campaign should include compliance guardrails.");
    }
  } catch (error) {
    failures.push(`Invalid content-automation/campaigns/grantlabs-growth-check.json: ${error.message}`);
  }
}

if (existsSync("content-automation/publishing-defaults.json")) {
  try {
    const defaults = JSON.parse(read("content-automation/publishing-defaults.json"));
    if (!Array.isArray(defaults.sequence) || defaults.sequence.length < 8) {
      failures.push("content automation publishing defaults should include the full platform sequence.");
    }
    for (const item of defaults.sequence || []) {
      for (const field of ["platformId", "dayOffset", "slot", "objective", "assetSpec", "successSignal"]) {
        if (item[field] === undefined || item[field] === "") failures.push(`publishing default is missing field: ${field}`);
      }
    }
  } catch (error) {
    failures.push(`Invalid content-automation/publishing-defaults.json: ${error.message}`);
  }
}

if (existsSync("scripts/generate-content-plan.mjs")) {
  const planner = read("scripts/generate-content-plan.mjs");
  for (const marker of ["content-automation/platform-rules.json", "content-automation", "output", "koreanStarter", "Korean post starter", "complianceNotes", "repurposeRule", "Generated content plan"]) {
    if (!planner.includes(marker)) failures.push(`scripts/generate-content-plan.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/generate-content-status.mjs")) {
  const statusGenerator = read("scripts/generate-content-status.mjs");
  for (const marker of ["content-automation/CAMPAIGN_STATUS.md", "Campaign Outputs", "content:run:all", "Generated campaign status"]) {
    if (!statusGenerator.includes(marker)) failures.push(`scripts/generate-content-status.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/generate-deployment-readiness.mjs")) {
  const readinessGenerator = read("scripts/generate-deployment-readiness.mjs");
  for (const marker of ["DEPLOYMENT_READINESS.md", "Readiness Checks", "Open Deployment Items", "Generated deployment readiness"]) {
    if (!readinessGenerator.includes(marker)) failures.push(`scripts/generate-deployment-readiness.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/generate-sitemap.mjs")) {
  const sitemapGenerator = read("scripts/generate-sitemap.mjs");
  for (const marker of ["sitemap.xml", "Asia/Seoul", "changefreq", "Generated sitemap"]) {
    if (!sitemapGenerator.includes(marker)) failures.push(`scripts/generate-sitemap.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/generate-development-journal.mjs")) {
  const journalGenerator = read("scripts/generate-development-journal.mjs");
  for (const marker of ["DEVELOPMENT_JOURNAL.md", "Recent Implementation Flow", "Refresh handoff", "Generated development journal"]) {
    if (!journalGenerator.includes(marker)) failures.push(`scripts/generate-development-journal.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/generate-status-index.mjs")) {
  const statusIndexGenerator = read("scripts/generate-status-index.mjs");
  for (const marker of ["STATUS_INDEX.md", "DEVELOPMENT_JOURNAL.md", "Recommended Reading Order", "Guardrail Summary", "Generated status index"]) {
    if (!statusIndexGenerator.includes(marker)) failures.push(`scripts/generate-status-index.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/generate-asset-briefs.mjs")) {
  const assetGenerator = read("scripts/generate-asset-briefs.mjs");
  for (const marker of ["content-automation/publishing-defaults.json", "specsByPlatform", "Production checklist", "Generated asset briefs"]) {
    if (!assetGenerator.includes(marker)) failures.push(`scripts/generate-asset-briefs.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/check-content-automation.mjs")) {
  const contentCheck = read("scripts/check-content-automation.mjs");
  for (const marker of ["forbiddenClaims", "requiredPlatformMarkers", "Content automation check passed", "https://grantlabs.co.kr/checklist.html"]) {
    if (!contentCheck.includes(marker)) failures.push(`scripts/check-content-automation.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/generate-caption-pack.mjs")) {
  const captionGenerator = read("scripts/generate-caption-pack.mjs");
  for (const marker of ["captionByPlatform", "hashtags", "Thumbnail/Text overlay", "Generated caption pack"]) {
    if (!captionGenerator.includes(marker)) failures.push(`scripts/generate-caption-pack.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/generate-publishing-queue.mjs")) {
  const queueGenerator = read("scripts/generate-publishing-queue.mjs");
  for (const marker of ["content-automation/publishing-defaults.json", "publishing-queue", "successSignal", "Generated publishing queue"]) {
    if (!queueGenerator.includes(marker)) failures.push(`scripts/generate-publishing-queue.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/generate-publishing-calendar.mjs")) {
  const calendarGenerator = read("scripts/generate-publishing-calendar.mjs");
  for (const marker of ["content-automation/PUBLISHING_CALENDAR.md", "content-automation/PUBLISHING_CALENDAR.csv", "parseCsv", "Generated publishing calendar"]) {
    if (!calendarGenerator.includes(marker)) failures.push(`scripts/generate-publishing-calendar.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/run-content-automation.mjs")) {
  const runner = read("scripts/run-content-automation.mjs");
  for (const marker of ["generate-content-plan.mjs", "generate-asset-briefs.mjs", "generate-caption-pack.mjs", "generate-publishing-queue.mjs", "Content automation completed"]) {
    if (!runner.includes(marker)) failures.push(`scripts/run-content-automation.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/run-all-content-automation.mjs")) {
  const allRunner = read("scripts/run-all-content-automation.mjs");
  for (const marker of ["content-automation/campaigns", "run-content-automation.mjs", "generate-content-status.mjs", "generate-publishing-calendar.mjs", "Content automation completed for", "campaignFiles.length"]) {
    if (!allRunner.includes(marker)) failures.push(`scripts/run-all-content-automation.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("content-automation/CAMPAIGN_STATUS.md")) {
  const campaignStatus = read("content-automation/CAMPAIGN_STATUS.md");
  for (const marker of ["Grant Labs Campaign Status", "Campaign Outputs", "npm run content:status", "npm run content:run:all", "grantlabs-growth-check", "rnd-center-funding-bridge", "certification-patent-funding-sequence"]) {
    if (!campaignStatus.includes(marker)) failures.push(`content-automation/CAMPAIGN_STATUS.md is missing marker: ${marker}`);
  }
}

if (existsSync("content-automation/PUBLISHING_CALENDAR.md")) {
  const publishingCalendar = read("content-automation/PUBLISHING_CALENDAR.md");
  for (const marker of ["Grant Labs Publishing Calendar", "Calendar", "npm run content:calendar", "consultation-checklist-conversion", "Naver Blog", "LinkedIn Page"]) {
    if (!publishingCalendar.includes(marker)) failures.push(`content-automation/PUBLISHING_CALENDAR.md is missing marker: ${marker}`);
  }
}

if (existsSync("content-automation/output/2026-06-18-grantlabs-growth-check-caption-pack.md")) {
  const captionPack = read("content-automation/output/2026-06-18-grantlabs-growth-check-caption-pack.md");
  for (const marker of ["Caption Pack", "Naver Blog", "Instagram Carousel", "YouTube Shorts", "TikTok", "Thumbnail/Text overlay", "#정책자금", "Compliance Guardrails"]) {
    if (!captionPack.includes(marker)) failures.push(`generated caption pack is missing marker: ${marker}`);
  }
}

if (existsSync("content-automation/output/2026-06-18-grantlabs-growth-check-asset-briefs.md")) {
  const assetBriefs = read("content-automation/output/2026-06-18-grantlabs-growth-check-asset-briefs.md");
  for (const marker of ["Asset Briefs", "Naver Blog", "Instagram Carousel", "YouTube Shorts", "TikTok", "Production checklist", "Compliance Guardrails"]) {
    if (!assetBriefs.includes(marker)) failures.push(`generated asset briefs are missing marker: ${marker}`);
  }
}

if (existsSync("content-automation/output/2026-06-18-grantlabs-growth-check.md")) {
  const generatedPlan = read("content-automation/output/2026-06-18-grantlabs-growth-check.md");
  for (const marker of ["Naver Blog", "Instagram Carousel", "Instagram Reels", "YouTube Shorts", "YouTube Long-form", "TikTok", "Facebook Page", "LinkedIn Page", "Korean post starter", "정책자금", "Compliance guardrails", "https://grantlabs.co.kr/checklist.html"]) {
    if (!generatedPlan.includes(marker)) failures.push(`generated content plan is missing marker: ${marker}`);
  }
}

if (existsSync("content-automation/output/2026-06-18-grantlabs-growth-check-publishing-queue.csv")) {
  const queueCsv = read("content-automation/output/2026-06-18-grantlabs-growth-check-publishing-queue.csv");
  for (const marker of ["Naver Blog", "Instagram Carousel", "YouTube Shorts", "TikTok", "LinkedIn Page", "successSignal"]) {
    if (!queueCsv.includes(marker)) failures.push(`generated publishing queue CSV is missing marker: ${marker}`);
  }
}

if (existsSync("content-automation/output/2026-06-18-grantlabs-growth-check-publishing-queue.md")) {
  const queueMd = read("content-automation/output/2026-06-18-grantlabs-growth-check-publishing-queue.md");
  for (const marker of ["Publishing Queue", "정책자금", "Naver Blog", "Instagram Carousel", "YouTube Long-form", "Guardrails"]) {
    if (!queueMd.includes(marker)) failures.push(`generated publishing queue summary is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/check-local-preview.mjs")) {
  const previewCheck = read("scripts/check-local-preview.mjs");
  for (const marker of ["http://127.0.0.1:4173", "/styles/homepage.css", "/assets/brand/grant-labs-logo-white.svg", "/assets/brand/grant-labs-logo-black.svg", "/social-card.svg", "/__missing-local-preview__", "strict-transport-security", "content-security-policy", "x-frame-options", "cache-control", "no-store", "htmlIntegrityMarkers", "method: \"HEAD\"", "method: \"POST\"", "GET, HEAD", "style-src 'self' https://cdn.jsdelivr.net", "font-src 'self' https://cdn.jsdelivr.net data:", lucideIntegrity, emailJsIntegrity, "Local preview check passed"]) {
    if (!previewCheck.includes(marker)) failures.push(`scripts/check-local-preview.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("scripts/serve-static.mjs")) {
  const server = read("scripts/serve-static.mjs");
  for (const marker of ["createServer", "127.0.0.1", "4173", "404.html", "no-store", "application/manifest+json", "HEAD", "Allow: \"GET, HEAD\"", "securityHeaders", "Content-Security-Policy", "style-src 'self' https://cdn.jsdelivr.net", "font-src 'self' https://cdn.jsdelivr.net data:", "X-Frame-Options", "Permissions-Policy"]) {
    if (!server.includes(marker)) failures.push(`scripts/serve-static.mjs is missing marker: ${marker}`);
  }
}

if (existsSync("_headers") && existsSync("scripts/serve-static.mjs")) {
  const headers = read("_headers");
  const server = read("scripts/serve-static.mjs");
  const syncedHeaders = [
    "Strict-Transport-Security",
    "Content-Security-Policy",
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Permissions-Policy",
  ];

  for (const header of syncedHeaders) {
    const escapedHeader = header.replace(/-/g, "\\-");
    const headersValue = headers.match(new RegExp(`${escapedHeader}:\\s*(.+)`))?.[1]?.trim();
    const serverValue = server.match(new RegExp(`"${escapedHeader}":\\s*"([^"]+)"`))?.[1]?.trim();

    if (!headersValue) failures.push(`_headers is missing a parseable ${header} value.`);
    if (!serverValue) failures.push(`scripts/serve-static.mjs is missing a parseable ${header} value.`);
    if (headersValue && serverValue && headersValue !== serverValue) {
      failures.push(`_headers ${header} and local preview ${header} must stay in sync.`);
    }
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
  if (!socialCard.includes("GROWTH FUNDING PARTNER")) {
    failures.push("social-card.svg is missing the Grant Labs wordmark support line.");
  }
}

if (existsSync("sitemap.xml") && !read("sitemap.xml").includes("<urlset")) {
  failures.push("sitemap.xml does not contain a urlset.");
}

if (existsSync("sitemap.xml")) {
  const sitemap = read("sitemap.xml");
  if (!sitemap.includes(`<lastmod>${today}</lastmod>`)) {
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

for (const logoFile of [
  "assets/brand/grant-labs-logo.svg",
  "assets/brand/grant-labs-logo-black.svg",
  "assets/brand/grant-labs-logo-gold.svg",
  "assets/brand/grant-labs-logo-white.svg",
]) {
  if (!existsSync(logoFile)) continue;
  const logo = read(logoFile);
  for (const marker of ["<svg", 'viewBox="0 0 520 120"', "Grant Labs", 'role="img"']) {
    if (!logo.includes(marker)) failures.push(`${logoFile} is missing marker: ${marker}`);
  }
  if (logo.includes("@import")) failures.push(`${logoFile} should not import remote fonts.`);
}

if (existsSync("_headers")) {
  const headers = read("_headers");
  for (const marker of ["Strict-Transport-Security", "Content-Security-Policy", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"]) {
    if (!headers.includes(marker)) failures.push(`_headers is missing security header: ${marker}`);
  }
  for (const marker of ["default-src 'self'", "https://unpkg.com", "https://cdn.jsdelivr.net", "https://api.emailjs.com", "https://images.unsplash.com", "style-src 'self' https://cdn.jsdelivr.net", "font-src 'self' https://cdn.jsdelivr.net data:", "object-src 'none'", "frame-ancestors 'none'"]) {
    if (!headers.includes(marker)) failures.push(`_headers CSP is missing marker: ${marker}`);
  }
  if (!headers.includes("script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net")) {
    failures.push("_headers CSP script-src does not match the approved CDN allowlist.");
  }
  if (!headers.includes("connect-src 'self' https://api.emailjs.com")) {
    failures.push("_headers CSP connect-src does not allow the approved EmailJS API endpoint.");
  }
  if (!headers.includes("style-src 'self' https://cdn.jsdelivr.net") || !headers.includes("font-src 'self' https://cdn.jsdelivr.net data:")) {
    failures.push("_headers CSP does not allow the approved Pretendard font CDN.");
  }
  for (const path of ["/social-card.svg", "/assets/brand/*", "/site.webmanifest", "/robots.txt", "/sitemap.xml"]) {
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
  for (const path of ["/", "/privacy.html", "/checklist.html", "/robots.txt", "/sitemap.xml", "/assets/brand/grant-labs-logo-white.svg", "/assets/brand/grant-labs-logo-black.svg", "/social-card.svg"]) {
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
  for (const marker of ["style-src 'self' https://cdn.jsdelivr.net", "font-src 'self' https://cdn.jsdelivr.net data:"]) {
    if (!smokeCheck.includes(marker)) failures.push(`Deployed smoke check is missing CSP marker assertion: ${marker}`);
  }
  if (!smokeCheck.includes("contentType") || !smokeCheck.includes("content-type")) {
    failures.push("Deployed smoke check is missing content-type validation.");
  }
}

if (existsSync("DEPLOYMENT_ENVIRONMENTS.md")) {
  const deployment = read("DEPLOYMENT_ENVIRONMENTS.md");
  for (const marker of ["Preview Verification", "Local preview check", "Deployed smoke check", "EmailJS test", "DNS unchanged", "Contact Form Configuration", "service_tcj8otx", "template_8ne6kj3", "npm run preview:check", "npm run smoke"]) {
    if (!deployment.includes(marker)) failures.push(`DEPLOYMENT_ENVIRONMENTS.md is missing marker: ${marker}`);
  }
  for (const legacyCommand of ["node scripts/check-static-site.mjs", "node scripts/check-deployed-site.mjs <preview-url>"]) {
    if (deployment.includes(legacyCommand)) failures.push(`DEPLOYMENT_ENVIRONMENTS.md still includes legacy command: ${legacyCommand}`);
  }
  for (const marker of [emailJsPublicKey, emailJsServiceId, emailJsTemplateId]) {
    if (!deployment.includes(marker)) failures.push(`DEPLOYMENT_ENVIRONMENTS.md is missing EmailJS marker: ${marker}`);
  }
  if (!deployment.includes(`Fallback email: ${contactEmail}`) || !deployment.includes(`Fallback phone: ${contactPhoneDisplay}`)) {
    failures.push("DEPLOYMENT_ENVIRONMENTS.md is missing canonical fallback contact values.");
  }
}

if (existsSync("DEPLOYMENT_READINESS.md")) {
  const readiness = read("DEPLOYMENT_READINESS.md");
  for (const marker of ["Grant Labs Deployment Readiness", "Readiness Checks", "Open Deployment Items", "npm run deployment:readiness", "npm run smoke -- <preview-url>"]) {
    if (!readiness.includes(marker)) failures.push(`DEPLOYMENT_READINESS.md is missing marker: ${marker}`);
  }
}

if (existsSync("STATUS_INDEX.md")) {
  const statusIndex = read("STATUS_INDEX.md");
  for (const marker of ["Grant Labs Status Index", "Recommended Reading Order", "Guardrail Summary", "npm run sitemap:refresh", "npm run status:journal", "npm run status:index", "CLAUDE_HANDOFF.md", "DEVELOPMENT_JOURNAL.md", "DEPLOYMENT_READINESS.md"]) {
    if (!statusIndex.includes(marker)) failures.push(`STATUS_INDEX.md is missing marker: ${marker}`);
  }
}

if (existsSync("DEVELOPMENT_JOURNAL.md")) {
  const journal = read("DEVELOPMENT_JOURNAL.md");
  for (const marker of ["Grant Labs Development Journal", "Recent Implementation Flow", "npm run status:journal", "STATUS_INDEX.md"]) {
    if (!journal.includes(marker)) failures.push(`DEVELOPMENT_JOURNAL.md is missing marker: ${marker}`);
  }
}

if (existsSync("DEVELOPMENT_STATUS.md")) {
  const status = read("DEVELOPMENT_STATUS.md");
  for (const legacyCommand of ["node scripts/check-static-site.mjs", "node scripts/check-deployed-site.mjs <preview-url>"]) {
    if (status.includes(legacyCommand)) failures.push(`DEVELOPMENT_STATUS.md still includes legacy command: ${legacyCommand}`);
  }
}

if (existsSync("README.md")) {
  const readme = read("README.md");
  for (const marker of ["scripts/", "check-static-site.mjs", "check-content-automation.mjs", "generate-asset-briefs.mjs", "generate-caption-pack.mjs", "generate-content-plan.mjs", "generate-content-status.mjs", "generate-deployment-readiness.mjs", "generate-sitemap.mjs", "generate-development-journal.mjs", "generate-status-index.mjs", "generate-publishing-queue.mjs", "generate-publishing-calendar.mjs", "run-all-content-automation.mjs", "run-content-automation.mjs", "serve-static.mjs", "check-local-preview.mjs", "check-deployed-site.mjs", "content-automation/", "PUBLISHING_CALENDAR.md", "assets/brand/", "DEVELOPMENT_JOURNAL.md", "social-card.svg", "npm run check:content", "npm run content:assets", "npm run content:captions", "npm run content:plan", "npm run content:queue", "npm run content:calendar", "npm run content:run", "npm run content:run:all", "npm run content:status", "npm run deployment:readiness", "npm run sitemap:refresh", "npm run status:journal", "npm run status:index", "npm run serve", "npm run preview:check"]) {
    if (!readme.includes(marker)) failures.push(`README.md is missing marker: ${marker}`);
  }
}

if (existsSync("COMMANDS.md")) {
  const commands = read("COMMANDS.md");
  for (const marker of ["npm run check", "npm run check:content", "npm run content:assets", "npm run content:captions", "npm run content:plan", "npm run content:queue", "npm run content:calendar", "npm run content:run", "npm run content:run:all", "npm run content:status", "npm run deployment:readiness", "npm run sitemap:refresh", "npm run status:journal", "npm run status:index", "npm run serve", "npm run preview:check", "npm run smoke", "static-site validation", "content automation quality", "asset briefs", "caption pack", "platform-specific posting guidance", "publishing queue", "publishing calendar", "full content automation", "all campaigns", "campaign status", "deployment readiness", "sitemap refresh", "development journal", "status index"]) {
    if (!commands.includes(marker)) failures.push(`COMMANDS.md is missing marker: ${marker}`);
  }
}

if (existsSync("CONTRIBUTING.md")) {
  const contributing = read("CONTRIBUTING.md");
  for (const marker of ["grantlabs-website", "npm run check", "npm run serve", "npm run preview:check", "DEVELOPMENT_STATUS.md", "SECURITY.md"]) {
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
  for (const marker of ["Framework preset: None", "Production branch: main", "npm run preview:check", "npm run smoke"]) {
    if (!setup.includes(marker)) failures.push(`CLOUDFLARE_PAGES_SETUP.md is missing marker: ${marker}`);
  }
}

if (existsSync(".github/workflows/static-site-check.yml")) {
  const workflow = read(".github/workflows/static-site-check.yml");
  for (const marker of ["actions/setup-node@v4", "fetch-depth: 0", "node-version: 20", "timeout-minutes: 5", "concurrency:", "cancel-in-progress: true", "npm run content:run:all", "git diff --exit-code -- content-automation", "npm run sitemap:refresh", "git diff --exit-code -- sitemap.xml", "npm run deployment:readiness", "git diff --exit-code -- DEPLOYMENT_READINESS.md", "npm run status:journal", "git diff --exit-code -- DEVELOPMENT_JOURNAL.md", "npm run status:index", "git diff --exit-code -- STATUS_INDEX.md", "npm run check:content", "npm run check", "npm run serve", "npm run preview:check", "127.0.0.1:4173"]) {
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
