const puppeteer = require('puppeteer-core')
const chromium = require('@sparticuz/chromium')

const generateRoadmapPDF = async (roadmap, userName) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  })

  const page = await browser.newPage()

  await page.setContent(
    buildPDFHTML(roadmap, userName),
    { waitUntil: 'domcontentloaded', timeout: 0 }
  )

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '20mm', left: '16mm', right: '16mm' },
  })

  await browser.close()
  return pdf
}

const buildPDFHTML = (roadmap, userName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;1,600&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Inter',sans-serif; background:#0a0f14; color:#e2e8f0; font-size:13px; line-height:1.6; }

    .header { background:linear-gradient(135deg,#0d1520,#0a0f14); border-bottom:1px solid #1e2a36; padding:32px 40px; position:relative; }
    .header::after { content:''; position:absolute; top:-1px; left:15%; right:15%; height:1px; background:linear-gradient(90deg,transparent,#00c97a,transparent); }
    .brand { font-size:11px; font-weight:700; color:#64748b; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:10px; }
    .brand span { color:#00c97a; }
    .title-1 { font-family:'Inter',sans-serif; font-size:24px; font-weight:700; color:#f1f5f9; letter-spacing:-0.05em; display:block; line-height:1.1; }
    .title-2 { font-family:'Cormorant Garamond',serif; font-size:30px; font-weight:600; font-style:italic; color:#00c97a; display:block; line-height:1.1; margin-bottom:14px; }
    .meta { display:flex; gap:12px; flex-wrap:wrap; }
    .pill { font-size:10px; font-weight:500; color:#94a3b8; padding:3px 10px; border:1px solid #1e2a36; border-radius:20px; background:#0d1520; }

    .overview { padding:20px 40px; background:#0d1520; border-bottom:1px solid #1e2a36; font-size:12px; color:#94a3b8; line-height:1.7; }

    .phases { padding:20px 40px; }

    .phase { margin-bottom:20px; background:#0d1520; border:1px solid #1e2a36; border-radius:10px; overflow:hidden; }
    .ph { display:flex; align-items:center; gap:12px; padding:14px 18px; border-bottom:1px solid #1e2a36; }
    .pnum { width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; flex-shrink:0; }
    .ptitle { font-size:13px; font-weight:700; color:#f1f5f9; letter-spacing:-0.03em; }
    .psub { font-family:'Cormorant Garamond',serif; font-size:12px; font-style:italic; color:#64748b; margin-top:1px; }
    .pdur { margin-left:auto; font-size:10px; color:#64748b; padding:2px 8px; border:1px solid #1e2a36; border-radius:20px; white-space:nowrap; }

    .pbody { padding:14px 18px; }
    .slabel { font-size:8px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#475569; margin-bottom:7px; }
    .topics { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:12px; }
    .topic { font-size:9px; font-weight:500; padding:2px 8px; border-radius:20px; border:1px solid; }
    .outcome { padding:9px 13px; border-radius:7px; border:1px solid #00c97a33; background:#00c97a11; font-size:11px; color:#00c97a; margin-bottom:12px; }
    .resources { display:grid; grid-template-columns:1fr 1fr; gap:5px; margin-bottom:10px; }
    .res { display:flex; align-items:center; gap:7px; padding:6px 9px; background:#0a0f14; border:1px solid #1e2a36; border-radius:6px; }
    .rtype { width:18px; height:18px; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:700; flex-shrink:0; }
    .art { background:#0ea5e922; border:1px solid #0ea5e944; color:#0ea5e9; }
    .vid { background:#ef444422; border:1px solid #ef444444; color:#ef4444; }
    .rlabel { font-size:9px; color:#94a3b8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .project { padding:9px 13px; background:#0a0f14; border:1px solid #1e2a36; border-radius:7px; border-left:3px solid #00c97a; }
    .plabel { font-size:8px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#00c97a; margin-bottom:2px; }
    .ptext { font-size:10px; font-weight:500; color:#e2e8f0; }

    .footer { text-align:center; padding:18px 40px; border-top:1px solid #1e2a36; font-size:10px; color:#475569; }
    .footer span { color:#00c97a; }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">Route<span>Pilot</span> · AI Career Navigator</div>
    <span class="title-1">Personalized roadmap for</span>
    <span class="title-2">${roadmap.role}</span>
    <div class="meta">
      <span class="pill">📅 ${roadmap.timeline}</span>
      <span class="pill">◎ ${roadmap.totalPhases} phases</span>
      <span class="pill">👤 ${userName}</span>
      <span class="pill">✦ Generated by RoutePilote</span>
    </div>
  </div>

  <div class="overview">${roadmap.overview}</div>

  <div class="phases">
    ${roadmap.phases.map((phase, i) => {
      const colors = ['#00c97a','#0ea5e9','#a855f7','#f59e0b','#ef4444']
      const c = colors[i % colors.length]
      return `
        <div class="phase">
          <div class="ph">
            <div class="pnum" style="background:${c}22;border:1px solid ${c}44;color:${c}">0${phase.id}</div>
            <div>
              <div class="ptitle">${phase.title}</div>
              <div class="psub">${phase.subtitle}</div>
            </div>
            <div class="pdur">⏱ ${phase.duration}</div>
          </div>
          <div class="pbody">
            <div class="slabel">Topics</div>
            <div class="topics">
              ${phase.topics.map(t => `<span class="topic" style="color:${c};border-color:${c}44;background:${c}11">${t}</span>`).join('')}
            </div>
            <div class="outcome">🎯 <strong>Outcome:</strong> ${phase.outcome}</div>
            <div class="slabel">Resources</div>
            <div class="resources">
              ${phase.resources.map(r => `
                <div class="res">
                  <div class="rtype ${r.type === 'video' ? 'vid' : 'art'}">${r.type === 'video' ? '▶' : '📄'}</div>
                  <span class="rlabel">${r.label}</span>
                </div>
              `).join('')}
            </div>
            <div class="project">
              <div class="plabel">Phase project</div>
              <div class="ptext">🏗️ ${phase.project}</div>
            </div>
          </div>
        </div>
      `
    }).join('')}
  </div>

  <div class="footer">Generated by <span>RoutePilot</span> · AI-powered career navigation · Keep this and refer to it daily.</div>
</body>
</html>
`

module.exports = { generateRoadmapPDF }