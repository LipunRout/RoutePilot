import { useNavigate } from 'react-router-dom'

const RoadmapCard = ({ title, role, category, phases, timeline, createdAt }) => {
  const navigate = useNavigate()

  const categoryColors = {
    IT: { color: '#00ff88', bg: 'rgba(0,255,136,0.08)' },
    'Non-IT': { color: '#00d4ff', bg: 'rgba(0,212,255,0.08)' },
    Government: { color: '#ffd700', bg: 'rgba(255,215,0,0.08)' },
    Business: { color: '#ff8c42', bg: 'rgba(255,140,66,0.08)' },
  }

  const colors = categoryColors[category] || categoryColors['IT']

  return (
    <>
      <style>{`
        .roadmap-card {
          background: rgba(0, 255, 136, 0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 255, 136, 0.12);
          border-radius: 20px;
          padding: 1.8rem;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .roadmap-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00ff88, #00d4ff);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .roadmap-card:hover {
          border-color: rgba(0, 255, 136, 0.3);
          transform: translateY(-6px);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(0, 255, 136, 0.08);
        }

        .roadmap-card:hover::before {
          opacity: 1;
        }

        /* Card Top */
        .rcard-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.2rem;
          gap: 1rem;
        }

        .rcard-category-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 50px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .rcard-date {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Title */
        .rcard-title {
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
          letter-spacing: 0.5px;
          line-height: 1.4;
        }

        .rcard-role {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.2rem;
        }

        /* Stats Row */
        .rcard-stats {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.4rem;
          flex-wrap: wrap;
        }

        .rcard-stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .rcard-stat-value {
          font-family: 'Orbitron', monospace;
          font-size: 1.1rem;
          font-weight: 700;
          color: #00ff88;
        }

        .rcard-stat-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Divider */
        .rcard-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(0,255,136,0.15), transparent);
          margin-bottom: 1.2rem;
        }

        /* Action Row */
        .rcard-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .rcard-phases {
          display: flex;
          gap: 0.4rem;
        }

        .rcard-phase-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(0, 255, 136, 0.2);
          border: 1px solid rgba(0, 255, 136, 0.3);
          transition: all 0.3s ease;
        }

        .rcard-phase-dot.active {
          background: #00ff88;
          border-color: #00ff88;
          box-shadow: 0 0 6px rgba(0, 255, 136, 0.5);
        }

        .rcard-view-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #00ff88;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .rcard-view-btn .arrow {
          transition: transform 0.3s ease;
        }

        .roadmap-card:hover .rcard-view-btn .arrow {
          transform: translateX(4px);
        }
      `}</style>

      <div className="roadmap-card" onClick={() => navigate('/roadmap')}>

        {/* Top Row */}
        <div className="rcard-top">
          <span
            className="rcard-category-badge"
            style={{ color: colors.color, background: colors.bg, border: `1px solid ${colors.color}33` }}
          >
            {category}
          </span>
          <span className="rcard-date">
            {createdAt ? new Date(createdAt).toLocaleDateString() : 'Today'}
          </span>
        </div>

        {/* Title */}
        <h3 className="rcard-title">{title || `${role} Roadmap`}</h3>
        <p className="rcard-role">🎯 {role}</p>

        {/* Stats */}
        <div className="rcard-stats">
          <div className="rcard-stat">
            <span className="rcard-stat-value">{phases || 0}</span>
            <span className="rcard-stat-label">Phases</span>
          </div>
          <div className="rcard-stat">
            <span className="rcard-stat-value">{timeline || 'N/A'}</span>
            <span className="rcard-stat-label">Timeline</span>
          </div>
        </div>

        <div className="rcard-divider" />

        {/* Bottom Row */}
        <div className="rcard-action">
          <div className="rcard-phases">
            {Array.from({ length: phases || 4 }).map((_, i) => (
              <div key={i} className={`rcard-phase-dot ${i === 0 ? 'active' : ''}`} />
            ))}
          </div>
          <div className="rcard-view-btn">
            View Roadmap <span className="arrow">→</span>
          </div>
        </div>

      </div>
    </>
  )
}

export default RoadmapCard