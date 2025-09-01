import { ShopSearchBox } from "@/components/ShopSearchBox";
import { ShopSearchResults } from "@/components/ShopSearchResults";

export default function ShopSearchPage() {
  return (
    <section className="px-4 py-10 mx-auto max-w-6xl">
      <h1 className="font-heading text-4xl mb-6">Search Products</h1>
      <ShopSearchBox />
      <ShopSearchResults />
    </section>
  );
}