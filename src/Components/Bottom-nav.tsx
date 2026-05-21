// src/components/BottomNav.tsx

import { Home, MessageCircle, ShoppingBag, User } from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "Talk",
    icon: MessageCircle,
    href: "/talk-astrologer",
  },
  {
    label: "Mall",
    icon: ShoppingBag,
    href: "/store",
  },
  {
    label: "You",
    icon: User,
    href: "/profile",
  },
];

export default function BottomNav() {
  const [active, setActive] = useState("Home");

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-white
        border-t border-amber-100
        shadow-[0_-4px_20px_rgba(180,140,0,0.08)]
        px-2 py-1
        flex items-center justify-around
        md:hidden
      "
    >
      {navItems.map(({ label, icon: Icon, href }) => {
        const isActive = active === label;
        return (
          <a
            key={label}
            href={href}
            onClick={() => setActive(label)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 cursor-pointer"
          >
            {/* Icon pill — active gets gold background */}
            <div
              className={`
                flex items-center justify-center
                rounded-full
                transition-all duration-200
                px-4 py-1
                ${isActive
                  ? "bg-amber-100 border border-amber-300"
                  : "bg-transparent"
                }
              `}
            >
              <Icon
                className={`
                  w-5 h-5
                  transition-colors duration-200
                  ${isActive ? "text-amber-600" : "text-stone-400"}
                `}
                strokeWidth={isActive ? 2.2 : 1.8}
                fill={isActive ? "rgba(217,119,6,0.12)" : "none"}
              />
            </div>

            {/* Label */}
            <span
              className={`
                text-[10px] font-medium tracking-wide
                transition-colors duration-200
                ${isActive ? "text-amber-600" : "text-stone-400"}
              `}
            >
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}