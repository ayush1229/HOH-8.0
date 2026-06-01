import React, { useState } from "react";
import { StickyNavbar } from "./components/Navbar";
import TextType from "./components/TypeText";
import MagicBento from "./components/MagicBento";
import Timeline from "./components/Timeline";
import PrizePool from "./components/PrizePool";
import SpecialAwards from "./components/SpecialAwards";
import sponsorsData from "./data/sponsors.json";
import Accordion, { AccordionItem, AccordionTrigger, AccordionPanel } from "./components/SimpleAccordion";
import faqData from "./data/faq.json";
import PixelSnow from "./components/PixelSnow";

function App() {
  const [snowOpacity, setSnowOpacity] = useState(1);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const windowHeight = window.innerHeight;
    
    // Start fading at 20% of window height, completely invisible by 100% of window height
    const startFade = windowHeight * 0.2;
    const endFade = windowHeight;
    
    if (scrollTop <= startFade) {
      setSnowOpacity(1);
    } else if (scrollTop >= endFade) {
      setSnowOpacity(0);
    } else {
      const opacity = 1 - ((scrollTop - startFade) / (endFade - startFade));
      setSnowOpacity(opacity);
    }
  };

  const infoCards = [
    {
      color: "#FFFFFF",
      title: "Innovation",
      description:
        "Turning ideas into meaningful solutions. We encourage participants to challenge conventional thinking, explore new possibilities, and develop solutions that address real-world problems in impactful ways.",
      label: "Innovation",
    },
    {
      color: "#FFFFFF",
      title: "Creativity",
      description:
        "Thinking beyond the obvious. Great ideas often come from unique perspectives. We aim to foster an environment where imagination, experimentation, and bold thinking are celebrated.",
      label: "Creativity",
    },
    {
      color: "#FFFFFF",
      title: "Collaboration",
      description:
        "Achieving more together. Success is built on teamwork. We bring together individuals from diverse backgrounds and skill sets to learn from one another, share ideas, and create something remarkable.",
      label: "Collaboration",
    },
    {
      color: "#FFFFFF",
      title: "Future",
      description:
        "Building for lasting value. We encourage participants to create projects that extend beyond the event itself—solutions with the potential to inspire, influence, and contribute to a better future.",
      label: "Future",
    },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="relative z-50">
        <StickyNavbar />
      </div>

      <main onScroll={handleScroll} className="relative z-20 h-screen overflow-y-auto scroll-smooth">
        <section id="home" className="flex items-center justify-center px-4 pt-32 pb-0 text-center">
          <TextType className="text-4xl text-black sm:text-5xl md:text-6xl" />
        </section>

        <section id="about" className="flex min-h-screen items-center px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-12">
            <MagicBento
              cards={infoCards}
              textAutoHide={false}
              enableTilt={false}
              enableMagnetism={false}
            />
            <div className="px-2 text-black">
              <h1 className="text-left text-4xl font-bold sm:text-5xl">ABOUT HACK ON HILLS 8.0</h1>
              <p className="mt-5 text-left text-base leading-8 text-black/85 sm:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                eu fugiat nulla pariatur.
              </p>
              <p className="mt-5 text-left text-base leading-8 text-black/85 sm:text-lg">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
                commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
              </p>
              <p className="mt-5 text-left text-base leading-8 text-black/85 sm:text-lg">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
                commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
                commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
                commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
                commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center px-4 py-0 sm:px-6 lg:px-10">
          <Timeline />
        </section>
        <PrizePool />
        <SpecialAwards />

        <section id="sponsors" className="flex min-h-screen items-center px-4 pb-10 pt-24 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-col gap-10 py-10">
              {(() => {
                const categories = sponsorsData?.sponsorsSection?.categories ?? [];
                return categories.map((cat, idx) => (
                  <div key={`tier-${idx}`} className="flex flex-col gap-6">
                    <div className="flex items-center justify-center bg-transparent border border-gray-300 text-black rounded-2xl py-4">
                      <h2 className="text-4xl font-bold">{cat.tier}</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(cat.sponsors || []).map((s, sidx) => (
                        <div
                          key={`s-${idx}-${sidx}`}
                          className="flex items-center justify-center bg-slate-900 border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-slate-500"
                        >
                          <img src={s.image || s.logo} alt={s.name} className="max-h-40 object-contain mx-auto" />
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
            <div id="faq" className="mx-auto w-full max-w-[1000px] text-black py-16">
              <h2 className="text-4xl font-bold mb-6">{faqData?.faqSection?.title ?? 'FAQ'}</h2>
              <p className="text-black/80 mb-8">{faqData?.faqSection?.description}</p>
              <Accordion>
                {(faqData?.faqSection?.faqs ?? []).map((f, i) => (
                  <AccordionItem key={i} value={String(i)}>
                    <AccordionTrigger>{f.question}</AccordionTrigger>
                    <AccordionPanel>{f.answer}</AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none', opacity: snowOpacity, transition: 'opacity 0.1s' }}>
        <PixelSnow 
          color="#e533c8"
          flakeSize={0.005}
          minFlakeSize={1.25}
          pixelResolution={500}
          speed={1.00}
          density={0.19}
          direction={125}
          brightness={1}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="square"
        />
      </div>
    </div>
  );
}

export default App;
