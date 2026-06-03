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

      {/* header — same as original */}
      <div className="font-mono text-sm text-zinc-400 mb-8">$ system.status --verbose</div>

      {/* lines — same font-mono text-sm, space-y-4 as original */}
      <div className="space-y-4 font-mono text-sm">

        {/* completed lines */}
        {done.map(idx => (
          <div key={idx} className="flex items-center gap-4">
            <span className="text-green-500 font-bold" style={{ textShadow: '0 0 6px #22c55e' }}>[OK]</span>
            <span className="text-zinc-400">{LINES[idx].text}</span>
            <span className="text-zinc-500 ml-auto">{LINES[idx].version}</span>
          </div>
        ))}

        {/* current typing line */}
        {!allDone && lineIdx < LINES.length && (
          <div className="flex items-center gap-4">
            <span
              className="font-bold transition-all duration-200"
              style={{
                color: showOk ? '#22c55e' : 'transparent',
                textShadow: showOk ? '0 0 6px #22c55e' : 'none',
              }}
            >
              [OK]
            </span>
            <span className="text-zinc-400">
              {typed}<span className="animate-pulse">_</span>
            </span>
            <span
              className="text-zinc-500 ml-auto transition-opacity duration-200"
              style={{ opacity: showOk ? 1 : 0 }}
            >
              {LINES[lineIdx].version}
            </span>
          </div>
        )}
      </div>

      {/* footer — same as original */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
          <span>System Status</span>

          {allDone ? (
            <span
              className="text-green-400 font-bold"
              style={{ textShadow: '0 0 8px #4ade80, 0 0 20px #4ade8055' }}
            >
              All Systems Operational
            </span>
          ) : (
            <span className="text-yellow-400">
              Initializing System<span className="loading-dots" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
