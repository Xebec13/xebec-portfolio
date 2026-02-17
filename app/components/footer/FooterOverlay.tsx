"use client";

import { motion, Variants } from "motion/react";
import { BackChevron } from "@/app/ui/CustomIcons"; 
import FooterForm from "./FooterForm"; 
import { GLOBAL } from "@/app/constants/portfolio";
import { useLanguage } from "@/app/providers/language-provider";

interface FooterOverlayProps {
    onClose: () => void;
}

// 1. CONTAINER: Zjeżdża z góry na dół (zgodnie z nazwą animate-slide-down-modal)
const containerVariants: Variants = {
    hidden: { 
        y: "-100%", // Startuje NAD footerem
    },
    visible: { 
        y: "0%",
        transition: { 
            duration: 0.8, // Trochę wolniej, dla elegancji
            ease: [0.32, 0.72, 0, 1], 
            when: "beforeChildren", // Najpierw tło, potem teksty
            staggerChildren: 0.1 
        }
    },
    exit: { 
        y: "-100%", // Wraca do góry
        transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } 
    }
};

// 2. TITLE: Zjeżdża w dół (efekt nav-slide-down)
// Musi mieć y: "-100%", żeby schować się nad linią maskowania
const titleVariants: Variants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { 
        y: "0%", 
        opacity: 1, 
        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } 
    },
    exit: { opacity: 0 }
};

// 3. EMAIL & CONTENT: Wjeżdża w górę (efekt content-slide-up)
// Musi mieć y: "100%", żeby schować się pod linią maskowania
const contentVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
        y: "0%", 
        opacity: 1, 
        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } 
    },
    exit: { opacity: 0 }
};

export default function FooterOverlay({ onClose }: FooterOverlayProps) {
    const { t } = useLanguage();

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 z-40 grid grid-cols-1 lg:grid-cols-2 lg:place-items-center gap-2 min-h-screen px-5 py-5 md:px-10 md:py-10 lg:px-15 text-zinc-50 bg-neutral-800"
        >
            {/* --- LEWA KOLUMNA --- */}
            <div className="w-full self-end lg:self-center space-y-2 mb-5 lg:mb-0">
                
                {/* Close Button */}
                <motion.div 
                    variants={contentVariants} // Przycisk też może wjechać od dołu
                    className="absolute top-1.5 left-1.5 md:top-3 md:left-3"
                >
                    <BackChevron 
                        onClick={onClose} 
                        className="text-inherit hover:bg-blue-700 hover:text-zinc-50 transition-colors" 
                    />
                </motion.div>

                {/* Heading (Maskowany od góry) */}
                <div className="overflow-hidden">
                    <motion.h3 
                        variants={titleVariants} 
                        className="uppercase text-[clamp(1rem,1.5rem+3vw,5rem)] font-bold leading-tight tracking-tight"
                    >
                        {t.form.title}
                    </motion.h3>
                </div>

                {/* Email Link (Maskowany od dołu) */}
                <div className="overflow-hidden">
                    <motion.a
                        href={`mailto:${GLOBAL.email}`}
                        variants={contentVariants} // Używamy wariantu "Slide Up"
                        className="underline block max-w-fit pl-1.5 text-xl md:text-2xl lg:text-3xl font-semibold hover:text-blue-700 transition-colors "
                    >
                        {GLOBAL.email}
                    </motion.a>
                </div>
            </div>

            {/* --- PRAWA KOLUMNA --- */}
            {/* Formularz wjeżdża od dołu jako całość */}
            <motion.div variants={contentVariants} className="w-full shrink-0">
                <FooterForm />
            </motion.div>

        </motion.div>
    );
}