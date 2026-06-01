import React from 'react';
import CardSwap, { Card } from './CardSwap';
import prizeData from '../data/prizepool.json';

const PrizePool = () => {
  const mainPrizes = prizeData?.prizePool?.mainPrizes ?? [];
  const total = prizeData?.prizePool?.totalAmount ?? '';

  return (
    <section className="flex min-h-screen snap-start snap-always items-center px-4 pb-10 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1400px] items-center">
        <div className="w-1/3 pr-8 text-left text-white">
          <h2 className="text-2xl font-bold">PRIZE POOL</h2>
          <h1 className="mt-4 text-4xl font-extrabold">{total}</h1>
        </div>

        <div className="relative w-2/3 h-[520px]">
          <CardSwap width={600} height={460} delay={5000}>
            {mainPrizes.map((p, idx) => {
              const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '';
              return (
                <Card
                  key={idx}
                  customClass="flex items-center justify-center p-6 bg-black/90 border-white/20 text-white rounded-xl"
                >
                  <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
                    <div className="absolute top-4 left-4 text-sm text-white/80 uppercase">{p.position}</div>
                    <div className="flex flex-col items-center">
                      <h1 className="mt-3 text-5xl font-extrabold text-white">{medal} {p.amount}</h1>
                      <h2 className="mt-3 max-w-[320px] text-sm text-white/70">{p.description}</h2>
                    </div>
                  </div>
                </Card>
              );
            })}
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default PrizePool;
