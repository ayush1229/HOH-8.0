import React, { useState } from "react";
import faqData from "../data/faq.json";

function CenteredLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono mb-8 rounded-full">
      // {children}
    </div>
  );
}

function FaqItem({ faq, idx, openFaq, setOpenFaq }) {
  const isOpen = openFaq === idx;
  return (
    <div className="faq-item border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden mb-4" 
      onClick={() => setOpenFaq(isOpen ? null : idx)}>
      <div className="flex items-center justify-between p-6 cursor-pointer">
        <h3 className="text-lg font-semibold text-white font-display">{faq.question}</h3>
        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
        </div>
      </div>
      <div className={`faq-answer px-6 ${isOpen ? 'pb-6' : 'h-0'}`} style={{ maxHeight: isOpen ? '500px' : '0px', transition: 'max-height 0.3s ease' }}>
        <p className="text-zinc-400 leading-relaxed text-sm pt-2 border-t border-white/10">{faq.answer}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = faqData?.faqSection?.faqs ?? [];

  return (
    <section id="faq" data-fade className="py-24 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
            <CenteredLabel>FAQ</CenteredLabel>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-display text-white">
            Frequently Asked <span className="text-zinc-400">Questions</span>
            </h2>
            <p className="text-center text-lg text-zinc-400 mb-14 leading-relaxed">
            Get all the answers you need about HOH 8.0.
            </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} idx={i} openFaq={openFaq} setOpenFaq={setOpenFaq} />
          ))}
        </div>

        <div id="contact" className="mt-20 text-center border-t pt-16 border-white/10">
          <h3 className="text-2xl font-bold font-display text-white mb-3">Still have queries?</h3>
          <p className="text-lg text-zinc-400 max-w-md mx-auto leading-relaxed mb-8">
            Connect directly with our core maintainers via community channels for real-time assistance.
          </p>
          <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer"
            className="btn-outline px-8 py-4 rounded-xl text-sm font-bold font-mono inline-flex items-center gap-3">
            JOIN DISCORD
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
