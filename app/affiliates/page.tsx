export const metadata = {
  title: 'Affiliates — HOTMESS',
  description: 'Join, scan, earn. The only queer affiliate with real aftercare.',
};

export default function AffiliatesPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Join the HOTMESS Affiliate</h1>
      <p className="mt-3 text-neutral-700">
        Scan, gag, ride, repeat. Get your unique QR, drop codes, and payouts every Friday.
      </p>

      <ol className="mt-6 list-decimal pl-5 space-y-2 text-neutral-800">
        <li>Open Telegram and message <a className="underline" href="https://t.me/hotmess_radio_bot" target="_blank">hotmess_radio_bot</a>.</li>
        <li>Use <code>/earn</code> to see your balance and payout history.</li>
        <li>Print or save your QR and post it wherever the boys actually look.</li>
      </ol>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Commission</h2>
        <ul className="list-disc pl-5 text-neutral-800">
          <li>12% base · 18% VIP (&gt; £2,000 / month)</li>
          <li>30-day attribution · last click</li>
          <li>£50 threshold · payouts Fridays via Stripe</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Rules</h2>
        <ul className="list-disc pl-5 text-neutral-800">
          <li>No spam. No hate. No camp pop during DJ takeovers.</li>
          <li>Self-purchase allowed at 6%.</li>
          <li>Refunds within 30 days reverse commission.</li>
        </ul>
      </section>
    </main>
  );
}
