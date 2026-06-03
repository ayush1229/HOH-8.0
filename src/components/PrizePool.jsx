import { useEffect, useState, useRef } from 'react';
import prizeData from '../data/prizepool.json';

const CYAN = '#00e5ff';
const GRADIENT = `linear-gradient(to right, ${CYAN} 0%, ${CYAN} 60%, #ffffff 100%)`;

const gradientClass = "bg-gradient-to-r from-[#00e5ff] from-0% via-[#00e5ff] via-60% to-white to-100% bg-clip-text text-transparent inline-block";

function PrizePool() {
  const prizePool = prizeData?.prizePool ?? {};
  const mainPrizes = prizePool.mainPrizes ?? [];
  const specialAwards = prizePool.specialAwards ?? [];
  const totalAmountStr = prizePool.totalAmount ?? '';

  const [displayTotal, setDisplayTotal] = useState('₹ 0+');
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          animateValue(totalAmountStr);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, totalAmountStr]);

  const animateValue = (targetStr) => {
    // Extract numbers: "₹ 150,000+" -> 150000
    const target = parseInt(targetStr.replace(/[^0-9]/g, ''), 10);
    if (isNaN(target)) {
      setDisplayTotal(targetStr);
      return;
    }

    const duration = 2000; // 2 seconds
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Linear progression
      const currentVal = Math.floor(target * progress);
      setDisplayTotal(`₹ ${currentVal.toLocaleString('en-IN')}+`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayTotal(targetStr);
      }
    };
    requestAnimationFrame(step);
  };

  const [first, second, third] = [mainPrizes[0], mainPrizes[1], mainPrizes[2]];

  return (
    <section id="prizes" data-fade className="px-4 py-24 sm:px-6 lg:px-10" ref={sectionRef}>
      <div className="mx-auto w-full max-w-[1100px]">

        {/* Total prize pool */}
        <div className="text-center mb-20">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.32em] mb-5"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            TOTAL PRIZE POOL
          </p>
          <h2
            className="text-6xl sm:text-7xl md:text-8xl font-bold leading-none prize-shine"
          >
            {displayTotal}
          </h2>
        </div>

        {/* Main prizes — 3 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          <style>{`
            @keyframes prizeShine {
              0% { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
            .prize-shine {
              background-image: linear-gradient(
                120deg,
                #00e5ff 35%,
                #ffffff 50%,
                #00e5ff 65%
              );
              background-size: 200% auto;
              animation: prizeShine 7.5s linear infinite;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              color: transparent;
              display: inline-block;
            }
          `}</style>
          {[first, second, third].map((prize, i) =>
            prize ? (
              <div
                key={i}
                data-fade-step
                style={{
                  transitionDelay: `${i * 0.15}s`,
                  background: i === 0 ? "rgba(0,229,255,0.04)" : "#0d0d0d",
                  border:
                    i === 0
                      ? `1px solid rgba(0,229,255,0.35)`
                      : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: i === 0 ? `0 0 40px rgba(0,229,255,0.07)` : "none",
                }}
                className="flex flex-col px-6 py-8 text-center rounded-sm transition-transform hover:-translate-y-2 duration-300"
              >
                {/* Dot accent */}
                {i === 0 && (
                  <span
                    className="w-1.5 h-1.5 rounded-full mx-auto mb-5"
                    style={{ background: CYAN }}
                  />
                )}
                <p
                  className={`text-[9px] font-semibold uppercase tracking-[0.28em] mb-5 ${gradientClass}`}
                >
                  {prize.position}
                </p>
                <p
                  className="text-3xl sm:text-4xl font-bold mb-4 prize-shine"
                >
                  {prize.amount}
                </p>
                <p className="text-xs text-white/35 leading-relaxed">{prize.description}</p>
              </div>
            ) : null
          )}
        </div>

        {/* Divider + Special Awards label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-6 h-px" style={{ background: CYAN }} />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            SPECIAL AWARDS
          </span>
        </div>

        {/* Special awards — horizontal row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {specialAwards.map((award, i) => (
            <div
              key={i}
              data-fade-step
              style={{
                transitionDelay: `${i * 0.1}s`,
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              className="flex flex-col items-center text-center px-4 py-5 rounded-sm transition-colors hover:border-[#00e5ff]/30 duration-300"
            >
              <p className="text-[11px] text-white/60 mb-2 leading-snug">{award.category}</p>
              <p className="text-sm font-bold text-[#00e5ff]">
                {award.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PrizePool;
