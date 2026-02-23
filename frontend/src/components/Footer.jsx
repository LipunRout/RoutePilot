import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <style>{`
        .footer {
          position: relative;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(0, 255, 136, 0.15);
          padding: 4rem 2rem 2rem;
          margin-top: auto;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            #00ff88, 
            #00d4ff, 
            #00ff88, 
            transparent
          );
        }

        .footer-glow {
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 200px;
          background: radial-gradient(ellipse, rgba(0,255,136,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        /* Brand Column */
        .footer-brand-logo {
          font-family: 'Orbitron', monospace;
          font-size: 1.6rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          display: block;
          text-decoration: none;
        }

        .footer-brand-tagline {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
        }

        .footer-brand-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        /* Social Icons */
        .footer-socials {
          display: flex;
          gap: 0.8rem;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(0, 255, 136, 0.2);
          background: rgba(0, 255, 136, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          color: var(--text-secondary);
        }

        .social-icon:hover {
          border-color: #00ff88;
          background: rgba(0, 255, 136, 0.15);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
          transform: translateY(-3px);
          color: #00ff88;
        }

        /* Footer Columns */
        .footer-col-title {
          font-family: 'Orbitron', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          color: #00ff88;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.8rem;
        }

        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #00ff88, #00d4ff);
          border-radius: 2px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .footer-link {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-link::before {
          content: '▸';
          color: #00ff88;
          font-size: 0.7rem;
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: #00ff88;
          transform: translateX(5px);
        }

        .footer-link:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        /* Newsletter */
        .footer-newsletter {
          margin-top: 0.5rem;
        }

        .newsletter-input-wrap {
          display: flex;
          gap: 0;
          margin-top: 1rem;
          border-radius: 50px;
          overflow: hidden;
          border: 1px solid rgba(0, 255, 136, 0.3);
          background: rgba(0, 255, 136, 0.05);
          transition: all 0.3s ease;
        }

        .newsletter-input-wrap:focus-within {
          border-color: #00ff88;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
        }

        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 12px 18px;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: var(--text-primary);
          outline: none;
          min-width: 0;
        }

        .newsletter-input::placeholder {
          color: var(--text-muted);
        }

        .newsletter-btn {
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          border: none;
          padding: 12px 20px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #000;
          cursor: pointer;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(0,255,136,0.2), 
            rgba(0,212,255,0.2),
            transparent
          );
          margin-bottom: 2rem;
        }

        /* Bottom Bar */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-copy {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .footer-copy span {
          color: #00ff88;
          font-weight: 700;
        }

        .footer-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 1px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00ff88;
          animation: pulse-glow 2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.6);
        }

        .footer-bottom-links {
          display: flex;
          gap: 1.5rem;
        }

        .footer-bottom-link {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.85rem;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
        }

        .footer-bottom-link:hover {
          color: #00ff88;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .footer-bottom-links {
            gap: 1rem;
          }

          .footer {
            padding: 3rem 1.5rem 1.5rem;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-glow" />

        <div className="footer-inner">
          <div className="footer-grid">

            {/* Brand Column */}
            <div>
              <Link to="/" className="footer-brand-logo">RoutePilot</Link>
              <p className="footer-brand-tagline">AI Career Navigator</p>
              <p className="footer-brand-desc">
                RoutePilot helps students and professionals discover their
                career path with AI-powered roadmaps, curated resources,
                and personalized guidance.
              </p>
              <div className="footer-socials">
                <a href="#" className="social-icon" title="Twitter">𝕏</a>
                <a href="#" className="social-icon" title="LinkedIn">in</a>
                <a href="#" className="social-icon" title="GitHub">⌥</a>
                <a href="#" className="social-icon" title="Instagram">◎</a>
                <a href="#" className="social-icon" title="YouTube">▶</a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-col-title">Navigate</h4>
              <ul className="footer-links">
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/category" className="footer-link">Explore Careers</Link></li>
                <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
                <li><Link to="/register" className="footer-link">Get Started</Link></li>
                <li><Link to="/login" className="footer-link">Login</Link></li>
              </ul>
            </div>

            {/* Career Paths */}
            <div>
              <h4 className="footer-col-title">Careers</h4>
              <ul className="footer-links">
                <li><Link to="/category" className="footer-link">IT & Tech</Link></li>
                <li><Link to="/category" className="footer-link">Non-IT</Link></li>
                <li><Link to="/category" className="footer-link">Government</Link></li>
                <li><Link to="/category" className="footer-link">Business</Link></li>
                <li><Link to="/category" className="footer-link">Freelancing</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="footer-col-title">Stay Updated</h4>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: '0.5rem'
              }}>
                Get career tips, roadmap updates and exclusive resources directly to your inbox.
              </p>
              <div className="footer-newsletter">
                <div className="newsletter-input-wrap">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="newsletter-input"
                  />
                  <button className="newsletter-btn">GO →</button>
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="footer-divider" />

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © {currentYear} <span>RoutePilot</span>. All rights reserved.
              Built with 💚 for future leaders.
            </p>

            <div className="footer-badge">
              <div className="badge-dot" />
              All systems operational
            </div>

            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Use</a>
              <a href="#" className="footer-bottom-link">Contact</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer