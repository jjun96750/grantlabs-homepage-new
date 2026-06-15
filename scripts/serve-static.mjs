import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = process.cwd();
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 4173);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

const securityHeaders = {
  "Strict-Transport-Security": "max-age=31536000",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net; connect-src 'self' https://api.emailjs.com; img-src 'self' data: https://images.unsplash.com; style-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' mailto:",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

const safePath = (requestUrl) => {
  const url = new URL(requestUrl, `http://${host}:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  const normalized = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const relativePath = pathname === "/" ? "index.html" : normalized.replace(/^[/\\]+/, "");
  const target = resolve(join(root, relativePath));
  return target.startsWith(root) ? target : "";
};

const sendFile = (request, response, filePath, statusCode = 200) => {
  const type = contentTypes.get(extname(filePath)) || "application/octet-stream";
  response.writeHead(statusCode, {
    ...securityHeaders,
    "Content-Type": type,
    "Cache-Control": "no-store",
  });
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  createReadStream(filePath).pipe(response);
};

createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method || "")) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  const target = safePath(request.url || "/");
  if (target && existsSync(target) && statSync(target).isFile()) {
    sendFile(request, response, target);
    return;
  }

  const fallback = join(root, "404.html");
  if (existsSync(fallback)) {
    sendFile(request, response, fallback, 404);
    return;
  }

  response.writeHead(404, { ...securityHeaders, "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not found");
}).listen(port, host, () => {
  console.log(`Grant Labs static preview: http://${host}:${port}/`);
});
