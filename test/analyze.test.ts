import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleBoardDecisionBottleneckHeatmap } from "../src/data/sampleVerticalBrief.js";
import type { BoardDecisionBottleneckHeatmapItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardDecisionBottleneckHeatmap, { now: "2026-06-03T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardDecisionBottleneckHeatmap.length);
  });

  it("counts critical lanes", () => {
    const report = analyze(sampleBoardDecisionBottleneckHeatmap, { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.criticalLanes).toBeGreaterThan(0);
  });

  it("counts owner chokepoints", () => {
    const report = analyze(sampleBoardDecisionBottleneckHeatmap, { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.ownerChokepoints).toBeGreaterThan(0);
  });

  it("sums recoverable value", () => {
    const report = analyze(sampleBoardDecisionBottleneckHeatmap, { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.recoverableValueMillions).toBe(82);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardDecisionBottleneckHeatmap, { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.lanesMapped).toBe(0);
    expect(report.summary.averageIntensity).toBe(0);
    expect(report.summary.leadingMessage).toContain("No bottlenecks");
  });

  it("hits low and medium branches explicitly", () => {
    const fixtures: BoardDecisionBottleneckHeatmapItem[] = [
      {
        id: "low-branch",
        lane: "Stable hotspot lane",
        track: "PLATFORM_ENGINEERING",
        bottleneckKind: "TOOL_FRAGMENTATION",
        heatTier: "WATCH",
        bottleneckTheme: "Light tool overlap",
        boardQuestion: "Is the lane stable?",
        owner: "Platform engineering lead",
        audience: "Board operating committee",
        currentPosture: "Stable.",
        bottleneckNarrative: "Controlled.",
        operatingReality: "Healthy.",
        riskHeadline: "Low heat.",
        blockingIssue: "None",
        evidenceArtifacts: ["memo"],
        dependencyMoves: ["keep it stable"],
        relatedSurfaces: ["bottlenecks.kineticgain.com"],
        companyTags: ["Azure"],
        reviewDragScore: 24,
        handoffPressureScore: 28,
        ownerConcentrationScore: 31,
        evidenceFreshnessScore: 82,
        decisionLatencyDays: 8,
        bottleneckIntensityScore: 34,
        recoverableValueMillions: 4,
        headline: "Stable lane.",
        narrative: "Low branch test.",
        nextMove: "Keep the lane stable."
      },
      {
        id: "medium-branch",
        lane: "Pressured hotspot lane",
        track: "AI_GOVERNANCE",
        bottleneckKind: "REVIEW_QUEUE",
        heatTier: "HIGH",
        bottleneckTheme: "Queue pressure",
        boardQuestion: "Where is the heat visible but not yet catastrophic?",
        owner: "Chief AI Officer",
        audience: "Board technology committee",
        currentPosture: "Watch state.",
        bottleneckNarrative: "Pressured.",
        operatingReality: "Mixed.",
        riskHeadline: "Moderate heat.",
        blockingIssue: "Split owners",
        evidenceArtifacts: ["control audit"],
        dependencyMoves: ["align the owner group"],
        relatedSurfaces: ["governance.kineticgain.com"],
        companyTags: ["OpenAI"],
        reviewDragScore: 52,
        handoffPressureScore: 57,
        ownerConcentrationScore: 60,
        evidenceFreshnessScore: 67,
        decisionLatencyDays: 20,
        bottleneckIntensityScore: 60,
        recoverableValueMillions: 7,
        headline: "Pressured lane.",
        narrative: "Medium branch test.",
        nextMove: "Align owners."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-03T00:00:00Z" });
    expect(report.items[0].dragAssessment.severity).toBe("LOW");
    expect(report.items[0].intensityAssessment.severity).toBe("LOW");
    expect(report.items[1].dragAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].handoffAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].ownerAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].freshnessAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].latencyAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].intensityAssessment.severity).toBe("MEDIUM");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleBoardDecisionBottleneckHeatmap, { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.lanesMapped).toBe(sampleBoardDecisionBottleneckHeatmap.length);
  });
});
