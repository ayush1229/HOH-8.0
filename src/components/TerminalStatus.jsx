import React, { useState, useEffect } from 'react';

const LINES = [
  { text: "Autonomous agents deployed",          version: "v2.4.1" },
  { text: "Decentralized intelligence active",   version: "v1.8.0" },
  { text: "Multi-agent orchestration ready",     version: "v3.0.2" },
  { text: "Agentic frameworks loaded",           version: "v4.1.0" },
  { text: "Collaboration protocols initialized", version: "v1.2.5" },
];

export default function TerminalStatus() {
  // revealedChars[i] = how many chars of line i are visible
  const [revealedChars, setRevealedChars] = useState(LINES.map(() => 0));
  const [showOk,        setShowOk]        = useState(LINES.map(() => false));
  const [allDone,       setAllDone]       = useState(false);

  useEffect(() => {
    let timer;
    let lineIdx = 0;
    let charIdx = 0;
    // Local mutable copies — no stale-closure issues
    let localRevealed = LINES.map(() => 0);
    let localShowOk   = LINES.map(() => false);

    function typeChar() {
      const full = LINES[lineIdx].text;
      if (charIdx < full.length) {
        charIdx++;
        localRevealed = localRevealed.map((v, i) => i === lineIdx ? charIdx : v);
        setRevealedChars([...localRevealed]);
        timer = setTimeout(typeChar, 32);
      } else {
        timer = setTimeout(revealOk, 220);
      }
    }

    function revealOk() {
      localShowOk = localShowOk.map((v, i) => i === lineIdx ? true : v);
      setShowOk([...localShowOk]);
      timer = setTimeout(advance, 420);
    }

    function advance() {
      lineIdx++;
      charIdx = 0;
      if (lineIdx >= LINES.length) {
        setAllDone(true);
        timer = setTimeout(reset, 2200);
      } else {
        timer = setTimeout(typeChar, 160);
      }
    }

    function reset() {
      lineIdx = 0; charIdx = 0;
      localRevealed = LINES.map(() => 0);
      localShowOk   = LINES.map(() => false);
      setRevealedChars([...localRevealed]);
      setShowOk([...localShowOk]);
      setAllDone(false);
      timer = setTimeout(typeChar, 400);
    }

    timer = setTimeout(typeChar, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-zinc-900/70 border border-white/10 rounded-2xl p-6 sm:p-10 backdrop-blur-xl min-h-[460px] flex flex-col justify-between">

      {/* header */}
      <div className="font-nostalgia text-sm text-zinc-400 mb-8">$ system.status --verbose</div>

      {/* Lines — each row uses CSS grid overlap.
          The invisible ghost row sets the permanent height & width.
          The animated row sits on top — no reflow ever. */}
      <div className="space-y-4 font-nostalgia text-sm flex-1">
        {LINES.map((line, idx) => {
          const revealed = revealedChars[idx];
          const ok       = showOk[idx];

          return (
            <div
              key={idx}
              className="grid"
              style={{ opacity: revealed > 0 || ok ? 1 : 0 }}
            >
              {/* ── Ghost row: always full-width, invisible, locks dimensions ── */}
              <div className="col-start-1 row-start-1 flex items-start gap-4 invisible pointer-events-none select-none">
                <span className="font-bold shrink-0">[OK]</span>
                <span className="flex-1 min-w-0">{line.text}</span>
                <span className="text-zinc-500 shrink-0">{line.version}</span>
              </div>

              {/* ── Live row: overlays the ghost, never changes character count ── */}
              <div className="col-start-1 row-start-1 flex items-start gap-4">
                {/* [OK] badge */}
                <span
                  className="font-bold shrink-0 transition-all duration-200"
                  style={{
                    color:      ok ? '#22c55e' : 'transparent',
                    textShadow: ok ? '0 0 6px #22c55e' : 'none',
                  }}
                >
                  [OK]
                </span>

                {/* Text: every character always rendered, just color-revealed */}
                <span className="text-zinc-400 flex-1 min-w-0">
                  {line.text.split('').map((ch, ci) => (
                    <span
                      key={ci}
                      style={{ color: ci < revealed ? undefined : 'transparent' }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>

                {/* Version */}
                <span
                  className="text-zinc-500 shrink-0 transition-opacity duration-200"
                  style={{ opacity: ok ? 1 : 0 }}
                >
                  {line.version}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-nostalgia">
          <span className="text-zinc-400 shrink-0">System Status</span>
          
          <div className="grid">
            {/* Invisible placeholder for maximum width and height */}
            <span className="col-start-1 row-start-1 invisible font-bold pointer-events-none">
              All Systems Operational
            </span>
            
            {/* Success state */}
            <span
              className={`col-start-1 row-start-1 flex items-center justify-end transition-opacity duration-300 ${allDone ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className="text-green-400 font-bold" style={{ textShadow: '0 0 4px #4ade8088' }}>
                All Systems Operational
              </span>
            </span>
            
            {/* Loading state */}
            <span
              className={`col-start-1 row-start-1 flex items-center justify-end transition-opacity duration-300 ${!allDone ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className="text-yellow-400 shrink-0">
                Initializing System<span className="loading-dots" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
