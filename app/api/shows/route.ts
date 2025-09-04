import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET() {
  const p = join(process.cwd(), "data", "shows.json");
  const raw = await readFile(p, "utf8");
  const json = JSON.parse(raw);
  return NextResponse.json(json, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
}
