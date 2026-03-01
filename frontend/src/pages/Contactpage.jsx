import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FAQS = [
  {
    q: 'How does RoutePilot generate my roadmap?',
    a: 'RoutePilot uses Groq AI to analyze your selected role, experience level, available time, and goals — then builds a structured, phase-by-phase learning plan tailored specifically to you.'
  },
  {
    q: 'Is RoutePilot free to use?',
    a: 'Yes! Core roadmap generation is completely free. You can generate roadmaps, track progress, and export PDFs at no cost.'
  },
  {
    q: 'How do I get my roadmap as a PDF?',
    a: 'After generating your roadmap, click the "Export PDF" option. The PDF will be delivered directly to your registered email within a few seconds.'
  },
  {
    q: 'What is a 1:1 mentorship call?',
    a: 'A 1:1 call is a personal 30-minute session with Lipun (founder) where you can get direct career advice, roadmap feedback, and guidance tailored to your specific situation.'
  },
  {
    q: 'Can I change my roadmap after generating it?',
    a: 'You can generate a new roadmap anytime from your dashboard. Each generation creates a fresh, AI-tailored plan based on your updated inputs.'
  },
  {
    q: 'How long does it take to get a response to my message?',
    a: 'We typically respond within 24 hours on weekdays. For urgent queries, booking a 1:1 call is the fastest way to get help.'
  },
]

export default function Contactpage() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setSending(true)
    // Simulate send — wire to your backend/email service
    await new Promise(r => setTimeout(r, 1800))
    setSending(false)
    setSent(true)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ── PAGE ── */
        .cp { background: var(--bg); min-height: 100vh; }

        .cp::before {
          content:''; position:fixed; inset:0; pointer-events:none; z-index:0; opacity:0.35;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }

        /* ── HERO ── */
        .cp-hero {
          padding: 140px 24px 80px; text-align: center;
          position: relative; overflow: hidden;
        }

        .cp-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%);
        }

        .cp-hero-orb {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,201,122,0.06) 0%, transparent 65%);
          top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;
        }

        .cp-hero-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }

        .cp-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 50px;
          background: var(--primary-dim); border: 1px solid var(--primary-border);
          font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600;
          color: var(--primary); letter-spacing: 0.05em; text-transform: uppercase;
          margin-bottom: 24px;
          animation: cpUp 0.6s ease both;
        }

        .cp-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--primary); animation: pulse 2s ease-in-out infinite;
        }

        .cp-hero-title {
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          letter-spacing: -0.05em; line-height: 1.1;
          color: var(--text-1); margin-bottom: 16px;
          animation: cpUp 0.6s ease 0.08s both;
        }

        .cp-hero-title em {
          font-family: 'Libre Baskerville', serif; font-style: italic;
          font-weight: 400; font-size: 1.1em;
          background: linear-gradient(135deg, #00c97a 20%, #0ea5e9 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cp-hero-sub {
          font-family: 'Inter', sans-serif; font-size: 1rem;
          color: var(--text-2); line-height: 1.75; max-width: 480px; margin: 0 auto;
          animation: cpUp 0.6s ease 0.15s both;
        }

        /* ── CONTACT CARDS ── */
        .cp-cards-wrap { padding: 0 24px 60px; position: relative; z-index: 1; }
        .cp-cards {
          max-width: 900px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }

        .cp-card {
          background: var(--bg-1); border: 1px solid var(--border);
          border-radius: 16px; padding: 28px 24px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 12px;
          transition: all 0.25s ease; position: relative; overflow: hidden;
          animation: cpUp 0.6s ease both;
        }

        .cp-card::before {
          content: ''; position: absolute; top: 0; left: 20%; right: 20%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,201,122,0.4), transparent);
          opacity: 0; transition: opacity 0.25s;
        }

        .cp-card:hover { border-color: rgba(0,201,122,0.3); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,201,122,0.08); }
        .cp-card:hover::before { opacity: 1; }

        .cp-card-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: var(--primary-dim); border: 1px solid var(--primary-border);
          display: flex; align-items: center; justify-content: center; font-size: 1.3rem;
        }

        .cp-card-title {
          font-family: 'Inter', sans-serif; font-size: 0.925rem;
          font-weight: 600; color: var(--text-1); letter-spacing: -0.02em;
        }

        .cp-card-val {
          font-family: 'Inter', sans-serif; font-size: 0.82rem; color: var(--text-2); line-height: 1.5;
        }

        .cp-card-val a { color: var(--primary); text-decoration: none; }
        .cp-card-val a:hover { text-decoration: underline; }

        /* ── MAIN GRID ── */
        .cp-main { padding: 0 24px 80px; position: relative; z-index: 1; }
        .cp-main-inner {
          max-width: 900px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
        }

        /* ── FORM PANEL ── */
        .cp-form-panel {
          background: var(--bg-1); border: 1px solid var(--border);
          border-radius: 20px; padding: 36px 32px; position: relative; overflow: hidden;
        }

        .cp-form-panel::before {
          content: ''; position: absolute; top: 0; left: 15%; right: 15%; height: 2px;
          background: linear-gradient(90deg, transparent, #00c97a, #0ea5e9, transparent);
        }

        .cp-panel-title {
          font-family: 'Inter', sans-serif; font-size: 1.2rem;
          font-weight: 700; color: var(--text-1); letter-spacing: -0.04em; margin-bottom: 4px;
        }

        .cp-panel-title em {
          font-family: 'Libre Baskerville', serif; font-style: italic; font-weight: 400;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .cp-panel-sub {
          font-family: 'Inter', sans-serif; font-size: 0.82rem;
          color: var(--text-3); margin-bottom: 28px; line-height: 1.6;
        }

        .cp-form { display: flex; flex-direction: column; gap: 14px; }

        .cp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .cp-field { display: flex; flex-direction: column; gap: 5px; }

        .cp-label {
          font-family: 'Inter', sans-serif; font-size: 0.78rem;
          font-weight: 500; color: var(--text-2);
        }

        .cp-input, .cp-textarea, .cp-select {
          background: var(--bg-2); border: 1px solid var(--border);
          border-radius: 10px; font-family: 'Inter', sans-serif;
          font-size: 0.875rem; color: var(--text-1); outline: none;
          transition: all 0.15s ease; width: 100%;
        }

        .cp-input, .cp-select { height: 42px; padding: 0 14px; }

        .cp-textarea {
          padding: 12px 14px; resize: vertical; min-height: 110px; line-height: 1.6;
        }

        .cp-input:focus, .cp-textarea:focus, .cp-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0,201,122,0.1);
          background: var(--bg-3);
        }

        .cp-input::placeholder, .cp-textarea::placeholder { color: var(--text-3); }

        .cp-select { appearance: none; cursor: pointer; }

        .cp-submit {
          width: 100%; height: 46px;
          background: var(--primary); border: none; border-radius: 10px;
          font-family: 'Inter', sans-serif; font-size: 0.925rem; font-weight: 600;
          color: #000; cursor: pointer; transition: all 0.2s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          position: relative; overflow: hidden; margin-top: 4px;
        }

        .cp-submit::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0; transition: opacity 0.2s;
        }

        .cp-submit:hover::after { opacity: 1; }
        .cp-submit:hover { background: #00e089; transform: translateY(-1px); box-shadow: 0 0 28px rgba(0,201,122,0.35); }
        .cp-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .cp-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.2); border-top-color: #000;
          border-radius: 50%; animation: cpSpin 0.7s linear infinite;
        }
        @keyframes cpSpin { to { transform: rotate(360deg); } }

        /* Sent state */
        .cp-sent {
          text-align: center; padding: 48px 24px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }

        .cp-sent-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: var(--primary-dim); border: 2px solid var(--primary-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem;
          animation: cpPop 0.4s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes cpPop { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }

        .cp-sent-title {
          font-family: 'Libre Baskerville', serif; font-style: italic;
          font-size: 1.5rem; color: var(--text-1);
        }

        .cp-sent-sub {
          font-family: 'Inter', sans-serif; font-size: 0.875rem;
          color: var(--text-2); line-height: 1.65; max-width: 280px;
        }

        /* ── RIGHT PANEL ── */
        .cp-right-panel { display: flex; flex-direction: column; gap: 24px; }

        /* 1:1 Call card */
        .cp-call-card {
          background: var(--bg-1); border: 1px solid var(--border);
          border-radius: 20px; padding: 28px; position: relative; overflow: hidden;
        }

        .cp-call-card::before {
          content: ''; position: absolute; top: 0; left: 15%; right: 15%; height: 2px;
          background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
        }

        .cp-call-top { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 16px; }

        .cp-call-avatar {
          width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
          background: linear-gradient(135deg, #00c97a22, #0ea5e922);
          border: 1px solid rgba(0,201,122,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
        }

        .cp-call-name {
          font-family: 'Inter', sans-serif; font-size: 1rem;
          font-weight: 700; color: var(--text-1); letter-spacing: -0.03em;
        }

        .cp-call-role {
          font-family: 'Inter', sans-serif; font-size: 0.78rem;
          color: var(--text-3); margin-top: 2px;
        }

        .cp-call-desc {
          font-family: 'Inter', sans-serif; font-size: 0.85rem;
          color: var(--text-2); line-height: 1.7; margin-bottom: 20px;
        }

        .cp-call-meta {
          display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;
        }

        .cp-call-pill {
          display: flex; align-items: center; gap: 5px;
          padding: 4px 10px; border-radius: 20px;
          background: var(--bg-2); border: 1px solid var(--border);
          font-family: 'Inter', sans-serif; font-size: 0.72rem;
          font-weight: 500; color: var(--text-2);
        }

        .cp-call-btn {
          width: 100%; height: 44px;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          border: none; border-radius: 10px;
          font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 700;
          color: #000; cursor: pointer; transition: all 0.2s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          text-decoration: none;
        }

        .cp-call-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,201,122,0.3); }

        /* Social links */
        .cp-social-card {
          background: var(--bg-1); border: 1px solid var(--border);
          border-radius: 20px; padding: 24px;
        }

        .cp-social-title {
          font-family: 'Inter', sans-serif; font-size: 0.875rem;
          font-weight: 600; color: var(--text-1); margin-bottom: 14px; letter-spacing: -0.02em;
        }

        .cp-socials { display: flex; flex-direction: column; gap: 10px; }

        .cp-social-link {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px; border-radius: 10px;
          background: var(--bg-2); border: 1px solid var(--border);
          text-decoration: none; transition: all 0.18s ease;
        }

        .cp-social-link:hover { border-color: var(--border-hover); background: var(--bg-3); transform: translateX(4px); }

        .cp-social-icon {
          width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; font-weight: 700;
        }

        .cp-social-icon.li { background: rgba(10,102,194,0.15); color: #0a66c2; }
        .cp-social-icon.gh { background: rgba(255,255,255,0.08); color: var(--text-1); }
        .cp-social-icon.tw { background: rgba(29,161,242,0.12); color: #1da1f2; }
        .cp-social-icon.em { background: var(--primary-dim); color: var(--primary); }

        .cp-social-name {
          font-family: 'Inter', sans-serif; font-size: 0.85rem;
          font-weight: 600; color: var(--text-1);
        }

        .cp-social-handle {
          font-family: 'Inter', sans-serif; font-size: 0.72rem; color: var(--text-3);
        }

        .cp-social-arrow { margin-left: auto; color: var(--text-3); font-size: 0.75rem; }

        /* ── FAQ ── */
        .cp-faq { padding: 0 24px 80px; position: relative; z-index: 1; }
        .cp-faq-inner { max-width: 760px; margin: 0 auto; }

        .cp-faq-head { text-align: center; margin-bottom: 40px; }

        .cp-faq-title {
          font-family: 'Inter', sans-serif; font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 700; letter-spacing: -0.04em; color: var(--text-1); margin-bottom: 8px;
        }

        .cp-faq-title em {
          font-family: 'Libre Baskerville', serif; font-style: italic; font-weight: 400;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .cp-faq-sub {
          font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--text-2);
        }

        .cp-faqs { display: flex; flex-direction: column; gap: 8px; }

        .cp-faq-item {
          background: var(--bg-1); border: 1px solid var(--border);
          border-radius: 14px; overflow: hidden; transition: border-color 0.2s;
        }

        .cp-faq-item.open { border-color: rgba(0,201,122,0.25); }

        .cp-faq-q {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 0.9rem;
          font-weight: 600; color: var(--text-1); letter-spacing: -0.02em;
          transition: color 0.15s; gap: 12px; user-select: none;
        }

        .cp-faq-q:hover { color: var(--primary); }
        .cp-faq-item.open .cp-faq-q { color: var(--primary); }

        .cp-faq-icon {
          width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
          background: var(--bg-2); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; color: var(--text-2);
          transition: all 0.25s ease;
        }

        .cp-faq-item.open .cp-faq-icon {
          background: var(--primary-dim); border-color: var(--primary-border);
          color: var(--primary); transform: rotate(45deg);
        }

        .cp-faq-a {
          padding: 0 20px; max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease, padding 0.25s ease;
        }

        .cp-faq-item.open .cp-faq-a {
          max-height: 200px; padding: 0 20px 18px;
        }

        .cp-faq-a-text {
          font-family: 'Inter', sans-serif; font-size: 0.875rem;
          color: var(--text-2); line-height: 1.75;
          border-top: 1px solid var(--border); padding-top: 14px;
        }

        /* ── ANIMATIONS ── */
        @keyframes cpUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .cp-cards      { grid-template-columns: 1fr; }
          .cp-main-inner { grid-template-columns: 1fr; gap: 24px; }
          .cp-row        { grid-template-columns: 1fr; }
          .cp-hero       { padding: 110px 20px 60px; }
          .cp-form-panel { padding: 28px 20px; }
        }

        @media (max-width: 480px) {
          .cp-cards      { grid-template-columns: 1fr; }
          .cp-hero-title { font-size: 2rem; }
        }
      `}</style>

      <div className="cp">
        <Navbar />

        {/* ── HERO ── */}
        <section className="cp-hero">
          <div className="cp-hero-grid" />
          <div className="cp-hero-orb" />
          <div className="cp-hero-inner">
            <div className="cp-badge">
              <span className="cp-badge-dot" />
              Get in touch
            </div>
            <h1 className="cp-hero-title">
              We'd love to <em>hear from you</em>
            </h1>
            <p className="cp-hero-sub">
              Whether you have a question, feedback, or just want to say hi —
              reach out and we'll get back to you within 24 hours.
            </p>
          </div>
        </section>

        {/* ── CONTACT CARDS ── */}
        <section className="cp-cards-wrap">
          <div className="cp-cards">
            {[
              { icon:'✉', title:'Email Us',     val: <><a href="mailto:lipunrout001@gmail.com">support@routepilot.com</a><br/>We reply within 24 hrs</> },
              { icon:'◷', title:'Response Time', val: 'Mon–Fri, 9am–6pm IST\nTypically within 24 hours' },
              { icon:'◎', title:'Based in',      val: 'Bhubaneswar, Odisha\nIndia 🇮🇳' },
            ].map((c, i) => (
              <div className="cp-card" key={i} style={{ animationDelay:`${i*0.1}s` }}>
                <div className="cp-card-icon">{c.icon}</div>
                <div className="cp-card-title">{c.title}</div>
                <div className="cp-card-val">{c.val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MAIN: FORM + RIGHT ── */}
        <section className="cp-main">
          <div className="cp-main-inner">

            {/* FORM */}
            <div className="cp-form-panel">
              {sent ? (
                <div className="cp-sent">
                  <div className="cp-sent-icon">✓</div>
                  <div className="cp-sent-title">Message sent!</div>
                  <div className="cp-sent-sub">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </div>
                  <button
                    className="cp-submit"
                    style={{ marginTop:8, maxWidth:200 }}
                    onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }) }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <>
                  <div className="cp-panel-title">Send a <em>message</em></div>
                  <div className="cp-panel-sub">Fill in the form and we'll respond as soon as possible.</div>

                  <form className="cp-form" onSubmit={submit}>
                    <div className="cp-row">
                      <div className="cp-field">
                        <label className="cp-label">Your name</label>
                        <input name="name" className="cp-input" placeholder="Lipun Rout"
                          value={form.name} onChange={handle} required />
                      </div>
                      <div className="cp-field">
                        <label className="cp-label">Email address</label>
                        <input type="email" name="email" className="cp-input" placeholder="you@example.com"
                          value={form.email} onChange={handle} required />
                      </div>
                    </div>

                    <div className="cp-field">
                      <label className="cp-label">Subject</label>
                      <select name="subject" className="cp-select" value={form.subject} onChange={handle} required>
                        <option value="">Select a topic...</option>
                        <option>Question about my roadmap</option>
                        <option>Technical issue</option>
                        <option>Feedback / Suggestion</option>
                        <option>1:1 Mentorship inquiry</option>
                        <option>Partnership / Collaboration</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="cp-field">
                      <label className="cp-label">Message</label>
                      <textarea name="message" className="cp-textarea"
                        placeholder="Tell us what's on your mind..."
                        value={form.message} onChange={handle} required />
                    </div>

                    <button type="submit" className="cp-submit" disabled={sending}>
                      {sending
                        ? <><div className="cp-spinner" /> Sending...</>
                        : <>Send message →</>
                      }
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* RIGHT PANEL */}
            <div className="cp-right-panel">

              {/* 1:1 Call */}
              <div className="cp-call-card">
                <div className="cp-call-top">
                  <div className="cp-call-avatar">👤</div>
                  <div>
                    <div className="cp-call-name">Lipun Rout</div>
                    <div className="cp-call-role">Founder · RoutePilot</div>
                  </div>
                </div>
                <p className="cp-call-desc">
                  Book a personal 30-minute session to get direct career advice,
                  roadmap feedback, and guidance tailored to your situation.
                </p>
                <div className="cp-call-meta">
                  <span className="cp-call-pill">⏱ 30 minutes</span>
                  <span className="cp-call-pill">🎯 Career guidance</span>
                  <span className="cp-call-pill">✦ Free session</span>
                </div>
                <a
                  href="https://topmate.io/lipun_rout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-call-btn"
                >
                  📅 Book a 1:1 Call
                </a>
              </div>

              {/* Socials */}
              <div className="cp-social-card">
                <div className="cp-social-title">Find us online</div>
                <div className="cp-socials">
                  {[
                    { icon:'in', cls:'li', name:'LinkedIn',  handle:'linkedin.com/in/lipun-rout', href:'https://www.linkedin.com/in/lipun-rout-a564b6285/' },
                    { icon:'GH', cls:'gh', name:'GitHub',    handle:'github.com/lipunrout',       href:'https://github.com/LipunRout' },
                    { icon:'𝕏',  cls:'tw', name:'Twitter/X', handle:'@lipunrout',                 href:'https://twitter.com/lipunrout' },
                    { icon:'✉',  cls:'em', name:'Email',     handle:'support@routepilot.com',     href:'mailto:lipunrout001@gmail.com' },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="cp-social-link">
                      <div className={`cp-social-icon ${s.cls}`}>{s.icon}</div>
                      <div>
                        <div className="cp-social-name">{s.name}</div>
                        <div className="cp-social-handle">{s.handle}</div>
                      </div>
                      <span className="cp-social-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="cp-faq">
          <div className="cp-faq-inner">
            <div className="cp-faq-head">
              <h2 className="cp-faq-title">Frequently asked <em>questions</em></h2>
              <p className="cp-faq-sub">Can't find what you're looking for? Send us a message above.</p>
            </div>
            <div className="cp-faqs">
              {FAQS.map((f, i) => (
                <div key={i} className={`cp-faq-item ${openFaq === i ? 'open' : ''}`}>
                  <div className="cp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{f.q}</span>
                    <div className="cp-faq-icon">+</div>
                  </div>
                  <div className="cp-faq-a">
                    <div className="cp-faq-a-text">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}