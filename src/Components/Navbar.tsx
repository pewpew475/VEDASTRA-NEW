import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink, Globe, UserRound, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type MenuKey = "calculators" | "horoscopes" | "language" | "blogs" | null;

type LinkItem = {
  label: string;
  href?: string;
  newTab?: boolean;
};

const calculatorItems: LinkItem[] = [
  { label: "Love Calculator" },
  { label: "Atmakaraka and Darakaraka Calculator" },
  { label: "Numerology Calculator" },
  { label: "Sun Sign Calculator" },
  { label: "Rising Sign / Ascendant Calculator" },
  { label: "Rashi Calculator" },
  { label: "Dasha Calculator" },
  { label: "Nakshatra Calculator" },
  { label: "Mangal Dosha Calculator" },
  { label: "Shani Sade Sati Calculator" },
  { label: "Moon Phase Calculator" },
  { label: "Birth Chart / Natal Chart Calculator" },
  { label: "Flames Calculator" },
  { label: "Lucky Vehicle Number Calculator" },
  { label: "Friendship Calculator" },
  { label: "Kaal Sarp Dosh Calculator" },
  { label: "Ishta Devata Calculator" },
  { label: "Lo Shu Grid Calculator" },
  { label: "Transit Chart Calculator" },
  { label: "Name Compatibility Calculator" },
  { label: "Age Calculator" },
  { label: "Mulank Calculator" },
  { label: "Mobile Number Numerology Calculator" },
  { label: "Destiny Number Calculator" },
  { label: "Lucky Name Numerology Calculator" },
];

const horoscopeItems: LinkItem[] = [
  { label: "Today's Horoscope" },
  { label: "Daily Horoscope" },
  { label: "Weekly Horoscope" },
  { label: "Monthly Horoscope" },
  { label: "Yearly Horoscope" },
  { label: "Tomorrow's Horoscope" },
  { label: "Yesterday's Horoscope" },
  { label: "Chinese Horoscope" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  /* ── Scrollbar inside dropdowns ── */
  .nav-scroll::-webkit-scrollbar { width: 4px; }
  .nav-scroll::-webkit-scrollbar-track { background: transparent; }
  .nav-scroll::-webkit-scrollbar-thumb { background: #D9CDB8; border-radius: 99px; }
  .nav-scroll::-webkit-scrollbar-thumb:hover { background: #C9A84C; }
  .nav-scroll { scrollbar-width: thin; scrollbar-color: #D9CDB8 transparent; }

  /* ── Top gold accent line ── */
  .nav-accent-line {
    position: absolute;
    inset: 0;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, #C9A84C 30%, #C9A84C 70%, transparent);
    pointer-events: none;
  }

  /* ── Header base ── */
  .nav-header {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    background: #FFFFFF;
    transition: box-shadow 0.3s ease;
  }

  .nav-header.scrolled {
    box-shadow: 0 4px 24px rgba(160, 120, 48, 0.10);
  }

  /* ── Row divider ── */
  .nav-row-divider {
    border-bottom: 1px solid #F0EAE0;
  }

  /* ── Desktop nav link ── */
  .nav-link {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #4A3A28;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 7px 12px;
    border-radius: 6px;
    border: none;
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    transition: color 0.18s ease, background 0.18s ease;
    position: relative;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #A07830;
    background: #FAF8F4;
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 12px;
    right: 12px;
    height: 1.5px;
    border-radius: 99px;
    background: linear-gradient(to right, #C9A84C, #E8C97A);
  }

  /* ── Dropdown panel ── */
  .nav-panel {
    position: absolute;
    top: calc(100% + 8px);
    z-index: 9999;
    background: #FFFFFF;
    border: 1px solid #E8E2D6;
    border-radius: 14px;
    box-shadow: 0 16px 48px rgba(100, 70, 20, 0.12), 0 4px 12px rgba(0,0,0,0.05);
    padding: 16px;
    transition: opacity 0.2s ease, transform 0.2s ease;
    transform-origin: top left;
  }

  .nav-panel.hidden-panel {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-6px) scaleY(0.96);
  }

  .nav-panel.visible-panel {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0) scaleY(1);
  }

  .nav-panel-heading {
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.20em;
    text-transform: uppercase;
    color: #C9A84C;
    margin: 0 0 12px;
  }

  /* ── Dropdown item ── */
  .nav-panel-item {
    font-family: 'Jost', sans-serif;
    font-size: 12.5px;
    font-weight: 400;
    color: #4A3A28;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 8px;
    text-decoration: none;
    border: 1px solid transparent;
    transition: background 0.16s ease, color 0.16s ease, border-color 0.16s ease;
    cursor: pointer;
    background: transparent;
    width: 100%;
    text-align: left;
    position: relative;
    overflow: hidden;
  }

  .nav-panel-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #C9A84C, #E8C97A);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.18s ease;
    border-radius: 0 2px 2px 0;
  }

  .nav-panel-item:hover {
    background: #FAF8F4;
    color: #A07830;
    border-color: #EDE8DF;
  }

  .nav-panel-item:hover::before {
    transform: scaleY(1);
  }

  /* ── Language button ── */
  .nav-lang-trigger {
    font-family: 'Jost', sans-serif;
    font-size: 12.5px;
    font-weight: 400;
    color: #4A3A28;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 6px;
    border: 1px solid #E8E2D6;
    background: #FFFFFF;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  }

  .nav-lang-trigger:hover {
    color: #A07830;
    border-color: #C9A84C;
    background: #FAF8F4;
  }

  /* ── Login button ── */
  .nav-login-btn {
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: #A07830;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 22px;
    border-radius: 4px;
    border: 1px solid #A07830;
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.18s ease, color 0.18s ease;
  }

  .nav-login-btn:hover {
    background: #A07830;
    color: #FFFFFF;
  }

  /* ── Tagline ── */
  .nav-tagline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12px;
    font-style: italic;
    font-weight: 300;
    color: #C9A84C;
    opacity: 0.7;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }

  /* ── Mobile drawer ── */
  .nav-drawer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
    height: 100%;
    width: 80vw;
    max-width: 300px;
    background: #FFFFFF;
    box-shadow: 4px 0 32px rgba(100, 70, 20, 0.12);
    overflow-y: auto;
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .nav-drawer.open { transform: translateX(0); }
  .nav-drawer.closed { transform: translateX(-100%); }

  .nav-drawer-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(28, 20, 14, 0.45);
    backdrop-filter: blur(2px);
    transition: opacity 0.3s ease;
  }

  .nav-drawer-overlay.open { opacity: 1; pointer-events: auto; }
  .nav-drawer-overlay.closed { opacity: 0; pointer-events: none; }

  /* ── Drawer header ── */
  .nav-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #F0EAE0;
  }

  .nav-drawer-menu-label {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #A07830;
  }

  .nav-drawer-close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #FAF8F4;
    border: 1px solid #E8E2D6;
    cursor: pointer;
    color: #6A5C48;
    transition: background 0.18s ease;
  }

  .nav-drawer-close:hover { background: #F0EAE0; }

  /* ── Drawer plain links ── */
  .nav-drawer-link {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #4A3A28;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 13px 20px;
    border-bottom: 1px solid #F5F0E8;
    background: transparent;
    border-left: none;
    border-right: none;
    border-top: none;
    cursor: pointer;
    text-align: left;
    transition: color 0.16s ease, background 0.16s ease;
  }

  .nav-drawer-link:hover,
  .nav-drawer-link.active {
    color: #A07830;
    background: #FAF8F4;
  }

  /* ── Drawer accordion ── */
  .nav-drawer-acc-trigger {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #4A3A28;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 13px 20px;
    border-bottom: 1px solid #F5F0E8;
    border-left: none;
    border-right: none;
    border-top: none;
    background: transparent;
    cursor: pointer;
    transition: color 0.16s ease, background 0.16s ease;
  }

  .nav-drawer-acc-trigger:hover { color: #A07830; background: #FAF8F4; }

  .nav-drawer-acc-body {
    overflow: hidden;
    transition: max-height 0.3s ease;
    border-bottom: 1px solid #F5F0E8;
    background: #FDFAF5;
  }

  .nav-drawer-acc-item {
    font-family: 'Jost', sans-serif;
    font-size: 12.5px;
    font-weight: 300;
    color: #6A5C48;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px 10px 28px;
    border-bottom: 1px solid #F0EAE0;
    text-decoration: none;
    transition: color 0.16s ease, background 0.16s ease;
    cursor: pointer;
    background: transparent;
    width: 100%;
    text-align: left;
    border-left: none;
    border-right: none;
    border-top: none;
  }

  .nav-drawer-acc-item:last-child { border-bottom: none; }
  .nav-drawer-acc-item:hover { color: #A07830; background: #FAF8F4; }

  /* ── Drawer bottom section ── */
  .nav-drawer-section {
    padding: 16px 20px;
    border-bottom: 1px solid #F5F0E8;
  }

  .nav-drawer-section-label {
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.20em;
    text-transform: uppercase;
    color: #C9A84C;
    margin-bottom: 10px;
    display: block;
  }

  /* ── Mobile hamburger ── */
  .nav-hamburger {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid #E8E2D6;
    background: #FFFFFF;
    cursor: pointer;
    color: #6A5C48;
    transition: background 0.16s ease, border-color 0.16s ease;
  }

  .nav-hamburger:hover {
    background: #FAF8F4;
    border-color: #C9A84C;
    color: #A07830;
  }
`;

// ─── Mobile Accordion ─────────────────────────────────────────────────────────
function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="nav-drawer-acc-trigger"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{label}</span>
        <ChevronDown
          size={15}
          style={{
            color: "#C9A84C",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>
      <div
        className="nav-drawer-acc-body"
        style={{ maxHeight: open ? "500px" : "0px" }}
      >
        <div
          className="nav-scroll"
          style={{ maxHeight: "220px", overflowY: "auto" }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

// ─── Dropdown Panel Item ──────────────────────────────────────────────────────
function PanelItem({
  item,
  onSelect,
}: {
  item: LinkItem;
  onSelect: () => void;
}) {
  return (
    <a
      href={item.href ?? "#"}
      target={item.newTab ? "_blank" : undefined}
      rel={item.newTab ? "noreferrer" : undefined}
      className="nav-panel-item"
      onClick={(e) => {
        if (!item.href) e.preventDefault();
        onSelect();
      }}
    >
      <span style={{ paddingLeft: "6px" }}>{item.label}</span>
      {item.newTab && (
        <ExternalLink size={10} style={{ opacity: 0.5, flexShrink: 0 }} aria-hidden="true" />
      )}
    </a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [activeItem, setActiveItem] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const languageLabel = language === "hi" ? "हिंदी" : "English";
  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
  ];

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    const onDocumentClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpenMenu(null); setIsMobileOpen(false); }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const openDelayed = (menu: Exclude<MenuKey, null>) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenMenu(menu);
  };

  const closeDelayed = (menu: Exclude<MenuKey, null>) => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu((cur) => (cur === menu ? null : cur));
    }, 150);
  };

  const toggleMenu = (menu: Exclude<MenuKey, null>) =>
    setOpenMenu((cur) => (cur === menu ? null : menu));

  const select = (key: string) => {
    setActiveItem(key);
    setOpenMenu(null);
  };

  const handleDropdownWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

    if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
      e.preventDefault();
    }
    e.stopPropagation();
  };

  const closeMobile = () => setIsMobileOpen(false);

  const isOpen = (menu: Exclude<MenuKey, null>) => openMenu === menu;

  // Plain desktop nav link items (row 1)
  const row1Links = [
    { label: "Free Kundli",        key: "free-kundli" },
    { label: "Kundli Matching",    key: "kundli-matching" },
    { label: "Compatibility",      key: "compatibility" },
    { label: "Courses",            key: "courses" },
    { label: "Tools",              key: "tools" },
    { label: "Talk to Astrologer", key: "talk-to-astrologer" },
  ];

  // Plain desktop nav link items (row 2)
  const row2Plain = [
    { label: "Gemstones", key: "gemstones" },
    { label: "Rudraksh",  key: "rudraksh" },
    { label: "Bracelets", key: "bracelets" },
  ];

  return (
    <>
      <style>{STYLES}</style>

      <header
        ref={navRef}
        className={`nav-header${isScrolled ? " scrolled" : ""}`}
        aria-label="Site navigation"
      >
        {/* Top gold accent line */}
        <div className="nav-accent-line" aria-hidden="true" />

        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 32px" }}>

          {/* ══ DESKTOP ══════════════════════════════════════════════════════════ */}
          <div className="hidden lg:block">

            {/* Row 1: Logo + plain links + utilities */}
            <div className="nav-row-divider" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "10px 0" }}>

              {/* Logo */}
              <a
                href="/"
                style={{ flexShrink: 0, display: "flex", alignItems: "center", height: "64px", minWidth: "200px", position: "relative" }}
              >
                <img
                  src="/logo-removebg.png"
                  alt="Vedastraa Logo"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "100px",
                    width: "auto",
                    objectFit: "contain",
                    zIndex: 10,
                    filter: "drop-shadow(0 4px 10px rgba(120, 80, 20, 0.28)) contrast(1.18) brightness(0.82) saturate(1.1)",
                  }}
                  loading="eager"
                  decoding="async"
                />
              </a>

              {/* Row 1 centre links */}
              <nav
                style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "2px", flex: 1 }}
                aria-label="Main navigation"
              >
                {row1Links.map(({ label, key }) => (
                  <button
                    key={key}
                    type="button"
                    className={`nav-link${activeItem === key ? " active" : ""}`}
                    onClick={() => select(key)}
                  >
                    {label}
                  </button>
                ))}
                <a
                  href="https://vedastraa.com/store"
                  target="_blank"
                  rel="noreferrer"
                  className={`nav-link${activeItem === "store" ? " active" : ""}`}
                  onClick={() => setActiveItem("store")}
                >
                  Vedastraa Store
                  <ExternalLink size={11} style={{ opacity: 0.6 }} aria-hidden="true" />
                </a>
              </nav>

              {/* Right utilities */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>

                {/* Language dropdown */}
                <div
                  style={{ position: "relative" }}
                  onMouseEnter={() => openDelayed("language")}
                  onMouseLeave={() => closeDelayed("language")}
                >
                  <button
                    type="button"
                    className="nav-lang-trigger"
                    aria-expanded={isOpen("language")}
                    onClick={() => toggleMenu("language")}
                    translate="no"
                  >
                    <Globe size={13} style={{ color: "#C9A84C" }} aria-hidden="true" />
                    <span className="notranslate" translate="no">{languageLabel}</span>
                    <ChevronDown
                      size={12}
                      style={{
                        color: "#C9A84C",
                        transform: isOpen("language") ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                      }}
                    />
                  </button>

                  <div
                    className={`nav-panel${isOpen("language") ? " visible-panel" : " hidden-panel"}`}
                    style={{ right: 0, left: "auto", width: "148px", padding: "10px" }}
                  >
                    <p className="nav-panel-heading">Language</p>
                    {languageOptions.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        className="nav-panel-item"
                        translate="no"
                        onClick={() => { setLanguage(item.code); select(item.label); }}
                      >
                        <span className="notranslate" translate="no" style={{ paddingLeft: "6px" }}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Login */}
                <button
                  type="button"
                  className="nav-login-btn"
                  onClick={() => select("login")}
                >
                  <UserRound size={13} aria-hidden="true" />
                  Login
                </button>
              </div>
            </div>

            {/* Row 2: Dropdown links + plain links + tagline */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px", padding: "6px 0" }}>

              {/* Calculators */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => openDelayed("calculators")}
                onMouseLeave={() => closeDelayed("calculators")}
              >
                <button
                  type="button"
                  className={`nav-link${isOpen("calculators") ? " active" : ""}`}
                  aria-expanded={isOpen("calculators")}
                  onClick={() => toggleMenu("calculators")}
                >
                  Calculators
                  <ChevronDown
                    size={12}
                    style={{
                      transform: isOpen("calculators") ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>
                <div
                  className={`nav-panel${isOpen("calculators") ? " visible-panel" : " hidden-panel"}`}
                  style={{ left: 0, width: "360px", maxHeight: "70vh", overflow: "hidden" }}
                >
                  <p className="nav-panel-heading">Calculators</p>
                  <div
                    className="nav-scroll"
                    style={{ maxHeight: "calc(70vh - 40px)", overflowY: "auto", paddingRight: "4px", display: "grid", gap: "4px" }}
                    onWheel={handleDropdownWheel}
                  >
                    {calculatorItems.map((item) => (
                      <PanelItem key={item.label} item={item} onSelect={() => select(item.label)} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Horoscopes */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => openDelayed("horoscopes")}
                onMouseLeave={() => closeDelayed("horoscopes")}
              >
                <button
                  type="button"
                  className={`nav-link${isOpen("horoscopes") ? " active" : ""}`}
                  aria-expanded={isOpen("horoscopes")}
                  onClick={() => toggleMenu("horoscopes")}
                >
                  Horoscopes
                  <ChevronDown
                    size={12}
                    style={{
                      transform: isOpen("horoscopes") ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>
                <div
                  className={`nav-panel${isOpen("horoscopes") ? " visible-panel" : " hidden-panel"}`}
                  style={{ left: 0, width: "270px", display: "grid", gap: "4px" }}
                >
                  <p className="nav-panel-heading">Horoscopes</p>
                  {horoscopeItems.map((item) => (
                    <PanelItem key={item.label} item={item} onSelect={() => select(item.label)} />
                  ))}
                </div>
              </div>

              {/* Blogs */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => openDelayed("blogs")}
                onMouseLeave={() => closeDelayed("blogs")}
              >
                <button
                  type="button"
                  className={`nav-link${isOpen("blogs") ? " active" : ""}`}
                  aria-expanded={isOpen("blogs")}
                  onClick={() => toggleMenu("blogs")}
                >
                  Blogs
                  <ChevronDown
                    size={12}
                    style={{
                      transform: isOpen("blogs") ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>
                <div
                  className={`nav-panel${isOpen("blogs") ? " visible-panel" : " hidden-panel"}`}
                  style={{ left: 0, width: "220px", display: "grid", gap: "4px" }}
                >
                  <p className="nav-panel-heading">Blogs</p>
                  <PanelItem
                    item={{ label: "Angel Numbers", href: "#" }}
                    onSelect={() => select("angel-numbers")}
                  />
                  <PanelItem
                    item={{ label: "All Blogs", href: "https://vedastraa.com/blogs", newTab: true }}
                    onSelect={() => select("all-blogs")}
                  />
                </div>
              </div>

              {/* Plain row 2 links */}
              {row2Plain.map(({ label, key }) => (
                <button
                  key={key}
                  type="button"
                  className={`nav-link${activeItem === key ? " active" : ""}`}
                  onClick={() => select(key)}
                >
                  {label}
                </button>
              ))}

              {/* Tagline */}
              <div style={{ marginLeft: "auto" }}>
                <span className="nav-tagline">Astrology · Guidance · Destiny</span>
              </div>
            </div>
          </div>

          {/* ══ MOBILE ═══════════════════════════════════════════════════════════ */}
          <div
            className="flex lg:hidden"
            style={{ alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}
          >
            {/* Logo */}
            <a
              href="/"
              style={{ display: "flex", alignItems: "center", height: "52px", minWidth: "120px", position: "relative" }}
            >
              <img
                src="/logo-removebg.png"
                alt="Vedastraa Logo"
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "90px",
                  width: "auto",
                  objectFit: "contain",
                  zIndex: 10,
                  filter: "drop-shadow(0 3px 8px rgba(120, 80, 20, 0.25)) contrast(1.15) brightness(0.84) saturate(1.1)",
                }}
                loading="eager"
              />
            </a>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* Mobile Login */}
              <button
                type="button"
                className="nav-login-btn"
                style={{ padding: "7px 14px", fontSize: "11px" }}
                onClick={() => select("login")}
              >
                <UserRound size={12} aria-hidden="true" />
                Login
              </button>

              {/* Hamburger */}
              <button
                type="button"
                className="nav-hamburger"
                onClick={() => setIsMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`nav-drawer-overlay${isMobileOpen ? " open" : " closed"}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ── */}
      <nav
        className={`nav-drawer${isMobileOpen ? " open" : " closed"} lg:hidden`}
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="nav-drawer-header">
          <span className="nav-drawer-menu-label">Menu</span>
          <button
            type="button"
            className="nav-drawer-close"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <X size={15} />
          </button>
        </div>

        {/* Plain links */}
        <div
          className="nav-scroll"
          style={{ maxHeight: "220px", overflowY: "auto" }}
          onWheel={handleDropdownWheel}
        >
          {[
            { label: "Free Kundli",        key: "free-kundli" },
            { label: "Kundli Matching",    key: "kundli-matching" },
            { label: "Compatibility",      key: "compatibility" },
            { label: "Courses",            key: "courses" },
            { label: "Tools",              key: "tools" },
            { label: "Gemstones",          key: "gemstones" },
            { label: "Rudraksh",           key: "rudraksh" },
            { label: "Bracelets",          key: "bracelets" },
            { label: "Talk to Astrologer", key: "talk-to-astrologer" },
          ].map(({ label, key }) => (
            <button
              key={key}
              type="button"
              className={`nav-drawer-link${activeItem === key ? " active" : ""}`}
              onClick={() => { select(key); closeMobile(); }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Accordion: Calculators */}
        <MobileAccordion label="Calculators">
          {calculatorItems.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              className="nav-drawer-acc-item"
              onClick={(e) => {
                if (!item.href) e.preventDefault();
                select(item.label);
                closeMobile();
              }}
            >
              {item.label}
            </a>
          ))}
        </MobileAccordion>

        {/* Accordion: Horoscopes */}
        <MobileAccordion label="Horoscopes">
          {horoscopeItems.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              className="nav-drawer-acc-item"
              onClick={(e) => {
                if (!item.href) e.preventDefault();
                select(item.label);
                closeMobile();
              }}
            >
              {item.label}
            </a>
          ))}
        </MobileAccordion>

        {/* Accordion: Blogs */}
        <MobileAccordion label="Blogs">
          <a
            href="#"
            className="nav-drawer-acc-item"
            onClick={(e) => { e.preventDefault(); select("angel-numbers"); closeMobile(); }}
          >
            Angel Numbers
          </a>
          <a
            href="https://vedastraa.com/blogs"
            target="_blank"
            rel="noreferrer"
            className="nav-drawer-acc-item"
            onClick={() => { select("all-blogs"); closeMobile(); }}
          >
            <span>All Blogs</span>
            <ExternalLink size={11} style={{ opacity: 0.5 }} aria-hidden="true" />
          </a>
        </MobileAccordion>

        {/* Language + Store */}
        <div className="nav-drawer-section">
          <span className="nav-drawer-section-label">Language</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {languageOptions.map((item) => (
              <button
                key={item.code}
                type="button"
                className="nav-drawer-acc-item"
                style={{
                  background: language === item.code ? "#FAF8F4" : "transparent",
                  color: language === item.code ? "#A07830" : "#4A3A28",
                  borderBottom: "none",
                  borderRadius: "8px",
                }}
                translate="no"
                onClick={() => { setLanguage(item.code); select(item.label); closeMobile(); }}
              >
                <span className="notranslate" translate="no" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Globe size={13} style={{ color: "#C9A84C" }} aria-hidden="true" />
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="nav-drawer-section">
          <a
            href="https://vedastraa.com/store"
            target="_blank"
            rel="noreferrer"
            className="nav-drawer-acc-item"
            style={{ borderRadius: "8px", borderBottom: "none" }}
            onClick={() => { select("store"); closeMobile(); }}
          >
            <span>Vedastraa Store</span>
            <ExternalLink size={11} style={{ opacity: 0.5 }} aria-hidden="true" />
          </a>
        </div>

      </nav>
    </>
  );
}

export default Navbar;