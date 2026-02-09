"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { NextChevron, PrevChevron } from "@/app/ui/CustomIcons";

interface WorksDetailsProps {
  marquee: string[];
  badges: string[];
  review: string;
  techReview: string;
  achi: string[];
  images: string[];
  projectId: number;
  href?: string;
  gitHref?: string;
}

/** * GŁÓWNY ORCHESTRATOR LAYOUTU
 * Definiuje siatkę Grid i rozmieszczenie poszczególnych modułów.
 */
export default function WorksDetails({
  marquee, badges, review, techReview, achi, href, gitHref, images, projectId
}: WorksDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 grid-flow-row gap-5 place-items-stretch py-6 lg:px-6 lg:py-10 overflow-hidden">

      {/* --- RZĄD 1: Marquee & Badges --- */}
      <div className="row-start-1 lg:col-start-1">
        <HeroMarquee words={marquee} id={projectId} />
      </div>

      <div className="lg:col-start-2 lg:col-span-2 flex items-center">
        <HeroBadges items={badges} />
      </div>

      {/* --- RZĄD 2: Opisy (Review & Tech) --- */}
      <div className="row-start-2 lg:row-start-2 lg:col-start-1">
        <HeroReview review={review} />
      </div>

      <div className="lg:row-start-2 lg:col-start-2 lg:col-span-2">
        <HeroTechReview techReview={techReview} />
      </div>

      {/* --- RZĄD 3 & 4: Osiągnięcia, Linki oraz Karuzela --- */}
      <div className="lg:row-start-3 lg:col-start-1">
        <HeroAchi keyAchi={achi} />
        <div className="mt-10">
          <HeroLinks href={href} gitHref={gitHref} />
        </div>
      </div>

      {/* Karuzela zajmuje dwie kolumny i rozciąga się przez dwa rzędy na desktopie */}
      <div className="lg:col-start-2 lg:col-span-2 lg:row-start-3  self-center">
        <HeroCarousel images={images} />
      </div>

    </div>
  );
}

/* ==========================================================================
   SUB-FUNKCJE (W KOLEJNOŚCI GRIDA)
   ========================================================================== */

/** * [ROW 1] HeroMarquee: Płynny pasek słów kluczowych 
 */
function HeroMarquee({ words, id }: { words: string[], id: number }) {
  return (
    <ul className="key-font flex items-center shrink-0 max-w-full text-blue-600 text-xs md:text-sm uppercase whitespace-nowrap overflow-hidden">
      <motion.div
        animate={{ x: [0, "-33.33%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        className="flex items-center"
      >
        {[...words, ...words, ...words].map((word, idx) => (
          <li
            key={`${id}-word-${idx}`}
            className="inline-flex items-center gap-5 py-0.5 px-3 tracking-widest font-bold"
          >
            {word}
            <div className="size-1 rounded-full bg-blue-600"></div>
          </li>
        ))}
      </motion.div>
    </ul>
  );
}

/** * [ROW 1] HeroBadges: Pigułki technologiczne (napisy) 
 */
function HeroBadges({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase">
      {items.map((techName, idx) => (
        <li
          key={`${techName}-${idx}`}
          className="rounded-full text-[10px] md:text-xs border border-blue-800 bg-blue-600/30 text-blue-950 py-1 px-3 whitespace-nowrap tracking-wider"
        >
          {techName}
        </li>
      ))}
    </ul>
  );
}

/** * [ROW 2] HeroReview: Główny opis projektu 
 */
function HeroReview({ review }: { review: string }) {
  return (
    <div className="lg:col-start-1 indent-10">
      <p className="text-xs md:text-sm lg:text-base font-medium break-normal leading-relaxed">
        {review}
      </p>
    </div>
  );
}

/** * [ROW 2] HeroTechReview: Opis techniczny 
 */
function HeroTechReview({ techReview }: { techReview: string }) {
  return (
    <div className="lg:col-start-2 lg:col-span-2 indent-10">
      <p className="text-xs md:text-sm lg:text-base font-medium break-normal leading-relaxed">
        {techReview}
      </p>
    </div>
  );
}

/** * [ROW 3] HeroAchi: Lista kluczowych osiągnięć 
 */
function HeroAchi({ keyAchi }: { keyAchi: string[] }) {
  return (
    <>
      <p className="font-sansation text-xl font-bold uppercase text-blue-950">Key Achievements</p>
      <ul className="mt-4 space-y-4 font-medium">
        {keyAchi.map((achievement, idx) => (
          <li key={idx} className="flex items-center text-xs lg:text-sm gap-4 tracking-[1.5%] leading-4.75">
            <div className="relative inline-flex w-5 h-5 min-w-5 items-center justify-center">
              <div className="absolute w-3/4 h-3/4 bg-blue-300 rounded-full opacity-75 animate-ping" />
              <div className="relative w-1/2 h-1/2 bg-blue-800 rounded-full" />
            </div>
            {achievement}
          </li>
        ))}
      </ul>
    </>
  );
}

/** * [ROW 4] HeroLinks: Przyciski akcji (Source & Live) 
 */
function HeroLinks({ href, gitHref }: { href?: string, gitHref?: string }) {
  if (!href && !gitHref) return null;

  return (
    <div className="flex flex-wrap gap-3 text-xs md:text-sm font-medium whitespace-nowrap">
      {gitHref && (
        <a
          href={gitHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 rounded-sm bg-zinc-50 text-blue-900 border border-transparent drop-shadow-md transition-all duration-700 ease-out hover:bg-blue-50 hover:border-blue-800"
        >
          Source Code
        </a>
      )}

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 rounded-sm bg-zinc-50 text-blue-900 border border-transparent drop-shadow-md transition-all duration-700 ease-out hover:bg-blue-50 hover:border-blue-800"
        >
          Live Demo
        </a>
      )}
    </div>
  );
}

/** * [ROW 3/4] HeroCarousel: Interaktywna karuzela zdjęć (Embla) 
 */
function HeroCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 35
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  if (!images?.length) return null;

  return (
    <div className="w-full  flex flex-col items-center">
      <div className="w-full overflow-hidden contain-paint" ref={emblaRef}>
        <div className="flex touch-pan-y h-full items-center ">
          {images.map((img, index) => {
            const isActive = index === selectedIndex;
            return (
              <div key={index} className="flex-[0_0_75%] md:flex-[0_0_85%] min-w-0 ">
                <div
                  className={`relative aspect-video rounded-xl overflow-hidden transition-all duration-500 ease-in-out
                    ${isActive ? "scale-100 brightness-100 z-10 " : "scale-95 brightness-75 z-0"}
                  `}
                >
                  <Image
                    src={img}
                    alt={`Project screenshot ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pasek Nawigacji */}
      <div className="flex items-center justify-center gap-3 md:gap-6 mt-2 md:mt-4 text-zinc-400">
        <PrevChevron onClick={scrollPrev} />
        <div className="flex items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`size-1 md:size-2 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-blue-800" : "bg-zinc-400"
                }`}
            />
          ))}
        </div>
        <NextChevron onClick={scrollNext} />
      </div>
    </div>
  );
}