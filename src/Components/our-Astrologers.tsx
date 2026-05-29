// src/components/OurAstrologersSection.tsx
import { useRef, useCallback, useEffect } from "react";
import { Star } from "lucide-react";

interface Astrologer {
  name: string;
  skill: string;
  href: string;
  image: string;
  rating: number;
  experience: string;
  reviews?: number;
}

const astrologers: Astrologer[] = [
  {
    name: "Vvinod",
    skill: "Vedic Astrology",
    href: "/astrologer/vvinod",
    image: "https://placehold.co/130x130/E8E2D8/8B7355?text=VV",
    rating: 4.8,
    experience: "12 yrs",
    reviews: 1200,
  },
  {
    name: "Sujata",
    skill: "Vedic Astrology",
    href: "/astrologer/sujata",
    image: "https://placehold.co/130x130/E2DDD8/7A6A5A?text=SJ",
    rating: 4.7,
    experience: "9 yrs",
    reviews: 850,
  },
  {
    name: "Satyesh",
    skill: "Vedic Astrology",
    href: "/astrologer/satyesh",
    image: "https://placehold.co/130x130/DDD8D2/6A5E50?text=ST",
    rating: 4.9,
    experience: "15 yrs",
    reviews: 2100,
  },
  {
    name: "Sonia",
    skill: "Numerology",
    href: "/astrologer/sonia",
    image: "https://placehold.co/130x130/E8E0D5/8B7A65?text=SN",
    rating: 4.6,
    experience: "7 yrs",
    reviews: 920,
  },
  {
    name: "Rachna",
    skill: "Numerology",
    href: "/astrologer/rachna",
    image: "https://placehold.co/130x130/E2DCd5/7A6A58?text=RC",
    rating: 4.5,
    experience: "8 yrs",
    reviews: 640,
  },
  {
    name: "Suman",
    skill: "Vedic Astrology",
    href: "/astrologer/suman",
    image: "https://placehold.co/130x130/DDD8D0/6A6050?text=SM",
    rating: 4.7,
    experience: "11 yrs",
    reviews: 1580,
  },
  {
    name: "Nnishha",
    skill: "Vasthu",
    href: "/astrologer/nnishha",
    image: "https://placehold.co/130x130/E5DDD5/806A55?text=NN",
    rating: 4.8,
    experience: "10 yrs",
    reviews: 400,
  },
  {
    name: "AjayK",
    skill: "Vedic Astrology",
    href: "/astrologer/ajayk",
    image: "https://placehold.co/130x130/E0D8D0/706050?text=AK",
    rating: 4.9,
    experience: "14 yrs",
    reviews: 1900,
  },
  {
    name: "Priya",
    skill: "Tarot Reading",
    href: "/astrologer/priya",
    image: "https://placehold.co/130x130/E5E0D8/756555?text=PR",
    rating: 4.8,
    experience: "6 yrs",
    reviews: 730,
  },
];

const formatReviews = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  /* ── Card ── */
  .astro-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    background: #FFFFFF;
    border: 1px solid #E8E2D6;
    border-radius: 16px;
    padding: 20px 20px;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
  }

  /* Hover only on real pointer devices */
  @media (hover: hover) and (pointer: fine) {
    .astro-card {
      transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    }
    .astro-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(160, 120, 48, 0.10);
      border-color: #C9A84C;
    }
  }

  /* ── Avatar circle ── */
  .astro-avatar-ring {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #EDEAE4;
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .astro-avatar-ring img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }

  /* ── Text block ── */
  .astro-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .astro-name {
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #2C2110;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }

  .astro-skill {
    font-family: 'Jost', sans-serif;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #A07830;
    margin: 0;
  }

  .astro-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
    flex-wrap: wrap;
  }

  .astro-rating-row {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .astro-rating-num {
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #A07830;
  }

  .astro-reviews {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    color: #B0A090;
  }

  /* ── Desktop grid ── */
  .astro-desktop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 900px) {
    .astro-desktop-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* ── Mobile snap track ── */
  .astro-mobile-wrap {
    padding-left: 24px;
    padding-right: 24px;
  }

  .astro-mobile-track {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-bottom: 4px;
  }

  .astro-mobile-track::-webkit-scrollbar {
    display: none;
  }

  .astro-mobile-slide {
    flex-shrink: 0;
    width: 80vw;
    scroll-snap-align: start;
  }

  /* ── Section header ── */
  .astro-section-label {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #A07830;
    font-weight: 400;
  }

  .astro-section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(24px, 3.5vw, 38px);
    font-weight: 300;
    color: #2C2110;
    line-height: 1.2;
    margin: 8px 0 0;
  }

  .astro-section-sub {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #7A6A52;
    margin: 12px auto 0;
    max-width: 480px;
    line-height: 1.65;
  }

  .astro-divider {
    width: 36px;
    height: 1px;
    background: linear-gradient(to right, #C9A84C, #E8C97A);
    margin: 12px auto 0;
  }

  /* ── View All button ── */
  .astro-view-all {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #A07830;
    border: 1px solid #A07830;
    border-radius: 4px;
    padding: 14px 40px;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
    margin-top: 40px;
  }

  .astro-view-all:hover {
    background: #A07830;
    color: #FFFFFF;
  }
`;

// ─── Card Component ───────────────────────────────────────────────────────────
function AstrologerCard({ name, skill, href, image, rating, reviews }: Astrologer) {
  return (
    <a href={href} className="astro-card">
      {/* Avatar */}
      <div className="astro-avatar-ring">
        <img src={image} alt={name} loading="lazy" />
      </div>

      {/* Info */}
      <div className="astro-info">
        <p className="astro-name">{name}</p>
        <p className="astro-skill">{skill}</p>
        <div className="astro-meta">
          <div className="astro-rating-row">
            <Star
              size={12}
              strokeWidth={0}
              fill="#A07830"
            />
            <span className="astro-rating-num">{rating}</span>
          </div>
          {reviews !== undefined && (
            <span className="astro-reviews">
              ({formatReviews(reviews)} reviews)
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

// ─── Mobile Snap Carousel ─────────────────────────────────────────────────────
const MOBILE_ITEMS = [...astrologers, ...astrologers, ...astrologers];

function MobileCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const singleWidthRef = useRef(0);
  const scrollEndTimeoutRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const isAdjustingRef = useRef(false);

  const calcSingleWidth = useCallback((el: HTMLDivElement) => {
    const gap = parseFloat(getComputedStyle(el).gap || "0");
    const firstCard = el.firstElementChild as HTMLElement | null;
    if (!firstCard) return 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    return cardWidth * astrologers.length + gap * (astrologers.length - 1);
  }, []);

  const initScroll = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    trackRef.current = el;
    requestAnimationFrame(() => {
      singleWidthRef.current = calcSingleWidth(el);
      el.scrollLeft = singleWidthRef.current;
    });
  }, [calcSingleWidth]);

  const adjustToMiddleCopy = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const sw = singleWidthRef.current;
    if (!sw) return;
    if (isAdjustingRef.current) return;

    const left = el.scrollLeft;
    let nextLeft: number | null = null;
    if (left < sw) nextLeft = left + sw;
    else if (left >= sw * 2) nextLeft = left - sw;

    if (nextLeft === null) return;

    isAdjustingRef.current = true;
    const prevSnap = el.style.scrollSnapType;
    const prevBehavior = el.style.scrollBehavior;

    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
    el.scrollLeft = nextLeft;

    requestAnimationFrame(() => {
      el.style.scrollSnapType = prevSnap;
      el.style.scrollBehavior = prevBehavior;
      isAdjustingRef.current = false;
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollEndTimeoutRef.current) {
      window.clearTimeout(scrollEndTimeoutRef.current);
    }
    scrollEndTimeoutRef.current = window.setTimeout(() => {
      if (isDraggingRef.current) return;
      adjustToMiddleCopy();
    }, 120);
  }, [adjustToMiddleCopy]);

  useEffect(() => {
    const handleResize = () => {
      const el = trackRef.current;
      if (!el) return;
      singleWidthRef.current = calcSingleWidth(el);
      el.scrollLeft = singleWidthRef.current;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollEndTimeoutRef.current) {
        window.clearTimeout(scrollEndTimeoutRef.current);
      }
    };
  }, [calcSingleWidth]);

  return (
    <div className="md:hidden">
      <div className="astro-mobile-wrap">
        <div
          ref={initScroll}
          onScroll={handleScroll}
          onTouchStart={() => {
            isDraggingRef.current = true;
          }}
          onTouchEnd={() => {
            isDraggingRef.current = false;
          }}
          onMouseDown={() => {
            isDraggingRef.current = true;
          }}
          onMouseUp={() => {
            isDraggingRef.current = false;
          }}
          className="astro-mobile-track"
        >
          {MOBILE_ITEMS.map((a, i) => (
            <div key={`${a.href}-${i}`} className="astro-mobile-slide">
              <AstrologerCard {...a} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Grid ─────────────────────────────────────────────────────────────
function DesktopGrid() {
  return (
    <div className="hidden md:block">
      <div className="astro-desktop-grid">
        {astrologers.map((a) => (
          <AstrologerCard key={a.href} {...a} />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function OurAstrologersSection() {
  return (
    <section style={{ backgroundColor: "#FAF8F4" }} className="py-12 md:py-16">
      <style>{STYLES}</style>

      {/* Header */}
      <div className="text-center mb-10 px-4">
        <p className="astro-section-label">Meet Our Experts</p>
        <h2 className="astro-section-heading">
          Our <em>Astrologers</em>
        </h2>
        <div className="astro-divider" />
        <p className="astro-section-sub">
          Consult with our rigorously vetted and highly experienced Vedic astrologers.
        </p>
      </div>

      {/* Cards */}
      <MobileCarousel />
      <DesktopGrid />

      {/* View All CTA */}
      <div className="flex justify-center">
        <a href="/astrologers" className="astro-view-all">
          View All Astrologers
        </a>
      </div>
    </section>
  );
}