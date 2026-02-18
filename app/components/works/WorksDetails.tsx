"use client";

import { useCallback, useEffect, useState } from "react";
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
    <div className="grid grid-cols-1 lg:grid-cols-3 grid-flow-row gap-3 lg:gap-5 place-items-stretch px-3 py-4 lg:px-6 lg:py-8 overflow-hidden">

      {/* --- RZĄD 1: Marquee & Badges --- */}
      <div className="row-start-1 lg:col-start-1">
        <Marquee words={marquee} id={projectId} />
      </div>

      <div className="lg:col-start-2 lg:col-span-1">
        <Badges items={badges} />
      </div>

      {/* --- RZĄD 2: Opisy (Review & Tech) --- */}
      <div className="row-start-2 lg:row-start-2 lg:col-start-1">
        <Review review={review} />
      </div>

      <div className="lg:row-start-2 lg:col-start-2 lg:col-span-2">
        <TechReview techReview={techReview} />
      </div>

      {/* --- RZĄD 3 & 4: Osiągnięcia, Linki oraz Karuzela --- */}
      <div className="row-start-5 row-span-2 lg:row-start-3 lg:col-start-1 flex flex-col gap-3">
        <Achi keyAchi={achi} />
        <div className="my-5">
          <Links href={href} gitHref={gitHref} />
        </div>
      </div>

      {/* Karuzela zajmuje dwie kolumny i rozciąga się przez dwa rzędy na desktopie */}
      <div className="row-start-7 lg:col-start-2 lg:col-span-2 lg:row-start-3 self-center">
        <Carousel images={images} />
      </div>

    </div>
  );
}

/* ==========================================================================
   SUB-FUNKCJE (W KOLEJNOŚCI GRIDA)
   ========================================================================== */

/** * [ROW 1] Marquee: Płynny pasek słów kluczowych 
 */
function Marquee({ words, id }: { words: string[], id: number }) {
  return (
    <ul className="key-font flex items-center shrink-0 max-w-full text-blue-700 text-sm lg:text-base uppercase whitespace-nowrap overflow-hidden">
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
            <div className="size-1 rounded-full bg-blue-700"></div>
          </li>
        ))}
      </motion.div>
    </ul>
  );
}

/** * [ROW 1] Badges: Pigułki technologiczne (napisy) 
 */
function Badges({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1 font-semibold uppercase">
      {items.map((techName, idx) => (
        <li
          key={`${techName}-${idx}`}
          className="rounded-full text-xs lg:text-sm border border-blue-800 bg-blue-600/30 text-blue-950 py-1 px-3 whitespace-nowrap tracking-wider flex items-center"
        >
          {techName}
        </li>
      ))}
    </ul>
  );
}

/** * [ROW 2] Review: Główny opis projektu 
 */
function Review({ review }: { review: string }) {
  return (
    <div className="lg:col-start-1 indent-10">
      <p className="text-sm md:text-base lg:text-lg font-medium break-normal leading-relaxed">
        {review}
      </p>
    </div>
  );
}

/** * [ROW 2] TechReview: Opis techniczny 
 */
function TechReview({ techReview }: { techReview: string }) {
  return (
    <div className="lg:col-start-2 lg:col-span-2 indent-10">
      <p className="text-sm md:text-base lg:text-lg font-medium break-normal leading-relaxed">
        {techReview}
      </p>
    </div>
  );
}

/** * [ROW 3] Achi: Lista kluczowych osiągnięć 
 */
function Achi({ keyAchi }: { keyAchi: string[] }) {
  return (
    <>
      <p className="font-sansation text-xl font-bold uppercase text-blue-950">Key Achievements</p>
      <ul className="mt-2 space-y-2 font-medium">
        {keyAchi.map((achievement, idx) => (
          <li key={idx} className="flex items-center text-sm lg:text-base gap-4 tracking-[1.5%] leading-4.75">
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

/** * [ROW 4] Links: Przyciski akcji (Source & Live) 
 */
function Links({ href, gitHref }: { href?: string, gitHref?: string }) {
  if (!href && !gitHref) return null;

  return (
    <div className="text-sm lg:text-base font-medium whitespace-nowrap flex flex-row items-center justify-start gap-2">
      {gitHref && (
        <a
          href={gitHref}
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-6 py-3 uppercase font-bold tracking-tighter
    bg-zinc-200 text-neutral-950 
    border-2 border-neutral-950 
    transition-all duration-200
    hover:-translate-x-1 hover:-translate-y-1
    hover:shadow-[4px_4px_0px_0px_rgba(10,10,10,1)]
    active:translate-x-0 active:translate-y-0 active:shadow-none"
        >

          Source Code

        </a>
      )}

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-6 py-3 uppercase font-bold tracking-tighte bg-zinc-200 text-neutral-950 border-2 border-neutral-950 
                    transition-all duration-200
                    hover:-translate-x-1 hover:-translate-y-1
                    hover:shadow-[4px_4px_0px_0px_rgba(10,10,10,1)]
                    active:translate-x-0 active:translate-y-0 active:shadow-none">
                      Website
        </a>
      )}
    </div>
  );
}

/** * [ROW 3/4] Carousel: Interaktywna karuzela zdjęć (Embla) 
 */
function Carousel({ images }: { images: string[] }) {
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
        <div className="flex items-center gap-1">
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