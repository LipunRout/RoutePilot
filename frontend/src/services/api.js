import axios from 'axios'
import { supabase } from './supabase'

const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:5001'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  
})
console.log("PRODUCTION BASE URL:", BASE_URL)

/* Auto-attach Supabase JWT */
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

/* ── Roadmap ── */
export const generateRoadmap = (formData) => api.post('/api/generate-roadmap', formData)
export const getUserRoadmaps = ()         => api.get('/api/roadmaps')
export const getRoadmap      = (id)       => api.get(`/api/roadmaps/${id}`)
export const updateProgress  = (id, completedPhases, totalPhases) =>
  api.patch(`/api/roadmaps/${id}/progress`, { completedPhases, totalPhases })
export const deleteRoadmap   = (id)       => api.delete(`/api/roadmaps/${id}`)

/* ── Email ── */
export const emailRoadmapPDF = (roadmapId) => api.post('/api/send-email', { roadmapId })

/* ── Call booking ── */
export const bookCall      = (data) => api.post('/api/book-call', data)
export const getMyBookings = ()     => api.get('/api/my-bookings')

export default api