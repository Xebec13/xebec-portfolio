"use client";

import { useState, useEffect, memo } from "react";

const FADE_DURATION = 700;
const TOTAL_CELLS = 100;

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
    <div
      aria-hidden="true"
      /* z-20: Nad tekstem (z-10), ale pod obrazkiem (z-30) i Navbarem (z-50) */
      className="hidden md:grid absolute inset-0 z-20 w-full h-full md:grid-cols-5 lg:grid-cols-10 overflow-hidden pointer-events-auto"
    >
      {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
        <GridCell key={i} />
      ))}
    </div>
  );
}