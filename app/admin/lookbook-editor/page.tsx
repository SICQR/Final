"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { updateLookbookSlide } from "@/lib/sanity";

export default function LookbookEditor({ slide }) {
  const [title, setTitle] = useState(slide.title || "");
  const [subtitle, setSubtitle] = useState(slide.subtitle || "");
  const [font, setFont] = useState(slide.font || "");
  const [color, setColor] = useState(slide.color || "");
  const [overlay, setOverlay] = useState(slide.overlay || "");
  const [video, setVideo] = useState(slide.video || "");
  const [saving, setSaving] = useState(false);

  return (
    <motion.form
      layout
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        await updateLookbookSlide(slide._id, { title, subtitle, font, color, overlay, video });
        setSaving(false);
      }}
      className="space-y-4"
    >
      <input className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input className="input" value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Subtitle" />
      <input className="input" value={font} onChange={e => setFont(e.target.value)} placeholder="Font Class" />
      <input className="input" value={color} onChange={e => setColor(e.target.value)} placeholder="Font Color" />
      <input className="input" value={overlay} onChange={e => setOverlay(e.target.value)} placeholder="Overlay Class" />
      <input className="input" value={video} onChange={e => setVideo(e.target.value)} placeholder="Overlay Video URL" />
      <button className="btn" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
    </motion.form>
  );
}