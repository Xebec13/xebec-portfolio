"use client";

import { useState, useRef, useEffect } from "react";
import { motion, HTMLMotionProps, TargetAndTransition } from "motion/react";

// ==========================================
// Types & Shared Constants
// ==========================================
export interface CustomIconsProps {
  onClick?: () => void;
  isOpen?: boolean;
  className?: string;
}

const SLIM_EASING = [0.65, 0, 0.35, 1] as const;

interface GridCellProps extends HTMLMotionProps<"div"> {
  isVisible?: boolean;
}

/**
 * Pomocniczy komponent dla komórek siatki.
 * Bezpiecznie łączy bazowy stan animacji (widoczność) z opcjonalnymi propsami.
 */
const GridCell = ({ isVisible = true, animate, className, ...props }: GridCellProps) => {
  const baseState = isVisible 
    ? { opacity: 1, scale: 1 } 
    : { opacity: 0, scale: 0.5 };

  // Sprawdzamy, czy animate jest obiektem (TargetAndTransition), aby bezpiecznie wykonać spread
  const mergedAnimate: TargetAndTransition | string | string[] | boolean = 
    typeof animate === "object" && animate !== null && !Array.isArray(animate)
      ? { ...baseState, ...(animate as TargetAndTransition) }
      : (animate as TargetAndTransition | string | string[] | boolean) || baseState;

  return (
    <motion.div
      {...props}
      initial={false}
      animate={mergedAnimate}
      className={`border-2 md:border-3 border-current ${className || ""}`}
    />
  );
};

// ==========================================
// 1. NavIcon (Hamburger Menu) - WERSJA ZREFAKTOROWANA 1:1 Z CSS
// ==========================================
// ==========================================
// 1. NavIcon (Hamburger Menu) - Korzysta z GridCell
// ==========================================
export function NavIcon({ isOpen = false, onClick, className = "" }: CustomIconsProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={`relative grid grid-cols-3 gap-1.5 p-1.5 rounded-sm cursor-pointer transition-colors duration-700 ease-in-out z-10 
        ${isOpen ? "bg-blue-700" : "bg-inherit"} 
        ${className}`}
    >
      {[...Array(9)].map((_, i) => {
        const isEven = (i + 1) % 2 === 0;

        return (
          <GridCell
            key={i}
            className="size-2 bg-zinc-900"
            // Parzyste: znika (isVisible=false) gdy menu otwarte
            // Nieparzyste: zawsze widoczne (isVisible=true)
            isVisible={isEven ? !isOpen : true}
            // Nieparzyste: obracają się gdy menu otwarte
            animate={{ 
              rotate: !isEven && isOpen ? 360 : 0 
            }}
            transition={{ 
              duration: 0.7, 
              ease: "easeInOut" 
            }}
          />
        );
      })}
    </button>
  );
}

// ==========================================
// 2. Carousel Chevrons (Next / Prev)
// ==========================================
const CHEVRON_HOVER: TargetAndTransition = {
  rotate: [0, 180, 360],
  borderRadius: ["0%", "50%", "100%"],
};

export function NextChevron({ onClick, className = "" }: CustomIconsProps) {
  const hiddenIndices = [1, 2, 5];
  return (
    <button onClick={onClick} className={`grid grid-cols-2 gap-1 p-1 group cursor-pointer ${className}`}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          whileHover={CHEVRON_HOVER}
          transition={{ repeat: Infinity, duration: 1 }}
          className={`size-3 border-2 border-zinc-400 ${hiddenIndices.includes(i) ? "opacity-0" : "opacity-100"}`}
        />
      ))}
    </button>
  );
}

export function PrevChevron({ onClick, className = "" }: CustomIconsProps) {
  const hiddenIndices = [0, 3, 4];
  return (
    <button onClick={onClick} className={`grid grid-cols-2 gap-1 p-1 group cursor-pointer ${className}`}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          whileHover={CHEVRON_HOVER}
          transition={{ repeat: Infinity, duration: 1 }}
          className={`size-3 border-2 border-zinc-400 ${hiddenIndices.includes(i) ? "opacity-0" : "opacity-100"}`}
        />
      ))}
    </button>
  );
}

// ==========================================
// 3. UpDownChevron (Accordion)
// ==========================================
export function UpDownChevron({ isOpen = false, className = "" }: CustomIconsProps) {
  const hiddenIndices = [0, 2, 3, 5];
  return (
    <div className={`grid grid-cols-3 gap-1 pt-1.5 ${className}`} aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: hiddenIndices.includes(i) ? 0 : 1,
            y: isOpen && i === 1 ? -7 : 0,
          }}
          transition={{ duration: 0.7, ease: SLIM_EASING }}
          className="size-2 border-2 border-current"
        />
      ))}
    </div>
  );
}

// ==========================================
// 4. Back Chevrons
// ==========================================
const BACK_ARROW_INDICES = [0, 2, 4, 5, 6, 8];

export function BackChevron({ onClick, className = "" }: CustomIconsProps) {
  return (
    <button onClick={onClick} className={`group cursor-pointer ${className}`}>
      <div className="grid grid-cols-3 gap-1 p-1 transition-colors duration-500 rounded-full hover:bg-zinc-400">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`size-2 border-2 border-blue-900/80 ${BACK_ARROW_INDICES.includes(i) ? "opacity-0" : "opacity-100"}`}
          />
        ))}
      </div>
    </button>
  );
}

export function FooterBackChevron({ onClick, className = "" }: CustomIconsProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-5 left-5 grid grid-cols-3 gap-1 p-1 cursor-pointer transition-colors duration-500 rounded-full hover:bg-zinc-400 ${className}`}
    >
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className={`size-2 border-2 border-zinc-100 ${BACK_ARROW_INDICES.includes(i) ? "opacity-0" : "opacity-100"}`}
        />
      ))}
    </button>
  );
}

// ==========================================
// 5. CodingIcon (</>)
// ==========================================
export function CodingIcon({ onClick, className = "" }: CustomIconsProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      className={`flex items-center gap-3 cursor-pointer text-blue-900/80 group ${className}`}
    >
      <div className="grid grid-cols-3 gap-1">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            variants={{ hover: { x: -3 } }}
            className={`size-2 border-2 border-current ${![0, 2, 4, 5, 6, 8].includes(i) ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-1 -rotate-12 group-hover:rotate-0 transition-transform">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            variants={{ hover: { opacity: [1, 0, 1], transition: { delay: i * 0.1, repeat: Infinity } } }}
            className="size-2 border-2 border-current"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            variants={{ hover: { x: 3 } }}
            className={`size-2 border-2 border-current ${![0, 2, 3, 4, 6, 8].includes(i) ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ==========================================
// 6. ProfIcon (Briefcase)
// ==========================================
export function ProfIcon({ onClick, className = "" }: CustomIconsProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      className={`relative size-8 grid grid-cols-4 gap-0.5 cursor-pointer ${className}`}
    >
      {[...Array(16)].map((_, i) => {
        const isHandle = [1, 2].includes(i);
        const isHidden = [0, 3].includes(i);
        const isKeyhole = [9, 10].includes(i);
        return (
          <motion.div
            key={i}
            variants={{
              hover: {
                y: isHandle ? -3 : 0,
                backgroundColor: isHandle || isKeyhole ? "#1e3a8a" : "rgba(30, 58, 138, 0.1)",
                scale: isKeyhole ? 0.9 : 1,
              },
            }}
            className={`border-2 border-blue-900/80 ${isHidden ? "opacity-0" : "opacity-100"}`}
          />
        );
      })}
    </motion.div>
  );
}

// ==========================================
// 7. CertIcon (Lock)
// ==========================================
export function CertIcon({ onClick, className = "" }: CustomIconsProps) {
  return (
    <motion.div onClick={onClick} whileHover="hover" className={`flex flex-col items-center justify-center cursor-pointer ${className}`}>
      <motion.div
        variants={{ hover: { rotateY: 180, y: [0, 5, 0] } }}
        transition={{ duration: 0.6, ease: SLIM_EASING }}
        style={{ transformOrigin: "bottom right", transformStyle: "preserve-3d" }}
        className="w-3 h-2 border-[2.5px] border-b-0 border-blue-900/80 rounded-t-full"
      />
      <div className="grid grid-cols-3 gap-1 p-0.5">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            variants={{ hover: { scaleY: [1, 0.9, 1] } }}
            className={`size-2 border-2 border-blue-900/80 ${i === 4 ? "opacity-0" : "opacity-100"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ==========================================
// 8. PersonalIcon (Face)
// ==========================================
export function PersonalIcon({ onClick, className = "" }: CustomIconsProps) {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const faceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!faceRef.current) return;
      const rect = faceRef.current.getBoundingClientRect();
      const angle = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2));
      const dist = Math.min(3, Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2)) / 15);
      setPupilPos({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hiddenSmileCells = [0, 4, 6, 7, 8, 11, 12, 13, 15, 19];
  return (
    <div ref={faceRef} onClick={onClick} className={`relative size-10 cursor-pointer ${className}`}>
      <div className="grid grid-cols-5 gap-1">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`size-1.5 border-2 border-blue-900/80 ${hiddenSmileCells.includes(i) ? "opacity-0" : "opacity-100"}`} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center gap-2 -translate-y-2">
        {[0, 1].map((i) => (
          <div key={i} className="size-3 bg-white border border-blue-900/80 rounded-full overflow-hidden flex items-center justify-center">
            <motion.div animate={{ x: pupilPos.x, y: pupilPos.y }} transition={{ type: "spring", stiffness: 150, damping: 15 }} className="size-1.5 bg-blue-900 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}