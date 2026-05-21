// src/components/HoroscopeStrip.tsx

const rashis = [
  {
    name: "Aries",
    hindi: "मेष",
    href: "/horoscope/aries",
    svg: (
      // Traditional Aries glyph: two curved horns meeting at center
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M50 60 C50 60 28 58 22 38 C16 18 30 8 42 14 C46 16 50 22 50 30 C50 22 54 16 58 14 C70 8 84 18 78 38 C72 58 50 60 50 60Z"
          stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
        <line x1="50" y1="30" x2="50" y2="80" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M38 74 L50 80 L62 74" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Taurus",
    hindi: "वृषभ",
    href: "/horoscope/taurus",
    svg: (
      // Traditional Taurus glyph: circle with crescent horns on top
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="62" r="24" stroke="currentColor" strokeWidth="4.5" fill="none"/>
        <path
          d="M26 42 C26 30 34 22 50 22 C66 22 74 30 74 42"
          stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"
        />
        <line x1="26" y1="42" x2="18" y2="34" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <line x1="74" y1="42" x2="82" y2="34" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Gemini",
    hindi: "मिथुन",
    href: "/horoscope/gemini",
    svg: (
      // Traditional Gemini glyph: two vertical lines with curved top & bottom bars
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="34" y1="18" x2="34" y2="82" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <line x1="66" y1="18" x2="66" y2="82" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path d="M22 22 Q34 30 50 28 Q66 26 78 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M22 78 Q34 70 50 72 Q66 74 78 78" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <line x1="34" y1="50" x2="66" y2="50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Cancer",
    hindi: "कर्क",
    href: "/horoscope/cancer",
    svg: (
      // Traditional Cancer glyph: 69 — two spiral heads facing each other
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Top spiral (6) */}
        <path
          d="M65 32 C65 22 56 16 46 20 C36 24 32 36 40 44 C48 52 64 48 66 38 C68 28 58 22 50 26"
          stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"
        />
        {/* Bottom spiral (9) */}
        <path
          d="M35 68 C35 78 44 84 54 80 C64 76 68 64 60 56 C52 48 36 52 34 62 C32 72 42 78 50 74"
          stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"
        />
      </svg>
    ),
  },
  {
    name: "Leo",
    hindi: "सिंह",
    href: "/horoscope/leo",
    svg: (
      // Traditional Leo glyph: circle with a curved tail/curl
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="42" cy="42" r="18" stroke="currentColor" strokeWidth="4.5" fill="none"/>
        <path
          d="M60 42 C76 42 82 52 80 64 C78 76 68 82 58 80 C50 78 46 72 48 66"
          stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"
        />
        <circle cx="48" cy="66" r="5" stroke="currentColor" strokeWidth="3.5" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Virgo",
    hindi: "कन्या",
    href: "/horoscope/virgo",
    svg: (
      // Traditional Virgo glyph: mP with loop & downward cross-tail
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="22" y1="20" x2="22" y2="68" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <line x1="44" y1="20" x2="44" y2="68" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M22 20 C22 14 44 14 44 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M22 44 C22 38 44 38 44 44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path
          d="M44 44 C54 38 66 40 70 50 C74 60 68 74 58 76 C52 78 48 74 48 70"
          stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"
        />
        <path d="M48 70 C48 78 54 84 62 84" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <line x1="56" y1="84" x2="68" y2="84" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Libra",
    hindi: "तुला",
    href: "/horoscope/libra",
    svg: (
      // Traditional Libra glyph: horizontal line with semicircle rising above
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="15" y1="68" x2="85" y2="68" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <line x1="15" y1="82" x2="85" y2="82" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path
          d="M25 68 C25 48 38 34 50 34 C62 34 75 48 75 68"
          stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"
        />
      </svg>
    ),
  },
  {
    name: "Scorpio",
    hindi: "वृश्चिक",
    href: "/horoscope/scorpio",
    svg: (
      // Traditional Scorpio glyph: mP with arrow-tail pointing right-up
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="18" y1="20" x2="18" y2="66" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <line x1="40" y1="20" x2="40" y2="66" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M18 20 C18 14 40 14 40 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M18 44 C18 38 40 38 40 44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path
          d="M40 50 C52 44 66 48 70 60 C72 68 68 76 60 78"
          stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"
        />
        {/* Scorpion stinger arrow */}
        <path d="M60 78 L74 72" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M74 72 L68 62" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M74 72 L82 72" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Sagittarius",
    hindi: "धनु",
    href: "/horoscope/sagittarius",
    svg: (
      // Traditional Sagittarius glyph: upward-right arrow with crossbar
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Diagonal arrow shaft */}
        <line x1="20" y1="80" x2="76" y2="24" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        {/* Arrowhead */}
        <path d="M76 24 L54 24" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M76 24 L76 46" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        {/* Crossbar */}
        <line x1="28" y1="56" x2="56" y2="28" stroke="currentColor" strokeWidth="0" strokeLinecap="round"/>
        <line x1="22" y1="62" x2="60" y2="24" stroke="currentColor" strokeWidth="0"/>
        <path d="M36 66 L66 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.45"/>
      </svg>
    ),
  },
  {
    name: "Capricorn",
    hindi: "मकर",
    href: "/horoscope/capricorn",
    svg: (
      // Traditional Capricorn glyph: V with a loop and fish-tail curl
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="20" y1="18" x2="20" y2="72" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        <path
          d="M20 40 C30 30 46 30 50 40 C54 50 46 60 36 62 C28 64 22 72 24 80 C26 88 36 90 46 88 C58 84 66 74 64 62"
          stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"
        />
        {/* Fish tail curl */}
        <path
          d="M64 62 C72 56 80 60 78 70 C76 78 68 82 64 76"
          stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"
        />
      </svg>
    ),
  },
  {
    name: "Aquarius",
    hindi: "कुंभ",
    href: "/horoscope/aquarius",
    svg: (
      // Traditional Aquarius glyph: two zigzag wavy lines
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M14 38 L28 26 L42 38 L56 26 L70 38 L84 26"
          stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
        <path
          d="M14 62 L28 50 L42 62 L56 50 L70 62 L84 50"
          stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
      </svg>
    ),
  },
  {
    name: "Pisces",
    hindi: "मीन",
    href: "/horoscope/pisces",
    svg: (
      // Traditional Pisces glyph: two fish arcs facing opposite directions, joined by a horizontal bar
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Left fish arc (faces left) */}
        <path
          d="M42 18 C28 24 18 36 18 50 C18 64 28 76 42 82"
          stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"
        />
        {/* Right fish arc (faces right) */}
        <path
          d="M58 18 C72 24 82 36 82 50 C82 64 72 76 58 82"
          stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"
        />
        {/* Center horizontal bar */}
        <line x1="28" y1="50" x2="72" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function HoroscopeStrip() {
  return (
    <section className="w-full bg-white py-6 px-4">

      {/* Section Heading */}
      <div className="mb-5 flex flex-col items-center text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#b8860b]">
          Today's Horoscope
        </h2>
        <div className="mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 mx-auto" />
      </div>

      {/* Scrollable strip */}
      <div
        className="
          flex flex-row gap-3
          items-stretch
          justify-start md:justify-center
          overflow-x-auto scroll-smooth
          pb-2
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
      >
        {rashis.map(({ name, hindi, href, svg }) => (
          <a
            key={name}
            href={href}
            className="flex-shrink-0 cursor-pointer"
          >
            <div
              className="
                w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-36
                flex flex-col items-center justify-center gap-2
                rounded-2xl
                bg-white
                border border-amber-200
                shadow-sm
                px-2 py-3
              "
            >
              {/* Gold circle with authentic SVG glyph */}
              <div
                className="
                  w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14
                  rounded-full
                  bg-amber-50
                  border-2 border-amber-300
                  flex items-center justify-center
                  text-amber-600
                  p-2.5
                "
              >
                {svg}
              </div>

              {/* English name */}
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-stone-700 text-center leading-tight">
                {name}
              </span>

              {/* Hindi name */}
              <span className="text-[9px] sm:text-[10px] md:text-xs text-amber-500 font-medium text-center leading-none">
                {hindi}
              </span>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
}