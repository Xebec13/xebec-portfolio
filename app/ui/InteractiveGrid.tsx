"use client";

import { useState, useEffect, memo } from "react";
import { motion, Variants } from "motion/react"; // Dodajemy motion i Variants

const FADE_DURATION = 700;
const TOTAL_CELLS = 100;

// Warianty dla wejścia całego gridu
const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 1, 
      delay: 0.2, // To jest Twoje opóźnienie względem tekstów Hero
      ease: "easeOut" 
    } 
  }
};

const GridCell = memo(() => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const timeout = setTimeout(() => setIsActive(false), FADE_DURATION);
    return () => clearTimeout(timeout);
  }, [isActive]);

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      className={`
        w-full aspect-square transition-all duration-700 ease-out
        transform-gpu grow-0 shrink-0 will-change-[backdrop-filter]
        ${isActive ? "backdrop-invert" : "backdrop-invert-0"}
      `}
    />
  );
});

GridCell.displayName = "GridCell";

export default function InteractiveGrid() {
  return (
    <motion.div
      aria-hidden="true"
      /* Podpinamy warianty - teraz grid "poczeka" na sygnał z MainAnimationGate */
      variants={gridVariants}
      className="hidden md:grid absolute inset-0 z-20 w-full h-full md:grid-cols-5 lg:grid-cols-10 overflow-hidden pointer-events-auto"
    >
      {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
        <GridCell key={i} />
      ))}
    </motion.div>
  );
}