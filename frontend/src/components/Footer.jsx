import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ── FOOTER ── */
        .ft {
          background: var(--bg-1, #0a0f0c);
          border-top: 1px solid var(--border, rgba(255,255,255,0.07));
          position: relative;
          overflow: hidden;
        }

        /* top accent line */
        .ft::before {
          content: '';
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, #00c97a 40%, #0ea5e9 70%, transparent);
        }

        /* subtle grid bg */
        .ft-grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 100% 60% at 50% 100%, black 20%, transparent 80%);
        }

        .ft-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 64px 24px 32px;
          position: relative; z-index: 1;
        }

        /* ── TOP GRID ── */
        .ft-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.6fr;
          gap: 48px;
          margin-bottom: 52px;
        }

        /* Brand col */
        .ft-brand-col {}

        .ft-logo {
          display: inline-flex; align-items: center; gap: 9px;
          text-decoration: none; margin-bottom: 14px;
        }

        .ft-logo-icon {
          width: 34px; height: 34px; border-radius: 9px; overflow: hidden;
          box-shadow: 0 0 0 1px rgba(0,201,122,0.3);
        }

        .ft-logo-icon img { width: 100%; height: 100%; object-fit: cover; }

        .ft-logo-name {
          font-family: 'Inter', sans-serif; font-size: 1.1rem;
          font-weight: 700; color: var(--text-1, #f1f5f9);
          letter-spacing: -0.04em;
        }

        .ft-logo-name em {
          font-family: 'Libre Baskerville', serif; font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ft-desc {
          font-family: 'Inter', sans-serif; font-size: 0.875rem;
          color: var(--text-3, rgba(255,255,255,0.45));
          line-height: 1.75; margin-bottom: 24px; max-width: 280px;
        }

        /* Socials */
        .ft-socials { display: flex; gap: 8px; }

        .ft-social {
          width: 36px; height: 36px; border-radius: 9px;
          background: var(--bg-2, rgba(255,255,255,0.04));
          border: 1px solid var(--border, rgba(255,255,255,0.07));
          display: flex; align-items: center; justify-content: center;
          color: var(--text-3, rgba(255,255,255,0.5));
          text-decoration: none; font-size: 0.8rem; font-weight: 700;
          transition: all 0.2s ease; font-family: 'Inter', sans-serif;
        }

        .ft-social:hover {
          background: var(--primary-dim, rgba(0,201,122,0.1));
          border-color: var(--primary-border, rgba(0,201,122,0.3));
          color: var(--primary, #00c97a);
          transform: translateY(-2px);
        }

        /* Nav cols */
        .ft-col-title {
          font-family: 'Inter', sans-serif; font-size: 0.72rem;
          font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--primary, #00c97a); margin-bottom: 18px;
        }

        .ft-links {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 10px;
        }

        .ft-link {
          font-family: 'Inter', sans-serif; font-size: 0.875rem;
          color: var(--text-3, rgba(255,255,255,0.5));
          text-decoration: none; transition: all 0.2s ease;
          display: inline-flex; align-items: center; gap: 6px;
        }

        .ft-link::before {
          content: ''; width: 0; height: 1px;
          background: var(--primary, #00c97a);
          transition: width 0.2s ease; display: inline-block;
        }

        .ft-link:hover { color: var(--text-1, #f1f5f9); }
        .ft-link:hover::before { width: 8px; }

        /* Newsletter col */
        .ft-newsletter-desc {
          font-family: 'Inter', sans-serif; font-size: 0.8rem;
          color: var(--text-3, rgba(255,255,255,0.45));
          line-height: 1.6; margin-bottom: 16px;
        }

        .ft-input-row { display: flex; flex-direction: column; gap: 8px; }

        .ft-input {
          width: 100%; height: 40px; padding: 0 14px;
          background: var(--bg-2, rgba(255,255,255,0.04));
          border: 1px solid var(--border, rgba(255,255,255,0.08));
          border-radius: 9px; font-family: 'Inter', sans-serif;
          font-size: 0.85rem; color: var(--text-1, #f1f5f9);
          outline: none; transition: all 0.15s ease;
        }

        .ft-input:focus {
          border-color: var(--primary, #00c97a);
          box-shadow: 0 0 0 3px rgba(0,201,122,0.1);
          background: rgba(255,255,255,0.06);
        }

        .ft-input::placeholder { color: var(--text-3, rgba(255,255,255,0.3)); }

        .ft-sub-btn {
          width: 100%; height: 40px;
          background: var(--primary, #00c97a); border: none;
          border-radius: 9px; font-family: 'Inter', sans-serif;
          font-size: 0.85rem; font-weight: 600; color: #000;
          cursor: pointer; transition: all 0.2s ease;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }

        .ft-sub-btn:hover { background: #00e089; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,201,122,0.3); }
        .ft-sub-btn.done { background: #0ea5e9; color: #fff; }

        /* ── STATS BAR ── */
        .ft-stats {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 1px; background: var(--border, rgba(255,255,255,0.07));
          border-radius: 14px; overflow: hidden;
          border: 1px solid var(--border, rgba(255,255,255,0.07));
          margin-bottom: 40px;
        }

        .ft-stat {
          background: var(--bg-1, #0a0f0c);
          padding: 18px 20px; text-align: center;
        }

        .ft-stat-num {
          font-family: 'Libre Baskerville', serif; font-style: italic;
          font-size: 1.5rem; font-weight: 400;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1; margin-bottom: 3px;
        }

        .ft-stat-label {
          font-family: 'Inter', sans-serif; font-size: 0.72rem;
          color: var(--text-3, rgba(255,255,255,0.4));
        }

        /* ── DIVIDER ── */
        .ft-divider {
          height: 1px;
          background: var(--border, rgba(255,255,255,0.07));
          margin-bottom: 24px;
        }

        /* ── BOTTOM ── */
        .ft-bottom {
          display: flex; justify-content: space-between;
          align-items: center; flex-wrap: wrap; gap: 12px;
        }

        .ft-copy {
          font-family: 'Inter', sans-serif; font-size: 0.8rem;
          color: var(--text-3, rgba(255,255,255,0.4));
        }

        .ft-copy strong {
          font-family: 'Libre Baskerville', serif; font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ft-bottom-links { display: flex; gap: 20px; align-items: center; }

        .ft-bottom-link {
          font-family: 'Inter', sans-serif; font-size: 0.8rem;
          color: var(--text-3, rgba(255,255,255,0.4));
          text-decoration: none; transition: color 0.2s ease;
        }

        .ft-bottom-link:hover { color: var(--primary, #00c97a); }

        .ft-made-by {
          font-family: 'Inter', sans-serif; font-size: 0.78rem;
          color: var(--text-3, rgba(255,255,255,0.3));
          display: flex; align-items: center; gap: 5px;
        }

        .ft-made-by span {
          color: var(--primary, #00c97a); font-weight: 600;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .ft-top { grid-template-columns: 1fr 1fr; gap: 36px; }
          .ft-brand-col { grid-column: 1 / -1; }
          .ft-desc { max-width: 100%; }
        }

        @media (max-width: 600px) {
          .ft-top { grid-template-columns: 1fr; gap: 28px; }
          .ft-brand-col { grid-column: auto; }
          .ft-stats { grid-template-columns: 1fr; }
          .ft-bottom { flex-direction: column; text-align: center; }
          .ft-bottom-links { flex-wrap: wrap; justify-content: center; }
          .ft-inner { padding: 48px 20px 28px; }
        }
      `}</style>

      <footer className="ft">
        <div className="ft-grid-bg" />
        <div className="ft-inner">

          {/* ── TOP GRID ── */}
          <div className="ft-top">

            {/* Brand */}
            <div className="ft-brand-col">
              <Link to="/" className="ft-logo">
                <div className="ft-logo-icon">
                  <img src="/favicon.png" alt="RoutePilot" />
                </div>
                <span className="ft-logo-name">
                  Route<em>Pilot</em>
                </span>
              </Link>
              <p className="ft-desc">
                AI-powered career roadmaps that bring clarity, structure,
                and direction to your professional journey — built for the
                next generation of professionals.
              </p>
              <div className="ft-socials">
                <a href="https://twitter.com/lipunrout" target="_blank" rel="noopener noreferrer" className="ft-social" title="Twitter/X">𝕏</a>
                <a href="https://linkedin.com/in/lipun-rout" target="_blank" rel="noopener noreferrer" className="ft-social" title="LinkedIn">in</a>
                <a href="https://github.com/lipunrout" target="_blank" rel="noopener noreferrer" className="ft-social" title="GitHub">GH</a>
                <a href="mailto:support@routepilot.com" className="ft-social" title="Email">✉</a>
              </div>
            </div>

            {/* Navigate */}
            <div>
              <div className="ft-col-title">Navigate</div>
              <ul className="ft-links">
                <li><Link to="/" className="ft-link">Home</Link></li>
                <li><Link to="/category" className="ft-link">Explore Careers</Link></li>
                <li><Link to="/dashboard" className="ft-link">Dashboard</Link></li>
                <li><Link to="/contact" className="ft-link">Contact</Link></li>
                <li><Link to="/register" className="ft-link">Get Started Free</Link></li>
              </ul>
            </div>

            {/* Careers */}
            <div>
              <div className="ft-col-title">Career Paths</div>
              <ul className="ft-links">
                <li><Link to="/category" className="ft-link">IT & Tech</Link></li>
                <li><Link to="/category" className="ft-link">Government Jobs</Link></li>
                <li><Link to="/category" className="ft-link">Business & Finance</Link></li>
                <li><Link to="/category" className="ft-link">Freelancing</Link></li>
                <li><Link to="/category" className="ft-link">Non-IT Careers</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <div className="ft-col-title">Stay Updated</div>
              <p className="ft-newsletter-desc">
                Get career tips, new roadmap drops and product updates straight to your inbox.
              </p>
              <div className="ft-input-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="ft-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                />
                <button
                  className={`ft-sub-btn ${subscribed ? 'done' : ''}`}
                  onClick={handleSubscribe}
                >
                  {subscribed ? '✓ Subscribed!' : 'Subscribe →'}
                </button>
              </div>
            </div>

          </div>

          {/* ── STATS BAR ── */}
          <div className="ft-stats">
            {[
              { n: '25+',    l: 'Career Paths' },
              { n: '10k+',   l: 'Roadmaps Generated' },
              { n: '100%',   l: 'AI-Powered' },
            ].map((s) => (
              <div className="ft-stat" key={s.l}>
                <div className="ft-stat-num">{s.n}</div>
                <div className="ft-stat-label">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="ft-divider" />

          {/* ── BOTTOM ── */}
          <div className="ft-bottom">
            <div className="ft-copy">
              © {currentYear} <strong>RoutePilot</strong>. All rights reserved.
            </div>

            <div className="ft-made-by">
              Built with ♥ by <span>Lipun Rout</span>
            </div>

            <div className="ft-bottom-links">
              <a href="https://rich-lake-255.notion.site/RoutePilot-Privacy-Policy-b3e7aa88079c4f33916d5caed76a5a4b" target="_blank" rel="noopener noreferrer" className="ft-bottom-link">Privacy</a>
              <a href="https://rich-lake-255.notion.site/RoutePilot-Terms-of-Service-316364ad756d8039bd69ddbc7a730155" target="_blank" rel="noopener noreferrer" className="ft-bottom-link">Terms</a>
              <Link to="/contact" className="ft-bottom-link">Contact</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;