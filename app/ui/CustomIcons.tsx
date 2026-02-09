"use client";

import { motion} from "motion/react";

// ==========================================
// Types & Shared Constants
// ==========================================
export interface CustomIconsProps {
  onClick?: () => void;
  isOpen?: boolean;
  className?: string;
}

const SLIM_EASING = [0.65, 0, 0.35, 1] as const;


export function NavIcon({ isOpen = false, onClick, className = "" }: CustomIconsProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={`relative grid grid-cols-3 gap-1 p-1.5 rounded-sm cursor-pointer transition-colors duration-700 ease-in-out z-10 
        ${isOpen ? "bg-blue-700 text-white" : "bg-zinc-200 text-zinc-800"} 
        ${className}`}
    >
      {[...Array(9)].map((_, i) => {
        // Logika: komórki parzyste (2, 4, 6, 8) reagują na stan otwarcia
        const isEven = (i + 1) % 2 === 0;

        return (
          <motion.div
            key={i}
            initial={false}
            animate={{
              // Parzyste znikają, nieparzyste zostają
              opacity: isEven && isOpen ? 0 : 1,
              // Nieparzyste obracają się o 360 stopni
              rotate: !isEven && isOpen ? 360 : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.65, 0, 0.35, 1], // SLIM_EASING
            }}
            className="size-1.5 md:size-2 bg-current"
          />
        );
      })}
    </button>
  );
}

// ==========================================
// 2. Carousel Chevrons (Next / Prev)
// ==========================================

const CHEVRON_MORPH_VARIANTS = (direction: number) => ({
  hover: {
    rotate: 360 * direction,
    borderRadius: "100%",
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: SLIM_EASING,
    },
  },
});

export function NextChevron({ onClick, className = "" }: CustomIconsProps) {
  // Indeksy do ukrycia (lewa strona), aby stworzyć kształt >
  // Grid 2x3: [0][1], [2][3], [4][5] -> Ukrywamy 1, 2, 5 (0-based)
  const hiddenIndices = [1, 2, 5];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Next slide"
      whileHover="hover"
      className={`grid grid-cols-2 gap-1 p-1 transition-transform duration-300 hover:scale-110 cursor-pointer text-zinc-800/80 ${className}`}
    >
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            opacity: hiddenIndices.includes(i) ? 0 : 1,
            scale: hiddenIndices.includes(i) ? 0.5 : 1,
          }}
          variants={CHEVRON_MORPH_VARIANTS(1)}
          className="size-2 bg-current"
        />
      ))}
    </motion.button>
  );
}

export function PrevChevron({ onClick, className = "" }: CustomIconsProps) {
  // Indeksy do ukrycia (prawa strona), aby stworzyć kształt <
  // Grid 2x3: [0][1], [2][3], [4][5] -> Ukrywamy 0, 3, 4 (0-based)
  const hiddenIndices = [0, 3, 4];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Previous slide"
      whileHover="hover"
      className={`grid grid-cols-2 gap-1 p-1 transition-transform duration-300 hover:scale-110 cursor-pointer text-zinc-800/80 ${className}`}
    >
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            opacity: hiddenIndices.includes(i) ? 0 : 1,
            scale: hiddenIndices.includes(i) ? 0.5 : 1,
          }}
          variants={CHEVRON_MORPH_VARIANTS(-1)}
          className="size-2 bg-current"
        />
      ))}
    </motion.button>
  );
}

// ==========================================
// 3. UpDownChevron (Accordion)
// ==========================================
export function UpDownChevron({ isOpen = false, className = "" }: CustomIconsProps) {
  // Indeksy zawsze ukryte: 0, 2, 4, 6, 8
  const staticHidden = [0, 2, 4, 6, 8];

  return (
    <div 
      className={`grid grid-cols-3 gap-0.5  text-current ${className}`} 
      aria-hidden="true"
    >
      {[...Array(9)].map((_, i) => {
        const isStaticHidden = staticHidden.includes(i);
        
        // Logika dla animowanego punktu górnego
        if (i === 1) {
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: isOpen ? 0 : 1,
                y: isOpen ? 3 : 0,
              }}
              transition={{ duration: 0.4, ease: SLIM_EASING }}
              className="size-1 md:size-1.5 bg-current"
            />
          );
        }

        // Logika dla animowanego punktu dolnego (pojawia się z góry)
        if (i === 7) {
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : -3,
              }}
              transition={{ duration: 0.4, ease: SLIM_EASING }}
              className="size-1 md:size-1.5 bg-current"
            />
          );
        }

        // Reszta divów (statyczne boki 3, 5 oraz ukryte tło)
        return (
          <motion.div
            key={i}
            initial={false}
            animate={{
              opacity: isStaticHidden ? 0 : 1,
            }}
            className="size-1 md:size-1.5 bg-current"
          />
        );
      })}
    </div>
  );
}


