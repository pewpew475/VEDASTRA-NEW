import { useLanguage } from "../context/LanguageContext";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ExternalLink,
} from "lucide-react";

// ─── Brand SVG Icons (not in lucide-react) ────────────────────────────────────

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const XTwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const footerLinks = {
  services: [
    { label: "Free Kundli", href: "/kundli" },
    { label: "Kundli Matching", href: "/kundli-matching" },
    { label: "Compatibility", href: "/compatibility" },
    { label: "Talk to Astrologer", href: "/talk-to-astrologer" },
    { label: "Daily Horoscope", href: "/horoscope" },
  ],
  explore: [
    { label: "Horoscopes", href: "/horoscopes" },
    { label: "Blogs", href: "/blogs" },
    { label: "Calculators", href: "/calculators" },
    { label: "Vedastraa Store", href: "/store", external: true },
    { label: "Meet Our Astrologers", href: "/astrologers" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
];

const socialLinks = [
  { Icon: FacebookIcon, href: "#", label: "Facebook" },
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: YoutubeIcon, href: "#", label: "YouTube" },
  { Icon: XTwitterIcon, href: "#", label: "X (Twitter)" },
];

// ─── Footer ────────────────────────────────────────────────────────────────────

export const Footer = () => {
  const { language: activeLang, setLanguage } = useLanguage();

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fef9ed 0%, #fdf3d8 55%, #f9e9bb 100%)",
      }}
      aria-label="Site footer"
    >
      {/* Decorative ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(200,131,26,0.07) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(200,131,26,0.05) 0%, transparent 55%)",
        }}
      />

      {/* Wavy top divider */}
      <div className="w-full overflow-hidden -mt-px" aria-hidden="true">
        <svg
          viewBox="0 0 1440 28"
          preserveAspectRatio="none"
          className="block w-full"
          style={{ height: "28px" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 28 L0 14 Q180 0 360 14 Q540 28 720 14 Q900 0 1080 14 Q1260 28 1440 14 L1440 28 Z"
            fill="#C8831A"
            fillOpacity="0.13"
          />
          <path
            d="M0 28 L0 20 Q180 10 360 20 Q540 30 720 20 Q900 10 1080 20 Q1260 30 1440 20 L1440 28 Z"
            fill="#C8831A"
            fillOpacity="0.07"
          />
        </svg>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10 pt-12 pb-8">

        {/* ── Row 1 : Brand + Nav Columns ──────────────────────────────────────── */}
        <div
          className="flex flex-col lg:flex-row lg:items-start gap-10 pb-10"
          style={{ borderBottom: "1px solid rgba(120,80,20,0.14)" }}
        >
          {/* Brand block */}
          <div className="flex-shrink-0 lg:w-[256px] text-left">

            {/* ── Logo slot ───────────────────────────────────────────────────── */}
            <div className="flex h-24 w-72 items-center justify-start sm:h-28 sm:w-80 lg:h-28 lg:w-96">
              <img
                src="/logo-removebg.png"
                alt="Vedastraa logo"
                width={448}
                height={128}
                className="block h-24 w-auto sm:h-28 lg:h-32"
                style={{ objectFit: "contain" }}
                loading="lazy"
                decoding="async"
              />
            </div>

            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "#7a5c30", maxWidth: "26ch" }}
            >
              Ancient Vedic wisdom guiding your journey — trusted by millions
              across India.
            </p>

            {/* 5-star trust row */}
            <div
              className="flex items-center gap-1 mt-3 justify-start"
              aria-label="5 star rated"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="#C8831A"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-xs ml-2" style={{ color: "#9a7040" }}>
                Trusted by users worldwide
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2.5 mt-5 justify-start">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                  style={{
                    background: "rgba(200,131,26,0.10)",
                    color: "#C8831A",
                    border: "1px solid rgba(200,131,26,0.22)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "#C8831A";
                    el.style.color = "#fff";
                    el.style.borderColor = "#C8831A";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(200,131,26,0.10)";
                    el.style.color = "#C8831A";
                    el.style.borderColor = "rgba(200,131,26,0.22)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8 min-w-0">

            {/* Our Services */}
            <nav aria-label="Our Services">
              <h3
                className="text-[0.68rem] font-semibold uppercase mb-4"
                style={{ color: "#C8831A", letterSpacing: "0.15em" }}
              >
                Our Services
              </h3>
              <ul className="space-y-2.5" role="list">
                {footerLinks.services.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm transition-colors duration-150"
                      style={{ color: "#5a3e1a" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#92400e")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#5a3e1a")
                      }
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Explore */}
            <nav aria-label="Explore">
              <h3
                className="text-[0.68rem] font-semibold uppercase mb-4"
                style={{ color: "#C8831A", letterSpacing: "0.15em" }}
              >
                Explore
              </h3>
              <ul className="space-y-2.5" role="list">
                {footerLinks.explore.map(({ label, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm inline-flex items-center gap-1 transition-colors duration-150"
                      style={{ color: "#5a3e1a" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#92400e")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#5a3e1a")
                      }
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {label}
                      {external && (
                        <ExternalLink
                          size={11}
                          strokeWidth={1.8}
                          style={{ color: "#C8831A", opacity: 0.7, flexShrink: 0 }}
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Company */}
            <nav aria-label="Company" className="col-span-2 sm:col-span-1">
              <h3
                className="text-[0.68rem] font-semibold uppercase mb-4"
                style={{ color: "#C8831A", letterSpacing: "0.15em" }}
              >
                Company
              </h3>
              <ul className="space-y-2.5" role="list">
                {footerLinks.company.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm transition-colors duration-150"
                      style={{ color: "#5a3e1a" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#92400e")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#5a3e1a")
                      }
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* ── Row 2 : Contact + Language ───────────────────────────────────────── */}
        <div
          className="flex flex-col md:flex-row md:items-center gap-5 py-7"
          style={{ borderBottom: "1px solid rgba(120,80,20,0.14)" }}
        >
          {/* Contact info */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-3 flex-1">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-150"
              style={{ color: "#5a3e1a" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#92400e")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#5a3e1a")
              }
            >
              <Phone size={14} strokeWidth={1.8} style={{ color: "#C8831A", flexShrink: 0 }} aria-hidden="true" />
              +91 98765 43210
            </a>

            <a
              href="mailto:support@vedastraa.com"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-150"
              style={{ color: "#5a3e1a" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#92400e")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#5a3e1a")
              }
            >
              <Mail size={14} strokeWidth={1.8} style={{ color: "#C8831A", flexShrink: 0 }} aria-hidden="true" />
              support@vedastraa.com
            </a>

            <span
              className="inline-flex items-start gap-2 text-sm"
              style={{ color: "#5a3e1a" }}
            >
              <MapPin size={14} strokeWidth={1.8} style={{ color: "#C8831A", flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
              Vedic Heights, Spiritual Hub, New Delhi, India
            </span>
          </div>

          {/* Language selector */}
          <div
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="Language selection"
          >
            <Globe size={14} strokeWidth={1.8} style={{ color: "#C8831A" }} aria-hidden="true" />
            <span
              className="text-[0.68rem] uppercase notranslate"
              style={{ color: "#9a7040", letterSpacing: "0.12em", marginRight: "4px" }}
              translate="no"
            >
              Lang:
            </span>
            <div className="flex gap-1.5" role="group" aria-label="Select language">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  aria-pressed={activeLang === code}
                  className="px-3 py-1 rounded-full text-xs transition-all duration-150 cursor-pointer notranslate"
                  translate="no"
                  style={{
                    background: activeLang === code ? "#C8831A" : "rgba(200,131,26,0.10)",
                    color: activeLang === code ? "#fff" : "#7a5c30",
                    border: `1px solid ${activeLang === code ? "#C8831A" : "rgba(200,131,26,0.22)"}`,
                    fontWeight: activeLang === code ? 600 : 400,
                  }}
                >
                  <span className="notranslate" translate="no">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3 : Legal bar ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
          <p className="text-xs text-center sm:text-left" style={{ color: "#9a7040" }}>
            © 2026 VedAstraa. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms", href: "/terms" },
              { label: "Sitemap", href: "/sitemap" },
            ].map(({ label, href }, i, arr) => (
              <span key={label} className="flex items-center gap-3">
                <a
                  href={href}
                  className="text-xs transition-colors duration-150"
                  style={{ color: "#9a7040" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#92400e")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#9a7040")
                  }
                >
                  {label}
                </a>
                {i < arr.length - 1 && (
                  <span style={{ color: "#C8831A", opacity: 0.35 }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;