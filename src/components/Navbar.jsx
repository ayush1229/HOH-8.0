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
    <>
      <style>{`
        @keyframes drawerSlideDown {
          from { opacity: 0; transform: translateY(-16px) scaleY(0.92); }
          to   { opacity: 1; transform: translateY(0)     scaleY(1);    }
        }
        @keyframes navItemFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        .drawer-enter {
          animation: drawerSlideDown 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: top center;
        }
        .nav-item-animate {
          opacity: 0;
          animation: navItemFadeIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Full-width on mobile, pill-centred on desktop */}
      <header
        className="fixed top-0 left-0 right-0 lg:top-5 lg:left-1/2 lg:right-auto z-50 px-3 lg:px-0 flex justify-center pointer-events-none"
        style={{ fontFamily: "'SpaceGrotesk', sans-serif" }}
      >
        {/* Centering wrapper for desktop */}
        <div className="lg:-translate-x-1/2 w-full lg:w-auto pointer-events-auto">

          {/* ── Pill bar ── */}
          <div
            className="flex items-center gap-4 px-5 py-2.5 rounded-full mt-3 lg:mt-0 mx-auto"
            style={{
              background: "rgba(10,10,10,0.45)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              whiteSpace: "nowrap",
              width: "fit-content",
            }}
          >
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 text-sm font-semibold text-white shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] shrink-0" />
              <img src={logo} alt="HOH 8.0" className="h-5 w-5 object-contain" />
              <span>HOH 8.0</span>
            </a>

            {/* Desktop: divider + nav links (no Devfolio button) */}
            <div className="w-px h-4 bg-white/15 hidden lg:block shrink-0" />
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

            {/* Spacer + hamburger for mobile */}
            <div className="flex-1 lg:hidden min-w-[20px]" />
            <button
              className="inline-flex items-center justify-center rounded-full p-1.5 text-white/70 hover:bg-white/10 lg:hidden shrink-0 transition-colors"
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

          {/* ── Mobile drawer ── */}
          {openNav && (
            <div
              className="drawer-enter mt-2 rounded-2xl lg:hidden overflow-hidden mx-auto"
              style={{
                background: "rgba(8,8,10,0.45)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(36px)",
                WebkitBackdropFilter: "blur(36px)",
                minHeight: "52vh",
                width: "fit-content",
                minWidth: "250px",
              }}
            >
              <div className="flex flex-col px-6 py-8 gap-1">
                {navItems.map((item, i) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="nav-item-animate text-2xl font-semibold text-white/70 hover:text-white transition-colors duration-150 py-3 border-b border-white/5 last:border-0"
                    style={{ animationDelay: `${0.06 + i * 0.07}s` }}
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
    </>
  );
}
