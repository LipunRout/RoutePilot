import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, signOut, isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Logged out successfully!')
      navigate('/')
    } catch (err) {
      toast.error('Logout failed!')
    }
  }

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 2rem;
          transition: all 0.4s ease;
        }

        .navbar.scrolled {
          background: rgba(2, 12, 20, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 255, 136, 0.15);
          padding: 0.7rem 2rem;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        [data-theme="light"] .navbar.scrolled {
          background: rgba(240, 255, 244, 0.85);
        }

        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .nav-logo {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          font-weight: 900;
          text-decoration: none;
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 2px;
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-logo::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00ff88, #00d4ff);
          transition: width 0.3s ease;
        }

        .nav-logo:hover::after {
          width: 100%;
        }

        .nav-logo span {
          font-size: 0.6rem;
          display: block;
          letter-spacing: 4px;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 400;
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: -4px;
        }

        /* Nav Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
        }

        .nav-link {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          letter-spacing: 1px;
          text-transform: uppercase;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00ff88, #00d4ff);
          transition: width 0.3s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #00ff88;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        /* Nav Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* Theme Toggle */
        .nav-theme-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(0, 255, 136, 0.3);
          background: rgba(0, 255, 136, 0.05);
          backdrop-filter: blur(10px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          color: #00ff88;
        }

        .nav-theme-btn:hover {
          border-color: #00ff88;
          background: rgba(0, 255, 136, 0.15);
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
          transform: rotate(20deg) scale(1.1);
        }

        /* User Avatar */
        .nav-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Orbitron', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #000;
          cursor: pointer;
          border: 2px solid rgba(0, 255, 136, 0.5);
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-avatar:hover {
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
          transform: scale(1.1);
        }

        /* Logout Button */
        .nav-logout {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #ff4444;
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          border-radius: 50px;
          padding: 8px 20px;
          cursor: pointer;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .nav-logout:hover {
          background: rgba(255, 68, 68, 0.2);
          border-color: #ff4444;
          box-shadow: 0 0 15px rgba(255, 68, 68, 0.3);
          transform: scale(1.05);
        }

        /* Auth Buttons */
        .nav-btn-login {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #00ff88;
          background: transparent;
          border: 1px solid rgba(0, 255, 136, 0.4);
          border-radius: 50px;
          padding: 8px 22px;
          cursor: pointer;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .nav-btn-login:hover {
          background: rgba(0, 255, 136, 0.1);
          border-color: #00ff88;
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
        }

        .nav-btn-register {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #000;
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          border: none;
          border-radius: 50px;
          padding: 9px 22px;
          cursor: pointer;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .nav-btn-register:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 5px;
          background: none;
          border: none;
        }

        .hamburger span {
          display: block;
          width: 26px;
          height: 2px;
          background: #00ff88;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(2, 12, 20, 0.97);
          backdrop-filter: blur(20px);
          z-index: 999;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s ease;
        }

        [data-theme="light"] .mobile-menu {
          background: rgba(240, 255, 244, 0.97);
        }

        .mobile-menu.open {
          display: flex;
          opacity: 1;
          pointer-events: all;
        }

        .mobile-nav-link {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-decoration: none;
          letter-spacing: 3px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          position: relative;
        }

        .mobile-nav-link:hover {
          color: #00ff88;
          text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
        }

        .mobile-menu-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .nav-links,
          .nav-actions {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .navbar {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo">
            RoutePilot
            <span>AI Career Navigator</span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            <li>
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category"
                    className={`nav-link ${location.pathname === '/category' ? 'active' : ''}`}
                  >
                    Explore
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Desktop Actions */}
          <div className="nav-actions">
            {/* Theme Toggle */}
            <button
              className="nav-theme-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <>
                <div
                  className="nav-avatar"
                  title={user?.email}
                >
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <button className="nav-logout" onClick={handleSignOut}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-btn-login">Login</Link>
                <Link to="/register" className="nav-btn-register">Get Started</Link>
              </>
            )}

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="mobile-nav-link">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="mobile-nav-link">Dashboard</Link>
            <Link to="/category" className="mobile-nav-link">Explore</Link>
          </>
        ) : null}
        <div className="mobile-menu-actions">
          <button className="nav-theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {isAuthenticated ? (
            <button className="nav-logout" onClick={handleSignOut}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-btn-login">Login</Link>
              <Link to="/register" className="nav-btn-register">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
