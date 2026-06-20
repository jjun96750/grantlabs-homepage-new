import { writeFileSync } from "node:fs";

const outputPath = "sitemap.xml";
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(new Date());

const urls = [
  {
    loc: "https://grantlabs.co.kr/",
    changefreq: "weekly",
    priority: "1.0"
  },
  {
    loc: "https://grantlabs.co.kr/checklist.html",
    changefreq: "monthly",
    priority: "0.6"
  }
];

const rows = urls
  .map(({ loc, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`)
  .join("\n");

const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows}
</urlset>
`;

writeFileSync(outputPath, content, "utf8");
console.log(`Generated sitemap: ${outputPath}`);
