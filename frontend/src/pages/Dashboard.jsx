import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { getUserRoadmaps } from "../services/api";

/* ── Greeting ── */
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
};


/* ── Build achievements from real roadmap data ── */
const buildAchievements = (roadmaps) => {
  const totalRoadmaps = roadmaps.length;
  const completedRoadmaps = roadmaps.filter(
    (r) => r.status === "completed"
  ).length;
  const totalPhasesDone = roadmaps.reduce(
    (a, r) => a + (r.completed_phases || 0),
    0
  );
  const xp = totalRoadmaps * 100;

  // Days since first roadmap (simulate streak logic)
  const dates = roadmaps
    .map((r) => new Date(r.created_at))
    .sort((a, b) => b - a);

  const daysSinceFirst =
    dates.length > 0
      ? Math.floor(
          (new Date() - dates[dates.length - 1]) / (1000 * 60 * 60 * 24)
        )
      : 0;

  return [
    {
      icon: "⚡",
      label: "First roadmap",
      earned: totalRoadmaps >= 1,
      desc:
        totalRoadmaps >= 1
          ? "Created your first roadmap!"
          : "Create your first roadmap",
    },
    {
      icon: "🔥",
      label: "7-day streak",
      earned: daysSinceFirst >= 7,
      desc:
        daysSinceFirst >= 7
          ? "Used RoutePilot for 7+ days!"
          : `${daysSinceFirst}/7 days`,
    },
    {
      icon: "✦",
      label: "Phase master",
      earned: totalPhasesDone >= 5,
      desc:
        totalPhasesDone >= 5
          ? "Completed 5+ phases!"
          : `${totalPhasesDone}/5 phases done`,
    },
    {
      icon: "🚀",
      label: "Roadmap complete",
      earned: completedRoadmaps >= 1,
      desc:
        completedRoadmaps >= 1
          ? "Finished a full roadmap!"
          : "Complete a full roadmap",
    },
    {
      icon: "📚",
      label: "3 roadmaps",
      earned: totalRoadmaps >= 3,
      desc:
        totalRoadmaps >= 3
          ? "Created 3 roadmaps!"
          : `${totalRoadmaps}/3 roadmaps`,
    },
    {
      icon: "🎯",
      label: "30-day learner",
      earned: daysSinceFirst >= 30,
      desc:
        daysSinceFirst >= 30
          ? "Learning for 30+ days!"
          : `${daysSinceFirst}/30 days`,
    },
    {
      icon: "💎",
      label: "500 XP",
      earned: xp >= 500,
      desc: xp >= 500 ? "Earned 500+ XP!" : `${xp}/500 XP`,
    },
    {
      icon: "🏆",
      label: "All phases done",
      earned: completedRoadmaps >= 1 && totalPhasesDone >= 10,
      desc:
        completedRoadmaps >= 1
          ? "Mastered all phases!"
          : "Complete all phases in a roadmap",
    },
  ];
};

/* ── Build activity chart from real roadmap dates ── */
const buildActivity = (roadmaps) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const counts = [0, 0, 0, 0, 0, 0, 0];

  roadmaps.forEach((r) => {
    const d = new Date(r.last_active_at || r.created_at);
    // getDay() returns 0=Sun...6=Sat, convert to Mon=0
    const idx = d.getDay() === 0 ? 6 : d.getDay() - 1;
    counts[idx] += 1;
  });

  return days.map((day, i) => ({ day, hrs: counts[i] }));
};
const CAT_COLORS = {
  it: {
    color: "#00c97a",
    glow: "rgba(0,201,122,0.12)",
    border: "rgba(0,201,122,0.25)",
    icon: "💻",
  },
  nonit: {
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.12)",
    border: "rgba(14,165,233,0.25)",
    icon: "📊",
  },
  govt: {
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
    icon: "🏛️",
  },
  biz: {
    color: "#a855f7",
    glow: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.25)",
    icon: "🚀",
  },
  default: {
    color: "#00c97a",
    glow: "rgba(0,201,122,0.12)",
    border: "rgba(0,201,122,0.25)",
    icon: "🗺️",
  },
};

const useCounter = (target, duration = 1800, active = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return val;
};

const EmptyRoadmaps = () => (
  <div
    style={{
      padding: "40px 24px",
      textAlign: "center",
      background: "var(--bg-2)",
      border: "1px dashed var(--border)",
      borderRadius: 12,
    }}
  >
    <div style={{ fontSize: "2.2rem", marginBottom: 10 }}>🗺️</div>
    <div
      style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: "0.95rem",
        fontWeight: 600,
        color: "var(--text-1)",
        marginBottom: 6,
        letterSpacing: "-0.02em",
      }}
    >
      No roadmaps yet
    </div>
    <div
      style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: "0.82rem",
        color: "var(--text-3)",
        marginBottom: 20,
        lineHeight: 1.6,
      }}
    >
      Generate your first AI-powered career roadmap
    </div>
    <Link
      to="/category"
      style={{
        padding: "9px 22px",
        background: "var(--primary)",
        color: "#000",
        borderRadius: 9,
        fontFamily: "'Inter',sans-serif",
        fontSize: "0.825rem",
        fontWeight: 600,
        textDecoration: "none",
        display: "inline-block",
      }}
    >
      Create roadmap →
    </Link>
  </div>
);

export default function Dashboard() {
  const [achievements, setAchievements] = useState([]);
const [activity, setActivity] = useState([
  { day: "Mon", hrs: 0 },
  { day: "Tue", hrs: 0 },
  { day: "Wed", hrs: 0 },
  { day: "Thu", hrs: 0 },
  { day: "Fri", hrs: 0 },
  { day: "Sat", hrs: 0 },
  { day: "Sun", hrs: 0 },
]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setTab] = useState("overview");
  const [statsOn, setStatsOn] = useState(false);
  const statsRef = useRef(null);
  const [roadmaps, setRoadmaps] = useState([]);
  const [loadingRoads, setLoadingRoads] = useState(true);

  /* ── Fetch real roadmaps ── */
  useEffect(() => {
    getUserRoadmaps()
      .then(({ data }) => {
        const mapped = data.roadmaps.map((rm) => {
          const cat = CAT_COLORS[rm.category] || CAT_COLORS.default;
          return {
            id: rm.id,
            role: rm.role,
            category: rm.category,
            color: cat.color,
            glow: cat.glow,
            border: cat.border,
            icon: cat.icon,
            progress: rm.progress || 0,
            completedPhases: rm.completed_phases || 0,
            totalPhases: rm.roadmap_data?.totalPhases || 5,
            lastActive: rm.last_active_at
              ? new Date(rm.last_active_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })
              : "Never",
            timeline: rm.form_data?.timeline
              ? `${rm.form_data.timeline} months`
              : "—",
            status: rm.status || "active",
          };
        });
        setRoadmaps(mapped);
        setAchievements(buildAchievements(data.roadmaps)); // ← add
        setActivity(buildActivity(data.roadmaps)); // ← add
      })
      .catch(console.error)
      .finally(() => setLoadingRoads(false));
  }, []);

  /* ── Build USER from real auth ── */
  const USER = {
    name: user?.user_metadata?.first_name
      ? `${user.user_metadata.first_name} ${
          user.user_metadata.last_name || ""
        }`.trim()
      : user?.email?.split("@")[0] || "User",
    email: user?.email || "",
    avatar: user?.user_metadata?.first_name
      ? `${user.user_metadata.first_name[0]}${
          user.user_metadata.last_name?.[0] || ""
        }`.toUpperCase()
      : (user?.email?.[0] || "U").toUpperCase(),
    joinDate: user?.created_at
      ? new Date(user.created_at).toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        })
      : "—",
    streak: 0,
    totalHours: 0,
    xp: roadmaps.length * 100,
  };

  /* ── Recent activity from real roadmaps ── */
  const UPDATES =
    roadmaps.length > 0
      ? roadmaps.slice(0, 5).map((rm) => ({
          icon: "✦",
          text: `Roadmap created: ${rm.role}`,
          time: rm.lastActive,
          color: rm.color,
        }))
      : [
          {
            icon: "⚡",
            text: "No activity yet — create your first roadmap!",
            time: "now",
            color: "#00c97a",
          },
        ];

  /* ── Intersection observer for stats ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsOn(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const cStreak = useCounter(USER.streak, 1400, statsOn);
  const cHours = useCounter(USER.totalHours, 1800, statsOn);
  const cXP = useCounter(USER.xp, 2000, statsOn);
  const cRoads = useCounter(roadmaps.length, 800, statsOn);
  const maxHrs = Math.max(...ACTIVITY.map((a) => a.hrs));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

        .db-page { min-height: 100vh; background: var(--bg); display: flex; flex-direction: column; }

        .db-hero {
          margin-top: 64px; background: var(--bg-1);
          border-bottom: 1px solid var(--border);
          padding: 40px 24px 0; position: relative; overflow: hidden;
        }

        .db-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 20%, transparent 100%);
          pointer-events: none;
        }

        .db-hero-orb {
          position: absolute; width: 500px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,201,122,0.06) 0%, transparent 65%);
          top: -80px; right: -100px; pointer-events: none;
        }

        .db-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

        .db-welcome {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 24px; margin-bottom: 28px; flex-wrap: wrap;
          animation: dbFade 0.5s ease both;
        }

        .db-avatar-row { display: flex; align-items: center; gap: 14px; }

        .db-avatar {
          width: 52px; height: 52px; border-radius: 50%;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 700;
          color: #000; flex-shrink: 0; box-shadow: 0 0 0 3px rgba(0,201,122,0.2);
        }

        .db-greeting { font-family: 'Inter', sans-serif; font-size: 0.78rem; color: var(--text-3); margin-bottom: 2px; }

        .db-name-line { display: flex; align-items: baseline; gap: 6px; }

        .db-name-inter {
          font-family: 'Inter', sans-serif; font-size: 1.4rem; font-weight: 700;
          color: var(--text-1); letter-spacing: -0.05em; line-height: 1.1;
        }

        .db-name-cormorant {
          font-family: 'Cormorant Garamond', serif; font-size: 1.6rem;
          font-weight: 600; font-style: italic; line-height: 1.1;
          background: linear-gradient(135deg, #00c97a 20%, #0ea5e9 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .db-welcome-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }

        .db-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 0 16px; height: 38px; border-radius: 9px;
          font-family: 'Inter', sans-serif; font-size: 0.825rem; font-weight: 500;
          cursor: pointer; transition: all 0.15s ease; text-decoration: none; white-space: nowrap;
        }

        .db-btn-primary { background: var(--primary); border: none; color: #000; }
        .db-btn-primary:hover { background: #00e089; box-shadow: 0 0 18px rgba(0,201,122,0.3); transform: translateY(-1px); }
        .db-btn-secondary { background: var(--bg-2); border: 1px solid var(--border); color: var(--text-2); }
        .db-btn-secondary:hover { background: var(--bg-3); border-color: var(--border-hover); color: var(--text-1); }

        .db-stats-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--border);
          border: 1px solid var(--border); border-bottom: none;
          border-radius: 14px 14px 0 0; overflow: hidden;
          animation: dbFade 0.5s ease 0.1s both;
        }

        .db-stat { background: var(--bg-1); padding: 20px 24px; text-align: center; transition: background 0.15s ease; }
        .db-stat:hover { background: var(--bg-2); }

        .db-stat-num {
          font-family: 'Cormorant Garamond', serif; font-size: 2rem;
          font-weight: 600; font-style: italic; line-height: 1; margin-bottom: 4px;
          background: linear-gradient(135deg, #00c97a, #0ea5e9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .db-stat-label { font-family: 'Inter', sans-serif; font-size: 0.75rem; color: var(--text-3); font-weight: 400; }

        .db-tabs {
          display: flex; border-bottom: 1px solid var(--border);
          background: var(--bg-1); position: sticky; top: 64px; z-index: 100;
          animation: dbFade 0.5s ease 0.15s both;
        }

        .db-tab {
          padding: 12px 20px; font-family: 'Inter', sans-serif;
          font-size: 0.85rem; font-weight: 500; color: var(--text-3);
          background: transparent; border: none; border-bottom: 2px solid transparent;
          cursor: pointer; transition: all 0.15s ease; white-space: nowrap;
        }

        .db-tab:hover { color: var(--text-1); }
        .db-tab.active { color: var(--primary); border-bottom-color: var(--primary); font-weight: 600; }

        .db-body { max-width: 1100px; margin: 0 auto; padding: 36px 24px 80px; width: 100%; }

        .db-grid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
        .db-col-left  { display: flex; flex-direction: column; gap: 20px; }
        .db-col-right { display: flex; flex-direction: column; gap: 20px; }

        .db-card {
          background: var(--bg-1); border: 1px solid var(--border);
          border-radius: 14px; padding: 24px; animation: dbFade 0.5s ease both;
        }

        .db-card-title {
          font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.09em; text-transform: uppercase; color: var(--text-3);
          margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
        }

        .db-card-link {
          font-size: 0.72rem; font-weight: 500; color: var(--primary);
          text-decoration: none; text-transform: none; letter-spacing: 0;
          transition: opacity 0.15s ease;
        }
        .db-card-link:hover { opacity: 0.75; }

        .db-roadmap-list { display: flex; flex-direction: column; gap: 12px; }

        .db-roadmap-card {
          background: var(--bg-2); border: 1px solid var(--border);
          border-radius: 12px; padding: 18px 20px; cursor: pointer;
          transition: all 0.2s ease; text-decoration: none; display: block;
          position: relative; overflow: hidden;
        }

        .db-roadmap-card:hover { border-color: var(--border-hover); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }

        .db-roadmap-card-glow { position: absolute; inset: 0; border-radius: 12px; opacity: 0; transition: opacity 0.2s ease; pointer-events: none; }
        .db-roadmap-card:hover .db-roadmap-card-glow { opacity: 1; }

        .db-rc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .db-rc-left { display: flex; align-items: center; gap: 10px; }

        .db-rc-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; border: 1px solid; flex-shrink: 0; transition: all 0.2s ease; }

        .db-rc-role { font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 700; color: var(--text-1); letter-spacing: -0.03em; line-height: 1.2; transition: color 0.2s ease; }
        .db-rc-cat  { font-family: 'Inter', sans-serif; font-size: 0.72rem; color: var(--text-3); margin-top: 1px; }

        .db-rc-status { font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; border: 1px solid; white-space: nowrap; }
        .db-rc-status.active    { color: #00c97a; border-color: rgba(0,201,122,0.3); background: rgba(0,201,122,0.1); }
        .db-rc-status.paused    { color: #f59e0b; border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.1); }
        .db-rc-status.completed { color: #0ea5e9; border-color: rgba(14,165,233,0.3); background: rgba(14,165,233,0.1); }

        .db-rc-progress-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 6px; }
        .db-rc-progress-bar { flex: 1; height: 3px; background: var(--bg-3); border-radius: 3px; overflow: hidden; }
        .db-rc-progress-fill { height: 100%; border-radius: 3px; transition: width 0.6s cubic-bezier(0.4,0,0.2,1); }
        .db-rc-progress-pct { font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; font-style: italic; min-width: 36px; text-align: right; line-height: 1; }
        .db-rc-meta { display: flex; align-items: center; justify-content: space-between; }
        .db-rc-phases { font-family: 'Inter', sans-serif; font-size: 0.72rem; color: var(--text-3); }
        .db-rc-last   { font-family: 'Inter', sans-serif; font-size: 0.72rem; color: var(--text-3); }

        .db-chart { display: flex; align-items: flex-end; gap: 8px; height: 80px; padding-bottom: 4px; }
        .db-chart-col { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
        .db-chart-bar-wrap { flex: 1; width: 100%; display: flex; align-items: flex-end; }
        .db-chart-bar { width: 100%; border-radius: 4px 4px 0 0; transition: height 0.6s cubic-bezier(0.4,0,0.2,1); min-height: 3px; cursor: pointer; }
        .db-chart-bar:hover { opacity: 0.8; }
        .db-chart-day { font-family: 'Inter', sans-serif; font-size: 0.62rem; color: var(--text-3); }

        .db-achievements { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; }
        .db-ach { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 8px; border-radius: 10px; border: 1px solid var(--border); background: var(--bg-2); text-align: center; transition: all 0.15s ease; }
        .db-ach:hover { background: var(--bg-3); border-color: var(--border-hover); }
        .db-ach.locked { opacity: 0.4; filter: grayscale(1); }
        .db-ach-icon { font-size: 1.3rem; width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; background: var(--bg-3); border: 1px solid var(--border); }
        .db-ach-label { font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 500; color: var(--text-2); line-height: 1.3; }

        .db-feed { display: flex; flex-direction: column; gap: 0; }
        .db-feed-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
        .db-feed-item:last-child { border-bottom: none; }
        .db-feed-icon { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; flex-shrink: 0; border: 1px solid; margin-top: 1px; }
        .db-feed-text { font-family: 'Inter', sans-serif; font-size: 0.82rem; color: var(--text-2); line-height: 1.5; flex: 1; }
        .db-feed-time { font-family: 'Inter', sans-serif; font-size: 0.7rem; color: var(--text-3); flex-shrink: 0; margin-top: 2px; }

        .db-streak-card { background: var(--bg-1); border: 1px solid var(--border); border-radius: 14px; padding: 24px; text-align: center; position: relative; overflow: hidden; animation: dbFade 0.5s ease 0.15s both; }
        .db-streak-card::before { content: ''; position: absolute; top: -1px; left: 20%; right: 20%; height: 1px; background: linear-gradient(90deg, transparent, #f59e0b, transparent); }
        .db-streak-num { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 700; font-style: italic; background: linear-gradient(135deg, #f59e0b, #ef4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 2px; }
        .db-streak-label { font-family: 'Inter', sans-serif; font-size: 0.78rem; color: var(--text-3); margin-bottom: 12px; }
        .db-streak-dots { display: flex; gap: 4px; justify-content: center; flex-wrap: wrap; margin-bottom: 12px; }
        .db-streak-dot { width: 8px; height: 8px; border-radius: 50%; transition: background 0.2s ease; }
        .db-streak-tip { font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; font-style: italic; color: var(--text-3); }

        .db-xp-card { background: var(--bg-1); border: 1px solid var(--border); border-radius: 14px; padding: 24px; animation: dbFade 0.5s ease 0.2s both; }
        .db-xp-top { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 10px; }
        .db-xp-val { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 600; font-style: italic; background: linear-gradient(135deg, #00c97a, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; }
        .db-xp-label { font-family: 'Inter', sans-serif; font-size: 0.72rem; color: var(--text-3); letter-spacing: 0.06em; text-transform: uppercase; }
        .db-xp-next { font-family: 'Inter', sans-serif; font-size: 0.75rem; color: var(--text-3); padding-bottom: 2px; }
        .db-xp-bar { height: 6px; background: var(--bg-3); border-radius: 6px; overflow: hidden; margin-bottom: 6px; }
        .db-xp-fill { height: 100%; background: linear-gradient(90deg, #00c97a, #0ea5e9); border-radius: 6px; transition: width 1s cubic-bezier(0.4,0,0.2,1); }
        .db-xp-levels { display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 0.68rem; color: var(--text-3); }

        .db-quick { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .db-quick-btn { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 14px; background: var(--bg-2); border: 1px solid var(--border); border-radius: 10px; cursor: pointer; transition: all 0.15s ease; text-decoration: none; }
        .db-quick-btn:hover { background: var(--bg-3); border-color: var(--border-hover); transform: translateY(-1px); }
        .db-quick-icon { font-size: 1rem; width: 30px; height: 30px; border-radius: 8px; background: var(--bg-3); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; margin-bottom: 4px; }
        .db-quick-title { font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 600; color: var(--text-1); letter-spacing: -0.02em; }
        .db-quick-desc  { font-family: 'Inter', sans-serif; font-size: 0.7rem; color: var(--text-3); }

        .db-roadmaps-tab { display: flex; flex-direction: column; gap: 14px; }

        .db-roadmap-full-card { background: var(--bg-1); border: 1px solid var(--border); border-radius: 14px; padding: 24px; display: grid; grid-template-columns: auto 1fr auto; gap: 20px; align-items: center; transition: all 0.2s ease; text-decoration: none; animation: dbFade 0.4s ease both; position: relative; overflow: hidden; }
        .db-roadmap-full-card:hover { border-color: var(--border-hover); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.2); }

        .db-rfc-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid; flex-shrink: 0; }
        .db-rfc-role { font-family: 'Inter', sans-serif; font-size: 1.05rem; font-weight: 700; color: var(--text-1); letter-spacing: -0.04em; margin-bottom: 3px; }
        .db-rfc-sub  { font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; font-style: italic; color: var(--text-3); margin-bottom: 10px; }
        .db-rfc-progress-row { display: flex; align-items: center; gap: 10px; }
        .db-rfc-bar  { flex: 1; height: 3px; background: var(--bg-3); border-radius: 3px; overflow: hidden; }
        .db-rfc-fill { height: 100%; border-radius: 3px; transition: width 0.6s cubic-bezier(0.4,0,0.2,1); }
        .db-rfc-pct  { font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; color: var(--text-2); min-width: 32px; }
        .db-rfc-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
        .db-rfc-actions { display: flex; gap: 8px; }

        .db-rfc-btn { display: inline-flex; align-items: center; gap: 5px; padding: 0 12px; height: 32px; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 500; cursor: pointer; transition: all 0.15s ease; text-decoration: none; }
        .db-rfc-btn-primary { background: var(--primary); border: none; color: #000; }
        .db-rfc-btn-primary:hover { background: #00e089; }
        .db-rfc-btn-secondary { background: var(--bg-2); border: 1px solid var(--border); color: var(--text-2); }
        .db-rfc-btn-secondary:hover { background: var(--bg-3); color: var(--text-1); }

        .db-new-roadmap { background: var(--bg-1); border: 1px dashed var(--border); border-radius: 14px; padding: 32px; text-align: center; cursor: pointer; transition: all 0.2s ease; text-decoration: none; display: block; animation: dbFade 0.4s ease 0.3s both; }
        .db-new-roadmap:hover { border-color: var(--primary); background: var(--primary-dim); }
        .db-new-roadmap-icon  { font-size: 1.5rem; margin-bottom: 10px; }
        .db-new-roadmap-title { font-family: 'Inter', sans-serif; font-size: 0.925rem; font-weight: 600; color: var(--text-1); letter-spacing: -0.02em; margin-bottom: 4px; }
        .db-new-roadmap-sub   { font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; font-style: italic; color: var(--text-3); }

        .db-loading { padding: 32px; text-align: center; font-family: 'Inter',sans-serif; font-size: 0.85rem; color: var(--text-3); }

        @keyframes dbFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1024px) {
          .db-grid { grid-template-columns: 1fr; }
          .db-col-right { display: grid; grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 768px) {
          .db-hero { padding: 32px 18px 0; }
          .db-body { padding: 24px 18px 60px; }
          .db-stats-strip { grid-template-columns: repeat(2,1fr); }
          .db-col-right { grid-template-columns: 1fr; }
          .db-roadmap-full-card { grid-template-columns: auto 1fr; }
          .db-rfc-right { display: none; }
          .db-welcome { flex-direction: column; align-items: flex-start; }
        }

        @media (max-width: 480px) {
          .db-achievements { grid-template-columns: repeat(4,1fr); }
          .db-quick { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="db-page">
        <Navbar />

        {/* ── HERO ── */}
        <div className="db-hero">
          <div className="db-hero-grid" />
          <div className="db-hero-orb" />
          <div className="db-hero-inner">
            <div className="db-welcome">
              <div className="db-avatar-row">
                <div className="db-avatar">{USER.avatar}</div>
                <div className="db-welcome-text">
                  <div className="db-greeting">{getGreeting()} 👋</div>
                  <div className="db-name-line">
                    <span className="db-name-inter">Welcome back,</span>
                    <span className="db-name-cormorant">
                      {USER.name.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="db-welcome-actions">
                <Link to="/category" className="db-btn db-btn-primary">
                  + New roadmap
                </Link>
                <button className="db-btn db-btn-secondary">
                  ✉ Email all PDFs
                </button>
              </div>
            </div>

            <div className="db-stats-strip" ref={statsRef}>
              {[
                { n: cStreak, s: "🔥", l: "Day streak" },
                { n: cHours, s: "h", l: "Hours logged" },
                { n: cXP.toLocaleString(), s: "", l: "XP earned" },
                { n: cRoads, s: "", l: "Roadmaps" },
              ].map((s, i) => (
                <div className="db-stat" key={i}>
                  <div className="db-stat-num">
                    {s.n}
                    {s.s}
                  </div>
                  <div className="db-stat-label">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="db-tabs">
              {[
                { id: "overview", label: "◎ Overview" },
                { id: "roadmaps", label: "◈ Roadmaps" },
                { id: "activity", label: "⚡ Activity" },
              ].map((t) => (
                <button
                  key={t.id}
                  className={`db-tab ${activeTab === t.id ? "active" : ""}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="db-body">
          {/* ══ OVERVIEW ══ */}
          {activeTab === "overview" && (
            <div className="db-grid">
              <div className="db-col-left">
                {/* Active Roadmaps */}
                <div className="db-card" style={{ animationDelay: "0s" }}>
                  <div className="db-card-title">
                    Active Roadmaps
                    <Link
                      to="#"
                      className="db-card-link"
                      onClick={() => setTab("roadmaps")}
                    >
                      View all →
                    </Link>
                  </div>
                  <div className="db-roadmap-list">
                    {loadingRoads ? (
                      <div className="db-loading">Loading roadmaps...</div>
                    ) : roadmaps.length === 0 ? (
                      <EmptyRoadmaps />
                    ) : (
                      roadmaps.map((rm, i) => (
                        <Link
                          to={`/roadmap/${rm.id}`}
                          className="db-roadmap-card"
                          key={rm.id}
                          style={{ animationDelay: `${i * 0.06}s` }}
                        >
                          <div
                            className="db-roadmap-card-glow"
                            style={{
                              background: `radial-gradient(ellipse 60% 60% at 20% 50%, ${rm.glow}, transparent)`,
                            }}
                          />
                          <div className="db-rc-top">
                            <div className="db-rc-left">
                              <div
                                className="db-rc-icon"
                                style={{
                                  background: rm.glow,
                                  borderColor: rm.border,
                                }}
                              >
                                {rm.icon}
                              </div>
                              <div className="db-rc-info">
                                <div className="db-rc-role">{rm.role}</div>
                                <div className="db-rc-cat">{rm.category}</div>
                              </div>
                            </div>
                            <span className={`db-rc-status ${rm.status}`}>
                              {rm.status === "active"
                                ? "● Active"
                                : rm.status === "paused"
                                ? "⏸ Paused"
                                : "✓ Done"}
                            </span>
                          </div>
                          <div className="db-rc-progress-row">
                            <div className="db-rc-progress-bar">
                              <div
                                className="db-rc-progress-fill"
                                style={{
                                  width: `${rm.progress}%`,
                                  background: `linear-gradient(90deg, ${rm.color}, ${rm.color}aa)`,
                                }}
                              />
                            </div>
                            <span
                              className="db-rc-progress-pct"
                              style={{ color: rm.color }}
                            >
                              {rm.progress}%
                            </span>
                          </div>
                          <div className="db-rc-meta">
                            <span className="db-rc-phases">
                              {rm.completedPhases}/{rm.totalPhases} phases
                            </span>
                            <span className="db-rc-last">
                              Active {rm.lastActive}
                            </span>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>

                {/* Activity Chart */}

                <div className="db-card" style={{ animationDelay: "0.1s" }}>
                  <div className="db-card-title">This week's activity</div>
                  <div className="db-chart">
                    {ACTIVITY.map((a, i) => {
                      const isToday = i === adjustedIndex;

                      return (
                        <div className="db-chart-col" key={a.day}>
                          <div className="db-chart-bar-wrap">
                            <div
                              className="db-chart-bar"
                              style={{
                                height: `${(a.hrs / maxHrs) * 100}%`,
                                background: isToday
                                  ? "linear-gradient(180deg, #ff9800, #ff980088)"
                                  : "linear-gradient(180deg, var(--border-hover), var(--bg-3))",
                                animationDelay: `${i * 0.05}s`,
                              }}
                              title={`${a.hrs}h`}
                            />
                          </div>
                          <span
                            className="db-chart-day"
                            style={{ fontWeight: isToday ? "bold" : "normal" }}
                          >
                            {a.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Achievements */}
                <div className="db-card" style={{ animationDelay: "0.15s" }}>
                  <div className="db-card-title">Achievements</div>
                  <div className="db-achievements">
                    {ACHIEVEMENTS.map((a, i) => (
                      <div
                        key={i}
                        className={`db-ach ${!a.earned ? "locked" : ""}`}
                        title={a.earned ? a.label : `🔒 ${a.label}`}
                      >
                        <div className="db-ach-icon">{a.icon}</div>
                        <div className="db-ach-label">{a.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="db-col-right">
                {/* Streak */}
                <div className="db-streak-card">
                  <div className="db-streak-num">{USER.streak}</div>
                  <div className="db-streak-label">Day learning streak 🔥</div>
                  <div className="db-streak-dots">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className="db-streak-dot"
                        style={{
                          background:
                            i < USER.streak % 14 ? "#f59e0b" : "var(--bg-3)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="db-streak-tip">
                    Keep going — you're on a roll
                  </div>
                </div>

                {/* XP */}
                <div className="db-xp-card">
                  <div className="db-card-title" style={{ marginBottom: 14 }}>
                    Experience Points
                  </div>
                  <div className="db-xp-top">
                    <div>
                      <div className="db-xp-val">{cXP.toLocaleString()} XP</div>
                      <div className="db-xp-label">
                        Level {Math.floor(USER.xp / 500) + 1} — Navigator
                      </div>
                    </div>
                    <div className="db-xp-next">
                      Next: {(Math.floor(USER.xp / 500) + 1) * 500} XP
                    </div>
                  </div>
                  <div className="db-xp-bar">
                    <div
                      className="db-xp-fill"
                      style={{
                        width: `${Math.min((USER.xp / 1000) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="db-xp-levels">
                    <span>0</span>
                    <span>250</span>
                    <span>500</span>
                    <span>750</span>
                    <span>1000</span>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="db-card" style={{ animationDelay: "0.2s" }}>
                  <div className="db-card-title">Quick Actions</div>
                  <div className="db-quick">
                    {[
                      {
                        icon: "⚡",
                        title: "New Roadmap",
                        desc: "Start a path",
                        to: "/category",
                      },
                      {
                        icon: "◈",
                        title: "Continue",
                        desc: "Pick up where left",
                        to:
                          roadmaps.length > 0
                            ? `/roadmap/${roadmaps[0].id}`
                            : "/category",
                      },
                      {
                        icon: "✉",
                        title: "Email PDFs",
                        desc: "All roadmaps",
                        to: "#",
                      },
                      {
                        icon: "◎",
                        title: "Explore",
                        desc: "Browse careers",
                        to: "/category",
                      },
                    ].map((q) => (
                      <Link key={q.title} to={q.to} className="db-quick-btn">
                        <div className="db-quick-icon">{q.icon}</div>
                        <div className="db-quick-title">{q.title}</div>
                        <div className="db-quick-desc">{q.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Activity feed */}
                <div className="db-card" style={{ animationDelay: "0.25s" }}>
                  <div className="db-card-title">Recent Activity</div>
                  <div className="db-feed">
                    {UPDATES.map((u, i) => (
                      <div className="db-feed-item" key={i}>
                        <div
                          className="db-feed-icon"
                          style={{
                            background: u.color + "18",
                            borderColor: u.color + "44",
                            color: u.color,
                          }}
                        >
                          {u.icon}
                        </div>
                        <div className="db-feed-text">{u.text}</div>
                        <div className="db-feed-time">{u.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ ROADMAPS TAB ══ */}
          {activeTab === "roadmaps" && (
            <div className="db-roadmaps-tab">
              {loadingRoads ? (
                <div className="db-loading">Loading roadmaps...</div>
              ) : roadmaps.length === 0 ? (
                <EmptyRoadmaps />
              ) : (
                roadmaps.map((rm, i) => (
                  <Link
                    to={`/roadmap/${rm.id}`}
                    key={rm.id}
                    className="db-roadmap-full-card"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 14,
                        background: `radial-gradient(ellipse 40% 80% at 0% 50%, ${rm.glow}, transparent)`,
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      className="db-rfc-icon"
                      style={{ background: rm.glow, borderColor: rm.border }}
                    >
                      {rm.icon}
                    </div>
                    <div className="db-rfc-info">
                      <div className="db-rfc-role">{rm.role}</div>
                      <div className="db-rfc-sub">
                        {rm.category} · {rm.timeline}
                      </div>
                      <div className="db-rfc-progress-row">
                        <div className="db-rfc-bar">
                          <div
                            className="db-rfc-fill"
                            style={{
                              width: `${rm.progress}%`,
                              background: `linear-gradient(90deg, ${rm.color}, ${rm.color}99)`,
                            }}
                          />
                        </div>
                        <span
                          className="db-rfc-pct"
                          style={{ color: rm.color }}
                        >
                          {rm.progress}%
                        </span>
                        <span className={`db-rc-status ${rm.status}`}>
                          {rm.status === "active"
                            ? "● Active"
                            : rm.status === "paused"
                            ? "⏸ Paused"
                            : "✓ Done"}
                        </span>
                      </div>
                    </div>
                    <div className="db-rfc-right">
                      <div className="db-rfc-actions">
                        <Link
                          to={`/roadmap/${rm.id}`}
                          className="db-rfc-btn db-rfc-btn-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {rm.status === "completed" ? "Review" : "Continue →"}
                        </Link>
                        <button
                          className="db-rfc-btn db-rfc-btn-secondary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          ✉ PDF
                        </button>
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter',sans-serif",
                          fontSize: "0.72rem",
                          color: "var(--text-3)",
                        }}
                      >
                        {rm.completedPhases}/{rm.totalPhases} phases · Last
                        active {rm.lastActive}
                      </div>
                    </div>
                  </Link>
                ))
              )}

              <Link to="/category" className="db-new-roadmap">
                <div className="db-new-roadmap-icon">+</div>
                <div className="db-new-roadmap-title">Start a new roadmap</div>
                <div className="db-new-roadmap-sub">
                  Explore 33+ career paths across IT, Non-IT, Government &
                  Business
                </div>
              </Link>
            </div>
          )}

          {/* ══ ACTIVITY TAB ══ */}
          {activeTab === "activity" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="db-card" style={{ animationDelay: "0s" }}>
                <div className="db-card-title">Weekly Study Hours</div>
                <div className="db-chart" style={{ height: 120 }}>
                  {ACTIVITY.map((a, i) => (
                    <div className="db-chart-col" key={a.day}>
                      <div className="db-chart-bar-wrap">
                        <div
                          className="db-chart-bar"
                          style={{
                            height: `${(a.hrs / maxHrs) * 100}%`,
                            background:
                              a.hrs === maxHrs
                                ? "linear-gradient(180deg, #00c97a, #00c97a66)"
                                : "linear-gradient(180deg, var(--border-hover), var(--bg-3))",
                          }}
                        />
                      </div>
                      <span className="db-chart-day">
                        {a.day} · {a.hrs}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="db-card" style={{ animationDelay: "0.08s" }}>
                <div className="db-card-title">All Activity</div>
                <div className="db-feed">
                  {UPDATES.map((u, i) => (
                    <div className="db-feed-item" key={i}>
                      <div
                        className="db-feed-icon"
                        style={{
                          background: u.color + "18",
                          borderColor: u.color + "44",
                          color: u.color,
                        }}
                      >
                        {u.icon}
                      </div>
                      <div className="db-feed-text">{u.text}</div>
                      <div className="db-feed-time">{u.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
