import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CATEGORIES = [
  {
    id: "it",
    label: "IT & Technology",
    cormorant: "Technology",
    icon: "💻",
    desc: "Software development, data science, cloud, cybersecurity and more.",
    color: "#00c97a",
    glow: "rgba(0,201,122,0.12)",
    border: "rgba(0,201,122,0.25)",
    roles: [
      "Frontend Dev",
      "Backend Dev",
      "Data Analyst",
      "DevOps",
      "AI Engineer",
    ],
    count: 12,
  },
  {
    id: "nonit",
    label: "Non-IT Careers",
    cormorant: "Careers",
    icon: "📊",
    desc: "Banking, marketing, HR, finance, content writing and more.",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.12)",
    border: "rgba(14,165,233,0.25)",
    roles: ["Banking", "Marketing", "HR Manager", "Content Writer", "Finance"],
    count: 8,
  },
  {
    id: "govt",
    label: "Government Jobs",
    cormorant: "Government",
    icon: "🏛️",
    desc: "UPSC, SSC, Bank PO, Defence, Teaching and state exams.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
    roles: ["UPSC IAS", "SSC CGL", "Bank PO", "Defence", "Teaching"],
    count: 7,
  },
  {
    id: "business",
    label: "Business & Entrepreneurship",
    cormorant: "Entrepreneurship",
    icon: "🚀",
    desc: "Startups, product management, consulting, e-commerce and more.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.25)",
    roles: [
      "Entrepreneur",
      "Product Manager",
      "Consultant",
      "E-Commerce",
      "VC Analyst",
    ],
    count: 6,
  },
];

export default function CategorySelect() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();

  const pick = (id) => {
    setSelected(id);
    setLeaving(true);
    setTimeout(() => navigate(`/roles?category=${id}`), 500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ── PAGE ── */
        .cs-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
        }

        /* ── MAIN ── */
        .cs-main {
          flex: 1;
          padding: 100px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        /* Background grid */
        .cs-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 100%);
          pointer-events: none;
        }

        /* Top radial glow */
        .cs-radial {
          position: absolute;
          width: 800px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,201,122,0.06) 0%, transparent 65%);
          top: -100px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .cs-inner {
          max-width: 1060px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── HEADER ── */
        .cs-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .cs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 16px;
          animation: csFadeUp 0.5s ease both;
        }

        .cs-eyebrow-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--primary);
          animation: csPulse 2s ease-in-out infinite;
        }

        @keyframes csPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        .cs-title {
          margin-bottom: 14px;
          animation: csFadeUp 0.5s ease 0.08s both;
        }

        .cs-title-line1 {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.05em;
          line-height: 1.1;
        }

        .cs-title-line2 {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4.5vw, 3.6rem);
          font-weight: 600;
          font-style: italic;
          background: linear-gradient(135deg, #00c97a 20%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .cs-desc {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: var(--text-2);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto;
          animation: csFadeUp 0.5s ease 0.16s both;
        }

        /* ── CATEGORIES GRID ── */
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 48px;
          opacity: ${leaving ? 0 : 1};
          transition: opacity 0.4s ease;
        }

        /* ── CATEGORY CARD ── */
        .cs-card {
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 32px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          animation: csFadeUp 0.5s ease both;
        }

        .cs-card::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 18px;
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        /* Top glow line */
        .cs-card::after {
          content: '';
          position: absolute;
          top: 0; left: 15%; right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .cs-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.3);
        }

        .cs-card:hover::after { opacity: 0.6; }

        .cs-card.selected {
          transform: scale(0.97);
          opacity: 0.7;
        }

        /* ── CARD INNER ── */
        .cs-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .cs-card-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          border: 1px solid;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .cs-card-badge {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid;
          transition: all 0.25s ease;
        }

        .cs-card-title {
          margin-bottom: 10px;
        }

        .cs-card-title-main {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin-bottom: 2px;
        }

        .cs-card-title-accent {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          font-style: italic;
          line-height: 1.1;
          transition: all 0.25s ease;
        }

        .cs-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: var(--text-2);
          line-height: 1.65;
          margin-bottom: 20px;
        }

        /* Roles pills */
        .cs-roles {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }

        .cs-role-pill {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-3);
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 3px 10px;
          transition: all 0.2s ease;
        }

        .cs-card:hover .cs-role-pill {
          color: var(--text-2);
          border-color: var(--border-hover);
        }

        /* Card footer */
        .cs-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cs-card-count {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          color: var(--text-3);
          font-weight: 500;
        }

        .cs-card-arrow {
          width: 32px; height: 32px;
          border-radius: 8px;
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem;
          color: var(--text-3);
          transition: all 0.2s ease;
          background: var(--bg-2);
        }

        .cs-card:hover .cs-card-arrow {
          transform: translateX(3px);
          color: var(--text-1);
          border-color: var(--border-hover);
        }

        /* ── BOTTOM INFO ── */
        .cs-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          padding: 24px;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 14px;
          animation: csFadeUp 0.5s ease 0.5s both;
          flex-wrap: wrap;
        }

        .cs-bottom-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: var(--text-2);
        }

        .cs-bottom-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: var(--primary-dim);
          border: 1px solid var(--primary-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .cs-bottom-text strong {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          color: var(--text-1);
          display: block;
          font-size: 0.875rem;
          letter-spacing: -0.02em;
        }

        .cs-bottom-divider {
          width: 1px; height: 32px;
          background: var(--border);
        }

        /* ── ANIMATIONS ── */
        @keyframes csFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .cs-main  { padding: 90px 18px 60px; }
          .cs-grid  { grid-template-columns: 1fr; gap: 12px; }
          .cs-header { margin-bottom: 40px; }
          .cs-card  { padding: 24px 20px; }
          .cs-bottom { gap: 16px; }
          .cs-bottom-divider { display: none; }
        }

        @media (max-width: 480px) {
          .cs-card-top { flex-direction: column; gap: 12px; align-items: flex-start; }
        }
      `}</style>

      <div className="cs-page">
        <Navbar />

        <main className="cs-main">
          <div className="cs-grid-bg" />
          <div className="cs-radial" />

          <div className="cs-inner">
            {/* ── HEADER ── */}
            <header className="cs-header">
              <div className="cs-eyebrow">
                <span className="cs-eyebrow-dot" />
                Step 1 of 4 — Choose your domain
              </div>
              <h1 className="cs-title">
                <span className="cs-title-line1">What kind of career</span>
                <span className="cs-title-line2">are you building?</span>
              </h1>
              <p className="cs-desc">
                Select the domain that best matches your goals. Your AI roadmap
                will be tailored specifically to the path you choose.
              </p>
            </header>

            {/* ── GRID ── */}
            <div
              className="cs-grid"
              style={{
                opacity: leaving ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}
            >
              {CATEGORIES.map((cat, i) => (
                <div
                  key={cat.id}
                  className={`cs-card ${selected === cat.id ? "selected" : ""}`}
                  style={{
                    animationDelay: `${0.2 + i * 0.08}s`,
                    color: hovered === cat.id ? cat.color : "inherit",
                    borderColor: hovered === cat.id ? cat.border : undefined,
                    boxShadow:
                      hovered === cat.id
                        ? `0 24px 64px rgba(0,0,0,0.25), 0 0 0 1px ${cat.border}, inset 0 1px 0 ${cat.border}`
                        : undefined,
                    background:
                      hovered === cat.id
                        ? `linear-gradient(145deg, var(--bg-2), var(--bg-1))`
                        : undefined,
                  }}
                  onMouseEnter={() => setHovered(cat.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => pick(cat.id)}
                >
                  {/* Hover glow */}
                  {hovered === cat.id && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `radial-gradient(ellipse 60% 40% at 30% 30%, ${cat.glow}, transparent)`,
                        borderRadius: "18px",
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  <div className="cs-card-top">
                    <div
                      className="cs-card-icon-wrap"
                      style={{
                        background:
                          hovered === cat.id ? cat.glow : "var(--bg-2)",
                        borderColor:
                          hovered === cat.id ? cat.border : "var(--border)",
                      }}
                    >
                      {cat.icon}
                    </div>
                    <div
                      className="cs-card-badge"
                      style={{
                        color: hovered === cat.id ? cat.color : "var(--text-3)",
                        borderColor:
                          hovered === cat.id ? cat.border : "var(--border)",
                        background:
                          hovered === cat.id ? cat.glow : "transparent",
                      }}
                    >
                      {cat.count} roles
                    </div>
                  </div>

                  <div className="cs-card-title">
                    <span className="cs-card-title-main">
                      {cat.label.split(" ").slice(0, -1).join(" ")}
                    </span>
                    <span
                      className="cs-card-title-accent"
                      style={{
                        color: hovered === cat.id ? cat.color : "var(--text-2)",
                      }}
                    >
                      {cat.cormorant}
                    </span>
                  </div>

                  <p className="cs-card-desc">{cat.desc}</p>

                  <div className="cs-roles">
                    {cat.roles.map((r) => (
                      <span key={r} className="cs-role-pill">
                        {r}
                      </span>
                    ))}
                  </div>

                  <div className="cs-card-footer">
                    <span className="cs-card-count">
                      {cat.count} career paths available
                    </span>
                    <div
                      className="cs-card-arrow"
                      style={{
                        borderColor:
                          hovered === cat.id ? cat.border : undefined,
                        color: hovered === cat.id ? cat.color : undefined,
                        background: hovered === cat.id ? cat.glow : undefined,
                      }}
                    >
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── BOTTOM INFO BAR ── */}
            <div className="cs-bottom">
              {[
                {
                  icon: "⚡",
                  title: "Instant generation",
                  desc: "Roadmap ready in under 30 seconds",
                },
                {
                  icon: "◎",
                  title: "Fully personalized",
                  desc: "Based on your level & timeline",
                },
                {
                  icon: "✉",
                  title: "PDF to your inbox",
                  desc: "Export and keep your roadmap",
                },
              ].map((item, i) => (
                <div key={item.title} style={{ display: "contents" }}>
                  <div className="cs-bottom-item">
                    <div className="cs-bottom-icon">{item.icon}</div>
                    <div className="cs-bottom-text">
                      <strong>{item.title}</strong>
                      {item.desc}
                    </div>
                  </div>

                  {i < 2 && <div className="cs-bottom-divider" />}
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
