import React, { useState, useEffect } from 'react';

const LINES = [
  { text: "Autonomous agents deployed",          version: "v2.4.1" },
  { text: "Decentralized intelligence active",   version: "v1.8.0" },
  { text: "Multi-agent orchestration ready",     version: "v3.0.2" },
  { text: "Agentic frameworks loaded",           version: "v4.1.0" },
  { text: "Collaboration protocols initialized", version: "v1.2.5" },
];

export default function TerminalStatus() {
  const [state, setState] = useState({
    done:    [],
    lineIdx: 0,
    typed:   '',
    showOk:  false,
    allDone: false,
  });

  useEffect(() => {
    let timer;
    let charIdx = 0;
    let lineIdx = 0;
    let done    = [];

    function typeChar() {
      const full = LINES[lineIdx].text;
      if (charIdx < full.length) {
        charIdx++;
        setState(s => ({ ...s, typed: full.slice(0, charIdx) }));
        timer = setTimeout(typeChar, 32);
      } else {
        timer = setTimeout(revealOk, 220);
      }
    }

    function revealOk() {
      setState(s => ({ ...s, showOk: true }));
      timer = setTimeout(advance, 420);
    }

    function advance() {
      done = [...done, lineIdx];
      lineIdx++;
      if (lineIdx >= LINES.length) {
        setState({ done, lineIdx, typed: '', showOk: false, allDone: true });
        timer = setTimeout(reset, 2200);
      } else {
        charIdx = 0;
        setState({ done, lineIdx, typed: '', showOk: false, allDone: false });
        timer = setTimeout(typeChar, 160);
      }
    }

    function reset() {
      done = []; lineIdx = 0; charIdx = 0;
      setState({ done: [], lineIdx: 0, typed: '', showOk: false, allDone: false });
      timer = setTimeout(typeChar, 400);
    }

    timer = setTimeout(typeChar, 600);
    return () => clearTimeout(timer);
  }, []);

  const { done, lineIdx, typed, showOk, allDone } = state;

  return (
    /* Exact same container as the original static screen */
    <div className="bg-zinc-900/70 border border-white/10 rounded-2xl p-10 backdrop-blur-xl">

      {/* header */}
      <div className="font-nostalgia text-sm text-zinc-400 mb-8">$ system.status --verbose</div>

      {/* lines — always render all 5 to keep height fixed */}
      <div className="space-y-4 font-nostalgia text-sm">
        {LINES.map((line, idx) => {
          const isCompleted = done.includes(idx);
          const isCurrent   = !allDone && idx === lineIdx;
          const isFuture    = !isCompleted && !isCurrent;

          return (
            <div key={idx} className="flex items-center gap-4 overflow-hidden" style={{ opacity: isFuture ? 0 : 1 }}>
              <span
                className="font-bold transition-all duration-200 shrink-0"
                style={{
                  color: isCompleted || (isCurrent && showOk) ? '#22c55e' : 'transparent',
                  textShadow: isCompleted || (isCurrent && showOk) ? '0 0 6px #22c55e' : 'none',
                }}
              >
                [OK]
              </span>
              {/* min-w-0 + whitespace-nowrap = clips at boundary, never wraps */}
              <span className="text-zinc-400 min-w-0 overflow-hidden whitespace-nowrap flex-1">
                {isCompleted ? line.text : isCurrent ? <>{typed}<span className="animate-pulse">_</span></> : line.text}
              </span>
              <span
                className="text-zinc-500 ml-auto transition-opacity duration-200 shrink-0"
                style={{ opacity: isCompleted || (isCurrent && showOk) ? 1 : 0 }}
              >
                {line.version}
              </span>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-zinc-400 font-nostalgia">
          <span className="shrink-0">System Status</span>

          {allDone ? (
            <span
              className="text-green-400 font-bold shrink-0"
              style={{ textShadow: '0 0 4px #4ade8088' }}
            >
              All Systems Operational
            </span>
          ) : (
            <span className="text-yellow-400 shrink-0">
              Initializing System<span className="loading-dots" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
