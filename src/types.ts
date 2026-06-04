export type BottleneckTrack =
  | "AI_GOVERNANCE"
  | "PROCUREMENT_TRUST"
  | "BIOTECH_DIAGNOSTICS"
  | "FINTECH_CONTROLS"
  | "PLATFORM_ENGINEERING"
  | "NONPROFIT_OPERATIONS";

export type BottleneckKind =
  | "REVIEW_QUEUE"
  | "HANDOFF_CHAIN"
  | "OWNER_CONCENTRATION"
  | "EVIDENCE_GAP"
  | "TOOL_FRAGMENTATION"
  | "THRESHOLD_CONFLICT";

export type HeatTier = "CRITICAL" | "HIGH" | "MODERATE" | "WATCH";

export type BottleneckSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionBottleneckHeatmapItem {
  id: string;
  lane: string;
  track: BottleneckTrack;
  bottleneckKind: BottleneckKind;
  heatTier: HeatTier;
  bottleneckTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  bottleneckNarrative: string;
  operatingReality: string;
  riskHeadline: string;
  blockingIssue: string;
  evidenceArtifacts: string[];
  dependencyMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  reviewDragScore: number;
  handoffPressureScore: number;
  ownerConcentrationScore: number;
  evidenceFreshnessScore: number;
  decisionLatencyDays: number;
  bottleneckIntensityScore: number;
  recoverableValueMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface BottleneckAssessment {
  severity: BottleneckSeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionBottleneckHeatmapReportItem extends BoardDecisionBottleneckHeatmapItem {
  dragAssessment: BottleneckAssessment;
  handoffAssessment: BottleneckAssessment;
  ownerAssessment: BottleneckAssessment;
  freshnessAssessment: BottleneckAssessment;
  latencyAssessment: BottleneckAssessment;
  intensityAssessment: BottleneckAssessment;
  compositeBottleneckScore: number;
}

export interface BoardDecisionBottleneckHeatmapSummary {
  lanesMapped: number;
  criticalLanes: number;
  ownerChokepoints: number;
  averageIntensity: number;
  recoverableValueMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionBottleneckHeatmapExport {
  generatedAt: string;
  summary: BoardDecisionBottleneckHeatmapSummary;
  items: BoardDecisionBottleneckHeatmapReportItem[];
}

export interface BoardDecisionBottleneckHeatmapPayload {
  report: BoardDecisionBottleneckHeatmapExport;
  bottleneckRegister: ReturnType<typeof import("./services/verticalBriefService.js").bottleneckRegister>;
  hotspotClusters: ReturnType<typeof import("./services/verticalBriefService.js").hotspotClusters>;
  ownerConcentration: ReturnType<typeof import("./services/verticalBriefService.js").ownerConcentration>;
  dragPressure: ReturnType<typeof import("./services/verticalBriefService.js").dragPressure>;
  verification: string[];
  sample: BoardDecisionBottleneckHeatmapItem[];
}
