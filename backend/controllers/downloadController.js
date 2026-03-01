const { createClient }       = require('@supabase/supabase-js')
const { generateRoadmapPDF } = require('../services/pdfService')
const dotenv                 = require('dotenv')
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const downloadPDF = async (req, res) => {
  try {
    const { roadmapId } = req.params
    const userId        = req.user.id

    // Fetch roadmap
    const { data: roadmapRow, error } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('id', roadmapId)
      .eq('user_id', userId)
      .single()

    if (error || !roadmapRow) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' })
    }

    // Fetch profile for name
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name')
      .eq('id', userId)
      .single()

    const userName  = profile?.first_name || req.user.email?.split('@')[0] || 'Learner'
    const rd        = roadmapRow.roadmap_data
    const pdfBuffer = await generateRoadmapPDF(rd, userName)

    const filename = `${(rd.role || 'Roadmap').replace(/\s+/g, '-')}-RoutePilot.pdf`

    // Send PDF as downloadable file
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader('Content-Length', pdfBuffer.length)
    res.end(pdfBuffer)

  } catch (err) {
    console.error('[downloadPDF] error:', err.message)
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { downloadPDF }