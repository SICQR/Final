"use client";
import { useState } from "react";

export function ShopSearchBox() {
  const [query, setQuery] = useState("");
  return (
    <form
      className="mb-6"
      style={{ opacity: 1, transition: 'opacity 0.3s' }}
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
    </form>
  );
}