"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress(){
  const { scrollYProgress } = useScroll() as any;
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });
  const M = motion as any;
  return (
    <M.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-0.5 z-[60] origin-left bg-[var(--brand-acid)] pointer-events-none"
      style={{ scaleX, transformOrigin: 'left center', willChange: 'transform' }}
    />
  );
}
