import {
  Phone,
  ShoppingBag,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Shuffle,
  Star,
  Sun,
  Sparkles,
} from "lucide-react";

const actions = [
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
  {
    icon: GraduationCap,
    label: "Courses",
    href: "/courses",
  },
  {
    icon: HeartHandshake,
    label: "Kundli Match",
    href: "/kundli-match",
  },
  {
    icon: Shuffle,
    label: "Compatibility",
    href: "/compatibility",
  },
  {
    icon: Star,
    label: "Free Kundli",
    href: "/free-kundli",
  },
  {
    icon: Sun,
    label: "Today Panchang",
    href: "/today-panchang",
  },
  {
    icon: Sparkles,
    label: "Daily Horoscope",
    href: "/daily-horoscope",
  },
];

export default function QuickActions() {
  return (
    <section className="w-full bg-white py-8 px-4">

      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#b8860b]">
          Our Services
        </h2>
        <div className="mx-auto mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
      </div>

      {/* 3×3 Grid */}
      <div className="grid grid-cols-3 auto-rows-fr sm:auto-rows-auto gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto items-stretch">
        {actions.map(({ icon: Icon, label, href, newTab }) => (
          <a
            key={label}
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noreferrer" : undefined}
            className="flex flex-col items-center gap-3 cursor-pointer w-full h-full"
          >
            {/* Card */}
            <div className="
              w-full h-full
              flex flex-col items-center justify-between gap-3
              py-5 px-2
              min-h-[140px] sm:min-h-0
              rounded-2xl
              bg-gradient-to-br from-amber-50 to-yellow-100
              border border-amber-200
              shadow-sm shadow-amber-100
            ">
              {/* Big Icon Circle */}
              <div className="
                w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
                rounded-full shrink-0
                bg-white
                border-2 border-amber-300
                flex items-center justify-center
                shadow-md shadow-amber-100
              ">
                <Icon
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-600"
                  strokeWidth={1.5}
                />
              </div>

              {/* Label */}
              <span className="
                text-[11px] sm:text-xs md:text-sm
                text-stone-600 font-medium text-center
                leading-tight
                w-full px-1 min-h-[32px] sm:min-h-0
              ">
                {label}
              </span>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
}