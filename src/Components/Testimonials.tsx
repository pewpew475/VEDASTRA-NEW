// src/components/TestimonialsStrip.tsx

const reviews = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    stars: 5,
    text: "I consulted an astrologer for my marriage date and they were incredibly accurate. The guidance I received was life-changing. Highly recommend Vedastraa!",
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    location: "Mumbai",
    stars: 5,
    text: "I was sceptical at first, but the astrologer predicted things about my career that turned out to be completely true. Amazing experience!",
    avatar: "RV",
  },
  {
    name: "Anjali Mehta",
    location: "Pune",
    stars: 5,
    text: "Not only does this app provide a free daily horoscope but also helps me resolve my personal and professional queries in real time.",
    avatar: "AM",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    stars: 4,
    text: "Be it kundli matching, gemstone suggestions or a palmistry session — Vedastraa never fails to deliver customer satisfaction!",
    avatar: "VS",
  },
  {
    name: "Sneha Kapoor",
    location: "Bangalore",
    stars: 5,
    text: "It's an astonishing application. The reason I am giving this 5 stars is because of the authentic and experienced astrologers available.",
    avatar: "SK",
  },
  {
    name: "Arjun Nair",
    location: "Chennai",
    stars: 5,
    text: "This app helped me get a job by guiding me through the right time to act. I was stressed about my career and the astrologer gave perfect advice.",
    avatar: "AN",
  },
  {
    name: "Deepa Iyer",
    location: "Hyderabad",
    stars: 5,
    text: "I was recommended this app by my friend because of her good experience with an astrologer. I was sceptical but now I am a true believer!",
    avatar: "DI",
  },
  {
    name: "Manish Gupta",
    location: "Lucknow",
    stars: 4,
    text: "Just an amazing app and I would recommend it to everyone. I have used other apps too but this one is simply the best for genuine readings.",
    avatar: "MG",
  },
  {
    name: "Kavita Joshi",
    location: "Ahmedabad",
    stars: 5,
    text: "So I tried this app a few months ago and I was impressed with the first answer I got. The manner in which the astrologer explained was beautiful.",
    avatar: "KJ",
  },
  {
    name: "Rohit Das",
    location: "Kolkata",
    stars: 5,
    text: "I was not feeling well mentally and one session with an astrologer on Vedastraa changed my entire perspective. Truly divine guidance!",
    avatar: "RD",
  },
];

// Duplicate array for seamless infinite loop
const allReviews = [...reviews, ...reviews];

interface ReviewCardProps {
  name: string;
  location: string;
  stars: number;
  text: string;
  avatar: string;
}

function ReviewCard({ name, location, stars, text, avatar }: ReviewCardProps) {
  return (
    <div
      className="
        flex-shrink-0
        w-64 sm:w-72 md:w-80
        bg-white
        border border-amber-200
        rounded-2xl
        shadow-sm shadow-amber-50
        p-4 md:p-5
        flex flex-col gap-3
      "
    >
      {/* Header: Avatar + Name + Location */}
      <div className="flex items-center gap-3">
        <div
          className="
            w-10 h-10 rounded-full flex-shrink-0
            bg-gradient-to-br from-amber-100 to-yellow-200
            border-2 border-amber-300
            flex items-center justify-center
            text-amber-700 font-bold text-xs
          "
        >
          {avatar}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-stone-800 truncate">
            {name}
          </span>
          <span className="text-[11px] text-amber-500 font-medium">
            {location}
          </span>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`w-3.5 h-3.5 ${
              i < stars ? "text-amber-400" : "text-stone-200"
            }`}
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Review text */}
      <p className="text-xs sm:text-sm text-stone-500 leading-relaxed line-clamp-4">
        "{text}"
      </p>
    </div>
  );
}

export default function TestimonialsStrip() {
  return (
    <section className="w-full bg-white py-10 md:py-16 overflow-hidden">

      {/* Section Heading */}
      <div className="text-center mb-8 md:mb-12 px-4">
        <p className="text-xs tracking-[0.3em] uppercase text-amber-500 font-medium mb-2">
          What People Say
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111111] leading-tight">
          Stories from the <span className="text-[#b8860b]">other side</span>
          <br className="hidden sm:block" /> of the chat.
        </h2>
        <div className="mx-auto mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4 flex gap-4 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex gap-4 animate-scroll-left">
          {allReviews.map((r, i) => (
            <ReviewCard key={`row1-${i}`} {...r} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right (reverse) */}
      <div className="flex gap-4 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex gap-4 animate-scroll-right">
          {[...allReviews].reverse().map((r, i) => (
            <ReviewCard key={`row2-${i}`} {...r} />
          ))}
        </div>
      </div>

    </section>
  );
}