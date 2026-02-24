import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(null)

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ── PAGE ── */
        .lp-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
        }

        /* ── MAIN LAYOUT ── */
        .lp-main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 64px);
          margin-top: 64px;
        }

        /* ══════════════════════════
           LEFT PANEL
        ══════════════════════════ */
        .lp-left {
          position: relative;
          background: var(--bg-1);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
          overflow: hidden;
        }

        /* Grid background */
        .lp-left-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 30% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }

        /* Glow orb */
        .lp-left-orb {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,201,122,0.08) 0%, transparent 65%);
          top: 50%; left: 0;
          transform: translate(-30%, -50%);
          pointer-events: none;
        }

        .lp-left-content {
          position: relative; z-index: 1;
          max-width: 440px;
        }

        /* Brand badge */
        .lp-brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 40px;
          animation: lpFadeUp 0.6s ease both;
        }

        .lp-brand-icon {
          width: 32px; height: 32px;
          border-radius: 9px;
          overflow: hidden;
        }

        .lp-brand-icon img {
          width: 100%; height: 100%;
          object-fit: cover;
        }

        .lp-brand-name {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.04em;
        }

        .lp-brand-pilot {
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Heading */
        .lp-heading {
          margin-bottom: 20px;
          animation: lpFadeUp 0.6s ease 0.1s both;
        }

        .lp-heading-line1 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.8rem, 2.5vw, 2.6rem);
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.05em;
          line-height: 1.1;
          display: block;
        }

        .lp-heading-line2 {
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

        .lp-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: var(--text-2);
          line-height: 1.75;
          margin-bottom: 48px;
          animation: lpFadeUp 0.6s ease 0.2s both;
        }

        /* Feature list */
        .lp-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: lpFadeUp 0.6s ease 0.3s both;
        }

        .lp-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .lp-feature-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: var(--primary-dim);
          border: 1px solid var(--primary-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .lp-feature-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-1);
          margin-bottom: 2px;
          letter-spacing: -0.02em;
        }

        .lp-feature-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: var(--text-3);
          line-height: 1.5;
        }

        /* Testimonial quote */
        .lp-quote {
          margin-top: 48px;
          padding: 20px 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          position: relative;
          animation: lpFadeUp 0.6s ease 0.4s both;
        }

        .lp-quote::before {
          content: '"';
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          color: var(--primary);
          opacity: 0.3;
          position: absolute;
          top: -10px; left: 16px;
          line-height: 1;
        }

        .lp-quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-style: italic;
          color: var(--text-2);
          line-height: 1.65;
          margin-bottom: 12px;
          padding-top: 8px;
        }

        .lp-quote-author {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .lp-quote-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem;
          font-weight: 700;
          color: #000;
          flex-shrink: 0;
          font-family: 'Inter', sans-serif;
        }

        .lp-quote-name {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-1);
        }

        .lp-quote-role {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: var(--text-3);
        }

        /* ══════════════════════════
           RIGHT PANEL — FORM
        ══════════════════════════ */
        .lp-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 48px;
          position: relative;
          background: var(--bg);
        }

        .lp-right-orb {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 65%);
          bottom: -100px; right: -100px;
          pointer-events: none;
        }

        .lp-form-wrap {
          width: 100%;
          max-width: 400px;
          position: relative; z-index: 1;
        }

        /* Form header */
        .lp-form-header {
          margin-bottom: 32px;
          animation: lpFadeUp 0.6s ease 0.1s both;
        }

        .lp-form-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 8px;
        }

        .lp-form-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.04em;
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .lp-form-title-accent {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.75rem;
          font-weight: 600;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lp-form-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: var(--text-2);
          margin-top: 6px;
        }

        /* Google button */
        .lp-google-btn {
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
          margin-bottom: 24px;
          animation: lpFadeUp 0.6s ease 0.2s both;
          text-decoration: none;
        }

        .lp-google-btn:hover {
          background: var(--bg-2);
          border-color: var(--border-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow);
        }

        .lp-google-btn:active { transform: scale(0.98); }

        .lp-google-icon {
          font-size: 1rem;
        }

        /* Divider */
        .lp-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          animation: lpFadeUp 0.6s ease 0.25s both;
        }

        .lp-divider-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .lp-divider-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: var(--text-3);
          white-space: nowrap;
        }

        /* Form fields */
        .lp-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: lpFadeUp 0.6s ease 0.3s both;
        }

        .lp-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lp-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-2);
          letter-spacing: -0.01em;
        }

        .lp-input-wrap {
          position: relative;
        }

        .lp-input {
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

        .lp-input.has-icon { padding-right: 44px; }

        .lp-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0,201,122,0.1);
          background: var(--bg-2);
        }

        .lp-input::placeholder { color: var(--text-3); }

        /* Floating label effect */
        .lp-input-wrap.focused .lp-label {
          color: var(--primary);
        }

        /* Pass toggle */
        .lp-pass-toggle {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-3);
          font-size: 0.8rem;
          padding: 4px;
          transition: color 0.15s ease;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }

        .lp-pass-toggle:hover { color: var(--text-1); }

        /* Forgot */
        .lp-forgot {
          text-align: right;
          margin-top: -8px;
        }

        .lp-forgot a {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          color: var(--text-3);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .lp-forgot a:hover { color: var(--primary); }

        /* Submit button */
        .lp-submit {
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
          margin-top: 4px;
          position: relative;
          overflow: hidden;
        }

        .lp-submit::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.15);
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .lp-submit:hover::before { opacity: 1; }

        .lp-submit:hover {
          background: #00e089;
          box-shadow: 0 0 24px rgba(0,201,122,0.35);
          transform: translateY(-1px);
        }

        .lp-submit:active { transform: scale(0.98); }

        .lp-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Spinner */
        .lp-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.2);
          border-top-color: #000;
          border-radius: 50%;
          animation: lpSpin 0.7s linear infinite;
        }

        @keyframes lpSpin {
          to { transform: rotate(360deg); }
        }

        /* Register link */
        .lp-register-link {
          text-align: center;
          margin-top: 20px;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: var(--text-3);
          animation: lpFadeUp 0.6s ease 0.4s both;
        }

        .lp-register-link a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.15s ease;
        }

        .lp-register-link a:hover { opacity: 0.8; }

        /* Terms */
        .lp-terms {
          text-align: center;
          margin-top: 16px;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: var(--text-3);
          line-height: 1.6;
          animation: lpFadeUp 0.6s ease 0.45s both;
        }

        .lp-terms a {
          color: var(--text-2);
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.15s ease;
        }

        .lp-terms a:hover { color: var(--text-1); }

        /* ── ANIMATIONS ── */
        @keyframes lpFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .lp-main {
            grid-template-columns: 1fr;
          }
          .lp-left { display: none; }
          .lp-right {
            padding: 40px 24px;
            align-items: flex-start;
            padding-top: 48px;
          }
        }

        @media (max-width: 480px) {
          .lp-right { padding: 32px 20px; }
          .lp-form-title { font-size: 1.4rem; }
          .lp-form-title-accent { font-size: 1.55rem; }
        }
      `}</style>

      <div className="lp-page">
        <Navbar />

        <div className="lp-main">

          {/* ══ LEFT PANEL ══ */}
          <div className="lp-left">
            <div className="lp-left-grid" />
            <div className="lp-left-orb" />

            <div className="lp-left-content">

              {/* Brand */}
              <div className="lp-brand">
                <div className="lp-brand-icon">
                  <img src="/favicon.png" alt="RoutePilot" />
                </div>
                <span className="lp-brand-name">
                  Route<span className="lp-brand-pilot">Pilot</span>
                </span>
              </div>

              {/* Heading */}
              <div className="lp-heading">
                <span className="lp-heading-line1">Welcome back to</span>
                <span className="lp-heading-line2">your career path</span>
              </div>

              <p className="lp-sub">
                Sign in to access your personalized AI roadmap, track your
                progress and continue building the career you deserve.
              </p>

              {/* Features */}
              <div className="lp-features">
                {[
                  { icon: '⚡', title: 'AI-Generated Roadmaps', desc: 'Structured, phase-by-phase plans built for your goals.' },
                  { icon: '◎', title: '25+ Career Paths', desc: 'IT, Non-IT, Government and Business covered.' },
                  { icon: '✉', title: 'PDF Export', desc: 'Get your full roadmap delivered to your inbox.' },
                ].map((f, i) => (
                  <div className="lp-feature" key={i}>
                    <div className="lp-feature-icon">{f.icon}</div>
                    <div>
                      <div className="lp-feature-title">{f.title}</div>
                      <div className="lp-feature-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="lp-quote">
                <p className="lp-quote-text">
                  RoutePilot gave me the clarity I needed. I stopped watching
                  random tutorials and finally had a real plan.
                </p>
                <div className="lp-quote-author">
                  <div className="lp-quote-avatar">AS</div>
                  <div>
                    <div className="lp-quote-name">Arjun Sharma</div>
                    <div className="lp-quote-role">Frontend Dev @ Google</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ══ RIGHT PANEL — FORM ══ */}
          <div className="lp-right">
            <div className="lp-right-orb" />

            <div className="lp-form-wrap">

              {/* Header */}
              <div className="lp-form-header">
                <div className="lp-form-eyebrow">Welcome back</div>
                <div className="lp-form-title">
                  Sign in to{' '}
                  <span className="lp-form-title-accent">RoutePilot</span>
                </div>
                <div className="lp-form-sub">
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                    Create one free →
                  </Link>
                </div>
              </div>

              {/* Google OAuth */}
              <button className="lp-google-btn">
                <span className="lp-google-icon">G</span>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="lp-divider">
                <div className="lp-divider-line" />
                <span className="lp-divider-text">or sign in with email</span>
                <div className="lp-divider-line" />
              </div>

              {/* Form */}
              <form className="lp-form" onSubmit={submit}>

                {/* Email */}
                <div className="lp-field">
                  <label className="lp-label">Email address</label>
                  <div className={`lp-input-wrap ${focused === 'email' ? 'focused' : ''}`}>
                    <input
                      type="email"
                      name="email"
                      className="lp-input"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handle}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="lp-field">
                  <label className="lp-label">Password</label>
                  <div className={`lp-input-wrap ${focused === 'password' ? 'focused' : ''}`}>
                    <input
                      type={showPass ? 'text' : 'password'}
                      name="password"
                      className="lp-input has-icon"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handle}
                      onFocus={() => setFocused('password')}
                      onBlur={() => setFocused(null)}
                      required
                    />
                    <button
                      type="button"
                      className="lp-pass-toggle"
                      onClick={() => setShowPass(p => !p)}
                    >
                      {showPass ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Forgot */}
                <div className="lp-forgot">
                  <a href="#">Forgot password?</a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="lp-submit"
                  disabled={loading}
                >
                  {loading
                    ? <><div className="lp-spinner" /> Signing in...</>
                    : <>Sign in <span>→</span></>
                  }
                </button>

              </form>

              {/* Register */}
              <div className="lp-register-link">
                New to RoutePilot?{' '}
                <Link to="/register">Create a free account</Link>
              </div>

              {/* Terms */}
              <div className="lp-terms">
                By signing in you agree to our{' '}
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