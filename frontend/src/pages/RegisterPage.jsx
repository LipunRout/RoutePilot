import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function RegisterPage() {
  const [step, setStep]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused] = useState(null)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    password: '', confirmPassword: '', goal: ''
  })

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const nextStep = (e) => {
    e.preventDefault()
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const strength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8)          s++
    if (/[A-Z]/.test(p))        s++
    if (/[0-9]/.test(p))        s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#00c97a'][strength]

  const goals = [
    { value: 'it',    label: 'IT & Tech',      icon: '💻' },
    { value: 'nonit', label: 'Non-IT Career',  icon: '📊' },
    { value: 'govt',  label: 'Government Job', icon: '🏛️' },
    { value: 'biz',   label: 'Business',       icon: '🚀' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ── PAGE ── */
        .rp-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
        }

        /* ── MAIN ── */
        .rp-main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 64px);
          margin-top: 64px;
        }

        /* ══════════════════════════
           LEFT PANEL
        ══════════════════════════ */
        .rp-left {
          position: relative;
          background: var(--bg-1);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
          overflow: hidden;
        }

        .rp-left-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 30% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .rp-left-orb {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,201,122,0.08) 0%, transparent 65%);
          top: 50%; left: 0;
          transform: translate(-30%, -50%);
          pointer-events: none;
        }

        .rp-left-orb2 {
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%);
          bottom: 10%; right: -10%;
          pointer-events: none;
        }

        .rp-left-content {
          position: relative; z-index: 1;
          max-width: 440px;
        }

        /* Brand */
        .rp-brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 40px;
          animation: rpFade 0.6s ease both;
        }

        .rp-brand-icon {
          width: 32px; height: 32px;
          border-radius: 9px;
          overflow: hidden;
        }

        .rp-brand-icon img {
          width: 100%; height: 100%;
          object-fit: cover;
        }

        .rp-brand-name {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.04em;
        }

        .rp-brand-pilot {
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Heading */
        .rp-heading {
          margin-bottom: 20px;
          animation: rpFade 0.6s ease 0.1s both;
        }

        .rp-heading-line1 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.8rem, 2.5vw, 2.6rem);
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.05em;
          line-height: 1.1;
          display: block;
        }

        .rp-heading-line2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 2.8vw, 3rem);
          font-weight: 600;
          font-style: italic;
          background: linear-gradient(135deg, #00c97a 20%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
          line-height: 1.1;
          display: block;
        }

        .rp-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: var(--text-2);
          line-height: 1.75;
          margin-bottom: 40px;
          animation: rpFade 0.6s ease 0.2s both;
        }

        /* Steps indicator */
        .rp-steps-indicator {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 40px;
          animation: rpFade 0.6s ease 0.25s both;
        }

        .rp-step-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          position: relative;
        }

        .rp-step-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 15px;
          top: 32px;
          width: 1px;
          height: 28px;
          background: var(--border);
        }

        .rp-step-num {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-2);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-3);
          flex-shrink: 0;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        .rp-step-item.done .rp-step-num {
          background: var(--primary);
          border-color: var(--primary);
          color: #000;
        }

        .rp-step-item.current .rp-step-num {
          background: var(--primary-dim);
          border-color: var(--primary);
          color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0,201,122,0.15);
        }

        .rp-step-text-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-3);
          letter-spacing: -0.02em;
          padding-top: 6px;
          transition: color 0.3s ease;
        }

        .rp-step-item.done  .rp-step-text-title,
        .rp-step-item.current .rp-step-text-title {
          color: var(--text-1);
        }

        .rp-step-text-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: var(--text-3);
          margin-top: 1px;
        }

        /* Quote */
        .rp-quote {
          padding: 20px 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          position: relative;
          animation: rpFade 0.6s ease 0.35s both;
        }

        .rp-quote::before {
          content: '"';
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          color: var(--primary);
          opacity: 0.25;
          position: absolute;
          top: -10px; left: 16px;
          line-height: 1;
        }

        .rp-quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-style: italic;
          color: var(--text-2);
          line-height: 1.65;
          margin-bottom: 12px;
          padding-top: 8px;
        }

        .rp-quote-author {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rp-quote-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.62rem;
          font-weight: 700;
          color: #000;
          flex-shrink: 0;
          font-family: 'Inter', sans-serif;
        }

        .rp-quote-name {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-1);
        }

        .rp-quote-role {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: var(--text-3);
        }

        /* ══════════════════════════
           RIGHT PANEL
        ══════════════════════════ */
        .rp-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 48px;
          position: relative;
          background: var(--bg);
        }

        .rp-right-orb {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 65%);
          bottom: -100px; right: -100px;
          pointer-events: none;
        }

        .rp-form-wrap {
          width: 100%;
          max-width: 420px;
          position: relative; z-index: 1;
        }

        /* Progress bar */
        .rp-progress {
          margin-bottom: 32px;
          animation: rpFade 0.5s ease both;
        }

        .rp-progress-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .rp-progress-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-2);
          letter-spacing: 0.02em;
        }

        .rp-progress-step {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: var(--text-3);
        }

        .rp-progress-bar {
          height: 3px;
          background: var(--bg-3);
          border-radius: 10px;
          overflow: hidden;
        }

        .rp-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00c97a, #0ea5e9);
          border-radius: 10px;
          transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
        }

        /* Form header */
        .rp-form-header {
          margin-bottom: 28px;
          animation: rpFade 0.6s ease 0.1s both;
        }

        .rp-form-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 8px;
        }

        .rp-form-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.04em;
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .rp-form-title-accent {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.65rem;
          font-weight: 600;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .rp-form-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: var(--text-2);
          margin-top: 6px;
        }

        /* Google btn */
        .rp-google-btn {
          width: 100%;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-1);
          cursor: pointer;
          transition: all 0.15s ease;
          margin-bottom: 20px;
          animation: rpFade 0.6s ease 0.2s both;
          text-decoration: none;
        }

        .rp-google-btn:hover {
          background: var(--bg-2);
          border-color: var(--border-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow);
        }

        /* Divider */
        .rp-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          animation: rpFade 0.6s ease 0.25s both;
        }

        .rp-divider-line { flex: 1; height: 1px; background: var(--border); }

        .rp-divider-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: var(--text-3);
          white-space: nowrap;
        }

        /* Form */
        .rp-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          animation: rpFade 0.6s ease 0.3s both;
        }

        .rp-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .rp-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .rp-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-2);
        }

        .rp-input-wrap { position: relative; }

        .rp-input {
          width: 100%;
          height: 42px;
          padding: 0 14px;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: var(--text-1);
          outline: none;
          transition: all 0.15s ease;
        }

        .rp-input.has-icon { padding-right: 50px; }

        .rp-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0,201,122,0.1);
          background: var(--bg-2);
        }

        .rp-input::placeholder { color: var(--text-3); }

        .rp-pass-toggle {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-3);
          font-size: 0.78rem;
          padding: 4px;
          transition: color 0.15s ease;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }

        .rp-pass-toggle:hover { color: var(--text-1); }

        /* Password strength */
        .rp-strength {
          margin-top: 6px;
        }

        .rp-strength-bars {
          display: flex;
          gap: 4px;
          margin-bottom: 4px;
        }

        .rp-strength-bar {
          flex: 1;
          height: 3px;
          border-radius: 3px;
          background: var(--bg-3);
          transition: background 0.3s ease;
        }

        .rp-strength-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        /* Goal selector */
        .rp-goal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 4px;
        }

        .rp-goal-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.825rem;
          font-weight: 500;
          color: var(--text-2);
          transition: all 0.15s ease;
          text-align: left;
        }

        .rp-goal-btn:hover {
          border-color: var(--border-hover);
          color: var(--text-1);
          background: var(--bg-2);
        }

        .rp-goal-btn.selected {
          border-color: var(--primary);
          background: var(--primary-dim);
          color: var(--primary);
        }

        .rp-goal-icon { font-size: 1rem; }

        /* Submit */
        .rp-submit {
          width: 100%;
          height: 44px;
          background: var(--primary);
          border: none;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.925rem;
          font-weight: 600;
          color: #000;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: -0.01em;
          margin-top: 6px;
          position: relative;
          overflow: hidden;
        }

        .rp-submit:hover {
          background: #00e089;
          box-shadow: 0 0 24px rgba(0,201,122,0.35);
          transform: translateY(-1px);
        }

        .rp-submit:active { transform: scale(0.98); }

        .rp-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Back btn */
        .rp-back {
          width: 100%;
          height: 40px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-2);
          cursor: pointer;
          transition: all 0.15s ease;
          margin-top: 6px;
        }

        .rp-back:hover {
          background: var(--surface);
          border-color: var(--border-hover);
          color: var(--text-1);
        }

        /* Spinner */
        .rp-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.2);
          border-top-color: #000;
          border-radius: 50%;
          animation: rpSpin 0.7s linear infinite;
        }

        @keyframes rpSpin { to { transform: rotate(360deg); } }

        /* Login link */
        .rp-login-link {
          text-align: center;
          margin-top: 18px;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: var(--text-3);
          animation: rpFade 0.6s ease 0.45s both;
        }

        .rp-login-link a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.15s ease;
        }

        .rp-login-link a:hover { opacity: 0.8; }

        .rp-terms {
          text-align: center;
          margin-top: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: var(--text-3);
          line-height: 1.6;
          animation: rpFade 0.6s ease 0.5s both;
        }

        .rp-terms a {
          color: var(--text-2);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .rp-terms a:hover { color: var(--text-1); }

        /* Step slide animation */
        .rp-step-panel {
          animation: rpSlideIn 0.35s cubic-bezier(0.4,0,0.2,1) both;
        }

        @keyframes rpSlideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes rpFade {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .rp-main { grid-template-columns: 1fr; }
          .rp-left { display: none; }
          .rp-right { padding: 40px 24px; align-items: flex-start; padding-top: 48px; }
        }

        @media (max-width: 480px) {
          .rp-right { padding: 28px 18px; }
          .rp-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rp-page">
        <Navbar />

        <div className="rp-main">

          {/* ══ LEFT PANEL ══ */}
          <div className="rp-left">
            <div className="rp-left-grid" />
            <div className="rp-left-orb" />
            <div className="rp-left-orb2" />

            <div className="rp-left-content">

              <div className="rp-brand">
                <div className="rp-brand-icon">
                  <img src="/favicon.png" alt="RoutePilot" />
                </div>
                <span className="rp-brand-name">
                  Route<span className="rp-brand-pilot">Pilot</span>
                </span>
              </div>

              <div className="rp-heading">
                <span className="rp-heading-line1">Start building your</span>
                <span className="rp-heading-line2">dream career today</span>
              </div>

              <p className="rp-sub">
                Join 15,000+ students who got a clear, AI-generated roadmap and
                stopped guessing their next step.
              </p>

              {/* Steps indicator */}
              <div className="rp-steps-indicator">
                {[
                  { n: '1', title: 'Your account',  desc: 'Name, email & password' },
                  { n: '2', title: 'Your goal',     desc: 'Pick your career domain' },
                  { n: '3', title: 'Get roadmap',   desc: 'AI builds your path' },
                ].map((s, i) => {
                  const st = i + 1 < step ? 'done' : i + 1 === step ? 'current' : ''
                  return (
                    <div key={i} className={`rp-step-item ${st}`}>
                      <div className="rp-step-num">
                        {i + 1 < step ? '✓' : s.n}
                      </div>
                      <div>
                        <div className="rp-step-text-title">{s.title}</div>
                        <div className="rp-step-text-desc">{s.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="rp-quote">
                <p className="rp-quote-text">
                  In 2 minutes I had a complete 6-month roadmap. Nothing else
                  comes close to what RoutePilot gave me for free.
                </p>
                <div className="rp-quote-author">
                  <div className="rp-quote-avatar">PP</div>
                  <div>
                    <div className="rp-quote-name">Priya Patel</div>
                    <div className="rp-quote-role">Data Analyst @ Amazon</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ══ RIGHT PANEL ══ */}
          <div className="rp-right">
            <div className="rp-right-orb" />

            <div className="rp-form-wrap">

              {/* Progress bar */}
              <div className="rp-progress">
                <div className="rp-progress-top">
                  <span className="rp-progress-label">
                    {step === 1 ? 'Account details' : 'Career goal'}
                  </span>
                  <span className="rp-progress-step">Step {step} of 2</span>
                </div>
                <div className="rp-progress-bar">
                  <div
                    className="rp-progress-fill"
                    style={{ width: `${(step / 2) * 100}%` }}
                  />
                </div>
              </div>

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <div className="rp-step-panel">

                  <div className="rp-form-header">
                    <div className="rp-form-eyebrow">Create account</div>
                    <div className="rp-form-title">
                      Join{' '}
                      <span className="rp-form-title-accent">RoutePilot</span>
                    </div>
                    <div className="rp-form-sub">
                      Already have an account?{' '}
                      <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                        Sign in →
                      </Link>
                    </div>
                  </div>

                  {/* Google */}
                  <button className="rp-google-btn">
                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>G</span>
                    Continue with Google
                  </button>

                  <div className="rp-divider">
                    <div className="rp-divider-line" />
                    <span className="rp-divider-text">or create with email</span>
                    <div className="rp-divider-line" />
                  </div>

                  <form className="rp-form" onSubmit={nextStep}>

                    <div className="rp-row">
                      <div className="rp-field">
                        <label className="rp-label">First name</label>
                        <input
                          type="text"
                          name="firstName"
                          className="rp-input"
                          placeholder="Arjun"
                          value={form.firstName}
                          onChange={handle}
                          onFocus={() => setFocused('firstName')}
                          onBlur={() => setFocused(null)}
                          required
                        />
                      </div>
                      <div className="rp-field">
                        <label className="rp-label">Last name</label>
                        <input
                          type="text"
                          name="lastName"
                          className="rp-input"
                          placeholder="Sharma"
                          value={form.lastName}
                          onChange={handle}
                          onFocus={() => setFocused('lastName')}
                          onBlur={() => setFocused(null)}
                          required
                        />
                      </div>
                    </div>

                    <div className="rp-field">
                      <label className="rp-label">Email address</label>
                      <input
                        type="email"
                        name="email"
                        className="rp-input"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handle}
                        required
                      />
                    </div>

                    <div className="rp-field">
                      <label className="rp-label">Password</label>
                      <div className="rp-input-wrap">
                        <input
                          type={showPass ? 'text' : 'password'}
                          name="password"
                          className="rp-input has-icon"
                          placeholder="Min. 8 characters"
                          value={form.password}
                          onChange={handle}
                          required
                        />
                        <button
                          type="button"
                          className="rp-pass-toggle"
                          onClick={() => setShowPass(p => !p)}
                        >
                          {showPass ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      {form.password && (
                        <div className="rp-strength">
                          <div className="rp-strength-bars">
                            {[1,2,3,4].map(n => (
                              <div
                                key={n}
                                className="rp-strength-bar"
                                style={{ background: n <= strength ? strengthColor : undefined }}
                              />
                            ))}
                          </div>
                          <span
                            className="rp-strength-label"
                            style={{ color: strengthColor }}
                          >
                            {strengthLabel}
                          </span>
                        </div>
                      )}
                    </div>

                    <button type="submit" className="rp-submit">
                      Continue <span>→</span>
                    </button>

                  </form>

                </div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <div className="rp-step-panel">

                  <div className="rp-form-header">
                    <div className="rp-form-eyebrow">Almost there</div>
                    <div className="rp-form-title">
                      What's your{' '}
                      <span className="rp-form-title-accent">career goal?</span>
                    </div>
                    <div className="rp-form-sub">
                      We'll personalize your roadmap based on this.
                    </div>
                  </div>

                  <form className="rp-form" onSubmit={submit}>

                    <div className="rp-field">
                      <label className="rp-label">Select your domain</label>
                      <div className="rp-goal-grid">
                        {goals.map(g => (
                          <button
                            key={g.value}
                            type="button"
                            className={`rp-goal-btn ${form.goal === g.value ? 'selected' : ''}`}
                            onClick={() => setForm(p => ({ ...p, goal: g.value }))}
                          >
                            <span className="rp-goal-icon">{g.icon}</span>
                            {g.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rp-field">
                      <label className="rp-label">
                        What role are you targeting? <span style={{color:'var(--text-3)'}}>(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="goal"
                        className="rp-input"
                        placeholder="e.g. Frontend Developer, Data Analyst..."
                        value={form.goal}
                        onChange={handle}
                      />
                    </div>

                    <button
                      type="submit"
                      className="rp-submit"
                      disabled={loading}
                    >
                      {loading
                        ? <><div className="rp-spinner" /> Creating account...</>
                        : <>Create account & get roadmap <span>→</span></>
                      }
                    </button>

                    <button
                      type="button"
                      className="rp-back"
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </button>

                  </form>

                </div>
              )}

              <div className="rp-login-link">
                Already registered?{' '}
                <Link to="/login">Sign in to your account</Link>
              </div>

              <div className="rp-terms">
                By creating an account you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>
              </div>

            </div>
          </div>

        </div>

        <Footer />
      </div>
    </>
  )
}