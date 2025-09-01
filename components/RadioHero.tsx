import ModernAudioPlayer from "@/components/ModernAudioPlayer";

export default function RadioHero() {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-hotpink/20 border-2 border-hotpink rounded-xl p-6 flex flex-col items-center">
        <h2 className="font-heading text-3xl text-hotpink mb-2">🔥 HOTMESS RADIO LIVE</h2>
        <ModernAudioPlayer streamUrl="https://listen.radioking.com/radio/736103/stream/802454" />
      </div>
    </div>
  );
}