import React, { useEffect, useRef, useState } from 'react';
import CardSwap, { Card } from './CardSwap';
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
    <section id="prize" className="flex min-h-screen items-center px-4 pb-10 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full flex-col lg:flex-row max-w-[1400px] items-center gap-12 lg:gap-0">
        <div className="w-full lg:w-1/3 lg:pr-8 text-center lg:text-left text-black">
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

        <div className="relative w-full lg:w-2/3 h-[400px] sm:h-[520px] flex justify-center mt-8 lg:mt-0">
          <CardSwap width={600} height={460} delay={5000}>
            {mainPrizes.map((p, idx) => {
              const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '';
              return (
                <Card
                  key={idx}
                  customClass="flex items-center justify-center p-6 bg-white/90 border-black/20 text-black rounded-xl"
                >
                  <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
                    <div className="absolute top-4 left-4 text-sm text-black/80 uppercase">{p.position}</div>
                    <div className="flex flex-col items-center">
                      <h1 className="mt-3 text-5xl font-extrabold text-black">{medal} {p.amount}</h1>
                      <h2 className="mt-3 max-w-[320px] text-sm text-black/70">{p.description}</h2>
                    </div>
                  </div>
                </Card>
              );
            })}
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default PrizePool;
