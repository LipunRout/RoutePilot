import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
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
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
              success: {
                iconTheme: {
                  primary: '#00ff88',
                  secondary: '#000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          <ScrollToTop />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/category" element={
              <ProtectedRoute>
                <CategorySelect />
              </ProtectedRoute>
            } />
            <Route path="/roles" element={
              <ProtectedRoute>
                <RoleSelect />
              </ProtectedRoute>
            } />
            <Route path="/details" element={
              <ProtectedRoute>
                <UserDetailsForm />
              </ProtectedRoute>
            } />
            <Route path="/roadmap" element={
              <ProtectedRoute>
                <RoadmapPage />
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App