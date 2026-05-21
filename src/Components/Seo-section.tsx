// src/components/SeoContentSection.tsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const GOLD = "#b8860b";
const GOLD_LIGHT = "#fef9e7";
const GOLD_BORDER = "#e8c44a";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

const steps = [
  { step: "01", text: "Online astrology consultation brings ancient astrological wisdom right to your phone or computer. You can get divine guidance anytime you need it, right from your home." },
  { step: "02", text: "Using your birth details like date, time, and place, professional astrologers prepare a special chart. This chart helps them understand your life's journey as per divine plan." },
  { step: "03", text: "Vedastraa connects you with experienced astrologers. You can choose whether you want to chat, call, or video call — whatever feels right for you." },
  { step: "04", text: "Many services offer free astrology predictions so you can begin your spiritual journey easily and with no cost. Choosing the right astrology website ensures accurate readings." },
  { step: "05", text: "Your astrologer studies your birth chart and looks at how planets were placed when you were born, then checks the current position of planets to give future predictions." },
  { step: "06", text: "Platforms also provide daily horoscope readings to help you stay in sync with cosmic energy and make the most of each day." },
  { step: "07", text: "It's super easy and convenient. You can get guidance without traveling, and some sessions are even recorded for you to listen to again anytime." },
];

const horoscopeTips = [
  "Daily horoscope readings help you understand how the stars and planets are affecting your zodiac sign today, helping you make better choices.",
  "There are 12 zodiac signs — Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, and Pisces. Each reacts differently to sky movements.",
  "Daily messages guide your actions based on your sign's natural energy and ruling planets.",
  "With free horoscope tools, it's easy to begin your day with guidance about love, career, health, and spiritual growth.",
  "Many astrology apps give daily updates based on your birth details, making the advice feel personal and helpful.",
  "Following daily horoscopes reveals patterns in how the universe affects your mood and life.",
  "Knowing your sun, moon, and rising signs gives a full picture of your life journey.",
  "Learning about family signs improves understanding and bonding between loved ones.",
  "Weekly and monthly horoscope updates show bigger changes ahead, helping with future planning.",
];

function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border overflow-hidden transition-all duration-300"
          style={{ borderColor: openIndex === i ? GOLD_BORDER : "#e5e7eb" }}
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm md:text-base transition-colors duration-200"
            style={{
              background: openIndex === i ? GOLD_LIGHT : "#fff",
              color: openIndex === i ? GOLD : "#1f2937",
            }}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span>{item.title}</span>
            {openIndex === i ? (
              <ChevronUp size={18} style={{ color: GOLD }} />
            ) : (
              <ChevronDown size={18} className="text-gray-400" />
            )}
          </button>
          {openIndex === i && (
            <div
              className="px-5 pb-5 pt-2 text-sm md:text-base text-gray-600 leading-relaxed"
              style={{ background: GOLD_LIGHT }}
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const accordionItems: AccordionItem[] = [
  {
    title: "How does Online Astrology Consultation Work?",
    content: (
      <ol className="space-y-3">
        {steps.map((s) => (
          <li key={s.step} className="flex gap-3">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: `linear-gradient(135deg, #e8c44a, ${GOLD})` }}
            >
              {s.step}
            </span>
            <p className="pt-1">{s.text}</p>
          </li>
        ))}
      </ol>
    ),
  },
  {
    title: "Why Should You Choose an Online Astrologer?",
    content: (
      <div className="space-y-3 text-gray-600">
        <p>Online astrologers are just as wise as traditional ones, but give you the comfort of easy access and pocket-friendly prices that suit today's busy life.</p>
        <p>With online astrologer services, you can connect with experts from all over the country, even if none are nearby. These digital consultations usually cost less than face-to-face meetings.</p>
        <p>Your privacy is fully protected — especially helpful for personal matters like love or work. Many sessions are recorded so you can replay and understand them better later.</p>
        <p>Vedastraa is available 24/7, meaning you can get help anytime — even in a crisis when quick answers and divine guidance matter the most.</p>
      </div>
    ),
  },
  {
    title: "How to Stay Updated With Daily Horoscope & Zodiac Signs?",
    content: (
      <ul className="space-y-2">
        {horoscopeTips.map((tip, i) => (
          <li key={i} className="flex gap-2 text-gray-600">
            <span
              className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full"
              style={{ background: GOLD }}
            />
            {tip}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Why Choose Our Astrology Experts?",
    content: (
      <div className="space-y-3 text-gray-600">
        <p>Our certified astrology experts blend the ancient wisdom of Vedic astrology with a modern understanding of life and emotions. Each astrologer is carefully selected for both knowledge and kindness.</p>
        <p>At the Vedastraa store, you'll find spiritual items like gemstones, yantras, and puja tools picked by your astrologer — 100% original, with step-by-step usage guidance.</p>
        <p>Your satisfaction is our top priority. We offer different consultation types to match your style and budget — simple chats, detailed reports, or quick answers.</p>
        <p>You can also try our free 5-minute astrology session to see how it works before committing. Honest pricing and a smooth login system make starting your spiritual journey effortless.</p>
      </div>
    ),
  },
];

export default function SeoContentSection() {
  return (
    // ✅ FIX: pb-0 on mobile removes bottom padding that was exposing a thin line
    // below this section. Desktop keeps py-20 as normal.
    <section className="bg-white pt-14 pb-10 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <div className="text-center mb-10 md:mb-14">
          <p
            className="uppercase tracking-widest text-xs md:text-sm font-semibold mb-3"
            style={{ color: GOLD }}
          >
            Ancient Wisdom · Modern Guidance
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111111]">
            Why <span className="text-[#b8860b]">Astrology?</span>
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
        </div>

        {/* Intro Card */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-10 border"
          style={{ background: GOLD_LIGHT, borderColor: GOLD_BORDER }}
        >
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
            Have you ever felt that things in life sometimes happen at just the right time, like someone is silently
            guiding you?{" "}
            <strong style={{ color: GOLD }}>Astrology helps us understand this.</strong> It shows how divine energy
            flows through planets and stars, shaping our daily lives.
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
            This old and trusted knowledge explains that nothing is random — everything has a reason. The stars often
            hold clues about our purpose and future.
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            By learning to read signs from the universe, we can walk in tune with the cosmic plan. For years, astrology
            has helped people make better decisions in love, work, family, and their spiritual journey.
          </p>
        </div>

        {/* Accordion */}
        <Accordion items={accordionItems} />

        {/* Conclusion CTA */}
        {/* ✅ FIX: Removed "border-0 md:border" — replaced with just "md:border"  */}
        {/* On mobile, no border means no visible edge/line bleeding into next section */}
        <div
          className="mt-10 md:mt-14 rounded-2xl p-6 md:p-8 text-center md:border"
          style={{
            background: `linear-gradient(135deg, #fffbeb, ${GOLD_LIGHT})`,
            borderColor: GOLD_BORDER,
          }}
        >
          <h3 className="text-lg md:text-2xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
            Begin Your{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${GOLD}, #e8c44a)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Spiritual Journey
            </span>{" "}
            Today
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-3">
            Astrology helps us understand the divine plan by showing how cosmic energy flows through our lives. This
            ancient knowledge brings comfort in tough times and guides better choices in love, work, family, and
            spiritual growth.
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Astrology doesn't take away your power — it helps you make wise decisions by understanding the stars and
            combining faith with action.
          </p>
          <button
            className="mt-6 px-7 py-3 rounded-full font-semibold text-white text-sm md:text-base shadow-md transition-all duration-200 active:scale-95"
            style={{
              background: `linear-gradient(135deg, #e8c44a, ${GOLD})`,
              boxShadow: "0 4px 18px rgba(184,134,11,0.35)",
            }}
          >
            Consult an Astrologer
          </button>
        </div>
      </div>
    </section>
  );
}