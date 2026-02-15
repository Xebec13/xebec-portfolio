"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import FooterOverlay from "./FooterOverlay";
import { useLanguage } from "@/app/providers/language-provider"; // Dostosuj ścieżkę
import { GLOBAL } from "@/app/constants/portfolio"; // Dostosuj ścieżkę
import InteractiveGrid from "@/app/ui/InteractiveGrid";

export default function Footer() {
    const { t } = useLanguage();

    // Stan zarządzający widocznością Overlayu
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <footer
            id="footer"
            className="relative min-h-screen flex flex-col justify-center gap-10 md:justify-evenly bg-neutral-900 p-10 md:p-15 lg:p-20 overflow-hidden"
        >
            <InteractiveGrid totalCells={50} />
            {/* --- 1. SOCIAL LINKS (Góra) --- */}
            <div className="relative z-20 lg:ml-auto flex p-3 gap-6 bg-inherit max-w-fit text-zinc-50 text-sm md:text-base font-bold uppercase tracking-wide">
                <a
                    href={GLOBAL.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors cursor-pointer"
                >
                    {t.footer.links.github}
                </a>
                <a
                    href={GLOBAL.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors cursor-pointer"
                >
                    {t.footer.links.linkedin}
                </a>
            </div>

            {/* --- 2. MAIN CTA CONTENT (Środek - przeniesione z FooterCta) --- */}
            <div className="flex flex-col gap-15 justify-center">
                {/* Headline Gradient */}
                <div className="bg-clip-text text-transparent font-medium bg-linear-to-r from-zinc-100/90 via-zinc-100/80 to-zinc-100/10">
                    <h3 className="text-[clamp(2rem,3.5vw,4rem)] tracking-tight leading-snug">
                        {t.footer.ctaTitle}<br />
                        {t.footer.ctaSubtitle}
                    </h3>
                </div>

                {/* Button & Status Area */}
                <div className="relative flex flex-col-reverse items-start md:flex-row md:items-center gap-10 text-lg">
                    {/* Trigger Button - ZAKTUALIZOWANY */}
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="relative z-20
                            will-change-[colors,transform]
                            w-full md:max-w-fit px-8 py-4 
                            rounded-sm bg-zinc-50 drop-shadow-md
                            text-blue-900 font-bold tracking-wide
                            transition-all duration-300 ease-out
                            outline-0 outline-transparent
                            hover:outline-3 hover:outline-blue-700 
                            hover:scale-[1.02] 
                            cursor-pointer
                        "
                    >
                        {t.footer.btn}
                    </button>

                    {/* Status Indicator (Ping) */}
                    <div className="inline-flex items-center gap-5 text-zinc-100">
                        <div className="relative z-20 inline-flex items-center justify-center size-5 ">
                            <div className="absolute inset-0 h-full w-full bg-blue-300 rounded-full opacity-75 animate-ping" />
                            <div className="relative inset-0 size-3.5 bg-blue-700 rounded-full " />
                        </div>
                        <p>{t.footer.status}</p>
                    </div>
                </div>
            </div>

            {/* --- 3. COPYRIGHT (Dół) --- */}
            <div className="text-zinc-400 text-sm md:text-base flex flex-col md:flex-row justify-between items-center gap-2">
                <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
                <p className="opacity-50">{t.footer.designedBy}</p>
            </div>

            {/* --- 4. OVERLAY MANAGER --- */}
            <AnimatePresence>
                {isContactOpen && (
                    <FooterOverlay onClose={() => setIsContactOpen(false)} />
                )}
            </AnimatePresence>
        </footer>
    );
}