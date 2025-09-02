import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type Role = "member" | "mod" | "creator";
export type Session = { sub: string; role: Role; iat: number; exp: number } | null;

export async function getSession(): Promise<Session> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("hm_session")?.value;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Session;
    if (!decoded || !decoded.role) return null;
    return decoded;
  } catch {
    return null;
  }
}
