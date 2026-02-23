import { useState } from 'react'

const PhaseCard = ({ phase, index }) => {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <>
      <style>{`
        .phase-card {
          background: rgba(0, 255, 136, 0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 255, 136, 0.15);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
          margin-bottom: 1.2rem;
        }

        .phase-card:hover {
          border-color: rgba(0, 255, 136, 0.35);
          box-shadow: 0 0 30px rgba(0, 255, 136, 0.08);
        }

        .phase-card.expanded {
          border-color: rgba(0, 255, 136, 0.4);
          box-shadow: 0 0 40px rgba(0, 255, 136, 0.12);
        }

        /* Phase Header */
        .phase-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          cursor: pointer;
          transition: background 0.3s ease;
          gap: 1rem;
        }

        .phase-header:hover {
          background: rgba(0, 255, 136, 0.04);
        }

        .phase-header-left {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex: 1;
        }

        /* Phase Number Badge */
        .phase-badge {
          min-width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,212,255,0.15));
          border: 1px solid rgba(0, 255, 136, 0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .phase-card.expanded .phase-badge {
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          border-color: transparent;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
        }

        .phase-badge-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #00ff88;
          line-height: 1;
        }

        .phase-card.expanded .phase-badge-label {
          color: #000;
        }

        .phase-badge-num {
          font-family: 'Orbitron', monospace;
          font-size: 1.1rem;
          font-weight: 900;
          color: #00ff88;
          line-height: 1;
        }

        .phase-card.expanded .phase-badge-num {
          color: #000;
        }

        /* Phase Info */
        .phase-title {
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.3rem;
          letter-spacing: 1px;
        }

        .phase-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .phase-duration {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #00d4ff;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .phase-topic-count {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Chevron */
        .phase-chevron {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(0, 255, 136, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          color: #00ff88;
          font-size: 0.7rem;
          flex-shrink: 0;
        }

        .phase-card.expanded .phase-chevron {
          transform: rotate(180deg);
          background: rgba(0, 255, 136, 0.1);
          border-color: rgba(0, 255, 136, 0.4);
        }

        /* Phase Body */
        .phase-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .phase-body.open {
          max-height: 1000px;
        }

        .phase-body-inner {
          padding: 0 2rem 2rem;
        }

        /* Divider */
        .phase-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(0,255,136,0.2), rgba(0,212,255,0.2), transparent);
          margin-bottom: 1.5rem;
        }

        /* Topics Grid */
        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .topic-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.8rem 1rem;
          background: rgba(0, 255, 136, 0.04);
          border: 1px solid rgba(0, 255, 136, 0.1);
          border-radius: 10px;
          transition: all 0.3s ease;
          cursor: default;
        }

        .topic-item:hover {
          background: rgba(0, 255, 136, 0.08);
          border-color: rgba(0, 255, 136, 0.25);
          transform: translateX(4px);
        }

        .topic-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(0, 255, 136, 0.4);
        }

        .topic-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.3px;
        }

        /* Resources Section */
        .phase-resources {
          margin-top: 1rem;
        }

        .resources-title {
          font-family: 'Orbitron', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.8rem;
        }

        .resource-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .resource-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 6px 14px;
          border-radius: 50px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .resource-link.article {
          background: rgba(0, 212, 255, 0.08);
          border: 1px solid rgba(0, 212, 255, 0.25);
          color: #00d4ff;
        }

        .resource-link.article:hover {
          background: rgba(0, 212, 255, 0.15);
          border-color: #00d4ff;
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.3);
          transform: translateY(-2px);
        }

        .resource-link.youtube {
          background: rgba(255, 68, 68, 0.08);
          border: 1px solid rgba(255, 68, 68, 0.25);
          color: #ff6b6b;
        }

        .resource-link.youtube:hover {
          background: rgba(255, 68, 68, 0.15);
          border-color: #ff6b6b;
          box-shadow: 0 0 12px rgba(255, 68, 68, 0.3);
          transform: translateY(-2px);
        }

        /* Progress bar */
        .phase-progress {
          margin-top: 1.2rem;
        }

        .phase-progress-label {
          display: flex;
          justify-content: space-between;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .phase-progress-track {
          height: 4px;
          background: rgba(0, 255, 136, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .phase-progress-fill {
          height: 100%;
          border-radius: 10px;
          background: linear-gradient(90deg, #00ff88, #00d4ff);
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.4);
          width: 0%;
          transition: width 1s ease 0.3s;
        }

        .phase-card.expanded .phase-progress-fill {
          width: var(--progress, 0%);
        }

        @media (max-width: 600px) {
          .phase-header {
            padding: 1.2rem 1.2rem;
          }

          .phase-body-inner {
            padding: 0 1.2rem 1.5rem;
          }

          .topics-grid {
            grid-template-columns: 1fr 1fr;
          }

          .phase-title {
            font-size: 0.85rem;
          }
        }
      `}</style>

      <div className={`phase-card ${expanded ? 'expanded' : ''}`}>

        {/* Header */}
        <div
          className="phase-header"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="phase-header-left">
            {/* Badge */}
            <div className="phase-badge">
              <span className="phase-badge-label">Phase</span>
              <span className="phase-badge-num">{String(index + 1).padStart(2, '0')}</span>
            </div>

            {/* Info */}
            <div>
              <h3 className="phase-title">{phase.title}</h3>
              <div className="phase-meta">
                <span className="phase-duration">
                  ⏱ {phase.duration}
                </span>
                <span className="phase-topic-count">
                  {phase.topics?.length || 0} topics
                </span>
              </div>
            </div>
          </div>

          {/* Chevron */}
          <div className="phase-chevron">▼</div>
        </div>

        {/* Body */}
        <div className={`phase-body ${expanded ? 'open' : ''}`}>
          <div className="phase-body-inner">
            <div className="phase-divider" />

            {/* Topics */}
            <div className="topics-grid">
              {phase.topics?.map((topic, i) => (
                <div className="topic-item" key={i}>
                  <div className="topic-dot" />
                  <span className="topic-name">{topic}</span>
                </div>
              ))}
            </div>

            {/* Resources */}
            {(phase.articles?.length > 0 || phase.youtube?.length > 0) && (
              <div className="phase-resources">
                <p className="resources-title">📚 Resources</p>
                <div className="resource-links">
                  {phase.articles?.map((link, i) => (
                    
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link article"
                    >
                      📄 {link.title || `Article ${i + 1}`}
                    </a>
                  ))}
                  {phase.youtube?.map((link, i) => (
                    
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link youtube"
                    >
                      ▶ {link.title || `Video ${i + 1}`}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="phase-progress">
              <div className="phase-progress-label">
                <span>Completion</span>
                <span>{phase.completion || 0}%</span>
              </div>
              <div className="phase-progress-track">
                <div
                  className="phase-progress-fill"
                  style={{ '--progress': `${phase.completion || 0}%` }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default PhaseCard