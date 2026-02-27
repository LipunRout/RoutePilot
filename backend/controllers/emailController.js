const { createClient }       = require('@supabase/supabase-js')
const { generateRoadmapPDF } = require('../services/pdfService')
const { sendRoadmapEmail }   = require('../services/emailService')
const dotenv                 = require('dotenv')
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const sendPDFEmail = async (req, res) => {
  try {
    const { roadmapId } = req.body
    const userId        = req.user.id

    /* Fetch roadmap */
    const { data: roadmapRow, error } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('id', roadmapId)
      .eq('user_id', userId)
      .single()

    if (error || !roadmapRow) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' })
    }

    /* Fetch profile */
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, email')
      .eq('id', userId)
      .single()

    const userName = profile?.first_name || 'there'
    const email    = profile?.email || req.user.email

    /* Generate PDF buffer */
    const pdfBuffer = await generateRoadmapPDF(roadmapRow.roadmap_data, userName)

    /* Send email */
    await sendRoadmapEmail({ to: email, name: userName, roadmapTitle: roadmapRow.role, pdfBuffer })

    res.json({ success: true, message: `PDF sent to ${email}` })

  } catch (err) {
    console.error('[sendPDFEmail]', err.message)
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { sendPDFEmail }