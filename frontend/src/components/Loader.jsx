const Loader = ({ text = 'Loading...' }) => {
  return (
    <>
      <style>{`
        .loader-overlay {
          position: fixed;
          inset: 0;
          background: var(--bg-dark);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          gap: 2rem;
        }

        .loader-logo {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 3px;
        }

        .loader-ring {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .loader-ring::before,
        .loader-ring::after {
          content: '';
          position: absolute;
          border-radius: 50%;
        }

        .loader-ring::before {
          inset: 0;
          border: 3px solid rgba(0, 255, 136, 0.1);
        }

        .loader-ring::after {
          inset: 0;
          border: 3px solid transparent;
          border-top-color: #00ff88;
          border-right-color: #00d4ff;
          animation: spin 1s linear infinite;
        }

        .loader-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .loader-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          animation: dotBounce 1.4s ease-in-out infinite;
        }

        .loader-dot:nth-child(1) { animation-delay: 0s; }
        .loader-dot:nth-child(2) { animation-delay: 0.2s; }
        .loader-dot:nth-child(3) { animation-delay: 0.4s; }

        .loader-text {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.1rem;
          color: var(--text-secondary);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes dotBounce {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>

      <div className="loader-overlay">
        <div className="loader-logo">RoutePilot</div>
        <div className="loader-ring" />
        <div className="loader-dots">
          <div className="loader-dot" />
          <div className="loader-dot" />
          <div className="loader-dot" />
        </div>
        <p className="loader-text">{text}</p>
      </div>
    </>
  )
}

export default Loader