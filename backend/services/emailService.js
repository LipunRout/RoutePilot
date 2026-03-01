const nodemailer = require('nodemailer')
require('dotenv').config()

// Brevo SMTP — works on Render free tier (no IPv6 issues)
const transporter = nodemailer.createTransport({
  host:   'smtp-relay.brevo.com',
  port:   587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,   // your Brevo login email
    pass: process.env.BREVO_PASS,   // Brevo SMTP key (xsmtp...)
  },
  tls: { rejectUnauthorized: false },
})

const sendRoadmapEmail = async ({ to, name, roadmapTitle, pdfBuffer }) => {
  const title = roadmapTitle || 'Career'

  console.log('[email] sending via Brevo to:', to)

  await transporter.sendMail({
    from:    '"RoutePilot" <noreply@routepilot.com>',  // can be any from address on Brevo
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
  })

  console.log('[email] ✓ sent successfully via Brevo')
  console.log('[email] BREVO_USER:', process.env.BREVO_USER ? 'SET' : 'MISSING')
console.log('[email] BREVO_PASS:', process.env.BREVO_PASS ? 'SET' : 'MISSING')
}

module.exports = { sendRoadmapEmail }