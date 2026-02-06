"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import InteractiveGrid from "../../ui/InteractiveGrid";
import { useIntro } from "../../providers/intro-provider";
import { useLanguage } from "../../providers/language-provider";
import { GLOBAL } from "../../constants/portfolio";

const h1Variants: Variants = {
  hidden: { y: "150%" },
  visible: { y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const contentVariants: Variants = {
  hidden: { y: "150%" },
  visible: { y: 0, transition: { duration: 0.65, ease: "easeOut" } }
};

const imageVariants: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.65, ease: "easeOut" } }
};

export default function Hero() {
  const { introFinished } = useIntro();
  const { t } = useLanguage();
  const [firstName, lastName] = useMemo(() => GLOBAL.name.split(" "), []);

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-start md:justify-evenly px-10 py-20 md:px-20 md:py-25 overflow-hidden">
      
      {/* Oryginalny Grid na z-20 */}
      <InteractiveGrid />

      {/* Górna część: Imię i Zdjęcie */}
      <div className="relative flex flex-col-reverse justify-center gap-5 md:flex-row md:justify-between">
        
        {/* H1 Clamp: zmienione z 11vw na bezpieczniejszą formułę (2rem bazy + 7.5vw) */}
        <div className="relative z-10 max-w-fit text-[clamp(4.25rem,2rem+7.5vw,13rem)] font-semibold uppercase leading-none text-neutral-900 pointer-events-none">
          <div className="overflow-hidden p-1">
            <motion.h1 initial="hidden" animate={introFinished ? "visible" : "hidden"} variants={h1Variants}>{firstName}</motion.h1>
          </div>
          <div className="overflow-hidden p-1">
            <motion.h1 initial="hidden" animate={introFinished ? "visible" : "hidden"} variants={h1Variants}>{lastName}</motion.h1>
          </div>
        </div>

        <motion.div 
          initial="hidden" animate={introFinished ? "visible" : "hidden"} variants={imageVariants}
          className="relative z-20 shrink-0 size-45 md:size-60 lg:size-70 rounded-full pointer-events-auto overflow-hidden bg-zinc-200/90"
        >
          <Image 
            src="/portfolio-img.png" 
            alt={GLOBAL.name} 
            fill 
            priority 
            className="object-cover"
            sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
          />
        </motion.div>
      </div>

      {/* Dolna część: Role i Bio */}
      <div className="relative z-10 flex flex-col gap-5 items-start md:flex-row md:justify-between pointer-events-none">
        <div className="shrink-0  flex items-center p-3 font-semibold">
          <div className="overflow-hidden">
            {/* Przywrócona Twoja oryginalna stylizacja roli */}
            <motion.p initial="hidden" animate={introFinished ? "visible" : "hidden"} variants={contentVariants} className="text-xl md:text-2xl lg:text-3xl">
              {GLOBAL.role}
            </motion.p>
          </div>
        </div>

        {/* Bio Clamp: zmienione z 2.75vw na formułę (1rem bazy + 1.5vw) */}
        <div className="text-[clamp(1.2rem,1rem+1.5vw,3rem)] indent-12 max-w-full md:max-w-1/2 lg:max-w-1/2 font-medium text-justify leading-none">
          <div className="overflow-hidden p-1.5">
            <motion.p initial="hidden" animate={introFinished ? "visible" : "hidden"} variants={contentVariants} className="whitespace-pre-line">
              {t.hero.bio}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}