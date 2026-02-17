"use client";

import { motion, Variants } from "motion/react";
import { useLanguage } from "@/app/providers/language-provider";
import { getWorks } from "@/app/constants/works";
import Divider from "@/app/ui/Divider";
import WorksItem from "./WorksItem";

// 1. Warianty dla kontenera - obsługują Stagger
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2, // Opóźnienie między każdym <p>
        }
    }
};

// 2. Warianty dla poszczególnych <p> - efekt wyjazdu z dołu
const textVariants: Variants = {
    hidden: { 
        y: 50 
    },
    visible: { 
        y: 0,
        transition: { 
            duration: 0.8, 
            ease: [0.33, 1, 0.68, 1] // Płynne wyhamowanie (Power3.out)
        }
    }
};

export default function Works() {
  const { language, t } = useLanguage();
  const projects = getWorks(language);

  return (
    <section id="works" className="min-h-screen px-5 py-5 md:px-10 md:py-10 lg:px-15 ">
      
      {/* Kontener nagłówka z włączonym Staggerem */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="font-sansation grid grid-cols-2 lg:grid-cols-3 p-1 gap-3 font-semibold uppercase text-lg lg:text-2xl"
      >
        {/* Każdy paragraf w osobnej "masce" overflow-hidden */}
        <div className="overflow-hidden justify-self-start">
            <motion.p variants={textVariants}>
                {t.projects.headerProject}
            </motion.p>
        </div>

        <div className="overflow-hidden justify-self-start hidden lg:block">
            <motion.p variants={textVariants}>
                {t.projects.headerTech}
            </motion.p>
        </div>

        <div className="overflow-hidden justify-self-end">
            <motion.p variants={textVariants}>
                {t.projects.headerDate}
            </motion.p>
        </div>
      </motion.div>

      <Divider type="main" />

      <div className="flex flex-col">
        {[...projects].reverse().map((project, index) => (
          <WorksItem
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
      
    </section>
  );
}