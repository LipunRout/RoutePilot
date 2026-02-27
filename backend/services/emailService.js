require('dns').setDefaultResultOrder('ipv4first')
require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendRoadmapEmail = async ({ to, name, roadmapTitle, pdfBuffer }) => {
  await transporter.sendMail({
    from:        `"RoutePilot" <${process.env.EMAIL_USER}>`,
    to,
    subject:     `Your ${roadmapTitle} Roadmap — RoutePilot`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#e5e5e5;border-radius:14px;overflow:hidden;">
        <div style="padding:32px 32px 0;text-align:center;">
          <div style="font-size:2rem;margin-bottom:8px">🗺️</div>
          <h1 style="font-size:1.4rem;font-weight:700;color:#fff;margin:0 0 6px;letter-spacing:-0.04em;">
            Your roadmap is ready, ${name}!
          </h1>
          <p style="color:#888;font-size:0.9rem;margin:0 0 24px;line-height:1.6;">
            Your AI-generated <strong style="color:#00c97a">${roadmapTitle}</strong> roadmap
            is attached as a PDF. Start your journey today.
          </p>
        </div>
        <div style="padding:0 32px 32px;">
          <div style="background:#111;border:1px solid #222;border-radius:10px;padding:20px;margin-bottom:24px;">
            <p style="margin:0;font-size:0.82rem;color:#666;text-align:center;">
              Open the attached PDF to view your complete phase-by-phase roadmap.
            </p>
          </div>
          <p style="text-align:center;font-size:0.78rem;color:#444;margin:0;">
            Built with RoutePilot · AI-Powered Career Roadmaps
          </p>
        </div>
      </div>
    `,
    attachments: pdfBuffer ? [{
      filename:    `${roadmapTitle.replace(/\s+/g, '-')}-Roadmap.pdf`,
      content:     pdfBuffer,
      contentType: 'application/pdf',
    }] : [],
  })
}

module.exports = { transporter, sendRoadmapEmail }