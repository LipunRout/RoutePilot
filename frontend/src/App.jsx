import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import CategorySelect from './pages/CategorySelect'
import RoleSelect from './pages/RoleSelect'
import UserDetailsForm from './pages/UserDetailsForm'
import RoadmapPage from './pages/RoadmapPage'

// Components
import ScrollToTop from './components/ScrollToTop'

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category" element={<CategorySelect />} />
          <Route path="/roles" element={<RoleSelect />} />
          <Route path="/details" element={<UserDetailsForm />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App