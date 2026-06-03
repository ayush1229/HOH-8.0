import React from "react";
import sponsorsData from "../data/sponsors.json";

function CenteredLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono mb-8 rounded-full">
      // {children}
    </div>
  );
}

function Sponsors() {
  const sponsorsCategories = sponsorsData?.sponsorsSection?.categories ?? [];

  return (
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

            let tierTextStyle = "text-white"; // default
            if (isTitle || isPlatinum) {
                tierTextStyle = "prize-shine bg-clip-text text-transparent";
            } else if (isGold) {
                tierTextStyle = "bg-gradient-to-r from-[#ffd700] via-[#ffdf00] to-[#ffd700] bg-clip-text text-transparent";
            } else if (isSilver) {
                tierTextStyle = "bg-gradient-to-r from-[#c0c0c0] via-[#d3d3d3] to-[#c0c0c0] bg-clip-text text-transparent";
            } else if (isBronze) {
                tierTextStyle = "bg-gradient-to-r from-[#cd7f32] via-[#e59866] to-[#cd7f32] bg-clip-text text-transparent";
            }

            return (
            <div key={catIdx} className="flex flex-col items-center w-full">
              <h3 className={`text-3xl md:text-4xl font-display font-bold mb-10 tracking-wide text-center relative px-8 py-2 ${tierTextStyle}`}>
                {category.tier}
                {(isTitle || isPlatinum) && (
                   <div className="absolute inset-0 z-[-1] bg-gradient-to-r from-transparent via-[#c0c0c0] to-transparent opacity-20 blur-xl sponsor-shine-loop"></div>
                )}
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {(category.sponsors ?? []).map((s, i) => {
                  const El = s.link ? "a" : "div";
                  return (
                    <El key={i} href={s.link || undefined} target={s.link ? "_blank" : undefined}
                      rel={s.link ? "noopener noreferrer" : undefined}
                      className={`group p-8 rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${!isCommunity ? 'bg-white/5 border border-white/10 hover:border-white/20' : 'bg-transparent border border-white/5 hover:border-white/15'}`}
                      style={{ width: 260, minHeight: 120, cursor: s.link ? "pointer" : "default" }}
                      >
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
  );
}

export default Sponsors;
