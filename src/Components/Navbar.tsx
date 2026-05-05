import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink, Globe, UserRound, Menu, X } from "lucide-react";

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

const navLinkClass = (active = false) =>
    [
        "group relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-out hover:text-amber-700 hover:bg-amber-50/60 whitespace-nowrap",
        "after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-amber-500 after:to-orange-300 after:transition-transform after:duration-300 group-hover:after:scale-x-100",
        active ? "text-amber-700 bg-amber-50/60 after:scale-x-100" : "",
    ].join(" ");

const panelBaseClass =
    "absolute top-full mt-2 origin-top rounded-2xl border border-amber-200/80 bg-white/98 text-slate-800 shadow-[0_20px_60px_rgba(138,101,11,0.15),0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] z-[9999]";

const scrollbarStyles = `
  .vedas-scroll::-webkit-scrollbar {
    width: 5px;
  }
  .vedas-scroll::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 99px;
  }
  .vedas-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #f59e0b, #f97316);
    border-radius: 99px;
  }
  .vedas-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #d97706, #ea580c);
  }
  .vedas-scroll {
    scrollbar-width: thin;
    scrollbar-color: #f59e0b transparent;
  }
`;

function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-amber-100">
            <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-medium text-slate-800"
                onClick={() => setOpen((v) => !v)}
            >
                {label}
                <ChevronDown className={["h-4 w-4 text-amber-600 transition-transform duration-300", open ? "rotate-180" : ""].join(" ")} />
            </button>
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: open ? "600px" : "0px" }}
            >
                <div className="px-3 pb-3">{children}</div>
            </div>
        </div>
    );
}

function MobileList({ items, onClose }: { items: LinkItem[]; onClose: () => void }) {
    return (
        <div className="vedas-scroll max-h-52 overflow-y-auto rounded-2xl border border-amber-100 bg-amber-50/60">
            {items.map((item) => (
                <a
                    key={item.label}
                    href={item.href ?? "#"}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noreferrer" : undefined}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-amber-100 hover:text-amber-900 border-b border-amber-100/60 last:border-0"
                    onClick={(e) => { if (!item.href) e.preventDefault(); onClose(); }}
                >
                    {item.label}
                    {item.newTab && <ExternalLink className="h-3 w-3 opacity-60" />}
                </a>
            ))}
        </div>
    );
}

function Navbar() {
    const [openMenu, setOpenMenu] = useState<MenuKey>(null);
    const [activeItem, setActiveItem] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileOpen]);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 12);
        const onDocumentClick = (event: MouseEvent) => {
            if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") { setOpenMenu(null); setIsMobileOpen(false); }
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

    const toggleMenu = (menu: Exclude<MenuKey, null>) =>
        setOpenMenu((current) => (current === menu ? null : menu));

    const openMenuDelayed = (menu: Exclude<MenuKey, null>) => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setOpenMenu(menu);
    };

    const closeMenuDelayed = (menu: Exclude<MenuKey, null>) => {
        closeTimeoutRef.current = setTimeout(() => {
            setOpenMenu((current) => (current === menu ? null : current));
        }, 150);
    };

    const closeMobile = () => setIsMobileOpen(false);

    const renderDropdownItem = (item: LinkItem) => (
        <a
            key={item.label}
            href={item.href ?? "#"}
            target={item.newTab ? "_blank" : undefined}
            rel={item.newTab ? "noreferrer" : undefined}
            className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-xl border border-amber-100/80 bg-white px-4 py-2.5 text-sm text-slate-700 transition-all duration-200 hover:border-amber-300/60 hover:bg-amber-50 hover:text-amber-900"
            onClick={(event) => {
                if (!item.href) event.preventDefault();
                setActiveItem(item.label);
                setOpenMenu(null);
            }}
        >
            <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 rounded-r bg-gradient-to-b from-amber-400 to-orange-400 transition-transform duration-200 group-hover:scale-y-100" />
            <span className="pl-1.5">{item.label}</span>
            {item.newTab && <ExternalLink className="h-3 w-3 shrink-0 opacity-50" />}
        </a>
    );

    return (
        <>
            <style>{scrollbarStyles}</style>

            <header
                ref={navRef}
                className={[
                    "sticky top-0 z-[100] w-full text-slate-900 transition-all duration-300",
                    isScrolled
                        ? "bg-[#fffdf8]/95 shadow-[0_8px_32px_rgba(138,101,11,0.10)] backdrop-blur-2xl"
                        : "bg-[#fffdf8]/90 backdrop-blur-xl",
                ].join(" ")}
                style={{
                    backgroundImage:
                        "radial-gradient(ellipse at top left, rgba(245,208,120,0.22), transparent 40%), linear-gradient(180deg, rgba(255,253,248,0.98), rgba(250,244,232,0.96))",
                }}
            >
                {/* Top shimmer line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

                <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">

                    {/* ══ ROW 1: Logo + plain nav links + utility ══ */}
                    <div className="hidden lg:flex items-center justify-between gap-6 border-b border-amber-100/70 py-3">

                        {/* Logo */}
                        <a
                            href="#"
                            className="relative flex h-[80px] min-w-[300px] shrink-0 items-center overflow-visible transition-opacity duration-300 hover:opacity-75"
                            onClick={(e) => { e.preventDefault(); setActiveItem("vedastraa-brand"); }}
                        >
                            <img
                                src="/logo-removebg.png"
                                alt="Vedastraa Logo"
                                className="absolute left-0 top-1/2 z-10 h-[120px] w-auto -translate-y-1/2 object-contain"
                            />
                        </a>

                        {/* Row 1 centre: plain (non-dropdown) links */}
                        <nav className="flex items-center gap-0.5 flex-1 justify-center">
                            <button type="button" className={navLinkClass(activeItem === "free-kundli")} onClick={() => { setActiveItem("free-kundli"); setOpenMenu(null); }}>Free Kundli</button>
                            <button type="button" className={navLinkClass(activeItem === "kundli-matching")} onClick={() => { setActiveItem("kundli-matching"); setOpenMenu(null); }}>Kundli Matching</button>
                            <button type="button" className={navLinkClass(activeItem === "compatibility")} onClick={() => { setActiveItem("compatibility"); setOpenMenu(null); }}>Compatibility</button>
                            <button type="button" className={navLinkClass(activeItem === "chat-with-astrologer")} onClick={() => { setActiveItem("chat-with-astrologer"); setOpenMenu(null); }}>Chat with Astrologer</button>
                            <button type="button" className={navLinkClass(activeItem === "talk-to-astrologer")} onClick={() => { setActiveItem("talk-to-astrologer"); setOpenMenu(null); }}>Talk to Astrologer</button>
                            <button type="button" className={navLinkClass(activeItem === "VedasMall")} onClick={() => { setActiveItem("VedasMall"); setOpenMenu(null); }}>VedasMall</button>
                            <a
                                href="https://vedastraa.com/store"
                                className={navLinkClass(activeItem === "vedastraa-store")}
                                target="_blank" rel="noreferrer"
                                onClick={() => setActiveItem("vedastraa-store")}
                            >
                                Vedastraa Store <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                            </a>
                        </nav>

                        {/* Row 1 right: Language + Login */}
                        <div className="flex items-center gap-3 shrink-0">
                            {/* Language dropdown */}
                            <div className="relative" onMouseEnter={() => openMenuDelayed("language")} onMouseLeave={() => closeMenuDelayed("language")}>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-white/80 px-3.5 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                                    aria-expanded={openMenu === "language"}
                                    onClick={() => toggleMenu("language")}
                                >
                                    <Globe className="h-4 w-4 text-amber-500" />
                                    Eng
                                    <ChevronDown className={["h-3.5 w-3.5 text-amber-500 transition-transform duration-300", openMenu === "language" ? "rotate-180" : ""].join(" ")} />
                                </button>
                                <div className={[panelBaseClass, "right-0 left-auto w-36 p-1.5", openMenu === "language" ? "pointer-events-auto translate-y-0 opacity-100 scale-y-100" : "pointer-events-none -translate-y-1 opacity-0 scale-y-95"].join(" ")}>
                                    {[{ label: "हिंदी" }, { label: "ಕನ್ನಡ" }].map((item) => (
                                        <button key={item.label} type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-amber-50 hover:text-amber-900" onClick={() => { setActiveItem(item.label); setOpenMenu(null); }}>
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(217,119,6,0.35)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(217,119,6,0.45)] hover:scale-[1.03]"
                                onClick={() => { setActiveItem("login"); setOpenMenu(null); }}
                            >
                                <UserRound className="h-4 w-4" /> Login
                            </button>
                        </div>
                    </div>

                    {/* ══ ROW 2: Dropdown links only ══ */}
                    <div className="hidden lg:flex items-center gap-1 py-2">

                        {/* Calculators */}
                        <div className="relative" onMouseEnter={() => openMenuDelayed("calculators")} onMouseLeave={() => closeMenuDelayed("calculators")}>
                            <button type="button" className={navLinkClass(openMenu === "calculators")} aria-expanded={openMenu === "calculators"} onClick={() => toggleMenu("calculators")}>
                                Calculators
                                <ChevronDown className={["h-3.5 w-3.5 transition-transform duration-300", openMenu === "calculators" ? "rotate-180" : ""].join(" ")} />
                            </button>
                            <div className={[panelBaseClass, "left-0 w-[380px] max-h-[72vh] overflow-hidden p-4", openMenu === "calculators" ? "pointer-events-auto translate-y-0 opacity-100 scale-y-100" : "pointer-events-none -translate-y-1 opacity-0 scale-y-95"].join(" ")}>
                                <p className="mb-3 text-xs font-medium text-amber-600 uppercase tracking-wider">Calculators</p>
                                <div className="vedas-scroll max-h-[65vh] overflow-y-auto pr-1 grid gap-1.5">
                                    {calculatorItems.map(renderDropdownItem)}
                                </div>
                            </div>
                        </div>

                        {/* Horoscopes */}
                        <div className="relative" onMouseEnter={() => openMenuDelayed("horoscopes")} onMouseLeave={() => closeMenuDelayed("horoscopes")}>
                            <button type="button" className={navLinkClass(openMenu === "horoscopes")} aria-expanded={openMenu === "horoscopes"} onClick={() => toggleMenu("horoscopes")}>
                                Horoscopes
                                <ChevronDown className={["h-3.5 w-3.5 transition-transform duration-300", openMenu === "horoscopes" ? "rotate-180" : ""].join(" ")} />
                            </button>
                            <div className={[panelBaseClass, "left-0 w-[280px] p-4", openMenu === "horoscopes" ? "pointer-events-auto translate-y-0 opacity-100 scale-y-100" : "pointer-events-none -translate-y-1 opacity-0 scale-y-95"].join(" ")}>
                                <p className="mb-3 text-xs font-medium text-amber-600 uppercase tracking-wider">Horoscopes</p>
                                <div className="grid gap-1.5">{horoscopeItems.map(renderDropdownItem)}</div>
                            </div>
                        </div>

                        {/* Blogs */}
                        <div className="relative" onMouseEnter={() => openMenuDelayed("blogs")} onMouseLeave={() => closeMenuDelayed("blogs")}>
                            <button type="button" className={navLinkClass(openMenu === "blogs")} aria-expanded={openMenu === "blogs"} onClick={() => toggleMenu("blogs")}>
                                Blogs
                                <ChevronDown className={["h-3.5 w-3.5 transition-transform duration-300", openMenu === "blogs" ? "rotate-180" : ""].join(" ")} />
                            </button>
                            <div className={[panelBaseClass, "left-0 w-60 p-3", openMenu === "blogs" ? "pointer-events-auto translate-y-0 opacity-100 scale-y-100" : "pointer-events-none -translate-y-1 opacity-0 scale-y-95"].join(" ")}>
                                <p className="mb-3 text-xs font-medium text-amber-600 uppercase tracking-wider">Blogs</p>
                                <div className="grid gap-1.5">
                                    <a href="#" className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-amber-100/80 bg-white px-4 py-2.5 text-sm text-slate-700 transition-all duration-200 hover:border-amber-300/60 hover:bg-amber-50 hover:text-amber-900"
                                        onClick={(e) => { e.preventDefault(); setActiveItem("angel-numbers"); setOpenMenu(null); }}>
                                        <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 rounded-r bg-gradient-to-b from-amber-400 to-orange-400 transition-transform duration-200 group-hover:scale-y-100" />
                                        <span className="pl-1.5">Angel Numbers</span>
                                    </a>
                                    <a href="https://vedastraa.com/blogs" target="_blank" rel="noreferrer"
                                        className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-amber-100/80 bg-white px-4 py-2.5 text-sm text-slate-700 transition-all duration-200 hover:border-amber-300/60 hover:bg-amber-50 hover:text-amber-900"
                                        onClick={() => { setActiveItem("all-blogs"); setOpenMenu(null); }}>
                                        <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 rounded-r bg-gradient-to-b from-amber-400 to-orange-400 transition-transform duration-200 group-hover:scale-y-100" />
                                        <span className="pl-1.5">All Blogs</span>
                                        <ExternalLink className="h-3 w-3 opacity-50" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Tagline */}
                        <div className="ml-auto flex items-center gap-2 text-xs text-amber-600/60 italic tracking-wide select-none">
                            <span className="hidden xl:inline">Astrology • Guidance • Destiny</span>
                        </div>
                    </div>

                    {/* ══ MOBILE ROW ══ */}
                    <div className="flex lg:hidden items-center justify-between py-3">
                        <a
                            href="#"
                            className="relative flex h-[60px] min-w-[90px] items-center overflow-visible transition-opacity duration-300 hover:opacity-75"
                            onClick={(e) => { e.preventDefault(); setActiveItem("vedastraa-brand"); }}
                        >
                            <img
                                src="/logo-removebg.png"
                                alt="Vedastraa Logo"
                                className="absolute left-0 top-1/2 z-10 h-[90px] w-auto -translate-y-1/2 object-contain"
                            />
                        </a>

                        <div className="flex items-center gap-2">
                            <button type="button"
                                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3.5 py-2 text-xs font-semibold text-white shadow-md"
                                onClick={() => setActiveItem("login")}
                            >
                                <UserRound className="h-3.5 w-3.5" /> Login
                            </button>
                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md border border-amber-200/80"
                                onClick={() => setIsMobileOpen((v) => !v)}
                                aria-label="Toggle menu"
                                aria-expanded={isMobileOpen}
                            >
                                {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                </div>
            </header>

            {/* ── MOBILE DRAWER OVERLAY ── */}
            <div
                className={["fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden", isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"].join(" ")}
                onClick={closeMobile}
            />

            <div
                className={[
                    "fixed top-0 right-0 z-[300] h-full w-[85vw] max-w-[340px] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden overflow-y-auto",
                    isMobileOpen ? "translate-x-0" : "translate-x-full",
                ].join(" ")}
                style={{ background: "linear-gradient(160deg, #fffdf8 0%, #fdf6e8 100%)" }}
            >
                <div className="flex items-center justify-between border-b border-amber-200/60 px-5 py-4">
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-amber-600">Menu</span>
                    <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-slate-600 hover:bg-amber-200 transition-colors" onClick={closeMobile}>
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="border-b border-amber-100/60">
                    {[
                        { label: "Free Kundli", key: "free-kundli" },
                        { label: "Kundli Matching", key: "kundli-matching" },
                        { label: "Compatibility", key: "compatibility" },
                        { label: "Chat with Astrologer", key: "chat-with-astrologer" },
                        { label: "Talk to Astrologer", key: "talk-to-astrologer" },
                        { label: "VedasMall", key: "VedasMall" },
                    ].map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            className={["flex w-full items-center px-5 py-3.5 text-sm font-medium border-b border-amber-100/40 last:border-0 transition-colors", activeItem === item.key ? "text-amber-700 bg-amber-50" : "text-slate-700 hover:bg-amber-50/60 hover:text-amber-700"].join(" ")}
                            onClick={() => { setActiveItem(item.key); closeMobile(); }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <MobileAccordion label="Calculators">
                    <MobileList items={calculatorItems} onClose={closeMobile} />
                </MobileAccordion>

                <MobileAccordion label="Horoscopes">
                    <MobileList items={horoscopeItems} onClose={closeMobile} />
                </MobileAccordion>

                <MobileAccordion label="Blogs">
                    <div className="rounded-xl border border-amber-100 bg-amber-50/60 overflow-hidden">
                        <a href="#" className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-amber-100 border-b border-amber-100/60"
                            onClick={(e) => { e.preventDefault(); setActiveItem("angel-numbers"); closeMobile(); }}>Angel Numbers</a>
                        <a href="https://vedastraa.com/blogs" target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-amber-100" onClick={closeMobile}>
                            All Blogs <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                        </a>
                    </div>
                </MobileAccordion>

                <div className="p-4 space-y-3 border-t border-amber-100/60 mt-2">
                    <div className="rounded-xl border border-amber-100 bg-white overflow-hidden">
                        <div className="px-4 py-2 text-[0.6rem] uppercase tracking-widest text-amber-600 font-semibold border-b border-amber-100">Language</div>
                        {[{ label: "English" }, { label: "हिंदी" }, { label: "ಕನ್ನಡ" }].map((item) => (
                            <button key={item.label} type="button" className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-amber-50 border-b border-amber-100/60 last:border-0" onClick={() => { setActiveItem(item.label); closeMobile(); }}>
                                <Globe className="h-4 w-4 text-amber-500" /> {item.label}
                            </button>
                        ))}
                    </div>
                    <a href="https://vedastraa.com/store" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-amber-50" onClick={closeMobile}>
                        Vedastraa Store <ExternalLink className="h-4 w-4 opacity-60" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default Navbar;