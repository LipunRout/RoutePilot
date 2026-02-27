const { createClient }            = require('@supabase/supabase-js')
const { generateRoadmapWithGemini } = require('../services/geminiService')
const dotenv                      = require('dotenv')
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const generateRoadmap = async (req, res) => {
  try {
    const { role, category, level, hours, goal, timeline, background, extra } = req.body
    const userId = req.user.id

    if (!role || !category || !level || !hours || !goal || !timeline) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    /* Call Gemini */
    const roadmapData = await generateRoadmapWithGemini({
      role, category, level, hours, goal, timeline, background, extra
    })

    /* Save to Supabase */
    const { data: saved, error } = await supabase
      .from('roadmaps')
      .insert({
        user_id:      userId,
        role,
        category,
        form_data:    { level, hours, goal, timeline, background, extra },
        roadmap_data: roadmapData,
        progress:     0,
        status:       'active',
      })
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      success:   true,
      roadmapId: saved.id,
      roadmap:   roadmapData,
    })

  } catch (err) {
    console.error('[generateRoadmap]', err.message)
    res.status(500).json({ success: false, message: err.message })
  }
}

const getRoadmaps = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ success: true, roadmaps: data })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const getRoadmapById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single()

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' })
    }

    res.json({ success: true, roadmap: data })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const updateProgress = async (req, res) => {
  try {
    const { completedPhases, totalPhases } = req.body
    const progress = Math.round((completedPhases / totalPhases) * 100)
    const status   = progress === 100 ? 'completed' : 'active'

    const { data, error } = await supabase
      .from('roadmaps')
      .update({
        progress,
        status,
        completed_phases: completedPhases,
        last_active_at:   new Date().toISOString(),
      })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single()

    if (error) throw error
    res.json({ success: true, roadmap: data })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteRoadmap = async (req, res) => {
  try {
    const { error } = await supabase
      .from('roadmaps')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)

    if (error) throw error
    res.json({ success: true, message: 'Roadmap deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { generateRoadmap, getRoadmaps, getRoadmapById, updateProgress, deleteRoadmap }