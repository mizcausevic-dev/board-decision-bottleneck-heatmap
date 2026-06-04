# Architecture

Board Decision Bottleneck Heatmap is a static-friendly TypeScript executive-intelligence surface for mapping queue drag, handoff pressure, owner concentration, evidence freshness drift, and threshold ambiguity across the broader Kinetic Gain suite.

## Routes

- `/`
- `/bottleneck-register`
- `/hotspot-clusters`
- `/owner-concentration`
- `/verification`
- `/docs`

## Core Flow

1. `src/data/sampleVerticalBrief.ts`
   - contains the modeled bottleneck estate
2. `src/analyze.ts`
   - converts review drag, handoff pressure, owner concentration, freshness, latency, and intensity into one report
3. `src/services/verticalBriefService.ts`
   - shapes route-specific views for the register, hotspot cluster, owner concentration, and drag-pressure surfaces
4. `src/services/render.ts`
   - renders the static board-facing HTML routes
5. `scripts/prerender.ts`
   - writes the static site, robots, sitemap, and JSON payloads into `dist-static/`
