import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sampleBoardDecisionBottleneckHeatmap } from "../src/data/sampleVerticalBrief.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, "..", "fixtures");

mkdirSync(fixturesDir, { recursive: true });

writeFileSync(
  path.join(fixturesDir, "board-decision-bottleneck-heatmap.json"),
  JSON.stringify(sampleBoardDecisionBottleneckHeatmap, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "board-decision-bottleneck-heatmap-clean.json"),
  JSON.stringify(
    sampleBoardDecisionBottleneckHeatmap.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
