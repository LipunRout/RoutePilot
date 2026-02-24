import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return;
    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <>
      <style>{`
        .footer {
          background: #0c141c;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 80px 24px 40px;
          position: relative;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        /* Brand */
        .footer-logo {
          font-family: 'Inter', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #fff;
          text-decoration: none;
          margin-bottom: 8px;
          display: inline-block;
        }

        .footer-tagline {
          font-size: 0.85rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #00ffaa;
          margin-bottom: 16px;
        }

        .footer-desc {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        /* Social */
        .footer-socials {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .social-icon:hover {
          background: #00ffaa;
          color: #000;
          transform: translateY(-3px);
        }

        /* Columns */
        .footer-title {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
          color: #00ffaa;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-link {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .footer-link:hover {
          color: #fff;
          padding-left: 6px;
        }

        /* Newsletter */
        .newsletter-wrap {
          margin-top: 10px;
        }

        .newsletter-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #fff;
          font-size: 0.85rem;
          outline: none;
          margin-bottom: 12px;
          transition: border 0.2s ease;
        }

        .newsletter-input:focus {
          border-color: #00ffaa;
        }

        .newsletter-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          background: linear-gradient(135deg, #00ffaa, #00d4ff);
          color: #000;
          transition: transform 0.2s ease;
        }

        .newsletter-btn:hover {
          transform: translateY(-2px);
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 30px;
        }

        /* Bottom */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-copy {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
        }

        .footer-copy span {
          color: #00ffaa;
          font-weight: 600;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .footer-bottom-link {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-bottom-link:hover {
          color: #00ffaa;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">

          <div className="footer-grid">

            <div>
              <Link to="/" className="footer-logo">RoutePilot</Link>
              <div className="footer-tagline">AI Career Navigator</div>
              <p className="footer-desc">
                Smart AI-powered career roadmaps designed to bring clarity,
                structure, and confidence to your professional journey.
              </p>

              <div className="footer-socials">
                <a href="#" className="social-icon">𝕏</a>
                <a href="#" className="social-icon">in</a>
                <a href="#" className="social-icon">⌘</a>
                <a href="#" className="social-icon">▶</a>
              </div>
            </div>

            <div>
              <div className="footer-title">Navigate</div>
              <ul className="footer-links">
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/category" className="footer-link">Explore Careers</Link></li>
                <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
                <li><Link to="/register" className="footer-link">Get Started</Link></li>
              </ul>
            </div>

            <div>
              <div className="footer-title">Careers</div>
              <ul className="footer-links">
                <li><Link to="/category" className="footer-link">IT & Tech</Link></li>
                <li><Link to="/category" className="footer-link">Government</Link></li>
                <li><Link to="/category" className="footer-link">Business</Link></li>
                <li><Link to="/category" className="footer-link">Freelancing</Link></li>
              </ul>
            </div>

            <div>
              <div className="footer-title">Stay Updated</div>
              <div className="newsletter-wrap">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="newsletter-btn" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </div>
            </div>

          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <div className="footer-copy">
              © {currentYear} <span>RoutePilot</span>. All rights reserved.
            </div>

            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy</a>
              <a href="#" className="footer-bottom-link">Terms</a>
              <a href="#" className="footer-bottom-link">Contact</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;