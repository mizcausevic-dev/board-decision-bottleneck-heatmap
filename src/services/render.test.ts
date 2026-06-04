import { describe, expect, it } from "vitest";
import {
  renderBottleneckOverview,
  renderBottleneckRegister,
  renderDocs,
  renderHotspotClusters,
  renderOwnerConcentration,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderBottleneckOverview()).toContain("Board Decision Bottleneck Heatmap");
  });

  it("renders the bottleneck register route", () => {
    expect(renderBottleneckRegister()).toContain("/bottleneck-register");
  });

  it("renders the hotspot clusters route", () => {
    expect(renderHotspotClusters()).toContain("/hotspot-clusters");
  });

  it("renders the owner concentration route", () => {
    expect(renderOwnerConcentration()).toContain("/owner-concentration");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic bottleneck-heatmap data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
