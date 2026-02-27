const { createClient } = require('@supabase/supabase-js')
const dotenv           = require('dotenv')
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const bookCall = async (req, res) => {
  try {
    const { name, email, phone, date, time, topic, roadmapId } = req.body

    if (!name || !email || !date || !time) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    const { data, error } = await supabase
      .from('call_bookings')
      .insert({
        user_id:    req.user.id,
        name, email, phone, date, time, topic,
        roadmap_id: roadmapId || null,
        status:     'pending',
      })
      .select()
      .single()

    if (error) throw error
    res.status(201).json({ success: true, booking: data })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const getMyBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('call_bookings')
      .select('*')
      .eq('user_id', req.user.id)
      .order('date', { ascending: true })

    if (error) throw error
    res.json({ success: true, bookings: data })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { bookCall, getMyBookings }