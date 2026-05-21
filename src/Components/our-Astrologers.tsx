// src/components/OurAstrologersSection.tsx
import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Astrologer {
  name: string;
  skill: string;
  href: string;
  image: string;
  rating: number;
  experience: string;
}

const astrologers: Astrologer[] = [
  {
    name: "Vvinod",
    skill: "Vedic Astrology",
    href: "/astrologer/vvinod",
    image: "https://placehold.co/130x130/fefce8/a16207?text=VV",
    rating: 4.8,
    experience: "12 yrs",
  },
  {
    name: "Sujata",
    skill: "Vedic Astrology",
    href: "/astrologer/sujata",
    image: "https://placehold.co/130x130/fefce8/a16207?text=SJ",
    rating: 4.7,
    experience: "9 yrs",
  },
  {
    name: "Satyesh",
    skill: "Vedic Astrology",
    href: "/astrologer/satyesh",
    image: "https://placehold.co/130x130/fefce8/a16207?text=ST",
    rating: 4.9,
    experience: "15 yrs",
  },
  {
    name: "Sonia",
    skill: "Numerology",
    href: "/astrologer/sonia",
    image: "https://placehold.co/130x130/fefce8/a16207?text=SN",
    rating: 4.6,
    experience: "7 yrs",
  },
  {
    name: "Rachna",
    skill: "Numerology",
    href: "/astrologer/rachna",
    image: "https://placehold.co/130x130/fefce8/a16207?text=RC",
    rating: 4.5,
    experience: "8 yrs",
  },
  {
    name: "Suman",
    skill: "Vedic Astrology",
    href: "/astrologer/suman",
    image: "https://placehold.co/130x130/fefce8/a16207?text=SM",
    rating: 4.7,
    experience: "11 yrs",
  },
  {
    name: "Nnishha",
    skill: "Vasthu",
    href: "/astrologer/nnishha",
    image: "https://placehold.co/130x130/fefce8/a16207?text=NN",
    rating: 4.8,
    experience: "10 yrs",
  },
  {
    name: "AjayK",
    skill: "Vedic Astrology",
    href: "/astrologer/ajayk",
    image: "https://placehold.co/130x130/fefce8/a16207?text=AK",
    rating: 4.9,
    experience: "14 yrs",
  },
];

const GOLD        = "#b8860b";
const GOLD_LIGHT  = "#fefce8";
const GOLD_BORDER = "#fde68a";

const DESKTOP_CARD_W = 160;
const DESKTOP_GAP    = 20;
const DESKTOP_STEP   = DESKTOP_CARD_W + DESKTOP_GAP;
const SLIDE_DURATION = 650;
const SLIDE_EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

const MOBILE_VISIBLE = 2;
const MOBILE_CLONES = 2;
const MOBILE_ITEMS = [
  ...astrologers.slice(-MOBILE_CLONES),
  ...astrologers,
  ...astrologers.slice(0, MOBILE_CLONES),
];

// ─── Astrologer Card ──────────────────────────────────────────────────────────
function AstrologerCard({ name, skill, href, image, rating, experience }: Astrologer) {
  return (
    <a
      href={href}
      className="flex flex-col items-center bg-white rounded-2xl p-4 shadow-sm w-full no-underline"
      style={{ border: `1px solid ${GOLD_BORDER}` }}
    >
      <div
        className="rounded-full p-[3px] mb-3 flex-shrink-0"
        style={{ background: `linear-gradient(135deg, #d4a017, ${GOLD})` }}
      >
        <div className="rounded-full overflow-hidden bg-white">
          <img
            src={image}
            alt={name}
            loading="lazy"
            width={90}
            height={90}
            className="w-[90px] h-[90px] object-cover rounded-full"
          />
        </div>
      </div>
      <p className="text-sm font-bold text-center leading-tight mb-0.5" style={{ color: GOLD }}>
        {name}
      </p>
      <p className="text-xs text-gray-400 text-center mb-2 leading-tight">{skill}</p>
      <div
        className="flex items-center justify-between w-full mt-auto pt-2"
        style={{ borderTop: `1px solid ${GOLD_BORDER}` }}
      >
        <div className="flex items-center gap-0.5">
          <Star size={11} strokeWidth={0} fill={GOLD} />
          <span className="text-xs font-semibold" style={{ color: GOLD }}>{rating}</span>
        </div>
        <span className="text-xs text-gray-400">{experience}</span>
      </div>
    </a>
  );
}

// ─── Mobile Infinite Carousel ─────────────────────────────────────────────────
//
// Strategy: triple-clone track, start at middle copy.
// Teleport ONLY fires after scrolling has fully stopped (150ms debounce).
// This prevents the mid-momentum glitch where the browser briefly reports
// scrollLeft near 0 during deceleration, triggering a false teleport.
// ─────────────────────────────────────────────────────────────────────────────
function MobileCarousel() {
  const [index, setIndex] = useState(MOBILE_CLONES);
  const [animated, setAnimated] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const isTransitioning = useRef(false);

  const goTo = useCallback((next: number, withAnim = true) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimated(withAnim);
    setIndex(next);
  }, []);

  const onTransitionEnd = useCallback(() => {
    isTransitioning.current = false;
    if (index <= MOBILE_CLONES - 1) {
      setAnimated(false);
      setIndex(index + astrologers.length);
    } else if (index >= astrologers.length + MOBILE_CLONES) {
      setAnimated(false);
      setIndex(index - astrologers.length);
    }
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
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
      <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          className="flex will-change-transform"
          style={{
            transform: `translateX(-${index * (100 / MOBILE_VISIBLE)}%)`,
            transition: animated
              ? `transform ${SLIDE_DURATION}ms ${SLIDE_EASE}`
              : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {MOBILE_ITEMS.map((a, i) => (
            <div key={`${a.href}-${i}`} className="flex-none w-1/2 px-2">
              <AstrologerCard {...a} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Infinite Carousel ────────────────────────────────────────────────
//
// Strategy: triple-clone track, start at middle copy.
// scrollBy({ behavior:'smooth' }) fires many onScroll events mid-animation.
// Debounce (100ms) ensures teleport only fires AFTER smooth scroll completes,
// preventing mid-animation boundary crossings from triggering false jumps.
// ─────────────────────────────────────────────────────────────────────────────
function DesktopCarousel() {
  const trackRef    = useRef<HTMLDivElement | null>(null);
  const singleWidthRef = useRef(0);
  const stepRef = useRef(DESKTOP_STEP);
  const rafRef = useRef<number | null>(null);

  const initScroll = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    trackRef.current = el;
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
      const sw = singleWidthRef.current;
      if (!sw) return;
      if (el.scrollLeft >= sw * 2) {
        el.scrollLeft -= sw;
      } else if (el.scrollLeft < sw) {
        el.scrollLeft += sw;
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
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md transition-all duration-200"
        style={{ border: `1px solid ${GOLD}`, color: GOLD }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD_LIGHT)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>

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
        {[...astrologers, ...astrologers, ...astrologers].map((a, i) => (
          <div key={`${a.href}-${i}`} className="flex-shrink-0 w-[160px]">
            <AstrologerCard {...a} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md transition-all duration-200"
        style={{ border: `1px solid ${GOLD}`, color: GOLD }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD_LIGHT)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function OurAstrologersSection() {
  return (
    <section className="bg-white pt-10 pb-0 md:py-16">
      <div className="max-w-6xl mx-auto text-center mb-8 md:mb-10 px-4">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
          style={{ color: GOLD }}
        >
          Meet The Experts
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#b8860b]">
          Our Astrologers
        </h2>
        <div className="mx-auto mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
        <p className="mt-3 text-sm text-gray-400">
          Best Astrologers from India for Online Consultation
        </p>
      </div>

      <MobileCarousel />
      <DesktopCarousel />
    </section>
  );
}