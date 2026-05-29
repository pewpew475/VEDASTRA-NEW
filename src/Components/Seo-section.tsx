// src/components/SeoContentSection.tsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  /* ── Section header ── */
  .seo-section-label {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #A07830;
    font-weight: 400;
  }

  .seo-section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 4vw, 42px);
    font-weight: 300;
    color: #2C2110;
    line-height: 1.2;
    margin: 8px 0 0;
  }

  .seo-divider {
    width: 36px;
    height: 1px;
    background: linear-gradient(to right, #C9A84C, #E8C97A);
    margin: 12px auto 0;
  }

  /* ── Intro card ── */
  .seo-intro-card {
    background: #FFFFFF;
    border: 1px solid #E8E2D6;
    border-radius: 18px;
    padding: 36px 40px;
    margin-bottom: 28px;
  }

  .seo-intro-card p {
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: #6A5C48;
    line-height: 1.85;
    margin: 0 0 16px;
  }

  .seo-intro-card p:last-child {
    margin-bottom: 0;
  }

  .seo-intro-card strong {
    font-weight: 500;
    color: #A07830;
  }

  /* ── Accordion wrapper ── */
  .seo-accordion {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* ── Accordion item ── */
  .seo-acc-item {
    background: #FFFFFF;
    border: 1px solid #E8E2D6;
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }

  .seo-acc-item.open {
    border-color: #C9A84C;
  }

  /* ── Accordion trigger ── */
  .seo-acc-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s ease;
  }

  .seo-acc-trigger:hover {
    background: #FAF8F4;
  }

  .seo-acc-trigger-text {
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #2C2110;
    line-height: 1.4;
  }

  .seo-acc-item.open .seo-acc-trigger-text {
    color: #A07830;
  }

  .seo-acc-icon {
    flex-shrink: 0;
    color: #C0B090;
    transition: color 0.2s ease;
  }

  .seo-acc-item.open .seo-acc-icon {
    color: #A07830;
  }

  /* ── Accordion body ── */
  .seo-acc-body {
    padding: 4px 24px 24px;
    border-top: 1px solid #F0EAE0;
  }

  /* ── Step list ── */
  .seo-steps {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 8px;
  }

  .seo-step {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .seo-step-num {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #D9CDB8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: #A07830;
    background: #FAF8F4;
    margin-top: 2px;
  }

  .seo-step-text {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #6A5C48;
    line-height: 1.75;
    margin: 0;
  }

  /* ── Bullet list ── */
  .seo-bullets {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 8px;
  }

  .seo-bullet {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .seo-bullet-dot {
    flex-shrink: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #C9A84C;
    margin-top: 7px;
  }

  .seo-bullet-text {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #6A5C48;
    line-height: 1.75;
    margin: 0;
  }

  /* ── Body paragraphs inside accordion ── */
  .seo-body-text {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: 8px;
  }

  .seo-body-text p {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #6A5C48;
    line-height: 1.8;
    margin: 0;
  }

  /* ── CTA card ── */
  .seo-cta-card {
    background: #FFFFFF;
    border: 1px solid #E8E2D6;
    border-radius: 18px;
    padding: 44px 40px;
    text-align: center;
    margin-top: 28px;
  }

  .seo-cta-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 300;
    color: #2C2110;
    line-height: 1.25;
    margin: 0 0 16px;
  }

  .seo-cta-heading em {
    font-style: italic;
    color: #A07830;
  }

  .seo-cta-body {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #7A6A52;
    line-height: 1.8;
    max-width: 560px;
    margin: 0 auto 12px;
  }

  .seo-cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #A07830;
    border: 1px solid #A07830;
    border-radius: 4px;
    padding: 14px 44px;
    background: transparent;
    cursor: pointer;
    text-decoration: none;
    margin-top: 28px;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .seo-cta-btn:hover {
    background: #A07830;
    color: #FFFFFF;
  }

  @media (max-width: 640px) {
    .seo-intro-card,
    .seo-cta-card {
      padding: 24px 20px;
    }
    .seo-acc-trigger {
      padding: 16px 18px;
    }
    .seo-acc-body {
      padding: 4px 18px 20px;
    }
  }
`;

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="seo-accordion">
      {items.map((item, i) => (
        <div key={i} className={`seo-acc-item${openIndex === i ? " open" : ""}`}>
          <button
            className="seo-acc-trigger"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="seo-acc-trigger-text">{item.title}</span>
            <span className="seo-acc-icon">
              {openIndex === i
                ? <ChevronUp size={17} />
                : <ChevronDown size={17} />}
            </span>
          </button>

          {openIndex === i && (
            <div className="seo-acc-body">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Accordion content ────────────────────────────────────────────────────────
const accordionItems: AccordionItem[] = [
  {
    title: "How does Online Astrology Consultation Work?",
    content: (
      <ol className="seo-steps">
        {steps.map((s) => (
          <li key={s.step} className="seo-step">
            <span className="seo-step-num">{s.step}</span>
            <p className="seo-step-text">{s.text}</p>
          </li>
        ))}
      </ol>
    ),
  },
  {
    title: "Why Should You Choose an Online Astrologer?",
    content: (
      <div className="seo-body-text">
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
      <ul className="seo-bullets">
        {horoscopeTips.map((tip, i) => (
          <li key={i} className="seo-bullet">
            <span className="seo-bullet-dot" />
            <p className="seo-bullet-text">{tip}</p>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Why Choose Our Astrology Experts?",
    content: (
      <div className="seo-body-text">
        <p>Our certified astrology experts blend the ancient wisdom of Vedic astrology with a modern understanding of life and emotions. Each astrologer is carefully selected for both knowledge and kindness.</p>
        <p>At the Vedastraa store, you'll find spiritual items like gemstones, yantras, and puja tools picked by your astrologer — 100% original, with step-by-step usage guidance.</p>
        <p>Your satisfaction is our top priority. We offer different consultation types to match your style and budget — simple chats, detailed reports, or quick answers.</p>
        <p>You can also try our free 5-minute astrology session to see how it works before committing. Honest pricing and a smooth login system make starting your spiritual journey effortless.</p>
      </div>
    ),
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────
export default function SeoContentSection() {
  return (
    <section style={{ backgroundColor: "#FAF8F4" }} className="py-12 md:py-20 px-4">
      <style>{STYLES}</style>

      <div style={{ maxWidth: "780px", margin: "0 auto" }}>

        {/* Header */}
        <div className="text-center mb-10">
          <p className="seo-section-label">Ancient Wisdom · Modern Guidance</p>
          <h2 className="seo-section-heading">
            Why <em>Astrology?</em>
          </h2>
          <div className="seo-divider" />
        </div>

        {/* Intro card */}
        <div className="seo-intro-card">
          <p>
            Have you ever felt that things in life sometimes happen at just the right time, like someone is silently
            guiding you? <strong>Astrology helps us understand this.</strong> It shows how divine energy flows through
            planets and stars, shaping our daily lives.
          </p>
          <p>
            This old and trusted knowledge explains that nothing is random — everything has a reason. The stars often
            hold clues about our purpose and future.
          </p>
          <p>
            By learning to read signs from the universe, we can walk in tune with the cosmic plan. For years, astrology
            has helped people make better decisions in love, work, family, and their spiritual journey.
          </p>
        </div>

        {/* Accordion */}
        <Accordion items={accordionItems} />

        {/* CTA card */}
        <div className="seo-cta-card">
          <h3 className="seo-cta-heading">
            Begin Your <em>Spiritual Journey</em> Today
          </h3>
          <p className="seo-cta-body">
            Astrology helps us understand the divine plan by showing how cosmic energy flows through our lives. This
            ancient knowledge brings comfort in tough times and guides better choices in love, work, family, and
            spiritual growth.
          </p>
          <p className="seo-cta-body">
            Astrology does not take away your power — it helps you make wise decisions by understanding the stars and
            combining faith with action.
          </p>
          <a href="/talk-astrologer" className="seo-cta-btn">
            Consult an Astrologer
          </a>
        </div>

      </div>
    </section>
  );
}