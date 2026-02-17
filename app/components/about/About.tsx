"use client";
import { motion, Variants } from "motion/react";
import Image from "next/image";
import { useLanguage } from "@/app/providers/language-provider";
import { getInfoContent } from "@/app/constants/about";
import AboutBox from "./AboutBox";

export default function About() {
  const { language } = useLanguage();
  const infoContent = getInfoContent(language);
  const headingVariants: Variants = {
    hidden: {
      y: "100%"
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1] // Płynne "power out" ease
      }
    }
  };

  return (
    <section id="about" className="min-h-screen px-5 py-5 md:px-10 md:py-10 lg:px-15">
      {/* HEADER SEKCJI */}
     <div className="pb-5 lg:pb-10">
        <div className="overflow-hidden">
          <motion.h2
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-sansation uppercase text-[clamp(2rem,2rem+4vw,5rem)] font-semibold leading-none tracking-widest text-inherit"
          >
            About Me
          </motion.h2>
        </div>
      </div>

      {/* GŁÓWNY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5">
        {/* LEWA KOLUMNA: Biografia */}
        <div className="size-full max-w-full lg:max-w-[95%]">
          <AboutIntro content={infoContent} />
        </div>

        {/* PRAWA KOLUMNA: Interaktywne kafelki */}
        <div className="justify-self-end size-full max-w-full lg:max-w-[95%]">
          <AboutBox />
        </div>
      </div>
    </section>
  );
}

function AboutIntro({ content }: { content: string[] }) {
  const [firstText, ...restText] = content;

  // Warianty dla zdjęć (Scale)
  const imgVariants: Variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Warianty dla tekstu (Wjazd od góry)
  const textFromTopVariants: Variants = {
    hidden: { y:"100%" },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    }
  };

  // Kontener dla staggeringu
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Odstęp między akapitami
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="flex flex-col font-medium leading-relaxed"
    >
      {/* SEKCJA 1: Intro ze zdjęciem */}
      <div className="relative">
        <motion.div
          variants={imgVariants}
          className="float-left size-25 md:size-30 lg:size-35 rounded-full bg-zinc-200/90 relative overflow-hidden mr-4 mb-1"
        >
          <Image
            src="/portfolio-img.png"
            alt="David Profile"
            fill
            priority
            sizes="(max-width: 768px) 100px, 140px"
            className="object-cover"
          />
        </motion.div>

        {/* Maska dla pierwszego tekstu */}
        <div className="indent-10 leading-5 md:leading-7.5 tracking-[7%] text-justify ">
          <motion.p 
            variants={textFromTopVariants}
            className="text-sm md:text-base lg:text-lg "
          >
            {firstText}
          </motion.p>
        </div>
        <div className="clear-both" />
      </div>

      {/* SEKCJA 2: Reszta biografii ze staggerem */}
      <div className="space-y-4 mt-3 flex flex-col">
        {restText.map((txt, i) => (
          <div key={i} className="overflow-hidden indent-10 leading-5 md:leading-7.5 tracking-[7%]">
            <motion.p 
              variants={textFromTopVariants}
              className="text-sm md:text-base lg:text-lg text-justify"
            >
              {txt}
            </motion.p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}