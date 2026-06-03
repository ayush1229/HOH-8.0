import React, { useEffect, useState } from "react";
import { StickyNavbar, DevfolioButton } from "./components/Navbar";
import Footer from "./components/Footer";
import TextType from "./components/TypeText";
import Timeline from "./components/Timeline";
import PrizePool from "./components/PrizePool";
import AgentUniverse from "./components/AgentUniverse";
import FloatingAgents from "./components/FloatingAgents";
import sponsorsData from "./data/sponsors.json";
import faqData from "./data/faq.json";

/* ── Config ─────────────────────────────────────────────────────── */
const AU_WORDS = [
  "AUTONOMOUS", "AGENTS", "REASONING", "MULTI-AGENT",
  "RAG", "TOOLS", "PLANNING", "MEMORY", "NEURAL",
];

const ABOUT_CARDS = [
  { title: "Innovation",    desc: "Pushing the boundaries of autonomous systems. Explore new paradigms in agent architecture, multi-agent collaboration, and decentralized intelligence." },
  { title: "Creativity",    desc: "Transforming ambitious ideas into impactful solutions that redefine possibility." },
  { title: "Collaboration", desc: "Building the future together with diverse skills, perspectives, and shared vision." },
  { title: "Future Impact", desc: "Creating solutions that drive meaningful change in the real world — systems that persist, adapt, and evolve beyond the hackathon." },
];

const gradientClass = "bg-gradient-to-r from-[#00e5ff] from-0% via-[#00e5ff] via-60% to-white to-100% bg-clip-text text-transparent inline-block";

/* ── Sub-components ─────────────────────────────────────────────── */
function CodeChip({ children, style }) {
  return (
    <div
      className="absolute hidden lg:block font-mono text-xs px-3 py-2 rounded-lg transition-all duration-300 hover:scale-110 cursor-default"
      style={{ background: "rgba(10,10,10,0.75)", border: "1px solid rgba(255,255,255,0.08)", zIndex: 5, ...style }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-px bg-[#00e5ff]" />
      <span className={`text-[10px] font-semibold uppercase tracking-[0.28em] text-[#00e5ff]`}>
        {children}
      </span>
    </div>
  );
}

function CenteredLabel({ children }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="w-6 h-px bg-[#00e5ff]" />
      <span className={`text-[10px] font-semibold uppercase tracking-[0.28em] text-[#00e5ff]`}>
        {children}
      </span>
    </div>
  );
}

/* ── Main App ───────────────────────────────────────────────────── */
function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const containerRef = React.useRef();

  useEffect(() => {
    const scroller = document.querySelector("main");
    const els = document.querySelectorAll("[data-fade]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { root: scroller, threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const faqs = faqData?.faqSection?.faqs ?? [];
  const sponsorsCategories = sponsorsData?.sponsorsSection?.categories ?? [];

  return (
    <div ref={containerRef} className="relative h-screen w-screen overflow-hidden max-w-[100vw]"
      style={{ backgroundColor: "transparent", fontFamily: "'SpaceGrotesk', sans-serif" }}>

      {/* 3-D Background */}
      <AgentUniverse eventSource={containerRef} density={150} textDensity={200} speed={0.5} mouseStrength={0.5} color="#00e5ff" words={AU_WORDS} />

      {/* Navbar */}
      <div className="relative z-50"><StickyNavbar /></div>

      <main className="relative z-10 h-screen overflow-y-auto scroll-smooth no-scrollbar"
        style={{ fontFamily: "'SpaceGrotesk', sans-serif" }}>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section id="home" className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden">
          <FloatingAgents mouseStrength={10} />
          <CodeChip style={{ top: "46%", left: "6%", color: "#00e5ff" }}>agent.execute(task)</CodeChip>
          <CodeChip style={{ top: "40%", right: "6%", color: "rgba(0,229,255,0.55)" }}>agent_exec(task)</CodeChip>

          <div className="relative flex flex-col items-center max-w-3xl mx-auto" style={{ zIndex: 6 }}>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#00e5ff]">
              HACK ON HILLS 8.0
            </p>
            <TextType
              text={["The Age of Autonomous Agents", "The Future of Decentralized Intelligence", "Build Beyond Boundaries"]}
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
              textColors={["#00e5ff", "#00e5ff", "#00e5ff"]}
              showCursor typingSpeed={42} pauseDuration={2200} deletingSpeed={28}
            />
            <p className="mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-white/50">
              A 48-hour innovation experience where builders create autonomous systems,
              intelligent agents, and the future of human-AI collaboration.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <div className="flex items-center justify-center">
                <DevfolioButton />
              </div>
              <a href="#prizes" className="px-8 py-3.5 rounded-full text-sm font-bold border text-white hover:border-white/60 transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.28)" }}>View Tracks</a>
            </div>
          </div>
        </section>

        {/* ── ABOUT ─────────────────────────────────────────────── */}
        <section id="about" data-fade className="py-24 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-[1100px]">
            <SectionLabel>ABOUT</SectionLabel>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-5 ${gradientClass}`}>
              The Genesis of Autonomy
            </h2>
            <p className="text-sm sm:text-base text-white/45 mb-16 max-w-xl leading-relaxed">
              Where ambitious ideas converge with cutting-edge technology to shape the autonomous future.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <style>{`
                @keyframes particleDrift {
                  0% { transform: translateY(0) translateX(0); opacity: 0; }
                  50% { transform: translateY(-15px) translateX(10px); opacity: 0.8; }
                  100% { transform: translateY(-30px) translateX(-5px); opacity: 0; }
                }
                .particle {
                  position: absolute;
                  background: #00e5ff;
                  border-radius: 50%;
                  box-shadow: 0 0 8px 1px #00e5ff;
                }
              `}</style>
              {ABOUT_CARDS.map((card, i) => {
                const colSpanClass =
                  i === 0 ? "md:col-span-2" :
                  i === 1 ? "md:col-span-1" :
                  i === 2 ? "md:col-span-1" : "md:col-span-2";
                  
                return (
                  <div key={i} data-fade-step 
                    className={`group relative rounded-2xl p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00e5ff]/40 hover:shadow-[0_10px_40px_-10px_rgba(0,229,255,0.15)] overflow-hidden backdrop-blur-md ${colSpanClass}`}
                    style={{ transitionDelay: `${i * 0.12}s`, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    
                    {/* Hover Particles */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="particle w-1 h-1 top-[80%] left-[20%]" style={{ animation: 'particleDrift 4s ease-in-out infinite' }} />
                      <div className="particle w-1.5 h-1.5 top-[70%] left-[80%]" style={{ animation: 'particleDrift 5s ease-in-out 1s infinite' }} />
                      <div className="particle w-[3px] h-[3px] top-[90%] left-[50%]" style={{ animation: 'particleDrift 3.5s ease-in-out 2s infinite' }} />
                      <div className="particle w-1 h-1 top-[60%] left-[10%]" style={{ animation: 'particleDrift 6s ease-in-out 0.5s infinite' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00e5ff]/[0.03] to-transparent" />
                    </div>

                    <div className="relative z-10">
                      <div className="w-6 h-[2px] mb-6 bg-[#00e5ff] transition-all duration-300 group-hover:w-10 group-hover:shadow-[0_0_8px_#00e5ff]" />
                      <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-[#00e5ff]">{card.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ──────────────────────────────────────────── */}
        <section id="timeline" data-fade className="px-4 sm:px-6 lg:px-10">
          <Timeline />
        </section>

        {/* ── PRIZES ────────────────────────────────────────────── */}
        <PrizePool />

        {/* ── SPONSORS ──────────────────────────────────────────── */}
        <section id="sponsors" data-fade className="py-24 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1100px] flex flex-col items-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#00e5ff] mb-6">
              HACK ON HILLS 7.0
            </p>
            <CenteredLabel>PARTNERS</CenteredLabel>
            <h2 className="text-center text-4xl sm:text-5xl font-bold text-white mb-4">
              Backed by the <span className={gradientClass}>Best</span>
            </h2>
            <p className="text-center text-sm text-white/40 mb-16 max-w-md mx-auto leading-relaxed">
              Industry leaders powering the next generation of builders.
            </p>
            <div className="flex flex-col items-center gap-12 w-full mt-8">
              {sponsorsCategories.map((category, catIdx) => (
                <div key={catIdx} className="flex flex-col items-center w-full">
                  <h3 className="text-xl font-semibold text-white/80 mb-6 tracking-widest">{category.tier}</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {(category.sponsors ?? []).map((s, i) => {
                      const El = s.link ? "a" : "div";
                      return (
                        <El key={i} href={s.link || undefined} target={s.link ? "_blank" : undefined}
                          rel={s.link ? "noopener noreferrer" : undefined}
                          className="flex items-center justify-center p-6 transition-all duration-200 hover:-translate-y-1"
                          style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, width: 220, minHeight: 110, cursor: s.link ? "pointer" : "default" }}
                          onMouseEnter={(e) => { if (s.link) e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)"; }}
                          onMouseLeave={(e) => { if (s.link) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                          <img src={s.image || s.logo} alt={s.alt || s.name} className="max-h-14 md:max-h-18 max-w-[200px] object-contain" />
                        </El>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section id="faq" data-fade className="py-24 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[820px]">
            <CenteredLabel>FAQ</CenteredLabel>
            <h2 className={`text-center text-4xl sm:text-5xl font-bold mb-4 ${gradientClass}`}>
              Frequently Asked Questions
            </h2>
            <p className="text-center text-sm text-white/40 mb-14 leading-relaxed">
              Get all the answers you need about HOH 8.0.
            </p>

            {/* First Q — full width */}
            {faqs[0] && (
              <FaqItem faq={faqs[0]} idx={0} openFaq={openFaq} setOpenFaq={setOpenFaq} />
            )}

            {/* Rest — 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {faqs.slice(1).map((faq, i) => (
                <FaqItem key={i + 1} faq={faq} idx={i + 1} openFaq={openFaq} setOpenFaq={setOpenFaq} />
              ))}
            </div>

            {/* Contact CTA */}
            <div id="contact" className="mt-20 text-center border-t pt-16" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <h3 className="text-xl font-semibold text-white mb-3">Still have queries?</h3>
              <p className="text-sm text-white/40 max-w-xs mx-auto leading-relaxed mb-8">
                Connect directly with our core maintainers via community channels for real-time assistance.
              </p>
              <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer"
                className="inline-flex px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] border text-white hover:border-white/60 transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}>
                JOIN DISCORD
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <Footer />

      </main>
    </div>
  );
}

/* ── FAQ accordion item ─────────────────────────────────────────── */
function FaqItem({ faq, idx, openFaq, setOpenFaq }) {
  const isOpen = openFaq === idx;
  return (
    <div className="border-t cursor-pointer select-none" style={{ borderColor: "rgba(255,255,255,0.1)" }}
      onClick={() => setOpenFaq(isOpen ? null : idx)}>
      <div className="flex items-center justify-between py-5 gap-6">
        <h3 className="text-sm font-semibold text-white leading-snug">{faq.question}</h3>
        <span className="text-xl text-white/35 shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
      </div>
      {isOpen && (
        <p className="pb-6 text-sm text-white/40 leading-relaxed">{faq.answer}</p>
      )}
    </div>
  );
}

export default App;
