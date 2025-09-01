import AffiliateDashboard from "@/components/AffiliateDashboard";

export default function AffiliatePage() {
  return (
    <section className="px-6 py-16 max-w-3xl mx-auto">
      <h2 className="font-heading text-4xl mb-6 text-hotpink">Affiliate Dashboard</h2>
      <AffiliateDashboard />
      <p className="mt-6 opacity-70">Track your referrals, commissions, and payouts.</p>
    </section>
  );
}