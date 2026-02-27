import axios from 'axios'
import { supabase } from './supabase'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
})

/* Auto-attach Supabase JWT to every request */
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

/* ── Roadmap ── */
export const generateRoadmap = (formData) => api.post('/generate-roadmap', formData)
export const getUserRoadmaps = ()         => api.get('/roadmaps')
export const getRoadmap      = (id)       => api.get(`/roadmaps/${id}`)
export const updateProgress  = (id, completedPhases, totalPhases) =>
  api.patch(`/roadmaps/${id}/progress`, { completedPhases, totalPhases })
export const deleteRoadmap   = (id)       => api.delete(`/roadmaps/${id}`)

/* ── Email ── */
export const emailRoadmapPDF = (roadmapId) => api.post('/send-email', { roadmapId })

/* ── Call booking ── */
export const bookCall      = (data) => api.post('/book-call', data)
export const getMyBookings = ()     => api.get('/my-bookings')

export default api