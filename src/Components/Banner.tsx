import { useCallback, useEffect, useRef, useState } from "react";

import Banner1 from "../assets/Banner-1.webp";
import Banner2 from "../assets/Banner-2.webp";
import Banner3 from "../assets/Banner-3.webp";
import Banner4 from "../assets/Banner-4.webp";
import Banner5 from "../assets/Banner-5.webp";
import Banner6 from "../assets/Banner-6.webp";
import Banner7 from "../assets/Banner-7.webp";
import PhoneBanner1 from "../assets/Phone-banner-1.webp";
import PhoneBanner2 from "../assets/Pnone-banner-2.webp";
import PhoneBanner3 from "../assets/Phone-banner-3.webp";
import PhoneBanner4 from "../assets/Phone-banner-4.webp";
import PhoneBanner5 from "../assets/Phone-banner-5.webp";
import PhoneBanner6 from "../assets/Phone-banner-6.webp";
import PhoneBanner7 from "../assets/Phone-banner-7.webp";

type BannerItem = {
  id: number;
  image: string;
  alt: string;
  mobileImage?: string;
};

type BannerCarouselProps = {
  initialDelayMs?: number;
};

const desktopBanners: BannerItem[] = [
  { id: 1, image: Banner1, mobileImage: PhoneBanner1, alt: "Banner 1" },
  { id: 2, image: Banner2, mobileImage: PhoneBanner2, alt: "Banner 2" },
  { id: 3, image: Banner3, mobileImage: PhoneBanner3, alt: "Banner 3" },
  { id: 7, image: Banner7, mobileImage: PhoneBanner7, alt: "Banner 7" },
  { id: 5, image: Banner5, mobileImage: PhoneBanner5, alt: "Banner 5" },
  { id: 6, image: Banner6, mobileImage: PhoneBanner6, alt: "Banner 6" },
  { id: 4, image: Banner4, mobileImage: PhoneBanner4, alt: "Banner 4" },
];

const mobileBanners: BannerItem[] = [
  { id: 1, image: Banner1, mobileImage: PhoneBanner1, alt: "Banner 1" },
  { id: 2, image: Banner2, mobileImage: PhoneBanner2, alt: "Banner 2" },
  { id: 3, image: Banner3, mobileImage: PhoneBanner3, alt: "Banner 3" },
  { id: 7, image: Banner7, mobileImage: PhoneBanner7, alt: "Banner 7" },
  { id: 5, image: Banner5, mobileImage: PhoneBanner5, alt: "Banner 5" },
  { id: 6, image: Banner6, mobileImage: PhoneBanner6, alt: "Banner 6" },
  { id: 4, image: Banner4, mobileImage: PhoneBanner4, alt: "Banner 4" },
];

const desktopSlides = [...desktopBanners, ...desktopBanners];
const INITIAL_DELAY = 3000;
const AUTO_PLAY_INTERVAL = 4000;
const TRANSITION_DURATION = 600;


function useBannerHeight(mobileRatio: number | null) {
  const getHeight = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w < 640) {
      const ratio = mobileRatio ?? 0.75;
      const desired = Math.round(w / ratio);
      return { height: Math.min(desired, h - 56) }; // mobile
    }
    if (w < 1024) return { height: Math.min(400, h - 64) };          // tablet
    return { height: Math.max(0, h - 160) };                         // desktop: slightly shorter to keep full image visible
  }, [mobileRatio]);
  const [size, setSize] = useState(() => getHeight());
  useEffect(() => {
    const onResize = () => setSize(getHeight());
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [getHeight]);
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

function useImageAspectRatio(src: string) {
  const [ratio, setRatio] = useState<number | null>(null);
  useEffect(() => {
    const img = new Image();
    const onLoad = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setRatio(img.naturalWidth / img.naturalHeight);
      }
    };
    img.addEventListener("load", onLoad);
    img.src = src;
    if (img.complete) onLoad();
    return () => img.removeEventListener("load", onLoad);
  }, [src]);
  return ratio;
}

function BannerCarousel({ initialDelayMs = INITIAL_DELAY }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [animated, setAnimated] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const mobileAspectRatio = useImageAspectRatio(PhoneBanner1);
  const { height: bannerHeight } = useBannerHeight(mobileAspectRatio);
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const baseBanners = isMobile ? mobileBanners : desktopBanners;
  const slides = isMobile ? mobileBanners : desktopSlides;

  const goToNext = useCallback(() => {
    if (baseBanners.length <= 1) return;
    setAnimated(true);
    setCurrent((prev) => prev + 1);
  }, [baseBanners.length]);

  const goToPrev = useCallback(() => {
    if (baseBanners.length <= 1) return;
    setAnimated(true);
    setCurrent((prev) => {
      const next = prev - 1;
      if (next < 0) return baseBanners.length - 1;
      return next;
    });
  }, [baseBanners.length]);

  const goToIndex = useCallback((index: number) => {
    if (index === current % baseBanners.length) return;
    setAnimated(true);
    setCurrent(index);
  }, [baseBanners.length, current]);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goToNext, AUTO_PLAY_INTERVAL);
  }, [goToNext]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (baseBanners.length <= 1) return;
    if (current >= baseBanners.length) {
      const timer = setTimeout(() => {
        setAnimated(false);
        setCurrent(current - baseBanners.length);
      }, TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [baseBanners.length, current]);

  useEffect(() => {
    if (baseBanners.length <= 1) return;
    timeoutRef.current = setTimeout(() => {
      setHasStarted(true);
      goToNext();
      startAutoPlay();
    }, initialDelayMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [baseBanners.length, initialDelayMs, goToNext, startAutoPlay]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    stopAutoPlay();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    if (hasStarted) startAutoPlay();
  };

  const activeDot = current % baseBanners.length;

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
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(current * 100) / slides.length}%)`,
          transition: animated
            ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.56, 0, 0.15, 1)`
            : "none",
        }}
      >
        {slides.map((banner, index) => (
          <div
            key={`${banner.id}-${index}`}
            className="relative h-full flex-shrink-0"
            style={{ width: `${100 / slides.length}%` }}
          >
            <img
              src={!isDesktop && banner.mobileImage ? banner.mobileImage : banner.image}
              alt={banner.alt}
              className={[
                "h-full w-full",
                // Desktop: contain so full image visible, no crop
                // Mobile/tablet: contain so full image remains visible
                isDesktop ? "object-fill object-center" : "object-contain object-center",
              ].join(" ")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Left Arrow — hidden on mobile */}
      {baseBanners.length > 1 && (
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
      )}

      {/* Right Arrow — hidden on mobile */}
      {baseBanners.length > 1 && (
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
      )}

      {/* Dot Indicators */}
      {baseBanners.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2">
          {baseBanners.map((_, index) => (
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
      )}

      {/* Initial progress bar */}
      {!hasStarted && baseBanners.length > 1 && (
        <div className="absolute bottom-0 left-0 z-10 h-1 w-full bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-400"
            style={{ animation: `growWidth ${initialDelayMs}ms linear forwards` }}
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