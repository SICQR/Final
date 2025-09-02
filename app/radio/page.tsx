"use client";

import { useEffect, useState } from "react";
import client from "@/lib/sanity.client";
import { UPCOMING_SHOWS } from "@/lib/queries";
import RadioPlayer from "@/components/RadioPlayer";

export default function RadioPage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShows() {
      try {
        const fetchedShows = await client.fetch(UPCOMING_SHOWS);
        setShows(fetchedShows || []);
      } catch (error) {
        console.warn("Could not fetch shows:", error);
        setShows([]);
      } finally {
        setLoading(false);
      }
    }
    fetchShows();
  }, []);

  return (
    <section className="px-6 py-16 max-w-3xl mx-auto">
      <h2 className="font-heading text-4xl mb-6 text-hotpink">HOTMESS Radio</h2>
      <RadioPlayer streamUrl="https://your-demo-stream.com/stream.mp3" />
      <p className="mt-6 opacity-70">Tune in for exclusive mixes, fashion show audio, and more.</p>
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Upcoming Shows</h3>
        {loading ? (
          <p>Loading shows...</p>
        ) : (
          <ul>
            {shows?.map((show: any, i: number) => (
              <li key={i} className="mb-6 p-4 rounded-lg bg-neutral-900 border border-white/10">
                <div className="font-semibold text-lg">{show.title}</div>
                <div className="text-xs text-yellow-400 mb-2">{new Date(show.publishAt).toLocaleString()}</div>
                {show.dj && (
                  <div className="flex items-center gap-3">
                    {show.dj.image && (
                      <img src={show.dj.image.asset?._ref || show.dj.image} alt={show.dj.name} className="w-10 h-10 rounded-full" />
                    )}
                    <div>
                      <div className="font-bold">{show.dj.name}</div>
                      <div className="text-xs opacity-70">{show.dj.bio}</div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}