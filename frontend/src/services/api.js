import axios from 'axios'
import { supabase } from './supabase'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auto attach Supabase JWT token to every request
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong'
    console.error('API Error:', message)
    return Promise.reject(error)
  }
)

// ===== API CALLS =====

// Generate roadmap
export const generateRoadmap = (data) => {
  return api.post('/generate-roadmap', data)
}

// Send roadmap PDF via email
export const sendRoadmapEmail = (data) => {
  return api.post('/send-email', data)
}

// Book 1:1 call
export const bookCall = (data) => {
  return api.post('/book-call', data)
}

export default api