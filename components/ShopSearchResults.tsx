"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
// import { searchProducts } from "@/lib/shopify"; // You need to implement this!

export function ShopSearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  useEffect(() => {
    // Demo: Replace this with real shopify search
    const handler = setTimeout(() => {
      if (query.length > 1) {
        // searchProducts(query).then(setResults); // implement real search!
        setResults([
          { id: 1, title: "Demo Product", handle: "demo-product", featuredImage: { url: '/images/editorial1.jpg' } }
        ]);
      } else setResults([]);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);
  return (
    <>
      <input
        type="search"
        placeholder="Type to search…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <AnimatePresence>
        <div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
          style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.3s, transform 0.3s' }}
        >
          {results.map((p: any) => (
            <Link key={p.id} href={`/p/${p.handle}`} className="card block overflow-hidden">
              <div className="h-48 relative bg-slate-100">
                {p.featuredImage?.url ? (
                  <Image
                    src={p.featuredImage.url}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="pt-3">
                <h2 className="font-semibold">{p.title}</h2>
                <span className="opacity-70 text-sm">@{p.handle}</span>
              </div>
            </Link>
          ))}
        </div>
      </AnimatePresence>
    </>
  );
}