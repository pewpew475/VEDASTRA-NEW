import {
  Phone,
  ShoppingBag,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Shuffle,
  Star,
  Sun,
  Sparkles,
} from "lucide-react";
 
const actions = [
  {
    icon: Phone,
    label: "Talk to Astrologer",
    description: "Connect with expert astrologers for personalized guidance on life's important questions.",
    href: "/talk-astrologer",
  },
  {
    icon: ShoppingBag,
    label: "Vedastraa Store",
    description: "Explore authentic Vedic products, gemstones, and sacred items curated for your journey.",
    href: "https://vedastraa.com/store",
    newTab: true,
  },
  {
    icon: BookOpen,
    label: "Blogs",
    description: "Dive into insightful articles on astrology, spirituality, and ancient Vedic wisdom.",
    href: "/blogs",
  },
  {
    icon: GraduationCap,
    label: "Courses",
    description: "Learn Vedic astrology from certified experts through structured, in-depth courses.",
    href: "/courses",
  },
  {
    icon: HeartHandshake,
    label: "Kundli Match",
    description: "Analyze compatibility through ancient Ashtakoot Guna Milan for long-lasting harmony.",
    href: "/kundli-match",
  },
  {
    icon: Shuffle,
    label: "Compatibility",
    description: "Discover how the stars align between you and your partner for a deeper connection.",
    href: "/compatibility",
  },
  {
    icon: Star,
    label: "Free Kundli",
    description: "Generate your detailed birth chart and unlock planetary insights at no cost.",
    href: "/free-kundli",
  },
  {
    icon: Sun,
    label: "Today Panchang",
    description: "Stay aligned with cosmic rhythms through daily Panchang for auspicious timings.",
    href: "/today-panchang",
  },
  {
    icon: Sparkles,
    label: "Daily Horoscope",
    description: "Receive personalized daily predictions based on your zodiac sign and planetary positions.",
    href: "/daily-horoscope",
  },
];
 
export default function QuickActions() {
  return (
    <section
      className="w-full py-16 px-4"
      style={{ backgroundColor: "#FAFAF7" }}
    >
      {/* Google Fonts import via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
 
        .service-card {
          background: #FFFFFF;
          border: 1px solid #E8E2D6;
          border-radius: 16px;
          padding: 36px 28px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          text-decoration: none;
        }
 
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(184, 134, 11, 0.10);
          border-color: #C9A84C;
        }
 
        .service-card:hover .card-icon-circle {
          background-color: #C9A84C;
        }
 
        .service-card:hover .card-icon-circle svg {
          color: #FFFFFF;
        }
 
        .service-card:hover .learn-more-text {
          color: #8B6914;
        }
 
        .card-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: #F0EBE1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background-color 0.25s ease;
        }
 
        .card-icon-circle svg {
          color: #A07830;
          transition: color 0.25s ease;
        }
 
        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 400;
          color: #5C4A2A;
          letter-spacing: 0.02em;
          margin: 0;
          text-align: center;
        }
 
        .card-desc {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #7A6A52;
          line-height: 1.65;
          flex-grow: 1;
          margin: 0;
        }
 
        .learn-more-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
          transition: gap 0.2s ease;
        }
 
        .service-card:hover .learn-more-row {
          gap: 10px;
        }
 
        .learn-more-text {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #A07830;
          transition: color 0.25s ease;
        }
 
        .learn-more-arrow {
          color: #A07830;
          transition: color 0.25s ease;
          flex-shrink: 0;
        }
 
        .section-label {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #A07830;
          font-weight: 400;
        }
 
        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 300;
          color: #2C2110;
          line-height: 1.25;
          margin: 8px 0 0;
        }
 
        .section-subheading {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #7A6A52;
          line-height: 1.7;
          max-width: 520px;
          margin: 14px auto 0;
        }
 
        .divider-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(to right, #C9A84C, #E8C97A);
          margin: 14px auto 0;
        }

        @media (max-width: 640px) {
          .service-card {
            padding: 14px 10px 12px;
            gap: 10px;
          }

          .card-icon-circle {
            width: 44px;
            height: 44px;
          }

          .card-title {
            font-size: 12px;
            text-align: center;
          }

          .card-desc {
            display: none;
          }

          .learn-more-text {
            font-size: 9px;
            letter-spacing: 0.1em;
          }

          .learn-more-row {
            margin-top: 0;
            display: none;
          }
        }
      `}</style>
 
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="section-label">Our Services</p>
        <h2 className="section-heading">
          Ancient Wisdom for <em>Modern Life</em>
        </h2>
        <div className="divider-line" />
        <p className="section-subheading">
          Discover specialized astrological readings and services tailored to guide every aspect of your journey.
        </p>
      </div>
 
      {/* 3×3 Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
        className="services-grid"
      >
        <style>{`
          @media (max-width: 640px) {
            .services-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              gap: 12px !important;
            }
          }
          @media (min-width: 641px) and (max-width: 900px) {
            .services-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
 
        {actions.map(({ icon: Icon, label, description, href, newTab }) => (
          <a
            key={label}
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noreferrer" : undefined}
            className="service-card"
          >
            {/* Icon Circle */}
            <div className="card-icon-circle">
              <Icon size={24} strokeWidth={1.4} />
            </div>
 
            {/* Title */}
            <p className="card-title">{label}</p>
 
            {/* Description */}
            <p className="card-desc">{description}</p>
 
            {/* Learn More */}
            <div className="learn-more-row">
              <span className="learn-more-text">Learn More</span>
              <svg
                className="learn-more-arrow"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}