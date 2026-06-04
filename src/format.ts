import type { BoardDecisionBottleneckHeatmapSummary } from "./types.js";

export function formatSummary(
  summary: BoardDecisionBottleneckHeatmapSummary,
  title = "Board Decision Bottleneck Heatmap"
) {
  return [
    title,
    `Lanes mapped: ${summary.lanesMapped}`,
    `Critical lanes: ${summary.criticalLanes}`,
    `Owner chokepoints: ${summary.ownerChokepoints}`,
    `Average intensity: ${summary.averageIntensity}`,
    `Recoverable value: $${summary.recoverableValueMillions}M`,
    `Lead: ${summary.leadingMessage}`
  ].join("\n");
}
