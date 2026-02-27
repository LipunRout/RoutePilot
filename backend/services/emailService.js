const { Resend } = require('resend')
require('dotenv').config()

const resend = new Resend(process.env.RESEND_API_KEY)

const sendRoadmapEmail = async ({ to, name, roadmapTitle, pdfBuffer }) => {
  const { data, error } = await resend.emails.send({
    from:    'RoutePilot <onboarding@resend.dev>',
    to,
    subject: `Your ${roadmapTitle} Roadmap — RoutePilot`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#e5e5e5;border-radius:14px;overflow:hidden;">
        <div style="padding:32px;text-align:center;">
          <div style="font-size:2.5rem;margin-bottom:12px">🗺️</div>
          <h1 style="font-size:1.4rem;font-weight:700;color:#fff;margin:0 0 8px;">
            Your roadmap is ready, ${name}!
          </h1>
          <p style="color:#888;font-size:0.9rem;margin:0 0 24px;line-height:1.6;">
            Your AI-generated <strong style="color:#00c97a">${roadmapTitle}</strong> roadmap is attached as a PDF.
          </p>
          <div style="background:#111;border:1px solid #222;border-radius:10px;padding:16px;margin-bottom:24px;">
            <p style="margin:0;font-size:0.82rem;color:#666;">
              Open the attached PDF to view your complete phase-by-phase roadmap.
            </p>
          </div>
          <p style="font-size:0.75rem;color:#444;">
            Built with RoutePilot · AI-Powered Career Roadmaps
          </p>
        </div>
      </div>
    `,
    attachments: pdfBuffer ? [{
      filename: `${roadmapTitle.replace(/\s+/g, '-')}-Roadmap.pdf`,
      content:  pdfBuffer.toString('base64'),
    }] : [],
  })

  if (error) throw new Error(error.message)
  return data
}

module.exports = { sendRoadmapEmail }