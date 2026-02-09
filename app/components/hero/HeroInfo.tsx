"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";

const infoVariants: Variants = {
  hidden: { y: "100%" },
  visible: { 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const imgVariants: Variants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

interface HeroInfoProps {
  firstName: string;
  lastName: string;
  imgSrc: string;
}

export default function HeroInfo({ firstName, lastName, imgSrc }: HeroInfoProps) {
  return (
    <div className="relative flex flex-col-reverse justify-center gap-5 md:flex-row md:justify-between">
      <h1 className="font-sansation relative z-10 max-w-fit text-[clamp(4.25rem,2rem+7.5vw,13rem)] font-semibold uppercase leading-none text-neutral-900 pointer-events-none tracking-tighter">
        <span className="block overflow-hidden p-1">
          <motion.span variants={infoVariants} className="block">
            {firstName}
          </motion.span>
        </span>
        <span className="block overflow-hidden p-1">
          <motion.span variants={infoVariants} className="block">
            {lastName}
          </motion.span>
        </span>
      </h1>

      <motion.div
        variants={imgVariants}
        className="relative z-30 shrink-0 h-45 w-45 md:size-55 lg:size-65 rounded-full pointer-events-auto overflow-hidden bg-zinc-200/90"
      >
        <Image 
          src={imgSrc} 
          alt={`${firstName} ${lastName}`}
          fill 
          priority 
          className="object-cover"
          sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
        />
      </motion.div>
    </div>
  );
}