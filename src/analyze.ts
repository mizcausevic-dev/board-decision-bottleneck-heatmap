import type {
  BoardDecisionBottleneckHeatmapExport,
  BoardDecisionBottleneckHeatmapItem,
  BoardDecisionBottleneckHeatmapReportItem,
  BottleneckAssessment,
  BottleneckSeverity
} from "./types.js";

function assessHigh(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): BottleneckAssessment {
  let severity: BottleneckSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessLow(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): BottleneckAssessment {
  return assessHigh(100 - score, 100 - healthy, 100 - pressured, healthyMessage, pressureMessage, highMessage);
}

export function analyze(
  items: BoardDecisionBottleneckHeatmapItem[],
  options: { now?: string } = {}
): BoardDecisionBottleneckHeatmapExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionBottleneckHeatmapReportItem[] = items.map((item) => {
    const dragAssessment = assessHigh(
      item.reviewDragScore,
      36,
      58,
      "Review drag is low enough that this lane can move without visible queue distortion.",
      "Review drag is visible and should be reduced before another board cycle compounds it.",
      "Review drag is severe enough to distort this lane's execution quality."
    );

    const handoffAssessment = assessHigh(
      item.handoffPressureScore,
      38,
      60,
      "Handoff pressure is contained enough to keep this lane moving cleanly.",
      "Handoff pressure is visible and should be tightened before more work gets routed through it.",
      "Handoff pressure is too high; the lane is losing time between owners."
    );

    const ownerAssessment = assessHigh(
      item.ownerConcentrationScore,
      42,
      64,
      "Owner load is distributed enough to avoid a single choke point.",
      "Owner concentration is visible and should be relieved before the lane scales further.",
      "Owner concentration is too high; one lane or person is carrying too much decision burden."
    );

    const freshnessAssessment = assessLow(
      item.evidenceFreshnessScore,
      74,
      58,
      "Evidence freshness is strong enough to keep confidence high.",
      "Evidence freshness is visible, though drift is starting to build.",
      "Evidence freshness is too weak; stale proof is amplifying bottleneck risk."
    );

    const latencyAssessment = assessHigh(
      item.decisionLatencyDays,
      12,
      22,
      "Decision latency is still short enough to keep this lane responsive.",
      "Decision latency is stretching and should be reduced before it becomes structural.",
      "Decision latency is now severe enough to weaken board-visible throughput."
    );

    const intensityAssessment = assessHigh(
      item.bottleneckIntensityScore,
      42,
      64,
      "Overall bottleneck intensity is manageable in this lane.",
      "Overall bottleneck intensity is visible and should be reduced with targeted intervention.",
      "Overall bottleneck intensity is high enough to justify immediate board-visible action."
    );

    const compositeBottleneckScore =
      Math.round(
        ((item.reviewDragScore +
          item.handoffPressureScore +
          item.ownerConcentrationScore +
          (100 - item.evidenceFreshnessScore) +
          Math.min(item.decisionLatencyDays * 3, 100) +
          item.bottleneckIntensityScore) /
          6) *
          10
      ) / 10;

    return {
      ...item,
      dragAssessment,
      handoffAssessment,
      ownerAssessment,
      freshnessAssessment,
      latencyAssessment,
      intensityAssessment,
      compositeBottleneckScore
    };
  });

  const criticalLanes = reportItems.filter((item) => item.heatTier === "CRITICAL").length;
  const ownerChokepoints = reportItems.filter((item) => item.ownerAssessment.severity === "HIGH").length;
  const averageIntensity =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.bottleneckIntensityScore, 0) / reportItems.length) * 10) / 10;
  const recoverableValueMillions = reportItems.reduce((sum, item) => sum + item.recoverableValueMillions, 0);

  const leadingMessage =
    criticalLanes >= 2
      ? "Multiple board-visible lanes are now bottlenecked by queue drag, threshold ambiguity, or owner overload."
      : ownerChokepoints >= 2
        ? "Too much decision burden is still concentrated in a few owner lanes."
        : reportItems.length === 0
          ? "No bottlenecks are currently mapped in the estate."
          : "The bottleneck estate is visible, though a few lanes still need cleaner queue design, ownership distribution, or threshold control.";

  return {
    generatedAt,
    summary: {
      lanesMapped: reportItems.length,
      criticalLanes,
      ownerChokepoints,
      averageIntensity,
      recoverableValueMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionBottleneckHeatmapItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
