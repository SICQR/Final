import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    '/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:js|mjs|css|png|jpg|jpeg|svg|gif|ico|webp|avif|mp3|wav|mp4|mov)$).*)',
  ],
};

export default function middleware(req: NextRequest) {
  // Age-gate protected paths
  const protectedPaths = [
    '/radio',
    '/shop',
    '/affiliate',
    /^\/drop\//,
  ];
  const url = req.nextUrl;
  const path = url.pathname;
  const isProtected = protectedPaths.some((p) =>
    typeof p === 'string' ? path.startsWith(p) : p.test(path)
  );
  const ageConsent = req.cookies.get('hm_age_consent');
  if (isProtected && ageConsent?.value !== 'yes') {
    const next = encodeURIComponent(path);
    url.pathname = '/legal/18-plus';
    url.search = `?next=${next}`;
    return NextResponse.redirect(url);
  }
  // Admin basic auth (preserve existing logic)
  if (path.startsWith('/admin')) {
    const user = process.env.ADMIN_USER;
    const pass = process.env.ADMIN_PASS;
    if (!user || !pass) return NextResponse.next();
    const auth = req.headers.get('authorization');
    if (!auth?.startsWith('Basic ')) {
      return new NextResponse('Auth required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="HOTMESS Admin"' },
      });
    }
    const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
    const [u, p] = decoded.split(':');
    if (u !== user || p !== pass) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  return NextResponse.next();
}