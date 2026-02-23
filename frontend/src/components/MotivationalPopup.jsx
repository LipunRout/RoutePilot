import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const quotes = [
  {
    text: "Your future is built one skill at a time.",
    author: "RoutePilot",
    emoji: "🚀"
  },
  {
    text: "The best time to start was yesterday. The next best time is now.",
    author: "Anonymous",
    emoji: "⚡"
  },
  {
    text: "Success is not final, failure is not fatal. It is the courage to continue that counts.",
    author: "Winston Churchill",
    emoji: "🔥"
  },
  {
    text: "Don't watch the clock. Do what it does — keep going.",
    author: "Sam Levenson",
    emoji: "⏰"
  },
  {
    text: "Every expert was once a beginner. Start your journey today.",
    author: "RoutePilot",
    emoji: "🌱"
  }
]

const MotivationalPopup = ({ onClose }) => {
  const [visible, setVisible] = useState(false)
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setVisible(true), 10)

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      handleClose()
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose(), 400)
  }

  const handleGetStarted = () => {
    handleClose()
    setTimeout(() => navigate('/register'), 400)
  }

  return (
    <>
      <style>{`
  .popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5, 12, 20, 0.75);
    backdrop-filter: blur(12px);
    z-index: 99998;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .popup-overlay.visible {
    opacity: 1;
  }

  .popup-card {
    position: relative;
    max-width: 540px;
    width: 100%;
    background: linear-gradient(145deg, rgba(10,18,28,0.95), rgba(6,12,20,0.95));
    border: 1px solid rgba(0, 255, 170, 0.18);
    border-radius: 20px;
    padding: 3rem 2.5rem 2rem;
    text-align: center;
    overflow: hidden;
    transform: translateY(25px) scale(0.92);
    transition: all 0.35s cubic-bezier(.16,1,.3,1);
    box-shadow:
      0 40px 80px rgba(0,0,0,0.55),
      0 0 0 1px rgba(255,255,255,0.03);
  }

  .popup-overlay.visible .popup-card {
    transform: translateY(0) scale(1);
  }

  /* Soft Glow */
  .popup-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 80% 20%, rgba(0,255,170,0.08), transparent 60%);
    pointer-events: none;
  }

  /* Close Button */
  .popup-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: #aaa;
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
  }

  .popup-close:hover {
    background: rgba(255,255,255,0.08);
    color: #fff;
    transform: rotate(90deg);
  }

  /* Emoji */
  .popup-emoji {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    animation: float 4s ease-in-out infinite;
  }

  /* Label */
  .popup-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #00ffaa;
    margin-bottom: 1rem;
    opacity: 0.85;
  }

  /* Quote */
  .popup-quote {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.45rem;
    font-weight: 600;
    color: #f4f7fa;
    line-height: 1.6;
    margin-bottom: 1.2rem;
    position: relative;
  }

  .popup-quote::before {
    content: '"';
    position: absolute;
    top: -22px;
    left: -6px;
    font-size: 3.5rem;
    color: rgba(0,255,170,0.12);
  }

  /* Author */
  .popup-author {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.6);
    margin-bottom: 2rem;
  }

  .popup-author span {
    color: #00ffaa;
    font-weight: 600;
  }

  /* Buttons */
  .popup-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .popup-btn-primary {
    background: linear-gradient(135deg, #00ffaa, #00d4ff);
    border: none;
    border-radius: 40px;
    padding: 12px 28px;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #000;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .popup-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,255,170,0.35);
  }

  .popup-btn-secondary {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 40px;
    padding: 12px 28px;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .popup-btn-secondary:hover {
    border-color: #00ffaa;
    color: #00ffaa;
    background: rgba(0,255,170,0.05);
  }

  /* Progress */
  .popup-progress-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 0.5rem;
  }

  .popup-progress-bar {
    height: 4px;
    background: rgba(255,255,255,0.08);
    border-radius: 20px;
    overflow: hidden;
  }

  .popup-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #00ffaa, #00d4ff);
    border-radius: 20px;
    transition: width 0.1s linear;
  }

  @media (max-width: 480px) {
    .popup-card {
      padding: 2.2rem 1.4rem 1.4rem;
    }

    .popup-quote {
      font-size: 1.2rem;
    }

    .popup-buttons {
      flex-direction: column;
    }
  }
`}</style>

      <div className={`popup-overlay ${visible ? 'visible' : ''}`}>
        <div className="popup-card">

          {/* Corner Decorations */}
          <div className="popup-corner popup-corner-tl" />
          <div className="popup-corner popup-corner-tr" />
          <div className="popup-corner popup-corner-bl" />
          <div className="popup-corner popup-corner-br" />

          {/* Glow Orbs */}
          <div className="popup-orb popup-orb-1" />
          <div className="popup-orb popup-orb-2" />

          {/* Close Button */}
          <button className="popup-close" onClick={handleClose}>✕</button>

          {/* Content */}
          <span className="popup-emoji">{quote.emoji}</span>
          <p className="popup-label">✦ Daily Motivation ✦</p>
          <p className="popup-quote">{quote.text}</p>
          <p className="popup-author">— <span>{quote.author}</span></p>

          {/* Buttons */}
          <div className="popup-buttons">
            <button className="popup-btn-primary" onClick={handleGetStarted}>
              🚀 Start My Journey
            </button>
            <button className="popup-btn-secondary" onClick={handleClose}>
              Maybe Later
            </button>
          </div>

          {/* Auto close progress */}
          <div className="popup-progress-wrap">
            <p className="popup-progress-label">Auto closing in 5s</p>
            <div className="popup-progress-bar">
              <div
                className="popup-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default MotivationalPopup