"use client";
import { motion } from "framer-motion";

export default function AnimatedOverlay({ videoSrc, svgSrc }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Video overlay */}
      {videoSrc && (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      )}
      {/* SVG overlay */}
      {svgSrc && (
        <img src={svgSrc} alt="SVG overlay" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      )}
      {/* Add animated SVGs here */}
    </motion.div>
  );
}