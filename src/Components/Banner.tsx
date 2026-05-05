import { useEffect, useRef, useState } from "react";

import Banner1 from "../assets/Banner-1.png";
import Banner2 from "../assets/Banner-2.png";

const originalBanners = [
  { id: 1, image: Banner1, alt: "Banner 1" },
  { id: 2, image: Banner2, alt: "Banner 2" },
];

const banners = [...originalBanners, ...originalBanners];

const INITIAL_DELAY = 3000;
const AUTO_PLAY_INTERVAL = 4000;
const TRANSITION_DURATION = 600;

function useNavbarHeight() {
  const getHeight = () => {
    const w = window.innerWidth;
    if (w < 640) return 56;
    if (w < 1024) return 64;
    return 112;
  };
  const [height, setHeight] = useState(getHeight);
  useEffect(() => {
    const onResize = () => setHeight(getHeight());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return height;
}

function useBannerHeight() {
  const getHeight = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w < 640) return { height: Math.min(240, h - 56) };           // mobile
    if (w < 1024) return { height: Math.min(400, h - 64) };          // tablet
    return { height: Math.min(h - 112, Math.round(w * 0.36)) };     // desktop: 36vw max, never taller than viewport
  };
  const [size, setSize] = useState(getHeight);
  useEffect(() => {
    const onResize = () => setSize(getHeight());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isDesktop;
}

function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [animated, setAnimated] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const navbarHeight = useNavbarHeight();
  const { height: bannerHeight } = useBannerHeight();
  const isDesktop = useIsDesktop();

  const goToNext = () => {
    setAnimated(true);
    setCurrent((prev) => prev + 1);
  };

  const goToPrev = () => {
    setAnimated(true);
    setCurrent((prev) => {
      const next = prev - 1;
      if (next < 0) return originalBanners.length - 1;
      return next;
    });
  };

  const goToIndex = (index: number) => {
    if (index === current % originalBanners.length) return;
    setAnimated(true);
    setCurrent(index);
  };

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goToNext, AUTO_PLAY_INTERVAL);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (current >= originalBanners.length) {
      const timer = setTimeout(() => {
        setAnimated(false);
        setCurrent(current - originalBanners.length);
      }, TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [current]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setHasStarted(true);
      goToNext();
      startAutoPlay();
    }, INITIAL_DELAY);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    stopAutoPlay();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? goToNext() : goToPrev();
    }
    touchStartX.current = null;
    if (hasStarted) startAutoPlay();
  };

  const activeDot = current % originalBanners.length;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `${bannerHeight}px` }}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={() => { if (hasStarted) startAutoPlay(); }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Sliding track */}
      <div
        className="flex h-full"
        style={{
          width: `${banners.length * 100}%`,
          transform: `translateX(-${(current * 100) / banners.length}%)`,
          transition: animated
            ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.56, 0, 0.15, 1)`
            : "none",
        }}
      >
        {banners.map((banner, index) => (
          <div
            key={`${banner.id}-${index}`}
            className="relative h-full flex-shrink-0"
            style={{ width: `${100 / banners.length}%` }}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              className={[
                "h-full w-full",
                // Desktop: contain so full image visible, no crop
                // Mobile/tablet: cover so no letterboxing on small screens
                isDesktop ? "object-fill object-center" : "object-cover object-center",
              ].join(" ")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Left Arrow — hidden on mobile */}
      <button
        type="button"
        className="absolute left-3 sm:left-4 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 transition-all duration-300 hover:bg-white/40 hover:scale-110"
        onClick={() => { goToPrev(); stopAutoPlay(); if (hasStarted) startAutoPlay(); }}
        aria-label="Previous banner"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow — hidden on mobile */}
      <button
        type="button"
        className="absolute right-3 sm:right-4 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 transition-all duration-300 hover:bg-white/40 hover:scale-110"
        onClick={() => { goToNext(); stopAutoPlay(); if (hasStarted) startAutoPlay(); }}
        aria-label="Next banner"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2">
        {originalBanners.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => { goToIndex(index); stopAutoPlay(); if (hasStarted) startAutoPlay(); }}
            aria-label={`Go to banner ${index + 1}`}
            className="transition-all duration-300"
            style={{
              width: index === activeDot ? "20px" : "8px",
              height: "8px",
              borderRadius: "9999px",
              background: index === activeDot
                ? "linear-gradient(90deg, #f59e0b, #f97316)"
                : "rgba(255,255,255,0.6)",
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* Initial progress bar */}
      {!hasStarted && (
        <div className="absolute bottom-0 left-0 z-10 h-1 w-full bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-400"
            style={{ animation: `growWidth ${INITIAL_DELAY}ms linear forwards` }}
          />
        </div>
      )}

      <style>{`
        @keyframes growWidth {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default BannerCarousel;