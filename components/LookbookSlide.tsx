"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LookbookSlide({ imageUrl, title, subtitle, font, color, overlay, video }) {
  return (
    <section className="relative snap-center min-w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover w-full h-full"
          sizes="100vw"
          priority
        />
      )}
      {/* Animated Overlay + Video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        className={`absolute inset-0 ${overlay || "bg-black bg-opacity-40"}`}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
      </motion.div>
      {/* Font overlays */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className={`${font || "font-heading text-6xl md:text-8xl"} ${color || "text-white"} drop-shadow-2xl mb-6`}>
          {title}
        </h1>
        <p className="text-2xl md:text-4xl font-bold text-white drop-shadow-xl bg-black/40 rounded-xl px-4 py-2 inline-block">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}