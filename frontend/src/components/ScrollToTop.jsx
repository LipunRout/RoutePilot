import { useEffect, useState } from 'react'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .scroll-top-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
          opacity: 0;
          transform: translateY(30px) scale(0.8);
          pointer-events: none;
        }

        .scroll-top-btn.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }

        .scroll-top-btn:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 0 40px rgba(0, 255, 136, 0.7),
                      0 0 80px rgba(0, 212, 255, 0.3);
        }

        .scroll-top-btn:active {
          transform: scale(0.95);
        }

        .arrow-icon {
          width: 22px;
          height: 22px;
          border-left: 3px solid #000;
          border-top: 3px solid #000;
          transform: rotate(45deg) translate(3px, 3px);
          border-radius: 2px;
        }

        @media (max-width: 768px) {
          .scroll-top-btn {
            bottom: 20px;
            right: 20px;
            width: 46px;
            height: 46px;
          }
        }
      `}</style>

      <button
        className={`scroll-top-btn ${visible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to Top"
      >
        <div className="arrow-icon" />
      </button>
    </>
  )
}

export default ScrollToTop