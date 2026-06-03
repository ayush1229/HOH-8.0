import React from "react";

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono mb-8 rounded-full">
      // {children}
    </div>
  );
}

function Protocols() {
  return (
    <section id="protocols" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24 reveal">
                <SectionLabel>PROTOCOLS</SectionLabel>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 font-display text-readable">
                    Core <span className="text-zinc-400">Values</span>
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto text-lg">The fundamental principles that drive our hackathon ecosystem</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 stagger" id="values-grid">
                
                {/* Innovation (Long) */}
                <div className="md:col-span-3 card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group flex flex-col justify-center min-h-[220px]">
                    <div className="w-8 h-[2px] bg-[#00e5ff] mb-6 shadow-[0_0_10px_#00e5ff]"></div>
                    <h3 className="text-2xl font-bold text-white mb-4 font-display">Innovation</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">Pushing the boundaries of autonomous systems. Explore new paradigms in agent architecture, multi-agent collaboration, and decentralized intelligence.</p>
                </div>

                {/* Creativity (Short) */}
                <div className="md:col-span-2 card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group flex flex-col justify-center min-h-[220px]">
                    <div className="w-8 h-[2px] bg-[#00e5ff] mb-6 shadow-[0_0_10px_#00e5ff]"></div>
                    <h3 className="text-2xl font-bold text-white mb-4 font-display">Creativity</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">Transforming ambitious ideas into impactful solutions that redefine possibility.</p>
                </div>

                {/* Collaboration (Short) */}
                <div className="md:col-span-2 card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group flex flex-col justify-center min-h-[220px]">
                    <div className="w-8 h-[2px] bg-[#00e5ff] mb-6 shadow-[0_0_10px_#00e5ff]"></div>
                    <h3 className="text-2xl font-bold text-white mb-4 font-display">Collaboration</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">Building the future together with diverse skills, perspectives, and shared vision.</p>
                </div>

                {/* Future Impact (Long) */}
                <div className="md:col-span-3 card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group flex flex-col justify-center min-h-[220px]">
                    <div className="w-8 h-[2px] bg-[#00e5ff] mb-6 shadow-[0_0_10px_#00e5ff]"></div>
                    <h3 className="text-2xl font-bold text-white mb-4 font-display">Future Impact</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">Creating solutions that drive meaningful change in the real world — systems that persist, adapt, and evolve beyond the hackathon.</p>
                </div>

            </div>
        </div>
    </section>
  );
}

export default Protocols;
