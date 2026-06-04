import { describe, expect, it } from "vitest";
import { bottleneckRegister, dragPressure, hotspotClusters, ownerConcentration, payload, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the bottleneck summary", () => {
    expect(summary().lanesMapped).toBeGreaterThan(0);
  });

  it("returns the bottleneck register view", () => {
    expect(bottleneckRegister().length).toBeGreaterThan(0);
  });

  it("returns the hotspot cluster view", () => {
    expect(hotspotClusters().length).toBeGreaterThan(0);
  });

  it("returns the owner concentration view", () => {
    expect(ownerConcentration().length).toBeGreaterThan(0);
  });

  it("returns the drag pressure view", () => {
    expect(dragPressure().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.lanesMapped).toBeGreaterThan(0);
  });
});
