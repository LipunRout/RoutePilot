import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MotivationalPopup from '../components/MotivationalPopup'

const useInView = (threshold = 0.15) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

const useCounter = (target, duration = 2000, active = false) => {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, active])
  return val
}

const ROLES = [
  'Frontend Developer',
  'Data Analyst',
  'AI/ML Engineer',
  'Full Stack Developer',
  'DevOps Engineer',
  'UI/UX Designer',
]

const FEATURES = [
  { icon: '⚡', title: 'AI-Generated Roadmaps', desc: 'Gemini AI creates a structured, phase-by-phase plan tailored to your level and timeline.' },
  { icon: '◎', title: '25+ Career Paths', desc: 'IT, Non-IT, Government and Business — every major sector covered with specific roles.' },
  { icon: '◈', title: 'Curated Resources', desc: 'Handpicked articles and YouTube videos attached to every phase of your roadmap.' },
  { icon: '✉', title: 'PDF via Email', desc: 'Export your complete roadmap as a polished PDF delivered straight to your inbox.' },
  { icon: '◷', title: 'Timeline Estimates', desc: 'Know exactly how long each phase will take based on your daily study commitment.' },
  { icon: '◍', title: '1:1 Expert Calls', desc: 'Book a personal session with a career mentor for hands-on guidance.' },
]

const STEPS = [
  { n: '01', title: 'Choose Domain', desc: 'Pick from IT, Non-IT, Government or Business.' },
  { n: '02', title: 'Select Role', desc: 'Choose the specific career you want to pursue.' },
  { n: '03', title: 'Share Details', desc: 'Tell us your level, time and goal.' },
  { n: '04', title: 'Get Roadmap', desc: 'AI instantly generates your personalized path.' },
]

const TESTIMONIALS = [
  { name: 'Arjun Sharma', role: 'Frontend Dev @ Google', text: 'I followed the roadmap exactly and landed my dream job in 8 months. The structure was something no YouTube playlist could give me.', avatar: 'AS' },
  { name: 'Priya Patel', role: 'Data Analyst @ Amazon', text: 'Clear, structured, and actually relevant. RoutePilot removed the overwhelm completely. The phase-wise resources were incredibly helpful.', avatar: 'PP' },
  { name: 'Rahul Verma', role: 'DevOps @ Microsoft', text: 'The 1:1 call sealed the deal for me. Got personalized advice in 30 minutes that changed my entire study approach.', avatar: 'RV' },
]

export default function LandingPage() {
  const [showPopup, setShowPopup] = useState(false)
  const [roleIdx, setRoleIdx] = useState(0)
  const [typed, setTyped]   = useState('')
  const [statsRef, statsIn] = useInView(0.3)
  const [featRef,  featIn]  = useInView(0.1)
  const [stepsRef, stepsIn] = useInView(0.1)

  const c1 = useCounter(15000, 2200, statsIn)
  const c2 = useCounter(50000, 2200, statsIn)
  const c3 = useCounter(25,    1800, statsIn)
  const c4 = useCounter(92,    1800, statsIn)

  /* typing effect */
  useEffect(() => {
    const role = ROLES[roleIdx % ROLES.length]
    let i = 0
    setTyped('')
    const t = setInterval(() => {
      setTyped(role.slice(0, ++i))
      if (i === role.length) { clearInterval(t); setTimeout(() => setRoleIdx(p => p + 1), 2200) }
    }, 65)
    return () => clearInterval(t)
  }, [roleIdx])

  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        /* ── PAGE ── */
        .lp { background: var(--bg); min-height: 100vh; }

        /* ── NOISE OVERLAY ── */
        .lp::before {
          content:'';
          position:fixed; inset:0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none; z-index:0; opacity:0.4;
        }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .hero-grid {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
        }

        .hero-radial {
          position:absolute;
          width:700px; height:700px;
          border-radius:50%;
          background: radial-gradient(circle, rgba(0,201,122,0.07) 0%, transparent 65%);
          top:50%; left:50%;
          transform:translate(-50%,-50%);
          pointer-events:none;
        }

        .hero-inner {
          max-width: 760px;
          position:relative; z-index:1;
        }

        .hero-badge {
          margin-bottom: 28px;
          animation: fadeUp 0.6s ease both;
        }

        .hero-title {
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.05em;
          line-height: 1.1;
          color: var(--text-1);
          margin-bottom: 20px;
          animation: fadeUp 0.6s ease 0.1s both;
        }

        .hero-title em {
          font-style: normal;
          background: linear-gradient(135deg, #00c97a 30%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-typed-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 22px;
          animation: fadeUp 0.6s ease 0.2s both;
          flex-wrap: wrap;
        }

        .hero-typed-label {
          font-size: 1.05rem;
          color: var(--text-2);
          font-weight: 400;
        }

        .hero-typed {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--primary);
          min-width: 220px;
          text-align: left;
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: var(--primary);
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 0.9s step-end infinite;
        }

        .hero-desc {
          font-size: 1.05rem;
          color: var(--text-2);
          line-height: 1.75;
          max-width: 560px;
          margin: 0 auto 32px;
          animation: fadeUp 0.6s ease 0.3s both;
        }

        .hero-cta {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease 0.4s both;
          margin-bottom: 60px;
        }

        /* Hero image */
        .hero-img-wrap {
          position: relative;
          animation: fadeUp 0.7s ease 0.5s both;
          max-width: 860px;
          margin: 0 auto;
        }

        .hero-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: 14px;
          border: 1px solid var(--border);
          box-shadow: 0 0 0 1px var(--border), 0 32px 80px rgba(0,0,0,0.5);
          display: block;
        }

        /* Floating chips */
        .chip {
          position: absolute;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: var(--shadow);
          backdrop-filter: blur(12px);
        }

        .chip-1 { top: 24px; left: -16px; animation: float 5s ease-in-out infinite; }
        .chip-2 { bottom: 32px; right: -16px; animation: float 6s ease-in-out infinite reverse; }

        .chip-icon { font-size: 1.2rem; }

        .chip-main {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-1);
          line-height: 1.3;
        }

        .chip-sub {
          font-size: 0.72rem;
          color: var(--text-2);
        }

        /* ── STATS ── */
        .stats {
          padding: 64px 24px;
          position: relative; z-index:1;
        }

        .stats-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .stat-cell {
          background: var(--bg-1);
          padding: 32px 24px;
          text-align: center;
          transition: background 0.2s;
          opacity: 0;
          transform: translateY(12px);
        }

        .stat-cell.show {
          animation: fadeUp 0.5s ease both;
        }

        .stat-cell:hover { background: var(--bg-2); }

        .stat-num {
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--text-1);
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-num span { color: var(--primary); }

        .stat-lbl {
          font-size: 0.8rem;
          color: var(--text-2);
          font-weight: 400;
        }

        /* ── FEATURES ── */
        .features {
          padding: 80px 24px;
          position: relative; z-index:1;
        }

        .features-inner { max-width: 1000px; margin: 0 auto; }

        .section-header {
          margin-bottom: 48px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .feat-card {
          background: var(--bg-1);
          padding: 28px 24px;
          transition: background 0.2s;
          opacity: 0;
          transform: translateY(12px);
        }

        .feat-card.show {
          animation: fadeUp 0.5s ease both;
        }

        .feat-card:hover { background: var(--bg-2); }

        .feat-icon {
          font-size: 1.1rem;
          color: var(--primary);
          margin-bottom: 14px;
          display: block;
        }

        .feat-title {
          font-size: 0.925rem;
          font-weight: 600;
          color: var(--text-1);
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .feat-desc {
          font-size: 0.85rem;
          color: var(--text-2);
          line-height: 1.65;
        }

        /* ── STEPS ── */
        .steps {
          padding: 80px 24px;
          position: relative; z-index:1;
        }

        .steps-inner { max-width: 1000px; margin: 0 auto; }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 16px;
        }

        .step-card {
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px 20px;
          position: relative;
          transition: all 0.2s ease;
          opacity: 0;
          transform: translateY(12px);
        }

        .step-card.show {
          animation: fadeUp 0.5s ease both;
        }

        .step-card:hover {
          border-color: var(--border-hover);
          background: var(--bg-2);
          transform: translateY(-3px);
          box-shadow: var(--shadow);
        }

        .step-num {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-3);
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .step-title {
          font-size: 0.925rem;
          font-weight: 600;
          color: var(--text-1);
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .step-desc {
          font-size: 0.82rem;
          color: var(--text-2);
          line-height: 1.6;
        }

        .step-line {
          position: absolute;
          top: 36px;
          right: -8px;
          width: 16px;
          height: 1px;
          background: var(--border);
          z-index: 2;
        }

        /* ── SHOWCASE ── */
        .showcase {
          padding: 80px 24px;
          position: relative; z-index:1;
        }

        .showcase-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .showcase-label { margin-bottom: 14px; }

        .showcase-title {
          font-size: clamp(1.5rem, 2.5vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          margin-bottom: 14px;
        }

        .showcase-desc {
          font-size: 0.925rem;
          color: var(--text-2);
          line-height: 1.75;
          margin-bottom: 28px;
        }

        .check-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 32px;
        }

        .check-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.875rem;
          color: var(--text-2);
        }

        .check-list li::before {
          content: '✓';
          width: 20px; height: 20px;
          background: var(--primary-dim);
          border: 1px solid var(--primary-border);
          border-radius: 6px;
          color: var(--primary);
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .showcase-img-wrap {
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }

        .showcase-img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .showcase-img-wrap:hover .showcase-img {
          transform: scale(1.02);
        }

        /* ── TESTIMONIALS ── */
        .testimonials {
          padding: 80px 24px;
          position: relative; z-index:1;
        }

        .testimonials-inner { max-width: 1000px; margin: 0 auto; }

        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 16px;
        }

        .testi-card {
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          transition: all 0.2s ease;
        }

        .testi-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow);
          transform: translateY(-3px);
        }

        .testi-stars {
          font-size: 0.75rem;
          letter-spacing: 2px;
          margin-bottom: 14px;
          color: #f5a623;
        }

        .testi-text {
          font-size: 0.875rem;
          color: var(--text-2);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .testi-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .testi-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: #000;
          flex-shrink: 0;
          letter-spacing: 0.5px;
        }

        .testi-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-1);
          letter-spacing: -0.01em;
        }

        .testi-role {
          font-size: 0.75rem;
          color: var(--text-3);
          margin-top: 1px;
        }

        /* ── CTA ── */
        .cta-section {
          padding: 80px 24px 100px;
          position: relative; z-index:1;
        }

        .cta-inner {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 56px 40px;
          position: relative;
          overflow: hidden;
        }

        .cta-inner::before {
          content:'';
          position:absolute;
          top:-1px; left:15%; right:15%;
          height:1px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
        }

        .cta-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          margin-bottom: 12px;
        }

        .cta-desc {
          font-size: 0.95rem;
          color: var(--text-2);
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .cta-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2,1fr); }
          .showcase-inner { grid-template-columns: 1fr; gap: 32px; }
          .testi-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 768px) {
          .hero { padding: 100px 20px 60px; }
          .stats-inner { grid-template-columns: repeat(2,1fr); }
          .features-grid { grid-template-columns: 1fr; }
          .steps-grid { grid-template-columns: 1fr 1fr; }
          .step-line { display: none; }
          .testi-grid { grid-template-columns: 1fr; }
          .chip-1, .chip-2 { display: none; }
          .cta-inner { padding: 40px 24px; }
          .hero-img { height: 240px; }
        }

        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr; }
          .stats-inner { grid-template-columns: repeat(2,1fr); }
        }
      `}</style>

      <div className="lp">
        {showPopup && <MotivationalPopup onClose={() => setShowPopup(false)} />}
        <Navbar />

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-radial" />
          <div className="hero-inner">

            <div className="hero-badge">
              <span className="badge">
                <span className="badge-dot" />
                AI-Powered Career Navigation
              </span>
            </div>

            <h1 className="hero-title">
              The smartest way to<br />
              <em>plan your career</em>
            </h1>

            <div className="hero-typed-row">
              <span className="hero-typed-label">Your path to becoming a</span>
              <span className="hero-typed">
                {typed}<span className="cursor" />
              </span>
            </div>

            <p className="hero-desc">
              Stop guessing. RoutePilot uses Gemini AI to generate a structured,
              phase-by-phase roadmap based on your goals, level and available time.
            </p>

            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get started free →
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                Sign in
              </Link>
            </div>

            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=80&auto=format"
                alt="Students collaborating"
                className="hero-img"
              />
              <div className="chip chip-1">
                <span className="chip-icon">⚡</span>
                <div>
                  <div className="chip-main">Roadmap Generated</div>
                  <div className="chip-sub">Frontend Dev · 6 months</div>
                </div>
              </div>
              <div className="chip chip-2">
                <span className="chip-icon">✦</span>
                <div>
                  <div className="chip-main">15,000+ Students</div>
                  <div className="chip-sub">Found clarity with RoutePilot</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── STATS ── */}
        <section className="stats" ref={statsRef}>
          <div className="stats-inner">
            {[
              { n: c1, s: '+', l: 'Students guided' },
              { n: c2, s: '+', l: 'Roadmaps generated' },
              { n: c3, s: '+', l: 'Career paths' },
              { n: c4, s: '%', l: 'Success rate' },
            ].map((s, i) => (
              <div
                key={i}
                className={`stat-cell ${statsIn ? 'show' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="stat-num">
                  {s.n.toLocaleString()}<span>{s.s}</span>
                </div>
                <div className="stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="features" ref={featRef}>
          <div className="features-inner">
            <div className="section-header">
              <div className="section-label">Features</div>
              <h2 className="section-title">
                Everything you need to<br />
                <span className="gradient-text">build your career</span>
              </h2>
            </div>
            <div className="features-grid">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className={`feat-card ${featIn ? 'show' : ''}`}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <span className="feat-icon">{f.icon}</span>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="steps" ref={stepsRef}>
          <div className="steps-inner">
            <div className="section-header">
              <div className="section-label">How it works</div>
              <h2 className="section-title">
                Your roadmap in <span className="gradient-text">4 steps</span>
              </h2>
            </div>
            <div className="steps-grid">
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  className={`step-card ${stepsIn ? 'show' : ''}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {i < STEPS.length - 1 && <div className="step-line" />}
                  <div className="step-num">Step {s.n}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHOWCASE ── */}
        <section className="showcase">
          <div className="showcase-inner">
            <div>
              <div className="showcase-label">
                <span className="section-label">Real results</span>
              </div>
              <h2 className="showcase-title">
                Structured paths.<br />
                <span className="gradient-text">Proven outcomes.</span>
              </h2>
              <p className="showcase-desc">
                Every roadmap is uniquely built by Gemini AI around your inputs —
                not a generic template, but a real plan for you.
              </p>
              <ul className="check-list">
                <li>Phase-by-phase structured learning</li>
                <li>Curated articles and YouTube resources</li>
                <li>Timeline estimate per phase</li>
                <li>Project ideas for your portfolio</li>
                <li>Full PDF export to your email</li>
              </ul>
              <Link to="/register" className="btn btn-primary btn-lg">
                Generate my roadmap →
              </Link>
            </div>
            <div className="showcase-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&q=80&auto=format"
                alt="Developer at work"
                className="showcase-img"
              />
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="testimonials">
          <div className="testimonials-inner">
            <div className="section-header">
              <div className="section-label">Testimonials</div>
              <h2 className="section-title">
                Trusted by <span className="gradient-text">thousands</span>
              </h2>
            </div>
            <div className="testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <div className="testi-card" key={i}>
                  <div className="testi-stars">★★★★★</div>
                  <p className="testi-text">{t.text}</p>
                  <div className="testi-author">
                    <div className="testi-avatar">{t.avatar}</div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-inner">
            <h2 className="cta-title">
              Ready to find your<br />
              <span className="gradient-text">career direction?</span>
            </h2>
            <p className="cta-desc">
              Join 15,000+ students who stopped guessing and started growing.
              Your personalized roadmap takes less than 2 minutes.
            </p>
            <div className="cta-btns">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get started free →
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                I have an account
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}