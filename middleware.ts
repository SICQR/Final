import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin"]
};

export default function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;
  if (!user || !pass) return NextResponse.next(); // no gate if not configured

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="HOTMESS Admin"' }
    });
  }
  const decoded = Buffer.from(auth.slice(6), "base64").toString("utf8");
  const [u, p] = decoded.split(":");
  if (u !== user || p !== pass) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}