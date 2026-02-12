"use client";

import Image from "next/image";
import { useLanguage } from "@/app/providers/language-provider";
import { getInfoContent } from "@/app/constants/about";
import AboutBox from "./AboutBox";

export default function About() {
  const { language } = useLanguage();
  const infoContent = getInfoContent(language);

  return (
    <section className="min-h-screen">
      {/* HEADER SEKCJI */}
      <div className="pb-5 md:pb-15">
        <h3 className="font-sansation uppercase text-[clamp(3rem,3rem+5vw,9rem)] font-semibold leading-none tracking-widest text-inherit">
          About Me
        </h3>
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

  return (
    <div className=" flex flex-col font-medium leading-relaxed">
      {/* SEKCJA 1: Intro ze zdjęciem (opływanie tekstu) */}
      <div className="relative">
        <div className="float-left size-25 md:size-30 lg:size-35 rounded-full bg-zinc-100/40 relative overflow-hidden mr-4 mb-1">
          <Image
            src="/portfolio-img.png"
            alt="David Profile"
            fill
            priority
            sizes="(max-width: 768px) 100px, 140px"
            className="object-cover"
          />
        </div>

        <p className="indent-10 leading-5 md:leading-7.5 text-sm md:text-base lg:text-lg text-justify tracking-[7%] text-neutral-900 z-10">
          {firstText}
        </p>
        <div className="clear-both" />
      </div>

      {/* SEKCJA 2: Reszta biografii */}
      <div className="space-y-4 mt-5 flex flex-col">
        {restText.map((txt, i) => (
          <p key={i} className="indent-10 leading-5 md:leading-7.5 text-sm md:text-base lg:text-lg text-justify tracking-[7%] text-neutral-900">
            {txt}
          </p>
        ))}
      </div>
    </div>
  );
}