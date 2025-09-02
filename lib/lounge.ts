export function reportMessage(message: string) {
  // TODO: Implement report logic
  return Promise.resolve();
}

export function sendLoungeMessage(message: string) {
  // TODO: Implement send lounge message logic
  return Promise.resolve();
}
// Lounge logic helpers

import { getServerAdmin } from "./supabase";

export async function getUserFromAuth(req: any) {
  // TODO: implement auth extraction from request/session
  return { id: "dummy", tier: "xxx_lounge" };
}

export async function logLoungeMessage(userId: string, message: string) {
  try {
    const supabase = getServerAdmin();
    await supabase.from("lounge_messages").insert({ user_id: userId, message });
  } catch (error: any) {
    console.warn("Lounge logging not configured:", error?.message || "Unknown error");
  }
}

export async function fetchLoungeMessages() {
  try {
    const supabase = getServerAdmin();
    const { data } = await supabase.from("lounge_messages").select("*").order("created_at", { ascending: false });
    return data || [];
  } catch (error: any) {
    console.warn("Lounge fetching not configured:", error?.message || "Unknown error");
    return [];
  }
}