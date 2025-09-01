import { PRODUCTS } from "@/lib/constants";

export default function ShopPage() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-heading text-4xl mb-6">Drops</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PRODUCTS.map(p => (
            <article key={p.handle} className="card">
              <div className="h-48 rounded-xl bg-slate-100 bg-center bg-cover" style={{ backgroundImage: `url(${p.image})` }}/>
              <div className="pt-3">
                <h2 className="font-semibold">{p.title}</h2>
                <p className="opacity-80">{p.collection}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold">£{(p.priceCents/100).toFixed(2)}</span>
                  <a className="btn" href={`/t/${p.handle}`}>Buy</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}