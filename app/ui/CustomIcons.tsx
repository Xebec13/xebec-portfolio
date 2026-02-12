"use client";

import { motion,useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

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


// 5. General Back Button
export function BackChevron({ onClick, className = "" }: CustomIconsProps) {
  // Indeksy tworzące strzałkę <
  const visibleCells = [1, 3, 7];

  return (
    <button
      onClick={onClick}
      aria-label="Go back"
      className="group cursor-pointer shrink-0"
    >
      <div
        className={`
          grid grid-cols-3 gap-0.5 p-1 
          transition-all duration-500 ease-in-out
          [&>div]:size-1  
          ${className}
        `}
      >
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`
              border-2 border-inherit transition-opacity bg-current
              ${!visibleCells.includes(i) ? "opacity-0" : "opacity-100"}
            `}
          />
        ))}
      </div>
    </button>
  );
}

const BRACKET_LEFT_MAP = [1, 3, 7];
const BRACKET_RIGHT_MAP = [1, 5, 7];

export function CodingIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 shrink-0 ${className}`}>
      {/* LEWY NAWIAS < */}
      <motion.div
        variants={{
          initial: { x: 5 },
          hover: { x: 0 }
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid grid-cols-3 gap-0.5 p-1"
      >
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`size-1.5 border-2 border-inherit bg-current transition-opacity ${
              BRACKET_LEFT_MAP.includes(i) ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </motion.div>

      {/* SLASH / */}
      <motion.div
        variants={{
          initial: { rotate: 25, scale: 1 },
          hover: { rotate: 0, scale: 0.9 }
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex flex-col gap-0.5 p-1"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={{
              initial: { opacity: 1 },
              hover: { 
                opacity: [1, 0, 1],
                transition: { 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: (5 - i) * 0.1 
                }
              }
            }}
            className="size-1.5 border-2 border-inherit bg-current"
          />
        ))}
      </motion.div>

      {/* PRAWY NAWIAS > */}
      <motion.div
        variants={{
          initial: { x: -5 },
          hover: { x: 0 }
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid grid-cols-3 gap-0.5 p-1"
      >
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`size-1.5 border-2 border-inherit bg-current transition-opacity ${
              BRACKET_RIGHT_MAP.includes(i) ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
}

// 8. Professional Icon (Lock / Briefcase structure)
export function ProfIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center p-1 ${className}`}>
      <div className="grid grid-cols-4 gap-0.5">
        {[...Array(16)].map((_, i) => {
          // Logika podziału elementów walizki
          const isHidden = i === 0 || i === 3;
          const isHandle = i === 1 || i === 2;
          const isLock = i === 9 || i === 10; // Środek walizki

          return (
            <motion.div
              key={i}
              variants={{
                initial: { 
                  y: 0, 
                  opacity: isHidden ? 0 : 1,
                  scale: 1,
                  
                },
                hover: {
                  // Rączka idzie do góry (-4px), reszta zostaje (0)
                  y: isHandle ? -4 : 0, 
                  // Zamek lekko się kurczy, imitując mechanizm
                  scale: isLock ? 0.85 : 1,
                  // Jeśli odkomentowałeś backgroundColor wyżej, tu daj: "currentColor"
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 20,
                    delay: isHandle ? 0 : i * 0.02 // Delikatny stagger dla korpusu
                  }
                }
              }}
              className={`
                size-1.5 border-2 border-inherit bg-current
            
                ${i === 1 ? "rounded-tl-sm" : ""}
                ${i === 2 ? "rounded-tr-sm" : ""}
                
                ${i === 12 ? "rounded-bl-xs" : ""}
                ${i === 15 ? "rounded-br-xs" : ""}
              `}
            />
          );
        })}
      </div>
    </div>
  );
}

// 9. Certificate Icon (Lock)
export function CertIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center cursor-pointer p-1 ${className}`}>
      
      {/* --- SHACKLE (Ucho kłódki) --- */}
      <motion.div
        variants={{
          initial: { y: 0, rotateY: 0 },
          hover: {
            // Sekwencja: 
            // 1. Dół (3px) - symulacja wciśnięcia
            // 2. Góra (-6px) + Obrót (180deg) - otwarcie
            y: [0, 3, -6],
            rotateY: [0, 0, 180], 
            transition: {
              duration: 0.8,
              // Times definiuje momenty w czasie (0%, 40%, 100%)
              times: [0, 0.4, 1], 
              ease: "easeInOut" // Lub [0.68, -0.55, 0.265, 1.55] dla efektu bounce
            }
          }
        }}
        // Punkt obrotu: Prawy dolny róg (jak zawias)
        className="w-3 h-2.5 border-[2.5px] border-b-0 border-inherit rounded-t-full origin-bottom-right"
      />

      {/* --- BODY (Korpus 3x3) --- */}
      <motion.div
        variants={{
          initial: { scaleY: 1 },
          hover: {
            // Sekwencja: Zgniecenie (0.9) gdy ucho idzie w dół, powrót (1) gdy wyskakuje
            scaleY: [1, 0.9, 1],
            transition: {
              duration: 0.8,
              times: [0, 0.4, 1],
              ease: "easeInOut"
            }
          }
        }}
        className="grid grid-cols-3 gap-0.5 p-0.5"
      >
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`
              size-1.5 border-2 border-inherit 
              ${i === 4 ? "border-transparent bg-transparent" : "bg-current"}
            `}
          />
        ))}
      </motion.div>
    </div>
  );
}
// ==========================================
// 10. Personal Icon (Interactive Face)
export function PersonalIcon({ className = "" }: { className?: string }) {
  const faceRef = useRef<HTMLDivElement>(null);

  // 1. Motion Values: Zmienne, które nie powodują re-renderu komponentu
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Sprężystość: Dzięki temu ruch gałek będzie płynny i naturalny
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    // Funkcja obliczająca pozycję
    const handleMouseMove = (e: MouseEvent) => {
      if (!faceRef.current) return;

      // Szukamy przycisku-rodzica (klasa .group z AboutBox)
      const parentButton = faceRef.current.closest(".group");
      if (!parentButton) return;

      const btnRect = parentButton.getBoundingClientRect();
      
      // Sprawdzamy, czy myszka jest nad przyciskiem
      const isHovering =
        e.clientX >= btnRect.left &&
        e.clientX <= btnRect.right &&
        e.clientY >= btnRect.top &&
        e.clientY <= btnRect.bottom;

      if (isHovering) {
        // Obliczamy środek twarzy
        const faceRect = faceRef.current.getBoundingClientRect();
        const centerX = faceRect.left + faceRect.width / 2;
        const centerY = faceRect.top + faceRect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Matematyka kątów (dokładnie Twoja logika)
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(2.5, Math.hypot(deltaX, deltaY) / 8); // Max przesunięcie 2.5px

        // Aktualizujemy MotionValues (bez re-renderu Reacta!)
        x.set(Math.cos(angle) * distance);
        y.set(Math.sin(angle) * distance);
      } else {
        // Reset do środka
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  // Mapa kratek do ukrycia (rogi + miejsce na oczy/usta)
  // Grid 5x4 = 20 kratek (0-19)
  const HIDDEN_INDICES = [
    0, 4,              // Rogi góra
    6, 7, 8,           // Oczy
    11, 12, 13,        // Nos/Środek
    15, 19             // Rogi dół
  ];

  return (
    <div
      ref={faceRef}
      className={`relative flex items-center justify-center size-10 ${className}`}
      aria-label="Personal interests"
    >
      {/* --- GRID (Twarz) --- */}
      <div className="grid grid-cols-5 gap-2 size-full">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`
              size-1 border-2 border-inherit bg-current transition-opacity
              ${HIDDEN_INDICES.includes(i) ? "opacity-0" : "opacity-100"}
            `}
          />
        ))}
      </div>

      {/* --- EYES & MOUTH Container --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center  pointer-events-none">
        
        {/* OCZY */}
        <div className="flex gap-1 ml-0.5 mb-1.5">
          {/* Lewe Oko */}
          <div className="relative size-2.5 bg-blue-100 border-2 border-inherit rounded-full flex items-center justify-center overflow-hidden">
            <motion.div
              style={{ x: springX, y: springY }}
              className="size-1 bg-blue-900 rounded-full "
            />
          </div>
          {/* Prawe Oko */}
          <div className="relative size-2.5 bg-blue-100 border-2 border-inherit rounded-full flex items-center justify-center overflow-hidden">
            <motion.div
              style={{ x: springX, y: springY }}
              className="size-1 bg-blue-900 rounded-full "
            />
          </div>
        </div>
        <div className="ml-0.5 w-4 h-1 border-b-2 border-inherit rounded-full opacity-80" />
      </div>
    </div>
  );
}