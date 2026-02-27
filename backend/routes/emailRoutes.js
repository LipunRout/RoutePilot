const express          = require('express')
const { requireAuth }  = require('../middleware/authMiddleware')
const { sendPDFEmail } = require('../controllers/emailController')

const router = express.Router()

router.post('/send-email', requireAuth, sendPDFEmail)

module.exports = router