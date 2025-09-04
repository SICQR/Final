import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Filth Frequency — HOTMESS Radio",
  description: "London's Filth Frequency. Live now. Press play, lover. We'll do the rest.",
};

export default function RadioPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 text-hotpink">
            The Filth Frequency
          </h1>
          
          <p className="text-2xl text-gray-300 mb-12">
            London's premier queer radio station. Live now.
          </p>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 mb-12">
            <div className="text-center">
              <div className="w-32 h-32 bg-hotpink rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full"></div>
              </div>
              <p className="text-xl font-heading mb-4">NOW PLAYING</p>
              <p className="text-hung font-semibold text-lg">HOTMESS LIVE</p>
              <p className="text-gray-400">Broadcasting from London</p>
            </div>
          </div>

          <p className="text-lg text-gray-300 italic mb-8">
            &ldquo;Press play, lover. We&apos;ll do the rest.&rdquo;
          </p>

          <div className="text-center">
            <button data-player className="btn-primary mr-4">
              ▶ Listen Live
            </button>
            <button className="btn-secondary">
              📻 Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}