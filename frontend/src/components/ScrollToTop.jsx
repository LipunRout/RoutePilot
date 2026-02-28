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
          bottom: 90px;        /* sits above chatbot (chatbot is ~70px from bottom) */
          right: 24px;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transform: translateY(10px) scale(0.9);
          pointer-events: none;
        }

        .scroll-top-btn.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }

        .scroll-top-btn:hover {
          background: rgba(0, 201, 122, 0.12);
          border-color: rgba(0, 201, 122, 0.35);
          box-shadow: 0 4px 20px rgba(0, 201, 122, 0.2);
          transform: translateY(-2px) scale(1.05);
        }

        .scroll-top-btn:active {
          transform: scale(0.95);
        }

        .arrow-icon {
          width: 10px;
          height: 10px;
          border-left: 2px solid rgba(255,255,255,0.7);
          border-top: 2px solid rgba(255,255,255,0.7);
          transform: rotate(45deg) translate(2px, 2px);
          border-radius: 1px;
          transition: border-color 0.2s ease;
        }

        .scroll-top-btn:hover .arrow-icon {
          border-color: #00c97a;
        }

        @media (max-width: 768px) {
          .scroll-top-btn {
            bottom: 85px;
            right: 16px;
            width: 34px;
            height: 34px;
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