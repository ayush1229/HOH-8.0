import React, { useEffect } from "react";
import { StickyNavbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";
import PrizePool from "./components/PrizePool";
import AgentUniverse from "./components/AgentUniverse";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import About from "./components/About";
import Protocols from "./components/Protocols";
import AgenticDomains from "./components/AgenticDomains";
import Sponsors from "./components/Sponsors";
import FAQ from "./components/FAQ";
import Register from "./components/Register";

const AU_WORDS = [
  "AUTONOMOUS", "AGENTS", "REASONING", "MULTI-AGENT",
  "RAG", "TOOLS", "PLANNING", "MEMORY", "NEURAL",
];

function App() {
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

  // Load Devfolio SDK after React renders so it finds all apply-button divs
  useEffect(() => {
    if (document.querySelector('script[data-devfolio-sdk]')) return;
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-devfolio-sdk", "true");
    document.body.appendChild(script);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-screen overflow-hidden max-w-[100vw]"
      style={{ backgroundColor: "transparent", fontFamily: "'Inter', sans-serif" }}>

      <Loader />

      {/* 3-D Background */}
      <AgentUniverse eventSource={containerRef} density={150} textDensity={200} speed={0.5} mouseStrength={0.5} color="#a0c0c0" words={AU_WORDS} />

      {/* Navbar */}
      <div className="relative z-50"><StickyNavbar /></div>

      <main className="relative z-10 h-screen overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar noise"
        style={{ fontFamily: "'Inter', sans-serif" }}>

        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(2,2,4,0.08)", pointerEvents: "none", zIndex: 5 }}></div>
        <div className="scanlines"></div>

        <Hero />
        <div className="divider"></div>
        
        <About />
        <div className="divider"></div>
        
        <Protocols />
        <div className="divider"></div>

        <AgenticDomains />
        <div className="divider"></div>
        
        <section id="timeline" data-fade className="px-4 sm:px-6 lg:px-10">
          {/* <Timeline /> */}
        </section>
        <div className="divider"></div>
        
        <PrizePool />
        <div className="divider"></div>
        
        <Sponsors />
        <div className="divider"></div>
        
        <FAQ />
        <div className="divider"></div>
        
        <Register />
        <Footer />

      </main>
    </div>
  );
}

export default App;
