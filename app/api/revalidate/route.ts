/**
 * POST /api/revalidate
 * Accepts a Sanity webhook or custom payload and triggers Next.js revalidation.
 * Expects an Authorization: Bearer <REVALIDATION_SECRET> header or { secret } in the JSON body.
 * Body shape (examples):
 * { "path": "/posts/my-post" }
 * { "tag": "home" }
 * { "paths": ["/a","/b"] }
 */
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const body = await req.json().catch(() => ({}));
  const secretFromHeader = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
  const secret = secretFromHeader ?? body?.secret;

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid or missing revalidation secret' }, { status: 401 });
  }

  const payload = body || {};
  const paths: string[] = [];
  if (payload.path) paths.push(payload.path);
  if (payload.paths && Array.isArray(payload.paths)) paths.push(...payload.paths);
  if (payload.slug && typeof payload.slug === 'string') paths.push(payload.slug.startsWith('/') ? payload.slug : `/${payload.slug}`);

  try {
    // dynamic import so this file is safe even if next/cache exports vary across versions
    const cacheMod: any = await import('next/cache');
    const revalidatePath = cacheMod?.revalidatePath;
    const revalidateTag = cacheMod?.revalidateTag;

    if (Array.isArray(paths) && paths.length > 0 && typeof revalidatePath === 'function') {
      for (const p of paths) {
        try {
          await revalidatePath(p);
        } catch (e) {
          console.error('revalidatePath failed for', p, e);
        }
      }
    }

    if (payload.tag && typeof revalidateTag === 'function') {
      await revalidateTag(payload.tag);
    }

    return NextResponse.json({ revalidated: true, paths, tag: payload.tag ?? null });
  } catch (err: any) {
    console.error('revalidate error', err);
    return NextResponse.json({ revalidated: false, error: String(err) }, { status: 500 });
  }
}
