"use client";

import { useState, useEffect, memo } from "react";
import { motion} from "motion/react";

interface InteractiveGridProps {
  totalCells?: number;
  duration?: number;
  className?: string; 
}



const GridCell = memo(({ duration }: { duration: number }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const timeout = setTimeout(() => setIsActive(false), duration);
    return () => clearTimeout(timeout);
  }, [isActive, duration]);

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      style={{ transitionDuration: `${duration}ms` }}
      className={`
        w-full h-full aspect-square transition-all ease-out
        transform-gpu grow-0 shrink-0 will-change-[backdrop-filter]
        ${isActive ? "backdrop-invert" : "backdrop-invert-0"}
      `}
    />
  );
});

GridCell.displayName = "GridCell";

export default function InteractiveGrid({ 
  totalCells = 10, 
  duration = 700,
  className = "" // Domyślnie pusty string
}: InteractiveGridProps) {
  
  return (
    <motion.div
      aria-hidden="true"
      
      className={`hidden md:grid absolute inset-0 z-20 w-full h-full grid-cols-5 lg:grid-cols-10 overflow-hidden pointer-events-auto ${className}`}
    >
      {Array.from({ length: totalCells }).map((_, i) => (
        <GridCell key={i} duration={duration} />
      ))}
    </motion.div>
  );
}