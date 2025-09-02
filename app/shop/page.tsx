import Image from "next/image";
import Link from "next/link";
import { getLatestProducts } from "@/lib/shopify";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shop — HOTMESS" };

export default async function ShopPage() {
  let products: any[] = [];
  try {
    products = await getLatestProducts(3);
  } catch {
    // keep page calm if env not set
  }

  return (
    <section style={{ display:"grid", gap:16 }}>
      <h1>Own your mess.</h1>
      {!products.length && (
        <p style={{ opacity:.8 }}>
          Add <code>SHOPIFY_DOMAIN</code> and <code>SHOPIFY_STOREFRONT_TOKEN</code> to <code>.env.local</code> to show your 3 live products.
        </p>
      )}
      <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))" }}>
        {products.map((p:any) => {
          const price = p?.priceRange?.minVariantPrice;
          const priceStr = price
            ? new Intl.NumberFormat("en-GB", { style:"currency", currency: price.currencyCode }).format(Number(price.amount))
            : "—";
          return (
            <article key={p.handle} style={{ border:"1px solid rgba(255,255,255,.12)", borderRadius:16, overflow:"hidden" }}>
              {p.featuredImage && (
                <Image
                  src={p.featuredImage.url}
                  alt={p.featuredImage.altText || `${p.title} image`}
                  width={p.featuredImage.width || 900}
                  height={p.featuredImage.height || 600}
                />
              )}
              <div style={{ padding:12, display:"grid", gap:6 }}>
                <strong>{p.title}</strong>
                <span style={{ opacity:.9 }}>{priceStr}</span>
                <a
                  className="inline-block rounded-xl border border-white/30 px-3 py-2 font-bold bg-orange-500 text-black hover:opacity-90"
                  href={p.onlineStoreUrl || `https://${process.env.SHOPIFY_DOMAIN}/products/${p.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BUY ON SHOPIFY
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}