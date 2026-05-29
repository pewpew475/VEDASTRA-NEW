// src/components/FreeServicesSection.tsx
import { useRef, useCallback, useEffect } from "react";
import {
  Sun,
  ScrollText,
  HeartHandshake,
  GitMerge,
  Globe2,
  CalendarDays,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
}

const services: Service[] = [
  {
    title: "Daily Horoscope",
    description:
      "Unsure about how your day will unfold? Get free daily horoscope predictions from top astrologers tailored to your zodiac sign.",
    href: "/horoscope/daily",
    Icon: Sun,
  },
  {
    title: "Free Kundli",
    description:
      "Generate your free online Kundli report instantly. Our software predicts the future by reading your birth chart.",
    href: "/free-kundli",
    Icon: ScrollText,
  },
  {
    title: "Compatibility",
    description:
      "Confused by love? Check compatibility with your partner using our tool and ignite a love that lasts forever.",
    href: "/compatibility",
    Icon: HeartHandshake,
  },
  {
    title: "Kundli Matching",
    description:
      "Check love compatibility and marriage predictions online. Get the best horoscope and kundli matching results.",
    href: "/kundli-matching",
    Icon: GitMerge,
  },
  {
    title: "Chinese Horoscope",
    description:
      "Discover your inner spirit animal with Chinese astrology. Find out what your Chinese zodiac sign reveals about you.",
    href: "/chinese-astrology",
    Icon: Globe2,
  },
  {
    title: "Today's Panchang",
    description:
      "Panchang lists auspicious dates and times for marriages, pujas, celebrations, and starting a new business.",
    href: "/panchang",
    Icon: CalendarDays,
  },
];

// ─── All styles ───────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  /* ── Card base ── */
  .fs-card {
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #E8E2D6;
    border-radius: 18px;
    padding: 28px 24px 24px;
    text-decoration: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
  }

  /* ── Hover only on real pointer devices (not touch screens) ── */
  @media (hover: hover) and (pointer: fine) {
    .fs-card {
      transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    }
    .fs-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(160, 120, 48, 0.09);
      border-color: #C9A84C;
    }
    .fs-card:hover .fs-try-now {
      gap: 10px;
    }
  }

  .fs-icon-circle {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background-color: #EDEAE4;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-bottom: 20px;
    color: #5C4A2A;
  }

  .fs-title {
    font-family: 'Jost', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #2C2110;
    margin: 0 0 8px;
    line-height: 1.3;
  }

  .fs-desc {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #8A7A66;
    line-height: 1.65;
    margin: 0;
    flex-grow: 1;
  }

  .fs-try-now {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 20px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #A07830;
    transition: gap 0.2s ease;
  }

  .fs-try-arrow {
    flex-shrink: 0;
  }

  /* ── Mobile snap track ── */
  .fs-mobile-track {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-left: 24px;
    padding-right: 24px;
    scroll-padding-left: 24px;
    scroll-padding-right: 24px;
    padding-bottom: 4px;
  }

  .fs-mobile-track::-webkit-scrollbar {
    display: none;
  }

  /* 88vw so the next card always peeks from the right */
  .fs-mobile-slide {
    flex-shrink: 0;
    width: 88vw;
    scroll-snap-align: start;
  }

  /* ── Section header ── */
  .fs-section-label {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #A07830;
    font-weight: 400;
  }

  .fs-section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(24px, 3.5vw, 38px);
    font-weight: 300;
    color: #2C2110;
    line-height: 1.2;
    margin: 8px 0 0;
  }

  .fs-divider {
    width: 36px;
    height: 1px;
    background: linear-gradient(to right, #C9A84C, #E8C97A);
    margin: 12px auto 0;
  }
`;

// ─── Shared Card ──────────────────────────────────────────────────────────────
function ServiceCard({ title, description, href, Icon }: Service) {
  return (
    <a href={href} className="fs-card">
      <div className="fs-icon-circle">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <h3 className="fs-title">{title}</h3>
      <p className="fs-desc">{description}</p>
      <div className="fs-try-now">
        <span>Try Now</span>
        <svg
          className="fs-try-arrow"
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
  );
}

// ─── Mobile Snap Carousel ─────────────────────────────────────────────────────
// Native CSS scroll-snap — no JS touch logic, no hover effects,
// gaps between cards, next card peeks from the right edge.
function MobileCarousel() {
  return (
    <div className="md:hidden">
      <div className="fs-mobile-track">
        {services.map((service) => (
          <div key={service.href} className="fs-mobile-slide">
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Infinite Carousel ────────────────────────────────────────────────
function DesktopCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const singleWidthRef = useRef(0);
  const stepRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const initScroll = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    trackRef.current = el;
    requestAnimationFrame(() => {
      const gap = parseFloat(getComputedStyle(el).gap || "0");
      const firstCard = el.firstElementChild as HTMLElement | null;
      if (firstCard) stepRef.current = firstCard.getBoundingClientRect().width + gap;
      singleWidthRef.current = el.scrollWidth / 3;
      el.scrollLeft = singleWidthRef.current;
    });
  }, []);

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const sw = singleWidthRef.current;
      if (!sw) return;
      if (el.scrollLeft < sw) el.scrollLeft += sw;
      else if (el.scrollLeft >= sw * 2) el.scrollLeft -= sw;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const el = trackRef.current;
      if (!el) return;
      const gap = parseFloat(getComputedStyle(el).gap || "0");
      const firstCard = el.firstElementChild as HTMLElement | null;
      if (firstCard) stepRef.current = firstCard.getBoundingClientRect().width + gap;
      singleWidthRef.current = el.scrollWidth / 3;
      el.scrollLeft = singleWidthRef.current;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (dir: "left" | "right") =>
    trackRef.current?.scrollBy({
      left: dir === "right" ? stepRef.current : -stepRef.current,
      behavior: "smooth",
    });

  return (
    <div className="hidden md:block max-w-6xl mx-auto px-10" style={{ position: "relative" }}>
      <ArrowBtn dir="left" onClick={() => scroll("left")} />
      <div
        ref={initScroll}
        onScroll={handleScroll}
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {[...services, ...services, ...services].map((service, i) => (
          <div key={`${service.href}-${i}`} style={{ flexShrink: 0, width: "280px" }}>
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
      <ArrowBtn dir="right" onClick={() => scroll("right")} />
    </div>
  );
}

const ArrowBtn = ({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={dir === "left" ? "Scroll left" : "Scroll right"}
    style={{
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      [dir]: "-16px",
      zIndex: 10,
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: "#FFFFFF",
      border: "1px solid #D9CDB8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "#A07830",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      transition: "border-color 0.2s, background 0.2s",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A84C";
      (e.currentTarget as HTMLButtonElement).style.background = "#FAF8F4";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLButtonElement).style.borderColor = "#D9CDB8";
      (e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF";
    }}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  </button>
);

// ─── Section ──────────────────────────────────────────────────────────────────
export default function FreeServicesSection() {
  return (
    <section style={{ backgroundColor: "#FAF8F4" }} className="py-12 md:py-16">
      <style>{STYLES}</style>

      {/* Header */}
      <div className="text-center mb-10 px-4">
        <p className="fs-section-label">Free Services</p>
        <h2 className="fs-section-heading">
          Try Before You <em>Talk</em>
        </h2>
        <div className="fs-divider" />
      </div>

      <MobileCarousel />
      <DesktopCarousel />
    </section>
  );
}