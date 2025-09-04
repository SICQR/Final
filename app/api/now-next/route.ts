export const runtime = 'edge';

export async function GET() {
  const data = {
    now: { show: 'Drive Time Mess', host: 'Philip + Guests', endsAt: '19:00' },
    next: { show: 'Guest DJ Takeover', host: 'Rotation', startsAt: '19:00' },
    updatedAt: new Date().toISOString(),
  };
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json', 'cache-control': 's-maxage=10, stale-while-revalidate=30' },
  });
}
