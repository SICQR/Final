import client from "@/lib/sanity.client";
import { DROP_BY_SLUG } from "@/lib/queries";
import imageUrlBuilder from '@sanity/image-url';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).url();
}

export default async function Page({ params }: any) {
  const cookieStore = await cookies();
  const ageConsent = cookieStore.get("hm_age_consent");
  if (!ageConsent || ageConsent.value !== "yes") {
    redirect(`/legal/18-plus?next=/drop/${params.slug}`);
  }
  
  let drop;
  try {
    drop = await client.fetch(DROP_BY_SLUG, { slug: params.slug });
  } catch (error) {
    console.warn("Could not fetch drop:", error);
    drop = null;
  }
  
  if (!drop) return <div className="p-8 text-center">Drop not found or content system not configured.</div>;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full p-8 rounded-xl border border-white/20 bg-neutral-900 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">{drop.title}</h1>
        {drop.collection && <div className="mb-2 text-sm opacity-80">{drop.collection}</div>}
        {drop.heroImage && (
          <img src={urlFor(drop.heroImage)} alt={drop.alt || drop.title} className="w-full rounded-lg mb-4" />
        )}
        {drop.publishAt && (
          <div className="mb-2 text-xs text-yellow-400">
            Drops {new Date(drop.publishAt).toLocaleString()}
          </div>
        )}
        <div className="mb-4">{drop.description}</div>
        <div className="mb-2 font-semibold">Price: £{drop.priceGBP}</div>
        <div className="mb-4">Inventory: {drop.inventory}</div>
        {drop.qrTarget && (
          <div className="mt-4">
            {/* Use client component for QR code generation */}
            <DropQRCode value={`/t/${params.slug}`} />
          </div>
        )}
      </div>
    </main>
  );
}

// ...existing code...
import DropQRCode from "./DropQRCode";
