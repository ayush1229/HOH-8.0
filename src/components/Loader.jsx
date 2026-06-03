import React, { useEffect, useState } from "react";

function Loader() {
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setHide(true), 900);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#020204",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: loading ? 1 : 0,
        visibility: loading ? "visible" : "hidden",
        transition: "opacity 0.9s ease, visibility 0.9s ease",
        pointerEvents: loading ? "all" : "none",
      }}
    >
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#71717a", marginBottom: "24px", letterSpacing: "0.3em", textAlign: "center" }}>
        INITIALIZING NEURAL NETWORK
      </div>
      <div style={{ position: "relative", width: "256px", height: "1px", background: "#18181b" }}>
        <div
          style={{
            position: "absolute",
            top: 0, bottom: 0, left: 0,
            background: "#ffffff",
            animation: "loadBar 2.2s ease-in-out forwards",
          }}
        />
      </div>
      <div style={{ marginTop: "16px", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#52525b", textAlign: "center" }}>
        Loading agents...
      </div>
      <style>{`
        @keyframes loadBar {
          0%   { width: 0%; }
          50%  { width: 60%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default Loader;
