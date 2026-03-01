const nodemailer = require('nodemailer')
const dns        = require('dns')
require('dotenv').config()

// Force IPv4
dns.setDefaultResultOrder('ipv4first')

// Try ports in order: 2525 → 587 → 465
const createTransporter = (port, secure) => nodemailer.createTransport({
  host:   'smtp.gmail.com',
  port,
  secure,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 10000,
  greetingTimeout:   10000,
  socketTimeout:     15000,
})

const sendRoadmapEmail = async ({ to, name, roadmapTitle, pdfBuffer }) => {
  const title = roadmapTitle || 'Career'

  const mailOptions = {
    from:    `"RoutePilot" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Your ${title} Roadmap — RoutePilot`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#e5e5e5;border-radius:14px;overflow:hidden;">
        <div style="padding:32px;text-align:center;">
          <div style="font-size:2.5rem;margin-bottom:12px">🗺️</div>
          <h1 style="font-size:1.4rem;font-weight:700;color:#fff;margin:0 0 8px;">
            Your roadmap is ready, ${name}!
          </h1>
          <p style="color:#888;font-size:0.9rem;margin:0 0 24px;line-height:1.6;">
            Your AI-generated <strong style="color:#00c97a">${title}</strong> roadmap is attached as a PDF.
          </p>
          <p style="font-size:0.75rem;color:#444;">Built with RoutePilot · AI-Powered Career Roadmaps</p>
        </div>
      </div>
    `,
    attachments: pdfBuffer ? [{
      filename:    `${title.replace(/\s+/g, '-')}-Roadmap.pdf`,
      content:     pdfBuffer,
      contentType: 'application/pdf',
    }] : [],
  }

  // Try each port in order until one works
  const attempts = [
    { port: 2525, secure: false },
    { port: 587,  secure: false },
    { port: 465,  secure: true  },
  ]

  let lastError
  for (const { port, secure } of attempts) {
    try {
      console.log(`[email] trying port ${port}...`)
      const t = createTransporter(port, secure)
      await t.sendMail(mailOptions)
      console.log(`[email] ✓ sent via port ${port}`)
      return
    } catch (err) {
      console.log(`[email] port ${port} failed: ${err.message}`)
      lastError = err
    }
  }

  throw lastError
}

module.exports = { sendRoadmapEmail }