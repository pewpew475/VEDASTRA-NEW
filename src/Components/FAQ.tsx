// src/components/FaqSection.tsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Why is Astrology so accurate?",
    answer: "Astrology's accuracy comes from thousands of years of careful observation linking planetary movements to human experiences. Experienced astrologers study birth charts that map cosmic influences at your exact birth moment, providing personalized insights rather than generic predictions for everyone.",
  },
  {
    question: "Why should you choose Vedastraa for astrology guidance?",
    answer: "Vedastraa connects you with verified, experienced astrologers who provide personalized guidance based on your unique birth details and life circumstances. The platform offers various consultation formats, transparent pricing, and convenient scheduling that make divine wisdom accessible whenever you need spiritual support.",
  },
  {
    question: "Is astrology prediction true?",
    answer: "Astrology predictions reflect cosmic influences and potential outcomes based on planetary patterns, but your free will and actions ultimately determine your life path. Accurate predictions come from skilled astrologers who understand how cosmic energies interact with individual birth charts and life circumstances.",
  },
  {
    question: "How can online astrology help me predict the future?",
    answer: "Online astrology analyzes your birth chart and current planetary transits to identify upcoming opportunities, challenges, and favorable timing for important decisions. This cosmic guidance helps you prepare for future events and make choices aligned with universal energy flows.",
  },
  {
    question: "How reliable is Vedastraa?",
    answer: "Vedastraa maintains high reliability through verified astrologer credentials, secure payment systems, and consistent customer support. User reviews and ratings help ensure quality consultations, while the platform's reputation is built on genuine spiritual guidance that helps people improve their lives.",
  },
  {
    question: "How much does a consultation on Vedastraa cost?",
    answer: "Vedastraa offers various pricing options from free introductory sessions to premium consultations, with costs typically varying based on astrologer experience and session length. Many users start with a free 5-minute session before investing in longer, more detailed guidance with their preferred practitioner.",
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  /* ── Section header ── */
  .faq-section-label {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #A07830;
    font-weight: 400;
  }

  .faq-section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 4vw, 42px);
    font-weight: 300;
    color: #2C2110;
    line-height: 1.2;
    margin: 8px 0 0;
  }

  .faq-divider {
    width: 36px;
    height: 1px;
    background: linear-gradient(to right, #C9A84C, #E8C97A);
    margin: 12px auto 0;
  }

  /* ── FAQ list ── */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* ── FAQ item ── */
  .faq-item {
    background: #FFFFFF;
    border: 1px solid #E8E2D6;
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.22s ease, box-shadow 0.22s ease;
  }

  .faq-item.open {
    border-color: #C9A84C;
    box-shadow: 0 4px 20px rgba(160, 120, 48, 0.10);
  }

  /* ── FAQ trigger ── */
  .faq-trigger {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s ease;
  }

  .faq-item.open .faq-trigger {
    background: #FDFAF5;
  }

  /* ── Index badge ── */
  .faq-badge {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid #D9CDB8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #A07830;
    background: #FAF8F4;
    margin-top: 1px;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .faq-item.open .faq-badge {
    background: #A07830;
    border-color: #A07830;
    color: #FFFFFF;
  }

  /* ── Question text ── */
  .faq-question {
    flex: 1;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #2C2110;
    line-height: 1.5;
    transition: color 0.2s ease;
    padding-top: 3px;
  }

  .faq-item.open .faq-question {
    color: #A07830;
  }

  /* ── Chevron icon ── */
  .faq-icon {
    flex-shrink: 0;
    margin-top: 3px;
    color: #C0B090;
    transition: color 0.2s ease;
  }

  .faq-item.open .faq-icon {
    color: #A07830;
  }

  /* ── Answer panel ── */
  .faq-answer {
    padding: 0 24px 22px 68px;
    border-top: 1px solid #F0EAE0;
    background: #FDFAF5;
  }

  .faq-answer p {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #6A5C48;
    line-height: 1.85;
    margin: 16px 0 0;
  }

  /* ── Bottom CTA ── */
  .faq-cta-text {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #B0A090;
    text-align: center;
    margin-top: 36px;
  }

  .faq-cta-link {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #A07830;
    text-decoration: none;
    border-bottom: 1px solid #C9A84C;
    padding-bottom: 1px;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .faq-cta-link:hover {
    color: #7A5C18;
    border-color: #7A5C18;
  }

  @media (max-width: 640px) {
    .faq-trigger {
      padding: 16px 18px;
      gap: 12px;
    }
    .faq-answer {
      padding: 0 18px 18px 58px;
    }
  }
`;

// ─── FAQ Card ─────────────────────────────────────────────────────────────────
function FaqCard({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`faq-item${isOpen ? " open" : ""}`}>
      <button className="faq-trigger" onClick={onToggle} aria-expanded={isOpen}>
        {/* Index badge */}
        <span className="faq-badge">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span className="faq-question">{item.question}</span>

        {/* Chevron */}
        <span className="faq-icon">
          {isOpen
            ? <ChevronUp size={17} />
            : <ChevronDown size={17} />}
        </span>
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="faq-answer">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section style={{ backgroundColor: "#FAF8F4" }} className="py-12 md:py-20 px-4">
      <style>{STYLES}</style>

      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Header */}
        <div className="text-center mb-10">
          <p className="faq-section-label">Got Questions?</p>
          <h2 className="faq-section-heading">
            Frequently Asked <em>Questions</em>
          </h2>
          <div className="faq-divider" />
        </div>

        {/* FAQ list */}
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FaqCard
              key={i}
              item={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <p className="faq-cta-text">
          Still have questions?{" "}
          <a href="/contact" className="faq-cta-link">
            Talk to an astrologer
          </a>
        </p>

      </div>
    </section>
  );
}