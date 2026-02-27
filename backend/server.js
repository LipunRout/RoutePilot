const express       = require('express')
const cors          = require('cors')
const dotenv        = require('dotenv')
const roadmapRoutes = require('./routes/roadmapRoutes')
const emailRoutes   = require('./routes/emailRoutes')
const callRoutes    = require('./routes/callRoutes')

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

/* ───────── CORS CONFIG ───────── */
const corsOptions = {
  origin: function (origin, callback) {
    const allowed = [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://route-pilot.vercel.app',
      'https://routepilot.vercel.app',
      process.env.FRONTEND_URL,
    ].filter(Boolean)

    if (!origin || allowed.includes(origin)) {
      callback(null, true)
    } else {
      console.log('❌ Blocked by CORS:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions)) // Express 5 preflight support

app.use(express.json({ limit: '10mb' }))

/* ───────── Routes ───────── */
app.use('/api', roadmapRoutes)
app.use('/api', emailRoutes)
app.use('/api', callRoutes)

/* ───────── Health Check ───────── */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'RoutePilot API' })
})

/* ───────── Global Error Handler ───────── */
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 RoutePilot backend running on port ${PORT}`)
})