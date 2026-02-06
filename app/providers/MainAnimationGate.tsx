"use client";

import { motion } from "motion/react";
import { useIntro } from "./intro-provider";

export function MainAnimationGate({ children }: { children: React.ReactNode }) {
  const { introFinished } = useIntro();

  return (
    <motion.div
      initial="hidden"
      animate={introFinished ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}