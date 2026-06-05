import { useEffect, useState, useRef } from 'react';
import prizeData from '../data/prizepool.json';

const SILVER = '#c0c0c0';
const GRADIENT = `linear-gradient(to right, ${SILVER} 0%, ${SILVER} 60%, #ffffff 100%)`;

const gradientClass = "bg-gradient-to-r from-[#c0c0c0] from-0% via-[#c0c0c0] via-60% to-white to-100% bg-clip-text text-transparent inline-block";

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
        <div className="flex flex-col items-center justify-center text-center pt-24 pb-16">
          <p className="text-base font-semibold uppercase tracking-[0.32em] text-[#c0c0c0] mb-6">
            HACK ON HILLS 7.0
          </p>
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
              0% { background-position: 100% center; }
              100% { background-position: 0% center; }
            }
            .prize-shine {
              background-image: linear-gradient(
                120deg,
                #22c55e 25%,
                #ffffff 50%,
                #22c55e 75%
              );
              background-size: 200% auto;
              animation: prizeShine 8s ease-in-out infinite alternate;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              color: transparent;
              display: inline-block;
            }
          `}</style>
          {[first, second, third].map((prize, i) => {
            if (!prize) return null;
            
            const getCardStyle = (index) => {
              switch (index) {
                case 0: // Gold
                  return {
                    bg: "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%)",
                    border: "1px solid rgba(255, 215, 0, 0.4)",
                    shadow: "0 8px 32px rgba(255, 215, 0, 0.15)",
                    textColor: "#FFD700",
                    gradient: "from-[#FFD700] via-[#FDB931] to-[#FFF8DC]"
                  };
                case 1: // Silver
                  return {
                    bg: "linear-gradient(135deg, rgba(192, 192, 192, 0.2) 0%, rgba(192, 192, 192, 0.05) 100%)",
                    border: "1px solid rgba(192, 192, 192, 0.4)",
                    shadow: "0 8px 32px rgba(192, 192, 192, 0.15)",
                    textColor: "#C0C0C0",
                    gradient: "from-[#C0C0C0] via-[#E8E8E8] to-[#FFFFFF]"
                  };
                case 2: // Bronze
                  return {
                    bg: "linear-gradient(135deg, rgba(205, 127, 50, 0.2) 0%, rgba(205, 127, 50, 0.05) 100%)",
                    border: "1px solid rgba(205, 127, 50, 0.4)",
                    shadow: "0 8px 32px rgba(205, 127, 50, 0.15)",
                    textColor: "#CD7F32",
                    gradient: "from-[#CD7F32] via-[#E4A05F] to-[#F3D5B5]"
                  };
                default:
                  return {};
              }
            };

            const style = getCardStyle(i);

            return (
              <div
                key={i}
                data-fade-step
                style={{
                  transitionDelay: `${i * 0.15}s`,
                  background: style.bg,
                  border: style.border,
                  boxShadow: style.shadow,
                }}
                className="flex flex-col px-6 py-8 text-center rounded-xl transition-transform hover:-translate-y-2 duration-300 relative overflow-hidden backdrop-blur-md"
              >
                {/* Shining Loop */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 prize-shine-loop" style={{ animation: "prizeShine 4s infinite linear", pointerEvents: "none" }}></div>
                
                {/* Dot accent */}
                <span
                  className="w-1.5 h-1.5 rounded-full mx-auto mb-5 relative z-10"
                  style={{ background: style.textColor, boxShadow: `0 0 10px ${style.textColor}` }}
                />
                
                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.28em] mb-5 bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent inline-block relative z-10`}
                >
                  {prize.position}
                </p>
                <p
                  className="text-4xl sm:text-5xl font-bold mb-4 relative z-10"
                  style={{ color: style.textColor, textShadow: `0 0 20px ${style.textColor}40` }}
                >
                  {prize.amount}
                </p>
                <p className="text-sm text-white/80 leading-relaxed relative z-10 font-medium">{prize.description}</p>
              </div>
            );
          })}
        </div>

        {/* Divider + Special Awards label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-6 h-px" style={{ background: SILVER }} />
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
              className="flex flex-col items-center text-center px-4 py-5 rounded-sm transition-colors hover:border-[#c0c0c0]/30 duration-300"
            >
              <p className="text-[11px] text-white/60 mb-2 leading-snug">{award.category}</p>
              <p className="text-sm font-bold text-[#c0c0c0]">
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
