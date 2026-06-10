# Board Decision Bottleneck Heatmap

Board-ready executive-intelligence surface for exposing board-decision bottlenecks, review drag clusters, owner concentration, and threshold conflicts across the broader Kinetic Gain suite.

- Live: `https://bottlenecks.kineticgain.com/`
- Repo: `mizcausevic-dev/board-decision-bottleneck-heatmap`

## Product depth

Board Decision Bottleneck Heatmap is a board and operating-committee surface for answering a practical execution question: which decisions are stuck because the organization has a queue problem, an owner problem, an evidence problem, or a threshold problem?

It is written for executives, finance partners, transformation leads, product/platform leaders, and investor diligence teams who need to separate normal review discipline from real operating drag. The product does not just list delayed work. It turns delay into a defensible bottleneck narrative: the lane, the accountable owner, the audience that needs the decision, the drag source, the value at stake, and the next intervention.

## What these repos have in common

This repo follows the Kinetic Gain executive-intelligence pattern: a synthetic but realistic dataset, deterministic scoring logic, board-readable HTML routes, API payloads, static deploy output, verification notes, README screenshots, and explicit safe-use boundaries. The common thread across the suite is not "dashboard demos." It is reusable decision infrastructure for explaining where leadership is exposed, where money or time is leaking, where investment should be protected, and what story can be told to a board, buyer, or investor.

## Why this matters

Leaders need one board-readable hotspot surface that shows where review queues, handoff chains, overloaded owners, and threshold ambiguity are actually clustering before another board cycle turns local friction into systemic delay.

## What it includes

- TypeScript executive-intelligence surface for tracking review drag, handoff pressure, owner concentration, evidence freshness, decision latency, and hotspot intensity
- synthetic lanes across multiple sectors, owner groups, and board-visible bottleneck risks
- reusable outputs for bottleneck register, hotspot clusters, owner concentration, drag pressure, and board-ready next-move prompts
- prerendered static site, JSON payloads, screenshots, and docs

## Who uses it

- CEOs and operators use it to see where decisions are actually blocked instead of reading another generic "cross-functional alignment" update.
- CFOs and portfolio leaders use it to connect delay to value at stake, review cost, and execution drag.
- Product, platform, security, compliance, and revenue leaders use it to defend which bottlenecks need owner resets, evidence refreshes, or escalation.
- Investor and diligence teams use it to understand whether the company has an execution system or a collection of heroic one-off fixes.

## Operating questions it answers

- Which board-facing lanes are hot because review drag is growing faster than ownership clarity?
- Which decisions are blocked by one overloaded owner rather than by technical complexity?
- Which lanes need evidence refreshed before the next committee packet?
- Which bottlenecks are worth escalating, which should be standardized, and which need an owner reset?
- Which delays create a credible value-at-stake story instead of vague transformation noise?

## Routes

- `/`
- `/bottleneck-register`
- `/hotspot-clusters`
- `/owner-concentration`
- `/verification`
- `/docs`

## Local run

```bash
cd board-decision-bottleneck-heatmap
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-decision-bottleneck-heatmap fixtures/board-decision-bottleneck-heatmap.json --format summary
npx board-decision-bottleneck-heatmap fixtures/board-decision-bottleneck-heatmap-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Bottleneck register](screenshots/02-bottleneck-register-proof.png)
![Hotspot clusters](screenshots/03-hotspot-clusters-proof.png)
![Owner concentration](screenshots/04-owner-concentration-proof.png)
