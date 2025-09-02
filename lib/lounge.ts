export function reportMessage(message: string) {
  // TODO: Implement report logic
  return Promise.resolve();
}

export function sendLoungeMessage(message: string) {
  // TODO: Implement send lounge message logic
  return Promise.resolve();
}
// Lounge logic helpers

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserFromAuth(req: any) {
  // TODO: implement auth extraction from request/session
  return { id: "dummy", tier: "xxx_lounge" };
}

export async function logLoungeMessage(userId: string, message: string) {
  await supabase.from("lounge_messages").insert({ user_id: userId, message });
}

export async function fetchLoungeMessages() {
  const { data } = await supabase.from("lounge_messages").select("*").order("created_at", { ascending: false });
  return data || [];
}