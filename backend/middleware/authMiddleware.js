const { createClient } = require('@supabase/supabase-js')
const dotenv           = require('dotenv')
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }

    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ success: false, message: 'Authentication failed' })
  }
}

module.exports = { requireAuth }