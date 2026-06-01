import DotField from "./components/DotField";
import LiquidEther from "./components/LiquidEther";
import { StickyNavbar } from "./components/Navbar";
import TextType from "./components/TypeText";
import MagicBento from "./components/MagicBento";
import Timeline from "./components/Timeline";
import PrizePool from "./components/PrizePool";
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";
import sponsorsData from "./data/sponsors.json";

function App() {
  const infoCards = [
    {
      color: "#120F17",
      title: "Innovation",
      description:
        "We invite participants to dive beneath the surface, tackle real-world challenges, and craft solutions that don't just follow trends - they set them.",
      label: "Innovation",
    },
    {
      color: "#120F17",
      title: "Creativity",
      description:
        "Like the deep sea brimming with undiscovered wonders, we celebrate fresh perspectives, bold ideas, and the kind of creativity that surprises even yourself.",
      label: "Creativity",
    },
    {
      color: "#120F17",
      title: "Collaboration",
      description:
        "Just as ocean life depends on balance and connection, we believe the best breakthroughs happen when brilliant minds come together, share, and grow.",
      label: "Collaboration",
    },
    {
      color: "#120F17",
      title: "Sustainability",
      description:
        "Our mission goes beyond invention - we aim to harness technology and creativity to protect and preserve the oceans we cherish, ensuring they thrive for generations to come.",
      label: "Sustainability",
    },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <LiquidEther
          className="absolute inset-0 z-0"
          colors={["#2a1750", "#5b2aa0", "#341b57"]}
          autoDemo
        />
        <DotField
          className="absolute inset-0 z-10"
          dotRadius={1}
          dotSpacing={13}
          bulgeStrength={8}
          glowRadius={110}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={350}
          cursorForce={0.44}
          bulgeOnly
          gradientFrom="#9345dd"
          gradientTo="#cb38d4"
          glowColor="#1e1222"
        />
      </div>

      <div className="relative z-50">
        <StickyNavbar />
      </div>

      <main className="snap-container relative z-20 h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <section className="flex min-h-screen snap-start snap-always items-center justify-center px-4 pt-20 text-center">
          <TextType className="text-4xl text-white sm:text-5xl md:text-6xl" />
        </section>

        <section className="flex min-h-screen snap-start snap-always items-center px-4 pb-10 pt-24 sm:px-6 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-12">
            <MagicBento
              cards={infoCards}
              textAutoHide={false}
              enableTilt={false}
              enableMagnetism={false}
            />
            <div className="grid items-start gap-8 px-2 text-white lg:grid-cols-5">
              <div className="lg:col-span-3">
                <h1 className="text-left text-4xl font-bold sm:text-5xl">ABOUT HACK ON HILLS 8.0</h1>
                <p className="mt-5 text-left text-base leading-8 text-white/85 sm:text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                  eu fugiat nulla pariatur.
                </p>
                <p className="mt-5 text-left text-base leading-8 text-white/85 sm:text-lg">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
                  commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white/60">
                  Placeholder Image
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen snap-start snap-always items-center px-4 pb-10 pt-24 sm:px-6 lg:px-10">
          <Timeline />
        </section>
        <PrizePool />

        <section className="flex min-h-screen snap-start snap-always items-center px-4 pb-10 pt-24 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <ScrollStack className="h-screen no-scrollbar" itemDistance={60} itemStackDistance={5} stackPosition="15%" baseScale={0.75} blurAmount={1}>
              {(() => {
                const categories = sponsorsData?.sponsorsSection?.categories ?? [];
                const items = [];
                categories.forEach((cat, idx) => {
                  // Tier title card (purple)
                  items.push(
                    <ScrollStackItem
                      key={`tier-${idx}`}
                      itemClassName="flex items-center justify-center bg-purple-700 text-white"
                    >
                      <h2 className="text-4xl font-bold">{cat.tier}</h2>
                    </ScrollStackItem>
                  );

                  // One card per sponsor image, centered, blue gradient background, glow on hover
                  (cat.sponsors || []).forEach((s, sidx) => {
                    items.push(
                      <ScrollStackItem
                        key={`s-${idx}-${sidx}`}
                        itemClassName="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700"
                      >
                        <div className="flex items-center justify-center w-full h-full">
                          <div className="p-4 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                            <img src={s.image || s.logo} alt={s.name} className="max-h-56 object-contain mx-auto" />
                          </div>
                        </div>
                      </ScrollStackItem>
                    );
                  });
                });
                return items;
              })()}
            </ScrollStack>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
