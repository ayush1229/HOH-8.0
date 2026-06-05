import { useEffect, useState } from "react";
import logo from "../assets/logo.webp";

const HACKATHON_SLUG = "hackonhills8";

// SDK is loaded globally in index.html — no dynamic injection needed
export function DevfolioButton() {
  return (
    <div
      className="apply-button"
      data-hackathon-slug={HACKATHON_SLUG}
      data-button-theme="light"
      style={{ height: 44, width: 312 }}
    />
  );
}

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navItems = ["Home", "About", "Timeline", "Prizes", "Sponsors", "FAQ"];

  return (
    /* On mobile: full-width, no translateX — eliminates horizontal overflow entirely.
       On desktop: shrink to pill with left-1/2 + translateX(-50%). */
    <header
      className="fixed top-0 left-0 right-0 lg:top-5 lg:left-1/2 lg:right-auto z-50 px-3 lg:px-0"
      style={{
        fontFamily: "'SpaceGrotesk', sans-serif",
      }}
    >
      {/* On desktop: apply the centering transform */}
      <div className="lg:transform lg:-translate-x-1/2">

        {/* Pill navbar */}
        <div
          className="flex items-center gap-5 px-5 py-2.5 rounded-full mt-3 lg:mt-0"
          style={{
            background: "rgba(10,10,10,0.55)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            whiteSpace: "nowrap",
          }}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 text-sm font-semibold text-white shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] shrink-0" />
            <img src={logo} alt="HOH 8.0" className="h-5 w-5 object-contain" />
            <span>HOH 8.0</span>
          </a>

          {/* Divider */}
          <div className="w-px h-4 bg-white/15 hidden lg:block shrink-0" />

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/60 transition-colors duration-150 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop Devfolio button */}
          <div className="hidden lg:block shrink-0">
            <DevfolioButton />
          </div>

          {/* Spacer so hamburger is pushed to right on mobile */}
          <div className="flex-1 lg:hidden" />

          {/* Mobile hamburger */}
          <button
            className="inline-flex items-center justify-center rounded-full p-1.5 text-white/70 hover:bg-white/10 lg:hidden shrink-0"
            onClick={() => setOpenNav((v) => !v)}
            aria-label="Toggle navigation"
          >
            {openNav ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile drawer — full width of header, no overflow */}
        {openNav && (
          <div
            className="mt-2 rounded-2xl lg:hidden overflow-hidden"
            style={{
              background: "rgba(8,8,10,0.55)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              minHeight: "52vh",
            }}
          >
            <div className="flex flex-col px-6 py-8 gap-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-2xl font-semibold text-white/70 hover:text-white transition-colors duration-150 py-3 border-b border-white/5 last:border-0"
                  onClick={() => setOpenNav(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
