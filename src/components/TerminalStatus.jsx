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
    <div className="bg-zinc-900/70 border border-white/10 rounded-2xl p-10 backdrop-blur-xl">

      {/* header */}
      <div className="font-nostalgia text-sm text-zinc-400 mb-8">$ system.status --verbose</div>

      {/* Lines — full text is ALWAYS in the DOM so height never changes.
          Typing is just a color transition: chars flip transparent → visible. */}
      <div className="space-y-4 font-nostalgia text-sm">
        {LINES.map((line, idx) => {
          const revealed = revealedChars[idx];
          const ok       = showOk[idx];

          return (
            <div key={idx} className="flex items-start gap-4" style={{ opacity: revealed > 0 || ok ? 1 : 0 }}>

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

              {/* Full text always rendered — chars beyond 'revealed' are just invisible */}
              <span className="text-zinc-400 flex-1 min-w-0">
                {line.text.split('').map((ch, ci) => (
                  <span key={ci} style={{ color: ci < revealed ? undefined : 'transparent' }}>
                    {ch}
                  </span>
                ))}
                {/* blinking cursor while typing */}
                {!ok && revealed > 0 && revealed < line.text.length && (
                  <span className="animate-pulse" style={{ color: '#71717a' }}>_</span>
                )}
              </span>

              {/* version number */}
              <span
                className="text-zinc-500 shrink-0 transition-opacity duration-200"
                style={{ opacity: ok ? 1 : 0 }}
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
