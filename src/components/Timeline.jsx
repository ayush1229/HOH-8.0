import React from "react";
import timelineData from "../data/timeline.json";

function Timeline() {
  const schedule = timelineData?.schedule || [];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-20">
      <style>{`
        @keyframes shineDropLeft {
          0% { top: -20%; opacity: 0; }
          10% { opacity: 1; }
          40% { opacity: 1; }
          50% { top: 120%; opacity: 0; }
          100% { top: 120%; opacity: 0; }
        }
        @keyframes shineDropRight {
          0% { top: -20%; opacity: 0; }
          50% { top: -20%; opacity: 0; }
          60% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 120%; opacity: 0; }
        }
        .shine-line-left {
          animation: shineDropLeft 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .shine-line-right {
          animation: shineDropRight 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-24 reveal">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono mb-8 rounded-full">
            // SCHEDULE
        </div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 font-display text-readable">
            Execution <span className="text-zinc-400">Timeline</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">The synchronized schedule for autonomous agents and human developers</p>
      </div>

      <div className="space-y-20">
        {schedule.map((day, di) => {
          const events = day.events || [];
          const midPoint = Math.ceil(events.length / 2);
          const leftEvents = events.slice(0, midPoint);
          const rightEvents = events.slice(midPoint);

          return (
            <div key={di} className="reveal">
                {/* Day Header */}
                <div className="flex items-center gap-6 mb-12">
                    <div className="h-px flex-1 bg-zinc-900"></div>
                    <span className="font-mono text-sm text-zinc-300 px-4 py-2 bg-white/5 rounded-full border border-white/10 uppercase">{day.day}</span>
                    <div className="h-px flex-1 bg-zinc-900"></div>
                </div>

                {/* Grid container: two columns on large screens, one on small */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column */}
                    <div className="relative flex-1">
                        <div className="absolute left-[20px] top-4 bottom-8 w-px bg-white/10 overflow-hidden z-0 md:left-[20px]">
                            <div className="shine-line-left absolute left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-[#6366f1] to-transparent" />
                        </div>
                        <div className="flex flex-col gap-6 pl-10">
                            {leftEvents.map((event, i) => (
                                <div key={`l-${i}`} className="relative bg-zinc-900/70 border border-white/10 p-6 rounded-2xl backdrop-blur-xl hover:border-white/40 transition-colors z-10 w-full">
                                    <div className="absolute left-[-24px] top-8 w-2.5 h-2.5 bg-zinc-400 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"></div>
                                    <div className="font-mono text-sm text-zinc-300 mb-2">{event.time}</div>
                                    <div className="font-semibold text-white text-lg">{event.name}</div>
                                    {event.location && <div className="text-sm text-zinc-400 mt-2">{event.location}</div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="relative flex-1 mt-6 md:mt-0">
                        <div className="absolute left-[20px] top-4 bottom-8 w-px bg-white/10 overflow-hidden z-0 md:left-[20px]">
                            <div className="shine-line-right absolute left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-[#6366f1] to-transparent" />
                        </div>
                        <div className="flex flex-col gap-6 pl-10">
                            {rightEvents.map((event, i) => (
                                <div key={`r-${i}`} className="relative bg-zinc-900/70 border border-white/10 p-6 rounded-2xl backdrop-blur-xl hover:border-white/40 transition-colors z-10 w-full">
                                    <div className="absolute left-[-24px] top-8 w-2.5 h-2.5 bg-zinc-400 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"></div>
                                    <div className="font-mono text-sm text-zinc-300 mb-2">{event.time}</div>
                                    <div className="font-semibold text-white text-lg">{event.name}</div>
                                    {event.location && <div className="text-sm text-zinc-400 mt-2">{event.location}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
