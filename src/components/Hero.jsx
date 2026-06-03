import React, { useEffect, useState } from "react";
import TextType from "./TypeText";
import FloatingAgents from "./FloatingAgents";

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
    <div className="grid grid-cols-4 gap-3 sm:gap-5 w-full max-w-xl mx-auto reveal active mt-6" style={{ transitionDelay: '0.5s' }}>
        <div className="bg-white/5 backdrop-blur-lg border border-white/5 p-3 sm:p-5 rounded-2xl flex flex-col items-center">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white">{timeLeft.days}</div>
            <div className="text-[10px] sm:text-xs text-zinc-400 mt-1 sm:mt-2 uppercase font-mono">Days</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/5 p-3 sm:p-5 rounded-2xl flex flex-col items-center">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white">{timeLeft.hours}</div>
            <div className="text-[10px] sm:text-xs text-zinc-400 mt-1 sm:mt-2 uppercase font-mono">Hours</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/5 p-3 sm:p-5 rounded-2xl flex flex-col items-center">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white">{timeLeft.minutes}</div>
            <div className="text-[10px] sm:text-xs text-zinc-400 mt-1 sm:mt-2 uppercase font-mono">Mins</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/5 p-3 sm:p-5 rounded-2xl flex flex-col items-center">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white">{timeLeft.seconds}</div>
            <div className="text-[10px] sm:text-xs text-zinc-400 mt-1 sm:mt-2 uppercase font-mono">Secs</div>
        </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 pb-4">
      <div className="absolute inset-0 grid-bg"></div>

      {/* Glow orbs */}
      <div className="absolute rounded-full blur-[100px] w-96 h-96 bg-indigo-900/30 top-20 -left-48" style={{ animationDelay: "0s" }}></div>
      <div className="absolute rounded-full blur-[100px] w-80 h-80 bg-purple-900/20 bottom-20 -right-40" style={{ animationDelay: "-3s" }}></div>
      <div className="absolute rounded-full blur-[100px] w-64 h-64 bg-blue-900/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: "-5s", opacity: 0.25 }}></div>

      <FloatingAgents mouseStrength={10} />

      <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center text-center max-w-6xl mx-auto h-full my-auto">
        <div className="mb-4 reveal active">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-500 font-mono rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                AGENTS ONLINE // v8.0
            </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter mb-3 reveal text-readable active flex flex-col items-center w-full" style={{ transitionDelay: '0.1s' }}>
            <span className="block glow-text w-full text-center leading-tight">HACK ON</span>
            <span className="block text-zinc-500 w-full text-center leading-tight">HILLS <span className="text-white">8.0</span></span>
        </h1>

        <div className="h-6 mb-4 reveal active w-full flex justify-center" style={{ transitionDelay: '0.2s' }}>
            <TextType
              text={["The Age of Autonomous Agents", "Where AI Acts, Not Just Assists", "Decentralized Intelligence"]}
              className="text-base md:text-lg text-zinc-300 font-mono text-center"
              textColors={["#a0a0b8", "#a0a0b8", "#a0a0b8"]}
              showCursor typingSpeed={42} pauseDuration={2200} deletingSpeed={28}
            />
        </div>

        <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-sm md:text-base reveal active text-center" style={{ transitionDelay: '0.3s' }}>
            Join the vanguard of decentralised intelligence. Build the future where AI does not just assist, it acts.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 reveal active w-full" style={{ transitionDelay: '0.4s' }}>
            <a href="#register" className="btn-primary px-8 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-3 font-mono magnetic">
                <span>Register on Devfolio</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
            <a href="#tracks" className="btn-outline px-8 py-3 rounded-xl text-sm font-semibold text-zinc-500 inline-flex items-center gap-3 font-mono magnetic">
                <span>Explore Tracks</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </a>
        </div>

        <Countdown />

        <div className="mt-6 text-[10px] md:text-xs text-zinc-500 font-mono reveal active text-center w-full" style={{ transitionDelay: '0.6s' }}>
            NIT HAMIRPUR // 48-HOUR HACKATHON // AGENTIC AI
        </div>
      </div>
    </section>
  );
}

export default Hero;
