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

const gradientClass = "bg-gradient-to-r from-[#6366f1] from-0% via-[#6366f1] via-60% to-white to-100% bg-clip-text text-transparent inline-block";

/* ── Sub-components ─────────────────────────────────────────────── */
function CodeChip({ children, style }) {
  return (
    <div
      className="absolute hidden lg:block font-mono text-xs px-3 py-2 rounded-lg transition-all duration-300 hover:scale-110 cursor-default border border-white/10"
      style={{ background: "rgba(10,10,10,0.75)", zIndex: 5, ...style }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono mb-8 rounded-full">
      // {children}
    </div>
  );
}

function CenteredLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono mb-8 rounded-full">
      // {children}
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const targetDate = new Date("2026-10-02T00:00:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-5 max-w-xl mx-auto reveal active mt-10" style={{ transitionDelay: '0.5s' }}>
        <div className="bg-white/5 backdrop-blur-lg border border-white/5 p-5 rounded-2xl">
            <div className="font-mono text-3xl md:text-4xl font-bold text-white">{timeLeft.days}</div>
            <div className="text-xs text-zinc-400 mt-2 uppercase font-mono">Days</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/5 p-5 rounded-2xl">
            <div className="font-mono text-3xl md:text-4xl font-bold text-white">{timeLeft.hours}</div>
            <div className="text-xs text-zinc-400 mt-2 uppercase font-mono">Hours</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/5 p-5 rounded-2xl">
            <div className="font-mono text-3xl md:text-4xl font-bold text-white">{timeLeft.minutes}</div>
            <div className="text-xs text-zinc-400 mt-2 uppercase font-mono">Mins</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/5 p-5 rounded-2xl">
            <div className="font-mono text-3xl md:text-4xl font-bold text-white">{timeLeft.seconds}</div>
            <div className="text-xs text-zinc-400 mt-2 uppercase font-mono">Secs</div>
        </div>
    </div>
  );
}

/* ── Main App ───────────────────────────────────────────────────── */
function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const containerRef = React.useRef();

  useEffect(() => {
    const scroller = document.querySelector("main");
    const els = document.querySelectorAll("[data-fade], .reveal, .stagger");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          e.target.classList.add("active");
        }
      }),
      { root: scroller, threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const faqs = faqData?.faqSection?.faqs ?? [];
  const sponsorsCategories = sponsorsData?.sponsorsSection?.categories ?? [];

  return (
    <div ref={containerRef} className="relative h-screen w-screen overflow-hidden max-w-[100vw]"
      style={{ backgroundColor: "transparent", fontFamily: "'Inter', sans-serif" }}>

      {/* 3-D Background */}
      <AgentUniverse eventSource={containerRef} density={150} textDensity={200} speed={0.5} mouseStrength={0.5} color="#a0c0c0" words={AU_WORDS} />

      {/* Navbar */}
      <div className="relative z-50"><StickyNavbar /></div>

      <main className="relative z-10 h-screen overflow-y-auto scroll-smooth no-scrollbar noise"
        style={{ fontFamily: "'Inter', sans-serif" }}>

        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(2,2,4,0.08)", pointerEvents: "none", zIndex: 5 }}></div>
        <div className="scanlines"></div>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid-bg"></div>

          {/* Glow orbs */}
          <div className="glow-orb w-96 h-96 bg-indigo-900/30 top-20 -left-48" style={{ animationDelay: "0s" }}></div>
          <div className="glow-orb w-80 h-80 bg-purple-900/20 bottom-20 -right-40" style={{ animationDelay: "-3s" }}></div>
          <div className="glow-orb w-64 h-64 bg-blue-900/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: "-5s", opacity: 0.25 }}></div>

          <FloatingAgents mouseStrength={10} />
          
          <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                <div className="mb-8 reveal active">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-500 font-mono rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        AGENTS ONLINE // v8.0
                    </span>
                </div>

                <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter mb-8 reveal text-readable active" style={{ transitionDelay: '0.1s' }}>
                    <span className="block glow-text">HACK ON</span>
                    <span className="block text-zinc-500">HILLS <span className="text-white">8.0</span></span>
                </h1>

                <div className="h-10 mb-10 reveal active" style={{ transitionDelay: '0.2s' }}>
                    <TextType
                      text={["The Age of Autonomous Agents", "Where AI Acts, Not Just Assists", "Decentralized Intelligence"]}
                      className="text-xl md:text-2xl text-zinc-300 font-mono"
                      textColors={["#a0a0b8", "#a0a0b8", "#a0a0b8"]}
                      showCursor typingSpeed={42} pauseDuration={2200} deletingSpeed={28}
                    />
                </div>

                <p className="text-zinc-400 max-w-2xl mx-auto mb-14 text-lg reveal active" style={{ transitionDelay: '0.3s' }}>
                    Join the vanguard of decentralised intelligence. Build the future where AI does not just assist, it acts.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20 reveal active" style={{ transitionDelay: '0.4s' }}>
                    <a href="#register" className="btn-primary px-10 py-5 rounded-xl text-base font-semibold inline-flex items-center gap-3 font-mono magnetic">
                        <span>Register on Devfolio</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                    <a href="#tracks" className="btn-outline px-10 py-5 rounded-xl text-base font-semibold text-zinc-500 inline-flex items-center gap-3 font-mono magnetic">
                        <span>Explore Tracks</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </a>
                </div>

                <Countdown />

                <div className="mt-10 text-xs text-zinc-500 font-mono reveal active" style={{ transitionDelay: '0.6s' }}>
                    NIT HAMIRPUR // 48-HOUR HACKATHON // AGENTIC AI
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-xs text-zinc-500 font-mono">SCROLL</span>
                <div className="w-px h-12 bg-zinc-600 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-4 bg-white animate-pulse"></div>
                </div>
            </div>
        </section>

        <div className="divider"></div>

        {/* ── ABOUT ─────────────────────────────────────────────── */}
        <section id="about" className="py-40 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="reveal">
                        <SectionLabel>ABOUT</SectionLabel>

                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-10 font-display text-readable">
                            The Genesis<br/>
                            <span className="text-zinc-400">of Autonomy</span>
                        </h2>

                        <p className="text-zinc-500 text-xl leading-relaxed mb-8">
                            Hack on Hills 8.0 is the premier 48-hour hackathon focused on the future of decentralized intelligence and autonomous systems. It is an immersive environment where developers, designers, and visionaries converge to build solutions that define the <span className="text-white">'Age of Autonomous Agents'</span>.
                        </p>

                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/20"></div>
                            <span className="text-sm text-zinc-300 font-mono">48-HOUR HACKATHON // NIT HAMIRPUR</span>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <div className="font-mono text-4xl font-bold text-white mb-2">48H</div>
                                <div className="text-sm text-zinc-400 font-mono">OF PURE CODE</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <div className="font-mono text-4xl font-bold text-white mb-2">150K+</div>
                                <div className="text-sm text-zinc-400 font-mono">PRIZE POOL</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative reveal">
                        <div className="absolute -inset-10 bg-white/5 rounded-3xl blur-3xl"></div>
                        <div className="relative bg-zinc-900/70 border border-white/10 rounded-2xl p-10 backdrop-blur-xl">
                            <div className="font-mono text-sm text-zinc-400 mb-8">$ system.status --verbose</div>
                            <div className="space-y-4 font-mono text-sm">
                                <div className="flex items-center gap-4">
                                    <span className="text-green-500 font-bold">[OK]</span>
                                    <span className="text-zinc-400">Autonomous agents deployed</span>
                                    <span className="text-zinc-500 ml-auto">v2.4.1</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-green-500 font-bold">[OK]</span>
                                    <span className="text-zinc-400">Decentralized intelligence active</span>
                                    <span className="text-zinc-500 ml-auto">v1.8.0</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-green-500 font-bold">[OK]</span>
                                    <span className="text-zinc-400">Multi-agent orchestration ready</span>
                                    <span className="text-zinc-500 ml-auto">v3.0.2</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-green-500 font-bold">[OK]</span>
                                    <span className="text-zinc-400">Agentic frameworks loaded</span>
                                    <span className="text-zinc-500 ml-auto">v4.1.0</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-green-500 font-bold">[OK]</span>
                                    <span className="text-zinc-400">Collaboration protocols initialized</span>
                                    <span className="text-zinc-500 ml-auto">v1.2.5</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                                    <span>System Status</span>
                                    <span className="text-green-400 font-bold">All Systems Operational</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="divider"></div>

        {/* ── CORE VALUES / PROTOCOLS ─────────────────────────────────────────────── */}
        <section id="protocols" className="py-40 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24 reveal">
                    <SectionLabel>PROTOCOLS</SectionLabel>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 font-display text-readable">
                        Core <span className="text-zinc-400">Values</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">The fundamental principles that drive our hackathon ecosystem</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger" id="values-grid">
                    <div className="card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group">
                        <div className="w-14 h-14 bg-white/5 flex items-center justify-center mb-8 rounded-xl group-hover:bg-white/10 transition-colors">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">Innovation</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed">Pushing the boundaries of autonomous systems. Explore new ideas, technologies, and approaches that redefine how intelligent agents can perceive, reason, and act independently.</p>
                    </div>

                    <div className="card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group">
                        <div className="w-14 h-14 bg-white/5 flex items-center justify-center mb-8 rounded-xl group-hover:bg-white/10 transition-colors">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">Creativity</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed">Transforming ambitious ideas into impactful solutions. Design unique experiences, novel workflows, and unconventional applications that challenge traditional problem-solving.</p>
                    </div>

                    <div className="card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group">
                        <div className="w-14 h-14 bg-white/5 flex items-center justify-center mb-8 rounded-xl group-hover:bg-white/10 transition-colors">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">Collaboration</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed">Building the future together. Great breakthroughs emerge when diverse skills come together. Developers, designers, researchers, and innovators unite to create intelligent systems.</p>
                    </div>

                    <div className="card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group">
                        <div className="w-14 h-14 bg-white/5 flex items-center justify-center mb-8 rounded-xl group-hover:bg-white/10 transition-colors">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">Future Impact</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed">Creating solutions for tomorrow's world. Inspire projects that extend beyond the hackathon—autonomous agents capable of driving meaningful change in industries and communities.</p>
                    </div>
                </div>
            </div>
        </section>

        <div className="divider"></div>

        {/* ── TIMELINE ──────────────────────────────────────────── */}
        <section id="timeline" data-fade className="px-4 sm:px-6 lg:px-10">
          <Timeline />
        </section>

        <div className="divider"></div>

        {/* ── PRIZES ────────────────────────────────────────────── */}
        <PrizePool />

        <div className="divider"></div>

        {/* ── SPONSORS ──────────────────────────────────────────── */}
        <section id="sponsors" data-fade className="py-24 px-4 sm:px-6 lg:px-10 relative">
          <div className="mx-auto max-w-[1100px] flex flex-col items-center">
            <CenteredLabel>PARTNERS</CenteredLabel>
            <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white mb-4">
              Powering The <span className="text-zinc-400">Future</span>
            </h2>
            <p className="text-center text-zinc-400 text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
              Our ecosystem partners enabling the age of autonomous agents
            </p>
            <div className="flex flex-col items-center gap-16 w-full mt-8">
              {sponsorsCategories.map((category, catIdx) => {
                const tier = category.tier.toLowerCase();
                const isTitle = tier.includes('title');
                const isPlatinum = tier.includes('platinum');
                const isGold = tier.includes('gold');
                const isSilver = tier.includes('silver') && !isTitle && !isPlatinum;
                const isBronze = tier.includes('bronze');
                const isCommunity = tier.includes('community');

                let containerStyle = "border border-white/10";
                let innerStyle = "";

                if (isTitle || isPlatinum) {
                  containerStyle = "border-transparent bg-[#111] relative overflow-hidden";
                  innerStyle = "sponsor-shine-loop bg-gradient-to-r from-transparent via-[#d4d4d8] to-transparent opacity-20";
                } else if (isGold) {
                  containerStyle = "border-[#ffd700]/30 bg-gradient-to-b from-[#ffd700]/10 to-transparent";
                } else if (isSilver) {
                  containerStyle = "border-[#c0c0c0]/30 bg-gradient-to-b from-[#c0c0c0]/10 to-transparent";
                } else if (isBronze) {
                  containerStyle = "border-[#cd7f32]/30 bg-gradient-to-b from-[#cd7f32]/10 to-transparent";
                } else if (isCommunity) {
                  containerStyle = "border-white/10 bg-transparent";
                }

                return (
                <div key={catIdx} className="flex flex-col items-center w-full">
                  <h3 className="text-2xl font-display font-semibold text-white mb-8 tracking-wide">{category.tier}</h3>
                  <div className="flex flex-wrap justify-center gap-6">
                    <style>{`
                      @keyframes sponsorShine {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                      }
                      .sponsor-shine-loop {
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        animation: sponsorShine 3s infinite linear;
                        pointer-events: none;
                      }
                    `}</style>
                    {(category.sponsors ?? []).map((s, i) => {
                      const El = s.link ? "a" : "div";
                      return (
                        <El key={i} href={s.link || undefined} target={s.link ? "_blank" : undefined}
                          rel={s.link ? "noopener noreferrer" : undefined}
                          className={`group p-8 rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${containerStyle}`}
                          style={{ width: 260, minHeight: 120, cursor: s.link ? "pointer" : "default" }}
                          >
                          {(isTitle || isPlatinum) && <div className={innerStyle}></div>}
                          <div className="flex justify-center items-center w-full h-16 md:h-20 relative z-10">
                            <img src={s.image || s.logo} alt={s.alt || s.name} className={`object-contain filter transition-all duration-300 max-h-16 md:max-h-20 max-w-[200px] ${!isCommunity ? "brightness-100 group-hover:brightness-125" : ""}`} />
                          </div>
                        </El>
                      );
                    })}
                  </div>
                </div>
              )})}
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section id="faq" data-fade className="py-24 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
                <CenteredLabel>FAQ</CenteredLabel>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-display text-white">
                Frequently Asked <span className="text-zinc-400">Questions</span>
                </h2>
                <p className="text-center text-lg text-zinc-400 mb-14 leading-relaxed">
                Get all the answers you need about HOH 8.0.
                </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} idx={i} openFaq={openFaq} setOpenFaq={setOpenFaq} />
              ))}
            </div>

            {/* Contact CTA */}
            <div id="contact" className="mt-20 text-center border-t pt-16 border-white/10">
              <h3 className="text-2xl font-bold font-display text-white mb-3">Still have queries?</h3>
              <p className="text-lg text-zinc-400 max-w-md mx-auto leading-relaxed mb-8">
                Connect directly with our core maintainers via community channels for real-time assistance.
              </p>
              <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer"
                className="btn-outline px-8 py-4 rounded-xl text-sm font-bold font-mono inline-flex items-center gap-3">
                JOIN DISCORD
              </a>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* ── REGISTER ───────────────────────────────────────────────── */}
        <section id="register" className="py-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-zinc-900/10"></div>
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <div className="reveal">
                    <CenteredLabel>REGISTER</CenteredLabel>
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-12 font-display">
                        Join The<br/>
                        <span className="text-zinc-400">Revolution</span>
                    </h2>
                    <p className="text-zinc-300 text-2xl mb-16 max-w-3xl mx-auto">
                        The Age of Autonomous Agents is here. Are you ready to build the future where AI does not just assist, it acts?
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <a href="https://devfolio.co" target="_blank" rel="noreferrer" className="btn-primary px-12 py-6 rounded-2xl text-xl font-semibold inline-flex items-center gap-4 font-mono magnetic">
                            <span>Register Now</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                        </a>
                        <a href="mailto:contact@hackonhills.com" className="btn-outline px-12 py-6 rounded-2xl text-xl font-semibold text-zinc-500 inline-flex items-center gap-4 font-mono magnetic">
                            <span>Contact Us</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </a>
                    </div>
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
    <div className="faq-item border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden mb-4" 
      onClick={() => setOpenFaq(isOpen ? null : idx)}>
      <div className="flex items-center justify-between p-6 cursor-pointer">
        <h3 className="text-lg font-semibold text-white font-display">{faq.question}</h3>
        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
        </div>
      </div>
      <div className={`faq-answer px-6 ${isOpen ? 'pb-6' : 'h-0'}`} style={{ maxHeight: isOpen ? '500px' : '0px', transition: 'max-height 0.3s ease' }}>
        <p className="text-zinc-400 leading-relaxed text-sm pt-2 border-t border-white/10">{faq.answer}</p>
      </div>
    </div>
  );
}

export default App;
