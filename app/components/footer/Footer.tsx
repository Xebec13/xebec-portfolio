"use client";

import { useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import FooterOverlay from "./FooterOverlay";
import { useLanguage } from "@/app/providers/language-provider";
import { GLOBAL } from "@/app/constants/portfolio";
import InteractiveGrid from "@/app/ui/InteractiveGrid";


const fadeInSocials: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const fadeInTitle: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const scaleButton: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } }
};

const revealStatus: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
};

export default function Footer() {
    const { t } = useLanguage();
    const [isContactOpen, setIsContactOpen] = useState(false);
    const commonViewport = { once: true, amount: 0.1 as const };

    return (
        <footer
            id="footer"
            className="relative min-h-screen flex flex-col justify-center gap-5 lg:gap-10 md:justify-evenly bg-neutral-900 px-5 py-5 md:px-10 md:py-10 lg:px-15"
        >
            <InteractiveGrid totalCells={50} />
            
            {/* --- 1. SOCIAL LINKS --- */}
            <div className="relative z-20 lg:ml-auto flex gap-6 bg-neutral-900 p-2 text-zinc-50 text-sm md:text-base font-bold uppercase tracking-wide">
                {[
                    { label: t.footer.links.github, href: GLOBAL.socials.github },
                    { label: t.footer.links.linkedin, href: GLOBAL.socials.linkedin }
                ].map((social) => (
                    <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeInSocials}
                        initial="hidden"
                        whileInView="visible"
                        viewport={commonViewport}
                        className="hover:text-blue-500 transition-colors cursor-pointer"
                    >
                        {social.label}
                    </motion.a>
                ))}
            </div>

            {/* --- 2. MAIN CTA CONTENT --- */}
            <div className="flex flex-col gap-15 justify-center">
                <motion.h3 
                    variants={fadeInTitle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={commonViewport}
                    className="text-[clamp(1.5rem,1.5rem+1.5vw,5rem)] tracking-tight leading-snug font-medium"
                >
                    {/* KLUCZOWA ZMIANA: Gradient przeniesiony do span */}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-zinc-50/90 via-zinc-50/80 to-zinc-50/10">
                        {t.footer.ctaTitle}<br />
                        {t.footer.ctaSubtitle}
                    </span>
                </motion.h3>

                <div className="relative flex flex-col-reverse items-start md:flex-row md:items-center gap-10 text-lg">
                    <motion.button
                        onClick={() => setIsContactOpen(true)}
                        variants={scaleButton}
                        initial="hidden"
                        whileInView="visible"
                        viewport={commonViewport}
                        className="relative z-20 will-change-[colors,scale] w-full md:max-w-fit px-6 py-3 rounded-sm bg-zinc-50 text-blue-900 font-bold tracking-wide transition-all duration-300 ease-out outline-0 outline-transparent hover:outline-3 hover:outline-blue-700 hover:scale-[1.02] cursor-pointer"
                    >
                        {t.footer.btn}
                    </motion.button>

                    <motion.div 
                        variants={revealStatus}
                        initial="hidden"
                        whileInView="visible"
                        viewport={commonViewport}
                        className="inline-flex items-center gap-5 text-zinc-100"
                    >
                        <div className="relative z-20 inline-flex items-center justify-center size-5 ">
                            <div className="absolute inset-0 h-full w-full bg-blue-300 rounded-full opacity-75 animate-ping" />
                            <div className="relative inset-0 size-3.5 bg-blue-700 rounded-full " />
                        </div>
                        <p>{t.footer.status}</p>
                    </motion.div>
                </div>
            </div>

            {/* COPYRIGHT - BEZ ZMIAN */}
            <div className="text-zinc-400 text-sm md:text-base flex flex-col md:flex-row justify-between items-center gap-2">
                <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
                <p className="opacity-50">{t.footer.designedBy}</p>
            </div>

            <AnimatePresence>
                {isContactOpen && <FooterOverlay onClose={() => setIsContactOpen(false)} />}
            </AnimatePresence>
        </footer>
    );
}