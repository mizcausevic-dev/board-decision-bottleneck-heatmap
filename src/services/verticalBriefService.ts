import { analyze } from "../analyze.js";
import { sampleBoardDecisionBottleneckHeatmap } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionBottleneckHeatmap, { now: "2026-06-03T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Collapse the AI governance review queue, assign one procurement packet owner, bind one biotech closeout threshold, split overloaded FinTech control ownership, thin the platform tool path, and keep nonprofit freshness drift in watch mode."
  };
}

export function bottleneckRegister() {
  return sampleBoardDecisionBottleneckHeatmap.map((item) => ({
    lane: item.lane,
    heatTier: item.heatTier,
    bottleneckKind: item.bottleneckKind,
    owner: item.owner,
    audience: item.audience,
    bottleneckTheme: item.bottleneckTheme,
    bottleneckNarrative: item.bottleneckNarrative,
    bottleneckIntensityScore: item.bottleneckIntensityScore,
    nextMove: item.nextMove
  }));
}

export function hotspotClusters() {
  return report.items.map((item) => ({
    lane: item.lane,
    heatTier: item.heatTier,
    bottleneckTheme: item.bottleneckTheme,
    riskHeadline: item.riskHeadline,
    blockingIssue: item.blockingIssue,
    reviewDragScore: item.reviewDragScore,
    handoffPressureScore: item.handoffPressureScore,
    decisionLatencyDays: item.decisionLatencyDays,
    bottleneckIntensityScore: item.bottleneckIntensityScore
  }));
}

export function ownerConcentration() {
  return report.items.map((item) => ({
    lane: item.lane,
    owner: item.owner,
    audience: item.audience,
    ownerConcentrationScore: item.ownerConcentrationScore,
    reviewDragScore: item.reviewDragScore,
    handoffPressureScore: item.handoffPressureScore,
    nextMove: item.nextMove
  }));
}

export function dragPressure() {
  return report.items.map((item) => ({
    lane: item.lane,
    compositeBottleneckScore: item.compositeBottleneckScore,
    reviewDragScore: item.reviewDragScore,
    handoffPressureScore: item.handoffPressureScore,
    ownerConcentrationScore: item.ownerConcentrationScore,
    evidenceFreshnessScore: item.evidenceFreshnessScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic bottleneck-heatmap data only - no live board minutes, private diligence packets, or confidential internal workflow telemetry are included.",
    "Scores are modeled to show how Kinetic Gain can expose review drag, handoff pressure, owner concentration, evidence freshness drift, and decision latency in one board-readable surface.",
    "All routes are read-only and demonstrate executive bottleneck mapping, not legal advice, fiduciary guidance, or live board instruction."
  ];
}

export function payload() {
  return {
    report,
    bottleneckRegister: bottleneckRegister(),
    hotspotClusters: hotspotClusters(),
    ownerConcentration: ownerConcentration(),
    dragPressure: dragPressure(),
    verification: verification(),
    sample: sampleBoardDecisionBottleneckHeatmap
  };
}
