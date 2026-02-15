"use client";

import { motion, Variants } from "motion/react";

const bioVariants: Variants = {
  hidden: { y: "150%" },
  visible: { 
    y: 0, 
    transition: { duration: 0.65, ease: "easeOut" } 
  }
};

interface HeroBioProps {
  role: string;
  bio: string; // Nowy prop zamiast pobierania z contextu
}

export default function HeroBio({ role, bio }: HeroBioProps) {
  return (
    <div className="relative z-10 flex flex-col gap-5 items-start md:flex-row md:justify-between pointer-events-none">
      <div className="flex items-center p-3 font-semibold overflow-hidden">
        <motion.p variants={bioVariants} className="text-xl md:text-2xl lg:text-3xl">
          {role}
        </motion.p>
      </div>

      <div className="shrink-0 text-[clamp(1.5rem,1rem+1.5vw,3rem)] indent-12 max-w-full md:max-w-1/2 font-medium text-justify leading-none overflow-hidden">
        <motion.p variants={bioVariants} className="whitespace-pre-line p-1.5">
          {bio}
        </motion.p>
      </div>
    </div>
  );
}