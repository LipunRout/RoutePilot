const buildRoadmapPrompt = ({ role, category, level, hours, goal, timeline, background, extra }) => {
  return `
You are an expert career coach and curriculum designer.

Generate a detailed, structured career roadmap as a JSON object for the following person:

PROFILE:
- Target Role: ${role}
- Career Domain: ${category}
- Current Level: ${level}
- Daily Study Time: ${hours} hours/day
- Primary Goal: ${goal}
- Target Timeline: ${timeline} months
- Background: ${background || 'Not specified'}
- Special Requests: ${extra || 'None'}

INSTRUCTIONS:
- Create exactly 5 phases that are realistic and build on each other sequentially
- Each phase must be achievable within the timeline given the daily study time
- Resources must be real, well-known and actually useful learning materials
- Projects must be practical, portfolio-worthy and specific
- Adjust depth based on the user's current level — skip basics if they're intermediate/advanced
- If background is provided, acknowledge it and tailor accordingly

RESPOND WITH ONLY VALID JSON — no markdown, no backticks, no explanation outside the JSON:

{
  "role": "${role}",
  "category": "${category}",
  "timeline": "${timeline} months",
  "overview": "2-3 sentence overview of this personalized roadmap",
  "totalPhases": 5,
  "phases": [
    {
      "id": 1,
      "title": "Phase title",
      "subtitle": "Short evocative tagline",
      "duration": "X-Y weeks",
      "difficulty": "Beginner",
      "topics": ["topic1", "topic2", "topic3", "topic4", "topic5", "topic6"],
      "outcome": "What the learner can do after completing this phase",
      "resources": [
        { "type": "article", "label": "Resource name — subtopic", "url": "https://real-url.com" },
        { "type": "video",   "label": "Creator — Course title",   "url": "https://youtube.com/watch?v=..." },
        { "type": "article", "label": "Resource name — subtopic", "url": "https://real-url.com" },
        { "type": "video",   "label": "Creator — Course title",   "url": "https://youtube.com/watch?v=..." }
      ],
      "project": "Specific hands-on project to build during this phase"
    }
  ]
}
`
}

module.exports = { buildRoadmapPrompt }