import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ROLES_DATA = {
  it: {
    label: 'IT & Technology',
    accent: '#00c97a',
    glow: 'rgba(0,201,122,0.12)',
    border: 'rgba(0,201,122,0.25)',
    icon: '💻',
    roles: [
      { id: 'frontend',     title: 'Frontend Developer',   icon: '🎨', desc: 'Build beautiful, responsive UIs with React, Vue or Angular.',         time: '6–8 months',  level: 'Beginner friendly' },
      { id: 'backend',      title: 'Backend Developer',    icon: '⚙️', desc: 'Design APIs, databases and server logic with Node, Python or Java.',  time: '7–9 months',  level: 'Some coding needed' },
      { id: 'fullstack',    title: 'Full Stack Developer', icon: '🔗', desc: 'Master both frontend and backend to ship complete products.',          time: '10–12 months', level: 'Intermediate' },
      { id: 'data-analyst', title: 'Data Analyst',         icon: '📊', desc: 'Turn raw data into insights with SQL, Python and Tableau.',           time: '5–7 months',  level: 'Beginner friendly' },
      { id: 'ai-ml',        title: 'AI / ML Engineer',     icon: '🤖', desc: 'Build intelligent systems using TensorFlow, PyTorch and LLMs.',       time: '9–12 months', level: 'Math background helps' },
      { id: 'devops',       title: 'DevOps Engineer',      icon: '🔧', desc: 'Automate CI/CD pipelines, Docker, Kubernetes and cloud infra.',       time: '7–9 months',  level: 'Intermediate' },
      { id: 'cybersec',     title: 'Cybersecurity Analyst',icon: '🛡️', desc: 'Protect systems, networks and data from threats and attacks.',        time: '8–10 months', level: 'Intermediate' },
      { id: 'uiux',         title: 'UI/UX Designer',       icon: '✏️', desc: 'Design intuitive user experiences with Figma and design thinking.',   time: '4–6 months',  level: 'Beginner friendly' },
      { id: 'cloud',        title: 'Cloud Engineer',        icon: '☁️', desc: 'Deploy and manage scalable infrastructure on AWS, GCP or Azure.',    time: '7–9 months',  level: 'Intermediate' },
      { id: 'mobile',       title: 'Mobile Developer',     icon: '📱', desc: 'Build cross-platform mobile apps with Flutter or React Native.',      time: '6–8 months',  level: 'Beginner friendly' },
      { id: 'blockchain',   title: 'Blockchain Developer',  icon: '⛓️', desc: 'Build smart contracts and dApps on Ethereum and Solana.',            time: '8–10 months', level: 'Advanced' },
      { id: 'qa',           title: 'QA Engineer',           icon: '🧪', desc: 'Ensure software quality through manual and automated testing.',      time: '4–6 months',  level: 'Beginner friendly' },
    ],
  },
  nonit: {
    label: 'Non-IT Careers',
    accent: '#0ea5e9',
    glow: 'rgba(14,165,233,0.12)',
    border: 'rgba(14,165,233,0.25)',
    icon: '📊',
    roles: [
      { id: 'banking',    title: 'Banking Professional',  icon: '🏦', desc: 'Build a career in retail, corporate or investment banking.',           time: '4–6 months',  level: 'Beginner friendly' },
      { id: 'marketing',  title: 'Digital Marketer',      icon: '📣', desc: 'Master SEO, social media, PPC and growth marketing strategies.',       time: '4–5 months',  level: 'Beginner friendly' },
      { id: 'hr',         title: 'HR Manager',            icon: '👥', desc: 'Lead recruitment, talent development and organizational culture.',     time: '4–6 months',  level: 'Beginner friendly' },
      { id: 'content',    title: 'Content Writer',        icon: '✍️', desc: 'Create compelling blogs, copy and social content that converts.',     time: '3–4 months',  level: 'Beginner friendly' },
      { id: 'finance',    title: 'Financial Analyst',     icon: '💹', desc: 'Analyze financial data, build models and advise on investments.',     time: '6–8 months',  level: 'Intermediate' },
      { id: 'sales',      title: 'Sales Executive',       icon: '🤝', desc: 'Build client relationships and close deals in B2B or B2C markets.',  time: '3–4 months',  level: 'Beginner friendly' },
      { id: 'logistics',  title: 'Supply Chain Manager',  icon: '🚚', desc: 'Optimize procurement, logistics and inventory management.',           time: '5–7 months',  level: 'Intermediate' },
      { id: 'operations', title: 'Operations Manager',    icon: '⚙️', desc: 'Streamline business processes and drive operational efficiency.',     time: '5–6 months',  level: 'Intermediate' },
    ],
  },
  govt: {
    label: 'Government Jobs',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
    icon: '🏛️',
    roles: [
      { id: 'upsc',      title: 'UPSC IAS/IPS',          icon: '🎖️', desc: 'Crack India\'s toughest exam and serve in the civil services.',        time: '12–18 months', level: 'Highly competitive' },
      { id: 'ssc',       title: 'SSC CGL/CHSL',          icon: '📋', desc: 'Secure a central government job through SSC combined exams.',          time: '6–9 months',   level: 'Intermediate' },
      { id: 'bankpo',    title: 'Bank PO / Clerk',        icon: '🏦', desc: 'Join public sector banks via IBPS, SBI or RBI examinations.',          time: '5–7 months',   level: 'Intermediate' },
      { id: 'defence',   title: 'Defence Services',       icon: '⭐', desc: 'Join Army, Navy or Air Force through NDA, CDS or AFCAT.',             time: '6–12 months',  level: 'Physical + Academic' },
      { id: 'teaching',  title: 'Teacher / Lecturer',     icon: '📚', desc: 'Qualify CTET, TET or NET/SET to teach in govt schools or colleges.',  time: '4–8 months',   level: 'Subject expertise' },
      { id: 'railway',   title: 'Railway Recruitment',    icon: '🚆', desc: 'Secure RRB NTPC, Group D or ALP roles in Indian Railways.',           time: '5–7 months',   level: 'Beginner friendly' },
      { id: 'police',    title: 'Police / PSC',           icon: '🚓', desc: 'Join state police forces or clear PSC exams for state services.',     time: '6–10 months',  level: 'State specific' },
    ],
  },
  business: {
    label: 'Business & Entrepreneurship',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.25)',
    icon: '🚀',
    roles: [
      { id: 'entrepreneur', title: 'Entrepreneur',         icon: '💡', desc: 'Build and scale your own startup from idea to product-market fit.',   time: 'Ongoing',     level: 'Self-driven' },
      { id: 'productmgr',   title: 'Product Manager',      icon: '📦', desc: 'Lead product strategy, roadmaps and cross-functional teams.',        time: '6–8 months',  level: 'Intermediate' },
      { id: 'consultant',   title: 'Business Consultant',  icon: '💼', desc: 'Advise companies on strategy, operations and growth levers.',        time: '5–7 months',  level: 'Intermediate' },
      { id: 'ecommerce',    title: 'E-Commerce Seller',    icon: '🛒', desc: 'Launch and scale a profitable store on Amazon, Flipkart or Shopify.',time: '3–5 months',  level: 'Beginner friendly' },
      { id: 'vc',           title: 'VC / Investment Analyst',icon: '📈',desc: 'Evaluate startups and manage investment portfolios in venture capital.', time: '7–9 months', level: 'Finance background' },
      { id: 'bizdev',       title: 'Business Development', icon: '🌐', desc: 'Identify growth opportunities, forge partnerships and expand markets.',time: '4–6 months', level: 'Beginner friendly' },
    ],
  },
}

const LEVELS = ['All', 'Beginner friendly', 'Intermediate', 'Advanced']

export default function RoleSelect() {
  const [searchParams]        = useSearchParams()
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('All')
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [leaving, setLeaving] = useState(false)
  const navigate = useNavigate()

  const catId   = searchParams.get('category') || 'it'
  const catData = ROLES_DATA[catId] || ROLES_DATA.it

  const filtered = catData.roles.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                        r.desc.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || r.level === filter
    return matchSearch && matchFilter
  })

  const pick = (role) => {
    setSelected(role.id)
    setLeaving(true)
    setTimeout(() => navigate(`/details?category=${catId}&role=${role.id}`), 420)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

        .rs-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
        }

        .rs-main {
          flex: 1;
          padding: 96px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .rs-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 100% 60% at 50% 0%, black 20%, transparent 100%);
          pointer-events: none;
        }

        .rs-radial {
          position: absolute;
          width: 700px; height: 400px;
          border-radius: 50%;
          top: -80px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .rs-inner {
          max-width: 1060px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── BREADCRUMB ── */
        .rs-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 36px;
          animation: rsFade 0.4s ease both;
          flex-wrap: wrap;
        }

        .rs-breadcrumb-item {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: var(--text-3);
          text-decoration: none;
          transition: color 0.15s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rs-breadcrumb-item:hover { color: var(--text-1); }

        .rs-breadcrumb-sep {
          font-size: 0.7rem;
          color: var(--text-3);
        }

        .rs-breadcrumb-active {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-2);
        }

        /* ── HEADER ── */
        .rs-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .rs-header-left { flex: 1; min-width: 280px; }

        .rs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 12px;
          animation: rsFade 0.4s ease 0.05s both;
        }

        .rs-eyebrow-icon {
          width: 22px; height: 22px;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          border: 1px solid;
        }

        .rs-title {
          animation: rsFade 0.4s ease 0.1s both;
        }

        .rs-title-line1 {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.05em;
          line-height: 1.1;
        }

        .rs-title-line2 {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 600;
          font-style: italic;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .rs-header-meta {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: var(--text-2);
          font-weight: 500;
          animation: rsFade 0.4s ease 0.18s both;
          white-space: nowrap;
          padding-bottom: 4px;
        }

        /* ── CONTROLS ── */
        .rs-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 28px;
          align-items: center;
          flex-wrap: wrap;
          animation: rsFade 0.4s ease 0.2s both;
        }

        .rs-search-wrap {
          position: relative;
          flex: 1;
          min-width: 200px;
        }

        .rs-search-icon {
          position: absolute;
          left: 13px; top: 50%;
          transform: translateY(-50%);
          font-size: 0.85rem;
          color: var(--text-3);
          pointer-events: none;
        }

        .rs-search {
          width: 100%;
          height: 40px;
          padding: 0 14px 0 36px;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: var(--text-1);
          outline: none;
          transition: all 0.15s ease;
        }

        .rs-search:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0,201,122,0.1);
          background: var(--bg-2);
        }

        .rs-search::placeholder { color: var(--text-3); }

        .rs-filters {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .rs-filter-btn {
          height: 38px;
          padding: 0 14px;
          border-radius: 9px;
          border: 1px solid var(--border);
          background: var(--bg-1);
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-2);
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .rs-filter-btn:hover {
          background: var(--bg-2);
          border-color: var(--border-hover);
          color: var(--text-1);
        }

        .rs-filter-btn.active {
          color: var(--text-1);
          font-weight: 600;
        }

        /* ── ROLES GRID ── */
        .rs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 48px;
          transition: opacity 0.35s ease;
        }

        /* ── ROLE CARD ── */
        .rs-card {
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 22px 20px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
          animation: rsFade 0.4s ease both;
          display: flex;
          flex-direction: column;
        }

        .rs-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.25);
        }

        .rs-card.selected {
          transform: scale(0.96);
          opacity: 0.6;
        }

        /* Inner hover glow */
        .rs-card-glow {
          position: absolute; inset: 0;
          border-radius: 14px;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .rs-card:hover .rs-card-glow { opacity: 1; }

        /* Card top */
        .rs-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .rs-card-icon {
          width: 42px; height: 42px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.25rem;
          background: var(--bg-2);
          border: 1px solid var(--border);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .rs-card-time {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--text-3);
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 3px 9px;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        /* Card title */
        .rs-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.975rem;
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.03em;
          margin-bottom: 6px;
          line-height: 1.3;
          transition: color 0.2s ease;
        }

        /* Card desc */
        .rs-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          color: var(--text-2);
          line-height: 1.6;
          margin-bottom: 16px;
          flex: 1;
        }

        /* Card footer */
        .rs-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .rs-card-level {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-3);
          padding: 3px 9px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--bg-2);
          transition: all 0.2s ease;
        }

        .rs-card-cta {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
          opacity: 0;
          transform: translateX(-4px);
        }

        .rs-card:hover .rs-card-cta {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── EMPTY STATE ── */
        .rs-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 64px 24px;
        }

        .rs-empty-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }

        .rs-empty-title {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-1);
          margin-bottom: 6px;
        }

        .rs-empty-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: var(--text-3);
        }

        /* ── BOTTOM CTA ── */
        .rs-bottom {
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          animation: rsFade 0.4s ease 0.5s both;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
        }

        .rs-bottom::before {
          content: '';
          position: absolute;
          top: -1px; left: 15%; right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
        }

        .rs-bottom-text-title {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.03em;
          margin-bottom: 4px;
        }

        .rs-bottom-text-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-style: italic;
          color: var(--text-2);
        }

        .rs-bottom-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary);
          text-decoration: none;
          padding: 10px 18px;
          border: 1px solid var(--primary-border);
          border-radius: 10px;
          background: var(--primary-dim);
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .rs-bottom-link:hover {
          background: var(--primary);
          color: #000;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,201,122,0.25);
        }

        /* ── ANIMATIONS ── */
        @keyframes rsFade {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .rs-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .rs-main { padding: 88px 18px 60px; }
          .rs-grid { grid-template-columns: 1fr; gap: 10px; }
          .rs-header { flex-direction: column; align-items: flex-start; }
          .rs-controls { flex-direction: column; align-items: stretch; }
          .rs-filters { justify-content: flex-start; }
          .rs-bottom { flex-direction: column; align-items: flex-start; padding: 22px 20px; }
        }
      `}</style>

      <div className="rs-page">
        <Navbar />

        <main className="rs-main">
          <div className="rs-grid-bg" />
          <div
            className="rs-radial"
            style={{ background: `radial-gradient(circle, ${catData.glow} 0%, transparent 65%)` }}
          />

          <div className="rs-inner">

            {/* ── BREADCRUMB ── */}
            <nav className="rs-breadcrumb">
              <Link to="/" className="rs-breadcrumb-item">Home</Link>
              <span className="rs-breadcrumb-sep">›</span>
              <Link to="/category" className="rs-breadcrumb-item">
                {catData.icon} {catData.label}
              </Link>
              <span className="rs-breadcrumb-sep">›</span>
              <span className="rs-breadcrumb-active">Select Role</span>
            </nav>

            {/* ── HEADER ── */}
            <div className="rs-header">
              <div className="rs-header-left">
                <div
                  className="rs-eyebrow"
                  style={{ color: catData.accent }}
                >
                  <div
                    className="rs-eyebrow-icon"
                    style={{
                      background: catData.glow,
                      borderColor: catData.border,
                    }}
                  >
                    {catData.icon}
                  </div>
                  {catData.label} · Step 2 of 4
                </div>
                <h1 className="rs-title">
                  <span className="rs-title-line1">Choose your target</span>
                  <span
                    className="rs-title-line2"
                    style={{ color: catData.accent }}
                  >
                    career role
                  </span>
                </h1>
              </div>
              <div className="rs-header-meta">
                {catData.roles.length} roles available
              </div>
            </div>

            {/* ── CONTROLS ── */}
            <div className="rs-controls">
              <div className="rs-search-wrap">
                <span className="rs-search-icon">🔍</span>
                <input
                  type="text"
                  className="rs-search"
                  placeholder="Search roles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="rs-filters">
                {LEVELS.map(l => (
                  <button
                    key={l}
                    className={`rs-filter-btn ${filter === l ? 'active' : ''}`}
                    style={filter === l ? {
                      borderColor: catData.border,
                      background: catData.glow,
                      color: catData.accent,
                    } : {}}
                    onClick={() => setFilter(l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* ── GRID ── */}
            <div
              className="rs-grid"
              style={{ opacity: leaving ? 0 : 1 }}
            >
              {filtered.length === 0 ? (
                <div className="rs-empty">
                  <div className="rs-empty-icon">🔍</div>
                  <div className="rs-empty-title">No roles found</div>
                  <div className="rs-empty-desc">Try a different search or filter.</div>
                </div>
              ) : (
                filtered.map((role, i) => (
                  <div
                    key={role.id}
                    className={`rs-card ${selected === role.id ? 'selected' : ''}`}
                    style={{
                      animationDelay: `${i * 0.05}s`,
                      borderColor: hovered === role.id ? catData.border : undefined,
                    }}
                    onMouseEnter={() => setHovered(role.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => pick(role)}
                  >
                    {/* Glow layer */}
                    <div
                      className="rs-card-glow"
                      style={{
                        background: `radial-gradient(ellipse 70% 50% at 20% 20%, ${catData.glow}, transparent)`,
                      }}
                    />

                    <div className="rs-card-top">
                      <div
                        className="rs-card-icon"
                        style={hovered === role.id ? {
                          background: catData.glow,
                          borderColor: catData.border,
                        } : {}}
                      >
                        {role.icon}
                      </div>
                      <div
                        className="rs-card-time"
                        style={hovered === role.id ? {
                          color: catData.accent,
                          borderColor: catData.border,
                          background: catData.glow,
                        } : {}}
                      >
                        ⏱ {role.time}
                      </div>
                    </div>

                    <div
                      className="rs-card-title"
                      style={hovered === role.id ? { color: catData.accent } : {}}
                    >
                      {role.title}
                    </div>

                    <div className="rs-card-desc">{role.desc}</div>

                    <div className="rs-card-footer">
                      <div
                        className="rs-card-level"
                        style={hovered === role.id ? {
                          color: catData.accent,
                          borderColor: catData.border,
                          background: catData.glow,
                        } : {}}
                      >
                        {role.level}
                      </div>
                      <div
                        className="rs-card-cta"
                        style={{ color: catData.accent }}
                      >
                        Select role →
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ── BOTTOM CTA ── */}
            <div className="rs-bottom">
              <div>
                <div className="rs-bottom-text-title">
                  Not sure which role to pick?
                </div>
                <div className="rs-bottom-text-sub">
                  Let AI recommend the best path based on your background.
                </div>
              </div>
              <Link to="/category" className="rs-bottom-link">
                ← Change domain
              </Link>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}