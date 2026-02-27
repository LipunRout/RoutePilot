const express       = require('express')
const cors          = require('cors')
const dotenv        = require('dotenv')
const roadmapRoutes = require('./routes/roadmapRoutes')
const emailRoutes   = require('./routes/emailRoutes')
const callRoutes    = require('./routes/callRoutes')

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    console.log('❌ Blocked by CORS:', origin)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

// ✅ Express 5 compatible preflight
app.options(/.*/, cors())

app.use(express.json({ limit: '10mb' }))

/* ── Routes ── */
app.use('/api', roadmapRoutes)
app.use('/api', emailRoutes)
app.use('/api', callRoutes)

/* ── Health check ── */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'RoutePilot API' })
})

/* ── Global error handler ── */
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 RoutePilot backend running on http://localhost:${PORT}`)
})