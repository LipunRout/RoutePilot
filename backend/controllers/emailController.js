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
    const email = process.env.EMAIL_USER

    /* Merge roadmap_data with top-level fields so PDF has role/timeline */
    const roadmapData = {
      ...roadmapRow.roadmap_data,
      role:        roadmapRow.roadmap_data?.role        || roadmapRow.role        || 'Career',
      timeline:    roadmapRow.roadmap_data?.timeline    || roadmapRow.form_data?.timeline ? `${roadmapRow.form_data.timeline} months` : '6 months',
      totalPhases: roadmapRow.roadmap_data?.totalPhases || roadmapRow.roadmap_data?.phases?.length || 5,
      overview:    roadmapRow.roadmap_data?.overview    || '',
      phases:      roadmapRow.roadmap_data?.phases      || [],
    }

    console.log('[email debug] role:', roadmapData.role)
    console.log('[email debug] timeline:', roadmapData.timeline)
    console.log('[email debug] phases:', roadmapData.phases?.length)
    console.log('[email debug] email:', email)

    /* Generate PDF buffer */
    const pdfBuffer = await generateRoadmapPDF(roadmapData, userName)

    console.log('[email debug] pdfBuffer:', pdfBuffer ? `${pdfBuffer.length} bytes` : 'UNDEFINED')

    /* Send email */
    await sendRoadmapEmail({
      to:           email,
      name:         userName,
      roadmapTitle: roadmapData.role,
      pdfBuffer,
    })

    res.json({ success: true, message: `PDF sent to ${email}` })

  } catch (err) {
    console.error('[sendPDFEmail]', err.message)
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { sendPDFEmail }