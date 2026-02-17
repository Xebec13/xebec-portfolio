"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Language } from "@/app/constants/portfolio";
import { useLanguage } from "@/app/providers/language-provider";

interface IntroButtonsProps {
  onSelect: (lang: Language) => void;
}

export default function IntroButtons({ onSelect }: IntroButtonsProps) {
  const { language } = useLanguage();
  const [hovered, setHovered] = useState<Language | null>(null);

  const activeDisplay = hovered ?? language ?? "en";

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold opacity-70">
        Choose Language
      </span>

      <div
        className="relative flex items-center bg-zinc-900/50 rounded-full p-1 w-48 h-12 backdrop-blur-sm shadow-inner cursor-pointer border border-zinc-800/50"
        onMouseLeave={() => setHovered("en")}
      >
        {/* Animated Slider */}
        <motion.div
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-zinc-100 rounded-full shadow-md pointer-events-none"
          animate={{
            x: activeDisplay === "pl" ? "0%" : "100%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        <button
          onMouseEnter={() => setHovered("pl")}
          onClick={() => onSelect("pl")}
          className={`relative z-10 w-1/2 text-center text-xs font-bold uppercase tracking-widest transition-colors duration-300 outline-none cursor-pointer ${
            activeDisplay === "pl" ? "text-neutral-900" : "text-zinc-500"
          }`}
        >
          pl
        </button>

        <button
          onMouseEnter={() => setHovered("en")}
          onClick={() => onSelect("en")}
          className={`relative z-10 w-1/2 text-center text-xs font-bold uppercase tracking-widest transition-colors duration-300 outline-none cursor-pointer ${
            activeDisplay === "en" ? "text-neutral-900" : "text-zinc-500"
          }`}
        >
          en
        </button>
      </div>
    </div>
  );
}