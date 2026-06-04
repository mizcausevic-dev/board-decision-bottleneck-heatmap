import express from "express";
import { bottleneckRegister, dragPressure, hotspotClusters, ownerConcentration, payload, summary, verification } from "./services/verticalBriefService.js";
import {
  renderBottleneckOverview,
  renderBottleneckRegister,
  renderDocs,
  renderHotspotClusters,
  renderOwnerConcentration,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderBottleneckOverview()));
  app.get("/bottleneck-register", (_req, res) => res.type("html").send(renderBottleneckRegister()));
  app.get("/hotspot-clusters", (_req, res) => res.type("html").send(renderHotspotClusters()));
  app.get("/owner-concentration", (_req, res) => res.type("html").send(renderOwnerConcentration()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/bottleneck-register", (_req, res) => res.json(bottleneckRegister()));
  app.get("/api/hotspot-clusters", (_req, res) => res.json(hotspotClusters()));
  app.get("/api/owner-concentration", (_req, res) => res.json(ownerConcentration()));
  app.get("/api/drag-pressure", (_req, res) => res.json(dragPressure()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`board-decision-bottleneck-heatmap listening on http://127.0.0.1:${port}`);
  });
}
