import TextType from "./TypeText";
import FloatingAgents from "./FloatingAgents";

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 pb-4">
      <div className="absolute inset-0 grid-bg"></div>

      {/* Glow orbs */}
      <div className="absolute rounded-full blur-[100px] w-96 h-96 bg-indigo-900/30 top-20 -left-48" style={{ animationDelay: "0s" }}></div>
      <div className="absolute rounded-full blur-[100px] w-80 h-80 bg-purple-900/20 bottom-20 -right-40" style={{ animationDelay: "-3s" }}></div>
      <div className="absolute rounded-full blur-[100px] w-64 h-64 bg-blue-900/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: "-5s", opacity: 0.25 }}></div>

      <FloatingAgents mouseStrength={10} />

      <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center text-center max-w-6xl mx-auto h-full my-auto pointer-events-none">
        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter mb-3 pt-16 reveal text-readable active flex flex-col items-center w-full pointer-events-auto" style={{ transitionDelay: '0.1s' }}>
            <span className="block glow-text w-full text-center leading-tight">HACK ON</span>
            <span className="block text-zinc-500 w-full text-center leading-tight">HILLS <span className="text-white">8.0</span></span>
        </h1>

        <div className="h-6 mb-4 reveal active w-full flex justify-center pointer-events-auto" style={{ transitionDelay: '0.2s' }}>
            <TextType
              text={["The Age of Autonomous Agents", "Where AI Acts, Not Just Assists", "Decentralized Intelligence"]}
              className="text-base md:text-lg text-zinc-300 font-mono text-center"
              textColors={["#a0a0b8", "#a0a0b8", "#a0a0b8"]}
              showCursor typingSpeed={42} pauseDuration={2200} deletingSpeed={28}
            />
        </div>

        <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-sm md:text-base reveal active text-center pointer-events-auto" style={{ transitionDelay: '0.3s' }}>
            Join the vanguard of decentralised intelligence. Build the future where AI does not just assist, it acts.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 reveal active w-full pointer-events-auto" style={{ transitionDelay: '0.4s' }}>
            {/* Official Apply with Devfolio button */}
            {/* <DevfolioButton /> */}
            <a href="#tracks" className="btn-outline px-8 py-3 rounded-xl text-sm font-semibold text-zinc-500 inline-flex items-center gap-3 font-mono magnetic">
                <span>Explore Tracks</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </a>
        </div>

        <div className="w-full max-w-xl mx-auto reveal active mt-6 text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white" style={{ transitionDelay: '0.5s' }}>
            Postponed Till Further Notice
        </div>

        <div className="mt-6 text-[10px] md:text-xs text-zinc-500 font-mono reveal active text-center w-full pointer-events-auto" style={{ transitionDelay: '0.6s' }}>
            NIT HAMIRPUR // 48-HOUR HACKATHON // AGENTIC AI
        </div>
      </div>
    </section>
  );
}

export default Hero;
