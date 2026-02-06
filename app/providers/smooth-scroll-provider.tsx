"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const easeInSine = (x: number): number => {
  return 1 - Math.cos((x * Math.PI) / 2);
};

const LENIS_OPTIONS = {
  duration: 1.5,
  ease: easeInSine,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.8,
  infinite: false,
  anchors: true,
};

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis autoRaf={true} root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}