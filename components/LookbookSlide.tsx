"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export type LookbookSlideProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
  font: string;
  color: string;
  overlay: boolean;
  video: string;
};

export default function LookbookSlide({ imageUrl, title, subtitle, font, color, overlay, video }: LookbookSlideProps) {
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
      <div
        className={`absolute inset-0 ${overlay || "bg-black bg-opacity-40"}`}
        style={{ opacity: 1, transition: 'opacity 0.3s', zIndex: 1 }}
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
      </div>
      {/* Font overlays */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.3s, transform 0.3s', zIndex: 2 }}
      >
        <h1 className={`${font || "font-heading text-6xl md:text-8xl"} ${color || "text-white"} drop-shadow-2xl mb-6`}>
          {title}
        </h1>
        <p className="text-2xl md:text-4xl font-bold text-white drop-shadow-xl bg-black/40 rounded-xl px-4 py-2 inline-block">
          {subtitle}
        </p>
      </div>
    </section>
  );
}