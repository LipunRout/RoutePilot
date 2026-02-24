import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ── MOCK ROADMAP DATA ── */
const MOCK_ROADMAP = {
  role: "Frontend Developer",
  category: "IT & Technology",
  timeline: "6 months",
  totalPhases: 5,
  overview:
    "A structured, phase-by-phase path to becoming a job-ready Frontend Developer. Each phase builds on the last — from fundamentals to production-grade projects.",
  phases: [
    {
      id: 1,
      title: "Web Foundations",
      subtitle: "The bedrock of everything",
      duration: "3–4 weeks",
      topics: [
        "HTML5 Semantics",
        "CSS3 & Flexbox",
        "CSS Grid",
        "Responsive Design",
        "Browser DevTools",
        "Basic Accessibility",
      ],
      outcome: "Build fully responsive static websites from scratch.",
      resources: [
        { type: "article", label: "MDN Web Docs — HTML Basics", url: "#" },
        { type: "video", label: "Kevin Powell — CSS Full Course", url: "#" },
        {
          type: "article",
          label: "CSS Tricks — Complete Flexbox Guide",
          url: "#",
        },
        {
          type: "video",
          label: "Traversy Media — Responsive Design",
          url: "#",
        },
      ],
      project: "Build a fully responsive portfolio homepage",
      difficulty: "Beginner",
      color: "#00c97a",
    },
    {
      id: 2,
      title: "JavaScript Mastery",
      subtitle: "Make the web interactive",
      duration: "5–6 weeks",
      topics: [
        "ES6+ Syntax",
        "DOM Manipulation",
        "Events & Listeners",
        "Fetch API / AJAX",
        "Promises & Async/Await",
        "Local Storage",
        "Error Handling",
      ],
      outcome: "Write clean, modern JavaScript and interact with APIs.",
      resources: [
        {
          type: "article",
          label: "JavaScript.info — The Modern JS Tutorial",
          url: "#",
        },
        { type: "video", label: "Akshay Saini — Namaste JavaScript", url: "#" },
        { type: "article", label: "MDN — Fetch API Guide", url: "#" },
        { type: "video", label: "Fun Fun Function — Functional JS", url: "#" },
      ],
      project: "Build a Weather App using OpenWeather API",
      difficulty: "Beginner–Intermediate",
      color: "#0ea5e9",
    },
    {
      id: 3,
      title: "React Ecosystem",
      subtitle: "The industry standard library",
      duration: "6–7 weeks",
      topics: [
        "React Fundamentals",
        "Hooks (useState, useEffect)",
        "Context API",
        "React Router",
        "Custom Hooks",
        "React Query",
        "Component Patterns",
      ],
      outcome: "Build complex, state-managed single-page applications.",
      resources: [
        { type: "article", label: "React Official Docs", url: "#" },
        { type: "video", label: "Codevolution — React Full Course", url: "#" },
        { type: "article", label: "TkDodo's Blog — React Query", url: "#" },
        { type: "video", label: "Jack Herrington — Custom Hooks", url: "#" },
      ],
      project: "Build a full CRUD Task Manager with React",
      difficulty: "Intermediate",
      color: "#a855f7",
    },
    {
      id: 4,
      title: "Tooling & Performance",
      subtitle: "Ship production-grade code",
      duration: "3–4 weeks",
      topics: [
        "Git & GitHub",
        "Vite / Webpack",
        "TypeScript Basics",
        "Testing with Vitest",
        "Performance Optimization",
        "Web Vitals",
        "SEO Basics",
      ],
      outcome: "Write maintainable, tested and performant code like a pro.",
      resources: [
        { type: "article", label: "TypeScript Handbook", url: "#" },
        {
          type: "video",
          label: "Fireship — TypeScript in 100 seconds",
          url: "#",
        },
        { type: "article", label: "web.dev — Core Web Vitals", url: "#" },
        { type: "video", label: "Theo — Testing in React", url: "#" },
      ],
      project: "Refactor Task Manager with TypeScript + add tests",
      difficulty: "Intermediate",
      color: "#f59e0b",
    },
    {
      id: 5,
      title: "Portfolio & Job Prep",
      subtitle: "Land your first role",
      duration: "3–4 weeks",
      topics: [
        "Portfolio Website",
        "Resume Building",
        "GitHub Profile",
        "LinkedIn Optimization",
        "System Design Basics",
        "DSA for Interviews",
        "Mock Interviews",
      ],
      outcome:
        "Be fully job-ready with a strong portfolio and interview skills.",
      resources: [
        { type: "article", label: "Frontend Interview Handbook", url: "#" },
        {
          type: "video",
          label: "Clément Mihailescu — How to Get a Job",
          url: "#",
        },
        {
          type: "article",
          label: "Josh Comeau — Making a Dev Portfolio",
          url: "#",
        },
        { type: "video", label: "NeetCode — DSA for Frontend Devs", url: "#" },
      ],
      project: "Launch polished portfolio with 3 case studies",
      difficulty: "All levels",
      color: "#ef4444",
    },
  ],
};

const DIFF_COLOR = {
  Beginner: "#00c97a",
  "Beginner–Intermediate": "#0ea5e9",
  Intermediate: "#a855f7",
  "All levels": "#f59e0b",
  Advanced: "#ef4444",
};

export default function RoadmapPage() {
  const [searchParams] = useSearchParams();
  const [openPhase, setOpen] = useState(1);
  const [completed, setComp] = useState({});
  const [generating, setGen] = useState(true);
  const [emailSent, setEmail] = useState(false);
  const [copyDone, setCopy] = useState(false);
  const [activeTab, setTab] = useState("roadmap");
  const progressRef = useRef(null);

  const roadmap = MOCK_ROADMAP;

  /* Simulate AI generation */
  useEffect(() => {
    const t = setTimeout(() => setGen(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const togglePhase = (id) => setOpen((p) => (p === id ? null : id));

  const toggleComplete = (phaseId) =>
    setComp((p) => ({ ...p, [phaseId]: !p[phaseId] }));

  const completedCount = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((completedCount / roadmap.totalPhases) * 100);

  const handleEmail = () => {
    setEmail(true);
    setTimeout(() => setEmail(false), 3000);
  };

  const handleCopy = () => {
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  if (generating) return <GeneratingScreen />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

        .rm-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
        }

        /* ── HERO ── */
        .rm-hero {
          margin-top: 64px;
          padding: 56px 24px 0;
          position: relative;
          overflow: hidden;
          background: var(--bg-1);
          border-bottom: 1px solid var(--border);
        }

        .rm-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .rm-hero-radial {
          position: absolute;
          width: 600px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,201,122,0.07) 0%, transparent 65%);
          top: -100px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .rm-hero-inner {
          max-width: 1000px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* Breadcrumb */
        .rm-bc {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
          animation: rmFade 0.4s ease both;
        }

        .rm-bc a {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; color: var(--text-3);
          text-decoration: none; transition: color 0.15s ease;
        }

        .rm-bc a:hover { color: var(--text-1); }
        .rm-bc-sep { font-size: 0.7rem; color: var(--text-3); }
        .rm-bc-active {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 500; color: var(--text-2);
        }

        /* Hero content */
        .rm-hero-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 32px;
          align-items: flex-start;
          padding-bottom: 0;
        }

        .rm-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 4px 12px;
          background: var(--primary-dim);
          border: 1px solid var(--primary-border);
          border-radius: 20px;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          color: var(--primary);
          margin-bottom: 14px;
          animation: rmFade 0.4s ease 0.05s both;
        }

        .rm-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--primary);
          animation: rmPulse 2s ease-in-out infinite;
        }

        @keyframes rmPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.7); }
        }

        .rm-title {
          margin-bottom: 12px;
          animation: rmFade 0.4s ease 0.1s both;
        }

        .rm-title-line1 {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.05em;
          line-height: 1.1;
        }

        .rm-title-line2 {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 600;
          font-style: italic;
          background: linear-gradient(135deg, #00c97a 20%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .rm-overview {
          font-family: 'Inter', sans-serif;
          font-size: 0.925rem;
          color: var(--text-2);
          line-height: 1.7;
          max-width: 600px;
          margin-bottom: 24px;
          animation: rmFade 0.4s ease 0.15s both;
        }

        /* Meta pills */
        .rm-meta {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-bottom: 28px;
          animation: rmFade 0.4s ease 0.2s both;
        }

        .rm-meta-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 20px;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          color: var(--text-2);
        }

        /* Actions */
        .rm-hero-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
          animation: rmFade 0.4s ease 0.25s both;
          flex-shrink: 0;
        }

        .rm-action-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 0 16px; height: 38px;
          border-radius: 9px;
          font-family: 'Inter', sans-serif;
          font-size: 0.825rem; font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
          text-decoration: none;
        }

        .rm-action-primary {
          background: var(--primary); border: none; color: #000;
        }

        .rm-action-primary:hover {
          background: #00e089;
          box-shadow: 0 0 18px rgba(0,201,122,0.3);
          transform: translateY(-1px);
        }

        .rm-action-secondary {
          background: var(--bg-2);
          border: 1px solid var(--border);
          color: var(--text-2);
        }

        .rm-action-secondary:hover {
          background: var(--bg-3);
          border-color: var(--border-hover);
          color: var(--text-1);
        }

        /* Progress bar */
        .rm-progress-strip {
          display: flex; align-items: center; gap: 16px;
          padding: 16px 0;
          border-top: 1px solid var(--border);
          margin-top: 4px;
          animation: rmFade 0.4s ease 0.3s both;
        }

        .rm-progress-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          color: var(--text-2);
          white-space: nowrap;
        }

        .rm-progress-bar-wrap {
          flex: 1; height: 4px;
          background: var(--bg-3);
          border-radius: 4px; overflow: hidden;
        }

        .rm-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00c97a, #0ea5e9);
          border-radius: 4px;
          transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
        }

        .rm-progress-pct {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-style: italic;
          color: var(--primary);
          white-space: nowrap;
        }

        /* ── TABS ── */
        .rm-tabs {
          display: flex; gap: 0;
          border-bottom: 1px solid var(--border);
          padding: 0;
          background: var(--bg-1);
          position: sticky;
          top: 64px;
          z-index: 100;
          animation: rmFade 0.4s ease 0.35s both;
        }

        .rm-tab {
          padding: 12px 20px;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem; font-weight: 500;
          color: var(--text-3);
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .rm-tab:hover { color: var(--text-1); }

        .rm-tab.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
          font-weight: 600;
        }

        /* ── MAIN BODY ── */
        .rm-body {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 24px 80px;
          width: 100%;
        }

        /* ── PHASE ACCORDION ── */
        .rm-phases {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rm-phase {
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          animation: rmFade 0.4s ease both;
        }

        .rm-phase.open {
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        .rm-phase-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          cursor: pointer;
          transition: background 0.15s ease;
          user-select: none;
        }

        .rm-phase-header:hover { background: var(--bg-2); }

        .rm-phase-num {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          flex-shrink: 0;
          transition: all 0.2s ease;
          border: 1px solid;
        }

        .rm-phase-info { flex: 1; min-width: 0; }

        .rm-phase-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.975rem; font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin-bottom: 2px;
          transition: color 0.2s ease;
        }

        .rm-phase-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem; font-style: italic;
          color: var(--text-3);
          line-height: 1;
          transition: color 0.2s ease;
        }

        .rm-phase-meta {
          display: flex; align-items: center; gap: 8px;
          flex-shrink: 0;
        }

        .rm-phase-duration {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 500;
          color: var(--text-3);
          padding: 3px 9px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--bg-2);
          white-space: nowrap;
        }

        .rm-phase-check {
          width: 26px; height: 26px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-2);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .rm-phase-check.done {
          background: var(--primary);
          border-color: var(--primary);
          color: #000;
          font-weight: 700;
        }

        .rm-phase-chevron {
          font-size: 0.78rem;
          color: var(--text-3);
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
          flex-shrink: 0;
        }

        .rm-phase.open .rm-phase-chevron {
          transform: rotate(90deg);
        }

        /* Phase body */
        .rm-phase-body {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1);
        }

        .rm-phase.open .rm-phase-body {
          max-height: 1000px;
        }

        .rm-phase-content {
          padding: 0 24px 24px;
          border-top: 1px solid var(--border);
        }

        /* Topics */
        .rm-topics-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-3);
          margin: 20px 0 10px;
        }

        .rm-topics {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-bottom: 20px;
        }

        .rm-topic {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          color: var(--text-2);
          padding: 4px 11px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 20px;
          transition: all 0.15s ease;
        }

        .rm-topic:hover {
          color: var(--text-1);
          border-color: var(--border-hover);
          background: var(--bg-3);
        }

        /* Outcome */
        .rm-outcome {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 14px 16px;
          background: var(--primary-dim);
          border: 1px solid var(--primary-border);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .rm-outcome-icon {
          font-size: 0.9rem; flex-shrink: 0; margin-top: 1px;
        }

        .rm-outcome-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem; color: var(--primary);
          line-height: 1.55;
        }

        /* Resources */
        .rm-resources {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 20px;
        }

        .rm-resource {
          display: flex; align-items: center; gap: 9px;
          padding: 10px 12px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 9px;
          text-decoration: none;
          transition: all 0.15s ease;
          cursor: pointer;
        }

        .rm-resource:hover {
          background: var(--bg-3);
          border-color: var(--border-hover);
          transform: translateY(-1px);
        }

        .rm-resource-type {
          width: 26px; height: 26px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; font-weight: 700;
          flex-shrink: 0;
        }

        .rm-resource-type.article {
          background: rgba(14,165,233,0.15);
          border: 1px solid rgba(14,165,233,0.3);
          color: #0ea5e9;
        }

        .rm-resource-type.video {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.25);
          color: #ef4444;
        }

        .rm-resource-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          color: var(--text-2);
          line-height: 1.3;
          flex: 1; min-width: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        /* Project box */
        .rm-project {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 14px 16px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 10px;
          border-left: 3px solid var(--primary);
        }

        .rm-project-icon { font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }

        .rm-project-content {}

        .rm-project-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--primary); margin-bottom: 3px;
        }

        .rm-project-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem; font-weight: 500;
          color: var(--text-1);
          letter-spacing: -0.01em;
        }

        /* ── OVERVIEW TAB ── */
        .rm-overview-tab {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .rm-ov-card {
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 24px;
          animation: rmFade 0.4s ease both;
        }

        .rm-ov-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: var(--text-3); margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }

        .rm-timeline-list {
          display: flex; flex-direction: column; gap: 0;
        }

        .rm-timeline-item {
          display: flex; gap: 16px;
          position: relative;
        }

        .rm-timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 15px; top: 32px;
          width: 1px; height: calc(100% - 8px);
          background: var(--border);
        }

        .rm-tl-dot {
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          flex-shrink: 0;
          border: 1px solid;
          margin-bottom: 24px;
        }

        .rm-tl-info { padding-top: 4px; flex: 1; }

        .rm-tl-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem; font-weight: 600;
          color: var(--text-1); letter-spacing: -0.02em;
          margin-bottom: 2px;
        }

        .rm-tl-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem; font-style: italic;
          color: var(--text-3);
        }

        .rm-tl-duration {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: var(--text-3);
          padding: 2px 8px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--bg-2);
          height: fit-content;
          margin-top: 4px;
          white-space: nowrap;
        }

        /* Stats grid */
        .rm-stats-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 1px;
          background: var(--border);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .rm-stat-cell {
          background: var(--bg-1);
          padding: 20px;
          text-align: center;
        }

        .rm-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 600; font-style: italic;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1; margin-bottom: 4px;
        }

        .rm-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem; color: var(--text-3);
        }

        /* ── TOAST ── */
        .rm-toast {
          position: fixed;
          bottom: 32px; left: 50%;
          transform: translateX(-50%) translateY(0);
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 20px;
          display: flex; align-items: center; gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem; font-weight: 500;
          color: var(--text-1);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          z-index: 9999;
          animation: rmToastIn 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
          white-space: nowrap;
        }

        @keyframes rmToastIn {
          from { opacity:0; transform: translateX(-50%) translateY(16px); }
          to   { opacity:1; transform: translateX(-50%) translateY(0); }
        }

        /* ── ANIMATIONS ── */
        @keyframes rmFade {
          from { opacity:0; transform: translateY(14px); }
          to   { opacity:1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .rm-hero-content { grid-template-columns: 1fr; }
          .rm-hero-actions { flex-direction: row; align-items: flex-start; flex-wrap: wrap; }
          .rm-resources { grid-template-columns: 1fr; }
          .rm-stats-grid { grid-template-columns: 1fr; }
          .rm-body { padding: 28px 18px 60px; }
          .rm-phase-header { padding: 16px 18px; }
          .rm-phase-content { padding: 0 18px 18px; }
          .rm-phase-meta { display: none; }
        }
      `}</style>

      <div className="rm-page">
        <Navbar />

        {/* ── HERO ── */}
        <div className="rm-hero">
          <div className="rm-hero-grid" />
          <div className="rm-hero-radial" />

          <div className="rm-hero-inner">
            {/* Breadcrumb */}
            <nav className="rm-bc">
              <Link to="/">Home</Link>
              <span className="rm-bc-sep">›</span>
              <Link to="/category">Domain</Link>
              <span className="rm-bc-sep">›</span>
              <Link to="/roles">Role</Link>
              <span className="rm-bc-sep">›</span>
              <Link to="/details">Details</Link>
              <span className="rm-bc-sep">›</span>
              <span className="rm-bc-active">Roadmap</span>
            </nav>

            <div className="rm-hero-content">
              <div>
                {/* Badge */}
                <div className="rm-badge">
                  <span className="rm-badge-dot" />
                  AI-Generated · {roadmap.category}
                </div>

                {/* Title */}
                <div className="rm-title">
                  <span className="rm-title-line1">Your personalized</span>
                  <span className="rm-title-line2">{roadmap.role} Roadmap</span>
                </div>

                {/* Overview */}
                <p className="rm-overview">{roadmap.overview}</p>

                {/* Meta pills */}
                <div className="rm-meta">
                  <span className="rm-meta-pill">📅 {roadmap.timeline}</span>
                  <span className="rm-meta-pill">
                    ◎ {roadmap.totalPhases} phases
                  </span>
                  <span className="rm-meta-pill">
                    ✦{" "}
                    {roadmap.phases.reduce((a, p) => a + p.resources.length, 0)}{" "}
                    resources
                  </span>
                  <span className="rm-meta-pill">
                    🏗️ {roadmap.totalPhases} projects
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="rm-hero-actions">
                <button
                  className="rm-action-btn rm-action-primary"
                  onClick={handleEmail}
                >
                  {emailSent ? "✓ Sent!" : "✉ Email PDF"}
                </button>
                <button
                  className="rm-action-btn rm-action-secondary"
                  onClick={handleCopy}
                >
                  {copyDone ? "✓ Copied!" : "⎘ Copy link"}
                </button>
                <Link
                  to="/category"
                  className="rm-action-btn rm-action-secondary"
                >
                  ↺ New roadmap
                </Link>
              </div>
            </div>

            {/* Progress strip */}
            <div className="rm-progress-strip" ref={progressRef}>
              <span className="rm-progress-label">
                {completedCount}/{roadmap.totalPhases} phases complete
              </span>
              <div className="rm-progress-bar-wrap">
                <div
                  className="rm-progress-bar-fill"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="rm-progress-pct">{pct}%</span>
            </div>

            {/* Tabs */}
            <div className="rm-tabs">
              {[
                { id: "roadmap", label: "◈ Roadmap" },
                { id: "overview", label: "◎ Overview" },
              ].map((t) => (
                <button
                  key={t.id}
                  className={`rm-tab ${activeTab === t.id ? "active" : ""}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="rm-body">
          {/* ── ROADMAP TAB ── */}
          {activeTab === "roadmap" && (
            <div className="rm-phases">
              {roadmap.phases.map((phase, i) => {
                const isOpen = openPhase === phase.id;
                const isDone = completed[phase.id];

                return (
                  <div
                    key={phase.id}
                    className={`rm-phase ${isOpen ? "open" : ""}`}
                    style={{
                      borderColor: isOpen ? phase.color + "55" : undefined,
                      animationDelay: `${i * 0.07}s`,
                    }}
                  >
                    {/* Header */}
                    <div
                      className="rm-phase-header"
                      onClick={() => togglePhase(phase.id)}
                    >
                      {/* Phase number */}
                      <div
                        className="rm-phase-num"
                        style={{
                          background: isDone
                            ? phase.color
                            : isOpen
                            ? phase.color + "22"
                            : "var(--bg-2)",
                          borderColor:
                            isOpen || isDone ? phase.color : "var(--border)",
                          color: isDone
                            ? "#000"
                            : isOpen
                            ? phase.color
                            : "var(--text-3)",
                        }}
                      >
                        {isDone ? "✓" : `0${phase.id}`}
                      </div>

                      {/* Info */}
                      <div className="rm-phase-info">
                        <div
                          className="rm-phase-title"
                          style={{ color: isOpen ? phase.color : undefined }}
                        >
                          {phase.title}
                        </div>
                        <div
                          className="rm-phase-subtitle"
                          style={{
                            color: isOpen ? phase.color + "aa" : undefined,
                          }}
                        >
                          {phase.subtitle}
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="rm-phase-meta">
                        <span className="rm-phase-duration">
                          ⏱ {phase.duration}
                        </span>
                        <div
                          className={`rm-phase-check ${isDone ? "done" : ""}`}
                          style={
                            isDone
                              ? {}
                              : {
                                  borderColor: isOpen
                                    ? phase.color + "66"
                                    : undefined,
                                }
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComplete(phase.id);
                          }}
                          title="Mark complete"
                        >
                          {isDone ? "✓" : ""}
                        </div>
                      </div>

                      <div className="rm-phase-chevron">›</div>
                    </div>

                    {/* Body */}
                    <div className="rm-phase-body">
                      <div className="rm-phase-content">
                        {/* Topics */}
                        <div className="rm-topics-label">Topics covered</div>
                        <div className="rm-topics">
                          {phase.topics.map((t) => (
                            <span
                              key={t}
                              className="rm-topic"
                              style={{
                                borderColor: phase.color + "44",
                                color: phase.color,
                                background: phase.color + "11",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Outcome */}
                        <div className="rm-outcome">
                          <span className="rm-outcome-icon">🎯</span>
                          <span className="rm-outcome-text">
                            <strong>Phase outcome:</strong> {phase.outcome}
                          </span>
                        </div>

                        {phase.resources.map((r, i) => (
                          <a
                            key={i}
                            href={r.url}
                            className="rm-resource"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div className={`rm-resource-type ${r.type}`}>
                              {r.type === "video" ? "▶" : "📄"}
                            </div>
                            <span className="rm-resource-label">{r.label}</span>
                          </a>
                        ))}

                        {/* Project */}
                        <div className="rm-project">
                          <span className="rm-project-icon">🏗️</span>
                          <div className="rm-project-content">
                            <div className="rm-project-label">
                              Phase project
                            </div>
                            <div className="rm-project-text">
                              {phase.project}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <div className="rm-overview-tab">
              {/* Stats */}
              <div className="rm-ov-card" style={{ animationDelay: "0s" }}>
                <div className="rm-ov-card-title">Roadmap at a glance</div>
                <div className="rm-stats-grid">
                  {[
                    { n: roadmap.totalPhases, l: "Phases" },
                    { n: roadmap.timeline, l: "Timeline" },
                    {
                      n: `${roadmap.phases.reduce(
                        (a, p) => a + p.resources.length,
                        0
                      )}+`,
                      l: "Resources",
                    },
                  ].map((s) => (
                    <div className="rm-stat-cell" key={s.l}>
                      <div className="rm-stat-num">{s.n}</div>
                      <div className="rm-stat-label">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="rm-ov-card" style={{ animationDelay: "0.08s" }}>
                <div className="rm-ov-card-title">Phase timeline</div>
                <div className="rm-timeline-list">
                  {roadmap.phases.map((phase, i) => (
                    <div key={phase.id} className="rm-timeline-item">
                      <div
                        className="rm-tl-dot"
                        style={{
                          background: completed[phase.id]
                            ? phase.color
                            : phase.color + "22",
                          borderColor: phase.color,
                          color: completed[phase.id] ? "#000" : phase.color,
                        }}
                      >
                        {completed[phase.id] ? "✓" : i + 1}
                      </div>
                      <div className="rm-tl-info">
                        <div className="rm-tl-title">{phase.title}</div>
                        <div className="rm-tl-sub">{phase.subtitle}</div>
                      </div>
                      <div className="rm-tl-duration">{phase.duration}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div
                className="rm-ov-card"
                style={{
                  animationDelay: "0.16s",
                  textAlign: "center",
                  padding: "36px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: "20%",
                    right: "20%",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, var(--primary), transparent)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-1)",
                    letterSpacing: "-0.03em",
                    marginBottom: 6,
                  }}
                >
                  Want expert guidance?
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    color: "var(--text-2)",
                    marginBottom: 20,
                  }}
                >
                  Book a 1:1 session with a career mentor
                </div>
                <button
                  className="rm-action-btn rm-action-primary"
                  style={{ margin: "0 auto" }}
                >
                  Book a call →
                </button>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* Toasts */}
      {emailSent && (
        <div className="rm-toast">✉ Roadmap PDF sent to your email!</div>
      )}
      {copyDone && <div className="rm-toast">✓ Link copied to clipboard!</div>}
    </>
  );
}

/* ── GENERATING SCREEN ── */
function GeneratingScreen() {
  const [dots, setDots] = useState(0);
  const steps = [
    "Analyzing your profile...",
    "Mapping career phases...",
    "Curating resources...",
    "Building your roadmap...",
  ];
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setDots((p) => (p + 1) % 4), 400);
    const t2 = setInterval(
      () => setStepIdx((p) => Math.min(p + 1, steps.length - 1)),
      500
    );
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Inter:wght@400;500;600;700&display=swap');
        .gen-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .gen-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
          pointer-events: none;
        }
        .gen-orb {
          position: absolute;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,201,122,0.08) 0%, transparent 65%);
          top:50%; left:50%; transform:translate(-50%,-50%);
          pointer-events:none;
        }
        .gen-inner {
          text-align: center; position: relative; z-index: 1;
          padding: 40px 24px;
        }
        .gen-ring-wrap {
          position: relative;
          width: 80px; height: 80px;
          margin: 0 auto 28px;
        }
        .gen-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #00c97a;
          border-right-color: #0ea5e9;
          animation: genSpin 1s linear infinite;
        }
        .gen-ring-inner {
          position: absolute; inset: 8px;
          border-radius: 50%;
          border: 1px solid transparent;
          border-top-color: rgba(0,201,122,0.4);
          animation: genSpin 1.5s linear infinite reverse;
        }
        .gen-ring-logo {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .gen-ring-logo img {
          width: 36px; height: 36px;
          border-radius: 9px; object-fit: cover;
        }
        @keyframes genSpin { to { transform: rotate(360deg); } }
        .gen-title-line1 {
          font-family: 'Inter', sans-serif;
          font-size: 1.6rem; font-weight: 700;
          color: var(--text-1); letter-spacing: -0.05em;
          display: block; line-height: 1.1; margin-bottom: 2px;
        }
        .gen-title-line2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem; font-weight: 600; font-style: italic;
          background: linear-gradient(135deg, #00c97a 20%, #0ea5e9 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block; line-height: 1.1; margin-bottom: 20px;
        }
        .gen-step {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem; color: var(--text-2);
          margin-bottom: 24px; min-height: 22px;
          transition: all 0.3s ease;
        }
        .gen-steps-track {
          display: flex; flex-direction: column; gap: 8px;
          max-width: 260px; margin: 0 auto;
        }
        .gen-step-item {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem; color: var(--text-3);
          transition: color 0.3s ease;
        }
        .gen-step-item.done { color: var(--text-2); }
        .gen-step-item.active { color: var(--primary); font-weight: 500; }
        .gen-step-icon {
          width: 18px; height: 18px; border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-2);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.55rem; flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .gen-step-item.done  .gen-step-icon { background: var(--primary); border-color: var(--primary); color: #000; }
        .gen-step-item.active .gen-step-icon { background: var(--primary-dim); border-color: var(--primary); color: var(--primary); }
      `}</style>
      <div className="gen-page">
        <div className="gen-grid" />
        <div className="gen-orb" />
        <div className="gen-inner">
          <div className="gen-ring-wrap">
            <div className="gen-ring" />
            <div className="gen-ring-inner" />
            <div className="gen-ring-logo">
              <img src="/favicon.png" alt="RoutePilot" />
            </div>
          </div>
          <span className="gen-title-line1">Building your</span>
          <span className="gen-title-line2">personalized roadmap</span>
          <div className="gen-step">
            {steps[stepIdx]}
            {"".padEnd(dots, ".")}
          </div>
          <div className="gen-steps-track">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`gen-step-item ${
                  i < stepIdx ? "done" : i === stepIdx ? "active" : ""
                }`}
              >
                <div className="gen-step-icon">
                  {i < stepIdx ? "✓" : i === stepIdx ? "◉" : ""}
                </div>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
