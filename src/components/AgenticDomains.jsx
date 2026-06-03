import React from 'react';

const AgenticDomains = () => {
    return (
        <section id="tracks" className="py-40 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24 reveal">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono mb-8 rounded-full">
                        // TRACKS
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 font-display text-readable">
                        Agentic <span className="text-zinc-400">Domains</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Specialized tracks for autonomous system deployment</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger" id="tracks-grid">
                    <div className="card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group hover:border-white/40 transition-colors">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-xl group-hover:bg-white/10 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            </div>
                            <span className="text-xs text-zinc-300 font-mono">TRACK 01</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">AI & Agentic Systems</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-6">Build autonomous agents that can perceive, reason, and act independently. From LLM-powered assistants to multi-agent orchestration systems.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">LLMs</span>
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">RAG</span>
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">Multi-Agent</span>
                        </div>
                    </div>

                    <div className="card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group hover:border-white/40 transition-colors">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-xl group-hover:bg-white/10 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                            </div>
                            <span className="text-xs text-zinc-300 font-mono">TRACK 02</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">Blockchain & Web3</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-6">Decentralized applications, smart contracts, DeFi protocols, and blockchain-based autonomous organizations. Build infrastructure for agent-to-agent transactions.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">DeFi</span>
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">DAO</span>
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">Smart Contracts</span>
                        </div>
                    </div>

                    <div className="card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group hover:border-white/40 transition-colors">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-xl group-hover:bg-white/10 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                            <span className="text-xs text-zinc-300 font-mono">TRACK 03</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">Sustainability & Green Tech</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-6">AI-driven solutions for environmental challenges. Build agents that optimize energy consumption, monitor ecosystems, and drive sustainable practices.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">IoT</span>
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">Energy</span>
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">Climate</span>
                        </div>
                    </div>

                    <div className="card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group hover:border-white/40 transition-colors">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-xl group-hover:bg-white/10 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                            </div>
                            <span className="text-xs text-zinc-300 font-mono">TRACK 04</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">Open Innovation</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-6">No boundaries, no limits. Build whatever your imagination conjures. The most unconventional, creative, and out-of-the-box solutions find their home here.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">Creative</span>
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">Experimental</span>
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">Wildcard</span>
                        </div>
                    </div>

                    <div className="card-3d bg-zinc-900/70 border border-white/10 p-10 rounded-2xl backdrop-blur-xl group hover:border-white/40 transition-colors md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-xl group-hover:bg-white/10 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                            </div>
                            <span className="text-xs text-zinc-300 font-mono">TRACK 05</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">Cybersecurity</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-6">Autonomous security agents, threat detection systems, and AI-powered defense mechanisms. Build the immune system for the digital world.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">Threat Detection</span>
                            <span className="px-4 py-2 bg-white/5 text-zinc-500 text-xs rounded-lg font-mono border border-white/5">Zero Trust</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AgenticDomains;
