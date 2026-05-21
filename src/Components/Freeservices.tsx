// src/components/FreeServicesSection.tsx
import { useRef, useState, useCallback, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
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

// ─── Gold tokens ──────────────────────────────────────────────────────────────
const GOLD = "#b8860b";        // DarkGoldenrod — rich gold
const GOLD_LIGHT = "#fefce8";  // yellow-50 equivalent
const GOLD_BORDER = "#fde68a"; // yellow-200 equivalent

const SLIDE_DURATION = 650;
const SLIDE_EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

// ─── Desktop carousel constants ───────────────────────────────────────────────
const CARD_W = 260;
const CARD_GAP = 20;
const STEP = CARD_W + CARD_GAP;

// ─── Shared Card ──────────────────────────────────────────────────────────────
function ServiceCard({ title, description, href, Icon }: Service) {
  return (
    <a
      href={href}
      className="flex flex-col bg-white rounded-2xl p-6 shadow-sm w-full no-underline"
      style={{ border: `1px solid ${GOLD_BORDER}` }}
    >
      <div
        className="w-14 h-14 flex items-center justify-center rounded-full mb-4"
        style={{
          border: `2px solid ${GOLD_BORDER}`,
          backgroundColor: GOLD_LIGHT,
        }}
      >
        <Icon size={24} strokeWidth={1.5} style={{ color: GOLD }} />
      </div>
      <h3
        className="text-base font-semibold mb-2"
        style={{ color: GOLD }}
      >
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </a>
  );
}

// ─── Mobile Infinite Carousel ─────────────────────────────────────────────────
// Clone buffer: [LAST_CLONE, ...real items, FIRST_CLONE]
const MOBILE_ITEMS = [services[services.length - 1], ...services, services[0]];

function MobileCarousel() {
  const [index, setIndex] = useState(1); // start at first real item
  const [animated, setAnimated] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const isTransitioning = useRef(false);

  const activeDot = ((index - 1) + services.length) % services.length;

  const goTo = useCallback((next: number, withAnim = true) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimated(withAnim);
    setIndex(next);
  }, []);

  const onTransitionEnd = useCallback(() => {
    isTransitioning.current = false;
    if (index === 0) {
      // landed on left clone → jump to real last
      setAnimated(false);
      setIndex(services.length);
    } else if (index === MOBILE_ITEMS.length - 1) {
      // landed on right clone → jump to real first
      setAnimated(false);
      setIndex(1);
    }
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimated(true))
    );
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
      {/* Sliding viewport */}
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
          {MOBILE_ITEMS.map((service, i) => (
            <div key={`${service.title}-${i}`} className="min-w-full">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i + 1)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeDot ? "24px" : "8px",
              height: "8px",
              backgroundColor: i === activeDot ? GOLD : GOLD_BORDER,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Infinite Carousel ────────────────────────────────────────────────
// Triple-clone trick: [...services, ...services, ...services]
// Start scrollLeft at 1× single-copy width (middle copy).
// Silently teleport when scrolling past the outer copies.
function DesktopCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const singleWidthRef = useRef(0);
  const stepRef = useRef(STEP);
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
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md transition-all duration-200"
        style={{ border: `1px solid ${GOLD}`, color: GOLD }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = GOLD_LIGHT)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "white")
        }
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Triple-cloned scrollable track */}
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
        {[...services, ...services, ...services].map((service, i) => (
          <div key={`${service.title}-${i}`} className="flex-shrink-0 w-[260px]">
            <ServiceCard {...service} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md transition-all duration-200"
        style={{ border: `1px solid ${GOLD}`, color: GOLD }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = GOLD_LIGHT)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "white")
        }
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function FreeServicesSection() {
  return (
    <section className="bg-white py-10 md:py-16 pb-10">
      <div className="max-w-6xl mx-auto text-center mb-8 md:mb-10 px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111111]">
          Try Before You <span className="text-[#b8860b]">Talk</span>
        </h2>
        <div className="mx-auto mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
      </div>

      <MobileCarousel />
      <DesktopCarousel />
    </section>
  );
}