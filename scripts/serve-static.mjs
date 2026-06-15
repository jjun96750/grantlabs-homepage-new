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

const safePath = (requestUrl) => {
  const url = new URL(requestUrl, `http://${host}:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  const normalized = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const relativePath = pathname === "/" ? "index.html" : normalized.replace(/^[/\\]+/, "");
  const target = resolve(join(root, relativePath));
  return target.startsWith(root) ? target : "";
};

const sendFile = (response, filePath, statusCode = 200) => {
  const type = contentTypes.get(extname(filePath)) || "application/octet-stream";
  response.writeHead(statusCode, {
    "Content-Type": type,
    "Cache-Control": "no-store",
  });
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
    sendFile(response, target);
    return;
  }

  const fallback = join(root, "404.html");
  if (existsSync(fallback)) {
    sendFile(response, fallback, 404);
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not found");
}).listen(port, host, () => {
  console.log(`Grant Labs static preview: http://${host}:${port}/`);
});
