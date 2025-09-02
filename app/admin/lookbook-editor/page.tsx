"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { updateLookbookSlide } from "@/lib/sanity";

export default function LookbookEditor() {
  // TODO: Fetch slide data here (e.g., from API or context)
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [font, setFont] = useState("");
  const [color, setColor] = useState("");
  const [overlay, setOverlay] = useState("");
  const [video, setVideo] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    // TODO: Replace with actual slide update logic
    await updateLookbookSlide({ title, subtitle, font, color, overlay, video });
    setSaving(false);
  };

  return (
    <motion.div layout>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input className="input" value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Subtitle" />
        <input className="input" value={font} onChange={e => setFont(e.target.value)} placeholder="Font Class" />
        <input className="input" value={color} onChange={e => setColor(e.target.value)} placeholder="Font Color" />
        <input className="input" value={overlay} onChange={e => setOverlay(e.target.value)} placeholder="Overlay Class" />
        <input className="input" value={video} onChange={e => setVideo(e.target.value)} placeholder="Overlay Video URL" />
        <button className="btn" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
      </form>
    </motion.div>
  );
}