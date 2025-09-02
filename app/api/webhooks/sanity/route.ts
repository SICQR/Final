import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  if (slug) await revalidatePath(`/drop/${slug}`);
  await revalidatePath("/radio");
  return new Response("OK");
}
