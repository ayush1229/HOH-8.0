import React, { useState, useEffect } from 'react';

const linesData = [
  { text: "Autonomous agents deployed", version: "v2.4.1" },
  { text: "Decentralized intelligence active", version: "v1.8.0" },
  { text: "Multi-agent orchestration ready", version: "v3.0.2" },
  { text: "Agentic frameworks loaded", version: "v4.1.0" },
  { text: "Collaboration protocols initialized", version: "v1.2.5" },
];

export default function TerminalStatus() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showStatus, setShowStatus] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) {
      const timer = setTimeout(() => {
        setFinished(false);
        setCurrentLineIndex(0);
        setTypingText('');
        setIsTyping(true);
        setShowStatus(false);
      }, 2000); // stay 2s before restart
      return () => clearTimeout(timer);
    }

    if (currentLineIndex >= linesData.length) {
      setFinished(true);
      return;
    }

    const currentFullText = linesData[currentLineIndex].text;

    if (isTyping) {
      if (typingText.length < currentFullText.length) {
        const timeout = setTimeout(() => {
          setTypingText(currentFullText.slice(0, typingText.length + 1));
        }, 30); // typing speed
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setShowStatus(true);
        }, 200); // wait before showing OK
        return () => clearTimeout(timeout);
      }
    } else {
      if (showStatus) {
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setTypingText('');
          setIsTyping(true);
          setShowStatus(false);
        }, 400); // wait before next line
        return () => clearTimeout(timeout);
      }
    }
  }, [currentLineIndex, typingText, isTyping, showStatus, finished]);

  return (
    <div className="relative bg-[#050505] border border-white/20 rounded-2xl p-8 overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.1)]">
      {/* Screen scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-10"></div>
      
      <div className="font-digital text-sm text-zinc-300 mb-6 tracking-wide relative z-20">$ system.status --verbose</div>
      
      <div className="space-y-3 font-digital text-lg relative z-20 min-h-[160px]">
        {/* Render previous completed lines */}
        {linesData.slice(0, currentLineIndex).map((line, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className="text-green-400 font-bold drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]">[OK]</span>
            <span className="text-zinc-100 uppercase">{line.text}</span>
            <span className="text-zinc-400 ml-auto">{line.version}</span>
          </div>
        ))}
        
        {/* Render current typing line */}
        {!finished && currentLineIndex < linesData.length && (
          <div className="flex items-center gap-4">
            <span className={`font-bold w-[35px] ${showStatus ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]' : 'text-transparent'}`}>
              [OK]
            </span>
            <span className="text-zinc-100 uppercase">
              {typingText}
              <span className="animate-pulse">_</span>
            </span>
            <span className={`text-zinc-400 ml-auto transition-opacity duration-300 ${showStatus ? 'opacity-100' : 'opacity-0'}`}>
              {linesData[currentLineIndex].version}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-white/20 relative z-20">
        <div className="flex items-center justify-between text-lg font-digital">
          <span className="text-zinc-200 uppercase">System Status</span>
          
          {finished ? (
            <span className="text-green-400 font-bold drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] uppercase">All Systems Operational</span>
          ) : (
            <span className="text-yellow-400 uppercase flex items-center">
              Initializing System<span className="loading-dots ml-1"></span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
