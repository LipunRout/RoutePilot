import { useRef } from 'react'

export default function Certificate({ userName, role, completedPhases, totalPhases, onClose }) {
  const certRef = useRef(null)
  const date    = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })

  const downloadCertificate = async () => {
    const cert = certRef.current
    if (!cert) return
  
    try {
      await document.fonts.ready
      await new Promise(resolve => requestAnimationFrame(resolve))
  
      // 1️⃣ Store original background styles
      const elements = cert.querySelectorAll('*')
      const originalBackgrounds = []
  
      elements.forEach((el, index) => {
        originalBackgrounds[index] = el.style.backgroundImage
        el.style.backgroundImage = 'none'
      })
  
      // Also remove background from main container
      const mainBg = cert.style.backgroundImage
      cert.style.backgroundImage = 'none'
  
      const canvas = await window.html2canvas(cert, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#070a08'
      })
  
      // 2️⃣ Restore backgrounds
      elements.forEach((el, index) => {
        el.style.backgroundImage = originalBackgrounds[index]
      })
      cert.style.backgroundImage = mainBg
  
      const link = document.createElement('a')
      link.download = `RoutePilot-Certificate-${(userName || 'Learner').replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
  
    } catch (err) {
      console.error('Certificate download failed:', err)
      alert('Download failed. Please try again.')
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600;1,700&family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600;700&family=Dancing+Script:wght@600;700&family=Inter:wght@300;400;500&display=swap');

        .cert-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(16px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px; overflow-y: auto;
          animation: certFadeIn 0.3s ease forwards;
        }
        @keyframes certFadeIn { from{opacity:0} to{opacity:1} }

        .cert-modal {
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          max-width: 820px; width: 100%;
          animation: certSlideIn 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes certSlideIn {
          from { opacity:0; transform:translateY(24px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        .cert-congrats {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem; color: rgba(255,255,255,0.5); text-align: center;
        }
        .cert-congrats strong { color: #00c97a; }

        /* ══ PAPER ══ */
        .cert-paper {
          width: 100%; aspect-ratio: 1.414 / 1;
          background: #070a08; position: relative; overflow: hidden;
          border-radius: 3px;
          box-shadow: 0 0 0 1px rgba(0,201,122,0.12), 0 40px 120px rgba(0,0,0,0.7);
        }

        .cert-bg-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image: linear-gradient(rgba(0,201,122,0.025) 1px,transparent 1px), linear-gradient(90deg,rgba(0,201,122,0.025) 1px,transparent 1px);
          background-size: 36px 36px;
        }
        .cert-bg-glow {
          position:absolute; width:60%; height:60%; top:20%; left:20%;
          background: radial-gradient(circle, rgba(0,201,122,0.05) 0%, transparent 70%);
          pointer-events:none;
        }
        .cert-line-top    { position:absolute; top:0;    left:0; right:0; height:3px; background:linear-gradient(90deg,transparent 0%,#00c97a 30%,#0ea5e9 70%,transparent 100%); }
        .cert-line-bottom { position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent 0%,#0ea5e9 30%,#00c97a 70%,transparent 100%); }
        .cert-border    { position:absolute; inset:10px; border:1px solid rgba(0,201,122,0.18); pointer-events:none; }
        .cert-border-in { position:absolute; inset:16px; border:1px solid rgba(0,201,122,0.06); pointer-events:none; }

        .cert-corner { position:absolute; width:clamp(44px,7vw,70px); height:clamp(44px,7vw,70px); }
        .cert-corner svg { width:100%; height:100%; }
        .cert-corner.tl { top:10px;    left:10px;  }
        .cert-corner.tr { top:10px;    right:10px; transform:scaleX(-1); }
        .cert-corner.bl { bottom:10px; left:10px;  transform:scaleY(-1); }
        .cert-corner.br { bottom:10px; right:10px; transform:scale(-1); }

        /* content layout */
        .cert-content {
          position:relative; z-index:2; height:100%;
          display:flex; flex-direction:column; align-items:center; justify-content:space-between;
          padding: clamp(24px,5%,44px) clamp(36px,8%,76px);
          text-align:center;
        }

        /* ── TOP ── */
        .cert-top { display:flex; flex-direction:column; align-items:center; gap:3px; }

        .cert-brand-row {
          display:flex; align-items:center; gap:7px; margin-bottom:3px;
        }
        .cert-brand-logo {
          width:clamp(18px,2.5vw,26px); height:clamp(18px,2.5vw,26px);
          background:linear-gradient(135deg,#00c97a,#0ea5e9);
          border-radius:6px; display:flex; align-items:center; justify-content:center;
          font-size:clamp(0.5rem,1vw,0.7rem); font-weight:700; color:#000;
          font-family:'Cinzel',serif;
        }
        .cert-brand-name {
          font-family:'Cinzel',serif; font-size:clamp(0.45rem,0.9vw,0.62rem);
          font-weight:600; letter-spacing:0.18em; color:rgba(255,255,255,0.4); text-transform:uppercase;
        }
        .cert-brand-name span { background:linear-gradient(135deg,#00c97a,#0ea5e9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        .cert-orn-line { display:flex; align-items:center; gap:8px; width:100%; }
        .cert-orn-bar  { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(0,201,122,0.3),transparent); }
        .cert-orn-dot  { width:4px; height:4px; border-radius:50%; background:#00c97a; opacity:0.6; }

        .cert-heading {
          font-family:'Cinzel Decorative',serif; font-size:clamp(0.85rem,2.2vw,1.5rem);
          font-weight:700; color:#fff; letter-spacing:0.05em; line-height:1.1; margin:2px 0;
        }
        .cert-of {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(0.5rem,1vw,0.7rem); color:rgba(255,255,255,0.3);
          letter-spacing:0.25em; text-transform:uppercase;
        }

        /* ── MIDDLE ── */
        .cert-middle {
          display:flex; flex-direction:column; align-items:center;
          gap:0; flex:1; justify-content:center;
        }

        .cert-certifies {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(0.45rem,0.85vw,0.6rem); color:rgba(255,255,255,0.3);
          letter-spacing:0.18em; text-transform:uppercase; margin-bottom:4px;
        }

        /* BIG CURSIVE FULL NAME */
        .cert-name {
          font-family:'Dancing Script',cursive; font-weight:700;
          font-size:clamp(1.8rem,5.5vw,4rem);
          background:linear-gradient(135deg,#ffffff 0%,#a8f0d0 40%,#00c97a 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          line-height:1.05; margin-bottom:6px;
          filter:drop-shadow(0 0 20px rgba(0,201,122,0.2));
        }

        .cert-completed-text {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(0.45rem,0.82vw,0.6rem); color:rgba(255,255,255,0.28);
          letter-spacing:0.12em; margin-bottom:4px;
        }
        .cert-role {
          font-family:'Cinzel',serif; font-size:clamp(0.58rem,1.4vw,0.92rem);
          font-weight:600; color:#00c97a; letter-spacing:0.15em;
          text-transform:uppercase; margin-bottom:8px;
        }

        .cert-phases-strip { display:flex; align-items:center; gap:10px; width:70%; }
        .cert-phases-bar   { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(0,201,122,0.25)); }
        .cert-phases-bar.r { background:linear-gradient(90deg,rgba(0,201,122,0.25),transparent); }
        .cert-phases-badge {
          font-family:'Inter',sans-serif; font-size:clamp(0.38rem,0.7vw,0.5rem);
          font-weight:500; color:rgba(0,201,122,0.6); letter-spacing:0.12em;
          text-transform:uppercase; white-space:nowrap;
          padding:3px 8px; border:1px solid rgba(0,201,122,0.2); border-radius:20px;
        }

        /* ── BOTTOM ── */
        .cert-bottom { width:100%; display:flex; flex-direction:column; align-items:center; gap:6px; }

        .cert-footer-row {
          display:flex; align-items:flex-end; justify-content:space-between; width:100%;
        }

        /* Founder — cursive signature */
        .cert-sig { display:flex; flex-direction:column; align-items:center; gap:2px; min-width:100px; }
        .cert-sig-name {
          font-family:'Dancing Script',cursive; font-size:clamp(0.9rem,2vw,1.4rem);
          font-weight:600; color:rgba(255,255,255,0.7); line-height:1; margin-bottom:2px;
        }
        .cert-sig-line {
          width:90px; height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
          margin-bottom:2px;
        }
        .cert-sig-title {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(0.36rem,0.6vw,0.46rem); color:rgba(255,255,255,0.22);
          letter-spacing:0.1em; text-transform:uppercase;
        }

        /* Center — RoutePilot logo block */
        .cert-logo-block { display:flex; flex-direction:column; align-items:center; gap:4px; }
        .cert-logo-box {
          width:clamp(30px,5vw,46px); height:clamp(30px,5vw,46px);
          background:linear-gradient(135deg,rgba(0,201,122,0.12),rgba(14,165,233,0.12));
          border:1px solid rgba(0,201,122,0.25); border-radius:10px;
          display:flex; align-items:center; justify-content:center;
          font-family:'Cinzel',serif; font-size:clamp(0.55rem,1.1vw,0.8rem);
          font-weight:700; color:#00c97a; position:relative;
        }
        .cert-logo-box::before {
          content:''; position:absolute; inset:-4px; border-radius:13px;
          border:1px solid rgba(0,201,122,0.08);
        }
        .cert-logo-label {
          font-family:'Cinzel',serif; font-size:clamp(0.34rem,0.56vw,0.42rem);
          letter-spacing:0.15em; color:rgba(255,255,255,0.18); text-transform:uppercase;
        }
        .cert-logo-label span { color:rgba(0,201,122,0.45); }

        /* Date */
        .cert-date { display:flex; flex-direction:column; align-items:flex-end; gap:2px; min-width:100px; }
        .cert-date-label {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(0.36rem,0.6vw,0.46rem); color:rgba(255,255,255,0.2);
          letter-spacing:0.1em; text-transform:uppercase;
        }
        .cert-date-val {
          font-family:'Cinzel',serif; font-size:clamp(0.36rem,0.62vw,0.48rem);
          color:rgba(255,255,255,0.28); letter-spacing:0.08em;
        }

        /* ── BUTTONS ── */
        .cert-actions { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
        .cert-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:0 22px; height:44px; border-radius:10px;
          font-family:'Inter',sans-serif; font-size:0.875rem; font-weight:500;
          cursor:pointer; transition:all 0.2s ease; border:none;
        }
        .cert-btn-dl {
          background:linear-gradient(135deg,#00c97a,#0ea5e9);
          color:#000; font-weight:700; box-shadow:0 4px 20px rgba(0,201,122,0.25);
        }
        .cert-btn-dl:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,201,122,0.4); }
        .cert-btn-cl {
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          color:rgba(255,255,255,0.5);
        }
        .cert-btn-cl:hover { background:rgba(255,255,255,0.1); color:#fff; }
      `}</style>

      <div className="cert-overlay" onClick={onClose}>
        <div className="cert-modal" onClick={e => e.stopPropagation()}>

          <p className="cert-congrats">
            🏆 Outstanding! You've completed all <strong>{totalPhases} phases</strong> of your <strong>{role}</strong> roadmap!
          </p>

          {/* ══ CERTIFICATE ══ */}
          <div className="cert-paper" ref={certRef}>
          <div className="cert-bg-grid" data-html2canvas-ignore="true" />
          <div className="cert-bg-glow" data-html2canvas-ignore="true" />
            <div className="cert-line-top" />
            <div className="cert-line-bottom" />
            {/* <div className="cert-border" data-html2canvas-ignore="true" />
            <div className="cert-border-in" data-html2canvas-ignore="true" /> */}

            {['tl','tr','bl','br'].map(pos => (
              <div key={pos} className={`cert-corner ${pos}`}>
                <svg viewBox="0 0 70 70" fill="none">
                  <path d="M3 67 L3 3 L67 3" stroke="#00c97a" strokeWidth="1.5" strokeOpacity="0.5"/>
                  <path d="M3 52 L3 18 L18 3" stroke="#00c97a" strokeWidth="0.75" strokeOpacity="0.25"/>
                  <path d="M3 38 L3 28 L28 3" stroke="#00c97a" strokeWidth="0.4" strokeOpacity="0.15"/>
                  <circle cx="3" cy="3" r="3" fill="#00c97a" fillOpacity="0.7"/>
                  <circle cx="3" cy="3" r="6" stroke="#00c97a" strokeWidth="0.5" strokeOpacity="0.2"/>
                </svg>
              </div>
            ))}

            <div className="cert-content">

              {/* TOP */}
              <div className="cert-top">
                <div className="cert-brand-row">
                  <div className="cert-brand-logo">R</div>
                  <div className="cert-brand-name">Route<span>Pilot</span> · AI Career Navigator</div>
                </div>
                <div className="cert-orn-line">
                  <div className="cert-orn-bar" />
                  <div className="cert-orn-dot" />
                  <div className="cert-orn-bar" style={{ background:'linear-gradient(90deg,rgba(0,201,122,0.3),transparent)' }} />
                </div>
                <div className="cert-heading">Certificate</div>
                <div className="cert-of">of Completion</div>
              </div>

              {/* MIDDLE */}
              <div className="cert-middle">
                <div className="cert-certifies">This certifies that</div>
                <div className="cert-name">{userName}</div>
                <div className="cert-completed-text">has successfully mastered all phases of the</div>
                <div className="cert-role">{role}</div>
                <div className="cert-phases-strip">
                  <div className="cert-phases-bar" />
                  <div className="cert-phases-badge">{totalPhases} phases · 100% complete</div>
                  <div className="cert-phases-bar r" />
                </div>
              </div>

              {/* BOTTOM */}
              <div className="cert-bottom">
                <div className="cert-footer-row">

                  {/* Founder cursive signature */}
                  <div className="cert-sig">
                    <div className="cert-sig-name">Lipun Rout</div>
                    <div className="cert-sig-line" />
                    <div className="cert-sig-title">Founder, RoutePilot</div>
                  </div>

                  {/* RoutePilot logo center */}
                  <div className="cert-logo-block">
                    <div className="cert-logo-box">RP</div>
                    <div className="cert-logo-label">Route<span>Pilot</span></div>
                  </div>

                  {/* Date */}
                  <div className="cert-date">
                    <div className="cert-date-label">Issued on</div>
                    <div className="cert-date-val">{date}</div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <div className="cert-actions">
            <button className="cert-btn cert-btn-dl" onClick={downloadCertificate}>⬇ Download Certificate</button>
            <button className="cert-btn cert-btn-cl" onClick={onClose}>✕ Close</button>
          </div>

        </div>
      </div>
    </>
  )
}