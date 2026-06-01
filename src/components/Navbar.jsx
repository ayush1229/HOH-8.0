import { useEffect, useState } from "react";
import logo from "../assets/logo.webp";

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
    <header className="sticky top-0 z-20 w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 text-xl font-semibold tracking-wide text-white">
          <img src={logo} alt="HOH 8.0 Logo" className="h-10 w-10 object-contain" />
          <span>HOH 8.0</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-white/85 transition hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

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

      {openNav && (
        <nav className="border-t border-white/10 px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-base text-white/85 hover:text-white">
                {item}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
