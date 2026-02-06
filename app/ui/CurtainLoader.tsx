"use client";

import { useState, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../providers/language-provider";
import { useIntro } from "../providers/intro-provider"; 
import { Language } from "../constants/portfolio";
import IntroButtons from "./IntroButtons";

const SLIM_EASING = [0.65, 0, 0.35, 1] as const;
const DURATION = 1.8;

export default function CurtainLoader({ children }: { children: React.ReactNode }) {
  const { setIntroFinished } = useIntro();
  const { setLanguage } = useLanguage();
  const [showLoader, setShowLoader] = useState(true);

  const initialPath = "M 0,0 L 1,0 L 1,1 Q 0.5,1 0,1 Z";
  const targetPath = "M 0,0 L 1,0 L 1,0.8 Q 0.5,0.7 0,0.8 Z";

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setShowLoader(false);
  };

  return (
    <>
      <AnimatePresence onExitComplete={() => setIntroFinished(true)}>
        {showLoader && (
          <motion.div
            key="curtain-container"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: DURATION, ease: SLIM_EASING }}
            className="fixed inset-0 z-9999 bg-neutral-950 flex items-center justify-center"
            style={{ clipPath: "url(#curtain-mask)" }}
          >
            <svg className="absolute w-0 h-0 pointer-events-none">
              <defs>
                <clipPath id="curtain-mask" clipPathUnits="objectBoundingBox">
                  <motion.path
                    initial={{ d: initialPath }}
                    exit={{ d: targetPath }}
                    transition={{ duration: DURATION, ease: SLIM_EASING }}
                  />
                </clipPath>
              </defs>
            </svg>

            {/* Kontener przycisków z własną animacją zanikania */}
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <IntroButtons onSelect={handleLanguageSelect} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full">
        {children}
      </main>
    </>
  );
}