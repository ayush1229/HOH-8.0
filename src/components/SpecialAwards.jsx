import React, { useRef } from "react";
import { motion } from "motion/react";
import { Leaf, Users, Rocket, Link, Cpu, Award } from "lucide-react";
import prizeData from "../data/prizepool.json";

// Icon mapping based on category names
const getCategoryConfig = (category) => {
  const normalized = category.toLowerCase();
  
  if (normalized.includes("sustainability") || normalized.includes("environment")) {
    return {
      icon: Leaf,
      colorClass: "text-emerald-400",
      glowColor: "rgba(52, 211, 153, 0.4)",
      radialColor: "rgba(52, 211, 153, 0.15)",
      bgGlow: "shadow-[0_0_40px_rgba(52,211,153,0.15)]",
      gradient: "from-emerald-400 to-teal-300",
      borderHover: "hover:border-emerald-500/50",
    };
  }
  
  if (normalized.includes("girls") || normalized.includes("women") || normalized.includes("female")) {
    return {
      icon: Users,
      colorClass: "text-pink-400",
      glowColor: "rgba(244, 114, 182, 0.4)",
      radialColor: "rgba(244, 114, 182, 0.15)",
      bgGlow: "shadow-[0_0_40px_rgba(244,114,182,0.15)]",
      gradient: "from-pink-400 to-fuchsia-300",
      borderHover: "hover:border-pink-500/50",
    };
  }
  
  if (normalized.includes("beginner") || normalized.includes("freshman") || normalized.includes("novice")) {
    return {
      icon: Rocket,
      colorClass: "text-cyan-400",
      glowColor: "rgba(34, 211, 238, 0.4)",
      radialColor: "rgba(34, 211, 238, 0.15)",
      bgGlow: "shadow-[0_0_40px_rgba(34,211,238,0.15)]",
      gradient: "from-cyan-400 to-blue-400",
      borderHover: "hover:border-cyan-500/50",
    };
  }
  
  if (normalized.includes("web3") || normalized.includes("crypto") || normalized.includes("blockchain")) {
    return {
      icon: Link,
      colorClass: "text-purple-400",
      glowColor: "rgba(192, 132, 252, 0.4)",
      radialColor: "rgba(192, 132, 252, 0.15)",
      bgGlow: "shadow-[0_0_40px_rgba(192,132,252,0.15)]",
      gradient: "from-purple-400 to-indigo-400",
      borderHover: "hover:border-purple-500/50",
    };
  }
  
  if (normalized.includes("ai") || normalized.includes("agent") || normalized.includes("intelligence") || normalized.includes("ml")) {
    return {
      icon: Cpu,
      colorClass: "text-amber-400",
      glowColor: "rgba(251, 191, 36, 0.4)",
      radialColor: "rgba(251, 191, 36, 0.15)",
      bgGlow: "shadow-[0_0_40px_rgba(251,191,36,0.15)]",
      gradient: "from-amber-400 to-orange-400",
      borderHover: "hover:border-amber-500/50",
    };
  }

  // Fallback config
  return {
    icon: Award,
    colorClass: "text-fuchsia-400",
    glowColor: "rgba(224, 73, 243, 0.4)",
    radialColor: "rgba(224, 73, 243, 0.15)",
    bgGlow: "shadow-[0_0_40px_rgba(224,73,243,0.15)]",
    gradient: "from-fuchsia-400 to-pink-400",
    borderHover: "hover:border-fuchsia-500/50",
  };
};

// Card Component with mouse-move interactive glow
const AwardCard = ({ award, index }) => {
  const config = getCategoryConfig(award.category);
  const IconComponent = config.icon;
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // Asymmetric spanning sizes for desktop grid (2 in top row, 3 in bottom row)
  const gridSpanClass = index < 2 ? "md:col-span-3" : "md:col-span-2";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-3xl border border-black/10 bg-black/[0.02] transition-all duration-300 ${config.borderHover} ${config.bgGlow} ${gridSpanClass}`}
    >
      {/* Spotlight Hover Glow Layer (Desktop only/mouse devices) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${config.radialColor}, transparent 80%)`,
        }}
      />

      {/* Mobile Layout (Horizontal Row) */}
      <div className="flex w-full items-center justify-between p-4 px-6 md:hidden">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.03] ${config.colorClass}`}>
            <IconComponent size={20} />
          </div>
          <span className="text-left text-sm font-semibold text-black/90">{award.category}</span>
        </div>
        <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-lg font-bold text-transparent`}>
          {award.amount}
        </span>
      </div>

      {/* Desktop/Tablet Layout (Vertical Card) */}
      <div className="hidden flex-col items-center justify-between p-8 min-h-[220px] text-center md:flex h-full">
        {/* Glow effect matching the theme at the top */}
        <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.03] transition-transform duration-500 group-hover:scale-110 ${config.colorClass}`}>
          <div
            className="absolute inset-0 rounded-2xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40"
            style={{ backgroundColor: config.glowColor }}
          />
          <IconComponent size={28} className="relative z-10" />
        </div>

        <div className="mt-4 flex flex-col justify-center flex-grow">
          <h3 className="text-xl font-bold tracking-tight text-black/90 group-hover:text-black transition-colors duration-300">
            {award.category}
          </h3>
        </div>

        <div className="mt-4">
          <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-3xl font-extrabold text-transparent tracking-wide`}>
            {award.amount}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const SpecialAwards = () => {
  const awards = prizeData?.prizePool?.specialAwards ?? [];

  return (
    <section className="flex min-h-screen items-center justify-center px-4 pb-12 pt-28 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
        
        {/* Header Block */}
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-purple-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl"
          >
            SPECIAL AWARDS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-sm text-black/70 sm:text-base"
          >
            Rewarding extraordinary projects, technical ingenuity, and diverse team achievements across distinct track criteria.
          </motion.p>
        </div>

        {/* Asymmetric Cards Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 sm:px-4 md:px-0">
          {awards.map((award, index) => (
            <AwardCard key={award.category} award={award} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SpecialAwards;
