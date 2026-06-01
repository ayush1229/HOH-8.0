import { useState } from "react";
import timelineData from "../data/timeline.json";

const DAY_LABELS = ["FRIDAY", "SATURDAY", "SUNDAY"];

function EventRow({ event, isActive }) {
  return (
    <div
      className={`flex gap-4 px-5 py-3 rounded-sm transition-colors duration-200 ${
        isActive
          ? "bg-white/5 border border-[#00e5ff]/30"
          : "hover:bg-white/[0.03]"
      }`}
    >
      {/* Time */}
      <span
        className="text-xs font-semibold shrink-0 mt-0.5 w-10 text-right"
        style={{ color: "#00e5ff", fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}
      >
        {event.time?.split(" ")[0] ?? event.time}
      </span>

      {/* Name + location */}
      <div className="flex flex-col min-w-0">
        <span className={`text-sm font-medium leading-snug ${isActive ? "text-white" : "text-white/85"}`}>
          {isActive && <span className="mr-1.5 text-[#00e5ff] text-xs">&lt;/&gt;</span>}
          {event.name}
        </span>
        {event.location && (
          <span className="mt-0.5 flex items-center gap-1 text-[10px] text-white/30">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            {event.location}
          </span>
        )}
      </div>
    </div>
  );
}

function DayCard({ day, label, activeEventIndex }) {
  return (
    <div
      className="flex flex-col rounded-sm overflow-hidden"
      style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {day.day.charAt(0).toUpperCase() + day.day.slice(1).toLowerCase()}
        </h3>
        <span className="border border-white/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50">
          {label}
        </span>
      </div>

      {/* Separator */}
      <div className="mx-5 mb-4 h-px bg-white/10" />

      {/* Events */}
      <div className="flex flex-col gap-0.5 pb-5">
        {day.events.map((event, i) => (
          <EventRow key={i} event={event} isActive={i === activeEventIndex} />
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  const schedule = timelineData?.schedule || [];
  const [activeIndex, setActiveIndex] = useState(0);

  // Pick a "current" event to highlight per day (e.g. index 1 on day 1)
  const activeEventIndex = 1;

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h2
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ color: "#00e5ff" }}
        >
          Timeline
        </h2>
        <p className="text-sm text-white/35 max-w-sm mx-auto leading-relaxed">
          The synchronized schedule for autonomous agents and human developers.
          Strict adherence to chronological execution is advised.
        </p>
      </div>

      {/* Desktop: 3 columns */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {schedule.map((day, di) => (
          <DayCard
            key={di}
            day={day}
            label={DAY_LABELS[di] ?? `DAY ${di}`}
            activeEventIndex={di === 1 ? activeEventIndex : -1}
          />
        ))}
      </div>

      {/* Mobile: tab selector + single card */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Day tabs */}
        <div className="flex gap-2 justify-center">
          {schedule.map((day, di) => (
            <button
              key={di}
              type="button"
              onClick={() => setActiveIndex(di)}
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest border transition-all duration-200"
              style={
                activeIndex === di
                  ? { background: "#00e5ff", color: "#000", borderColor: "#00e5ff" }
                  : { background: "transparent", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.15)" }
              }
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Active day card */}
        <DayCard
          day={schedule[activeIndex]}
          label={DAY_LABELS[activeIndex] ?? `DAY ${activeIndex}`}
          activeEventIndex={activeIndex === 1 ? activeEventIndex : -1}
        />
      </div>
    </div>
  );
}

export default Timeline;
