import React from "react";

function CenteredLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono mb-8 rounded-full">
      // {children}
    </div>
  );
}

function Register() {
  return (
    <section id="register" className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900/10"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <div className="reveal">
                <CenteredLabel>REGISTER</CenteredLabel>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-12 font-display">
                    Join The<br/>
                    <span className="text-zinc-400">Revolution</span>
                </h2>
                <p className="text-zinc-300 text-2xl mb-16 max-w-3xl mx-auto">
                    The Age of Autonomous Agents is here. Are you ready to build the future where AI does not just assist, it acts?
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                    <a href="https://devfolio.co" target="_blank" rel="noreferrer" className="btn-primary px-12 py-6 rounded-2xl text-xl font-semibold inline-flex items-center gap-4 font-mono magnetic">
                        <span>Register Now</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                    <a href="mailto:contact@hackonhills.com" className="btn-outline px-12 py-6 rounded-2xl text-xl font-semibold text-zinc-500 inline-flex items-center gap-4 font-mono magnetic">
                        <span>Contact Us</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Register;
