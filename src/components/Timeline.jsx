import { useEffect, useMemo, useRef, useState } from "react";
import timelineData from "../data/timeline.json";



function Timeline() {
  const schedule = useMemo(() => (timelineData?.schedule || []).slice(0, 3), []);
  const dayButtons = ["Day 1", "Day 2", "Day 3"];
  const scrollRef = useRef(null);
  const eventRefs = useRef([]);
  const switchTimerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const activeDay = schedule[activeIndex] || { events: [] };
  const leavingDay = leavingIndex === null ? null : schedule[leavingIndex];

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    scroller.scrollTop = 0;
    setActiveEventIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) clearTimeout(switchTimerRef.current);
    };
  }, []);

  const updateActiveEvent = () => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const viewport = scroller.getBoundingClientRect();
    const viewportCenter = viewport.top + viewport.height / 2;
    let nextIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    eventRefs.current.forEach((node, index) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(itemCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        nextIndex = index;
      }
    });

    setActiveEventIndex(nextIndex);
  };

  const handleDayChange = nextIndex => {
    if (nextIndex === activeIndex) return;

    if (switchTimerRef.current) clearTimeout(switchTimerRef.current);
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setLeavingIndex(activeIndex);
    setActiveIndex(nextIndex);

    switchTimerRef.current = setTimeout(() => {
      setLeavingIndex(null);
    }, 520);
  };

  const renderEvents = (day, isLeaving = false) => (
    <div
      ref={isLeaving ? null : scrollRef}
      onScroll={isLeaving ? undefined : updateActiveEvent}
      className={`timeline-scroll relative h-[58vh] overflow-y-auto pr-1 ${
        isLeaving ? "pointer-events-none" : "scroll-smooth"
      }`}
    >
      <div className="relative space-y-8 pb-[22vh] pl-12 pt-[12vh] sm:pl-16">

        {day.events.map((event, index) => {
          const distance = Math.abs(index - activeEventIndex);
          const isFocused = !isLeaving && distance === 0;
          const isNearby = !isLeaving && distance === 1;

          return (
            <article
              key={`${event.name}-${index}`}
              ref={node => {
                if (!isLeaving) eventRefs.current[index] = node;
              }}
              className={`group relative w-full max-w-4xl scroll-m-24 transition-all duration-500 ease-out ${
                isFocused
                  ? "scale-100 opacity-100"
                  : isNearby
                    ? "scale-95 opacity-55"
                    : "scale-90 opacity-25"
              } ${isLeaving ? "opacity-0" : ""}`}
            >
              <div
                className={`absolute -left-10 top-3 h-4 w-4 rounded-full bg-gradient-to-br from-cyan-300 to-fuchsia-400 shadow-[0_0_22px_rgba(217,70,239,0.85)] transition-all duration-500 sm:-left-12 ${
                  isFocused ? "scale-150" : "scale-75"
                }`}
              />
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase text-cyan-200/85">{event.time}</p>
                <h3
                  className={`mt-2 font-bold transition-all duration-500 ${
                    isFocused ? "text-3xl text-white sm:text-4xl" : "text-xl text-white/80 sm:text-2xl"
                  }`}
                >
                  {event.name}
                </h3>
                <p className="mt-2 text-base text-fuchsia-100/70">{event.location}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[1400px] px-2 text-white">
      <style>
        {`
          .timeline-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
            mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
          }

          .timeline-scroll::-webkit-scrollbar {
            width: 0;
            height: 0;
            display: none;
          }

          .timeline-tab {
            box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.08), 0 0 28px rgba(56, 189, 248, 0.1);
          }

          .timeline-tab::before,
          .timeline-tab::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 32px;
            pointer-events: none;
          }

          .timeline-tab::before {
            left: 0;
            box-shadow: 12px 0 24px rgba(255, 255, 255, 0.14);
          }

          .timeline-tab::after {
            right: 0;
            box-shadow: -12px 0 24px rgba(255, 255, 255, 0.12);
          }



          @keyframes timeline-in-right {
            from { opacity: 0; transform: translateX(72px); filter: blur(10px); }
            to { opacity: 1; transform: translateX(0); filter: blur(0); }
          }

          @keyframes timeline-in-left {
            from { opacity: 0; transform: translateX(-72px); filter: blur(10px); }
            to { opacity: 1; transform: translateX(0); filter: blur(0); }
          }

          @keyframes timeline-out-left {
            from { opacity: 1; transform: translateX(0); filter: blur(0); }
            to { opacity: 0; transform: translateX(-72px); filter: blur(10px); }
          }

          @keyframes timeline-out-right {
            from { opacity: 1; transform: translateX(0); filter: blur(0); }
            to { opacity: 0; transform: translateX(72px); filter: blur(10px); }
          }

          .timeline-enter-right { animation: timeline-in-right 520ms ease both; }
          .timeline-enter-left { animation: timeline-in-left 520ms ease both; }
          .timeline-leave-left { animation: timeline-out-left 520ms ease both; }
          .timeline-leave-right { animation: timeline-out-right 520ms ease both; }
        `}
      </style>

      <h1 className="text-center text-4xl font-bold sm:text-5xl">Timeline</h1>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {dayButtons.map((label, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={label}
              type="button"
              onClick={() => handleDayChange(index)}
              className={`timeline-tab relative overflow-hidden rounded-md border px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] backdrop-blur-md transition duration-300 sm:text-base ${
                isActive
                  ? "border-cyan-200/60 bg-white/20 text-white"
                  : "border-white/20 bg-white/[0.08] text-white/75 hover:border-fuchsia-200/50 hover:bg-white/[0.14] hover:text-white"
              }`}
            >
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-10 min-h-[58vh] overflow-hidden">
        {leavingDay && (
          <div
            className={`absolute inset-0 ${
              direction > 0 ? "timeline-leave-left" : "timeline-leave-right"
            }`}
          >
            {renderEvents(leavingDay, true)}
          </div>
        )}
        <div
          key={activeIndex}
          className={leavingDay ? (direction > 0 ? "timeline-enter-right" : "timeline-enter-left") : ""}
        >
          {renderEvents(activeDay)}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
