// src/components/HoroscopeStrip.tsx
 
const rashis = [
  {
    name: "Aries",
    hindi: "मेष",
    href: "/horoscope/aries",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M50 60 C50 60 28 58 22 38 C16 18 30 8 42 14 C46 16 50 22 50 30 C50 22 54 16 58 14 C70 8 84 18 78 38 C72 58 50 60 50 60Z"
          stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
        <line x1="50" y1="30" x2="50" y2="80" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M38 74 L50 80 L62 74" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Taurus",
    hindi: "वृषभ",
    href: "/horoscope/taurus",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="62" r="24" stroke="currentColor" strokeWidth="4.5" fill="none"/>
        <path d="M26 42 C26 30 34 22 50 22 C66 22 74 30 74 42" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <line x1="26" y1="42" x2="18" y2="34" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <line x1="74" y1="42" x2="82" y2="34" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Gemini",
    hindi: "मिथुन",
    href: "/horoscope/gemini",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="34" y1="18" x2="34" y2="82" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <line x1="66" y1="18" x2="66" y2="82" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path d="M22 22 Q34 30 50 28 Q66 26 78 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M22 78 Q34 70 50 72 Q66 74 78 78" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <line x1="34" y1="50" x2="66" y2="50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Cancer",
    hindi: "कर्क",
    href: "/horoscope/cancer",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M65 32 C65 22 56 16 46 20 C36 24 32 36 40 44 C48 52 64 48 66 38 C68 28 58 22 50 26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M35 68 C35 78 44 84 54 80 C64 76 68 64 60 56 C52 48 36 52 34 62 C32 72 42 78 50 74" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Leo",
    hindi: "सिंह",
    href: "/horoscope/leo",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="42" cy="42" r="18" stroke="currentColor" strokeWidth="4.5" fill="none"/>
        <path d="M60 42 C76 42 82 52 80 64 C78 76 68 82 58 80 C50 78 46 72 48 66" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <circle cx="48" cy="66" r="5" stroke="currentColor" strokeWidth="3.5" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Virgo",
    hindi: "कन्या",
    href: "/horoscope/virgo",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="22" y1="20" x2="22" y2="68" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <line x1="44" y1="20" x2="44" y2="68" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M22 20 C22 14 44 14 44 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M22 44 C22 38 44 38 44 44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path d="M44 44 C54 38 66 40 70 50 C74 60 68 74 58 76 C52 78 48 74 48 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M48 70 C48 78 54 84 62 84" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <line x1="56" y1="84" x2="68" y2="84" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Libra",
    hindi: "तुला",
    href: "/horoscope/libra",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="15" y1="68" x2="85" y2="68" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <line x1="15" y1="82" x2="85" y2="82" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path d="M25 68 C25 48 38 34 50 34 C62 34 75 48 75 68" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Scorpio",
    hindi: "वृश्चिक",
    href: "/horoscope/scorpio",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="18" y1="20" x2="18" y2="66" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <line x1="40" y1="20" x2="40" y2="66" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M18 20 C18 14 40 14 40 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M18 44 C18 38 40 38 40 44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path d="M40 50 C52 44 66 48 70 60 C72 68 68 76 60 78" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M60 78 L74 72" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M74 72 L68 62" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M74 72 L82 72" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Sagittarius",
    hindi: "धनु",
    href: "/horoscope/sagittarius",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="20" y1="80" x2="76" y2="24" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path d="M76 24 L54 24" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M76 24 L76 46" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M36 66 L66 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.45"/>
      </svg>
    ),
  },
  {
    name: "Capricorn",
    hindi: "मकर",
    href: "/horoscope/capricorn",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="20" y1="18" x2="20" y2="72" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M20 40 C30 30 46 30 50 40 C54 50 46 60 36 62 C28 64 22 72 24 80 C26 88 36 90 46 88 C58 84 66 74 64 62" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M64 62 C72 56 80 60 78 70 C76 78 68 82 64 76" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Aquarius",
    hindi: "कुंभ",
    href: "/horoscope/aquarius",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M14 38 L28 26 L42 38 L56 26 L70 38 L84 26" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M14 62 L28 50 L42 62 L56 50 L70 62 L84 50" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Pisces",
    hindi: "मीन",
    href: "/horoscope/pisces",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M42 18 C28 24 18 36 18 50 C18 64 28 76 42 82" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <path d="M58 18 C72 24 82 36 82 50 C82 64 72 76 58 82" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        <line x1="28" y1="50" x2="72" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
  },
];
 
export default function HoroscopeStrip() {
  return (
    <section className="w-full py-16 px-4" style={{ backgroundColor: "#FAF8F4" }}>
 
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
 
        .horo-section-label {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #A07830;
          font-weight: 400;
        }
 
        .horo-section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3.5vw, 38px);
          font-weight: 300;
          color: #2C2110;
          line-height: 1.2;
          margin: 8px 0 0;
        }
 
        .horo-section-sub {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #7A6A52;
          margin: 12px auto 0;
          max-width: 460px;
          line-height: 1.65;
        }
 
        .horo-divider {
          width: 36px;
          height: 1px;
          background: linear-gradient(to right, #C9A84C, #E8C97A);
          margin: 12px auto 0;
        }
 
        .rashi-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          background: #FFFFFF;
          border: 1px solid #D9CDB8;
          border-radius: 14px;
          padding: 32px 16px 28px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          min-height: 180px;
        }
 
        .rashi-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(160, 120, 48, 0.10);
          border-color: #C9A84C;
        }
 
        .rashi-card:hover .rashi-glyph {
          color: #8B6512;
        }
 
        .rashi-glyph-wrap {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }
 
        .rashi-glyph {
          color: #B8965A;
          transition: color 0.22s ease;
          width: 100%;
          height: 100%;
        }
 
        .rashi-name {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #2C2110;
          text-align: center;
          line-height: 1;
        }
 
        .rashi-hindi {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 400;
          color: #A07830;
          text-align: center;
          line-height: 1;
          margin-top: -8px;
        }
 
        .rashi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 960px;
          margin: 0 auto;
        }
 
        @media (max-width: 640px) {
          .rashi-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          .rashi-card {
            min-height: 130px;
            padding: 20px 10px 18px;
            gap: 12px;
          }
          .rashi-glyph-wrap {
            width: 36px;
            height: 36px;
          }
          .rashi-name {
            font-size: 9px;
            letter-spacing: 0.12em;
          }
          .rashi-hindi {
            font-size: 11px;
            margin-top: -4px;
          }
        }
 
        @media (min-width: 641px) and (max-width: 900px) {
          .rashi-card {
            min-height: 155px;
            padding: 24px 12px 20px;
          }
          .rashi-glyph-wrap {
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
 
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="horo-section-label">Today's Horoscope</p>
        <h2 className="horo-section-heading">
          Select Your <em>Zodiac Sign</em>
        </h2>
        <div className="horo-divider" />
        <p className="horo-section-sub">
          Select your zodiac sign to read your daily cosmic forecast.
        </p>
      </div>
 
      {/* 4×3 Grid */}
      <div className="rashi-grid">
        {rashis.map(({ name, hindi, href, svg }) => (
          <a key={name} href={href} className="rashi-card">
            {/* Glyph */}
            <div className="rashi-glyph-wrap">
              <div className="rashi-glyph">{svg}</div>
            </div>
 
            {/* Name */}
            <span className="rashi-name">{name}</span>
 
            {/* Hindi */}
            <span className="rashi-hindi">{hindi}</span>
          </a>
        ))}
      </div>
 
    </section>
  );
}