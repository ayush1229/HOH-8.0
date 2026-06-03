import React, { useEffect, useRef } from "react";

export default function FloatingAgents({
  mouseStrength = 25,
  agents = [
    {
      type: "agent",
      name: "Codex",
      status: "Processing query...",
      color: "#10b981",
      x: "12%",
      y: "25%",
      depth: 0.02,
    },
    {
      type: "agent",
      name: "Gemini",
      status: "Multi-modal reasoning...",
      color: "#4e8ef7",
      x: "75%",
      y: "22%",
      depth: 0.04,
    },
    {
      type: "code",
      code: "await brain.think()",
      x: "22%",
      y: "68%",
      depth: 0.03,
    },
    {
      type: "code",
      code: "agent.execute(task)",
      x: "72%",
      y: "65%",
      depth: 0.05,
    },
    {
      type: "agent",
      name: "Claude",
      status: "Planning actions...",
      color: "#ff6b6b",
      x: "85%",
      y: "50%",
      depth: 0.025,
    },
    {
      type: "agent",
      name: "Copilot",
      status: "Generating code...",
      color: "#a855f7",
      x: "18%",
      y: "85%",
      depth: 0.035,
    },
    {
      type: "agent",
      name: "Devin",
      status: "Resolving issues...",
      color: "#f59e0b",
      x: "82%",
      y: "82%",
      depth: 0.045,
    },
  ],
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".agent-card");

    const handleMouseMove = (e) => {
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;

      cards.forEach((card) => {
        const depth = Number(card.dataset.depth);

        const x = mx * mouseStrength * depth * 100;
        const y = my * mouseStrength * depth * 100;

        card.style.transform =
          `translate3d(${x}px, ${y}px, 0px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseStrength]);

  return (
    <>
      <style>{`
        .agent-container {
          position:absolute;
          inset:0;
          overflow:hidden;
          pointer-events:none;
        }

        .agent-card {
          position:absolute;
          backdrop-filter:blur(6px);
          background:rgba(255,255,255,0.005);
          border:1px solid rgba(255,255,255,0.015);
          border-radius:18px;
          padding:14px 18px;
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            border-color .25s ease;
          pointer-events:auto;
          cursor:pointer;
          will-change:transform;
        }

        .agent-card:hover {
          border-color:rgba(0,229,255,0.5);
          background:rgba(0,229,255,0.02);
          box-shadow:
            0 0 30px rgba(0,229,255,.35),
            0 0 60px rgba(0,229,255,.15);
        }

        .agent-info {
          display:flex;
          align-items:center;
          gap:12px;
        }

        .agent-dot {
          width:10px;
          height:10px;
          border-radius:50%;
          flex-shrink:0;
        }

        .agent-name {
          color:white;
          font-size:14px;
          font-weight:600;
        }

        .agent-status {
          color:#94a3b8;
          font-size:12px;
          margin-top:2px;
        }

        .loading-dots {
          display: inline-block;
          width: 12px;
          text-align: left;
        }

        .loading-dots::after {
          content: '';
          animation: loadingDots 1.5s infinite;
        }
        
        @keyframes loadingDots {
          0% { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
        }

        .code-card {
          color:#00e5ff;
          font-size:13px;
          font-family:monospace;
          white-space:nowrap;
        }

        .float1 { animation: float1 9s ease-in-out infinite; }
        .float2 { animation: float2 12s ease-in-out infinite; }
        .float3 { animation: float3 8s ease-in-out infinite; }
        .float4 { animation: float4 10s ease-in-out infinite; }
        .float5 { animation: float5 11s ease-in-out infinite; }
        .float6 { animation: float2 9.5s ease-in-out infinite reverse; }
        .float7 { animation: float1 13s ease-in-out infinite reverse; }
        .float8 { animation: float3 10.5s ease-in-out infinite reverse; }

        @keyframes float1 {
          0%,100% { translate:0 0; }
          50% { translate:0 -22px; }
        }

        @keyframes float2 {
          0%,100% { translate:0 0; }
          25% { translate:10px -12px; }
          75% { translate:-10px -24px; }
        }

        @keyframes float3 {
          0%,100% { translate:0 0; }
          50% { translate:-16px -20px; }
        }

        @keyframes float4 {
          0%,100% { translate:0 0; }
          50% { translate:16px -16px; }
        }

        @keyframes float5 {
          0%,100% { translate:0 0; }
          50% { translate:12px -30px; }
        }
      `}</style>

      <div
        ref={containerRef}
        className="agent-container hidden md:block"
      >
        {agents.map((agent, i) => (
          <div
            key={i}
            className={`agent-card float${(i % 8) + 1}`}
            data-depth={agent.depth || 0.03}
            style={{
              left: agent.x,
              top: agent.y,
            }}
          >
            {agent.type === "code" ? (
              <div className="code-card">
                {agent.code}
              </div>
            ) : (
              <div className="agent-info">
                <div
                  className="agent-dot"
                  style={{
                    background: agent.color,
                    boxShadow: "0 0 12px " + agent.color,
                  }}
                />

                <div>
                  <div className="agent-name">
                    {agent.name}
                  </div>

                  <div className="agent-status">
                    {agent.status.replace('...', '')}
                    {agent.status.includes('...') && <span className="loading-dots" />}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}