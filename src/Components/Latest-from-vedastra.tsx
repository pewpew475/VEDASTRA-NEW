// src/components/LatestBlogsSection.tsx
import { useRef, useState, useCallback, useEffect } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPost {
  title: string;
  href: string;
  image: string;
  author: string;
  date: string;
  views: number;
}

const blogs: BlogPost[] = [
  {
    title: "How AI Is Transforming Modern Astrology Platforms",
    href: "/blog/ai-transforming-astrology",
    image: "https://placehold.co/300x200/fefce8/a16207?text=Blog+1",
    author: "Astrologer Anshika",
    date: "November 14, 2025",
    views: 8787,
  },
  {
    title: "Mars in Scorpio: Why Winning Is All You Think About",
    href: "/blog/mars-in-scorpio",
    image: "https://placehold.co/300x200/fefce8/a16207?text=Blog+2",
    author: "Astrologer Anshika",
    date: "November 06, 2025",
    views: 2342,
  },
  {
    title: "Jupiter in Cancer: Why Everyone's Talking About Marriage",
    href: "/blog/jupiter-in-cancer",
    image: "https://placehold.co/300x200/fefce8/a16207?text=Blog+3",
    author: "Astrologer Anshika",
    date: "October 29, 2025",
    views: 6564,
  },
  {
    title: "Ancient Ayurvedic Remedies and Astrology Combined",
    href: "/blog/ayurveda-astrology",
    image: "https://placehold.co/300x200/fefce8/a16207?text=Blog+4",
    author: "Astrologer Lakshita",
    date: "September 07, 2025",
    views: 76764,
  },
  {
    title: "Life Path Number 18: Meaning, Numerology & Personality",
    href: "/blog/life-path-18",
    image: "https://placehold.co/300x200/fefce8/a16207?text=Blog+5",
    author: "Astrologer Lakshita",
    date: "June 29, 2025",
    views: 865,
  },
  {
    title: "Life Path Number 17: Meaning, Karmic Life & Spirituality",
    href: "/blog/life-path-17",
    image: "https://placehold.co/300x200/fefce8/a16207?text=Blog+6",
    author: "Astrologer Lakshita",
    date: "June 28, 2025",
    views: 549,
  },
];

const formatViews = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

// ─── Gold color tokens (Tailwind classes) ─────────────────────────────────────
// yellow-700 = #a16207  → rich gold
// yellow-600 = #ca8a04  → mid gold
// yellow-100 = #fef9c3  → light gold tint
const gold = {
  text: "text-yellow-700",
  textMid: "text-yellow-600",
  textLight: "text-yellow-500",
  border: "border-yellow-200",
  borderMid: "border-yellow-400",
  bg: "bg-yellow-50",
  dot: "bg-yellow-600",
  dotInactive: "bg-yellow-200",
  btn: "border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700",
  divider: "from-yellow-400 to-yellow-600",
  eyebrow: "text-yellow-500",
};

const SLIDE_DURATION = 650;
const SLIDE_EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

// ─── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ title, href, image, author, date, views }: BlogPost) {
  return (
    <a
      href={href}
      className={`flex flex-col bg-white ${gold.border} border rounded-2xl overflow-hidden shadow-sm no-underline group`}
    >
      <div className="overflow-hidden aspect-[3/2]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Views */}
        <div className={`flex items-center gap-1.5 text-xs ${gold.textLight} font-medium`}>
          <Eye size={13} strokeWidth={1.8} />
          <span>{formatViews(views)} views</span>
        </div>

        {/* Title */}
        <h3 className={`min-h-[2.75rem] text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:${gold.text} transition-colors duration-200`}>
          {title}
        </h3>

        {/* Author + Date */}
        <div className={`mt-auto flex items-center justify-between text-xs text-gray-400 border-t ${gold.border} pt-3`}>
          <span className={`font-semibold ${gold.textMid} truncate max-w-[55%]`}>
            {author}
          </span>
          <span className="whitespace-nowrap">{date}</span>
        </div>
      </div>
    </a>
  );
}

// ─── Mobile Infinite Carousel ─────────────────────────────────────────────────
//
// Strategy: render [last, ...all, first] (total = blogs.length + 2 clones)
// • Index 0           = clone of last  → silent jump to real last  (index N)
// • Index 1…N         = real items
// • Index N+1         = clone of first → silent jump to real first (index 1)
//
// "silent jump" = set transition to "none", change index, re-enable transition
// ─────────────────────────────────────────────────────────────────────────────
const MOBILE_ITEMS = [blogs[blogs.length - 1], ...blogs, blogs[0]];

function MobileBlogCarousel() {
  // Start at index 1 (first real item)
  const [index, setIndex] = useState(1);
  const [animated, setAnimated] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const isTransitioning = useRef(false);

  // Active dot = index - 1, clamped to [0, blogs.length-1]
  const activeDot = ((index - 1) + blogs.length) % blogs.length;

  const goTo = useCallback((next: number, withAnim = true) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimated(withAnim);
    setIndex(next);
  }, []);

  // After transition ends, silently jump from clone to real item
  const onTransitionEnd = useCallback(() => {
    isTransitioning.current = false;
    if (index === 0) {
      // landed on left clone → jump to real last
      setAnimated(false);
      setIndex(blogs.length);
    } else if (index === MOBILE_ITEMS.length - 1) {
      // landed on right clone → jump to real first
      setAnimated(false);
      setIndex(1);
    }
    // re-enable animation after the silent jump on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimated(true));
    });
  }, [index]);

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="md:hidden px-4">
      <div
        className="overflow-hidden rounded-2xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex will-change-transform"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: animated
              ? `transform ${SLIDE_DURATION}ms ${SLIDE_EASE}`
              : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {MOBILE_ITEMS.map((blog, i) => (
            <div key={`${blog.href}-${i}`} className="min-w-full">
              <BlogCard {...blog} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {blogs.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i + 1)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeDot
                ? `w-6 h-2 ${gold.dot}`
                : `w-2 h-2 ${gold.dotInactive} hover:bg-yellow-300`
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Infinite Carousel ────────────────────────────────────────────────
//
// Strategy: render [...blogs, ...blogs, ...blogs] (triple clone)
// Start scrollLeft at exactly 1× the original track width.
// On scroll, if user goes past the 2nd copy → jump back to 1st copy position.
// If user scrolls before the 1st copy → jump forward to 2nd copy position.
// Both jumps are instantaneous (no transition) so they're invisible.
// ─────────────────────────────────────────────────────────────────────────────
const CARD_W = 270;   // px — must match w-[270px] on cards
const CARD_GAP = 20;  // px — must match gap-5 (5 * 4 = 20px)
const STEP = CARD_W + CARD_GAP; // scroll per arrow click

function DesktopBlogCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const singleWidthRef = useRef(0);
  const stepRef = useRef(STEP);
  const rafRef = useRef<number | null>(null);

  // Initialise scroll to start of the middle copy
  const initScroll = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    (trackRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    requestAnimationFrame(() => {
      const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "0");
      const firstCard = el.firstElementChild as HTMLElement | null;
      if (firstCard) {
        stepRef.current = firstCard.getBoundingClientRect().width + gap;
      }
      singleWidthRef.current = el.scrollWidth / 3;
      el.scrollLeft = singleWidthRef.current;
    });
  }, []);

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const singleWidth = singleWidthRef.current;
      if (!singleWidth) return;
      if (el.scrollLeft < singleWidth) {
        el.scrollLeft += singleWidth;
      } else if (el.scrollLeft >= singleWidth * 2) {
        el.scrollLeft -= singleWidth;
      }
    });
  }, []);

  const scroll = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: dir === "right" ? stepRef.current : -stepRef.current,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const el = trackRef.current;
      if (!el) return;
      const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "0");
      const firstCard = el.firstElementChild as HTMLElement | null;
      if (firstCard) {
        stepRef.current = firstCard.getBoundingClientRect().width + gap;
      }
      singleWidthRef.current = el.scrollWidth / 3;
      el.scrollLeft = singleWidthRef.current;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="hidden md:block max-w-6xl mx-auto relative px-10">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10
          bg-white border ${gold.btn} rounded-full
          p-2 shadow-md transition-all duration-200`}
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Track — triple-cloned for seamless infinite loop */}
      <div
        ref={initScroll}
        onScroll={handleScroll}
        className="
          flex gap-5 overflow-x-auto
          [&::-webkit-scrollbar]:hidden
          [scrollbar-width:none]
          [-ms-overflow-style:none]
        "
      >
        {[...blogs, ...blogs, ...blogs].map((blog, i) => (
          <div key={`${blog.href}-${i}`} className="flex-shrink-0 w-[270px]">
            <BlogCard {...blog} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10
          bg-white border ${gold.btn} rounded-full
          p-2 shadow-md transition-all duration-200`}
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function LatestBlogsSection() {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="max-w-6xl mx-auto text-center mb-8 md:mb-10 px-4">
        <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${gold.eyebrow} mb-2`}>
          Our Blog
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111111]">
          Latest From <span className="text-[#b8860b]">Blog</span>
        </h2>
        <div className="mx-auto mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
        <p className="mt-3 text-sm text-gray-400">
          Top Astrologers &nbsp;·&nbsp; 24×7 Customer Support &nbsp;·&nbsp; Happy to Help
        </p>
      </div>

      <MobileBlogCarousel />
      <DesktopBlogCarousel />
    </section>
  );
}