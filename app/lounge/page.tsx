export const dynamic = "force-dynamic";
export const revalidate = 0;

import LoungeChat from "@/components/LoungeChat";

export default async function LoungePage() {
  return (
    <section className="px-4 py-10 mx-auto max-w-4xl">
      <h1 className="font-heading text-4xl mb-6">XXX Lounge Chat</h1>
      <LoungeChat />
    </section>
  );
}