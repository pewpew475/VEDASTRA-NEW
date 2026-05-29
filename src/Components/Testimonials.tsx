// src/components/TestimonialsStrip.tsx

const reviews = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    stars: 5,
    text: "I consulted an astrologer for my marriage date and they were incredibly accurate. The guidance I received was life-changing. Highly recommend Vedastraa!",
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    location: "Mumbai",
    stars: 5,
    text: "I was sceptical at first, but the astrologer predicted things about my career that turned out to be completely true. Amazing experience!",
    avatar: "RV",
  },
  {
    name: "Anjali Mehta",
    location: "Pune",
    stars: 5,
    text: "Not only does this app provide a free daily horoscope but also helps me resolve my personal and professional queries in real time.",
    avatar: "AM",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    stars: 4,
    text: "Be it kundli matching, gemstone suggestions or a palmistry session — Vedastraa never fails to deliver customer satisfaction!",
    avatar: "VS",
  },
  {
    name: "Sneha Kapoor",
    location: "Bangalore",
    stars: 5,
    text: "It's an astonishing application. The reason I am giving this 5 stars is because of the authentic and experienced astrologers available.",
    avatar: "SK",
  },
  {
    name: "Arjun Nair",
    location: "Chennai",
    stars: 5,
    text: "This app helped me get a job by guiding me through the right time to act. I was stressed about my career and the astrologer gave perfect advice.",
    avatar: "AN",
  },
  {
    name: "Deepa Iyer",
    location: "Hyderabad",
    stars: 5,
    text: "I was recommended this app by my friend because of her good experience with an astrologer. I was sceptical but now I am a true believer!",
    avatar: "DI",
  },
  {
    name: "Manish Gupta",
    location: "Lucknow",
    stars: 4,
    text: "Just an amazing app and I would recommend it to everyone. I have used other apps too but this one is simply the best for genuine readings.",
    avatar: "MG",
  },
  {
    name: "Kavita Joshi",
    location: "Ahmedabad",
    stars: 5,
    text: "So I tried this app a few months ago and I was impressed with the first answer I got. The manner in which the astrologer explained was beautiful.",
    avatar: "KJ",
  },
  {
    name: "Rohit Das",
    location: "Kolkata",
    stars: 5,
    text: "I was not feeling well mentally and one session with an astrologer on Vedastraa changed my entire perspective. Truly divine guidance!",
    avatar: "RD",
  },
];

const allReviews = [...reviews, ...reviews];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  /* ── Scroll animations ── */
  @keyframes scrollLeft {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scrollRight {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  .tstrip-row-left {
    display: flex;
    gap: 20px;
    width: max-content;
    animation: scrollLeft 40s linear infinite;
  }
  .tstrip-row-right {
    display: flex;
    gap: 20px;
    width: max-content;
    animation: scrollRight 40s linear infinite;
  }

  /* Pause on hover */
  .tstrip-row-left:hover,
  .tstrip-row-right:hover {
    animation-play-state: paused;
  }

  /* ── Card ── */
  .tstrip-card {
    flex-shrink: 0;
    width: 420px;
    background: #1C2033;
    border-radius: 16px;
    padding: 28px 28px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .tstrip-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
    }
  }

  /* ── Decorative 99 quote mark ── */
  .tstrip-quote-mark {
    position: absolute;
    top: 6px;
    right: 22px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 400;
    line-height: 1;
    color: #2A3050;
    user-select: none;
    pointer-events: none;
  }

  /* ── Stars ── */
  .tstrip-stars {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  /* ── Quote text ── */
  .tstrip-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    font-style: italic;
    font-weight: 300;
    color: #E8E4DC;
    line-height: 1.7;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ── Footer: avatar + name + location ── */
  .tstrip-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
  }

  .tstrip-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #3A3F58;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: #A8A0B0;
    letter-spacing: 0.04em;
  }

  .tstrip-name {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #E8E4DC;
    margin: 0;
    line-height: 1;
  }

  .tstrip-location {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #C9A84C;
    margin: 4px 0 0;
  }

  /* ── Fade masks on both sides ── */
  .tstrip-mask {
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }

  /* ── Section header ── */
  .tstrip-section-label {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #A07830;
    font-weight: 400;
  }

  .tstrip-section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(24px, 3.5vw, 38px);
    font-weight: 300;
    color: #2C2110;
    line-height: 1.25;
    margin: 8px 0 0;
  }

  .tstrip-divider {
    width: 36px;
    height: 1px;
    background: linear-gradient(to right, #C9A84C, #E8C97A);
    margin: 12px auto 0;
  }
`;

interface ReviewCardProps {
  name: string;
  location: string;
  stars: number;
  text: string;
  avatar: string;
}

// ─── Single Card ──────────────────────────────────────────────────────────────
function ReviewCard({ name, location, stars, text, avatar }: ReviewCardProps) {
  return (
    <div className="tstrip-card">
      {/* Decorative quote mark */}
      <span className="tstrip-quote-mark" aria-hidden="true">99</span>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Stars */}
        <div className="tstrip-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke={i < stars ? "#C9A84C" : "#2A3050"}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>

        {/* Quote text */}
        <p className="tstrip-text">"{text}"</p>
      </div>

      {/* Footer */}
      <div className="tstrip-footer">
        <div className="tstrip-avatar">{avatar}</div>
        <div>
          <p className="tstrip-name">{name}</p>
          <p className="tstrip-location">{location}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function TestimonialsStrip() {
  return (
    <section
      className="w-full py-12 md:py-16 overflow-hidden"
      style={{ backgroundColor: "#FAF8F4" }}
    >
      <style>{STYLES}</style>

      {/* Header */}
      <div className="text-center mb-10 px-4">
        <p className="tstrip-section-label">What People Say</p>
        <h2 className="tstrip-section-heading">
          Stories from the <em>Other Side</em>
          <br />of the Chat.
        </h2>
        <div className="tstrip-divider" />
      </div>

      {/* Row 1 — scrolls left */}
      <div className="tstrip-mask mb-5 overflow-hidden" style={{ paddingTop: "12px" }}>
        <div className="tstrip-row-left">
          {allReviews.map((r, i) => (
            <ReviewCard key={`row1-${i}`} {...r} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="tstrip-mask overflow-hidden" style={{ paddingTop: "12px", paddingBottom: "12px" }}>
        <div className="tstrip-row-right">
          {[...allReviews].reverse().map((r, i) => (
            <ReviewCard key={`row2-${i}`} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}