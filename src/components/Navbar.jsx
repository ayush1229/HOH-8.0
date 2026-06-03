import { useEffect, useState } from "react";
import logo from "../assets/logo.webp";

const HACKATHON_SLUG = "hackonhills8";

export function DevfolioButton() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://apply.devfolio.co/v2/sdk.js"]')) {
      const script = document.createElement("script");
      script.src = "https://apply.devfolio.co/v2/sdk.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

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
    <header
      className="fixed top-5 left-1/2 z-50"
      style={{ transform: "translateX(-50%)", fontFamily: "'SpaceGrotesk', sans-serif", whiteSpace: "nowrap" }}
    >
      {/* Pill navbar */}
      <div
        className="flex items-center gap-5 px-5 py-2.5 rounded-full"
        style={{
          background: "rgba(10,10,10,0.88)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
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

        {/* Register button */}
        <div className="hidden lg:block shrink-0">
          <DevfolioButton />
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-full p-1.5 text-white/70 hover:bg-white/10 lg:hidden"
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

      {/* Mobile drawer */}
      {openNav && (
        <div
          className="mt-2 rounded-2xl px-5 py-4 lg:hidden"
          style={{
            background: "rgba(10,10,10,0.95)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/70 hover:text-white transition-colors"
                onClick={() => setOpenNav(false)}
              >
                {item}
              </a>
            ))}
            <div className="mt-2 flex justify-center" onClick={() => setOpenNav(false)}>
              <DevfolioButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
