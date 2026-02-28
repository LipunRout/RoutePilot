import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { generateRoadmap } from "../services/api";
import { useAuth } from "../context/AuthContext";

const LEVELS = [
  {
    value: "beginner",
    label: "Complete Beginner",
    icon: "🌱",
    desc: "No prior knowledge",
  },
  {
    value: "basic",
    label: "Some Basics",
    icon: "📖",
    desc: "Know fundamentals",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    icon: "⚡",
    desc: "Built small projects",
  },
  { value: "advanced", label: "Advanced", icon: "🚀", desc: "Work experience" },
];

const HOURS = [
  { value: "1-2", label: "1–2 hrs/day", icon: "🌙", desc: "Part-time" },
  { value: "3-4", label: "3–4 hrs/day", icon: "☀️", desc: "Moderate" },
  { value: "5-6", label: "5–6 hrs/day", icon: "🔥", desc: "Dedicated" },
  { value: "8+", label: "8+ hrs/day", icon: "💪", desc: "Full-time" },
];

const GOALS = [
  { value: "job", label: "Get a Job", icon: "💼" },
  { value: "freelance", label: "Freelancing", icon: "🌐" },
  { value: "switch", label: "Career Switch", icon: "🔄" },
  { value: "upskill", label: "Upskill / Grow", icon: "📈" },
  { value: "startup", label: "Build a Startup", icon: "🚀" },
  { value: "exam", label: "Crack an Exam", icon: "📋" },
];

export default function UserDetailsForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // ← get logged in user

  const catId = searchParams.get("category") || "it";
  const roleId = searchParams.get("role") || "frontend";

  // Get name from auth — no need to ask again
  const userName =
    user?.user_metadata?.first_name ||
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    age: "",
    city: "",
    level: "",
    hours: "",
    goal: "",
    timeline: "6",
    background: "",
    extra: "",
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await generateRoadmap({
        role: roleId.replace(/-/g, " "),
        category: catId,
        level: form.level,
        hours: form.hours,
        goal: form.goal,
        timeline: form.timeline,
        background: form.background,
        extra: form.extra,
      });
      navigate(`/roadmap/${data.roadmapId}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to generate roadmap. Please try again."
      );
      setLoading(false);
    }
  };

  const progress = (step / 2) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

        .ud-page { min-height:100vh; background:var(--bg); display:flex; flex-direction:column; }

        .ud-main { flex:1; padding:96px 24px 80px; position:relative; overflow:hidden; }

        .ud-grid-bg {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size:56px 56px;
          mask-image:radial-gradient(ellipse 100% 60% at 50% 0%, black 20%, transparent 100%);
          pointer-events:none;
        }

        .ud-radial {
          position:absolute; width:700px; height:400px; border-radius:50%;
          background:radial-gradient(circle, rgba(0,201,122,0.06) 0%, transparent 65%);
          top:-100px; left:50%; transform:translateX(-50%); pointer-events:none;
        }

        .ud-inner { max-width:720px; margin:0 auto; position:relative; z-index:1; }

        /* Breadcrumb */
        .ud-breadcrumb { display:flex; align-items:center; gap:8px; margin-bottom:32px; flex-wrap:wrap; animation:udFade 0.4s ease both; }
        .ud-bc-link { font-family:'Inter',sans-serif; font-size:0.78rem; color:var(--text-3); text-decoration:none; transition:color 0.15s ease; }
        .ud-bc-link:hover { color:var(--text-1); }
        .ud-bc-sep { font-size:0.7rem; color:var(--text-3); }
        .ud-bc-active { font-family:'Inter',sans-serif; font-size:0.78rem; font-weight:500; color:var(--text-2); }

        /* Progress dots */
        .ud-progress { margin-bottom:40px; animation:udFade 0.4s ease 0.05s both; }
        .ud-progress-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
        .ud-progress-steps { display:flex; gap:6px; align-items:center; }
        .ud-progress-dot {
          width:24px; height:24px; border-radius:50%;
          border:1px solid var(--border); background:var(--bg-2);
          display:flex; align-items:center; justify-content:center;
          font-family:'Inter',sans-serif; font-size:0.65rem; font-weight:600;
          color:var(--text-3); transition:all 0.3s ease;
        }
        .ud-progress-dot.done    { background:var(--primary); border-color:var(--primary); color:#000; }
        .ud-progress-dot.current { background:var(--primary-dim); border-color:var(--primary); color:var(--primary); box-shadow:0 0 0 3px rgba(0,201,122,0.15); }
        .ud-progress-line { width:20px; height:1px; background:var(--border); }
        .ud-progress-label { font-family:'Inter',sans-serif; font-size:0.72rem; color:var(--text-3); }
        .ud-progress-bar { height:3px; background:var(--bg-3); border-radius:10px; overflow:hidden; margin-top:10px; }
        .ud-progress-fill { height:100%; background:linear-gradient(90deg,#00c97a,#0ea5e9); border-radius:10px; transition:width 0.5s cubic-bezier(0.4,0,0.2,1); }

        /* Header */
        .ud-header { margin-bottom:36px; animation:udFade 0.4s ease 0.1s both; }
        .ud-eyebrow { font-family:'Inter',sans-serif; font-size:0.72rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--primary); margin-bottom:10px; }
        .ud-title-line1 { display:block; font-family:'Inter',sans-serif; font-size:clamp(1.6rem,3vw,2.2rem); font-weight:700; color:var(--text-1); letter-spacing:-0.05em; line-height:1.1; }
        .ud-title-line2 { display:block; font-family:'Cormorant Garamond',serif; font-size:clamp(1.8rem,3.5vw,2.6rem); font-weight:600; font-style:italic; background:linear-gradient(135deg,#00c97a 20%,#0ea5e9 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; letter-spacing:-0.02em; line-height:1.1; }
        .ud-subtitle { font-family:'Inter',sans-serif; font-size:0.925rem; color:var(--text-2); margin-top:10px; line-height:1.6; }

        /* Role chip */
        .ud-role-chip { display:inline-flex; align-items:center; gap:8px; padding:6px 14px; background:var(--primary-dim); border:1px solid var(--primary-border); border-radius:20px; font-family:'Inter',sans-serif; font-size:0.8rem; font-weight:600; color:var(--primary); margin-bottom:28px; animation:udFade 0.4s ease 0.15s both; }

        /* Form card */
        .ud-card { background:var(--bg-1); border:1px solid var(--border); border-radius:18px; padding:36px; margin-bottom:16px; animation:udSlide 0.35s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes udSlide { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .ud-section-title { font-family:'Inter',sans-serif; font-size:0.72rem; font-weight:600; letter-spacing:0.09em; text-transform:uppercase; color:var(--text-3); margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid var(--border); }

        /* Fields */
        .ud-field { display:flex; flex-direction:column; gap:6px; margin-bottom:20px; }
        .ud-field:last-child { margin-bottom:0; }
        .ud-label { font-family:'Inter',sans-serif; font-size:0.8rem; font-weight:500; color:var(--text-2); display:flex; align-items:center; gap:6px; }
        .ud-required { color:var(--primary); font-size:0.7rem; }
        .ud-optional { color:var(--text-3); font-size:0.7rem; font-weight:400; }

        .ud-input { width:100%; height:42px; padding:0 14px; background:var(--bg-2); border:1px solid var(--border); border-radius:10px; font-family:'Inter',sans-serif; font-size:0.875rem; color:var(--text-1); outline:none; transition:all 0.15s ease; }
        .ud-input:focus { border-color:var(--primary); box-shadow:0 0 0 3px rgba(0,201,122,0.1); background:var(--bg-3); }
        .ud-input::placeholder { color:var(--text-3); }

        .ud-textarea { width:100%; padding:12px 14px; background:var(--bg-2); border:1px solid var(--border); border-radius:10px; font-family:'Inter',sans-serif; font-size:0.875rem; color:var(--text-1); outline:none; transition:all 0.15s ease; resize:vertical; min-height:90px; line-height:1.6; }
        .ud-textarea:focus { border-color:var(--primary); box-shadow:0 0 0 3px rgba(0,201,122,0.1); background:var(--bg-3); }
        .ud-textarea::placeholder { color:var(--text-3); }

        .ud-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }

        /* Option grid */
        .ud-option-grid { display:grid; gap:8px; }
        .ud-option-grid.cols-4 { grid-template-columns:repeat(4,1fr); }
        .ud-option-grid.cols-3 { grid-template-columns:repeat(3,1fr); }

        .ud-option-btn { display:flex; flex-direction:column; align-items:flex-start; gap:4px; padding:12px 14px; background:var(--bg-2); border:1px solid var(--border); border-radius:11px; cursor:pointer; transition:all 0.15s ease; text-align:left; }
        .ud-option-btn:hover { border-color:var(--border-hover); background:var(--bg-3); }
        .ud-option-btn.selected { border-color:var(--primary); background:var(--primary-dim); }
        .ud-option-icon { font-size:1.1rem; line-height:1; margin-bottom:2px; }
        .ud-option-label { font-family:'Inter',sans-serif; font-size:0.825rem; font-weight:600; color:var(--text-1); letter-spacing:-0.02em; line-height:1.2; }
        .ud-option-btn.selected .ud-option-label { color:var(--primary); }
        .ud-option-desc { font-family:'Inter',sans-serif; font-size:0.72rem; color:var(--text-3); line-height:1.3; }
        .ud-option-btn.selected .ud-option-desc { color:var(--primary); opacity:0.7; }

        /* Goal btn */
        .ud-goal-btn { display:flex; align-items:center; gap:9px; padding:11px 14px; background:var(--bg-2); border:1px solid var(--border); border-radius:10px; cursor:pointer; font-family:'Inter',sans-serif; font-size:0.85rem; font-weight:500; color:var(--text-2); transition:all 0.15s ease; text-align:left; }
        .ud-goal-btn:hover { border-color:var(--border-hover); color:var(--text-1); background:var(--bg-3); }
        .ud-goal-btn.selected { border-color:var(--primary); background:var(--primary-dim); color:var(--primary); }

        /* Slider */
        .ud-slider-wrap { display:flex; flex-direction:column; gap:10px; }
        .ud-slider-labels { display:flex; justify-content:space-between; align-items:center; }
        .ud-slider-val { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:600; font-style:italic; background:linear-gradient(135deg,#00c97a,#0ea5e9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1; }
        .ud-slider-hint { font-family:'Inter',sans-serif; font-size:0.78rem; color:var(--text-3); }
        .ud-slider { -webkit-appearance:none; width:100%; height:4px; border-radius:4px; background:var(--bg-3); outline:none; cursor:pointer; }
        .ud-slider::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; border-radius:50%; background:var(--primary); cursor:pointer; border:3px solid var(--bg-1); box-shadow:0 0 0 1px var(--primary); transition:transform 0.15s ease; }
        .ud-slider::-webkit-slider-thumb:hover { transform:scale(1.2); }
        .ud-slider-marks { display:flex; justify-content:space-between; }
        .ud-slider-mark { font-family:'Inter',sans-serif; font-size:0.7rem; color:var(--text-3); }

        /* Error */
        .ud-error { padding:12px 16px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:10px; font-family:'Inter',sans-serif; font-size:0.85rem; color:#ef4444; display:flex; align-items:center; gap:8px; margin-bottom:4px; }

        /* Actions */
        .ud-actions { display:flex; gap:10px; margin-top:8px; animation:udFade 0.4s ease 0.3s both; }
        .ud-btn-submit { flex:1; height:48px; background:var(--primary); border:none; border-radius:12px; font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:600; color:#000; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.15s ease; letter-spacing:-0.01em; position:relative; overflow:hidden; }
        .ud-btn-submit:hover { background:#00e089; box-shadow:0 0 28px rgba(0,201,122,0.35); transform:translateY(-1px); }
        .ud-btn-submit:active { transform:scale(0.98); }
        .ud-btn-submit:disabled { opacity:0.55; cursor:not-allowed; transform:none; }

        .ud-btn-back { height:48px; padding:0 20px; background:transparent; border:1px solid var(--border); border-radius:12px; font-family:'Inter',sans-serif; font-size:0.875rem; font-weight:500; color:var(--text-2); cursor:pointer; transition:all 0.15s ease; white-space:nowrap; }
        .ud-btn-back:hover { background:var(--surface); border-color:var(--border-hover); color:var(--text-1); }

        /* Summary preview */
        .ud-preview { background:var(--bg-1); border:1px solid var(--border); border-radius:14px; padding:20px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:16px; animation:udFade 0.4s ease 0.25s both; flex-wrap:wrap; position:relative; overflow:hidden; }
        .ud-preview::before { content:''; position:absolute; top:-1px; left:20%; right:20%; height:1px; background:linear-gradient(90deg,transparent,var(--primary),transparent); }
        .ud-preview-item { display:flex; align-items:center; gap:10px; }
        .ud-preview-icon { width:32px; height:32px; border-radius:8px; background:var(--primary-dim); border:1px solid var(--primary-border); display:flex; align-items:center; justify-content:center; font-size:0.85rem; flex-shrink:0; }
        .ud-preview-label { font-family:'Inter',sans-serif; font-size:0.72rem; color:var(--text-3); line-height:1.2; }
        .ud-preview-val { font-family:'Inter',sans-serif; font-size:0.85rem; font-weight:600; color:var(--text-1); letter-spacing:-0.02em; }
        .ud-preview-sep { width:1px; height:28px; background:var(--border); flex-shrink:0; }

        /* Spinner */
        .ud-spinner { width:16px; height:16px; border:2px solid rgba(0,0,0,0.2); border-top-color:#000; border-radius:50%; animation:udSpin 0.7s linear infinite; }
        @keyframes udSpin { to { transform:rotate(360deg); } }
        @keyframes udFade { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

        @media (max-width:640px) {
          .ud-main { padding:88px 18px 60px; }
          .ud-card { padding:24px 18px; }
          .ud-row  { grid-template-columns:1fr; }
          .ud-option-grid.cols-4 { grid-template-columns:repeat(2,1fr); }
          .ud-option-grid.cols-3 { grid-template-columns:repeat(2,1fr); }
          .ud-preview { flex-direction:column; align-items:flex-start; }
          .ud-preview-sep { display:none; }
          .ud-actions { flex-direction:column-reverse; }
          .ud-btn-back { height:42px; }
        }
      `}</style>

      <div className="ud-page">
        <Navbar />

        <main className="ud-main">
          <div className="ud-grid-bg" />
          <div className="ud-radial" />

          <div className="ud-inner">
            {/* Breadcrumb */}
            <nav className="ud-breadcrumb">
              <Link to="/" className="ud-bc-link">
                Home
              </Link>
              <span className="ud-bc-sep">›</span>
              <Link to="/category" className="ud-bc-link">
                Domain
              </Link>
              <span className="ud-bc-sep">›</span>
              <Link to={`/roles?category=${catId}`} className="ud-bc-link">
                Role
              </Link>
              <span className="ud-bc-sep">›</span>
              <span className="ud-bc-active">Your Details</span>
            </nav>

            {/* Progress */}
            <div className="ud-progress">
              <div className="ud-progress-top">
                <div className="ud-progress-steps">
                  {[1, 2].map((n, i) => (
                    <span
                      key={n}
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      {i > 0 && <div className="ud-progress-line" />}
                      <div
                        className={`ud-progress-dot ${
                          n < step ? "done" : n === step ? "current" : ""
                        }`}
                      >
                        {n < step ? "✓" : n}
                      </div>
                    </span>
                  ))}
                </div>
                <span className="ud-progress-label">Step {step} of 2</span>
              </div>
              <div className="ud-progress-bar">
                <div
                  className="ud-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Header */}
            <div className="ud-header">
              <div className="ud-eyebrow">Step 3 of 4 — Your details</div>
              <span className="ud-title-line1">Tell us about</span>
              <span className="ud-title-line2">yourself</span>
              <p className="ud-subtitle">
                The more you share, the more personalized your roadmap will be.
                Fields marked <span style={{ color: "var(--primary)" }}>*</span>{" "}
                are required.
              </p>
            </div>

            {/* Role chip */}
            <div className="ud-role-chip">
              ✦ Building roadmap for:{" "}
              <strong style={{ textTransform: "capitalize" }}>
                {roleId.replace(/-/g, " ")}
              </strong>
            </div>

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <form onSubmit={nextStep}>
                <div className="ud-card">
                  <div className="ud-section-title">Basic Information</div>
                  {/* Show user's name instead of asking for it */}
                  <div
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--text-2)",
                      marginBottom: 16,
                      padding: "10px 14px",
                      background: "var(--bg-2)",
                      borderRadius: 9,
                      border: "1px solid var(--border)",
                    }}
                  >
                    👤 Creating roadmap for{" "}
                    <strong style={{ color: "var(--primary)" }}>
                      {userName}
                    </strong>
                  </div>
                  <div className="ud-row">
                    <div className="ud-field">
                      <label className="ud-label">
                        Age <span className="ud-required">*</span>
                      </label>
                      <input
                        type="number"
                        className="ud-input"
                        placeholder="22"
                        min="13"
                        max="65"
                        value={form.age}
                        onChange={(e) => set("age", e.target.value)}
                        required
                      />
                    </div>
                    <div className="ud-field">
                      <label className="ud-label">
                        City <span className="ud-optional">(optional)</span>
                      </label>
                      <input
                        type="text"
                        className="ud-input"
                        placeholder="Mumbai, India"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="ud-card">
                  <div className="ud-section-title">
                    Current Experience Level
                  </div>
                  <div className="ud-field">
                    <label className="ud-label">
                      Where are you right now?{" "}
                      <span className="ud-required">*</span>
                    </label>
                    <div className="ud-option-grid cols-4">
                      {LEVELS.map((l) => (
                        <button
                          key={l.value}
                          type="button"
                          className={`ud-option-btn ${
                            form.level === l.value ? "selected" : ""
                          }`}
                          onClick={() => set("level", l.value)}
                        >
                          <span className="ud-option-icon">{l.icon}</span>
                          <span className="ud-option-label">{l.label}</span>
                          <span className="ud-option-desc">{l.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ud-card">
                  <div className="ud-section-title">Daily Study Time</div>
                  <div className="ud-field">
                    <label className="ud-label">
                      How many hours daily?{" "}
                      <span className="ud-required">*</span>
                    </label>
                    <div className="ud-option-grid cols-4">
                      {HOURS.map((h) => (
                        <button
                          key={h.value}
                          type="button"
                          className={`ud-option-btn ${
                            form.hours === h.value ? "selected" : ""
                          }`}
                          onClick={() => set("hours", h.value)}
                        >
                          <span className="ud-option-icon">{h.icon}</span>
                          <span className="ud-option-label">{h.label}</span>
                          <span className="ud-option-desc">{h.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ud-actions">
                  <Link
                    to={`/roles?category=${catId}`}
                    className="ud-btn-back"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                  >
                    ← Back
                  </Link>
                  <button
                    type="submit"
                    className="ud-btn-submit"
                    disabled={!form.age || !form.level || !form.hours}
                  >
                    Continue →
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <form onSubmit={submit}>
                {/* Summary preview */}
                <div className="ud-preview">
                  {[
                    { icon:'👤', label:'Name', val: userName },
                    {
                      icon: "⚡",
                      label: "Level",
                      val: LEVELS.find((l) => l.value === form.level)?.label,
                    },
                    {
                      icon: "⏱",
                      label: "Daily time",
                      val: HOURS.find((h) => h.value === form.hours)?.label,
                    },
                  ].map((item, i) => (
                    <span key={item.label} style={{ display: "contents" }}>
                      <div className="ud-preview-item">
                        <div className="ud-preview-icon">{item.icon}</div>
                        <div>
                          <div className="ud-preview-label">{item.label}</div>
                          <div className="ud-preview-val">{item.val}</div>
                        </div>
                      </div>
                      {i < 2 && <div className="ud-preview-sep" />}
                    </span>
                  ))}
                </div>

                <div className="ud-card">
                  <div className="ud-section-title">Primary Goal</div>
                  <div className="ud-field">
                    <label className="ud-label">
                      What do you want to achieve?{" "}
                      <span className="ud-required">*</span>
                    </label>
                    <div className="ud-option-grid cols-3">
                      {GOALS.map((g) => (
                        <button
                          key={g.value}
                          type="button"
                          className={`ud-goal-btn ${
                            form.goal === g.value ? "selected" : ""
                          }`}
                          onClick={() => set("goal", g.value)}
                        >
                          <span>{g.icon}</span>
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ud-card">
                  <div className="ud-section-title">Target Timeline</div>
                  <div className="ud-field">
                    <label className="ud-label">
                      How many months to reach your goal?
                    </label>
                    <div className="ud-slider-wrap">
                      <div className="ud-slider-labels">
                        <div className="ud-slider-val">
                          {form.timeline} months
                        </div>
                        <div className="ud-slider-hint">
                          {form.timeline <= 3
                            ? "Intensive 🔥"
                            : form.timeline <= 6
                            ? "Balanced ⚡"
                            : form.timeline <= 9
                            ? "Comfortable ☀️"
                            : "Relaxed 🌙"}
                        </div>
                      </div>
                      <input
                        type="range"
                        className="ud-slider"
                        min="1"
                        max="18"
                        step="1"
                        value={form.timeline}
                        onChange={(e) => set("timeline", e.target.value)}
                        style={{
                          background: `linear-gradient(90deg, var(--primary) ${
                            ((form.timeline - 1) / 17) * 100
                          }%, var(--bg-3) ${
                            ((form.timeline - 1) / 17) * 100
                          }%)`,
                        }}
                      />
                      <div className="ud-slider-marks">
                        {["1m", "3m", "6m", "9m", "12m", "18m"].map((m) => (
                          <span key={m} className="ud-slider-mark">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ud-card">
                  <div className="ud-section-title">Additional Context</div>
                  <div className="ud-field">
                    <label className="ud-label">
                      Your background{" "}
                      <span className="ud-optional">(optional)</span>
                    </label>
                    <textarea
                      className="ud-textarea"
                      placeholder="e.g. CS graduate, 1 year IT support, familiar with Python basics..."
                      value={form.background}
                      onChange={(e) => set("background", e.target.value)}
                    />
                  </div>
                  <div className="ud-field">
                    <label className="ud-label">
                      Special requests{" "}
                      <span className="ud-optional">(optional)</span>
                    </label>
                    <textarea
                      className="ud-textarea"
                      placeholder="e.g. Focus on React & TypeScript, include system design..."
                      value={form.extra}
                      onChange={(e) => set("extra", e.target.value)}
                    />
                  </div>
                </div>

                {/* Error */}
                {error && <div className="ud-error">⚠️ {error}</div>}

                <div className="ud-actions">
                  <button
                    type="button"
                    className="ud-btn-back"
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="ud-btn-submit"
                    disabled={!form.goal || loading}
                  >
                    {loading ? (
                      <>
                        <div className="ud-spinner" /> Generating your
                        roadmap...
                      </>
                    ) : (
                      <>Generate my roadmap ✦</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
