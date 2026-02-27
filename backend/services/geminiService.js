const Groq = require('groq-sdk')
const { buildRoadmapPrompt } = require('../utils/promptBuilder')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const generateRoadmapWithGemini = async (formData) => {
  const prompt = buildRoadmapPrompt(formData)

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 4000,
  })

  const text = completion.choices[0].message.content
  console.log('RAW GROQ RESPONSE:\n', text)

  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('No valid JSON found in response')

  try {
    return JSON.parse(match[0])
  } catch (err) {
    throw new Error('AI returned invalid JSON format')
  }
}

module.exports = { generateRoadmapWithGemini }