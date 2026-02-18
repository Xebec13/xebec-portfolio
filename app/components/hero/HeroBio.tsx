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
  bio: string; 
}

export default function HeroBio({ role, bio }: HeroBioProps) {
  return (
    <div className="flex flex-col gap-5 items-start md:flex-row md:justify-between pointer-events-none">
      <div className="flex items-center ml-2 font-semibold overflow-hidden">
        <motion.p variants={bioVariants} className="text-[clamp(1rem,1rem+1.5vw,3rem)]">
          {role}
        </motion.p>
      </div>

      <div className="shrink-0 max-w-full md:max-w-1/2 indent-12 font-medium text-justify whitespace-pre-line leading-none overflow-hidden">
        <motion.p variants={bioVariants} className="text-[clamp(1rem,1rem+1.5vw,3rem)]">
          {bio}
        </motion.p>
      </div>
    </div>
  );
}