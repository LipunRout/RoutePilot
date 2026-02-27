const express                    = require('express')
const { requireAuth }            = require('../middleware/authMiddleware')
const { bookCall, getMyBookings } = require('../controllers/callController')

const router = express.Router()

router.post('/book-call',    requireAuth, bookCall)
router.get ('/my-bookings',  requireAuth, getMyBookings)

module.exports = router