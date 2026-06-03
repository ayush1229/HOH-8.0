import React from "react";
import TerminalStatus from "./TerminalStatus";

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono mb-8 rounded-full">
      // {children}
    </div>
  );
}

function About() {
  return (
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
                    <div className="relative">
                        <TerminalStatus />
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default About;
