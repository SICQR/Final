"use client";
import { useRef, useState } from "react";

export default function RadioPlayer({ streamUrl }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="bg-black/70 rounded-xl p-6 flex flex-col items-center">
      <audio ref={audioRef} src={streamUrl} preload="auto" />
      <button className="btn btn-lg bg-hotpink text-white mb-3" onClick={toggle}>
        {playing ? "Pause" : "Play"}
      </button>
      <div className="text-xs opacity-70">Live Stream</div>
    </div>
  );
}