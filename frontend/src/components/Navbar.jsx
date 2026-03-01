import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const { theme, toggleTheme }      = useTheme();
  const { user, signOut }           = useAuth();
  const location                    = useLocation();
  const navigate                    = useNavigate();
  const dropRef                     = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setDropOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  // User display name
  const firstName = user?.user_metadata?.first_name
    || user?.user_metadata?.full_name?.split(" ")[0]
    || user?.email?.split("@")[0]
    || "User";

  const avatar = firstName[0].toUpperCase();

  const links = [
    { to: "/",         label: "Home",      icon: "⌂" },
    { to: "/category", label: "Explore",   icon: "◎" },
    { to: "/contact",  label: "Contact",   icon: "✉" },
    { to: "/dashboard",label: "Dashboard", icon: "▤" },
  ];

  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:ital,wght@1,500;1,600&display=swap');

      .nb {
        position: fixed; top: 0; left: 0; right: 0;
        z-index: 1000; height: 64px;
        display: flex; align-items: center; padding: 0 24px;
        background: var(--bg-1);
        border-bottom: 1px solid var(--border);
        transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      }
      .nb.scrolled {
        background: rgba(8,12,16,0.92);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 1px 0 rgba(255,255,255,0.04);
      }
      [data-theme="light"] .nb { background: #ffffff; }
      [data-theme="light"] .nb.scrolled { background: rgba(255,255,255,0.95); }

      .nb-inner {
        max-width: 1140px; margin: 0 auto; width: 100%;
        display: flex; align-items: center; justify-content: space-between;
      }

      /* ── LOGO ── */
      .nb-logo {
        text-decoration: none; display: flex; align-items: center;
        gap: 11px; flex-shrink: 0; position: relative;
      }
      .nb-logo-icon-wrap { position: relative; width: 38px; height: 38px; flex-shrink: 0; }
      .nb-logo-ring {
        position: absolute; inset: -3px; border-radius: 13px;
        background: conic-gradient(from 0deg, #00c97a, #0ea5e9, #00c97a);
        opacity: 0; transition: opacity 0.3s ease;
        animation: nbRingSpin 3s linear infinite; z-index: 0;
      }
      @keyframes nbRingSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      .nb-logo:hover .nb-logo-ring { opacity: 1; }
      .nb-logo-ring-mask {
        position: absolute; inset: 1px; border-radius: 11px;
        background: var(--bg-1); z-index: 1; transition: background 0.3s ease;
      }
      [data-theme="light"] .nb-logo-ring-mask { background: #ffffff; }
      .nb-logo-img {
        position: absolute; inset: 2px;
        width: calc(100% - 4px); height: calc(100% - 4px);
        object-fit: cover; border-radius: 9px; z-index: 2;
        transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
      }
      .nb-logo:hover .nb-logo-img { transform: scale(1.06); }
      .nb-logo-glow {
        position: absolute; inset: -6px; border-radius: 18px;
        background: radial-gradient(circle, rgba(0,201,122,0.35) 0%, transparent 70%);
        opacity: 0; z-index: 0; transition: opacity 0.3s ease; filter: blur(6px);
      }
      .nb-logo:hover .nb-logo-glow { opacity: 1; }
      .nb-logo-text-wrap { display: flex; flex-direction: column; gap: 1px; }
      .nb-logo-name {
        font-size: 1.12rem; font-weight: 800; letter-spacing: -0.05em;
        line-height: 1; display: flex; align-items: center; gap: 1px;
      }
      .nb-logo-route { color: var(--text-1); transition: color 0.2s ease; }
      .nb-logo-pilot {
        background: linear-gradient(135deg, #00c97a 0%, #0ea5e9 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        font-weight: 800;
      }
      .nb-logo-dot {
        width: 6px; height: 6px; border-radius: 50%; background: var(--primary);
        margin-left: 3px; flex-shrink: 0; box-shadow: 0 0 6px rgba(0,201,122,0.6);
        animation: nbDotPulse 2s ease-in-out infinite; align-self: center; margin-bottom: 2px;
      }
      @keyframes nbDotPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.6} }
      .nb-logo-tag {
        font-size: 0.58rem; color: var(--text-3); letter-spacing: 0.08em;
        text-transform: uppercase; font-weight: 500; line-height: 1;
      }

      /* ── DESKTOP LINKS ── */
      .nb-links {
        display: flex; align-items: center; gap: 2px; list-style: none;
        position: absolute; left: 50%; transform: translateX(-50%);
      }
      .nb-link-item { position: relative; }
      .nb-link-bg {
        position: absolute; inset: 0; border-radius: 8px;
        background: var(--surface); opacity: 0; transition: opacity 0.15s ease; pointer-events: none;
      }
      .nb-link-item:hover .nb-link-bg,
      .nb-link-item.active .nb-link-bg { opacity: 1; }
      .nb-link {
        font-size: 0.875rem; font-weight: 400; color: var(--text-2);
        text-decoration: none; padding: 6px 14px; border-radius: 8px;
        display: block; position: relative; z-index: 1;
        transition: color 0.15s ease; white-space: nowrap;
      }
      .nb-link:hover  { color: var(--text-1); }
      .nb-link.active { color: var(--text-1); font-weight: 500; }
      .nb-link-dot {
        position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%);
        width: 4px; height: 4px; border-radius: 50%; background: var(--primary);
        opacity: 0; transition: opacity 0.2s ease;
      }
      .nb-link-item.active .nb-link-dot { opacity: 1; }

      /* ── DESKTOP ACTIONS ── */
      .nb-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
      .nb-theme {
        width: 34px; height: 34px; border-radius: 8px;
        border: 1px solid var(--border); background: transparent;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        font-size: 0.88rem; color: var(--text-2); transition: all 0.15s ease;
      }
      .nb-theme:hover { background: var(--surface); color: var(--text-1); border-color: var(--border-hover); }
      .nb-theme:active { transform: scale(0.9); }
      .nb-signin {
        height: 34px; padding: 0 14px; font-size: 0.875rem; font-weight: 500;
        color: var(--text-2); background: transparent; border: 1px solid var(--border);
        border-radius: 8px; cursor: pointer; text-decoration: none;
        display: inline-flex; align-items: center; transition: all 0.15s ease;
      }
      .nb-signin:hover { color: var(--text-1); border-color: var(--border-hover); background: var(--surface); }
      .nb-start {
        height: 34px; padding: 0 14px; font-size: 0.875rem; font-weight: 500;
        color: #000; background: var(--primary); border: none; border-radius: 8px;
        cursor: pointer; text-decoration: none;
        display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s ease;
      }
      .nb-start:hover { background: #00e089; box-shadow: 0 0 18px rgba(0,201,122,0.3); transform: translateY(-1px); }
      .nb-start:active { transform: scale(0.97); }
      .nb-start .arr { font-size: 0.78rem; transition: transform 0.2s ease; }
      .nb-start:hover .arr { transform: translateX(3px); }

      /* ── USER AVATAR + DROPDOWN ── */
      .nb-user { position: relative; }

      .nb-avatar-btn {
        display: flex; align-items: center; gap: 8px;
        padding: 4px 10px 4px 4px;
        background: var(--bg-2); border: 1px solid var(--border);
        border-radius: 10px; cursor: pointer;
        transition: all 0.15s ease;
      }
      .nb-avatar-btn:hover {
        background: var(--bg-3); border-color: var(--border-hover);
      }
      .nb-avatar-circle {
        width: 28px; height: 28px; border-radius: 8px;
        background: linear-gradient(135deg, #00c97a, #0ea5e9);
        display: flex; align-items: center; justify-content: center;
        font-size: 0.72rem; font-weight: 700; color: #000;
        flex-shrink: 0;
      }
      .nb-avatar-name {
        font-family: 'Inter', sans-serif;
        font-size: 0.82rem; font-weight: 500;
        color: var(--text-1); max-width: 100px;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
      .nb-avatar-chevron {
        font-size: 0.6rem; color: var(--text-3);
        transition: transform 0.2s ease;
      }
      .nb-avatar-btn.open .nb-avatar-chevron { transform: rotate(180deg); }

      /* dropdown */
      .nb-dropdown {
        position: absolute; top: calc(100% + 8px); right: 0;
        min-width: 180px;
        background: var(--bg-1); border: 1px solid var(--border);
        border-radius: 12px;
        box-shadow: 0 16px 48px rgba(0,0,0,0.3);
        overflow: hidden;
        animation: dropIn 0.18s cubic-bezier(0.4,0,0.2,1) forwards;
        z-index: 2000;
      }
      @keyframes dropIn {
        from { opacity:0; transform: translateY(-6px) scale(0.97); }
        to   { opacity:1; transform: translateY(0)   scale(1); }
      }

      /* green top line */
      .nb-dropdown::before {
        content: '';
        display: block; height: 1px;
        background: linear-gradient(90deg, transparent, #00c97a, transparent);
      }

      .nb-drop-header {
        padding: 12px 14px 8px;
        border-bottom: 1px solid var(--border);
      }
      .nb-drop-name {
        font-size: 0.85rem; font-weight: 600; color: var(--text-1);
        letter-spacing: -0.02em; margin-bottom: 2px;
      }
      .nb-drop-email {
        font-size: 0.72rem; color: var(--text-3);
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }

      .nb-drop-item {
        display: flex; align-items: center; gap: 9px;
        padding: 9px 14px; font-size: 0.82rem; font-weight: 500;
        color: var(--text-2); text-decoration: none; cursor: pointer;
        background: transparent; border: none; width: 100%; text-align: left;
        transition: background 0.12s ease, color 0.12s ease;
        font-family: 'Inter', sans-serif;
      }
      .nb-drop-item:hover { background: var(--bg-2); color: var(--text-1); }
      .nb-drop-item.danger:hover { background: rgba(239,68,68,0.08); color: #ef4444; }
      .nb-drop-divider { height: 1px; background: var(--border); margin: 4px 0; }

      /* ── HAMBURGER ── */
      .nb-hamburger {
        display: none; flex-direction: column; justify-content: center;
        align-items: center; gap: 5px; width: 38px; height: 38px;
        border-radius: 8px; border: 1px solid var(--border);
        background: transparent; cursor: pointer; padding: 0;
        transition: all 0.15s ease; flex-shrink: 0;
      }
      .nb-hamburger:hover { background: var(--surface); border-color: var(--border-hover); }
      .nb-bar {
        display: block; width: 16px; height: 1.5px; border-radius: 2px;
        background: var(--text-2);
        transition: transform 0.25s ease, opacity 0.25s ease, width 0.25s ease;
        transform-origin: center;
      }
      .nb-hamburger.open .nb-bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
      .nb-hamburger.open .nb-bar:nth-child(2) { opacity: 0; width: 0; }
      .nb-hamburger.open .nb-bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

      /* ── MOBILE OVERLAY ── */
      .nb-overlay { display: none; position: fixed; inset: 0; z-index: 999; }
      .nb-overlay.open { display: block; }
      .nb-backdrop {
        position: absolute; inset: 0; background: rgba(0,0,0,0.55);
        backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
        animation: nbFadeIn 0.25s ease forwards; cursor: pointer;
      }
      @keyframes nbFadeIn { from{opacity:0} to{opacity:1} }
      .nb-panel {
        position: absolute; top: 0; left: 0; right: 0;
        background: var(--bg-1); border-bottom: 1px solid var(--border);
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        animation: nbSlideDown 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
      }
      [data-theme="light"] .nb-panel { box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
      @keyframes nbSlideDown { from{transform:translateY(-100%);opacity:0.6} to{transform:translateY(0);opacity:1} }
      .nb-panel-top {
        height: 64px; display: flex; align-items: center;
        justify-content: space-between; padding: 0 20px;
        border-bottom: 1px solid var(--border);
      }
      .nb-panel-logo { display: flex; align-items: center; gap: 9px; text-decoration: none; }
      .nb-panel-icon-wrap { position: relative; width: 30px; height: 30px; flex-shrink: 0; }
      .nb-panel-icon-ring {
        position: absolute; inset: -2px; border-radius: 10px;
        background: conic-gradient(from 0deg, #00c97a, #0ea5e9, #00c97a);
        animation: nbRingSpin 3s linear infinite; z-index: 0;
      }
      .nb-panel-icon-mask { position: absolute; inset: 1px; border-radius: 8px; background: var(--bg-1); z-index: 1; }
      [data-theme="light"] .nb-panel-icon-mask { background: #ffffff; }
      .nb-panel-icon-img {
        position: absolute; inset: 2px; width: calc(100% - 4px); height: calc(100% - 4px);
        object-fit: cover; border-radius: 6px; z-index: 2;
      }
      .nb-panel-logo-name { font-size: 0.95rem; font-weight: 800; letter-spacing: -0.04em; color: var(--text-1); }
      .nb-panel-logo-pilot {
        background: linear-gradient(135deg, #00c97a, #0ea5e9);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .nb-panel-close {
        width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border);
        background: transparent; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        font-size: 0.8rem; color: var(--text-2); transition: all 0.15s ease;
      }
      .nb-panel-close:hover { background: var(--surface); color: var(--text-1); }
      .nb-panel-section {
        font-size: 0.67rem; font-weight: 600; letter-spacing: 0.1em;
        text-transform: uppercase; color: var(--text-3); padding: 14px 20px 6px;
      }
      .nb-panel-list { list-style: none; padding: 0 10px; }
      .nb-panel-link {
        display: flex; align-items: center; gap: 11px;
        font-size: 0.9rem; font-weight: 500; color: var(--text-2);
        text-decoration: none; padding: 10px 12px; border-radius: 10px;
        transition: background 0.15s ease, color 0.15s ease;
      }
      .nb-panel-link:hover { background: var(--surface); color: var(--text-1); }
      .nb-panel-link.active { background: var(--primary-dim); color: var(--primary); }
      .nb-panel-link-icon {
        width: 30px; height: 30px; border-radius: 8px; background: var(--bg-2);
        border: 1px solid var(--border); display: flex; align-items: center;
        justify-content: center; font-size: 0.82rem; flex-shrink: 0; transition: all 0.15s ease;
      }
      .nb-panel-link.active .nb-panel-link-icon { background: var(--primary-dim); border-color: var(--primary-border); }
      .nb-panel-link-chevron { margin-left: auto; font-size: 0.8rem; color: var(--text-3); transition: transform 0.15s ease; }
      .nb-panel-link:hover .nb-panel-link-chevron { transform: translateX(3px); color: var(--text-2); }
      .nb-panel-divider { height: 1px; background: var(--border); margin: 10px 20px; }
      .nb-panel-theme {
        display: flex; align-items: center; justify-content: space-between;
        padding: 9px 12px; margin: 0 10px; border-radius: 10px;
        cursor: pointer; transition: background 0.15s ease;
        animation: nbLinkIn 0.3s ease 0.22s both;
      }
      .nb-panel-theme:hover { background: var(--surface); }
      .nb-panel-theme-label { font-size: 0.875rem; font-weight: 500; color: var(--text-2); display: flex; align-items: center; gap: 8px; }
      .nb-toggle {
        width: 40px; height: 22px; border-radius: 50px; border: 1px solid var(--border);
        background: var(--bg-3); cursor: pointer; position: relative;
        transition: background 0.22s ease, border-color 0.22s ease; flex-shrink: 0;
      }
      .nb-toggle.on { background: var(--primary); border-color: var(--primary); }
      .nb-toggle-thumb {
        position: absolute; top: 2px; left: 2px; width: 16px; height: 16px;
        border-radius: 50%; background: var(--text-3);
        transition: left 0.22s cubic-bezier(0.4,0,0.2,1), background 0.22s ease;
      }
      .nb-toggle.on .nb-toggle-thumb { left: calc(100% - 18px); background: #000; }
      .nb-panel-auth {
        display: flex; gap: 8px; padding: 0 10px 4px;
        animation: nbLinkIn 0.3s ease 0.28s both;
      }
      .nb-panel-auth .nb-signin,
      .nb-panel-auth .nb-start { flex: 1; justify-content: center; height: 40px; border-radius: 10px; font-size: 0.875rem; }

      /* mobile user card */
      .nb-panel-user {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 12px; margin: 0 10px;
        background: var(--bg-2); border: 1px solid var(--border);
        border-radius: 10px; margin-bottom: 4px;
      }
      .nb-panel-user-avatar {
        width: 34px; height: 34px; border-radius: 9px;
        background: linear-gradient(135deg, #00c97a, #0ea5e9);
        display: flex; align-items: center; justify-content: center;
        font-size: 0.8rem; font-weight: 700; color: #000; flex-shrink: 0;
      }
      .nb-panel-user-name { font-size: 0.875rem; font-weight: 600; color: var(--text-1); }
      .nb-panel-user-email { font-size: 0.72rem; color: var(--text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 180px; }
      .nb-panel-signout {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 12px; margin: 0 10px 4px;
        border-radius: 10px; cursor: pointer;
        background: transparent; border: none; width: calc(100% - 20px);
        text-align: left; font-family: 'Inter', sans-serif;
        font-size: 0.875rem; font-weight: 500; color: #ef4444;
        transition: background 0.15s ease;
      }
      .nb-panel-signout:hover { background: rgba(239,68,68,0.08); }

      @keyframes nbLinkIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }

      @media (max-width: 768px) {
        .nb-links   { display: none; }
        .nb-actions { display: none; }
        .nb-hamburger { display: flex; }
        .nb { padding: 0 18px; height: 60px; }
      }
      `}</style>

      {/* ═══ NAVBAR ═══ */}
      <nav className={`nb ${scrolled ? "scrolled" : ""}`}>
        <div className="nb-inner">

          {/* LOGO */}
          <Link to="/" className="nb-logo">
            <div className="nb-logo-icon-wrap">
              <div className="nb-logo-glow" />
              <div className="nb-logo-ring" />
              <div className="nb-logo-ring-mask" />
              <img src="/favicon.png" alt="RoutePilot" className="nb-logo-img" />
            </div>
            <div className="nb-logo-text-wrap">
              <div className="nb-logo-name">
                <span className="nb-logo-route">Route</span>
                <span className="nb-logo-pilot">Pilot</span>
                <span className="nb-logo-dot" />
              </div>
              <div className="nb-logo-tag">AI Career Navigator</div>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="nb-links">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <li key={l.to} className={`nb-link-item ${active ? "active" : ""}`}>
                  <div className="nb-link-bg" />
                  <Link to={l.to} className={`nb-link ${active ? "active" : ""}`}>{l.label}</Link>
                  <div className="nb-link-dot" />
                </li>
              );
            })}
          </ul>

          {/* DESKTOP ACTIONS */}
          <div className="nb-actions">
            <button className="nb-theme" onClick={toggleTheme} title="Toggle theme">
              {theme === "dark" ? "☀" : "☽"}
            </button>

            {user ? (
              /* ── Logged in: avatar + dropdown ── */
              <div className="nb-user" ref={dropRef}>
                <button
                  className={`nb-avatar-btn ${dropOpen ? "open" : ""}`}
                  onClick={() => setDropOpen(p => !p)}
                >
                  <div className="nb-avatar-circle">{avatar}</div>
                  <span className="nb-avatar-name">{firstName}</span>
                  <span className="nb-avatar-chevron">▾</span>
                </button>

                {dropOpen && (
                  <div className="nb-dropdown">
                    <div className="nb-drop-header">
                      <div className="nb-drop-name">{firstName}</div>
                      <div className="nb-drop-email">{user.email}</div>
                    </div>
                    <Link to="/dashboard" className="nb-drop-item" onClick={() => setDropOpen(false)}>
                      ▤ Dashboard
                    </Link>
                    <Link to="/category" className="nb-drop-item" onClick={() => setDropOpen(false)}>
                      ◎ Create Roadmap
                    </Link>
                    <div className="nb-drop-divider" />
                    <button className="nb-drop-item danger" onClick={handleSignOut}>
                      ⎋ Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Logged out: sign in + register ── */
              <>
                <Link to="/login" className="nb-signin">Log in</Link>
                <Link to="/register" className="nb-start">
                  Create Account <span className="arr">→</span>
                </Link>
              </>
            )}
          </div>

          {/* HAMBURGER */}
          <button
            className={`nb-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            <span className="nb-bar" />
            <span className="nb-bar" />
            <span className="nb-bar" />
          </button>
        </div>
      </nav>

      {/* ═══ MOBILE MENU ═══ */}
      {menuOpen && (
        <div className="nb-overlay open">
          <div className="nb-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="nb-panel">

            <div className="nb-panel-top">
              <Link to="/" className="nb-panel-logo" onClick={() => setMenuOpen(false)}>
                <div className="nb-panel-icon-wrap">
                  <div className="nb-panel-icon-ring" />
                  <div className="nb-panel-icon-mask" />
                  <img src="/favicon.png" alt="RoutePilot" className="nb-panel-icon-img" />
                </div>
                <span className="nb-panel-logo-name">
                  Route<span className="nb-panel-logo-pilot">Pilot</span>
                </span>
              </Link>
              <button className="nb-panel-close" onClick={() => setMenuOpen(false)}>✕</button>
            </div>

            {/* User card (mobile) */}
            {user && (
              <>
                <div className="nb-panel-section">Account</div>
                <div className="nb-panel-user">
                  <div className="nb-panel-user-avatar">{avatar}</div>
                  <div>
                    <div className="nb-panel-user-name">{firstName}</div>
                    <div className="nb-panel-user-email">{user.email}</div>
                  </div>
                </div>
              </>
            )}

            <div className="nb-panel-section">Navigation</div>
            <ul className="nb-panel-list">
              {links.map((l) => {
                const active = location.pathname === l.to;
                return (
                  <li key={l.to}>
                    <Link to={l.to} className={`nb-panel-link ${active ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
                      <div className="nb-panel-link-icon">{l.icon}</div>
                      {l.label}
                      <span className="nb-panel-link-chevron">›</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="nb-panel-divider" />

            <div className="nb-panel-theme" onClick={toggleTheme}>
              <span className="nb-panel-theme-label">
                {theme === "dark" ? "🌙 Dark mode" : "☀️ Light mode"}
              </span>
              <div className={`nb-toggle ${theme === "light" ? "on" : ""}`}>
                <div className="nb-toggle-thumb" />
              </div>
            </div>

            <div className="nb-panel-divider" />

            {user ? (
              /* Logged in mobile */
              <button className="nb-panel-signout" onClick={handleSignOut}>
                ⎋ Sign out
              </button>
            ) : (
              /* Logged out mobile */
              <>
                <div className="nb-panel-section">Account</div>
                <div className="nb-panel-auth">
                  <Link to="/login" className="nb-signin" onClick={() => setMenuOpen(false)}>Sign in</Link>
                  <Link to="/register" className="nb-start" onClick={() => setMenuOpen(false)}>
                    Get started <span className="arr">→</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;