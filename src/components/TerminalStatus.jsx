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
    done:        [],         // indices of fully-revealed lines
    lineIdx:     0,
    typed:       '',
    showOk:      false,
    allDone:     false,
  });

  useEffect(() => {
    let timer;
    // Local mutable state — drives the whole cycle without re-render races
    let charIdx  = 0;
    let lineIdx  = 0;
    let done     = [];

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
      done    = [];
      lineIdx = 0;
      charIdx = 0;
      setState({ done: [], lineIdx: 0, typed: '', showOk: false, allDone: false });
      timer = setTimeout(typeChar, 400);
    }

    timer = setTimeout(typeChar, 600);
    return () => clearTimeout(timer);
  }, []); // ← runs once, never torn down

  const { done, lineIdx, typed, showOk, allDone } = state;

  return (
    <div className="relative bg-zinc-900/70 border border-white/10 rounded-2xl p-10 backdrop-blur-xl overflow-hidden">
      {/* subtle scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{ background: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 4px)' }}
      />

      {/* header */}
      <div className="font-digital text-base text-zinc-300 mb-8 relative z-20 tracking-wider">
        $ system.status --verbose
      </div>

      {/* lines */}
      <div className="space-y-3 font-digital text-xl relative z-20 min-h-[168px]">
        {/* completed lines */}
        {done.map(idx => (
          <div key={idx} className="flex items-center gap-4">
            <span
              className="text-green-400 font-bold shrink-0"
              style={{ textShadow: '0 0 8px #4ade80, 0 0 20px #4ade8055' }}
            >
              [OK]
            </span>
            <span className="text-zinc-100 uppercase tracking-wide">{LINES[idx].text}</span>
            <span className="font-digital text-zinc-400 ml-auto shrink-0">{LINES[idx].version}</span>
          </div>
        ))}

        {/* currently typing line */}
        {!allDone && lineIdx < LINES.length && (
          <div className="flex items-center gap-4">
            <span
              className="font-bold shrink-0 transition-all duration-200"
              style={{
                color: showOk ? '#4ade80' : 'transparent',
                textShadow: showOk ? '0 0 8px #4ade80, 0 0 20px #4ade8055' : 'none',
              }}
            >
              [OK]
            </span>
            <span className="text-zinc-100 uppercase tracking-wide">
              {typed}<span className="animate-pulse opacity-80">_</span>
            </span>
            <span
              className="font-digital text-zinc-400 ml-auto shrink-0 transition-opacity duration-200"
              style={{ opacity: showOk ? 1 : 0 }}
            >
              {LINES[lineIdx].version}
            </span>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="mt-8 pt-8 border-t border-white/10 relative z-20">
        <div className="flex items-center justify-between font-digital text-xl">
          <span className="text-zinc-200 uppercase tracking-widest">System Status</span>

          {allDone ? (
            <span
              className="text-green-400 font-bold uppercase tracking-wide"
              style={{ textShadow: '0 0 10px #4ade80, 0 0 30px #4ade8066, 0 0 60px #4ade8033' }}
            >
              All Systems Operational
            </span>
          ) : (
            <span className="text-yellow-400 uppercase tracking-wide flex items-center gap-1">
              Initializing System<span className="loading-dots" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
