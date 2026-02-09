"use client";
import { motion } from "motion/react";

interface DividerProps {
  type?: "main" | "off" | "head";
}

export default function Divider({ type = "off" }: DividerProps) {
  const styleClass = {
    off: "border-b-2 border-current opacity-30",
    main: "border-b-[3px] border-current opacity-100",
    head: "border-b-[4px] border-current opacity-100",
  }[type];

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`w-full origin-left ${styleClass}`}
    />
  );
}