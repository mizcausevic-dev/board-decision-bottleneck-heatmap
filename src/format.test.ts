import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("renders the bottleneck summary lines", () => {
    const output = formatSummary({
      lanesMapped: 6,
      criticalLanes: 2,
      ownerChokepoints: 2,
      averageIntensity: 70.2,
      recoverableValueMillions: 82,
      leadingMessage: "Queue drag is clustering in a few decision lanes."
    });

    expect(output).toContain("Board Decision Bottleneck Heatmap");
    expect(output).toContain("Lanes mapped: 6");
    expect(output).toContain("Owner chokepoints: 2");
  });
});
