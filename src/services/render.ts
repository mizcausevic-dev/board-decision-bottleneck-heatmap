import { bottleneckRegister, dragPressure, hotspotClusters, ownerConcentration, payload, summary, verification } from "./verticalBriefService.js";

const productTitle = "Board Decision Bottleneck Heatmap";
const domain = "https://bottlenecks.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root { color-scheme: dark; --bg:#07111d; --panel:#0d1a2b; --panel-2:#102032; --border:rgba(103,224,190,.22); --text:#edf2ff; --muted:#9fb0cf; --accent:#67e0be; --accent-2:#7dc4ff; }
      * { box-sizing:border-box; }
      body { margin:0; font-family:"Segoe UI",system-ui,sans-serif; background:radial-gradient(circle at top left, rgba(125,196,255,.12), transparent 30%), linear-gradient(180deg,#050c16 0%,var(--bg) 100%); color:var(--text); }
      a { color:var(--accent-2); text-decoration:none; }
      .wrap { max-width:1180px; margin:0 auto; padding:32px 24px 64px; }
      .hero,.section { background:linear-gradient(180deg, rgba(14,28,45,.95), rgba(10,19,33,.98)); border:1px solid var(--border); border-radius:28px; padding:28px; box-shadow:0 18px 60px rgba(2,7,16,.35); }
      .hero { margin-bottom:24px; }
      .eyebrow { display:inline-block; padding:10px 16px; border-radius:999px; border:1px solid var(--border); background:rgba(103,224,190,.08); color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.28em; }
      h1,h2 { margin:18px 0 12px; font-family:Georgia,serif; line-height:.95; }
      h1 { font-size:clamp(54px,8vw,90px); max-width:980px; }
      h2 { font-size:clamp(36px,4vw,54px); }
      .lede { color:var(--muted); font-size:20px; line-height:1.6; max-width:920px; }
      .nav { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
      .nav a { padding:10px 14px; border:1px solid rgba(125,196,255,.18); border-radius:999px; color:var(--muted); }
      .nav a.active { color:var(--text); border-color:var(--accent); background:rgba(103,224,190,.08); }
      .metrics,.grid { display:grid; gap:18px; }
      .metrics { grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); margin-top:26px; }
      .metric,.card,.table-wrap,.aside { background:rgba(16,32,50,.76); border:1px solid rgba(125,196,255,.12); border-radius:22px; padding:18px; }
      .hero-grid { display:grid; grid-template-columns:minmax(0,1.45fr) minmax(320px,.95fr); gap:22px; align-items:start; }
      .metric-label,.chip { color:var(--accent); text-transform:uppercase; letter-spacing:.18em; font-size:12px; }
      .metric-value { display:block; font-size:40px; font-weight:700; margin-top:10px; }
      .metric-copy { margin-top:10px; color:var(--muted); line-height:1.5; }
      .section { margin-top:24px; }
      .grid { grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); }
      .card h3,.aside h3 { margin:12px 0 10px; font-size:30px; line-height:1.05; }
      .card p,.aside p, li { color:var(--muted); line-height:1.6; }
      .table-wrap { overflow-x:auto; }
      table { width:100%; border-collapse:collapse; }
      th,td { text-align:left; padding:12px; border-bottom:1px solid rgba(125,196,255,.12); vertical-align:top; }
      th { color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.18em; }
      ul { padding-left:20px; }
      pre { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); background:rgba(7,17,29,.75); border:1px solid rgba(125,196,255,.12); border-radius:18px; padding:18px; }
      .footer { margin-top:24px; color:var(--muted); font-size:14px; display:flex; gap:18px; flex-wrap:wrap; }
      @media (max-width: 960px) { .hero-grid { grid-template-columns:1fr; } }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/bottleneck-register", "Bottleneck register"],
    ["/hotspot-clusters", "Hotspot clusters"],
    ["/owner-concentration", "Owner concentration"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderBottleneckOverview() {
  const executiveSummary = summary();
  const lanes = bottleneckRegister().slice(0, 4);
  const findings = dragPressure().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.heatTier)}</div>
        <h3>${escapeHtml(item.lane)}</h3>
        <p><strong>Kind:</strong> ${escapeHtml(item.bottleneckKind)}</p>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Theme:</strong> ${escapeHtml(item.bottleneckTheme)}</p>
        <p><strong>Intensity:</strong> ${item.bottleneckIntensityScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · composite ${item.compositeBottleneckScore} · review ${item.reviewDragScore} · handoff ${item.handoffPressureScore} · owner ${item.ownerConcentrationScore}</li>`
    )
    .join("");

  return shell(
    productTitle,
    `<section class="hero">
      <span class="eyebrow">Bottleneck heatmap</span>
      <div class="hero-grid">
        <div>
          <h1>Which lanes are really bottlenecked by queue drag, handoff churn, owner concentration, or stale decision evidence?</h1>
          <p class="lede">Board Decision Bottleneck Heatmap turns review drag, handoff pressure, owner overload, freshness drift, and latency into one reusable board-facing hotspot surface.</p>
          <div class="nav">${navLinks("/")}</div>
        </div>
        <aside class="aside">
          <div class="chip">Board takeaway</div>
          <h3>Fix the choke points, not just the symptoms.</h3>
          <p>${escapeHtml(executiveSummary.boardMessage)}</p>
          <p><strong>Lead:</strong> ${escapeHtml(executiveSummary.leadingMessage)}</p>
        </aside>
      </div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Lanes mapped</span><span class="metric-value">${executiveSummary.lanesMapped}</span><div class="metric-copy">Modeled decision lanes inside the current board-facing hotspot estate.</div></div>
        <div class="metric"><span class="metric-label">Critical lanes</span><span class="metric-value">${executiveSummary.criticalLanes}</span><div class="metric-copy">Lanes where bottleneck heat is already high enough to justify immediate action.</div></div>
        <div class="metric"><span class="metric-label">Owner chokepoints</span><span class="metric-value">${executiveSummary.ownerChokepoints}</span><div class="metric-copy">Lanes where one owner is carrying too much final decision burden.</div></div>
        <div class="metric"><span class="metric-label">Recoverable value</span><span class="metric-value">$${executiveSummary.recoverableValueMillions}M</span><div class="metric-copy">Modeled value still trapped behind review drag, handoff churn, and threshold confusion.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Bottleneck register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible drag pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready hotspot map for exposing review drag, handoff pressure, owner concentration, and threshold bottlenecks."
  );
}

export function renderBottleneckRegister() {
  const rows = bottleneckRegister()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.heatTier)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.bottleneckKind)}</td><td>${escapeHtml(item.bottleneckTheme)}</td><td>${item.bottleneckIntensityScore}</td></tr>`
    )
    .join("");

  return shell(
    "Bottleneck register",
    `<section class="hero"><span class="eyebrow">Bottleneck register</span><h1>Each lane keeps one heat tier, one owner, one audience, and one next move tied to the same bottleneck.</h1><p class="lede">The register keeps each hotspot visible before it turns into another generic board update about “complexity.”</p><div class="nav">${navLinks("/bottleneck-register")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Heat</th><th>Owner</th><th>Audience</th><th>Kind</th><th>Theme</th><th>Intensity</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Register view showing which board-decision lanes are hottest and why."
  );
}

export function renderHotspotClusters() {
  const rows = hotspotClusters()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.heatTier)}</td><td>${escapeHtml(item.bottleneckTheme)}</td><td>${escapeHtml(item.riskHeadline)}</td><td>${escapeHtml(item.blockingIssue)}</td><td>${item.reviewDragScore}</td><td>${item.handoffPressureScore}</td><td>${item.decisionLatencyDays}</td><td>${item.bottleneckIntensityScore}</td></tr>`
    )
    .join("");

  return shell(
    "Hotspot clusters",
    `<section class="hero"><span class="eyebrow">Hotspot clusters</span><h1>The hottest delay clusters stay visible: queue drag, handoff churn, latency, and threshold conflict.</h1><p class="lede">This route keeps the actual cluster visible so leadership can intervene in the right operating failure instead of treating all delays the same.</p><div class="nav">${navLinks("/hotspot-clusters")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Heat</th><th>Theme</th><th>Risk headline</th><th>Blocking issue</th><th>Review</th><th>Handoff</th><th>Latency days</th><th>Intensity</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Hotspot-cluster view showing where board-visible delay pressure is actually concentrating."
  );
}

export function renderOwnerConcentration() {
  const rows = ownerConcentration()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${item.ownerConcentrationScore}</td><td>${item.reviewDragScore}</td><td>${item.handoffPressureScore}</td><td>${escapeHtml(item.nextMove)}</td></tr>`
    )
    .join("");

  return shell(
    "Owner concentration",
    `<section class="hero"><span class="eyebrow">Owner concentration</span><h1>Decision load stays tied to the owners carrying too much final board-facing responsibility.</h1><p class="lede">This route shows where one lane or person is acting as the choke point and where ownership needs to be redistributed before throughput deteriorates further.</p><div class="nav">${navLinks("/owner-concentration")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Owner</th><th>Audience</th><th>Owner concentration</th><th>Review drag</th><th>Handoff pressure</th><th>Next move</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Owner-concentration view for exposing single-owner choke points in the decision estate."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    `<section class="hero"><span class="eyebrow">Verification</span><h1>How this bottleneck heatmap is modeled and what it is safe to infer from it.</h1><p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone treats the sample like live fiduciary or legal guidance.</p><div class="nav">${navLinks("/verification")}</div></section><section class="section"><ul>${notes}</ul><pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre></section>`,
    "Verification notes for the Board Decision Bottleneck Heatmap sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    `<section class="hero"><span class="eyebrow">Docs</span><h1>Board Decision Bottleneck Heatmap docs</h1><p class="lede">This surface packages queue drag, handoff pressure, owner concentration, freshness drift, and decision latency into reproducible routes and JSON outputs for board and investor reviews.</p><div class="nav">${navLinks("/docs")}</div></section><section class="section"><ul><li><code>/bottleneck-register</code> keeps heat tiers, owners, audiences, and next moves tied to one hotspot lane.</li><li><code>/hotspot-clusters</code> compares queue drag, handoff pressure, latency, and intensity across lanes.</li><li><code>/owner-concentration</code> isolates the choke points where one owner carries too much final decision weight.</li><li><code>/api/payload</code> exposes the reproducible bottleneck packet.</li></ul></section>`,
    "Product documentation for Board Decision Bottleneck Heatmap and its board-facing hotspot routes."
  );
}
