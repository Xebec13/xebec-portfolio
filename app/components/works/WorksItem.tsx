"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Work } from "@/app/constants/works";
import TechIcon from "@/app/ui/TechIcon";
import Divider from "@/app/ui/Divider";
import { UpDownChevron } from "@/app/ui/CustomIcons";
import WorksDetails from "./WorksDetails";

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
                className={`grid grid-cols-3 min-h-5 max-h-15  py-5 px-3 gap-1 place-items-center w-full text-left cursor-pointer transition-colors duration-500 relative
                        ${isExpanded
                        ? "bg-zinc-200 text-neutral-900 hover:bg-neutral-900 hover:text-zinc-200"
                        : "bg-zinc-200 text-neutral-900 hover:bg-neutral-900 hover:text-zinc-200"
                    }`}>
                <span className={`text-[clamp(0.6rem,0.7rem+0.5vw,3rem)] font-medium leading-none whitespace-pre-line justify-self-start origin-left transition-[transform,margin] duration-500 ease-in-out ${isExpanded ? "scale-130 md:scale-130 ml-5" : "ml-0"}`}>
                    {project.name}
                </span>

                <div className={`justify-self-start flex items-center gap-2 md:gap-5 will-change-[opacity] transition-opacity duration-500 ${isExpanded ? "opacity-0" : "opacity-100"}`}>
                    {project.techStack.map((tech) => (
                        <TechIcon
                            key={tech}
                            tech={tech}
                            className="size-3 md:size-5" // Stały rozmiar kontenera dla każdego elementu
                        />
                    ))}
                </div>

                <span className="justify-self-end flex items-center gap-2 font-semibold text-xs md:text-sm">
                    {project.date}
                    <UpDownChevron isOpen={isExpanded} />
                </span>
            </motion.button>

            <div
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
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
                // Tu w przyszłości dodasz kolejne: review={project.review} itd.
                />
            </div>

            <Divider type="main" />
        </>
    );
}