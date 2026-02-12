"use client";

import { motion} from "motion/react";
import { useEffect, useRef, useState } from "react";

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
      className={`relative grid grid-cols-3 gap-1 p-1.5 rounded-sm cursor-pointer ${className}`}>
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
            className="size-1 md:size-1.5 lg:size-2 bg-current"
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
      className={`grid grid-cols-2 gap-1 p-1 transition-transform duration-300 hover:scale-110 cursor-pointer text-inherit ${className}`}
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
          className="size-1 md:size-1.5 bg-current"
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
      className={`grid grid-cols-2 gap-1 p-1 transition-transform duration-300 hover:scale-110 cursor-pointer text-inherit ${className}`}
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
          className="size-1 md:size-1.5 bg-current"
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
              className="size-1 md:size-1.3 bg-current"
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
              className="size-1 md:size-1.3 bg-current"
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
            className="size-1 md:size-1.3 bg-current"
          />
        );
      })}
    </div>
  );
}


// 5. General Back Button (Modal/Navigation)
export function BackChevron({ onClick,className="", }: CustomIconsProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Go back"
      className="cursor-pointer"
    >
      <div className={`grid grid-cols-3 p-1 gap-1 cursor-pointer ${className}`}>
        {[...Array(9)].map((_, i) => (
          <div key={i} className="border-2 border-inherit" />
        ))}
      </div>
    </button>
  );
}

// 6. Footer Specific Action (Scroll to Top / Close Contact)
export function FooterBackChevron({ onClick }: CustomIconsProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Scroll to top"
      // Positioned absolutely within the footer/modal context
      className="chevron-footer-back absolute top-5 left-5 grid grid-cols-3 gap-1 p-1 cursor-pointer bg-transparent transition-colors ease-in-out duration-700 hover:bg-zinc-400"
    >
      {[...Array(9)].map((_, i) => (
        <div key={i} className="border-2" />
      ))}
    </button>
  );
}

// 7. Coding Icon (</>) - Composite of 3 grids
export function CodingIcon({ onClick }: CustomIconsProps) {
  return (
    <div
      onClick={onClick}
      className="group flex items-center gap-3 cursor-pointer"
      aria-label="Code symbol"
    >
      {/* Left Bracket (<) - 2x3 Grid */}
      <div className="grid grid-cols-3 gap-1">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="border-inherit border-2" />
        ))}
      </div>

      {/* Slash (/) - 3x3 Grid */}
      <div className="grid grid-cols-1 gap-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border-inherit border-2" />
        ))}
      </div>

      {/* Right Bracket (>) - 2x3 Grid */}
      <div className="grid grid-cols-3 gap-1">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="border-inherit border-2" />
        ))}
      </div>
    </div>
  );
}

// 8. Professional Icon (Lock / Briefcase structure)
export function ProfIcon({ onClick }: CustomIconsProps) {
  return (
    <div
      onClick={onClick}
      aria-label="Professional skills"
      className="group relative flex items-center justify-center cursor-pointer size-8"
    >
      {/* 
        Grid 4 columns x 4 rows = 16 cells.
        Using gap-1 to ensure it fits well within the size-9 container.
      */}
      <div className="relative size-full grid grid-cols-4 gap-0.5">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="border-2 border-inherit"
          />
        ))}
      </div>
    </div>
  );
}

// 9. Certificate Icon (Lock)
export function CertIcon({ onClick }: CustomIconsProps) {
  return (
    <div
      onClick={onClick}
      aria-label="Professional skills"
      className="cert-icon gruop flex flex-col items-center justify-center cursor-pointer"
    >

      <div className="lock-icon w-3 h-2 border-[2.5px] border-b-0 border-inherit rounded-t-full" />

      {/* THE BODY (Lock Body - 3x3 Grid) */}
      <div className="grid grid-cols-3 gap-1 p-0.5">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="border-2 border-inherit"
          />
        ))}
      </div>
    </div>
  );

}
// ==========================================
// 10. Personal Icon (Interactive Face)
// ==========================================
export function PersonalIcon({ onClick }: CustomIconsProps) {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const faceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // 1. Ensure we have the face reference
      if (!faceRef.current) return;

      // 2. Find the parent button (with 'group' class)
      // This avoids changing parent code!
      const parentButton = faceRef.current.closest('.eye-ref');

      if (!parentButton) return;

      // 3. Check if mouse is hovering the button
      const btnRect = parentButton.getBoundingClientRect();
      const isHoveringButton =
        e.clientX >= btnRect.left &&
        e.clientX <= btnRect.right &&
        e.clientY >= btnRect.top &&
        e.clientY <= btnRect.bottom;

      // 4. If hovering button -> Move eyes
      if (isHoveringButton) {
        // --- Eye position logic (relative to face center, not button) ---
        const faceRect = faceRef.current.getBoundingClientRect();
        const faceCenterX = faceRect.left + faceRect.width / 2;
        const faceCenterY = faceRect.top + faceRect.height / 2;

        const deltaX = e.clientX - faceCenterX;
        const deltaY = e.clientY - faceCenterY;

        const angle = Math.atan2(deltaY, deltaX);
        // Distance: Limit movement to 3px (radius inside the eye white)
        const distance = Math.min(3, Math.hypot(deltaX, deltaY) / 8);

        setPupilPos({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        });
      } else {
        // 5. If mouse leaves button -> Reset eyes
        setPupilPos({ x: 0, y: 0 });
      }
    };

    // Attach listener to window
    window.addEventListener("mousemove", handleGlobalMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []); // Empty dependency array = runs once on mount

  return (
    <div
      ref={faceRef}
      onClick={onClick}
      // Removed onMouseMove/onMouseLeave here, handled by useEffect
      aria-label="Personal interests"
      className="personal-icon group relative flex items-center justify-center cursor-pointer size-9"
    >

      <div className="smile-icon right-0.5 relative size-full grid grid-cols-5 gap-2">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="border-2 bg-inherit"
          />
        ))}
      </div>


      {/* EYES */}
      <div className="absolute top-[25%] w-full flex justify-center gap-1.5 px-1">
        {/* Left */}
        <div className="relative size-2.5 bg-white border border-inherit rounded-full flex items-center justify-center overflow-hidden">
          <div
            className="w-1 h-1 bg-blue-500 rounded-full transition-transform duration-100 ease-out"
            style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
          />
        </div>
        {/* Right */}
        <div className="relative size-2.5 bg-white border border-inherit rounded-full flex items-center justify-center overflow-hidden">
          <div
            className="w-1 h-1 bg-blue-500 rounded-full transition-transform duration-100 ease-out"
            style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
          />
        </div>
        <div className="absolute -bottom-2.5 h-0.5 w-1/3 bg-inherit rounded-full"/>
      </div>
    </div>


  );
}