import React, { useEffect, useRef, useState } from 'react';
import prizeData from '../data/prizepool.json';
import LogoLoop from './LogoLoop';
import sponsorsData from '../data/sponsors.json';

const PrizePool = () => {
  const mainPrizes = prizeData?.prizePool?.mainPrizes ?? [];
  const total = prizeData?.prizePool?.totalAmount ?? '';
  const amountRef = useRef(null);
  const [logoWidth, setLogoWidth] = useState('100%');

  useEffect(() => {
    const update = () => {
      const w = amountRef.current?.offsetWidth;
      if (w) setLogoWidth(`${w}px`);
    };

    update();

    let ro;
    if (window.ResizeObserver && amountRef.current) {
      ro = new ResizeObserver(update);
      ro.observe(amountRef.current);
    }
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section id="prize" className="flex items-center px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full flex-col lg:flex-row max-w-[1400px] items-center lg:justify-between gap-12 lg:gap-20">
        <div className="w-full lg:w-[45%] text-center lg:text-left text-black">
          <h2 className="text-6xl sm:text-7xl font-bold">PRIZE POOL</h2>
          <h1 ref={amountRef} className="mt-6 text-8xl sm:text-9xl font-extrabold leading-tight whitespace-nowrap inline-block">{total}</h1>

          <div className="mt-8">
            {(() => {
              const categories = sponsorsData?.sponsorsSection?.categories ?? [];
              const logos = categories.flatMap(cat => (cat.sponsors ?? []).map(s => ({ src: s.logo, alt: s.name })));
              return (
                <div style={{ height: 120, position: 'relative', overflow: 'hidden', width: logoWidth }}>
                  <LogoLoop
                    logos={logos}
                    speed={100}
                    direction="left"
                    logoHeight={64}
                    gap={48}
                    hoverSpeed={20}
                    scaleOnHover
                    ariaLabel="Sponsors"
                    width={logoWidth}
                  />
                </div>
              );
            })()}
          </div>
        </div>

        <div className="w-full lg:w-[50%] flex flex-col gap-6 mt-8 lg:mt-0 items-center lg:items-end justify-center">
          {mainPrizes.map((p, idx) => {
            const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '';
            return (
              <div
                key={idx}
                className="w-full max-w-xl flex items-center p-8 bg-white border border-gray-100 text-black rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group"
              >
                {/* Feather edge inner glow effect */}
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(255,255,255,1)] pointer-events-none rounded-3xl transition-opacity duration-300 group-hover:opacity-75"></div>
                
                <div className="flex w-full items-center justify-between z-10 gap-6">
                  <div className="text-left flex-1">
                    <div className="text-sm font-bold text-black/40 uppercase tracking-widest mb-2">{p.position}</div>
                    <h2 className="text-sm sm:text-base text-black/80 leading-relaxed font-medium max-w-[280px]">{p.description}</h2>
                  </div>
                  <div className="text-right whitespace-nowrap flex flex-col items-end justify-center">
                    <span className="text-3xl mb-2">{medal}</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">{p.amount}</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrizePool;
