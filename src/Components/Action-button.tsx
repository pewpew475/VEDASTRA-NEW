// QuickActions.tsx
import React from "react";
import { MessageCircle, Phone, ShoppingBag, BookOpen } from "lucide-react";

const actions = [
  {
    icon: MessageCircle,
    label: "Chat with Astrologer",
    href: "/chat-astrologer",
  },
  {
    icon: Phone,
    label: "Talk to Astrologer",
    href: "/talk-astrologer",
  },
  {
    icon: ShoppingBag,
    label: "Vedastraa Store",
    href: "https://vedastraa.com/store",
    newTab: true,
  },
  {
    icon: BookOpen,
    label: "Blogs",
    href: "/blogs",
  },
];

export default function QuickActions() {
  return (
    <section className="w-full bg-[#fdf8f0] border-b border-amber-100 py-6 px-3">

      {/* Section Heading */}
      <div className="text-center mb-6">
        <h2 className="text-lg md:text-2xl font-semibold text-[#b8860b] tracking-widest uppercase">
          Our Services
        </h2>
        <div className="mx-auto mt-2 h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </div>

      {/* Always a single row — flex nowrap, equal width columns */}
      <div className="flex flex-nowrap justify-center items-start gap-2 sm:gap-6 md:gap-10 max-w-3xl mx-auto">
        {actions.map(({ icon: Icon, label, href, newTab }) => (
          <a
            key={label}
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noreferrer" : undefined}
            className="flex flex-col items-center gap-2 group cursor-pointer flex-1 min-w-0"
          >
            {/* Gold ring circle */}
            <div className="
              w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shrink-0
              bg-gradient-to-br from-amber-50 to-yellow-100
              border-2 border-amber-300
              flex items-center justify-center
              shadow-md shadow-amber-100
              group-hover:border-amber-500
              group-hover:shadow-amber-300
              group-hover:shadow-lg
              group-hover:scale-110
              transition-all duration-300
            ">
              <Icon
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-amber-600 group-hover:text-amber-700 transition-colors duration-200"
                strokeWidth={1.5}
              />
            </div>

            {/* Label — single line, scales down on mobile */}
            <span className="
              text-[10px] sm:text-xs md:text-sm
              text-stone-500 font-medium text-center
              whitespace-nowrap overflow-hidden text-ellipsis
              w-full
              group-hover:text-amber-700 transition-colors duration-200
            ">
              {label}
            </span>
          </a>
        ))}
      </div>

    </section>
  );
}