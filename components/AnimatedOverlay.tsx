"use client";
import { motion } from "framer-motion";

type AnimatedOverlayProps = {
  videoSrc?: string;
  svgSrc?: string;
};

export default function AnimatedOverlay({ videoSrc, svgSrc }: AnimatedOverlayProps) {
  // Animation logic (fade in)
  // You can use useEffect and state for more complex animation
  return (
    <div className="absolute inset-0 pointer-events-none z-10" style={{ opacity: 1, transition: 'opacity 0.5s' }}>
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
    </div>
  );
}