import { useNavigate } from "react-router-dom";

export default function CategorySelect() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "IT & Technology",
      desc: "Software, Data, AI, Cloud, DevOps and emerging technologies.",
      value: "it"
    },
    {
      title: "Non-IT Corporate",
      desc: "Marketing, HR, Finance, Operations and management roles.",
      value: "non-it"
    },
    {
      title: "Government",
      desc: "Banking, Civil Services, SSC, Railways and public sector careers.",
      value: "govt"
    },
    {
      title: "Business & Startup",
      desc: "Entrepreneurship, freelancing and digital business paths.",
      value: "business"
    }
  ];

  const handleSelect = (category) => {
    navigate(`/role-select?category=${category}`);
  };

  return (
    <>
      <style>{`
        .cat-wrap {
          min-height: 100vh;
          padding: 120px 24px 80px;
          background: radial-gradient(circle at 20% 20%, rgba(0,255,170,0.08), transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(0,150,255,0.08), transparent 50%),
                      #0b141c;
        }

        .cat-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }

        .cat-label {
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #00ffaa;
          font-weight: 600;
          margin-bottom: 18px;
          font-family: 'Inter', sans-serif;
        }

        .cat-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #fff;
          margin-bottom: 14px;
          letter-spacing: -0.04em;
          font-family: 'Inter', sans-serif;
        }

        .cat-title span {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          background: linear-gradient(135deg, #00ffaa, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cat-desc {
          color: rgba(255,255,255,0.65);
          font-size: 1rem;
          margin-bottom: 60px;
          font-family: 'Inter', sans-serif;
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .cat-card {
          background: linear-gradient(145deg, rgba(15,25,35,0.95), rgba(10,18,26,0.95));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 40px 28px;
          text-align: left;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .cat-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0,255,170,0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .cat-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 20%, rgba(0,255,170,0.08), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cat-card:hover::after {
          opacity: 1;
        }

        .cat-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 10px;
          font-family: 'Inter', sans-serif;
        }

        .cat-card-desc {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        @media (max-width: 480px) {
          .cat-wrap {
            padding: 100px 20px 60px;
          }
        }
      `}</style>

      <div className="cat-wrap">
        <div className="cat-inner">

          <div className="cat-label">RoutePilot</div>

          <h1 className="cat-title">
            Choose Your <span>Career Domain</span>
          </h1>

          <p className="cat-desc">
            Select the field you want to build your future in. 
            RoutePilot will tailor your roadmap based on this choice.
          </p>

          <div className="cat-grid">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="cat-card"
                onClick={() => handleSelect(cat.value)}
              >
                <div className="cat-card-title">{cat.title}</div>
                <div className="cat-card-desc">{cat.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}