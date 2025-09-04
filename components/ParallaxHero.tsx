"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxHero({ img, title, kicker, ctaText = "Shop Now", href = "/shop" }: { img: string; title: string; kicker?: string; ctaText?: string; href?: string }){
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = (useScroll as any)({ target: ref as any, offset: ["start start","end start"] });
  const y = (useTransform as any)(scrollYProgress, [0,1], ["0%","15%"]);
  const scale = (useTransform as any)(scrollYProgress, [0,1], [1,1.05]);
  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden">
  {/** motion as any to avoid strict prop typing in this workspace */}
  {(motion as any).img ? (motion as any).img({ src: img, alt: "", className: "absolute inset-0 h-full w-full object-cover will-change-transform", style: { y, scale } }) : <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover will-change-transform" />}
      <div className="relative h-full bg-black/30">
        <div className="container h-full flex flex-col items-start justify-end pb-16">
          {kicker && <div className="mb-2 text-sm tracking-wide text-[var(--sub)]">{kicker}</div>}
          <h1 className="text-5xl md:text-6xl font-black">{title}</h1>
          <a href={href} className="mt-6 inline-flex h-11 items-center rounded-full bg-white px-6 text-black font-semibold">{ctaText}</a>
        </div>
      </div>
    </section>
  );
}
