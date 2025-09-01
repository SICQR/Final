"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export function ShopSearchBox() {
  const [query, setQuery] = useState("");
  return (
    <motion.form
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-6"
      onSubmit={e => e.preventDefault()}
    >
      <input
        type="search"
        placeholder="Search for anything…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="input input-bordered w-full max-w-xl"
        name="q"
        autoFocus
      />
    </motion.form>
  );
}