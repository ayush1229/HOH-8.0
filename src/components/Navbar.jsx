import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.webp";

const HACKATHON_SLUG = "YOUR-HACKATHON-SLUG";

function DevfolioButton() {
  const sdkRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkRendered, setSdkRendered] = useState(false);

  // Load the Devfolio SDK script dynamically (React-recommended approach)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Give the SDK a moment to inject its iframe/button after loading
  useEffect(() => {
    if (!sdkReady) return;
    const timer = setTimeout(() => {
      if (sdkRef.current && sdkRef.current.childElementCount > 0) {
        setSdkRendered(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [sdkReady]);

  return (
    <div className="relative flex items-center" style={{ height: 44, minWidth: 312 }}>
      {/* Actual Devfolio SDK target div — hidden until SDK confirms it rendered */}
      <div
        ref={sdkRef}
        className="apply-button"
        data-hackathon-slug={HACKATHON_SLUG}
        data-button-theme="light"
        style={{ height: 44, width: 312, display: sdkRendered ? "block" : "none" }}
      />

      {/* Placeholder — hidden once SDK has rendered its button */}
      <a
        href="https://devfolio.co/hackathons"
        target="_blank"
        rel="noopener noreferrer"
        style={{ height: 44, width: 312, whiteSpace: "nowrap", display: sdkRendered ? "none" : "flex" }}
        className="devfolio-placeholder items-center justify-center gap-2 rounded-lg font-semibold text-sm select-none"
      >
        <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#3770FF"/>
          <path d="M11 14h7.5C22.09 14 25 16.91 25 20.5S22.09 27 18.5 27H11V14zm4 9.5h3.5c1.93 0 3.5-1.57 3.5-3.5S20.43 17 18.5 17H15v6.5z" fill="white"/>
        </svg>
        Apply with Devfolio
      </a>

      <style>{`
        .devfolio-placeholder {
          background: #ffffff;
          color: #3770FF;
          border: 2px solid #3770FF;
          transition: background 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 2px 12px rgba(55,112,255,0.18);
          letter-spacing: 0.01em;
        }
        .devfolio-placeholder:hover {
          background: #3770FF;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(55,112,255,0.38);
        }
        .devfolio-placeholder:hover svg rect { fill: #ffffff; }
        .devfolio-placeholder:hover svg path { fill: #3770FF; }
      `}</style>
    </div>
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

  const navItems = ["About", "Prize", "Sponsors", "FAQ", "Contact", "Team"];

  return (
    <header className="fixed left-0 top-0 z-40 w-full border-b border-white/15 bg-black/35 backdrop-blur-lg">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 text-xl font-semibold tracking-wide text-white">
          <img src={logo} alt="HOH 8.0 Logo" className="h-10 w-10 object-contain" />
          <span>HOH 8.0</span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a key={item} href="#" className="text-base text-white/85 transition hover:text-white">
              {item}
            </a>
          ))}
        </nav>

        {/* Apply button — rendered ONCE here, hidden on mobile via CSS */}
        <div className="hidden lg:flex items-center shrink-0">
          <DevfolioButton />
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setOpenNav((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {openNav ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer — plain styled link, NOT a second DevfolioButton */}
      {openNav && (
        <nav className="border-t border-white/10 px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-base text-white/85 hover:text-white">
                {item}
              </a>
            ))}
            <a
              href="https://devfolio.co/hackathons"
              target="_blank"
              rel="noopener noreferrer"
              className="devfolio-placeholder mt-1 flex items-center justify-center gap-2 rounded-lg font-semibold text-sm select-none"
              style={{ height: 44, whiteSpace: "nowrap" }}
            >
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#3770FF"/>
                <path d="M11 14h7.5C22.09 14 25 16.91 25 20.5S22.09 27 18.5 27H11V14zm4 9.5h3.5c1.93 0 3.5-1.57 3.5-3.5S20.43 17 18.5 17H15v6.5z" fill="white"/>
              </svg>
              Apply with Devfolio
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
