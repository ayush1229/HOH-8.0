import { useState } from "react";
import timelineData from "../data/timeline.json";

const CYAN = '#00e5ff';
const GRADIENT = `linear-gradient(to right, ${CYAN} 0%, ${CYAN} 60%, #ffffff 100%)`;

const gradientClass = "bg-gradient-to-r from-[#00e5ff] from-0% via-[#00e5ff] via-60% to-white to-100% bg-clip-text text-transparent inline-block";

function Timeline() {
  const schedule = timelineData?.schedule || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDay = schedule[activeIndex];

  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-20">
      <style>{`
        @keyframes shineDrop {
          0% { top: -20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 120%; opacity: 0; }
        }
        .shine-line {
          animation: shineDrop 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 1s;
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#00e5ff]" />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#00e5ff]"
          >
            SCHEDULE
          </span>
        </div>
        <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">The Sequence</h2>
        <p className="text-sm text-white/40">48 hours from kickoff to the final pitch.</p>
      </div>

      {/* Day tabs */}
      <div className="flex justify-center gap-2 mb-12">
        {schedule.map((day, di) => (
          <button
            key={di}
            type="button"
            onClick={() => setActiveIndex(di)}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200 rounded-sm"
            style={
              activeIndex === di
                ? { background: "#00e5ff", color: "#000", border: "1px solid #00e5ff" }
                : {
                    background: "transparent",
                    color: "rgba(255,255,255,0.45)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }
            }
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Events vertical list with continuous line */}
      <div className="relative flex flex-col">
        {/* Continuous background line */}
        <div className="absolute left-[15px] top-4 bottom-8 w-px bg-[#00e5ff]/10 overflow-hidden z-0">
          <div className="shine-line absolute left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent" />
        </div>

        {(activeDay?.events ?? []).map((event, i) => (
          <div key={i} className="flex gap-5 relative z-10">
            {/* Left: icon + spacer */}
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{
                  border: "1px solid rgba(0,229,255,0.35)",
                  background: "rgba(10,10,10,1)", // solid background so line doesn't show through
                }}
              >
                {/* Clock icon */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              {i < (activeDay?.events.length ?? 0) - 1 && (
                <div
                  className="w-px flex-1 mt-1 mb-1"
                  style={{ minHeight: 48 }}
                />
              )}
            </div>

            {/* Right: event details */}
            <div className="pb-8 min-w-0">
              <p
                className="text-[10px] font-semibold mb-1 uppercase tracking-wider text-[#00e5ff]"
                style={{ letterSpacing: "0.07em" }}
              >
                {event.time}
              </p>
              <p className="text-base font-bold text-white mb-0.5 leading-snug">{event.name}</p>
              {event.location && (
                <p className="text-xs text-white/35">{event.location}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
