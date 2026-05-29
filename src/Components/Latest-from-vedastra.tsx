// src/components/LatestBlogsSection.tsx
import { useRef, useCallback, useEffect } from "react";
import { Eye } from "lucide-react";
 
interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  href: string;
  image: string;
  author: string;
  date: string;
  views: number;
}
 
const blogs: BlogPost[] = [
  {
    title: "How AI Is Transforming Modern Astrology Platforms",
    excerpt: "Artificial intelligence is reshaping the way we access and interpret ancient astrological wisdom...",
    category: "Astrology",
    href: "/blog/ai-transforming-astrology",
    image: "https://placehold.co/400x260/DDD5C8/8B7355?text=",
    author: "Astrologer Anshika",
    date: "November 14, 2025",
    views: 8787,
  },
  {
    title: "Mars in Scorpio: Why Winning Is All You Think About",
    excerpt: "When Mars transits through Scorpio, intensity and ambition rise to the surface in every area of life...",
    category: "Planets",
    href: "/blog/mars-in-scorpio",
    image: "https://placehold.co/400x260/C8C0B0/7A6A52?text=",
    author: "Astrologer Anshika",
    date: "November 06, 2025",
    views: 2342,
  },
  {
    title: "Jupiter in Cancer: Why Everyone's Talking About Marriage",
    excerpt: "Jupiter's movement into Cancer amplifies matters of home, family, and long-term commitment...",
    category: "Horoscope",
    href: "/blog/jupiter-in-cancer",
    image: "https://placehold.co/400x260/B8B0A0/6A5E4A?text=",
    author: "Astrologer Anshika",
    date: "October 29, 2025",
    views: 6564,
  },
  {
    title: "Ancient Ayurvedic Remedies and Astrology Combined",
    excerpt: "A pivotal union of two ancient sciences offers profound insights into health, healing, and destiny...",
    category: "Spirituality",
    href: "/blog/ayurveda-astrology",
    image: "https://placehold.co/400x260/C8BC9A/8B7A52?text=",
    author: "Astrologer Lakshita",
    date: "September 07, 2025",
    views: 76764,
  },
  {
    title: "Life Path Number 18: Meaning, Numerology & Personality",
    excerpt: "Those born under Life Path 18 carry the energy of leadership, compassion, and spiritual purpose...",
    category: "Numerology",
    href: "/blog/life-path-18",
    image: "https://placehold.co/400x260/D4CCB8/9A8A6A?text=",
    author: "Astrologer Lakshita",
    date: "June 29, 2025",
    views: 865,
  },
  {
    title: "Life Path Number 17: Meaning, Karmic Life & Spirituality",
    excerpt: "Number 17 is deeply karmic — a blend of spiritual awareness and material mastery in constant tension...",
    category: "Numerology",
    href: "/blog/life-path-17",
    image: "https://placehold.co/400x260/C0B8A0/807060?text=",
    author: "Astrologer Lakshita",
    date: "June 28, 2025",
    views: 549,
  },
];
 
const formatViews = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
 
// ─── Shared styles ─────────────────────────────────────────────────────────────
const SHARED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
 
  /* ── Card base ── */
  .blog-card {
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    border-radius: 16px;
    overflow: hidden;
    text-decoration: none;
    width: 100%;
    height: 100%;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    cursor: pointer;
  }
 
  /* ── Desktop-only hover effects ── */
  @media (hover: hover) and (pointer: fine) {
    .blog-card {
      transition: transform 0.24s ease, box-shadow 0.24s ease;
    }
    .blog-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(140, 110, 50, 0.12);
    }
    .blog-card:hover .blog-img {
      transform: scale(1.04);
    }
    .blog-card:hover .blog-title {
      color: #8B6512;
    }
  }
 
  .blog-img-wrap {
    width: 100%;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    flex-shrink: 0;
  }
 
  .blog-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
 
  .blog-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px 20px 18px;
    gap: 10px;
  }
 
  .blog-category {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #A07830;
  }
 
  .blog-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 400;
    color: #2C2110;
    line-height: 1.35;
    margin: 0;
    transition: color 0.2s ease;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
 
  .blog-excerpt {
    font-family: 'Jost', sans-serif;
    font-size: 12.5px;
    font-weight: 300;
    color: #8A7A66;
    line-height: 1.65;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
 
  .blog-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid #EDE8DF;
  }
 
  .blog-author {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    color: #A07830;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 55%;
  }
 
  .blog-date-views {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
 
  .blog-date {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    color: #B0A090;
    white-space: nowrap;
  }
 
  .blog-views {
    display: flex;
    align-items: center;
    gap: 3px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    color: #B0A090;
  }
 
  /* ── Mobile snap track ── */
  .blog-mobile-track {
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
 
  .blog-mobile-track::-webkit-scrollbar {
    display: none;
  }
 
  .blog-mobile-slide {
    flex-shrink: 0;
    /* Show ~88% of viewport width so the next card peeks */
    width: calc(88vw);
    scroll-snap-align: start;
  }
 
  /* ── Section header ── */
  .blog-section-label {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #A07830;
    font-weight: 400;
  }
 
  .blog-section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(24px, 3.5vw, 38px);
    font-weight: 300;
    color: #2C2110;
    line-height: 1.2;
    margin: 8px 0 0;
  }
 
  .blog-section-sub {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #7A6A52;
    margin: 12px auto 0;
    max-width: 460px;
    line-height: 1.65;
  }
 
  .blog-divider {
    width: 36px;
    height: 1px;
    background: linear-gradient(to right, #C9A84C, #E8C97A);
    margin: 12px auto 0;
  }
`;
 
// ─── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ title, excerpt, category, href, image, author, date, views }: BlogPost) {
  return (
    <a href={href} className="blog-card">
      <div className="blog-img-wrap">
        <img src={image} alt={title} loading="lazy" className="blog-img" />
      </div>
      <div className="blog-body">
        <span className="blog-category">{category}</span>
        <h3 className="blog-title">{title}</h3>
        <p className="blog-excerpt">{excerpt}</p>
        <div className="blog-meta">
          <span className="blog-author">{author}</span>
          <div className="blog-date-views">
            <span className="blog-date">{date}</span>
            <span className="blog-views">
              <Eye size={11} strokeWidth={1.6} />
              {formatViews(views)}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
 
// ─── Mobile Snap Carousel ─────────────────────────────────────────────────────
// Uses native CSS scroll-snap — no JS touch logic, no hover, cards with gaps,
// next card peeks from the right edge. Feels exactly like native mobile scrolling.
function MobileBlogCarousel() {
  return (
    <div className="md:hidden">
      <div className="blog-mobile-track">
        {blogs.map((blog) => (
          <div key={blog.href} className="blog-mobile-slide">
            <BlogCard {...blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
 
// ─── Desktop Infinite Carousel ────────────────────────────────────────────────
function DesktopBlogCarousel() {
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
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {[...blogs, ...blogs, ...blogs].map((blog, i) => (
          <div key={`${blog.href}-${i}`} style={{ flexShrink: 0, width: "300px" }}>
            <BlogCard {...blog} />
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
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
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
export default function LatestBlogsSection() {
  return (
    <section style={{ backgroundColor: "#FAF8F4" }} className="py-12 md:py-16">
      <style>{SHARED_STYLES}</style>
 
      {/* Header */}
      <div className="text-center mb-10 px-4">
        <p className="blog-section-label">Our Blog</p>
        <h2 className="blog-section-heading">
          Latest From <em>the Blog</em>
        </h2>
        <div className="blog-divider" />
        <p className="blog-section-sub">
          Top Astrologers &nbsp;·&nbsp; 24×7 Customer Support &nbsp;·&nbsp; Happy to Help
        </p>
      </div>
 
      <MobileBlogCarousel />
      <DesktopBlogCarousel />
    </section>
  );
}