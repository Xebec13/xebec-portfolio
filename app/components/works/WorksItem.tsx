"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Work } from "@/app/constants/works";
import TechIcon from "@/app/ui/TechIcon";
import Divider from "@/app/ui/Divider";
import { UpDownChevron } from "@/app/ui/CustomIcons";
import WorksContentWrapper from "./WorksContentWrapper";
import WorksDetails from "./WorksDetails"; // Nowy komponent

interface WorksItemProps {
    project: Work;
    index: number;
}

export default function WorksItem({ project, index }: WorksItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleOpen = () => setIsExpanded((prev) => !prev);

    return (
        <>
            <motion.button
                onClick={toggleOpen}
                aria-expanded={isExpanded}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`grid grid-cols-3 p-4 md:p-5 gap-1 items-center w-full text-left cursor-pointer transition-colors duration-500
                        ${isExpanded
                        ? "bg-zinc-200 text-neutral-900 hover:bg-neutral-900 hover:text-zinc-200" // State: Active/Expanded (Light theme match)
                        : "bg-zinc-200 text-neutral-900 hover:bg-neutral-900 hover:text-zinc-200" // State: Default -> Hover (Inverted high contrast)
                    }`}>
                <span className="text-[clamp(0.8rem,0.8rem+0.6vw,3rem)] font-medium leading-none">
                    {project.name}
                </span>

                <div className={`justify-self-start flex items-center gap-3 md:gap-5 will-change-[opacity] transition-opacity duration-500 ${isExpanded ? "opacity-0" : "opacity-100"}`}>
                    {project.techStack.map((tech) => (
                        <TechIcon
                            key={tech}
                            tech={tech}
                            className="size-4 md:size-5" // Stały rozmiar kontenera dla każdego elementu
                        />
                    ))}
                </div>

                <span className="justify-self-end flex items-center gap-2 font-semibold text-xs md:text-sm">
                    {project.date}
                    <UpDownChevron isOpen={isExpanded} />
                </span>
            </motion.button>

            {/* Wykorzystujemy Twój sprawdzony mechanizm animacji */}
            <WorksContentWrapper isExpanded={isExpanded}>
                <WorksDetails project={project} />
            </WorksContentWrapper>

            <Divider type="main" />
        </>
    );
}