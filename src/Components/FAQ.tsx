// src/components/FaqSection.tsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const GOLD = "#b8860b";
const GOLD_LIGHT = "#fef9e7";
const GOLD_BORDER = "#e8c44a";

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
    <div
      className="rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        borderColor: isOpen ? GOLD_BORDER : "#e5e7eb",
        boxShadow: isOpen ? "0 4px 20px rgba(184,134,11,0.12)" : "none",
      }}
    >
      <button
        className="w-full flex items-start gap-4 px-5 py-4 md:px-6 md:py-5 text-left transition-colors duration-200"
        style={{ background: isOpen ? GOLD_LIGHT : "#fff" }}
        onClick={onToggle}
      >
        {/* Index badge */}
        <span
          className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: `linear-gradient(135deg, #e8c44a, ${GOLD})` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Question text */}
        <span
          className="flex-1 font-semibold text-sm md:text-base leading-snug"
          style={{ color: isOpen ? GOLD : "#1f2937" }}
        >
          {item.question}
        </span>
        {/* Toggle icon */}
        <span className="flex-shrink-0 mt-0.5">
          {isOpen ? (
            <ChevronUp size={18} style={{ color: GOLD }} />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </span>
      </button>
      {/* Answer panel */}
      {isOpen && (
        <div
          className="px-5 pb-5 pt-1 md:px-6 md:pb-6 text-sm md:text-base text-gray-600 leading-relaxed"
          style={{ background: GOLD_LIGHT, borderTop: `1px solid ${GOLD_BORDER}` }}
        >
          <div className="ml-11">{item.answer}</div>
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    // ✅ FIX: Restored symmetric py-14 md:py-20 — no more pt-8 hack needed
    // because Seo-section-6 is now fixed at the source (pb-0 on mobile).
    <section className="bg-white py-14 md:py-20 px-4 -mb-px">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="uppercase tracking-widest text-xs md:text-sm font-semibold mb-3" style={{ color: GOLD }}>
            Got Questions?
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111111]">
            Frequently Asked <span className="text-[#b8860b]">Questions</span>
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
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

        {/* Bottom CTA hint */}
        <p className="mt-10 text-center text-sm text-gray-400">
          Still have questions?{" "}
          <a
            href="/contact"
            className="font-semibold underline underline-offset-2 transition-colors duration-200"
            style={{ color: GOLD }}
          >
            Talk to an astrologer
          </a>
        </p>
      </div>
    </section>
  );
}