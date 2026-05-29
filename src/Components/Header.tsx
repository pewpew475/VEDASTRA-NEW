// src/components/HeroSection.tsx
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";

import AquariusImg    from "../assets/Header-images/Aquarius.webp";
import AriesImg       from "../assets/Header-images/Aries.webp";
import CancerImg      from "../assets/Header-images/Cancer.webp";
import CapricornImg   from "../assets/Header-images/Capricorn.webp";
import GeminiImg      from "../assets/Header-images/Gemini.webp";
import LeoImg         from "../assets/Header-images/Leo.webp";
import LibraImg       from "../assets/Header-images/Libra.webp";
import PiscesImg      from "../assets/Header-images/Pisces.webp";
import SagittariusImg from "../assets/Header-images/Sagittarius.webp";
import ScorpioImg     from "../assets/Header-images/Scorpio.webp";
import TaurusImg      from "../assets/Header-images/Taurus.webp";
import VirgoImg       from "../assets/Header-images/Virgo.webp";

// ─── Data ────────────────────────────────────────────────────────────────────
const rashis = [
  { name:"Aries",       hindi:"मेष",     element:"Fire",  ruling:"Mars",    date:"Mar 21 – Apr 19", image:AriesImg },
  { name:"Taurus",      hindi:"वृषभ",    element:"Earth", ruling:"Venus",   date:"Apr 20 – May 20", image:TaurusImg },
  { name:"Gemini",      hindi:"मिथुन",   element:"Air",   ruling:"Mercury", date:"May 21 – Jun 20", image:GeminiImg },
  { name:"Cancer",      hindi:"कर्क",    element:"Water", ruling:"Moon",    date:"Jun 21 – Jul 22", image:CancerImg },
  { name:"Leo",         hindi:"सिंह",    element:"Fire",  ruling:"Sun",     date:"Jul 23 – Aug 22", image:LeoImg },
  { name:"Virgo",       hindi:"कन्या",   element:"Earth", ruling:"Mercury", date:"Aug 23 – Sep 22", image:VirgoImg },
  { name:"Libra",       hindi:"तुला",    element:"Air",   ruling:"Venus",   date:"Sep 23 – Oct 22", image:LibraImg },
  { name:"Scorpio",     hindi:"वृश्चिक", element:"Water", ruling:"Mars",    date:"Oct 23 – Nov 21", image:ScorpioImg },
  { name:"Sagittarius", hindi:"धनु",     element:"Fire",  ruling:"Jupiter", date:"Nov 22 – Dec 21", image:SagittariusImg },
  { name:"Capricorn",   hindi:"मकर",     element:"Earth", ruling:"Saturn",  date:"Dec 22 – Jan 19", image:CapricornImg },
  { name:"Aquarius",    hindi:"कुंभ",    element:"Air",   ruling:"Saturn",  date:"Jan 20 – Feb 18", image:AquariusImg },
  { name:"Pisces",      hindi:"मीन",     element:"Water", ruling:"Jupiter", date:"Feb 19 – Mar 20", image:PiscesImg },
];

const RASHI_IMAGES = rashis.map((r) => r.image);

const DESC: Record<string,string> = {
  Aries:       "Bold and ambitious, Aries charges ahead with fearless courage. You are the trailblazer of the zodiac — driven by passion and an unstoppable will to lead, conquer, and create.",
  Taurus:      "Grounded and steadfast, Taurus moves with patient determination. You are drawn to beauty, comfort, and loyalty — building a life of lasting abundance through quiet perseverance.",
  Gemini:      "Curious and ever-adapting, Gemini dances between worlds of thought and conversation. Your quick mind and vibrant energy make you the zodiac's most versatile and fascinating soul.",
  Cancer:      "Deeply intuitive and nurturing, Cancer moves through the world guided by feeling. You are the heart of the zodiac — protective, empathetic, and profoundly connected to home and loved ones.",
  Leo:         "Radiant and magnetic, Leo commands every room with natural grace and warmth. You are the sun of the zodiac — generous, creative, and born to inspire all who orbit your brilliance.",
  Virgo:       "Precise and thoughtful, Virgo notices what others overlook. Your gift is transformation — refining the raw into something perfect through dedication, wisdom, and humble service.",
  Libra:       "Elegant and harmonious, Libra seeks balance in all things. You are the diplomat of the zodiac — charming, just, and driven by an innate longing for beauty, fairness, and connection.",
  Scorpio:     "Intense and transformative, Scorpio dives into depths others dare not enter. Your power is unmatched — a fierce blend of passion, insight, and the courage to emerge reborn.",
  Sagittarius: "Free-spirited and philosophical, Sagittarius gallops toward the horizon in search of truth. You are the explorer of the zodiac — forever expanding your world with wisdom and wanderlust.",
  Capricorn:   "Disciplined and resolute, Capricorn climbs steadily toward its highest summit. You are the achiever of the zodiac — patient, strategic, and destined for greatness.",
  Aquarius:    "Visionary and unconventional, Aquarius sees the world not as it is but as it could be. You are the innovator of the zodiac — intellectually brilliant and ahead of your time.",
  Pisces:      "Mystical and compassionate, Pisces exists at the intersection of dream and reality. You are the soul of the zodiac — intuitive, artistic, and endlessly empathetic.",
};

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL     = rashis.length;
const SIZE_BOOST = 2;
const D_VISUAL = 1;
const M_VISUAL = 2;
const D_CENTER  = 180;   // desktop arc: active points straight left
const D_STEP    = 26;    // degrees between desktop slots
const M_CENTER  = 90;    // mobile smile: 90° = sin=+1 = bottom
const M_STEP    = 42;    // degrees between mobile slots
const AUTO_MS   = 3800;  // auto-advance interval

// ─── Geometry ────────────────────────────────────────────────────────────────
function getOff(i: number, a: number) {
  let d = i - a;
  if (d >  TOTAL / 2) d -= TOTAL;
  if (d < -TOTAL / 2) d += TOTAL;
  return d;
}

function deskXY(off: number, R: number) {
  const rad = ((D_CENTER - off * D_STEP) * Math.PI) / 180;
  return { x: Math.cos(rad) * R, y: Math.sin(rad) * R };
}

function mobSmileXY(off: number, R: number) {
  const deg = M_CENTER - off * M_STEP;
  const rad = deg * Math.PI / 180;
  return { x: Math.cos(rad) * R, y: Math.sin(rad) * R };
}

// ─── Opacity by slot distance ─────────────────────────────────────────────────
function slotOpacity(abs: number): number {
  if (abs === 0) return 1;
  if (abs === 1) return 0.78;
  if (abs === 2) return 0.48;
  if (abs === 3) return 0.18;
  return 0;
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

  @keyframes slowSpin { 
    from { transform:translateY(-50%) rotate(0deg); } 
    to   { transform:translateY(-50%) rotate(360deg); } 
  }
  @keyframes arcDraw { 
    from { stroke-dashoffset:1600; } 
    to   { stroke-dashoffset:0; } 
  }

  /* ── Layout ── */
  .hero-section {
    position:relative; width:100%; overflow:hidden;
    display:flex; flex-direction:column;
    padding-bottom:clamp(24px,5vh,80px);
    background-color:#F3EEE6;
    background-image:
      radial-gradient(ellipse 60% 55% at 18% 50%, rgba(201,168,76,.08) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 82% 50%, rgba(201,168,76,.10) 0%, transparent 55%),
      radial-gradient(circle at 1px 1px, rgba(160,120,48,.05) 1px, transparent 0);
    background-size:auto,auto,28px 28px;
  }
  .hero-bottom-fade {
    position:absolute; bottom:0; left:0; right:0; height:80px;
    background:linear-gradient(to bottom,transparent,#F3EEE6);
    pointer-events:none; z-index:18;
  }
  .hero-zodiac-ring {
    position:absolute; right:-4%; top:50%;
    transform:translateY(-50%);
    width:min(680px,50vw); aspect-ratio:1;
    pointer-events:none; z-index:2;
    animation:slowSpin 120s linear infinite;
  }
  @media(min-width:900px){ .hero-zodiac-ring{ right:calc(-4% - 400px); } }

  .hero-desk{ display:none; }
  @media(min-width:900px){
    .hero-desk{
      display:grid; grid-template-columns:52% 48%;
      width:100%; max-width:1440px; margin:0 auto;
      position:relative; z-index:5; align-items:stretch;
    }
    .hero-mob{ display:none !important; }
  }
  .hero-mob{ display:flex; flex-direction:column; position:relative; z-index:5; }
  @media(min-width:900px){ .hero-mob{ display:none !important; } }

  /* ── Info panel ── */
  .hero-info{
    display:flex; flex-direction:column; justify-content:center;
    padding:clamp(96px,12vh,150px) clamp(20px,3vw,48px) clamp(28px,5vh,72px) clamp(28px,5vw,72px);
  }
  @media(max-width:899px){ .hero-info{ padding:16px 20px 28px; } }

  /* Content panel — GSAP controls opacity/transform, not CSS transition */
  .hero-content{ position:relative; min-height:2em; }
  .hero-content-inner{ will-change:transform,opacity; }

  /* ── Typography ── */
  .hero-tag{
    font-family:'Jost',sans-serif; font-size:clamp(8.5px,.55vw,10.5px); font-weight:600;
    letter-spacing:.22em; text-transform:uppercase; color:#C9A84C;
    display:inline-flex; align-items:center; gap:8px; margin-bottom:clamp(8px,1.2vh,14px);
  }
  .hero-tag-dot{ width:4px; height:4px; border-radius:50%; background:#C9A84C; }
  .hero-name{
    font-family:'Cormorant Garamond',serif; font-size:clamp(34px,8vw,82px);
    font-weight:300; color:#2C2110; line-height:1.02; margin:0 0 4px;
  }
  .hero-hindi{
    font-family:'Cormorant Garamond',serif; font-size:clamp(13px,3.2vw,21px);
    font-style:italic; font-weight:300; color:#C9A84C;
    margin:0 0 clamp(10px,1.4vh,18px);
  }
  .hero-meta{ display:flex; align-items:center; gap:10px; margin-bottom:clamp(10px,1.4vh,16px); flex-wrap:wrap; }
  .hero-meta-it{
    font-family:'Jost',sans-serif; font-size:clamp(9px,2.4vw,12.5px);
    font-weight:400; color:#8A7A66; display:flex; align-items:center; gap:4px;
  }
  .hero-meta-lb{ font-weight:600; color:#C9A84C; }
  .hero-sep{ width:1px; height:11px; background:rgba(201,168,76,.3); }
  .hero-div{
    width:34px; height:1px;
    background:linear-gradient(to right,#C9A84C,rgba(201,168,76,.2));
    margin-bottom:clamp(10px,1.4vh,18px);
  }
  .hero-desc{
    font-family:'Jost',sans-serif; font-size:clamp(12px,3.2vw,14px); font-weight:300;
    color:#5A4A34; line-height:1.82; margin:0 0 clamp(12px,1.6vh,20px); max-width:44ch;
  }
  .hero-hint{
    font-family:'Cormorant Garamond',serif; font-size:clamp(11.5px,2.8vw,14.5px);
    font-style:italic; font-weight:300; color:#A89060;
    margin-bottom:clamp(10px,1.4vh,16px); line-height:1.5;
  }
  .hero-cta{
    display:inline-flex; align-items:center; gap:9px; font-family:'Jost',sans-serif;
    font-size:clamp(9px,2.2vw,11px); font-weight:600; letter-spacing:.16em;
    text-transform:uppercase; color:#A07830; border:1px solid #A07830; border-radius:4px;
    padding:clamp(8px,.9vh,12px) clamp(18px,4vw,28px); background:transparent;
    cursor:pointer; text-decoration:none; width:fit-content;
    transition:background .2s cubic-bezier(0.25,1,0.5,1),color .2s cubic-bezier(0.25,1,0.5,1);
    margin-top:clamp(8px,1.2vh,16px);
  }
  .hero-cta:hover{ background:#A07830; color:#FFF; }
  .hero-dots{ display:flex; align-items:center; gap:5px; margin-top:clamp(10px,1.4vh,18px); }
  .hero-dot{
    width:5px; height:5px; border-radius:50%; background:#D9CDB8;
    cursor:pointer; transition:all .25s; border:none; padding:0;
  }
  .hero-dot.on{ width:18px; border-radius:3px; background:#C9A84C; }
  .hero-nav-row{ display:flex; align-items:center; gap:12px; margin-top:clamp(10px,1.4vh,16px); }
  .hero-nav-btn{
    width:clamp(30px,2vw,38px); height:clamp(30px,2vw,38px); border-radius:50%;
    border:1px solid #D9CDB8; background:#FFF; display:flex; align-items:center;
    justify-content:center; cursor:pointer; color:#A07830;
    transition:background .2s cubic-bezier(0.25,1,0.5,1),border-color .2s cubic-bezier(0.25,1,0.5,1),color .2s cubic-bezier(0.25,1,0.5,1);
    flex-shrink:0;
  }
  .hero-nav-btn:hover{ background:#A07830; border-color:#A07830; color:#FFF; }
  .hero-nav-lbl{
    font-family:'Jost',sans-serif; font-size:clamp(8.5px,.58vw,10.5px);
    font-weight:500; color:#A07830; letter-spacing:.08em; min-width:64px;
  }

  /* ── Wheel containers ── */
  .hw-area{
    position:relative; width:100%;
    min-height:clamp(520px,78vh,1040px); display:flex; align-items:center;
  }
  .hw-anchor{
    position:absolute; right:-6%; top:50%;
    transform:translateY(-50%); width:0; height:0;
  }
  @media(min-width:900px){ .hw-anchor{ right:calc(-6% - 400px); } }

  /* Coin — NO CSS transition on transform/opacity: GSAP owns those */
  .hw-planet,
  .hm-planet{
    position:absolute; left:0; top:0;
    border:none; border-radius:50%; overflow:visible;
    outline:none; padding:0; background:transparent; cursor:pointer;
    will-change:transform,opacity;
  }
  .hw-planet-face{
    width:100%; height:100%; border-radius:50%;
    overflow:hidden; position:relative; pointer-events:none;
  }
  .hw-img{
    position:absolute; inset:0; width:100%; height:100%;
    object-fit:contain; border-radius:50%;
    pointer-events:none;
    backface-visibility:hidden;
  }
  .rashi-coin{
    will-change:transform,opacity;
    transform:translateZ(0);
    backface-visibility:hidden;
  }

  /* ── Mobile smile area ── */
  .hm-area{
    position:relative; width:100%;
    height:clamp(360px,62vw,520px);
    overflow:hidden; touch-action:pan-y; flex-shrink:0;
  }
  .hm-anchor{
    position:absolute; left:50%; top:0;
    transform:translateX(-50%); width:0; height:0;
  }

  /* Arc guide */
  .arc-guide{
    position:absolute; overflow:visible;
    pointer-events:none; z-index:0;
  }
  .arc-path{
    fill:none; stroke:rgba(201,168,76,0.15); stroke-width:1.2;
    stroke-dasharray:5 7; animation:arcDraw 2s ease forwards;
  }
`;

// ─── Zodiac Ring ──────────────────────────────────────────────────────────────
function ZodiacRing() {
  return (
    <svg className="hero-zodiac-ring" viewBox="0 0 600 600" fill="none">
      <circle cx="300" cy="300" r="268" stroke="rgba(201,168,76,0.07)" strokeWidth="1"/>
      <circle cx="300" cy="300" r="218" stroke="rgba(201,168,76,0.05)" strokeWidth="0.8" strokeDasharray="4 8"/>
      <circle cx="300" cy="300" r="168" stroke="rgba(201,168,76,0.04)" strokeWidth="0.8"/>
      <circle cx="300" cy="300" r="118" stroke="rgba(201,168,76,0.03)" strokeWidth="0.6"/>
      {Array.from({length:12},(_,i)=>{
        const a=(i*30-90)*Math.PI/180, big=i%3===0;
        return <line key={i}
          x1={300+Math.cos(a)*(big?256:261)} y1={300+Math.sin(a)*(big?256:261)}
          x2={300+Math.cos(a)*(big?276:270)} y2={300+Math.sin(a)*(big?276:270)}
          stroke={big?"rgba(201,168,76,0.18)":"rgba(201,168,76,0.10)"}
          strokeWidth={big?"1.5":"1"}/>;
      })}
      {Array.from({length:12},(_,i)=>{
        const a=(i*30-90)*Math.PI/180;
        return <circle key={`d${i}`}
          cx={300+Math.cos(a)*247} cy={300+Math.sin(a)*247}
          r="2.5" fill="rgba(201,168,76,0.22)"/>;
      })}
      <line x1="300" y1="32"  x2="300" y2="568" stroke="rgba(201,168,76,0.025)" strokeWidth="0.8"/>
      <line x1="32"  y1="300" x2="568" y2="300" stroke="rgba(201,168,76,0.025)" strokeWidth="0.8"/>
    </svg>
  );
}

// ─── Arc Guide SVG ────────────────────────────────────────────────────────────
function ArcGuide({ R, cDeg, spread, vLeft, vTop, vW, vH }: {
  R:number; cDeg:number; spread:number;
  vLeft:number; vTop:number; vW:number; vH:number;
}) {
  const d = useMemo(() => {
    const pts = Array.from({length:120},(_,i)=>{
      const deg = (cDeg + spread/2) - (i/119)*spread;
      const rad = deg*Math.PI/180;
      return `${(Math.cos(rad)*R).toFixed(2)},${(Math.sin(rad)*R).toFixed(2)}`;
    });
    return pts.map((p,i)=>`${i===0?"M":"L"}${p}`).join(" ");
  },[R,cDeg,spread]);

  return (
    <svg
      className="arc-guide"
      style={{ left:vLeft, top:vTop, width:vW, height:vH }}
      viewBox={`${vLeft} ${vTop} ${vW} ${vH}`}
      overflow="visible"
    >
      <path className="arc-path" d={d}/>
    </svg>
  );
}

// ─── Info Content ─────────────────────────────────────────────────────────────
function InfoContent({ r, idx }: { r:typeof rashis[0]; idx:number }) {
  return (
    <>
      <div className="hero-tag">
        <span className="hero-tag-dot"/>
        Vedic Astrology · Rashi {String(idx+1).padStart(2,"0")} / 12
      </div>
      <h1 className="hero-name">{r.name}</h1>
      <p className="hero-hindi">{r.hindi}</p>
      <div className="hero-meta">
        <span className="hero-meta-it"><span className="hero-meta-lb">Element&nbsp;</span>{r.element}</span>
        <span className="hero-sep"/>
        <span className="hero-meta-it"><span className="hero-meta-lb">Ruling&nbsp;</span>{r.ruling}</span>
        <span className="hero-sep"/>
        <span className="hero-meta-it">{r.date}</span>
      </div>
      <div className="hero-div"/>
      <p className="hero-desc">{DESC[r.name]}</p>
      <p className="hero-hint">To know more, talk to an astrologer.</p>
    </>
  );
}

// ─── useWheel ─────────────────────────────────────────────────────────────────
// Core GSAP-powered wheel hook.
// Stores per-coin DOM refs and tweens them every time active changes.
function useWheel(
  mode: "desk" | "mob",
  active: number,
  R: number,
  sizes: number[],
  ready: boolean
) {
  // One ref per coin
  const coinRefs = useRef<(HTMLButtonElement | null)[]>(
    Array(TOTAL).fill(null)
  );
  // Idle float tweens (one per coin, looping)
  const idleTweens = useRef<gsap.core.Tween[]>([]);
  // Running spin tween
  const spinTl     = useRef<gsap.core.Timeline | null>(null);
  // Track previous active to detect change
  const prevActive = useRef<number>(-1);

  // Compute target position for each coin given current active
  const getTarget = useCallback((i: number, act: number) => {
    const off    = getOff(i, act);
    const abs    = Math.abs(off);
    const cOff   = Math.max(-3, Math.min(3, off));
    const sz     = sizes[Math.min(abs, 3)] ?? sizes[sizes.length-1];
    const base   = sizes[0] ?? sz ?? 1;
    const visualScale = mode === "mob" ? M_VISUAL : D_VISUAL;
    const pos    = mode === "desk"
      ? deskXY(cOff, R)
      : mobSmileXY(cOff, R);
    const extraX = mode === "desk" ? (off===0 ? -14 : Math.abs(off)===1 ? -5 : 0) : 0;
    const rawTx  = pos.x - base/2 + extraX;
    const rawTy  = pos.y - base/2;
    const tx     = mode === "mob" ? Math.round(rawTx) : rawTx;
    const ty     = mode === "mob" ? Math.round(rawTy) : rawTy;
    const op     = abs > 3 ? 0 : slotOpacity(abs);
    const scaleBase = (sz / base) * visualScale;
    const scale  = scaleBase * (off === 0 ? 1.08 : 1);
    const z      = off === 0 ? 10 : Math.max(0, 5 - abs);
    return { tx, ty, op, scale, scaleBase, z, off, abs };
  }, [mode, R, sizes]);

  // Kill idle float for a coin and restart after spin
  const killIdle = useCallback((i: number) => {
    idleTweens.current[i]?.kill();
  }, []);

  const startIdle = useCallback((el: HTMLButtonElement, i: number, act: number) => {
    const off = getOff(i, act);
    if (off !== 0) return; // only float the active coin

    const floatY = mode === "desk" ? 0 : 7;
    const floatX = mode === "desk" ? 5 : 0;

    idleTweens.current[i] = gsap.to(el, {
      x:        `+=${floatX}`,
      y:        `+=${floatY}`,
      duration: 2.2,
      ease:     "sine.inOut",
      yoyo:     true,
      repeat:   -1,
    });
  }, [mode]);

  // Main animation: tween all coins to new positions
  const animateToActive = useCallback((newActive: number, instant = false) => {
    if (spinTl.current) spinTl.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        // After spin settles, start idle float on new active
        coinRefs.current.forEach((el, i) => {
          killIdle(i);
          if (el) startIdle(el, i, newActive);
        });
      },
    });
    spinTl.current = tl;

    coinRefs.current.forEach((el, i) => {
      if (!el) return;
      killIdle(i);
      const { tx, ty, op, scale, scaleBase, z } = getTarget(i, newActive);

      tl.to(el, {
        x:        tx,
        y:        ty,
        opacity:  op,
        scale:    scale,
        zIndex:   z,
        duration: instant ? 0 : 0.72,
        ease:     "expo.inOut",
        // Active coin gets an extra "pop" scale punch
        ...(getOff(i, newActive) === 0 && !instant
          ? { keyframes: [
              { scale: scaleBase * 1.18, duration: 0.22, ease: "power2.out" },
              { scale, duration: 0.50, ease: "elastic.out(1, 0.42)" },
            ]}
          : {}),
      }, 0);

      // Fade drop-shadow on/off
      tl.to(el.querySelector(".hw-img"), {
        filter: getOff(i, newActive) === 0
          ? "drop-shadow(0 16px 32px rgba(100,80,20,0.35))"
          : "drop-shadow(0 3px 8px rgba(0,0,0,0.10))",
        duration: instant ? 0 : 0.5,
        ease:     "power2.inOut",
      }, 0);
    });
  }, [getTarget, killIdle, startIdle]);

  // On mount: set positions instantly
  useEffect(() => {
    if (R === 0 || sizes[0] === 0) return;
    coinRefs.current.forEach((el, i) => {
      if (!el) return;
      const { tx, ty, op, scale, z } = getTarget(i, active);
      gsap.set(el, { x:tx, y:ty, opacity:op, scale, zIndex:z, force3D:true });
      const img = el.querySelector(".hw-img");
      if (img) gsap.set(img, { force3D:true });
    });
    // Start idle on initial active
    if (ready) {
      coinRefs.current.forEach((el, i) => {
        if (el) startIdle(el, i, active);
      });
    }
    prevActive.current = active;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [R, sizes[0], ready]);

  // On active change: animate
  useEffect(() => {
    if (!ready) return;
    if (prevActive.current === active) return;
    if (R === 0 || sizes[0] === 0) return;
    animateToActive(active);
    prevActive.current = active;
  }, [active, animateToActive, R, sizes, ready]);

  // Cleanup
  useEffect(() => () => {
    idleTweens.current.forEach(t => t?.kill());
    spinTl.current?.kill();
  }, []);

  return coinRefs;
}

// ─── Desktop Wheel ────────────────────────────────────────────────────────────
function DesktopWheel({ active, onSelect, R, sizes, ready }: {
  active:number; onSelect:(i:number)=>void; R:number; sizes:number[]; ready:boolean;
}) {
  const coinRefs = useWheel("desk", active, R, sizes, ready);

  return (
    <div className="hw-area">
      <div className="hw-anchor">
        <ArcGuide
          R={R} cDeg={D_CENTER} spread={D_STEP*8}
          vLeft={-(R+60)} vTop={-(R+60)} vW={R+60} vH={(R+60)*2}
        />
        {rashis.map((r, i) => (
          <button
            key={r.name}
            ref={el => { coinRefs.current[i] = el; }}
            className="hw-planet"
            onClick={() => onSelect(i)}
            aria-label={r.name}
            style={{ width: sizes[0], height: sizes[0] }}
          >
            <div className="hw-planet-face">
              <img className="hw-img rashi-coin" src={r.image} alt={r.name}
                onError={e=>{(e.currentTarget as HTMLImageElement).style.display="none";}}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Mobile Smile Wheel ───────────────────────────────────────────────────────
function MobileWheel({ active, onSelect, onPrev, onNext, R, sizes, ready }: {
  active:number; onSelect:(i:number)=>void;
  onPrev:()=>void; onNext:()=>void;
  R:number; sizes:number[]; ready:boolean;
}) {
  const coinRefs = useWheel("mob", active, R, sizes, ready);
  const tXRef    = useRef<number|null>(null);
  const tYRef    = useRef<number|null>(null);

  return (
    <div
      className="hm-area"
      onTouchStart={e=>{ tXRef.current=e.touches[0].clientX; tYRef.current=e.touches[0].clientY; }}
      onTouchEnd={e=>{
        if (tXRef.current===null||tYRef.current===null) return;
        const dx=tXRef.current-e.changedTouches[0].clientX;
        const dy=Math.abs(tYRef.current-e.changedTouches[0].clientY);
        if (Math.abs(dx)>36&&dy<70){ if (dx>0) onNext(); else onPrev(); }
        tXRef.current=null; tYRef.current=null;
      }}
    >
      <div className="hm-anchor">
        <ArcGuide
          R={R} cDeg={M_CENTER} spread={M_STEP*6}
          vLeft={-R} vTop={0} vW={R*2} vH={R+10}
        />
        {rashis.map((r, i) => (
          <button
            key={r.name}
            ref={el => { coinRefs.current[i] = el; }}
            className="hm-planet"
            onClick={() => onSelect(i)}
            aria-label={r.name}
            style={{ width: sizes[0], height: sizes[0] }}
          >
            <div className="hw-planet-face">
              <img className="hw-img rashi-coin" src={r.image} alt={r.name}
                onError={e=>{(e.currentTarget as HTMLImageElement).style.display="none";}}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Dots & NavRow ────────────────────────────────────────────────────────────
function Dots({ active, onSelect }: { active:number; onSelect:(i:number)=>void }) {
  return (
    <div className="hero-dots">
      {rashis.map((_,i) => (
        <button key={i} className={`hero-dot${i===active?" on":""}`}
          onClick={()=>onSelect(i)} aria-label={rashis[i].name}/>
      ))}
    </div>
  );
}
function NavRow({ label, onPrev, onNext }: { label:string; onPrev:()=>void; onNext:()=>void }) {
  return (
    <div className="hero-nav-row">
      <button className="hero-nav-btn" onClick={onPrev} aria-label="Previous">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <span className="hero-nav-lbl">{label}</span>
      <button className="hero-nav-btn" onClick={onNext} aria-label="Next">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  );
}

// ─── Content Panel with GSAP crossfade ───────────────────────────────────────
function ContentPanel({ r, idx }: { r:typeof rashis[0]; idx:number }) {
  const elRef  = useRef<HTMLDivElement>(null);
  const prevR  = useRef(r);

  useEffect(() => {
    if (!elRef.current) return;
    if (prevR.current.name === r.name) return;
    prevR.current = r;

    // Slide out old, slide in new
    gsap.fromTo(elRef.current,
      { opacity:0, y:14 },
      { opacity:1, y:0, duration:0.55, ease:"power3.out" }
    );
  }, [r]);

  // Initial appear
  useEffect(() => {
    if (!elRef.current) return;
    gsap.fromTo(elRef.current,
      { opacity:0, y:16 },
      { opacity:1, y:0, duration:0.7, ease:"power3.out", delay:0.2 }
    );
  }, []);

  return (
    <div className="hero-content">
      <div className="hero-content-inner" ref={elRef}>
        <InfoContent r={r} idx={idx}/>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [active, setActive] = useState(0);
  const activeRef           = useRef(0);
  const timerRef            = useRef<gsap.core.Tween|null>(null);
  const wheelRef            = useRef<HTMLDivElement>(null);
  const [imagesReady, setImagesReady] = useState(false);

  // Responsive sizes
  const [dR,    setDR]  = useState(0);
  const [dSizes,setDS]  = useState([420,340,270,200]);
  const [mR,    setMR]  = useState(0);
  const [mSizes,setMS]  = useState([280,174,128,94]);

  useEffect(() => {
    let cancelled = false;
    const preload = RASHI_IMAGES.map((src) => {
      const img = new Image();
      img.src = src;
      if (typeof img.decode === "function") {
        return img.decode().catch(() => undefined);
      }
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    Promise.all(preload).then(() => {
      if (!cancelled) setImagesReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const calc = () => {
      const vw  = window.innerWidth;
      const vh  = window.innerHeight;

      // Desktop
      const colW = wheelRef.current ? wheelRef.current.offsetWidth : vw*0.5;
      const unit  = Math.min(colW, vh*0.92);
      const R     = Math.round(Math.min(unit*0.72, 780)*SIZE_BOOST);
      const base  = Math.round(Math.min(unit*0.78, 680)*SIZE_BOOST);
      setDR(R);
      setDS([base, Math.round(base*.80), Math.round(base*.64), Math.round(base*.48)]);

      // Mobile smile
      const areaH   = Math.min(Math.max(vw*0.62, 360), 520);
      const mBase   = Math.round(Math.min(vw*0.56, 240));
      const mRadius = Math.round(areaH - mBase/2 - 12);
      setMR(mRadius);
      setMS([mBase, Math.round(mBase*.62), Math.round(mBase*.46), Math.round(mBase*.34)]);
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (wheelRef.current) ro.observe(wheelRef.current);
    window.addEventListener("resize", calc);
    return () => { ro.disconnect(); window.removeEventListener("resize", calc); };
  }, []);

  const goTo = useCallback((next: number) => {
    if (next === activeRef.current) return;
    activeRef.current = next;
    setActive(next);
  }, []);

  const startTimer = useCallback(() => {
    timerRef.current?.kill();
    timerRef.current = gsap.delayedCall(AUTO_MS / 1000, function tick() {
      goTo((activeRef.current + 1) % TOTAL);
      timerRef.current?.restart(true);
    });
  }, [goTo]);

  useEffect(() => {
    if (!imagesReady) return;
    startTimer();
    return () => { timerRef.current?.kill(); };
  }, [startTimer, imagesReady]);

  const select  = useCallback((i:number) => { goTo(i); if (imagesReady) startTimer(); }, [goTo, startTimer, imagesReady]);
  const goPrev  = useCallback(() => { goTo((activeRef.current-1+TOTAL)%TOTAL); if (imagesReady) startTimer(); }, [goTo, startTimer, imagesReady]);
  const goNext  = useCallback(() => { goTo((activeRef.current+1)%TOTAL); if (imagesReady) startTimer(); }, [goTo, startTimer, imagesReady]);

  const r = rashis[active];

  return (
    <section className="hero-section">
      <style>{STYLES}</style>
      <ZodiacRing/>
      <div className="hero-bottom-fade" aria-hidden="true"/>

      {/* ── DESKTOP ── */}
      <div className="hero-desk">
        <div className="hero-info">
          <ContentPanel r={r} idx={active}/>
          <a href="/talk-astrologer" className="hero-cta">
            Talk to Astrologer
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <Dots active={active} onSelect={select}/>
          <NavRow label={r.name} onPrev={goPrev} onNext={goNext}/>
        </div>
        <div ref={wheelRef} style={{position:"relative",width:"100%",height:"100%"}}>
          {dR > 0 && (
            <DesktopWheel active={active} onSelect={select} R={dR} sizes={dSizes} ready={imagesReady}/>
          )}
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="hero-mob">
        {mR > 0 && (
          <MobileWheel active={active} onSelect={select} onPrev={goPrev} onNext={goNext} R={mR} sizes={mSizes} ready={imagesReady}/>
        )}
        <div className="hero-info">
          <ContentPanel r={r} idx={active}/>
          <a href="/talk-astrologer" className="hero-cta">
            Talk to Astrologer
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <Dots active={active} onSelect={select}/>
        </div>
      </div>
    </section>
  );
}