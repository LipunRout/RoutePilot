import { useEffect, useState } from 'react'

export default function PageLoader({ onDone }) {
  const [phase, setPhase] = useState('logo')   // logo → expand → exit
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Phase 1: count progress bar 0→100 over 1.2s
    const start = performance.now()
    const duration = 1200

    const tick = (now) => {
      const pct = Math.min(((now - start) / duration) * 100, 100)
      setProgress(Math.round(pct))
      if (pct < 100) requestAnimationFrame(tick)
      else {
        // Phase 2: expand panels outward
        setTimeout(() => setPhase('expand'), 100)
        // Phase 3: fully gone, call onDone
        setTimeout(() => setPhase('exit'), 900)
        setTimeout(() => onDone?.(), 1100)
      }
    }
    requestAnimationFrame(tick)
  }, [])

  if (phase === 'exit') return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,700;1,400&family=Inter:wght@300;400;600;700&display=swap');

        /* ── OVERLAY ── */
        .pl {
          position: fixed; inset: 0; z-index: 99999;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; pointer-events: all;
        }

        /* Two panels that slide up/down on expand */
        .pl-panel {
          position: absolute; left: 0; right: 0; height: 50%;
          background: #070a08;
          transition: transform 0.75s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .pl-panel-top {
          top: 0;
          transform: ${phase === 'expand' ? 'translateY(-100%)' : 'translateY(0)'};
        }

        .pl-panel-bot {
          bottom: 0;
          transform: ${phase === 'expand' ? 'translateY(100%)' : 'translateY(0)'};
        }

        /* grid on both panels */
        .pl-panel::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        /* green top line on top panel */
        .pl-panel-top::after {
          content: '';
          position: absolute; bottom: 0; left: 15%; right: 15%; height: 1px;
          background: linear-gradient(90deg, transparent, #00c97a 40%, #0ea5e9 70%, transparent);
        }

        /* ── CENTER CONTENT ── */
        .pl-center {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; gap: 20px;
          opacity: ${phase === 'expand' ? 0 : 1};
          transform: ${phase === 'expand' ? 'scale(0.9)' : 'scale(1)'};
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        /* Logo ring */
        .pl-ring-wrap {
          position: relative; width: 88px; height: 88px;
        }

        .pl-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1.5px solid transparent;
          border-top-color: #00c97a;
          border-right-color: #0ea5e9;
          animation: plSpin 1s linear infinite;
        }

        .pl-ring-2 {
          position: absolute; inset: 10px; border-radius: 50%;
          border: 1px solid transparent;
          border-top-color: rgba(0,201,122,0.3);
          border-left-color: rgba(14,165,233,0.3);
          animation: plSpin 1.8s linear infinite reverse;
        }

        .pl-ring-3 {
          position: absolute; inset: 20px; border-radius: 50%;
          border: 1px dashed rgba(0,201,122,0.12);
          animation: plSpin 4s linear infinite;
        }

        @keyframes plSpin { to { transform: rotate(360deg); } }

        .pl-logo-box {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }

        .pl-logo-icon {
          width: 44px; height: 44px; border-radius: 12px; overflow: hidden;
          box-shadow: 0 0 0 1px rgba(0,201,122,0.25), 0 0 24px rgba(0,201,122,0.15);
          animation: plPulse 2s ease-in-out infinite;
        }

        .pl-logo-icon img { width: 100%; height: 100%; object-fit: cover; }

        @keyframes plPulse {
          0%, 100% { box-shadow: 0 0 0 1px rgba(0,201,122,0.25), 0 0 24px rgba(0,201,122,0.15); }
          50%       { box-shadow: 0 0 0 1px rgba(0,201,122,0.5),  0 0 40px rgba(0,201,122,0.3); }
        }

        /* Name */
        .pl-name {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
        }

        .pl-name-route {
          font-family: 'Inter', sans-serif; font-size: 1.4rem;
          font-weight: 700; color: #f1f5f9; letter-spacing: -0.05em;
          line-height: 1; animation: plFadeUp 0.5s ease 0.2s both;
        }

        .pl-name-pilot {
          font-family: 'Libre Baskerville', serif; font-style: italic;
          font-size: 1rem; font-weight: 400;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; letter-spacing: 0.02em;
          animation: plFadeUp 0.5s ease 0.3s both;
        }

        /* Progress */
        .pl-progress-wrap {
          width: 180px;
          animation: plFadeUp 0.5s ease 0.4s both;
        }

        .pl-progress-track {
          width: 100%; height: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px; overflow: hidden;
          margin-bottom: 8px;
        }

        .pl-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00c97a, #0ea5e9);
          border-radius: 2px;
          transition: width 0.05s linear;
          box-shadow: 0 0 8px rgba(0,201,122,0.5);
        }

        .pl-progress-label {
          font-family: 'Inter', sans-serif; font-size: 0.7rem;
          color: rgba(255,255,255,0.3); text-align: center;
          letter-spacing: 0.05em;
        }

        /* Tagline */
        .pl-tagline {
          font-family: 'Inter', sans-serif; font-size: 0.72rem;
          font-weight: 500; letter-spacing: 0.15em;
          text-transform: uppercase; color: rgba(255,255,255,0.2);
          animation: plFadeUp 0.5s ease 0.5s both;
        }

        /* corner dots */
        .pl-corner {
          position: absolute; width: 5px; height: 5px;
          border-radius: 50%; background: rgba(0,201,122,0.4);
          animation: plCornerPulse 2s ease-in-out infinite;
        }

        .pl-corner-tl { top: 32px; left: 32px; animation-delay: 0s; }
        .pl-corner-tr { top: 32px; right: 32px; animation-delay: 0.5s; }
        .pl-corner-bl { bottom: 32px; left: 32px; animation-delay: 1s; }
        .pl-corner-br { bottom: 32px; right: 32px; animation-delay: 1.5s; }

        @keyframes plCornerPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.8); }
        }

        /* scanning line */
        .pl-scan {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0,201,122,0.4) 50%, transparent 100%);
          animation: plScan 2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes plScan {
          0%   { top: 20%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 80%; opacity: 0; }
        }

        @keyframes plFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="pl">
        {/* Panels */}
        <div className="pl-panel pl-panel-top" />
        <div className="pl-panel pl-panel-bot" />

        {/* Scanning line */}
        <div className="pl-scan" />

        {/* Corner dots */}
        <div className="pl-corner pl-corner-tl" />
        <div className="pl-corner pl-corner-tr" />
        <div className="pl-corner pl-corner-bl" />
        <div className="pl-corner pl-corner-br" />

        {/* Center */}
        <div className="pl-center">
          {/* Ring + Logo */}
          <div className="pl-ring-wrap">
            <div className="pl-ring" />
            <div className="pl-ring-2" />
            <div className="pl-ring-3" />
            <div className="pl-logo-box">
              <div className="pl-logo-icon">
                <img src="/favicon.png" alt="RoutePilot" />
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="pl-name">
            <span className="pl-name-route">RoutePilot</span>
            <span className="pl-name-pilot">AI Career Navigator</span>
          </div>

          {/* Progress */}
          <div className="pl-progress-wrap">
            <div className="pl-progress-track">
              <div className="pl-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="pl-progress-label">{progress}%</div>
          </div>

          {/* Tagline */}
          <div className="pl-tagline">Mapping your future</div>
        </div>
      </div>
    </>
  )
}