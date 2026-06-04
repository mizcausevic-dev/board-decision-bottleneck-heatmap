import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bottleneckRegister, dragPressure, hotspotClusters, ownerConcentration, payload, summary, verification } from "../src/services/verticalBriefService.js";
import {
  renderBottleneckOverview,
  renderBottleneckRegister,
  renderDocs,
  renderHotspotClusters,
  renderOwnerConcentration,
  renderVerification
} from "../src/services/render.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "dist-static");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const pages = new Map<string, [string, string]>([
  ["/", ["index.html", renderBottleneckOverview()]],
  ["/bottleneck-register", ["bottleneck-register/index.html", renderBottleneckRegister()]],
  ["/hotspot-clusters", ["hotspot-clusters/index.html", renderHotspotClusters()]],
  ["/owner-concentration", ["owner-concentration/index.html", renderOwnerConcentration()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [relativePath, html]] of pages) {
  const fullPath = path.join(outDir, relativePath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, html);
}

writeFileSync(path.join(outDir, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://bottlenecks.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://bottlenecks.kineticgain.com/</loc></url><url><loc>https://bottlenecks.kineticgain.com/bottleneck-register/</loc></url><url><loc>https://bottlenecks.kineticgain.com/hotspot-clusters/</loc></url><url><loc>https://bottlenecks.kineticgain.com/owner-concentration/</loc></url><url><loc>https://bottlenecks.kineticgain.com/verification/</loc></url><url><loc>https://bottlenecks.kineticgain.com/docs/</loc></url></urlset>`
);

const apiDir = path.join(outDir, "api");
mkdirSync(apiDir, { recursive: true });
const jsonPayloads = {
  "dashboard-summary.json": summary(),
  "bottleneck-register.json": bottleneckRegister(),
  "hotspot-clusters.json": hotspotClusters(),
  "owner-concentration.json": ownerConcentration(),
  "drag-pressure.json": dragPressure(),
  "verification.json": verification(),
  "payload.json": payload()
};

for (const [name, body] of Object.entries(jsonPayloads)) {
  writeFileSync(path.join(apiDir, name), JSON.stringify(body, null, 2));
}
