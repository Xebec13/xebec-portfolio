"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/app/providers/language-provider";
import { getAboutData, AboutSection, AboutContentItem } from "@/app/constants/about";
import {
    CodingIcon,
    ProfIcon,
    CertIcon,
    PersonalIcon,
    BackChevron
} from "@/app/ui/CustomIcons";

// ==========================================================================
// 1. MAIN COMPONENT: AboutBox
// ==========================================================================
export default function AboutBox() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const { language } = useLanguage();
    const aboutData = getAboutData(language);

    // Helper: Ikony dla kafelków
    const getIcon = (idx: number) => {
        switch (idx) {
            case 0: return <CodingIcon />;
            case 1: return <ProfIcon />;
            case 2: return <CertIcon />;
            case 3: return <PersonalIcon />;
            default: return null;
        }
    };
    // Warianty dla przycisku - puste, ale konieczne do przekazania sygnału w dół do ikon
    const buttonVariants = {
        initial: {},
        hover: {}
    };
    return (
        <div className="relative size-full">
            {/* --- GRID BUTTONS (TŁO) --- */}
            <motion.div 
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} className="grid grid-cols-2 gap-1 size-full min-h-100 lg:min-h-150">
                {aboutData.map((item, idx) => (
                    <motion.button // ZMIANA: motion.button
                        key={item.id}
                        onClick={() => setActiveIdx(idx)}
                        // ZMIANA: Konfiguracja propagacji wariantów
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        className="font-sansation group relative flex flex-col items-center justify-center gap-4 md:gap-6 p-3 md:p-10 shadow-[inset_0_0_0_3px_#171717] text-neutral-900 bg-transparent hover:text-zinc-50 hover:bg-neutral-900 transition-all duration-500 ease-out cursor-pointer"
                    >
                        {/* Wrapper dla ikony - zwykły div nie blokuje sygnału motion */}
                        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                            {getIcon(idx)}
                        </div>

                        <h3 className="relative z-10 text-sm md:text-base lg:text-lg font-bold uppercase tracking-wide">
                            {item.name}
                        </h3>
                    </motion.button>
                ))}
            </motion.div>

            {/* --- OVERLAY (Szczegóły) --- */}
            <AnimatePresence>
                {activeIdx !== null && (
                    <OverlayContent
                        item={aboutData[activeIdx]}
                        index={activeIdx}
                        icon={getIcon(activeIdx)}
                        onClose={() => setActiveIdx(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// ==========================================================================
// 2. SUB-COMPONENT: OverlayContent
// ==========================================================================

interface OverlayProps {
    item: AboutSection;
    index: number;
    icon: React.ReactNode;
    onClose: () => void;
}

function OverlayContent({ item, index, icon, onClose }: OverlayProps) {

    // Style Badge'y zależnie od sekcji (Coding, Prof, Learning, Personal)
    const badgeStyles = [
        "bg-neutral-500/30 text-zinc-950 border-zinc-500", // Coding
        "bg-neutral-500/20 text-zinc-900 border-blue-950", // Professional
        "bg-neutral-500/10 text-zinc-900 border-zinc-400", // Learning
        "bg-neutral-400/30 text-zinc-950 border-blue-900", // Personal
    ];

    const currentBadgeStyle = badgeStyles[index] || badgeStyles[0];

    // Definiujemy, skąd ma "wyjechać" overlay (transform origin)
    const origins = ["origin-top-left", "origin-top-right", "origin-bottom-left", "origin-bottom-right"];

    // Warianty Overlayu
    const overlayVariants = {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
    };

    return (
        <motion.div
            data-lenis-prevent="true"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute group inset-0 z-20 flex flex-col bg-zinc-100 shadow-2xl overflow-hidden ${origins[index]}`}
        >
            {/* --- Header --- */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-inherit min-h-15 max-h-15 text-zinc-50 bg-neutral-800">
                <div className="flex items-center gap-3">
                    <BackChevron onClick={onClose} className="[&>div]:size-1.5 bg-transparent transition-colors ease-in-out duration-700 hover:bg-blue-700" />
                    <h4 className="font-sansation font-bold uppercase tracking-wide leading-none">
                        {item.name}
                    </h4>
                </div>

                <div className="opacity-90 scale-75">{icon}</div>
            </div>

            {/* --- Scrollable Content --- */}
            <div className="p-4 md:p-6 space-y-8 overflow-y-auto overflow-x-hidden text-inherit ">

                {/* Sekcja 1: Badges */}
                <div>
                    <p className="text-base font-bold uppercase mb-3 tracking-wider">
                        {item.headings[0]}
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {item.badges.map((badge, i) => (
                            <span
                                key={i}
                                className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold border uppercase ${currentBadgeStyle}`}
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Sekcja 2: Dynamic Content */}
                <div>
                    {item.headings[1] && (
                        <p className="text-base font-bold uppercase mb-3 tracking-wider">
                            {item.headings[1]}
                        </p>
                    )}

                    <ContentRenderer index={index} content={item.content} />
                </div>
            </div>
        </motion.div>
    );
}

// ==========================================================================
// 3. LOGIC: Content Renderer (The Switch)
// ==========================================================================

function ContentRenderer({ index, content }: { index: number, content: AboutSection['content'] }) {

    // CASE 0: CODING (Lista obiektów z linkami)
    if (index === 0) {
        return (
            <div className="space-y-6">
                {content.map((entry, i) => {
                    if (typeof entry === 'string' || Array.isArray(entry)) return null;
                    const item = entry as AboutContentItem;

                    return (
                        <div key={i} className="bg-zinc-200 p-4 rounded-lg border border-zinc-300 shadow-sm">
                            {/* ZMIANA: Zmieniono text-lg na text-base dla spójności */}
                            <div className="flex justify-between items-baseline mb-2 text-base">
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-bold text-neutral-950 hover:text-blue-700 ease-in-out transition-colors hover:underline decoration-2 underline-offset-2"
                                >
                                    {item.name}
                                </a>
                            </div>
                            <p className="text-sm text-inherit mb-3 leading-relaxed">{item.description}</p>

                            {item.contributions && (
                                <ul className="space-y-1">
                                    {item.contributions.map((c, idx) => (
                                        <li key={idx} className="text-xs text-neutral-950 flex items-start gap-2">
                                            <span className="mt-1.5 size-1 rounded-full bg-blue-700 shrink-0" />
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    // CASE 1: PROFESSIONAL
    if (index === 1) {
        return (
            <div className="space-y-6">
                {content.map((block, i) => {
                    if (!Array.isArray(block)) return null;
                    const subTitle = i === 0 ? "Segments / Industries" : "Key Competences";

                    return (
                        <div key={i}>
                            {/* Tutaj jest text-sm */}
                            <p className="text-sm font-bold text-neutral-700 uppercase mb-1">{subTitle}</p>
                            <div className="flex flex-wrap gap-1.5 lg:gap-3">
                                {block.map((txt, j) => (
                                    <div key={j} className="flex items-center gap-1.5 lg:gap-3 text-sm text-zinc-800 font-medium">
                                        <span className="size-1.5 rounded-full bg-blue-700" />
                                        {txt}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    // CASE 2 & 3: LEARNING & PERSONAL
    if (index === 2 || index === 3) {
        const titles = content[0] as string[];
        const details = content[1] as string[];

        if (!titles || !details) return null;

        return (
            <div className="grid gap-2 lg:gap-4">
                {titles.map((title, i) => (
                    <div key={i} className="bg-zinc-200 p-3 rounded border border-zinc-100">
                        {/* ZMIANA: Zwiększono z text-xs na text-sm dla lepszej czytelności */}
                        <p className="text-sm font-bold text-neutral-600 uppercase mb-1">{title}</p>
                        <p className="text-sm text-neutral-950 leading-snug font-medium first-letter:capitalize">
                            {details[i]}
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    return null;
}