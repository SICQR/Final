"use client";
import { motion } from "framer-motion";
const M = motion as any;
export default function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }){
  return (
    <M.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.6, ease: "easeOut", delay }} className="will-change-transform">
      {children}
    </M.div>
  );
}
