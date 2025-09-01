"use client";
import { useRef, useState } from "react";

export default function ModernAudioPlayer({ streamUrl }: { streamUrl: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  return (
    <div className="flex flex-col items-center bg-black/70 rounded-lg py-4 px-6 mb-2">
      <audio ref={audioRef} src={streamUrl} preload="auto" autoPlay={false} />
      <button
        className={`btn btn-lg ${playing ? "bg-hung text-black" : "bg-hotpink text-white"} font-heading w-40 mb-2`}
        onClick={toggle}
      >
        {playing ? "Pause" : "Play"}
      </button>
      <div className="w-full flex items-center gap-2 mb-1">
        <label htmlFor="vol" className="text-xs text-hotpink">Vol</label>
        <input
          id="vol"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolume}
          className="w-32 accent-hotpink"
        />
      </div>
      <div className="text-xs text-white/80">LIVE: <span className="text-hotpink">Radioking Stream</span></div>
    </div>
  );
}