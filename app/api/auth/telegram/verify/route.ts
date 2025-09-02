import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Exchange the short-lived bot token for a session cookie.
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any; // from your bot
    const session = jwt.sign(
      { sub: decoded.sub, role: decoded.role },            // keep it lean
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }                                  // session lifetime
    );

    const res = NextResponse.json({ ok: true });
    res.cookies.set("hm_session", session, {
      httpOnly: true, secure: true, sameSite: "lax", path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
