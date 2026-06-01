import prizeData from '../data/prizepool.json';
import sponsorsData from '../data/sponsors.json';
import LogoLoop from './LogoLoop';

const CYAN = '#00e5ff';

const SPECIAL_ICONS = [
  // Leaf / sustainability
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/><path d="M17 8c0-2.76-2.24-5-5-5S7 5.24 7 8"/></svg>,
  // Person / girls
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="1.5"><circle cx="12" cy="7" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>,
  // Star / beginner
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  // Cube / web3
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
  // CPU / AI
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>,
];

const SPECIAL_BADGES = ['TRACK AWARD', null, null, null, null];

const TROPHY_FIRST = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="1.5">
    <path d="M6 9H3V4h3M18 9h3V4h-3M12 17v3M8 20h8M12 15a6 6 0 006-6V4H6v5a6 6 0 006 6z"/>
  </svg>
);
const TROPHY_SMALL = (color = 'rgba(255,255,255,0.3)') => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M6 9H3V4h3M18 9h3V4h-3M12 17v3M8 20h8M12 15a6 6 0 006-6V4H6v5a6 6 0 006 6z"/>
  </svg>
);

function PrizePool() {
  const prizePool = prizeData?.prizePool ?? {};
  const mainPrizes = prizePool.mainPrizes ?? [];
  const specialAwards = prizePool.specialAwards ?? [];
  const total = prizePool.totalAmount ?? '';

  // Order: 2nd, 1st, 3rd for podium display
  const second = mainPrizes[1];
  const first = mainPrizes[0];
  const third = mainPrizes[2];

  const categories = sponsorsData?.sponsorsSection?.categories ?? [];
  const logos = categories.flatMap(cat => (cat.sponsors ?? []).map(s => ({ src: s.logo, alt: s.name })));

  return (
    <section id="prize" data-fade className="px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1100px]">

        {/* Header card */}
        <div
          className="w-full mb-16 px-8 py-10 text-center"
          style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex justify-center mb-5">
            <span className="border border-[#00e5ff]/40 px-3 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: CYAN }}>
              THE AGE OF AUTONOMOUS AGENTS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            What you walk{' '}
            <span style={{ color: CYAN }}>away with</span>
          </h2>
          <p className="text-sm text-white/40">Total Prize Pool: <span className="text-white/70 font-medium">{total}</span></p>

          {/* Logo loop */}
          {logos.length > 0 && (
            <div className="mt-8" style={{ height: 60, position: 'relative', overflow: 'hidden', width: '100%' }}>
              <LogoLoop logos={logos} speed={80} direction="left" logoHeight={40} gap={48} hoverSpeed={20} scaleOnHover ariaLabel="Sponsors" width="100%" />
            </div>
          )}
        </div>

        {/* Podium — 2nd | 1st | 3rd */}
        <div className="flex items-end justify-center gap-4 mb-16">
          {/* 2nd Place */}
          {second && (
            <div
              className="flex-1 max-w-[220px] flex flex-col items-center text-center px-6 py-8"
              style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {TROPHY_SMALL()}
              <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-2">2nd Place</p>
              <p className="text-2xl font-bold text-white">{second.amount}</p>
              <span className="mt-3 border border-white/15 px-2 py-0.5 text-[8px] uppercase tracking-widest text-white/30">SILVER TIER</span>
            </div>
          )}

          {/* 1st Place — taller, cyan accented */}
          {first && (
            <div
              className="flex-1 max-w-[260px] flex flex-col items-center text-center px-8 py-10 relative"
              style={{ background: '#0d0d0d', border: `1px solid ${CYAN}40`, boxShadow: `0 0 40px ${CYAN}10, 0 0 80px ${CYAN}06` }}
            >
              {TROPHY_FIRST}
              <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: CYAN }}>GRAND CHAMPIONS</p>
              <p className="text-4xl font-bold text-white">{first.amount}</p>
            </div>
          )}

          {/* 3rd Place */}
          {third && (
            <div
              className="flex-1 max-w-[220px] flex flex-col items-center text-center px-6 py-8"
              style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {TROPHY_SMALL()}
              <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-2">3rd Place</p>
              <p className="text-2xl font-bold text-white">{third.amount}</p>
              <span className="mt-3 border border-white/15 px-2 py-0.5 text-[8px] uppercase tracking-widest text-white/30">BRONZE TIER</span>
            </div>
          )}
        </div>

        {/* Dividers */}
        <div className="flex gap-8 mb-12">
          <div className="flex-1 h-px bg-white/8" />
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Special Awards — 2 col then 3 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {specialAwards.slice(0, 2).map((award, i) => (
            <SpecialCard key={i} award={award} icon={SPECIAL_ICONS[i]} badge={SPECIAL_BADGES[i]} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {specialAwards.slice(2).map((award, i) => (
            <SpecialCard key={i + 2} award={award} icon={SPECIAL_ICONS[i + 2]} badge={SPECIAL_BADGES[i + 2]} />
          ))}
        </div>

      </div>
    </section>
  );
}

function SpecialCard({ award, icon, badge }) {
  return (
    <div
      className="flex flex-col px-6 py-6"
      style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <span>{icon}</span>
        {badge && (
          <span className="border border-[#00e5ff]/30 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-widest" style={{ color: CYAN }}>
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-white mb-2">{award.category}</h3>
      {award.description && (
        <p className="text-xs text-white/35 leading-relaxed mb-4">{award.description}</p>
      )}
      <p className="text-lg font-bold mt-auto" style={{ color: CYAN }}>{award.amount}</p>
    </div>
  );
}

export default PrizePool;
