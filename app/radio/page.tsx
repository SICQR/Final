import type { Metadata } from "next";
import { RadioPlayer } from "@/components/RadioPlayer";

export const metadata: Metadata = {
  title: "The Filth Frequency — HOTMESS Radio",
  description: "London's Filth Frequency. Live now. Press play, lover. We'll do the rest.",
};

export default function RadioPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 text-hotpink">
            The Filth Frequency
          </h1>
          
          <p className="text-2xl text-gray-300 mb-8">
            London's premier queer radio station.
          </p>
          
          <p className="text-lg text-gray-300 italic mb-8">
            &ldquo;Press play, lover. We&apos;ll do the rest.&rdquo;
          </p>
        </div>

        <RadioPlayer />
      </div>
    </div>
  );
}