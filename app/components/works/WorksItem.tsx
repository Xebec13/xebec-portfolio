"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Work } from "@/app/constants/works";
import TechIcon from "@/app/ui/TechIcon";
import Divider from "@/app/ui/Divider";
import { UpDownChevron } from "@/app/ui/CustomIcons";
import WorksDetails from "./WorksDetails";

interface WorksItemProps {
    project: Work;
    index: number;
}

// 1. WARIANTY DLA PRZYCISKU (Wejście listy)
const headerVariants: Variants = {
    hidden: { 
        
        y: "100%"
    },
    visible: (index: number) => ({
        
        y: 0,
        transition: { 
            duration: 0.5, 
            delay: index * 0.1 
        }
    })
};

// 2. WARIANTY DLA TREŚCI (Expand/Collapse)
const contentVariants: Variants = {
    hidden: { 
        height: 0, 
        
    },
    visible: {
        height: "auto",
        
        transition: {
            height: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
            
        }
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: {
            height: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
            opacity: { duration: 0.2 }
        }
    }
};

export default function WorksItem({ project, index }: WorksItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleOpen = () => setIsExpanded((prev) => !prev);

    return (
        <>
        <div className="overflow-hidden">

        
            <motion.button
                onClick={toggleOpen}
                aria-expanded={isExpanded}
                // Przekazujemy index jako custom prop dla wariantów
                custom={index}
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`grid grid-cols-3 gap-1 px-2 py-4 w-full min-h-5 place-items-center text-left cursor-pointer transition-colors duration-500 relative
                        ${isExpanded
                        ? "bg-zinc-200 text-neutral-900 hover:bg-neutral-900 hover:text-zinc-200"
                        : "bg-zinc-200 text-neutral-900 hover:bg-neutral-900 hover:text-zinc-200"
                    }`}
            >
                {/* Tytuł projektu */}
                <span className={`text-[clamp(0.8rem,1rem+0.2vw,2rem)] font-medium leading-none justify-self-start origin-left scale-100 will-change-[scale,margin] transition-[scale,margin] duration-500 ease-in-out ${isExpanded ? "scale-130 ml-1.5" : "ml-0"}`}>
                    {project.name}
                </span>

                {/* Ikony technologii */}
                <div className={`justify-self-center lg:justify-self-start flex items-center gap-2 md:gap-5 transition-opacity duration-200 ${isExpanded ? "opacity-0" : "opacity-100"}`}>
                    {project.techStack.map((tech) => (
                        <TechIcon
                            key={tech}
                            tech={tech}
                            className="size-3 md:size-5"
                        />
                    ))}
                </div>

                {/* Data i Chevron */}
                <span className="justify-self-end flex items-center gap-2 font-semibold text-xs md:text-sm">
                    {project.date}
                    <UpDownChevron isOpen={isExpanded} className="size-0.75" />
                </span>
            </motion.button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                    >
                        <WorksDetails
                            marquee={project.keyWords}
                            badges={project.techStack}
                            review={project.review}
                            techReview={project.techReview}
                            achi={project.keyAchi}
                            href={project.href}
                            gitHref={project.gitHref}
                            images={project.images}
                            projectId={project.id}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            
            <Divider type="main" />
            </div>
        </>
    );
}