import type { Metadata } from "next";
import { ProductCatalog } from "@/components/ProductCatalog";

export const metadata: Metadata = {
  title: "Shop Drops — HOTMESS",
  description: "RAW / HUNG / HIGH / SUPER — limited, loud, lethal. Wear the mess. Own the night.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 text-hung">
            Drops
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            RAW / HUNG / HIGH / SUPER — limited, loud, lethal.
          </p>
          <p className="text-lg text-hotpink italic">
            &ldquo;Wear the mess. Own the night.&rdquo;
          </p>
        </div>

        <ProductCatalog />
      </div>
    </div>
  );
}