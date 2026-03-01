import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { useAuth } from './context/AuthContext'

// Pages
import LandingPage     from './pages/LandingPage'
import LoginPage       from './pages/LoginPage'
import RegisterPage    from './pages/RegisterPage'
import Dashboard       from './pages/Dashboard'
import CategorySelect  from './pages/CategorySelect'
import RoleSelect      from './pages/RoleSelect'
import UserDetailsForm from './pages/UserDetailsForm'
import RoadmapPage     from './pages/RoadmapPage'
// Components
import ScrollToTop from './components/ScrollToTop'

/* ── Protected Route ── */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '2px solid transparent',
        borderTopColor: '#00c97a',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(0,255,136,0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,255,136,0.3)',
              color: '#fff',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1rem',
              fontWeight: '600',
            },
          }}
        />
        <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route path="/"         element={<LandingPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/category"  element={<ProtectedRoute><CategorySelect /></ProtectedRoute>} />
          <Route path="/roles"     element={<ProtectedRoute><RoleSelect /></ProtectedRoute>} />
          <Route path="/details"   element={<ProtectedRoute><UserDetailsForm /></ProtectedRoute>} />
          <Route path="/roadmap/:id" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App