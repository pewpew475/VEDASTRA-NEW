import { useEffect, useState } from "react";
import welcomeScreenImage from "../assets/Welcome-screen-image.webp";

interface WelcomeScreenProps {
  onComplete?: () => void;
  duration?: number; // ms, default 6000
  wheelImageSrc?: string; // path to your zodiac wheel image
}

export default function WelcomeScreen({
  onComplete,
  duration = 6000,
  wheelImageSrc = welcomeScreenImage,
}: WelcomeScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), duration - 1000);
    const doneTimer = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [duration, onComplete]);

  if (done) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white",
        exiting ? "opacity-0 transition-opacity duration-[1000ms] ease-in-out pointer-events-none"
                : "opacity-100",
      ].join(" ")}
      role="region"
      aria-live="polite"
      aria-label="Welcome to Vedastraa"
    >

      {/* ── Border rules ── */}
      <div className="absolute top-[22px] left-[60px] right-[60px] h-px bg-[#c9a84c] opacity-60"
           style={{ animation: "rule-expand 1.2s 0.5s cubic-bezier(0.16,1,0.3,1) both" }} aria-hidden="true" />
      <div className="absolute bottom-[22px] left-[60px] right-[60px] h-px bg-[#c9a84c] opacity-60"
           style={{ animation: "rule-expand 1.2s 0.5s cubic-bezier(0.16,1,0.3,1) both" }} aria-hidden="true" />
      <div className="absolute left-[22px] top-[60px] bottom-[60px] w-px bg-[#c9a84c] opacity-60"
           style={{ animation: "rule-expand-v 1.2s 0.5s cubic-bezier(0.16,1,0.3,1) both" }} aria-hidden="true" />
      <div className="absolute right-[22px] top-[60px] bottom-[60px] w-px bg-[#c9a84c] opacity-60"
           style={{ animation: "rule-expand-v 1.2s 0.5s cubic-bezier(0.16,1,0.3,1) both" }} aria-hidden="true" />

      {/* ── Corner ornaments ── */}
      {(["tl","tr","bl","br"] as const).map((pos) => {
        const rotMap = { tl: "rotate(0deg)", tr: "rotate(90deg)", bl: "rotate(270deg)", br: "rotate(180deg)" };
        const posMap = {
          tl: "top-[18px] left-[18px]",
          tr: "top-[18px] right-[18px]",
          bl: "bottom-[18px] left-[18px]",
          br: "bottom-[18px] right-[18px]",
        };
        return (
          <svg
            key={pos}
            className={`absolute w-[80px] h-[80px] opacity-50 ${posMap[pos]}`}
            style={{ transform: rotMap[pos], animation: "fade-in 1.8s ease forwards" }}
            viewBox="0 0 90 90"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 86 L4 4 L86 4" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
            <path d="M4 4 L26 26" stroke="#c9a84c" strokeWidth="0.8" opacity="0.6" />
            <circle cx="4" cy="4" r="3.5" fill="#c9a84c" />
            <circle cx="4" cy="4" r="6" stroke="#c9a84c" strokeWidth="0.6" fill="none" opacity="0.4" />
            <path d="M20 4 Q12 12 4 20" stroke="#c9a84c" strokeWidth="0.6" fill="none" opacity="0.5" />
            <path d="M36 4 Q20 20 4 36" stroke="#c9a84c" strokeWidth="0.4" fill="none" opacity="0.3" />
          </svg>
        );
      })}

      {/* ── Main layout ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full h-full gap-0">

        {/* Overline */}
        <p
          className="font-['Cinzel',serif] text-[#c9a84c] tracking-[0.45em] uppercase mb-3"
          style={{ fontSize: "clamp(0.55rem,1.1vw,0.7rem)", animation: "fade-in-down 1s 0.3s ease both" }}
        >
          Ancient Vedic Wisdom
        </p>

        {/* Zodiac wheel */}
        <div
          className="relative flex-shrink-0"
          style={{ width: "min(52vw,420px)", height: "min(52vw,420px)", animation: "wheel-appear 1.6s 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
          aria-hidden="true"
        >
          {/* Halos */}
          <div className="absolute rounded-full border border-[rgba(201,168,76,0.2)]"
               style={{ inset: "-10%", animation: "halo-pulse 3s ease-in-out infinite" }} />
          <div className="absolute rounded-full border border-[rgba(201,168,76,0.1)]"
               style={{ inset: "-22%", animation: "halo-pulse 3s 1.5s ease-in-out infinite" }} />
          <img
            src={wheelImageSrc}
            alt="Vedastraa welcome illustration"
            width={420}
            height={420}
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain"
            style={{
              animation: "wheel-rotate 80s linear infinite",
              filter: "drop-shadow(0 0 28px rgba(201,168,76,0.35)) drop-shadow(0 0 8px rgba(201,168,76,0.2))",
            }}
          />
        </div>

        {/* Brand block */}
        <div
          className="flex flex-col items-center mt-6"
          style={{ animation: "fade-in-up 1.2s 1s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <h1
            className="font-['Cinzel_Decorative',serif] font-bold text-[#1a1000] tracking-[0.18em] uppercase leading-none"
            style={{ fontSize: "clamp(2rem,5.5vw,3.6rem)" }}
          >
            Vedastraa
          </h1>

          {/* Ornament divider */}
          <div className="flex items-center gap-2.5 my-3.5" aria-hidden="true">
            <div className="h-px bg-[#c9a84c]" style={{ width: "clamp(48px,7vw,90px)" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] flex-shrink-0" />
            <div className="w-2 h-2 bg-[#c9a84c] flex-shrink-0" style={{ transform: "rotate(45deg)" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] flex-shrink-0" />
            <div className="h-px bg-[#c9a84c]" style={{ width: "clamp(48px,7vw,90px)" }} />
          </div>

          <p
            className="font-['EB_Garamond',Georgia,serif] italic text-[#8a6a1a] tracking-[0.06em]"
            style={{ fontSize: "clamp(0.9rem,2vw,1.15rem)" }}
          >
            Ancient Wisdom. Modern Guidance.
          </p>
          <p
            className="font-['Cinzel',serif] text-[#b89030] tracking-[0.35em] uppercase opacity-80 mt-1.5"
            style={{ fontSize: "clamp(0.55rem,1.2vw,0.68rem)" }}
          >
            Astrology &nbsp;&bull;&nbsp; Kundli &nbsp;&bull;&nbsp; Spiritual Guidance
          </p>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes fade-in        { from{opacity:0} to{opacity:1} }
        @keyframes fade-in-up     { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade-in-down   { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wheel-appear   { from{opacity:0;transform:scale(0.88) rotate(-6deg)} to{opacity:1;transform:scale(1) rotate(0deg)} }
        @keyframes wheel-rotate   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes halo-pulse     { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.03)} }
        @keyframes rule-expand    { from{opacity:0;transform:scaleX(0)} to{opacity:0.6;transform:scaleX(1)} }
        @keyframes rule-expand-v  { from{opacity:0;transform:scaleY(0)} to{opacity:0.6;transform:scaleY(1)} }
        @media (prefers-reduced-motion:reduce){
          *,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}
        }
      `}</style>
    </div>
  );
}