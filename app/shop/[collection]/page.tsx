import PageHero from "@/components/PageHero";
import CrossPromo from "@/components/CrossPromo";

type CollectionPageProps = {
  params: { collection: string };
};

export default function CollectionPage({ params }: any) {
  // TODO: Wire Sanity GROQ for collection banner and spicy copy
  const { collection } = params;
  // Example: if (["raw","hung","superhung"].includes(collection)) { /* spicy copy */ }
  return (
    <main>
      <PageHero
        title={collection.toUpperCase()}
        sub={["raw","hung","superhung"].includes(collection)
          ? "Spicy: Consent is the kink. No leaks. Drops don’t wait."
          : "Varsity tease — lighter, cheeky, playful."}
      >
        {/* TODO: Render collection banner with urlFor(data.img) */}
        <></>
      </PageHero>
      {/* TODO: Render products grid via Sanity GROQ */}
      <CrossPromo />
    </main>
  );
}
