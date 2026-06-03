import React, { useEffect, useState } from "react";

function Loader() {
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Hide loader after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      // Wait for opacity transition before hiding entirely
      setTimeout(() => setHide(true), 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div className={`loader ${!loading ? "hidden" : ""}`}>
      <div className="font-mono text-sm text-zinc-400 mb-6 tracking-widest text-center px-4">
        INITIALIZING NEURAL NETWORK
      </div>
      <div className="relative w-64 h-px bg-zinc-900 mx-auto">
        <div
          className="absolute inset-y-0 left-0 bg-white"
          style={{ width: "0%", animation: "loadBar 2s ease-in-out forwards" }}
        ></div>
      </div>
      <div className="mt-4 font-mono text-xs text-zinc-500 text-center px-4">
        Loading agents...
      </div>
    </div>
  );
}

export default Loader;
