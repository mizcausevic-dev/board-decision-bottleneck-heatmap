import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-decision-bottleneck-heatmap app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Decision Bottleneck Heatmap");
  });

  it("serves the bottleneck register route", async () => {
    const response = await request(app).get("/bottleneck-register");
    expect(response.status).toBe(200);
  });

  it("serves the hotspot clusters route", async () => {
    const response = await request(app).get("/hotspot-clusters");
    expect(response.status).toBe(200);
  });

  it("serves the owner concentration route", async () => {
    const response = await request(app).get("/owner-concentration");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.lanesMapped).toBeGreaterThan(0);
  });
});
