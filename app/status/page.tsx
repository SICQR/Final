export const metadata = {
  title: 'Status — HOTMESS',
  description: 'Live status for site, stream, and services.',
};

import StatusBadge from '@/components/StatusBadge';

export default function StatusPage() {
  const services = [
    { name: 'Site' , up: true },
    { name: 'Stream', up: true },
    { name: 'Shop', up: true },
    { name: 'Bot', up: true },
  ];

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">System Status</h1>
      <p className="mt-2 text-sm text-neutral-600">Europe/London · Manual check placeholder. Wire to healthchecks when ready.</p>
      <div className="mt-6 space-y-3">
        {services.map((s) => (
          <div key={s.name}>
            <StatusBadge label={s.name} up={s.up} />
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Incidents</h2>
        <p className="text-sm text-neutral-600">No incidents reported.</p>
      </div>
    </main>
  );
}
