import React, { useEffect } from "react";
import { StickyNavbar } from "./components/Navbar";
import TextType from "./components/TypeText";
import Timeline from "./components/Timeline";
import PrizePool from "./components/PrizePool";
import sponsorsData from "./data/sponsors.json";
import faqData from "./data/faq.json";

function App() {
  useEffect(() => {
    const scroller = document.querySelector('main');
    const els = document.querySelectorAll('[data-fade]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { root: scroller, threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);



  return (
    <div className="relative h-screen w-screen overflow-hidden max-w-[100vw]" style={{ backgroundColor: '#0a0a0a', fontFamily: "'SpaceGrotesk', sans-serif" }}>
      <div className="relative z-50">
        <StickyNavbar />
      </div>

      <main className="relative z-10 h-screen overflow-y-auto scroll-smooth" style={{ fontFamily: "'SpaceGrotesk', sans-serif" }}>
        {/* Hero / Landing Section */}
        <section id="home" className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
          {/* Glowing bordered rectangle */}
          <div
            className="relative flex flex-col items-center justify-center px-8 py-14 sm:px-16 sm:py-16 w-full max-w-[580px] mx-auto"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 0 40px rgba(0,229,255,0.06), 0 0 80px rgba(0,229,255,0.03), inset 0 0 40px rgba(0,229,255,0.02)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center border border-[#00e5ff]/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#00e5ff]">
              HACK ON HILLS 8.0
            </div>

            {/* Main heading via TextType */}
            <TextType
              text={[
                "The Age of Autonomous Agents",
                "The Future of Decentralized Intelligence",
                "Build Beyond Boundaries"
              ]}
              className="text-3xl font-bold leading-snug text-white sm:text-4xl md:text-5xl"
              showCursor={true}
              typingSpeed={40}
            />

            {/* Subtitle */}
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50 sm:text-base">
              Join the vanguard of decentralised intelligence. Build the future where AI doesn't just assist, it acts.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <a
                href="#about"
                className="w-full sm:w-auto px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] bg-white text-black transition-all duration-200 hover:bg-white/90"
              >
                REGISTER NOW
              </a>
              <a
                href="#about"
                className="w-full sm:w-auto px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] border border-white/30 text-white transition-all duration-200 hover:border-white/60"
              >
                VIEW TRACKS
              </a>
            </div>
          </div>
        </section>

        <section id="about" data-fade className="py-24 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1100px]">
            {/* Header Area */}
            <div className="flex flex-col items-start mb-20 text-left">
              {/* Badge */}
              <div className="bg-[#9ca3af]/30 text-[#00e5ff] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></span>
                System Initialization
              </div>

              {/* Title */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-10 text-white">
                The Genesis of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] to-[#c4b5fd]">
                  Autonomy
                </span>
              </h2>

              {/* Paragraph */}
              <div className="border-l-2 border-white/10 pl-6 text-left max-w-3xl self-start">
                <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed">
                  Hack on Hills 8.0 is the premier 48-hour hackathon focused on the future of decentralized intelligence and autonomous systems. It is an immersive environment where developers, designers, and visionaries converge to build solutions that define the 'Age of Autonomous Agents'.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex flex-col items-end mb-12">
              <span className="text-[10px] font-semibold text-[#9ca3af] tracking-widest mb-2 uppercase">// V.8.0.PROTOCOLS</span>
              <div className="w-full h-px bg-white/10"></div>
            </div>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Innovation (Top Left, wide) */}
              <div className="md:col-span-7 bg-[#111] rounded-sm p-8 flex flex-col justify-center text-white min-h-[220px]">
                <div className="flex items-center gap-3 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                  </svg>
                  <h3 className="text-2xl font-bold">Innovation</h3>
                </div>
                <p className="text-xs text-white/60 leading-relaxed max-w-md">
                  Pushing the boundaries of autonomous systems. We aim to encourage participants to explore new ideas, technologies, and approaches that redefine how intelligent agents can perceive, reason, and act independently in the real world.
                </p>
              </div>

              {/* Creativity (Top Right, tall) */}
              <div className="md:col-span-5 bg-[#111] rounded-sm p-8 flex flex-col text-white min-h-[280px]">
                <div className="mb-6 mt-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Creativity</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Transforming ambitious ideas into impactful solutions. We believe the future of autonomous agents will be shaped by creative thinking. Participants are encouraged to design unique experiences, novel workflows, and unconventional applications that challenge traditional problem-solving.
                </p>
              </div>

              {/* Collaboration (Bottom Left, tall) */}
              <div className="md:col-span-5 bg-[#111] rounded-sm p-8 flex flex-col text-white min-h-[280px]">
                <div className="mb-6 mt-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Collaboration</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Building the future together. Great breakthroughs emerge when diverse skills come together. We foster an environment where developers, designers, researchers, and innovators collaborate to create intelligent systems that are greater than the sum of their parts.
                </p>
              </div>

              {/* Future Impact (Bottom Right, wide) */}
              <div className="md:col-span-7 bg-[#111] rounded-sm p-8 flex flex-col justify-center text-white min-h-[220px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Future Impact</h3>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
                  </svg>
                </div>
                <p className="text-xs text-white/60 leading-relaxed max-w-md">
                  Creating solutions for tomorrow's world. Our goal is to inspire projects that extend beyond the hackathon—autonomous agents capable of driving meaningful change in industries, communities, and everyday life, shaping the next era of technology.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section data-fade className="flex items-center px-4 py-0 sm:px-6 lg:px-10">
          <Timeline />
        </section>
        <PrizePool />

        <section id="sponsors" data-fade className="flex min-h-screen items-center px-4 pb-10 pt-24 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <p className="text-xs tracking-wide text-white/50 leading-relaxed uppercase">
                HOH is made possible by the generous support of our sponsors. These visionary organizations are building the foundation for the Age of Autonomous Agents.
              </p>
            </div>
            <div className="flex flex-col gap-12 py-6">
              {(() => {
                const categories = sponsorsData?.sponsorsSection?.categories ?? [];
                return categories.map((cat, idx) => (
                  <div key={`tier-${idx}`} className="flex flex-col gap-0 items-center w-full">
                    <div className="flex items-center justify-center bg-[#050505] w-full text-white py-2 mb-4">
                      <h2 className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: idx === 0 ? '#00e5ff' : 'white' }}>{cat.tier}</h2>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 w-full">
                      {(cat.sponsors || []).map((s, sidx) => (
                        <div
                          key={`s-${idx}-${sidx}`}
                          className="flex items-center justify-center bg-[#050505] p-8 w-full sm:w-[48%] md:w-[31%] min-h-[140px]"
                        >
                          <img src={s.image || s.logo} alt={s.name} className="max-h-16 object-contain mx-auto" />
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
            {/* FAQ Section */}
            <section id="faq" data-fade className="mx-auto w-full max-w-[900px] py-20">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <span className="border border-[#00e5ff]/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#00e5ff]">
                  SYSTEM_QUERY
                </span>
              </div>

              {/* Title */}
              <h2 className="text-center text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
                Frequently Asked<br />
                <span style={{ color: '#00e5ff' }}>Questions</span>
              </h2>

              {/* Subtitle */}
              <p className="text-center text-sm text-white/40 mb-14 max-w-md mx-auto leading-relaxed">
                {faqData?.faqSection?.description} Initialize your knowledge base before entering the autonomous arena.
              </p>

              {/* FAQs grid */}
              {(() => {
                const faqs = faqData?.faqSection?.faqs ?? [];
                const first = faqs[0];
                const rest = faqs.slice(1);
                return (
                  <>
                    {/* First item — full width */}
                    {first && (
                      <div className="border-t border-white/10 py-8 mb-2">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-base font-semibold text-white mb-3">{first.question}</h3>
                          <span className="text-white/20 text-xs mt-1 shrink-0">⊞</span>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed max-w-2xl">{first.answer}</p>
                      </div>
                    )}

                    {/* Rest — 2-column grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {rest.map((faq, i) => (
                        <div
                          key={i}
                          className="border-t border-white/10 py-8 md:odd:pr-10 md:even:pl-10"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="text-sm font-semibold text-white">{faq.question}</h3>
                            <span className="text-white/20 text-xs mt-0.5 shrink-0">⊞</span>
                          </div>
                          <p className="text-xs text-white/40 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}

              {/* Still have queries */}
              <div className="mt-20 flex flex-col items-center text-center border-t border-white/10 pt-16">
                <h3 className="text-2xl font-semibold text-white mb-3">Still have queries?</h3>
                <p className="text-sm text-white/40 max-w-xs leading-relaxed mb-8">
                  Connect directly with our core maintainers via the community channels for realtime assistance.
                </p>
                <a
                  href="https://discord.gg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] border border-white/30 text-white transition-all duration-200 hover:border-white/60"
                >
                  JOIN DISCORD
                </a>
              </div>
            </section>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#0a0a0a] px-6 py-10">
          <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 sm:flex-row">
            <span className="text-sm font-semibold text-white">Hack on Hills 8.0</span>
            <div className="flex gap-6 text-xs text-white/40">
              {['Twitter', 'Discord', 'Github', 'LinkedIn'].map(link => (
                <a key={link} href="#" className="hover:text-white transition-colors duration-200">{link}</a>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-[1400px] text-xs text-white/20">
            © 2024 Hack on Hills 8.0 · The Age of Autonomous Agents
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
