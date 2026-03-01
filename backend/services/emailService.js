const nodemailer = require('nodemailer')
const dns        = require('dns')
require('dotenv').config()

// ── Force IPv4 — fixes Render free tier IPv6 blocking ──
dns.setDefaultResultOrder('ipv4first')

const transporter = nodemailer.createTransport({
  host:   'smtp.gmail.com',
  port:   587,        // ← changed from 465 to 587 (TLS, not SSL)
  secure: false,      // ← changed from true to false
  family: 4,          // ← force IPv4 socket
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

const sendRoadmapEmail = async ({ to, name, roadmapTitle, pdfBuffer }) => {
  const title = roadmapTitle || 'Career'
  await transporter.sendMail({
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
  })
}

module.exports = { sendRoadmapEmail }